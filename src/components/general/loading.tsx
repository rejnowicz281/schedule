import { CircularProgress } from "@mui/material";

export default function Loading({ spinnerSize = 50 }) {
    return (
        <div className="flex-1 flex justify-center items-center">
            <CircularProgress size={spinnerSize} />
        </div>
    );
}
