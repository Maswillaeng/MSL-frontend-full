export const infinityScroll = (setRowCount, scroll, rowCount) => {
    if (scroll === 37) {
        setRowCount(rowCount + 1)
    }
    if (scroll === 429) {
        setRowCount(rowCount + 1)
    }
    if (scroll === 429 + (498 * (rowCount - 2))) {
        setRowCount(rowCount + 1)
    }
}