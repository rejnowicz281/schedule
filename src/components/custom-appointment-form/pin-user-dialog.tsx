import AddIcon from "@mui/icons-material/Add";
import {
    Avatar,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

const emails = ["username@gmail.com", "user02@gmail.com"];

export default function PinUserDialog() {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <Typography
                sx={{
                    fontWeight: 700,
                    fontSize: "19px",
                    paddingBottom: "8px",
                    paddingTop: "16px"
                }}
            >
                Pinned Users
            </Typography>
            <button
                className="bg-inherit border-blue-500 cursor-pointer w-10 h-10 rounded-full"
                onClick={handleClickOpen}
            >
                <AddIcon />
            </button>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
        </div>
    );
}

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Pin Users</DialogTitle>
            <List sx={{ pt: 0 }}>
                {emails.map((email) => (
                    <ListItem disableGutters key={email}>
                        <ListItemButton onClick={() => handleListItemClick(email)}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: "white", color: "red" }}>{email[0].toUpperCase()}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={email} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}
