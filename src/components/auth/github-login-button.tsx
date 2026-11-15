import { auth, db, githubProvider } from "@/utils/firebase";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
export default function GithubLoginButton() {
    const { t } = useTranslation();

    const handleGitHubLogin = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const user = result.user;

            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            if (!docSnap.exists()) {
                await setDoc(userRef, {
                    displayName: user.displayName || user.email,
                    photoURL: user.photoURL
                });
            }
        } catch (error) {
            console.error("Error logging in with GitHub:", error);
        }
    };

    return (
        <Button
            variant="contained"
            sx={{ background: "#18181b", fontWeight: "bold", gap: 1, ":hover": { background: "rgb(39 39 42)" } }}
            onClick={handleGitHubLogin}
        >
            <GitHubIcon /> {t("Login With Github")}
        </Button>
    );
}
