import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AppModal = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default AppModal;
