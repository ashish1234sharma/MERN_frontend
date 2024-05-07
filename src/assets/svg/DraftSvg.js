import React, { Fragment } from 'react'

const DraftSvg = ({ width = "20px", height = "20px" }) => {
    return (
        <Fragment>
            <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="component-iconify MuiBox-root css-1t9pz9x iconify iconify--solar" viewBox="0 0 24 24">
                <g fill="currentColor">
                    <path fillRule="evenodd" d="M14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14v-4c0-3.771 0-5.657 1.172-6.828C4.343 2 6.239 2 10.03 2c.606 0 1.091 0 1.5.017c-.013.08-.02.161-.02.244l-.01 2.834c0 1.097 0 2.067.105 2.848c.114.847.375 1.694 1.067 2.386c.69.69 1.538.952 2.385 1.066c.781.105 1.751.105 2.848.105h4.052c.043.534.043 1.19.043 2.063V14c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22Zm-8.75-7.5a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75Z" clipRule="evenodd">
                    </path>
                    <path d="m19.352 7.617l-3.96-3.563c-1.127-1.015-1.69-1.523-2.383-1.788L13 5c0 2.357 0 3.536.732 4.268C14.464 10 15.643 10 18 10h3.58c-.362-.704-1.012-1.288-2.228-2.383Z">
                    </path>
                </g>
            </svg>
        </Fragment>
    )
}

export default DraftSvg