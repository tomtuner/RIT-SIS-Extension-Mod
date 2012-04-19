var tooltip=function(){
	 var id = 'tt';
	 var top = 3;
	 var left = 3;
	 var maxw = 300;
	 var speed = 10;
	 var timer = 20;
	 var endalpha = 95;
	 var alpha = 0;
	 var tt,t,c,b,h;
	 var ie = document.all ? true : false;
	 return{
	  show:function(v,w){
	   if(tt == null){
	    tt = document.createElement('div');
	    tt.setAttribute('id',id);
	    t = document.createElement('div');
	    t.setAttribute('id',id + 'top');
	    c = document.createElement('div');
	    c.setAttribute('id',id + 'cont');
	    b = document.createElement('div');
	    b.setAttribute('id',id + 'bot');
	    tt.appendChild(t);
	    tt.appendChild(c);
	    tt.appendChild(b);
	    document.body.appendChild(tt);
	    tt.style.opacity = 0;
	    tt.style.filter = 'alpha(opacity=0)';
	    document.onmousemove = this.pos;
	   }
	   tt.style.display = 'block';
	   c.innerHTML = v;
	   tt.style.width = w ? w + 'px' : 'auto';
	   if(!w && ie){
	    t.style.display = 'none';
	    b.style.display = 'none';
	    tt.style.width = tt.offsetWidth;
	    t.style.display = 'block';
	    b.style.display = 'block';
	   }
	  if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
	  h = parseInt(tt.offsetHeight) + top;
	  clearInterval(tt.timer);
	  tt.timer = setInterval(function(){tooltip.fade(1)},timer);
	  },
	  pos:function(e){
	   var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
	   var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
	   tt.style.top = (u - h) + 'px';
	   tt.style.left = (l + left) + 'px';
	  },
	  fade:function(d){
	   var a = alpha;
	   if((a != endalpha && d == 1) || (a != 0 && d == -1)){
	    var i = speed;
	   if(endalpha - a < speed && d == 1){
	    i = endalpha - a;
	   }else if(alpha < speed && d == -1){
	     i = a;
	   }
	   alpha = a + (i * d);
	   tt.style.opacity = alpha * .01;
	   tt.style.filter = 'alpha(opacity=' + alpha + ')';
	  }else{
	    clearInterval(tt.timer);
	     if(d == -1){tt.style.display = 'none'}
	  }
	 },
	 hide:function(){
	  clearInterval(tt.timer);
	   tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
	  }
	 };
}();

var TimeToFade = 500.0;
var extensionURL = 'https://people.rit.edu/~tjd9961/SIS/sismod.user.js';
var firefoxExtensionURL = 'https://addons.mozilla.org/firefox/downloads/file/149327/rit_sis_extension-1.0.0-fx.xpi?src=dp-btn-primary';
var safariExtensionURL = 'http://www.sisextension.com/downloads/RIT%20SIS%20Extension.safariextz';

var browse;

function fade(browser, eid)
{
	browse = browser;
  var element = document.getElementById(eid);
  if(element == null)
    return;
   
  if(element.FadeState == null)
  {
    if(element.style.opacity == null 
        || element.style.opacity == '' 
        || element.style.opacity == '1')
    {
      element.FadeState = 2;
    }
    else
    {
      element.FadeState = -2;
    }
  }
    
  if(element.FadeState == 1 || element.FadeState == -1)
  {
    element.FadeState = element.FadeState == 1 ? -1 : 1;
    element.FadeTimeLeft = TimeToFade - element.FadeTimeLeft;
  }
  else
  {
    element.FadeState = element.FadeState == 2 ? -1 : 1;
    element.FadeTimeLeft = TimeToFade;
    setTimeout("animateFade("+ new Date().getTime() + ",'" + eid + "')", 33);
  }  
}

function animateFade(lastTick, eid) {
  
  var curTick = new Date().getTime();
  var elapsedTicks = curTick - lastTick;
  
  var element = document.getElementById(eid);
 
  if(element.FadeTimeLeft <= elapsedTicks)
  {
    element.style.opacity = element.FadeState == 1 ? '1' : '0';
    element.style.filter = 'alpha(opacity = ' 
        + (element.FadeState == 1 ? '100' : '0') + ')';
    element.FadeState = element.FadeState == 1 ? 2 : -2;

	console.log(browse);
	if (browse == "chrome") {
	    replaceElementWithChrome(eid);
    }else if (browse == "firefox") {
	    replaceElementWithFirefox(eid);
    }else if (browse == "safari") {
	    replaceElementWithSafari(eid);
	}
    return;
  }
 
  element.FadeTimeLeft -= elapsedTicks;
  var newOpVal = element.FadeTimeLeft/TimeToFade;
  if(element.FadeState == 1) {
    newOpVal = 1 - newOpVal;
  }

  element.style.opacity = newOpVal;
  element.style.filter = 'alpha(opacity = ' + (newOpVal*100) + ')';
	setTimeout("animateFade(" + curTick + ",'" + eid + "')", 33);

}

