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
import { useState } from "react";

export interface Appointment {
    /** The identifier. */
    id: number;
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
    const [appointments, setAppointments] = useState<Appointment[]>([
        {
            title: "Website Re-Design Plan",
            startDate: new Date(2018, 5, 25, 9, 35),
            endDate: new Date(2018, 5, 25, 11, 30),
            id: 0,
            rRule: "FREQ=DAILY;COUNT=3",
            exDate: "20180628T063500Z,20180626T063500Z"
        },
        {
            title: "Book Flights to San Fran for Sales Trip",
            startDate: new Date(2018, 5, 25, 12, 11),
            endDate: new Date(2018, 5, 25, 13, 0),
            id: 1,
            rRule: "FREQ=DAILY;COUNT=4",
            exDate: "20180627T091100Z"
        },
        {
            title: "Install New Router in Dev Room",
            startDate: new Date(2018, 5, 25, 13, 30),
            endDate: new Date(2018, 5, 25, 14, 35),
            id: 2,
            rRule: "FREQ=DAILY;COUNT=5"
        }
    ]);

    const onCommitChanges = (changes: ChangeSet) => {
        console.log("Current Appointments: ", appointments);
        console.log("Changes: ", changes);

        const { added, changed, deleted } = changes;

        setAppointments((prev) => {
            const newAppointments = [...prev];

            if (added) {
                const startingAddedId =
                    newAppointments.length > 0 ? newAppointments[newAppointments.length - 1].id + 1 : 0;

                newAppointments.push({
                    id: startingAddedId,
                    startDate: added.startDate || new Date(),
                    ...added
                });
            }

            if (changed) {
                newAppointments.forEach((appointment) => {
                    if (changed[appointment.id]) {
                        Object.assign(appointment, changed[appointment.id]);
                    }
                });
            }

            if (deleted !== undefined) {
                newAppointments.splice(
                    newAppointments.findIndex((appointment) => appointment.id === deleted),
                    1
                );
            }

            return newAppointments;
        });
    };

    return (
        <Paper>
            <Scheduler height={900} data={appointments}>
                <ViewState currentDate="2018-06-25" />
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
