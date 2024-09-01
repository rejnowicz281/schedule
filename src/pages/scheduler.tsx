import Calendar from "@/components/calendar";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

export default function SchedulerPage() {
    return (
        <>
            <Link className="fixed bottom-4 right-6 z-10" to="/settings">
                <button className="border cursor-pointer border-blue-500 bg-white w-16 h-16 rounded-full">
                    <SettingsIcon color="primary" className="text-4xl" />
                </button>
            </Link>
            <Calendar />
        </>
    );
}
