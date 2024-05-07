import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
    return {
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