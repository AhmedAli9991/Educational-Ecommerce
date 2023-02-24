module.exports.cardValidation = (card, pin, expiry) => {
  if (!/^(?:[0-9]{11}|[0-9]{2}-[0-9]{3}-[0-9]{6})$/.test(card)) {
    return { isValid: false, message: "not valid account number" };
  }
  if (pin != 4 || isNaN(pin))
    return { isValid: false, message: "pin not valid" };
  var exp = new Date(expiry);
  if (exp < Date.now()) return { isValid: false, message: "expired card" };

  return { isValid: true, message: "valid card credentials" };
};
