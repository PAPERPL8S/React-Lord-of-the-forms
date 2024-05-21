export const ErrorMessage = ({ message, show }) => {
  return show ? <div className="error-message">{message}</div> : <div></div>;
};
