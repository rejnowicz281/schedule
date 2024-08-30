import { ChangeSet, EditingState, SchedulerDateTime, ViewState } from "@devexpress/dx-react-scheduler";
import {
    AllDayPanel,
    AppointmentForm,
    Appointments,
    AppointmentTooltip,
    DayView,
    DragDropProvider,
    EditRecurrenceMenu,
    MonthView,
    Scheduler,
    Toolbar,
    ViewSwitcher,
    WeekView
} from "@devexpress/dx-react-scheduler-material-ui";
import { Paper } from "@mui/material";
import { collection, doc, getDocs, writeBatch } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { db } from "./utils/firebase";

export interface Appointment {
    /** The identifier. */
    id: string;
    /** The start date. */
    startDate: SchedulerDateTime;
    /** The end date. */
    endDate?: SchedulerDateTime;
    /** The title. */
    title?: string;
    /** The all day flag. */
    allDay?: boolean;
    /** Specifies the appointment recurrence rule. */
    rRule?: string | undefined;
    /** Specifies dates excluded from recurrence. */
    exDate?: string | undefined;
    /** Any other properties. */
    [propertyName: string]: any;
}

export default function App() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        async function getAppointments() {
            const appointmentsCol = collection(db, "appointments");
            const querySnapshot = await getDocs(appointmentsCol);

            const appointments = querySnapshot.docs.map((doc) => {
                const data = doc.data();

                return {
                    id: doc.id as string,
                    startDate: data.startDate?.toDate() as Date,
                    endDate: data.endDate?.toDate() as Date,
                    title: data.title as string
                };
            });

            setAppointments(appointments);
        }

        getAppointments();
    }, []);
    const onCommitChanges = async (changes: ChangeSet) => {
        const { added, changed, deleted } = changes;
        const batch = writeBatch(db);

        setAppointments((prev) => {
            const newAppointments = [...prev];

            if (added) {
                const newAppointmentRef = doc(collection(db, "appointments"));

                const newAppointment: Appointment = {
                    id: newAppointmentRef.id,
                    startDate: added.startDate || new Date(),
                    ...added
                };

                newAppointments.push(newAppointment);

                batch.set(newAppointmentRef, {
                    startDate: newAppointment.startDate,
                    endDate: newAppointment.endDate,
                    title: newAppointment.title || ""
                });
            }

            if (changed) {
                newAppointments.forEach((appointment) => {
                    if (changed[appointment.id]) {
                        Object.assign(appointment, changed[appointment.id]);

                        const appointmentRef = doc(db, "appointments", appointment.id);
                        batch.update(appointmentRef, changed[appointment.id]);
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

            batch.commit();

            return newAppointments;
        });
    };

    return (
        <Paper>
            <Scheduler height={900} data={appointments}>
                <ViewState />
                <EditingState onCommitChanges={onCommitChanges} />
                <WeekView />
                <DayView />
                <MonthView />
                <Toolbar />
                <ViewSwitcher />
                <AllDayPanel />
                <EditRecurrenceMenu />
                <Appointments />
                <DragDropProvider />
                <AppointmentTooltip showCloseButton showOpenButton showDeleteButton />
                <AppointmentForm />
            </Scheduler>
        </Paper>
    );
}
