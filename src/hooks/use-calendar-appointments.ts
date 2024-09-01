import { useAuth } from "@/providers/auth-provider";
import { Appointment } from "@/types/appointment";
import { db } from "@/utils/firebase";
import mapAppointment from "@/utils/mappers/appointment";
import { AppointmentModel, ChangeSet } from "@devexpress/dx-react-scheduler";
import { and, collection, doc, onSnapshot, or, query, where, writeBatch } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useCalendarAppointments() {
    const { user } = useAuth();

    if (!user) return null;

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [editingAppointment, setEditingAppointment] = useState<Partial<AppointmentModel> | undefined>(undefined);

    const onEditingAppointmentChange = (appointment: Partial<AppointmentModel>) => {
        setEditingAppointment(appointment);
    };

    useEffect(() => {
        const appointmentsCol = collection(db, "appointments");
        const q = query(
            appointmentsCol,
            or(
                where("userId", "==", user.uid),
                and(
                    where("pinnedUsers", "array-contains", {
                        id: user.uid,
                        displayName: user.displayName || user.email,
                        photoURL: user.photoURL
                    }),
                    where("userId", "!=", user.uid)
                )
            )
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const appointments = snapshot.docs.map((doc) => {
                const data = doc.data();

                return mapAppointment({ ...data, isReadOnly: data.userId !== user.uid }, doc.id);
            });

            setAppointments(appointments);
        });

        return () => unsubscribe();
    }, []);

    const onCommitChanges = async ({ added, changed, deleted }: ChangeSet) => {
        if (editingAppointment?.isReadOnly) return;
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

    return {
        appointments,
        onCommitChanges,
        editingAppointment,
        onEditingAppointmentChange
    };
}
