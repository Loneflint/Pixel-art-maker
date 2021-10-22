const grid = document.querySelector('.grid');
const sizeInput = document.getElementById('size');
const gridContainer = document.querySelector('.grid-container');
const palette = document.querySelector('.palette');
const genColor = document.getElementById('genColor')
const customColor = document.getElementById('customColor')
const customColorBackground = document.querySelector('.button-container-background');
const fill = document.getElementById('fill')
const clear = document.getElementById('clear')
const size = document.querySelector('.size');
const err = document.getElementById('err')
const prev = document.getElementById('prevColor')

let prevColor
let fillColor
let currentColor = ['red', 'blue']
let paintColors = ['#0000F6', '#6E6ED8', '#51519C', '#3F3F5E', '#101046', '#4444E8', '#2B2BA8', '#3A3AC8', '#833CC9', '#7622E1', '#4C11CB', '#7545FF', '#AE9DDE', '#4614B1', '#6836D2', '#A870DF', '#FF00D6', '#B70E9C', '#620052', '#B143A0', '#FF7EEA', '#FF4EE3', '#FFC0F5', '#67375F', '#D20000', '#9B0000', '#B63A3A', '#DE4040', '#FF0000', '#591515', '#FF5B5B', '#FF8E8E', '#FF5C00', '#FE813A', '#E79C71', '#7E370F', '#FFAC7D', '#B03F00', '#B65A26', '#7B492C', '#FAFF00', '#FCFF7B', '#898C00', '#5E6000', '#B4B66F', '#BBBE34', '#B7E72F', '#D3C224', '#33FF00', '#49853A', '#318D1A', '#104303', '#83FF64', '#25B900', '#0B3700', '#B9FFA8', '#00F0FF', '#1BA0B2', '#09768D', '#4796A8', '#004751', '#007A82', '#BDFBFF', '#000000'];
let value1Box = document.getElementById("size");
let value1 = value1Box.value;
let unGrid = document.querySelectorAll(".row");
let squares = document.querySelectorAll(".square");

function palette1() {

    for (let i = 0; i < paintColors.length; i++) {
        const shadow = colorShadow();
        palette.appendChild(shadow);
        const color = makeColor();
        shadow.appendChild(color);

        color.addEventListener('click', () => {
            prevColor = currentColor;
            currentColor = color.style.backgroundColor;
        });

        color.style.backgroundColor = paintColors[i];
        for (var j = 0; j < paintColors.length; j++) {
            console.log(paintColors[i]);
        }
    }
}

function colorPrev() {
    document.body.addEventListener('click', () => {
        if (prev.style.backgroundColor.value !== currentColor)
            prev.style.backgroundColor = prevColor;
    }
    )
    prev.addEventListener('click', () => {
        currentColor = prevColor;
    }
    )
}

function colorDisplay() {
    document.body.addEventListener('click', () => {
        if (size.style.backgroundColor.value !== currentColor)
            size.style.backgroundColor = currentColor;
    }
    )
};



function Erase() {
    err.addEventListener('click', () => {
        currentColor = '';
    }
    )
}

function fillGrid() {
    fill.addEventListener('click', () => {
        fillColor = currentColor
    });
}

let customColorButton = () => {
    customColorBackground.style.backgroundColor = customColor.value;
    prevColor = currentColor;
    currentColor = customColor.value;
}

const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    genColor.style.backgroundColor = "#" + randomColor;
    genColor.addEventListener("click", () => {
        prevColor = currentColor;
        currentColor = "#" + randomColor;
    })


}

function colorRow() {
    const colorRow = document.createElement('div');
    colorRow.classList.add('colorRow');

    return colorRow;
}



function sizeChange() {

    value1Box.addEventListener("change", () => {
        value1 = (value1Box.value > 100) ? 100 : value1Box.value;
        removeGrid()
        makeGrid()

    })
}
function removeGrid() {
    for (let i = 0; i < unGrid.length; i++) {
        grid.removeChild(unGrid[i])
    }
}



function makeGrid() {
    for (let i = 0; i < value1; i++) {
        const row = makeRow();
        grid.appendChild(row);
        for (let j = 0; j < value1; j++) {
            const square = makeSquare();
            row.appendChild(square);


            square.addEventListener('click', () => {
                square.style.backgroundColor = currentColor;
            });

            // square.addEventListener('mousedown', () => {
            //     square.style.backgroundColor = currentColor;
            // });

            square.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                square.style.backgroundColor = "";
            });
        }
    }
    unGrid = document.querySelectorAll(".row");
    squares = document.querySelectorAll(".square");
}



function makeRow() {
    const row = document.createElement('div');
    row.classList.add('row');

    return row;
}

function makeSquare() {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `${700 / value1 - 1}px`;
    square.style.height = `${700 / value1 - 1}px`;
    square.style.backgroundColor = fillColor;
    return square;
}

function makeColor() {
    const color = document.createElement('button');
    color.classList.add('color');
    return color;

}
function colorShadow() {
    const colorShadow = document.createElement('div');
    colorShadow.classList.add('colorShadow')
    return colorShadow;
}

function clearGrid() {
    clear.addEventListener('click', () => {
        fillColor = '';
        removeGrid()
        makeGrid();
    });
}

function fillGrid() {
    fill.addEventListener('click', () => {
        fillColor = currentColor
        removeGrid()
        makeGrid();

    });
}

const dragAndDraw = () => {
    grid.addEventListener('mousedown', (e) => {
        e.preventDefault();
        down = true;
        grid.addEventListener('mouseup', (e) => {
            e.preventDefault();
            down = false;

        });
        grid.addEventListener('mouseleave', () => {
            down = false;
        });
        grid.addEventListener('mouseover', (e) => {
            if (e.target.className === "square" && down) {
                e.target.style.backgroundColor = currentColor;
            }
        });
    });
}





grid.addEventListener('click', dragAndDraw);
genColor.addEventListener("contextmenu", generateColor);
genColor.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});
customColor.addEventListener("change", customColorButton);

function init() {
    colorPrev()
    Erase()
    colorDisplay()
    makeGrid()
    sizeChange()
    palette1()
    clearGrid()
    fillGrid()
    generateColor()
}
init();