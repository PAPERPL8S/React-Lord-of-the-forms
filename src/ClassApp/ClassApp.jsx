import React, { Component } from "react";
import ClassForm from "./ClassForm";
import ProfileInformation from "../ProfileInformation";
import "../App.css";

const defaultUser = {
  email: "default@default.com",
  firstName: "Default",
  lastName: "Default",
  phone: "1234567",
  city: "Hobbiton",
};

class ClassApp extends Component {
  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={defaultUser} />
        <ClassForm />
      </>
    );
  }
}

export default ClassApp;
