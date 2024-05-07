import React from 'react'
import TextFieldBox from './TextFieldBox'
import { Box, OutlinedInput } from '@mui/material'
import { KEYBOARD_KEY } from '../../shared/constants/event'
import { getFilledArray, joinArrayStrings, mergeArrayStringFromIndex, updateIndex } from '../../shared/helpers/array'
import { split } from '../../shared/helpers/string'
import { useEvent } from '../../shared/hooks/useEvent'


const defaultValidateChar = () => {
    return true
}

const MuiOtpInput = React.forwardRef((props, propRef) => {
    const { value = '', placeholder, length = 4, autoFocus = false, onChange, TextFieldsProps, onComplete, validateChar = defaultValidateChar, className, onBlur, ...restBoxProps } = props
    const initialValue = React.useRef(value)
    const onCallbackEvent = useEvent(onComplete)

    const matchIsCompletedEvent = useEvent((filledStrings) => {
        return {
            isCompleted: filledStrings.length >= length,
            finalValue: filledStrings.slice(0, length)
        }
    })

    const { onPaste, onFocus, onKeyDown, className: TextFieldClassName, onBlur: TextFieldOnBlur, ...restTextFieldsProps } = TextFieldsProps || {}

    React.useEffect(() => {
        const { isCompleted, finalValue } = matchIsCompletedEvent(
            initialValue.current
        )

        if (isCompleted) {
            onCallbackEvent(finalValue)
        }
    }, [length, onCallbackEvent, matchIsCompletedEvent])

    const valueSplitted = getFilledArray(
        length,
        (_, index) => {
            return {
                character: (value)[index] || '',
                inputRef: React.createRef()
            }
        }
    )

    const getIndexByInputElement = (inputElement) => {
        return valueSplitted.findIndex(({ inputRef }) => {
            return inputRef.current === inputElement
        })
    }

    const getCharactersSplitted = () => {
        return valueSplitted.map(({ character }) => {
            return character
        })
    }

    const replaceCharOfValue = (charIndex, charValue) => {
        const newValueSplitted = updateIndex(
            getCharactersSplitted(),
            charIndex,
            charValue
        )

        return joinArrayStrings(newValueSplitted)
    }

    const focusInputByIndex = (inputIndex) => {
        valueSplitted[inputIndex]?.inputRef.current?.focus()
    }

    const selectInputByIndex = (inputIndex) => {
        valueSplitted[inputIndex]?.inputRef.current?.select()
    }

    const manageCaretForNextInput = (currentInputIndex) => {
        if (currentInputIndex + 1 === length) {
            return
        }

        if (valueSplitted[currentInputIndex + 1].character) {
            selectInputByIndex(currentInputIndex + 1)
        } else {
            focusInputByIndex(currentInputIndex + 1)
        }
    }

    const matchIsCharIsValid = (character, index) => {
        return typeof validateChar !== 'function'
            ? true
            : validateChar(character, index)
    }

    const handleOneInputChange = (event) => {
        const initialChar = event.target.value[0] || ''
        let character = initialChar
        const currentInputIndex = getIndexByInputElement(event.target)

        // handle backspace so check character
        if (character && !matchIsCharIsValid(character, currentInputIndex)) {
            character = ''
        }

        const newValue = replaceCharOfValue(currentInputIndex, character)

        onChange?.(newValue)

        const { isCompleted, finalValue } = matchIsCompletedEvent(newValue)

        if (isCompleted) {
            onComplete?.(finalValue)
        }

        // Char is valid so go to next input
        if (character !== '') {
            // handle when the filled input is before the input selected
            if (newValue.length - 1 < currentInputIndex) {
                selectInputByIndex(newValue.length)
            } else {
                manageCaretForNextInput(currentInputIndex)
            }

            // Only for backspace so don't go to previous input if the char is invalid
        } else if (initialChar === '') {
            if (newValue.length <= currentInputIndex) {
                selectInputByIndex(currentInputIndex - 1)
            }
        }
    }

    const handleOneInputFocus = (event) => {
        event.preventDefault()
        event.target.select()
        onFocus?.(event)
    }

    const handleOneInputKeyDown = (event) => {
        const inputElement = event?.target
        const startPos = inputElement.selectionStart
        const endPos = inputElement.selectionEnd
        const currentInputIndex = getIndexByInputElement(inputElement)
        const isCaretBeforeChar = startPos === 0 && endPos === 0

        if (inputElement.value === event.key) {
            event.preventDefault()
            manageCaretForNextInput(currentInputIndex)
        } else if (KEYBOARD_KEY.backspace === event.key) {
            if (!inputElement.value) {
                event.preventDefault()

                selectInputByIndex(currentInputIndex - 1)
                // Caret is before the character and there is a character, so remove it
            } else if (isCaretBeforeChar) {
                event.preventDefault()

                const newValue = replaceCharOfValue(currentInputIndex, '')
                onChange?.(newValue)

                if (newValue.length <= currentInputIndex) {
                    selectInputByIndex(currentInputIndex - 1)
                }
            }
        } else if (KEYBOARD_KEY.left === event.key) {
            event.preventDefault()
            selectInputByIndex(currentInputIndex - 1)
        } else if (KEYBOARD_KEY.right === event.key) {
            event.preventDefault()
            selectInputByIndex(currentInputIndex + 1)
        } else if (KEYBOARD_KEY.home === event.key) {
            event.preventDefault()
            selectInputByIndex(0)
        } else if (KEYBOARD_KEY.end === event.key) {
            event.preventDefault()
            selectInputByIndex(valueSplitted.length - 1)
        }

        onKeyDown?.(event)
    }

    const handleOneInputPaste = (event) => {
        event.preventDefault()
        const content = event.clipboardData.getData('text/plain')
        const inputElement = event?.target
        // Apply from where an input is empty or equal to the input selected
        const currentInputIndex = valueSplitted.findIndex(
            ({ character, inputRef }) => {
                return character === '' || inputRef.current === inputElement
            }
        )
        const currentCharacter = getCharactersSplitted()

        const characters = mergeArrayStringFromIndex(
            currentCharacter,
            split(content),
            currentInputIndex
        ).map((character, index) => {
            return matchIsCharIsValid(character, index) ? character : ''
        })

        const newValue = joinArrayStrings(characters)
        onChange?.(newValue)

        const { isCompleted, finalValue } = matchIsCompletedEvent(newValue)

        if (isCompleted) {
            onComplete?.(finalValue)
            selectInputByIndex(length - 1)
        } else {
            selectInputByIndex(newValue.length)
        }

        onPaste?.(event)
    }

    const handleBlur = (event) => {
        TextFieldOnBlur?.(event)
        const anInputIsFocused = valueSplitted.some(({ inputRef }) => {
            return inputRef.current === event.relatedTarget
        })

        if (!anInputIsFocused) {
            const { isCompleted, finalValue } = matchIsCompletedEvent(value)
            onBlur?.(finalValue, isCompleted)
        }
    }

    return (
        <Box
            ref={propRef}
            sx={{ display: "flex", gap: "12px", webkitBoxAlign: "center", alignItems: "center", }}
            // className={`MuiOtpInput-Box ${className || ''}`}
            {...restBoxProps}
        >
            {valueSplitted.map(({ character, inputRef }, index) => {
                // variant='filled'
                return (
                    <div key={index} className='otpbox'>
                        <TextFieldBox
                            type={'text'}
                            inputProps={{ inputMode: 'numeric', pattern: "[0-9]*" }}
                            autoFocus={autoFocus ? index === 0 : false}
                            autoComplete="one-time-code"
                            // variant='filled'
                            value={character}
                            inputRef={inputRef}
                            className={`MuiOtpInput-TextField MuiOtpInput-TextField-${index + 1} ${TextFieldClassName || ''}`}
                            onPaste={handleOneInputPaste}
                            onFocus={handleOneInputFocus}
                            onChange={handleOneInputChange}
                            onKeyDown={handleOneInputKeyDown}
                            onBlur={handleBlur}
                            placeholder={
                                typeof placeholder === 'function'
                                    ? placeholder(index)
                                    : placeholder
                            }
                            {...restTextFieldsProps}

                            onInput={(e) => {
                                const target = e?.target;
                                target.value = e?.target?.value.replace(/[^0-9]/g, "");
                            }}
                        />
                    </div>
                )
            })}
        </Box>
    )
}
)

export { MuiOtpInput }