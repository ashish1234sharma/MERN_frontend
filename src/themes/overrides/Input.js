

export default function Input(theme) {
    const { palette, typography, shape } = theme;

    return {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: palette?.grey[50],
                    borderRadius: theme?.shape?.borderRadius,
                    alignIftems: "baseline",
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: `1.5px solid ${palette?.grey[400]}`,
                        transition: 'ease-in 0.2s',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: `2px solid ${palette?.primary?.main}`,
                        transition: 'ease-in 0.2s',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: `2px solid ${palette?.primary?.light}`,
                        transition: 'ease-in 0.2s',
                    },
                    '&.MuiInputBase-multiline': {
                        padding: 1
                    },
                    '&.MuiInputBase-root':{
                        alignIftems: "baseline"
                    }
                },
                input: {
                    color: palette?.text?.dark,
                    fontSize: '14px',
                    fontWeight: 600,
                    fontStyle: 'normal',
                    fontFamily: typography?.fontFamily,
                    background: palette?.grey[50],
                    // padding: '15.5px 14px',
                    borderRadius: shape?.borderRadius,
                    '&.MuiInputBase-inputSizeSmall': {
                        padding: '10px 14px',
                        '&.MuiInputBase-inputAdornedStart': {
                            paddingLeft: 0
                        }
                    },
                    "&::placeholder": {
                        color: palette?.grey[500],
                        fontSize: '14px',
                        fontWeight: 600,
                        fontFamily: typography?.fontFamily,
                        fontStyle: 'normal',
                        opacity: 0.6
                    }
                },
                inputAdornedStart: {
                    paddingLeft: 4
                },
                notchedOutline: {
                    borderRadius: shape?.borderRadius
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: palette?.text?.dark,
                    fontFamily: typography?.fontFamily,
                    fontSize: '14px',
                    fontWeight: 500,
                    opacity: 0.8
                }
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    color: palette?.error?.main,
                    fontFamily: typography?.fontFamily,
                    fontSize: '12px',
                    fontWeight: 500,
                    opacity: 0.8
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        padding: "0px"
                    }
                }
            }
        }
    }
}