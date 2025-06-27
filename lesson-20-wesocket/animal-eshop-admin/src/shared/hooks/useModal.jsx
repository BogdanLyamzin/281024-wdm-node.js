import { useState } from "react";

const useModal = ()=> {
    const [open, setOpen] = useState(false);

    const handleOpen = ()=> setOpen(true);
    const handleClose = ()=> setOpen(false);
    const handleToggle = ()=> setOpen(prevOpen => !prevOpen);

    return {
        open,
        setOpen,
        handleOpen,
        handleClose,
        handleToggle
    }
}

export default useModal;