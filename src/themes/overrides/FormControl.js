export default function FormControl(theme) {
    const { palette } = theme;

    return {
        MuiFormControl: {
            styleOverrides: {
                root: {
                    marginTop: 1,
                    marginBottom: 1,
                    '& > label': {
                        top: 23,
                        left: 0,
                        color: palette?.grey[500],
                        '&[data-shrink="false"]': {
                            top: 5
                        }
                    },
                    '& > div > input': {
                        padding: '30.5px 14px 11.5px !important'
                    },
                    '& > div > textarea': {
                        padding: '30.5px 14px 11.5px !important'
                    },
                    '& legend': {
                        display: 'none'
                    },
                    '& fieldset': {
                        top: 0
                    }
                }
            }
        }
    }
}