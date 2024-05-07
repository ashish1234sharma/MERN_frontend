import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
    return {
        signinMain: {
            minHeight: '100vh',
            width: '100%',
            overflow: 'hidden',
        },
        signinImageContainer: {
            flexDirection: "column",
            webkitBoxFlex: 1,
            flexGrow: 1,
            webkitBoxAlign: "center",
            alignItems: "center",
            webkitBoxPpack: "center",
            justifyContent: "center",
            gap: "80px",
            background: "linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)) center center / cover no-repeat, url(https://minimals.cc/assets/background/overlay_2.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            overflow: "hidden"
        },
        formMain: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
        },
        mainContainer: {
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            paddingTop: "30px",
            paddingBottom: "30px",
            maxWidth: "400px",
            minHeight: "100vh",
            textAlign: "center",
            webkitBoxPack: "center",
            justifyContent: "center",
        },
        subMain: {
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
        },
        titleMain: {
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "20px",
            marginBottom: "20px",
            width: "100%",
        },
        componentForm: {
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            webkitBoxAlign: "center",
            alignItems: "center",
            width: "100%",
        }
    }
})