function replaceElementWithChrome(eid) {
	
	var element = document.getElementById(eid);
	element.innerHTML = 
		'<a href="index.html">BACK</a>' +
		'<h1>Google Chrome</h1>' +
		/* '<h4>Currently tested on Chrome 18+</h4>' + */
		'<h4 class="underline">Installation Instructions</h4>' +
		'<ol>' +
			'<li><p>Click on the "SIS Extension Download" button below.</p></li>' +
			'<a href="' + extensionURL + '" onclick="_gaq.push([\'_trackEvent\', \'Script\', \'Downloaded\', \'Chrome Page\']);"><span class="download align_center">SIS Extension Download</span></a>' +
			'<li><p>A screen will appear at the bottom of your browser confirming you would like to install the extension. Select "Continue".</p></li>' +
			'<img src="images/chrome_continue_dialog.png" alt="Chrome Continue Dialog" width="455" height="45"/>' +
			'<li><p>Another window will pop open on your browser confirming you would like to install the extension. Click "Install".</p></li>' +
			'<img src="images/chrome_install_dialog.png" alt="Chrome Install Dialog" width="391" height="154"/>' +
			'<li><p>Visit the new <a href="http://infocenter.rit.edu" target="new">RIT SIS page</a> and enjoy!</p></li>' +
		'</ol>';
 	element.style.opacity = '100'; 
}

function replaceElementWithFirefox(eid) {
	
	var element = document.getElementById(eid);
	element.innerHTML = 
		'<a href="index.html">BACK</a>' +
		'<h1>Mozilla Firefox</h1>' +
/* 		'<h4>Currently tested on Firefox 11 for Mac</h4>' + */
		'<h4 class="underline">Installation Instructions</h4>' +
		'<ol>' +
			'<li><p>Click on the "Firefox Extension Download" button below.</p></li>' +
/* 			'<li><p>After following the instructions for installing GreaseMonkey you must restart your browser.</p></li>' + */
			/* '<li><p>Following the restart of your browser you should see a small icon on your toolbar that resembles a monkey.  Clicking this will toggle your scripts on and off.  For the most part you should never need to use this button.</p></li>' + */
/* 			'<li><p>Click on the "SIS Extension" download button.</p></li>' + */
			'<a href="' + firefoxExtensionURL + '" onclick="_gaq.push([\'_trackEvent\', \'Script\', \'Downloaded\', \'Firefox Page\']);"><span class="download align_center">Firefox Extension Download</span></a>' +
			'<li><p>A pop-up will appear confirming you would like to install the extension. Click "Install Now".</p></li>' +
			'<img src="images/firefox_addon_install_dialog.png" alt="Firefox Install Dialog" width="499" height="333"/>' +
			'<li><p>Visit the new <a href="http://infocenter.rit.edu" target="new">RIT SIS page</a> and enjoy!</p></li>' +
		'</ol>';
 	element.style.opacity = '100'; 
}

function replaceElementWithSafari(eid) {
	
	var element = document.getElementById(eid);
	element.innerHTML = 
		'<a href="index.html">BACK</a>' +
		'<h1>Apple Safari</h1>' +
/* 		'<h4>Currently tested on Safari 5.1+ for Mac</h4>' + */
		'<h4 class="underline">Installation Instructions</h4>' +
		'<ol>' +
			/*
'<li><p>In order to use these types of scripts in Safari you must first install a plug-in called NinjaKit. This can be installed <a href="http://mac.softpedia.com/progDownload/NinjaKit-for-Safari-Download-79296.html">HERE</a>.</p></li>' +
			'<li><p>After following the instructions for installing NinjaKit you should see a ninja star like icon next to your address bar. If not, restart your browser.</p></li>' +
			'<li><p>Click on the "SIS Extension" download button.</p></li>' +
*/
			'<li><p>Click on the "Safari Extension Download" button below.</p></li>' +
			'<a href="' + safariExtensionURL + '" onclick="_gaq.push([\'_trackEvent\', \'Script\', \'Downloaded\', \'Safari Page\']);"><span class="download align_center">SIS Extension Download</span></a>' +
			'<li><p>You will see the extension begin to download. Open up your downloads and double click on the extension.</p></li>' +
			'<img src="images/safari_install_dialog.png" alt="Safari Install Dialog" width="413" height="158"/>' +
			'<li><p>A second dialog will appear confirming the installation of the extension. Click "Install".</p></li>' +
			'<img src="images/safari_install_confirmation_dialog.png" alt="Safari Install Confirmation Dialog" width="423" height="190"/>' +
/* 			'<img src="images/firefox_install_dialog.png" alt="Chrome Install Dialog" width="443" height="433"/>' + */
			'<li><p>Visit the new <a href="http://infocenter.rit.edu" target="new">RIT SIS page</a> and enjoy!</p></li>' +
		'</ol>';
 	element.style.opacity = '100'; 
}

