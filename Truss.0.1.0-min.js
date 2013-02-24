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
:!0}})(),t("vendor/almond",function(){}),t("Truss.EventEmitter",["require","exports","module"],function(
e,t,n){var r={events:{},on:function(e,t){var n;if("string"!=typeof e)throw new Error("on() needs an event name string"
);if("function"!=typeof t)throw new Error("on() needs a callback function");n=[].slice.call(arguments
,2)[0],this.events[e]||(this.events[e]=[]),this.events[e].push({callback:t,context:n})},reset:function(
){this.events={}},off:function(e){var t,n,r;if("string"!=typeof e)throw new Error("off() needs an event"
);r=[].slice.call(arguments,1)[0];if(this.events[e]){t=this.events[e],n=t.length;while(n--)"function"!=typeof 
r?t.splice(n,1):t[n].callback===r&&(t[n].callback=null,delete t[n].callback)}},fire:function(e){var t
,n,r,i,s;if("string"!=typeof e)throw new Error("fire() needs an event");r=[].slice.call(arguments,1),
i=r[0],s=r[1];if(this.events[e]){n=this.events[e].length;while(t=this.events[e][--n])"function"==typeof 
t.callback&&t.callback.call(s||t.context||this,i)}}};return r}),t("Truss",["require","exports","module"
,"Truss.EventEmitter"],function(e,t,n){var r=e("Truss.EventEmitter"),i=function(e){"undefined"!=typeof 
e&&(this.options=e),"function"==typeof this.start&&this.start(e)};return i.mixin=function(e,t,n){for(
var r in t)n&&"object"==typeof t[r]?(e[r]=e[r]||{},i.mixin(e[r],t[r])):e[r]=t[r];return e},i.construct=
function(e){function n(){return t.call(this,[].slice.call(arguments)[0])}var t=this;return n.prototype=
i.mixin(i.mixin({},t.prototype),e),n.prototype.constructor=i.mixin(n,t),n},i.mixin(i.prototype,r),i})
,t("Truss.Mediator",["require","exports","module","Truss"],function(e,t,n){function o(e,t,n){i[s][e].
push({obj:t,eventName:n})}function u(e,t){if(e===t)return e!==0||1/e==1/t;if(e==null||t==null)return e===
t;if(toString.call(e)!=toString.call(t))return!1}function a(e,t,n){var r;if(typeof Array.prototype.forEach=="function"&&
e.length)e.forEach(t,n||this);else if(e.length)Array.prototype.forEach=function(t,n){for(var r=0,i=e.
length;r<i;++r)t.call(n,e[r],r,e)};else for(r in e)e.hasOwnProperty(r)&&t.call(n||this,e[r],r,e)}function f
(){a(i[s],function(e,t,n){a(n,function(e,t,n){a(n.from,function(e){e.obj.off(e.eventName),e.obj.on(e.
eventName,function(e){a(n.to,function(t){t.obj.fire(t.eventName,e)},this)},this)},this)},this)},this)
}var r=e("Truss"),i={},s=null,l=r.construct({from:function(e,t){if(!arguments.length)throw{name:"NoArgumentsException"
,message:"From cannot be called with no arguments"};return s=t||"all",i[s]||(i[s]={}),i[s].from||(i[s
].from=[]),o("from",e,t),this.removing&&(a(i,function(e,t){a(e.to,function(n,r){e.to[r].remove&&e.to[
r].remove===!0&&(delete i[t].to[r],s=null)},this)},this),this.removing=!1),this},to:function(e,t){if(!
s)throw{name:"ToFunctionBadUsage",message:"Cannot call to before from."};return i[s].to||(i[s].to=[])
,o("to",e,t),this.register(),this},remove:function(e,t){if(!arguments.length)throw{name:"NoArgumentException"
,message:"Remove cannot be called without arguments"};return this.removing=!0,a(i,function(n){a(n.to,
function(r,i){typeof e=="string"?(t=e,r.eventName===t&&[].splice.call(n.to,i,1)):(u(r.obj,e)||e==null
)&&(r.eventName===t||typeof t=="undefined")&&(r.remove=!0)})}),this},register:function(){var e=arguments
[0];if(e){if(!e.source)throw{name:"ConfigSourceNotDefined",message:"Config object needs a source defined."
};a(e.source,function(e){this.from(e.subscriber,e.event)},this);if(!e.target)throw{name:"ConfigTargetNotDefined"
,message:"Config object needs a target defined."};a(e.target,function(e){this.to(e.subscriber,e.event
)},this)}else f()},unregister:function(e){if(!e)throw{name:"NoArgumentException",message:"Unregister cannot be called without arguments"
};if(e){this.removing=!0;if(!e.target)throw{name:"ConfigTargetNotDefined",message:"Config object needs a target defined."
};a(e.target,function(e){this.remove(e.subscriber,e.event)},this);if(!e.source)throw{name:"ConfigSourceNotDefined"
,message:"Config object needs a source defined."};a(e.source,function(e){this.from(e.subscriber,e.eventName
)},this)}}});return l}),t("Truss.Utils",["require","exports","module"],function(e,t,n){var r={isObject
:function(e){return"[object Object]"==""+e},realTypeOf:function(e){return{}.toString.call(e).match(/\w+/g
)[1].toLowerCase()}};return r}),t("Truss.Model",["require","exports","module","Truss"],function(e,t,n
){function s(){return i.IDPREFIX+i.ID++}function o(){i.ID=i.ORIGID}var r=e("Truss"),i={ID:1,ORIGID:1,
IDPREFIX:"mid_"},u=r.construct({start:function(){this.id=s(),this.resetId=o},get:function(e){return this
[e]||this.options[e]},set:function(e,t){this[e]=t}});return u}),t("Truss.Collection",["require","exports"
,"module","Truss","Truss.Model"],function(e,t,n){function s(){return this.getModels().length}function o
(e,t){var n=this.getModels(),r=n.length,i=[],s=0;while(0<r--)typeof n[r][e]!="undefined"?n[r][e]===t&&
i.push(n[r]):n[r].get(e)===t&&i.push(n[r]);return i=i.length<2?i[0]:i}function u(e,t){var n=[].concat
(o.call(this,e,t)),r=n.length,i=this.getModels(),s=i.length,u=-1;while(0<s--)while(0<r--)u=i.indexOf(
n[r]),u!==-1&&(i.splice(u,1),this.fire("removed",this.getModels()))}var r=e("Truss"),i=e("Truss.Model"
),a=r.construct({start:function(e){this.model=this.options&&this.options.model||i},models:[],add:function(
e){var t=[].concat(e),n=t.length;while(n--)this.currentModel=new this.model(t[n]),this.getModels().push
(this.currentModel),this.fire("add",this.currentModel)},reset:function(){this.models=[],this.fire("reset"
)},getById:function(e){return o.call(this,"id",e)},getByText:function(e){return o.call(this,"text",e)
},removeByText:function(e){u.call(this,"text",e)},removeById:function(e){u.call(this,"id",e)},getModels
:function(){return this.models}});return a}),t("Truss.View",["require","exports","module","Truss"],function(
e,t,n){function i(e){return Object.prototype.toString.call(e).match(/\w+/g)[1].toLowerCase()}function s
(){return document.getElementsByTagName("body")[0]}function o(){return"div"}var r=e("Truss"),u=r.construct
({start:function(){this.tagName=this.options?this.options.tagName:o(),this.rootNode=this.options?this
.options.rootNode:s()},make:function(){var e=[].slice.call(arguments),t=e[0]||this.tagName,n=e[1],r=e
[2],s,o,u=document.createElement(t);e.length===2&&i(n)=="object"&&(n=undefined,r=e[1]);if(typeof n!="undefined"
){if(i(n)=="number"||typeof n=="string")n=document.createTextNode(n);if(i(n)=="array")while(s=n.shift
())u.appendChild(s);else u.appendChild(n)}if(r)for(o in r)r.hasOwnProperty(o)&&(u[o]=r[o],o in u.attributes||
u.setAttribute(o,r[o]));return u}});return u});var s=i("Truss");typeof module!="undefined"&&module.exports?
module.exports=s:n?function(e){e(function(){return s})}(n):e.Truss=s})(this);