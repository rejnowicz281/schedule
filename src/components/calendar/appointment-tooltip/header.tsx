import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";

export default function CustomAppointmentTooltipHeader({
    appointmentData,
    children,
    ...restProps
}: AppointmentTooltip.HeaderProps) {
    return (
        <AppointmentTooltip.Header
            {...restProps}
            showOpenButton={!appointmentData?.isReadOnly}
            showDeleteButton={!appointmentData?.isReadOnly}
            appointmentData={appointmentData}
        >
            {children}
        </AppointmentTooltip.Header>
    );
}
