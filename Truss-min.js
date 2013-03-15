/**
 * almond 0.2.5 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

(function(e,t){var n=e.define,r,i,t;(function(e){function d(e,t){return h.call(e,t)}function v(e,t){var n
,r,i,s,o,u,a,f,c,h,p=t&&t.split("/"),d=l.map,v=d&&d["*"]||{};if(e&&e.charAt(0)===".")if(t){p=p.slice(0
,p.length-1),e=p.concat(e.split("/"));for(f=0;f<e.length;f+=1){h=e[f];if(h===".")e.splice(f,1),f-=1;else if(
h===".."){if(f===1&&(e[2]===".."||e[0]===".."))break;f>0&&(e.splice(f-1,2),f-=2)}}e=e.join("/")}else e
.indexOf("./")===0&&(e=e.substring(2));if((p||v)&&d){n=e.split("/");for(f=n.length;f>0;f-=1){r=n.slice
(0,f).join("/");if(p)for(c=p.length;c>0;c-=1){i=d[p.slice(0,c).join("/")];if(i){i=i[r];if(i){s=i,o=f;
break}}}if(s)break;!u&&v&&v[r]&&(u=v[r],a=f)}!s&&u&&(s=u,o=a),s&&(n.splice(0,o,s),e=n.join("/"))}return e
}function m(t,n){return function(){return s.apply(e,p.call(arguments,0).concat([t,n]))}}function g(e)
{return function(t){return v(t,e)}}function y(e){return function(t){a[e]=t}}function b(t){if(d(f,t)){
var r=f[t];delete f[t],c[t]=!0,n.apply(e,r)}if(!d(a,t)&&!d(c,t))throw new Error("No "+t);return a[t]}
function w(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length
)),[t,e]}function E(e){return function(){return l&&l.config&&l.config[e]||{}}}var n,s,o,u,a={},f={},l=
{},c={},h=Object.prototype.hasOwnProperty,p=[].slice;o=function(e,t){var n,r=w(e),i=r[0];return e=r[1
],i&&(i=v(i,t),n=b(i)),i?n&&n.normalize?e=n.normalize(e,g(t)):e=v(e,t):(e=v(e,t),r=w(e),i=r[0],e=r[1]
,i&&(n=b(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return m(e)},exports:function(e){var t=
a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config
:E(e)}}},n=function(t,n,r,i){var s,l,h,p,v,g=[],w;i=i||t;if(typeof r=="function"){n=!n.length&&r.length?
["require","exports","module"]:n;for(v=0;v<n.length;v+=1){p=o(n[v],i),l=p.f;if(l==="require")g[v]=u.require
(t);else if(l==="exports")g[v]=u.exports(t),w=!0;else if(l==="module")s=g[v]=u.module(t);else if(d(a,
l)||d(f,l)||d(c,l))g[v]=b(l);else{if(!p.p)throw new Error(t+" missing "+l);p.p.load(p.n,m(i,!0),y(l),
{}),g[v]=a[l]}}h=r.apply(a[t],g);if(t)if(s&&s.exports!==e&&s.exports!==a[t])a[t]=s.exports;else if(h!==
e||!w)a[t]=h}else t&&(a[t]=r)},r=i=s=function(t,r,i,a,f){return typeof t=="string"?u[t]?u[t](r):b(o(t
,r).f):(t.splice||(l=t,r.splice?(t=r,r=i,i=null):t=e),r=r||function(){},typeof i=="function"&&(i=a,a=
f),a?n(e,t,r,i):setTimeout(function(){n(e,t,r,i)},4),s)},s.config=function(e){return l=e,l.deps&&s(l.
deps,l.callback),s},t=function(e,t,n){t.splice||(n=t,t=[]),!d(a,e)&&!d(f,e)&&(f[e]=[e,t,n])},t.amd={jQuery
:!0}})(),t("vendor/almond",function(){}),t("events",[],function(){return{events:{},on:function(e,t){var n
;if("string"!=typeof e)throw new Error("on() needs an event name string");if("function"!=typeof t)throw new 
Error("on() needs a callback function");n=[].slice.call(arguments,2)[0],this.events[e]||(this.events[
e]=[]),this.events[e].push({callback:t,context:n})},reset:function(){this.events={}},off:function(e){
var t,n,r;if("string"!=typeof e)throw new Error("off() needs an event");r=[].slice.call(arguments,1)[0
];if(this.events[e]){t=this.events[e],n=t.length;while(n--)"function"!=typeof r?t.splice(n,1):t[n].callback===
r&&(t[n].callback=null,delete t[n].callback)}},fire:function(e){var t,n,r,i,s;if("string"!=typeof e)throw new 
Error("fire() needs an event");r=[].slice.call(arguments,1),i=r[0],s=r[1];if(this.events[e]){n=this.events
[e].length;while(t=this.events[e][--n])"function"==typeof t.callback&&t.callback.call(s||t.context||this
,i)}}}}),t("Base",["events"],function(e){var t=function(e){"undefined"!=typeof e&&(this.options=e),"function"==typeof 
this.start&&this.start(e)};return t.mixin=function(e,n,r){for(var i in n)r&&"object"==typeof n[i]?(e[
i]=e[i]||{},t.mixin(e[i],n[i])):e[i]=n[i];return e},t.construct=function(e){function i(){}function s(
e){var n=o();return t.call(n,e),n}function o(){return t.mixin(new i,r)}function u(){}var n=this,r=e||
{};return i.prototype=n.prototype,i.prototype.constructor=t.mixin(i,n),u.prototype=o(),u.construct=i.
construct,u.create=s,u},t.mixin(t.prototype,e),t}),t("mediator",[],function(){function e(e,t,n){i[s][
e].push({obj:t,eventName:n})}function t(e,t){if(e===t)return e!==0||1/e===1/t;if(e===null||t===null)return e===
t;if(Object.prototype.toString.call(e)!==Object.prototype.toString.call(t))return!1}function n(e,t,n)
{var r;if(typeof Array.prototype.forEach=="function"&&e.length)e.forEach(t,n||this);else if(e.length)
Array.prototype.forEach=function(t,n){for(var r=0,i=e.length;r<i;++r)t.call(n,e[r],r,e)};else for(r in 
e)e.hasOwnProperty(r)&&t.call(n||this,e[r],r,e)}function r(){n(i[s],function(e,t,r){n(r,function(e,t,
r){n(r.from,function(e){e.obj.off(e.eventName),e.obj.on(e.eventName,function(e){n(r.to,function(t){t.
obj.fire(t.eventName,e)},this)},this)},this)},this)},this)}var i={},s=null;return{from:function(t,r){
if(!arguments.length)throw{name:"NoArgumentsException",message:"From cannot be called with no arguments"
};return s=r||"all",i[s]||(i[s]={}),i[s].from||(i[s].from=[]),e("from",t,r),this.removing&&(n(i,function(
e,t){n(e.to,function(n,r){e.to[r].remove&&e.to[r].remove===!0&&(delete i[t].to[r],s=null)},this)},this
),this.removing=!1),this},to:function(t,n){if(!s)throw{name:"ToFunctionBadUsage",message:"Cannot call to before from."
};return i[s].to||(i[s].to=[]),e("to",t,n),this.register(),this},remove:function(e,r){if(!arguments.length
)throw{name:"NoArgumentException",message:"Remove cannot be called without arguments"};return this.removing=!0
,n(i,function(i){n(i.to,function(n,s){typeof e=="string"?(r=e,n.eventName===r&&[].splice.call(i.to,s,1
)):(t(n.obj,e)||e==null)&&(n.eventName===r||typeof r=="undefined")&&(n.remove=!0)})}),this},register:
function(){var e=arguments[0];if(e){if(!e.source)throw{name:"ConfigSourceNotDefined",message:"Config object needs a source defined."
};n(e.source,function(e){this.from(e.subscriber,e.event)},this);if(!e.target)throw{name:"ConfigTargetNotDefined"
,message:"Config object needs a target defined."};n(e.target,function(e){this.to(e.subscriber,e.event
)},this)}else r()},unregister:function(e){if(!e)throw{name:"NoArgumentException",message:"Unregister cannot be called without arguments"
};if(e){this.removing=!0;if(!e.target)throw{name:"ConfigTargetNotDefined",message:"Config object needs a target defined."
};n(e.target,function(e){this.remove(e.subscriber,e.event)},this);if(!e.source)throw{name:"ConfigSourceNotDefined"
,message:"Config object needs a source defined."};n(e.source,function(e){this.from(e.subscriber,e.eventName
)},this)}}}}),t("utils",[],function(){return{isObject:function(e){return"[object Object]"==""+e},realTypeOf
:function(e){return{}.toString.call(e).match(/\w+/g)[1].toLowerCase()}}}),t("Model",["Base"],function(
e){function n(){return t.IDPREFIX+t.ID++}function r(){t.ID=t.ORIGID}var t={ID:1,ORIGID:1,IDPREFIX:"mid_"
};return e.construct({start:function(e){return this.id=n(),this.resetId=r,this.properties={},e&&this.
set(e),this},get:function(e){return this[e]||this.properties[e]},set:function(e,t){if(typeof e=="string"
)this.properties[e]=t;else for(var n in e)e.hasOwnProperty(n)&&(this.properties[n]=e[n])}})}),t("Collection"
,["Base","Model"],function(e,t){function n(){return this.getModels().length}function r(e,t){var n=this
.getModels(),r=n.length,i=[],s=0;while(0<r--)typeof n[r][e]!="undefined"?n[r][e]===t&&i.push(n[r]):n[
r].get(e)===t&&i.push(n[r]);return i=i.length<2?i[0]:i}function i(e,t){var n=[].concat(r.call(this,e,
t)),i=n.length,s=this.getModels(),o=s.length,u=-1;while(0<o--)while(0<i--)u=s.indexOf(n[i]),u!==-1&&(
s.splice(u,1),this.fire("removed",this.getModels()))}var s;return e.construct({start:function(e){this
.model=e&&e.model?e.model:t},models:[],add:function(e){var t=[].concat(e),n=t.length,r,i,s,o;while(n--
){r=t[n];if(r.name&&r.name==="model")this.getModels().push(r);else{i=t[n];if(this.model){r=this.model
.create(),this.getModels().push(r);for(s in i)r.set(s,i[s])}}this.setCurrentModel(r),this.fire("add",
r)}},reset:function(){this.models=[],this.fire("reset")},getById:function(e){return r.call(this,"id",
e)},getByText:function(e){return r.call(this,"text",e)},removeByText:function(e){i.call(this,"text",e
)},removeById:function(e){i.call(this,"id",e)},getModels:function(){return this.models},setCurrentModel
:function(e){s=e},getCurrentModel:function(){return s}})}),t("View",["Base"],function(e){function t(e
){return Object.prototype.toString.call(e).match(/\w+/g)[1].toLowerCase()}function n(){return document
.getElementsByTagName("body")[0]}function r(){return"div"}return e.construct({start:function(){this.tagName=
this.options?this.options.tagName:r(),this.rootNode=this.options?this.options.rootNode:n()},make:function(
){var e=[].slice.call(arguments),n=e[0]||this.tagName,r=e[1],i=e[2],s,o,u=document.createElement(n);e
.length===2&&t(r)=="object"&&(r=undefined,i=e[1]);if(typeof r!="undefined"){if(t(r)=="number"||typeof 
r=="string")r=document.createTextNode(r);if(t(r)=="array")while(s=r.shift())u.appendChild(s);else u.appendChild
(r)}if(i)for(o in i)i.hasOwnProperty(o)&&(u[o]=i[o],o in u.attributes||u.setAttribute(o,i[o]));return u
}})}),t("main",["Base","events","mediator","utils","Collection","Model","View"],function(e,t,n,r,i,s,
o){return{events:t,mediator:n,utisl:r,collection:i,model:s,view:o}});var s=i("main");typeof module!="undefined"&&
module.exports?module.exports=s:n?function(e){e(function(){return s})}(n):e.Truss=s})(this);