export const capitalize = () => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatPhoneNumber = (phoneNumber) => {
  const formattedPhoneNumber = phoneNumber.match(/.{1,2}/g).join("-");
  return formattedPhoneNumber;
};
