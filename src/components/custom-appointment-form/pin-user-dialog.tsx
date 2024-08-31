import { BasicUser } from "@/types/user";
import { db } from "@/utils/firebase";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SwapVert from "@mui/icons-material/SwapVert";
import {
    Avatar,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Tooltip
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function PinUserDialog({
    pinnedUsers,
    onPinnedUsersChange
}: {
    pinnedUsers: BasicUser[];
    onPinnedUsersChange: (users: BasicUser[]) => void;
}) {
    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    function SimpleDialog({ onClose, open }: { open: boolean; onClose: (value: string) => void }) {
        const [users, setUsers] = useState<BasicUser[]>([]);

        useEffect(() => {
            const usersCol = collection(db, "users");

            getDocs(usersCol).then((querySnapshot) => {
                const users = querySnapshot.docs.map((doc) => {
                    const data = doc.data();

                    return {
                        id: doc.id,
                        displayName: data.displayName,
                        photoURL: data.photoURL
                    };
                });

                setUsers(users);
            });
        }, []);

        const isPinned = (userId: string) => {
            return pinnedUsers.find((user) => user.id === userId);
        };

        const onListItemClick = (user: BasicUser) => {
            const updatedPinnedUsers = isPinned(user.id)
                ? pinnedUsers.filter((u) => u.id !== user.id)
                : [...pinnedUsers, user];

            onPinnedUsersChange(updatedPinnedUsers);
        };

        return (
            <Dialog onClose={onClose} open={open}>
                <DialogTitle>Pinned Users</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {users.map((user) => (
                        <ListItem disableGutters key={user.id}>
                            <ListItemButton onClick={() => onListItemClick(user)}>
                                {isPinned(user.id) ? (
                                    <RemoveIcon sx={{ marginRight: "10px" }} color="warning" />
                                ) : (
                                    <AddIcon sx={{ marginRight: "10px" }} color="action" />
                                )}
                                <ListItemAvatar>
                                    <Avatar src={user.photoURL}>{user.displayName[0].toUpperCase()}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={user.displayName} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        );
    }

    return (
        <div>
            <div className="flex gap-2 items-center">
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
                    className="bg-inherit flex items-center justify-center border-gray-500 border cursor-pointer w-7 h-7 rounded-full"
                    onClick={onOpen}
                >
                    <SwapVert className="w-4 h-4" />
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {pinnedUsers.map((user) => (
                    <Tooltip arrow title={user.displayName}>
                        <Avatar className="cursor-pointer" src={user.photoURL} key={user.id}>
                            {user.displayName[0].toUpperCase()}
                        </Avatar>
                    </Tooltip>
                ))}
            </div>
            <SimpleDialog open={open} onClose={onClose} />
        </div>
    );
}
