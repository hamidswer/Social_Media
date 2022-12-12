import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./DefaultModal.css";

function DefaultModal({ modalOpaned, setModalOpaned, data }) {
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
      size="55%"
      opened={modalOpaned}
      onClose={() => setModalOpaned(false)}
    >
      <div>Code goes here</div>
    </Modal>
  );
}

export default DefaultModal;
