export function percentage(percent = 0, total = 0) {
    return ((percent / 100) * total).toFixed(0)
}