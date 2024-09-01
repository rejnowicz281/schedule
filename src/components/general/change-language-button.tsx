import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ChangeLanguageButton() {
    const { i18n } = useTranslation();

    return (
        <Button variant="contained" onClick={() => i18n.changeLanguage(i18n.language === "en-US" ? "pl-PL" : "en-US")}>
            {i18n.language === "en-US" ? "English" : "Polski"}
        </Button>
    );
}
