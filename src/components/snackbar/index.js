import { CloseRounded } from "@mui/icons-material";
import { Box, IconButton, Paper, Typography, useTheme } from "@mui/material";
import { closeSnackbar } from "notistack";
import { SuccessIcon, InfoIcon, ErrorIcon, WarningIcon, } from '../../assets/svg'

export default function SnackNotification(key, message, variant = 'default') {
    const { shape: { borderRadius }, palette: { primary, info, error, success, warning } } = useTheme();

    const borderColor = () => {
        // var color;
        switch (variant) {
            case "success":
                return /* color = */ success?.main;
            case "info":
                return /* color = */ info?.main;
            case "warning":
                return /* color = */ warning?.main;
            case "error":
                return /* color = */ error?.main;
            default:
                return /* color = */ primary?.main;
        }
    }
    const notificationIcon = () => {
        switch (variant) {
            case "success":
                return <SuccessIcon color={borderColor()} />;
            case "info":
                return <InfoIcon />;
            case "warning":
                return <WarningIcon />;
            case "error":
                return <ErrorIcon />;
            default:
            // return < />;
        }
    };

    return (
        <Paper sx={{ padding: '5px', borderRadius: `${borderRadius / 2}px` }}>
            <Box onClick={() => closeSnackbar(key)} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: "10px" }}>
                    <IconButton sx={{ width: 30, height: 30, border: `1px solid ${borderColor()}`, borderRadius: `${borderRadius / 2}px` }}>
                        {notificationIcon()}
                    </IconButton>
                    <Typography variant='h5'>{message}</Typography>
                </Box>
                <IconButton>
                    <CloseRounded />
                </IconButton>
            </Box>
        </Paper>
    )
}