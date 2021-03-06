/**
 * Copyright (c) 2007-2015, Kaazing Corporation. All rights reserved.
 */

function URI(h){h=h||"";
var b=0;
var e=h.indexOf("://");
if(e!=-1){this.scheme=h.slice(0,e);
b=e+3;
var d=h.indexOf("/",b);
if(d==-1){d=h.length;
h+="/"
}var f=h.slice(b,d);
this.authority=f;
b=d;
this.host=f;
var c=f.indexOf(":");
if(c!=-1){this.host=f.slice(0,c);
this.port=parseInt(f.slice(c+1),10);
if(isNaN(this.port)){throw new Error("Invalid URI syntax")
}}}var g=h.indexOf("?",b);
if(g!=-1){this.path=h.slice(b,g);
b=g+1
}var a=h.indexOf("#",b);
if(a!=-1){if(g!=-1){this.query=h.slice(b,a)
}else{this.path=h.slice(b,a)
}b=a+1;
this.fragment=h.slice(b)
}else{if(g!=-1){this.query=h.slice(b)
}else{this.path=h.slice(b)
}}}(function(){var a=URI.prototype;
a.toString=function(){var e=[];
var d=this.scheme;
if(d!==undefined){e.push(d);
e.push("://");
e.push(this.host);
var c=this.port;
if(c!==undefined){e.push(":");
e.push(c.toString())
}}if(this.path!==undefined){e.push(this.path)
}if(this.query!==undefined){e.push("?");
e.push(this.query)
}if(this.fragment!==undefined){e.push("#");
e.push(this.fragment)
}return e.join("")
};
var b={http:80,ws:80,https:443,wss:443};
URI.replaceProtocol=function(c,e){var d=c.indexOf("://");
if(d>0){return e+c.substr(d)
}else{return""
}}
})();
ByteOrder=function(){};
(function(){var g=ByteOrder.prototype;
g.toString=function(){throw new Error("Abstract")
};
var d=function(n){return(n&255)
};
var j=function(n){return(n&128)?(n|-256):n
};
var c=function(n){return[((n>>8)&255),(n&255)]
};
var m=function(n,o){return(j(n)<<8)|(o&255)
};
var b=function(n,o){return((n&255)<<8)|(o&255)
};
var e=function(n,o,p){return((n&255)<<16)|((o&255)<<8)|(p&255)
};
var k=function(n){return[((n>>16)&255),((n>>8)&255),(n&255)]
};
var l=function(n,o,p){return((n&255)<<16)|((o&255)<<8)|(p&255)
};
var f=function(n){return[((n>>24)&255),((n>>16)&255),((n>>8)&255),(n&255)]
};
var h=function(q,n,o,p){return(j(q)<<24)|((n&255)<<16)|((o&255)<<8)|(p&255)
};
var a=function(t,n,p,r){var o=b(t,n);
var q=b(p,r);
return(o*65536+q)
};
ByteOrder.BIG_ENDIAN=(function(){var o=function(){};
o.prototype=new ByteOrder();
var n=o.prototype;
n._toUnsignedByte=d;
n._toByte=j;
n._fromShort=c;
n._toShort=m;
n._toUnsignedShort=b;
n._toUnsignedMediumInt=e;
n._fromMediumInt=k;
n._toMediumInt=l;
n._fromInt=f;
n._toInt=h;
n._toUnsignedInt=a;
n.toString=function(){return"<ByteOrder.BIG_ENDIAN>"
};
return new o()
})();
ByteOrder.LITTLE_ENDIAN=(function(){var o=function(){};
o.prototype=new ByteOrder();
var n=o.prototype;
n._toByte=j;
n._toUnsignedByte=d;
n._fromShort=function(p){return c(p).reverse()
};
n._toShort=function(p,q){return m(q,p)
};
n._toUnsignedShort=function(p,q){return b(q,p)
};
n._toUnsignedMediumInt=function(p,q,r){return e(r,q,p)
};
n._fromMediumInt=function(p){return k(p).reverse()
};
n._toMediumInt=function(t,u,v,p,q,r){return l(r,q,p,v,u,t)
};
n._fromInt=function(p){return f(p).reverse()
};
n._toInt=function(t,p,q,r){return h(r,q,p,t)
};
n._toUnsignedInt=function(t,p,q,r){return a(r,q,p,t)
};
n.toString=function(){return"<ByteOrder.LITTLE_ENDIAN>"
};
return new o()
})()
})();
function ByteBuffer(a){this.array=a||[];
this._mark=-1;
this.limit=this.capacity=this.array.length;
this.order=ByteOrder.BIG_ENDIAN
}(function(){ByteBuffer.allocate=function(g){var h=new ByteBuffer();
h.capacity=g;
h.limit=g;
return h
};
ByteBuffer.wrap=function(g){return new ByteBuffer(g)
};
var b=ByteBuffer.prototype;
b.autoExpand=true;
b.capacity=0;
b.position=0;
b.limit=0;
b.order=ByteOrder.BIG_ENDIAN;
b.array=[];
b.mark=function(){this._mark=this.position;
return this
};
b.reset=function(){var g=this._mark;
if(g<0){throw new Error("Invalid mark")
}this.position=g;
return this
};
b.compact=function(){this.array.splice(0,this.position);
this.limit-=this.position;
this.position=0;
return this
};
b.duplicate=function(){var g=new ByteBuffer(this.array);
g.position=this.position;
g.limit=this.limit;
g.capacity=this.capacity;
return g
};
b.fill=function(g){e(this,g);
while(g-->0){this.put(0)
}return this
};
b.fillWith=function(g,h){e(this,h);
while(h-->0){this.put(g)
}return this
};
b.indexOf=function(g){var h=this.limit;
var k=this.array;
for(var j=this.position;
j<h;
j++){if(k[j]==g){return j
}}return -1
};
b.put=function(g){e(this,1);
this.array[this.position++]=g&255;
return this
};
b.putAt=function(h,g){c(this,h,1);
this.array[h]=g&255;
return this
};
b.putUnsigned=function(g){e(this,1);
this.array[this.position++]=g&255;
return this
};
b.putUnsignedAt=function(h,g){c(this,h,1);
this.array[h]=g&255;
return this
};
b.putShort=function(g){e(this,2);
a(this,this.position,this.order._fromShort(g));
this.position+=2;
return this
};
b.putShortAt=function(h,g){c(this,h,2);
a(this,h,this.order._fromShort(g));
return this
};
b.putUnsignedShort=function(g){e(this,2);
a(this,this.position,this.order._fromShort(g&65535));
this.position+=2;
return this
};
b.putUnsignedShortAt=function(h,g){c(this,h,2);
a(this,h,this.order._fromShort(g&65535));
return this
};
b.putMediumInt=function(g){e(this,3);
this.putMediumIntAt(this.position,g);
this.position+=3;
return this
};
b.putMediumIntAt=function(h,g){this.putBytesAt(h,this.order._fromMediumInt(g));
return this
};
b.putInt=function(g){e(this,4);
a(this,this.position,this.order._fromInt(g));
this.position+=4;
return this
};
b.putIntAt=function(h,g){c(this,h,4);
a(this,h,this.order._fromInt(g));
return this
};
b.putUnsignedInt=function(g){e(this,4);
this.putUnsignedIntAt(this.position,g&4294967295);
this.position+=4;
return this
};
b.putUnsignedIntAt=function(h,g){c(this,h,4);
this.putIntAt(h,g&4294967295);
return this
};
b.putString=function(g,h){h.encode(g,this);
return this
};
b.putPrefixedString=function(h,j,k){if(typeof(k)==="undefined"||typeof(k.encode)==="undefined"){throw new Error("ByteBuffer.putPrefixedString: character set parameter missing")
}if(h===0){return this
}e(this,h);
var g=j.length;
switch(h){case 1:this.put(g);
break;
case 2:this.putShort(g);
break;
case 4:this.putInt(g);
break
}k.encode(j,this);
return this
};
function a(k,h,g){var l=k.array;
for(var j=0;
j<g.length;
j++){l[j+h]=g[j]&255
}}b.putBytes=function(g){e(this,g.length);
a(this,this.position,g);
this.position+=g.length;
return this
};
b.putBytesAt=function(h,g){c(this,h,g.length);
a(this,h,g);
return this
};
b.putByteArray=function(g){e(this,g.byteLength);
var h=new Uint8Array(g);
for(var j=0;
j<h.byteLength;
j++){this.putAt(this.position+j,h[j]&255)
}this.position+=g.byteLength;
return this
};
b.putBuffer=function(h){var g=h.remaining();
e(this,g);
var m=h.array;
var l=h.position;
var k=this.position;
for(var j=0;
j<g;
j++){this.array[j+k]=m[j+l]
}this.position+=g;
return this
};
b.putBufferAt=function(j,h){var g=h.remaining();
e(this,g);
var n=h.array;
var m=h.position;
var l=this.position;
for(var k=0;
k<g;
k++){this.array[k+l]=n[k+m]
}return this
};
b.get=function(){f(this,1);
return this.order._toByte(this.array[this.position++])
};
b.getAt=function(g){d(this,g,1);
return this.order._toByte(this.array[g])
};
b.getUnsigned=function(){f(this,1);
var g=this.order._toUnsignedByte(this.array[this.position++]);
return g
};
b.getUnsignedAt=function(g){d(this,g,1);
return this.order._toUnsignedByte(this.array[g])
};
b.getBytes=function(j){f(this,j);
var g=new Array();
for(var h=0;
h<j;
h++){g.push(this.order._toByte(this.array[h+this.position]))
}this.position+=j;
return g
};
b.getBytesAt=function(h,k){d(this,h,k);
var g=new Array();
var l=this.array;
for(var j=0;
j<k;
j++){g.push(l[j+h])
}return g
};
b.getBlob=function(h){var g=this.array.slice(this.position,h);
this.position+=h;
return BlobUtils.fromNumberArray(g)
};
b.getBlobAt=function(h,j){var g=this.getBytesAt(h,j);
return BlobUtils.fromNumberArray(g)
};
b.getArrayBuffer=function(h){var g=new Uint8Array(h);
g.set(this.array.slice(this.position,h));
this.position+=h;
return g.buffer
};
b.getShort=function(){f(this,2);
var g=this.getShortAt(this.position);
this.position+=2;
return g
};
b.getShortAt=function(g){d(this,g,2);
var h=this.array;
return this.order._toShort(h[g++],h[g++])
};
b.getUnsignedShort=function(){f(this,2);
var g=this.getUnsignedShortAt(this.position);
this.position+=2;
return g
};
b.getUnsignedShortAt=function(g){d(this,g,2);
var h=this.array;
return this.order._toUnsignedShort(h[g++],h[g++])
};
b.getUnsignedMediumInt=function(){var g=this.array;
return this.order._toUnsignedMediumInt(g[this.position++],g[this.position++],g[this.position++])
};
b.getMediumInt=function(){var g=this.getMediumIntAt(this.position);
this.position+=3;
return g
};
b.getMediumIntAt=function(g){var h=this.array;
return this.order._toMediumInt(h[g++],h[g++],h[g++])
};
b.getInt=function(){f(this,4);
var g=this.getIntAt(this.position);
this.position+=4;
return g
};
b.getIntAt=function(g){d(this,g,4);
var h=this.array;
return this.order._toInt(h[g++],h[g++],h[g++],h[g++])
};
b.getUnsignedInt=function(){f(this,4);
var g=this.getUnsignedIntAt(this.position);
this.position+=4;
return g
};
b.getUnsignedIntAt=function(g){d(this,g,4);
var h=this.array;
return this.order._toUnsignedInt(h[g++],h[g++],h[g++],h[g++]);
return val
};
b.getPrefixedString=function(h,j){var g=0;
switch(h||2){case 1:g=this.getUnsigned();
break;
case 2:g=this.getUnsignedShort();
break;
case 4:g=this.getInt();
break
}if(g===0){return""
}var k=this.limit;
try{this.limit=this.position+g;
return j.decode(this)
}finally{this.limit=k
}};
b.getString=function(g){try{return g.decode(this)
}finally{this.position=this.limit
}};
b.slice=function(){return new ByteBuffer(this.array.slice(this.position,this.limit))
};
b.flip=function(){this.limit=this.position;
this.position=0;
this._mark=-1;
return this
};
b.rewind=function(){this.position=0;
this._mark=-1;
return this
};
b.clear=function(){this.position=0;
this.limit=this.capacity;
this._mark=-1;
return this
};
b.remaining=function(){return(this.limit-this.position)
};
b.hasRemaining=function(){return(this.limit>this.position)
};
b.skip=function(g){this.position+=g;
return this
};
b.getHexDump=function(){var m=this.array;
var l=this.position;
var g=this.limit;
if(l==g){return"empty"
}var k=[];
for(var h=l;
h<g;
h++){var j=(m[h]||0).toString(16);
if(j.length==1){j="0"+j
}k.push(j)
}return k.join(" ")
};
b.toString=b.getHexDump;
b.expand=function(g){return this.expandAt(this.position,g)
};
b.expandAt=function(h,j){var g=h+j;
if(g>this.capacity){this.capacity=g
}if(g>this.limit){this.limit=g
}return this
};
function e(h,g){if(h.autoExpand){h.expand(g)
}return h
}function f(j,h){var g=j.position+h;
if(g>j.limit){throw new Error("Buffer underflow")
}return j
}function d(k,h,j){var g=h+j;
if(h<0||g>k.limit){throw new Error("Index out of bounds")
}return k
}function c(k,h,j){var g=h+j;
if(h<0||g>k.limit){throw new Error("Index out of bounds")
}return k
}})();
function Charset(){}(function(){var a=Charset.prototype;
a.decode=function(b){};
a.encode=function(c,b){};
Charset.UTF8=(function(){function d(){}d.prototype=new Charset();
var c=d.prototype;
c.decode=function(f){var k=f.remaining();
var n=k<10000;
var r=[];
var m=f.array;
var l=f.position;
var j=l+k;
var u,q,p,o;
for(var h=l;
h<j;
h++){u=(m[h]&255);
var e=b(u);
var g=j-h;
if(g<e){break
}var t=null;
switch(e){case 1:t=u;
break;
case 2:h++;
q=(m[h]&255);
t=((u&31)<<6)|(q&63);
break;
case 3:h++;
q=(m[h]&255);
h++;
p=(m[h]&255);
t=((u&15)<<12)|((q&63)<<6)|(p&63);
break;
case 4:h++;
q=(m[h]&255);
h++;
p=(m[h]&255);
h++;
o=(m[h]&255);
t=((u&7)<<18)|((q&63)<<12)|((p&63)<<6)|(o&63);
break
}if(n){r.push(t)
}else{r.push(String.fromCharCode(t))
}}if(n){return String.fromCharCode.apply(null,r)
}else{return r.join("")
}};
c.encode=function(j,f){var h=f.position;
var l=h;
var k=f.array;
for(var g=0;
g<j.length;
g++){var e=j.charCodeAt(g);
if(e<128){k[h++]=e
}else{if(e<2048){k[h++]=(e>>6)|192;
k[h++]=(e&63)|128
}else{if(e<65536){k[h++]=(e>>12)|224;
k[h++]=((e>>6)&63)|128;
k[h++]=(e&63)|128
}else{if(e<1114112){k[h++]=(e>>18)|240;
k[h++]=((e>>12)&63)|128;
k[h++]=((e>>6)&63)|128;
k[h++]=(e&63)|128
}else{throw new Error("Invalid UTF-8 string")
}}}}}f.position=h;
f.expandAt(h,h-l)
};
c.encodeAsByteArray=function(h){var f=new Array();
for(var g=0;
g<h.length;
g++){var e=h.charCodeAt(g);
if(e<128){f.push(e)
}else{if(e<2048){f.push((e>>6)|192);
f.push((e&63)|128)
}else{if(e<65536){f.push((e>>12)|224);
f.push(((e>>6)&63)|128);
f.push((e&63)|128)
}else{if(e<1114112){f.push((e>>18)|240);
f.push(((e>>12)&63)|128);
f.push(((e>>6)&63)|128);
f.push((e&63)|128)
}else{throw new Error("Invalid UTF-8 string")
}}}}}return f
};
c.encodeByteArray=function(j){var h=j.length;
var f=[];
for(var g=0;
g<h;
g++){var e=j[g];
if(e<128){f.push(e)
}else{if(e<2048){f.push((e>>6)|192);
f.push((e&63)|128)
}else{if(e<65536){f.push((e>>12)|224);
f.push(((e>>6)&63)|128);
f.push((e&63)|128)
}else{if(e<1114112){f.push((e>>18)|240);
f.push(((e>>12)&63)|128);
f.push(((e>>6)&63)|128);
f.push((e&63)|128)
}else{throw new Error("Invalid UTF-8 string")
}}}}}return String.fromCharCode.apply(null,f)
};
c.encodeArrayBuffer=function(k){var g=new Uint8Array(k);
var j=g.length;
var f=[];
for(var h=0;
h<j;
h++){var e=g[h];
if(e<128){f.push(e)
}else{if(e<2048){f.push((e>>6)|192);
f.push((e&63)|128)
}else{if(e<65536){f.push((e>>12)|224);
f.push(((e>>6)&63)|128);
f.push((e&63)|128)
}else{if(e<1114112){f.push((e>>18)|240);
f.push(((e>>12)&63)|128);
f.push(((e>>6)&63)|128);
f.push((e&63)|128)
}else{throw new Error("Invalid UTF-8 string")
}}}}}return String.fromCharCode.apply(null,f)
};
c.toByteArray=function(h){var l=[];
var o,m,k,j;
var f=h.length;
for(var g=0;
g<f;
g++){o=(h.charCodeAt(g)&255);
var e=b(o);
var n=null;
if(e+g>f){break
}switch(e){case 1:n=o;
break;
case 2:g++;
m=(h.charCodeAt(g)&255);
n=((o&31)<<6)|(m&63);
break;
case 3:g++;
m=(h.charCodeAt(g)&255);
g++;
k=(h.charCodeAt(g)&255);
n=((o&15)<<12)|((m&63)<<6)|(k&63);
break;
case 4:g++;
m=(h.charCodeAt(g)&255);
g++;
k=(h.charCodeAt(g)&255);
g++;
j=(h.charCodeAt(g)&255);
n=((o&7)<<18)|((m&63)<<12)|((k&63)<<6)|(j&63);
break
}l.push(n&255)
}return l
};
function b(e){if((e&128)===0){return 1
}if((e&32)===0){return 2
}if((e&16)===0){return 3
}if((e&8)===0){return 4
}throw new Error("Invalid UTF-8 bytes")
}return new d()
})()
})();
var KzLogger=function(a){this._name=a;
this._level=KzLogger.Level.INFO
};
(function(){KzLogger.Level={OFF:8,SEVERE:7,WARNING:6,INFO:5,CONFIG:4,FINE:3,FINER:2,FINEST:1,ALL:0};
var g;
var j=document.getElementsByTagName("meta");
for(var d=0;
d<j.length;
d++){if(j[d].name==="kaazing:logging"){g=j[d].content;
break
}}KzLogger._logConf={};
if(g){var f=g.split(",");
for(var d=0;
d<f.length;
d++){var b=f[d].split("=");
KzLogger._logConf[b[0]]=b[1]
}}var a={};
KzLogger.getLogger=function(l){var k=a[l];
if(k===undefined){k=new KzLogger(l);
a[l]=k
}return k
};
var e=KzLogger.prototype;
e.setLevel=function(k){if(k&&k>=KzLogger.Level.ALL&&k<=KzLogger.Level.OFF){this._level=k
}};
e.isLoggable=function(m){for(var l in KzLogger._logConf){if(KzLogger._logConf.hasOwnProperty(l)){if(this._name.match(l)){var k=KzLogger._logConf[l];
if(k){return(KzLogger.Level[k]<=m)
}}}}return(this._level<=m)
};
var h=function(){};
var c={};
c[KzLogger.Level.OFF]=h;
c[KzLogger.Level.SEVERE]=(window.console)?(console.error||console.log||h):h;
c[KzLogger.Level.WARNING]=(window.console)?(console.warn||console.log||h):h;
c[KzLogger.Level.INFO]=(window.console)?(console.info||console.log||h):h;
c[KzLogger.Level.CONFIG]=(window.console)?(console.info||console.log||h):h;
c[KzLogger.Level.FINE]=(window.console)?(console.debug||console.log||h):h;
c[KzLogger.Level.FINER]=(window.console)?(console.debug||console.log||h):h;
c[KzLogger.Level.FINEST]=(window.console)?(console.debug||console.log||h):h;
c[KzLogger.Level.ALL]=(window.console)?(console.log||h):h;
e.config=function(l,k){this.log(KzLogger.Level.CONFIG,l,k)
};
e.entering=function(m,k,n){if(this.isLoggable(KzLogger.Level.FINER)){if(browser=="chrome"||browser=="safari"){m=console
}var l=c[KzLogger.Level.FINER];
if(n){if(typeof(l)=="object"){l("ENTRY "+k,n)
}else{l.call(m,"ENTRY "+k,n)
}}else{if(typeof(l)=="object"){l("ENTRY "+k)
}else{l.call(m,"ENTRY "+k)
}}}};
e.exiting=function(n,k,m){if(this.isLoggable(KzLogger.Level.FINER)){var l=c[KzLogger.Level.FINER];
if(browser=="chrome"||browser=="safari"){n=console
}if(m){if(typeof(l)=="object"){l("RETURN "+k,m)
}else{l.call(n,"RETURN "+k,m)
}}else{if(typeof(l)=="object"){l("RETURN "+k)
}else{l.call(n,"RETURN "+k)
}}}};
e.fine=function(l,k){this.log(KzLogger.Level.FINE,l,k)
};
e.finer=function(l,k){this.log(KzLogger.Level.FINER,l,k)
};
e.finest=function(l,k){this.log(KzLogger.Level.FINEST,l,k)
};
e.info=function(l,k){this.log(KzLogger.Level.INFO,l,k)
};
e.log=function(n,m,l){if(this.isLoggable(n)){var k=c[n];
if(browser=="chrome"||browser=="safari"){m=console
}if(typeof(k)=="object"){k(l)
}else{k.call(m,l)
}}};
e.severe=function(l,k){this.log(KzLogger.Level.SEVERE,l,k)
};
e.warning=function(l,k){this.log(KzLogger.Level.WARNING,l,k)
}
})();
var ULOG=KzLogger.getLogger("com.kaazing.gateway.client.loader.Utils");
var getMetaValue=function(d){ULOG.entering(this,"Utils.getMetaValue",d);
var b=document.getElementsByTagName("meta");
for(var c=0;
c<b.length;
c++){if(b[c].name===d){var a=b[c].content;
ULOG.exiting(this,"Utils.getMetaValue",a);
return a
}}ULOG.exiting(this,"Utils.getMetaValue")
};
var arrayCopy=function(c){ULOG.entering(this,"Utils.arrayCopy",c);
var a=[];
for(var b=0;
b<c.length;
b++){a.push(c[b])
}return a
};
var arrayFilter=function(e,d){ULOG.entering(this,"Utils.arrayFilter",{array:e,callback:d});
var a=[];
for(var c=0;
c<e.length;
c++){var b=e[c];
if(d(b)){a.push(e[c])
}}return a
};
var indexOf=function(c,a){ULOG.entering(this,"Utils.indexOf",{array:c,searchElement:a});
for(var b=0;
b<c.length;
b++){if(c[b]==a){ULOG.exiting(this,"Utils.indexOf",b);
return b
}}ULOG.exiting(this,"Utils.indexOf",-1);
return -1
};
var decodeByteString=function(f){ULOG.entering(this,"Utils.decodeByteString",f);
var b=[];
for(var e=0;
e<f.length;
e++){b.push(f.charCodeAt(e)&255)
}var d=new ByteBuffer(b);
var c=getStringUnterminated(d,Charset.UTF8);
ULOG.exiting(this,"Utils.decodeByteString",c);
return c
};
var decodeArrayBuffer=function(f){ULOG.entering(this,"Utils.decodeArrayBuffer",f);
var c=new Uint8Array(f);
var b=[];
for(var d=0;
d<c.length;
d++){b.push(c[d])
}var c=new ByteBuffer(b);
var e=getStringUnterminated(c,Charset.UTF8);
ULOG.exiting(this,"Utils.decodeArrayBuffer",e);
return e
};
var decodeArrayBuffer2ByteBuffer=function(e){ULOG.entering(this,"Utils.decodeArrayBuffer2ByteBuffer");
var c=new Uint8Array(e);
var b=[];
for(var d=0;
d<c.length;
d++){b.push(c[d])
}ULOG.exiting(this,"Utils.decodeArrayBuffer2ByteBuffer");
return new ByteBuffer(b)
};
var ESCAPE_CHAR=String.fromCharCode(127);
var NULL=String.fromCharCode(0);
var LINEFEED="\n";
var encodeEscapedByteString=function(d){ULOG.entering(this,"Utils.encodeEscapedByte",d);
var b=[];
while(d.remaining()){var f=d.getUnsigned();
var e=String.fromCharCode(f);
switch(e){case ESCAPE_CHAR:b.push(ESCAPE_CHAR);
b.push(ESCAPE_CHAR);
break;
case NULL:b.push(ESCAPE_CHAR);
b.push("0");
break;
case LINEFEED:b.push(ESCAPE_CHAR);
b.push("n");
break;
default:b.push(e)
}}var c=b.join("");
ULOG.exiting(this,"Utils.encodeEscapedBytes",c);
return c
};
var encodeByteString=function(c,b){ULOG.entering(this,"Utils.encodeByteString",{buf:c,requiresEscaping:b});
if(b){return encodeEscapedByteString(c)
}else{var h=c.array;
var l=(c.position==0&&c.limit==h.length)?h:c.getBytes(c.remaining());
var g=!(XMLHttpRequest.prototype.sendAsBinary);
for(var e=l.length-1;
e>=0;
e--){var f=l[e];
if(f==0&&g){l[e]=256
}else{if(f<0){l[e]=f&255
}}}var j=0;
var k=[];
do{var a=Math.min(l.length-j,10000);
partOfBytes=l.slice(j,j+a);
j+=a;
k.push(String.fromCharCode.apply(null,partOfBytes))
}while(j<l.length);
var d=k.join("");
if(l===h){for(var e=l.length-1;
e>=0;
e--){var f=l[e];
if(f==256){l[e]=0
}}}ULOG.exiting(this,"Utils.encodeByteString",d);
return d
}};
var getStringUnterminated=function(b,c){var a=b.position;
var d=b.limit;
var e=b.array;
while(a<d){a++
}try{b.limit=a;
return c.decode(b)
}finally{if(a!=d){b.limit=d;
b.position=a+1
}}};
var LOADER_BASE_NAME="AmqpClient";
var EventDispatcher=function(){};
(function(){var a=EventDispatcher.prototype;
a._initEventDispatcher=function(){this._eventListeners={}
};
a.addEventListener=function(c,d){var b=this._eventListeners[c];
if(b){b.push(d)
}else{this._eventListeners[c]=[d]
}};
a.removeEventListener=function(e,f){var d=this._eventListeners[e];
if(d){var b=[];
for(var c=0;
c<d.length;
c++){if(d[c]!==f){b.push(d[c])
}}this._eventListeners[e]=new Listeners
}};
a.hasEventListener=function(c){var b=this._eventListeners[c];
return Boolean(b)
};
a.dispatchEvent=function(d){var c=this._eventListeners[d.type];
if(c){for(var b=0;
b<c.length;
b++){c[b](d)
}}if(this["on"+d.type]){this["on"+d.type](d)
}}
})();
var AmqpClient=function(a){if(!a||!(a instanceof AmqpClientFactory)){throw new Error("AmqpClient: Required parameter 'factory' must be an instance of AmqpClientFactory")
}this._amqpClientFactory=a;
this._options={};
this._readyState=0;
this._init()
};
(function(){var w=function(aB){this.context=aB;
this.states={}
};
(function(){var aB=w.prototype;
var aC=function aC(){};
aB.enterState=function(aH,aE,aF){if(this.currentState){this.currentState.exitBehavior(this.context,aE,aF,aH)
}var aG=this.states[aH];
this.currentState=aG;
try{aG.entryBehavior(this.context,aE,aF,aH)
}catch(aI){var aD=new Error("Could not call behavior for state "+aG.stateName+"\n\n"+aI.message);
aD.innerException=aI;
throw (aD)
}};
aB.addState=function(aM,aF,aK,aE){var aD={};
aD.stateName=aM;
aD.entryBehavior=aK||aC;
aD.exitBehavior=aE||aC;
this.states[aM]=(aD);
aD.rules={};
var aL=aF||[];
for(var aH=0;
aH<aL.length;
aH++){var aI=aL[aH];
for(var aG=0;
aG<aI.inputs.length;
aG++){var aJ=aI.inputs[aG];
aD.rules[aJ]=aI.targetState
}}};
aB.feedInput=function(aD,aE){var aG=this.currentState;
if(aG.rules[aD]){var aH=this;
var aF=function(){aH.enterState(aG.rules[aD],aD,aE)
};
aF();
return true
}else{return false
}}
})();
var e=function(){};
(function(){e.prototype=new EventDispatcher();
var aE=e.prototype;
var aB=function aB(){};
var aD=function aD(aG){throw aG
};
aE._stateMachine=null;
aE.onerror=function(aG){};
aE._actions=[];
aE._processActions=function aC(){if(!this._actions.length){return
}var aI=this._actions[0];
var aH=this._stateMachine.feedInput(aI.actionName+"Action",aI);
if(aH){var aG=this;
setTimeout(function(){try{aI.func.apply(aG,aI.args)
}catch(aJ){aI.error(aJ)
}},0);
this._actions.shift()
}};
aE._enqueueAction=function aF(aH,aL,aJ,aG,aI){var aM={};
aM.actionName=aH||"";
aM.func=aL||aB;
aM.args=aJ||null;
aM.continuation=aG||aB;
aM.error=aI||aD;
this._actions.push(aM);
var aK=this;
var aL=function(){aK._processActions()
};
setTimeout(aL,0)
};
aE._initAsyncClient=function(){this._initEventDispatcher();
this._stateMachine=new w(this);
this._actions=[];
this._buffer=null;
this._socket=null
};
aE._send=null;
aE._readHandler=null
})();
var N={};
N.FRAME_METHOD={value:1,message:""};
N.FRAME_HEADER={value:2,message:""};
N.FRAME_BODY={value:3,message:""};
N.FRAME_HEARTBEAT={value:8,message:""};
N.FRAME_MIN_SIZE={value:4096,message:""};
N.FRAME_END={value:206,message:""};
N.REPLY_SUCCESS={value:200,message:"Indicates that the method completed successfully. This reply code is reserved for future use - the current protocol design does not use positive confirmation and reply codes are sent only in case of an error."};
N.CONTENT_TOO_LARGE={value:311,message:"The client attempted to transfer content larger than the server could accept at the present time. The client may retry at a later time."};
N.NO_CONSUMERS={value:313,message:"When the exchange cannot deliver to a consumer when the immediate flag is set. As a result of pending data on the queue or the absence of any consumers of the queue."};
N.CONNECTION_FORCED={value:320,message:"An operator intervened to close the connection for some reason. The client may retry at some later date."};
N.INVALID_PATH={value:402,message:"The client tried to work with an unknown virtual host."};
N.ACCESS_REFUSED={value:403,message:"The client attempted to work with a server entity to which it has no access due to security settings."};
N.NOT_FOUND={value:404,message:"The client attempted to work with a server entity that does not exist."};
N.RESOURCE_LOCKED={value:405,message:"The client attempted to work with a server entity to which it has no access because another client is working with it."};
N.PRECONDITION_FAILED={value:406,message:"The client requested a method that was not allowed because some precondition failed."};
N.FRAME_ERROR={value:501,message:"The sender sent a malformed frame that the recipient could not decode. This strongly implies a programming error in the sending peer."};
N.SYNTAX_ERROR={value:502,message:"The sender sent a frame that contained illegal values for one or more fields. This strongly implies a programming error in the sending peer."};
N.COMMAND_INVALID={value:503,message:"The client sent an invalid sequence of frames, attempting to perform an operation that was considered invalid by the server. This usually implies a programming error in the client."};
N.CHANNEL_ERROR={value:504,message:"The client attempted to work with a channel that had not been correctly opened. This most likely indicates a fault in the client layer."};
N.UNEXPECTED_FRAME={value:505,message:"The peer sent a frame that was not expected, usually in the context of a content header and body.  This strongly indicates a fault in the peer's content processing."};
N.RESOURCE_ERROR={value:506,message:"The server could not complete the method because it lacked sufficient resources. This may be due to the client creating too many of some type of entity."};
N.NOT_ALLOWED={value:530,message:"The client tried to work with some entity in a manner that is prohibited by the server, due to security settings or by some other criteria."};
N.NOT_IMPLEMENTED={value:540,message:"The client tried to use functionality that is not implemented in the server."};
N.INTERNAL_ERROR={value:541,message:"The server could not complete the method because of an internal error. The server may require intervention by an operator in order to resume normal operations."};
var g={ClassId:{type:"short",asserts:[]},ConsumerTag:{type:"shortstr",asserts:[]},DeliveryTag:{type:"longlong",asserts:[]},ExchangeName:{type:"shortstr",asserts:[]},MethodId:{type:"short",asserts:[]},NoAck:{type:"bit",asserts:[]},NoLocal:{type:"bit",asserts:[]},NoWait:{type:"bit",asserts:[]},Path:{type:"shortstr",asserts:[]},PeerProperties:{type:"table",asserts:[]},QueueName:{type:"shortstr",asserts:[]},Redelivered:{type:"bit",asserts:[]},MessageCount:{type:"long",asserts:[]},ReplyCode:{type:"short",asserts:[]},ReplyText:{type:"shortstr",asserts:[]},Bit:{type:"bit",asserts:[]},Octet:{type:"octet",asserts:[]},Short:{type:"short",asserts:[]},Long:{type:"long",asserts:[]},Longlong:{type:"longlong",asserts:[]},Shortstr:{type:"shortstr",asserts:[]},Longstr:{type:"longstr",asserts:[]},Timestamp:{type:"timestamp",asserts:[]},Table:{type:"table",asserts:[]}};
var V={};
V.Connection={};
V.Connection.startConnection={};
V.Connection.startConnection.allParameters=[{name:"versionMajor",type:"Octet"},{name:"versionMinor",type:"Octet"},{name:"serverProperties",type:"PeerProperties"},{name:"mechanisms",type:"Longstr"},{name:"locales",type:"Longstr"}];
V.Connection.startConnection.returnType="StartOkConnection";
V.Connection.startConnection.index=10;
V.Connection.startConnection.classIndex=10;
V.Connection.startConnection.synchronous=true;
V.Connection.startConnection.hasContent=false;
V.Connection.startOkConnection={};
V.Connection.startOkConnection.allParameters=[{name:"clientProperties",type:"PeerProperties"},{name:"mechanism",type:"Shortstr"},{name:"response",type:"Longstr"},{name:"locale",type:"Shortstr"}];
V.Connection.startOkConnection.returnType="voidConnection";
V.Connection.startOkConnection.index=11;
V.Connection.startOkConnection.classIndex=10;
V.Connection.startOkConnection.synchronous=true;
V.Connection.startOkConnection.hasContent=false;
V.Connection.secureConnection={};
V.Connection.secureConnection.allParameters=[{name:"challenge",type:"Longstr"}];
V.Connection.secureConnection.returnType="SecureOkConnection";
V.Connection.secureConnection.index=20;
V.Connection.secureConnection.classIndex=10;
V.Connection.secureConnection.synchronous=true;
V.Connection.secureConnection.hasContent=false;
V.Connection.secureOkConnection={};
V.Connection.secureOkConnection.allParameters=[{name:"response",type:"Longstr"}];
V.Connection.secureOkConnection.returnType="voidConnection";
V.Connection.secureOkConnection.index=21;
V.Connection.secureOkConnection.classIndex=10;
V.Connection.secureOkConnection.synchronous=true;
V.Connection.secureOkConnection.hasContent=false;
V.Connection.tuneConnection={};
V.Connection.tuneConnection.allParameters=[{name:"channelMax",type:"Short"},{name:"frameMax",type:"Long"},{name:"heartbeat",type:"Short"}];
V.Connection.tuneConnection.returnType="TuneOkConnection";
V.Connection.tuneConnection.index=30;
V.Connection.tuneConnection.classIndex=10;
V.Connection.tuneConnection.synchronous=true;
V.Connection.tuneConnection.hasContent=false;
V.Connection.tuneOkConnection={};
V.Connection.tuneOkConnection.allParameters=[{name:"channelMax",type:"Short"},{name:"frameMax",type:"Long"},{name:"heartbeat",type:"Short"}];
V.Connection.tuneOkConnection.returnType="voidConnection";
V.Connection.tuneOkConnection.index=31;
V.Connection.tuneOkConnection.classIndex=10;
V.Connection.tuneOkConnection.synchronous=true;
V.Connection.tuneOkConnection.hasContent=false;
V.Connection.openConnection={};
V.Connection.openConnection.allParameters=[{name:"virtualHost",type:"Path"},{name:"reserved1",type:"Shortstr"},{name:"reserved2",type:"Bit"}];
V.Connection.openConnection.returnType="OpenOkConnection";
V.Connection.openConnection.index=40;
V.Connection.openConnection.classIndex=10;
V.Connection.openConnection.synchronous=true;
V.Connection.openConnection.hasContent=false;
V.Connection.openOkConnection={};
V.Connection.openOkConnection.allParameters=[{name:"reserved1",type:"Shortstr"}];
V.Connection.openOkConnection.returnType="voidConnection";
V.Connection.openOkConnection.index=41;
V.Connection.openOkConnection.classIndex=10;
V.Connection.openOkConnection.synchronous=true;
V.Connection.openOkConnection.hasContent=false;
V.Connection.closeConnection={};
V.Connection.closeConnection.allParameters=[{name:"replyCode",type:"ReplyCode"},{name:"replyText",type:"ReplyText"},{name:"classId",type:"ClassId"},{name:"methodId",type:"MethodId"}];
V.Connection.closeConnection.returnType="CloseOkConnection";
V.Connection.closeConnection.index=50;
V.Connection.closeConnection.classIndex=10;
V.Connection.closeConnection.synchronous=true;
V.Connection.closeConnection.hasContent=false;
V.Connection.closeOkConnection={};
V.Connection.closeOkConnection.allParameters=[];
V.Connection.closeOkConnection.returnType="voidConnection";
V.Connection.closeOkConnection.index=51;
V.Connection.closeOkConnection.classIndex=10;
V.Connection.closeOkConnection.synchronous=true;
V.Connection.closeOkConnection.hasContent=false;
V.Connection.methodLookup={10:"startConnection",11:"startOkConnection",20:"secureConnection",21:"secureOkConnection",30:"tuneConnection",31:"tuneOkConnection",40:"openConnection",41:"openOkConnection",50:"closeConnection",51:"closeOkConnection"};
V.Connection.className="Connection";
V.Channel={};
V.Channel.openChannel={};
V.Channel.openChannel.allParameters=[{name:"reserved1",type:"Shortstr"}];
V.Channel.openChannel.returnType="OpenOkChannel";
V.Channel.openChannel.index=10;
V.Channel.openChannel.classIndex=20;
V.Channel.openChannel.synchronous=true;
V.Channel.openChannel.hasContent=false;
V.Channel.openOkChannel={};
V.Channel.openOkChannel.allParameters=[{name:"reserved1",type:"Longstr"}];
V.Channel.openOkChannel.returnType="voidChannel";
V.Channel.openOkChannel.index=11;
V.Channel.openOkChannel.classIndex=20;
V.Channel.openOkChannel.synchronous=true;
V.Channel.openOkChannel.hasContent=false;
V.Channel.flowChannel={};
V.Channel.flowChannel.allParameters=[{name:"active",type:"Bit"}];
V.Channel.flowChannel.returnType="FlowOkChannel";
V.Channel.flowChannel.index=20;
V.Channel.flowChannel.classIndex=20;
V.Channel.flowChannel.synchronous=true;
V.Channel.flowChannel.hasContent=false;
V.Channel.flowOkChannel={};
V.Channel.flowOkChannel.allParameters=[{name:"active",type:"Bit"}];
V.Channel.flowOkChannel.returnType="voidChannel";
V.Channel.flowOkChannel.index=21;
V.Channel.flowOkChannel.classIndex=20;
V.Channel.flowOkChannel.synchronous=false;
V.Channel.flowOkChannel.hasContent=false;
V.Channel.closeChannel={};
V.Channel.closeChannel.allParameters=[{name:"replyCode",type:"ReplyCode"},{name:"replyText",type:"ReplyText"},{name:"classId",type:"ClassId"},{name:"methodId",type:"MethodId"}];
V.Channel.closeChannel.returnType="CloseOkChannel";
V.Channel.closeChannel.index=40;
V.Channel.closeChannel.classIndex=20;
V.Channel.closeChannel.synchronous=true;
V.Channel.closeChannel.hasContent=false;
V.Channel.closeOkChannel={};
V.Channel.closeOkChannel.allParameters=[];
V.Channel.closeOkChannel.returnType="voidChannel";
V.Channel.closeOkChannel.index=41;
V.Channel.closeOkChannel.classIndex=20;
V.Channel.closeOkChannel.synchronous=true;
V.Channel.closeOkChannel.hasContent=false;
V.Channel.methodLookup={10:"openChannel",11:"openOkChannel",20:"flowChannel",21:"flowOkChannel",40:"closeChannel",41:"closeOkChannel"};
V.Channel.className="Channel";
V.Exchange={};
V.Exchange.declareExchange={};
V.Exchange.declareExchange.allParameters=[{name:"reserved1",type:"Short"},{name:"exchange",type:"ExchangeName"},{name:"type",type:"Shortstr"},{name:"passive",type:"Bit"},{name:"durable",type:"Bit"},{name:"reserved2",type:"Bit"},{name:"reserved3",type:"Bit"},{name:"noWait",type:"NoWait"},{name:"arguments",type:"Table"}];
V.Exchange.declareExchange.returnType="DeclareOkExchange";
V.Exchange.declareExchange.index=10;
V.Exchange.declareExchange.classIndex=40;
V.Exchange.declareExchange.synchronous=true;
V.Exchange.declareExchange.hasContent=false;
V.Exchange.declareOkExchange={};
V.Exchange.declareOkExchange.allParameters=[];
V.Exchange.declareOkExchange.returnType="voidExchange";
V.Exchange.declareOkExchange.index=11;
V.Exchange.declareOkExchange.classIndex=40;
V.Exchange.declareOkExchange.synchronous=true;
V.Exchange.declareOkExchange.hasContent=false;
V.Exchange.deleteExchange={};
V.Exchange.deleteExchange.allParameters=[{name:"reserved1",type:"Short"},{name:"exchange",type:"ExchangeName"},{name:"ifUnused",type:"Bit"},{name:"noWait",type:"NoWait"}];
V.Exchange.deleteExchange.returnType="DeleteOkExchange";
V.Exchange.deleteExchange.index=20;
V.Exchange.deleteExchange.classIndex=40;
V.Exchange.deleteExchange.synchronous=true;
V.Exchange.deleteExchange.hasContent=false;
V.Exchange.deleteOkExchange={};
V.Exchange.deleteOkExchange.allParameters=[];
V.Exchange.deleteOkExchange.returnType="voidExchange";
V.Exchange.deleteOkExchange.index=21;
V.Exchange.deleteOkExchange.classIndex=40;
V.Exchange.deleteOkExchange.synchronous=true;
V.Exchange.deleteOkExchange.hasContent=false;
V.Exchange.methodLookup={10:"declareExchange",11:"declareOkExchange",20:"deleteExchange",21:"deleteOkExchange"};
V.Exchange.className="Exchange";
V.Queue={};
V.Queue.declareQueue={};
V.Queue.declareQueue.allParameters=[{name:"reserved1",type:"Short"},{name:"queue",type:"QueueName"},{name:"passive",type:"Bit"},{name:"durable",type:"Bit"},{name:"exclusive",type:"Bit"},{name:"autoDelete",type:"Bit"},{name:"noWait",type:"NoWait"},{name:"arguments",type:"Table"}];
V.Queue.declareQueue.returnType="DeclareOkQueue";
V.Queue.declareQueue.index=10;
V.Queue.declareQueue.classIndex=50;
V.Queue.declareQueue.synchronous=true;
V.Queue.declareQueue.hasContent=false;
V.Queue.declareOkQueue={};
V.Queue.declareOkQueue.allParameters=[{name:"queue",type:"QueueName"},{name:"messageCount",type:"MessageCount"},{name:"consumerCount",type:"Long"}];
V.Queue.declareOkQueue.returnType="voidQueue";
V.Queue.declareOkQueue.index=11;
V.Queue.declareOkQueue.classIndex=50;
V.Queue.declareOkQueue.synchronous=true;
V.Queue.declareOkQueue.hasContent=false;
V.Queue.bindQueue={};
V.Queue.bindQueue.allParameters=[{name:"reserved1",type:"Short"},{name:"queue",type:"QueueName"},{name:"exchange",type:"ExchangeName"},{name:"routingKey",type:"Shortstr"},{name:"noWait",type:"NoWait"},{name:"arguments",type:"Table"}];
V.Queue.bindQueue.returnType="BindOkQueue";
V.Queue.bindQueue.index=20;
V.Queue.bindQueue.classIndex=50;
V.Queue.bindQueue.synchronous=true;
V.Queue.bindQueue.hasContent=false;
V.Queue.bindOkQueue={};
V.Queue.bindOkQueue.allParameters=[];
V.Queue.bindOkQueue.returnType="voidQueue";
V.Queue.bindOkQueue.index=21;
V.Queue.bindOkQueue.classIndex=50;
V.Queue.bindOkQueue.synchronous=true;
V.Queue.bindOkQueue.hasContent=false;
V.Queue.unbindQueue={};
V.Queue.unbindQueue.allParameters=[{name:"reserved1",type:"Short"},{name:"queue",type:"QueueName"},{name:"exchange",type:"ExchangeName"},{name:"routingKey",type:"Shortstr"},{name:"arguments",type:"Table"}];
V.Queue.unbindQueue.returnType="UnbindOkQueue";
V.Queue.unbindQueue.index=50;
V.Queue.unbindQueue.classIndex=50;
V.Queue.unbindQueue.synchronous=true;
V.Queue.unbindQueue.hasContent=false;
V.Queue.unbindOkQueue={};
V.Queue.unbindOkQueue.allParameters=[];
V.Queue.unbindOkQueue.returnType="voidQueue";
V.Queue.unbindOkQueue.index=51;
V.Queue.unbindOkQueue.classIndex=50;
V.Queue.unbindOkQueue.synchronous=true;
V.Queue.unbindOkQueue.hasContent=false;
V.Queue.purgeQueue={};
V.Queue.purgeQueue.allParameters=[{name:"reserved1",type:"Short"},{name:"queue",type:"QueueName"},{name:"noWait",type:"NoWait"}];
V.Queue.purgeQueue.returnType="PurgeOkQueue";
V.Queue.purgeQueue.index=30;
V.Queue.purgeQueue.classIndex=50;
V.Queue.purgeQueue.synchronous=true;
V.Queue.purgeQueue.hasContent=false;
V.Queue.purgeOkQueue={};
V.Queue.purgeOkQueue.allParameters=[{name:"messageCount",type:"MessageCount"}];
V.Queue.purgeOkQueue.returnType="voidQueue";
V.Queue.purgeOkQueue.index=31;
V.Queue.purgeOkQueue.classIndex=50;
V.Queue.purgeOkQueue.synchronous=true;
V.Queue.purgeOkQueue.hasContent=false;
V.Queue.deleteQueue={};
V.Queue.deleteQueue.allParameters=[{name:"reserved1",type:"Short"},{name:"queue",type:"QueueName"},{name:"ifUnused",type:"Bit"},{name:"ifEmpty",type:"Bit"},{name:"noWait",type:"NoWait"}];
V.Queue.deleteQueue.returnType="DeleteOkQueue";
V.Queue.deleteQueue.index=40;
V.Queue.deleteQueue.classIndex=50;
V.Queue.deleteQueue.synchronous=true;
V.Queue.deleteQueue.hasContent=false;
V.Queue.deleteOkQueue={};
V.Queue.deleteOkQueue.allParameters=[{name:"messageCount",type:"MessageCount"}];
V.Queue.deleteOkQueue.returnType="voidQueue";
V.Queue.deleteOkQueue.index=41;
V.Queue.deleteOkQueue.classIndex=50;
V.Queue.deleteOkQueue.synchronous=true;
V.Queue.deleteOkQueue.hasContent=false;
V.Queue.methodLookup={10:"declareQueue",11:"declareOkQueue",20:"bindQueue",21:"bindOkQueue",50:"unbindQueue",51:"unbindOkQueue",30:"purgeQueue",31:"purgeOkQueue",40:"deleteQueue",41:"deleteOkQueue"};
V.Queue.className="Queue";
V.Basic={};
V.Basic.qosBasic={};
V.Basic.qosBasic.allParameters=[{name:"prefetchSize",type:"Long"},{name:"prefetchCount",type:"Short"},{name:"global",type:"Bit"}];
V.Basic.qosBasic.returnType="QosOkBasic";
V.Basic.qosBasic.index=10;
V.Basic.qosBasic.classIndex=60;
V.Basic.qosBasic.synchronous=true;
V.Basic.qosBasic.hasContent=false;
V.Basic.qosOkBasic={};
V.Basic.qosOkBasic.allParameters=[];
V.Basic.qosOkBasic.returnType="voidBasic";
V.Basic.qosOkBasic.index=11;
V.Basic.qosOkBasic.classIndex=60;
V.Basic.qosOkBasic.synchronous=true;
V.Basic.qosOkBasic.hasContent=false;
V.Basic.consumeBasic={};
V.Basic.consumeBasic.allParameters=[{name:"reserved1",type:"Short"},{name:"queue",type:"QueueName"},{name:"consumerTag",type:"ConsumerTag"},{name:"noLocal",type:"NoLocal"},{name:"noAck",type:"NoAck"},{name:"exclusive",type:"Bit"},{name:"noWait",type:"NoWait"},{name:"arguments",type:"Table"}];
V.Basic.consumeBasic.returnType="ConsumeOkBasic";
V.Basic.consumeBasic.index=20;
V.Basic.consumeBasic.classIndex=60;
V.Basic.consumeBasic.synchronous=true;
V.Basic.consumeBasic.hasContent=false;
V.Basic.consumeOkBasic={};
V.Basic.consumeOkBasic.allParameters=[{name:"consumerTag",type:"ConsumerTag"}];
V.Basic.consumeOkBasic.returnType="voidBasic";
V.Basic.consumeOkBasic.index=21;
V.Basic.consumeOkBasic.classIndex=60;
V.Basic.consumeOkBasic.synchronous=true;
V.Basic.consumeOkBasic.hasContent=false;
V.Basic.cancelBasic={};
V.Basic.cancelBasic.allParameters=[{name:"consumerTag",type:"ConsumerTag"},{name:"noWait",type:"NoWait"}];
V.Basic.cancelBasic.returnType="CancelOkBasic";
V.Basic.cancelBasic.index=30;
V.Basic.cancelBasic.classIndex=60;
V.Basic.cancelBasic.synchronous=true;
V.Basic.cancelBasic.hasContent=false;
V.Basic.cancelOkBasic={};
V.Basic.cancelOkBasic.allParameters=[{name:"consumerTag",type:"ConsumerTag"}];
V.Basic.cancelOkBasic.returnType="voidBasic";
V.Basic.cancelOkBasic.index=31;
V.Basic.cancelOkBasic.classIndex=60;
V.Basic.cancelOkBasic.synchronous=true;
V.Basic.cancelOkBasic.hasContent=false;
V.Basic.publishBasic={};
V.Basic.publishBasic.allParameters=[{name:"reserved1",type:"Short"},{name:"exchange",type:"ExchangeName"},{name:"routingKey",type:"Shortstr"},{name:"mandatory",type:"Bit"},{name:"immediate",type:"Bit"}];
V.Basic.publishBasic.returnType="voidBasic";
V.Basic.publishBasic.index=40;
V.Basic.publishBasic.classIndex=60;
V.Basic.publishBasic.synchronous=false;
V.Basic.publishBasic.hasContent=true;
V.Basic.returnBasic={};
V.Basic.returnBasic.allParameters=[{name:"replyCode",type:"ReplyCode"},{name:"replyText",type:"ReplyText"},{name:"exchange",type:"ExchangeName"},{name:"routingKey",type:"Shortstr"}];
V.Basic.returnBasic.returnType="voidBasic";
V.Basic.returnBasic.index=50;
V.Basic.returnBasic.classIndex=60;
V.Basic.returnBasic.synchronous=false;
V.Basic.returnBasic.hasContent=true;
V.Basic.deliverBasic={};
V.Basic.deliverBasic.allParameters=[{name:"consumerTag",type:"ConsumerTag"},{name:"deliveryTag",type:"DeliveryTag"},{name:"redelivered",type:"Redelivered"},{name:"exchange",type:"ExchangeName"},{name:"routingKey",type:"Shortstr"}];
V.Basic.deliverBasic.returnType="voidBasic";
V.Basic.deliverBasic.index=60;
V.Basic.deliverBasic.classIndex=60;
V.Basic.deliverBasic.synchronous=false;
V.Basic.deliverBasic.hasContent=true;
V.Basic.getBasic={};
V.Basic.getBasic.allParameters=[{name:"reserved1",type:"Short"},{name:"queue",type:"QueueName"},{name:"noAck",type:"NoAck"}];
V.Basic.getBasic.returnType="GetOkBasic";
V.Basic.getBasic.index=70;
V.Basic.getBasic.classIndex=60;
V.Basic.getBasic.synchronous=true;
V.Basic.getBasic.hasContent=false;
V.Basic.getOkBasic={};
V.Basic.getOkBasic.allParameters=[{name:"deliveryTag",type:"DeliveryTag"},{name:"redelivered",type:"Redelivered"},{name:"exchange",type:"ExchangeName"},{name:"routingKey",type:"Shortstr"},{name:"messageCount",type:"MessageCount"}];
V.Basic.getOkBasic.returnType="voidBasic";
V.Basic.getOkBasic.index=71;
V.Basic.getOkBasic.classIndex=60;
V.Basic.getOkBasic.synchronous=true;
V.Basic.getOkBasic.hasContent=true;
V.Basic.getEmptyBasic={};
V.Basic.getEmptyBasic.allParameters=[{name:"reserved1",type:"Shortstr"}];
V.Basic.getEmptyBasic.returnType="voidBasic";
V.Basic.getEmptyBasic.index=72;
V.Basic.getEmptyBasic.classIndex=60;
V.Basic.getEmptyBasic.synchronous=true;
V.Basic.getEmptyBasic.hasContent=false;
V.Basic.ackBasic={};
V.Basic.ackBasic.allParameters=[{name:"deliveryTag",type:"DeliveryTag"},{name:"multiple",type:"Bit"}];
V.Basic.ackBasic.returnType="voidBasic";
V.Basic.ackBasic.index=80;
V.Basic.ackBasic.classIndex=60;
V.Basic.ackBasic.synchronous=false;
V.Basic.ackBasic.hasContent=false;
V.Basic.rejectBasic={};
V.Basic.rejectBasic.allParameters=[{name:"deliveryTag",type:"DeliveryTag"},{name:"requeue",type:"Bit"}];
V.Basic.rejectBasic.returnType="voidBasic";
V.Basic.rejectBasic.index=90;
V.Basic.rejectBasic.classIndex=60;
V.Basic.rejectBasic.synchronous=false;
V.Basic.rejectBasic.hasContent=false;
V.Basic.recoverAsyncBasic={};
V.Basic.recoverAsyncBasic.allParameters=[{name:"requeue",type:"Bit"}];
V.Basic.recoverAsyncBasic.returnType="voidBasic";
V.Basic.recoverAsyncBasic.index=100;
V.Basic.recoverAsyncBasic.classIndex=60;
V.Basic.recoverAsyncBasic.synchronous=false;
V.Basic.recoverAsyncBasic.hasContent=false;
V.Basic.recoverBasic={};
V.Basic.recoverBasic.allParameters=[{name:"requeue",type:"Bit"}];
V.Basic.recoverBasic.returnType="voidBasic";
V.Basic.recoverBasic.index=110;
V.Basic.recoverBasic.classIndex=60;
V.Basic.recoverBasic.synchronous=false;
V.Basic.recoverBasic.hasContent=false;
V.Basic.recoverOkBasic={};
V.Basic.recoverOkBasic.allParameters=[];
V.Basic.recoverOkBasic.returnType="voidBasic";
V.Basic.recoverOkBasic.index=111;
V.Basic.recoverOkBasic.classIndex=60;
V.Basic.recoverOkBasic.synchronous=true;
V.Basic.recoverOkBasic.hasContent=false;
V.Basic.methodLookup={10:"qosBasic",11:"qosOkBasic",20:"consumeBasic",21:"consumeOkBasic",30:"cancelBasic",31:"cancelOkBasic",40:"publishBasic",50:"returnBasic",60:"deliverBasic",70:"getBasic",71:"getOkBasic",72:"getEmptyBasic",80:"ackBasic",90:"rejectBasic",100:"recoverAsyncBasic",110:"recoverBasic",111:"recoverOkBasic"};
V.Basic.className="Basic";
V.Tx={};
V.Tx.selectTx={};
V.Tx.selectTx.allParameters=[];
V.Tx.selectTx.returnType="SelectOkTx";
V.Tx.selectTx.index=10;
V.Tx.selectTx.classIndex=90;
V.Tx.selectTx.synchronous=true;
V.Tx.selectTx.hasContent=false;
V.Tx.selectOkTx={};
V.Tx.selectOkTx.allParameters=[];
V.Tx.selectOkTx.returnType="voidTx";
V.Tx.selectOkTx.index=11;
V.Tx.selectOkTx.classIndex=90;
V.Tx.selectOkTx.synchronous=true;
V.Tx.selectOkTx.hasContent=false;
V.Tx.commitTx={};
V.Tx.commitTx.allParameters=[];
V.Tx.commitTx.returnType="CommitOkTx";
V.Tx.commitTx.index=20;
V.Tx.commitTx.classIndex=90;
V.Tx.commitTx.synchronous=true;
V.Tx.commitTx.hasContent=false;
V.Tx.commitOkTx={};
V.Tx.commitOkTx.allParameters=[];
V.Tx.commitOkTx.returnType="voidTx";
V.Tx.commitOkTx.index=21;
V.Tx.commitOkTx.classIndex=90;
V.Tx.commitOkTx.synchronous=true;
V.Tx.commitOkTx.hasContent=false;
V.Tx.rollbackTx={};
V.Tx.rollbackTx.allParameters=[];
V.Tx.rollbackTx.returnType="RollbackOkTx";
V.Tx.rollbackTx.index=30;
V.Tx.rollbackTx.classIndex=90;
V.Tx.rollbackTx.synchronous=true;
V.Tx.rollbackTx.hasContent=false;
V.Tx.rollbackOkTx={};
V.Tx.rollbackOkTx.allParameters=[];
V.Tx.rollbackOkTx.returnType="voidTx";
V.Tx.rollbackOkTx.index=31;
V.Tx.rollbackOkTx.classIndex=90;
V.Tx.rollbackOkTx.synchronous=true;
V.Tx.rollbackOkTx.hasContent=false;
V.Tx.methodLookup={10:"selectTx",11:"selectOkTx",20:"commitTx",21:"commitOkTx",30:"rollbackTx",31:"rollbackOkTx"};
V.Tx.className="Tx";
var J={10:V.Connection,20:V.Channel,40:V.Exchange,50:V.Queue,60:V.Basic,90:V.Tx};
var Y={startConnection:V.Connection.startConnection,startOkConnection:V.Connection.startOkConnection,secureConnection:V.Connection.secureConnection,secureOkConnection:V.Connection.secureOkConnection,tuneConnection:V.Connection.tuneConnection,tuneOkConnection:V.Connection.tuneOkConnection,openConnection:V.Connection.openConnection,openOkConnection:V.Connection.openOkConnection,closeConnection:V.Connection.closeConnection,closeOkConnection:V.Connection.closeOkConnection,openChannel:V.Channel.openChannel,openOkChannel:V.Channel.openOkChannel,flowChannel:V.Channel.flowChannel,flowOkChannel:V.Channel.flowOkChannel,closeChannel:V.Channel.closeChannel,closeOkChannel:V.Channel.closeOkChannel,declareExchange:V.Exchange.declareExchange,declareOkExchange:V.Exchange.declareOkExchange,deleteExchange:V.Exchange.deleteExchange,deleteOkExchange:V.Exchange.deleteOkExchange,declareQueue:V.Queue.declareQueue,declareOkQueue:V.Queue.declareOkQueue,bindQueue:V.Queue.bindQueue,bindOkQueue:V.Queue.bindOkQueue,unbindQueue:V.Queue.unbindQueue,unbindOkQueue:V.Queue.unbindOkQueue,purgeQueue:V.Queue.purgeQueue,purgeOkQueue:V.Queue.purgeOkQueue,deleteQueue:V.Queue.deleteQueue,deleteOkQueue:V.Queue.deleteOkQueue,qosBasic:V.Basic.qosBasic,qosOkBasic:V.Basic.qosOkBasic,consumeBasic:V.Basic.consumeBasic,consumeOkBasic:V.Basic.consumeOkBasic,cancelBasic:V.Basic.cancelBasic,cancelOkBasic:V.Basic.cancelOkBasic,publishBasic:V.Basic.publishBasic,returnBasic:V.Basic.returnBasic,deliverBasic:V.Basic.deliverBasic,getBasic:V.Basic.getBasic,getOkBasic:V.Basic.getOkBasic,getEmptyBasic:V.Basic.getEmptyBasic,ackBasic:V.Basic.ackBasic,rejectBasic:V.Basic.rejectBasic,recoverAsyncBasic:V.Basic.recoverAsyncBasic,recoverBasic:V.Basic.recoverBasic,recoverOkBasic:V.Basic.recoverOkBasic,selectTx:V.Tx.selectTx,selectOkTx:V.Tx.selectOkTx,commitTx:V.Tx.commitTx,commitOkTx:V.Tx.commitOkTx,rollbackTx:V.Tx.rollbackTx,rollbackOkTx:V.Tx.rollbackOkTx};
var ar=function(aB){this.array=aB||[];
this._mark=-1;
this.limit=this.capacity=this.array.length;
this.order=ByteOrder.BIG_ENDIAN;
this.bitCount=0
};
ar.prototype=new ByteBuffer();
var x=function(aC,aB){if(!aC){throw (new Error(aB))
}};
var q={octet:"Unsigned","short":"UnsignedShort","long":"UnsignedInt",longlong:"UnsignedLong","int":"Int",table:"Table",longstr:"LongString",shortstr:"ShortString",bit:"Bit",fieldtable:"FieldTable",timestamp:"Timestamp","void":"Void"};
var P={F:"fieldtable",S:"longstr",I:"int",V:"void"};
var ad={longstr:"S","int":"I","void":"V"};
var G=function(aG,aD){var aC=new ar();
aC.putShortString("LOGIN");
aC.putTypeIdentifier("longstr");
aC.putLongString(aG);
aC.putShortString("PASSWORD");
aC.putTypeIdentifier("longstr");
aC.putLongString(aD);
aC.rewind();
var aB=aC.remaining();
var aF=[];
for(var aE=0;
aE<aB;
aE++){aF.push(String.fromCharCode(aC.getUnsigned()))
}return aF.join("")
};
var E=function(aC,aB){throw new Error("AMQPLAIN not implemented")
};
ar.prototype.getLongString=function(){var aB=this.getUnsignedInt();
var aD=[];
for(var aC=0;
aC<aB;
aC++){aD.push(String.fromCharCode(this.getUnsigned()))
}return aD.join("")
};
ar.prototype.getShortString=function(){var aB=this.getUnsigned();
var aD=[];
for(var aC=0;
aC<aB;
aC++){aD.push(String.fromCharCode(this.getUnsigned()))
}return aD.join("")
};
ar.prototype.getVoid=function(){};
ar.prototype.getTypeIdentifier=function(){var aB=this.getUnsigned();
return P[String.fromCharCode(aB)]
};
ar.prototype.putTypeIdentifier=function(aC){var aB=ad[aC];
this.putUnsigned(aB.charCodeAt(0))
};
ar.prototype.getFieldValue=function(){var aB=this.getUnsigned();
switch(String.fromCharCode(aB)){case"t":return !!this.getUnsigned();
default:throw new Error("Decoding Error in AmqpBuffer: cannot decode field value")
}};
ar.prototype.getFieldTable=function(){var aB=this.getUnsignedInt();
var aF={};
var aC=this.position;
while(aB>(this.position-aC)){var aD=this.getShortString();
var aE=this.getFieldValue();
aF[aD]=aE
}return aF
};
ar.prototype.getTable=function(){var aE=new AmqpArguments();
var aB=this.getUnsignedInt();
var aC=new ar(this.array.slice(this.position,this.position+aB));
this.position+=aB;
while(aC.remaining()){var aF={};
aF.key=aC.getShortString();
var aD=aC.getTypeIdentifier();
aF.value=aC["get"+q[aD]]();
aF.type=q[aD];
aE.push(aF)
}return aE
};
ar.prototype.getBit=function(aB){return this.getUnsigned()
};
ar.prototype.putBit=function(aC){if(this.bitCount>0){var aB=this.array[this.position-1];
aB=aC<<this.bitCount|aB;
this.array[this.position-1]=aB
}else{this.putUnsigned(aC)
}};
ar.prototype.putUnsignedLong=function(aB){this.putInt(0);
return this.putUnsignedInt(aB)
};
ar.prototype.getUnsignedLong=function(aB){this.getInt();
return this.getUnsignedInt()
};
ar.prototype.putTimestamp=function(aD){var aF=aD.getTime();
var aC=[0,0,0,0,0,0,0,0];
for(var aE=7;
aE>=0;
aE--){var aB=aD&255;
aC[aE]=aB;
aD=(aD-aB)/256
}this.putBytes(aC);
return this
};
ar.prototype.getTimestamp=function(aC){var aB=this.getBytes(8);
var aE=0;
for(var aD=0;
aD<8;
aD++){aE=aE*256+(aB[aD]&255)
}return new Date(aE)
};
ar.prototype.putLongString=function(aC){this.putUnsignedInt(aC.length);
for(var aB=0;
aB<aC.length;
aB++){this.putUnsigned(aC.charCodeAt(aB))
}};
ar.prototype.putShortString=function(aC){this.putUnsigned(aC.length);
for(var aB=0;
aB<aC.length;
aB++){this.putUnsigned(aC.charCodeAt(aB))
}};
ar.prototype.putVoid=function(aB){};
ar.prototype.putTable=function(aE){if(!aE){this.putUnsignedInt(0);
return this
}var aB=new ar();
for(var aC=0;
aC<aE.length;
aC++){var aD=aE[aC];
aB.putShortString(aD.key);
aB.putTypeIdentifier(aD.type);
aB["put"+q[aD.type]](aD.value)
}aB.rewind();
this.putUnsignedInt(aB.remaining());
this.putBuffer(aB);
return this
};
ar.prototype.getFrameHeader=function(){var aB=this.getUnsigned();
var aD=this.getUnsignedShort();
var aC=this.getUnsignedInt();
var aE={};
aE.type=aB;
aE.size=aC;
aE.channel=aD;
return aE
};
ar.prototype.getFrame=function(){var aJ=this.position;
var aD={};
if(this.remaining()>7){aD.header=this.getFrameHeader();
aD.channel=aD.header.channel;
aD.type=aD.header.type;
if(this.remaining()>=aD.header.size+1){switch(aD.type){case N.FRAME_BODY.value:var aH=new ar(this.array.slice(this.position,this.position+aD.header.size));
this.position+=aD.header.size;
aD.body=aH;
aD.methodName="body";
break;
case N.FRAME_HEADER.value:var aL=this.getUnsignedShort();
var aG=this.getUnsignedShort();
var aC=this.getUnsignedLong();
aD.contentProperties=this.getContentProperties();
aD.methodName="header";
break;
case N.FRAME_METHOD.value:var aL=this.getUnsignedShort();
var aI=this.getUnsignedShort();
var aF=J[aL].className;
var aK=J[aL].methodLookup[aI];
var aB=J[aL][aK];
var aE=J[aL][aK].allParameters;
aD.methodName=aK;
aD.args=this.getMethodArguments(aE);
break;
case 4:case N.FRAME_HEARTBEAT.value:throw new Error("Received heartbeat frame even though the client has expressed no interest in heartbeat via tune-ok method.");
default:throw new Error("Unrecognized AMQP 0-9-1 Frame type = "+aD.type);
break
}x((this.getUnsigned()===N.FRAME_END.value),"AMQP: Frame terminator missing")
}else{this.position=aJ;
return null
}return aD
}return null
};
ar.prototype.putFrame=function(aC,aD,aE){this.putUnsigned(aC);
this.putUnsignedShort(aD);
var aB=aE.remaining();
this.putUnsignedInt(aB);
this.putBuffer(aE);
this.putUnsigned(N.FRAME_END.value);
return this
};
ar.prototype.putMethodFrame=function(aE,aC,aB){var aD=new ar();
aD.putUnsignedShort(aE.classIndex);
aD.putUnsignedShort(aE.index);
aD.putMethodArguments(aB,aE.allParameters);
aD.flip();
return this.putFrame(N.FRAME_METHOD.value,aC,aD)
};
ar.prototype.putHeaderFrame=function(aE,aD,aF,aB,aC){var aG=new ar();
aG.putUnsignedShort(aD);
aG.putUnsignedShort(aF);
aG.putUnsignedLong(aB);
aG.putContentProperties(aC);
aG.flip();
return this.putFrame(N.FRAME_HEADER.value,aE,aG)
};
ar.prototype.putBodyFrame=function(aB,aC){return this.putFrame(N.FRAME_BODY.value,aB,aC)
};
ar.prototype.putHeartbeat=function(){throw new Error("Heartbeat not implemented")
};
ar.prototype.putMethodArguments=function(aC,aF){for(var aD=0;
aD<aF.length;
aD++){var aH=aF[aD];
var aB=aH.type;
var aG=g[aB];
if(aG){var aE=aG.type
}else{throw (new Error("Unknown AMQP domain "+aB))
}this["put"+q[aE]](aC[aD]);
this.bitCount=(aE==="bit")?this.bitCount+1:0
}return this
};
ar.prototype.getMethodArguments=function(aC){var aG=[];
for(var aD=0;
aD<aC.length;
aD++){var aB=aC[aD];
var aJ=aB.type;
var aF=g[aJ].type;
var aI={};
aI.type=aF;
aI.name=aB.name;
try{var aH=this["get"+q[aF]]()
}catch(aE){throw new Error("type codec failed for type "+aF+" for domain "+aJ)
}this.bitCount=(aF==="bit")?this.bitCount+1:0;
aI.value=aH;
aG.push(aI)
}return aG
};
ar.prototype.putArgument=function(aC,aB){var aE=g[aC];
if(aE){var aD=aE.type
}else{throw new Error("Unknown AMQP domain "+dtype)
}this["put"+q[aD]](aB)
};
ar.prototype.getArgument=function(aB){try{return this["get"+q[aB]]()
}catch(aC){throw new Error("type codec failed for type "+aB+" for domain "+dtype)
}};
ar.prototype.getContentProperties=function(){var aJ={};
var aI=[];
var aD=this.getUnsignedShort();
for(var aF=0;
aF<=16;
aF++){var aH=(aD>>(aF))&1;
if(aH){aI.unshift(aF+1)
}}for(var aF=0;
aF<aI.length;
aF++){var aE=16-aI[aF];
var aG=_basicProperties[aE].name;
var aC=_basicProperties[aE].domain;
var aB=g[aC];
aJ[aG]=this.getArgument(aB.type)
}return aJ
};
ar.prototype.putContentProperties=function(aI){if(!aI){return this.putUnsignedShort(0)
}var aC=0;
var aH=[];
for(var aF=0;
aF<_basicProperties.length;
aF++){var aG=_basicProperties[aF].name;
var aE=_basicProperties[aF].domain;
var aD=aI[aG];
if(typeof(aD)!=="undefined"){aH.push({propertyName:aG,propertyValue:aD,domain:aE});
aC=aC<<1|1
}else{aC=aC<<1
}}aC=aC<<2;
this.putUnsignedShort(aC);
for(var aF=0;
aF<aH.length;
aF++){var aJ=aH[aF];
var aB=aJ.domain;
this.putArgument(aB,aJ.propertyValue)
}return this
};
AmqpClient.prototype=new e();
var aj=AmqpClient.prototype;
aj.CLOSED=0;
aj.OPEN=1;
aj.CONNECTING=2;
aj.getReadyState=function(){return this._readyState
};
aj.setReadyState=function(aB){this._readyState=aB
};
aj.onopen=function(aB){};
aj.onclose=function(aB){};
aj.onerror=function(aB){};
var x=function(aC,aB){if(!aC){throw (new Error(aB))
}};
aj._init=function(){this._initAsyncClient();
this._buffer=new ar();
this._channels={};
this._channelCount=0;
this._stateMachine.addState("handshaking",[{inputs:["startConnectionFrame"],targetState:"starting"},{inputs:["closeConnectionFrame"],targetState:"closing"}],ae);
this._stateMachine.addState("starting",[{inputs:["startOkConnectionAction"],targetState:"started"}],C);
this._stateMachine.addState("started",[{inputs:["tuneConnectionFrame"],targetState:"tuning"}]);
this._stateMachine.addState("tuning",[{inputs:["tuneOkConnectionAction"],targetState:"tuned"}],O,o);
this._stateMachine.addState("tuned",[{inputs:["openConnectionAction"],targetState:"opening"}]);
this._stateMachine.addState("opening",[{inputs:["openOkConnectionFrame"],targetState:"ready"}],n,aw);
this._stateMachine.addState("ready",[{inputs:["openOkChannelFrame","closeChannelFrame","closeOkChannelFrame","flowOkChannelFrame","flowChannelFrame","declareOkExchangeFrame","declareOkQueueFrame","bindOkQueueFrame","unbindOkQueueFrame","deleteOkQueueFrame","deleteOkExchangeFrame","commitOkTxFrame","rollbackOkTxFrame","selectOkTxFrame","purgeOkQueueFrame","cancelOkBasicFrame","getOkBasicFrame","getEmptyBasicFrame","consumeOkBasicFrame","recoverOkBasicFrame","rejectOkBasicFrame","deliverBasicFrame","bodyFrame","headerFrame"],targetState:"ready"},{inputs:["closeConnectionFrame","closeConnectionAction"],targetState:"closing"}],ay);
this._stateMachine.addState("closing",[{inputs:["closeOkConnectionFrame","closeOkConnectionAction"],targetState:"closed"}],aw,null);
this._stateMachine.addState("closed",[],z,null)
};
var K={"0-9-1":[65,77,81,80,0,0,9,1]};
aj.connect=function av(aD,aB,aE,aG){if(this._socket){throw (new Error("AmqpClient already connected."))
}var aF;
if(typeof(aD)==="string"){aF=[aD]
}else{aF=aD
}this.setReadyState(this.CONNECTING);
var aC={url:aF[0],virtualHost:aB,credentials:aE};
this._openContinuation=aG;
this._hasNegotiated=false;
al(this,aF[0],aB,aE)
};
var F=aj.connect;
aj.connect=function(aD,aF){if(typeof aD=="object"){myConfig=aD||{};
var aC=myConfig.url;
var aB=myConfig.virtualHost;
var aE=myConfig.credentials;
if(!aC||typeof aC!="string"){throw new Error("AmqpClient.connect(): Parameter 'url' is required")
}if(!aB||typeof aC!="string"){throw new Error("AmqpClient.connect(): Parameter 'virtualHost' is required")
}if(!aE||!aE.username||!aE.password||typeof aE.username!="string"||typeof aE.password!="string"){throw new Error("AmqpClient.connect(): credentials are required")
}F.call(this,aC,aB,aE,aF)
}else{F.apply(this,arguments)
}};
aj.disconnect=function Z(){if(this.getReadyState()==this.OPEN){p(this,0,"",0,0)
}if(this.getReadyState()==this.CONNECTING){this.setReadyState(this.CLOSED);
var aC={};
aC.methodName="closeConnection";
aC.type="closeConnection";
aC.args="";
var aB=new AmqpEvent(this,aC);
this.dispatchEvent(aB)
}};
aj.openChannel=function m(aD){var aC=++this._channelCount;
var aB=new aA();
L(aB,aC,this,aD);
this._channels[aC]=aB;
return aB
};
aj.getAmqpClientFactory=function am(aB){return(this._amqpClientFactory||null)
};
var h=function(aB){var aD=new ByteBuffer(K["0-9-1"]);
var aC=aD;
if((typeof(ArrayBuffer)!=="undefined")&&(aB._socket.binaryType=="arraybuffer")){aC=aD.getArrayBuffer(aD.remaining())
}aB._socket.send(aC)
};
var u=function(aB){z(aB)
};
var an=function(aD,aB){if(aB.remaining()<aD.length){return false
}else{var aE=aB.limit;
aB.limit=aD.length;
var aC=aB.getString(Charset.UTF8);
aB.limit=aE;
return aD===aC
}};
var ah=function(aE,aH){var aB=aH.data;
if((typeof(ArrayBuffer)!=="undefined")&&(aE._socket.binaryType=="arraybuffer")){aB=decodeArrayBuffer2ByteBuffer(aH.data)
}var aD=aE._buffer;
aD.mark();
aD.position=aD.limit;
aD.putBuffer(aB);
aD.reset();
if(!aE._hasNegotiated&&aD.remaining()>7){if(an("AMQP",aD)){var aF=[aD.get(),aD.get(),aD.get(),aD.get()];
var aJ={args:[{name:"replyText",value:"Server does not support AMQP protocol versions after "+aF[2]+"-"+aF[3]}],methodName:"closeOkConnection"};
var aI={};
aI.methodName="error";
aI.args=aJ.args;
aE.dispatchEvent(new AmqpEvent(aE,aI));
z(aE,"",aJ);
return
}else{aD.reset();
aE._hasNegotiated=true
}}var aC=null;
while(aC=aD.getFrame()){var aG=aC;
aE._stateMachine.feedInput(aG.methodName+"Frame",aG)
}aD.compact()
};
var ag=function(aC,aB){var aD=aB;
if((typeof(ArrayBuffer)!=="undefined")&&(aC._socket.binaryType=="arraybuffer")){aD=aB.getArrayBuffer(aB.remaining())
}aC._socket.send(aD)
};
var aa=function ap(aC,aB,aG,aE){var aD=new ar();
var aF=aB.classIndex;
aD.putMethodFrame(aB,aG,aE);
aD.flip();
ag(aC,aD)
};
var ae=function ae(aD,aC,aE,aG){var aB=null;
if(aD._amqpClientFactory){var aF=aD._amqpClientFactory.getWebSocketFactory();
if(aF){aB=aF.createWebSocket(aE.url)
}}if(aB==null){if(typeof(WebSocket)!=="undefined"){aB=new WebSocket(aE.url)
}else{throw new Error("Browser does not support WebSocket.")
}}if(typeof(ArrayBuffer)==="undefined"){aB.binaryType="bytebuffer"
}else{aB.binaryType="arraybuffer"
}aB.onopen=function(){h(aD)
};
aB.onclose=function(){u(aD)
};
aB.onmessage=function(aH){ah(aD,aH)
};
aD._socket=aB;
aD._virtualHost=aE.virtualHost;
aD._credentialsOrKey=aE.credentials
};
var R=null;
var C=function(aF,aI,aB){x((aB.channel===0),N.UNEXPECTED_FRAME.message);
var aD=new ar();
var aE=new AmqpArguments();
aE.addLongString("library","KaazingAmqpClient");
aE.addLongString("library_version","4.0.6");
aE.addLongString("library_platform","JavaScript");
var aJ=aF._locale||"en_US";
var aH="AMQPLAIN";
var aC=aF._credentialsOrKey;
if(typeof(aC.resolve)!="function"){var aG=G(aC.username,aC.password);
R(aF,aE,aH,aG,aJ)
}else{aC.resolve(function(aL){var aK=G(aL.username,aL.password);
R(aF,aE,aH,aK,aJ)
})
}};
var O=function(aB,aC,aG){x((aG.channel===0),N.UNEXPECTED_FRAME.message);
var aD=aG.args[0].value;
var aF=aG.args[1].value;
var aE=0;
D(aB,aD,aF,aE);
U(aB,aB._virtualHost,aB._openContinuation,aB._openErrorCb)
};
var aw=function aw(aE,aD,aG){if(aG){if(aG.actionName&&(aG.actionName=="closeConnection")){return
}}if(aD==="nowaitAction"){aE._waitingAction=null;
return
}var aC={};
if(!aC._connection){aC=aE
}else{aC=aE._connection
}var aF=new AmqpEvent(aE,aG);
if(aE._waitingAction){if(aD==="closeChannelFrame"){aE._waitingAction.error(aF)
}else{if(aG.methodName=="closeConnection"){var aB={};
aB.methodName="error";
aB.args=aG.args;
aC.dispatchEvent(new AmqpEvent(aC,aB));
z(aC,"",aG);
return
}else{if(aG.methodName=="openOkConnection"){aC.setReadyState(aC.OPEN)
}else{aE._waitingAction.continuation(aF)
}}}}else{throw (new Error("AmqpClient not in waiting state: protocol violation"))
}aE.dispatchEvent(aF);
if(aG.methodName=="openOkConnection"){aC._openContinuation()
}};
var o=function o(aB,aC,aE){var aD=aB;
setTimeout(function(){aD._processActions()
},0)
};
var ay=function M(aB,aC,aE){if(aE.channel===0){}else{if(aB._channels[aE.channel]){var aD=aB._channels[aE.channel];
A(aD,aC,aE)
}else{}}};
var f=function f(aC,aB,aD){};
var z=function z(aD,aB,aG){if(!(aD.getReadyState()==aD.CLOSED)){var aF;
if(typeof(aG)==="undefined"){aF=new AmqpEvent(aD,{args:[],methodName:"closeOkConnection"})
}else{aG.methodName="closeOkConnection";
aF=new AmqpEvent(aD,aG)
}aD.dispatchEvent(aF);
aD.setReadyState(aD.CLOSED);
if(typeof(aD._channels)!=="undefined"){for(var aC in aD._channels){var aE=aD._channels[aC];
aE.dispatchEvent(aF)
}}}aD._socket.onclose=function(){};
if(aD._socket.readyState==0||aD._socket.readyState==1){aD._socket.close()
}if(typeof(aD._openErrorCb)!=="undefined"){aD._openErrorCb(aF)
}};
function al(aF,aD,aB,aE){var aC={url:aD,virtualHost:aB,credentials:aE};
aF._stateMachine.enterState("handshaking","",aC)
}var L=function L(aD,aE,aC,aB){aD._id=aE;
aD._callbacks=aB;
aD._connection=aC;
aD._transacted=false;
aD._waitingAction=null;
aD._initAsyncClient();
aD._stateMachine.addState("channelReady",[{inputs:["openChannelAction","closeChannelAction","consumeBasicAction","flowChannelAction","declareExchangeAction","declareQueueAction","bindQueueAction","unbindQueueAction","deleteQueueAction","deleteExchangeAction","purgeQueueAction","cancelBasicAction","recoverBasicAction","rejectBasicAction","selectTxAction","commitTxAction","rollbackTxAction",],targetState:"waiting"},{inputs:["publishBasicAction","ackBasicAction"],targetState:"channelReady"},{inputs:["getBasicAction"],targetState:"getting"},{inputs:["deliverBasicFrame"],targetState:"readingContentHeader"}],o);
aD._stateMachine.addState("getting",[{inputs:["getOkBasicFrame"],targetState:"readingContentHeader"},{inputs:["getEmptyBasicFrame"],targetState:"channelReady"},{inputs:["closeChannelFrame"],targetState:"closing"}],n,W);
aD._stateMachine.addState("waiting",[{inputs:["openOkChannelFrame","closeOkChannelFrame","flowOkChannelFrame","declareOkExchangeFrame","declareOkQueueFrame","bindOkQueueFrame","unbindOkQueueFrame","deleteOkQueueFrame","deleteOkExchangeFrame","purgeOkQueueFrame","cancelOkBasicFrame","recoverOkBasicFrame","rejectOkBasicFrame","commitOkTxFrame","rollbackOkTxFrame","selectOkTxFrame","getOkBasicFrame","getEmptyBasicFrame","consumeOkBasicFrame","nowaitAction"],targetState:"channelReady"},{inputs:["closeChannelFrame"],targetState:"closing"}],n,aw);
aD._stateMachine.addState("readingContentHeader",[{inputs:["headerFrame"],targetState:"readingContentBody"}],X,I);
aD._stateMachine.addState("readingContentBody",[{inputs:["bodyFrame"],targetState:"channelReady"}],null,ax);
aD._stateMachine.addState("closing",[{inputs:["closeOkChannelAction"],targetState:"closed"}],null);
aD._stateMachine.addState("closed",null,null);
if(aC.getReadyState()==aC.OPEN){m(aD,[aB])
}};
var aA=function(){};
aA.prototype=new e();
var aj=aA.prototype;
aj._init=function(aB){};
var b=function b(aG,aI,aD,aH,aF,aC){var aB=new ar();
var aJ=aI.classIndex;
aB.putMethodFrame(aI,aD,aH);
if(aI.hasContent){var aE=0;
aB.putHeaderFrame(aD,aJ,aE,aF.remaining(),aC);
if(aF.remaining()>0){aB.putBodyFrame(aD,aF)
}}aB.flip();
ag(aG._connection,aB)
};
var A=function A(aE,aD,aF){if(aF){var aC=aF.methodName||"";
if(aC=="closeChannel"){var aB={};
aB.methodName="error";
aB.type="error";
aB.args=aF.args;
aE.dispatchEvent(new AmqpEvent(aE,aB));
aE.dispatchEvent(new AmqpEvent(aE,aF));
return
}}aE._stateMachine.feedInput(aD,aF)
};
var ax=function ax(aB,aC,aE){aE.args=aB._headerFrame.args;
aE.methodName=aB._headerFrame.methodName;
var aD=new AmqpEvent(aB,aE,aB._headerFrame.contentProperties);
if(aE.methodName==="getOkBasic"){aB._waitingAction.continuation(aD)
}aB.dispatchEvent(aD)
};
var X=function X(aB,aC,aD){aB._headerFrame=aD
};
var I=function I(aB,aC,aD){aB._headerFrame.contentProperties=aD.contentProperties
};
var W=function(aC,aB,aE){var aD=new AmqpEvent(aC,aE);
if(aC._waitingAction){if(aB==="closeChannelFrame"){aC._waitingAction.error(aD);
aC.dispatchEvent(aD);
aC._waitingAction=null
}else{if(aB==="getEmptyBasicFrame"){aC._waitingAction.continuation(aD);
aC.dispatchEvent(aD);
aC._waitingAction=null
}}}else{throw new Error("AmqpClient not in waiting state: protocol violation")
}};
var n=function n(aC,aB,aD){var aE=aD.args[1];
if(aE.synchronous){aC._waitingAction=aD
}else{throw (new Error("AMQP: trying to enter wait state for method that is not sychronous"))
}};
aA.prototype.flowFlag=true;
aA.prototype.onmessage=function(aB){};
aA.prototype.onclose=function(aB){};
aA.prototype.onerror=function(aB){};
aA.prototype.onopen=function(aB){};
aA.prototype.ondeclarequeue=function(aB){};
aA.prototype.ondeclareexchange=function(aB){};
aA.prototype.onflow=function(aB){};
aA.prototype.onbindqueue=function(aB){};
aA.prototype.onunbindqueue=function(aB){};
aA.prototype.ondeletequeue=function(aB){};
aA.prototype.ondeleteexchange=function(aB){};
aA.prototype.onconsume=function(aB){};
aA.prototype.oncancel=function(aB){};
aA.prototype.oncommittransaction=function(aB){};
aA.prototype.onrollbacktransaction=function(aB){};
aA.prototype.onselecttransaction=function(aB){};
aA.prototype.onget=function(aB){};
aA.prototype.onpurgequeue=function(aB){};
aA.prototype.onrecover=function(aB){};
aA.prototype.onreject=function(aB){};
var R=function(aI,aH,aF,aD,aB,aG){var aE=[aH,aF,aD,aB];
var aC="startOkConnection";
aI._enqueueAction(aC,aa,[aI,Y[aC],0,aE],aG);
return aI
};
var B=function(aF,aC,aE){var aD=[aC];
var aB="secureOkConnection";
aF._enqueueAction(aB,aa,[aF,Y[aB],0,aD],aE);
return aF
};
var D=function(aH,aD,aF,aE,aG){var aC=[aD,aF,aE];
var aB="tuneOkConnection";
aH._enqueueAction(aB,aa,[aH,Y[aB],0,aC],aG);
return aH
};
var U=function(aF,aB,aE){var aD=[aB,0,0];
var aC="openConnection";
aF._enqueueAction(aC,aa,[aF,Y[aC],0,aD],aE);
return aF
};
var p=function(aI,aG,aC,aF,aB,aH){var aE=[aG,aC,aF,aB];
var aD="closeConnection";
aI._enqueueAction(aD,aa,[aI,Y[aD],0,aE],aH);
return aI
};
var v=function(aE,aD){var aC=[];
var aB="closeOkConnection";
aE._enqueueAction(aB,aa,[aE,Y[aB],0,aC],aD);
return aE
};
aA.prototype.openChannel=function(aF){var aE=[0];
var aC="openChannel";
var aB=Y[aC];
var aD=false;
if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aC,b,[this,aB,this._id,aE],aF)
}if(aC=="flowChannel"){aA.prototype.flowFlag=active
}if(aD){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
aA.prototype.flowChannel=function(aH,aI){var aF=[aH];
var aD="flowChannel";
var aB=Y[aD];
var aE=false;
for(var aG=0;
aG<aB.allParameters.length;
aG++){var aC=aB.allParameters[aG].name;
if(aC="noWait"){aE=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aD,b,[this,aB,this._id,aF],aI)
}if(aD=="flowChannel"){aA.prototype.flowFlag=aH
}if(aE){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
aA.prototype.flowOkChannel=function(aH,aI){var aF=[aH];
var aD="flowOkChannel";
var aB=Y[aD];
var aE=false;
for(var aG=0;
aG<aB.allParameters.length;
aG++){var aC=aB.allParameters[aG].name;
if(aC="noWait"){aE=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aD,b,[this,aB,this._id,aF],aI)
}if(aD=="flowChannel"){aA.prototype.flowFlag=aH
}if(aE){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
aA.prototype.closeChannel=function(aL,aH,aF,aI,aK){var aD=[aL,aH,aF,aI];
var aJ="closeChannel";
var aG=Y[aJ];
var aC=false;
for(var aB=0;
aB<aG.allParameters.length;
aB++){var aE=aG.allParameters[aB].name;
if(aE="noWait"){aC=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aJ,b,[this,aG,this._id,aD],aK)
}if(aJ=="flowChannel"){aA.prototype.flowFlag=active
}if(aC){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
aA.prototype.closeOkChannel=function(aF){var aE=[];
var aC="closeOkChannel";
var aB=Y[aC];
var aD=false;
if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aC,b,[this,aB,this._id,aE],aF)
}if(aC=="flowChannel"){aA.prototype.flowFlag=active
}if(aD){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
aA.prototype.declareExchange=function(aE,aJ,aL,aC,aN,aB,aM){var aG=[0,aE,aJ,aL,aC,0,0,aN,aB];
var aK="declareExchange";
var aI=Y[aK];
var aF=false;
for(var aD=0;
aD<aI.allParameters.length;
aD++){var aH=aI.allParameters[aD].name;
if(aH="noWait"){aF=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aK,b,[this,aI,this._id,aG],aM)
}if(aK=="flowChannel"){aA.prototype.flowFlag=active
}if(aF){if(typeof(aN)!=="undefined"&&aN){this._enqueueAction("nowait")
}}return this
};
aA.prototype.deleteExchange=function(aC,aK,aJ,aI){var aE=[0,aC,aK,aJ];
var aH="deleteExchange";
var aG=Y[aH];
var aD=false;
for(var aB=0;
aB<aG.allParameters.length;
aB++){var aF=aG.allParameters[aB].name;
if(aF="noWait"){aD=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aH,b,[this,aG,this._id,aE],aI)
}if(aH=="flowChannel"){aA.prototype.flowFlag=active
}if(aD){if(typeof(aJ)!=="undefined"&&aJ){this._enqueueAction("nowait")
}}return this
};
aA.prototype.declareQueue=function(aF,aL,aD,aB,aO,aN,aC,aM){var aH=[0,aF,aL,aD,aB,aO,aN,aC];
var aK="declareQueue";
var aJ=Y[aK];
var aG=false;
for(var aE=0;
aE<aJ.allParameters.length;
aE++){var aI=aJ.allParameters[aE].name;
if(aI="noWait"){aG=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aK,b,[this,aJ,this._id,aH],aM)
}if(aK=="flowChannel"){aA.prototype.flowFlag=active
}if(aG){if(typeof(aN)!=="undefined"&&aN){this._enqueueAction("nowait")
}}return this
};
aA.prototype.bindQueue=function(aE,aF,aD,aM,aB,aL){var aH=[0,aE,aF,aD,aM,aB];
var aK="bindQueue";
var aJ=Y[aK];
var aG=false;
for(var aC=0;
aC<aJ.allParameters.length;
aC++){var aI=aJ.allParameters[aC].name;
if(aI="noWait"){aG=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aK,b,[this,aJ,this._id,aH],aL)
}if(aK=="flowChannel"){aA.prototype.flowFlag=active
}if(aG){if(typeof(aM)!=="undefined"&&aM){this._enqueueAction("nowait")
}}return this
};
aA.prototype.unbindQueue=function(aE,aF,aD,aB,aL){var aH=[0,aE,aF,aD,aB];
var aK="unbindQueue";
var aJ=Y[aK];
var aG=false;
for(var aC=0;
aC<aJ.allParameters.length;
aC++){var aI=aJ.allParameters[aC].name;
if(aI="noWait"){aG=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aK,b,[this,aJ,this._id,aH],aL)
}if(aK=="flowChannel"){aA.prototype.flowFlag=active
}if(aG){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
aA.prototype.purgeQueue=function(aC,aJ,aI){var aE=[0,aC,aJ];
var aH="purgeQueue";
var aG=Y[aH];
var aD=false;
for(var aB=0;
aB<aG.allParameters.length;
aB++){var aF=aG.allParameters[aB].name;
if(aF="noWait"){aD=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aH,b,[this,aG,this._id,aE],aI)
}if(aH=="flowChannel"){aA.prototype.flowFlag=active
}if(aD){if(typeof(aJ)!=="undefined"&&aJ){this._enqueueAction("nowait")
}}return this
};
aA.prototype.deleteQueue=function(aD,aL,aC,aK,aJ){var aF=[0,aD,aL,aC,aK];
var aI="deleteQueue";
var aH=Y[aI];
var aE=false;
for(var aB=0;
aB<aH.allParameters.length;
aB++){var aG=aH.allParameters[aB].name;
if(aG="noWait"){aE=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aI,b,[this,aH,this._id,aF],aJ)
}if(aI=="flowChannel"){aA.prototype.flowFlag=active
}if(aE){if(typeof(aK)!=="undefined"&&aK){this._enqueueAction("nowait")
}}return this
};
aA.prototype.qosBasic=function(aC,aJ,aB,aK){var aF=[aC,aJ,aB];
var aI="qosBasic";
var aH=Y[aI];
var aE=false;
for(var aD=0;
aD<aH.allParameters.length;
aD++){var aG=aH.allParameters[aD].name;
if(aG="noWait"){aE=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aI,b,[this,aH,this._id,aF],aK)
}if(aI=="flowChannel"){aA.prototype.flowFlag=active
}if(aE){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
aA.prototype.consumeBasic=function(aH,aB,aE,aG,aC,aO,aD,aN){var aJ=[0,aH,aB,aE,aG,aC,aO,aD];
var aM="consumeBasic";
var aL=Y[aM];
var aI=false;
for(var aF=0;
aF<aL.allParameters.length;
aF++){var aK=aL.allParameters[aF].name;
if(aK="noWait"){aI=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aM,b,[this,aL,this._id,aJ],aN)
}if(aM=="flowChannel"){aA.prototype.flowFlag=active
}if(aI){if(typeof(aO)!=="undefined"&&aO){this._enqueueAction("nowait")
}}return this
};
aA.prototype.cancelBasic=function(aB,aJ,aI){var aE=[aB,aJ];
var aH="cancelBasic";
var aG=Y[aH];
var aD=false;
for(var aC=0;
aC<aG.allParameters.length;
aC++){var aF=aG.allParameters[aC].name;
if(aF="noWait"){aD=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aH,b,[this,aG,this._id,aE],aI)
}if(aH=="flowChannel"){aA.prototype.flowFlag=active
}if(aD){if(typeof(aJ)!=="undefined"&&aJ){this._enqueueAction("nowait")
}}return this
};
aA.prototype.publishBasic=function(aG,aB,aH,aE,aF,aC,aN){var aJ=[0,aH,aE,aF,aC];
var aM="publishBasic";
var aL=Y[aM];
var aI=false;
for(var aD=0;
aD<aL.allParameters.length;
aD++){var aK=aL.allParameters[aD].name;
if(aK="noWait"){aI=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aM,b,[this,aL,this._id,aJ,aG,aB],aN)
}if(aM=="flowChannel"){aA.prototype.flowFlag=active
}if(aI){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
aA.prototype.getBasic=function(aD,aC,aJ){var aF=[0,aD,aC];
var aI="getBasic";
var aH=Y[aI];
var aE=false;
for(var aB=0;
aB<aH.allParameters.length;
aB++){var aG=aH.allParameters[aB].name;
if(aG="noWait"){aE=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aI,b,[this,aH,this._id,aF],aJ)
}if(aI=="flowChannel"){aA.prototype.flowFlag=active
}if(aE){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
aA.prototype.ackBasic=function(aG,aJ,aI){var aD=[aG,aJ];
var aH="ackBasic";
var aF=Y[aH];
var aC=false;
for(var aB=0;
aB<aF.allParameters.length;
aB++){var aE=aF.allParameters[aB].name;
if(aE="noWait"){aC=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aH,b,[this,aF,this._id,aD],aI)
}if(aH=="flowChannel"){aA.prototype.flowFlag=active
}if(aC){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
aA.prototype.rejectBasic=function(aH,aB,aJ){var aE=[aH,aB];
var aI="rejectBasic";
var aG=Y[aI];
var aD=false;
for(var aC=0;
aC<aG.allParameters.length;
aC++){var aF=aG.allParameters[aC].name;
if(aF="noWait"){aD=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aI,b,[this,aG,this._id,aE],aJ)
}if(aI=="flowChannel"){aA.prototype.flowFlag=active
}if(aD){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
aA.prototype.recoverBasic=function(aG,aI){var aF=[aG];
var aD="recoverBasic";
var aB=Y[aD];
var aE=false;
for(var aH=0;
aH<aB.allParameters.length;
aH++){var aC=aB.allParameters[aH].name;
if(aC="noWait"){aE=true;
break
}}if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aD,b,[this,aB,this._id,aF],aI)
}if(aD=="flowChannel"){aA.prototype.flowFlag=active
}if(aE){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
_basicProperties=[{name:"contentType",domain:"Shortstr",label:"MIME content type"},{name:"contentEncoding",domain:"Shortstr",label:"MIME content encoding"},{name:"headers",domain:"Table",label:"message header field table"},{name:"deliveryMode",domain:"Octet",label:"non-persistent (1) or persistent (2)"},{name:"priority",domain:"Octet",label:"message priority, 0 to 9"},{name:"correlationId",domain:"Shortstr",label:"application correlation identifier"},{name:"replyTo",domain:"Shortstr",label:"address to reply to"},{name:"expiration",domain:"Shortstr",label:"message expiration specification"},{name:"messageId",domain:"Shortstr",label:"application message identifier"},{name:"timestamp",domain:"Timestamp",label:"message timestamp"},{name:"type",domain:"Shortstr",label:"message type name"},{name:"userId",domain:"Shortstr",label:"creating user id"},{name:"appId",domain:"Shortstr",label:"creating application id"},{name:"reserved",domain:"Shortstr",label:"reserved, must be empty"}];
aA.prototype.selectTx=function(aF){var aE=[];
var aC="selectTx";
var aB=Y[aC];
var aD=false;
if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aC,b,[this,aB,this._id,aE],aF)
}if(aC=="flowChannel"){aA.prototype.flowFlag=active
}if(aD){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
aA.prototype.commitTx=function(aF){var aE=[];
var aC="commitTx";
var aB=Y[aC];
var aD=false;
if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aC,b,[this,aB,this._id,aE],aF)
}if(aC=="flowChannel"){aA.prototype.flowFlag=active
}if(aD){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
aA.prototype.rollbackTx=function(aF){var aE=[];
var aC="rollbackTx";
var aB=Y[aC];
var aD=false;
if(this._connection._readyState==this._connection.OPEN){this._enqueueAction(aC,b,[this,aB,this._id,aE],aF)
}if(aC=="flowChannel"){aA.prototype.flowFlag=active
}if(aD){if(typeof(noWait)!=="undefined"&&noWait){this._enqueueAction("nowait")
}}return this
};
var T=aA.prototype.openChannel;
var m=function(aC,aB){aC._stateMachine.enterState("channelReady","",null);
T.apply(aC,aB)
};
delete aA.prototype.openChannel;
var d=aA.prototype.closeOkChannel;
var au=function(aC,aB){d.apply(aC,aB)
};
delete aA.prototype.closeOkChannel;
var S=aA.prototype.closeChannel;
aA.prototype.closeChannel=function(aD,aG){if(typeof aD=="object"){myConfig=aD||{};
var aF=myConfig.replyCode||0;
var aC=myConfig.replyText||"";
var aE=myConfig.classId||0;
var aB=myConfig.methodId||0;
if(typeof aF!="number"){throw new Error("AmqpChannel.closeChannel(): Parameter 'replyCode' is expected to be of numeric type")
}if(typeof aC!="string"){throw new Error("AmqpChannel.closeChannel(): Parameter 'replyText' is expected to be a string")
}if(typeof aE!="number"){throw new Error("AmqpChannel.closeChannel(): Parameter 'classId' is expected to be of numeric type")
}if(typeof aB!="number"){throw new Error("AmqpChannel.closeChannel(): Parameter 'methodId' is expected to be of numeric type")
}return S.call(this,aF,aC,aE,aB,aG)
}else{return S.apply(this,arguments)
}};
var ai=aA.prototype.declareExchange;
aA.prototype.declareExchange=function(aE,aI){if(typeof aE=="object"){myConfig=aE||{};
var aC=myConfig.exchange;
var aG=myConfig.type;
var aF=myConfig.passive||false;
var aH=myConfig.durable||false;
var aB=myConfig.noWait||false;
var aD=myConfig.args||null;
if(!aC||typeof aC!="string"){throw new Error("AmqpChannel.declareExchange(): String parameter 'exchange' is required")
}if(!aG||typeof aG!="string"||((aG!="fanout")&&(aG!="direct")&&(aG!="topic")&&(aG!="headers"))){throw new Error("AmqpChannel.declareExchange(): Legal values of parameter 'type' are direct | fanout | headers | topic")
}if(typeof aF!="boolean"){throw new Error("AmqpChannel.declareExchange(): Parameter 'passive' only accepts boolean values")
}if(typeof aH!="boolean"){throw new Error("AmqpChannel.declareExchange(): Parameter 'durable' only accepts boolean values")
}if(typeof aB!="boolean"){throw new Error("AmqpChannel.declareExchange(): Parameter 'noWait' only accepts boolean values")
}return ai.call(this,aC,aG,aF,aH,aB,aD,aI)
}else{return ai.apply(this,arguments)
}};
var af=aA.prototype.deleteExchange;
aA.prototype.deleteExchange=function(aD,aF){if(typeof aD=="object"){myConfig=aD||{};
var aC=myConfig.exchange;
var aE=myConfig.ifUnused||false;
var aB=myConfig.noWait||false;
if(!aC||typeof aC!="string"){throw new Error("AmqpChannel.deleteExchange(): String parameter 'exchange' is required")
}if(typeof aE!="boolean"){throw new Error("AmqpChannel.deleteExchange(): Parameter 'ifUnused' only accepts boolean values")
}if(typeof aB!="boolean"){throw new Error("AmqpChannel.deleteExchange(): Parameter 'noWait' only accepts boolean values")
}return af.call(this,aC,aE,aB,aF)
}else{return af.apply(this,arguments)
}};
var y=aA.prototype.declareQueue;
aA.prototype.declareQueue=function(aD,aH){if(typeof aD=="object"){myConfig=aD||{};
var aE=myConfig.queue;
var aG=myConfig.passive||false;
var aC=myConfig.durable||false;
var aB=myConfig.exclusive||false;
var aJ=myConfig.autoDelete||false;
var aI=myConfig.noWait||false;
var aF=myConfig.args||null;
if(!aE||typeof aE!="string"){throw new Error("AmqpChannel.declareQueue(): String parameter 'queue' is required")
}if(typeof aG!="boolean"){throw new Error("AmqpChannel.declareQueue(): Parameter 'passive' only accepts boolean values")
}if(typeof aC!="boolean"){throw new Error("AmqpChannel.declareQueue(): Parameter 'durable' only accepts boolean values")
}if(typeof aB!="boolean"){throw new Error("AmqpChannel.declareQueue(): Parameter 'exclusive' only accepts boolean values")
}if(typeof aJ!="boolean"){throw new Error("AmqpChannel.declareQueue(): Parameter 'autoDelete' only accepts boolean values")
}if(typeof aI!="boolean"){throw new Error("AmqpChannel.declareQueue(): Parameter 'noWait' only accepts boolean values")
}return y.call(this,aE,aG,aC,aB,aJ,aI,aF,aH)
}else{return y.apply(this,arguments)
}};
var Q=aA.prototype.bindQueue;
aA.prototype.bindQueue=function(aF,aH){if(typeof aF=="object"){myConfig=aF||{};
var aB=myConfig.queue;
var aD=myConfig.exchange;
var aG=myConfig.routingKey;
var aC=myConfig.noWait||false;
var aE=myConfig.args||null;
if(!aB||typeof aB!="string"){throw new Error("AmqpChannel.bindQueue(): String parameter 'queue' is required")
}if(!aD||typeof aD!="string"){throw new Error("AmqpChannel.bindQueue(): String parameter 'exchange' is required")
}if(!aG||typeof aG!="string"){throw new Error("AmqpChannel.bindQueue(): String parameter 'routingKey' is required")
}if(typeof aC!="boolean"){throw new Error("AmqpChannel.bindQueue(): Parameter 'noWait' only accepts boolean values")
}return Q.call(this,aB,aD,aG,aC,aE,aH)
}else{return Q.apply(this,arguments)
}};
var ac=aA.prototype.unbindQueue;
aA.prototype.unbindQueue=function(aE,aG){if(typeof aE=="object"){myConfig=aE||{};
var aB=myConfig.queue;
var aC=myConfig.exchange;
var aF=myConfig.routingKey;
var aD=myConfig.args||null;
if(!aB||typeof aB!="string"){throw new Error("AmqpChannel.unbindQueue(): String parameter 'queue' is required")
}if(!aC||typeof aC!="string"){throw new Error("AmqpChannel.unbindQueue(): String parameter 'exchange' is required")
}if(!aF||typeof aF!="string"){throw new Error("AmqpChannel.unbindQueue(): String parameter 'routingKey' is required")
}return ac.call(this,aB,aC,aF,aD,aG)
}else{return ac.apply(this,arguments)
}};
var H=aA.prototype.purgeQueue;
aA.prototype.purgeQueue=function(aD,aE){if(typeof aD=="object"){myConfig=aD||{};
var aB=myConfig.queue;
var aC=myConfig.noWait||false;
if(!aB||typeof aB!="string"){throw new Error("AmqpChannel.purgeQueue(): String parameter 'queue' is required")
}if(typeof aC!="boolean"){throw new Error("AmqpChannel.purgeQueue(): Parameter 'noWait' only accepts boolean values")
}return H.call(this,aB,aC,aE)
}else{return H.apply(this,arguments)
}};
var ak=aA.prototype.deleteQueue;
aA.prototype.deleteQueue=function(aE,aG){if(typeof aE=="object"){myConfig=aE||{};
var aC=myConfig.queue;
var aF=myConfig.ifUnused||false;
var aB=myConfig.ifEmpty||false;
var aD=myConfig.noWait||false;
if(!aC||typeof aC!="string"){throw new Error("AmqpChannel.deleteQueue(): String parameter 'queue' is required")
}if(typeof aF!="boolean"){throw new Error("AmqpChannel.deleteQueue(): Parameter 'ifUnused' only accepts boolean values")
}if(typeof aB!="boolean"){throw new Error("AmqpChannel.deleteQueue(): Parameter 'ifEmpty' only accepts boolean values")
}if(typeof aD!="boolean"){throw new Error("AmqpChannel.deleteQueue(): Parameter 'noWait' only accepts boolean values")
}return ak.call(this,aC,aF,aB,aD,aG)
}else{return ak.apply(this,arguments)
}};
var ao=aA.prototype.qosBasic;
aA.prototype.qosBasic=function(aB,aF){if(typeof aB=="object"){myConfig=aB||{};
var aE=myConfig.prefetchSize||0;
var aC=myConfig.prefetchCount||0;
var aD=myConfig.global||false;
if(typeof aE!="number"){throw new Error("AmqpChannel.qosBasic(): Parameter 'prefetchSize' is expected to be of numeric type")
}if(typeof aC!="number"){throw new Error("AmqpChannel.qosBasic(): Parameter 'prefetchCount' is expected to be of numeric type")
}if(typeof aD!="boolean"){throw new Error("AmqpChannel.qosBasic(): Parameter 'global' only accepts boolean values")
}return ao.call(this,aE,aC,aD,aF)
}else{return ao.apply(this,arguments)
}};
var at=aA.prototype.consumeBasic;
aA.prototype.consumeBasic=function(aE,aI){if(typeof aE=="object"){myConfig=aE||{};
var aG=myConfig.queue;
var aB=myConfig.consumerTag;
var aD=myConfig.noLocal||false;
var aF=true;
var aC=myConfig.exclusive||false;
var aJ=myConfig.noWait||false;
var aH=myConfig.args||null;
if(!aG||typeof aG!="string"){throw new Error("AmqpChannel.consumeBasic(): String parameter 'queue' is required")
}if(!aB||typeof aB!="string"){throw new Error("AmqpChannel.consumeBasic(): String parameter 'consumerTag' is required")
}if(typeof aD!="boolean"){throw new Error("AmqpChannel.consumeBasic(): Parameter 'noLocal' only accepts boolean values")
}if(typeof(myConfig.noAck)!=="undefined"){if(typeof(myConfig.noAck)!="boolean"){throw new Error("AmqpChannel.consumeBasic(): Parameter 'noAck' only accepts boolean values")
}aF=myConfig.noAck
}if(typeof aC!="boolean"){throw new Error("AmqpChannel.consumeBasic(): Parameter 'exclusive' only accepts boolean values")
}if(typeof aJ!="boolean"){throw new Error("AmqpChannel.consumeBasic(): Parameter 'noWait' only accepts boolean values")
}return at.call(this,aG,aB,aD,aF,aC,aJ,aH,aI)
}else{return at.apply(this,arguments)
}};
var ab=aA.prototype.cancelBasic;
aA.prototype.cancelBasic=function(aC,aE){if(typeof aC=="object"){myConfig=aC||{};
var aD=myConfig.consumerTag;
var aB=myConfig.noWait||false;
if(!aD||typeof aD!="string"){throw new Error("AmqpChannel.cancelBasic(): String parameter 'consumerTag' is required")
}if(typeof aB!="boolean"){throw new Error("AmqpChannel.cancelBasic(): Parameter 'noWait' only accepts boolean values")
}return ab.call(this,aD,aB,aE)
}else{return ab.apply(this,arguments)
}};
var l=aA.prototype.publishBasic;
aA.prototype.publishBasic=function(aC,aK){if(typeof aC=="object"&&aC.body){myConfig=aC||{};
var aH=myConfig.body;
var aJ=myConfig.properties;
var aI=myConfig.exchange;
var aF=myConfig.routingKey;
var aG=myConfig.mandatory||false;
var aD=myConfig.immediate||false;
var aE=null;
if(!aH){throw new Error("AmqpChannel.publishBasic(): 'body' is a required parameter.")
}if((typeof(ArrayBuffer)!=="undefined")&&(aH instanceof ArrayBuffer)){aE=decodeArrayBuffer2ByteBuffer(aH)
}else{if(aH instanceof ByteBuffer){aE=aH
}else{throw new Error("AmqpChannel.publishBasic(): 'body' should be an instance of either ArrayBuffer or ByteBuffer")
}}if(!aI||typeof aI!="string"){throw new Error("AmqpChannel.publishBasic(): String parameter 'exchange' is required")
}if(!aF||typeof aF!="string"){throw new Error("AmqpChannel.publishBasic(): String parameter 'routingKey' is required")
}if(typeof aG!="boolean"){throw new Error("AmqpChannel.publishBasic(): Parameter 'mandatory' only accepts boolean values")
}if(typeof aD!="boolean"){throw new Error("AmqpChannel.publishBasic(): Parameter 'immediate' only accepts boolean values")
}var aB={};
if(aJ!=undefined){aB=aJ.getProperties()
}return l.call(this,aE,aB,aI,aF,aG,aD,aK)
}else{return l.apply(this,arguments)
}};
var a=aA.prototype.getBasic;
aA.prototype.getBasic=function(aD,aE){if(typeof aD=="object"){myConfig=aD||{};
var aB=myConfig.queue;
var aC=myConfig.noAck||false;
if(!aB||typeof aB!="string"){throw new Error("AmqpChannel.getBasic(): String parameter 'queue' is required")
}if(typeof aC!="boolean"){throw new Error("AmqpChannel.getBasic(): Parameter 'noAck' only accepts boolean values")
}return a.call(this,aB,aC,aE)
}else{return a.apply(this,arguments)
}};
var c=aA.prototype.ackBasic;
aA.prototype.ackBasic=function(aC){if(typeof aC=="object"){myConfig=aC||{};
var aD=myConfig.deliveryTag;
var aB=myConfig.multiple||false;
if(!aD||typeof aD!="number"){throw new Error("AmqpChannel.ackBasic(): Numeric parameter 'deliveryTag' is required")
}if(typeof aB!="boolean"){throw new Error("AmqpChannel.ackBasic(): Parameter 'multiple' only accepts boolean values")
}return c.call(this,aD,aB,null)
}else{return c.apply(this,arguments)
}};
var az=aA.prototype.rejectBasic;
aA.prototype.rejectBasic=function(aC){if(typeof aC=="object"){myConfig=aC||{};
var aD=myConfig.deliveryTag;
var aB=myConfig.requeue||false;
if(!aD||typeof aD!="number"){throw new Error("AmqpChannel.rejectBasic(): Numeric parameter 'deliveryTag' is required")
}if(typeof aB!="boolean"){throw new Error("AmqpChannel.rejectBasic(): Parameter 'requeue' only accepts boolean values")
}return az.call(this,aD,aB,null)
}else{return az.apply(this,arguments)
}};
var t=function(){this._actionList=new Array();
this.currentAction=0;
this._replayLength=0
};
t.prototype.getActionList=function(){return this._actionList
};
t.prototype.setReplayLength=function(aB){this._replayLength=aB
};
t.prototype._processActions=function r(){if(!this._actionList.length){return
}if(this.currentAction==this._actionList.length){this.currentAction=0
}var aB=this._actionList[this.currentAction];
this.currentAction++;
aB.func.apply(aB.object,aB.args)
};
t.prototype._processAllActions=function k(){for(i=0;
i<this._replayLength;
i++){var aB=this._actionList[i];
aB.func.apply(aB.object,aB.args)
}};
t.prototype._processAllNewActions=function aq(){for(i=this._replayLength;
i<this._actionList.length;
i++){var aB=this._actionList[i];
aB.func.apply(aB.object,aB.args)
}};
t.prototype._addAction=function j(aC,aE,aF,aD){switch(aC){case"declareExchange":break;
case"declareQueue":break;
case"bindQueue":break;
case"consumeBasic":break;
default:return
}var aB=function aB(){};
var aG={};
aG.object=aE;
aG.func=aF||aB;
aG.args=aD||null;
this._actionList.push(aG)
}
})();
var AmqpArguments=function(){};
AmqpArguments.prototype=new Array();
(function(){var a=AmqpArguments.prototype;
var b=function(g,c,f,d){var e={};
e.key=c;
e.value=f;
if(f==null){d="void"
}e.type=d;
g.push(e)
};
a.addLongString=function(c,d){b(this,c,d,"longstr");
return this
};
a.addInteger=function(c,d){b(this,c,d,"int");
return this
};
a.toString=function(){var c=[];
for(var d=0;
d<this.length;
d++){if(this[d].key!=null){c.push("{key:"+this[d].key+", value:"+this[d].value+", type:"+this[d].type+"}")
}}return"{"+c.join(", ")+"}"
}
})();
var AmqpProperties=function(f){this._properties={};
if(f!=null){var e=false;
for(var g in f){e=false;
for(var a=0;
a<_basicProperties.length;
a++){if(g==_basicProperties[a].name){e=true;
break
}}if(!e){throw new Error("Illegal property: '"+g.getKey()+"' passed")
}}for(var c in f){var d=f[c];
if(c=="appId"||c=="contentType"||c=="contentEncoding"||c=="correlationId"||c=="expiration"||c=="messageId"||c=="replyTo"||c=="type"||c=="userId"){if((d!=null)&&(typeof(d)!="string")){var b="Invalid type: Value of '"+c+"' should be of type String";
throw new Error(b)
}}else{if(c=="headers"){if((d!=null)&&!(d instanceof AmqpArguments)){b="Invalid type: Value of '"+c+"' should be of type AmqpArguments";
throw new Error(b)
}}else{if(c=="timestamp"){if((d!=null)&&d.getMonth&&d.getMonth.call){continue
}var b="Invalid type: Value of '"+c+"' should be of type Date";
throw new Error(b)
}else{if(c=="deliveryMode"){if((d!=null)&&(typeof(d)!="number")){var b="Invalid type: Value of '"+c+"' should be of type Integer";
throw new Error(b)
}if((d!=1)&&(d!=2)){var b="Invalid value: Value of '"+c+"' should be either 1(non-persistent) or 2(persistent)";
throw new Error(b)
}}else{if(c=="priority"){if((d!=null)&&(typeof(d)!="number")){var b="Invalid type: Value of '"+c+"' should be of type Integer";
throw new Error(b)
}if((d<0)||(d>9)){var b="Invalid value: Value of property '"+c+"' should be between 0 and 9";
throw new Error(b)
}}else{var b="Illegal property '"+c+"' specified";
throw new Error(b)
}}}}}}this._properties=f
}};
(function(){var a=AmqpProperties.prototype;
a.getAppId=function(){return this._properties.appId
};
a.getContentType=function(){return this._properties.contentType
};
a.getContentEncoding=function(){return this._properties.contentEncoding
};
a.getCorrelationId=function(){return this._properties.correlationId
};
a.getDeliveryMode=function(){return parseInt(this._properties.deliveryMode)
};
a.getExpiration=function(){return this._properties.expiration
};
a.getHeaders=function(){return this._properties.headers
};
a.getMessageId=function(){return this._properties.messageId
};
a.getPriority=function(){return parseInt(this._properties.priority)
};
a.getProperties=function(){var c={};
for(var b in this._properties){if(this._properties[b]!=null){c[b]=this._properties[b]
}}return c
};
a.getReplyTo=function(){return this._properties.replyTo
};
a.getTimestamp=function(){return this._properties.timestamp
};
a.getType=function(){return this._properties.type
};
a.getUserId=function(){return this._properties.userId
};
a.setAppId=function(b){this._properties.appId=b
};
a.setContentType=function(b){this._properties.contentType=b
};
a.setContentEncoding=function(b){this._properties.contentEncoding=b
};
a.setCorrelationId=function(b){this._properties.correlationId=b
};
a.setDeliveryMode=function(c){if(c==null){var b="Null parameter passed into AmqpProperties.setPriority()";
throw new Error(b)
}if((c!=1)&&(c!=2)){b="AMQP 0-9-1 spec mandates 'deliveryMode' value to be either 1(for non-persistent) or 2(for persistent)";
throw new Error(b)
}this._properties.deliveryMode=c
};
a.setExpiration=function(b){this._properties.expiration=b
};
a.setHeaders=function(b){this._properties.headers=b
};
a.setMessageId=function(b){this._properties.messageId=b
};
a.setPriority=function(b){if(b==null){var c="Null parameter passed into AmqpProperties.setPriority()";
throw new Error(c)
}if((b<0)||(b>9)){c="AMQP 0-9-1 spec mandates 'priority' value to be between 0 and 9";
throw new Error(c)
}this._properties.priority=b
};
a.setReplyTo=function(b){this._properties.replyTo=b
};
a.setTimestamp=function(b){if(b!=null){if(b.getMonth&&b.getMonth.call){s="AmqpProperties.setTimestamp() expects a Date"
}}this._properties.timestamp=b
};
a.setType=function(b){this._properties.type=b
};
a.setUserId=function(b){this._properties.userId=b
};
a.toString=function(){if((this._properties==null)||(this._properties.length==0)){return""
}var b=[];
for(var c in this._properties){if(this._properties[c]!=null){b.push(c+":"+this._properties[c])
}}return"{"+b.join(", ")+"}"
}
})();
(function(){var b=function(c){switch(c){case"deliverBasic":return"message";
case"closeOkChannel":case"closeChannel":case"closeOkConnection":case"closeConnection":return"close";
case"getOkBasic":case"getEmptyBasic":return"get";
case"consumeOkBasic":return"consume";
case"cancelOkBasic":return"cancel";
case"openOkConnection":case"openOkChannel":return"open";
case"declareOkQueue":return"declarequeue";
case"declareOkExchange":return"declareexchange";
case"flowOkChannel":return"flow";
case"bindOkQueue":return"bindqueue";
case"unbindOkQueue":return"unbindqueue";
case"deleteOkQueue":return"deletequeue";
case"deleteOkExchange":return"deleteexchange";
case"commitOkTx":return"committransaction";
case"rollbackOkTx":return"rollbacktransaction";
case"selectOkTx":return"selecttransaction";
case"purgeOkQueue":return"purgequeue";
case"recoverOkBasic":return"recover";
case"rejectOkBasic":return"reject";
case"error":return"error";
default:throw (new Error("AMQP: unknown event name "+c))
}};
AmqpEvent=function(d,f,e){this.type=f.methodName;
this.type=b(this.type);
this.args={};
for(var c=0;
c<f.args.length;
c++){this.args[f.args[c].name]=f.args[c].value
}this.headers=e;
this.target=d;
this._body=f.body;
if(this.type=="message"){this.properties=new AmqpProperties(e)
}if(this.type=="error"){this.message=this.args.replyText
}};
var a=AmqpEvent.prototype;
a.type;
a.message;
a.headers;
a.properties;
a.target;
a.getBodyAsArrayBuffer=function(){if(typeof(ArrayBuffer)==="undefined"){throw new Error("AmqpEvent.getBodyAsArrayBuffer(): Browser does not support ArrayBuffer.")
}if(typeof(this._body)!=="undefined"){return this._body.getArrayBuffer(this._body.remaining())
}return null
};
a.getBodyAsByteBuffer=function(){return(this._body||null)
}
})();
var AmqpClientFactory=function(){if(typeof(WebSocketFactory)=="function"){this._webSocketFactory=new WebSocketFactory()
}};
(function(){var a=AmqpClientFactory.prototype;
a.createAmqpClient=function(){return new AmqpClient(this)
};
a.getWebSocketFactory=function(){return(this._webSocketFactory||null)
};
a.setWebSocketFactory=function(b){if((b===null)||(typeof(b)==="undefined")){throw new Error("AmqpClientFactory.setWebSocketFactory(): 'factory' is required parameter.")
}if(!(b instanceof WebSocketFactory)){throw new Error("AmqpClientFactory.setWebSocketFactory(): 'factory' must be an instance of WebSocketFactory.")
}this._webSocketFactory=b
}
})();