import { DragDropProvider } from "@devexpress/dx-react-scheduler-material-ui";

export default function CustomDragAndDropProvider({ readOnly }: { readOnly?: boolean }) {
    return (
        <DragDropProvider
            sourceAppointmentComponent={(props) => (
                <DragDropProvider.SourceAppointment className={readOnly ? "bg-cyan-300" : undefined} {...props} />
            )}
            containerComponent={(props) => (readOnly ? null : <DragDropProvider.Container {...props} />)}
        />
    );
}
