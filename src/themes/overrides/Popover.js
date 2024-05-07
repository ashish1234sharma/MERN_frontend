import { cyanBlur, redBlur } from '.././../assets/images'

export default function Popover(theme) {
    const { palette, customShadows, shape: { borderRadius } } = theme;

    return {
        MuiPopover: {
            styleOverrides: {
                root: {},
                paper: {
                    opacity: 1,
                    transform: "none",
                    transition: "1 313ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 208ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    // top: "52px",
                    // left: "157px",
                    transformOrigin: "200px 0px",
                    position: "absolute",
                    minWidth: "16px",
                    minHeight: "16px",
                    maxWidth: "calc(100% - 32px)",
                    maxHeight: "calc(100% - 32px)",
                    outline: "0px",
                    backdropFilter: "blur(20px)",
                    backgroundColor: palette?.common?.paper, // "rgba(255, 255, 255, 0.9)",
                    backgroundImage: `url(${cyanBlur}), url(${redBlur})`,
                    backgroundRepeat: "no-repeat, no-repeat",
                    backgroundPosition: "right top, left bottom",
                    backgroundSize: "50%, 50%",
                    boxShadow: customShadows?.paper,
                    borderRadius: `${borderRadius}px`,
                    width: "200px",
                    overflow: "inherit",
                    marginLeft: "6px",
                    padding: "0px",
                }
            }
        }
    }
}