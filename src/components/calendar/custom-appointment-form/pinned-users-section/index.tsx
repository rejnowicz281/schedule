import { User } from "@/types/user";
import { Avatar, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import PinnedUsersDialog from "./dialog";

export type PinnedUsersProps = {
    pinnedUsers: User[];
    onPinnedUsersChange: (users: User[]) => void;
    readOnly?: boolean;
};

export default function PinnedUsersSection({ readOnly, pinnedUsers, onPinnedUsersChange }: PinnedUsersProps) {
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
                {!readOnly && <PinnedUsersDialog pinnedUsers={pinnedUsers} onPinnedUsersChange={onPinnedUsersChange} />}
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
        </div>
    );
}
