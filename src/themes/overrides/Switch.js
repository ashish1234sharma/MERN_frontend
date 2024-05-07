export default function Switch(theme) {

    return {
        MuiSwitch: {
            styleOverrides: {
                root: {
                    width: 32,
                    height: 20,
                    padding: 0,
                    display: 'flex',
                    '&:active': {
                        '& .MuiSwitch-thumb': {
                            width: 19,
                        },
                        '& .MuiSwitch-switchBase.Mui-checked': {
                            transform: 'translateX(9px)',
                        },
                    },
                    '& .MuiSwitch-switchBase': {
                        padding: 2,
                        '&.Mui-checked': {
                            transform: 'translateX(12px)',
                            color: '#fff',
                            '& + .MuiSwitch-track': {
                                opacity: 1,
                                backgroundColor: '#1890ff',
                            },
                        },
                    },
                    '& .MuiSwitch-thumb': {
                        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
                        width: 16,
                        height: 16,
                        borderRadius: 16 / 2,
                        transition: 'ease 0.6s',
                        color: '#fff',
                        // transition: theme.transitions.create(['width'], {
                        //     duration: 200,
                        // }),
                    },
                    '& .MuiSwitch-track': {
                        borderRadius: 32 / 2,
                        opacity: 1,
                        backgroundColor: '#39393D',
                        boxSizing: 'border-box',
                    },
                }
            }
        }

        /* MuiSwitch: {
            styleOverrides: {
                root: {
                    width: 32,
                    height: 20,
                    padding: 0,
                    display: 'flex',
                    '&:active': {
                        '& .MuiSwitch-thumb': {
                            width: 19,
                        },
                        '& .MuiSwitch-switchBase.Mui-checked': {
                            transform: 'translateX(9px)',
                        },
                    },
                    '& .MuiSwitch-switchBase': {
                        padding: 2,
                        '&.Mui-checked': {
                            transform: 'translateX(12px)',
                            color: '#fff',
                            '& + .MuiSwitch-track': {
                                opacity: 1,
                                backgroundColor: '#1890ff',
                            },
                        },
                    },
                    '& .MuiSwitch-thumb': {
                        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
                        width: 16,
                        height: 16,
                        borderRadius: 16 / 2,
                        transition: 'ease 0.6s',
                        color:'red'
                        // transition: theme.transitions.create(['width'], {
                        //     duration: 200,
                        // }),
                    },
                    '& .MuiSwitch-track': {
                        borderRadius: 32 / 2,
                        opacity: 1,
                        backgroundColor: '#39393D',
                        boxSizing: 'border-box',
                    },
                }
            }
        } */
    }
}
