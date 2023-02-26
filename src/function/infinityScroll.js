export const infinityScroll = async (setRowCount, scroll, rowCount) => {
    if (scroll === 41 && rowCount < rowCount + 1) {
        await setRowCount(rowCount + 1)
    }
    if (scroll === 461 && rowCount < rowCount + 1) {
        await setRowCount(rowCount + 1)
    }
    if (scroll === 461 + (498 * (rowCount - 2)) && rowCount < rowCount + 1) {
        await setRowCount(rowCount + 1)
    }
}