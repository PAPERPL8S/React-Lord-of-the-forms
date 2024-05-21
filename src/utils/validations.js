export function isEmailValid(emailAddress) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isCityValid(city) {
  const regex = /^[a-zA-Z\s]*$/;
  return !!city.match(regex);
}

export function isPhoneValid(phone) {
  const regex = /^[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]$/;
  return !!phone.match(regex);
}
