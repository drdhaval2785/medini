// (setq js-indent-level 1)  # for Emacs
let pageNo;

function makelink(indexobj,txt) {
 let href = window.location.href;
 //let url = new URL(href);
 //let search = url.search  // a string, possibly empty
 let base = href.replace(/[?].*$/,'');
 let adhy = indexobj.adhy;
 let v2 = indexobj.v2;
 let newsearch = `?${adhy},${v2}`;
 let newhref = base + newsearch;
 let html = `<a class="nppage" href="${newhref}"><span class="nppage">${txt}</span></a>`;
 return html;
}
function display_ipage_id(indexes) {
 //console.log('display_ipage_id: indexes=',indexes);
 [indexprev,indexcur,indexnext] = indexes;
 let prevlink = makelink(indexprev,'<');
 let nextlink = makelink(indexnext,'>');

 let vp = indexcur['vp'];
 console.log("vp",vp)
 let v = vp.substring(0,1);
 let p = vp.substring(1,4);
 let ip = parseInt(p);
 // p is External page number. Compute ipage for raghuvamsa
 // first verse is internal page 1, external page 24
 // Assume this relation holds for all pages.
 let ipage = ip;
 //let html = `<p>${prevlink} &nbsp; ${nextlink}</p>`;
 let html = `<p>${prevlink} <span class="nppage">Page ${ipage}</span> ${nextlink}</p>`;
 let elt = document.getElementById('ipageid');
 elt.innerHTML = html;
}

function get_pdfpage_from_index(indexobj) {
/* indexobj assumed an element of indexdata
 return name of file with the given volume and page
 yajn_029.pdf  example vp = "1029"  The '1' is gratuitous
*/
 let vp = indexobj['vp'];
 let v = vp.substring(0,1); // ignore
 let p = vp.substring(1,4);
 let pdf = `medini-${pageNo}.pdf`;
 return pdf;
}

function get_ipage_html(indexcur) {
 let html = null;
 if (indexcur == null) {return html;}
 let pdfcur = get_pdfpage_from_index(indexcur);
 //console.log('pdfcur=',pdfcur);
 let urlcur = `../pdfpages/${pdfcur}`;
 let android = ` <a href='${urlcur}' style='position:relative; left:100px;'>Click to load pdf</a>`;
 let imageElt = `<object id='servepdf' type='application/pdf' data='${urlcur}' 
              style='width: 98%; height:98%'> ${android} </object>`;
 //console.log('get_ipage_html. imageElt=',imageElt);
 return imageElt;
}

function display_ipage_html(indexes) {
 display_ipage_id(indexes);
 let html = get_ipage_html(indexes[1]);
 let elt=document.getElementById('ipage');
 elt.innerHTML = html;
}

/* function get_indexobjs_from_verse(pageNo) {
 // uses indexdata from index.js
 // verse is a 2-tuple of ints
console.log("verse 123",pageNo)
 let icur = -1;
 for (let i=0; i < indexdata.length; i++ ) {
  let obj = indexdata[i];
  if (obj.adhy != verse[0]) {continue;}
  if ((obj.v1 <= verse[1]) && (verse[1] <= obj.v2)) {
   icur = i;
   break;
  }
 }
 let ans, prevobj, curobj, nextobj
 if (icur == -1) {
  // default
  //prevobj = indexdata[0];
  //curobj = indexdata[0];
  //nextobj = indexdata[0];
  //ans  = [indexdata[0],indexdata[1],indexdata[2]];
 } else {
  curobj = indexdata[icur];
  if (icur <= 0) {
   prevobj = curobj;
  } else {
   prevobj = indexdata[icur - 1];
  }
  let inext = icur + 1;
  if (inext < indexdata.length) {
   nextobj = indexdata[inext];
  }else {
   nextobj = curobj;
  }
 }
 ans = [prevobj,curobj,nextobj];
 return ans;
}
*/


 function get_indexobjs_from_verse(page) {
  // Find the index of the current record based on the page
  const currentIndex = indexdata.findIndex(record => record.page === page);
console.log(currentIndex,"currentIndex")
  // If page is not found, return null
  if (currentIndex === -1) {
    return { previous: null, current: null, next: null };
  }

  // Get previous, current, and next records
  const previous = currentIndex > 0 ? indexdata[currentIndex - 1] : null;
  const current = indexdata[currentIndex];
  const next = currentIndex < indexdata.length - 1 ? indexdata[currentIndex + 1] : null;

  return [ previous, current, next ];
}

function get_verse_from_url() {
 /* return 2-tuple of int numbers derived from url search string.
    Returns [0,0]
*/
 let href = window.location.href;
 let url = new URL(href);
 // url = http://xyz.com?X ,
 // search = ?X
 let search = url.search;  // a string, possibly empty
 search = decodeURI(search);
 console.log("search 23",search);
 let defaultval = [0,0]; // default value (title verse)
 x = search.replace("?", "");
 return x;
 
 /*console.log(x);
 if (x == null) {
  return defaultval;
 }
 // convert to ints
 let nparm = 2;
 iverse = [];
 for(let i=0;i<nparm;i++) {
  iverse.push(x[i+1]);
 }
 return iverse;*/
}

