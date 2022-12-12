import React, { useState } from "react";
import DefaultModal from "./DefaultModal";
function LinkToModal() {
  const [modalOpaned, setModalOpaned] = useState(false);
  return (
    <div>
      <p onClick={() => setModalOpaned(true)}>Edit Profile</p>
      <DefaultModal
        modalOpaned={modalOpaned}
        setModalOpaned={setModalOpaned}
        data="Data goes here"
      />
    </div>
  );
}

export default LinkToModal;
