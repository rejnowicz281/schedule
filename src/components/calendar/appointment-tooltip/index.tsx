import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import CustomAppointmentTooltipContent from "./content";
import CustomAppointmentTooltipHeader from "./header";

export default function CustomAppointmentTooltip() {
    return (
        <AppointmentTooltip
            contentComponent={CustomAppointmentTooltipContent}
            headerComponent={CustomAppointmentTooltipHeader}
            showCloseButton
        />
    );
}
