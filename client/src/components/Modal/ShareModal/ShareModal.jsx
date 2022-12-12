import { Modal, useMantineTheme } from "@mantine/core";
import PostShare from "../../Helper/Post/PostShare/PostShare";

function ShareModal({ modalOpaned, setModalOpaned }) {
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
      size="60rem"
      padding="3rem"
      opened={modalOpaned}
      onClose={() => setModalOpaned(false)}
    >
      <div>
        <PostShare />
      </div>
    </Modal>
  );
}

export default ShareModal;