function display_ipage_url() {
 pageNo = runScript();
 console.log("pageNo",pageNo)
 //let url_verse = get_verse_from_url();
 //console.log('url_verse=',url_verse);
 let indexobjs = get_indexobjs_from_verse(pageNo);
 console.log('indexobjs=',indexobjs);
 display_ipage_html(indexobjs);
 
}

document.getElementsByTagName("BODY")[0].onload = display_ipage_url;




//////Added by ARpit

// Function to extract 'word' parameter from the URL
function getWordFromURL() {
	 let href = window.location.href;
	 let url = new URL(href);
	 // url = http://xyz.com?X ,
	 // search = ?X
	 let search = url.search;  // a string, possibly empty
	 search = decodeURI(search);
	 search.replace("?","")
	 //let defaultval = [0,0]; // default value (title verse)
	 //let x = search.match(/^[?]([a-z]+),([0-9]+)$/);

	 return search;
 
 
    //const params = new URLSearchParams(window.location.search);
    //console.log("params.get('word')",params.get('word'));
    //return params.get('word') || "kroDa";
}

const alphabets = 'aAiIuUfxFXeEoOMHkKgGNcCjJYwWqQRtTdDnpPbBmyrlvSzsh';

// Function to create a mapping of alphabets to integers
function strToInt() {
    const result = {};
    let counter = 1;
    for (const x of alphabets) {
        result[x] = counter;
        counter += 1;
    }
    return result;
}

const alphint = strToInt();

// Function to convert a string to a list of integers based on the mapping
function convertStrToInt(text) {
    const result = [];
    for (const y of text) {
        result.push(alphint[y]);
    }
    return result;
}

// Function to get the terminal consonant value
function terminalConsonant(text) {
    const p = text.replace(/[aAiIuUfxFXeEoOMH]*/g, '');
    let q = 0;
    if (p.length > 0) {
        q = alphint[p[p.length - 1]];
    }
    return q;
}

// Function to count the number of vowels in a string
function vowels(text) {
    let counter = 0;
    for (const x of text) {
        if ('aAiIuUfxFXeEoO'.includes(x)) {
            counter += 1;
        }
    }
    return counter;
}

// Rec class equivalent in JavaScript
class Rec {
    constructor(s) {
        this.s = s;
        this.i = convertStrToInt(s);
        this.t = terminalConsonant(s);
        this.v = vowels(s);
    }
}

// Function to sort words based on terminal consonant, vowels, and integer representation
function sortPerMedini(listOfWords) {
    const reclist = listOfWords.map(x => new Rec(x));
    reclist.sort((a, b) => {
        if (a.t !== b.t) return a.t - b.t;
        if (a.v !== b.v) return a.v - b.v;
        for (let i = 0; i < Math.min(a.i.length, b.i.length); i++) {
            if (a.i[i] !== b.i[i]) return a.i[i] - b.i[i];
        }
        return a.i.length - b.i.length;
    });
    return reclist.map(x => x.s);
}

// Function to check if 'test' comes before 'base' according to sorting rules
function checkWhetherBefore(test, base) {
    const x = sortPerMedini([test, base]);
    return x[0] === test;
}

