export default function Tooltip(theme) {
    const { shape: { borderRadius }, palette, typography } = theme;

    return {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    padding: '0px',
                    fontSize: '12px',
                    fontWeight: 400,
                    fontFamily: typography?.fontFamily,
                    color: palette?.text?.white,
                    backgroundColor: palette?.common?.transparent,
                    borderRadius: `${borderRadius / 2}px`,
                },
                arrow: {
                    color: palette?.common?.white,
                },
            }
        },
    }
};