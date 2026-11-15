import { User } from "@/types/user";
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
    ListItemText
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PinnedUsersProps } from ".";

export default function PinnedUsersDialog({ pinnedUsers, onPinnedUsersChange }: PinnedUsersProps) {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    const [users, setUsers] = useState<User[]>([]);

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

    const onListItemClick = (user: User) => {
        const updatedPinnedUsers = isPinned(user.id)
            ? pinnedUsers.filter((u) => u.id !== user.id)
            : [...pinnedUsers, user];

        onPinnedUsersChange(updatedPinnedUsers);
    };

    const onOpen = () => setOpen(true);

    const onClose = () => setOpen(false);

    return (
        <>
            <button
                className="bg-inherit flex items-center justify-center border-gray-500 border border-solid cursor-pointer w-7 h-7 rounded-full"
                onClick={onOpen}
            >
                <SwapVert className="w-4 h-4" />
            </button>
            <Dialog onClose={onClose} open={open}>
                <DialogTitle sx={{ pb: 0 }}>{t("Pinned Users")}</DialogTitle>

                <List>
                    {users.map((user) => (
                        <ListItem sx={{ py: 0 }} disableGutters key={user.id}>
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
        </>
    );
}
