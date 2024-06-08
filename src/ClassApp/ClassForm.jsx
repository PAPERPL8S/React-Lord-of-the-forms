import React, { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import "../index.css";
import "../App.css";
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

class TextInput extends Component {
  render() {
    const { label, name, placeholder, value, onChange, refProp } = this.props;
    return (
      <div className="input-wrap">
        <label htmlFor={name}>{label}</label>
        <input
          type="text"
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={refProp}
        />
      </div>
    );
  }
}

class PhoneInput extends Component {
  render() {
    const { label, phone, onChange, refs } = this.props;

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
          <span>-</span>
          <input
            type="text"
            id="phone-input-2"
            value={phone[1]}
            onChange={(e) => onChange(e, 1)}
            placeholder="55"
            ref={refs[1]}
          />
          <span>-</span>
          <input
            type="text"
            id="phone-input-3"
            value={phone[2]}
            onChange={(e) => onChange(e, 2)}
            placeholder="55"
            ref={refs[2]}
          />
          <span>-</span>
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
  }
}

class ClassForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        phone: ["", "", "", ""],
      },
      errors: {},
      submitted: false,
    };
    this.sectionRefs = Array(11)
      .fill()
      .map(() => createRef());
    this.handleChange = this.handleChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { userData } = this.props;
    if (userData) {
      this.setState({
        formData: {
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          city: userData.city || "",
          phone: userData.phone
            ? (Array.isArray(userData.phone)
                ? userData.phone
                : userData.phone.match(/.{1,2}/g)) || ["", "", "", ""]
            : ["", "", "", ""],
        },
      });
    }
  }

  handleChange(e, sectionIndex) {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const formData = { ...prevState.formData, [name]: value };
      if (value.length === 80 && sectionIndex < 3) {
        const nextSectionIndex = sectionIndex + 1;
        this.sectionRefs[nextSectionIndex].current.focus();
      }

      if (value === "" && sectionIndex > 0) {
        const prevSectionIndex = sectionIndex - 1;
        this.sectionRefs[prevSectionIndex].current.focus();
      }

      return { formData };
    });
  }

  handlePhoneChange(e, index) {
    const { value } = e.target;
    const maxInputLengths = [2, 2, 2, 1];
    if (/^\d*$/.test(value) && value.length <= maxInputLengths[index]) {
      this.setState((prevState) => {
        const phone = [...prevState.formData.phone];
        phone[index] = value;

        if (value.length === maxInputLengths[index] && index < 3) {
          const nextIndex = index + 1;
          this.sectionRefs[nextIndex + 4].current.focus();
        }

        if (value === "" && index > 0) {
          const prevIndex = index - 1;
          this.sectionRefs[prevIndex + 4].current.focus();
        }

        return { formData: { ...prevState.formData, phone } };
      });
    }
  }

  validate() {
    const newErrors = {};
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
        validate: (value) => isPhoneValid(this.convertToString(value)),
        errorMessage: phoneNumberErrorMessage,
      },
    ];

    validationRules.forEach(({ field, validate, errorMessage }) => {
      const value = this.convertToString(this.state.formData[field]);
      if (!validate(value)) {
        newErrors[field] = errorMessage;
      }
    });

    this.setState({ errors: newErrors });
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    if (this.validate()) {
      alert("Form submitted successfully!");
    } else {
      alert("Error Detected");
    }
  }

  convertToString(value) {
    if (Array.isArray(value)) {
      return value.join("");
    } else if (typeof value === "string" || value instanceof String) {
      return value;
    } else {
      return "";
    }
  }

  render() {
    const { formData, errors, submitted } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>
        <TextInput
          label="First Name:"
          name="firstName"
          placeholder="Bilbo"
          value={formData.firstName}
          onChange={(e) => this.handleChange(e, 0)}
          refProp={this.sectionRefs[0]}
        />
        {submitted && errors.firstName && (
          <ErrorMessage message={errors.firstName} show={true} />
        )}

        <TextInput
          label="Last Name:"
          name="lastName"
          placeholder="Baggins"
          value={formData.lastName}
          onChange={(e) => this.handleChange(e, 1)}
          refProp={this.sectionRefs[1]}
        />
        {submitted && errors.lastName && (
          <ErrorMessage message={errors.lastName} show={true} />
        )}

        <TextInput
          label="Email:"
          name="email"
          placeholder="bilbo-baggins@adventurehobbits.net"
          value={formData.email}
          onChange={(e) => this.handleChange(e, 2)}
          refProp={this.sectionRefs[2]}
        />
        {submitted && errors.email && (
          <ErrorMessage message={errors.email} show={true} />
        )}

        <TextInput
          label="City:"
          name="city"
          placeholder="Hobbiton"
          value={formData.city}
          onChange={(e) => this.handleChange(e, 3)}
          refProp={this.sectionRefs[3]}
        />
        {submitted && errors.city && (
          <ErrorMessage message={errors.city} show={true} />
        )}

        <PhoneInput
          label="Phone:"
          phone={this.state.formData.phone}
          onChange={this.handlePhoneChange}
          refs={this.sectionRefs.slice(4, 8)}
        />
        {submitted && errors.phone && (
          <ErrorMessage message={errors.phone} show={true} />
        )}

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default ClassForm;
