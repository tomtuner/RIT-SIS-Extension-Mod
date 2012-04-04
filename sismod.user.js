// ==UserScript==
// @name               RIT SIS Modifications
// @description        Adds enhancements to the RIT SIS system such as an RIT color theme.
// @namespace          demeo.rit.sismod
// @author             Thomas DeMeo
// @author             Dan Fenton

// @include            http://mycampus.rit.edu/*
// @include            https://mycampus.rit.edu/*
// @include            http://mycampustest.rit.edu/*
// @include            https://mycampustest.rit.edu/*
// @include            http://mycampustest2.rit.edu/*
// @include            https://mycampustest2.rit.edu/*

// @icon               http://development.garnishmobile.com/TriSigma/background_tile.jpg
// @downloadURL        https://people.rit.edu/~tjd9961/RIT_SIS/sismod.user.js
// @updateURL          https://people.rit.edu/~tjd9961/RIT_SIS/sismod.user.js
// @version            0.1
// ==/UserScript==

// Code for updating the script

// Code for Chrome where GM_getValue is not supported, switch to HTML5 storage format for Chrome

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

// **COPYRIGHT NOTICE**
// 
// I, Richard Gibson, hereby establish my original authorship of this
// work, and announce its release into the public domain.  I claim no
// exclusive copyrights to it, and will neither pursue myself (nor
// condone pursuit by others of) punishment, retribution, or forced
// payment for its full or partial reproduction in any form.
// 
// That being said, I would like to receive credit for this work
// whenever it, or any part thereof, is reproduced or incorporated into
// another creation; and would also like compensation whenever revenue
// is derived from such reproduction or inclusion.  At the very least,
// please let me know if you find this work useful or enjoyable, and
// contact me with any comments or criticisms regarding it.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
// 
// **END COPYRIGHT NOTICE**

