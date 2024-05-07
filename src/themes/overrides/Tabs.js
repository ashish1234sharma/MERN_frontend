export default function Tabs(theme) {
    const { palette, typography } = theme;

    return {
        MuiTabs: {
            styleOverrides: {
                root: {
                    minHeight: "44px",
                    height: "44px",
                    fontFamily: typography?.fontFamily,
                    "& .MuiTabs-indicator": {
                        backgroundColor: palette?.primary?.main,
                        height: 2,
                    },
                    "& .MuiTab-root.Mui-selected": {
                        fontWeight: 600, // Regular
                        color: palette?.text?.black,
                        lineHeight: "normal",
                        fontSize: "14px",
                        textTransform: 'capitalize',
                        fontFamily: typography?.fontFamily,
                    }
                }
            }
        },
        MuiTab: {
            defaultProps:{
                disableFocusRipple: true,
                disableRipple: true,
            },
            styleOverrides: {
                root: {
                    minHeight: "44px",
                    height: "44px",
                    fontWeight: 600, // Regular
                    color: palette?.text?.grey,
                    lineHeight: "normal",
                    fontSize: "14px",
                    fontFamily: typography?.fontFamily,
                    textTransform: 'capitalize',
                    "& .MuiTab-root.Mui-selected": {
                        fontWeight: 600, // Regular
                        color: palette?.text?.black,
                        lineHeight: "normal",
                        fontSize: "14px",
                        textTransform: 'capitalize',
                        fontFamily: typography?.fontFamily,
                    }
                }
            }
        }
    }
};