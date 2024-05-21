import React, { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import {
  isEmailValid,
  isCityValid,
  isPhoneValid,
} from "../utils/validations.js";

const firstNameErrorMessage =
  "First name must be at least 2 characters long and should not contain numbers";
const lastNameErrorMessage =
  "Last name must be at least 2 characters long and should not contain numbers";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: ["", "", "", ""],
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (e, index) => {
    const { value } = e.target;
    const phone = [...formData.phone];
    if (
      /^\d*$/.test(value) &&
      (index < 3 ? value.length <= 2 : value.length <= 1)
    ) {
      phone[index] = value;
      setFormData({ ...formData, phone });
    }
  };

  const validationRules = [
    {
      field: "firstName",
      validate: (value) => value.length >= 2 && !/\d/.test(value),
      errorMessage: firstNameErrorMessage,
    },
    {
      field: "lastName",
      validate: (value) => value.length >= 2 && !/\d/.test(value),
      errorMessage: lastNameErrorMessage,
    },
    {
      field: "email",
      validate: isEmailValid,
      errorMessage: emailErrorMessage,
    },
    {
      field: "city",
      validate: isCityValid,
      errorMessage: cityErrorMessage,
    },
    {
      field: "phone",
      validate: (value) => isPhoneValid(value.join("")),
      errorMessage: phoneNumberErrorMessage,
    },
  ];

  const validate = () => {
    const newErrors = {};

    validationRules.forEach(({ field, validate, errorMessage }) => {
      const value = field === "phone" ? formData.phone : formData[field];
      if (!validate(value)) {
        newErrors[field] = errorMessage;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validate()) {
      alert("Form submitted successfully!");
    } else {
      alert("Error Detected");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      <FunctionalTextInput
        label="First Name"
        name="firstName"
        placeholder="Bilbo"
        value={formData.firstName}
        onChange={handleChange}
      />
      {submitted && errors.firstName && (
        <ErrorMessage message={errors.firstName} show={true} />
      )}

      <FunctionalTextInput
        label="Last Name"
        name="lastName"
        placeholder="Baggins"
        value={formData.lastName}
        onChange={handleChange}
      />
      {submitted && errors.lastName && (
        <ErrorMessage message={errors.lastName} show={true} />
      )}

      <FunctionalTextInput
        label="Email"
        name="email"
        placeholder="bilbo-baggins@adventurehobbits.net"
        value={formData.email}
        onChange={handleChange}
      />
      {submitted && errors.email && (
        <ErrorMessage message={errors.email} show={true} />
      )}

      <FunctionalTextInput
        label="City"
        name="city"
        placeholder="Hobbiton"
        value={formData.city}
        onChange={handleChange}
      />
      {submitted && errors.city && (
        <ErrorMessage message={errors.city} show={true} />
      )}

      <FunctionalPhoneInput
        label="Phone"
        phone={formData.phone}
        onChange={handlePhoneChange}
      />
      {submitted && errors.phone && (
        <ErrorMessage message={errors.phone} show={true} />
      )}

      <input type="submit" value="Submit" />
    </form>
  );
};

export const FunctionalTextInput = ({
  label,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const FunctionalPhoneInput = ({ label, phone, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="text" value={phone[0]} onChange={(e) => onChange(e, 0)} />
      <input type="text" value={phone[1]} onChange={(e) => onChange(e, 1)} />
      <input type="text" value={phone[2]} onChange={(e) => onChange(e, 2)} />
      <input type="text" value={phone[3]} onChange={(e) => onChange(e, 3)} />
    </div>
  );
};
