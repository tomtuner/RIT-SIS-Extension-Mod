// ==UserScript==
// @name               RIT SIS Modifications
// @description        Adds enhancements to the RIT SIS system such as an RIT color theme
// @namespace          demeo.rit.sismod
// @author             Thomas DeMeo
// @include            http://mycampus.rit.edu/*
// @include            https://mycampus.rit.edu/*
// @icon               http://development.garnishmobile.com/TriSigma/background_tile.jpg
// @version            0.1
// ==/UserScript==

var alphaCodes = new Array("ACCT", "MGMT", "ESCB", "FINC", "MKTG", "DECS", "BLEG", "MGIS", "INTB", "CFIN", "EEEE", "EGEN", "ISEE", "MECE", "MCEE", "CMPE", "CQAS", "MCSE", "CHME", "BIME", "LADA", "CRIM", "ENGL", "ENGL", "FNRT", "HUMA", "HIST", "STSO", "PHIL", "ANTH", "ECON", "SOCS", "POLS", "PSYC", "SOCI", "GENS", "ITDA", "ITDL", "PUBL", "WGST", "INGS", "MLAR", "MLAS", "MLCH", "MLFR", "MLGR", "MLIT", "MLJP", "MLPO", "MLRU", "MLSP", "URCS", "SPSY", "MCLS", "CRST", "COMM", "HONL", "ENGT", "PACK", "CVET", "EEET", "MCET", "TCET", "MFET", "CPET", "HSPS", "NUTR", "FOOD", "HOTL", "TRAV", "HSPT", "SERQ", "HRDE", "INST", "ESHS", "FCMG", "SFTE", "DEMT", "HLTH", "ROTC", "AERO", "EMET", "ACBS", "BUSI", "QLTM", "GLSO", "TCOM", "MTSC", "GEOT", "SECU", "CMDS", "PROF", "NACC", "NAST", "NBUS", "NACN", "NACS", "NACT", "NCAR", "NCIM", "NSVP", "MSSE", "NCAR", "NAIS", "NGRD", "NGRP", "INTP", "NLST", "NCOM", "NHSS", "NHSS", "NHSS", "NENG", "NMTH", "NSCI", "NASL", "NCAR", "NCAD", "NAUT", "BIOL", "BIOG", "BIOG", "ENVS", "CHMA", "CHMB", "CHEM", "CHMG", "CHMI", "CHMO", "CHMP", "CHEN", "MATH", "STAT", "PHYS", "GSCI", "CMPM", "CHMC", "MEDS", "MTSE", "CHPO", "DMSO", "PHYA", "PMED", "CLRS", "IMGS", "HOSM", "ASTP", "BIOE", "ITDS", "WVAR", "WCLB", "WHWS", "WDAN", "WFIT", "WHLS", "WREC", "WINT", "WMAR", "WMIL", "FACW", "ELCE", "CRPP", "ACSC", "FYEP", "ITDI", "NMDE", "GRDE", "ARED", "ARDE", "FDTN", "CMGD", "INDE", "ILLS", "ILLM", "FNAS", "IDDE", "ADGR", "ARTH", "CCER", "CGLS", "CMTJ", "CWTD", "CWFD", "CGEN", "CEXT", "PHFA", "PHBM", "SOFA", "PHGR", "PHAR", "IMSM", "IMPT", "PRTM", "PRTT", "GMEP", "NMEP", "USPC", "CMPR", "ISTE", "CSCI", "ISTE", "CSCI", "MEDI", "SWEN", "SWEN", "CINT", "CISC", "NSSA", "NSSA", "IGME", "IGME", "ISUS");
var numericCodes = new Array("0101", "0102", "0103", "0104", "0105", "0106", "0110", "0112", "0113", "0116", "0301", "0302", "0303", "0304", "0305", "0306", "0307", "0308", "0309", "0310", "0500", "0501", "0502", "0504", "0505", "0506", "0507", "0508", "0509", "0510", "0511", "0512", "0513", "0514", "0515", "0517", "0519", "0520", "0521", "0522", "0524", "0525", "0525", "0525", "0525", "0525", "0525", "0525", "0525", "0525", "0525", "0526", "0527", "0531", "0533", "0535", "0550", "0606", "0607", "0608", "0609", "0610", "0614", "0617", "0618", "0619", "0620", "0621", "0622", "0623", "0624", "0625", "0626", "0627", "0630", "0632", "0633", "0634", "0635", "0640", "0650", "0660", "0680", "0681", "0684", "0685", "0688", "0692", "0693", "0696", "0697", "0699", "0801", "0804", "0804", "0805", "0805", "0805", "0806", "0813", "0826", "0835", "0853", "0855", "0855", "0855", "0875", "0879", "0880", "0880", "0881", "0882", "0883", "0884", "0885", "0886", "0887", "0890", "0891", "1001", "1004", "1005", "1006", "1008", "1009", "1010", "1011", "1012", "1013", "1014", "1015", "1016", "1016", "1017", "1018", "1022", "1023", "1026", "1028", "1029", "1030", "1032", "1040", "1050", "1051", "1055", "1060", "1070", "1099", "1103", "1106", "1107", "1108", "1109", "1110", "1111", "1112", "1113", "1114", "1115", "1701", "1715", "1716", "1720", "2001", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2019", "2020", "2021", "2035", "2037", "2039", "2040", "2041", "2042", "2043", "2044", "2045", "2046", "2060", "2061", "2065", "2066", "2067", "2068", "2076", "2080", "2081", "2082", "2083", "3002", "4001", "4002", "4003", "4004", "4005", "4006", "4010", "4011", "4020", "4040", "4050", "4055", "4080", "4085", "5001");


var ritOrange = "#F36E21";
var ritBrown = "#513127";
var bgColor = "#F8F7ED";

loadFunc = function loadFunc() {
    sisColorMod();
    removeAlpha();
  //  fixExpandedSearch();
    selectZeroDepartmentNumber();

   // selectZeroDepartmentNumber();

    convertLetterCodeToNumber();
}

function sisColorMod() {
    var headers = document.getElementsByClassName("PSGROUPBOXLABEL");
    if (headers) 
	{
		for (i = 0; i < headers.length; i++) {
			//console.log(headers[i].backgroundColor);
			headers[i].style.backgroundColor = ritOrange;
			headers[i].style.borderColor = ritBrown;
		}
    }
	
	var body = document.getElementsByClassName("PSPAGECONTAINER");
	if(body)
	{
		for(i = 0; i < body.length; i++)
		{
			body[i].style.backgroundColor = bgColor;
		}
	}
	
	var labels = document.getElementsByClassName("PSEDITBOXLABEL");
	var dropDownLabels = document.getElementsByClassName("PSDROPDOWNLABEL");
	if(labels && dropDownLabels)
	{
		for(i=0;i<labels.length;i++)
		{
			labels[i].style.color = ritBrown;
		}
		
		for(i = 0; i < dropDownLabels.length; i++)
		{
			dropDownLabels[i].style.color = ritBrown;
		}
		
	}

    if (headers) {
	for (i = 0; i < headers.length; i++) {
	    console.log(headers[i].backgroundColor);
	    headers[i].style.backgroundColor = "#F36E21";
	    headers[i].style.borderColor = "#513127";
	}
	//console.log("SIS Mod");
    }
}

function removeAlpha() {
    var alphaTable = document.getElementsByClassName("PSFRAME");
    if (!alphaTable) {
	alphaTable[0].style.display = 'none';
	//console.log("Remove Alpha");

	console.log("Remove Alpha");

    }
}
/*
function fixExpandedSearch() {
    var advancedSearch = document.getElementById("win0divDERIVED_CLSRCH_SSR_EXPAND_COLLAPS$80$");
    var array = advancedSearch.childNodes();
    for(var i = 0; i < array.length; i++){

		array.item(i).click();
    }

    //console.log("Fix Expanded Search");

	array.item(i).click();
    }
   // console.log(advancedSearch[1].innerText);
/*
    var selectionDiv = document.getElementById("win0divDERIVED_CLSRCH_GROUP4");
    selectionDiv.style.display = 'none';

    console.log("Fix Expanded Search");


}
*/

function selectZeroDepartmentNumber() {
    submitAction_win0(document.win0,'SSR_CLSRCH_WRK2_SSR_ALPHANUM_0');

    //console.log("Select Zero");
   console.log("Select Zero");

}

function convertLetterCodeToNumber() {
    var letterCode = document.getElementsByClassName("PSEDITBOX");
    for(var i = 0; i < alphaCodes.length; i++){
	
	if (letterCode[0].value == alphaCodes[i]) {
	    letterCode[0].value = numericCodes[i];
	    //console.log("if + " + alphaCodes[i]);
	    //console.log("if + " + numericCodes[i]);

	    console.log("if + " + alphaCodes[i]);
	    console.log("if + " + numericCodes[i]);

	}
    }
}

setInterval("loadFunc()", 100);
