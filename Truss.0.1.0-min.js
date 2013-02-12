define("src/Truss.EventEmitter",["require","exports","module"],function(e,t,n){var r={};r.EventEmitter=
{events:{},on:function(e,t){var n;if("string"!=typeof e)throw new Error("on() needs an event name string"
);if("function"!=typeof t)throw new Error("on() needs a callback function");n=[].slice.call(arguments
,2)[0],this.events[e]||(this.events[e]=[]),this.events[e].push({callback:t,context:n})},reset:function(
){this.events={}},off:function(e){var t,n,r;if("string"!=typeof e)throw new Error("off() needs an event"
);r=[].slice.call(arguments,1)[0];if(this.events[e]){t=this.events[e],n=t.length;while(n--)"function"!=typeof 
r?t.splice(n,1):t[n].callback===r&&(t[n].callback=null,delete t[n].callback)}},fire:function(e){var t
,n,r,i,s;if("string"!=typeof e)throw new Error("fire() needs an event");r=[].slice.call(arguments,1),
i=r[0],s=r[1];if(this.events[e]){n=this.events[e].length;while(t=this.events[e][--n])"function"==typeof 
t.callback&&t.callback.call(s||t.context||this,i)}}},n.exports=r.EventEmitter}),define("src/Truss.Utils"
,["require","exports","module"],function(e,t,n){var r={isObject:function(e){return"[object Object]"==""+
e},realTypeOf:function(e){return{}.toString.call(e).match(/\w+/g)[1].toLowerCase()}};t.Utils=r}),define
("src/Truss",["require","exports","module","src/Truss.EventEmitter"],function(e,t,n){var r=e("src/Truss.EventEmitter"
),i=function(e){"undefined"!=typeof e&&(this.options=e),"function"==typeof this.start&&this.start(e)}
;i.mixin=function(e,t,n){for(var r in t)n&&"object"==typeof t[r]?(e[r]=e[r]||{},i.mixin(e[r],t[r])):e
[r]=t[r];return e},i.construct=function(e){function n(){return t.call(this,[].slice.call(arguments)[0
])}var t=this;return n.prototype=i.mixin(i.mixin({},t.prototype),e),n.prototype.constructor=i.mixin(n
,t),n},i.mixin(i.prototype,r),t.Truss=i}),define("src/Truss.Model",["require","exports","module","src/Truss"
],function(e,t,n){function s(){return i.IDPREFIX+i.ID++}function o(){i.ID=i.ORIGID}var r=e("src/Truss"
).Truss,i={ID:1,ORIGID:1,IDPREFIX:"mid_"},u=r.construct({start:function(){this.id=s(),this.resetId=o}
,get:function(e){return this[e]||this.options[e]},set:function(e,t){this[e]=t}});t.Model=u}),define("src/Truss.Collection"
,["require","exports","module","src/Truss","src/Truss.Model"],function(e,t,n){function s(){return this
.getModels().length}function o(e,t){var n=this.getModels(),r=n.length,i=[],s=0;while(0<r--)typeof n[r
][e]!="undefined"?n[r][e]===t&&i.push(n[r]):n[r].get(e)===t&&i.push(n[r]);return i=i.length<2?i[0]:i}
function u(e,t){var n=[].concat(o.call(this,e,t)),r=n.length,i=this.getModels(),s=i.length,u=-1;while(0<
s--)while(0<r--)u=i.indexOf(n[r]),u!==-1&&(i.splice(u,1),this.fire("removed",this.getModels()))}var r=
e("src/Truss").Truss,i=e("src/Truss.Model").Model,a=r.construct({start:function(e){this.model=this.options&&
this.options.model||i},models:[],add:function(e){var t=[].concat(e),n=t.length;while(n--)this.currentModel=new 
this.model(t[n]),this.getModels().push(this.currentModel),this.fire("add",this.currentModel)},reset:function(
){this.models=[],this.fire("reset")},getById:function(e){return o.call(this,"id",e)},getByText:function(
e){return o.call(this,"text",e)},removeByText:function(e){u.call(this,"text",e)},removeById:function(
e){u.call(this,"id",e)},getModels:function(){return this.models}});t.Collection=a}),define("src/Truss.View"
,["require","exports","module","src/Truss"],function(e,t,n){function i(e){return Object.prototype.toString
.call(e).match(/\w+/g)[1].toLowerCase()}function s(){return document.getElementsByTagName("body")[0]}
function o(){return"div"}var r=e("src/Truss").Truss,u=r.construct({start:function(){this.tagName=this
.options?this.options.tagName:o(),this.rootNode=this.options?this.options.rootNode:s()},make:function(
){var e=[].slice.call(arguments),t=e[0]||this.tagName,n=e[1],r=e[2],s,o,u=document.createElement(t);e
.length===2&&i(n)=="object"&&(n=undefined,r=e[1]);if(typeof n!="undefined"){if(i(n)=="number"||typeof 
n=="string")n=document.createTextNode(n);if(i(n)=="array")while(s=n.shift())u.appendChild(s);else u.appendChild
(n)}if(r)for(o in r)r.hasOwnProperty(o)&&(u[o]=r[o],o in u.attributes||u.setAttribute(o,r[o]));return u
}});t.View=u});