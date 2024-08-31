import { BasicUser } from "@/types/user";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import PinUserDialog from "./pin-user-dialog";

export default function CustomAppointmentForm({
    appointmentData,
    onFieldChange,
    ...restProps
}: AppointmentForm.BasicLayoutProps) {
    const handlePinnedUsersChange = (pinnedUsers: BasicUser[]) => {
        onFieldChange({ pinnedUsers });
    };

    return (
        <AppointmentForm.BasicLayout onFieldChange={onFieldChange} appointmentData={appointmentData} {...restProps}>
            <PinUserDialog
                pinnedUsers={appointmentData?.pinnedUsers || []}
                onPinnedUsersChange={handlePinnedUsersChange}
            />
        </AppointmentForm.BasicLayout>
    );
}
