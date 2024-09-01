import { User } from "@/types/user";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";

export default function CustomAppointmentTooltipContent({
    appointmentData,
    ...restProps
}: AppointmentTooltip.ContentProps) {
    return (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            <Box px={2}>
                {appointmentData?.pinnedUsers instanceof Array && appointmentData.pinnedUsers.length > 0 && (
                    <div className="flex flex-wrap gap-2 my-4">
                        {appointmentData.pinnedUsers.map((user: User) => (
                            <Tooltip arrow title={user.displayName}>
                                <Avatar
                                    sx={{ width: 35, height: 35 }}
                                    className="cursor-pointer"
                                    src={user.photoURL}
                                    key={user.id}
                                >
                                    {user.displayName[0].toUpperCase()}
                                </Avatar>
                            </Tooltip>
                        ))}
                    </div>
                )}
                {appointmentData?.notes && (
                    <Typography variant="body1" className="my-4">
                        {appointmentData.notes}
                    </Typography>
                )}
            </Box>
        </AppointmentTooltip.Content>
    );
}
