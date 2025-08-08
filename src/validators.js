function validateName(name) {
  return /^[A-Za-z\s]+$/.test(name.trim());
}

function validateEmail(email) {
  return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

function validatePhone(phone) {
  return /^[6-9]\d{9}$/.test(phone.trim());
}

function validatePassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

module.exports = {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword
};
