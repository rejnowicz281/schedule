import { auth, githubProvider } from "@/utils/firebase";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";

export default function LoginPage() {
    const handleGitHubLogin = async () => {
        try {
            await signInWithPopup(auth, githubProvider);
        } catch (error) {
            console.error("GitHub Login Error:", error);
        }
    };

    return (
        <div className="flex-1 flex justify-center items-center">
            <Button variant="contained" onClick={handleGitHubLogin}>
                Login with GitHub
            </Button>
        </div>
    );
}
