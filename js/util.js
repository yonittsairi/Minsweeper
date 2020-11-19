function printMat(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell cell' + i + '-' + j;
            strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function countNegs(mat, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= mat.length) continue
            if (rowIdx === i && colIdx === j) continue
            count++
        }
    }
    return count
}
function countInRow(arr, symbol) {
    var count = 0
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === symbol) count++
    }
    return count
}
function countInCol(board, colIdx, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        if (board[i][colIdx] === symbol) count++
    }
    return count
}
function countInPrimaryDiag(board, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        if (board[i][i] === symbol) count++
    }
    return count
}
function countInSecondaryDiag(board, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        if (board[i][board.length - 1 - i] === symbol) count++
    }
    return count
}
function createMat(rowNum, colNum) {
    var mat = []
    for (var i = 0; i < rowNum; i++) {
        mat[i] = []
        for (var j = 0; j < colNum; j++) {
            mat[i][j] = ''
        }
    }
    return mat
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min); // Min is inclusive, Max is Exclusive
}

function formatTime(ts) {
    var now = Date.now()
    var diff = now - ts
    if (diff >= 0 && diff <= MINUTE) return 'Just now!'
    if (diff <= MINUTE * 5) return 'Few minutes ago'
    if (diff <= HOUR * 24) return 'Today'
    if (diff <= HOUR * 48) return 'Yesterday'
    return getTimeStr(ts)
}
function getTimeStr(ts) {
    var date = new Date(ts)
    return 'At ' + date.getFullYear() + '-' +
        (date.getMonth() + 1) +
        '-' + date.getDate() +
        '  Time: ' + date.getHours() + ':' + date.getMinutes()
}

function renderTable() {
    var strHTML = ''
    for (var j = 0; j < 4; j++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < 4; j++) {
            var num = getRandomNum(gNums)
            strHTML += '<td>${num}</td>'
        }
        strHTML += '</tr>'
    }
    var elSky = document.querySelector('.table');
    elSky.innerHTML = strHTML
    return table

}