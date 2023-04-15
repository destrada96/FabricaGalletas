// Helper functions, like calculating offset for pagination

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

module.exports = {
    emptyOrRows
}