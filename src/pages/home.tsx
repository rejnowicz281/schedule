import Calendar from "@/components/calendar";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <>
            <Link to="/settings">
                <Button className="absolute top-3 right-6 z-10" variant="outlined">
                    Settings
                </Button>
            </Link>
            <Calendar />
        </>
    );
}
