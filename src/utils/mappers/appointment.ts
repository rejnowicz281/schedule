import { Appointment } from "@/types/appointment";

export default function mapAppointment(appointment: any, id: string): Appointment {
    return {
        ...appointment,
        id,
        startDate:
            (appointment.startDate &&
                (appointment.startDate.toDate ? appointment.startDate.toDate() : appointment.startDate)) ||
            new Date(),
        endDate:
            (appointment.endDate &&
                (appointment.endDate.toDate ? appointment.endDate.toDate() : appointment.endDate)) ||
            new Date(),
        title: appointment.title || "",
        allDay: appointment.allDay || false,
        rRule: appointment.rRule || "",
        exDate: appointment.exDate || "",
        pinnedUsers: appointment.pinnedUsers || []
    };
}
