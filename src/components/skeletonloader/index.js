import { Skeleton } from '@mui/material'
import React from 'react'

const SkeletonLoader = ({ key = 0 }) => {
    return (
        <Skeleton sx={{ height: 170, WebkitTransform: "none" }} />
    )
}

export default SkeletonLoader
