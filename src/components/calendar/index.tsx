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
import { useTranslation } from "react-i18next";
import CustomAppointmentComponent from "./custom-appointment-component";
import CustomAppointmentFormBasicLayout from "./custom-appointment-form/basic-layout";
import CustomAppointmentTooltipContent from "./custom-appointment-tooltip/content";
import CustomAppointmentTooltipHeader from "./custom-appointment-tooltip/header";
import FilterSetter from "./filter-setter";

export default function Calendar() {
    const calendarAppointments = useCalendarAppointments();

    const { t, i18n } = useTranslation();

    if (!calendarAppointments) return null;

    const { appointments, onCommitChanges, editingAppointment, onEditingAppointmentChange, filters, setFilters } =
        calendarAppointments;

    return (
        <div className="flex-1 relative overflow-y-hidden">
            <Paper className="absolute inset-0">
                <FilterSetter filters={filters} setFilters={setFilters} />
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
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton
                        messages={{
                            today: t("Today")
                        }}
                    />
                    <ViewSwitcher />
                    <AllDayPanel messages={{ allDay: t("All Day") }} />
                    <EditRecurrenceMenu
                        layoutComponent={(props) =>
                            editingAppointment?.isReadOnly ? null : <EditRecurrenceMenu.Layout {...props} />
                        }
                        messages={{
                            current: t("This appointment"),
                            currentAndFollowing: t("This and following appointments"),
                            all: t("All appointments"),
                            menuEditingTitle: t("Edit recurring appointment"),
                            menuDeletingTitle: t("Delete recurring appointment"),
                            cancelButton: t("Cancel"),
                            commitButton: t("Ok")
                        }}
                    />
                    <Appointments appointmentComponent={CustomAppointmentComponent} />
                    <DragDropProvider
                        sourceAppointmentComponent={(props) => (
                            <DragDropProvider.SourceAppointment
                                className={editingAppointment?.isReadOnly && "bg-cyan-300"}
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
                        messages={{
                            allDayLabel: t("All Day"),
                            titleLabel: t("Title"),
                            commitCommand: t("Save"),
                            moreInformationLabel: t("More Information"),
                            repeatLabel: t("Repeat"),
                            notesLabel: t("Notes"),
                            never: t("Never"),
                            daily: t("Daily"),
                            weekly: t("Weekly"),
                            monthly: t("Monthly"),
                            yearly: t("Yearly"),
                            repeatEveryLabel: t("Repeat every"),
                            daysLabel: t("day(s)"),
                            endRepeatLabel: t("End repeat"),
                            onLabel: t("On"),
                            afterLabel: t("After"),
                            occurrencesLabel: t("occurrence(s)"),
                            weeksOnLabel: t("week(s) on:"),
                            monthsLabel: t("month(s)"),
                            ofEveryMonthLabel: t("of every month"),
                            theLabel: t("The"),
                            firstLabel: t("First"),
                            secondLabel: t("Second"),
                            thirdLabel: t("Third"),
                            fourthLabel: t("Fourth"),
                            lastLabel: t("Last"),
                            yearsLabel: t("year(s)"),
                            ofLabel: t("of"),
                            everyLabel: t("Every"),
                            detailsLabel: t("Details")
                        }}
                        readOnly={editingAppointment?.isReadOnly}
                        basicLayoutComponent={CustomAppointmentFormBasicLayout}
                    />
                </Scheduler>
            </Paper>
        </div>
    );
}
