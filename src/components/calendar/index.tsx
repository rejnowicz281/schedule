import useCalendarAppointments from "@/hooks/use-calendar-appointments";
import { EditingState, ViewState } from "@devexpress/dx-react-scheduler";
import {
    AllDayPanel,
    Appointments,
    DateNavigator,
    DayView,
    MonthView,
    Scheduler,
    TodayButton,
    ViewSwitcher,
    WeekView
} from "@devexpress/dx-react-scheduler-material-ui";
import { Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomAppointmentComponent from "./appointment-component";
import CustomAppointmentForm from "./appointment-form";
import CustomAppointmentTooltip from "./appointment-tooltip";
import CustomDragAndDropProvider from "./drag-and-drop-provider";
import CustomEditRecurrenceMenu from "./edit-recurrence-menu";
import CustomToolbar from "./toolbar";

export default function Calendar() {
    const calendarAppointments = useCalendarAppointments();

    const { t, i18n } = useTranslation();

    if (!calendarAppointments) return null;

    const { appointments, onCommitChanges, editingAppointment, onEditingAppointmentChange, filters, setFilters } =
        calendarAppointments;

    return (
        <div className="flex-1 relative overflow-y-hidden">
            <Paper className="absolute inset-0">
                <Scheduler firstDayOfWeek={1} locale={i18n.language} height="auto" data={appointments}>
                    <ViewState />
                    <EditingState
                        editingAppointment={editingAppointment}
                        onEditingAppointmentChange={onEditingAppointmentChange}
                        onCommitChanges={onCommitChanges}
                    />
                    <WeekView name={t("week-view")} displayName={t("Week")} />
                    <DayView name={t("day-view")} displayName={t("Day")} />
                    <MonthView name={t("month-view")} displayName={t("Month")} />
                    <CustomToolbar filters={filters} setFilters={setFilters} />
                    <DateNavigator />
                    <TodayButton messages={{ today: t("Today") }} />
                    <ViewSwitcher />
                    <AllDayPanel messages={{ allDay: t("All Day") }} />
                    <CustomEditRecurrenceMenu readOnly={editingAppointment?.isReadOnly} />
                    <Appointments appointmentComponent={CustomAppointmentComponent} />
                    <CustomDragAndDropProvider readOnly={editingAppointment?.isReadOnly} />
                    <CustomAppointmentTooltip />
                    <CustomAppointmentForm readOnly={editingAppointment?.isReadOnly} />
                </Scheduler>
            </Paper>
        </div>
    );
}
