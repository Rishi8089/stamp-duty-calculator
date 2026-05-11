/* eslint-disable no-unused-vars, no-useless-assignment */
import { STATES } from '../data/stampData';

const pct = (r) => {
  if (r == null) return '—';
  let s = parseFloat(r).toFixed(4);
  while (s.endsWith('0')) s = s.slice(0, -1);
  if (s.endsWith('.')) s = s.slice(0, -1);
  return s + '%';
};

const gk = (g_) => ({ female: 'female', joint_f: 'joint_f', joint: 'joint', company: 'company' }[g_] || 'male');

const slabCalc = (pval, slabs, gender) => {
  let stamp = 0, prev = 0;
  const fem = (gender === 'female' || gender === 'joint_f');
  for (const s of slabs) {
    const band = Math.min(pval, s.upto) - prev;
    if (band > 0) stamp += band * ((fem ? s.female : s.male) / 100);
    prev = s.upto;
    if (pval <= s.upto) break;
  }
  return stamp;
};

const pctOf = (rate, base) => base * (rate / 100);

export const calculateStampDuty = (sk, cat, v) => {
  if (!sk || !cat || !STATES[sk]) return { error: "Please select state and instrument" };
  const r = STATES[sk];
  const gender = v.gender || 'male';
  const gkey = gk(gender);
  let lines = [], total = 0, pvalOut = 0, eff;

  // FIXED DUTY INSTRUMENTS
  const FIXED = {
    affidavit: { duty: 50, reg: 0, art: 'Art.4 ISA 1899', note: 'Fixed nominal duty. No mandatory registration.' },
    notarial_act: { duty: 20, reg: 0, art: 'Art.43 ISA 1899', note: '₹20 per notarial act. Notaries Act 1952.' },
    loa_shares: { duty: 1, reg: 0, art: 'Art.37 ISA 1899', note: 'Letter of Allotment — ₹1 fixed.' },
    receipt: { duty: 1, reg: 0, art: 'Art.53 ISA 1899', note: 'Not on cheques or e-payments.' },
    adoption: { duty: 100, reg: 200, art: 'Art.3 ISA 1899', note: 'Registration mandatory under Hindu Adoptions Act.' },
    aoa: { duty: 200, reg: 0, art: 'AoA — fixed', note: 'Filed with MoA at ROC.' },
    will: { duty: 200, reg: 200, art: 'Art.62 ISA 1899', note: 'Codicil: ₹500. Registration optional but highly advised.' },
    divorce_deed: { duty: 100, reg: 100, art: 'Nominal', note: 'Court decree fees are separate.' },
  };

  if (FIXED[cat]) {
    const fd = FIXED[cat];
    lines.push({ n: 'Stamp duty', r: 'Fixed', v: fd.duty, note: fd.note });
    if (fd.reg > 0) lines.push({ n: 'Registration fee', r: 'Fixed', v: fd.reg });
    total = fd.duty + (fd.reg || 0);
    return { state: r, lines, total, pvalOut, cat, gkey };
  }

  // PARTNERSHIP / LLP
  if (cat === 'partnership' || cat === 'llp') {
    const cap = Number(v.partcap) || 0, sub = v.partnew || 'new';
    let duty = 500, note = '';
    if (sub === 'dissolution') { duty = 500; note = 'Dissolution deed — ₹500'; }
    else if (sub === 'amendment') { duty = 200; note = 'Amendment deed — ₹200'; }
    else {
      if (!cap) { duty = 500; note = 'Min ₹500'; }
      else if (cap <= 100000) { duty = 500; note = 'Capital ≤₹1L → ₹500'; }
      else if (cap <= 500000) { duty = 1000; note = 'Capital ₹1–5L → ₹1,000'; }
      else if (cap <= 1000000) { duty = 2000; note = 'Capital ₹5–10L → ₹2,000'; }
      else if (cap <= 5000000) { duty = 3000; note = 'Capital ₹10–50L → ₹3,000'; }
      else { duty = 5000; note = 'Capital >₹50L → ₹5,000'; }
      if (sk === 'MH') { duty = 1000; note = 'Maharashtra: ₹1,000 (new deed)'; }
      if (sk === 'DL') { duty = 500; note = 'Delhi: ₹500 fixed'; }
      if (sk === 'KA') { duty = 500 + Math.min(Math.floor((cap - 100000) / 100000) * 200, 4500); note = 'Karnataka rules apply'; }
    }
    lines.push({ n: 'Stamp duty', r: 'Fixed/Slab', v: duty, note });
    lines.push({ n: 'Registration fee (Registrar of Firms)', r: 'Fixed', v: 200 });
    total = duty + 200;
    return { state: r, lines, total, pvalOut: cap, cat, gkey };
  }

  // MOA
  if (cat === 'moa') {
    const ac = Number(v.autcap) || 0;
    let duty = 200;
    if (ac > 0) duty = 200 + Math.floor(ac / 500000) * 1000;
    duty = Math.min(duty, 50000000);
    lines.push({ n: 'MoA stamp duty', r: 'Slab', v: duty, note: '₹200 + ₹1,000/₹5L capital' });
    lines.push({ n: 'ROC filing fees', r: '—', v: 1000 });
    total = duty + 1000;
    return { state: r, lines, total, pvalOut: ac, cat, gkey };
  }

  // COMMERCIAL AGREEMENTS
  if (['sha', 'jv', 'franchise', 'service_agmt'].includes(cat)) {
    const deal = Number(v.pval) || 0;
    if (!deal) return { error: "Please enter the contract / deal value." };
    const rate = 0.1, duty = Math.max(200, deal * (rate / 100));
    lines.push({ n: 'Stamp duty', r: '0.1% or ₹200 min', v: duty });
    lines.push({ n: 'Registration fee', r: '₹200 fixed', v: 200 });
    total = duty + 200;
    return { state: r, lines, total, pvalOut: deal, cat, gkey, eff: (total / deal * 100) };
  }

  // BUSINESS TRANSFER
  if (cat === 'business_transfer') {
    const pvalRaw = Number(v.pval) || 0;
    if (!pvalRaw) return { error: 'Please enter total consideration.' };
    let sd = 0, br = 0;
    if (r.useSlab) { sd = slabCalc(pvalRaw, r.slabs, gkey); br = sd / pvalRaw * 100; }
    else { br = r.base[gkey] || r.base.male; sd = pvalRaw * (br / 100); }
    lines.push({ n: 'Stamp duty (conveyance)', r: pct(br), v: sd });
    if (r.surcharge) { const sc = sd * (r.surcharge / 100); lines.push({ n: `Surcharge (${r.surcharge}%)`, r: r.surcharge + '%', v: sc }); sd += sc; }
    let rf = pvalRaw * (r.reg / 100); if (r.regCap && rf > r.regCap) rf = r.regCap;
    lines.push({ n: 'Registration fee', r: pct(r.reg), v: rf });
    total = sd + rf;
    return { state: r, lines, total, pvalOut: pvalRaw, cat, gkey, eff: (total / pvalRaw * 100), br };
  }

  // SECURITIES
  const SEC_RATES = {
    share_transfer_unlisted: 0.015, share_transfer_listed: 0.015,
    debenture_issue: 0.005, debenture_transfer: 0.0001,
    repo: 0.00001, futures: 0.002, options_exchange: 0.003, options_otc: 0.003,
    other_derivatives: 0.0001, mf_units: 0.005, aif_units: 0.015, warrant_shares: 0.015,
  };
  if (SEC_RATES[cat] !== undefined) {
    const base = cat === 'debenture_issue' || cat === 'debenture_transfer' ? Number(v.debval) : (Number(v.shareval) || Number(v.pval));
    if (!base) return { error: "Please enter transaction value." };
    const rate = SEC_RATES[cat];
    const faceVal = Number(v.sharefv) || 0;
    const taxBase = (faceVal > base && cat.startsWith('share_')) ? faceVal : base;
    const taxDuty = taxBase * (rate / 100);
    if (faceVal > base && cat.startsWith('share_')) lines.push({ n: 'Face value applied', r: '—', v: faceVal });
    lines.push({ n: 'Stamp duty', r: pct(rate), v: taxDuty });
    total = taxDuty;
    return { state: r, lines, total, pvalOut: taxBase, cat, gkey, br: rate };
  }

  // NEGOTIABLE INSTRUMENTS
  if (['promissory', 'promissory_usance', 'bill_exchange', 'bill_usance'].includes(cat)) {
    const amt = Number(v.pronote) || 0;
    if (!amt) return { error: "Please enter amount." };
    const usanceMo = Number(v.usance) || 0;
    let rate = 0.5, note = 'On demand';
    if (cat.includes('usance')) {
      rate = usanceMo <= 3 ? 0.25 : 0.5;
      note = `Usance ${usanceMo} months`;
    }
    const duty = amt * (rate / 100);
    lines.push({ n: 'Stamp duty', r: pct(rate), v: duty, note });
    return { state: r, lines, total: duty, pvalOut: amt, cat, gkey, br: rate };
  }

  // CREDIT / LOAN
  if (['loan_agreement', 'hypothecation', 'pledge', 'bank_guarantee', 'bond_indemnity', 'surety_bond'].includes(cat)) {
    const amt = (['pledge', 'bank_guarantee', 'bond_indemnity', 'surety_bond'].includes(cat)) ? Number(v.pval) : Number(v.loanamt);
    if (!amt) return { error: "Please enter amount." };
    const rate = r.mortgage || 0.5;
    const duty = Math.max(200, amt * (rate / 100));
    lines.push({ n: 'Stamp duty', r: pct(rate), v: duty });
    let rf = amt * (r.reg / 100); if (r.regCap && rf > r.regCap) rf = r.regCap;
    lines.push({ n: 'Registration fee', r: pct(r.reg), v: rf });
    total = duty + rf;
    return { state: r, lines, total, pvalOut: amt, cat, gkey, br: rate };
  }

  // POA
  if (cat === 'pow_general' || cat === 'pow_special') {
    const pav = Number(v.poaval) || 0;
    if (!pav) return { error: "Please enter property value." };
    const rate = cat === 'pow_general' ? 0.5 : (r.base[gkey] || r.base.male);
    const duty = pav * (rate / 100);
    lines.push({ n: 'Stamp duty', r: pct(rate), v: duty });
    let rf = pav * (r.reg / 100); if (r.regCap && rf > r.regCap) rf = r.regCap;
    lines.push({ n: 'Registration fee', r: pct(r.reg), v: rf });
    total = duty + rf;
    return { state: r, lines, total, pvalOut: pav, cat, gkey, br: rate };
  }

  // TRUST / ARBITRATION
  if (cat === 'trust_deed' || cat === 'award_arbitration' || cat === 'court_decree') {
    const amt = Number(v.pval) || 0;
    if (!amt) return { error: "Please enter value." };
    const rate = 1, duty = Math.min(amt * (rate / 100), cat === 'award_arbitration' ? 25000 : Infinity);
    lines.push({ n: 'Stamp duty', r: pct(rate), v: duty });
    let rf = amt * (r.reg / 100); if (r.regCap && rf > r.regCap) rf = r.regCap;
    lines.push({ n: 'Registration fee', r: pct(r.reg), v: rf });
    total = duty + rf;
    return { state: r, lines, total, pvalOut: amt, cat, gkey, br: rate };
  }

  // MORTGAGE
  if (cat === 'mortgage') {
    const ln = Number(v.loan) || 0, pv = Number(v.mortprop) || 0;
    if (!ln) return { error: "Please enter loan amount." };
    const mr = r.mortgage || 0.5, duty = ln * (mr / 100);
    lines.push({ n: 'Loan amount', r: '—', v: ln });
    lines.push({ n: 'Stamp duty', r: pct(mr), v: duty });
    let rf = (pv || ln) * (r.reg / 100); if (r.regCap && rf > r.regCap) rf = r.regCap;
    lines.push({ n: 'Registration fee', r: pct(r.reg), v: rf });
    total = duty + rf;
    return { state: r, lines, total, pvalOut: ln, cat, gkey, br: mr };
  }

  // LEASE
  if (cat === 'lease') {
    const adv = Number(v.advance) || 0;
    const rentInput = Number(v.rent) || 0;
    const periodType = v.leasePeriodType || 'months';
    const periodVal = Math.max(1, Number(v.leasemonths) || 1);
    if (!rentInput && !adv) return { error: "Please enter rent or advance." };

    let totalMonths, annualRent;
    if (periodType === 'years') {
      totalMonths = periodVal * 12;
      annualRent = rentInput;
    } else {
      totalMonths = periodVal;
      annualRent = rentInput * 12;
    }
    const totalYears = totalMonths / 12;
    const monthlyRent = annualRent / 12;

    let duty = 0, regMandatory = false, regFee = 0;

    if (sk === 'MH') {
      const totalRent = monthlyRent * totalMonths;
      const notionalInterest = adv * 0.10 * totalYears;
      const taxBase = totalRent + notionalInterest;
      const rate = totalMonths <= 60 ? 0.25 : 0.5;
      duty = pctOf(rate, taxBase);
      if (duty < 100) duty = 100;
      regMandatory = true;
      regFee = Math.min(1000, Math.max(1000, taxBase * 0.01));
      lines.push({ n: 'Total rent for period', r: '—', v: totalRent });
      if (adv > 0) lines.push({ n: 'Notional interest on deposit', r: '—', v: notionalInterest });
      lines.push({ n: 'Taxable base', r: '—', v: taxBase });
      lines.push({ n: 'Stamp duty (Art.36A MSA)', r: rate + '%', v: duty });
    } else if (sk === 'DL') {
      if (totalMonths <= 11) { duty = 50; regMandatory = false; }
      else if (totalYears <= 5) { duty = pctOf(2, annualRent + adv); regMandatory = true; }
      else { duty = pctOf(3, annualRent + adv); regMandatory = true; }
      lines.push({ n: 'Annual rent', r: '—', v: annualRent });
      lines.push({ n: 'Stamp duty', r: totalMonths <= 11 ? '₹50 fixed' : pct(totalYears <= 5 ? 2 : 3), v: duty });
      regFee = totalMonths > 11 ? 1100 : 0;
    } else if (sk === 'KA') {
      if (totalMonths <= 11) { duty = 20; regMandatory = false; }
      else if (totalYears <= 5) { duty = Math.max(500, pctOf(1, annualRent + adv)); regMandatory = true; }
      else { duty = pctOf(2, annualRent + adv); regMandatory = true; }
      lines.push({ n: 'Annual rent', r: '—', v: annualRent });
      lines.push({ n: 'Stamp duty', r: totalMonths <= 11 ? '₹20 fixed' : pct(totalYears <= 5 ? 1 : 2), v: duty });
      regFee = totalMonths > 11 ? Math.min(5000, (annualRent + adv) * 0.01) : 0;
    } else if (sk === 'TN') {
      const base = (monthlyRent * totalMonths) + adv;
      duty = pctOf(1, base);
      let regMandatory = totalMonths > 11;
      regFee = totalMonths > 11 ? Math.min(20000, base * 0.04) : 0;
      lines.push({ n: 'Total rent + deposit base', r: '—', v: base });
      lines.push({ n: 'Stamp duty', r: '1%', v: duty });
    } else {
      // General ISA logic
      const base = annualRent + adv;
      if (totalMonths <= 11) {
        duty = 200;
        regMandatory = false;
      } else if (totalYears <= 5) {
        duty = pctOf(2, base); regMandatory = true;
      } else if (totalYears <= 10) {
        duty = pctOf(3, base); regMandatory = true;
      } else if (totalYears <= 20) {
        duty = pctOf(4, base); regMandatory = true;
      } else {
        duty = pctOf(5, base); regMandatory = true;
      }
      lines.push({ n: 'Annual rent', r: '—', v: annualRent });
      if (adv > 0) lines.push({ n: 'Advance / Deposit', r: '—', v: adv });
      lines.push({ n: `Stamp duty (ISA Art.35)`, r: totalMonths <= 11 ? '₹200 fixed' : pct(totalYears <= 5 ? 2 : totalYears <= 10 ? 3 : totalYears <= 20 ? 4 : 5), v: duty });
      regFee = regMandatory ? Math.min((r.regCap || Infinity), (annualRent + adv) * (r.reg / 100)) : 0;
    }

    if (regMandatory && regFee > 0) {
      lines.push({ n: `Registration fee`, r: '—', v: regFee });
    } else if (!regMandatory) {
      lines.push({ n: 'Registration', r: 'Not compulsory', v: 0 });
    }

    total = duty + (regMandatory ? regFee : 0);
    return { state: r, lines, total, pvalOut: annualRent + adv, cat, gkey, br: 0 };
  }

  // PARTITION
  if (cat === 'partition') {
    const pv = Number(v.partval) || 0, ns = Math.max(2, Number(v.nshares) || 2);
    if (!pv) return { error: "Please enter total property value." };
    const sv1 = pv / ns, pr = r.partition || 2, duty = sv1 * (pr / 100);
    lines.push({ n: 'Total property value', r: '—', v: pv, note: `${ns} co-owners` });
    lines.push({ n: "Each party's share value", r: '—', v: sv1 });
    lines.push({ n: 'Stamp duty on share', r: pct(pr), v: duty });
    const rf = sv1 * (r.reg / 100);
    lines.push({ n: 'Registration fee', r: pct(r.reg), v: rf });
    total = duty + rf;
    return { state: r, lines, total, pvalOut: sv1, cat, gkey, br: pr };
  }

  // CONVEYANCE FAMILY
  const pvRaw = Number(v.pval) || 0, cvRaw = Number(v.circle) || 0;
  if (!pvRaw) return { error: "Please enter the property / asset value." };
  const ptype = v.ptype || 'residential';
  const pval = Math.max(pvRaw, cvRaw);
  if (cvRaw > pvRaw) lines.push({ n: 'Circle rate applied (higher)', r: '—', v: cvRaw });

  let sd = 0, br = 0;
  if (cat === 'gift_prop') {
    br = r.gift[gkey] || r.gift.male; sd = pval * (br / 100);
    lines.push({ n: 'Stamp duty — Gift deed', r: pct(br), v: sd });
  } else if (cat === 'agreement_sale' || cat === 'development') {
    br = 0.1; sd = pval * (br / 100);
    lines.push({ n: 'Stamp duty', r: '0.1%', v: sd });
  } else if (cat === 'construction') {
    br = 0.5; sd = pval * (br / 100);
    lines.push({ n: 'Stamp duty', r: '0.5%', v: sd });
  } else {
    if (r.useSlab) { sd = slabCalc(pval, r.slabs, gkey); br = sd / pval * 100; }
    else { br = r.base[gkey] || r.base.male; sd = pval * (br / 100); }
    lines.push({ n: 'Stamp duty — ' + r.name, r: pct(br), v: sd });
  }
  if (r.surcharge) { const sc = sd * (r.surcharge / 100); lines.push({ n: `Surcharge (${r.surcharge}%)`, r: r.surcharge + '%', v: sc }); sd += sc; }
  if (r.transfer && ptype !== 'agricultural' && (cat === 'sale' || cat === 'exchange')) {
    const td = pval * (r.transfer / 100); lines.push({ n: 'Transfer duty', r: pct(r.transfer), v: td }); sd += td;
  }
  if (r.extras) {
    for (const ex of r.extras) {
      if (ex.excludeAgri && ptype === 'agricultural') continue;
      const ev = pval * (ex.rate / 100); lines.push({ n: ex.name, r: pct(ex.rate), v: ev }); sd += ev;
    }
  }
  let rf = pval * (r.reg / 100); if (r.regCap && rf > r.regCap) rf = r.regCap;
  lines.push({ n: 'Registration fee', r: pct(r.reg), v: rf });
  total = sd + rf;
  
  return { state: r, lines, total, pvalOut: pval, cat, gkey, br, eff: (total / pval * 100) };
};
