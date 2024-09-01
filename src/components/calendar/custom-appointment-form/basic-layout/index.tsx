import { User } from "@/types/user";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import PinnedUsersSection from "./pinned-users-section";

export default function CustomAppointmentFormBasicLayout({
    appointmentData,
    onFieldChange,
    readOnly,
    ...restProps
}: AppointmentForm.BasicLayoutProps) {
    const handlePinnedUsersChange = (pinnedUsers: User[]) => {
        onFieldChange({ pinnedUsers });
    };

    return (
        <AppointmentForm.BasicLayout
            readOnly={readOnly}
            onFieldChange={onFieldChange}
            appointmentData={appointmentData}
            {...restProps}
        >
            <PinnedUsersSection
                readOnly={readOnly}
                pinnedUsers={appointmentData?.pinnedUsers || []}
                onPinnedUsersChange={handlePinnedUsersChange}
            />
        </AppointmentForm.BasicLayout>
    );
}
