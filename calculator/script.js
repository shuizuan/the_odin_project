"use strict"

const getButtons = document.getElementById( "buttons" ).children;
const findCalc = document.getElementsByClassName( "calc" );
const histWrap = document.getElementById("historyWrap");
const prevDisp = document.getElementById( "prevDisp" );
const startDisp = document.getElementById("start");
const hist = document.querySelector( "#histBut" );
const clear = document.querySelector( "#clear" );
const send = document.querySelector( "#equal" );
const del = document.querySelector( "#del" )

let mainDisp = document.getElementById( "mainDisp" )
let check = dftDisp.innerText;

// append class
for ( let i = 0; getButtons.length > i; i++ ) {
    getButtons[i].className = ( "calc" );
}

// display calculations
for ( let i = 0; findCalc.length > i; i++ ) {
    findCalc[i].addEventListener( "click", () => {
        startDisp.innerText = null;
        dftDisp.innerText += ( findCalc[i].value );
        check = dftDisp.innerText;
    })
}

// "clear" the display
clear.onclick = () => {
    dftDisp.innerText = null;
    prevDisp.innerText = null;
    startDisp.innerHTML = "Display"
    startPrev.innerHTML = "Previous Equation"
}

//delete previous term
del.onclick = () => {
    if (check.length > 1) {
        check = check.split("");
        check.pop()
        check = check.join("")
        dftDisp.innerText = check;
    } else {
        dftDisp.innerText = "";
        startDisp.innerText = "0";
    }
}

// send button
send.onclick = () => {
    math()
    startPrev.innerText = null;
    prevDisp.innerText = dftDisp.innerText;
    addHist();
    dftDisp.innerText = check;
}

//regex filtering
const reg1 = /(\-\+|\+\-)/g;
const reg2 = /(\+\+|\-\-)/g;
const reg3 = /(\/\+)/g;
const reg4 = /(\*\+)/g;
const reg5 = /(\/\-)/g;
const reg6 = /(\*\-)/g;
const reg7 = /(\d*\.?\d*(\/)[\-]?\d*\.?\d?)/g;
const reg8 = /(\d*\.?\d*(\*)[\-]?\d*\.?\d?)/g;

// filters by order
function math() {
    check = check.replace(reg1, "-");
    check = check.replace(reg2,"+");
    check = check.replace(reg3,"/");
    check = check.replace(reg4,"*");
    if (check.match(/\//) !== null) {
        swapStr( div(), divRes, reg7 );
    }
    if (check.match(/\*/) !== null) {
        swapStr( mult(), multRes, reg8 );
    }
    sum();
}

//replace string according to regex
let rep = [];
function repReg(x,y) {
    rep = check.match(x)
    for ( let i = 0; rep.length > i; i++ ) {
        rep[i] = rep[i].replace(y,",")
    }
}

//swap
function swapStr(x,y,z) {
    let arr;
    let count = 0;
    x;
    while ((arr = z.exec(check)) !== null) {
        check = check.replace(arr[0],y[count]);
        count += 1
    }
    return check
}

//multiplication
let multRes = [];
function mult() {
    repReg(reg8, "*");
    for ( let i = 0 ; rep.length > i; i++ ) {
        rep[i] = rep[i].split(",");
        multRes[i] = rep[i][0]*rep[i][1]
    }
}

//division
let divRes = [];
function div() {
    repReg(reg7, "/");
    for ( let i = 0 ; rep.length > i; i++ ) {
        rep[i] = rep[i].split(",");
        divRes[i] = rep[i][0]/rep[i][1]
    }
}

// +-
function sum() {
    let res = 0;
    let reg = /[-]?\d*\.?\d*/g
    let y = check.match( reg )
    for (let i = 0; y.length > i; i++) {
        res += Number(y[i]);
    }
    check = res
    return check;
}

///////////// Customization
//sidebar
hist.onclick = () => {
    openHist();
}

let count = 0;
function openHist() {
    if (count % 2 == 0) {
        histWrap.style.width = "200px";
    } else {
        histWrap.style.width = "0px";
    }
    count += 1
}

//add history
const mainHist = document.getElementById("mainHist");
let sendCount = 1;

function addHist() {
    let x = document.createElement("div");
    let y = document.createTextNode(prevDisp.innerText + " = " + check);
    x.appendChild(y);
    x.id = sendCount
    mainHist.appendChild(x);
    sendCount += 1;
}