(function(){

// constants
var SCRIPT = {
	 name: "RIT SIS Modifications"
	,namespace: "demeo.rit.sismod"
	,source: "http://people.rit.edu/~tjd9961/RIT_SIS"      // script homepage/description URL
			+ "/sismod.user.js"
	,identifier: "http://people.rit.edu/~tjd9961/RIT_SIS"  // script URL
			+ "/sismod.user.js"
	,meta: "http://people.rit.edu/~tjd9961/RIT_SIS"        // metadata URL
			+ "/sismod.user.js"
	,version: "0.1"                        // version (this should ALWAYS match the version number at the top)
	,date: "04-02-2012"                    // update date
};
// test for dependencies
var UPDATE = SCRIPT.namespace + ' ' + SCRIPT.identifier;
try {
	GM_setValue(UPDATE, 1);
	if (GM_getValue(UPDATE)) {
		UPDATE = {key: UPDATE, get: GM_getValue, set: GM_setValue};
	}
	else {
		throw {};
	}
}
catch(x){
	UPDATE = {
		 set: function(key, value){ try{ localStorage.setItem(key, value); }catch(x){} }
		,get: function(key, varDefault) {
			try {
				var stored = localStorage.getItem(key);
				if(stored===null){ return varDefault; }
				return stored;
			}
			catch(x) {
				return varDefault;
			}
		}
	};
}
UPDATE = {
	 SCRIPT: SCRIPT
	,defaults: {checkDays: 3, version: SCRIPT.version, date: SCRIPT.date, name: SCRIPT.name,
			lastCheck: typeof(GM_xmlhttpRequest)!='undefined' ? 0 : (new Date()).getTime()}
	,getValue: UPDATE.get
	,setValue: UPDATE.set
	,HttpRequest: (typeof(GM_xmlhttpRequest)!='undefined' && GM_xmlhttpRequest) || function(){}
	,ready: false
	,init: function() {
		if(this.ready){ return; }
		this.ready = true;
	 	for (var name in this.defaults) {
	 		if(name in this){ delete this.defaults[name]; }
	 		else{ this[name] = this.getValue('_UPDATE_' + name, this.defaults[name]); }
	 	}
	 	for (var p in {checkDays:0, lastCheck:0}) { delete this.defaults[p]; }
	}
	,check: function(fnOnNewer, fnIsNewer, blnForce) {
		this.init();
		var interval = Math.max(parseFloat(this.checkDays) * 24 * 60 * 60 * 1000, 0) || Infinity;
		var diff = (new Date()) - parseInt(this.lastCheck,10);
		if(!blnForce && !this.isNewer(this, this.SCRIPT, fnIsNewer) && !(diff > interval)){ return false; }
		if (blnForce || (diff > interval)) {
			var t = this;
			return this.HttpRequest({method: 'GET', url: this.SCRIPT.meta || this.SCRIPT.identifier, onload: function(r){
				t.setValue('_UPDATE_' + 'lastCheck', t.lastCheck = '' + (new Date()).getTime());
				t.parse(r.responseText, [fnOnNewer, fnIsNewer, false]);
			}});
		}
		try{ fnOnNewer(this, this.SCRIPT); }catch(x){}
	}
	,parse: function(strResponse, arrCheckArgs) {
		var re = /\/\/\s*(?:@(\S+)\s+(.*?)\s*(?:$|\n)|(==\/UserScript==))/gm, match = true, name;
		while (match && (match = re.exec(strResponse))) {
			if(match[3]){ match = null; continue; }
			name = match[1];
			if(name in this.defaults){ this.setValue('_UPDATE_' + name, this[name] = match[2]); }
		}
		this.check.apply(this, arrCheckArgs || []);
	}
	,isNewer: function(objUpdate, objScript, fnIsNewer) {
		if(!objUpdate){ objUpdate = this; }
		if(!objScript || (objUpdate.date > objScript.date)){ return true; }
		try {
			return fnIsNewer(objUpdate, objScript);
		}
		catch (x) {
			return (!(objUpdate.date < objScript.date) && (objUpdate.version != objScript.version));
		}
	}
};
var UNSAFE = ((typeof unsafeWindow) != 'undefined'
	? unsafeWindow
	: ((typeof window) != 'undefined'
		? window
		: (function(){return this;})()
	)
);

function showUpdate(objUpdate, objScript) {
	if(UNSAFE.self !== UNSAFE.top){ return; }
	if(arguments.length < 2){ return UPDATE.check(arguments.callee); }
	var title = objUpdate.name + ' ' + objUpdate.version + ', released ' + objUpdate.date;
	var style = [
		 'position:absolute; position:fixed; z-index:9999;'
		,'bottom:0; right:0;'
		,'border:1px solid black; padding:10px 10px 10px 10px;'
		,'background:white; font-weight:bold; font-size:small;'
        ,'box-shadow: 0 0 3px black; border-top-left-radius:5px;'
	].join(' ');
	document.body.appendChild($E('div', {title: title, style: style}
		,$E('a', {href: objScript.source, style: 'color:#513127;'}, objScript.name + ' ')
		,$E('a', {href: objScript.identifier, style: 'color:#F36E21;'}, 'updated!')
		,$E('button', {onclick: 'return this.parentNode.parentNode.removeChild(this.parentNode) && false;',
				style: 'margin-left:1ex;font-size:50%;vertical-align:super;'}, '\u2573')
	));
}

var $E = function createElement (strName, objAttributes, varContent /*, varContent, ...*/) {
    var el = document.createElement(strName);
    try{
        for (var attribute in objAttributes) {
            el.setAttribute(attribute, objAttributes[attribute]);
        }
    }catch(x){}
    if (arguments.length > 3 || (!/^(string|undefined)$/.test(typeof(varContent)) && !(varContent instanceof Array))) {
    	varContent = Array.prototype.slice.call(arguments, 2);
    }
    if (varContent instanceof Array) {
        for (var L = varContent.length, i = 0, c; i < L; i++) {
            c = varContent[i];
            el.appendChild(c && typeof(c) == 'object' && 'parentNode' in c
            		? c : document.createTextNode(c));
        }
    }
    else if (varContent) {
    	el.innerHTML = varContent;
    }
    return el;
}

if ((window.document || {}).readyState === 'complete') {
	showUpdate();
}
else {
	window.addEventListener("load", showUpdate, true);
}

})();