// Sample data array to replace file reading
//const indexData = [{"v":"I","page":382,"adhy":"k","v1":1,"v2":9,"x1":"","x2":"","vp":"1382","hw":""},{"v":"I","page":383,"adhy":"k","v1":10,"v2":22,"x1":"","x2":"a","vp":"1383","hw":"ka"},{"v":"I","page":384,"adhy":"k","v1":22,"v2":36,"x1":"b","x2":"a","vp":"1384","hw":"Ceka"},{"v":"I","page":385,"adhy":"k","v1":36,"v2":49,"x1":"b","x2":"a","vp":"1385","hw":"Sulka"},{"v":"I","page":386,"adhy":"k","v1":49,"v2":63,"x1":"b","x2":"a","vp":"1386","hw":"ulUka"},{"v":"I","page":387,"adhy":"k","v1":63,"v2":76,"x1":"b","x2":"a","vp":"1387","hw":"kAmuka"},{"v":"I","page":388,"adhy":"k","v1":76,"v2":89,"x1":"b","x2":"a","vp":"1388","hw":"kOSikI"},{"v":"I","page":389,"adhy":"k","v1":89,"v2":103,"x1":"b","x2":"a","vp":"1389","hw":"jambUka"},{"v":"I","page":390,"adhy":"k","v1":103,"v2":116,"x1":"b","x2":"a","vp":"1390","hw":"dIpaka"},{"v":"I","page":391,"adhy":"k","v1":116,"v2":129,"x1":"b","x2":"a","vp":"1391","hw":"pAlaNka"},{"v":"I","page":392,"adhy":"k","v1":129,"v2":143,"x1":"b","x2":"a","vp":"1392","hw":"bAlikA"},{"v":"I","page":393,"adhy":"k","v1":143,"v2":156,"x1":"b","x2":"a","vp":"1393","hw":"yUTikA"},{"v":"I","page":394,"adhy":"k","v1":156,"v2":170,"x1":"b","x2":"a","vp":"1394","hw":"vitarka"},{"v":"I","page":395,"adhy":"k","v1":170,"v2":183,"x1":"b","x2":"a","vp":"1395","hw":"secaka"},{"v":"I","page":396,"adhy":"k","v1":183,"v2":196,"x1":"b","x2":"","vp":"1396","hw":"kOkkuwika"},{"v":"I","page":397,"adhy":"k","v1":197,"v2":211,"x1":"","x2":"a","vp":"1397","hw":"paYcAlikA"},{"v":"I","page":398,"adhy":"k","v1":211,"v2":224,"x1":"b","x2":"a","vp":"1398","hw":"leKanika"},{"v":"I","page":399,"adhy":"k","v1":224,"v2":235,"x1":"b","x2":"","vp":"1399","hw":"upakArikA"},{"v":"I","page":400,"adhy":"kh","v1":1,"v2":13,"x1":"","x2":"a","vp":"1400","hw":"Ka"},{"v":"I","page":401,"adhy":"kh","v1":13,"v2":19,"x1":"b","x2":"","vp":"1401","hw":"induleKA"},{"v":"I","page":401,"adhy":"g","v1":1,"v2":6,"x1":"","x2":"a","vp":"1401","hw":"go"},{"v":"I","page":402,"adhy":"g","v1":6,"v2":20,"x1":"b","x2":"a","vp":"1402","hw":"tuNgI"},{"v":"I","page":403,"adhy":"g","v1":20,"v2":34,"x1":"b","x2":"a","vp":"1403","hw":"roga"},{"v":"I","page":404,"adhy":"g","v1":34,"v2":47,"x1":"b","x2":"a","vp":"1404","hw":"tAtagu"},{"v":"I","page":405,"adhy":"g","v1":47,"v2":57,"x1":"b","x2":"","vp":"1405","hw":"visarga"},{"v":"I","page":405,"adhy":"gh","v1":1,"v2":1,"x1":"","x2":"a","vp":"1405","hw":"Ga"},{"v":"I","page":406,"adhy":"gh","v1":1,"v2":10,"x1":"b","x2":"","vp":"1406","hw":"arGa"},{"v":"I","page":406,"adhy":"ṅ","v1":1,"v2":1,"x1":"","x2":"","vp":"1406","hw":"Ga"},{"v":"I","page":407,"adhy":"c","v1":1,"v2":13,"x1":"","x2":"a","vp":"1407","hw":"ca"},{"v":"I","page":408,"adhy":"c","v1":13,"v2":21,"x1":"b","x2":"","vp":"1408","hw":"kavaca"},{"v":"I","page":408,"adhy":"ch","v1":1,"v2":3,"x1":"","x2":"a","vp":"1408","hw":"Ca"},{"v":"I","page":409,"adhy":"ch","v1":3,"v2":5,"x1":"b","x2":"","vp":"1409","hw":"pucCa"},{"v":"I","page":409,"adhy":"j","v1":1,"v2":9,"x1":"","x2":"a","vp":"1409","hw":"ja"},{"v":"I","page":410,"adhy":"j","v1":9,"v2":22,"x1":"b","x2":"a","vp":"1410","hw":"dvijA"},{"v":"I","page":411,"adhy":"j","v1":22,"v2":35,"x1":"b","x2":"","vp":"1411","hw":"kuwaja"},{"v":"I","page":412,"adhy":"j","v1":36,"v2":36,"x1":"","x2":"","vp":"1412","hw":"rAjarAja"},{"v":"I","page":412,"adhy":"jh","v1":1,"v2":1,"x1":"","x2":"","vp":"1412","hw":"Ja"},{"v":"I","page":412,"adhy":"ñ","v1":1,"v2":4,"x1":"","x2":"","vp":"1412","hw":"Ya"},{"v":"I","page":413,"adhy":"ṭ","v1":1,"v2":13,"x1":"","x2":"a","vp":"1413","hw":"wa"},{"v":"I","page":414,"adhy":"ṭ","v1":13,"v2":26,"x1":"b","x2":"a","vp":"1414","hw":"cawu"},{"v":"I","page":415,"adhy":"ṭ","v1":26,"v2":39,"x1":"b","x2":"a","vp":"1415","hw":"vAwa"},{"v":"I","page":416,"adhy":"ṭ","v1":39,"v2":53,"x1":"b","x2":"a","vp":"1416","hw":"kfpIwa"},{"v":"I","page":417,"adhy":"ṭ","v1":53,"v2":66,"x1":"b","x2":"","vp":"1417","hw":"morawA"},{"v":"I","page":418,"adhy":"ṭh","v1":1,"v2":12,"x1":"","x2":"a","vp":"1418","hw":"Wa"},{"v":"I","page":419,"adhy":"ṭh","v1":12,"v2":21,"x1":"b","x2":"","vp":"1419","hw":"jaraWa"},{"v":"I","page":419,"adhy":"ḍ","v1":1,"v2":3,"x1":"","x2":"a","vp":"1419","hw":"qa"},{"v":"I","page":420,"adhy":"ḍ","v1":3,"v2":16,"x1":"b","x2":"a","vp":"1420","hw":"krIqA"},{"v":"I","page":421,"adhy":"ḍ","v1":16,"v2":29,"x1":"b","x2":"a","vp":"1421","hw":"paRqa"},{"v":"I","page":422,"adhy":"ḍ","v1":29,"v2":40,"x1":"b","x2":"","vp":"1422","hw":"drAviqa"},{"v":"I","page":423,"adhy":"ḍh","v1":1,"v2":11,"x1":"","x2":"","vp":"1423","hw":"Qa"},{"v":"I","page":424,"adhy":"ṇ","v1":1,"v2":14,"x1":"","x2":"a","vp":"1424","hw":"Ra"},{"v":"I","page":425,"adhy":"ṇ","v1":14,"v2":27,"x1":"b","x2":"a","vp":"1425","hw":"trARa"},{"v":"I","page":426,"adhy":"ṇ","v1":27,"v2":40,"x1":"b","x2":"a","vp":"1426","hw":"vIRA"},{"v":"I","page":427,"adhy":"ṇ","v1":40,"v2":54,"x1":"b","x2":"a","vp":"1427","hw":"kareRu"},{"v":"I","page":428,"adhy":"ṇ","v1":54,"v2":68,"x1":"b","x2":"a","vp":"1428","hw":"DarzaRa"},{"v":"I","page":429,"adhy":"ṇ","v1":68,"v2":81,"x1":"b","x2":"a","vp":"1429","hw":"BaraRI"},{"v":"I","page":430,"adhy":"ṇ","v1":81,"v2":95,"x1":"b","x2":"a","vp":"1430","hw":"SrIparRI"},{"v":"I","page":431,"adhy":"ṇ","v1":95,"v2":108,"x1":"b","x2":"a","vp":"1431","hw":"taRquvIRa"},{"v":"I","page":432,"adhy":"ṇ","v1":108,"v2":117,"x1":"b","x2":"","vp":"1432","hw":"SaravARi"},{"v":"I","page":432,"adhy":"t","v1":1,"v2":2,"x1":"","x2":"a","vp":"1432","hw":"ta"},{"v":"I","page":433,"adhy":"t","v1":2,"v2":15,"x1":"b","x2":"a","vp":"1433","hw":"anta"},{"v":"I","page":434,"adhy":"t","v1":15,"v2":29,"x1":"b","x2":"a","vp":"1434","hw":"gIti"},{"v":"I","page":435,"adhy":"t","v1":29,"v2":42,"x1":"b","x2":"a","vp":"1435","hw":"nata"},{"v":"I","page":436,"adhy":"t","v1":42,"v2":55,"x1":"b","x2":"","vp":"1436","hw":"mata"},{"v":"I","page":437,"adhy":"t","v1":56,"v2":69,"x1":"","x2":"a","vp":"1437","hw":"vArtA"},{"v":"I","page":438,"adhy":"t","v1":69,"v2":82,"x1":"b","x2":"a","vp":"1438","hw":"svAnta"},{"v":"I","page":439,"adhy":"t","v1":82,"v2":95,"x1":"b","x2":"a","vp":"1439","hw":"ananta"},{"v":"I","page":440,"adhy":"t","v1":95,"v2":108,"x1":"b","x2":"a","vp":"1440","hw":"udanta"},{"v":"I","page":441,"adhy":"t","v1":108,"v2":121,"x1":"b","x2":"a","vp":"1441","hw":"jagatI"},{"v":"I","page":442,"adhy":"t","v1":121,"v2":135,"x1":"b","x2":"a","vp":"1442","hw":"praBUta"},{"v":"I","page":443,"adhy":"t","v1":135,"v2":149,"x1":"b","x2":"a","vp":"1443","hw":"pfzat"},{"v":"I","page":444,"adhy":"t","v1":149,"v2":162,"x1":"b","x2":"a","vp":"1444","hw":"vahatu"},{"v":"I","page":445,"adhy":"t","v1":162,"v2":175,"x1":"b","x2":"a","vp":"1445","hw":"SrIpati"},{"v":"I","page":446,"adhy":"t","v1":175,"v2":188,"x1":"b","x2":"a","vp":"1446","hw":"hArIta"},{"v":"I","page":447,"adhy":"t","v1":188,"v2":202,"x1":"b","x2":"a","vp":"1447","hw":"udvAhita"},{"v":"I","page":448,"adhy":"t","v1":202,"v2":215,"x1":"b","x2":"a","vp":"1448","hw":"nadIkAntA"},{"v":"I","page":449,"adhy":"t","v1":215,"v2":229,"x1":"b","x2":"a","vp":"1449","hw":"BogavatI"},{"v":"I","page":450,"adhy":"t","v1":229,"v2":235,"x1":"b","x2":"","vp":"1450","hw":"hemavatI"},{"v":"I","page":450,"adhy":"th","v1":1,"v2":5,"x1":"","x2":"a","vp":"1450","hw":"Ta"},{"v":"I","page":451,"adhy":"th","v1":5,"v2":19,"x1":"b","x2":"a","vp":"1451","hw":"granTi"},{"v":"I","page":452,"adhy":"th","v1":19,"v2":29,"x1":"b","x2":"","vp":"1452","hw":"damaTu"},{"v":"I","page":452,"adhy":"d","v1":1,"v2":1,"x1":"","x2":"a","vp":"1452","hw":"da"},{"v":"I","page":453,"adhy":"d","v1":1,"v2":15,"x1":"b","x2":"a","vp":"1453","hw":"abda"},{"v":"I","page":454,"adhy":"d","v1":15,"v2":28,"x1":"b","x2":"a","vp":"1454","hw":"vedi"},{"v":"I","page":455,"adhy":"d","v1":28,"v2":41,"x1":"b","x2":"a","vp":"1455","hw":"gonarda"},{"v":"I","page":456,"adhy":"d","v1":41,"v2":55,"x1":"b","x2":"a","vp":"1456","hw":"samvid"},{"v":"I","page":457,"adhy":"d","v1":55,"v2":56,"x1":"b","x2":"","vp":"1457","hw":"samaryAda"},{"v":"I","page":457,"adhy":"dh","v1":1,"v2":10,"x1":"","x2":"a","vp":"1457","hw":"Da"},{"v":"I","page":458,"adhy":"dh","v1":10,"v2":24,"x1":"b","x2":"a","vp":"1458","hw":"boDi"},{"v":"I","page":459,"adhy":"dh","v1":24,"v2":38,"x1":"b","x2":"a","vp":"1459","hw":"sinDu"},{"v":"I","page":460,"adhy":"dh","v1":38,"v2":48,"x1":"b","x2":"","vp":"1460","hw":"samADi"},{"v":"I","page":460,"adhy":"n","v1":1,"v2":1,"x1":"","x2":"a","vp":"1460","hw":"na"},{"v":"I","page":461,"adhy":"n","v1":1,"v2":14,"x1":"b","x2":"","vp":"1461","hw":"anna"},{"v":"I","page":462,"adhy":"n","v1":15,"v2":28,"x1":"","x2":"a","vp":"1462","hw":"muni"},{"v":"I","page":463,"adhy":"n","v1":28,"v2":41,"x1":"b","x2":"a","vp":"1463","hw":"apAna"},{"v":"I","page":464,"adhy":"n","v1":41,"v2":55,"x1":"b","x2":"a","vp":"1464","hw":"udyAna"},{"v":"I","page":465,"adhy":"n","v1":55,"v2":69,"x1":"b","x2":"a","vp":"1465","hw":"KaYjana"},{"v":"I","page":466,"adhy":"n","v1":69,"v2":83,"x1":"b","x2":"a","vp":"1466","hw":"tapana"},{"v":"I","page":467,"adhy":"n","v1":83,"v2":97,"x1":"b","x2":"a","vp":"1467","hw":"niDana"},{"v":"I","page":468,"adhy":"n","v1":97,"v2":111,"x1":"b","x2":"a","vp":"1468","hw":"vandanI"},{"v":"I","page":469,"adhy":"n","v1":111,"v2":124,"x1":"b","x2":"a","vp":"1469","hw":"yuYjAna"},{"v":"I","page":470,"adhy":"n","v1":124,"v2":138,"x1":"b","x2":"a","vp":"1470","hw":"vacaknu"},{"v":"I","page":471,"adhy":"n","v1":138,"v2":151,"x1":"b","x2":"a","vp":"1471","hw":"Sakuna"},{"v":"I","page":472,"adhy":"n","v1":151,"v2":164,"x1":"b","x2":"a","vp":"1472","hw":"sadana"},{"v":"I","page":473,"adhy":"n","v1":164,"v2":178,"x1":"b","x2":"a","vp":"1473","hw":"aBijana"},{"v":"I","page":474,"adhy":"n","v1":178,"v2":191,"x1":"b","x2":"a","vp":"1474","hw":"KaqgaDenu"},{"v":"I","page":475,"adhy":"n","v1":191,"v2":204,"x1":"b","x2":"","vp":"1475","hw":"pravacana"},{"v":"I","page":476,"adhy":"n","v1":205,"v2":218,"x1":"","x2":"a","vp":"1476","hw":"varDAmAna"},{"v":"I","page":477,"adhy":"n","v1":218,"v2":231,"x1":"b","x2":"","vp":"1477","hw":"stanayitnu"},{"v":"I","page":478,"adhy":"n","v1":232,"v2":245,"x1":"","x2":"a","vp":"1478","hw":"kAranDamin"},{"v":"I","page":479,"adhy":"n","v1":245,"v2":253,"x1":"b","x2":"","vp":"1479","hw":"viGnakArin"},{"v":"I","page":479,"adhy":"p","v1":1,"v2":3,"x1":"","x2":"","vp":"1479","hw":"pa"},{"v":"I","page":480,"adhy":"p","v1":4,"v2":17,"x1":"","x2":"a","vp":"1480","hw":"kfpA"},{"v":"I","page":481,"adhy":"p","v1":17,"v2":31,"x1":"b","x2":"a","vp":"1481","hw":"kaSipu"},{"v":"I","page":482,"adhy":"p","v1":31,"v2":31,"x1":"b","x2":"","vp":"1482","hw":"cAmarapuzpa"},{"v":"I","page":482,"adhy":"ph","v1":1,"v2":3,"x1":"","x2":"","vp":"1482","hw":"Pa"},{"v":"I","page":482,"adhy":"b","v1":1,"v2":8,"x1":"","x2":"a","vp":"1482","hw":"ba"},{"v":"I","page":483,"adhy":"b","v1":8,"v2":17,"x1":"b","x2":"","vp":"1483","hw":"tamba"},{"v":"I","page":483,"adhy":"bh","v1":1,"v2":3,"x1":"","x2":"a","vp":"1483","hw":"Ba"},{"v":"I","page":484,"adhy":"bh","v1":3,"v2":17,"x1":"b","x2":"a","vp":"1484","hw":"garBa"},{"v":"I","page":485,"adhy":"bh","v1":17,"v2":25,"x1":"b","x2":"","vp":"1485","hw":"vallaBa"},{"v":"I","page":485,"adhy":"m","v1":1,"v2":4,"x1":"","x2":"a","vp":"1485","hw":"ma"},{"v":"I","page":486,"adhy":"m","v1":4,"v2":18,"x1":"b","x2":"a","vp":"1486","hw":"kAma"},{"v":"I","page":487,"adhy":"m","v1":18,"v2":32,"x1":"b","x2":"a","vp":"1487","hw":"brAhmI"},{"v":"I","page":488,"adhy":"m","v1":32,"v2":46,"x1":"b","x2":"a","vp":"1488","hw":"Suzma"},{"v":"I","page":489,"adhy":"m","v1":46,"v2":60,"x1":"b","x2":"a","vp":"1489","hw":"nEgama"},{"v":"I","page":490,"adhy":"m","v1":60,"v2":63,"x1":"b","x2":"","vp":"1490","hw":"daRqAyAma"},{"v":"I","page":490,"adhy":"y","v1":1,"v2":7,"x1":"","x2":"","vp":"1490","hw":"ya"},{"v":"I","page":491,"adhy":"y","v1":8,"v2":21,"x1":"","x2":"a","vp":"1491","hw":"kalya"},{"v":"I","page":493,"adhy":"y","v1":21,"v2":35,"x1":"b","x2":"a","vp":"1493","hw":"codya"},{"v":"I","page":493,"adhy":"y","v1":35,"v2":48,"x1":"b","x2":"a","vp":"1493","hw":"prAya"},{"v":"I","page":494,"adhy":"y","v1":48,"v2":62,"x1":"b","x2":"a","vp":"1494","hw":"ramyA"},{"v":"I","page":495,"adhy":"y","v1":62,"v2":75,"x1":"b","x2":"a","vp":"1495","hw":"sevya"},{"v":"I","page":496,"adhy":"y","v1":75,"v2":89,"x1":"b","x2":"a","vp":"1496","hw":"Ocitya"},{"v":"I","page":497,"adhy":"y","v1":89,"v2":102,"x1":"b","x2":"a","vp":"1497","hw":"pratyaya"},{"v":"I","page":498,"adhy":"y","v1":102,"v2":115,"x1":"b","x2":"a","vp":"1498","hw":"vyavAya"},{"v":"I","page":499,"adhy":"y","v1":115,"v2":129,"x1":"b","x2":"a","vp":"1499","hw":"apasavya"},{"v":"I","page":500,"adhy":"y","v1":129,"v2":133,"x1":"b","x2":"","vp":"1500","hw":"samudAya"},{"v":"I","page":500,"adhy":"r","v1":1,"v2":7,"x1":"","x2":"a","vp":"1500","hw":"ra"},{"v":"I","page":501,"adhy":"r","v1":7,"v2":20,"x1":"b","x2":"a","vp":"1501","hw":"ArdrA"},{"v":"I","page":502,"adhy":"r","v1":20,"v2":34,"x1":"b","x2":"a","vp":"1502","hw":"kzOdra"},{"v":"I","page":503,"adhy":"r","v1":34,"v2":49,"x1":"b","x2":"a","vp":"1503","hw":"cukra"},{"v":"I","page":504,"adhy":"r","v1":49,"v2":63,"x1":"b","x2":"a","vp":"1504","hw":"DatrI"},{"v":"I","page":505,"adhy":"r","v1":63,"v2":77,"x1":"b","x2":"a","vp":"1505","hw":"barI"},{"v":"I","page":506,"adhy":"r","v1":77,"v2":91,"x1":"b","x2":"a","vp":"1506","hw":"mAri"},{"v":"I","page":507,"adhy":"r","v1":91,"v2":105,"x1":"b","x2":"a","vp":"1507","hw":"Sira"},{"v":"I","page":508,"adhy":"r","v1":105,"v2":118,"x1":"b","x2":"a","vp":"1508","hw":"aDara"},{"v":"I","page":509,"adhy":"r","v1":118,"v2":132,"x1":"b","x2":"a","vp":"1509","hw":"uttarA"},{"v":"I","page":510,"adhy":"r","v1":132,"v2":146,"x1":"b","x2":"a","vp":"1510","hw":"kandara"},{"v":"I","page":511,"adhy":"r","v1":146,"v2":160,"x1":"b","x2":"a","vp":"1511","hw":"KarjUra"},{"v":"I","page":512,"adhy":"r","v1":160,"v2":173,"x1":"b","x2":"a","vp":"1512","hw":"wawwarI"},{"v":"I","page":513,"adhy":"r","v1":173,"v2":187,"x1":"b","x2":"a","vp":"1513","hw":"nirJara"},{"v":"I","page":514,"adhy":"r","v1":187,"v2":200,"x1":"b","x2":"a","vp":"1514","hw":"tUryavaktra"},{"v":"I","page":515,"adhy":"r","v1":200,"v2":214,"x1":"b","x2":"a","vp":"1515","hw":"mahendra"},{"v":"I","page":516,"adhy":"r","v1":214,"v2":228,"x1":"b","x2":"a","vp":"1516","hw":"vAsara"},{"v":"I","page":517,"adhy":"r","v1":228,"v2":241,"x1":"b","x2":"","vp":"1517","hw":"SiSira"},{"v":"I","page":518,"adhy":"r","v1":242,"v2":255,"x1":"","x2":"a","vp":"1518","hw":"aruzkara"},{"v":"I","page":519,"adhy":"r","v1":255,"v2":270,"x1":"b","x2":"a","vp":"1519","hw":"karRapUra"},{"v":"I","page":520,"adhy":"r","v1":270,"v2":284,"x1":"b","x2":"a","vp":"1520","hw":"DarADara"},{"v":"I","page":521,"adhy":"r","v1":284,"v2":297,"x1":"b","x2":"","vp":"1521","hw":"pItasAra"},{"v":"I","page":522,"adhy":"r","v1":298,"v2":309,"x1":"","x2":"","vp":"1522","hw":"viBAvarI"},{"v":"I","page":523,"adhy":"l","v1":1,"v2":13,"x1":"","x2":"a","vp":"1523","hw":"la"},{"v":"I","page":524,"adhy":"l","v1":13,"v2":27,"x1":"b","x2":"a","vp":"1524","hw":"gula"},{"v":"I","page":525,"adhy":"l","v1":27,"v2":41,"x1":"b","x2":"a","vp":"1525","hw":"nala"},{"v":"I","page":526,"adhy":"l","v1":41,"v2":54,"x1":"b","x2":"","vp":"1526","hw":"Balla"},{"v":"I","page":527,"adhy":"l","v1":55,"v2":68,"x1":"","x2":"a","vp":"1527","hw":"sTAla"},{"v":"I","page":528,"adhy":"l","v1":68,"v2":82,"x1":"b","x2":"a","vp":"1528","hw":"kandala"},{"v":"I","page":529,"adhy":"l","v1":82,"v2":96,"x1":"b","x2":"a","vp":"1529","hw":"keralI"},{"v":"I","page":530,"adhy":"l","v1":96,"v2":110,"x1":"b","x2":"a","vp":"1530","hw":"tAtala"},{"v":"I","page":531,"adhy":"l","v1":110,"v2":123,"x1":"b","x2":"a","vp":"1531","hw":"pAtilI"},{"v":"I","page":532,"adhy":"l","v1":123,"v2":137,"x1":"b","x2":"a","vp":"1532","hw":"mfRAla"},{"v":"I","page":533,"adhy":"l","v1":137,"v2":150,"x1":"b","x2":"a","vp":"1533","hw":"Salmali"},{"v":"I","page":534,"adhy":"l","v1":150,"v2":163,"x1":"b","x2":"a","vp":"1534","hw":"karmarAla"},{"v":"I","page":535,"adhy":"l","v1":163,"v2":170,"x1":"b","x2":"","vp":"1535","hw":"vicakila"},{"v":"I","page":535,"adhy":"v","v1":1,"v2":5,"x1":"","x2":"a","vp":"1535","hw":"va"},{"v":"I","page":536,"adhy":"v","v1":5,"v2":19,"x1":"b","x2":"a","vp":"1536","hw":"grIvA"},{"v":"I","page":537,"adhy":"v","v1":19,"v2":33,"x1":"b","x2":"a","vp":"1537","hw":"pfTvI"},{"v":"I","page":538,"adhy":"v","v1":33,"v2":47,"x1":"b","x2":"a","vp":"1538","hw":"utsava"},{"v":"I","page":539,"adhy":"v","v1":47,"v2":61,"x1":"b","x2":"a","vp":"1539","hw":"rAjIva"},{"v":"I","page":540,"adhy":"v","v1":61,"v2":65,"x1":"b","x2":"","vp":"1540","hw":"pAraSava"},{"v":"I","page":540,"adhy":"ś","v1":1,"v2":7,"x1":"","x2":"a","vp":"1540","hw":"Sa"},{"v":"I","page":541,"adhy":"ś","v1":7,"v2":20,"x1":"b","x2":"a","vp":"1541","hw":"nASa"},{"v":"I","page":542,"adhy":"ś","v1":20,"v2":34,"x1":"b","x2":"a","vp":"1542","hw":"nistriMSa"},{"v":"I","page":543,"adhy":"ś","v1":34,"v2":37,"x1":"b","x2":"","vp":"1543","hw":"jIviteSa"},{"v":"I","page":543,"adhy":"ṣ","v1":1,"v2":8,"x1":"","x2":"a","vp":"1543","hw":"za"},{"v":"I","page":544,"adhy":"ṣ","v1":8,"v2":21,"x1":"b","x2":"","vp":"1544","hw":"karza"},{"v":"I","page":545,"adhy":"ṣ","v1":22,"v2":35,"x1":"","x2":"a","vp":"1545","hw":"yakza"},{"v":"I","page":546,"adhy":"ṣ","v1":35,"v2":49,"x1":"b","x2":"","vp":"1546","hw":"gorakza"},{"v":"I","page":547,"adhy":"ṣ","v1":50,"v2":57,"x1":"","x2":"","vp":"1547","hw":"alambuza"},{"v":"I","page":547,"adhy":"s","v1":1,"v2":4,"x1":"","x2":"a","vp":"1547","hw":"kaMsa"},{"v":"I","page":548,"adhy":"s","v1":4,"v2":18,"x1":"b","x2":"a","vp":"1548","hw":"vasu"},{"v":"I","page":549,"adhy":"s","v1":18,"v2":32,"x1":"b","x2":"a","vp":"1549","hw":"uras"},{"v":"I","page":550,"adhy":"s","v1":32,"v2":46,"x1":"b","x2":"a","vp":"1550","hw":"retas"},{"v":"I","page":551,"adhy":"s","v1":46,"v2":60,"x1":"b","x2":"a","vp":"1551","hw":"DvaMsa"},{"v":"I","page":552,"adhy":"s","v1":60,"v2":68,"x1":"b","x2":"","vp":"1552","hw":"rAjahaMsa"},{"v":"I","page":552,"adhy":"h","v1":1,"v2":3,"x1":"","x2":"a","vp":"1552","hw":"ha"},{"v":"I","page":553,"adhy":"h","v1":3,"v2":17,"x1":"b","x2":"a","vp":"1553","hw":"grAha"},{"v":"I","page":554,"adhy":"h","v1":17,"v2":30,"x1":"b","x2":"","vp":"1554","hw":"niryUha"},{"v":"I","page":555,"adhy":"h","v1":31,"v2":34,"x1":"","x2":"","vp":"1555","hw":"pratigraha"},{"v":"I","page":555,"adhy":"avy","v1":1,"v2":8,"x1":"","x2":"a","vp":"1555","hw":"a"},{"v":"I","page":556,"adhy":"avy","v1":8,"v2":20,"x1":"b","x2":"","vp":"1556","hw":"E"},{"v":"I","page":557,"adhy":"avy","v1":21,"v2":34,"x1":"","x2":"a","vp":"1557","hw":"astu"},{"v":"I","page":558,"adhy":"avy","v1":34,"v2":48,"x1":"b","x2":"a","vp":"1558","hw":"aTATas"},{"v":"I","page":559,"adhy":"avy","v1":48,"v2":61,"x1":"b","x2":"a","vp":"1559","hw":"upa"},{"v":"I","page":560,"adhy":"avy","v1":61,"v2":74,"x1":"b","x2":"a","vp":"1560","hw":"idAnIm"},{"v":"I","page":561,"adhy":"avy","v1":74,"v2":88,"x1":"b","x2":"a","vp":"1561","hw":"eva"},{"v":"I","page":562,"adhy":"avy","v1":88,"v2":92,"x1":"b","x2":"","vp":"1562","hw":"aha"},{"v":"I","page":562,"adhy":"coloph","v1":1,"v2":6,"x1":"","x2":"a","vp":"1562","hw":""},{"v":"I","page":563,"adhy":"coloph","v1":6,"v2":6,"x1":"b","x2":"","vp":"1563","hw":""}];

// Main function to run the script based on URL parameter
function runScript() {
    const inputWord = getWordFromURL();
    inWord = inputWord.replace("?", "");

    if (!inputWord) {
        console.log('Please provide a "word" parameter in the URL.');
        return;
    }

    for (const ind of indexdata) {
        const base = ind['hw'];
        const page = ind['page'];
        const adhy = ind['adhy'];
        if (['avy', 'coloph'].includes(adhy) || base === '') {
            continue;
        } else {
            if (checkWhetherBefore(inWord, base)) {
                console.log(`${inputWord} is before ${base} on page ${page - 1}`);
                p1 = page - 1
                return p1;
            }
        }
    }
    console.log(`${inputWord} was not found to be before any listed word.`);
}

// Run the script when the page loads

