async function validateField(value, maxLength, isName) {

    if (!value || value === '') {
        return `${isName} is required`;
      } else if (value.length === 1) {
        return "Input must not contain a single letter.";
      } else if (value.length > maxLength) {
        return `Input should contain less than ${maxLength} characters.`;
      }  else if (/^\s+$/.test(value)) {
        return "Input must not contain spaces only.";
      }
  
    return '';
  }
// Validate normal text input
async function validateText(value, maxLength, isName) {
    if (!value.trim()) {
        return `${isName} is required`;
      } else if (value.length === 1) {
        return "Input must not contain a single character.";
      } else if (value.length > maxLength) {
        return `Input should contain less than ${maxLength} characters.`;
      } else if (!/^[\w\s.]+$/.test(value)) {
        return "Special characters are not allowed";
      } else if (/^\s+$/.test(value)) {
        return "Input must not contain spaces only.";
      } else if (/\d/.test(value)) {
        return "Numbers are not allowed.";
      }

    return '';
  }
  
  // Validate numbers
  async function validateNumber(value, fieldName) {
    if (!value && value !== 0) {
        return `${fieldName} is required`;
      } else if (isNaN(value)) {
        return "Input must be a valid number.";
      } else if ( value <= 0) {
        return "Number must be greater than 0.";
      }
    return '';
  }
  
  // Validate cellphone numbers
  async function validateCellphoneNumber(value, fieldName) {
    if (!value || value === '') {
        return `${fieldName} is required`;
      } else if (!/^[9]\d{9}$/.test(value)) {
        return "Invalid cellphone number. It should start with '9' and have a total length of 10 digits.";
      }
  
    return '';
  }
  export { validateText, validateNumber, validateCellphoneNumber,validateField };
