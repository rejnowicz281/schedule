import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ChangeLanguageButton() {
    const { i18n } = useTranslation();

    return (
        <Button variant="contained" onClick={() => i18n.changeLanguage(i18n.language === "en" ? "pl" : "en")}>
            {i18n.language === "en" ? "English" : "Polski"}
        </Button>
    );
}
