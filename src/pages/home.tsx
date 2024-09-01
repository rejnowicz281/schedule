import Calendar from "@/components/calendar";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function HomePage() {
    const { t } = useTranslation();

    return (
        <>
            <Link className="absolute top-3 right-6 z-10" to="/settings">
                <Button variant="outlined">{t("Settings")}</Button>
            </Link>
            <Calendar />
        </>
    );
}
