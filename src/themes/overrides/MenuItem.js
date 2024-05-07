

export default function MenuItem(theme) {
    const { shape: { borderRadius } } = theme;

    return {
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    webkitTapHighlightColor: "transparent",
                    backgroundColor: "transparent",
                    outline: "0px",
                    border: "0px",
                    cursor: "pointer",
                    userSelect: "none",
                    verticalAlign: "middle",
                    appearance: "none",
                    display: "flex",
                    webkitBoxPack: "start",
                    justifyContent: "flex-start",
                    webkitBoxAlign: "center",
                    alignItems: "center",
                    position: "relative",
                    textDecoration: "none",
                    minHeight: "48px",
                    boxSizing: "border-box",
                    padding: "6px 8px",
                    borderRadius: `${borderRadius}px`,
                    whiteSpace: "nowrap",
                    margin: "0px",
                }
            }
        }
    }
}