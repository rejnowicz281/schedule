import { auth } from "@/utils/firebase";
import { Button } from "@mui/material";

export default function SignOutButton() {
    return (
        <Button variant="contained" onClick={() => auth.signOut()}>
            Sign Out
        </Button>
    );
}
