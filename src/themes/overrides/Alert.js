export default function Alert(theme) {
    const { palette, typography, } = theme;

    return {
        MuiAlert: {
            styleOverrides: {
                root: {
                    fontFamily: typography?.fontFamily,
                    fontSize: '14px',
                    fontWeight: 600,
                    borderRadius: `${theme?.shape?.borderRadius}px`,
                    marginTop: "3px",
                    marginBottom: "3px",
                },
                standardSuccess: {
                    backgroundColor: palette?.success?.lighter,
                    color: palette?.success?.dark,
                },
                standardError: {
                    backgroundColor: palette?.error?.lighter,
                    color: palette?.error?.dark,
                },
                standardWarning: {
                    backgroundColor: palette?.warning?.lighter,
                    color: palette?.warning?.dark
                },
                standardInfo: {
                    backgroundColor: palette?.info?.lighter,
                    color: palette?.info?.dark,
                },
            }
        }
    };
}