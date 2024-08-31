import { auth, db, githubProvider } from "@/utils/firebase";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function LoginPage() {
    const handleGitHubLogin = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const user = result.user;

            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            if (!docSnap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName || user.email,
                    photoURL: user.photoURL,
                    createdAt: new Date()
                });
            }
        } catch (error) {
            console.error("Error logging in with GitHub:", error);
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
