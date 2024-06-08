import React from "react";
import { FunctionalForm } from "./FunctionalForm";
import ProfileInformation from "../ProfileInformation";
import "../App.css";

const defaultUser = {
  email: "default@default.com",
  firstName: "Default",
  lastName: "Default",
  phone: "1234567",
  city: "Hobbiton",
};

export const FunctionalApp = () => {
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={defaultUser} />
      <FunctionalForm />
    </>
  );
};

export default FunctionalApp;
