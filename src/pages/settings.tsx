import SignOutButton from "@/components/auth/sign-out-button";
import ChangeLanguageButton from "@/components/general/change-language-button";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function SettingsPage() {
    const { t } = useTranslation();

    return (
        <div className="flex-1 flex justify-center">
            <div className="py-12 px-7 max-w-[900px] w-full">
                <Link to="/">
                    <Button variant="outlined">{t("Back")}</Button>
                </Link>
                <h1 className="text-3xl font-semibold">{t("Settings")}</h1>

                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4 items-start">
                        <div className="flex flex-col gap-1">
                            <h2 className="m-0 font-semibold text-xl">{t("Sign Out")}</h2>
                            <p className="m-0 text-gray-500 dark:text-gray-400">{t("Sign out of your account.")}</p>
                        </div>
                        <SignOutButton />
                    </div>
                    <div className="flex flex-col gap-4 items-start">
                        <div className="flex flex-col gap-1">
                            <h2 className="m-0 font-semibold text-xl">{t("Change language")}</h2>
                            <p className="m-0 text-gray-500 dark:text-gray-400">
                                {t("Change the language of the app.")}
                            </p>
                        </div>
                        <ChangeLanguageButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
