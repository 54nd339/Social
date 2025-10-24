import React, { useState } from "react";
import Header from "../components/Header";
import SettingsForm from "../components/SettingsForm";

function Settings({ user }) {
  const [userData, setUserData] = useState(user);

  return (
    <div>
      <Header user={userData} />
      <SettingsForm user={userData} setUser={setUserData} />
    </div>
  );
}

export default Settings;
