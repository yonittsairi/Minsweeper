'use strict'

const MINE = '<img class="img" src="img/mine.png" id="mine"/>'
const MINDHIDDEN = '<img class="hidden" src="img/mine.png" id="mine"/>'
const FLAG = '<img class="img" src="img/flag.png" id="flag"/>'
var gCurrTime
var gEndTime = setInterval(nowTime, 1);
var gMinescount;
var gShown;
var gflag = []
var gclick = 0
var gLives = 3
var gGame = {
    size: 4,
    mines: 3
}


var gTimer = setInterval(timer, 1000)
var gBoard

function init() {
    gLives = 3
    clearInterval(gTimer)
    gclick = 0
    createMat(gGame.size)
    locateMines(gBoard)
    renderBoard(gBoard)
    gMinescount = gGame.mines
    gShown = gGame.size ** 2 - gGame.mines
}



function createMat(size) {
    var mat = []
    for (var i = 0; i < size; i++) {
        mat[i] = []
        for (var j = 0; j < size; j++) {
            mat[i][j] = {
                isMine: false,
                negsCount: 0,
                isShown: false,
                location: { i, j },
                content: null,
                isFlag: false
            }

        }

    }

    gBoard = mat
}

function renderBoard() {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gBoard[0].length; j++) {
            var object = gBoard[i][j]
            var cell = placeItems(object)
            var className1 = chooseClass(object)
            var className2 = "button"
            var id = 'cell-' + i + '-' + j
            strHTML += `<td class=${className1}><button class=${className2} id=${id} 
            onmousedown = "mouseEvent(event,this)" onclick="cellClicked(this,${i},${j},event)">
            ${cell}</button></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector('.board');
    elContainer.innerHTML = strHTML;
}

function lookForNegsInEachCell(gBoard) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            if (cell.isMine === true) continue
            if (cell.isMine === false) {
                setMinesNegsCount(i, j)
            }

        }

    }
}


function setMinesNegsCount(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue
            if (rowIdx === i && colIdx === j) continue
            var cellAround = gBoard[i][j]
            if (cellAround.isMine === true) {
                var currCell = gBoard[rowIdx][colIdx]
                currCell.negsCount += 1

            }
        }

    }

}

function placeItems(object) {
    if (object.isMine) return MINDHIDDEN
    if (!object.isMine && object.negsCount > 0) return object.negsCount
    if (!object.isMine && object.negsCount === 0) return ''
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min); // Min is inclusive, Max is Exclusive
}



function locateMines(gBoard) {
    var minesToplace = gGame.mines
    for (var i = minesToplace; i > 0; i--) {
        var x = getRandomInt(0, gBoard.length)
        var y = getRandomInt(0, gBoard.length)
        var cell = gBoard[x][y]
        if (!cell.isMine) {
            cell.isMine = true
            cell.isShown = false
            minesToplace--
        }
        else if (cell.isMine) {
            var x = getRandomInt(0, gBoard.length)
            var y = getRandomInt(0, gBoard.length)
            var cell = gBoard[x][y]
            cell.isMine = true
            cell.isShown = false
            minesToplace--
        }

    }


}


function chooseClass(object) {
    if (object.isShown) {
        return "button2"

    }
    if (!object.isShown) {
        return "button"

    }
}

function mouseEvent(event, el) {
    if (event.button === 2) {
        gclick += 1
        if (gclick === 1) {
            lookForNegsInEachCell(gBoard)
            gCurrTime = new Date
            setInterval(timer, 1000)
        }
    }
    var id = el.id
    id = id.split('-')
    var i = id[1]
    var j = id[2]
    var cell = gBoard[i][j]
    if (event.button === 2 && !cell.isFlag) {
        cell.content = cell.negsCount
        cell.isFlag = true
        el.innerHTML = FLAG
        el.className = "button2"
        if (cell.isMine) {
            cell.content = el.innerHTML
            gMinescount--
            victory()
        }
    }
    else if (event.button === 2 && cell.isFlag) {
        cell.isFlag = false
        if (!cell.isMine) {
            el.innerText = cell.content
            cell.content = null
            el.className = "button"
        }
        if (cell.isMine) {
            el.innerHTML = MINDHIDDEN
            el.className = "button"
            cell.content = null
            gMinescount++
        }

    }

}






function cellClicked(el, i, j) {
    gclick += 1
    if (gclick === 1) {
        lookForNegsInEachCell(gBoard)
        renderBoard(gBoard)
        gCurrTime = new Date
        setInterval(timer, 1000)
    }
    if (gBoard[i][j].isFlag) return
    gBoard[i][j].isShown = true
    el.className = "button2"
    checkRevealedCell(i, j)
    gShown--
}

function checkRevealedCell(i, j) {
    if (gBoard[i][j].isMine && gLives > 0) {
        gLives--
        console.log('lives left', gLives);
    }
    if (gBoard[i][j].isMine && gLives === 0) {
        for (var a = 0; a < gGame.mines; a++) {
            var g = document.getElementsByClassName('hidden')
            console.log(g);
            g.className = 'img'
            console.log('lives left', gLives);
        }
        setTimeout(gameOver, 3000)

    }
    if (gBoard[i][j].negsCount === 0) {
        revealSurrounding(i, j)
    }
}





function revealSurrounding(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue
            var cell = gBoard[i][j]
            if (!cell.isShown && !cell.isMine) {
                cell.isShown = true
                var el = document.getElementById('cell-' + i + '-' + j)
                el.className = "button2"
            }
            else if (!cell.isShown && cell.isMine) {
                var el = document.getElementById('cell-' + i + '-' + j)
                el.innerHTML = MINE
            }
            gShown--
        }
    }
}

function gameOver() {
    console.log('GAME OVER');
    clearInterval(gTimer)
    init()

}




function checkLevel() {
    var radios = document.getElementsByTagName('input')
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            var id = radios[i].id
            if (id === 'Easy') {
                gGame.size = 4
                gGame.mines = 2
            }
            if (id === 'Medium') {
                gGame.size = 8
                gGame.mines = 12
            }

            if (id === 'Hard') {
                gGame.size = 12
                gGame.mines = 30
            }



        }
    }
    init()
}

function victory() {
    if (gMinescount === 0 && gShown === 0) {
        clearInterval(gTimer)
        console.log('winner');
    }
}



function nowTime() {
    gEndTime = new Date()
}


function timer() {
    var timer = document.getElementById("timer")
    nowTime()
    if (gclick >= 1) {
        var sec = (gEndTime - gCurrTime) * 0.001
        var min = (gEndTime - gCurrTime) * 0.001 / 60
        var zero1 = ''
        var zero2 = ''
        if (sec < 10) { zero1 = '0' }
        if (min < 10) { zero2 = '0' }
        timer.innerText = zero2 + min.toFixed(0) + ':' + zero1 + sec.toFixed(0)
    }
    else {
        timer.innerText = '00:00'

    }

}