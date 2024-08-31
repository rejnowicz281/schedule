import { SchedulerDateTime } from "@devexpress/dx-react-scheduler";
import { User } from "./user";

export type Appointment = {
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
    rRule?: string;

    /** Specifies dates excluded from recurrence. */
    exDate?: string;

    /** The pinned users. */
    pinnedUsers?: User[];

    /** Any other properties. */
    [propertyName: string]: any;
};
