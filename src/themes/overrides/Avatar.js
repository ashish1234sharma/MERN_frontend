export default function Avatar(theme) {
    const { typography: { fontFamily }, } = theme;

    return {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    position: "relative",
                    display: "flex",
                    webkitBoxAlign: "center",
                    alignItems: "center",
                    webkitBoxPack: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "14px",
                    lineHeight: 1,
                    borderRadius: "50%",
                    overflow: "hidden",
                    userSelect: "none",
                    fontWeight: 600,
                    fontFamily: fontFamily
                }
            }
        }
    }
}