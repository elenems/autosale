exports.validateCarAge = age => {
  const minAge = 1900;
  const maxAge = new Date().getFullYear();

  if(!age.length){
    return {valid:false,
            message: "Must not be empty"}
  }

  if (age > maxAge) {
    return {
      valid: false,
      message: "Age can't be grater than present year"
    };
  }

  if (age < minAge) {
    return {
      valid: false,
      message: `Can't add a car with age less than 1900`
    };
  }
  return { valid: true };
};

exports.validateCarPrice = price => {
  const minPrice = 0;
  const maxPrice = 1000000000000;

  if(!price.length){
    return {valid:false,
            message: "Must not be empty"}
  }

  if (price < minPrice) {
    return {
      valid: false,
      message: "Price can't be negative"
    };
  }

  if (price > maxPrice) {
    return {
      valid: false,
      message: "Price bigger than can be"
    };
  }

  return { valid: true };
};
exports.validateEmail = email => {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.trim().length === 0) {
    return {
      valid: false,
      message: "Please enter an email adress"
    };
  }

  if (!email.match(regEx)) {
    return {
      valid: false,
      message: "Email is incorrect"
    };
  }

  return { valid: true };
};

exports.validatePassword = (password, confirmPassword) => {
  if (password.length < 8) {
    return {
      valid: false,
      message: "Password must contain at least 8 characters"
    };
  }
  if (password.length > 24) {
    return {
      valid: false,
      message: "Password must be less than 25 characters"
    };
  }
  if (confirmPassword) {
    if (password !== confirmPassword) {
      return {
        valid: false,
        message: "Passwords does not match!"
      };
    }
  }

  return { valid: true };
};

exports.validateCred = (cred) => {

  if(cred.length > 46){
    return {
      valid: false,
      message: 'To many letters'
    }
  }

  return {valid: true};
}

exports.validatePhone = (phone) => {
  const regex = /\d{10}/g
  phone += '';
  if(!phone.match(regex)){
    return {
      valid:false,
      message: 'Invalid number'
    }
  }

  return {valid:true}
}

exports.isEmpty = (text) => {
  if(!text.length){
    return {valid:false, message: 'Must not be empty'}
  }
  return {valid:true}
}
