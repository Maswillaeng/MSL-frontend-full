export  const infinityScroll = async(setRowCount, scroll, rowCount) => {
    if (scroll === 40) {
        setRowCount(rowCount + 1)
    }
    if (scroll === 461) {
        setRowCount(rowCount + 1)
    }
    if (scroll === 461 + (498 * (rowCount - 2))) {
        setRowCount(rowCount + 1)
    }
}