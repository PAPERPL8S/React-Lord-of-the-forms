import React, { useState, useEffect, useRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import "../index.css";
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

const convertToString = (value) => {
  if (Array.isArray(value)) {
    return value.join("");
  } else if (typeof value === "string" || value instanceof String) {
    return value;
  } else {
    return "";
  }
};

export const FunctionalForm = ({ userData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: ["", "", "", ""],
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        city: userData.city || "",
        phone: userData.phone
          ? (Array.isArray(userData.phone)
              ? userData.phone
              : userData.phone.match(/.{1,2}/g)) || ["", "", "", ""]
          : ["", "", "", ""],
      });
    }
  }, [userData]);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleChange = (e, sectionIndex) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      updatedFormData[name] = value;

      if (value.length === 80 && sectionIndex < 3) {
        const nextSectionIndex = sectionIndex + 1;
        const nextSectionRef = sectionRefs[nextSectionIndex];
        nextSectionRef.current.focus();
      }

      if (value === "" && sectionIndex > 0) {
        const prevSectionIndex = sectionIndex - 1;
        const prevSectionRef = sectionRefs[prevSectionIndex];
        prevSectionRef.current.focus();
      }

      return updatedFormData;
    });
  };

  const handlePhoneChange = (e, index) => {
    const { value } = e.target;
    const phone = [...formData.phone];
    if (
      /^\d*$/.test(value) &&
      (index < 3 ? value.length <= 2 : value.length <= 4)
    ) {
      phone[index] = value;
      setFormData({ ...formData, phone });

      if (value.length === (index < 3 ? 2 : 4) && index < 3) {
        const nextIndex = index + 1;
        sectionRefs[nextIndex + 4].current.focus();
      }

      if (value === "" && index > 0) {
        const prevIndex = index - 1;
        sectionRefs[prevIndex + 4].current.focus();
      }
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
      validate: (value) => isPhoneValid(convertToString(value)),
      errorMessage: phoneNumberErrorMessage,
    },
  ];

  const validate = () => {
    const newErrors = {};

    validationRules.forEach(({ field, validate, errorMessage }) => {
      const value = convertToString(formData[field]);
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
        label="First Name:"
        name="firstName"
        placeholder="Bilbo"
        value={formData.firstName}
        onChange={(e) => handleChange(e, 0)}
        ref={sectionRefs[0]}
      />
      {submitted && errors.firstName && (
        <ErrorMessage message={errors.firstName} show={true} />
      )}

      <FunctionalTextInput
        label="Last Name:"
        name="lastName"
        placeholder="Baggins"
        value={formData.lastName}
        onChange={(e) => handleChange(e, 1)}
        ref={sectionRefs[1]}
      />
      {submitted && errors.lastName && (
        <ErrorMessage message={errors.lastName} show={true} />
      )}

      <FunctionalTextInput
        label="Email:"
        name="email"
        placeholder="bilbo-baggins@adventurehobbits.net"
        value={formData.email}
        onChange={(e) => handleChange(e, 2)}
        ref={sectionRefs[2]}
      />
      {submitted && errors.email && (
        <ErrorMessage message={errors.email} show={true} />
      )}

      <FunctionalTextInput
        label="City:"
        name="city"
        placeholder="Hobbiton"
        value={formData.city}
        onChange={(e) => handleChange(e, 3)}
        ref={sectionRefs[3]}
      />
      {submitted && errors.city && (
        <ErrorMessage message={errors.city} show={true} />
      )}

      <FunctionalPhoneInput
        label="Phone:"
        phone={formData.phone}
        onChange={handlePhoneChange}
        refs={sectionRefs.slice(4, 8)}
      />
      {submitted && errors.phone && (
        <ErrorMessage message={errors.phone} show={true} />
      )}

      <input type="submit" value="Submit" />
    </form>
  );
};

export const FunctionalTextInput = React.forwardRef(
  ({ label, name, placeholder, value, onChange }, ref) => (
    <div className="input-wrap">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref}
      />
    </div>
  ),
);

export const FunctionalPhoneInput = ({ label, phone, onChange, refs }) => {
  return (
    <div className="input-wrap">
      <label htmlFor="phone">{label}</label>
      <div id="phone-input-wrap">
        <input
          type="text"
          id="phone-input-1"
          value={phone[0]}
          onChange={(e) => onChange(e, 0)}
          placeholder="55"
          ref={refs[0]}
        />
        -
        <input
          type="text"
          id="phone-input-2"
          value={phone[1]}
          onChange={(e) => onChange(e, 1)}
          placeholder="55"
          ref={refs[1]}
        />
        -
        <input
          type="text"
          id="phone-input-3"
          value={phone[2]}
          onChange={(e) => onChange(e, 2)}
          placeholder="55"
          ref={refs[2]}
        />
        -
        <input
          type="text"
          id="phone-input-4"
          value={phone[3]}
          onChange={(e) => onChange(e, 3)}
          placeholder="5"
          ref={refs[3]}
        />
      </div>
    </div>
  );
};

export default FunctionalForm;
