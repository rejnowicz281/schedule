import useCalendarAppointments from "@/hooks/use-calendar-appointments";
import { EditingState, ViewState } from "@devexpress/dx-react-scheduler";
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
import CustomAppointmentComponent from "./custom-appointment-component";
import CustomAppointmentFormBasicLayout from "./custom-appointment-form/basic-layout";
import CustomAppointmentTooltipContent from "./custom-appointment-tooltip/content";
import CustomAppointmentTooltipHeader from "./custom-appointment-tooltip/header";

export default function Calendar() {
    const calendarAppointments = useCalendarAppointments();

    if (!calendarAppointments) return null;

    const { appointments, onCommitChanges, editingAppointment, onEditingAppointmentChange } = calendarAppointments;

    return (
        <Paper>
            <Scheduler height={800} data={appointments}>
                <ViewState />
                <EditingState
                    editingAppointment={editingAppointment}
                    onEditingAppointmentChange={onEditingAppointmentChange}
                    onCommitChanges={onCommitChanges}
                />
                <WeekView />
                <DayView />
                <MonthView />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <ViewSwitcher />
                <AllDayPanel />
                <EditRecurrenceMenu
                    layoutComponent={(props) =>
                        editingAppointment?.isReadOnly ? null : <EditRecurrenceMenu.Layout {...props} />
                    }
                />
                <Appointments appointmentComponent={CustomAppointmentComponent} />
                <DragDropProvider
                    sourceAppointmentComponent={(props) => (
                        <DragDropProvider.SourceAppointment
                            className={editingAppointment?.isReadOnly && "bg-pink-400"}
                            {...props}
                        />
                    )}
                    containerComponent={(props) =>
                        editingAppointment?.isReadOnly ? null : <DragDropProvider.Container {...props} />
                    }
                />
                <AppointmentTooltip
                    contentComponent={CustomAppointmentTooltipContent}
                    headerComponent={CustomAppointmentTooltipHeader}
                    showCloseButton
                />
                <AppointmentForm
                    readOnly={editingAppointment?.isReadOnly}
                    basicLayoutComponent={CustomAppointmentFormBasicLayout}
                />
            </Scheduler>
        </Paper>
    );
}
