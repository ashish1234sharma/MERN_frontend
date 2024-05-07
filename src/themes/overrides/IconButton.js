
export default function IconButton(theme) {
    const { palette, } = theme;

    return {
        MuiIconButton: {
            defaultProps: {
                elevation: 2,
                disableRipple: true,
            },
            styleOverrides: {
                root: {
                    display: "inline-flex",
                    webkitBoxAlign: "center",
                    alignItems: "center",
                    webkitBoxPack: "center",
                    justifyContent: "center",
                    position: "relative",
                    boxSizing: "border-box",
                    webkitTapHighlightColor: "transparent",
                    outline: "0px",
                    border: "0px",
                    margin: "0px",
                    cursor: "pointer",
                    userSelect: "none",
                    verticalAlign: "middle",
                    appearance: "none",
                    textDecoration: "none",
                    textAlign: "center",
                    flex: "0 0 auto",
                    padding: "8px",
                    overflow: "visible",
                    transition: `${palette?.common?.iconButton} 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
                    width: "40px",
                    height: "40px",
                    '&:hover': {
                        transform: "scale(1.05) translateZ(0px)",
                        transition: "ease 0.3s"
                    },
                    '&:active': {
                        backgroundColor: palette?.common?.transparent,
                    },
                    '&:focus': {
                        backgroundColor: palette?.common?.transparent,
                    }
                },
            }
        }
    }
}
