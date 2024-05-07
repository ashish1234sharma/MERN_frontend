export function getFilledArray(range, mapfn) {
    return range <= 0 ? [] : (Array.from({ length: range }, mapfn))
}

export function updateIndex(array, indexItem, item) {
    return array.map((chipItem, index) => {
        return indexItem === index ? item : chipItem
    })
}

export function joinArrayStrings(array) {
    return array.join('')
}

export function append(array, item) {
    return [...array, item]
}

export function mergeArrayStringFromIndex(array, arrayToMerge, fromIndex) {
    return array.reduce(
        (accumulator, currentValue, index) => {
            const { characters, restArrayMerged } = accumulator

            if (index < fromIndex) {
                return {
                    restArrayMerged,
                    characters: append(characters, currentValue)
                }
            }

            const [firstCharacter, ...restArrayWithoutFirstCharacter] =
                restArrayMerged

            return {
                restArrayMerged: restArrayWithoutFirstCharacter,
                characters: append(characters, firstCharacter || '')
            }
        },
        {
            restArrayMerged: arrayToMerge,
            characters: []
        }
    ).characters
}