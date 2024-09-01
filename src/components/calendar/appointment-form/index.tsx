import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import { useTranslation } from "react-i18next";
import CustomAppointmentFormBasicLayout from "./basic-layout";

export default function CustomAppointmentForm({ readOnly }: { readOnly?: boolean }) {
    const { t } = useTranslation();

    return (
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
                ofLabel: `${t("of")} `,
                everyLabel: t("Every"),
                detailsLabel: t("Details")
            }}
            readOnly={readOnly}
            basicLayoutComponent={CustomAppointmentFormBasicLayout}
        />
    );
}
