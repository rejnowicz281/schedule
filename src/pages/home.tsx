import CustomAppointmentForm from "@/components/custom-appointment-form";
import { useAuth } from "@/providers/auth-provider";
import { auth, db } from "@/utils/firebase";
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
import { Button, Paper } from "@mui/material";
import { collection, doc, getDocs, query, where, writeBatch } from "firebase/firestore/lite";
import { useEffect, useState } from "react";

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

export default function HomePage() {
    const { user } = useAuth();

    if (!user) return null;

    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        const appointmentsCol = collection(db, "appointments");
        const q = query(appointmentsCol, where("userId", "==", user.uid));

        getDocs(q).then((querySnapshot) => {
            const appointments = querySnapshot.docs.map((doc) => {
                const data = doc.data();

                return {
                    ...data,
                    id: doc.id as string,
                    startDate: data.startDate.toDate() as Date,
                    endDate: data.endDate?.toDate() as Date | undefined
                };
            });

            setAppointments(appointments);
        });
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
                    title: newAppointment.title || "",
                    userId: user.uid
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

            batch.commit().catch((error) => {
                console.error("Error writing batch", error);
            });

            return newAppointments;
        });
    };

    return (
        <>
            <Paper>
                <Scheduler height={800} data={appointments}>
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
                    <AppointmentForm basicLayoutComponent={CustomAppointmentForm} />
                </Scheduler>
            </Paper>

            <Button className="mt-8 self-center" variant="contained" onClick={() => auth.signOut()}>
                Sign Out
            </Button>
        </>
    );
}
