import Calendar from "@/components/calendar";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

export default function SchedulerPage() {
    return (
        <>
            <Link className="fixed bottom-4 right-6 z-10" to="/settings">
                <button className="group border border-solid cursor-pointer border-blue-500 bg-white w-16 h-16 rounded-full">
                    <SettingsIcon className="group-hover:text-blue-400 text-blue-500 transition-colors text-4xl" />
                </button>
            </Link>
            <Calendar />
        </>
    );
}
