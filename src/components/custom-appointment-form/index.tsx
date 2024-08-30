import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import PinUserDialog from "./pin-user-dialog";

export default function CustomAppointmentForm({ onFieldChange, appointmentData, ...restProps }) {
    return (
        <AppointmentForm.BasicLayout appointmentData={appointmentData} onFieldChange={onFieldChange} {...restProps}>
            <PinUserDialog />
        </AppointmentForm.BasicLayout>
    );
}
