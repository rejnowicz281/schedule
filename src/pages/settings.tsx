import SignOutButton from "@/components/auth/sign-out-button";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function SettingsPage() {
    return (
        <div className="flex-1 flex justify-center">
            <div className="py-12 px-7 max-w-[900px] w-full">
                <Link to="/">
                    <Button variant="outlined">Back</Button>
                </Link>
                <h1 className="text-3xl font-semibold">Settings</h1>

                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4 items-start">
                        <div className="flex flex-col gap-1">
                            <h2 className="m-0 font-semibold text-xl">Sign out</h2>
                            <p className="m-0 text-gray-500 dark:text-gray-400">Sign out of your account.</p>
                        </div>
                        <SignOutButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
