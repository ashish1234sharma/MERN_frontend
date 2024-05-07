import React, { Fragment } from 'react'
import { useTheme, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BackToSignIn = () => {
    const { palette } = useTheme();
    const naviagte = useNavigate();

    return (
        <Fragment>
            <Typography
                variant='h6'
                onClick={() => { naviagte('/auth/signin', { replace: true }) }}
                component='div'
                sx={{
                    cursor: 'pointer',
                    fontWeight: 600,
                    margin: "0px",
                    textDecoration: "none",
                    color: "inherit",
                    webkitBoxAlign: "center",
                    alignItems: "center",
                    display: "inline-flex",

                    transition: 'ease-in 0.2s', '&:hover': { color: palette?.primary?.main, transition: 'ease-in 0.2s' }
                }}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true" role="img" className="component-iconify MuiBox-root css-3o0h5k iconify iconify--eva" width="1em" height="1em" viewBox="0 0 24 24">
                    <g id="iconifyReact15286">
                        <g id="iconifyReact15287">
                            <path id="iconifyReact15288" fill="currentColor" d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64Z"></path>
                        </g>
                    </g>
                </svg>
                Return to sign in
            </Typography>
        </Fragment>
    )
}

export default BackToSignIn