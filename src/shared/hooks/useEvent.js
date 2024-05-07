import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export function useEvent(callback) {
    const ref = React.useRef(() => {
        throw new Error('Cannot call an event handler while rendering.')
    })

    React.useInsertionEffect(() => {
        ref.current = callback
    })

    return React.useCallback((...args) => {
        return ref.current?.(...args)
    }, [])
}