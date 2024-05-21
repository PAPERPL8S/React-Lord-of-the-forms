import { formatPhoneNumber } from "./utils/transformations.js";

export const InfoRow = ({ label, value }) => {
  return (
    <div>
      <span style={{ marginRight: 5 }}>
        <b>{label}:</b>
      </span>
      <span>{value}</span>
    </div>
  );
};

export const ProfileInformation = ({ userData }) => {
  if (!userData) {
    return (
      <>
        <u>
          <h3>Your Submitted User Information</h3>
        </u>
        <div className="user-info">
          <div>No information provided</div>
        </div>
      </>
    );
  }

  const { email, firstName, lastName, city, phone } = userData;
  const formattedPhone = formatPhoneNumber(phone);

  return (
    <>
      <u>
        <h3>Your Submitted User Information</h3>
      </u>
      <div className="user-info">
        <InfoRow label="Email" value={email} />
        <InfoRow label="First Name" value={firstName} />
        <InfoRow label="Last Name" value={lastName} />
        <InfoRow label="City" value={city} />
        <InfoRow label="Phone" value={formattedPhone} />
      </div>
    </>
  );
};
