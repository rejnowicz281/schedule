import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";

export default function CustomAppointmentComponent({ children, data, ...restProps }: Appointments.AppointmentProps) {
    return (
        <Appointments.Appointment
            data={data}
            className={data.isReadOnly && "bg-sky-300 hover:bg-sky-400"}
            {...restProps}
        >
            {children}
        </Appointments.Appointment>
    );
}
