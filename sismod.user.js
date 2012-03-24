// ==UserScript==
// @name               RIT SIS Modifications
// @description        Adds enhancements to the RIT SIS system such as a color theme
// @namespace          demeo.rit.sismod
// @author             Thomas DeMeo
// @include            http://mycampus.rit.edu/*
// @include            https://mycampus.rit.edu/*
// ==/UserScript==
//window.onload = loadFunc;
loadFunc = function loadFunc() {
    sismod();
    removeAlpha();
}

function sismod() {
    var headers = document.getElementsByClassName("PSGROUPBOXLABEL");
    for (i = 0; i < headers.length; i++) {
	console.log(headers[i].backgroundColor);
	headers[i].style.backgroundColor = "#F36E21";
	headers[i].style.borderColor = "#513127";
    }
    //console.log("SIS Mod");
}

function removeAlpha() {
    var alphaTable = document.getElementsByClassName("PSFRAME");
    alphaTable[0].style.display = 'none';
    console.log("Remove Alpha");
}

setInterval("loadFunc()", 100);