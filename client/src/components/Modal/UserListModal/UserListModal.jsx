import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./UserListModal.css";
import UserItem from "./UserItem/UserItem";
function UserListModal({ modalOpaned, setModalOpaned, userListsId, type }) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="35%"
      opened={modalOpaned}
      onClose={() => setModalOpaned(false)}
      title={type === "followings" ? "Following" : "Followers"}
      centered="true"
    >
      <ul className="UserListModal-list">
        {userListsId.map((userId) => (
          <UserItem userId={userId} type={type} key={userId} />
        ))}
      </ul>
    </Modal>
  );
}

export default UserListModal;
