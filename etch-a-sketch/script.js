// grid generator
const genCon = document.querySelector("#genCon")
function  genGrid(x) {
    for (let i = 0; x > i; i++) {
    const genBlock = document.createElement('div');
    genBlock.classList.add('content'+i);
    genBlock.style.border = "1px solid #00000005"
    genBlock.style.borderRadius = "6px"
    genCon.appendChild(genBlock);
    }
    hoverGen(x)
}
genGrid(256)


// random color generator
const colorNumber = Array.from({length:10},(v,k)=>k);
const letterArr = Array.from({length:6},(v,k)=>k);

function random(max) {
    return Math.floor(Math.random() * max);
}

function swapColor() {
    let final = "";
    for (let i = 0; 3 > i; i++) {
        let randNum = random(colorNumber.length)
        let randLet = String.fromCharCode(random(letterArr.length)+97)
        final += randNum + randLet;
    }
    return "#"+final+"33";
}

// grid color swap
let getColor = "";
function hoverGen(x) {
    for (let i = 0; x > i; i++) {
    let hoverDivs = document.querySelector(".content"+i);
        hoverDivs.addEventListener("mouseover", () => {
            getColor = window.getComputedStyle(hoverDivs).backgroundColor
            if (getColor !== "rgba(0, 0, 0, 0)") {
                hoverDivs.style.backgroundColor = lowerBrightness();
            } else {
                hoverDivs.style.backgroundColor = swapColor();
            }
        })
    }
}

// grid color lower brightness
function minMax(x,y,z) {
    if (x >= y && x <= z) {
        return true;
    } else {
        return false;
    }
}

/*
    //works but sometimes change a color to another random one (darker, but random)
function lowerBrightness() {
    let a = getColor.split("");
    let b = "";
    for (let i = 0; getColor.length > i; i++) {
        if ( minMax(a[i],colorNumber[0],colorNumber.length-1) == true ) {
            let c = Math.floor( a[i] - (a[i]/10) )
            b += c
        } else {
            b += (a[i]);
        } 
    }
    return b;
}
*/

function lowerBrightness() {
    let a = getColor.split("");
    let b = "";

    a.pop()
    let tst = parseInt(a[a.length-1])
    let bb = "";
    if (tst < 9) {
        bb = `${+tst+1}`
    } else {
        bb = `${+tst}`
    }
    a.pop()
    a.push(bb,"0","0",")")
    b = a.join("");
    return b;
}

// add different settings
function eraseGrid() {
    while (genCon.firstChild) {
        genCon.removeChild(genCon.lastChild);
        genCon.style.gridTemplateColumns = "auto";
        genCon.style.gridTemplateRows = "auto";
    }
}

function changeGrid(x) {
    x = document.getElementById('grid').value
    eraseGrid();
    let grid = "";
    for (let i = 0; x > i; i++) {
        grid += "auto "
    }
    genCon.style.gridTemplateColumns = grid;
    genCon.style.gridTemplateRows = grid;
    let a = x*x
    genGrid(a);
}

function blackWhite() {
    let getChild = document.getElementById('genCon').childNodes;
    for (let i = 0; getChild.length > i; i++) {
         if (getChild[i].nodeName.toLowerCase() == 'div') {
            getChild[i].style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
         }
    }
}

function resetColor() {
    let getChild = document.getElementById('genCon').childNodes;
    for (let i = 0; getChild.length > i; i++) {
         if (getChild[i].nodeName.toLowerCase() == 'div') {
            getChild[i].style.backgroundColor = 'rgba(0, 0, 0, 0.00)';
         }
    }
}

//change grid automatically
let inputValue = "";
const inputKeys = document.querySelector("input")
    inputKeys.addEventListener("input", (x) => {
        inputValue += x.data;
        console.log(inputValue)
});