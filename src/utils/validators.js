export const validateCalculatorForm = (data) => {
  const errors = {};

  if (!data.state) errors.state = "Please select a state";
  if (!data.instrument) errors.instrument = "Please select a document type";
  
  if (!data.value || isNaN(data.value)) {
    errors.value = "Please enter a valid numeric value";
  } else if (Number(data.value) <= 0) {
    errors.value = "Value must be greater than zero";
  }

  return errors;
};

export const validateApiKey = (key) => {
  if (!key || key.trim().length === 0) return "API Key is required";
  if (key.trim().length < 20) return "Invalid API Key format";
  return null;
};
