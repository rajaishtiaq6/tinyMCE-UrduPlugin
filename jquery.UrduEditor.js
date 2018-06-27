function isUndefined(prop){return(typeof prop=="undefined");}function isFunction(prop){return(typeof prop=="function");}function isString(prop){return(typeof prop=="string");}function isNumber(prop){return(typeof prop=="number");}function isNumeric(prop){return(isNumber(prop)||isString(prop))&&!isNaN(parseInt(prop))&&isFinite(parseInt(prop));}function isArray(prop){return(prop instanceof Array);}function isRegExp(prop){return(prop instanceof RegExp);}function isBoolean(prop){return("boolean"==typeof prop);}function isScalar(prop){return isNumeric(prop)||isString(prop)||isBoolean(prop);}function isEmpty(prop){if(isBoolean(prop)){return false;}if(isRegExp(prop)&&new RegExp("").toString()==prop.toString()){return true;}if(isString(prop)||isNumber(prop)||isFunction(prop)){return !prop;}if(Boolean(prop)&&false!=prop){for(var i in prop){if(prop.hasOwnProperty(i)){return false;}}}return true;}function gluePath(){var aL=arguments.length,i=aL-2,s=arguments[aL-1];for(;i>=0;i--){s=((!isString(arguments[i])&&!isNumber(arguments[i]))||isEmpty(arguments[i])?s:arguments[i]+"\x00"+s);}return s?s.replace(/\/*\x00+\/*/g,"/"):"";}function findPath(sname){var h=document.getElementsByTagName("html")[0].innerHTML,sr=new RegExp("<scr"+"ipt[^>]+?src\\s*=\\s*[\"']?([^>]+?/|)("+sname+")([^\"'\\s]*)[^>]*>(.|[\r\n])*?</scr"+"ipt>","i"),m=h.match(sr);if(m){if(!m[1]){m[1]="";}if(m[1].match(/^((https?|file)\:\/{2,}|\w:[\\])/)){return m[1];}if(m[1].indexOf("/")==0){return m[1];}b=document.getElementsByTagName("base");if(b[0]&&b[0].href){return b[0].href+m[1];}return(document.location.href.match(/(.*[\/\\])/)[0]+m[1]).replace(/^\/+/,"");}return null;}function getScriptQuery(sname){var h=document.getElementsByTagName("html")[0].innerHTML,sr=new RegExp("<scr"+"ipt[^>]+?src\\s*=\\s*[\"']?(?:[^>]+?/|)"+sname+"([^#\"']*).+?</scr"+"ipt>","i"),m=h.match(sr);if(m){return parseQuery(m[1].replace(/^[^?]*\?([^#]+)/,"$1"));}return{};}function parseQuery(q){if("string"!=typeof q||q.length<2){return{};}q=q.split(/&amp;|&/g);for(var z=0,qL=q.length,rs={},kv,rkv;z<qL;z++){kv=q[z].split("=");kv[0]=kv[0].replace(/[{}\[\]]*$/,"");rkv=rs[kv[0]];kv[1]=unescape(kv[1]?kv[1].replace("+"," "):"");if(rkv){if("array"==typeof(rkv)){rs[kv[0]][rs[kv[0]].length]=kv[1];}else{rs[kv[0]]=[rs[kv[0]],kv[1]];}}else{rs[kv[0]]=kv[1];}}return rs;}function table2array(id,ci,section,subsection){if(isString(id)){id=document.getElementById(id);}if(!id||!DOM.hasTagName(id,["table","tbody,","thead","tfoot"])){return null;}if(!isEmpty(section)&&(!isString(section)||!(id=id.getElementsByTagName(section)))){return null;}if(!isEmpty(subsection)&&(!isNumber(subsection)||subsection<0||!(id=id[subsection]))){return null;}if(isUndefined(id.rows)){return null;}var res=[],span=document.createElement("span"),ts=null,ce=null;for(var i=0,rL=id.rows.length;i<rL;i++){var tr=[];if(isArray(ci)){for(var z=0,cL=ci.length;z<cL;z++){ce=id.rows[i].cells[ci[z]];if(ce){span.innerHTML=ce.innerText?ce.innerText:ce.innerHTML.replace(/<script\s+(.|\r?\n)*?<\/script>|<[^>]*>/g,"");span.normalize();tr[tr.length]=span.firstChild?span.firstChild.nodeValue.trim(" \xA0"):"";}else{tr[tr.length]="";}}}else{for(var z=0,tL=id.rows[i].cells.length;z<tL;z++){cd=id.rows[i].cells[z];span.innerHTML=ce.innerText?ce.innerText:ce.innerHTML.replace(/<script\s+(.|\r?\n)*?<\/script>|<[^>]*>/g,"");span.normalize();tr[tr.length]=span.firstChild?span.firstChild.nodeValue.trim(" \xA0"):"";}}if(!isEmpty(tr)){res[res.length]=tr;}}return res;}document.createElementExt=function(tag,p){var L,i,k,el=document.createElement(tag);if(!el){return null;}for(i in p){if(!p.hasOwnProperty(i)){continue;}switch(i){case"class":el.setAttribute("className",p[i]);el.setAttribute("class",p[i]);break;case"style":for(k in p[i]){if(!p[i].hasOwnProperty(k)){continue;}el.style[k]=p[i][k];}break;case"event":for(k in p[i]){if(!p[i].hasOwnProperty(k)){continue;}el.attachEvent(k,p[i][k]);}break;case"child":L=p[i].length;for(k=0;k<L;k++){el.appendChild(p[i][k]);}break;case"param":for(k in p[i]){if(!p[i].hasOwnProperty(k)){continue;}try{el[k]=p[i][k];}catch(e){}}break;}}return el;};function playInterval(f,i,o){return setInterval(function(){(o instanceof Array)?f.apply(this,o):f.call(this,o);},i);}function playTimeout(f,i,o){return setTimeout(function(){(o instanceof Array)?f.apply(this,o):f.call(this,o);},i);}function cloneObject(obj){if(isScalar(obj)||isFunction(obj)||null==obj){return obj;}try{var newObject=new obj.constructor();}catch(e){return null;}if(isArray(newObject)){for(var i=0,oL=obj.length;i<oL;i++){newObject[i]=cloneObject(obj[i]);}}else{for(var i in obj){if(!obj.hasOwnProperty(i)){continue;}newObject[i]=cloneObject(obj[i]);}}return newObject;}function mergeObject(){var res={},oi,obj;for(var z=0,aL=arguments.length;z<aL;z++){obj=arguments[z];for(var i in obj){if(!obj.hasOwnProperty(i)){continue;}oi=obj[i];if(null==oi){if(!res.hasOwnProperty(i)){res[i]=oi;}}else{if(isArray(oi)){if(isArray(res[i])){res[i]=res[i].concat(oi).unique();}else{res[i]=oi.slice(0);}}else{if(isScalar(oi)||isFunction(oi)){res[i]=oi;}else{if(res.hasOwnProperty(i)){res[i]=mergeObject(res[i],oi);}else{res[i]=cloneObject(oi);}}}}}}return res;}function loadStyleSheet(sn){if(!hasStyleSheet(sn)){var head=document.getElementsByTagName("head")[0],link=document.createElement("link");link.rel="stylesheet";link.type="text/css";link.href=sn;head.appendChild(link);}}function hasStyleSheet(path){var h=document.getElementsByTagName("html")[0].innerHTML,sr=new RegExp("<link[^>]+?srcs*=s*[\"']?([^>]+?/)"+sn+"[^>]*>","i");return sr.test(h);}
if(isUndefined(DOM)){var DOM={};}DOM.getParent=function(el,cp,vl){if(el==null){return null;}else{if(el.nodeType==1&&((!isUndefined(vl)&&el[cp]==vl)||("string"==typeof cp&&DOM.hasTagName(el,cp))||el==cp)){return el;}else{return arguments.callee(el.parentNode,cp,vl);}}};DOM.getOffset=function(el){var fixBrowserQuirks=true,o=el,left=0,top=0,width=0,height=0,parentNode=null,offsetParent=null;if(o==null){return null;}offsetParent=o.offsetParent;var originalObject=o,el=o;while(el.parentNode!=null){el=el.parentNode;if(el.offsetParent!==null){var considerScroll=true;if(fixBrowserQuirks&&window.opera){if(el==originalObject.parentNode||el.nodeName=="TR"){considerScroll=false;}}if(considerScroll){if(el.scrollTop&&el.scrollTop>0){top-=el.scrollTop;}if(el.scrollLeft&&el.scrollLeft>0){left-=el.scrollLeft;}}}if(el==offsetParent){left+=o.offsetLeft;if(el.clientLeft&&el.nodeName!="TABLE"){left+=el.clientLeft;}top+=o.offsetTop;if(el.clientTop&&el.nodeName!="TABLE"){top+=el.clientTop;}o=el;if(o.offsetParent==null){if(o.offsetLeft){left+=o.offsetLeft;}if(o.offsetTop){top+=o.offsetTop;}}offsetParent=o.offsetParent;}}if(originalObject.offsetWidth){width=originalObject.offsetWidth;}if(originalObject.offsetHeight){height=originalObject.offsetHeight;}return{"x":left,"y":top,"width":width,"height":height};};DOM.getClientWidth=function(el){var win=this.getWindow(el),doc=win.document,w=0;if(win.innerWidth){w=win.innerWidth;}else{if(doc.documentElement&&doc.documentElement.clientWidth){w=doc.documentElement.clientWidth;}else{if(doc.body){w=doc.body.clientWidth;}}}return w;};DOM.getOffsetWidth=function(el){var win=this.getWindow(el),doc=win.document,w=0;if(win.outerWidth){w=win.outerWidth;}else{if(doc.documentElement&&doc.documentElement.clientWidth){w=doc.documentElement.clientWidth;}else{if(doc.body){w=doc.body.clientWidth;}}}return w;};DOM.getClientHeight=function(el){var win=this.getWindow(el),doc=win.document,h=0;if(win.innerHeight){h=win.innerHeight;}else{if(doc.documentElement&&doc.documentElement.clientHeight){h=doc.documentElement.clientHeight;}else{if(doc.body){h=doc.body.clientHeight;}}}return h;};DOM.getOffsetHeight=function(el){var win=this.getWindow(el),doc=win.document,h=0;if(win.outerHeight){h=win.outerHeight;}else{if(doc.documentElement&&doc.documentElement.clientHeight){h=doc.documentElement.clientHeight;}else{if(doc.body){h=doc.body.clientHeight;}}}return h;};DOM.getBodyScrollTop=function(el){var win=this.getWindow(el),doc=win.document;return win.pageYOffset||(doc.documentElement&&doc.documentElement.scrollTop)||(doc.body&&doc.body.scrollTop);};DOM.getBodyScrollLeft=function(el){var win=this.getWindow(el),doc=win.document;return win.pageXOffset||(doc.documentElement&&doc.documentElement.scrollLeft)||(doc.body&&doc.body.scrollLeft);};DOM.getWindow=function(el){var win=window;if(el){var doc=el.ownerDocument;win=doc.defaultView||doc.parentWindow||doc.window||window;}return win;};DOM.getCursorPosition=function(e){if(e.pageX||e.pageY){return{"x":e.pageX,"y":e.pageY};}var de=document.documentElement||document.body;return{"x":e.clientX+de.scrollLeft-(de.clientLeft||0),"y":e.clientY+de.scrollTop-(de.clientTop||0)};};DOM.hasTagName=function(prop,tags){if("string"==typeof tags){tags=[tags];}if(!isArray(tags)||isEmpty(tags)||isUndefined(prop)||isEmpty(prop.tagName)){return false;}var t=prop.tagName.toLowerCase();for(var i=0,tL=tags.length;i<tL;i++){if(tags[i].toLowerCase()==t){return true;}}return false;};DOM.color2rgb=function(prop){var e;if(/^([a-z]+)($|\s[a-z]+)/i.test(prop)){var d=document.body,ov=d.vLink;d.vLink=prop.split(" ")[0];prop=d.vLink;d.vLink=ov;}try{if(e=prop.match(/^#([\da-f]{6})$/i)){return e=parseInt(e[1],16),[(e&16711680)>>16,(e&65280)>>8,(e&255)];}else{if(e=prop.match(/^#([\da-f]{3})$/i)){return e=parseInt(e[1],16),[((e&3840)>>8)*17,((e&240)>>4)*17,(e&15)*17];}else{return(prop.match(/([\d%]+)/g).splice(0,3).map(function(a){return/%/.test(a)?(parseInt(a)*2.55).toFixed(0):parseInt(a);}));}}}catch(err){return;}};DOM.setOpacity=function(el,opacity){if(el.style.opacity!=opacity){el.style.opacity=el.style.KhtmOpacity=el.style.MozOpacity=opacity;el.style.filter="alpha(opacity="+(opacity*100)+")";}};DOM.StyleSheet=(function(){var StyleSheet=function(sname,win){var self=this;var operate=function(callback){var n=0;if(sname&&callback){var ss=win.document.getElementsByTagName("link"),sr=new RegExp(sname+"$","i");for(var i=0,ssL=ss.length;i<ssL;i++){var sheet=ss[i];if(sr.test(sheet.href)){callback(sheet);n++;}}}return n;};var get=function(){var sheets=[];if(sname){var h=win.document.getElementsByTagName("head")[0],sr=new RegExp("<link[^>]+?href\\s*=\\s*[\"']?(([^>]+?/|)"+sname+"[^\"'\\s]*)[^>]*>","ig"),m=sr.exec(h.innerHTML);while(m&&m[1]){sheets.push(m[1]);m=sr.exec(h.innerHTML);}}return sheets;};self.remove=function(){return operate(function(el){el.parentNode.removeChild(el);});};self.disable=function(){return operate(function(el){el.disabled=true;});};self.enable=function(){return operate(function(el){el.disabled=false;});};self.add=function(){if(!self.exists()){var head=win.document.getElementsByTagName("head")[0],s=win.document.createElement("link");s.rel="stylesheet";s.type="text/css";s.href=sname;head.appendChild(s);}};self.exists=function(){return Boolean(get().length);};self.count=function(){return get().length;};self.get=function(idx){return get()[(parseInt(idx)||0)];};};return function(sname,win){if(sname&&!/\.css$/i.test(sname)){sname+=".css";}if(!win||!win.document){win=window;}return new StyleSheet(sname,win);};})();DOM.CSS=(function(){var self=arguments.callee;self.addClass=function(){var arg=isArray(arguments[0])?arguments[0]:Array.prototype.slice.call(arguments);var el=self.el;el.className=el.className+" "+Array.prototype.join.call(arg," ");return self;};self.removeClass=function(){var arg=isArray(arguments[0])?arguments[0]:arguments;var ac=arguments.callee;if(!ac.cache){ac.cache={};}var c=ac.cache;var el=self.el;for(var i=0,aL=arg.length;i<aL;i++){var a=arg[i];if(!c.hasOwnProperty(a)){c[a]=new RegExp("((^|\\s+)"+a+"(?=\\s|$))+","g");}el.className=el.className.replace(c[a]," ");}el.className=el.className.replace(/\s{2,}/g," ");return self;};self.hasClass=function(c){re=new RegExp("(^|\\s+)"+c+"(\\s+|$)");return self.el.className.match(re," "+c+" ");};self.getClass=function(){return self.el.className;};self.getClassValue=function(c){var vals=self.el.className.match(new RegExp("(^|\\s)"+c+":([^\\s]+)"));return vals?((vals[2].indexOf(":")+1)?vals[2].split(":"):vals[2]):null;};self.getComputedStyle=function(prop){var y;var el=self.el;if(self.el.currentStyle){y=prop?el.currentStyle[prop]:el.currentStyle;}else{if(window.getComputedStyle){y=document.defaultView.getComputedStyle(el,null);if(prop){y=y[prop];}}else{y=null;}}return y;};return function(el){self.el=el;return self;};})();
DocumentSelection=new function(){var self=this;var keys={"prevCalcNode":"__prevCalcNode"};var callMethod=function(m,arg){var el=arg[0],id,module="";if(!el||!el.tagName){return false;}switch(arg[0].tagName.toLowerCase()){case"input":if(["button","checkbox","hidden","image","radio","reset","submit"].indexOf((el.type||"").toLowerCase())>-1){return false;}case"textarea":module="input";break;case"iframe":module="frame";arg[0]=el.contentWindow;break;default:return false;}if("function"==typeof self.module[module]){self.module[module]=new self.module[module](keys);}if(!self.module[module]||!self.module[module][m]){throw new Error("Method '"+m+"' is not implemented for DocumentSelection '"+module+"' module.");}return self.module[module][m].apply(self,arg);};var keepScroll=function(el,ot,ol){if(window.getSelection&&"iframe"!=el.tagName.toLowerCase()){var q=self.getSelectionOffset(el);if(el.contentWindow){el=el.contentWindow.document.body;}var dy=q.y-ot;if(dy<0){el.scrollTop=q.y;}else{if(dy+q.h>el.clientHeight){el.scrollTop=q.y-el.clientHeight/2;}else{el.scrollTop=ot;}}if(ol>q.x){el.scrollLeft=q.x;}else{if(ol+el.clientWidth>q.x){el.scrollLeft=ol;}else{el.scrollLeft=q.x-el.clientWidth/2;}}}};self.setRange=function(el,start,end,related){var ot=el.scrollTop,ol=el.scrollLeft;if(related){var st=self.getStart(el);end=st+end;start=st+start;}if(start<0){start=0;}if(end<start){end=start;}callMethod("setRange",[el,start,end]);keepScroll(el,ot,ol);};self.getSelection=function(el){return callMethod("getSelection",[el]);};self.getStart=function(el){return callMethod("getPos",[el])[0];};self.getEnd=function(el){return callMethod("getPos",[el])[0];};self.getCursorPosition=function(el){return self.getStart(el);};self.insertAtCursor=function(el,val,keep){var ot=el.scrollTop,ol=el.scrollLeft;if(!keep){callMethod("del",[el]);}var pos=callMethod("ins",[el,val]);keepScroll(el,ot,ol);return pos;};self.wrapSelection=function(el,start,end){var s=self.getCursorPosition(el),e=self.getEnd(el);if(s==e){self.insertAtCursor(el,start+end);}else{self.insertAtCursor(el,start,true);self.setRange(el,e+start.length,e+start.length);self.insertAtCursor(el,end,true);}};self.deleteAtCursor=function(el,after){if(!self.getSelection(el)){if(after){self.setRange(el,0,1,true);}else{self.setRange(el,-1,0,true);}}return self.deleteSelection(el);};self.deleteSelection=function(el){var ol=el.scrollLeft,ot=el.scrollTop,ret=callMethod("del",[el]);keepScroll(el,ot,ol);return ret;};self.getSelectionOffset=function(el){return callMethod("getSelectionOffset",[el],true);};self.getContext=function(el){return callMethod("getContext",[el]);};};DocumentSelection.module={"input":function(keys){var self=this;var offsetCalculator=null;self.getContext=function(el){var pos=self.getPos(el),val=el.value,r1=val.match(new RegExp("(?:.|[\\r\\n]){0,"+(pos[0]-1)+"}(?:^|\\s)","m"))||"",r2=val.match(new RegExp("(?:.|[\\r\\n]){"+pos[0]+"}","m"))[0],r3=val.replace(r2,""),r4=r3.substring(0,pos[1]-pos[0]),r5=(r3.replace(r4,"")).match(/(?:\S|$)*/);return[r2.replace(r1,""),r4,r5];};self.getPos=function(el){var val=el.value;var pos=[val.length,val.length];if("function"==typeof window.getSelection){try{pos=[el.selectionStart,el.selectionEnd];}catch(e){}}else{if(window.document.selection){el.setActive();var sel=el.document.selection.createRangeCollection()[0];if(el.tagName.toLowerCase()=="textarea"){var c=sel.duplicate();c.moveToElementText(el);var l=(window.opera?val:val.replace(/\r/g,"")).length;c.setEndPoint("StartToEnd",sel);var st=0+l-(window.opera?c.text:c.text.replace(/\r/g,"")).length;c.setEndPoint("StartToStart",sel);var en=0+l-(window.opera?c.text:c.text.replace(/\r/g,"")).length;pos[0]=Math.min(st,en);pos[1]=Math.max(st,en);}else{var clone=el.createTextRange();clone.setEndPoint("EndToStart",sel);pos[0]=(window.opera?clone.text:clone.text.replace(/\r/g,"")).length;clone.setEndPoint("EndToEnd",sel);pos[1]=(window.opera?clone.text:clone.text.replace(/\r/g,"")).length;}}}return pos;};self.del=function(el){var ret="",p=self.getPos(el),s=p[0],e=p[1];if(s!=e){var tmp=document.selection&&!window.opera?el.value.replace(/\r/g,""):el.value;ret=tmp.substring(s,e);el.value=tmp.substring(0,s)+tmp.substring(e,tmp.length);self.setRange(el,s,s);}return ret;};self.ins=function(el,val){var ret="",s=self.getPos(el)[0],oLen=el.value.length;var tmp=document.selection&&!window.opera?el.value.replace(/\r/g,""):el.value;el.value=tmp.substring(0,s)+val+tmp.substring(s,tmp.length);s+=el.value.length-oLen;self.setRange(el,s,s);return s;};self.getSelection=function(el){var p=self.getPos(el),s=p[0],e=p[1];if(e<s){e=s;}var tmp=document.selection&&!window.opera?el.value.replace(/\r/g,""):el.value;return tmp.substring(s,e);};self.setRange=function(el,start,end){if("function"==typeof el.setSelectionRange){try{el.setSelectionRange(start,end);}catch(e){}var p=self.getPos(el);}else{var range;range=el.createTextRange();el.setActive();range.collapse(true);range.moveStart("character",start);range.moveEnd("character",end-start);range.select();}};self.getSelectionOffset=function(el){var range,doc=DOM.getWindow(el).document;if("function"==typeof el.setSelectionRange){if(!offsetCalculator){offsetCalculator=doc.createElement("td");doc.body.appendChild(offsetCalculator);}if(offsetCalculator[keys.prevCalcNode]!=el){offsetCalculator[keys.prevCalcNode]=el;var cs=doc.defaultView.getComputedStyle(el,null);for(var i in cs){try{if(cs[i]&&"content"!=i){offsetCalculator.style[i]=cs[i];}}catch(e){}}offsetCalculator.style.overflow="auto";offsetCalculator.style.position="absolute";offsetCalculator.style.visibility="hidden";offsetCalculator.style.zIndex="-10";offsetCalculator.style.left="-10000px";offsetCalculator.style.top="-10000px";offsetCalculator.style.clip="";offsetCalculator.style.maxWidth="";offsetCalculator.style.maxHeight="";offsetCalculator.style.backgroundColor="yellow";}var range=doc.createRange(),val=el.value||" ";if("input"==el.tagName.toLowerCase()){offsetCalculator.style.width="auto";offsetCalculator.style.whiteSpace="nowrap";}else{offsetCalculator.style.whiteSpace="off"==el.getAttribute("wrap")?"pre":"";}val=val.replace(/\x20\x20/g,"\x20\xa0").replace(/</g,"&lt;").replace(/>/g,"&gt").replace(/\r/g,"");offsetCalculator.innerHTML=(val.substring(0,el.selectionStart-1)+"<span>"+val.substring(el.selectionStart-1,el.selectionStart)+"\xa0</span>"+val.substring(el.selectionStart)).replace(/\n/g,"<br />").replace(/\t/g,'<em style="white-space:pre">\t</em>');var span=offsetCalculator.getElementsByTagName("span")[0];span.style.border="1px solid red";range.offsetLeft=span.offsetLeft;range.offsetTop=span.offsetTop;range.offsetHeight=span.offsetHeight;span=null;}else{if(doc.selection&&doc.selection.createRange){range=doc.selection.createRange();range.offsetHeight=Math.round(range.boundingHeight/(range.text.replace(/[^\n]/g,"").length+1));if(el.tagName&&"textarea"==el.tagName.toLowerCase()){var xy=DOM.getOffset(el);range={"offsetTop":range.offsetTop+el.scrollTop-xy.y+DOM.getBodyScrollTop(el),"offsetLeft":range.offsetLeft+el.scrollLeft-xy.x+DOM.getBodyScrollLeft(el),"offsetHeight":range.offsetHeight};}}}if(range){return{"x":range.offsetLeft,"y":range.offsetTop,"h":range.offsetHeight};}return{"x":0,"y":0,"h":0};};},"frame":function(){var self=this;self.getContext=function(el){if("function"==typeof el.getSelection){var pos=self.getPos(el),val=el.document.body.innerText||el.document.body.innerHTML.replace(/<\/?[a-z:]+[^>]*>/ig,"").replace("&nbsp;"," "),r1=val.match(new RegExp("(?:.|[\\r\\n]){0,"+(pos[0]-1)+"}(?:^|\\s)","m"))||"",r2=val.match(new RegExp("(?:.|[\\r\\n]){"+pos[0]+"}","m"))||"",r3=val.replace(r2,""),r4=r3.substring(0,pos[1]-pos[0]),r5=(r3.replace(r4,"")).match(/(?:\S|$)*/);return[r2.toString().replace(r1,""),r4,r5];}else{var s1=el.document.selection.createRange(),s2=el.document.selection.createRange(),s3=el.document.selection.createRange();s1.moveStart("word",-1);s3.moveEnd("word",1);return[s1.text.replace(new RegExp(RegExp.escape(s2.text)+"$"),""),s2.text,s3.text.replace(new RegExp("^"+RegExp.escape(s2.text)),"")];}};self.getPos=function(el){var pos=[0,0];if("function"==typeof el.getSelection){var sel=el.getSelection(),sn=sel.anchorNode,so=sel.anchorOffset,en=sel.focusNode,eo=sel.focusOffset,ss=false,es=false,sc=0,ec=0,cn,tw=el.document.createTreeWalker(el.document.body,NodeFilter.SHOW_TEXT,null,false);while(sn&&sn.nodeType!=3){sn=sn.childNodes[so];so=0;}while(en&&en.nodeType!=3){en=en.childNodes[eo];eo=0;}while(cn=tw.nextNode()){if(cn==en){ec+=eo;es=true;}if(cn==sn){sc+=so;ss=true;}if(!es){ec+=cn.nodeValue.length;}if(!ss){sc+=cn.nodeValue.length;}if(es&&ss){break;}}pos=[Math.min(ec,sc),Math.max(ec,sc)];}else{el.document.body.setActive();pos=[Math.abs(el.document.selection.createRange().moveStart("character",-100000000)),Math.abs(el.document.selection.createRange().moveEnd("character",-100000000))];}return pos;};self.del=function(el){if("function"==typeof el.getSelection){var s=el.getSelection(),i=s.rangeCount;while(--i>-1){s.getRangeAt(i).deleteContents();}var r=s.getRangeAt(s.rangeCount-1);r.insertNode(el.document.createTextNode(""));s.addRange(r);}else{if(el.document&&el.document.selection){el.document.selection.createRange().text="";el.document.selection.createRange().select();}}};self.ins=function(el,val){if("function"==typeof el.getSelection){val=val.replace(/&/,"&amp;").replace(/</,"&lt;").replace(/>/,"&gt;").replace(/\x20/,"&nbsp;").replace(/[\r\n]/,"<br />");var n=el.document.createElement("span"),s=el.getSelection(),r=s.getRangeAt(0),ln;n.innerHTML=val;r.insertNode(n);r.selectNodeContents(n);var pn=n.parentNode,ln=n.nextSibling;n.parentNode.replaceChild(r.extractContents(),n);if(!ln){ln=pn.lastChild;}var r1=el.document.createRange();if(ln.nodeValue){r1.setStart(ln,0);}else{r1.setStartAfter(ln);}s.removeAllRanges();s.addRange(r1);}else{if(el.document&&el.document.selection){el.document.body.setActive();var r=el.document.selection.createRange();r.text=val;if(r.moveStart("character",1)){r.moveStart("character",-1);r.moveEnd("character",-1);r.select();}}}return self.getPos(el)[0];};self.getSelection=function(el,s,e){if("function"==typeof el.getSelection){var s=el.getSelection();return s?s.toString():"";}else{if(el.document&&el.document.selection){return el.document.selection.createRange().text;}}};self.setRange=function(el,start,end){if("function"==typeof el.getSelection){var sel=el.getSelection();sel.removeAllRanges();var r=el.document.createRange(),cnt=0,cl=0,cn,pn,tw=el.document.createTreeWalker(el.document.body,NodeFilter.SHOW_TEXT,null,false);while((cn=tw.nextNode())&&(!cn.nodeValue.length||(cnt+cn.nodeValue.length<=start))){pn=cn;cnt+=cn.nodeValue.length;}if(cn||(cn=pn)){r.setStart(cn,start-cnt);r.setEnd(cn,start-cnt);}if(cn){do{if(cn.nodeType!=3){continue;}if(cnt+cn.nodeValue.length<end){cnt+=cn.nodeValue.length;}else{r.setEnd(cn,end-cnt);break;}}while(cn=tw.nextNode());}sel.addRange(r);}else{if(el.document&&el.document.selection){el.document.body.setActive();var r=el.document.selection.createRange();r.moveToElementText(el.document.body);r.move("character",start);r.moveEnd("character",end-start);r.select();}}};self.getSelectionOffset=function(el){var off={"x":0,"y":0,"h":0};if("function"==typeof el.getSelection){var r=el.getSelection().getRangeAt(0),s=el.document.createElement("span"),contents=r.cloneContents(),e=r.endOffset,n=s;s.style.borderLeft="1px solid red";r.surroundContents(s);off.h=n.offsetHeight;while(n.offsetParent){off.x+=n.offsetLeft;off.y+=n.offsetTop;n=n.offsetParent;}s.parentNode.removeChild(s);var r1=el.document.createRange();if(contents.childNodes.length>0){for(var i=0;i<contents.childNodes.length;i++){var n=contents.childNodes[i];r.insertNode(n);r1.selectNode(n);}el.getSelection().addRange(r1);}}else{if(el.document&&el.document.selection){var r=el.document.selection.createRange();off.h=r.boundingHeight;off.x=r.offsetLeft;off.y=r.offsetTop;}}return off;};}};

(function ($) {

    //var langArray = new Array();
	var Editors = new Array();
    var codes = new Array();
	var rmap = new Array();
    var currEdit = null;
    var IsUrdu = 1;
    var EditorId = 0;
    var gOpts;
    var elName;
    var elIndex;
    var SrcElement;
    var Settings = {
        EditorFont: "Urdu Naskh Asiatype",
        EnglishColor: "#CCCCFF",
        UrduColor: "#99FF99",
		PointSize:"14px",
		ToggleControls:true,
		VirtualKeyboard:true,
		LineBreak:true,
		TextColor:"#000"
    };
	
	var VKI_keyboard;
	var vkPanel;
	var vkHeader;
	var vkCloser;
	var vkHeaderText
	reg = new RegExp("([0-9]*)px", "i");
	var vkDragging=false;
	var vkCurrPos = new Array();
	var x;
	var y;
	var Xoffset;
	var Yoffset;

codes['a'] = 0x0627;
codes['b'] = 0x0628;
codes['c'] = 0x0686;
codes['d'] = 0x062F;
codes['e'] = 0x0639;
codes['f'] = 0x0641;
codes['g'] = 0x06AF;
codes['h'] = 0x06BE;
codes['i'] = 0x06CC;
codes['j'] = 0x062C;
codes['k'] = 0x06A9;
codes['l'] = 0x0644;
codes['m'] = 0x0645;
codes['n'] = 0x0646;
codes['o'] = 0x06C1;
codes['p'] = 0x067E;
codes['q'] = 0x0642;
codes['r'] = 0x0631;
codes['s'] = 0x0633;
codes['t'] = 0x062A;
codes['u'] = 0x0626;
codes['v'] = 0x0637;
codes['w'] = 0x0648;
codes['x'] = 0x0634;
codes['y'] = 0x06D2;
codes['z'] = 0x0632;

codes['A'] = 0x0622;
codes['C'] = 0x062B;
codes['D'] = 0x0688;
codes['E'] = 0x0651;
codes['F'] = 0x064D;
codes['G'] = 0x063A;
codes['H'] = 0x062D;
codes['I'] = 0x0670;
codes['J'] = 0x0636;
codes['K'] = 0x062E;
codes['L'] = 0x0628;
codes['M'] = 0x064B;
codes['N'] = 0x06BA;
codes['O'] = 0x06C3;
codes['P'] = 0x064F;
codes['Q'] = 0x0656;
codes['R'] = 0x0691;
codes['S'] = 0x0635;
codes['T'] = 0x0679;
codes['U'] = 0x0621;
codes['V'] = 0x0638;
codes['W'] = 0x0624;
codes['X'] = 0x0698;
codes['Y'] = 0x0601;
codes['Z'] = 0x0630;

codes['>'] = 0x0650;
codes['<'] = 0x064E;
codes[String.fromCharCode(32)] = 32;
codes[String.fromCharCode(13)] = 13;
codes[':'] = 0x061B;
codes[';'] = 0x061B;
//codes[String.fromCharCode(39)] = 0x2018;
//codes[String.fromCharCode(34)] = 0x201C;
codes[String.fromCharCode(46)] = 0x06D4;
codes[String.fromCharCode(44)] = 0x060C;
codes['!'] = 0x0021;
codes['?'] = 0x061F;
codes[':'] = 58;
codes['['] = 0x201C;
codes[']'] = 0x201D;
codes['{'] = 0x2018;
codes['}'] = 0x2019;
codes['~'] = 0x0653;
codes['^'] = 0x0652;
codes['/'] = 0x002F;
codes['\\'] = 0x060E;
codes['L'] = 0x064C;
codes['+'] = 0x002B;
codes['-'] = 0x002D;
codes['_'] = 0x0640;
codes['*'] = 0x00D7;
codes[String.fromCharCode(47)] = 0x00F7;
codes[String.fromCharCode(37)] = 0x066A;
codes['('] = 0x0028;
codes[')'] = 0x0029;
codes['='] = 0x003D;
codes['´'] = 0x0657;
codes['0'] = 0x30;
codes['1'] = 0x31;
codes['2'] = 0x32;
codes['3'] = 0x33;
codes['4'] = 0x34;
codes['5'] = 0x35;
codes['6'] = 0x36;
codes['7'] = 0x37;
codes['8'] = 0x38;
codes['9'] = 0x39;

codes['زیر'] = String.fromCharCode(0x064E);
codes['زبر'] = String.fromCharCode(0x0650);
codes['پیش'] = String.fromCharCode(0x064F);
codes['دو زیر'] = String.fromCharCode(0x064D);
codes['دو زبر'] = String.fromCharCode(0x064B);
codes['دو پیش'] = String.fromCharCode(0x0628);
codes['ہمزہ'] = String.fromCharCode(0x0621);
codes['کھڑی زبر'] = String.fromCharCode(0x0670);
codes['تشدید'] = String.fromCharCode(0x0651);

codes[String.fromCharCode(0x064E)] = 'زیر';
codes[String.fromCharCode(0x0650)] = 'زبر';
codes[String.fromCharCode(0x064F)] = 'پیش';
codes[String.fromCharCode(0x064D)] = 'دو زیر';
codes[String.fromCharCode(0x064B)] = 'دو زبر';
codes[String.fromCharCode(0x0628)] = 'دو پیش';
codes[String.fromCharCode(0x0621)] = 'ہمزہ';
codes[String.fromCharCode(0x0670)] = 'کھڑی زبر';
codes[String.fromCharCode(0x0651)] = 'تشدید';

	rmap['زیر'] = '>';
	rmap['زبر'] = '<';
	rmap['پیش'] = 'P';
	rmap['دو زیر'] = 'M';
	rmap['دو زبر'] = 'F';
	rmap['دو پیش'] = 'L';
	rmap['ہمزہ'] = 'U';
	rmap['کھڑی زبر'] = 'I';
	rmap['تشدید'] = 'E';

    var Diacritics = '[]{}~';
    var keyboardSRK = '<div class="keyboardContainer" id="OSKContainer" visible="false"><div class="keyboardHeader" style="cursor:default;" id="OSKHeader"><span id="OSKheadertext">On Screen Keyboard</span></div><div class="keyboardPanel" id="OSKPanel"><table width="100%" style="background-color: rgb(236, 236, 236);border: 1px solid #C0C0C0;direction: rtl;" ><tbody><tr><td class="btnFlat" char="آ">آ</td><td class="btnFlat" char="ا">ا</td><td class="btnFlat" char="ب">ب</td><td class="btnFlat" char="پ">پ</td><td class="btnFlat" char="ت">ت</td><td class="btnFlat" char="ٹ">ٹ</td><td class="btnFlat" char="ث">ث</td><td class="btnFlat" char="ج">ج</td><td class="btnFlat" char="چ">چ</td><td class="btnFlat" char="ح">ح</td><td class="btnFlat" char="خ">خ</td><td class="btnFlat" char="د">د</td><td class="btnFlat" char="ڈ">ڈ</td><td class="btnFlat" char="ذ">ذ</td><td class="btnFlat" char="ر">ر</td></tr><tr><td class="btnFlat" char="ڑ">ڑ</td><td class="btnFlat" char="ز">ز</td><td class="btnFlat" char="ژ">ژ</td><td class="btnFlat" char="س">س</td><td class="btnFlat" char="ش">ش</td><td class="btnFlat" char="ص">ص</td><td class="btnFlat" char="ض">ض</td><td class="btnFlat" char="ط">ط</td><td class="btnFlat" char="ظ">ظ</td><td class="btnFlat" char="ع">ع</td><td class="btnFlat" char="غ">غ</td><td class="btnFlat" char="ف">ف</td><td class="btnFlat" char="ق">ق</td><td class="btnFlat" char="ک">ک</td><td class="btnFlat" char="گ">گ</td></tr><tr><td class="btnFlat" char="ل">ل</td><td class="btnFlat" char="م">م</td><td class="btnFlat" char="ن">ن</td><td class="btnFlat" char="و">و</td><td class="btnFlat" char="ؤ">ؤ</td><td class="btnFlat" char="ہ">ہ</td><td class="btnFlat" char="ھ">ھ</td><td class="btnFlat" char="ء">ء</td><td class="btnFlat" char="ی">ی</td><td class="btnFlat" char="ئ">ئ</td><td class="btnFlat" char="ے">ے</td><td class="btnFlat" char="۔">۔</td><td class="btnFlat" char="؟">؟</td><td class="btnFlat" char="،">،</td></tr><tr><td class="btnFlat" char="زیر">زیر</td><td class="btnFlat" char="زبر">زبر</td><td class="btnFlat" char="پیش">پیش</td><td class="btnFlat" char="دو زیر">دو زیر</td><td class="btnFlat" char="دو زبر">دو زبر</td><td class="btnFlat" char="دو پیش">دو پیش</td><td class="btnFlat" char="ہمزہ">ہمزہ</td><td class="btnFlat" char="کھڑی زبر">کھڑی زبر</td><td class="btnFlat" char="تشدید">تشدید</td></tr></tbody></table></div></div>';
	
	VK_Layout = [
		['A', 'a', 'b', 'p', 't', 'T', 'C', 'j', 'c', 'H', 'K', 'd', 'D', 'Z', 'r'],
		['R', 'z', 'X', 's', 'x', 'S', 'J', 'v', 'V', 'e', 'G', 'f', 'q', 'k', 'g'],
		['l', 'm', 'n', 'w', 'W', 'o', 'h', 'U', 'i', 'u', 'y', '.', '?', ','],
		[String.fromCharCode(0x064E), String.fromCharCode(0x0650), String.fromCharCode(0x064F), String.fromCharCode(0x064D), String.fromCharCode(0x064B), String.fromCharCode(0x0628), String.fromCharCode(0x0621), String.fromCharCode(0x0670), String.fromCharCode(0x0651)],
	];
	
	
	function VKI_findPos(obj) {
		var curleft = curtop = 0;
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return [curleft, curtop];
	}

	function VKI_innerDimensions() {
		if (this.innerHeight) {
			return [this.innerWidth, this.innerHeight];
		} else if (document.documentElement && document.documentElement.clientHeight) {
			return [document.documentElement.clientWidth, document.documentElement.clientHeight];
		} else if (document.body)
			return [document.body.clientWidth, document.body.clientHeight];
		return [0, 0];
	}

	function VKI_scrollDist() {
		var html = document.getElementsByTagName('html')[0];
		if (html.scrollTop && document.documentElement.scrollTop) {
			return [html.scrollLeft, html.scrollTop];
		} else if (html.scrollTop || document.documentElement.scrollTop)
			return [html.scrollLeft + document.documentElement.scrollLeft, html.scrollTop + document.documentElement.scrollTop];
		return [0, 0];
	}

	function VKI_getStyle(obj, styleProp) {
		if (obj.currentStyle) {
			var y = obj.currentStyle[styleProp];
		} else if (window.getComputedStyle)
			var y = window.getComputedStyle(obj, null)[styleProp];
		return y;
	}
	
	function initKeyboard()
	{
	
		VKI_keyboard= $('<div id="keyboardContainer" class="keyboardContainer"></div>');
		vkPanel=$('<div id="keyboardPanel" class="keyboardPanel"></div>');
		vkHeader=$('<div id="keyboardHeader" class="keyboardHeader"></div>');	
		vkCloser= $('<span>X</span>');
		vkHeaderText=$('<span id="headertext">On Screen Keyboad</span>');
		vkCloser= $('<span id="closer">X</span>');
		vkCloser.css(
			{
				cssFloat : "left",
				cursor : "pointer",
				color : "#000",
				borderColor : "#E5E5E5 #5D5D5D #5D5D5D #E5E5E5",
				borderStyle : "solid",
				borderWidth : "1px",
				backgroundColor : "#CCCCCC",
				padding : "0 0.4em",
				margin : "0 0 0 0.3em"
			}
		);
		vkHeader.append(vkCloser);
		vkHeader.append(vkHeaderText);
		
		vkCloser.click(function(e){
			VK_Close();
		})
		
		vkHeader.mousedown(function(e){
			var clickX;
			var clickY;
			vkDragging = true;
			
			VKI_keyboard.css("className", "keyboardContainerDragged");
			if (e.offsetX || e.offsetY) {
				clickX = e.offsetX;
				clickY = e.offsetY;
			}
			else {
				clickX = e.pageX;
				clickY = e.pageY;
			}
			
			itemX= VKI_keyboard.css("left");
			itemY= VKI_keyboard.css("top");				
			arX = reg.exec(itemX);
			arY = reg.exec(itemY);
			Xoffset = clickX - arX[1];
			Yoffset = clickY - arY[1];
		})
		
		vkHeader.mouseup(function(e){
			vkDragging = false;				
			VKI_keyboard.css("className", "keyboardContainer");
		})
		
		vkHeader.mousemove(function(e){
			if (vkDragging == true) {
				if (e.offsetX || e.offsetY) {
					x = e.offsetX - Xoffset;
					y = e.offsetY - Yoffset;
				}
				else {
					x = e.pageX - Xoffset;
					y = e.pageY - Yoffset;
				}
				VKI_keyboard.css("top", y + 'px');
				VKI_keyboard.css("left" , x + 'px');
			}
		})
		
		var vkTable= $('<table></table>');
		vkTable.css({backgroundColor : "#ECECEC",border : "1px solid #C0C0C0",direction : "rtl"});
		var tBody= $('<tbody></tbody>');
		for (i = 0; i < 3; i++) {
			var tRow= $('<tr></tr>');
			for (j = 0; j < VK_Layout[i].length; j++) {
				var caption = String.fromCharCode(codes[VK_Layout[i][j]]);
				if (caption == "undefined") caption='&nbsp';
				var tCell= $('<td class="btnFlat">'+caption+'</td>');
				var td= tCell.get(0);
				rmap[caption] = VK_Layout[i][j];
				tCell.attr('char', caption);
				
				tCell.click( function(e) {
					var td1=e.target;
					if (td1.firstChild)
						AddText(td1.firstChild.nodeValue);
					else
						AddText(e.srcElement.firstChild.nodeValue);
				 });
				 
				tCell.mouseover( function(e) {
					 //headerText=vkHeaderText.get(0);
					 var td1=e.target;
					 if (td1.firstChild)
						 vkHeaderText.text('Keyboard : ' + rmap[td1.firstChild.nodeValue]);
					 else
						 vkHeaderText.text('Keyboard : ' + rmap[e.srcElement.firstChild.nodeValue]);
				 });
				 tRow.append(tCell);
			}
			tBody.append(tRow);
		}
		
		var lastRow = $('<tr></tr>');
		for (j = 0; j < VK_Layout[3].length; j++) {
			var caption = codes[VK_Layout[3][j]];
			if (caption == "undefined") caption='&nbsp';
			var tCell= $('<td class="btnFlat">'+caption+'</td>');
			var td= tCell.get(0);
			//rmap[caption] = VK_Layout[3][j];
			tCell.attr('char', caption);
			
			
			tCell.click( function(e) {
				var td1=e.target;
				if (td1.firstChild)
					AddText(td1.firstChild.nodeValue);
				else
					AddText(e.srcElement.firstChild.nodeValue);
			 });
			 
			tCell.mouseover( function(e) {
				 //headerText=vkHeaderText.get(0);
				 var td1=e.target;
				 if (td1.firstChild)
					 vkHeaderText.text('Keyboard : ' + rmap[td1.firstChild.nodeValue]);
				 else
					 vkHeaderText.text('Keyboard : ' + rmap[e.srcElement.firstChild.nodeValue]);
			 });
				 
			lastRow.append(tCell);
		}
		tBody.append(lastRow);
		vkTable.append(tBody);
		vkPanel.append(vkTable);
		VKI_keyboard.append(vkHeader);
		VKI_keyboard.append(vkPanel);
		VKI_keyboard.attr("Visible" , false);
	}
		
	initKeyboard();
	
    $.fn.UrduEditor = function (options) {

        var kbNormal = 1;
        var kbShift = 2;
        var kbAlt = 3;
        var kbCtrl = 4;
        var kbAltGr = 5;
        var bToggleFlag = 0;
        var CurrentKeyboardState = 1;
        var scriptPath;
		Diacritics = '[]{}~';

		VKI_isIE = /*@cc_on!@*/false;		
		VKI_isIE6 = /*@if(@_jscript_version == 5.6)!@end@*/false;
		VKI_isMoz = typeof window.sidebar != "undefined";
		
        SrcElement = $(this).get(0);

        var scriptElement = document.getElementsByTagName('script');
        for (var i = 0; i < scriptElement.length; i++) {
            if (scriptElement[i].src && (scriptElement[i].src.indexOf("jquery.UrduEditor.js") != -1)) {
                _x = scriptElement[i].src.indexOf("jquery.UrduEditor.js");
                scriptPath = scriptElement[i].src.substring(0, _x);
            }
        }
		
        $.extend($.fn.UrduEditor.defaults, options);

        return this.each(function () {
            
            
            var el = this;
            if ($(el).attr("UrduEditorId")) return;
            editorId = getId();
            $(el).attr("UrduEditorId", editorId);
            setAttributes(el, options)

            // keypress handler
            $(el).keypress(function (e) {
                var editorId = $(el).attr("UrduEditorId");
                if (!Editors[editorId].UrduMode) return;
                e = (e) ? e : (window.event) ? event : null;

                var charCode = (e.charCode) ? e.charCode :
                    ((e.keyCode) ? e.keyCode :
                   ((e.which) ? e.which : 0));
                var whichASC = charCode; // key's ASCII code
                var whichChar = String.fromCharCode(whichASC); // key's character
				var chr = whichChar;

				if (chr) {
					var virtualprint = false;
					var win = DOM.getWindow(currEdit);
					var charCode = e.charCode;

					if (charCode < 0x0020 || charCode >= 0x007F || e.ctrlKey || e.altKey || e.metaKey)
						return true;

			   
					var ck = codes[chr];
					if (ck != undefined)
					{
						if($.browser.msie)
						{
							event.keyCode= ck;
						}
						else if (isFunction(win.document.createEvent)) 
						{
							var evt = null;
							newkey = codes[whichChar];
							if (newkey == charCode)
								return true;
							try {
								/*evt = win.document.createEvent("KeyEvents");
								if (currEdit.tagName.toUpperCase()=="IFRAME")
								{
									evt.initKeyEvent('keypress', false, true, currEdit.contentWindow, false, false, false, false, 0, ck);
									currEdit.contentWindow.document.dispatchEvent(evt);
								}
								else
								{
									evt.initKeyEvent('keypress', false, true, currEdit, false, false, false, false, 0, ck);
									currEdit.dispatchEvent(evt);
								}
								e.preventDefault();*/
								virtualprint = true;

							} catch (ex) {
								try {
									evt = win.document.createEvent("TextEvent");
									
									if (currEdit.tagName.toUpperCase()=="IFRAME")
									{
										evt.initTextEvent( 'textInput', true, true, currEdit.contentWindow, String.fromCharCode(ck) );
										currEdit.contentWindow.document.dispatchEvent(evt);
									}
									else
									{
										evt.initTextEvent( 'textInput', true, true, null, String.fromCharCode(ck) );
										currEdit.dispatchEvent(evt);
									}
									
									e.preventDefault();
								} catch (ex) {
									virtualprint = true;
								}
							}
						} else {
							try {
								event.keyCode = 10 == ck ? 13 : ck;
								ret = true;
							} catch (ex) {
								virtualprint = true;
							}
						}
					}
					

					if (virtualprint) {
						var charCode = e.keyCode;
						if ((charCode == 13) || (charCode == 8) || (charCode == 37) || (charCode == 39) || (charCode == 38) || (charCode == 40) || (charCode == 33) || (charCode == 34) || (charCode == 50)) return;

						var txt = String.fromCharCode(codes[whichChar])
						DocumentSelection.insertAtCursor(currEdit, txt);
						if (chr[1]) {
							DocumentSelection.setRange(currEdit, -txt, 0, true);
						}
						
						if($.browser.msie)
						{
							e.returnValue=false;
							e.cancelBubble=true;
						}
						else
						{
							e.preventDefault();
							e.stopPropagation();
						}
							
					}
				}
                
            });

            $(el).keydown(function (e) {
                e = (e) ? e : (window.event) ? event : null;
                var charCode = (e.charCode) ? e.charCode :
                        ((e.keyCode) ? e.keyCode :
                       ((e.which) ? e.which : 0));
                if (e.ctrlKey && (charCode == 32)) {
                    $.fn.UrduEditor.ToggleLanguage();
                    e.preventDefault();
                    return false;
                }

            });

            $(el).focus(function (e) {
                if ($.browser.msie) {
                    currEdit = window.event.srcElement;
                }
                else {
                    currEdit = e.target;
                }
            })
        });

		
        function getId() {
            EditorId++;
            return "UrduEditor_" + EditorId;
        }

        function setEditor(e) {
            if ($.browser.mozilla || $.browser.opera || $.browser.safari || $.browser.chrome) {
                currEdit = e.target;
            }
            else if ($.browser.msie)
                currEdit = window.event.srcElement;
        }

        function setAttributes(el, pt) {
			
            el.lang = "ur";
            el.dir = "rtl";
            el.wrap = "soft";
            var editorId = $(el).attr("UrduEditorId");
			Editors[editorId] = { UrduMode: 1};

            var urduBtn = $('<img />').attr('src', scriptPath + '/urdubtn.gif');
			var englishBtn = $('<img />').attr('src', scriptPath + '/engbtn.gif');
			var vkBtn = $('<img />').attr('src', scriptPath + '/keyboard.gif');
			var lineBreak=$('<br />');
			
			if($.fn.UrduEditor.defaults.ToggleControls)
			{
				if($.fn.UrduEditor.defaults.LineBreak)
				{					
					$(el).after(lineBreak);
					$(lineBreak).after(urduBtn);
					$(urduBtn).after(englishBtn);
					if($.fn.UrduEditor.defaults.LineBreak)
					{
						$(englishBtn).after(vkBtn);
					}
				}
				else
				{
					$(el).after(urduBtn);
					$(urduBtn).after(englishBtn);
					if($.fn.UrduEditor.defaults.VirtualKeyboard)
					{
						$(englishBtn).after(vkBtn);
					}
				}
			}
			else if($.fn.UrduEditor.defaults.VirtualKeyboard)
			{
				if($.fn.UrduEditor.defaults.LineBreak)
				{
					$(el).after(lineBreak);
					$(englishBtn).after(vkBtn);
				}
				else
				{
					$(el).after(vkBtn);
				}
			}
	
            urduBtn.click(function () {setUrdu(el);})
			englishBtn.click(function () {setEnglish(el);})
			vkBtn.click(function(){
				if (!VKI_keyboard.Visible) VK_Show(el);
				else VK_Close();
			})

            with (el.style) {
                fontFamily = $.fn.UrduEditor.defaults.EditorFont;
                fontSize = $.fn.UrduEditor.defaults.PointSize;
				//color= $.fn.UrduEditor.defaults.TextColor;
                //backgroundColor = $.fn.UrduEditor.defaults.UrduColor;
            }
			
			if (VKI_isIE) 
			{
				//storeCaret();
			}
        }

    };


    $.fn.UrduEditor.SetDefaults = function (options) {
        if (null != options) {
			if (options.PointSize) {
                Settings.PointSize = options.PointSize;
            }
			
			if (options.TextColor) {
                //Settings.TextColor = options.TextColor;
            }
			
            if (options.EditorFont) {
                Settings.EditorFont = options.EditorFont;
            }

            if (options.UrduColor) {
                //Settings.UrduColor = options.UrduColor;
            }

            if (options.EnglishColor) {
                //Settings.EnglishColor = options.EnglishColor;
            }
			
			if (options.ToggleControls) {
                Settings.ToggleControls = options.ToggleControls;
            }
			
			if (options.VirtualKeyboard) {
                Settings.VirtualKeyboard = options.VirtualKeyboard;
            }
			
			if (options.LineBreak) {
                Settings.LineBreak = options.LineBreak;
            }
        }
    };

    $.fn.UrduEditor.defaults = {
		PointSize:"13px",
        EditorFont: "Urdu Naskh Asiatype",
        EnglishColor: "#CCCCFF",
        UrduColor: "#99FF99",
		ToggleControls:true,
		VirtualKeyboard:true,
		LineBreak:true
    };

    $.fn.UrduEditor.ToggleLanguage = function () {
        var editorId = $(currEdit).attr("UrduEditorId");
		isUrdu = Editors[editorId].UrduMode;
        if (isUrdu) {
            setEnglish(currEdit);
        }
        else {
            setUrdu(currEdit);
        }
    };

	storeCaret=function() 
	{
		if (currEdit.createTextRange) 
			currEdit.caretPos = document.selection.createRange().duplicate();
	}
	
	VKI_position = function() {
		var inputElemPos = VKI_findPos(currEdit);
		vKeyboard=VKI_keyboard.get(0);
		vKeyboard.style.top = inputElemPos[1] - ((currEdit.keyboardPosition == "fixed" && !VKI_isIE && !VKI_isMoz) ? VKI_scrollDist()[1] : 0) + currEdit.offsetHeight + 3 + "px";
		var innerDimensions = VKI_innerDimensions();
		var L1 = innerDimensions[0] - vKeyboard.offsetWidth - 15;
		var L2 = inputElemPos[0];
		Wx = Math.min(innerDimensions[0] - vKeyboard.offsetWidth - 15, inputElemPos[0])
		vKeyboard.style.left = Wx + "px";
		if (vKeyboard.offsetWidth > currEdit.offsetWidth)
			vKeyboard.style.left = Wx - (vKeyboard.offsetWidth - currEdit.offsetWidth) + "px";
		else
			vKeyboard.style.left = Wx + (currEdit.offsetWidth - vKeyboard.offsetWidth) + "px";
	}

	VK_Show = function(el) {
		vKeyboard=VKI_keyboard.get(0);
		currEdit = el;
		currEdit.keyboardPosition = "absolute";
		vKeyboard.style.top = vKeyboard.style.right = vKeyboard.style.bottom = vKeyboard.style.left = "auto";
		vKeyboard.style.position = currEdit.keyboardPosition;
		document.body.appendChild(vKeyboard);
		this.VKI_position();
		currEdit.focus();
		vKeyboard.Visible = true;
	}

	VK_Close = function() {
		document.body.removeChild(vKeyboard);
		vKeyboard.Visible = false;
	}

    AddText = function (strText) {
		DocumentSelection.insertAtCursor(currEdit, strText);
		currEdit.focus();
		return;
		var virtualprint = false;
		var win = DOM.getWindow(currEdit);
		ck= strText.charCodeAt(0);
		var evt = null;
		if (isFunction(win.document.createEvent)) 
		{		
			try {
				evt = win.document.createEvent("KeyEvents");
				if (currEdit.tagName.toUpperCase()=="IFRAME")
				{
					evt.initKeyEvent('keypress', false, true, currEdit.contentWindow, false, false, false, false, 0, ck);
					currEdit.contentWindow.document.dispatchEvent(evt);
				}
				else
				{
					evt.initKeyEvent('keypress', false, true, currEdit.contentWindow, false, false, false, false, 0, ck);
					currEdit.dispatchEvent(evt);
				}

				
				e.preventDefault();

			} catch (ex) {
				try {
					evt = win.document.createEvent("TextEvent");
					
					if (currEdit.tagName.toUpperCase()=="IFRAME")
					{
						evt.initTextEvent( 'textInput', true, true, currEdit.contentWindow, String.fromCharCode(ck) );
						currEdit.contentWindow.document.dispatchEvent(evt);
					}
					else
					{
						evt.initTextEvent( 'textInput', true, true, null, String.fromCharCode(ck) );
						currEdit.dispatchEvent(evt);
					}
					
					e.preventDefault();
				} catch (ex) {
					virtualprint = true;
				}
			}
		} 
		else if (currEdit.createTextRange && currEdit.caretPos) 
		{
			var caretPos = currEdit.caretPos;      
				caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ?
				strText + ' ' : strText;
			currEdit.focus(caretPos);
		}	
		else {
			
			DocumentSelection.insertAtCursor(currEdit, strText);
			storeCaret();
			currEdit.focus();
		}

    }

    setUrdu = function (el) {
        IsUrdu = 1;
        var editorId = $(el).attr("UrduEditorId");
		Editors[editorId].UrduMode = 1;
		//el.focus(1);
        
		if (el.tagName.toUpperCase() == "IFRAME") {
		}
		else    
			//el.style.backgroundColor = $.fn.UrduEditor.defaults.UrduColor;
		if (el.createTextRange) {
			var caretPos = el.caretPos;
			el.focus(caretPos);
		}
		else if (el.selectionStart || el.selectionStart == '0') {
			var startPos = el.selectionStart;
			el.focus();
			el.selectionStart = startPos;
			el.selectionEnd = startPos;
		}
    };

    setEnglish = function (el) {

        IsUrdu = 0;
        var editorId = $(el).attr("UrduEditorId");
		Editors[editorId].UrduMode = 0;
		//el.focus(1);

		if (el.tagName.toUpperCase() == "IFRAME") {
		}
		else    
			//el.style.backgroundColor = $.fn.UrduEditor.defaults.EnglishColor;
		if (el.createTextRange) {
			var caretPos = el.caretPos;
			el.focus(caretPos);
		}
		else if (el.selectionStart || el.selectionStart == '0') {
			var startPos = el.selectionStart;
			el.focus();
			el.selectionStart = startPos;
			el.selectionEnd = startPos;
		}
    };

    $.fn.UrduEditor.writeKeyboard = function (el) {
        el.after(keyboardSRK);
		$("#OSKPanel .btnFlat").mouseover( function(e) {
			 var td1=e.target;
			 if (td1.firstChild)
				 $("#OSKheadertext").text('Keyboard : ' + rmap[td1.firstChild.nodeValue]);
			 else
				 $("#OSKheadertext").text('Keyboard : ' + rmap[e.srcElement.firstChild.nodeValue]);
		 });
		 
		 $("#OSKPanel .btnFlat").click( function(e) {
			var td1=e.target;
			if (td1.firstChild)
				AddText(td1.firstChild.nodeValue);
			else
				AddText(e.srcElement.firstChild.nodeValue);
		 });
    }
})(jQuery);
