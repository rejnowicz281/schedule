import { EditRecurrenceMenu } from "@devexpress/dx-react-scheduler-material-ui";
import { useTranslation } from "react-i18next";

export default function CustomEditRecurrenceMenu({ readOnly }: { readOnly?: boolean }) {
    const { t } = useTranslation();

    return (
        <EditRecurrenceMenu
            layoutComponent={(props) => (readOnly ? null : <EditRecurrenceMenu.Layout {...props} />)}
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
    );
}