// End of Update Code

var alphaCodes = new Array("ACCT", "MGMT", "ESCB", "FINC", "MKTG", "DECS", "BLEG", "MGIS", "INTB", "CFIN", "EEEE", "EGEN", "ISEE", "MECE", "MCEE", "CMPE", "CQAS", "MCSE", "CHME", "BIME", "LADA", "CRIM", "ENGL", "ENGL", "FNRT", "HUMA", "HIST", "STSO", "PHIL", "ANTH", "ECON", "SOCS", "POLS", "PSYC", "SOCI", "GENS", "ITDA", "ITDL", "PUBL", "WGST", "INGS", "MLAR", "MLAS", "MLCH", "MLFR", "MLGR", "MLIT", "MLJP", "MLPO", "MLRU", "MLSP", "URCS", "SPSY", "MCLS", "CRST", "COMM", "HONL", "ENGT", "PACK", "CVET", "EEET", "MCET", "TCET", "MFET", "CPET", "HSPS", "NUTR", "FOOD", "HOTL", "TRAV", "HSPT", "SERQ", "HRDE", "INST", "ESHS", "FCMG", "SFTE", "DEMT", "HLTH", "ROTC", "AERO", "EMET", "ACBS", "BUSI", "QLTM", "GLSO", "TCOM", "MTSC", "GEOT", "SECU", "CMDS", "PROF", "NACC", "NAST", "NBUS", "NACN", "NACS", "NACT", "NCAR", "NCIM", "NSVP", "MSSE", "NCAR", "NAIS", "NGRD", "NGRP", "INTP", "NLST", "NCOM", "NHSS", "NHSS", "NHSS", "NENG", "NMTH", "NSCI", "NASL", "NCAR", "NCAD", "NAUT", "BIOL", "BIOG", "BIOG", "ENVS", "CHMA", "CHMB", "CHEM", "CHMG", "CHMI", "CHMO", "CHMP", "CHEN", "MATH", "STAT", "PHYS", "GSCI", "CMPM", "CHMC", "MEDS", "MTSE", "CHPO", "DMSO", "PHYA", "PMED", "CLRS", "IMGS", "HOSM", "ASTP", "BIOE", "ITDS", "WVAR", "WCLB", "WHWS", "WDAN", "WFIT", "WHLS", "WREC", "WINT", "WMAR", "WMIL", "FACW", "ELCE", "CRPP", "ACSC", "FYEP", "ITDI", "NMDE", "GRDE", "ARED", "ARDE", "FDTN", "CMGD", "INDE", "ILLS", "ILLM", "FNAS", "IDDE", "ADGR", "ARTH", "CCER", "CGLS", "CMTJ", "CWTD", "CWFD", "CGEN", "CEXT", "PHFA", "PHBM", "SOFA", "PHGR", "PHAR", "IMSM", "IMPT", "PRTM", "PRTT", "GMEP", "NMEP", "USPC", "CMPR", "ISTE", "CSCI", "ISTE", "CSCI", "MEDI", "SWEN", "SWEN", "CINT", "CISC", "NSSA", "NSSA", "IGME", "IGME", "ISUS");
var numericCodes = new Array("0101", "0102", "0103", "0104", "0105", "0106", "0110", "0112", "0113", "0116", "0301", "0302", "0303", "0304", "0305", "0306", "0307", "0308", "0309", "0310", "0500", "0501", "0502", "0504", "0505", "0506", "0507", "0508", "0509", "0510", "0511", "0512", "0513", "0514", "0515", "0517", "0519", "0520", "0521", "0522", "0524", "0525", "0525", "0525", "0525", "0525", "0525", "0525", "0525", "0525", "0525", "0526", "0527", "0531", "0533", "0535", "0550", "0606", "0607", "0608", "0609", "0610", "0614", "0617", "0618", "0619", "0620", "0621", "0622", "0623", "0624", "0625", "0626", "0627", "0630", "0632", "0633", "0634", "0635", "0640", "0650", "0660", "0680", "0681", "0684", "0685", "0688", "0692", "0693", "0696", "0697", "0699", "0801", "0804", "0804", "0805", "0805", "0805", "0806", "0813", "0826", "0835", "0853", "0855", "0855", "0855", "0875", "0879", "0880", "0880", "0881", "0882", "0883", "0884", "0885", "0886", "0887", "0890", "0891", "1001", "1004", "1005", "1006", "1008", "1009", "1010", "1011", "1012", "1013", "1014", "1015", "1016", "1016", "1017", "1018", "1022", "1023", "1026", "1028", "1029", "1030", "1032", "1040", "1050", "1051", "1055", "1060", "1070", "1099", "1103", "1106", "1107", "1108", "1109", "1110", "1111", "1112", "1113", "1114", "1115", "1701", "1715", "1716", "1720", "2001", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2019", "2020", "2021", "2035", "2037", "2039", "2040", "2041", "2042", "2043", "2044", "2045", "2046", "2060", "2061", "2065", "2066", "2067", "2068", "2076", "2080", "2081", "2082", "2083", "3002", "4001", "4002", "4003", "4004", "4005", "4006", "4010", "4011", "4020", "4040", "4050", "4055", "4080", "4085", "5001");

var ritImageDataURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVUAAABmCAYAAAB7lQKZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgSWxsdXN0cmF0b3IgQ1M0IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYwQ0NDREU5NkUxQzExRTE5MTk1QkJCMDY3ODM2Q0RGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYwQ0NDREVBNkUxQzExRTE5MTk1QkJCMDY3ODM2Q0RGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjBDQ0NERTc2RTFDMTFFMTkxOTVCQkIwNjc4MzZDREYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjBDQ0NERTg2RTFDMTFFMTkxOTVCQkIwNjc4MzZDREYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4rOjB1AAAKhklEQVR42uydv1IbSRCH1ypC6wFQ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";
var ritHeaderLogoURI = "data:image/gif;base64,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";

var ritOrange = "#F36E21";
var ritBrown = "#513127";
var bgColor = "#F8F7ED";
var boxBGColor = "#CBCAAC";

var zoomSearchImageURL = "https://mycampus.rit.edu/cs/sasrch/cache/PT_PROMPT_LOOKUP_1.gif";
var wikiFAQURL = "https://wiki.rit.edu/display/itskb/PeopleSoft+Frequently+Asked+Questions";
var ritURL = "http://www.rit.edu";

var githubSuggestionURL = "https://github.com/tomtuner/RIT-SIS-Extension-Mod/wiki";
var githubIssueURL = "https://github.com/tomtuner/RIT-SIS-Extension-Mod/issues";

function loadFunc() {
    sisColorMod();
    addMouseOver();
    changeInputLimit();
  //  fixExpandedSearch();
    //selectZeroDepartmentNumber();

   // selectZeroDepartmentNumber();
   
    
    convertLetterCodeToNumber();
	constructHeader();
    constructFooter();
    constructFeedbackBox();
}

function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

function constructFeedbackBox() {
	if (!(document.getElementById('feedback_box'))) {
		var fragment = create('<div id="feedback_box">' +
									'<div id="top_feedback">' +
										'<span>Have a <a class="feedback_url" target="_blank" href="' + githubSuggestionURL + '" title="Suggestion Reporting">suggestion?</a></span>' +
									'</div>' +
									'<div id="bottom_feedback">' +
										'<span>Submit an <a class="feedback_url" target="_blank" href="' + githubIssueURL + '" title="Issue Reporting">issue or bugfix</a></span>' +
									'</div>' +
								'</div></div>');
		
		// You can use native DOM methods to insert the fragment:
		document.body.appendChild(fragment);
		setFeedbackBoxStyle();
	}
}

function setFeedbackBoxStyle() {
	var feedback = document.getElementById('feedback_box');
	if (feedback) {
        feedback.style.cssText = "position:absolute; position:fixed; z-index:9999;left: 0; bottom: 0;";
		feedback.style.backgroundColor = "white";
        feedback.style.border = "1px solid black";
        feedback.style.padding = "10px 10px 10px 10px";
        feedback.style.boxShadow = "0 0 3px black";
        feedback.style.borderTopRightRadius = "5px";
        feedback.style.fontSize = "small";
	}
	
	var topFeedback = document.getElementById('top_feedback');
	if (topFeedback) {
		//topFeedback.style.cssText = "margin: 0 auto";
		//topFeedback.style.width = "960px";
	}
    
	var bottomFeedback = document.getElementById('bottom_feedback');
	if (bottomFeedback) {
		//bottomFeedback.style.float = "right";
		//bottomFeedback.style.marginTop = '20px';
	}
    
    var feedbackURLS = document.getElementsByClassName('feedback_url');
    if (feedbackURLS) {
        for(i = 0; i < feedbackURLS.length; i++) {
            feedbackURLS[i].style.color = ritOrange;
            feedbackURLS[i].style.textDecoration = "none";

        }
    }
}

function constructHeader() {
	if (!(document.getElementById('enhance_header'))) {
		var fragment = create('<div id="header_bar">' +
								'<div id="enhance_header">' +
									'<div id="left_header">' +
										'<img id= "RIT_header_logo" width="466" height="49" title="RIT Header Logo" alt="RIT Logo" src=' + ritHeaderLogoURI + ' />' +
									'</div>' +
									'<div id="right_header">' +
										'<a id="genesis_faq" href="' + wikiFAQURL + '" title="SIS FAQ">SIS FAQ</a>' +
									'</div>' +
								'</div></div>');
		
		// You can use native DOM methods to insert the fragment:
		document.body.insertBefore(fragment, document.body.childNodes[0]);
		setHeaderStyle();
	}
	// Remove "Search for Classes" header
	var searchClasses = document.getElementById("DERIVED_CLSRCH_SS_TRANSACT_TITLE");
    if (searchClasses) {
        searchClasses.innerText = "";
    }
}

function setHeaderStyle() {
	var header = document.getElementById('header_bar');
	if (header) {
		header.style.backgroundColor = ritOrange;
		header.style.height = "65px";
	}
	
	var enhanceHeader = document.getElementById('enhance_header');
	if (enhanceHeader) {
		enhanceHeader.style.cssText = "margin: 0 auto";
		enhanceHeader.style.width = "960px";
	}
	
	var headerLogoImage = document.getElementById('left_header');
	if (headerLogoImage) {
		headerLogoImage.style.float = "left";
	}
	var rightHeader = document.getElementById('right_header');
	if (rightHeader) {
		rightHeader.style.float = "right";
		//rightHeader.style.marginTop = ((header.style.height)/2) + ''; Cannot get the marginTop to be set mathmatically
		rightHeader.style.marginTop = '20px';
	}
    
    var faqLink = document.getElementById('genesis_faq');
    if (faqLink) {
        faqLink.style.textDecoration = "none";
        faqLink.style.color = ritBrown;
        faqLink.style.fontWeight = "bold";
    }
}

function constructFooter() {
	if (!(document.getElementById('enhance_footer'))) {
		var fragment = create('<div id="footer_bar">' +
								'<div id="enhance_footer">' +
									'<div id="center_footer">' +
										'<span>Improved and enchanced by the <a id="RIT_URL" href="' + ritURL + 
                                        '" title="RIT">RIT</a> community.' +
									'</div>' +
								'</div></div>');
		
		// You can use native DOM methods to insert the fragment:
		document.body.appendChild(fragment);
		setFooterStyle();
	}
}

function setFooterStyle() {
	/*var footer = document.getElementById('footer_bar');
	if (footer) {
		footer.style.backgroundColor = ritOrange;
		footer.style.height = "65px";
	}*/
	
	var centerFooter = document.getElementById('center_footer');
	if (centerFooter) {
		centerFooter.style.cssText = "margin: 0 auto";
		centerFooter.style.width = "275px";
        centerFooter.style.color = "gray";
        centerFooter.style.fontSize = "0.75em";
	}
    
    var ritURLId = document.getElementById('RIT_URL');
	if (ritURLId) {
        ritURLId.style.color = ritOrange;
        ritURLId.style.fontSize = "1.0em";
        ritURLId.style.textDecoration = "none";
	}
}

function validateNumberInput(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

function changeInputLimit() {
    var courseNumberInput = document.getElementById("CLASS_SRCH_WRK2_CATALOG_NBR$72$");
    if(courseNumberInput)
	{	
		courseNumberInput.setAttribute('maxlength', '3');
		courseNumberInput.addEventListener('keypress', validateNumberInput, true);
		//courseNumberInput.onkeypress = validateNumberInput;
	}
	
    var minUnitInput = document.getElementById("CLASS_SRCH_WRK2_UNITS_MINIMUM");
    if(minUnitInput)
	{
		//minUnitInput.onkeypress = validateNumberInput;
		minUnitInput.setAttribute('maxlength', '1');
		minUnitInput.addEventListener('keypress', validateNumberInput, true);

	}
	
    var maxUnitInput = document.getElementById("CLASS_SRCH_WRK2_UNITS_MAXIMUM");
    if(maxUnitInput)
	{
		//maxUnitInput.onkeypress = validateNumberInput;
		maxUnitInput.setAttribute('maxlength', '1');
		maxUnitInput.addEventListener('keypress', validateNumberInput, true);

    }
	
    var classNumberInput = document.getElementById("CLASS_SRCH_WRK2_CLASS_NBR$112$");
    if(classNumberInput)
	{
		//classNumberInput.onkeypress = validateNumberInput;
		classNumberInput.addEventListener('keypress', validateNumberInput, true);

	}
}




function addMouseOver() {
    var units = document.getElementById("CLASS_SRCH_WRK2_UNITS_MINIMUM_LBL");
    var maxUnits = document.getElementById("CLASS_SRCH_WRK2_UNITS_MAXIMUM_LBL");
    if (units) {
		units.style.cursor = "help";
		units.setAttribute('title',"Credits are now Units");
    }
    if (maxUnits) {
		maxUnits.style.cursor = "help";
		maxUnits.setAttribute('title',"Credits are now Units");
    }
    var classStatusImage = document.getElementsByClassName("SSSIMAGECENTER");
    
	for(i = 0; i < classStatusImage.length; i++) {

        if (classStatusImage[i]) {
            classStatusImage[i].style.cursor = "help"
            if (classStatusImage[i].alt == "Open") {
                classStatusImage[i].setAttribute('title', "Class is OPEN");
            }
        
            // Add Checks for class open and wait list here and change the tooltip
        }
    }
    
}

function addLogos() {
    var ritImage = document.getElementById('RIT_logo');
    if (!ritImage) {
        ritImage = document.createElement("img");
        ritImage.setAttribute('id', 'RIT_logo');
        ritImage.setAttribute('src', ritImageDataURI);
        ritImage.setAttribute('alt', 'RIT');
        ritImage.setAttribute('height', '102');
        ritImage.setAttribute('width', '341');
        ritImage.style.position = "fixed";
        ritImage.style.top = "250px";
        ritImage.style.left = "10px";
        ritImage.style.zIndex = "-1";

        document.body.appendChild(ritImage);
    }
} 

function sisColorMod() {
    var headers = document.getElementsByClassName("PSGROUPBOXLABEL");	
	var body = document.getElementsByClassName("PSPAGECONTAINER");
	if(body)
	{
		for(i = 0; i < body.length; i++)
		{
            body[i].style.cssText = "margin: 0 auto";
			body[i].style.backgroundColor = bgColor;
            body[i].style.width = "600px";
            
		}
        var bodyContainer = document.getElementsByClassName("PSPAGE");
        if (bodyContainer[0]) {
            bodyContainer[0].style.backgroundColor = bgColor;
        }
        	var page = document.getElementById("PAGECONTAINER");
           	var pageHeader = document.getElementById("DERIVED_CLSRCH_SSR_CLASS_LBL_LBL");
			if(pageHeader){
				if(!(pageHeader.innerText == "Search Results")){
					if (page) {
						page.style.cssText = "margin: 0 auto";
						page.style.backgroundColor = bgColor;          
						page.style.width = "600px";

					}
				}else {
                    var searchBar = document.getElementsByClassName("PSLEVEL1GRIDLABEL");
                    searchBar[0].style.backgroundColor = ritBrown;
                    for(i = 0; i < searchBar.length; i++)
					{
						searchBar[i].style.backgroundColor = ritOrange;
					}
                    var zoomImage = document.getElementsByName("DERIVED_CLSRCH$pt_modal_cntrl$img$0");
                    zoomImage[0].setAttribute('src', zoomSearchImageURL);
					
					
					var subTableHeader = document.getElementsByClassName("PSGRIDTABBACKGROUND");
					if(subTableHeader)
					{
						for(i = 0; i < subTableHeader.length; i++)
						{
							subTableHeader[i].style.backgroundColor=ritBrown;
						}
					}			
					
                }
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
    var headers = document.getElementsByClassName("PSGROUPBOXLABEL");
    if (headers) {
	for (i = 0; i < headers.length; i++) {
	    headers[i].style.backgroundColor = ritOrange;
	    headers[i].style.borderColor = ritBrown;
	}
	//console.log("SIS Mod");
    }
	
	var pageHeader = document.getElementById("DERIVED_CLSRCH_SSR_CLASS_LBL_LBL");
    if (pageHeader) {
        if(pageHeader.innerText == "Enter Search Criteria"){
            pageHeader.innerText = "Search For Classes";
        }
        pageHeader.style.color = ritBrown;
	}

	var institution = document.getElementById("win0div$ICField46");
	if(institution){
		institution.parentNode.removeChild(institution);
	}
	
	var addSrcCrit = document.getElementsByClassName("SSSMSGSUCCESSFRAME");
	var addSrcCritFrame = document.getElementsByClassName("SSSMSGSUCCESSFRAMEWBO");
	var click = document.getElementById("DERIVED_CLSRCH_SSR_EXPAND_COLLAPS$81$");
	if(click){
		click.style.color = "#FFFFFF";
	}
	
	if(addSrcCrit)
	{
		for(i = 0; i < addSrcCrit.length; i++)
		{
			addSrcCrit[i].style.backgroundColor = ritBrown;
			addSrcCritFrame[i].style.backgroundColor = ritBrown;
			addSrcCritFrame[i].style.borderColor = ritBrown;
		}
	}
	
	
	
	var tableHeader = document.getElementsByClassName("PSLEVEL1GRIDCOLUMNHDR");
	if(tableHeader)
	{
		for(i = 0; i < tableHeader.length; i++)
		{
			tableHeader[i].style.color = "#545446";
			tableHeader[i].style.borderRightWidth = "0px";
			tableHeader[i].style.borderTopWidth = "0px";
			tableHeader[i].style.borderBottomWidth = "0px";
			tableHeader[i].style.backgroundColor = "#DFDECB";
		}
	}
	
	/* Class Detail Page **************************************************************************
	***********************************************************************************************
	***********************************************************************************************/
	
	var boxHeaders = document.getElementsByClassName("PAGROUPBOXLABELLEVEL1");
	if(boxHeaders)
	{
		for(i = 0; i < boxHeaders.length; i++)
		{
			boxHeaders[i].style.backgroundColor = ritOrange;
			//boxHeaders[i].style.color = ritBrown;
		}
	}
	
	var table = document.getElementsByClassName("PSLEVEL1GRIDCOLUMNHDR");
		if(table)
	{
		for(i = 0; i < table.length; i++)
		{
			table[i].style.backgroundColor = "#DFDECB";
			table[i].style.color = "#545446";
			table[i].style.borderRightWidth = "0px";
			table[i].style.borderTopWidth = "0px";
			table[i].style.borderBottomWidth = "0px";
			table[i].style.paddingWidth = "0px";
		}
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
    var letterCode = document.getElementById("CLASS_SRCH_WRK2_SUBJECT$68$");
    if (letterCode) {
        if (letterCode.value == alphaCodes[i]) {
            letterCode.value = numericCodes[i];
        }
        
    }
}

setInterval(loadFunc, 200);