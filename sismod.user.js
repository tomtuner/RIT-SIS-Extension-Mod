// ==UserScript==
// @name               RIT SIS Modifications
// @description        Adds enhancements to the RIT SIS system such as a color theme
// @namespace          demeo.rit.sismod
// @author             Thomas DeMeo
// @include            http://mycampus.rit.edu/*
// @include            https://mycampus.rit.edu/psc/sasrch/EMPLOYEE/HRMS/c/*
// ==/UserScript==
sismod = function () {
    var headers = document.getElementsByClassName("PSGROUPBOXLABEL");
    for (i = 0; i < headers.length; i++) {
        headers[i].style.backgroundColor = "#F36E21";
	headers[i].innerText = "Thomas DeMeo";
    }
}

function () {
    var alphaTable = document.getElementByClassName("PSFRAME");
    alphaTable[0].style.display = 'none';
}