import { useAuth } from "@/providers/auth-provider";
import { Appointment } from "@/types/appointment";
import { db } from "@/utils/firebase";
import mapAppointment from "@/utils/mappers/appointment";
import { ChangeSet, EditingState, ViewState } from "@devexpress/dx-react-scheduler";
import {
    AllDayPanel,
    AppointmentForm,
    Appointments,
    AppointmentTooltip,
    DateNavigator,
    DayView,
    DragDropProvider,
    EditRecurrenceMenu,
    MonthView,
    Scheduler,
    TodayButton,
    Toolbar,
    ViewSwitcher,
    WeekView
} from "@devexpress/dx-react-scheduler-material-ui";
import { Paper } from "@mui/material";
import { collection, doc, onSnapshot, query, where, writeBatch } from "firebase/firestore";
import { useEffect, useState } from "react";
import CustomAppointmentForm from "./custom-appointment-form";
import CustomAppointmentTooltipContent from "./custom-appointment-tooltip-content";

export default function Calendar() {
    const { user } = useAuth();

    if (!user) return null;

    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        const appointmentsCol = collection(db, "appointments");
        const q = query(appointmentsCol, where("userId", "==", user.uid));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const appointments = snapshot.docs.map((doc) => {
                const data = doc.data();

                return mapAppointment(data, doc.id);
            });

            setAppointments(appointments);
        });

        return () => unsubscribe();
    }, []);

    const onCommitChanges = async ({ added, changed, deleted }: ChangeSet) => {
        const batch = writeBatch(db);

        setAppointments((prev) => {
            const newAppointments = [...prev];

            if (added) {
                const newAppointmentRef = doc(collection(db, "appointments"));

                const newAppointment = mapAppointment({ ...added, userId: user.uid }, newAppointmentRef.id);

                newAppointments.push(newAppointment);

                batch.set(newAppointmentRef, newAppointment);
            }

            if (changed) {
                newAppointments.forEach((appointment) => {
                    const appointmentChanges = changed[appointment.id];

                    if (appointmentChanges) {
                        appointment = mapAppointment({ ...appointment, ...appointmentChanges }, appointment.id);

                        const appointmentRef = doc(db, "appointments", appointment.id);

                        batch.update(appointmentRef, appointment);
                    }
                });
            }

            if (deleted !== undefined) {
                const index = newAppointments.findIndex((appointment) => appointment.id === deleted);

                if (index !== -1) {
                    newAppointments.splice(index, 1);

                    const appointmentRef = doc(db, "appointments", deleted.toString());

                    batch.delete(appointmentRef);
                }
            }

            batch.commit().catch((error) => {
                console.error("Error writing batch", error);
            });

            return newAppointments;
        });
    };

    return (
        <Paper>
            <Scheduler height={800} data={appointments}>
                <ViewState />
                <EditingState onCommitChanges={onCommitChanges} />
                <WeekView />
                <DayView />
                <MonthView />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <ViewSwitcher />
                <AllDayPanel />
                <EditRecurrenceMenu />
                <Appointments />
                <DragDropProvider />
                <AppointmentTooltip
                    contentComponent={CustomAppointmentTooltipContent}
                    showCloseButton
                    showOpenButton
                    showDeleteButton
                />
                <AppointmentForm basicLayoutComponent={CustomAppointmentForm} />
            </Scheduler>
        </Paper>
    );
}
