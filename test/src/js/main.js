/*
 * name: main.js
 *
 * description: This javascript file holds the meat of the functionality 
 *				for the extension. Any generic reusable functions should be loaded here.
 *
 * author: Thomas DeMeo
 *			thomasdemeo@gmail.com
 */
 
	// Google Analytics Code
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-30757586-1']);
	_gaq.push(['_setAllowLinker', true]);	
	_gaq.push(['_trackPageview']);
	
	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
	
	// Code for updating the script
	// Code for Chrome where GM_getValue is not supported, switch to HTML5 storage format for Chrome
	if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported") > -1)) {
		this.GM_getValue = function (key, def) {
	    	return localStorage[key] || def;
		};
		this.GM_setValue = function (key, value) {
	    	return localStorage[key] = value;
		};
		this.GM_deleteValue = function (key) {
	    	return delete localStorage[key];
		};
	}

    // End of Update Code
    var alphaCodes = new Array("ACCT", "MGMT", "ESCB", "FINC", "MKTG", "DECS", "BLEG", "MGIS", "INTB", "CFIN", "EEEE", "EGEN", "ISEE", "MECE", "MCEE", "CMPE", "CQAS", "MCSE", "CHME", "BIME", "LADA", "CRIM", "ENGL", "ENGL", "FNRT", "HUMA", "HIST", "STSO", "PHIL", "ANTH", "ECON", "SOCS", "POLS", "PSYC", "SOCI", "GENS", "ITDA", "ITDL", "PUBL", "WGST", "INGS", "MLAR", "MLAS", "MLCH", "MLFR", "MLGR", "MLIT", "MLJP", "MLPO", "MLRU", "MLSP", "URCS", "SPSY", "MCLS", "CRST", "COMM", "HONL", "ENGT", "PACK", "CVET", "EEET", "MCET", "TCET", "MFET", "CPET", "HSPS", "NUTR", "FOOD", "HOTL", "TRAV", "HSPT", "SERQ", "HRDE", "INST", "ESHS", "FCMG", "SFTE", "DEMT", "HLTH", "ROTC", "AERO", "EMET", "ACBS", "BUSI", "QLTM", "GLSO", "TCOM", "MTSC", "GEOT", "SECU", "CMDS", "PROF", "NACC", "NAST", "NBUS", "NACN", "NACS", "NACT", "NCAR", "NCIM", "NSVP", "MSSE", "NCAR", "NAIS", "NGRD", "NGRP", "INTP", "NLST", "NCOM", "NHSS", "NHSS", "NHSS", "NENG", "NMTH", "NSCI", "NASL", "NCAR", "NCAD", "NAUT", "BIOL", "BIOG", "BIOG", "ENVS", "CHMA", "CHMB", "CHEM", "CHMG", "CHMI", "CHMO", "CHMP", "CHEN", "MATH", "STAT", "PHYS", "GSCI", "CMPM", "CHMC", "MEDS", "MTSE", "CHPO", "DMSO", "PHYA", "PMED", "CLRS", "IMGS", "HOSM", "ASTP", "BIOE", "ITDS", "WVAR", "WCLB", "WHWS", "WDAN", "WFIT", "WHLS", "WREC", "WINT", "WMAR", "WMIL", "FACW", "ELCE", "CRPP", "ACSC", "FYEP", "ITDI", "NMDE", "GRDE", "ARED", "ARDE", "FDTN", "CMGD", "INDE", "ILLS", "ILLM", "FNAS", "IDDE", "ADGR", "ARTH", "CCER", "CGLS", "CMTJ", "CWTD", "CWFD", "CGEN", "CEXT", "PHFA", "PHBM", "SOFA", "PHGR", "PHAR", "IMSM", "IMPT", "PRTM", "PRTT", "GMEP", "NMEP", "USPC", "CMPR", "ISTE", "CSCI", "ISTE", "CSCI", "MEDI", "SWEN", "SWEN", "CINT", "CISC", "NSSA", "NSSA", "IGME", "IGME", "ISUS");
    
    var numericCodes = new Array("0101", "0102", "0103", "0104", "0105", "0106", "0110", "0112", "0113", "0301", "0302", "0303", "0304", "0305", "0306", "0307", "0308", "0309", "0310", "0501", "0502", "0504", "0505", "0507", "0508", "0509", "0510", "0511", "0513", "0514", "0515", "0519", "0520", "0521", "0522", "0524", "0525", "0525", "0525", "0525", "0525", "0525", "0525", "0525", "0525", "0525", "0525", "0526", "0527", "0533", "0535", "0606", "0607", "0608", "0609", "0610", "0614", "0617", "0618", "0619", "0620", "0621", "0622", "0623", "0624", "0625", "0626", "0630", "0632", "0633", "0634", "0635", "0640", "0650", "0660", "0801", "0804", "0805", "0806", "0813", "0835", "0855", "0875", "0876", "0879", "0880", "0881", "0882", "0883", "0884", "0885", "0886", "0887", "0890", "0891", "1001", "1004", "1005", "1006", "1008", "1009", "1010", "1011", "1012", "1013", "1014", "1016", "1017", "1018", "1026", "1028", "1029", "1030", "1032", "1040", "1050", "1051", "1060", "1107", "1108", "1109", "1110", "1111", "1112", "1113", "1114", "1115", "1701", "1715", "1720", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2019", "2020", "2021", "2035", "2037", "2039", "2040", "2041", "2042", "2043", "2044", "2045", "2046", "2061", "2065", "2066", "2067", "2076", "2080", "2081", "2082", "2083", "3081", "3084", "3088", "3092", "3097", "3099", "4001", "4002", "4003", "4004", "4005", "4006", "4010", "4011", "4020", "4040", "4050", "4055", "4080", "4085", "5001", "5010");
    
    var majorNames = new Array("ACCOUNTING", "MANAGEMENT", "ECONOMICS (COB)", "FINANCE", "MARKETING", "DECISION SCIENCES", "BUSINESS LEGAL STUDIES", "MANAGEMENT INFORMATION SYSTEMS", "INTERNATIONAL BUSINESS", "ELECTRICAL ENGINEERING", "GENERAL ENGINEERING", "INDUSTRIAL & SYSTEMS ENGINEERING", "MECHANICAL ENGINEERING", "MICROELECTRONIC ENGINEERING", "COMPUTER ENGINEERING", "QUALITY & APPLIED STATISTICS", "MICROSYSTEMS ENGINEERING", "CHEMICAL ENGINEERING", "BIOMEDICAL ENGINEERING", "CRIMINAL JUSTICE", "WRITING", "LITERATURE", "FINE ARTS", "HISTORY", "SCIENCE, TECHNOLOGY & SOCIETY", "PHILOSOPHY", "ANTHROPOLOGY", "ECONOMICS", "POLITICAL SCIENCE", "PSYCHOLOGY", "SOCIOLOGY", "INTERDISCIPLINARY-AEROSPACE", "INTERDISCIPLINARY-LIBERAL ARTS", "PUBLIC POLICY", "WOMEN'S & GENDER STUDIES", "INTERNATIONAL STUDIES", "Modern Language-Arabic", "Modern Language-American Sign Language", "Modern Language-Chinese", "Modern Language-French", "Modern Language-German", "Modern Language-Italian", "Modern Language-Japanese", "Modern Language-Protuguese", "Modern Language-Russian", "Modern Language-Spanish", "FOREIGN LANGUAGES", "URBAN AND COMMUNITY STUDIES", "SCHOOL PSYCHOLOGY", "MUSEUM STUDIES", "COMMUNICATION", "ENGINEERING TECHNOLOGY", "PACKAGING SCIENCE", "CIVIL ENGINEERING TECHNOLOGY", "ELECTRICAL ENGINEERING TECH", "MECHANICAL ENGINEERING TECH", "TELECOMMUNICATIONS ENGINEERING TECH", "MANUFACTURING ENGINEERING TECH", "COMPUTER ENGINEERING TECHNOLOGY", "HOSPITALITY SERVICE", "NUTRITION MANAGEMENT", "FOOD MANAGEMENT", "HOTEL & RESORT MANAGEMENT", "TRAVEL & TOURISM MANAGEMENT", "HOSPITALITY - TOURISM", "SERVICE QUALITY MANAGEMENT", "HUMAN RESOURCE DEVELOPMENT", "ENVIRONMENTAL MANAGEMENT", "FACILITY MANAGEMENT", "SAFETY TECHNOLOGY", "DISASTER & EMERGENCY MANAGEMENT", "HEALTH SYSTEMS ADMINISTRATION", "RESERVE OFFICER TRAINING - ARMY", "AEROSPACE STUDIES", "ELECTRICAL MECHANICAL ENGINEERING TECHNOLOGY", "ACCOUNTING TECHNOLOGY", "BUSINESS CAREERS", "APPLIED COMPUTER TECHNOLOGY", "INTERDISCIPLINARY STUDIES", "CIMT - COMPUTER INTEGRATED MACH TECH", "MASTER'S OF SCIENCE IN SECONDARY EDUCATION", "ARTS AND IMAGING STUDIES", "ASL-ENGLISH INTERPRETATION", "DEAF STUDIES", "LABORATORY SCIENCE TECHNOLOGY", "COMMUNICATION STUDIES AND HUMANITIES", "HUMANITIES & SOCIAL SCIENCES", "SOCIAL SCIENCES", "ENGLISH", "MATHEMATICS", "SCIENCE", "AMERICAN SIGN LANGUAGE", "CAREER EXPLORATION", "COMPUTER AIDED DRAFTING TECHNOLOGY", "AUTOMATION TECHNOLOGIES", "BIOLOGY", "BIOLOGY/MEDICAL GENERAL EDUCATION", "FIELD BIOLOGY", "ENVIRONMENTAL SCIENCE", "ANALYTICAL CHEMISTRY", "BIO CHEMISTRY", "CHEMISTRY", "GENERAL CHEMISTRY", "INORGANIC CHEMISTRY", "ORGANIC CHEMISTRY", "PHYSICAL CHEMISTRY", "MATHEMATICS & STATISTICS", "PHYSICS", "GENERAL SCIENCE EXPLORATION", "MEDICAL SCIENCES", "MATERIALS SCI. & ENGINEERING", "POLYMER CHEMISTRY", "DIAGNOSTIC MED SONOGRAPHY", "PHYSICIAN ASSISTANT", "PREMED STUDIES", "COLOR SCIENCE", "IMAGING SCIENCE", "ASTROPHYSICAL SCIENCES AND TECHNOLOGY", "HEALTH AND WELLNESS SEMINARS", "DANCE", "FITNESS", "HEALTH AND SAFETY", "LIFETIME REC ACTIVITIES", "INTERACTIVE ADVENTURES", "MARTIAL ARTS", "MILITARY SCIENCES", "FACULTY/STAFF WELLNESS", "ENGLISH LANGUAGE CENTER", "COLLEGE RESTORATION", "FIRST-YEAR ENRICHMENT", "NEW MEDIA DESIGN", "GRAPHIC DESIGN", "ART EDUCATION", "ART & DESIGN EXTENDED STUDIES", "FOUNDATION COURSES", "COMPUTER GRAPHICS DESIGN", "INTERIOR DESIGN", "ILLUSTRATION", "MEDICAL ILLUSTRATION", "FINE ARTS STUDIO", "INDUSTRIAL DESIGN", "ART DESIGN GRADUATE STUDIES", "ART HISTORY", "CERAMICS & CERAMIC SCULPTURE", "GLASS", "METALCRAFTS & JEWELRY", "WEAVING AND TEXTILE DESIGN", "WOODWORKING & FURNITURE DESIGN", "GENERAL CRAFT STUDIES", "CRAFTS EXTENDED STUDIES", "FINE ART PHOTO", "FILM/VIDEO/ANIMATION", "GRADUATE PHOTOGRAPHY", "PHOTOGRAPHIC ARTS", "IMAGING & PHOTOGRAPHIC TECHNOLOGY", "PRINTING MANAGEMENT", "PRINTING TECHNOLOGY", "GRAPHIC MEDIA PUBLISHING", "NEW MEDIA PUBLISHING", "BUSINESS ADMIN - MGMT", "QUALITY MANAGEMENT", "TECH COMMUNICATIONS", "MATH & SCIENCE (CMN)", "MULTI/INTERDISCIPLINARY STUDIES", "PROFESSIONAL STUDIES", "COMPUTER PROGRAMMING", "INFORMATION SCIENCES & TECHNOLOGIES", "COMPUTER SCIENCE", "INFO TECH GRAD WEB & MULTIMEDIA", "GRADUATE COMPUTER SCIENCE", "MEDICAL INFORMATICS", "SOFTWARE ENGINEERING", "SOFTWARE ENGINEERING - GRADUATE", "COMPUTING INTRA-COLLEGE STUDIES", "COMPUTING & INFORMATION SCIENCES - PHD", "NETWORKING, SECURITY & SYSTEMS ADMIN", "NETWORKING, SECURITY & SYSTEMS ADMIN - GRAD", "INTERACTIVE GAMES & MEDIA", "INTERACTIVE GAMES & MEDIA - GRADUATE", "INSTITUTE FOR SUSTAINABILITY", "ARCHITECTURE");

    var ritImageDataURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVUAAABmCAYAAAB7lQKZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgSWxsdXN0cmF0b3IgQ1M0IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYwQ0NDREU5NkUxQzExRTE5MTk1QkJCMDY3ODM2Q0RGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYwQ0NDREVBNkUxQzExRTE5MTk1QkJCMDY3ODM2Q0RGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjBDQ0NERTc2RTFDMTFFMTkxOTVCQkIwNjc4MzZDREYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjBDQ0NERTg2RTFDMTFFMTkxOTVCQkIwNjc4MzZDREYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4rOjB1AAAKhklEQVR42uydv1IbSRCH1ypC6wFQcrjOJ+cn59YDIOfoYovcRy7IfeTg+IAcP4DILefWXdVdJB6Ay7lp1HsnY0D7p2d3duf7qqZwGbGSZnp+0z3dO/vsxx92PifZmRu+btu13iO/67rWT4qTvv+NawvXrl1byr///PuvmwTMebnzYuJ+TAxso6ztpPTVjp7E2cPrFo7FifsxwCorZ+7saX8r5x8NjF/ni/X3H94zuKVO3C/aCUtsobaxCdF2AEqxFeF37mkbrYnszLULBBYAStBPRXVeMLxqk8iOpTmBlb44deI6xz5yc/2ALZXdxrEk3QoC8MXddtOz29vbR1/hREZCsTfq1XU9GfpMJ2TWlaBbwWRFXA1xdiRjJXuXuxWKrNjWpWtXSWR76eyp1ofs0T8pqmuDJCL2Tj06S8buQywCnqwi+Eckt0wnvEz2qedI6NS181jHrYSopt78fM25+O93eeaqzs2ujvNPySq3YT3mqVP2h2tf83xG1bT+vYhKIvRXZbQks6iufZCRTggLLt0HODI0pJ6K656xVy0Dt19G/OFBgz7xtBDKIngZef/mEdXUo//k28ZzVIhk4dh93jNPn7On/bdbYHF6m0tU9Q0/JPcy6kW9Cdcpp54mrA+vOvrJ6sFwfzdeAL3YVItFtXKP3n02ccpGoQrqI5HVJIe47ncKhlYWeNmvFANx7Vi+XLKqTbViqp462IyTjM25cURxTs9m7ivZejutYYvkk4HtnFVop3e1pyLkWf+mU+BNFkZi1fXdGe7HL4ltxneqe0UQyARbY8bed2ZBZTurmJCPtf9sRVVZGA2u7464UY/V0oBOdIsBbLxVq2jiih7NxAGCWthepd825YG6dYpqVR1hLawiqFNMzIxro+sgFJu5pEywtJ7M3I+nth/6nRgMWIX10NA7HuoGNpRnbjTG3A23mY90gVk/3liH/43bu1LX3dKoJthWMOClbmbGwmPqpJ1HL6raGeK2WxnWAG81GE+VBNVm2HO2xVZUG77RfWx4rV1sC5riqdIF5t7qQ31aeE+1yZ0xM/RWh5hXEF4myZenWVJuVpn33+1E2hkXRtfpsgVQepFjP9Q/9LEfvpqF/4YeRhtCIUQVEFUcAhNRXTS4M5aGnx9RBUQ1Xu5vPW13Iu4MK291G7uqnWu6oLVRZejcz8/0YhZVq9W7h10FZ9iAqNa2oCOqgCi2HJKBXvkHUf3f0MwmMhUAhO8QLd9VAGxF3iFLwndoIb8lno/WhG8i3n1E9VsPCVEFwn0o2teyXz0n/AcA8ASiaufxAgAgqkYhANlrAEBUAQAQ1fDghCQAQFQViyejEvoDAKKqWNTyfcGMACB6UX2588KqPpXwHwAQ1cTmdKkFmX8AQFRXWNyvf44JAQCiaiOqjz34CwAQ1bh4ufOiayCq5zxMDQAQ1RVDAy+V0B8AEFVlt+TfH+GlAgCimvx3oHSZ0H/mBHWG6QAAorpiUuJv5ZzKI8wGABDVlZc6LuGlSrh/SNgPAIjqSlDlPv/3JQR1nxPVAWATUTxORQX1pETIf4iggge7TEv7+mu2NicaQlRDN9yReqhFDk+ZJQFm+nUyyvd6o5PyRifkJ/dZLzHrRtvljfud1ECf0kuIamhG21OjHRYM9z86wz4L1Ov+kHz7wMLU4xm43+/pVgXeTri2KcnSxxKmMpYT95ptN4YkRRHVYMT0nXpyRbhUQV0G+N26uo3xlNedbnWMMe8g7XOQZKtAGbnXXlG+h6jW6b29TlZF/UUPnr7U8Dnko/yybmP0JbxkKyBI9nK8VsQXUUVUva/ywivXnif/b/IXPWx6qUZ70ZAj/IY5Jy+iGh55Svr6dBeimodfnUjeZDCqrvH7SkLns3qljcno67ZGlwnZeLp0AaLqiyomvYTyaWZc/r1ocAJnG3MFQFTrQoTzbZsy4LLX67zVPH/CEwnCZJZk38ZhDBtIW++ousuSa7a8bRPSx2uhOq5yvPYj3YWo5iENydNmvSqn9ZxtIusZruKhX2DeQUYckjzMkkBcUL1B+J+X3x4qX9I7TfYSmz1XKYaftqWIWrcA5LtMNwjqEQ8kDHocjzRJO34iyqDwH0/VbiV3bZzYlQON9A6WNnk6++rp30cWqX0Kxhsxjsfux1vXTteiNfn32P3ugDvi8FR9reZ3omhwObnt77ot4ZR6+GMts9peCxeZiM0ax6UKKSCqlQqrCIfF46Sn7lpf23TalE5KwnwAwv9cHDwS6hbhRG9pBQCIU1Q1pD1MVgmYskiJ1YcWlloBAKKaS1gX6rFa0EvaWcMKAIhqLmGV5Myx0eVkC2DK8ANAtKKqwiqHRltl8IdSw4oJAEC0oqqIt2qVuBrpzQYAAHGKqiauZH/VqiZzirACQMyealqfeWB4yfeUWgFAtKKqwmqZuEpPtUJYASBOUVVhtUxcibAeUmoFANGKqmKZuEqfRAoAEKeoauJKTm2ySlz1KbUCgJg91XVhtUJKrd5jHgAQpaiqsMoWgOXBvmNKrQAgWlFVYc36qIqsSA3rADMBgChFVYVVvFXLM1M/UGoFAE0QVZ8eoGXiqq1PZgUAPNXM3qp14gphBYB4RVWF1Tpx1cZHXgMAoppLWK0TVwNqWAEgWlFVYbVOXEkN6xjTMWWbLgBEtVlYJq6E99SwmtKjCwBRbZa3ap24EqaUWiHKALF6qj4SVwLHBbJ9AGAmqo0TEw+JKx55DQBmolpWSJ7XJKzWiSseeQ0AQYT/r2p8b+vElXjtnGpVALZPAFFtAR7OYBVG1LDWEvEIHHoDzRbVNngXmrg6Nr4sj7wG8LwAhn5yXFFPtRXehSauzowvyyOv82GxDcR+dnN43vbx7sRuxE5YxVudG1+WR15XO8no6+bwuu3j3anzSwUkPAeuLQ2vxyOvK45YXF9zA0DgaIWMxZwYIqqPE8RE0MSVCKtl4opHXmfDqnCfBSx8rMSwH/IiWreo/hzQNoCPxFU/oYZ1k3dpNTne0KPB8y7Qa9Urqpp5s5oIQbnxnhJXCOvj7Fp6QfRx0AvoxDgyHYVaBVDEU50Yvn8vtGP0PCWuRFh/Z4/1Oy91z/CSXePrgd1Yj4x1IyXI58d1cnaOCKD16vAuwI6xTlwlukqf6Yod+yS7OzMhsa8imVDOFtY4uyZ3Gvq6KSZNCAflmD27vb3NOgmkc3wZrCSIjjX8DsUg7sL2xE/5mAj2R9dmmiSLaaINdJL5TDScunYeW98GFoXsauRQ1ZZMMHPqUVFVIZUJIAmAYUWdIx1z4dpnTRzVbRzDxO9zqWTwZ659kS0H952XLZ1kskC91olWVVQifSuL9JVrCwTW+0IpQvqTjnPdked8rV1XPa+e/fjDzskD/99PwijwXyTflzl91X3PqgxGwvVJhUIgArDfwIk1Sr5PPHWTcEqdbpIHTidrYl/XvDj+uvZfTTpz4Zvx9znuW4F3TO0T0nX+qRrTsIK36ybNPRxkO/DP3uS+pQ8b9Nk72EkmrM9gBYCWslUmdLoflrv2TwZvprdhNQmuREL245y3epg8nLiS/ZrrDH01yPh/beehLZ37ZClpa6QtMc65NUOQ8yGyHLwTxHz6V4ABAHqFwlH8zGLMAAAAAElFTkSuQmCC";
    var ritHeaderLogoURI = "data:image/gif;base64,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";
    var ritSGLogoURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAyCAYAAACXpx/YAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Qjk2MUJBMUY4NEYxMTFFMUI2NjNBRDJBQkNBMzBGNjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Qjk2MUJBMjA4NEYxMTFFMUI2NjNBRDJBQkNBMzBGNjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCOTYxQkExRDg0RjExMUUxQjY2M0FEMkFCQ0EzMEY2MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCOTYxQkExRTg0RjExMUUxQjY2M0FEMkFCQ0EzMEY2MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pr+kk0YAAB93SURBVHja7FwHeBTV2j4zO9v7bnpPSAgtgVADoRqKNCmCwLUgooCi6AVFpSjqRURULiCgoICKIHZAkEsJvYYEkgBpQHrbZJPtbcr+39klMUCMCeCv3ut5GDaZnXLmvF953++cCeF2u9FfpkFf3Q6z3G0zaN3WWl/WXOvvtuj9WUudH2et9UEOo5azW1Sc0yJ30w4pR9vFiKFFyM1QCJGo/kkJz/8c/EAxiOI7SEpkIwQSGymUmkixwkBIFHpSoq4hpRodKddUkTJtFSHTVBNilZ4Qyyz1V/grNOpP2SunTcyZq4I5fVkEoy+JZmuLYSuPZE1VIaxV78c5TCpE22Uc66TcHAu4c57TeBhEAgYfNg+Y8EnAvno4bgbY+7sbAw2G4zkD/hHwM4u81yMIOJeEq/JEDBKILaRIUceTanU8hX8pTx1cwNOG5vO0Ydd4muACUuFbjgQSx59tKIk/3IOdNgmnL2rDVOTF02XZXZmq/Hi6tiiGM1cHsi6zALG0t6MkdkKedyN4MPgEutWTGv/mbmK/+1d+b+7c+j14nNwcBwPGgPODUXGM9yseH/GEcicp8yvna8PzqYC2mfyg9mm8wLZZGHwwDMf/FsAOi5SpzItjCi8muYou9HVVZndhjOVhbpeFxJ6EB4wgBbBhbyTvCUi/+7kQQTyAgzF6PnHkEMhZShVcJAhof4EfnnBCENHlJC8g5jISSm3/dQBz+uII5lrqAEf+yfvpkozeLkNJOIRYT/hDPAF4Jd8zKH8oSPf6XDyuHEQf1oU48HiCL0Z8dViBMDThpKBt0n8EbbofJdQhJX9ZgLmagjau7OMjHFdSxrjKMhJZW42UgCyJKBGAyvMMyx8CUkO+hezrefb6HPzLWe5GZxI3crm7Pp/fSA1ugmjxfW8EeY+HI8bhOYaU+piFIQmnxR3u+5Hfrt/PpDas8M8PsM2gcl45MtKRsecfzsJzA1lbrcQNIRdYqpew/M6e5N2BAQOaxGLyxSACe4/nBB5y8yj4EMAH5EW+0E5QIjuihA6C4jsJkk9DRKHRjbTgIW4cy3dzNB8zcTfjFHGMQ0QAM+cYp5gDz0Qs47mX5/oefnCDJxCUxyjI5sgdXJ/DUQxCOk/qYxFG9koRdxm1jd+u/8+EWGH6UwHMVuR2dKT+MM2WtXcSU1cYQmASBCEJg8r9nqESDxL2Cpz7YKBJGGBSKKdhwKpIhV8ZpQwqItSBRZQyoISU+1aQMo0OJFAtKZKZCUpsdfMBXB7fBREFLIHHIYK4TZYBgCRiAWiW5hO0U+Sm7VKQYQq3zajhLLW+nKk6iDNWhrKGinAGNmD6waxN78c6zXwMHuExLOAVeKs3nlufC+dwABs/A18bXSSJH7Fd1H3sFtI/OvcPBZi9nppkPfnlc/acA2NBuggRXwoPQv1+YRYDCiEOA4pZNU+itpDqiGuCgOgsfkC7izz/NpdIn9DrGExCJLf8IVLdDjrdrAtk9SVt2MprneiKnM6uqvw4tq4kmrPrJR4GjsHGqapRVGvwbBwZAGxSrLaLOwz5Xpr0yGpeeMK5/1eAmcK0ROvhT16x5RwcQ7BOYIyyJhnv3QBMeLMjPDCEQcbm+Z2U+Zv4/rEXBeFdMSs9RQW2zSRUgSU4/P6pG8cSbkN5GA1SkCm8AOohva+zKi+es+rknuelJB7HuI2Zuyz4O07SYeh3kkFPLqdC49N+V4BBr0ZaD657zXph52NuxkESQqmnjOC+h3mU9Dgq7Q1Z4KWUJrJQ3KZXijCm7z4egEqqgsrQf0Fz15WG0oUX+zjzjg93Xk8dxNQWhOEQjVMbVhX17oKJoNtlBieS0tKuEzZJB89aSqqCS+4twBxL2o9/Psd0eO1izlylIYWK22TN3QKMWSZH2xAJIYxSR5QJ2w3cI+44+FsqouspJJJZ0X9xc9tNcqYwPcl5af8Ee+6xEYyhOBATNhKDXT9KOD05zYinDNIpk+csESb9Y31LSqa/CTCnuxZr+fHNtfTVQ8ksJUdCPoWcLJYY3u/5JIgfuI+D9e6gSC83wftZt9tLsrBCcKMmWaWHTUIoIvhSThTZ+5Ck25gtAmCSSKquQ/+DzW2p1dLZR0ba0ndOdRScvc+N0xOkQBKnQExaISXi0C1pP3yvfNziZ0lteMEdA0xf3DvRtPP19TklVdpKlwz5Sghkp92ocwAJN/Qec7GSQzV2N+obSiGZAKGsKtYDYJXV7fmdBE8PkhEoWAGd49w3yQQ3tkip1iKJG7Vd3Gvix7ywzmno7/YLiS1M72U7u2OWLWvfQ5y9VgIKAQbUW/BzO02IpwiqVI//10x+p8G7Wg2w/cC6Rcb9K97i8wXoqomPdua60Et9hOidE06UHEWh3iE8z42OFTEos5pFz3YTIgZ+LzS4UZiSQJ9lOFGsloc6+VPI7ORQIIDMcTdCMQALLNEq6zZhkwizRN/Iq7/5sCxLVFeUhZcXFrQtKy6I0ZWXRRpqdIEWo0HjcDhkLEPz8LOQoEP5AoFDJJZapEpFrVrjU6UNCCwOCA69HhAafs0vMLhYKL67+rDJUKfW6yqD9ZUVoTW6ipA6XXWQxWxSsTQt4jjGK4tJCsgy3ykUiexiidQsVSjq5Ep1jUqj1Sm1PpUqrVanUGlaFKW4qvx2thNb51gvfDcN1IqIAKA98gsXTdycWz18wUuigU+839S5Tc4mWXYuXWU+tm4OKVR6qk4CkIg45BocbhSkIDxgZYDnBgEHFPEJJIcNHBudL2dRAni3EEitAOI2D6KKBtSAhCIQg2fnaAfi4PGlCRO3yjBZ8I/J+a2BvJR6pn/6qWP352ak96koKYy2mI0ShvZOQJBYb8N9GiYeiIZyFbBvnEZYVG/APIpCEqmcxmBHt49L65KYdCC+Z58jQeHNGxc+v7TgWmxuZnqvnIwLfQrzcjrryoqjjHW1vg6HnQDDasQncBi94TBurw64iUCC8eF+iMQSRq5Q1mr9A0tCIttkx3SIT23bOeFMVGyHDIFI5Ly1D3icZA++8Yyk95T1lkPrF1mzdj+EVQuPL8G1b6Ju9+vvKWx1PtIR8179TQ+27lq20nRkzQvgYZ5CHQ+ALTVx6PscGon5CLXz4aFhUXxUDPtUQoQydRy6UsOix+IFqNzMIa2YQBIA/PMMF4rWkCgRQrfDhcOxAQmDu2UoRr44n4rtv7+5Qc3NvNDjwA87pp09cmBMVWlJEBgpooR8xKcEiOSRd57fWA5HAmS3WRB4PZr/7ofPjXl0+odNHVuQeyXu1MF9484fSxlVmJ/T2WI0CjB4FJ+PKFydA8MnyDubF8azUhz0hQEJyNKMxxBFIgkKjIjM69Evec99o8d9Ed0x/sKvytTLKSONP7+33FWR0ZEUqbxebjci5ZB5SyXD/7noVwG2H90817Br0fsEnFQvwXngIQV1brQrz4We6CJAa1KdaGysAHXyIz2k6UQJhGgdi2Z3F3rJF3iqGDz243QnagvGMCCYg7zNIkW/p1ZIhzy7pLnZlLysjG5fb1iz4Ozh/WPtdispFkvBSu/dlDWuJDmddhzemOfffHfm0PGTN916zLkjB0fs2f7Z7ItnTgy1mo0UXyhEAr4QIgX5u+ZbbMQ040IuuwOJpVK23/2jdzz2/MsLA0KarlED81bY/rPqLdOpzXPw7BuOtG6HCaknvPu0qPeUj24DmL12rn/1xodTgJvziEZFC+zB2ZBjMwDEMQBslYVFqeUcGhHDR1Lw6NRyBumAUA2K4CMR5b2WFaLW0SIWqUgr6h0bWKWdsHQG1fHXiQDtdAi/+PCDN37c8vFcAJYPobRF3oE90gWDwtKsp8znmQwAg8QehkNhY2/Hz+SwW5FUpjDOX7H24Z4DB+9pfK3si2mJX6xe8VbaycODcRlaLJHcsYfeLdAswyBTnR5p/AOsr77/0ZRe9w3d/WvHuzJ+nlD3w+KPOVutxlMdg11+s7b3JcM6p/4CsMsm0a95KM1VdaUdCXH9Ns1KeGUP9lABSXgksOuGLOLDGIJFNMgk7+EkohgjogLiM+X/WPlQczVVm8Usf/uFGd+fOvjzYJlC1aIQjMFyQYgFsuQKjYzO9g8OK5TKZSYIvzzI29rqivIwXXlJOORJCWbrkPOQy+VE/oEhpQtWbZzQrnPXs79IfJbctm7l6zs2rH7V6XDwJTJZK4tUnOfaLO3y9o3kNQCFmwAiAF8oaBJIHKpZlkY0DtN4UgTGEfdVodbofQOCi7V+gYXxvXoffuDhaWsJkuR+fS4gJ86w9fmvnbrcdnhshCFdL2ie2ZaIKIHLA7Dj2Gcv1P346kpSokH1Ebs52yUaihNNFC+wVnMYkCg88bT68bVjkdxX1wyBIVbMf277vm+2ToKHavGgOux2lJQ8fNczr709S+sfUHFbjgJGXVNZGXL1cmb39BOHh585cmCUUu1TvWj1xvHBEVH5jY3rvZef/+LI3h/GyOTKVuV3p9MBkceJVBofW5v2cekxnTqnBkdG5SpVmmr8aCZDrV9hfl6ny+fPDMjPzozDYHrAYBgPkEKhGMnVaoMPEK2gsMj8kKjoK6FR0ZeDwyPzfINCipVqTQ1BtDyCuA0VQbVbnt7lLLvYjeBopJm4coYw8aGNhNtultWseTCD0RdEETzB3ZUbAVysbYXBndNVT24aSsg0+uY6lXb88PBXpk3cK5UrWlcLd9Eosl2HrBGTH10bFBqRr/ELKAcDqZZKZSZKIKBvPd5Qq9fyeDxWrlQZGgCy28RvPjt995mUfclylbpVIdRmNaPYuISs5LEPbUocNGRXYFjE9ebOST95dPCPn38yF4iUIzym7SUA83JIRBQGskihUtfes/Bu0vnXbpx2yFma3lEY1uOK9tmvuxLO9N2T9V+9sB3P2d5NudEbrpyIkgWU+8ze3odQhxT9Voc2v//2ii8+XPGiohUD3BCiISwCSMBqBZAvpaxELjcoFGo9aMwq/6DggtComCuRse0vhse2z/Txu93LV78+/5MfP9swvTWRw5PzaSd6ZPZLSyY++cw7t0oau8Uis9mt0noOQ3qmoUlOIBDaaZrmkyTJ8PnYAN0EpBMKvJnPchzod45srqAIKdANz6VrUR+rC2Kq100+yZorfH2mfz6Ccl5OGdc47N6x9XhXJXKqh5ZNbQm4uLXp0CkVkyM8cK1hqTiv8kGu8PnKG4bF8EzgpXU1Oi2Xn90WtGk/7Gk8OEal0RqiO8Sf7zts5Nf9739gh1ShMKUePTTipy+3TJcrW2dYDmDgM19+Y/74J2ataGoE3p4764cr6ed6CETiJoyScHsX77VuzS024rgevU+/8dHnw1tk/L6R+aoJb0+v2TBllzP7yFjKWX6pO0Hy7wpc3GWg7Ujef+Y6ftu+B1t6Wr9ho7559NmXe+zYuPpFXJgQAXO9E52LF+jx8NZQtxE39irV+ROHB585/J/B32/66KWnFy99etfWTXOxQbWGJQMBQ5269TrfNLgIFV/Lb59x+ngy6+YIl9N5b2Sdp9hTi+K6Jx5rzXmCjsm7Zb2mfuW4djaZ5CzVwfXM70474WZZRKlCa2T3zXqzlcC4n3hx4UvLN387uO+wUTuBcVqsJjPCGyZSHnbJ4qUzd25+JMXzSB7Iv6i06HrMv+Y8uffyhdQBeF9rGg0pIb5nUsqvfX/u8IGxkJsJHFl4FO+ebJgAB4RGGAaNmbC5tc8tG/bcQtxtvHBc6EZ3vlbfw6bx7Eb/GRuR3Kf6Tq7RpU+/Q3irLC0Oz05P7XslIy2pKD83XldeFmE21Po47XYhLgJ411m5PSxUIpG1uvggFIkQQ9MCfH5rNS4+x2a1yJuUKXDNgzu/meYEzyXMNy+nEomlnupX/eL81jSrxYQe/+erb2t9/SpbbdjasOvSbuM3ElVLetYBQCp0Y+K+9STL8xPjO+fHeNI/Jru1Hcm/lNkNQFR37TvwttBuM5vkhrpaX2Ot3s8M+tZusyosJqOmIDe788kDeydYTUZ1a0M6jgjYSFo76CzDImDbuuWffdsP5Exe4++MdXqfbR+ufBP4BIknGSBqMED+XGCQxPnjh0aUFVyPbU1FDpM0HJqTBo/Y/9q6zSMpis/ckffZjFJCv+rBNFf5pa7krUtGWggwxzixLLqoee6broggWhVL044fGbZs7swdZpNBCXnmdN8hI79J6NN/f0hkmxwgSGxzEwDzpjxwLjsjrQf2yhaDCyAJxRI7sF8bJmWtHXSHw4b8A4KLH5+3aH7iwMG7RdKmy65Ws0l2PftywvH9ex46uueHRxxWq6o10QaMGXXp3e/06+s+G3W3Moqw7H7nPdOxj+fhCtadAIznJWW9H98kf/DN6a25ccqu7x7598K5nzIcIwAZAYNnB33rQjKFkg0Ob5MbHhObFRwRlavx868QicUm8CAB6Fm/8oJr7a5cTO1TVgheQVGt8kAbhLwXl6+Z6RsQVLRg+uR9QmC7ONe1BmRc3MDpIrRN2wI8+6Px9S8nSR4H4VRh1Nf466sqg3UVpWHQVwUuboCEa3E6cHrGgEFDxk/aNhvIoFShvOvlswRTeKFnzYZHTgFUvMawthhghxEpRyxaLE6e+a+W3vSHzR/P+3j56+/h2aFbvQjLGzwdSNPeNwLq81+95+KfPRMAYBQtjlQWKxIKhfQTLy1+edzUp1bifbu2bn5u/dKFqyBME7g82NqGiy0uMEhvhYrzroPm8bx1cPgkW2g4OGXgCRCsItrGdbk48anZ7wwYMWbHvSp+ULzwzudEkYkp9txDQwiBtEm51Nw+zyp9ocTc0htuem/p8u3rP5gvlsqblETY2nHttqn6betyLeth4vh6XZMGpEx9/uWF7RO6nan//oFHpq0JhVTwyYq33s3NTOtCgcEIhaIWexsl4Hu2O+0bLtRgI5GrNY7E3v1SBo+btKn3fUN3NVWJuyuAsU9KBz75ti3v0BAMV/0LJUQzsug2Fk07xb/pRWaz/N+L5m3e9eXmB5VarXfJDkfcsxkb7Ek0QyPGSXvmV9VaX3PPAUMPDpsweWOPAck/N3VOQlL/Ayu77U48vOeHh/d/t/2pnMyLiU6z1QMcny9sVfhurrTJ4b5BRGJgw4sU4PnNnbonnu/RL/mn7gPu++lW0nYvW8N0oeXrVz4zn/3iMVKs9azgazHJghws7zdjnWzMotnNUn6TUYGZ79Xsy90Kci4nVJQWtTHV1vphL+NuvIrpXaFBIhJAJ2+8IooXRjReHo77y0LoxuG7XjbhNxqkcjntFxhUGN0x/nznxL4HOvdKOuQfHFrcivIYyruU0f388cPDM8+dTi66mhtn0FdrsP719A0vtKfIm/r1yyB6+4UNi/NM5v8i5wQiCa6m1QSFReZFd4w73yGhx/HY+C5n/YJ+/xfPbgIYWes0NWsnnaVrrkaTApln4XXLWLQDiSJ6nVI//WVSa26Ml+PUVJaHVpWVRurKSyNqqipD8Ror2O9jNRvVDptN5nI6RAzNCBiWoXC9FkgOJxSLrXKZok6p0eq0AYElgSHh14CM5QRHtsn1DwopbGrJy500Q021X0nBtdiS6/kdSwuut6suL42s09cEAFFTuhxOMRhYA3mAnEsL8NorqdQkV6r1Kh/fCv/AkMKA0LCreKbILyS0AEDWoz+g3bSigy29lKDf8Ohh1mlR8vjiBp3YHMDY20lKaPOZ+1O71izI/m3Wy4Byozj45NmtFhn0k8RzokCuHPcKxDvqF01TQAL5nJtrABhPIoCsc4FeZdGfrN3EcnghnS6oH/lwAgbM8+bbjXdnmt3gGNZaI3FmHJjY0pu6HHaRobbGt7ljMLhZqWcG5l/O7CFTqoxylboOJJTxt8AFmRKAZ2p+rwEDIBmhRALeKjPXb1hb32twdZXlwQzD8O8pwLjx2yYd1D6+4QFCpKxl8bsxBPmbtWj8uoX17PbZyGUXNz0jYhc77TaPFrEYjaoXpow5d3zf7ilNFTAaM82N7yxZu2Xlsvd+kTtmQaNjicYEC7d9326bueCJSUdop+O2gQH9etu5kC8Jh80quvEz2ThWweBSN4yRD30X3NpHuIcI7lv/2gGOODzvdVjSez7dYGROp+MmTWcxGRvGyXtfLwdgWe819n//1fRXH5twAvomuVuAm7R0KqbPIZ8ZnyUbts3d5qq80h7Abn6FB+hZuupKlP3k1jniQU8tb/zdNxvXvnrh1LH++LD+I8d8A7kt4Mr503EOi3m+WCKt3b1184v/XLbysQsnjg65lHbuvpkL3pj1wYJ/fm4yGhQ1FeV+3foOzKvVVQV8uOTljVarpb1AICh45rVlTx34bsfTV7MzO9mtVhWeV502d8G87etXLSkvuhaw8d03Vz23ZPmM+j4c3btzMsihtyKiY/ONtXqfx56f/6ZQJDavX7p4pc1qUQ0aNW475PTKE//Z8/DyLTv6rn7j1U9lcoU+MDQi5/BP383DjpA0eMT6xOT7d62Y/+wOyBW2jt17nYRr0FcupPYAABVWk0m+cNWGcd9uWr9AX1kRqNdVRuDVGgq1Wpd+6ljSjJeXLOzcu++B1Yte3GKzWTtCWC+a/dqyJ4/89OPU7AupPZ1OpwwMSfrk/Nfm7Pho9ZLi63khG5a/sXru0g+m3lMPbghFwR0vap7e1l/aZfzXuJiBXwjzrNhA6LYNs0hCKEOmlA8Xc5W5HRpf58yhfeMxidL6B5TJpPK6hD79/yOWK9Gg0eM/gwG8nnn2VGdcrNdX64LLCq+1P/D9jscvQWie9sIrXWGQfUiKZwIjmZ928uiofsNHtwEjGLx1zYo3qspLoiB8Jw4cNe6LjLMne1SVF0d37z9wj1rrZxw+8eH1jfuwbd0Hr0TExEY/8MgTw7POn+5RWni9zarFL66N7ZyQMG/ZvyO/XPv+AjOQvqL87PjDe3f+Ay+VlStVNRvfeX1VeEy7ttHt46PXLV34/qW0M/0up5/rGhIdkzfm0elryouvtwfm3WfI2ImfXr18sVNW6umBFUWFbY11+qBBo8Z/DvJrSFhMuyyVxtdx/OefHvn2k/Xzz584MqLfsNHhVy9n9f/83+++WV1RGp5/JavXkHETP83JOB9fUVLYruegobuUaq1t9JSpa+55iL7JM2XaGsWjqyapH3x3FilU6DlHHfJq5du1MJ5y5JxmqfGrV7cih0VWH34mzZzzOlj+j9UV5REbVryxTipXGiiSRH7BwSU4r+IegCTpUF5UECsQihwMw3qWqoZEReM3FPC6Ycpus2ghJ9sYh+uF4RMe/qBL734pEPYlIZHR1waOHPMlLoqIxFK7r39QGRbywRGRN+lKiVRuxnO0tMuFF+p5wqzDYRerND7INzDIMxUY3SHuQtKQEd+uXvzS6uDwqNyeAwfvtlrNIsbl2gTGOXfSjOfflcoUBkw8Bwx/4GtssOB1wqCwiKL+w0d/hWeNWIblsRxNRbXvlNW174D9FJ+H+sI1A0PDixnGJbDbrGrwXCdo4qeHjpu0rMeAQXudDoc0OCyiuP/9o7cLhGK86M4B1y4F/Uz6h4Re/V0Bbpjy6jPlY5/nvu0p6zJhOyZfLG1rSkYiLK8cpakJph2vfI48+YRwnz18YGz2xdQkksdzxXVPPKLSaGrAc85tWfnOYpBJgV0S+6Vt+WDZO3XVVWogUzWDRo/brvHxu75k1qPlMJjZoG8dYx578j3/oNDCtJNHknMvZfRs065TulytrpFIpXUul0uk0vjpeRTfFRnb4TzILOKjZUtusvwn5i1cCGRw36mUfRt5JMWp1BrjjFeWvHJo1zfl8x8bbxoyfvK3PQck70seM/FTCPf0YPDIqHYds8ZPe3pdYV5OXOrxlAeEIpELSzG1j18lAbIIXxe8XAdbFe6DxtevXCQRmxVKbSWAbcAzST5+QZU4l4tkUr1UrqgFr38/NComN+344QdystL7R8Z2zFRqfcrhuXVgfCK1n385PIejTWz7NKfD7txwy3PctUxqUQ025+hQ88H1rzkKTyV5X3GU3DJ9CJ4Lni7tNuVLxeR3psIxbEVJUSQQEjIoPPIaPgZkjxQ0pa9/cGgJZtR2u12mUChrwcLl4NW1VrNJAYNGSYCtwgAJYHCMeJFcZVlpuNbXrwoGpA4IlwKTJYlMbjYbDWqRRGIBCeWESBHM41MsGEnDHOrm95ctg/DbMbpjfNrmD5Yuee/LncPwrBWEZSXcU+IXFFLRiAAp4H6m+vo3sNlQN8uR/sEhRWDFBNxLLpbJbRRFMUCCxDhKAZO2WU1GuUgsttMuWkDySI4SCF02s0kqVSgsLrtDBLIK99WKyV5VRVm4WuOjg++MmEhhsvfLNSQOSiBwQcoKhEjH4TVm/68A36CtBH3x54nm41vmukpSe3lgFUga/d0cDLIRSTqN2qmc8u6jSCQ3oz+w4XeLDnz/9eNgWIr4xD4pfYeO/A79j7S7+yMsIAnoKymjbKe/esZ+/cRQt8tGEAA0eWONF+c0IkFItzTV5OVTeQGxl9Hf7S8GcOMKT3FGd0f6zqm2ywfGs3VFQZ4/MILnmHHBRKKuU41cME/Ys/Vri/5ufxKAG6K3tU5N5xwfbs/8+SFXYeogxqpT1P9dR1nnB7+TjZz3MukTce3vof+LAnxTBDeUhdJ5p5Od2UdHO4vT+7l0V3x5Eh9OMWj2Ukn/aR8gidLwNwR/YYBv8myLXsuUZPVw5p8a5sw7mUyAHhR3G79V1GXk14TSr+JvKP7iAN9aGmEr8zvQ19P6IJdNzAuLP8UPjctEfBH9NyT3tv2fAAMAhZOpAuzYCzsAAAAASUVORK5CYII=";

    var ritOrange = "#F36E21";
    var ritBrown = "#513127";
    var bgColor = "#F8F7ED";
    var boxBGColor = "#CBCAAC";

    var zoomSearchImageURL = "https://campus.rit.edu/cs/sasrch/cache/PT_PROMPT_LOOKUP_1.gif";
    var wikiFAQURL = "https://wiki.rit.edu/display/itskb/PeopleSoft+Frequently+Asked+Questions";
    var ritURL = "http://www.rit.edu";

    var githubSuggestionURL = "https://github.com/tomtuner/RIT-SIS-Extension-Mod/wiki";
    var githubIssueURL = "https://github.com/tomtuner/RIT-SIS-Extension-Mod/issues";
    
    var itsSISURL = "https://www.rit.edu/its/help/peoplesoftsupport/";
    
    var rootURL = "https://campus.rit.edu";
    
    var homeLink = rootURL + "/psp/TRITXJ/EMPLOYEE/HRMS/h/?tab=DEFAULT";
    
    var courseSearchLink = rootURL + "/psp/PRITXJ/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL?Page=SSR_CLSRCH_ENTRY&Action=U";
    
    var shoppingCartLink = rootURL + "/psp/PRITXJ/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES_2.SSR_SSENRL_CART.GBL?Page=SSR_SSENRL_CART&Action=A";
    
    var studentCenterLink = rootURL + "/psp/PRITXJ/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?PORTALPARAM_PTCNAV=HC_SSS_STUDENT_CENTER&EOPP.SCNode=HRMS&EOPP.SCPortal=EMPLOYEE&EOPP.SCName=CO_EMPLOYEE_SELF_SERVICE&EOPP.SCLabel=Self%20Service&EOPP.SCPTfname=CO_EMPLOYEE_SELF_SERVICE&FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_SSS_STUDENT_CENTER&IsFolder=false";
    var addToFavoritesLink = rootURL + "/psp/PRITXJ/EMPLOYEE/HRMS/s/WEBLIB_PTIFRAME.ISCRIPT1.FieldFormula.IScript_PT_Popup";
    var signOutLink = rootURL + "/psp/PRITXJ/EMPLOYEE/HRMS/?cmd=logout";
    
    var sgVoteLink = "http://vote.rit.edu";
    var facebookURL = "http://facebook.com/sisextension"
    
    // DO NOT FORGET TO CHANGE THIS TO FALSE WHEN PUSHING LIVE
	var testEnvironment = true;

	// Test Path
	var testPath = 'https://people.rit.edu/~tjd9961/SIS/test/src';

	// Production Path
	var prodPath = 'https://people.rit.edu/~tjd9961/SIS/src';


    function loadFunc() {
    
    	
    
        // Check to see if you are on the main search page
        if (onStudentCenterPage()) {
            constructFeedbackBox();
            addTwitterBox();
            constructBanner();
        }
        
/*         uncheckOpenClassesOnly(); */ 
/*         setCourseCareerDropDown(); */
        
        constructAutocompleteBox();

        sisColorMod();
        addMouseOver();
        changeInputLimit();
        //  fixExpandedSearch();
        convertLetterCodeToNumber();
        
        formatTopTabBar();
        
        majorAutocomplete();
        removeOldHeader();
        constructHeader();
        constructFooter();
        
    }
    
    function getIndexes(arrayName, what) {
            var indexes = []
            what = what.toLowerCase();
            if (!what.length) {
                return indexes;
            }
            
            for (el in arrayName) {
            	if ((arrayName[el].toLowerCase()).match(what)) {
            		indexes.push(el);
            	}
            }
            return indexes;
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
    
    var twitterFeedHeader = '<h3>RIT Twitter Feed</h3>' + 
	            '<ul id="twitter_choices"><li class="twitter_titles selected_orange" id="tweet_news" style="display:inline-block;" onclick="selectTwitterFeed(\'RITNEWS\', \'tweet_news\'); _gaq.push([\'_trackEvent\', \'Twitter\', \'Selected\', \'RIT News\']);">RIT News</li><li class="twitter_titles" id="tweet_athletics" style="display:inline-block;" onclick="selectTwitterFeed(\'RITsports\', \'tweet_athletics\');_gaq.push([\'_trackEvent\', \'Twitter\', \'Selected\', \'RIT Athletics\']);">RIT Athletics<li class="twitter_titles" id="tweet_sg" style="display:inline-block;" onclick="selectTwitterFeed(\'RIT_SG\', \'tweet_sg\');_gaq.push([\'_trackEvent\', \'Twitter\', \'Selected\', \'RIT Student Government\']);">RIT SG</li></ul>';
    
    function addTwitterBox() {
    	if (window.innerWidth > 1429) {
    		// Load Tweet plugin		
			if (!(document.getElementById('tweets'))) {
	            var fragment = create('<div class="twitters" id="tweets">' + twitterFeedHeader + '</div>');
	
	            // You can use native DOM methods to insert the fragment:
	            document.body.appendChild(fragment);
	            getTwitters('tweets', {
      		  	id: 'ritnews', 
       			 prefix: '<img height="16" width="16" src="%profile_image_url%" /><a href="http://twitter.com/%screen_name%">%name%</a> said: ', 
       			 clearContents: false, // leave the original message in place
       			 count: 5, 
       			 ignoreReplies: true,
       			 newwindow: true
   				 });
   				 
   				 
            }
            
    	}else {
    		var tweetBox = document.getElementById('tweets');
    		if (tweetBox) {
	    		tweetBox.parentNode.removeChild(tweetBox);
    		}
    	}
    }
    
    function selectTwitterFeed(feed_id, div_id) {
    	var tweets = document.getElementById('tweets');
    	if (tweets) {
    	
    		// Clear contents before adding new tweets
	    	tweets.innerHTML = twitterFeedHeader;
    	
	    	var twitter_titles = document.getElementsByClassName('twitter_titles');
	    	// Clear class names
	    	for (var i = 0; i < twitter_titles.length; i++) {
	    		twitter_titles[i].className = 'twitter_titles';
	    	}
	    	var tweet_title_div = document.getElementById(div_id);
	    	
	    	tweet_title_div.className += " selected_orange";
	    	

    		getTwitters('tweets', {
      		  	id: feed_id, 
       			 prefix: '<img height="16" width="16" src="%profile_image_url%" /><a href="http://twitter.com/%screen_name%">%name%</a> said: ', 
       			 clearContents: false, // leave the original message in place
       			 count: 5, 
       			 ignoreReplies: true,
       			 newwindow: true
   				 });
		 }
    }
    
    // Format Top Tab Bar
    function formatTopTabBar() {
    	var topBarDiv = document.getElementById('win0divDERIVED_SSTSNAV_SSTS_NAV_TABS');
    	if (topBarDiv) {
    		var topBarImages = topBarDiv.getElementsByTagName('img');
    		for (var i = 0; i < topBarImages.length; i++) {
	    		topBarImages[i].parentNode.removeChild(topBarImages[i]);
    		}
    	}
    	var middleBarDiv = document.getElementById('win0divDERIVED_SSTSNAV_SSTS_NAV_SUBTABS');
    	if (middleBarDiv) {
    		var middleBarImages = middleBarDiv.getElementsByTagName('img');
    		for (var i = 0; i < middleBarImages.length; i++) {
	    		middleBarImages[i].parentNode.removeChild(middleBarImages[i]);
    		}
    	}
    	
    	if (middleBarDiv) {
    		var middleBarTd = middleBarDiv.getElementsByTagName('td');
    		for (var i = 0; i < middleBarTd.length; i++) {
    			if (middleBarTd[i].height == '2' || middleBarTd[i].height == '1') {
		    		middleBarTd[i].parentNode.removeChild(middleBarTd[i]);
	    		}
    		}
		}
    }
    
    
   	
   	// Currently not working
   	var td = document.getElementsByTagName('td');
   	if (td) {
   		for (var i = 0; i < td.length; i++) {

   			if (td[i].height == 24) {
   				td[i].height == 0;
   			}
   		}
   	}
   	
   	function constructAutocompleteBox() {
   		if (!(document.getElementById('suggestions'))) {
            var fragment = create('<ul id="suggestions">' + '</ul>');

            // You can use native DOM methods to insert the fragment:
	    	var majorInput = document.getElementById('CLASS_SRCH_WRK2_SUBJECT$70$');
            if (majorInput) {
            	majorInput.parentNode.appendChild(fragment);
        	}
        }
   	}
   	
   	// Only needs to be done once
	 var majorInput = document.getElementById('CLASS_SRCH_WRK2_SUBJECT$70$');
	 if(majorInput) {
	 	if (majorInput.value != 'Start typing in a major') {
			 majorInput.value = 'Start typing in a major';
		 }
	}
	// Make sure the window is scrolled to the top
	window.scroll(0,0);

    
    function majorAutocomplete() {
    	 var majorInput = document.getElementById('CLASS_SRCH_WRK2_SUBJECT$70$');
		    if (majorInput) {
		    	majorInput.maxLength = 50;
		    	majorInput.style.width = '150px';
		    	majorInput.onclick = (function() {
				if (majorInput.value == 'Start typing in a major' || majorInput.value == 'START TY') {
					majorInput.value = '';    	
				}
		   	})
		   	
		   	if (majorInput.value == '') {
		   		var suggestions = document.getElementById('suggestions');
				suggestions.style.visibility = 'hidden';
		   	}
		   	majorInput.onkeydown = (function(event) {

		   	// Arrow down event
				if (event.keyCode == 40 || event.keyCode == 38) {
					var list = document.getElementsByTagName('ul');
					var listChilds = list[0].childNodes;
					var noMatch = true;
					for (var i= 0; i < listChilds.length; i++) {
						if (listChilds[i].className.match('selected')) {
							if (event.keyCode == 40) {
								if (i+1 <= listChilds.length) {
									listChilds[i+1].className += " " + "selected";
									listChilds[i].className = 'suggestion_option';

								}
							}else if (event.keyCode == 38) {
								if (i+1 >= 0) {
									listChilds[i-1].className += " " + "selected";
									listChilds[i].className = 'suggestion_option';
								}
							}
							noMatch = false;
							return;
						}
					}
					if (noMatch) {
						listChilds[0].className += " " + "selected";
					}					
				}else if (event.keyCode == 13) {
				// Enter was pressed
				
					if (majorInput.value.length == 4) {
						console.log('valid number and enter was pressed');
						var search = document.getElementById('CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH');
						if (search) {
							window.location.href = search.href;
						}
					}
				
					var list = document.getElementsByTagName('ul');
					var listChilds = list[0].childNodes;
					var noMatch = true;
					for (var i= 0; i < listChilds.length; i++) {
						if (listChilds[i].className.match('selected')) {
							majorSelectedWithElement(listChilds[i]);
						}
					}
					
					/*

					var numberSelector = document.getElementById('CLASS_SRCH_WRK2_SUBJECT$70$');
		   			numberSelector.blur();
*/
				}else {
		   		var value = majorInput.value;
		   		var matches = getIndexes(majorNames, value);
		   		var suggestions = document.getElementById('suggestions');
		   		
		/*    		console.log(matches.length); */
		   			if (majorInput.value) {
		   			if (matches.length) {
		   				if (suggestions) {
		   				suggestions.style.visibility = 'visible';
		   				// Remove all of the elements in the div before adding new ones
		   				while (suggestions.hasChildNodes()) suggestions.removeChild(suggestions.firstChild);
		   				var fragment = create('<li class="suggestion_option"><span class="course_number">' + 'Search ' + ' </span>' + value + '</li>');
		   					suggestions.appendChild(fragment);
		   				for (el in matches) {
		   					var fragment = create('<li class="suggestion_option" id=' + numericCodes[matches[el]] + '><span class="course_number">' + numericCodes[matches[el]] + ' </span>' + majorNames[matches[el]] + '</li>');
		   					suggestions.appendChild(fragment);
		   				}
		   					// Add click event to suggestion box
					   	var suggestionOptions = document.getElementsByClassName('suggestion_option');
					   	if (suggestionOptions) {
					   		for (var i = 0; i < suggestionOptions.length; i++) {
						   		if (suggestionOptions[i]) {
							 	  	suggestionOptions[i].onclick = majorSelected;
					   			}
					   		}
					   	}	
		   			}
		   			}
		   		}else {
					suggestions.style.visibility = 'hidden';
		   		}
		   		
		   		}
		   	});
		   	
		   	}    	    	
    }
    
    function majorSelectedWithElement(element) {
    	var suggestions = document.getElementById('suggestions');
		var majorInput = document.getElementById('CLASS_SRCH_WRK2_SUBJECT$70$');
		if (majorInput && suggestions) {
		    majorInput.value = (element).id;
			suggestions.style.visibility = 'hidden';
		}    
    }
    
    function majorSelected() {
   		var suggestions = document.getElementById('suggestions');
		var majorInput = document.getElementById('CLASS_SRCH_WRK2_SUBJECT$70$');
		if (majorInput && suggestions) {
		    majorInput.value = (this).id;
			suggestions.style.visibility = 'hidden';
		}
	}

    function setCourseCareerDropDown() {
        var courseCareerDropDown = document.getElementById("CLASS_SRCH_WRK2_ACAD_CAREER");
        if (courseCareerDropDown) {
            courseCareerDropDown.options[3].selected = true;
        }
    }

    var openClassesCheckBox = document.getElementById("CLASS_SRCH_WRK2_SSR_OPEN_ONLY");
    if (openClassesCheckBox) {
        if (openClassesCheckBox.checked) {
            openClassesCheckBox.click;
        }
    }


    function onStudentCenterPage() {
        var pageHeader = document.getElementsByClassName("PATRANSACTIONTITLE");
        if (pageHeader[0]) {
        	if (pageHeader[0].textContent) {
        		if (pageHeader[0].textContent.match('Student Center')) {
               	 return true;
           	 	}
       	 	}else {
        		if (pageHeader[0].innerText.match('Student Center')) {
                	return true;
           	 	}
       	 	}
        }
        return false;
    }

    

    function constructFeedbackBox() {
        if (!(document.getElementById('feedback_box'))) {
            var fragment = create('<div id="feedback_box">' + '<div id="top_feedback">' + '<span>Have a <a class="feedback_url" target="_blank" href="' + itsSISURL + '" title="Suggestion Reporting">suggestion?</a></span>' + '</div>' + '<div id="bottom_feedback">' + '<span>Submit an <a class="feedback_url" target="_blank" href="' + itsSISURL + '" title="Issue Reporting">issue or bugfix</a></span>' + '</div>' + '</div></div>');

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
            for (i = 0; i < feedbackURLS.length; i++) {
                feedbackURLS[i].style.color = ritOrange;
                feedbackURLS[i].style.textDecoration = "none";

            }
        }
    }
    
    function removeOldHeader() {
    	var oldHeader = document.getElementById('pthdr2container');
    	if (oldHeader) {
    		oldHeader.parentNode.removeChild(oldHeader);
    	}
    }

    function constructHeader() {
        if (!(document.getElementById('header_bar'))) {
            var fragment = create('<div id="header_bar">' + '<div id="enhance_header">' + '<div id="left_header">' + '<img id= "RIT_header_logo" width="466" height="49" title="RIT Header Logo" alt="RIT Logo" src=' + ritHeaderLogoURI + ' />' + '</div>' + '<div id="right_header"><span>' + ' <a class="right_header_text" id="sis_course_search" href="' + courseSearchLink + '" title="Course Search">Search for Courses</a>' + '<a class="right_header_text" id="sis_shopping_cart" href="' + shoppingCartLink + '" title="SIS Shopping Cart">My Shopping Cart</a>' + '<a class="right_header_text" id="sis_student_center" href="' + studentCenterLink + '" title="SIS Student Center">Student Center</a>' + ' <a class="right_header_text" id="sign_out" href="' + signOutLink + '" title="Sign Out">Sign Out</a>' + '</span></div>' + '</div></div>');

			var firstBody = document.getElementById('ptifrmtemplate');
            // You can use native DOM methods to insert the fragment:
            if (firstBody) {
	            firstBody.insertBefore(fragment, document.body.childNodes[0]);
	        }
        }
        // Remove "Search for Classes" header
        var searchClasses = document.getElementById("DERIVED_CLSRCH_SS_TRANSACT_TITLE");
        if (searchClasses) {
            searchClasses.innerText = "";
        }
    }
    
    function constructBanner() {
    	if (!(document.getElementById('banner_bar'))) {
            var fragment = create('<div id="banner_bar">' + '<div id="enhance_banner">' + '<div id="banner_left_header">' + '<img id="RIT_SG_logo" width="120" height="50" title="RIT SG Logo" alt="RIT SG Logo" src=' + ritSGLogoURI + ' />' + '</div>' + '<div id="banner_center">Elections 2012-2013</div>' + '<div id="banner_right_header">' + '<div id="sg_right_top_text">Click Here to Vote!</div>' + '<a target="_blank" onclick="_gaq.push([\'_trackEvent\', \'Banner\', \'Selected\', \'Vote Now\']);" id="sg_vote_now" href="' + sgVoteLink + '" title="SG Vote Now">' +'<div id="sg_vote_now_box">' + 'Vote Now!' + '</div></a></div>' + '</div></div>');

			var firstBody = document.getElementById('PAGECONTAINER');
           /*
 // You can use native DOM methods to insert the fragment:
            if (firstBody) {
	            firstBody.appendChild(fragment);
	        }
*/
	        firstBody.insertBefore(fragment, firstBody.firstChild);
        }
    
    }

    function constructFooter() {
        if (!(document.getElementById('enhance_footer'))) {
            var fragment = create('<div id="footer_bar">' + '<div id="enhance_footer">' + '<div id="center_footer">' + '<span>Improved and enchanced by the RIT <a id="facebook_url" href="' + facebookURL + '" target="_blank" onclick="_gaq.push([\'_trackEvent\', \'Facebook\', \'Selected\', \'Footer Link\']); title="Student Body">student body</a>.' + '</div>' + '</div></div>');

            // You can use native DOM methods to insert the fragment:
            document.body.appendChild(fragment);
        }
    }

    function validateNumberInput(evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[^\.a-zA-Z_-]/ig;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    function changeInputLimit() {
        var courseNumberInput = document.getElementById("CLASS_SRCH_WRK2_CATALOG_NBR$74$");
        if (courseNumberInput) {
            courseNumberInput.setAttribute('maxlength', '3');
            courseNumberInput.addEventListener('keypress', validateNumberInput, true);
            //courseNumberInput.onkeypress = validateNumberInput;
        }

        var minUnitInput = document.getElementById("CLASS_SRCH_WRK2_UNITS_MINIMUM");
        if (minUnitInput) {
            minUnitInput.setAttribute('maxlength', '1');
            minUnitInput.addEventListener('keypress', validateNumberInput, true);

        }

        var maxUnitInput = document.getElementById("CLASS_SRCH_WRK2_UNITS_MAXIMUM");
        if (maxUnitInput) {
            maxUnitInput.setAttribute('maxlength', '1');
            maxUnitInput.addEventListener('keypress', validateNumberInput, true);

        }

        var classNumberInput = document.getElementById("CLASS_SRCH_WRK2_CLASS_NBR$112$");
        if (classNumberInput) {
            classNumberInput.addEventListener('keypress', validateNumberInput, true);

        }
        
        var classNumber = document.getElementById("DERIVED_REGFRM1_CLASS_NBR");
        if (classNumber) {
        	classNumber.setAttribute('maxlength', '5');
            classNumber.addEventListener('keypress', validateNumberInput, true);

        }
    }




    function addMouseOver() {
        var units = document.getElementById("CLASS_SRCH_WRK2_UNITS_MINIMUM_LBL");
        var maxUnits = document.getElementById("CLASS_SRCH_WRK2_UNITS_MAXIMUM_LBL");
        if (units) {
            units.style.cursor = "help";
            units.setAttribute('title', "Credits are now Units");
        }
        if (maxUnits) {
            maxUnits.style.cursor = "help";
            maxUnits.setAttribute('title', "Credits are now Units");
        }
        var classStatusImage = document.getElementsByClassName("SSSIMAGECENTER");

        for (i = 0; i < classStatusImage.length; i++) {

            if (classStatusImage[i]) {
                classStatusImage[i].style.cursor = "help"
                if (classStatusImage[i].alt == "Open") {
                    classStatusImage[i].setAttribute('title', "Class is OPEN");
                }else if (classStatusImage[i].alt == "Wait List") {
                    classStatusImage[i].setAttribute('title', "Class is FULL, but the Wait List is OPEN");
				}else if (classStatusImage[i].alt == "Closed") {
                    classStatusImage[i].setAttribute('title', "Class is FULL, and the Wait List is FULL");
				}
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
    
        var body = document.getElementsByClassName("PSPAGECONTAINER");
        if (body) {
            for (i = 0; i < body.length; i++) {
                body[i].style.cssText = "margin: 0 auto";
                body[i].style.backgroundColor = bgColor;
                body[i].style.width = "600px";

            }
        }

    }
	function contains(arrayName, element) {
            for (var i = 0; i < arrayName.length; i++) {
                if (arrayName[i] == element) {
                    return true;
                }
            }
            return false;
    }

    function convertLetterCodeToNumber() {
        
        var letterCode = document.getElementById("CLASS_SRCH_WRK2_SUBJECT$70$");
        if (letterCode) {

            for (var i = 0; i < alphaCodes.length; i++) {
                if (letterCode.value == alphaCodes[i]) {
                    letterCode.value = numericCodes[i];
                }
            }

        }
    }

    setInterval(loadFunc, 200);