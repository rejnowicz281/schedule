import { auth } from "@/utils/firebase";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function SignOutButton() {
    const { t } = useTranslation();

    return (
        <Button variant="contained" onClick={() => auth.signOut()}>
            {t("Sign Out")}
        </Button>
    );
}
