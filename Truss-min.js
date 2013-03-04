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
,t("main",["require","exports","module","Truss"],function(e,t,n){var r=e("Truss");return r});var s=i("main"
);typeof module!="undefined"&&module.exports?module.exports=s:n?function(e){e(function(){return s})}(
n):e.Truss=s})(this);