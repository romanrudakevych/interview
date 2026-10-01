var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},ee=Object.prototype.hasOwnProperty;function te(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ne(e,t){return te(e.type,t,e.props)}function re(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function T(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ie=/\/+/g;function ae(e,t){return typeof e==`object`&&e&&e.key!=null?T(``+e.key):t.toString(36)}function oe(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function se(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,se(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ae(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(ie,`$&/`)+`/`),se(o,r,i,``,function(e){return e})):o!=null&&(re(o)&&(o=ne(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ie,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ae(a,u),c+=se(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ae(a,u++),c+=se(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return se(oe(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ce(e,t,n){if(e==null)return e;var r=[],i=0;return se(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function le(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var E=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},D={map:ce,forEach:function(e,t,n){ce(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ce(e,function(){t++}),t},toArray:function(e){return ce(e,function(e){return e})||[]},only:function(e){if(!re(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=D,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!ee.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return te(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)ee.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return te(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=re,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:le}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,E)}catch(e){E(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.8`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,re());else{var t=n(l);t!==null&&ae(x,t.startTime-e)}}}var S=!1,C=-1,w=5,ee=-1;function te(){return g?!0:!(e.unstable_now()-ee<w)}function ne(){if(g=!1,S){var t=e.unstable_now();ee=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&te());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ae(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?re():S=!1}}}var re;if(typeof y==`function`)re=function(){y(ne)};else if(typeof MessageChannel<`u`){var T=new MessageChannel,ie=T.port2;T.port1.onmessage=ne,re=function(){ie.postMessage(null)}}else re=function(){_(ne,0)};function ae(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,ae(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,re()))),r},e.unstable_shouldYield=te,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.8`})),m=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),ee=Symbol.for(`react.suspense`),te=Symbol.for(`react.suspense_list`),ne=Symbol.for(`react.memo`),re=Symbol.for(`react.lazy`),T=Symbol.for(`react.activity`),ie=Symbol.for(`react.memo_cache_sentinel`),ae=Symbol.iterator;function oe(e){return typeof e!=`object`||!e?null:(e=ae&&e[ae]||e[`@@iterator`],typeof e==`function`?e:null)}var se=Symbol.for(`react.client.reference`);function ce(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===se?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case ee:return`Suspense`;case te:return`SuspenseList`;case T:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case ne:return t=e.displayName||null,t===null?ce(e.type)||`Memo`:t;case re:t=e._payload,e=e._init;try{return ce(e(t))}catch{}}return null}var le=Array.isArray,E=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,D=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ue={pending:!1,data:null,method:null,action:null},de=[],fe=-1;function pe(e){return{current:e}}function me(e){0>fe||(e.current=de[fe],de[fe]=null,fe--)}function O(e,t){fe++,de[fe]=e.current,e.current=t}var he=pe(null),ge=pe(null),_e=pe(null),ve=pe(null);function ye(e,t){switch(O(_e,t),O(ge,e),O(he,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}me(he),O(he,e)}function be(){me(he),me(ge),me(_e)}function xe(e){e.memoizedState!==null&&O(ve,e);var t=he.current,n=Hd(t,e.type);t!==n&&(O(ge,e),O(he,n))}function Se(e){ge.current===e&&(me(he),me(ge)),ve.current===e&&(me(ve),Qf._currentValue=ue)}var Ce,we;function Te(e){if(Ce===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Ce=t&&t[1]||``,we=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Ce+e+we}var Ee=!1;function De(e,t){if(!e||Ee)return``;Ee=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ee=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Te(n):``}function Oe(e,t){switch(e.tag){case 26:case 27:case 5:return Te(e.type);case 16:return Te(`Lazy`);case 13:return e.child!==t&&t!==null?Te(`Suspense Fallback`):Te(`Suspense`);case 19:return Te(`SuspenseList`);case 0:case 15:return De(e.type,!1);case 11:return De(e.type.render,!1);case 1:return De(e.type,!0);case 31:return Te(`Activity`);default:return``}}function ke(e){try{var t=``,n=null;do t+=Oe(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ae=Object.prototype.hasOwnProperty,je=t.unstable_scheduleCallback,Me=t.unstable_cancelCallback,Ne=t.unstable_shouldYield,Pe=t.unstable_requestPaint,Fe=t.unstable_now,Ie=t.unstable_getCurrentPriorityLevel,Le=t.unstable_ImmediatePriority,Re=t.unstable_UserBlockingPriority,ze=t.unstable_NormalPriority,Be=t.unstable_LowPriority,Ve=t.unstable_IdlePriority,He=t.log,Ue=t.unstable_setDisableYieldValue,We=null,Ge=null;function Ke(e){if(typeof He==`function`&&Ue(e),Ge&&typeof Ge.setStrictMode==`function`)try{Ge.setStrictMode(We,e)}catch{}}var qe=Math.clz32?Math.clz32:Xe,Je=Math.log,Ye=Math.LN2;function Xe(e){return e>>>=0,e===0?32:31-(Je(e)/Ye|0)|0}var Ze=256,Qe=262144,$e=4194304;function et(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function tt(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=et(n))):i=et(o):i=et(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=et(n))):i=et(o)):i=et(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function nt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function rt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function it(){var e=$e;return $e<<=1,!($e&62914560)&&($e=4194304),e}function at(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ot(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function st(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-qe(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&ct(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function ct(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-qe(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function lt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-qe(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function ut(e,t){var n=t&-t;return n=n&42?1:dt(n),(n&(e.suspendedLanes|t))===0?n:0}function dt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ft(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function pt(){var e=D.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function mt(e,t){var n=D.p;try{return D.p=e,t()}finally{D.p=n}}var ht=Math.random().toString(36).slice(2),gt=`__reactFiber$`+ht,_t=`__reactProps$`+ht,vt=`__reactContainer$`+ht,yt=`__reactEvents$`+ht,bt=`__reactListeners$`+ht,xt=`__reactHandles$`+ht,St=`__reactResources$`+ht,Ct=`__reactMarker$`+ht;function wt(e){delete e[gt],delete e[_t],delete e[yt],delete e[bt],delete e[xt]}function Tt(e){var t=e[gt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[vt]||n[gt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[gt])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function Et(e){if(e=e[gt]||e[vt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Dt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Ot(e){var t=e[St];return t||=e[St]={hoistableStyles:new Map,hoistableScripts:new Map},t}function kt(e){e[Ct]=!0}var At=new Set,jt={};function Mt(e,t){Nt(e,t),Nt(e+`Capture`,t)}function Nt(e,t){for(jt[e]=t,e=0;e<t.length;e++)At.add(t[e])}var Pt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Ft={},It={};function Lt(e){return Ae.call(It,e)?!0:Ae.call(Ft,e)?!1:Pt.test(e)?It[e]=!0:(Ft[e]=!0,!1)}function Rt(e,t,n){if(Lt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}}function zt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Bt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Vt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Ht(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Ut(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Wt(e){if(!e._valueTracker){var t=Ht(e)?`checked`:`value`;e._valueTracker=Ut(e,t,``+e[t])}}function Gt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Ht(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}function Kt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var qt=/[\n"\\]/g;function k(e){return e.replace(qt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Jt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Vt(t)):e.value!==``+Vt(t)&&(e.value=``+Vt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Xt(e,o,Vt(n)):Xt(e,o,Vt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Vt(s):e.removeAttribute(`name`)}function Yt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Wt(e);return}n=n==null?``:``+Vt(n),t=t==null?n:``+Vt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Wt(e)}function Xt(e,t,n){t===`number`&&Kt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Zt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Vt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Qt(e,t,n){if(t!=null&&(t=``+Vt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Vt(n)}function $t(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(le(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Vt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Wt(e)}function en(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var tn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function nn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||tn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function rn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&nn(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&nn(e,o,t[o])}function an(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var on=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),sn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function cn(e){return sn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function ln(){}var un=null;function dn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var fn=null,pn=null;function mn(e){var t=Et(e);if(t&&(e=t.stateNode)){var n=e[_t]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Jt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+k(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[_t]||null;if(!a)throw Error(i(90));Jt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Gt(r)}break a;case`textarea`:Qt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Zt(e,!!n.multiple,t,!1)}}}var hn=!1;function gn(e,t,n){if(hn)return e(t,n);hn=!0;try{return e(t)}finally{if(hn=!1,(fn!==null||pn!==null)&&(bu(),fn&&(t=fn,e=pn,pn=fn=null,mn(t),e)))for(t=0;t<e.length;t++)mn(e[t])}}function _n(e,t){var n=e.stateNode;if(n===null)return null;var r=n[_t]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var vn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),yn=!1;if(vn)try{var bn={};Object.defineProperty(bn,"passive",{get:function(){yn=!0}}),window.addEventListener(`test`,bn,bn),window.removeEventListener(`test`,bn,bn)}catch{yn=!1}var xn=null,Sn=null,Cn=null;function wn(){if(Cn)return Cn;var e,t=Sn,n=t.length,r,i=`value`in xn?xn.value:xn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Cn=i.slice(e,1<r?1-r:void 0)}function Tn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function En(){return!0}function Dn(){return!1}function On(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?En:Dn,this.isPropagationStopped=Dn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=En)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=En)},persist:function(){},isPersistent:En}),t}var kn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},An=On(kn),jn=h({},kn,{view:0,detail:0}),Mn=On(jn),Nn,Pn,Fn,In=h({},jn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:qn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Fn&&(Fn&&e.type===`mousemove`?(Nn=e.screenX-Fn.screenX,Pn=e.screenY-Fn.screenY):Pn=Nn=0,Fn=e),Nn)},movementY:function(e){return`movementY`in e?e.movementY:Pn}}),Ln=On(In),Rn=On(h({},In,{dataTransfer:0})),zn=On(h({},jn,{relatedTarget:0})),Bn=On(h({},kn,{animationName:0,elapsedTime:0,pseudoElement:0})),Vn=On(h({},kn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Hn=On(h({},kn,{data:0})),Un={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Wn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Gn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Kn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Gn[e])?!!t[e]:!1}function qn(){return Kn}var Jn=On(h({},jn,{key:function(e){if(e.key){var t=Un[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Tn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Wn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:qn,charCode:function(e){return e.type===`keypress`?Tn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Tn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Yn=On(h({},In,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Xn=On(h({},jn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:qn})),Zn=On(h({},kn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Qn=On(h({},In,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),$n=On(h({},kn,{newState:0,oldState:0})),er=[9,13,27,32],tr=vn&&`CompositionEvent`in window,nr=null;vn&&`documentMode`in document&&(nr=document.documentMode);var rr=vn&&`TextEvent`in window&&!nr,ir=vn&&(!tr||nr&&8<nr&&11>=nr),ar=` `,or=!1;function sr(e,t){switch(e){case`keyup`:return er.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function cr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var lr=!1;function ur(e,t){switch(e){case`compositionend`:return cr(t);case`keypress`:return t.which===32?(or=!0,ar):null;case`textInput`:return e=t.data,e===ar&&or?null:e;default:return null}}function dr(e,t){if(lr)return e===`compositionend`||!tr&&sr(e,t)?(e=wn(),Cn=Sn=xn=null,lr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return ir&&t.locale!==`ko`?null:t.data;default:return null}}var fr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function pr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!fr[e.type]:t===`textarea`}function mr(e,t,n,r){fn?pn?pn.push(r):pn=[r]:fn=r,t=Ed(t,`onChange`),0<t.length&&(n=new An(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var A=null,hr=null;function gr(e){yd(e,0)}function _r(e){if(Gt(Dt(e)))return e}function vr(e,t){if(e===`change`)return t}var yr=!1;if(vn){var br;if(vn){var xr=`oninput`in document;if(!xr){var Sr=document.createElement(`div`);Sr.setAttribute(`oninput`,`return;`),xr=typeof Sr.oninput==`function`}br=xr}else br=!1;yr=br&&(!document.documentMode||9<document.documentMode)}function j(){A&&(A.detachEvent(`onpropertychange`,Cr),hr=A=null)}function Cr(e){if(e.propertyName===`value`&&_r(hr)){var t=[];mr(t,hr,e,dn(e)),gn(gr,t)}}function wr(e,t,n){e===`focusin`?(j(),A=t,hr=n,A.attachEvent(`onpropertychange`,Cr)):e===`focusout`&&j()}function Tr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return _r(hr)}function Er(e,t){if(e===`click`)return _r(t)}function Dr(e,t){if(e===`input`||e===`change`)return _r(t)}function Or(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var kr=typeof Object.is==`function`?Object.is:Or;function Ar(e,t){if(kr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ae.call(t,i)||!kr(e[i],t[i]))return!1}return!0}function jr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Mr(e,t){var n=jr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=jr(n)}}function Nr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Nr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Pr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Kt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Kt(e.document)}return t}function Fr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Ir=vn&&`documentMode`in document&&11>=document.documentMode,Lr=null,Rr=null,zr=null,Br=!1;function Vr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Br||Lr==null||Lr!==Kt(r)||(r=Lr,`selectionStart`in r&&Fr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),zr&&Ar(zr,r)||(zr=r,r=Ed(Rr,`onSelect`),0<r.length&&(t=new An(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Lr)))}function Hr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Ur={animationend:Hr(`Animation`,`AnimationEnd`),animationiteration:Hr(`Animation`,`AnimationIteration`),animationstart:Hr(`Animation`,`AnimationStart`),transitionrun:Hr(`Transition`,`TransitionRun`),transitionstart:Hr(`Transition`,`TransitionStart`),transitioncancel:Hr(`Transition`,`TransitionCancel`),transitionend:Hr(`Transition`,`TransitionEnd`)},Wr={},Gr={};vn&&(Gr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Ur.animationend.animation,delete Ur.animationiteration.animation,delete Ur.animationstart.animation),`TransitionEvent`in window||delete Ur.transitionend.transition);function Kr(e){if(Wr[e])return Wr[e];if(!Ur[e])return e;var t=Ur[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Gr)return Wr[e]=t[n];return e}var qr=Kr(`animationend`),Jr=Kr(`animationiteration`),Yr=Kr(`animationstart`),M=Kr(`transitionrun`),Xr=Kr(`transitionstart`),Zr=Kr(`transitioncancel`),Qr=Kr(`transitionend`),$r=new Map,ei=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);ei.push(`scrollEnd`);function ti(e,t){$r.set(e,t),Mt(t,[e])}var ni=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ri=[],ii=0,ai=0;function oi(){for(var e=ii,t=ai=ii=0;t<e;){var n=ri[t];ri[t++]=null;var r=ri[t];ri[t++]=null;var i=ri[t];ri[t++]=null;var a=ri[t];if(ri[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ui(n,i,a)}}function si(e,t,n,r){ri[ii++]=e,ri[ii++]=t,ri[ii++]=n,ri[ii++]=r,ai|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function ci(e,t,n,r){return si(e,t,n,r),di(e)}function li(e,t){return si(e,null,null,t),di(e)}function ui(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-qe(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function di(e){if(50<du)throw du=0,fu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var fi={};function pi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function mi(e,t,n,r){return new pi(e,t,n,r)}function hi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function gi(e,t){var n=e.alternate;return n===null?(n=mi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function _i(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function vi(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)hi(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,he.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case T:return e=mi(31,n,t,a),e.elementType=T,e.lanes=o,e;case y:return yi(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=mi(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case ee:return e=mi(13,n,t,a),e.elementType=ee,e.lanes=o,e;case te:return e=mi(19,n,t,a),e.elementType=te,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case ne:s=14;break a;case re:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=mi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function yi(e,t,n,r){return e=mi(7,e,r,t),e.lanes=n,e}function bi(e,t,n){return e=mi(6,e,null,t),e.lanes=n,e}function xi(e){var t=mi(18,null,null,0);return t.stateNode=e,t}function Si(e,t,n){return t=mi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Ci=new WeakMap;function wi(e,t){if(typeof e==`object`&&e){var n=Ci.get(e);return n===void 0?(t={value:e,source:t,stack:ke(t)},Ci.set(e,t),t):n}return{value:e,source:t,stack:ke(t)}}var Ti=[],Ei=0,Di=null,Oi=0,ki=[],Ai=0,ji=null,Mi=1,N=``;function Ni(e,t){Ti[Ei++]=Oi,Ti[Ei++]=Di,Di=e,Oi=t}function Pi(e,t,n){ki[Ai++]=Mi,ki[Ai++]=N,ki[Ai++]=ji,ji=e;var r=Mi;e=N;var i=32-qe(r)-1;r&=~(1<<i),n+=1;var a=32-qe(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Mi=1<<32-qe(t)+i|n<<i|r,N=a+e}else Mi=1<<a|n<<i|r,N=e}function Fi(e){e.return!==null&&(Ni(e,1),Pi(e,1,0))}function Ii(e){for(;e===Di;)Di=Ti[--Ei],Ti[Ei]=null,Oi=Ti[--Ei],Ti[Ei]=null;for(;e===ji;)ji=ki[--Ai],ki[Ai]=null,N=ki[--Ai],ki[Ai]=null,Mi=ki[--Ai],ki[Ai]=null}function P(e,t){ki[Ai++]=Mi,ki[Ai++]=N,ki[Ai++]=ji,Mi=t.id,N=t.overflow,ji=e}var F=null,I=null,L=!1,Li=null,Ri=!1,zi=Error(i(519));function Bi(e){throw Ki(wi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),zi}function Vi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[gt]=e,t[_t]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Yt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),$t(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=ln),t=!0):t=!1,t||Bi(e,!0)}function Hi(e){for(F=e.return;F;)switch(F.tag){case 5:case 31:case 13:Ri=!1;return;case 27:case 3:Ri=!0;return;default:F=F.return}}function Ui(e){if(e!==F)return!1;if(!L)return Hi(e),L=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||Ud(e.type,e.memoizedProps)),n=!n),n&&I&&Bi(e),Hi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));I=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));I=uf(e)}else t===27?(t=I,Zd(e.type)?(e=lf,lf=null,I=e):I=t):I=F?cf(e.stateNode.nextSibling):null;return!0}function Wi(){I=F=null,L=!1}function Gi(){var e=Li;return e!==null&&(Zl===null?Zl=e:Zl.push.apply(Zl,e),Li=null),e}function Ki(e){Li===null?Li=[e]:Li.push(e)}var qi=pe(null),Ji=null,Yi=null;function Xi(e,t,n){O(qi,t._currentValue),t._currentValue=n}function Zi(e){e._currentValue=qi.current,me(qi)}function Qi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function $i(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Qi(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Qi(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function ea(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;kr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===ve.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&$i(t,e,n,r),t.flags|=262144}function ta(e){for(e=e.firstContext;e!==null;){if(!kr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function na(e){Ji=e,Yi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ra(e){return aa(Ji,e)}function ia(e,t){return Ji===null&&na(e),aa(e,t)}function aa(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Yi===null){if(e===null)throw Error(i(308));Yi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Yi=Yi.next=t;return n}var oa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},sa=t.unstable_scheduleCallback,ca=t.unstable_NormalPriority,R={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function la(){return{controller:new oa,data:new Map,refCount:0}}function ua(e){e.refCount--,e.refCount===0&&sa(ca,function(){e.controller.abort()})}var da=null,fa=0,pa=0,ma=null;function ha(e,t){if(da===null){var n=da=[];fa=0,pa=dd(),ma={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return fa++,t.then(ga,ga),t}function ga(){if(--fa===0&&da!==null){ma!==null&&(ma.status=`fulfilled`);var e=da;da=null,pa=0,ma=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function _a(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var va=E.S;E.S=function(e,t){eu=Fe(),typeof t==`object`&&t&&typeof t.then==`function`&&ha(e,t),va!==null&&va(e,t)};var ya=pe(null);function ba(){var e=ya.current;return e===null?K.pooledCache:e}function xa(e,t){t===null?O(ya,ya.current):O(ya,t.pool)}function Sa(){var e=ba();return e===null?null:{parent:R._currentValue,pool:e}}var Ca=Error(i(460)),wa=Error(i(474)),Ta=Error(i(542)),Ea={then:function(){}};function Da(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Oa(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(ln,ln),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ma(e),e;default:if(typeof t.status==`string`)t.then(ln,ln);else{if(e=K,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ma(e),e}throw Aa=t,Ca}}function ka(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Aa=e,Ca):e}}var Aa=null;function ja(){if(Aa===null)throw Error(i(459));var e=Aa;return Aa=null,e}function Ma(e){if(e===Ca||e===Ta)throw Error(i(483))}var Na=null,Pa=0;function Fa(e){var t=Pa;return Pa+=1,Na===null&&(Na=[]),Oa(Na,e,t)}function Ia(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function La(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Ra(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=gi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=bi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===re&&ka(i)===t.type)?(t=a(t,n.props),Ia(t,n),t.return=e,t):(t=vi(n.type,n.key,n.props,null,e.mode,r),Ia(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Si(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=yi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=bi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=vi(t.type,t.key,t.props,null,e.mode,n),Ia(n,t),n.return=e,n;case v:return t=Si(t,e.mode,n),t.return=e,t;case re:return t=ka(t),f(e,t,n)}if(le(t)||oe(t))return t=yi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Fa(t),n);if(t.$$typeof===C)return f(e,ia(e,t),n);La(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case re:return n=ka(n),p(e,t,n,r)}if(le(n)||oe(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Fa(n),r);if(n.$$typeof===C)return p(e,t,ia(e,n),r);La(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case re:return r=ka(r),m(e,t,n,r,i)}if(le(r)||oe(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Fa(r),i);if(r.$$typeof===C)return m(e,t,n,ia(t,r),i);La(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),L&&Ni(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return L&&Ni(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),L&&Ni(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),L&&Ni(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return L&&Ni(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),L&&Ni(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===re&&ka(l)===r.type){n(e,r.sibling),c=a(r,o.props),Ia(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===y?(c=yi(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=vi(o.type,o.key,o.props,null,e.mode,c),Ia(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Si(o,e.mode,c),c.return=e,e=c}return s(e);case re:return o=ka(o),b(e,r,o,c)}if(le(o))return h(e,r,o,c);if(oe(o)){if(l=oe(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Fa(o),c);if(o.$$typeof===C)return b(e,r,ia(e,o),c);La(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=bi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Pa=0;var i=b(e,t,n,r);return Na=null,i}catch(t){if(t===Ca||t===Ta)throw t;var a=mi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var za=Ra(!0),Ba=Ra(!1),Va=!1;function Ha(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ua(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Wa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ga(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,G&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=di(e),ui(e,null,n),t}return si(e,r,t,n),di(e)}function Ka(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,lt(e,n)}}function qa(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Ja=!1;function Ya(){if(Ja){var e=ma;if(e!==null)throw e}}function Xa(e,t,n,r){Ja=!1;var i=e.updateQueue;Va=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(J&f)===f:(r&f)===f){f!==0&&f===pa&&(Ja=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Va=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Gl|=o,e.lanes=o,e.memoizedState=d}}function Za(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Qa(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Za(n[e],t)}var $a=pe(null),eo=pe(0);function to(e,t){e=Wl,O(eo,e),O($a,t),Wl=e|t.baseLanes}function no(){O(eo,Wl),O($a,$a.current)}function ro(){Wl=eo.current,me($a),me(eo)}var io=pe(null),ao=null;function oo(e){var t=e.alternate;O(z,z.current&1),O(io,e),ao===null&&(t===null||$a.current!==null||t.memoizedState!==null)&&(ao=e)}function so(e){O(z,z.current),O(io,e),ao===null&&(ao=e)}function co(e){e.tag===22?(O(z,z.current),O(io,e),ao===null&&(ao=e)):lo(e)}function lo(){O(z,z.current),O(io,io.current)}function uo(e){me(io),ao===e&&(ao=null),me(z)}var z=pe(0);function fo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var po=0,B=null,V=null,mo=null,ho=!1,go=!1,_o=!1,vo=0,yo=0,bo=null,xo=0;function H(){throw Error(i(321))}function So(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!kr(e[n],t[n]))return!1;return!0}function Co(e,t,n,r,i,a){return po=a,B=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,E.H=e===null||e.memoizedState===null?Bs:Vs,_o=!1,a=n(r,i),_o=!1,go&&(a=To(t,n,r,i)),wo(e),a}function wo(e){E.H=zs;var t=V!==null&&V.next!==null;if(po=0,mo=V=B=null,ho=!1,yo=0,bo=null,t)throw Error(i(300));e===null||ic||(e=e.dependencies,e!==null&&ta(e)&&(ic=!0))}function To(e,t,n,r){B=e;var a=0;do{if(go&&(bo=null),yo=0,go=!1,25<=a)throw Error(i(301));if(a+=1,mo=V=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}E.H=Hs,o=t(n,r)}while(go);return o}function Eo(){var e=E.H,t=e.useState()[0];return t=typeof t.then==`function`?No(t):t,e=e.useState()[0],(V===null?null:V.memoizedState)!==e&&(B.flags|=1024),t}function Do(){var e=vo!==0;return vo=0,e}function Oo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function ko(e){if(ho){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}ho=!1}po=0,mo=V=B=null,go=!1,yo=vo=0,bo=null}function Ao(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return mo===null?B.memoizedState=mo=e:mo=mo.next=e,mo}function jo(){if(V===null){var e=B.alternate;e=e===null?null:e.memoizedState}else e=V.next;var t=mo===null?B.memoizedState:mo.next;if(t!==null)mo=t,V=e;else{if(e===null)throw B.alternate===null?Error(i(467)):Error(i(310));V=e,e={memoizedState:V.memoizedState,baseState:V.baseState,baseQueue:V.baseQueue,queue:V.queue,next:null},mo===null?B.memoizedState=mo=e:mo=mo.next=e}return mo}function Mo(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function No(e){var t=yo;return yo+=1,bo===null&&(bo=[]),e=Oa(bo,e,t),t=B,(mo===null?t.memoizedState:mo.next)===null&&(t=t.alternate,E.H=t===null||t.memoizedState===null?Bs:Vs),e}function Po(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return No(e);if(e.$$typeof===C)return ra(e)}throw Error(i(438,String(e)))}function Fo(e){var t=null,n=B.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=B.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Mo(),B.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ie;return t.index++,n}function Io(e,t){return typeof t==`function`?t(e):t}function Lo(e){return Ro(jo(),V,e)}function Ro(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(po&f)===f:(J&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===pa&&(d=!0);else if((po&p)===p){u=u.next,p===pa&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,B.lanes|=p,Gl|=p;f=u.action,_o&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,B.lanes|=f,Gl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!kr(o,e.memoizedState)&&(ic=!0,d&&(n=ma,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function zo(e){var t=jo(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);kr(o,t.memoizedState)||(ic=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Bo(e,t,n){var r=B,a=jo(),o=L;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!kr((V||a).memoizedState,n);if(s&&(a.memoizedState=n,ic=!0),a=a.queue,ds(Uo.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||mo!==null&&mo.memoizedState.tag&1){if(r.flags|=2048,os(9,{destroy:void 0},Ho.bind(null,r,a,n,t),null),K===null)throw Error(i(349));o||po&127||Vo(r,t,n)}return n}function Vo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=B.updateQueue,t===null?(t=Mo(),B.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ho(e,t,n,r){t.value=n,t.getSnapshot=r,Wo(t)&&Go(e)}function Uo(e,t,n){return n(function(){Wo(t)&&Go(e)})}function Wo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!kr(e,n)}catch{return!0}}function Go(e){var t=li(e,2);t!==null&&hu(t,e,2)}function Ko(e){var t=Ao();if(typeof e==`function`){var n=e;if(e=n(),_o){Ke(!0);try{n()}finally{Ke(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Io,lastRenderedState:e},t}function qo(e,t,n,r){return e.baseState=n,Ro(e,V,typeof r==`function`?r:Io)}function Jo(e,t,n,r,a){if(Is(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};E.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Yo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Yo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=E.T,o={};E.T=o;try{var s=n(i,r),c=E.S;c!==null&&c(o,s),Xo(e,t,s)}catch(n){Qo(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),E.T=a}}else try{a=n(i,r),Xo(e,t,a)}catch(n){Qo(e,t,n)}}function Xo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Zo(e,t,n)},function(n){return Qo(e,t,n)}):Zo(e,t,n)}function Zo(e,t,n){t.status=`fulfilled`,t.value=n,$o(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Yo(e,n)))}function Qo(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,$o(t),t=t.next;while(t!==r)}e.action=null}function $o(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function es(e,t){return t}function ts(e,t){if(L){var n=K.formState;if(n!==null){a:{var r=B;if(L){if(I){b:{for(var i=I,a=Ri;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){I=cf(i.nextSibling),r=i.data===`F!`;break a}}Bi(r)}r=!1}r&&(t=n[0])}}return n=Ao(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:es,lastRenderedState:t},n.queue=r,n=Ns.bind(null,B,r),r.dispatch=n,r=Ko(!1),a=Fs.bind(null,B,!1,r.queue),r=Ao(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Jo.bind(null,B,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function ns(e){return rs(jo(),V,e)}function rs(e,t,n){if(t=Ro(e,t,es)[0],e=Lo(Io)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=No(t)}catch(e){throw e===Ca?Ta:e}else r=t;t=jo();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(B.flags|=2048,os(9,{destroy:void 0},is.bind(null,i,n),null)),[r,a,e]}function is(e,t){e.action=t}function as(e){var t=jo(),n=V;if(n!==null)return rs(t,n,e);jo(),t=t.memoizedState,n=jo();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function os(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=B.updateQueue,t===null&&(t=Mo(),B.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ss(){return jo().memoizedState}function cs(e,t,n,r){var i=Ao();B.flags|=e,i.memoizedState=os(1|t,{destroy:void 0},n,r===void 0?null:r)}function ls(e,t,n,r){var i=jo();r=r===void 0?null:r;var a=i.memoizedState.inst;V!==null&&r!==null&&So(r,V.memoizedState.deps)?i.memoizedState=os(t,a,n,r):(B.flags|=e,i.memoizedState=os(1|t,a,n,r))}function us(e,t){cs(8390656,8,e,t)}function ds(e,t){ls(2048,8,e,t)}function fs(e){B.flags|=4;var t=B.updateQueue;if(t===null)t=Mo(),B.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function ps(e){var t=jo().memoizedState;return fs({ref:t,nextImpl:e}),function(){if(G&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function ms(e,t){return ls(4,2,e,t)}function hs(e,t){return ls(4,4,e,t)}function gs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function _s(e,t,n){n=n==null?null:n.concat([e]),ls(4,4,gs.bind(null,t,e),n)}function vs(){}function ys(e,t){var n=jo();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&So(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function bs(e,t){var n=jo();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&So(t,r[1]))return r[0];if(r=e(),_o){Ke(!0);try{e()}finally{Ke(!1)}}return n.memoizedState=[r,t],r}function xs(e,t,n){return n===void 0||po&1073741824&&!(J&261930)?e.memoizedState=t:(e.memoizedState=n,e=mu(),B.lanes|=e,Gl|=e,n)}function Ss(e,t,n,r){return kr(n,t)?n:$a.current===null?!(po&42)||po&1073741824&&!(J&261930)?(ic=!0,e.memoizedState=n):(e=mu(),B.lanes|=e,Gl|=e,t):(e=xs(e,n,r),kr(e,t)||(ic=!0),e)}function Cs(e,t,n,r,i){var a=D.p;D.p=a!==0&&8>a?a:8;var o=E.T,s={};E.T=s,Fs(e,!1,t,n);try{var c=i(),l=E.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Ps(e,t,_a(c,r),pu(e)):Ps(e,t,r,pu(e))}catch(n){Ps(e,t,{then:function(){},status:`rejected`,reason:n},pu())}finally{D.p=a,o!==null&&s.types!==null&&(o.types=s.types),E.T=o}}function ws(){}function Ts(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Es(e).queue;Cs(e,a,t,ue,n===null?ws:function(){return Ds(e),n(r)})}function Es(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ue,baseState:ue,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Io,lastRenderedState:ue},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Io,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Ds(e){var t=Es(e);t.next===null&&(t=e.alternate.memoizedState),Ps(e,t.next.queue,{},pu())}function Os(){return ra(Qf)}function ks(){return jo().memoizedState}function As(){return jo().memoizedState}function js(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=pu();e=Wa(n);var r=Ga(t,e,n);r!==null&&(hu(r,t,n),Ka(r,t,n)),t={cache:la()},e.payload=t;return}t=t.return}}function Ms(e,t,n){var r=pu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Is(e)?Ls(t,n):(n=ci(e,t,n,r),n!==null&&(hu(n,e,r),Rs(n,t,r)))}function Ns(e,t,n){Ps(e,t,n,pu())}function Ps(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Is(e))Ls(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,kr(s,o))return si(e,t,i,0),K===null&&oi(),!1}catch{}if(n=ci(e,t,i,r),n!==null)return hu(n,e,r),Rs(n,t,r),!0}return!1}function Fs(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Is(e)){if(t)throw Error(i(479))}else t=ci(e,n,r,2),t!==null&&hu(t,e,2)}function Is(e){var t=e.alternate;return e===B||t!==null&&t===B}function Ls(e,t){go=ho=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Rs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,lt(e,n)}}var zs={readContext:ra,use:Po,useCallback:H,useContext:H,useEffect:H,useImperativeHandle:H,useLayoutEffect:H,useInsertionEffect:H,useMemo:H,useReducer:H,useRef:H,useState:H,useDebugValue:H,useDeferredValue:H,useTransition:H,useSyncExternalStore:H,useId:H,useHostTransitionStatus:H,useFormState:H,useActionState:H,useOptimistic:H,useMemoCache:H,useCacheRefresh:H};zs.useEffectEvent=H;var Bs={readContext:ra,use:Po,useCallback:function(e,t){return Ao().memoizedState=[e,t===void 0?null:t],e},useContext:ra,useEffect:us,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),cs(4194308,4,gs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return cs(4194308,4,e,t)},useInsertionEffect:function(e,t){cs(4,2,e,t)},useMemo:function(e,t){var n=Ao();t=t===void 0?null:t;var r=e();if(_o){Ke(!0);try{e()}finally{Ke(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Ao();if(n!==void 0){var i=n(t);if(_o){Ke(!0);try{n(t)}finally{Ke(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Ms.bind(null,B,e),[r.memoizedState,e]},useRef:function(e){var t=Ao();return e={current:e},t.memoizedState=e},useState:function(e){e=Ko(e);var t=e.queue,n=Ns.bind(null,B,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:vs,useDeferredValue:function(e,t){return xs(Ao(),e,t)},useTransition:function(){var e=Ko(!1);return e=Cs.bind(null,B,e.queue,!0,!1),Ao().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=B,a=Ao();if(L){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),K===null)throw Error(i(349));J&127||Vo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,us(Uo.bind(null,r,o,e),[e]),r.flags|=2048,os(9,{destroy:void 0},Ho.bind(null,r,o,n,t),null),n},useId:function(){var e=Ao(),t=K.identifierPrefix;if(L){var n=N,r=Mi;n=(r&~(1<<32-qe(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=vo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=xo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Os,useFormState:ts,useActionState:ts,useOptimistic:function(e){var t=Ao();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Fs.bind(null,B,!0,n),n.dispatch=t,[e,t]},useMemoCache:Fo,useCacheRefresh:function(){return Ao().memoizedState=js.bind(null,B)},useEffectEvent:function(e){var t=Ao(),n={impl:e};return t.memoizedState=n,function(){if(G&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Vs={readContext:ra,use:Po,useCallback:ys,useContext:ra,useEffect:ds,useImperativeHandle:_s,useInsertionEffect:ms,useLayoutEffect:hs,useMemo:bs,useReducer:Lo,useRef:ss,useState:function(){return Lo(Io)},useDebugValue:vs,useDeferredValue:function(e,t){return Ss(jo(),V.memoizedState,e,t)},useTransition:function(){var e=Lo(Io)[0],t=jo().memoizedState;return[typeof e==`boolean`?e:No(e),t]},useSyncExternalStore:Bo,useId:ks,useHostTransitionStatus:Os,useFormState:ns,useActionState:ns,useOptimistic:function(e,t){return qo(jo(),V,e,t)},useMemoCache:Fo,useCacheRefresh:As};Vs.useEffectEvent=ps;var Hs={readContext:ra,use:Po,useCallback:ys,useContext:ra,useEffect:ds,useImperativeHandle:_s,useInsertionEffect:ms,useLayoutEffect:hs,useMemo:bs,useReducer:zo,useRef:ss,useState:function(){return zo(Io)},useDebugValue:vs,useDeferredValue:function(e,t){var n=jo();return V===null?xs(n,e,t):Ss(n,V.memoizedState,e,t)},useTransition:function(){var e=zo(Io)[0],t=jo().memoizedState;return[typeof e==`boolean`?e:No(e),t]},useSyncExternalStore:Bo,useId:ks,useHostTransitionStatus:Os,useFormState:as,useActionState:as,useOptimistic:function(e,t){var n=jo();return V===null?(n.baseState=e,[e,n.queue.dispatch]):qo(n,V,e,t)},useMemoCache:Fo,useCacheRefresh:As};Hs.useEffectEvent=ps;function Us(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ws={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Wa(r);i.payload=t,n!=null&&(i.callback=n),t=Ga(e,i,r),t!==null&&(hu(t,e,r),Ka(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Wa(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ga(e,i,r),t!==null&&(hu(t,e,r),Ka(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pu(),r=Wa(n);r.tag=2,t!=null&&(r.callback=t),t=Ga(e,r,n),t!==null&&(hu(t,e,n),Ka(t,e,n))}};function Gs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Ar(n,r)||!Ar(i,a):!0}function Ks(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Ws.enqueueReplaceState(t,t.state,null)}function qs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Js(e){ni(e)}function Ys(e){console.error(e)}function Xs(e){ni(e)}function Zs(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Qs(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function $s(e,t,n){return n=Wa(n),n.tag=3,n.payload={element:null},n.callback=function(){Zs(e,t)},n}function ec(e){return e=Wa(e),e.tag=3,e}function tc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Qs(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Qs(t,n,r),typeof i!=`function`&&(ru===null?ru=new Set([this]):ru.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function nc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&ea(t,n,a,!0),n=io.current,n!==null){switch(n.tag){case 31:case 13:return ao===null?Du():n.alternate===null&&X===0&&(X=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Ea?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,a)),!1;case 22:return n.flags|=65536,r===Ea?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,a)),!1}throw Error(i(435,n.tag))}return Gu(e,r,a),Du(),!1}if(L)return t=io.current,t===null?(r!==zi&&(t=Error(i(423),{cause:r}),Ki(wi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=wi(r,n),a=$s(e.stateNode,r,a),qa(e,a),X!==4&&(X=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==zi&&(e=Error(i(422),{cause:r}),Ki(wi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=wi(o,n),Xl===null?Xl=[o]:Xl.push(o),X!==4&&(X=2),t===null)return!0;r=wi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=$s(n.stateNode,r,e),qa(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(ru===null||!ru.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=ec(a),tc(a,e,n,r),qa(n,a),!1}n=n.return}while(n!==null);return!1}var rc=Error(i(461)),ic=!1;function ac(e,t,n,r){t.child=e===null?Ba(t,null,n,r):za(t,e.child,n,r)}function oc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return na(t),r=Co(e,t,n,o,a,i),s=Do(),e!==null&&!ic?(Oo(e,t,i),Ac(e,t,i)):(L&&s&&Fi(t),t.flags|=1,ac(e,t,r,i),t.child)}function sc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!hi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,cc(e,t,a,r,i)):(e=vi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!jc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Ar:n,n(o,r)&&e.ref===t.ref)return Ac(e,t,i)}return t.flags|=1,e=gi(a,r),e.ref=t.ref,e.return=t,t.child=e}function cc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Ar(a,r)&&e.ref===t.ref){if(ic=!1,t.pendingProps=r=a,jc(e,i))e.flags&131072&&(ic=!0);else return t.lanes=e.lanes,Ac(e,t,i)}}return gc(e,t,n,r,i)}function lc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return dc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&xa(t,a===null?null:a.cachePool),a===null?no():to(t,a),co(t);else return r=t.lanes=536870912,dc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&xa(t,null),no(),lo(t)):(xa(t,a.cachePool),to(t,a),lo(t),t.memoizedState=null);return ac(e,t,i,n),t.child}function uc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function dc(e,t,n,r,i){var a=ba();return a=a===null?null:{parent:R._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&xa(t,null),no(),co(t),e!==null&&ea(e,t,r,!0),t.childLanes=i,null}function fc(e,t){return t=Tc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function pc(e,t,n){return za(t,e.child,null,n),e=fc(t,t.pendingProps),e.flags|=2,uo(t),t.memoizedState=null,e}function mc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(L){if(r.mode===`hidden`)return e=fc(t,r),t.lanes=536870912,uc(null,e);if(so(t),(e=I)?(e=rf(e,Ri),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ji===null?null:{id:Mi,overflow:N},retryLane:536870912,hydrationErrors:null},n=xi(e),n.return=t,t.child=n,F=t,I=null)):e=null,e===null)throw Bi(t);return t.lanes=536870912,null}return fc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(so(t),a){if(t.flags&256)t.flags&=-257,t=pc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(ic||ea(e,t,n,!1),a=(n&e.childLanes)!==0,ic||a){if(r=K,r!==null&&(s=ut(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,li(e,s),hu(r,e,s),rc;Du(),t=pc(e,t,n)}else e=o.treeContext,I=cf(s.nextSibling),F=t,L=!0,Li=null,Ri=!1,e!==null&&P(t,e),t=fc(t,r),t.flags|=4096;return t}return e=gi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function hc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function gc(e,t,n,r,i){return na(t),n=Co(e,t,n,r,void 0,i),r=Do(),e!==null&&!ic?(Oo(e,t,i),Ac(e,t,i)):(L&&r&&Fi(t),t.flags|=1,ac(e,t,n,i),t.child)}function _c(e,t,n,r,i,a){return na(t),t.updateQueue=null,n=To(t,r,n,i),wo(e),r=Do(),e!==null&&!ic?(Oo(e,t,a),Ac(e,t,a)):(L&&r&&Fi(t),t.flags|=1,ac(e,t,n,a),t.child)}function vc(e,t,n,r,i){if(na(t),t.stateNode===null){var a=fi,o=n.contextType;typeof o==`object`&&o&&(a=ra(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Ws,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Ha(t),o=n.contextType,a.context=typeof o==`object`&&o?ra(o):fi,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Us(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Ws.enqueueReplaceState(a,a.state,null),Xa(t,r,a,i),Ya(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=qs(n,s);a.props=c;var l=a.context,u=n.contextType;o=fi,typeof u==`object`&&u&&(o=ra(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Ks(t,a,r,o),Va=!1;var f=t.memoizedState;a.state=f,Xa(t,r,a,i),Ya(),l=t.memoizedState,s||f!==l||Va?(typeof d==`function`&&(Us(t,n,d,r),l=t.memoizedState),(c=Va||Gs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ua(e,t),o=t.memoizedProps,u=qs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=fi,typeof l==`object`&&l&&(c=ra(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Ks(t,a,r,c),Va=!1,f=t.memoizedState,a.state=f,Xa(t,r,a,i),Ya();var p=t.memoizedState;o!==d||f!==p||Va||e!==null&&e.dependencies!==null&&ta(e.dependencies)?(typeof s==`function`&&(Us(t,n,s,r),p=t.memoizedState),(u=Va||Gs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ta(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,hc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=za(t,e.child,null,i),t.child=za(t,null,n,i)):ac(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Ac(e,t,i),e}function yc(e,t,n,r){return Wi(),t.flags|=256,ac(e,t,n,r),t.child}var bc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function xc(e){return{baseLanes:e,cachePool:Sa()}}function Sc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Jl),e}function Cc(e,t,n){var r=t.pendingProps,a=!1,o=!!(t.flags&128),s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:!!(z.current&2)),s&&(a=!0,t.flags&=-129),s=!!(t.flags&32),t.flags&=-33,e===null){if(L){if(a?oo(t):lo(t),(e=I)?(e=rf(e,Ri),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ji===null?null:{id:Mi,overflow:N},retryLane:536870912,hydrationErrors:null},n=xi(e),n.return=t,t.child=n,F=t,I=null)):e=null,e===null)throw Bi(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(lo(t),a=t.mode,c=Tc({mode:`hidden`,children:c},a),r=yi(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=xc(n),r.childLanes=Sc(e,s,n),t.memoizedState=bc,uc(null,r)):(oo(t),wc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(oo(t),t.flags&=-257,t=Ec(e,t,n)):t.memoizedState===null?(lo(t),c=r.fallback,a=t.mode,r=Tc({mode:`visible`,children:r.children},a),c=yi(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,za(t,e.child,null,n),r=t.child,r.memoizedState=xc(n),r.childLanes=Sc(e,s,n),t.memoizedState=bc,t=uc(null,r)):(lo(t),t.child=e.child,t.flags|=128,t=null);else if(oo(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Ki({value:r,source:null,stack:null}),t=Ec(e,t,n)}else if(ic||ea(e,t,n,!1),s=(n&e.childLanes)!==0,ic||s){if(s=K,s!==null&&(r=ut(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,li(e,r),hu(s,e,r),rc;af(c)||Du(),t=Ec(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,I=cf(c.nextSibling),F=t,L=!0,Li=null,Ri=!1,e!==null&&P(t,e),t=wc(t,r.children),t.flags|=4096);return t}return a?(lo(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=gi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=yi(c,a,n,null),c.flags|=2):c=gi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,uc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=xc(n):(a=c.cachePool,a===null?a=Sa():(l=R._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=Sc(e,s,n),t.memoizedState=bc,uc(e.child,r)):(oo(t),n=e.child,e=n.sibling,n=gi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function wc(e,t){return t=Tc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Tc(e,t){return e=mi(22,e,null,t),e.lanes=0,e}function Ec(e,t,n){return za(t,e.child,null,n),e=wc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Dc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Qi(e.return,t,n)}function Oc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function kc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=z.current,s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,O(z,o),ac(e,t,r,n),r=L?Oi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Dc(e,n,t);else if(e.tag===19)Dc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&fo(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Oc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&fo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Oc(t,!0,n,null,a,r);break;case`together`:Oc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Ac(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gl|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(ea(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=gi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=gi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function jc(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&ta(e)))}function Mc(e,t,n){switch(t.tag){case 3:ye(t,t.stateNode.containerInfo),Xi(t,R,e.memoizedState.cache),Wi();break;case 27:case 5:xe(t);break;case 4:ye(t,t.stateNode.containerInfo);break;case 10:Xi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,so(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(oo(t),e=Ac(e,t,n),e===null?null:e.sibling):Cc(e,t,n):(oo(t),t.flags|=128,null);oo(t);break;case 19:var i=!!(e.flags&128);if(r=(n&t.childLanes)!==0,r||=(ea(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return kc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),O(z,z.current),r)break;return null;case 22:return t.lanes=0,lc(e,t,n,t.pendingProps);case 24:Xi(t,R,e.memoizedState.cache)}return Ac(e,t,n)}function Nc(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)ic=!0;else{if(!jc(e,n)&&!(t.flags&128))return ic=!1,Mc(e,t,n);ic=!!(e.flags&131072)}}else ic=!1,L&&t.flags&1048576&&Pi(t,Oi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=ka(t.elementType),t.type=e,typeof e==`function`)hi(e)?(r=qs(e,r),t.tag=1,t=vc(null,t,e,r,n)):(t.tag=0,t=gc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=oc(null,t,e,r,n);break a}if(a===ne){t.tag=14,t=sc(null,t,e,r,n);break a}}throw t=ce(e)||e,Error(i(306,t,``))}}return t;case 0:return gc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=qs(r,t.pendingProps),vc(e,t,r,a,n);case 3:a:{if(ye(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ua(e,t),Xa(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Xi(t,R,r),r!==o.cache&&$i(t,[R],n,!0),Ya(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=yc(e,t,r,n);break a}if(r!==a){a=wi(Error(i(424)),t),Ki(a),t=yc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(I=cf(e.firstChild),F=t,L=!0,Li=null,Ri=!0,n=Ba(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Wi(),r===a){t=Ac(e,t,n);break a}ac(e,t,r,n)}t=t.child}return t;case 26:return hc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:L||(n=t.type,e=t.pendingProps,r=Bd(_e.current).createElement(n),r[gt]=t,r[_t]=e,Pd(r,n,e),kt(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return xe(t),e===null&&L&&(r=t.stateNode=ff(t.type,t.pendingProps,_e.current),F=t,Ri=!0,a=I,Zd(t.type)?(lf=a,I=cf(r.firstChild)):I=a),ac(e,t,t.pendingProps.children,n),hc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&L&&((a=r=I)&&(r=tf(r,t.type,t.pendingProps,Ri),r===null?a=!1:(t.stateNode=r,F=t,I=cf(r.firstChild),Ri=!1,a=!0)),a||Bi(t)),xe(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Co(e,t,Eo,null,null,n),Qf._currentValue=a),hc(e,t),ac(e,t,r,n),t.child;case 6:return e===null&&L&&((e=n=I)&&(n=nf(n,t.pendingProps,Ri),n===null?e=!1:(t.stateNode=n,F=t,I=null,e=!0)),e||Bi(t)),null;case 13:return Cc(e,t,n);case 4:return ye(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=za(t,null,r,n):ac(e,t,r,n),t.child;case 11:return oc(e,t,t.type,t.pendingProps,n);case 7:return ac(e,t,t.pendingProps,n),t.child;case 8:return ac(e,t,t.pendingProps.children,n),t.child;case 12:return ac(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Xi(t,t.type,r.value),ac(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,na(t),a=ra(a),r=r(a),t.flags|=1,ac(e,t,r,n),t.child;case 14:return sc(e,t,t.type,t.pendingProps,n);case 15:return cc(e,t,t.type,t.pendingProps,n);case 19:return kc(e,t,n);case 31:return mc(e,t,n);case 22:return lc(e,t,n,t.pendingProps);case 24:return na(t),r=ra(R),e===null?(a=ba(),a===null&&(a=K,o=la(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Ha(t),Xi(t,R,a)):((e.lanes&n)!==0&&(Ua(e,t),Xa(t,null,null,n),Ya()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Xi(t,R,r),r!==a.cache&&$i(t,[R],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Xi(t,R,r))),ac(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Pc(e){e.flags|=4}function Fc(e,t,n,r,i){if((t=!!(e.mode&32))&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(wu())e.flags|=8192;else throw Aa=Ea,wa}}else e.flags&=-16777217}function Ic(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t)){if(wu())e.flags|=8192;else throw Aa=Ea,wa}}function Lc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:it(),e.lanes|=t,Yl|=t)}function Rc(e,t){if(!L)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function U(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function zc(e,t,n){var r=t.pendingProps;switch(Ii(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return U(t),null;case 1:return U(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Zi(R),be(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Ui(t)?Pc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Gi())),U(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Pc(t),o===null?(U(t),Fc(t,a,null,r,n)):(U(t),Ic(t,o))):o?o===e.memoizedState?(U(t),t.flags&=-16777217):(Pc(t),U(t),Ic(t,o)):(e=e.memoizedProps,e!==r&&Pc(t),U(t),Fc(t,a,e,r,n)),null;case 27:if(Se(t),n=_e.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Pc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return U(t),null}e=he.current,Ui(t)?Vi(t,e):(e=ff(a,r,n),t.stateNode=e,Pc(t))}return U(t),null;case 5:if(Se(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Pc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return U(t),null}if(o=he.current,Ui(t))Vi(t,o);else{var s=Bd(_e.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[gt]=t,o[_t]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Pc(t)}}return U(t),Fc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Pc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=_e.current,Ui(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=F,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[gt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||Bi(t,!0)}else e=Bd(e).createTextNode(r),e[gt]=t,t.stateNode=e}return U(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Ui(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[gt]=t}else Wi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;U(t),e=!1}else n=Gi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(uo(t),t):(uo(t),null);if(t.flags&128)throw Error(i(558))}return U(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Ui(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[gt]=t}else Wi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;U(t),a=!1}else a=Gi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(uo(t),t):(uo(t),null)}return uo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Lc(t,t.updateQueue),U(t),null);case 4:return be(),e===null&&Sd(t.stateNode.containerInfo),U(t),null;case 10:return Zi(t.type),U(t),null;case 19:if(me(z),r=t.memoizedState,r===null)return U(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)Rc(r,!1);else{if(X!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=fo(e),o!==null){for(t.flags|=128,Rc(r,!1),e=o.updateQueue,t.updateQueue=e,Lc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)_i(n,e),n=n.sibling;return O(z,z.current&1|2),L&&Ni(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Fe()>tu&&(t.flags|=128,a=!0,Rc(r,!1),t.lanes=4194304)}}else{if(!a){if(e=fo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Lc(t,e),Rc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!L)return U(t),null}else 2*Fe()-r.renderingStartTime>tu&&n!==536870912&&(t.flags|=128,a=!0,Rc(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(U(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Fe(),e.sibling=null,n=z.current,O(z,a?n&1|2:n&1),L&&Ni(t,r.treeForkCount),e);case 22:case 23:return uo(t),ro(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(U(t),t.subtreeFlags&6&&(t.flags|=8192)):U(t),n=t.updateQueue,n!==null&&Lc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&me(ya),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Zi(R),U(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Bc(e,t){switch(Ii(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Zi(R),be(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Se(t),null;case 31:if(t.memoizedState!==null){if(uo(t),t.alternate===null)throw Error(i(340));Wi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(uo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Wi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return me(z),null;case 4:return be(),null;case 10:return Zi(t.type),null;case 22:case 23:return uo(t),ro(),e!==null&&me(ya),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Zi(R),null;case 25:return null;default:return null}}function Vc(e,t){switch(Ii(t),t.tag){case 3:Zi(R),be();break;case 26:case 27:case 5:Se(t);break;case 4:be();break;case 31:t.memoizedState!==null&&uo(t);break;case 13:uo(t);break;case 19:me(z);break;case 10:Zi(t.type);break;case 22:case 23:uo(t),ro(),e!==null&&me(ya);break;case 24:Zi(R)}}function Hc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Uc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Wc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Qa(t,n)}catch(t){Z(e,e.return,t)}}}function Gc(e,t,n){n.props=qs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Kc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function qc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}}function Jc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Yc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[_t]=t}catch(t){Z(e,e.return,t)}}function Xc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Zc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Xc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Qc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ln));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Qc(e,t,n),e=e.sibling;e!==null;)Qc(e,t,n),e=e.sibling}function $c(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for($c(e,t,n),e=e.sibling;e!==null;)$c(e,t,n),e=e.sibling}function el(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[gt]=e,t[_t]=n}catch(t){Z(e,e.return,t)}}var tl=!1,nl=!1,rl=!1,il=typeof WeakSet==`function`?WeakSet:Set,al=null;function ol(e,t){if(e=e.containerInfo,Rd=sp,e=Pr(e),Fr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,al=t;al!==null;)if(t=al,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,al=e;else for(;al!==null;){switch(t=al,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=qs(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,al=e;break}al=t.return}}function sl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:xl(e,n),r&4&&Hc(5,n);break;case 1:if(xl(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=qs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}}r&64&&Wc(n),r&512&&Kc(n,n.return);break;case 3:if(xl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Qa(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&el(n);case 26:case 5:xl(e,n),t===null&&r&4&&Jc(n),r&512&&Kc(n,n.return);break;case 12:xl(e,n);break;case 31:xl(e,n),r&4&&fl(e,n);break;case 13:xl(e,n),r&4&&pl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||tl,!r){t=t!==null&&t.memoizedState!==null||nl,i=tl;var a=nl;tl=r,(nl=t)&&!a?Cl(e,n,!!(n.subtreeFlags&8772)):xl(e,n),tl=i,nl=a}break;case 30:break;default:xl(e,n)}}function cl(e){var t=e.alternate;t!==null&&(e.alternate=null,cl(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&wt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var W=null,ll=!1;function ul(e,t,n){for(n=n.child;n!==null;)dl(e,t,n),n=n.sibling}function dl(e,t,n){if(Ge&&typeof Ge.onCommitFiberUnmount==`function`)try{Ge.onCommitFiberUnmount(We,n)}catch{}switch(n.tag){case 26:nl||qc(n,t),ul(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:nl||qc(n,t);var r=W,i=ll;Zd(n.type)&&(W=n.stateNode,ll=!1),ul(e,t,n),pf(n.stateNode),W=r,ll=i;break;case 5:nl||qc(n,t);case 6:if(r=W,i=ll,W=null,ul(e,t,n),W=r,ll=i,W!==null){if(ll)try{(W.nodeType===9?W.body:W.nodeName===`HTML`?W.ownerDocument.body:W).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{W.removeChild(n.stateNode)}catch(e){Z(n,t,e)}}break;case 18:W!==null&&(ll?(e=W,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(W,n.stateNode));break;case 4:r=W,i=ll,W=n.stateNode.containerInfo,ll=!0,ul(e,t,n),W=r,ll=i;break;case 0:case 11:case 14:case 15:Uc(2,n,t),nl||Uc(4,n,t),ul(e,t,n);break;case 1:nl||(qc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Gc(n,t,r)),ul(e,t,n);break;case 21:ul(e,t,n);break;case 22:nl=(r=nl)||n.memoizedState!==null,ul(e,t,n),nl=r;break;default:ul(e,t,n)}}function fl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function pl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function ml(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new il),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new il),t;default:throw Error(i(435,e.tag))}}function hl(e,t){var n=ml(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function gl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){W=c.stateNode,ll=!1;break a}break;case 5:W=c.stateNode,ll=!1;break a;case 3:case 4:W=c.stateNode.containerInfo,ll=!0;break a}c=c.return}if(W===null)throw Error(i(160));dl(o,s,a),W=null,ll=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)vl(t,e),t=t.sibling}var _l=null;function vl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:gl(t,e),yl(e),r&4&&(Uc(3,e,e.return),Hc(3,e),Uc(5,e,e.return));break;case 1:gl(t,e),yl(e),r&512&&(nl||n===null||qc(n,n.return)),r&64&&tl&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=_l;if(gl(t,e),yl(e),r&512&&(nl||n===null||qc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null){if(r===null){if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[Ct]||o[gt]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[gt]=e,kt(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[gt]=e,kt(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode)}else e.stateNode=If(a,r,e.memoizedProps)}else o===r?r===null&&e.stateNode!==null&&Yc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:gl(t,e),yl(e),r&512&&(nl||n===null||qc(n,n.return)),n!==null&&r&4&&Yc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(gl(t,e),yl(e),r&512&&(nl||n===null||qc(n,n.return)),e.flags&32){a=e.stateNode;try{en(a,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Yc(e,a,n===null?a:n.memoizedProps)),r&1024&&(rl=!0);break;case 6:if(gl(t,e),yl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Bf=null,a=_l,_l=gf(t.containerInfo),gl(t,e),_l=a,yl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}rl&&(rl=!1,bl(e));break;case 4:r=_l,_l=gf(e.stateNode.containerInfo),gl(t,e),yl(e),_l=r;break;case 12:gl(t,e),yl(e);break;case 31:gl(t,e),yl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,hl(e,r)));break;case 13:gl(t,e),yl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&($l=Fe()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,hl(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=tl,d=nl;if(tl=u||a,nl=d||l,gl(t,e),nl=d,tl=u,yl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||tl||nl||Sl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,hl(e,n))));break;case 19:gl(t,e),yl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,hl(e,r)));break;case 30:break;case 21:break;default:gl(t,e),yl(e)}}function yl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Xc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;$c(e,Zc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(en(o,``),n.flags&=-33),$c(e,Zc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Qc(e,Zc(e),s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function bl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;bl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function xl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)sl(e,t.alternate,t),t=t.sibling}function Sl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Uc(4,t,t.return),Sl(t);break;case 1:qc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Gc(t,t.return,n),Sl(t);break;case 27:pf(t.stateNode);case 26:case 5:qc(t,t.return),Sl(t);break;case 22:t.memoizedState===null&&Sl(t);break;case 30:Sl(t);break;default:Sl(t)}e=e.sibling}}function Cl(e,t,n){for(n&&=!!(t.subtreeFlags&8772),t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:Cl(i,a,n),Hc(4,a);break;case 1:if(Cl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Za(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Wc(a),Kc(a,a.return);break;case 27:el(a);case 26:case 5:Cl(i,a,n),n&&r===null&&o&4&&Jc(a),Kc(a,a.return);break;case 12:Cl(i,a,n);break;case 31:Cl(i,a,n),n&&o&4&&fl(i,a);break;case 13:Cl(i,a,n),n&&o&4&&pl(i,a);break;case 22:a.memoizedState===null&&Cl(i,a,n),Kc(a,a.return);break;case 30:break;default:Cl(i,a,n)}t=t.sibling}}function wl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ua(n))}function Tl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ua(e))}function El(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Dl(e,t,n,r),t=t.sibling}function Dl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:El(e,t,n,r),i&2048&&Hc(9,t);break;case 1:El(e,t,n,r);break;case 3:El(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ua(e)));break;case 12:if(i&2048){El(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else El(e,t,n,r);break;case 31:El(e,t,n,r);break;case 13:El(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?El(e,t,n,r):(a._visibility|=2,Ol(e,t,n,r,!!(t.subtreeFlags&10256)||!1)):a._visibility&2?El(e,t,n,r):kl(e,t),i&2048&&wl(o,t);break;case 24:El(e,t,n,r),i&2048&&Tl(t.alternate,t);break;default:El(e,t,n,r)}}function Ol(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Ol(a,o,s,c,i),Hc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Ol(a,o,s,c,i)):u._visibility&2?Ol(a,o,s,c,i):kl(a,o),i&&l&2048&&wl(o.alternate,o);break;case 24:Ol(a,o,s,c,i),i&&l&2048&&Tl(o.alternate,o);break;default:Ol(a,o,s,c,i)}t=t.sibling}}function kl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:kl(n,r),i&2048&&wl(r.alternate,r);break;case 24:kl(n,r),i&2048&&Tl(r.alternate,r);break;default:kl(n,r)}t=t.sibling}}var Al=8192;function jl(e,t,n){if(e.subtreeFlags&Al)for(e=e.child;e!==null;)Ml(e,t,n),e=e.sibling}function Ml(e,t,n){switch(e.tag){case 26:jl(e,t,n),e.flags&Al&&e.memoizedState!==null&&Gf(n,_l,e.memoizedState,e.memoizedProps);break;case 5:jl(e,t,n);break;case 3:case 4:var r=_l;_l=gf(e.stateNode.containerInfo),jl(e,t,n),_l=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Al,Al=16777216,jl(e,t,n),Al=r):jl(e,t,n));break;default:jl(e,t,n)}}function Nl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Pl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];al=r,Ll(r,e)}Nl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Fl(e),e=e.sibling}function Fl(e){switch(e.tag){case 0:case 11:case 15:Pl(e),e.flags&2048&&Uc(9,e,e.return);break;case 3:Pl(e);break;case 12:Pl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Il(e)):Pl(e);break;default:Pl(e)}}function Il(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];al=r,Ll(r,e)}Nl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Uc(8,t,t.return),Il(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Il(t));break;default:Il(t)}e=e.sibling}}function Ll(e,t){for(;al!==null;){var n=al;switch(n.tag){case 0:case 11:case 15:Uc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ua(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,al=r;else a:for(n=e;al!==null;){r=al;var i=r.sibling,a=r.return;if(cl(r),r===n){al=null;break a}if(i!==null){i.return=a,al=i;break a}al=a}}}var Rl={getCacheForType:function(e){var t=ra(R),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return ra(R).controller.signal}},zl=typeof WeakMap==`function`?WeakMap:Map,G=0,K=null,q=null,J=0,Y=0,Bl=null,Vl=!1,Hl=!1,Ul=!1,Wl=0,X=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=null,Zl=null,Ql=!1,$l=0,eu=0,tu=1/0,nu=null,ru=null,iu=0,au=null,ou=null,su=0,cu=0,lu=null,uu=null,du=0,fu=null;function pu(){return G&2&&J!==0?J&-J:E.T===null?pt():dd()}function mu(){if(Jl===0){if(!(J&536870912)||L){var e=Qe;Qe<<=1,!(Qe&3932160)&&(Qe=262144),Jl=e}else Jl=536870912}return e=io.current,e!==null&&(e.flags|=32),Jl}function hu(e,t,n){(e===K&&(Y===2||Y===9)||e.cancelPendingCommit!==null)&&(Su(e,0),yu(e,J,Jl,!1)),ot(e,n),(!(G&2)||e!==K)&&(e===K&&(!(G&2)&&(Kl|=n),X===4&&yu(e,J,Jl,!1)),rd(e))}function gu(e,t,n){if(G&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||nt(e,t),a=r?Au(e,t):Ou(e,t,!0),o=r;do{if(a===0){Hl&&!r&&yu(e,t,0,!1);break}if(n=e.current.alternate,o&&!vu(n)){a=Ou(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Xl;var l=c.current.memoizedState.isDehydrated;if(l&&(Su(c,s).flags|=256),s=Ou(c,s,!1),s!==2){if(Ul&&!l){c.errorRecoveryDisabledLanes|=o,Kl|=o,a=4;break a}o=Zl,Zl=a,o!==null&&(Zl===null?Zl=o:Zl.push.apply(Zl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Su(e,0),yu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:yu(r,t,Jl,!Vl);break a;case 2:Zl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=$l+300-Fe(),10<a)){if(yu(r,t,Jl,!Vl),tt(r,0,!0)!==0)break a;su=t,r.timeoutHandle=Kd(_u.bind(null,r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Vl,o,`Throttled`,-0,0),a);break a}_u(r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Vl,o,null,-0,0)}break}while(1);rd(e)}function _u(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ln},Ml(t,a,d);var m=(a&62914560)===a?$l-Fe():(a&4194048)===a?eu-Fe():0;if(m=qf(d,m),m!==null){su=a,e.cancelPendingCommit=m(Lu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),yu(e,a,o,!l);return}}Lu(e,t,a,n,r,i,o,s,c)}function vu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!kr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yu(e,t,n,r){t&=~ql,t&=~Kl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-qe(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&ct(e,n,t)}function bu(){return G&6?!0:(id(0,!1),!1)}function xu(){if(q!==null){if(Y===0)var e=q.return;else e=q,Yi=Ji=null,ko(e),Na=null,Pa=0,e=q;for(;e!==null;)Vc(e.alternate,e),e=e.return;q=null}}function Su(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),su=0,xu(),K=e,q=n=gi(e.current,null),J=t,Y=0,Bl=null,Vl=!1,Hl=nt(e,t),Ul=!1,Yl=Jl=ql=Kl=Gl=X=0,Zl=Xl=null,Ql=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-qe(r),a=1<<i;t|=e[i],r&=~a}return Wl=t,oi(),n}function Cu(e,t){B=null,E.H=zs,t===Ca||t===Ta?(t=ja(),Y=3):t===wa?(t=ja(),Y=4):Y=t===rc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Bl=t,q===null&&(X=1,Zs(e,wi(t,e.current)))}function wu(){var e=io.current;return e===null?!0:(J&4194048)===J?ao===null:(J&62914560)===J||J&536870912?e===ao:!1}function Tu(){var e=E.H;return E.H=zs,e===null?zs:e}function Eu(){var e=E.A;return E.A=Rl,e}function Du(){X=4,Vl||(J&4194048)!==J&&io.current!==null||(Hl=!0),!(Gl&134217727)&&!(Kl&134217727)||K===null||yu(K,J,Jl,!1)}function Ou(e,t,n){var r=G;G|=2;var i=Tu(),a=Eu();(K!==e||J!==t)&&(nu=null,Su(e,t)),t=!1;var o=X;a:do try{if(Y!==0&&q!==null){var s=q,c=Bl;switch(Y){case 8:xu(),o=6;break a;case 3:case 2:case 9:case 6:io.current===null&&(t=!0);var l=Y;if(Y=0,Bl=null,Pu(e,s,c,l),n&&Hl){o=0;break a}break;default:l=Y,Y=0,Bl=null,Pu(e,s,c,l)}}ku(),o=X;break}catch(t){Cu(e,t)}while(1);return t&&e.shellSuspendCounter++,Yi=Ji=null,G=r,E.H=i,E.A=a,q===null&&(K=null,J=0,oi()),o}function ku(){for(;q!==null;)Mu(q)}function Au(e,t){var n=G;G|=2;var r=Tu(),a=Eu();K!==e||J!==t?(nu=null,tu=Fe()+500,Su(e,t)):Hl=nt(e,t);a:do try{if(Y!==0&&q!==null){t=q;var o=Bl;b:switch(Y){case 1:Y=0,Bl=null,Pu(e,t,o,1);break;case 2:case 9:if(Da(o)){Y=0,Bl=null,Nu(t);break}t=function(){Y!==2&&Y!==9||K!==e||(Y=7),rd(e)},o.then(t,t);break a;case 3:Y=7;break a;case 4:Y=5;break a;case 7:Da(o)?(Y=0,Bl=null,Nu(t)):(Y=0,Bl=null,Pu(e,t,o,7));break;case 5:var s=null;switch(q.tag){case 26:s=q.memoizedState;case 5:case 27:var c=q;if(s?Wf(s):c.stateNode.complete){Y=0,Bl=null;var l=c.sibling;if(l!==null)q=l;else{var u=c.return;u===null?q=null:(q=u,Fu(u))}break b}}Y=0,Bl=null,Pu(e,t,o,5);break;case 6:Y=0,Bl=null,Pu(e,t,o,6);break;case 8:xu(),X=6;break a;default:throw Error(i(462))}}ju();break}catch(t){Cu(e,t)}while(1);return Yi=Ji=null,E.H=r,E.A=a,G=n,q===null?(K=null,J=0,oi(),X):0}function ju(){for(;q!==null&&!Ne();)Mu(q)}function Mu(e){var t=Nc(e.alternate,e,Wl);e.memoizedProps=e.pendingProps,t===null?Fu(e):q=t}function Nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=_c(n,t,t.pendingProps,t.type,void 0,J);break;case 11:t=_c(n,t,t.pendingProps,t.type.render,t.ref,J);break;case 5:ko(t);default:Vc(n,t),t=q=_i(t,Wl),t=Nc(n,t,Wl)}e.memoizedProps=e.pendingProps,t===null?Fu(e):q=t}function Pu(e,t,n,r){Yi=Ji=null,ko(t),Na=null,Pa=0;var i=t.return;try{if(nc(e,i,t,n,J)){X=1,Zs(e,wi(n,e.current)),q=null;return}}catch(t){if(i!==null)throw q=i,t;X=1,Zs(e,wi(n,e.current)),q=null;return}t.flags&32768?(L||r===1?e=!0:Hl||J&536870912?e=!1:(Vl=e=!0,(r===2||r===9||r===3||r===6)&&(r=io.current,r!==null&&r.tag===13&&(r.flags|=16384))),Iu(t,e)):Fu(t)}function Fu(e){var t=e;do{if(t.flags&32768){Iu(t,Vl);return}e=t.return;var n=zc(t.alternate,t,Wl);if(n!==null){q=n;return}if(t=t.sibling,t!==null){q=t;return}q=t=e}while(t!==null);X===0&&(X=5)}function Iu(e,t){do{var n=Bc(e.alternate,e);if(n!==null){n.flags&=32767,q=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){q=e;return}q=e=n}while(e!==null);X=6,q=null}function Lu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Hu();while(iu!==0);if(G&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=ai,st(e,n,o,s,c,l),e===K&&(q=K=null,J=0),ou=t,au=e,su=n,cu=o,lu=a,uu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(ze,function(){return Uu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=E.T,E.T=null,a=D.p,D.p=2,s=G,G|=4;try{ol(e,t,n)}finally{G=s,D.p=a,E.T=r}}iu=1,Ru(),zu(),Bu()}}function Ru(){if(iu===1){iu=0;var e=au,t=ou,n=!!(t.flags&13878);if(t.subtreeFlags&13878||n){n=E.T,E.T=null;var r=D.p;D.p=2;var i=G;G|=4;try{vl(t,e);var a=zd,o=Pr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Nr(s.ownerDocument.documentElement,s)){if(c!==null&&Fr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Mr(s,h),v=Mr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{G=i,D.p=r,E.T=n}}e.current=t,iu=2}}function zu(){if(iu===2){iu=0;var e=au,t=ou,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=E.T,E.T=null;var r=D.p;D.p=2;var i=G;G|=4;try{sl(e,t.alternate,t)}finally{G=i,D.p=r,E.T=n}}iu=3}}function Bu(){if(iu===4||iu===3){iu=0,Pe();var e=au,t=ou,n=su,r=uu;t.subtreeFlags&10256||t.flags&10256?iu=5:(iu=0,ou=au=null,Vu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(ru=null),ft(n),t=t.stateNode,Ge&&typeof Ge.onCommitFiberRoot==`function`)try{Ge.onCommitFiberRoot(We,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=E.T,i=D.p,D.p=2,E.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{E.T=t,D.p=i}}su&3&&Hu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===fu?du++:(du=0,fu=e):du=0,id(0,!1)}}function Vu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ua(t)))}function Hu(){return Ru(),zu(),Bu(),Uu()}function Uu(){if(iu!==5)return!1;var e=au,t=cu;cu=0;var n=ft(su),r=E.T,a=D.p;try{D.p=32>n?32:n,E.T=null,n=lu,lu=null;var o=au,s=su;if(iu=0,ou=au=null,su=0,G&6)throw Error(i(331));var c=G;if(G|=4,Fl(o.current),Dl(o,o.current,s,n),G=c,id(0,!1),Ge&&typeof Ge.onPostCommitFiberRoot==`function`)try{Ge.onPostCommitFiberRoot(We,o)}catch{}return!0}finally{D.p=a,E.T=r,Vu(e,t)}}function Wu(e,t,n){t=wi(n,t),t=$s(e.stateNode,t,2),e=Ga(e,t,2),e!==null&&(ot(e,2),rd(e))}function Z(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(ru===null||!ru.has(r))){e=wi(n,e),n=ec(2),r=Ga(t,n,2),r!==null&&(tc(n,r,t,e),ot(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new zl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Ul=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,K===e&&(J&n)===n&&(X===4||X===3&&(J&62914560)===J&&300>Fe()-$l?!(G&2)&&Su(e,0):ql|=n,Yl===J&&(Yl=0)),rd(e)}function qu(e,t){t===0&&(t=it()),e=li(e,t),e!==null&&(ot(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return je(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-qe(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=J,a=tt(r,r===K?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||nt(r,a)||(n=!0,ld(r,a))}r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=Fe(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}iu!==0&&iu!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-qe(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=rt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=K,n=J,n=tt(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Y===2||Y===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Me(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||nt(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Me(r),ft(n)){case 2:case 8:n=Re;break;case 32:n=ze;break;case 268435456:n=Ve;break;default:n=ze}return r=cd.bind(null,e),n=je(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Me(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(iu!==0&&iu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Hu()&&e.callbackNode!==n)return null;var r=J;return r=tt(e,e===K?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(gu(e,r,t),sd(e,Fe()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Hu())return null;gu(e,t,!0)}function ud(){Yd(function(){G&6?je(Le,ad):od()})}function dd(){if(nd===0){var e=pa;e===0&&(e=Ze,Ze<<=1,!(Ze&261888)&&(Ze=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:cn(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[_t]||null).action),o=r.submitter;o&&(t=(t=o[_t]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new An(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);Ts(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),Ts(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<ei.length;hd++){var gd=ei[hd];ti(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}ti(qr,`onAnimationEnd`),ti(Jr,`onAnimationIteration`),ti(Yr,`onAnimationStart`),ti(`dblclick`,`onDoubleClick`),ti(`focusin`,`onFocus`),ti(`focusout`,`onBlur`),ti(M,`onTransitionRun`),ti(Xr,`onTransitionStart`),ti(Zr,`onTransitionCancel`),ti(Qr,`onTransitionEnd`),Nt(`onMouseEnter`,[`mouseout`,`mouseover`]),Nt(`onMouseLeave`,[`mouseout`,`mouseover`]),Nt(`onPointerEnter`,[`pointerout`,`pointerover`]),Nt(`onPointerLeave`,[`pointerout`,`pointerover`]),Mt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Mt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Mt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Mt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Mt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Mt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ni(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ni(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[yt];n===void 0&&(n=t[yt]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,At.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!yn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=Tt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}gn(function(){var r=a,i=dn(n),s=[];a:{var c=$r.get(e);if(c!==void 0){var l=An,u=e;switch(e){case`keypress`:if(Tn(n)===0)break a;case`keydown`:case`keyup`:l=Jn;break;case`focusin`:u=`focus`,l=zn;break;case`focusout`:u=`blur`,l=zn;break;case`beforeblur`:case`afterblur`:l=zn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Ln;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Rn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Xn;break;case qr:case Jr:case Yr:l=Bn;break;case Qr:l=Zn;break;case`scroll`:case`scrollend`:l=Mn;break;case`wheel`:l=Qn;break;case`copy`:case`cut`:case`paste`:l=Vn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Yn;break;case`toggle`:case`beforetoggle`:l=$n}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=_n(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==un&&(u=n.relatedTarget||n.fromElement)&&(Tt(u)||u[vt]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?Tt(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=Ln,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Yn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:Dt(l),h=u==null?c:Dt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,Tt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Dd,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Od(s,c,l,d,!1),u!==null&&f!==null&&Od(s,f,u,d,!0)}}a:{if(c=r?Dt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=vr;else if(pr(c)){if(yr)v=Dr;else{v=Tr;var y=wr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&an(r.elementType)&&(v=vr):v=Er;if(v&&=v(e,r)){mr(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Xt(c,`number`,c.value)}switch(y=r?Dt(r):window,e){case`focusin`:(pr(y)||y.contentEditable===`true`)&&(Lr=y,Rr=r,zr=null);break;case`focusout`:zr=Rr=Lr=null;break;case`mousedown`:Br=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Br=!1,Vr(s,n,i);break;case`selectionchange`:if(Ir)break;case`keydown`:case`keyup`:Vr(s,n,i)}var b;if(tr)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else lr?sr(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(ir&&n.locale!==`ko`&&(lr||x!==`onCompositionStart`?x===`onCompositionEnd`&&lr&&(b=wn()):(xn=i,Sn=`value`in xn?xn.value:xn.textContent,lr=!0)),y=Ed(r,x),0<y.length&&(x=new Hn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=cr(n),b!==null&&(x.data=b)))),(b=rr?ur(e,n):dr(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new Hn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),md(s,e,r,n,i)}yd(s,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=_n(e,n),i!=null&&r.unshift(Td(e,i,a)),i=_n(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=_n(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=_n(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||en(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&en(e,``+r);break;case`className`:zt(e,`class`,r);break;case`tabIndex`:zt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:zt(e,n,r);break;case`style`:rn(e,r,o);break;case`data`:if(t!==`object`){zt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=cn(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=cn(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=ln);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=cn(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Rt(e,`popover`,r);break;case`xlinkActuate`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Bt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Bt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Bt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Rt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=on.get(n)||n,Rt(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:rn(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?en(e,r):(typeof r==`number`||typeof r==`bigint`)&&en(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=ln);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!jt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[_t]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Rt(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}Yt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Zt(e,!!r,n,!0):Zt(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}$t(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(an(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Jt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Zt(e,!!n,n?[]:``,!1):Zt(e,!!n,t,!0)):Zt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}Qt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(an(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e!==Wd&&(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Ct]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body)}n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),wt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[Ct])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);wt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=D.d;D.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=bu();return e||t}function yf(e){var t=Et(e);t!==null&&t.tag===5&&t.type===`form`?Ds(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=k(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),kt(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+k(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+k(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+k(n.imageSizes)+`"]`)):i+=`[href="`+k(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),kt(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+k(r)+`"][href="`+k(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),kt(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=Ot(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);kt(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=Ot(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),kt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=Ot(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),kt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=_e.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=Ot(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=Ot(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=Ot(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+k(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),kt(t),e.head.appendChild(t))}function Pf(e){return`[src="`+k(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+k(n.href)+`"]`);if(r)return t.instance=r,kt(r),r;var a=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),kt(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,kt(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),kt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,kt(a),a):(r=n,(a=mf.get(o))&&(r=h({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),kt(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Ct]||a[gt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,kt(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),kt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:ue,_currentValue2:ue,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=at(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=at(0),this.hiddenUpdates=at(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=mi(3,null,null,t),e.current=a,a.stateNode=e,t=la(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Ha(a),e}function tp(e){return e?(e=fi,e):fi}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Wa(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Ga(e,r,t),n!==null&&(hu(n,e,t),Ka(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=li(e,67108864);t!==null&&hu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=pu();t=dt(t);var n=li(e,t);n!==null&&hu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=E.T;E.T=null;var a=D.p;try{D.p=2,up(e,t,n,r)}finally{D.p=a,E.T=i}}function lp(e,t,n,r){var i=E.T;E.T=null;var a=D.p;try{D.p=8,up(e,t,n,r)}finally{D.p=a,E.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=Et(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=et(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-qe(o);s.entanglements[1]|=c,o&=~c}rd(a),!(G&6)&&(tu=Fe()+500,id(0,!1))}}break;case 31:case 13:s=li(a,2),s!==null&&hu(s,a,2),bu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=dn(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=Tt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ie()){case Le:return 2;case Re:return 8;case ze:case Be:return 32;case Ve:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Et(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=Tt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,mt(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,mt(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);un=r,n.target.dispatchEvent(r),un=null}else return t=Et(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=Et(n);a!==null&&(e.splice(t,3),t-=3,Ts(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[_t]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[_t]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,pu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),bu(),t[vt]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=pt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.8`)throw Error(i(527,Lp,`19.2.8`));D.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.8`,rendererPackageName:`react-dom`,currentDispatcherRef:E,reconcilerVersion:`19.2.8`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{We=zp.inject(Rp),Ge=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Js,s=Ys,c=Xs;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[vt]=t.current,Sd(e),new Fp(t)}})),g=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=c(u(),1),v=g(),y=`modulepreload`,b=function(e){return`/interview/`+e},x={},S=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=b(t,n),t=s(t),t in x)return;x[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:y,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},C=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,w=/^[\\/]{2}/;function ee(e,t){return t+e.replace(/\\/g,`/`)}var te=`popstate`;function ne(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function re(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return se(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:ce(t)}return E(t,n,null,e)}function T(e,t){if(e===!1||e==null)throw Error(t)}function ie(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function ae(){return Math.random().toString(36).substring(2,10)}function oe(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function se(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?le(t):t,state:n,key:t&&t.key||r||ae(),mask:i}}function ce({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function le(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function E(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=ne(e)?e:se(h.location,e,t);n&&n(r,e),l=u()+1;let d=oe(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=ne(e)?e:se(h.location,e,t);n&&n(r,e),l=u();let i=oe(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return D(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(te,d),c=e,()=>{i.removeEventListener(te,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function D(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),T(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:ce(t);return i=i.replace(/ $/,`%20`),!n&&w.test(i)&&(i=r+i),new URL(i,r)}function ue(e,t,n=`/`){return de(e,t,n,!1)}function de(e,t,n,r,i){let a=ke((typeof t==`string`?le(t):t).pathname||`/`,n);if(a==null)return null;let o=i??fe(e),s=null,c=Oe(a);for(let e=0;s==null&&e<o.length;++e)s=we(o[e],c,r);return s}function fe(e){let t=pe(e);return O(t),t}function pe(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;T(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=Le([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(T(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),pe(e.children,t,u,l,o)),(e.path!=null||e.index)&&t.push({path:l,score:Se(l,e.index),routesMeta:u.map((e,t)=>{let[n,r]=De(e.relativePath,e.caseSensitive,t===u.length-1);return{...e,matcher:n,compiledParams:r}})})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of me(e.path))a(e,t,!0,n)}),t}function me(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=me(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function O(e){e.sort((e,t)=>e.score===t.score?Ce(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var he=/^:[\w-]+$/,ge=3,_e=2,ve=1,ye=10,be=-2,xe=e=>e===`*`;function Se(e,t){let n=e.split(`/`),r=n.length;return n.some(xe)&&(r+=be),t&&(r+=_e),n.filter(e=>!xe(e)).reduce((e,t)=>e+(he.test(t)?ge:t===``?ve:ye),r)}function Ce(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function we(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u={path:s.relativePath,caseSensitive:s.caseSensitive,end:c},d=s.matcher&&s.compiledParams?Ee(u,l,s.matcher,s.compiledParams):Te(u,l),f=s.route;if(!d&&c&&n&&!r[r.length-1].route.index&&(d=Te({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:Le([a,d.pathname]),pathnameBase:ze(Le([a,d.pathnameBase])),route:f}),d.pathnameBase!==`/`&&(a=Le([a,d.pathnameBase]))}return o}function Te(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=De(e.path,e.caseSensitive,e.end);return Ee(e,t,n,r)}function Ee(e,t,n,r){let i=t.match(n);if(!i)return null;let a=i[0],o=Re(a,1),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=Re(a.slice(0,a.length-e.length),1)}let i=s[r];return e[t]=n&&!i?void 0:(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function De(e,t=!1,n=!0){ie(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function Oe(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return ie(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function ke(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}function Ae(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?le(e):e,a;return n?(n=Ie(n),a=n.startsWith(`/`)||n.startsWith(`\\`)?je(n.substring(1),`/`):je(n,t)):a=t,{pathname:a,search:Be(r),hash:Ve(i)}}function je(e,t){let n=Re(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function Me(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ne(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Pe(e){let t=Ne(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Fe(e,t,n,r=!1){let i;typeof e==`string`?i=le(e):(i={...e},T(!i.pathname||!i.pathname.includes(`?`),Me(`?`,`pathname`,`search`,i)),T(!i.pathname||!i.pathname.includes(`#`),Me(`#`,`pathname`,`hash`,i)),T(!i.search||!i.search.includes(`#`),Me(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Ae(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var Ie=e=>e.replace(/[\\/]{2,}/g,`/`),Le=e=>Ie(e.join(`/`));function Re(e,t=0){let n=e.length;for(;n>t&&e.charCodeAt(n-1)===47;)n--;return n===e.length?e:e.slice(0,n)}var ze=e=>Re(e).replace(/^\/*/,`/`),Be=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Ve=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,He=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Ue(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function We(e){return Le(e.map(e=>e.route.path).filter(Boolean))||`/`}var Ge=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Ke(e,t){let n=e;if(typeof n!=`string`||!C.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(Ge)try{let e=new URL(window.location.href),r=w.test(n)?new URL(ee(n,e.protocol)):new URL(n),a=ke(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{ie(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var qe=new URL(`http://localhost`);function Je(e){if(e.createURL)return e.createURL(`/`);try{return new URL(e.createHref(`/`),qe)}catch{return qe}}function Ye(e,t){return e.origin===t.origin&&(e.origin!==`null`||e.protocol===t.protocol&&e.host===t.host)}function Xe(e,t){if(e.startsWith(`//`))return!0;let n=t.protocol.toLowerCase();return e.toLowerCase().startsWith(n)?t.host===``||e.slice(n.length).startsWith(`//`):!1}function Ze(e,t,n,r){let i=null;try{i=e==null?null:new URL(e,n)}catch{}let a=new URL(t,n),o=i!=null&&!Ye(i,n),s=!Ye(a,n);if(r===`reject`){if(o||s)throw Error(`External navigation is not allowed`)}else if(s&&(i==null||!Xe(e,i)||!Ye(i,a)))throw Error(`External navigation is not allowed`)}var Qe=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(Qe);var $e=[`GET`,...Qe];new Set($e);var et=[`about:`,`blob:`,`chrome:`,`chrome-untrusted:`,`content:`,`data:`,`devtools:`,`file:`,`filesystem:`,`javascript:`];function tt(e){try{return et.includes(new URL(e).protocol)}catch{return!1}}var nt=_.createContext(null);nt.displayName=`DataRouter`;var rt=_.createContext(null);rt.displayName=`DataRouterState`;var it=_.createContext(!1);function at(){return _.useContext(it)}var ot=_.createContext({isTransitioning:!1});ot.displayName=`ViewTransition`;var st=_.createContext(new Map);st.displayName=`Fetchers`;var ct=_.createContext(null);ct.displayName=`Await`;var lt=_.createContext(null);lt.displayName=`Navigation`;var ut=_.createContext(null);ut.displayName=`Location`;var dt=_.createContext({outlet:null,matches:[],isDataRoute:!1});dt.displayName=`Route`;var ft=_.createContext(null);ft.displayName=`RouteError`;var pt=`REACT_ROUTER_ERROR`,mt=`REDIRECT`,ht=`ROUTE_ERROR_RESPONSE`;function gt(e){if(e.startsWith(`${pt}:${mt}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function _t(e){if(e.startsWith(`${pt}:${ht}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new He(t.status,t.statusText,t.data)}catch{}}function vt(e,{relative:t}={}){T(yt(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=_.useContext(lt),{hash:i,pathname:a,search:o}=Et(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:Le([n,a])),r.createHref({pathname:s,search:o,hash:i})}function yt(){return _.useContext(ut)!=null}function bt(){return T(yt(),`useLocation() may be used only in the context of a <Router> component.`),_.useContext(ut).location}var xt=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function St(e){_.useContext(lt).static||_.useLayoutEffect(e)}function Ct(){let{isDataRoute:e}=_.useContext(dt);return e?Ut():wt()}function wt(){T(yt(),`useNavigate() may be used only in the context of a <Router> component.`);let e=_.useContext(nt),{basename:t,navigator:n}=_.useContext(lt),{matches:r}=_.useContext(dt),{pathname:i}=bt(),a=JSON.stringify(Pe(r)),o=_.useRef(!1);return St(()=>{o.current=!0}),_.useCallback((r,s={})=>{if(ie(o.current,xt),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=Fe(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:Le([t,c.pathname])),Ze(typeof r==`string`?r:ce(r),n.createHref(c),Je(n),`reject`),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}_.createContext(null);function Tt(){let{matches:e}=_.useContext(dt);return e[e.length-1]?.params??{}}function Et(e,{relative:t}={}){let{matches:n}=_.useContext(dt),{pathname:r}=bt(),i=JSON.stringify(Pe(n));return _.useMemo(()=>Fe(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function Dt(e,t){return Ot(e,t)}function Ot(e,t,n){T(yt(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=_.useContext(lt),{matches:i}=_.useContext(dt),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Gt(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=bt(),d;if(t){let e=typeof t==`string`?le(t):t;T(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):ue(e,{pathname:p});ie(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),ie(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=Ft(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:Le([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:Le([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?_.createElement(ut.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function kt(){let e=Ht(),t=Ue(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=_.createElement(_.Fragment,null,_.createElement(`p`,null,`💿 Hey developer 👋`),_.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,_.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,_.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),_.createElement(_.Fragment,null,_.createElement(`h2`,null,`Unexpected Application Error!`),_.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?_.createElement(`pre`,{style:i},n):null,o)}var At=_.createElement(kt,null),jt=class extends _.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=_t(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:_.createElement(dt.Provider,{value:this.props.routeContext},_.createElement(ft.Provider,{value:e,children:this.props.component}));return this.context?_.createElement(Nt,{error:e},t):t}};jt.contextType=it;var Mt=new WeakMap;function Nt({children:e,error:t}){let{basename:n,navigator:r}=_.useContext(lt);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=gt(t.digest);if(e){let i=Mt.get(t);if(i)throw i;let a=Ke(e.location,n),o=a.absoluteURL||a.to;if(Ze(e.location,o,Je(r),`allow-explicit`),tt(o))throw Error(`Invalid redirect location`);if(Ge&&!Mt.get(t)){if(a.isExternal||e.reloadDocument)window.location.href=o;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(a.to,{replace:e.replace}));throw Mt.set(t,n),n}}return _.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${o}`})}}return e}function Pt({routeContext:e,match:t,children:n}){let r=_.useContext(nt);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),_.createElement(dt.Provider,{value:e},n)}function Ft(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);T(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:We(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||At,o&&(s<0&&c===0?(Gt(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?_.createElement(n.route.Component,null):n.route.element?n.route.element:e,_.createElement(Pt,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?_.createElement(jt,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function It(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Lt(e){let t=_.useContext(nt);return T(t,It(e)),t}function Rt(e){let t=_.useContext(rt);return T(t,It(e)),t}function zt(e){let t=_.useContext(dt);return T(t,It(e)),t}function Bt(e){let t=zt(e),n=t.matches[t.matches.length-1];return T(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Vt(){return Bt(`useRouteId`)}function Ht(){let e=_.useContext(ft),t=Rt(`useRouteError`),n=Bt(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Ut(){let{router:e}=Lt(`useNavigate`),t=Bt(`useNavigate`),n=_.useRef(!1);return St(()=>{n.current=!0}),_.useCallback(async(r,i={})=>{ie(n.current,xt),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Wt={};function Gt(e,t,n){!t&&!Wt[e]&&(Wt[e]=!0,ie(!1,n))}_.memo(Kt);function Kt({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return Ot(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function qt({to:e,replace:t,state:n,relative:r}){T(yt(),`<Navigate> may be used only in the context of a <Router> component.`);let{static:i,navigator:a}=_.useContext(lt);ie(!i,`<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`);let{matches:o}=_.useContext(dt),{pathname:s}=bt(),c=Ct(),l=Fe(e,Pe(o),s,r===`path`);Ze(typeof e==`string`?e:ce(e),a.createHref(l),Je(a),`reject`);let u=JSON.stringify(l);return _.useEffect(()=>{c(JSON.parse(u),{replace:t,state:n,relative:r})},[c,u,r,t,n]),null}function k(e){T(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function Jt({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){T(!yt(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=_.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=le(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=_.useMemo(()=>{let e=ke(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return ie(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:_.createElement(lt.Provider,{value:c},_.createElement(ut.Provider,{children:t,value:h}))}function Yt({children:e,location:t}){return Dt(Xt(e),t)}_.Component;function Xt(e,t=[]){let n=[];return _.Children.forEach(e,(e,r)=>{if(!_.isValidElement(e))return;let i=[...t,r];if(e.type===_.Fragment){n.push.apply(n,Xt(e.props.children,i));return}T(e.type===k,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),T(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Xt(e.props.children,i)),n.push(a)}),n}var Zt=`get`,Qt=`application/x-www-form-urlencoded`;function $t(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function en(e){return $t(e)&&e.tagName.toLowerCase()===`button`}function tn(e){return $t(e)&&e.tagName.toLowerCase()===`form`}function nn(e){return $t(e)&&e.tagName.toLowerCase()===`input`}function rn(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function an(e,t){return e.button===0&&(!t||t===`_self`)&&!rn(e)}var on=null;function sn(){if(on===null)try{new FormData(document.createElement(`form`),0),on=!1}catch{on=!0}return on}var cn=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function ln(e){return e!=null&&!cn.has(e)?(ie(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Qt}"`),null):e}function un(e,t){let n,r,i,a,o;if(tn(e)){let o=e.getAttribute(`action`);r=o?ke(o,t):null,n=e.getAttribute(`method`)||Zt,i=ln(e.getAttribute(`enctype`))||Qt,a=new FormData(e)}else if(en(e)||nn(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?ke(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Zt,i=ln(e.getAttribute(`formenctype`))||ln(o.getAttribute(`enctype`))||Qt,a=new FormData(o,e),!sn()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if($t(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Zt,r=null,i=Qt,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);function dn(e,t){if(e===!1||e==null)throw Error(t)}function fn(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return i.pathname=n?i.pathname.endsWith(`/`)?`${i.pathname}_.${r}`:`${i.pathname}.${r}`:i.pathname===`/`?`_root.${r}`:t&&ke(i.pathname,t)===`/`?`${Re(t)}/_root.${r}`:`${Re(i.pathname)}.${r}`,i}async function pn(e,t){if(e.id in t)return t[e.id];try{let n=await S(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function mn(e){return e!=null&&typeof e.page==`string`}function hn(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function gn(e,t,n){return xn((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await pn(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(hn).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function _n(e,t,n,r,i,a){let o=(e,t)=>!n[t]||e.route.id!==n[t].route.id,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function vn(e,t,{includeHydrateFallback:n}={}){return yn(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function yn(e){return[...new Set(e)]}function bn(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function xn(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!mn(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(bn(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function Sn(){let e=_.useContext(nt);return dn(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function Cn(){let e=_.useContext(rt);return dn(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var wn=_.createContext(void 0);wn.displayName=`FrameworkContext`;function Tn(){let e=_.useContext(wn);return dn(e,`You must render this element inside a <HydratedRouter> element`),e}function En(e,t){let n=_.useContext(wn),[r,i]=_.useState(!1),[a,o]=_.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=_.useRef(null);_.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),_.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:Dn(s,p),onBlur:Dn(c,m),onMouseEnter:Dn(l,p),onMouseLeave:Dn(u,m),onTouchStart:Dn(d,p)}]:[a,f,{}]:[!1,f,{}]}function Dn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function On({page:e,...t}){let n=at(),{nonce:r}=Tn(),{router:i}=Sn(),a=_.useMemo(()=>ue(i.routes,e,i.basename),[i.routes,e,i.basename]);return a?(t.nonce==null&&r&&(t={...t,nonce:r}),n?_.createElement(An,{page:e,matches:a,...t}):_.createElement(jn,{page:e,matches:a,...t})):null}function kn(e){let{manifest:t,routeModules:n}=Tn(),[r,i]=_.useState([]);return _.useEffect(()=>{let r=!1;return gn(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function An({page:e,matches:t,...n}){let r=bt(),{future:i}=Tn(),{basename:a}=Sn(),o=_.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=fn(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return _.createElement(_.Fragment,null,o.map(e=>_.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function jn({page:e,matches:t,...n}){let r=bt(),{future:i,manifest:a,routeModules:o}=Tn(),{basename:s}=Sn(),{loaderData:c,matches:l}=Cn(),u=_.useMemo(()=>_n(e,t,l,a,r,`data`),[e,t,l,a,r]),d=_.useMemo(()=>_n(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=_.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];t&&t.hasLoader&&(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=fn(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=_.useMemo(()=>vn(d,a),[d,a]),m=kn(d);return _.createElement(_.Fragment,null,f.map(e=>_.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>_.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>_.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function Mn(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}_.Component;var Nn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{Nn&&(window.__reactRouterVersion=`7.18.3`)}catch{}function Pn({basename:e,children:t,useTransitions:n,window:r}){let i=_.useRef();i.current??=re({window:r,v5Compat:!0});let a=i.current,[o,s]=_.useState({action:a.action,location:a.location}),c=_.useCallback(e=>{n===!1?s(e):_.startTransition(()=>s(e))},[n]);return _.useLayoutEffect(()=>a.listen(c),[a,c]),_.createElement(Jt,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}var Fn=_.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:v}=_.useContext(lt),y=typeof l==`string`&&C.test(l),b=Ke(l,h);l=b.to;let x=vt(l,{relative:r}),S=bt(),w=null;if(o){let e=Fe(o,[],S.mask?S.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:Le([h,e.pathname])),w=g.createHref(e)}let[ee,te,ne]=En(n,p),re=Bn(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:v});function T(t){e&&e(t),t.defaultPrevented||re(t)}let ie=!(b.isExternal||i),ae=_.createElement(`a`,{...p,...ne,href:(ie?w:void 0)||b.absoluteURL||x,onClick:ie?T:e,ref:Mn(m,te),target:c,"data-discover":!y&&t===`render`?`true`:void 0});return ee&&!y?_.createElement(_.Fragment,null,ae,_.createElement(On,{page:x})):ae});Fn.displayName=`Link`;var In=_.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=Et(a,{relative:c.relative}),d=bt(),f=_.useContext(rt),{navigator:p,basename:m}=_.useContext(lt),h=f!=null&&Gn(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,v=d.pathname,y=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(v=v.toLowerCase(),y=y?y.toLowerCase():null,g=g.toLowerCase()),y&&m&&(y=ke(y,m)||y);let b=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,x=v===g||!r&&v.startsWith(g)&&v.charAt(b)===`/`,S=y!=null&&(y===g||!r&&y.startsWith(g)&&y.charAt(g.length)===`/`),C={isActive:x,isPending:S,isTransitioning:h},w=x?e:void 0,ee;ee=typeof n==`function`?n(C):[n,x?`active`:null,S?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let te=typeof i==`function`?i(C):i;return _.createElement(Fn,{...c,"aria-current":w,className:ee,ref:l,style:te,to:a,viewTransition:o},typeof s==`function`?s(C):s)});In.displayName=`NavLink`;var Ln=_.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Zt,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=_.useContext(lt),g=Un(),v=Wn(s,{relative:l}),y=o.toLowerCase()===`get`?`get`:`post`,b=typeof s==`string`&&C.test(s);return _.createElement(`form`,{ref:m,method:y,action:v,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?_.startTransition(()=>p()):p()},...p,"data-discover":!b&&e===`render`?`true`:void 0})});Ln.displayName=`Form`;function Rn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function zn(e){let t=_.useContext(nt);return T(t,Rn(e)),t}function Bn(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=Ct(),d=bt(),f=Et(e,{relative:o});return _.useCallback(p=>{if(an(p,t)){p.preventDefault();let t=n===void 0?ce(d)===ce(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?_.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var Vn=0,Hn=()=>`__${String(++Vn)}__`;function Un(){let{router:e}=zn(`useSubmit`),{basename:t}=_.useContext(lt),n=Vt(),r=e.fetch,i=e.navigate;return _.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=un(e,t);if(a.navigate===!1){let e=a.fetcherKey||Hn();await r(e,n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync})}else await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function Wn(e,{relative:t}={}){let{basename:n}=_.useContext(lt),r=_.useContext(dt);T(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...Et(e||`.`,{relative:t})},o=bt();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:Le([n,a.pathname])),ce(a)}function Gn(e,{relative:t}={}){let n=_.useContext(ot);T(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=zn(`useViewTransitionState`),i=Et(e,{relative:t});if(!n.isTransitioning)return!1;let a=ke(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=ke(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Te(i.pathname,o)!=null||Te(i.pathname,a)!=null}var Kn=`interview-prep:progress`,qn=`interview-prep:filters`,Jn=`interview-prep:tasks`,Yn=`interview-prep:task-filters`,Xn=`interview-prep:resource-filters`,Zn=`interview-prep:language`;function Qn(){try{let e=localStorage.getItem(Kn);return e?JSON.parse(e):{}}catch{return{}}}function $n(e){try{localStorage.setItem(Kn,JSON.stringify(e))}catch{}}function er(e){try{let t=localStorage.getItem(qn);return t?{...e,...JSON.parse(t)}:e}catch{return e}}function tr(e){try{localStorage.setItem(qn,JSON.stringify(e))}catch{}}function nr(){try{let e=localStorage.getItem(Jn);return e?JSON.parse(e):{}}catch{return{}}}function rr(e){try{localStorage.setItem(Jn,JSON.stringify(e))}catch{}}function ir(e){try{let t=localStorage.getItem(Yn);return t?{...e,...JSON.parse(t)}:e}catch{return e}}function ar(e){try{localStorage.setItem(Yn,JSON.stringify(e))}catch{}}function or(e){try{let t=localStorage.getItem(Xn);return t?{...e,...JSON.parse(t)}:e}catch{return e}}function sr(e){try{localStorage.setItem(Xn,JSON.stringify(e))}catch{}}function cr(){try{return localStorage.getItem(Zn)}catch{return null}}function lr(e){try{localStorage.setItem(Zn,e)}catch{}}var ur={"nav.home":`Home`,"nav.training":`Training`,"nav.interview":`Interview`,"nav.tasks":`Tasks`,"nav.knowledgeBase":`Knowledge base`,"nav.resources":`Resources`,"nav.questions":`Questions`,"nav.collections":`Collections`,"nav.analytics":`Analytics`,"breadcrumb.label":`Breadcrumb`,"breadcrumb.listOfQuestions":`List of questions`,"breadcrumb.moreDetails":`More details`,"breadcrumb.notFound":`Not found`,"language.label":`Interface language`,"home.title":`Welcome back`,"home.subtitle":`Keep preparing for technical interviews — step by step.`,"home.stats.total":`Questions total`,"home.stats.learned":`Learned`,"home.stats.favorites":`Favorites`,"home.stats.skills":`Skills covered`,"home.links.questionsDesc":`Browse the question and answer bank`,"home.links.interviewDesc":`An interview simulation with random questions`,"home.links.analyticsDesc":`Learning progress and statistics`,"questions.title":`Questions`,"questions.pageTitle":`Questions`,"questions.empty":"No questions match the filters. Try changing the search criteria or add new questions to `questions.js`.","questions.notFound":"Question not found. It may have been removed from `questions.js`.","questions.loadingIndex":`Loading questions…`,"questions.notInLanguage":`This question is not available in the selected language yet.`,"questions.backToList":`Back to the question list`,"questions.subtitle":`This question tests your understanding of {skills}`,"questions.previous":`Previous`,"questions.next":`Next`,"questions.position":`{current} of {total}`,"questions.shortAnswer":`Short answer`,"questions.longAnswer":`Long answer`,"questions.learned":`Learned`,"questions.notLearned":`Not learned`,"collections.title":`Collections`,"collections.subtitle":`Your collection of favorite questions.`,"collections.empty":`No favorite questions yet. Mark a question with the heart in the question list.`,"resources.title":`Useful IT resources`,"resources.empty":`No resources match the filters. Try changing the search criteria.`,"common.loadingAnswer":`Loading the answer…`,"common.rating":`Rating:`,"common.complexity":`Complexity:`,"actions.learn":`Learn`,"actions.repeat":`Repeat`,"actions.favorite":`Favorite`,"actions.unfavorite":`Unfavorite`,"actions.more":`More`,"actions.questionActions":`Question actions`,"progress.title":`Progress`,"progress.questionLearned":`Question learned {count} of {goal}`,"progress.level":`Level:`,"progress.skills":`Skills:`,"progress.keywords":`Keywords:`,"filters.title":`Filters`,"filters.reset":`Reset`,"filters.queryPlaceholder":`Enter a query...`,"filters.taskPlaceholder":`Enter a task...`,"filters.resourcePlaceholder":`Enter resource...`,"filters.selectSkill":`Select skill from the list`,"filters.questionDifficulty":`Question Difficulty`,"filters.questionRating":`Question Rating`,"filters.status":`Status`,"filters.statusUnlearned":`Unlearned`,"filters.statusLearned":`Learned`,"filters.statusAll":`All`,"filters.favoriteOnly":`Favorite only`,"filters.difficulty":`Difficulty`,"filters.programmingLanguages":`Programming languages`,"filters.taskCategories":`Task categories`,"filters.resourceTypes":`Resource types`,"filters.showLess":`Show less`,"filters.viewAll":`View all`,"analytics.title":`Analytics`,"analytics.empty":"No questions yet. Add questions to `questions.js` to see statistics.","analytics.overallProgress":`Overall progress`,"analytics.summary":`Learned {learned} of {total} questions ({percent}%)`,"analytics.bySkill":`Distribution by topic`,"analytics.byDifficulty":`Questions by difficulty`,"analytics.legendLearned":`Learned`,"analytics.legendRemaining":`Remaining`,"interview.title":`Interview simulation`,"interview.empty":"There are no questions to simulate. Add questions to `questions.js`.","interview.showAnswer":`Show the answer`,"interview.dontKnow":`Don't know`,"interview.know":`Know`,"interview.nextRandom":`Next random question`,"tasks.title":`Coding tasks`,"tasks.empty":"No tasks match the filters. Try changing the search criteria or add new tasks to `tasks.js`.","tasks.notFound":`Task not found.`,"tasks.backToList":`Back to the task list`,"tasks.status.not_started":`Not started`,"tasks.status.in_progress":`In progress`,"tasks.status.solved":`Solved`,"tasks.tab.description":`Description`,"tasks.tab.result":`Code result`,"tasks.tab.tests":`Test cases`,"tasks.run":`Run`,"tasks.submit":`Submit`,"tasks.resetToTemplate":`Reset to the template`,"tasks.editorLabel":`Code editor`,"tasks.section.condition":`Task:`,"tasks.section.input":`Input:`,"tasks.section.output":`Output:`,"tasks.section.constraints":`Constraints:`,"tasks.section.example":`Example:`,"tests.idle":`Run your code with the Run button to see the test results.`,"tests.running":`Running…`,"tests.passed":`Passed {passed} of {total}`,"tests.hiddenTag":`hidden`,"tests.error":`Error:`,"tests.expected":`Expected:`,"tests.received":`Received:`,"tests.input":`Input:`,"tests.expects":`Expects:`,"tests.hiddenNote.one":`+ {count} hidden test runs when the solution is submitted (Submit).`,"tests.hiddenNote.few":`+ {count} hidden tests run when the solution is submitted (Submit).`,"tests.hiddenNote.many":`+ {count} hidden tests run when the solution is submitted (Submit).`,"run.workerFailed":`Could not start the worker: {message}`,"run.executionError":`Code execution error`,"run.executionErrorDetail":`Code execution error: {message}`,"run.timeout":`Execution timed out ({ms} ms). Your code may contain an infinite loop.`,"run.compileError":`Compilation error: {message}`,"run.functionNotFound":"Function `{name}` not found. Declare it in the editor.","pagination.label":`Pagination`,"pagination.previousPage":`Previous page`,"pagination.nextPage":`Next page`,"code.copy":`Copy`,"code.copied":`Copied`},dr={"nav.home":`Головна`,"nav.training":`Тренування`,"nav.interview":`Співбесіда`,"nav.tasks":`Завдання`,"nav.knowledgeBase":`База знань`,"nav.resources":`Ресурси`,"nav.questions":`Питання`,"nav.collections":`Колекції`,"nav.analytics":`Аналітика`,"breadcrumb.label":`Навігаційний шлях`,"breadcrumb.listOfQuestions":`Список питань`,"breadcrumb.moreDetails":`Детальніше`,"breadcrumb.notFound":`Не знайдено`,"language.label":`Мова інтерфейсу`,"home.title":`З поверненням`,"home.subtitle":`Продовжуй готуватись до технічних співбесід — крок за кроком.`,"home.stats.total":`Усього питань`,"home.stats.learned":`Вивчено`,"home.stats.favorites":`Обрані`,"home.stats.skills":`Охоплено технологій`,"home.links.questionsDesc":`Переглянути базу питань і відповідей`,"home.links.interviewDesc":`Симуляція співбесіди з випадковими питаннями`,"home.links.analyticsDesc":`Прогрес навчання і статистика`,"questions.title":`Питання`,"questions.pageTitle":`Питання`,"questions.empty":"Немає питань, що відповідають фільтрам. Спробуй змінити критерії пошуку або додай нові питання у `questions.js`.","questions.notFound":"Питання не знайдено. Можливо, воно було видалене з `questions.js`.","questions.loadingIndex":`Завантаження питань…`,"questions.notInLanguage":`Це питання поки недоступне вибраною мовою.`,"questions.backToList":`До списку питань`,"questions.subtitle":`Цей запит перевіряє розуміння {skills}`,"questions.previous":`Назад`,"questions.next":`Далі`,"questions.position":`{current} з {total}`,"questions.shortAnswer":`Коротка відповідь`,"questions.longAnswer":`Розгорнута відповідь`,"questions.learned":`Вивчено`,"questions.notLearned":`Не вивчено`,"collections.title":`Колекції`,"collections.subtitle":`Твоя колекція обраних питань.`,"collections.empty":`Ще немає обраних питань. Познач питання серцем у списку питань.`,"resources.title":`Корисні IT-ресурси`,"resources.empty":`Немає ресурсів, що відповідають фільтрам. Спробуй змінити критерії пошуку.`,"common.loadingAnswer":`Завантаження відповіді…`,"common.rating":`Рейтинг:`,"common.complexity":`Складність:`,"actions.learn":`Вивчити`,"actions.repeat":`Повторити`,"actions.favorite":`В обрані`,"actions.unfavorite":`З обраних`,"actions.more":`Детальніше`,"actions.questionActions":`Дії з питанням`,"progress.title":`Прогрес`,"progress.questionLearned":`Питання вивчено {count} з {goal}`,"progress.level":`Рівень:`,"progress.skills":`Технології:`,"progress.keywords":`Ключові слова:`,"filters.title":`Фільтри`,"filters.reset":`Скинути`,"filters.queryPlaceholder":`Введи запит...`,"filters.taskPlaceholder":`Введи завдання...`,"filters.resourcePlaceholder":`Введи ресурс...`,"filters.selectSkill":`Вибери технологію зі списку`,"filters.questionDifficulty":`Складність питання`,"filters.questionRating":`Рейтинг питання`,"filters.status":`Статус`,"filters.statusUnlearned":`Не вивчені`,"filters.statusLearned":`Вивчені`,"filters.statusAll":`Усі`,"filters.favoriteOnly":`Лише обрані`,"filters.difficulty":`Складність`,"filters.programmingLanguages":`Мови програмування`,"filters.taskCategories":`Категорії завдань`,"filters.resourceTypes":`Типи ресурсів`,"filters.showLess":`Показати менше`,"filters.viewAll":`Показати всі`,"analytics.title":`Аналітика`,"analytics.empty":"Ще немає жодного питання. Додай питання у `questions.js`, щоб побачити статистику.","analytics.overallProgress":`Загальний прогрес`,"analytics.summary":`Вивчено {learned} з {total} питань ({percent}%)`,"analytics.bySkill":`Розподіл по темах`,"analytics.byDifficulty":`Питання за складністю`,"analytics.legendLearned":`Вивчено`,"analytics.legendRemaining":`Залишилось`,"interview.title":`Симуляція співбесіди`,"interview.empty":"Немає жодного питання для симуляції. Додай питання у `questions.js`.","interview.showAnswer":`Показати відповідь`,"interview.dontKnow":`Не знаю`,"interview.know":`Знаю`,"interview.nextRandom":`Наступне випадкове питання`,"tasks.title":`Завдання з програмування`,"tasks.empty":"Немає завдань, що відповідають фільтрам. Спробуй змінити критерії пошуку або додай нові завдання у `tasks.js`.","tasks.notFound":`Завдання не знайдено.`,"tasks.backToList":`До списку завдань`,"tasks.status.not_started":`Не розпочато`,"tasks.status.in_progress":`У процесі`,"tasks.status.solved":`Розв'язано`,"tasks.tab.description":`Умова`,"tasks.tab.result":`Результат коду`,"tasks.tab.tests":`Тест-кейси`,"tasks.run":`Запустити`,"tasks.submit":`Надіслати`,"tasks.resetToTemplate":`Скинути до шаблону`,"tasks.editorLabel":`Редактор коду`,"tasks.section.condition":`Умова:`,"tasks.section.input":`Вхідні дані:`,"tasks.section.output":`Вихідні дані:`,"tasks.section.constraints":`Обмеження:`,"tasks.section.example":`Приклад:`,"tests.idle":`Запусти код кнопкою «Запустити», щоб побачити результат прогону тестів.`,"tests.running":`Виконується…`,"tests.passed":`Пройдено {passed} з {total}`,"tests.hiddenTag":`прихований`,"tests.error":`Помилка:`,"tests.expected":`Очікувалось:`,"tests.received":`Отримано:`,"tests.input":`Вхід:`,"tests.expects":`Очікується:`,"tests.hiddenNote.one":`+ {count} прихований тест виконується при надсиланні розв'язку.`,"tests.hiddenNote.few":`+ {count} прихованих тести виконуються при надсиланні розв'язку.`,"tests.hiddenNote.many":`+ {count} прихованих тестів виконуються при надсиланні розв'язку.`,"run.workerFailed":`Не вдалося запустити воркер: {message}`,"run.executionError":`Помилка виконання коду`,"run.executionErrorDetail":`Помилка виконання коду: {message}`,"run.timeout":`Перевищено час виконання ({ms} мс). Можливо, у коді безкінечний цикл.`,"run.compileError":`Помилка компіляції: {message}`,"run.functionNotFound":"Функцію `{name}` не знайдено. Оголоси її в редакторі.","pagination.label":`Пагінація`,"pagination.previousPage":`Попередня сторінка`,"pagination.nextPage":`Наступна сторінка`,"code.copy":`Копіювати`,"code.copied":`Скопійовано`},fr={"nav.home":`Главная`,"nav.training":`Тренировка`,"nav.interview":`Собеседование`,"nav.tasks":`Задачи`,"nav.knowledgeBase":`База знаний`,"nav.resources":`Ресурсы`,"nav.questions":`Вопросы`,"nav.collections":`Коллекции`,"nav.analytics":`Аналитика`,"breadcrumb.label":`Навигационная цепочка`,"breadcrumb.listOfQuestions":`Список вопросов`,"breadcrumb.moreDetails":`Подробнее`,"breadcrumb.notFound":`Не найдено`,"language.label":`Язык интерфейса`,"home.title":`С возвращением`,"home.subtitle":`Продолжай готовиться к техническим собеседованиям — шаг за шагом.`,"home.stats.total":`Всего вопросов`,"home.stats.learned":`Изучено`,"home.stats.favorites":`Избранное`,"home.stats.skills":`Охвачено технологий`,"home.links.questionsDesc":`Посмотреть базу вопросов и ответов`,"home.links.interviewDesc":`Симуляция собеседования со случайными вопросами`,"home.links.analyticsDesc":`Прогресс обучения и статистика`,"questions.title":`Вопросы`,"questions.pageTitle":`Вопросы`,"questions.empty":"Нет вопросов, соответствующих фильтрам. Попробуй изменить критерии поиска или добавь новые вопросы в `questions.js`.","questions.notFound":"Вопрос не найден. Возможно, он был удалён из `questions.js`.","questions.loadingIndex":`Загрузка вопросов…`,"questions.notInLanguage":`Этот вопрос пока недоступен на выбранном языке.`,"questions.backToList":`К списку вопросов`,"questions.subtitle":`Этот вопрос проверяет понимание {skills}`,"questions.previous":`Назад`,"questions.next":`Далее`,"questions.position":`{current} из {total}`,"questions.shortAnswer":`Краткий ответ`,"questions.longAnswer":`Развёрнутый ответ`,"questions.learned":`Изучено`,"questions.notLearned":`Не изучено`,"collections.title":`Коллекции`,"collections.subtitle":`Твоя коллекция избранных вопросов.`,"collections.empty":`Пока нет избранных вопросов. Отметь вопрос сердцем в списке вопросов.`,"resources.title":`Полезные IT-ресурсы`,"resources.empty":`Нет ресурсов, соответствующих фильтрам. Попробуй изменить критерии поиска.`,"common.loadingAnswer":`Загрузка ответа…`,"common.rating":`Рейтинг:`,"common.complexity":`Сложность:`,"actions.learn":`Изучить`,"actions.repeat":`Повторить`,"actions.favorite":`В избранное`,"actions.unfavorite":`Из избранного`,"actions.more":`Подробнее`,"actions.questionActions":`Действия с вопросом`,"progress.title":`Прогресс`,"progress.questionLearned":`Вопрос изучен {count} из {goal}`,"progress.level":`Уровень:`,"progress.skills":`Технологии:`,"progress.keywords":`Ключевые слова:`,"filters.title":`Фильтры`,"filters.reset":`Сбросить`,"filters.queryPlaceholder":`Введи запрос...`,"filters.taskPlaceholder":`Введи задачу...`,"filters.resourcePlaceholder":`Введи ресурс...`,"filters.selectSkill":`Выбери технологию из списка`,"filters.questionDifficulty":`Сложность вопроса`,"filters.questionRating":`Рейтинг вопроса`,"filters.status":`Статус`,"filters.statusUnlearned":`Не изученные`,"filters.statusLearned":`Изученные`,"filters.statusAll":`Все`,"filters.favoriteOnly":`Только избранные`,"filters.difficulty":`Сложность`,"filters.programmingLanguages":`Языки программирования`,"filters.taskCategories":`Категории задач`,"filters.resourceTypes":`Типы ресурсов`,"filters.showLess":`Показать меньше`,"filters.viewAll":`Показать все`,"analytics.title":`Аналитика`,"analytics.empty":"Пока нет ни одного вопроса. Добавь вопросы в `questions.js`, чтобы увидеть статистику.","analytics.overallProgress":`Общий прогресс`,"analytics.summary":`Изучено {learned} из {total} вопросов ({percent}%)`,"analytics.bySkill":`Распределение по темам`,"analytics.byDifficulty":`Вопросы по сложности`,"analytics.legendLearned":`Изучено`,"analytics.legendRemaining":`Осталось`,"interview.title":`Симуляция собеседования`,"interview.empty":"Нет ни одного вопроса для симуляции. Добавь вопросы в `questions.js`.","interview.showAnswer":`Показать ответ`,"interview.dontKnow":`Не знаю`,"interview.know":`Знаю`,"interview.nextRandom":`Следующий случайный вопрос`,"tasks.title":`Задачи по программированию`,"tasks.empty":"Нет задач, соответствующих фильтрам. Попробуй изменить критерии поиска или добавь новые задачи в `tasks.js`.","tasks.notFound":`Задача не найдена.`,"tasks.backToList":`К списку задач`,"tasks.status.not_started":`Не начата`,"tasks.status.in_progress":`В процессе`,"tasks.status.solved":`Решена`,"tasks.tab.description":`Условие`,"tasks.tab.result":`Результат кода`,"tasks.tab.tests":`Тест-кейсы`,"tasks.run":`Запустить`,"tasks.submit":`Отправить`,"tasks.resetToTemplate":`Сбросить к шаблону`,"tasks.editorLabel":`Редактор кода`,"tasks.section.condition":`Условие:`,"tasks.section.input":`Входные данные:`,"tasks.section.output":`Выходные данные:`,"tasks.section.constraints":`Ограничения:`,"tasks.section.example":`Пример:`,"tests.idle":`Запусти код кнопкой «Запустить», чтобы увидеть результат прогона тестов.`,"tests.running":`Выполняется…`,"tests.passed":`Пройдено {passed} из {total}`,"tests.hiddenTag":`скрытый`,"tests.error":`Ошибка:`,"tests.expected":`Ожидалось:`,"tests.received":`Получено:`,"tests.input":`Вход:`,"tests.expects":`Ожидается:`,"tests.hiddenNote.one":`+ {count} скрытый тест выполняется при отправке решения.`,"tests.hiddenNote.few":`+ {count} скрытых теста выполняются при отправке решения.`,"tests.hiddenNote.many":`+ {count} скрытых тестов выполняются при отправке решения.`,"run.workerFailed":`Не удалось запустить воркер: {message}`,"run.executionError":`Ошибка выполнения кода`,"run.executionErrorDetail":`Ошибка выполнения кода: {message}`,"run.timeout":`Превышено время выполнения ({ms} мс). Возможно, в коде бесконечный цикл.`,"run.compileError":`Ошибка компиляции: {message}`,"run.functionNotFound":"Функция `{name}` не найдена. Объяви её в редакторе.","pagination.label":`Пагинация`,"pagination.previousPage":`Предыдущая страница`,"pagination.nextPage":`Следующая страница`,"code.copy":`Копировать`,"code.copied":`Скопировано`},pr={"nav.home":`Domů`,"nav.training":`Trénink`,"nav.interview":`Pohovor`,"nav.tasks":`Úlohy`,"nav.knowledgeBase":`Znalostní báze`,"nav.resources":`Zdroje`,"nav.questions":`Otázky`,"nav.collections":`Kolekce`,"nav.analytics":`Analytika`,"breadcrumb.label":`Navigační cesta`,"breadcrumb.listOfQuestions":`Seznam otázek`,"breadcrumb.moreDetails":`Podrobnosti`,"breadcrumb.notFound":`Nenalezeno`,"language.label":`Jazyk rozhraní`,"home.title":`Vítej zpátky`,"home.subtitle":`Pokračuj v přípravě na technické pohovory — krok za krokem.`,"home.stats.total":`Otázek celkem`,"home.stats.learned":`Naučeno`,"home.stats.favorites":`Oblíbené`,"home.stats.skills":`Pokrytých technologií`,"home.links.questionsDesc":`Prohlédnout databázi otázek a odpovědí`,"home.links.interviewDesc":`Simulace pohovoru s náhodnými otázkami`,"home.links.analyticsDesc":`Pokrok v učení a statistiky`,"questions.title":`Otázky`,"questions.pageTitle":`Otázky`,"questions.empty":"Žádné otázky neodpovídají filtrům. Zkus změnit kritéria hledání nebo přidej nové otázky do `questions.js`.","questions.notFound":"Otázka nenalezena. Možná byla odstraněna z `questions.js`.","questions.loadingIndex":`Načítání otázek…`,"questions.notInLanguage":`Tato otázka zatím není ve zvoleném jazyce k dispozici.`,"questions.backToList":`Zpět na seznam otázek`,"questions.subtitle":`Tato otázka zkouší porozumění {skills}`,"questions.previous":`Předchozí`,"questions.next":`Další`,"questions.position":`{current} z {total}`,"questions.shortAnswer":`Krátká odpověď`,"questions.longAnswer":`Podrobná odpověď`,"questions.learned":`Naučeno`,"questions.notLearned":`Nenaučeno`,"collections.title":`Kolekce`,"collections.subtitle":`Tvoje kolekce oblíbených otázek.`,"collections.empty":`Zatím žádné oblíbené otázky. Označ otázku srdcem v seznamu otázek.`,"resources.title":`Užitečné IT zdroje`,"resources.empty":`Žádné zdroje neodpovídají filtrům. Zkus změnit kritéria hledání.`,"common.loadingAnswer":`Načítání odpovědi…`,"common.rating":`Hodnocení:`,"common.complexity":`Složitost:`,"actions.learn":`Naučit`,"actions.repeat":`Zopakovat`,"actions.favorite":`Do oblíbených`,"actions.unfavorite":`Z oblíbených`,"actions.more":`Podrobnosti`,"actions.questionActions":`Akce s otázkou`,"progress.title":`Pokrok`,"progress.questionLearned":`Otázka naučena {count} z {goal}`,"progress.level":`Úroveň:`,"progress.skills":`Technologie:`,"progress.keywords":`Klíčová slova:`,"filters.title":`Filtry`,"filters.reset":`Zrušit`,"filters.queryPlaceholder":`Zadej dotaz...`,"filters.taskPlaceholder":`Zadej úlohu...`,"filters.resourcePlaceholder":`Zadej zdroj...`,"filters.selectSkill":`Vyber technologii ze seznamu`,"filters.questionDifficulty":`Obtížnost otázky`,"filters.questionRating":`Hodnocení otázky`,"filters.status":`Stav`,"filters.statusUnlearned":`Nenaučené`,"filters.statusLearned":`Naučené`,"filters.statusAll":`Všechny`,"filters.favoriteOnly":`Jen oblíbené`,"filters.difficulty":`Obtížnost`,"filters.programmingLanguages":`Programovací jazyky`,"filters.taskCategories":`Kategorie úloh`,"filters.resourceTypes":`Typy zdrojů`,"filters.showLess":`Zobrazit méně`,"filters.viewAll":`Zobrazit vše`,"analytics.title":`Analytika`,"analytics.empty":"Zatím žádná otázka. Přidej otázky do `questions.js`, aby se zobrazily statistiky.","analytics.overallProgress":`Celkový pokrok`,"analytics.summary":`Naučeno {learned} z {total} otázek ({percent}%)`,"analytics.bySkill":`Rozdělení podle témat`,"analytics.byDifficulty":`Otázky podle obtížnosti`,"analytics.legendLearned":`Naučeno`,"analytics.legendRemaining":`Zbývá`,"interview.title":`Simulace pohovoru`,"interview.empty":"Není žádná otázka pro simulaci. Přidej otázky do `questions.js`.","interview.showAnswer":`Zobrazit odpověď`,"interview.dontKnow":`Nevím`,"interview.know":`Vím`,"interview.nextRandom":`Další náhodná otázka`,"tasks.title":`Programovací úlohy`,"tasks.empty":"Žádné úlohy neodpovídají filtrům. Zkus změnit kritéria hledání nebo přidej nové úlohy do `tasks.js`.","tasks.notFound":`Úloha nenalezena.`,"tasks.backToList":`Zpět na seznam úloh`,"tasks.status.not_started":`Nezahájeno`,"tasks.status.in_progress":`Probíhá`,"tasks.status.solved":`Vyřešeno`,"tasks.tab.description":`Zadání`,"tasks.tab.result":`Výsledek kódu`,"tasks.tab.tests":`Testovací případy`,"tasks.run":`Spustit`,"tasks.submit":`Odeslat`,"tasks.resetToTemplate":`Obnovit šablonu`,"tasks.editorLabel":`Editor kódu`,"tasks.section.condition":`Zadání:`,"tasks.section.input":`Vstupní data:`,"tasks.section.output":`Výstupní data:`,"tasks.section.constraints":`Omezení:`,"tasks.section.example":`Příklad:`,"tests.idle":`Spusť kód tlačítkem „Spustit“, aby se zobrazil výsledek testů.`,"tests.running":`Probíhá…`,"tests.passed":`Prošlo {passed} z {total}`,"tests.hiddenTag":`skrytý`,"tests.error":`Chyba:`,"tests.expected":`Očekáváno:`,"tests.received":`Získáno:`,"tests.input":`Vstup:`,"tests.expects":`Očekává se:`,"tests.hiddenNote.one":`+ {count} skrytý test se spustí při odeslání řešení.`,"tests.hiddenNote.few":`+ {count} skryté testy se spustí při odeslání řešení.`,"tests.hiddenNote.many":`+ {count} skrytých testů se spustí při odeslání řešení.`,"run.workerFailed":`Nepodařilo se spustit worker: {message}`,"run.executionError":`Chyba při vykonávání kódu`,"run.executionErrorDetail":`Chyba při vykonávání kódu: {message}`,"run.timeout":`Překročen čas vykonávání ({ms} ms). Kód možná obsahuje nekonečnou smyčku.`,"run.compileError":`Chyba kompilace: {message}`,"run.functionNotFound":"Funkce `{name}` nebyla nalezena. Deklaruj ji v editoru.","pagination.label":`Stránkování`,"pagination.previousPage":`Předchozí stránka`,"pagination.nextPage":`Další stránka`,"code.copy":`Kopírovat`,"code.copied":`Zkopírováno`},mr=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),A=o(((e,t)=>{t.exports=mr()}))(),hr=[{code:`en`,label:`English`},{code:`uk`,label:`Українська`},{code:`ru`,label:`Русский`},{code:`cs`,label:`Čeština`}],gr={en:ur,uk:dr,ru:fr,cs:pr},_r=`en`;function vr(e,t){if(e===`en`)return t===1?`one`:`many`;if(e===`cs`)return t===1?`one`:t>=2&&t<=4?`few`:`many`;let n=t%10,r=t%100;return n===1&&r!==11?`one`:n>=2&&n<=4&&(r<12||r>14)?`few`:`many`}function yr(e){return hr.some(t=>t.code===e)}function br(){let e=cr();if(e&&yr(e))return e;let t=(navigator.language??``).slice(0,2).toLowerCase();return yr(t)?t:_r}var xr=(0,_.createContext)(null);function Sr({children:e}){let[t,n]=(0,_.useState)(br);(0,_.useEffect)(()=>{lr(t),document.documentElement.lang=t},[t]);let r=(0,_.useCallback)(e=>{yr(e)&&n(e)},[]),i=(0,_.useCallback)((e,n)=>{let r=gr[t]??gr[_r],i=gr[_r],a=e;if(n&&typeof n.count==`number`){let o=`${e}.${vr(t,n.count)}`;(o in r||o in i)&&(a=o)}let o=r[a]??i[a]??a;return n?o.replace(/\{(\w+)\}/g,(e,t)=>Object.hasOwn(n,t)?String(n[t]):e):o},[t]),a=(0,_.useMemo)(()=>({lang:t,setLang:r,t:i}),[t,r,i]);return(0,A.jsx)(xr.Provider,{value:a,children:e})}function j(){let e=(0,_.useContext)(xr);if(!e)throw Error(`useI18n must be used within a LanguageProvider`);return e}var Cr=Object.assign({"../data/generated/index.cs.json":()=>S(()=>import(`./index.cs-q3039TkT.js`),[]),"../data/generated/index.en.json":()=>S(()=>import(`./index.en-Db903_Ct.js`),[]),"../data/generated/index.ru.json":()=>S(()=>import(`./index.ru-C77ascgh.js`),[]),"../data/generated/index.uk.json":()=>S(()=>import(`./index.uk-DCAjLR-j.js`),[])}),wr=(0,_.createContext)(null),Tr=[],Er={status:`not_learned`,favorite:!1,learnedCount:0,learnedGoal:3},Dr={query:``,skills:[],difficultyRanges:[],ratings:[],status:`all`,favoriteOnly:!1};function Or(e){return{status:e.status,favorite:e.favorite,learnedCount:e.learnedCount,learnedGoal:e.learnedGoal}}function kr({children:e}){let{lang:t}=j(),[n,r]=(0,_.useState)(()=>Qn()),[i,a]=(0,_.useState)(()=>er(Dr)),[o,s]=(0,_.useState)(null);(0,_.useEffect)(()=>{$n(n)},[n]),(0,_.useEffect)(()=>{tr(i)},[i]),(0,_.useEffect)(()=>{let e=Cr[`../data/generated/index.${t}.json`];if(!e)return;let n=!0;return e().then(e=>{n&&s({lang:t,index:e.default??e})}),()=>{n=!1}},[t]);let c=Cr[`../data/generated/index.${t}.json`]?o?.lang===t?o.index:null:Tr,l=(0,_.useMemo)(()=>c?c.map(e=>{let t={...e,...Er},r=n[e.id],i=r?{...t,...r}:{...t,...Or(t)};return i.status=i.learnedCount>=i.learnedGoal?`learned`:`not_learned`,i}):[],[c,n]),u=(0,_.useCallback)((e,t)=>{r(n=>{let r=n[e]??{...Er},i=typeof t==`function`?t(r):{...r,...t};return{...n,[e]:i}})},[]),d=(0,_.useCallback)(e=>{a(t=>typeof e==`function`?e(t):{...t,...e})},[]),f=(0,_.useCallback)(()=>a(Dr),[]),p=(0,_.useMemo)(()=>({questions:l,loading:c===null,updateProgress:u,filters:i,setFilters:d,resetFilters:f}),[l,c,u,i,d,f]);return(0,A.jsx)(wr.Provider,{value:p,children:e})}function Ar(){let e=(0,_.useContext)(wr);if(!e)throw Error(`useQuestions must be used within a QuestionsProvider`);return e}var jr=[`JavaScript`],Mr=`Aggregation.Algorithmics.Arrays.Asynchronous.Caching.Conditions.Data structures.Databases.Dictionaries.Dynamic programming.Filtering.Functions.Graphs.Greedy algorithms.Grouping.Iterators.Linked lists.Loops.Matrices.Objects.Parsing.Patterns.Pointers.Queue.Recursion.Search.Sorting.Stack.Strings.Trees`.split(`.`),Nr=[{title:`Выдача суммы банкнотами (Cash Dispenser)`,difficulty:3,categories:[`Greedy algorithms`],languages:[`JavaScript`],functionName:`dispenseCash`,description:{condition:`Реализуйте функцию, которая определяет, можно ли выдать запрошенную сумму заданным набором номиналов банкнот с учётом ограниченного количества банкнот каждого номинала, и если можно — возвращает состав выдачи (сколько банкнот каждого номинала использовано). Набор номиналов и их доступное количество передаются как конфигурация. Если собрать сумму из доступных банкнот невозможно (не хватает номиналов или банкнот), функция должна вернуть признак невозможности выдачи вместо набора банкнот.`,input:["`amount` — запрошенная сумма, целое положительное число","`bills` — конфигурация доступных банкнот: список записей вида `{ value, count }`, где `value` — номинал, `count` — сколько банкнот этого номинала доступно"],output:"объект вида `{ success: true, breakdown: [{ value, count }, ...] }` с составом выдачи (только номиналы с count > 0), либо `{ success: false, breakdown: null }`, если сумму выдать нельзя",constraints:["`1 <= amount <= 10^7`",`Количество различных номиналов ≤ 20`,"`count` для каждого номинала в пределах `0 <= count <= 1000`",`Номиналы — положительные целые числа, без дублирующихся значений в списке`],example:`Вход:  amount = 130, bills = [{value: 100, count: 2}, {value: 50, count: 1}, {value: 10, count: 3}]
Выход: { success: true, breakdown: [{value: 100, count: 1}, {value: 10, count: 3}] }

Вход:  amount = 45, bills = [{value: 100, count: 2}, {value: 50, count: 1}]
Выход: { success: false, breakdown: null }

Вход:  amount = 0, bills = [{value: 10, count: 5}]
Выход: { success: true, breakdown: [] }`},starterCode:`function dispenseCash(amount, bills) {
  // TODO: implement solution here
  return { success: false, breakdown: null };
}
`,tests:[{name:`Выдаёт 130 крупными номиналами`,args:[130,[{value:100,count:2},{value:50,count:1},{value:10,count:3}]],expected:{success:!0,breakdown:[{value:100,count:1},{value:10,count:3}]}},{name:`Невозможно собрать сумму из доступных номиналов`,args:[45,[{value:100,count:2},{value:50,count:1}]],expected:{success:!1,breakdown:null}},{name:`Нулевая сумма — пустая выдача`,args:[0,[{value:10,count:5}]],expected:{success:!0,breakdown:[]}},{name:`Жадный выбор не должен мешать точной сумме`,args:[60,[{value:50,count:1},{value:30,count:2}]],expected:{success:!0,breakdown:[{value:30,count:2}]},hidden:!0},{name:`Учитывает ограниченное количество банкнот`,args:[300,[{value:100,count:1},{value:50,count:4}]],expected:{success:!0,breakdown:[{value:100,count:1},{value:50,count:4}]},hidden:!0},{name:`Не хватает банкнот — выдача невозможна`,args:[500,[{value:100,count:3}]],expected:{success:!1,breakdown:null},hidden:!0}]},{title:`Сумма поля amount в массиве объектов (Sum of Amount Field)`,difficulty:3,categories:[`Objects`],languages:[`JavaScript`],functionName:`sumAmount`,description:{condition:"Дан массив объектов, где у каждого объекта есть числовое поле `amount`. Если поле отсутствует, равно `undefined`, `null` или не является числом (например, строка), такой элемент должен игнорироваться при подсчёте (не должен вызывать ошибку и не должен добавляться к сумме). Напишите функцию, которая возвращает сумму значений поля `amount` по всем валидным элементам массива.",input:["массив объектов `[{ amount: number | string | null | undefined, ... }, ...]`"],output:"число — сумма валидных числовых значений `amount`",constraints:[`длина массива от 0 до 1000; объекты могут содержать другие поля, не влияющие на результат`],example:'Вход: `[{amount: 10}, {amount: 20}, {amount: "bad"}, {amount: null}]`\nВыход: `30`'},starterCode:`function sumAmount(items) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`Пример из условия`,args:[[{amount:10},{amount:20},{amount:`bad`},{amount:null}]],expected:30},{name:`Пустой массив — 0`,args:[[]],expected:0},{name:`Поле отсутствует — игнорируется`,args:[[{amount:5},{id:1},{amount:5}]],expected:10},{name:`Дробные и отрицательные значения`,args:[[{amount:1.5},{amount:-.5}]],expected:1,hidden:!0},{name:`Булево значение не считается числом`,args:[[{amount:!0},{amount:4}]],expected:4,hidden:!0},{name:`Все значения невалидны — 0`,args:[[{amount:`x`},{amount:null},{}]],expected:0,hidden:!0}]},{title:`Элемент большинства (Majority Element)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`majorityElement`,description:{condition:"Дан массив целых чисел `nums` размером `n`. Верните элемент, который встречается в массиве более `⌊n / 2⌋` раз (элемент большинства). Гарантируется, что такой элемент всегда существует в массиве.",input:["`nums` — массив целых чисел, `1 ≤ nums.length ≤ 5 * 10^4`, `-10^9 ≤ nums[i] ≤ 10^9`"],output:`Целое число — элемент большинства.`,constraints:[`Элемент большинства всегда присутствует в массиве`,`Массив содержит хотя бы один элемент`],example:`Вход: nums = [3, 2, 3]
Выход: 3

Вход: nums = [2, 2, 1, 1, 1, 2, 2]
Выход: 2`},starterCode:`// Доступно без импорта: встроенные методы JS

function majorityElement(nums) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`Пример 1`,args:[[3,2,3]],expected:3},{name:`Пример 2`,args:[[2,2,1,1,1,2,2]],expected:2},{name:`Массив из одного элемента`,args:[[1]],expected:1},{name:`Отрицательные числа`,args:[[-5,-5,-5,2,3]],expected:-5,hidden:!0},{name:`Ровно ⌊n/2⌋+1 вхождений`,args:[[1,2,3,1,1]],expected:1,hidden:!0},{name:`Элемент большинства не в начале массива`,args:[[2,1,1]],expected:1},{name:`Элемент большинства в середине`,args:[[5,1,1,1,5]],expected:1,hidden:!0}]},{title:`Медиана массива (Median of Array)`,difficulty:2,categories:[`Arrays`,`Sorting`],languages:[`JavaScript`],functionName:`findMedian`,description:{condition:`Дан массив целых чисел. Найдите медиану — значение, которое находится в середине массива, если его отсортировать по возрастанию.
Если длина массива нечётная, верните средний элемент. Если чётная — верните среднее арифметическое двух центральных элементов (как число с плавающей точкой).`,input:["`nums` — массив целых чисел, длина от 1 до 1000"],output:`Число (целое или с плавающей точкой) — медиана массива.`,constraints:["`-10^6 <= nums[i] <= 10^6`","`1 <= nums.length <= 1000`"],example:`Вход: nums = [3, 1, 2]
Выход: 2

Вход: nums = [4, 1, 3, 2]
Выход: 2.5`},starterCode:`// Доступно без импорта: встроенные методы JS

function findMedian(nums) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`Нечётная длина`,args:[[3,1,2]],expected:2},{name:`Чётная длина — среднее двух центральных`,args:[[4,1,3,2]],expected:2.5},{name:`Один элемент`,args:[[5]],expected:5},{name:`Отрицательные числа`,args:[[-5,-1,-3]],expected:-3,hidden:!0},{name:`Дубликаты, чётная длина`,args:[[2,2,2,2]],expected:2,hidden:!0},{name:`Не полагается на исходный порядок`,args:[[10,1,9,2]],expected:5.5,hidden:!0}]},{title:`Полифил метода startsWith (String startsWith Polyfill)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`myStartsWith`,description:{condition:"Реализуйте функцию, которая проверяет, начинается ли строка с указанной подстроки — аналог метода `String.prototype.startsWith`, но без использования этого встроенного метода (и без других строковых методов высокого уровня, реализующих ту же проверку напрямую). Требуется базовая посимвольная логика.",input:["`str` — исходная строка","`search` — подстрока, наличие которой в начале `str` нужно проверить","`position` (необязательный) — индекс, с которого начинать проверку в `str` (по умолчанию 0)"],output:"`true`, если `str`, начиная с индекса `position`, начинается с `search`, иначе `false`.",constraints:["`0 ≤ str.length ≤ 10^4`","`0 ≤ search.length ≤ str.length`","`0 ≤ position ≤ str.length`","Если `search` — пустая строка, результат всегда `true`",`Сравнение регистрозависимое`],example:`Вход: str="Hello world", search="Hello"
Выход: true

Вход: str="Hello world", search="world"
Выход: false

Вход: str="Hello world", search="world", position=6
Выход: true

Вход: str="test", search=""
Выход: true`},starterCode:`// Доступно без импорта: встроенные методы JS

function myStartsWith(str, search, position = 0) {
  // TODO: напишите решение здесь
  return false;
}
`,tests:[{name:`Строка начинается с подстроки`,args:[`Hello world`,`Hello`],expected:!0},{name:`Строка не начинается с подстроки`,args:[`Hello world`,`world`],expected:!1},{name:`С учётом position`,args:[`Hello world`,`world`,6],expected:!0},{name:`Пустая подстрока — всегда true`,args:[`test`,``],expected:!0},{name:`Сравнение регистрозависимое`,args:[`Test`,`t`],expected:!1,hidden:!0},{name:`Подстрока длиннее остатка строки`,args:[`abc`,`abcd`],expected:!1,hidden:!0},{name:`position в конце строки`,args:[`abc`,``,3],expected:!0,hidden:!0}]},{title:`Поиск белок на дереве (Find Squirrels in Tree)`,difficulty:2,categories:[`Trees`],languages:[`JavaScript`],functionName:`findSquirrels`,description:{condition:`На дереве в виде узлов сидят разные животные (белки и вороны). Каждый узел дерева содержит тип животного и его имя, а также список дочерних узлов (веток с животными). Реализуйте функцию, которая обходит дерево и возвращает имена всех белок в порядке обхода в глубину (preorder).`,input:['Корень дерева — объект вида `{ type: "squirrel" | "crow", name: string, children: [...] }`. `children` — массив таких же объектов (может быть пустым или отсутствовать).'],output:'Массив строк — имена всех животных с типом `"squirrel"`, в порядке DFS-обхода.',constraints:[`Глубина дерева до 100`,`Количество узлов до 1000`,'Тип животного — только `"squirrel"` или `"crow"`'],example:`Вход: {
type: "crow", name: "Grayfeather",
children: [
{ type: "squirrel", name: "Acorn", children: [
{ type: "squirrel", name: "Sirsalty" }
]},
{ type: "crow", name: "Blackwing", children: [
{ type: "squirrel", name: "Macadamia" },
{ type: "squirrel", name: "Kernel" }
]}
]
}
Выход: ["Acorn", "Sirsalty", "Macadamia", "Kernel"]`},starterCode:`// Узел дерева: { type: "squirrel" | "crow", name: string, children?: [...] }

function findSquirrels(root) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Пример из условия`,args:[{type:`crow`,name:`Grayfeather`,children:[{type:`squirrel`,name:`Acorn`,children:[{type:`squirrel`,name:`Sirsalty`}]},{type:`crow`,name:`Blackwing`,children:[{type:`squirrel`,name:`Macadamia`},{type:`squirrel`,name:`Kernel`}]}]}],expected:[`Acorn`,`Sirsalty`,`Macadamia`,`Kernel`]},{name:`Корень-белка без children`,args:[{type:`squirrel`,name:`Solo`}],expected:[`Solo`]},{name:`Только вороны — пустой результат`,args:[{type:`crow`,name:`A`,children:[{type:`crow`,name:`B`}]}],expected:[]},{name:`Глубокая вложенность сохраняет порядок preorder`,args:[{type:`squirrel`,name:`S1`,children:[{type:`squirrel`,name:`S2`,children:[{type:`squirrel`,name:`S3`}]},{type:`squirrel`,name:`S4`}]}],expected:[`S1`,`S2`,`S3`,`S4`],hidden:!0},{name:`Пустой список children`,args:[{type:`squirrel`,name:`Lone`,children:[]}],expected:[`Lone`],hidden:!0}]},{title:`Top-K по id из двух массивов записей (Top K Records By Id From Two Arrays)`,difficulty:3,categories:[`Arrays`,`Sorting`],languages:[`JavaScript`],functionName:`topKRecordsById`,description:{condition:"Даны два массива записей, полученных с разных серверов. Каждая запись имеет поле `id` (целое число) и поле `value` (строка). Все `id` уникальны в пределах каждого массива и не повторяются между массивами. Дано число `k`. Нужно объединить оба массива и вернуть `k` записей с наибольшими значениями `id`, отсортированных по `id` по убыванию.",input:["`first` — массив записей `{id, value}`","`second` — массив записей `{id, value}`","`k` — целое число, `0 <= k <= first.length + second.length`"],output:"Массив из `k` записей `{id, value}`, отсортированных по `id` по убыванию.",constraints:["`0 <= first.length, second.length <= 10^4`","все `id` уникальны в объединении обоих массивов","`1 <= id <= 10^9`"],example:'Вход: `first = [{id:1,value:"a"},{id:5,value:"b"}]`, `second = [{id:3,value:"c"},{id:8,value:"d"}]`, `k = 3`\nВыход: `[{id:8,value:"d"},{id:5,value:"b"},{id:3,value:"c"}]`'},starterCode:`// Доступно без импорта: встроенные методы JS

function topKRecordsById(first, second, k) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Пример из условия`,args:[[{id:1,value:`a`},{id:5,value:`b`}],[{id:3,value:`c`},{id:8,value:`d`}],3],expected:[{id:8,value:`d`},{id:5,value:`b`},{id:3,value:`c`}]},{name:`k = 0 — пустой результат`,args:[[{id:1,value:`a`}],[{id:2,value:`b`}],0],expected:[]},{name:`Один из массивов пустой`,args:[[],[{id:2,value:`b`},{id:9,value:`c`}],1],expected:[{id:9,value:`c`}]},{name:`k равен суммарной длине`,args:[[{id:4,value:`x`}],[{id:7,value:`y`}],2],expected:[{id:7,value:`y`},{id:4,value:`x`}],hidden:!0},{name:`Оба массива пустые`,args:[[],[],0],expected:[],hidden:!0}]},{title:`Мемоизация с очисткой кэша (Memoize with Cache Clearing)`,difficulty:2,categories:[`Functions`],languages:[`JavaScript`],functionName:`memoize`,description:{condition:"Реализуйте функцию `memoize(fn)`, которая возвращает мемоизированную версию `fn`. При повторном вызове с теми же аргументами результат берётся из кэша, а не пересчитывается заново. Аргументы могут быть любыми примитивами, включая `undefined` (в Python — `None`), причём вызов с явным `undefined`/`None` должен кэшироваться отдельно от вызова с другим значением того же аргумента. Возвращаемая функция должна иметь метод `clearCache()` (в Python — `clear_cache()`), который полностью очищает кэш: следующий вызов с любыми аргументами после этого пересчитывается заново.",input:[],output:``,constraints:[],example:`Вход: memoize(fn); fn.call(2, 3) -> 5 (вычисляется)
Вход: тот же вызов fn.call(2, 3) -> 5 (из кэша)
Вход: fn.clearCache(); fn.call(2, 3) -> 5 (вычисляется заново)`},starterCode:`// Доступно без импорта: встроенные методы JS

function memoize(fn) {
  // TODO: напишите решение здесь
  return fn;
}
`,tests:[{name:`Повторный вызов берётся из кэша`,body:`let calls = 0;
const fn = (a, b) => { calls++; return a + b; };
const m = solution(fn);
const r1 = m(2, 3);
const r2 = m(2, 3);
return { r1, r2, calls };`,expected:{r1:5,r2:5,calls:1}},{name:`clearCache() заставляет пересчитать`,body:`let calls = 0;
const fn = (a, b) => { calls++; return a + b; };
const m = solution(fn);
m(2, 3);
m(2, 3);
m.clearCache();
const r = m(2, 3);
return { r, calls };`,expected:{r:5,calls:2}},{name:`Разные аргументы кэшируются отдельно`,body:`let calls = 0;
const fn = (a) => { calls++; return a * 2; };
const m = solution(fn);
const out = [m(1), m(2), m(1), m(2)];
return { out, calls };`,expected:{out:[2,4,2,4],calls:2}},{name:`undefined кэшируется отдельно от строки "undefined"`,body:`let calls = 0;
const fn = (a) => { calls++; return String(a); };
const m = solution(fn);
const a = m(undefined);
const b = m('undefined');
const c = m(undefined);
return { a, b, c, calls };`,expected:{a:`undefined`,b:`undefined`,c:`undefined`,calls:2},hidden:!0},{name:`Кэш работает и после очистки`,body:`let calls = 0;
const fn = (a) => { calls++; return a; };
const m = solution(fn);
m(7); m.clearCache(); m(7); m(7);
return calls;`,expected:2,hidden:!0},{name:`Ключ кэша учитывает границы аргументов`,body:`let calls = 0;
const fn = (...a) => { calls++; return a.length; };
const m = solution(fn);
const a = m(1, 2);
const b = m('1,2');
return { a, b, calls };`,expected:{a:2,b:1,calls:2},hidden:!0}]},{title:`Промисификация функции (Promisify)`,difficulty:3,categories:[`Functions`],languages:[`JavaScript`],functionName:`promisify`,description:{condition:"Дана функция в стиле error-first callback вида `(...args, callback) => void`, где `callback(err, result)` вызывается ровно один раз — либо с ошибкой (`err` не null, `result` не важен), либо без ошибки (`err` равен null, `result` содержит данные). Функция может принимать произвольное количество аргументов перед колбэком (например, `loadScript(url, callback)`). Нужно реализовать функцию `promisify(asyncFn)`, которая возвращает новую функцию. Новая функция принимает те же аргументы, что и `asyncFn`, но без колбэка, сама добавляет колбэк при вызове `asyncFn` и возвращает `Promise`, который резолвится значением `result`, если ошибки не было, и реджектится значением `err`, если ошибка произошла.",input:["`asyncFn` — функция вида `(...args, callback) => void`."],output:"функция вида `(...args) => Promise<result>`.",constraints:["`asyncFn` вызывает колбэк ровно один раз","без реальных задержек (`setTimeout`) — только микротаски"],example:'Вход: `asyncFn = (url, cb) => Promise.resolve().then(() => cb(null, "loaded:" + url))`\nВыход: `promisify(asyncFn)("script.js")` → resolve `"loaded:script.js"`'},starterCode:`// Шаблон:
// Доступно без импорта: встроенные методы JS
function promisify(asyncFn) {
  // TODO: напишите решение здесь
  return function() {};
}
`,tests:[{name:`Резолвится результатом колбэка`,body:`const asyncFn = (url, cb) => Promise.resolve().then(() => cb(null, 'loaded:' + url));
return await solution(asyncFn)('script.js');`,expected:`loaded:script.js`},{name:`Реджектится ошибкой из колбэка`,body:`const asyncFn = (cb) => Promise.resolve().then(() => cb('boom'));
try { await solution(asyncFn)(); return 'NO_REJECT'; }
catch (e) { return { rejected: e }; }`,expected:{rejected:`boom`}},{name:`Возвращает именно Promise`,body:`const asyncFn = (cb) => Promise.resolve().then(() => cb(null, 1));
const r = solution(asyncFn)();
return r != null && typeof r.then === 'function';`,expected:!0},{name:`Пробрасывает несколько аргументов`,body:`const asyncFn = (a, b, cb) => Promise.resolve().then(() => cb(null, a + b));
return await solution(asyncFn)(2, 3);`,expected:5,hidden:!0},{name:`Работает без аргументов`,body:`const asyncFn = (cb) => Promise.resolve().then(() => cb(null, 'ok'));
return await solution(asyncFn)();`,expected:`ok`,hidden:!0}]},{title:`Последовательное выполнение промисов (Run Promises Sequentially)`,difficulty:3,categories:[`Asynchronous`],languages:[`JavaScript`],functionName:`runSequentially`,description:{condition:"Реализуйте функцию `runSequentially`, которая принимает массив функций, каждая из которых при вызове возвращает промис. Функция должна выполнять эти промисы последовательно (не параллельно) — следующий запускается только после того, как предыдущий успешно завершился.\nЕсли все промисы выполнились успешно, возвращаемый промис резолвится массивом результатов (в порядке следования исходных функций). Если хотя бы один из промисов отклоняется (reject), выполнение немедленно прекращается, и возвращаемый промис отклоняется с этой же ошибкой — оставшиеся промисы не запускаются.",input:["`tasks` — массив функций без аргументов, каждая из которых возвращает `Promise` (может быть пустым)."],output:"`Promise`, который:\nрезолвится массивом результатов всех промисов (в порядке `tasks`), если все выполнились успешно;\n\nотклоняется с ошибкой первого зареджекченного промиса, если такой встретился (промисы после него не запускаются).",constraints:["`0 ≤ tasks.length ≤ 20`",`Каждая функция при вызове возвращает промис, который резолвится или реджектится с любой задержкой`,"Пустой массив — немедленный resolve с `[]`"],example:`Вход: tasks = [() => Promise.resolve(1), () => Promise.resolve(2), () => Promise.resolve(3)]
Выход: промис резолвится [1, 2, 3]

Вход: tasks = [() => Promise.resolve(1), () => Promise.reject('err'), () => Promise.resolve(3)]
Выход: промис отклоняется 'err' (третья функция не вызывается)

Вход: tasks = []
Выход: промис резолвится []`},starterCode:`// Доступно без импорта: встроенные методы JS

function runSequentially(tasks) {
  // TODO: напишите решение здесь
  return Promise.resolve([]);
}
`,tests:[{name:`Все промисы успешны`,body:`return await solution([() => Promise.resolve(1), () => Promise.resolve(2), () => Promise.resolve(3)]);`,expected:[1,2,3]},{name:`Пустой массив — resolve с []`,body:`return await solution([]);`,expected:[]},{name:`Реджект останавливает выполнение`,body:`let started = 0;
const tasks = [
  () => { started++; return Promise.resolve(1); },
  () => { started++; return Promise.reject('err'); },
  () => { started++; return Promise.resolve(3); },
];
try { await solution(tasks); return 'NO_REJECT'; }
catch (e) { return { error: e, started }; }`,expected:{error:`err`,started:2}},{name:`Выполняется последовательно, а не параллельно`,body:`const order = [];
const mk = (id, ms) => () => new Promise((r) => setTimeout(() => { order.push(id); r(id); }, ms));
const res = await solution([mk(1, 40), mk(2, 15), mk(3, 0)]);
return { res, order };`,expected:{res:[1,2,3],order:[1,2,3]},hidden:!0},{name:`Одна задача`,body:`return await solution([() => Promise.resolve('only')]);`,expected:[`only`],hidden:!0}]},{title:`Самая длинная подстрока с не более чем K различными символами`,difficulty:3,categories:[`Strings`],languages:[`JavaScript`],functionName:`longestSubstringKDistinct`,description:{condition:"Дана строка `s` и число `k`.\n\nНужно вернуть длину самой длинной подстроки, которая содержит не более `k` различных символов.\n\nПодстрока — это непрерывная часть строки.",input:[],output:``,constraints:[],example:`s = "eceba"
k = 2

3

Пояснение:

"ece"`},starterCode:`function longestSubstringKDistinct(s, k) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`"eceba", k = 2 → 3`,args:[`eceba`,2],expected:3},{name:`"aa", k = 1 → 2`,args:[`aa`,1],expected:2},{name:`Пустая строка`,args:[``,3],expected:0},{name:`k = 0 — подстроки нет`,args:[`abc`,0],expected:0,hidden:!0},{name:`Окно в середине строки длиннее краёв`,args:[`aabbccddeeff`,3],expected:6,hidden:!0},{name:`k больше числа различных символов`,args:[`abcabc`,10],expected:6,hidden:!0}]},{title:`Аккумуляция символов (Accum)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`accum`,description:{condition:`Напишите функцию \`accum\`, которая принимает строку и возвращает новую строку, где каждый символ повторяется столько раз, какой его индекс в строке (начиная с 1), и разделяется дефисами. Каждый блок начинается с заглавной буквы, а остальные символы в блоке — строчные.

Правила:

Индексация начинается с 1 (первый символ повторяется 1 раз, второй — 2 раза и т.д.)

Первая буква каждого блока — заглавная, остальные — строчные

Блоки разделяются дефисом \`-\``,input:[],output:``,constraints:[`Длина строки: 1 ≤ N ≤ 100`,`Символы: латинские буквы (a-z, A-Z)`,`Время выполнения: O(N²)`,`Память: O(N²)`],example:`accum('abcd')      // -> "A-Bb-Ccc-Dddd"
accum('RqaEzty')   // -> "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
accum('cwAt')      // -> "C-Ww-Aaa-Tttt"`},starterCode:`function accum(str) {
    // TODO: write your solution here
    return "";
}
`,tests:[{name:`"abcd"`,args:[`abcd`],expected:`A-Bb-Ccc-Dddd`},{name:`"RqaEzty"`,args:[`RqaEzty`],expected:`R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy`},{name:`Один символ`,args:[`z`],expected:`Z`},{name:`"cwAt" — регистр нормализуется`,args:[`cwAt`],expected:`C-Ww-Aaa-Tttt`,hidden:!0},{name:`Все буквы заглавные`,args:[`ABC`],expected:`A-Bb-Ccc`,hidden:!0}]},{title:`Среднее значение массива чисел (Array Average)`,difficulty:1,categories:[`Arrays`],languages:[`JavaScript`],functionName:`findAverage`,description:{condition:"Напишите функцию `findAverage`, которая принимает массив чисел и возвращает их среднее арифметическое. Если массив пуст, функция должна вернуть 0.",input:[],output:``,constraints:[`Массив может содержать целые числа или числа с плавающей точкой`,`Массив может быть пустым (тогда возвращается 0)`,`Длина массива не превышает 1000 элементов`,`Результат может быть дробным числом`],example:`Вход: [1, 2, 3, 4]
Выход: 2.5

Вход: [10, 20, 30]
Выход: 20

Вход: [5]
Выход: 5

Вход: []
Выход: 0`},starterCode:`function findAverage(arr) {
    // TODO: write your solution here
    return 0;
}
`,tests:[{name:`[1, 2, 3, 4]`,args:[[1,2,3,4]],expected:2.5},{name:`[10, 20, 30]`,args:[[10,20,30]],expected:20},{name:`Пустой массив → 0`,args:[[]],expected:0},{name:`Один элемент`,args:[[5]],expected:5,hidden:!0},{name:`Отрицательные числа`,args:[[-4,-2,0,2]],expected:-1,hidden:!0}]},{title:`Реализация стека на массиве (Array-Based Stack)`,difficulty:2,categories:[`Arrays`,`Stack`],languages:[`JavaScript`],functionName:`Stack`,description:{condition:"Реализуйте класс `Stack`, работающий на основе массива фиксированного размера с автоматическим увеличением при заполнении.\n\nКласс должен поддерживать:\n\nИнициализацию с заданной начальной ёмкостью (`capacity`)\n\n`push(value)` — добавление элемента в стек. Если внутренний массив заполнен, его размер увеличивается вдвое перед вставкой.\n\n`peek()` — возвращает последний добавленный элемент без удаления. Если стек пуст — возвращает `null`.\n\n`pop()` — возвращает последний добавленный элемент и удаляет его из стека (уменьшает логический размер). Если стек пуст — возвращает `null`.\n\n`isEmpty()` — возвращает `true`, если элементов в стеке нет, иначе `false`.\n\n`size()` — возвращает текущее количество элементов в стеке.",input:["`capacity` — начальная ёмкость стека (целое положительное число), передаётся в конструктор","Далее — последовательность вызовов методов `push` / `pop` / `peek` / `isEmpty` / `size`"],output:"Результат каждого вызова: `push` ничего не возвращает, `pop` и `peek` — элемент или `null`, `isEmpty` — `true`/`false`, `size` — число",constraints:["`1 <= capacity <= 100`","Количество операций `0 <= n <= 1000`",`Значения элементов — целые числа`],example:`const stack = new Stack(2);
stack.push(1);
stack.push(2);
stack.push(3);   // массив вырос вдвое

stack.peek();     // -> 3
stack.size();     // -> 3
stack.pop();      // -> 3
stack.isEmpty();  // -> false`},starterCode:`// Доступно без импорта: встроенные методы JS
class Stack {
  constructor(capacity) {
    // TODO: напишите решение здесь
  }

  push(value) {
    // TODO: напишите решение здесь
  }

  pop() {
    // TODO: напишите решение здесь
    return null;
  }

  peek() {
    // TODO: напишите решение здесь
    return null;
  }

  isEmpty() {
    // TODO: напишите решение здесь
    return true;
  }

  size() {
    // TODO: напишите решение здесь
    return 0;
  }
}
`,tests:[{name:`Пример из условия`,body:`const s = new solution(2);
const out = [];
out.push(s.push(1) ?? null, s.push(2) ?? null, s.push(3) ?? null);
out.push(s.peek(), s.size(), s.pop(), s.isEmpty());
return out;`,expected:[null,null,null,3,3,3,!1]},{name:`Пустой стек: pop и peek возвращают null`,body:`const s = new solution(3);
return [s.pop(), s.peek(), s.isEmpty(), s.size()];`,expected:[null,null,!0,0]},{name:`LIFO-порядок сохраняется`,body:`const s = new solution(1);
s.push("a"); s.push("b"); s.push("c");
return [s.pop(), s.pop(), s.pop(), s.pop()];`,expected:[`c`,`b`,`a`,null],hidden:!0},{name:`Рост ёмкости не теряет элементы`,body:`const s = new solution(2);
for (let i = 1; i <= 10; i++) s.push(i);
return [s.size(), s.peek(), s.pop(), s.size()];`,expected:[10,10,10,9],hidden:!0},{name:`Повторное использование после опустошения`,body:`const s = new solution(2);
s.push(1); s.pop();
s.push(7);
return [s.size(), s.peek(), s.isEmpty()];`,expected:[1,7,!1],hidden:!0}]},{title:`Сумма элементов массива (Array Sum)`,difficulty:1,categories:[`Arrays`],languages:[`JavaScript`],functionName:`sumArray`,description:{condition:"Напишите функцию `sumArray`, которая принимает массив чисел и возвращает сумму всех его элементов.",input:[],output:``,constraints:[`Массив может содержать целые числа (положительные, отрицательные или ноль)`,`Массив может быть пустым (тогда сумма равна 0)`,`Длина массива не превышает 1000 элементов`],example:`Вход: [1, 2, 5]
Выход: 8

Вход: [10, -5, 3]
Выход: 8

Вход: []
Выход: 0

Вход: [42]
Выход: 42`},starterCode:`function sumArray(arr) {
    // TODO: write your solution here
    return 0;
}
`,tests:[{name:`[1, 2, 5]`,args:[[1,2,5]],expected:8},{name:`[10, -5, 3]`,args:[[10,-5,3]],expected:8},{name:`Пустой массив → 0`,args:[[]],expected:0},{name:`Один элемент`,args:[[42]],expected:42,hidden:!0},{name:`Только отрицательные`,args:[[-1,-2,-3]],expected:-6,hidden:!0}]},{title:`Преобразование массива свойств в объект (Array to Object Mapping)`,difficulty:1,categories:[`Objects`],languages:[`JavaScript`],functionName:`arrayToObject`,description:{condition:"С бекенда приходит массив объектов. Каждый объект содержит два поля:\n\n`name` — название свойства;\n\n`value` — значение свойства.\n\nНеобходимо написать функцию, которая преобразует такой массив в один объект, где каждый `name` становится ключом, а соответствующий `value` становится значением.\n\nЕсли в массиве несколько объектов с одинаковым `name`, нужно использовать значение из последнего такого объекта.",input:[`Массив объектов вида:`,`[
  { name: "width", value: 10 },
  { name: "height", value: 20 }
]`],output:"Объект, где ключи — это значения поля `name`, а значения — это значения поля `value`.",constraints:[`0 <= arr.length <= 10 000`,`name — непустая строка`,`value — любое примитивное значение: number, string, boolean, null`,`Если name повторяется, используется последнее значение`],example:`Вход:

[
  { name: "width", value: 10 },
  { name: "height", value: 20 }
]

Выход:

{
  width: 10,
  height: 20
}`},starterCode:`function arrayToObject(arr) {
  // TODO: напишите решение здесь
  return {};
}
`,tests:[{name:`Два свойства`,args:[[{name:`width`,value:10},{name:`height`,value:20}]],expected:{width:10,height:20}},{name:`Пустой массив`,args:[[]],expected:{}},{name:`Повтор name — побеждает последнее значение`,args:[[{name:`color`,value:`red`},{name:`color`,value:`blue`}]],expected:{color:`blue`}},{name:`Разные типы значений`,args:[[{name:`a`,value:null},{name:`b`,value:!1},{name:`c`,value:`x`}]],expected:{a:null,b:!1,c:`x`},hidden:!0},{name:`Повтор среди других ключей`,args:[[{name:`x`,value:1},{name:`y`,value:2},{name:`x`,value:3}]],expected:{x:3,y:2},hidden:!0}]},{title:`Массив в объект с нулевыми значениями (Array to Zero-Value Object)`,difficulty:1,categories:[`Objects`],languages:[`JavaScript`],functionName:`foo`,description:{condition:"Реализуйте функцию `foo`, которая принимает массив элементов и возвращает объект, где каждый элемент массива становится ключом, а его значением всегда является `0`.",input:["`arr` — массив строк или чисел (длина от 0 до 10⁴)"],output:"Объект (словарь), где каждый ключ — элемент из `arr` (приведённый к строке), а значение — `0`.",constraints:["`0 <= arr.length <= 10000`",`Элементы массива могут повторяться — в этом случае ключ в объекте один`,`Элементы массива — строки или числа`],example:`Вход: ["a", "b", "c"]
Выход: {"a": 0, "b": 0, "c": 0}

Вход: [1, 2, 2, 3]
Выход: {"1": 0, "2": 0, "3": 0}

Вход: []
Выход: {}`},starterCode:`// Доступно без импорта: встроенные методы JS
function foo(arr) {
  // TODO: напишите решение здесь
  return {};
}
`,tests:[{name:`["a", "b", "c"]`,args:[[`a`,`b`,`c`]],expected:{a:0,b:0,c:0}},{name:`Дубликаты схлопываются`,args:[[1,2,2,3]],expected:{1:0,2:0,3:0}},{name:`Пустой массив`,args:[[]],expected:{}},{name:`Числа приводятся к строкам-ключам`,args:[[10]],expected:{10:0},hidden:!0},{name:`Смешанные строки и числа`,args:[[`x`,1,`x`]],expected:{1:0,x:0},hidden:!0}]},{title:`Поиск статей по слову (Article Word Search)`,difficulty:3,categories:[`Search`],languages:[`JavaScript`],functionName:`createArticleStorage`,description:{condition:'Необходимо реализовать простое хранилище статей.\n\nФункция `createArticleStorage()` возвращает объект с двумя методами:\n\n`addArticle(articleId, text)` — сохраняет статью по идентификатору `articleId`. Если статья с таким `articleId` уже существует, её текст нужно заменить на новый.\n\n`search(word)` — возвращает список всех `articleId`, в тексте которых есть заданное слово. Слово должно искаться как отдельное слово, а не как часть другого: `"test"` есть в `"this is test article"`, но не в `"test2"`.\n\nПорядок идентификаторов в результате — порядок добавления статей.',input:["`articleId` — строковый идентификатор статьи","`text` — текст статьи","`word` — слово для поиска"],output:"`search(word)` — массив `articleId`, в которых найдено заданное слово",constraints:["`1 <= articleId.length <= 100`","`1 <= text.length <= 10000`","`1 <= word.length <= 100`",`Количество статей <= 10000`,`Текст состоит из латинских букв, цифр, пробелов и знаков препинания`],example:`const { addArticle, search } = createArticleStorage();

addArticle("article111", "this is test1 article");
addArticle("article112", "this is test2 article");
addArticle("article113", "this is test article");

search("test");    // -> ["article113"]
search("article"); // -> ["article111", "article112", "article113"]`},starterCode:`// Доступно без импорта: встроенные методы JS

function createArticleStorage() {
  const storage = {};

  function addArticle(articleId, text) {
    // TODO: напишите решение здесь
  }

  function search(word) {
    // TODO: напишите решение здесь
    return [];
  }

  return { addArticle, search };
}
`,tests:[{name:`Слово ищется целиком, а не как подстрока`,body:`const s = solution();
s.addArticle("a111", "this is test1 article");
s.addArticle("a112", "this is test2 article");
s.addArticle("a113", "this is test article");
return s.search("test");`,expected:[`a113`]},{name:`Слово есть во всех статьях`,body:`const s = solution();
s.addArticle("a111", "this is test1 article");
s.addArticle("a112", "this is test2 article");
return s.search("article");`,expected:[`a111`,`a112`]},{name:`Слово не найдено`,body:`const s = solution();
s.addArticle("a1", "hello world");
return s.search("missing");`,expected:[]},{name:`Повторный addArticle заменяет текст`,body:`const s = solution();
s.addArticle("a1", "first text");
s.addArticle("a1", "second text");
return [s.search("first"), s.search("second")];`,expected:[[],[`a1`]],hidden:!0},{name:`Знаки препинания не мешают найти слово`,body:`const s = solution();
s.addArticle("a1", "Hello, world! Testing.");
return [s.search("world"), s.search("testing")];`,expected:[[`a1`],[`a1`]],hidden:!0}]},{title:`Асинхронный фильтр массива (Async Array Filter)`,difficulty:3,categories:[`Asynchronous`],languages:[`JavaScript`],functionName:`asyncFilter`,description:{condition:`Реализуйте асинхронную функцию \`asyncFilter()\`, которая фильтрует массив, используя асинхронную функцию-предикат.

Параметры функции:

\`array\` (массив) - исходный массив для фильтрации

\`callback\` (асинхронная функция) - предикат, возвращающий Promise с boolean или number (где truthy/falsy определяет включение)`,input:[],output:``,constraints:[`Функция должна обрабатывать элементы параллельно (Promise.all)`,`Результат должен сохранять исходный порядок элементов`,`Возвращать Promise с отфильтрованным массивом`,`Если callback возвращает число, оно преобразуется в boolean (0 = false, остальное = true)`,`Не использовать внешние библиотеки`,`Размер массива ≤ 1000`,`Время выполнения ≤ 5 секунд`],example:`const isOdd = (num) => {
    return new Promise((resolve) => setTimeout(() => resolve(num % 2), 500))
}

asyncFilter([1, 2, 3, 4, 5], isOdd).then(result => {
    console.log(result); // [1, 3, 5]
});`},starterCode:`async function asyncFilter(array, callback) {
    // TODO: напишите решение здесь
    return [];
}
`,tests:[{name:`Нечётные числа (предикат возвращает число)`,body:`const isOdd = (n) => new Promise((r) => setTimeout(() => r(n % 2), 5));
return await solution([1, 2, 3, 4, 5], isOdd);`,expected:[1,3,5]},{name:`Пустой массив`,body:`return await solution([], async () => true);`,expected:[]},{name:`Все элементы отфильтрованы`,body:`return await solution([1, 2, 3], async () => false);`,expected:[]},{name:`Порядок сохраняется при разных задержках`,body:`const slowFirst = (n) => new Promise((r) => setTimeout(() => r(true), n === 1 ? 30 : 1));
return await solution([1, 2, 3], slowFirst);`,expected:[1,2,3],hidden:!0},{name:`Элементы обрабатываются параллельно`,body:`let running = 0;
let peak = 0;
const cb = async () => {
  running++;
  peak = Math.max(peak, running);
  await new Promise((r) => setTimeout(r, 10));
  running--;
  return true;
};
await solution([1, 2, 3, 4], cb);
return peak;`,expected:4,hidden:!0}]},{title:`Проверка чётности/нечётности через Promise (Async Even/Odd Check)`,difficulty:2,categories:[`Asynchronous`],languages:[`JavaScript`],functionName:`checkEvenOdd`,description:{condition:'Реализуйте функцию `checkEvenOdd`, которая принимает один аргумент и возвращает `Promise`. Если переданное значение является числом, промис должен резолвиться строкой `"even"`, если число чётное, или строкой `"odd"`, если нечётное. Если переданное значение не является числом (либо является `NaN`), промис должен резолвиться значением `-1` (не reject, а именно resolve с -1).',input:["`value` — любое значение (число, строка, объект, `NaN`, и т.д.)"],output:'`Promise<string | number>`, резолвящийся в `"even"`, `"odd"` или `-1`',constraints:[`Числа могут быть отрицательными и дробными (дробное число также считается "не числом" для чётности — приводится к ошибке, т.е. -1, если не является целым)`,"`NaN` считается невалидным входом → `-1`","Без реальных задержек (`setTimeout`) — только микротаски, для детерминированности"],example:`Вход: 4       → Выход: "even"
Вход: 7       → Выход: "odd"
Вход: "abc"   → Выход: -1
Вход: NaN     → Выход: -1
Вход: 3.5     → Выход: -1`},starterCode:`// Доступно без импорта: встроенные методы JS

function checkEvenOdd(value) {
  // TODO: напишите решение здесь
  return Promise.resolve(-1);
}
`,tests:[{name:`4 → even`,args:[4],expected:`even`},{name:`7 → odd`,args:[7],expected:`odd`},{name:`"abc" → -1`,args:[`abc`],expected:-1},{name:`NaN → -1`,args:[NaN],expected:-1,hidden:!0},{name:`3.5 → -1`,args:[3.5],expected:-1,hidden:!0},{name:`Отрицательное чётное`,args:[-8],expected:`even`,hidden:!0},{name:`0 → even`,args:[0],expected:`even`,hidden:!0}]},{title:`Мемоизация асинхронной функции с TTL (Async Memoize with TTL)`,difficulty:3,categories:[`Caching`],languages:[`JavaScript`],functionName:`memoize`,description:{condition:"Реализуйте функцию `memoize(fn, ttl)`, которая принимает асинхронную функцию `fn` и время жизни кэша `ttl` в миллисекундах. Функция возвращает обёртку, которая при первом вызове выполняет `fn`, кэширует результат и возвращает его. При повторных вызовах в течение `ttl` миллисекунд возвращает закэшированный результат, не вызывая `fn`. После истечения `ttl` кэш инвалидируется, и следующий вызов снова выполнит `fn`.",input:["`fn` — асинхронная функция без аргументов, возвращает `Promise`","`ttl` — число, время жизни кэша в миллисекундах"],output:"Функция-обёртка, которая возвращает `Promise` с результатом — закэшированным или свежим.",constraints:["`ttl >= 0`","`fn` всегда возвращает `Promise`",`Функция без аргументов (кэш единственный, без ключей)`,"Параллельные вызовы во время выполнения `fn` не должны запускать `fn` повторно (дедупликация in-flight запросов)"],example:`Вход: fn = async () => ++count, ttl = 3000
await memoize(fn, 3000)()  // fn вызвана → 1
// (через 1000 мс)
await memoize(fn, 3000)()  // кэш → 1
// (через ещё 2500 мс, итого 3500 мс)
await memoize(fn, 3000)()  // кэш истёк, fn вызвана → 2
Выход: 1, 1, 2`},starterCode:`// Доступно без импорта: встроенные методы JS

function memoize(fn, ttl) {
  // TODO: напишите решение здесь
  return async function() {
    return fn();
  };
}
`,tests:[{name:`Второй вызов внутри TTL берётся из кэша`,body:`let calls = 0;
const fn = async () => ++calls;
const memo = solution(fn, 200);
const a = await memo();
const b = await memo();
return [a, b, calls];`,expected:[1,1,1]},{name:`После истечения TTL функция вызывается заново`,body:`let calls = 0;
const fn = async () => ++calls;
const memo = solution(fn, 50);
const a = await memo();
await new Promise((r) => setTimeout(r, 80));
const b = await memo();
return [a, b, calls];`,expected:[1,2,2]},{name:`Параллельные вызовы не дублируют запрос`,body:`let calls = 0;
const fn = () => new Promise((r) => setTimeout(() => r(++calls), 30));
const memo = solution(fn, 200);
const [a, b, c] = await Promise.all([memo(), memo(), memo()]);
return [a, b, c, calls];`,expected:[1,1,1,1],hidden:!0},{name:`ttl = 0 — кэш не переживает вызов`,body:`let calls = 0;
const fn = async () => ++calls;
const memo = solution(fn, 0);
await memo();
await new Promise((r) => setTimeout(r, 5));
await memo();
return calls;`,expected:2,hidden:!0}]},{title:`Банкомат (ATM)`,difficulty:2,categories:[`Data structures`],languages:[`JavaScript`],functionName:`getMoney`,description:{condition:`Напишите функцию \`getMoney\`, которая принимает сумму денег и возвращает объект (словарь) с количеством купюр по каждому номиналу. Банкомат должен выдать сумму, используя минимальное количество банкнот.

Доступные номиналы: 50, 100, 500, 1000, 5000 рублей.`,input:[],output:``,constraints:[`Сумма всегда кратна минимальному номиналу (50 рублей)`,`Сумма может быть равна 0`,`Сумма не превышает 100000 рублей`],example:`Вход: 6200
Выход: {5000: 1, 1000: 1, 500: 0, 100: 2, 50: 0}

Вход: 1500
Выход: {5000: 0, 1000: 1, 500: 1, 100: 0, 50: 0}

Вход: 0
Выход: {5000: 0, 1000: 0, 500: 0, 100: 0, 50: 0}

Вход: 50
Выход: {5000: 0, 1000: 0, 500: 0, 100: 0, 50: 1}`},starterCode:`function getMoney(amount) {
    // TODO: write your solution here
    return { 5000: 0, 1000: 0, 500: 0, 100: 0, 50: 0 };
}
`,tests:[{name:`6200`,args:[6200],expected:{50:0,100:2,500:0,1e3:1,5e3:1}},{name:`1500`,args:[1500],expected:{50:0,100:0,500:1,1e3:1,5e3:0}},{name:`0 — все нули`,args:[0],expected:{50:0,100:0,500:0,1e3:0,5e3:0}},{name:`50`,args:[50],expected:{50:1,100:0,500:0,1e3:0,5e3:0},hidden:!0},{name:`Максимальная сумма`,args:[1e5],expected:{50:0,100:0,500:0,1e3:0,5e3:20},hidden:!0},{name:`Задействованы все номиналы`,args:[6650],expected:{50:1,100:1,500:1,1e3:1,5e3:1},hidden:!0}]},{title:`Базовый EventEmitter (Basic EventEmitter)`,difficulty:2,categories:[`Data structures`],languages:[`JavaScript`],functionName:`EventEmitter`,description:{condition:"Реализуйте класс `EventEmitter` с методами для работы с событиями.\n\nКласс должен содержать следующие методы:\n\n`on(eventName, callback)` — подписка на событие. Добавляет обработчик `callback` для события `eventName`. Если на событие уже подписаны другие обработчики, новый должен добавляться в конец списка.\n\n`off(eventName, callback)` — отписка от события. Удаляет указанный обработчик `callback` для события `eventName`. Если обработчик не был подписан, метод ничего не делает.\n\n`emit(eventName)` — вызов всех обработчиков события. Принимает название события и вызывает все подписанные на него функции в порядке их добавления.\n\nПример использования:",input:[],output:``,constraints:[`Нужно использовать предоставленный шаблон класса.`,`Обработчики должны вызываться в порядке их добавления.`,"При `emit` в обработчики должны передаваться все аргументы, переданные в `emit` после названия события."],example:`const emitter = new EventEmitter();

function handler1(data) {
    console.log('handler1', data);
}
function handler2(data) {
    console.log('handler2', data);
}

emitter.on('event1', handler1);
emitter.on('event1', handler2);

emitter.emit('event1', 'test'); // handler1 test, handler2 test

emitter.off('event1', handler1);
emitter.emit('event1', 'test2'); // handler2 test2`},starterCode:`class EventEmitter {
    constructor() {
        // TODO: initialize your event storage
    }

    on(eventName, callback) {
        // TODO: implement
    }

    off(eventName, callback) {
        // TODO: implement
    }

    emit(eventName, ...args) {
        // TODO: implement
    }
}
`,tests:[{name:`Обработчики вызываются в порядке подписки`,body:`const e = new solution();
const calls = [];
e.on("x", (v) => calls.push("first:" + v));
e.on("x", (v) => calls.push("second:" + v));
e.emit("x", 1);
return calls;`,expected:[`first:1`,`second:1`]},{name:`off снимает только указанный обработчик`,body:`const e = new solution();
const calls = [];
const h1 = () => calls.push("h1");
const h2 = () => calls.push("h2");
e.on("x", h1);
e.on("x", h2);
e.off("x", h1);
e.emit("x");
return calls;`,expected:[`h2`]},{name:`emit неизвестного события ничего не ломает`,body:`const e = new solution();
e.emit("nothing", 1, 2);
return "ok";`,expected:`ok`},{name:`В обработчик передаются все аргументы`,body:`const e = new solution();
let got = null;
e.on("x", (...args) => { got = args; });
e.emit("x", 1, "two", { three: 3 });
return got;`,expected:[1,`two`,{three:3}],hidden:!0},{name:`События независимы друг от друга`,body:`const e = new solution();
const calls = [];
e.on("a", () => calls.push("a"));
e.on("b", () => calls.push("b"));
e.emit("b");
e.emit("a");
return calls;`,expected:[`b`,`a`],hidden:!0},{name:`off несуществующего обработчика — не ошибка`,body:`const e = new solution();
const calls = [];
const h = () => calls.push("h");
e.off("x", h);
e.on("x", h);
e.emit("x");
return calls;`,expected:[`h`],hidden:!0}]},{title:`Лучший покупатель (Best Buyer)`,difficulty:3,categories:[`Asynchronous`],languages:[`JavaScript`],functionName:`bestBuyer`,description:{condition:`Есть список покупателей, каждый из которых предлагает свою цену за рекламное место и асинхронно отвечает — согласен он купить или нет. Опрашивать покупателей нужно параллельно.

Напишите функцию, которая принимает массив покупателей и возвращает индекс покупателя с наибольшей ценой среди тех, кто ответил согласием. При этом функция должна завершиться как можно быстрее — то есть не ждать тех, кто заведомо не может улучшить результат.

Покупатель с более высокой ценой имеет приоритет. Если он ещё не ответил — нужно дождаться его ответа, прежде чем вернуть результат с меньшей ценой. Если все покупатели с более высокой ценой ответили отказом — возвращаем лучшего из оставшихся согласившихся.`,input:["`buyers` — массив объектов:",`{ price: number, response: () => Promise<boolean> }`,"Покупатели не отсортированы. `response()` возвращает промис, который резолвится в `true` (согласен) или `false` (отказ)."],output:"`Promise<number>` — индекс лучшего покупателя, или `-1` если никто не согласился.",constraints:["`1 <= buyers.length <= 100`",`Каждый покупатель отвечает ровно один раз`,`Цены уникальны`],example:`Вход:

buyers = [
  { price: 1,  response: () => asyncResponse(true,  500) },
  { price: 10, response: () => asyncResponse(false, 200) },
  { price: 5,  response: () => asyncResponse(true,  100) }
]

Выход: \`2\` (покупатель с ценой 5, индекс 2 — покупатель с ценой 10 ответил отказом, покупатель с ценой 1 ещё не ответил, но его цена ниже)

Время выполнения: ~200мс (не 300мс и не 600мс)`},starterCode:`// Доступно без импорта: встроенные методы JS

function bestBuyer(buyers) {
  // TODO: напишите решение здесь
  return Promise.resolve(-1);
}
`,tests:[{name:`Пример из условия`,body:`const after = (value, ms) => new Promise((r) => setTimeout(() => r(value), ms));
return await solution([
  { price: 1, response: () => after(true, 100) },
  { price: 10, response: () => after(false, 40) },
  { price: 5, response: () => after(true, 20) },
]);`,expected:2},{name:`Никто не согласился`,body:`const after = (value, ms) => new Promise((r) => setTimeout(() => r(value), ms));
return await solution([
  { price: 3, response: () => after(false, 10) },
  { price: 7, response: () => after(false, 20) },
]);`,expected:-1},{name:`Самая высокая цена побеждает, даже если отвечает последней`,body:`const after = (value, ms) => new Promise((r) => setTimeout(() => r(value), ms));
return await solution([
  { price: 2, response: () => after(true, 5) },
  { price: 9, response: () => after(true, 60) },
]);`,expected:1},{name:`Не ждёт заведомо проигрышного покупателя`,body:`let slowSettled = false;
const after = (value, ms) => new Promise((r) => setTimeout(() => r(value), ms));
const buyers = [
  { price: 1, response: () => new Promise((r) => setTimeout(() => { slowSettled = true; r(true); }, 300)) },
  { price: 10, response: () => after(false, 20) },
  { price: 5, response: () => after(true, 10) },
];
const index = await solution(buyers);
return [index, slowSettled];`,expected:[2,!1],hidden:!0},{name:`Единственный покупатель`,body:`return await solution([{ price: 4, response: async () => true }]);`,expected:0,hidden:!0}]},{title:`Объединение книг и рецензий (Books and Reviews Merge)`,difficulty:2,categories:[`Dictionaries`],languages:[`JavaScript`],functionName:`mergeBooksAndReviews`,description:{condition:`Даны два массива:

\`books\` — список книг;

\`reviews\` — список рецензий.

У каждой книги есть уникальный \`id\`.
У каждой рецензии есть поле \`bookId\`, которое указывает, к какой книге относится рецензия.

Нужно вернуть новый массив книг, где к каждой книге добавлено поле \`reviews\`.
В это поле нужно положить все рецензии, относящиеся к этой книге.

Если у книги нет рецензий, поле \`reviews\` должно быть пустым массивом.

Задача взята из обсуждения на интервью: нужно было объединить массив книг и массив рецензий по \`bookId\`.`,input:["`books` — массив объектов:",`[
  { id: 1, title: "War and Peace" }
]`,"`reviews` — массив объектов:",`[
  { id: 101, bookId: 1, text: "Great book" }
]`],output:`Новый массив книг:
[
  {
    id: 1,
    title: "War and Peace",
    reviews: [
      { id: 101, bookId: 1, text: "Great book" }
    ]
  }
]`,constraints:["`0 <= books.length <= 10^4`","`0 <= reviews.length <= 10^4`","`id` книги уникален","`bookId` в рецензии может ссылаться на существующую книгу","порядок книг в результате должен совпадать с исходным массивом `books`","порядок рецензий внутри каждой книги должен совпадать с исходным массивом `reviews`"],example:`Вход:

books = [
  { id: 1, title: "War and Peace" },
  { id: 2, title: "1984" }
]

reviews = [
  { id: 101, bookId: 1, text: "Excellent" },
  { id: 102, bookId: 1, text: "Long but good" }
]

Выход:

[
  {
    id: 1,
    title: "War and Peace",
    reviews: [
      { id: 101, bookId: 1, text: "Excellent" },
      { id: 102, bookId: 1, text: "Long but good" }
    ]
  },
  {
    id: 2,
    title: "1984",
    reviews: []
  }
]`},starterCode:`function mergeBooksAndReviews(books, reviews) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Одна книга с одной рецензией`,args:[[{id:1,title:`War and Peace`}],[{id:101,bookId:1,text:`Great book`}]],expected:[{id:1,title:`War and Peace`,reviews:[{id:101,bookId:1,text:`Great book`}]}]},{name:`Книга без рецензий получает пустой массив`,args:[[{id:1,title:`War and Peace`},{id:2,title:`1984`}],[{id:101,bookId:1,text:`Excellent`},{id:102,bookId:1,text:`Long but good`}]],expected:[{id:1,title:`War and Peace`,reviews:[{id:101,bookId:1,text:`Excellent`},{id:102,bookId:1,text:`Long but good`}]},{id:2,title:`1984`,reviews:[]}]},{name:`Пустые входные массивы`,args:[[],[]],expected:[]},{name:`Рецензия на несуществующую книгу игнорируется`,args:[[{id:1,title:`A`}],[{id:1,bookId:99,text:`orphan`},{id:2,bookId:1,text:`ok`}]],expected:[{id:1,title:`A`,reviews:[{id:2,bookId:1,text:`ok`}]}],hidden:!0},{name:`Порядок книг и рецензий не меняется`,args:[[{id:2,title:`B`},{id:1,title:`A`}],[{id:11,bookId:1,text:`first`},{id:12,bookId:2,text:`second`},{id:13,bookId:1,text:`third`}]],expected:[{id:2,title:`B`,reviews:[{id:12,bookId:2,text:`second`}]},{id:1,title:`A`,reviews:[{id:11,bookId:1,text:`first`},{id:13,bookId:1,text:`third`}]}],hidden:!0}]},{title:`День максимальной загрузки отеля (Busiest Hotel Day)`,difficulty:3,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`findBusiestDay`,description:{condition:"Напишите функцию `findBusiestDay`, которая принимает массив бронирований `bookings`, где каждый элемент — это подмассив `[checkIn, checkOut]`, и возвращает день (число), когда в отеле было максимальное количество клиентов.\n\n`checkIn` — день заезда клиента\n\n`checkOut` — день выезда клиента (клиент ещё находится в отеле в этот день?)\n\nЕсли несколько дней имеют одинаковую максимальную загрузку, вернуть наименьший день\n\nВажно: Клиент занимает номер включительно с `checkIn` по `checkOut`",input:[],output:``,constraints:["`checkIn` всегда меньше `checkOut`",`Дни — положительные целые числа`,`Количество бронирований не превышает 1000`,`Диапазон дней может быть любым (не обязательно с 1)`],example:`Вход: [[1, 5], [2, 4], [3, 6]]
Выход: 3
Пояснение: В день 3 в отеле 3 клиента (1-й, 2-й и 3-й)

Вход: [[1, 3], [2, 4], [3, 5]]
Выход: 3
Пояснение: В день 3 в отеле 3 клиента

Вход: [[1, 2], [2, 3], [3, 4]]
Выход: 2
Пояснение: В день 2 в отеле 2 клиента (1-й и 2-й)

Вход: [[1, 10]]
Выход: 1
Пояснение: Только один клиент, максимальная загрузка в любой день с 1 по 9, возвращаем наименьший`},starterCode:`function findBusiestDay(bookings) {
    // TODO: write your solution here
    return 0;
}
`,tests:[{name:`[[1,5],[2,4],[3,6]] → 3`,args:[[[1,5],[2,4],[3,6]]],expected:3},{name:`[[1,3],[2,4],[3,5]] → 3`,args:[[[1,3],[2,4],[3,5]]],expected:3},{name:`[[1,2],[2,3],[3,4]] → 2 (наименьший из равных)`,args:[[[1,2],[2,3],[3,4]]],expected:2},{name:`Одно бронирование`,args:[[[1,10]]],expected:1,hidden:!0},{name:`Непересекающиеся брони — первый день`,args:[[[10,12],[50,52]]],expected:10,hidden:!0},{name:`Пик не совпадает с первым днём заезда`,args:[[[1,2],[5,9],[6,9],[7,9]]],expected:7,hidden:!0}]},{title:`Рецепт пирожных (Cakes Recipe)`,difficulty:2,categories:[`Objects`],languages:[`JavaScript`],functionName:`cakes`,description:{condition:`Напишите функцию \`cakes\`, которая принимает рецепт (объект) и доступные ингредиенты (объект) и возвращает максимальное количество пирожных, которое можно испечь (целое число). Для простоты не существует единиц измерения количества. Ингредиенты, которых нет в доступных, можно рассматривать как 0.

Правила:

Рецепт содержит необходимые ингредиенты и их количество на одно пирожное

Доступные ингредиенты содержат имеющееся количество

Возвращается максимальное целое количество пирожных

Если какого-то ингредиента из рецепта нет в доступных, возвращается 0`,input:[],output:``,constraints:[`Количество ингредиентов: 1 ≤ N ≤ 100`,`Значения: целые положительные числа`,`Время выполнения: O(N)`,`Память: O(1)`],example:`cakes(
    { flour: 500, sugar: 200, eggs: 1 },
    { flour: 1200, sugar: 1200, eggs: 5, milk: 200 }
) // -> 2

cakes(
    { apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100 },
    { apples: 500, flour: 2000, milk: 2000 }
) // -> 0`},starterCode:`function cakes(recipe, ingredients) {
    // TODO: write your solution here
    return 0;
}
`,tests:[{name:`Хватает на два пирожных`,args:[{flour:500,sugar:200,eggs:1},{flour:1200,sugar:1200,eggs:5,milk:200}],expected:2},{name:`Не хватает ингредиента — 0`,args:[{apples:3,flour:300,sugar:150,milk:100,oil:100},{apples:500,flour:2e3,milk:2e3}],expected:0},{name:`Ровно на одно пирожное`,args:[{flour:100},{flour:100}],expected:1},{name:`Ингредиента нет вовсе`,args:[{flour:10,salt:1},{flour:1e3}],expected:0,hidden:!0},{name:`Лимитирует самый дефицитный ингредиент`,args:[{flour:10,sugar:10},{flour:1e3,sugar:35}],expected:3,hidden:!0}]},{title:`Заглавные буквы слов в строке (Capitalize First Letter of Each Word)`,difficulty:1,categories:[`Strings`],languages:[`JavaScript`],functionName:`capitalizeWords`,description:{condition:`Напишите функцию, которая принимает строку из одного или нескольких слов, разделённых пробелами, и возвращает строку, в которой первая буква каждого слова сделана заглавной, а остальные буквы слова остаются без изменений.`,input:["`s` — строка, содержащая слова, разделённые одним пробелом (может быть пустой)"],output:`Строка, где первая буква каждого слова — заглавная, остальные символы слова не изменяются`,constraints:["`0 <= длина s <= 10^4`",`Строка состоит из строчных и заглавных латинских букв и пробелов`,`Слова разделены ровно одним пробелом, без начальных/конечных пробелов`],example:`Вход: "hello world"
Выход: "Hello World"

Вход: "already Capitalized"
Выход: "Already Capitalized"

Вход: ""
Выход: ""

Вход: "a"
Выход: "A"`},starterCode:`// Доступно без импорта: встроенные методы JS

function capitalizeWords(s) {
  // TODO: напишите решение здесь
  return "";
}
`,tests:[{name:`"hello world"`,args:[`hello world`],expected:`Hello World`},{name:`Остальные буквы не трогаем`,args:[`hELLo wORld`],expected:`HELLo WORld`},{name:`Пустая строка`,args:[``],expected:``},{name:`Одна буква`,args:[`a`],expected:`A`},{name:`Уже с заглавных`,args:[`already Capitalized`],expected:`Already Capitalized`,hidden:!0},{name:`Одно слово`,args:[`javascript`],expected:`Javascript`,hidden:!0}]},{title:`Сжатие строки с игнорированием регистра (Case-Insensitive Compression)`,difficulty:1,categories:[`Strings`],languages:[`JavaScript`],functionName:`getCompressedString`,description:{condition:`Напишите функцию \`getCompressedString\`, которая принимает строку и возвращает сжатую версию в формате \`букваЦифра\`, где:

Буквы приводятся к нижнему регистру

Подсчитывается количество последовательных вхождений каждой буквы (без учёта регистра)

Всегда добавляется количество повторений (даже если буква встретилась 1 раз)

Важно: Сжатие учитывает только последовательные повторения. Если одна и та же буква встречается снова после других букв, она считается отдельной группой.`,input:[],output:``,constraints:[`Строка содержит только латинские буквы (a-z, A-Z)`,`Длина строки: 0 ≤ N ≤ 1000`,`Регистр букв игнорируется`,`Время выполнения: O(N)`,`Память: O(N)`],example:`getCompressedString('aaAaBbBbDFFFff')
// -> 'a4b4d1f5'
// Пояснение:
// a a A a → 4 раза 'a'
// B b B b → 4 раза 'b'
// D → 1 раз 'd'
// F F F f f → 5 раз 'f'

getCompressedString('abc')        // -> 'a1b1c1'
getCompressedString('AAbb')       // -> 'a2b2'
getCompressedString('aAa')        // -> 'a3'
getCompressedString('')           // -> ''`},starterCode:`function getCompressedString(str) {
    // TODO: write your solution here
    return "";
}
`,tests:[{name:`'aaAaBbBbDFFFff'`,args:[`aaAaBbBbDFFFff`],expected:`a4b4d1f5`},{name:`'abc'`,args:[`abc`],expected:`a1b1c1`},{name:`Пустая строка`,args:[``],expected:``},{name:`'AAbb'`,args:[`AAbb`],expected:`a2b2`,hidden:!0},{name:`Повтор буквы после других — отдельная группа`,args:[`aabaa`],expected:`a2b1a2`,hidden:!0}]},{title:`Подсчёт вхождений символов (Character Count)`,difficulty:2,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`foo`,description:{condition:`Напишите функцию \`foo\`, которая принимает строку и возвращает список массивов, где каждый массив содержит символ и количество его вхождений в строке. Порядок должен соответствовать порядку первого появления символа в строке. Если строка пустая, вернуть пустой список.

Правила:

Подсчитывается каждый символ (буквы, цифры, пробелы, знаки пунктуации)

Регистр учитывается (заглавные и строчные буквы считаются разными символами)

Порядок определяется по первому вхождению символа

Возвращается массив пар [символ, количество]`,input:[],output:``,constraints:[`Длина строки: 0 ≤ N ≤ 1000`,`Символы: любые`,`Время выполнения: O(N)`,`Память: O(K), где K — количество уникальных символов`],example:`foo('abracadabra')  // -> [['a', 5], ['b', 2], ['r', 2], ['c', 1], ['d', 1]]
foo('hello')        // -> [['h', 1], ['e', 1], ['l', 2], ['o', 1]]
foo('aabbcc')       // -> [['a', 2], ['b', 2], ['c', 2]]
foo('')             // -> []`},starterCode:`function foo(text) {
    // TODO: write your solution here
    return [];
}
`,tests:[{name:`'abracadabra'`,args:[`abracadabra`],expected:[[`a`,5],[`b`,2],[`r`,2],[`c`,1],[`d`,1]]},{name:`'hello'`,args:[`hello`],expected:[[`h`,1],[`e`,1],[`l`,2],[`o`,1]]},{name:`Пустая строка`,args:[``],expected:[]},{name:`Регистр различается`,args:[`aAa`],expected:[[`a`,2],[`A`,1]],hidden:!0},{name:`Пробелы и знаки тоже считаются`,args:[`a b!`],expected:[[`a`,1],[` `,1],[`b`,1],[`!`,1]],hidden:!0}]},{title:`Списывание (Cheating Groups)`,difficulty:3,categories:[`Graphs`],languages:[`JavaScript`],functionName:`isBipartite`,description:{condition:`Во время контрольной работы профессор заметил обмен записками между некоторыми студентами. Он хочет разделить всех студентов на две группы так, чтобы любой обмен записками происходил только между студентами из разных групп (то есть внутри одной группы обменов быть не должно).

Дано количество студентов и список пар студентов, обменивавшихся записками. Необходимо определить, возможно ли такое разделение.`,input:["`n` — количество студентов (1 ≤ n ≤ 100), пронумерованы от 1 до n","`pairs` — массив пар чисел `[a, b]`, каждая пара — обмен записками между студентами a и b (каждая пара встречается не более одного раза, без пар вида `[a, a]`)"],output:"Булево значение: `true`, если разделение на две группы возможно, `false` — если нет.",constraints:[`1 ≤ n ≤ 100`,`0 ≤ количество пар ≤ n(n-1)/2`],example:`Вход: n=4, pairs=[[1,2],[2,3],[3,4]]
Выход: true

Вход: n=3, pairs=[[1,2],[2,3],[1,3]]
Выход: false`},starterCode:`function isBipartite(n, pairs) {
  // TODO: напишите решение здесь
  return false;
}
`,tests:[{name:`Цепочка из 4 студентов`,args:[4,[[1,2],[2,3],[3,4]]],expected:!0},{name:`Треугольник — разделить нельзя`,args:[3,[[1,2],[2,3],[1,3]]],expected:!1},{name:`Нет обменов вовсе`,args:[5,[]],expected:!0},{name:`Цикл чётной длины`,args:[4,[[1,2],[2,3],[3,4],[4,1]]],expected:!0,hidden:!0},{name:`Нечётный цикл в одной из компонент`,args:[6,[[1,2],[3,4],[4,5],[5,3]]],expected:!1,hidden:!0},{name:`Один студент`,args:[1,[]],expected:!0,hidden:!0}]},{title:`Проверка квадратных скобок (Check Square Brackets)`,difficulty:2,categories:[`Stack`],languages:[`JavaScript`],functionName:`check`,description:{condition:"Дана строка `case`, состоящая только из символов `[` и `]`.\n\nНужно проверить, правильно ли расположены квадратные скобки.\n\nСтрока считается корректной, если:\n\nкаждой открывающей скобке `[` соответствует закрывающая `]`;\n\nзакрывающая скобка `]` не появляется раньше соответствующей открывающей `[`;\n\nвсе открытые скобки закрыты.",input:[`case`],output:`true / false`,constraints:[`0 <= case.length <= 100000`,`case состоит только из символов "[" и "]"`],example:`Вход: [][[][]]
Выход: true`},starterCode:`function check(caseStr) {
  // TODO: напишите решение здесь
  return false;
}
`,tests:[{name:`"[][[][]]"`,args:[`[][[][]]`],expected:!0},{name:`"]["  — закрывающая раньше открывающей`,args:[`][`],expected:!1},{name:`Пустая строка`,args:[``],expected:!0},{name:`Незакрытая скобка`,args:[`[[]`],expected:!1,hidden:!0},{name:`Лишняя закрывающая`,args:[`[]]`],expected:!1,hidden:!0},{name:`Глубокая вложенность`,args:[`[[[[]]]]`],expected:!0,hidden:!0}]},{title:`Формирование строки классов (Class Names Builder)`,difficulty:3,categories:[`Recursion`],languages:[`JavaScript`],functionName:`classNames`,description:{condition:`Реализуйте функцию \`classNames\`, которая принимает любое количество аргументов без ограничения по типу и преобразует их в строку с именами классов, разделёнными пробелами.

Правила:

\`string\` — используется как есть

\`number\` (кроме 0) — преобразуется в строку

массивы — должны быть развернуты (рекурсивно)

из объектов добавляются ключи, значения которых можно привести к \`true\`

всё остальное игнорируется`,input:[],output:``,constraints:[`Количество аргументов: 0 ≤ N ≤ 100`,`Глубина вложенности массивов: 0 ≤ depth ≤ 10`,`Время выполнения: O(N), где N — общее количество обработанных элементов`,`Память: O(N)`],example:`classNames('a', null, false, 0, { b: undefined }, '') // -> 'a'

classNames(['a', true, 'b', () => 25], ['c', 'd'], 'e') // -> 'a b c d e'`},starterCode:`function classNames(...args) {
    // TODO: write your solution here
    return "";
}
`,tests:[{name:`Мусорные значения отбрасываются`,body:`return solution("a", null, false, 0, { b: undefined }, "");`,expected:`a`},{name:`Массивы разворачиваются`,body:`return solution(["a", true, "b", () => 25], ["c", "d"], "e");`,expected:`a b c d e`},{name:`Из объекта берутся truthy-ключи`,args:[{active:!0,disabled:!1,size:1}],expected:`active size`},{name:`Числа, кроме 0`,args:[1,0,-2],expected:`1 -2`,hidden:!0},{name:`Глубокая вложенность массивов`,args:[[`a`,[`b`,[`c`]]]],expected:`a b c`,hidden:!0},{name:`Без аргументов — пустая строка`,args:[],expected:``,hidden:!0}]},{title:`Счётчик с замыканием (Closure Counter)`,difficulty:2,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`createCounter`,description:{condition:`Напишите функцию \`createCounter\` (или \`count\`), которая возвращает внутреннюю функцию-счётчик. При каждом вызове внутренней функции счётчик увеличивается на 1 и возвращает текущее значение. Изначальное значение счётчика — 0.

Важно: Каждый вызов внешней функции должен создавать независимый счётчик со своим собственным состоянием.

Примеры использования`,input:[],output:``,constraints:[`Не использовать глобальные переменные`,`Не использовать объекты с методами (только функция)`,`Состояние должно быть инкапсулировано в замыкании`,`Счётчик начинается с 0, первый вызов возвращает 1`],example:`// Создаём первый счётчик
const counter1 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3

// Создаём второй независимый счётчик
const counter2 = createCounter();
console.log(counter2()); // 1 (новый счётчик начинается с 0 → 1)
console.log(counter1()); // 4 (первый счётчик продолжает счёт)

// Третий независимый счётчик
const counter3 = createCounter();
console.log(counter3()); // 1
console.log(counter3()); // 2`},starterCode:`function createCounter() {
    // TODO: write your solution here
    return function() {
        return 0;
    };
}
`,tests:[{name:`Счётчик растёт с каждого вызова`,body:`const c = solution();
return [c(), c(), c()];`,expected:[1,2,3]},{name:`Счётчики независимы`,body:`const a = solution();
const b = solution();
a(); a();
return [b(), a()];`,expected:[1,3]},{name:`Первый вызов возвращает 1`,body:`return solution()();`,expected:1,hidden:!0},{name:`Третий счётчик начинается заново`,body:`const a = solution();
for (let i = 0; i < 5; i++) a();
const c = solution();
return [c(), c(), a()];`,expected:[1,2,6],hidden:!0}]},{title:`Схлопывание пробелов в строке (Collapse Consecutive Spaces)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`collapseSpaces`,description:{condition:`Дана строка. Необходимо преобразовать её так, чтобы каждая последовательность из нескольких подряд идущих пробелов была заменена на один пробел. Остальные символы (включая одиночные пробелы) остаются без изменений. Ведущие и завершающие пробелы не удаляются — обрабатываются по тому же правилу (несколько подряд → один).`,input:["`s` — строка, может содержать буквы, цифры, знаки препинания и пробелы; длина от 0 до 10^5"],output:`Строка с схлопнутыми последовательными пробелами`,constraints:["`0 <= s.length <= 10^5`",`Обрабатывается только символ пробела (' '), табуляция и другие пробельные символы не учитываются`],example:`Вход: "hello   world"
Выход: "hello world"

Вход: "a  b    c"
Выход: "a b c"

Вход: "no extra spaces"
Выход: "no extra spaces"

Вход: "   leading and trailing   "
Выход: " leading and trailing "

Вход: ""
Выход: ""`},starterCode:`// Доступно без импорта: встроенные методы JS
function collapseSpaces(s) {
  // TODO: напишите решение здесь
  return "";
}
`,tests:[{name:`"hello   world"`,args:[`hello   world`],expected:`hello world`},{name:`"a  b    c"`,args:[`a  b    c`],expected:`a b c`},{name:`Без лишних пробелов`,args:[`no extra spaces`],expected:`no extra spaces`},{name:`Ведущие и завершающие пробелы схлопываются, но остаются`,args:[`   leading and trailing   `],expected:` leading and trailing `,hidden:!0},{name:`Пустая строка`,args:[``],expected:``,hidden:!0},{name:`Строка из одних пробелов`,args:[`     `],expected:` `,hidden:!0}]},{title:`Комбинации с суммой (Combinations with the sum)`,difficulty:2,categories:[`Dynamic programming`],languages:[`JavaScript`],functionName:`combinationSum2`,description:{condition:"Дан массив целых чисел `candidates` и целое число `target`.\nНеобходимо найти все уникальные комбинации элементов массива, сумма которых равна `target`.\n\nКаждое число из массива можно использовать не более одного раза в каждой комбинации.\n\nРешение не должно содержать дублирующихся комбинаций.",input:["Массив целых чисел `candidates`","Целое число `target`"],output:"Массив массивов, где каждый вложенный массив — уникальная комбинация чисел, дающая сумму `target`",constraints:[`Числа внутри каждой комбинации идут по возрастанию`,`Сами комбинации идут в лексикографическом порядке`,"`1 <= candidates.length <= 100`"],example:`Вход:
\`candidates = [10,1,2,7,6,1,5], target = 8\`

Выход:
\`[[1,1,6],[1,2,5],[1,7],[2,6]]\``},starterCode:`function combinationSum2(candidates, target) {
    // TODO: напишите решение здесь
    return [];
}
`,tests:[{name:`Пример из условия`,args:[[10,1,2,7,6,1,5],8],expected:[[1,1,6],[1,2,5],[1,7],[2,6]]},{name:`Комбинаций нет`,args:[[2,4],7],expected:[]},{name:`Один элемент равен target`,args:[[5],5],expected:[[5]]},{name:`Дубликаты не порождают одинаковых комбинаций`,args:[[2,5,2,1,2],5],expected:[[1,2,2],[5]],hidden:!0},{name:`Каждое число используется не более одного раза`,args:[[1,1,1],3],expected:[[1,1,1]],hidden:!0}]},{title:`Общее количество чисел на префиксах (Common Numbers in Prefixes)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`commonNumbersInPrefixes`,description:{condition:"Даны два массива целых чисел `a` и `b` длины `N`. Для каждого `K` от 1 до N нужно посчитать количество общих чисел в префиксах длины K массивов `a` и `b`.\n\nОбщие числа считаются без учёта кратности.\n\nМассивы содержат числа в диапазоне `1 ≤ a[i], b[i] ≤ 10^9`.",input:[],output:``,constraints:[],example:"a = [1, 2, 5, 2, 7, 9]\nb = [2, 5, 8, 1, 9, 3]\n\nres = [0, 1, 2, 3, 3, 4]\n\nПояснение:\n\nПрефиксы длины 1: `[1]` и `[2]` → пересечение {} → 0\n\nПрефиксы длины 2: `[1,2]` и `[2,5]` → пересечение {2} → 1\n\nПрефиксы длины 3: `[1,2,5]` и `[2,5,8]` → {2,5} → 2\n\nПрефиксы длины 4: `[1,2,5,2]` и `[2,5,8,1]` → {1,2,5} → 3\n\nПрефиксы длины 5: `[1,2,5,2,7]` и `[2,5,8,1,9]` → {1,2,5} → 3\n\nПрефиксы длины 6: `[1,2,5,2,7,9]` и `[2,5,8,1,9,3]` → {1,2,5,9} → 4"},starterCode:`function commonNumbersInPrefixes(a, b) {
    // TODO: напишите решение здесь
    return [];
}
`,tests:[{name:`Пример из условия`,args:[[1,2,5,2,7,9],[2,5,8,1,9,3]],expected:[0,1,2,3,3,4]},{name:`Полностью совпадающие массивы`,args:[[1,2],[1,2]],expected:[1,2]},{name:`Пересечений нет`,args:[[1,2,3],[4,5,6]],expected:[0,0,0]},{name:`Кратность не учитывается`,args:[[7,7,7],[7,7,7]],expected:[1,1,1],hidden:!0},{name:`Общий элемент появляется в разных позициях`,args:[[4,1],[1,4]],expected:[0,2],hidden:!0}]},{title:`Сравнение версий (Compare Versions)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`compareVersions`,description:{condition:`Напишите функцию \`compareVersions\`, которая сравнивает два номера версий программы. Номер версии — это строка, содержащая цифры и точки. Номера версий состоят только из цифр и точек и всегда валидны.

Правила:

Функция возвращает \`1\`, если первая версия больше второй

Функция возвращает \`-1\`, если вторая версия больше первой

Функция возвращает \`0\`, если версии равны

Части версии сравниваются по очереди слева направо

Отсутствующие части считаются равными 0`,input:[],output:``,constraints:[`Длина строк: 1 ≤ length ≤ 100`,`Количество частей: 1 ≤ parts ≤ 10`,`Значения частей: 0 ≤ value ≤ 10^6`,`Время выполнения: O(N), где N — максимальное количество частей`,`Память: O(N)`],example:`compareVersions('1.0', '1.0')      // -> 0
compareVersions('1.0', '1.0.0')    // -> 0
compareVersions('1.0.1', '1.0.0')  // -> 1
compareVersions('2.0', '2.1')      // -> -1`},starterCode:`function compareVersions(ver1, ver2) {
    // TODO: write your solution here
    return 0;
}
`,tests:[{name:`'1.0' и '1.0'`,args:[`1.0`,`1.0`],expected:0},{name:`Разная длина, но равные версии`,args:[`1.0`,`1.0.0`],expected:0},{name:`'1.0.1' больше '1.0.0'`,args:[`1.0.1`,`1.0.0`],expected:1},{name:`'2.0' меньше '2.1'`,args:[`2.0`,`2.1`],expected:-1},{name:`Числа сравниваются как числа, а не как строки`,args:[`1.10`,`1.9`],expected:1,hidden:!0},{name:`Недостающие части считаются нулями`,args:[`1.0.0.1`,`1`],expected:1,hidden:!0},{name:`Ведущие нули`,args:[`1.01`,`1.1`],expected:0,hidden:!0}]},{title:`Сжатие групп точек по значению (Compress Consecutive Value Groups)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`compressConsecutiveValueGroups`,description:{condition:'Дан массив точек, каждая из которых имеет поля `time` (время) и `value` (значение). Массив отсортирован по `time`. Необходимо найти группы подряд идущих точек с одинаковым `value` и оставить в результате только первую и последнюю точку каждой такой группы (это нужно для оптимизации построения линейного графика — промежуточные точки внутри "плато" избыточны). Если группа состоит из одной точки — она остаётся в результате один раз (первая и последняя точка совпадают).',input:["`points` — массив объектов вида `{ time: number, value: number }`, отсортированный по возрастанию `time`"],output:"Массив объектов той же формы `{ time, value }`, содержащий только первую и последнюю точку каждой группы подряд идущих точек с одинаковым `value`, в исходном порядке",constraints:["`0 <= points.length <= 10^4`","`time` — уникальные, возрастающие целые числа","`value` — произвольное целое число"],example:`Вход: [{time:1,value:5}, {time:2,value:5}, {time:3,value:5}, {time:4,value:8}, {time:5,value:8}, {time:6,value:2}]
Выход: [{time:1,value:5}, {time:3,value:5}, {time:4,value:8}, {time:5,value:8}, {time:6,value:2}]

Вход: [{time:1,value:5}]
Выход: [{time:1,value:5}]

Вход: []
Выход: []`},starterCode:`// Доступно без импорта: встроенные методы JS

function compressConsecutiveValueGroups(points) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Плато сжимается до первой и последней точки`,args:[[{time:1,value:5},{time:2,value:5},{time:3,value:5},{time:4,value:8},{time:5,value:8},{time:6,value:2}]],expected:[{time:1,value:5},{time:3,value:5},{time:4,value:8},{time:5,value:8},{time:6,value:2}]},{name:`Одна точка`,args:[[{time:1,value:5}]],expected:[{time:1,value:5}]},{name:`Пустой массив`,args:[[]],expected:[]},{name:`Все значения разные — массив не меняется`,args:[[{time:1,value:1},{time:2,value:2},{time:3,value:3}]],expected:[{time:1,value:1},{time:2,value:2},{time:3,value:3}],hidden:!0},{name:`Одно значение возвращается после другого — новая группа`,args:[[{time:1,value:4},{time:2,value:4},{time:3,value:9},{time:4,value:4},{time:5,value:4}]],expected:[{time:1,value:4},{time:2,value:4},{time:3,value:9},{time:4,value:4},{time:5,value:4}],hidden:!0}]},{title:`Сжатие последовательности чисел в диапазоны (Compress Numbers to Ranges)`,difficulty:3,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`compress`,description:{condition:`Реализуйте функцию \`compress\`, которая принимает список целых чисел и возвращает строку, где подряд идущие числа объединяются в диапазоны.

Правила сжатия:

Числа сортируются по возрастанию

Дубликаты игнорируются

Непрерывная последовательность из минимум 2 чисел записывается как \`start-end\`

Одиночное число записывается как просто число

Результат — строка, диапазоны разделяются запятой \`,\``,input:[],output:``,constraints:[`Вход: массив целых чисел`,`Размер массива: 0 ≤ N ≤ 100000`,`Значения: -10^9 ≤ value ≤ 10^9`,`Время: O(n log n) или быстрее`,`Память: O(n)`],example:`Вход: [1, 4, 5, 2, 3, 9, 8, 11, 0]
Выход: "0-5,8-9,11"

Вход: [1, 4]
Выход: "1,4"

Вход: [1, 2, 3]
Выход: "1-3"

Вход: [1, 2, 2, 4]
Выход: "1-2,4"

Вход: [-2, -1, 0, 5]
Выход: "-2-0,5"

Вход: [7]
Выход: "7"

Вход: []
Выход: ""`},starterCode:`function compress(numbers) {
    // TODO: напишите решение здесь
    return "";
}
`,tests:[{name:`Несколько диапазонов`,args:[[1,4,5,2,3,9,8,11,0]],expected:`0-5,8-9,11`},{name:`Только одиночные числа`,args:[[1,4]],expected:`1,4`},{name:`Один диапазон`,args:[[1,2,3]],expected:`1-3`},{name:`Дубликаты игнорируются`,args:[[1,2,2,4]],expected:`1-2,4`,hidden:!0},{name:`Отрицательные числа`,args:[[-2,-1,0,5]],expected:`-2-0,5`,hidden:!0},{name:`Одно число`,args:[[7]],expected:`7`,hidden:!0},{name:`Пустой массив`,args:[[]],expected:``,hidden:!0}]},{title:`Подсчёт вложенных элементов (Count Nested Elements)`,difficulty:2,categories:[`Recursion`],languages:[`JavaScript`],functionName:`countElements`,description:{condition:`Дан массив, элементы которого могут быть числами, строками, булевыми значениями, \`null\` или другими массивами.

Необходимо написать функцию, которая возвращает количество всех не-массивных элементов, включая элементы внутри любых вложенных массивов.

Сами массивы как элементы не считаются.`,input:["Массив `arr`, который может содержать обычные элементы и вложенные массивы любой глубины."],output:`Целое число — количество всех не-массивных элементов внутри массива.`,constraints:["`0 <= arr.length <= 10^4`","Глубина вложенности не превышает `1000`",`Элементами массива могут быть:числа`,`строки`,`булевы значения`,"`null`",`вложенные массивы`],example:`Вход:

[[1, 2, 3], [4, [5]]]

Выход:

5`},starterCode:`function countElements(arr) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`[[1, 2, 3], [4, [5]]]`,args:[[[1,2,3],[4,[5]]]],expected:5},{name:`Плоский массив`,args:[[1,`a`,!0,null]],expected:4},{name:`Пустой массив`,args:[[]],expected:0},{name:`Массив из пустых массивов`,args:[[[],[[]]]],expected:0,hidden:!0},{name:`Глубокая вложенность`,args:[[1,[2,[3,[4,[5]]]]]],expected:5,hidden:!0}]},{title:`Подсчет количества гласных (Count Vowels)`,difficulty:1,categories:[`Strings`],languages:[`JavaScript`],functionName:`countVowels`,description:{condition:"Напишите функцию `countVowels`, которая принимает строку и возвращает количество гласных букв (a, e, i, o, u) в этой строке. Функция должна игнорировать регистр букв.",input:[],output:``,constraints:[`Строка может содержать буквы в любом регистре (верхнем или нижнем)`,`Строка может быть пустой (тогда возвращается 0)`,`Строка может содержать только латинские буквы`,`Гласными считаются только символы a, e, i, o, u (и их заглавные аналоги)`],example:`Вход: "hello"
Выход: 2

Вход: "world"
Выход: 1

Вход: "AEIOU"
Выход: 5

Вход: "xyz"
Выход: 0`},starterCode:`function countVowels(str) {
    // TODO: write your solution here
    return 0;
}
`,tests:[{name:`"hello"`,args:[`hello`],expected:2},{name:`"world"`,args:[`world`],expected:1},{name:`Регистр игнорируется`,args:[`AEIOU`],expected:5},{name:`Гласных нет`,args:[`xyz`],expected:0,hidden:!0},{name:`Пустая строка`,args:[``],expected:0,hidden:!0},{name:`Смешанный регистр`,args:[`JavaScript Is Fun`],expected:5,hidden:!0}]},{title:`Подсчет количества слов в строке (Count Words)`,difficulty:1,categories:[`Strings`],languages:[`JavaScript`],functionName:`countWords`,description:{condition:"Напишите функцию `countWords`, которая принимает строку и возвращает количество слов в этой строке. Слово определяется как последовательность символов, разделенных пробелами. Функция должна корректно обрабатывать лишние пробелы в начале, в конце и между словами.",input:[],output:``,constraints:[`Строка может содержать пробелы в любом количестве`,`Строка может быть пустой (тогда возвращается 0)`,`Слова состоят только из букв (латиница)`,`Строка может содержать начальные и конечные пробелы`],example:`Вход: "The quick brown fox jumps over the lazy dog"
Выход: 9

Вход: " Hello   world  "
Выход: 2

Вход: ""
Выход: 0

Вход: "single"
Выход: 1`},starterCode:`function countWords(str) {
    // TODO: write your solution here
    return 0;
}
`,tests:[{name:`Обычное предложение`,args:[`The quick brown fox jumps over the lazy dog`],expected:9},{name:`Лишние пробелы по краям и внутри`,args:[`  Hello   world  `],expected:2},{name:`Пустая строка`,args:[``],expected:0},{name:`Одно слово`,args:[`single`],expected:1,hidden:!0},{name:`Только пробелы`,args:[`     `],expected:0,hidden:!0}]},{title:`Фабрика символов (createCharReader)`,difficulty:1,categories:[`Iterators`],languages:[`JavaScript`],functionName:`createCharReader`,description:{condition:"Реализуй функцию `createCharReader(str)`, которая принимает строку и возвращает функцию-читатель. Каждый вызов возвращённой функции отдаёт следующий символ строки. Когда символы заканчиваются, функция возвращает `null` (или аналог в других языках).",input:["строка `str`"],output:"функция без аргументов, возвращающая `string | null`",constraints:["`0 <= str.length <= 1000`",`строка может содержать любые Unicode-символы`,"после исчерпания строки все последующие вызовы возвращают `null`"],example:`const reader = createCharReader("hi");
reader() → "h"
reader() → "i"
reader() → null`},starterCode:`// Доступно без импорта: встроенные методы JS

function createCharReader(str) {
  // TODO: напишите решение здесь
}
`,tests:[{name:`Читает символы по одному`,body:`const read = solution("hi");
return [read(), read(), read()];`,expected:[`h`,`i`,null]},{name:`Пустая строка — сразу null`,body:`const read = solution("");
return read();`,expected:null},{name:`После конца всегда null`,body:`const read = solution("a");
read(); read();
return read();`,expected:null,hidden:!0},{name:`Читатели независимы`,body:`const a = solution("xy");
const b = solution("xy");
a();
return [a(), b()];`,expected:[`y`,`x`],hidden:!0}]},{title:`Каррированное сложение (Curried Add)`,difficulty:1,categories:[`Functions`],languages:[`JavaScript`],functionName:`add`,description:{condition:"Реализуйте функцию `add(a)`, которая принимает одно число и возвращает другую функцию, принимающую второе число. Итоговый вызов возвращает сумму двух чисел.",input:["два числа `a` и `b`, передаваемые через каррирование: `add(a)(b)`"],output:"число — сумма `a + b`",constraints:["`-10^6 <= a, b <= 10^6`","`a` и `b` — целые числа"],example:`Вход: add(3)(5)
Выход: 8

Вход: add(-1)(1)
Выход: 0

Вход: add(0)(0)
Выход: 0`},starterCode:`// Доступно без импорта: встроенные методы JS
function add(a) {
  // TODO: напишите решение здесь
  return function(b) {
    return 0;
  };
}
`,tests:[{name:`add(3)(5)`,body:`return solution(3)(5);`,expected:8},{name:`add(-1)(1)`,body:`return solution(-1)(1);`,expected:0},{name:`add(0)(0)`,body:`return solution(0)(0);`,expected:0},{name:`Частичное применение переиспользуется`,body:`const add10 = solution(10);
return [add10(1), add10(2)];`,expected:[11,12],hidden:!0},{name:`Дробные числа`,body:`return solution(0.5)(0.25);`,expected:.75,hidden:!0}]},{title:`Собственная реализация метода some (Custom Array Some)`,difficulty:2,categories:[`Arrays`,`Functions`],languages:[`JavaScript`],functionName:`mySome`,description:{condition:"Реализуйте функцию `mySome(array, callback, thisArg)`, которая проверяет, удовлетворяет ли хотя бы один элемент массива условию, заданному функцией `callback`. Функция `callback` вызывается для каждого элемента массива по порядку и принимает три аргумента: текущий элемент, его индекс и сам массив. Если `callback` возвращает истинное (truthy) значение хотя бы для одного элемента — функция должна немедленно вернуть `true` и прекратить дальнейшую проверку. Если ни один элемент не удовлетворяет условию — вернуть `false`. Для пустого массива всегда возвращается `false`. Если передан `thisArg`, он должен использоваться как контекст `this` при вызове `callback`.",input:["`array` — массив элементов (числа, строки или смешанные значения), длина от 0 до 1000","`callback` — функция-предикат `(element, index, array) => boolean`","`thisArg` — (необязательно) контекст для `this` внутри `callback`"],output:"`true`, если хотя бы один элемент прошёл проверку callback, иначе `false`.",constraints:["`0 <= array.length <= 1000`",`Функция должна прекращать обход при первом true (short-circuit)`,"Пустой массив → `false`"],example:`Вход: array = [1, 2, 3, 4], callback = x => x % 2 === 0
Выход: true

Вход: array = [], callback = x => true
Выход: false

Вход: array = [1, 3, 5], callback = x => x % 2 === 0
Выход: false`},starterCode:`// Доступно без импорта: встроенные методы JS

function mySome(array, callback, thisArg) {
  // TODO: напишите решение здесь
  return false;
}
`,tests:[{name:`Есть чётный элемент`,body:`return solution([1, 2, 3, 4], (x) => x % 2 === 0);`,expected:!0},{name:`Пустой массив — всегда false`,body:`return solution([], () => true);`,expected:!1},{name:`Ни один элемент не подходит`,body:`return solution([1, 3, 5], (x) => x % 2 === 0);`,expected:!1},{name:`Проверка останавливается на первом совпадении`,body:`let seen = 0;
solution([1, 2, 3, 4], (x) => { seen++; return x === 2; });
return seen;`,expected:2,hidden:!0},{name:`В callback приходят элемент, индекс и массив`,body:`let args = null;
solution(["a"], (...rest) => { args = rest; return false; });
return args;`,expected:[`a`,0,[`a`]],hidden:!0},{name:`thisArg становится контекстом callback`,body:`return solution([1, 2], function (x) { return x === this.needle; }, { needle: 2 });`,expected:!0,hidden:!0}]},{title:`Кастомный Promise.all (Custom Promise.all)`,difficulty:3,categories:[`Asynchronous`],languages:[`JavaScript`],functionName:`customPromiseAll`,description:{condition:`Реализуйте функцию \`customPromiseAll\`, которая принимает массив промисов и возвращает новый промис. Новый промис:

резолвится массивом результатов, когда все переданные промисы успешно выполнились, при этом порядок результатов соответствует порядку входного массива, независимо от порядка завершения промисов;

реджектится с ошибкой первого упавшего промиса, если хотя бы один из промисов был отклонён.

Если входной массив пуст — немедленно резолвитесь пустым массивом.

Нельзя использовать встроенный \`Promise.all\`.`,input:["`promises` — массив промисов (может быть пустым)"],output:"Промис, который резолвится в `Array` результатов или реджектится с ошибкой.",constraints:["`0 <= promises.length <= 1000`",`Каждый элемент массива является промисом`,`Промисы могут резолвиться в любом порядке и с задержкой`],example:`Вход: [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]Выход: [1, 2, 3]
Вход: [Promise.resolve(1), Promise.reject("error"), Promise.resolve(3)]Выход: реджект с "error"
Вход: []Выход: []`},starterCode:`// Доступно без импорта: встроенные методы JS

function customPromiseAll(promises) {
  // TODO: напишите решение здесь
  return Promise.resolve([]);
}
`,tests:[{name:`Все промисы успешны`,body:`return await solution([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]);`,expected:[1,2,3]},{name:`Пустой массив`,body:`return await solution([]);`,expected:[]},{name:`Реджект первого упавшего промиса`,body:`try {
  await solution([Promise.resolve(1), Promise.reject("error"), Promise.resolve(3)]);
  return "resolved";
} catch (e) {
  return e;
}`,expected:`error`},{name:`Порядок результатов — как во входном массиве`,body:`const slow = (v, ms) => new Promise((r) => setTimeout(() => r(v), ms));
return await solution([slow("a", 30), slow("b", 10), slow("c", 1)]);`,expected:[`a`,`b`,`c`],hidden:!0},{name:`Не-промисы тоже поддерживаются`,body:`return await solution([1, Promise.resolve(2), 3]);`,expected:[1,2,3],hidden:!0}]},{title:`Собственная реализация Promise.any (Custom Promise.any)`,difficulty:4,categories:[`Asynchronous`],languages:[`JavaScript`],functionName:`any`,description:{condition:"Реализуйте функцию `any(promises)`, которая работает аналогично `Promise.any()`. Функция принимает непустой массив промисов и возвращает промис. Если хотя бы один из переданных промисов успешно резолвится, возвращаемый промис резолвится значением первого по времени успешного результата (независимо от порядка промисов в массиве). Если все переданные промисы отклоняются (reject), возвращаемый промис должен отклониться с ошибкой `AggregateError`, содержащей все ошибки в порядке, соответствующем исходному массиву промисов.",input:["`promises` — непустой массив промисов (`Promise[]`)"],output:"Промис, который:резолвится значением первого успешно выполнившегося промиса, ИЛИ\nотклоняется с `AggregateError`, содержащим массив всех ошибок (в порядке промисов), если все промисы отклонены",constraints:["Массив непустой, `1 <= promises.length <= 20`",`Промисы могут резолвиться/отклоняться в любом порядке и с разной задержкой`,"Порядок ошибок в `AggregateError.errors` должен соответствовать порядку промисов во входном массиве, а не порядку завершения"],example:`Вход: promises = [Promise.reject('err1'), Promise.resolve(42), Promise.reject('err2')]
Выход: промис резолвится значением 42

Вход: promises = [Promise.reject('err1'), Promise.reject('err2')]
Выход: промис отклоняется AggregateError с errors = ['err1', 'err2']`},starterCode:`// Доступно без импорта: встроенные методы JS

function any(promises) {
  // TODO: напишите решение здесь
  return Promise.reject(new AggregateError([], 'Not implemented'));
}
`,tests:[{name:`Резолвится первым успешным значением`,body:`return await solution([Promise.reject("err1"), Promise.resolve(42), Promise.reject("err2")]);`,expected:42},{name:`Все упали — AggregateError со списком ошибок`,body:`try {
  await solution([Promise.reject("err1"), Promise.reject("err2")]);
  return "resolved";
} catch (e) {
  return [e instanceof AggregateError, e.errors];
}`,expected:[!0,[`err1`,`err2`]]},{name:`Побеждает самый быстрый, а не первый по списку`,body:`const slow = (v, ms) => new Promise((r) => setTimeout(() => r(v), ms));
return await solution([slow("late", 40), slow("early", 5)]);`,expected:`early`,hidden:!0},{name:`Ошибки идут в порядке входного массива`,body:`const fail = (v, ms) => new Promise((_, rej) => setTimeout(() => rej(v), ms));
try {
  await solution([fail("first", 30), fail("second", 5)]);
  return "resolved";
} catch (e) {
  return e.errors;
}`,expected:[`first`,`second`],hidden:!0}]},{title:`Неудовлетворённость покупателей (Customer Dissatisfaction)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`calculateDissatisfaction`,description:{condition:`Напишите функцию \`calculateDissatisfaction(goods, buyerNeeds)\`, которая принимает два массива целых чисел:

\`goods\` — массив доступных товаров (их характеристики/цены)

\`buyerNeeds\` — массив потребностей покупателей

Функция должна вычислить и вернуть сумму неудовлетворённостей всех покупателей, которая определяется как сумма абсолютных разностей между потребностью покупателя и ближайшим по значению товаром.

Правила:

Для каждого покупателя найти товар, значение которого наиболее близко к потребности покупателя

Вычислить абсолютную разницу между потребностью и этим товаром

Суммировать все такие разницы для всех покупателей

Важные случаи:

Если массив товаров пуст, для любого покупателя разница равна его потребности

Если массив потребностей пуст, сумма = 0

Если у покупателя есть несколько ближайших товаров (например, потребность 5, товары 4 и 6), разница будет минимальной (в данном случае 1)`,input:[],output:``,constraints:[`Массивы могут быть пустыми`,`Элементы массивов — целые числа (могут быть отрицательными)`,`Длина массивов: 0 ≤ N, M ≤ 1000`,`Время выполнения: O((N+M) log N), где N — длина goods, M — длина buyerNeeds`],example:`// Пример 1
goods = [8, 3, 5]
buyerNeeds = [5, 6]
// Результат: 1
// Пояснение:
// - Для потребности 5 → ближайший товар 5 → разница |5-5| = 0
// - Для потребности 6 → ближайший товар 5 или 8 → минимальная разница |6-5| = 1
// Сумма: 0 + 1 = 1

// Пример 2
goods = [1, 10, 100]
buyerNeeds = [5, 50, 95]
// Результат: 4 + 40 + 5 = 49

// Пример 3
goods = []
buyerNeeds = [1, 2, 3]
// Результат: 1 + 2 + 3 = 6

// Пример 4
goods = [5, 5, 5]
buyerNeeds = [5, 6, 4]
// Результат: 0 + 1 + 1 = 2`},starterCode:`function calculateDissatisfaction(goods, buyerNeeds) {
    // TODO: write your solution here
    return 0;
}
`,tests:[{name:`Пример 1`,args:[[8,3,5],[5,6]],expected:1},{name:`Пример 2`,args:[[1,10,100],[5,50,95]],expected:49},{name:`Товаров нет — неудовлетворённость равна потребности`,args:[[],[1,2,3]],expected:6},{name:`Одинаковые товары`,args:[[5,5,5],[5,6,4]],expected:2,hidden:!0},{name:`Покупателей нет`,args:[[1,2],[]],expected:0,hidden:!0},{name:`Ближайший товар — не первый в массиве`,args:[[100,7],[8]],expected:1,hidden:!0}]},{title:`Циклический сдвиг массива (Cyclic Array Shift)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`rotateArray`,description:{condition:"Напишите функцию `rotateArray`, которая принимает массив и целое число `step`. Функция должна вернуть новый массив, полученный циклическим сдвигом исходного массива на `step` элементов:\n\nЕсли `step` положительное число — выполняется сдвиг вправо (элементы перемещаются в конец массива)\n\nЕсли `step` отрицательное число — выполняется сдвиг влево (элементы перемещаются в начало массива)\n\nЕсли `step` равен `0` или кратен длине массива — возвращается копия исходного массива",input:[],output:``,constraints:[`Исходный массив не должен изменяться`,`Длина массива может быть любой (включая пустой)`,"`step` может быть больше длины массива (тогда сдвиг циклический)"],example:`Вход: [1, 2, 3, 4, 5], 2
Выход: [4, 5, 1, 2, 3]
Пояснение: сдвиг вправо на 2

Вход: [1, 2, 3, 4, 5], -2
Выход: [3, 4, 5, 1, 2]
Пояснение: сдвиг влево на 2

Вход: [1, 2, 3], 1
Выход: [3, 1, 2]

Вход: [1, 2, 3], 0
Выход: [1, 2, 3]`},starterCode:`function rotateArray(arr, step) {
    // TODO: напишите решение здесь
    return [];
}
`,tests:[{name:`Сдвиг вправо на 2`,args:[[1,2,3,4,5],2],expected:[4,5,1,2,3]},{name:`Сдвиг влево на 2`,args:[[1,2,3,4,5],-2],expected:[3,4,5,1,2]},{name:`Сдвиг на 1`,args:[[1,2,3],1],expected:[3,1,2]},{name:`Сдвиг на 0`,args:[[1,2,3],0],expected:[1,2,3]},{name:`Сдвиг кратен длине`,args:[[1,2,3],6],expected:[1,2,3],hidden:!0},{name:`Сдвиг больше длины массива`,args:[[1,2,3,4],7],expected:[2,3,4,1],hidden:!0},{name:`Пустой массив`,args:[[],3],expected:[],hidden:!0}]},{title:`Функция запроса данных (Data Query Function)`,difficulty:3,categories:[`Asynchronous`],languages:[`JavaScript`],functionName:`query`,description:{condition:`Реализуйте асинхронную функцию \`query()\`, которая выполняет выборку и трансформацию данных из источника.

Параметры функции:

\`fields\` (массив строк) - список полей, которые нужно включить в результат

\`source\` (асинхронная функция) - возвращает массив исходных объектов

\`filter\` (функция) - предикат для фильтрации записей

\`order\` (функция или null) - функция сравнения для сортировки`,input:[],output:``,constraints:["Все запрашиваемые в `fields` поля должны существовать в каждом объекте данных","Если поле отсутствует, выбрасывать ошибку `'Incorrect params'`","`order` может быть `null` (тогда сортировка не применяется)",`Функция должна быть асинхронной и возвращать Promise`,`Не использовать внешние библиотеки`,`Количество записей ≤ 1000`,`Время выполнения ≤ 1 секунда`],example:`const data = [
    { name: 'Michael', profession: 'teacher', age: 50 },
    { name: 'Anna', profession: 'scientific', age: 21 }
];

const result = await query({
    fields: ['name', 'age'],
    source: async () => data,
    filter: entry => entry.age > 20,
    order: (a, b) => a.name.localeCompare(b.name)
});

// Результат: [{ name: 'Anna', age: 21 }, { name: 'Michael', age: 50 }]`},starterCode:`async function query({ fields = [], source = () => [], filter, order = null }) {
    // TODO: напишите решение здесь
    return [];
}
`,tests:[{name:`Фильтрация, сортировка и выбор полей`,body:`const data = [
  { name: "Michael", profession: "teacher", age: 50 },
  { name: "Anna", profession: "scientific", age: 21 },
  { name: "Kid", profession: "none", age: 7 },
];
return await solution({
  fields: ["name", "age"],
  source: async () => data,
  filter: (e) => e.age > 20,
  order: (a, b) => a.name.localeCompare(b.name),
});`,expected:[{name:`Anna`,age:21},{name:`Michael`,age:50}]},{name:`Без order порядок исходный`,body:`return await solution({
  fields: ["name"],
  source: async () => [{ name: "b" }, { name: "a" }],
  filter: () => true,
});`,expected:[{name:`b`},{name:`a`}]},{name:`Фильтр отсеял всё`,body:`return await solution({
  fields: ["name"],
  source: async () => [{ name: "a" }],
  filter: () => false,
});`,expected:[]},{name:`Источник вызывается один раз`,body:`let calls = 0;
await solution({
  fields: ["a"],
  source: async () => { calls++; return [{ a: 1 }]; },
  filter: () => true,
});
return calls;`,expected:1,hidden:!0},{name:`В результат попадают только запрошенные поля`,body:`return await solution({
  fields: ["age"],
  source: async () => [{ name: "x", age: 30, secret: true }],
  filter: () => true,
});`,expected:[{age:30}],hidden:!0}]},{title:`Debounce функция (Debounce Function)`,difficulty:3,categories:[`Data structures`],languages:[`JavaScript`],functionName:`debounce`,description:{condition:`Реализуйте функцию \`debounce\`, которая принимает функцию \`func\` и задержку \`delay\` в миллисекундах. Дебаунсинг позволяет "задержать" выполнение функции до тех пор, пока не пройдет определенный период времени без ее вызова. Это полезно, например, для обработки ввода в текстовое поле, чтобы не выполнять операцию на каждое нажатие клавиши.

Возвращаемая функция должна:

При вызове отменять предыдущий запланированный вызов

Запланировать новый вызов исходной функции через \`delay\` миллисекунд

Вызвать исходную функцию с последними переданными аргументами`,input:[],output:``,constraints:[`Исходная функция может принимать любое количество аргументов`,"Возвращаемая функция должна сохранять контекст вызова (`this`)",`При повторных вызовах таймер должен сбрасываться`,`Функция должна работать с асинхронным кодом`],example:`const log = (message) => console.log(message);
const debouncedLog = debounce(log, 1000);

// Симуляция быстрых вызовов
debouncedLog("Первый вызов");  // Отменяется
debouncedLog("Второй вызов");  // Отменяется
debouncedLog("Третий вызов");  // Выполнится через 1 секунду

// Ожидается: только "Третий вызов" в консоли`},starterCode:`function debounce(func, delay) {
    // TODO: write your solution here
}
`,tests:[{name:`Выполняется только последний вызов`,body:`const calls = [];
const d = solution((m) => calls.push(m), 30);
d("первый"); d("второй"); d("третий");
await new Promise((r) => setTimeout(r, 80));
return calls;`,expected:[`третий`]},{name:`До истечения задержки ничего не вызвано`,body:`let called = false;
const d = solution(() => { called = true; }, 50);
d();
await new Promise((r) => setTimeout(r, 10));
return called;`,expected:!1},{name:`Новый вызов после паузы срабатывает снова`,body:`const calls = [];
const d = solution((m) => calls.push(m), 20);
d("a");
await new Promise((r) => setTimeout(r, 60));
d("b");
await new Promise((r) => setTimeout(r, 60));
return calls;`,expected:[`a`,`b`],hidden:!0},{name:`Аргументы берутся от последнего вызова`,body:`let got = null;
const d = solution((...args) => { got = args; }, 20);
d(1, 2);
d(3, 4);
await new Promise((r) => setTimeout(r, 60));
return got;`,expected:[3,4],hidden:!0}]},{title:`Debounce-хук значения (Debounced Value Hook)`,difficulty:2,categories:[`Functions`],languages:[`JavaScript`],functionName:`debounceValue`,description:{condition:"Реализуйте функцию `debounceValue(value, delay)`, которая возвращает `Promise`.\n\nПромис резолвится значением из последнего вызова только после того, как прошло `delay` миллисекунд без новых вызовов. Если новый вызов пришёл раньше — предыдущий таймер сбрасывается, и все ожидающие промисы получат последнее значение.\n\nПоведение должно соответствовать механизму debounce.",input:["`value` — значение любого типа","`delay` — число миллисекунд"],output:"`Promise`, резолвящийся последним значением после паузы в `delay` мс",constraints:[`Состояние общее для всех вызовов — это одна «подписка», а не независимые таймеры`,"`delay >= 0`"],example:`debounceValue("a", 500);
// через 100 мс
debounceValue("ab", 500);
// через 100 мс
const result = await debounceValue("abc", 500);
// result === "abc"`},starterCode:`function debounceValue(value, delay) {
   // TODO
}
`,tests:[{name:`Побеждает последнее значение`,body:`solution("a", 40);
await new Promise((r) => setTimeout(r, 10));
solution("ab", 40);
await new Promise((r) => setTimeout(r, 10));
return await solution("abc", 40);`,expected:`abc`},{name:`Одиночный вызов резолвится своим значением`,body:`return await solution(7, 20);`,expected:7},{name:`Значение приходит не раньше задержки`,body:`let done = false;
const p = solution("x", 60).then(() => { done = true; });
await new Promise((r) => setTimeout(r, 20));
const early = done;
await p;
return [early, done];`,expected:[!1,!0],hidden:!0},{name:`Ранние промисы тоже получают последнее значение`,body:`const first = solution("old", 30);
await new Promise((r) => setTimeout(r, 5));
solution("new", 30);
return await first;`,expected:`new`,hidden:!0}]},{title:`Глубокое сравнение массивов (Deep Array Comparison)`,difficulty:3,categories:[`Arrays`],languages:[`JavaScript`],functionName:`deepCompare`,description:{condition:`Напишите функцию \`deepCompare(array1, array2)\`, которая сравнивает два массива и возвращает \`true\`, если они структурно идентичны по следующим правилам:

Длины массивов должны быть одинаковыми.

Типы соответствующих элементов должны совпадать:Примитивы сравниваются по значению

Если элемент — массив (список, срез), проверяется только совпадение длины (рекурсивно во вложенные массивы заходить не нужно)

Если один элемент — массив, а другой — примитив → \`false\``,input:[],output:``,constraints:[`Элементы могут быть: числа, строки, булевы значения, null, массивы`,`Глубина вложенности: 1 уровень (проверяем только прямые вложенные массивы)`,`Массивы не содержат других сложных структур (объектов, словарей)`],example:`Вход: array1 = [1, 2, 3], array2 = [1, 2, 3]
Выход: true
Пояснение: длины равны, типы совпадают, значения равны

Вход: array1 = [1, [5, 7]], array2 = [1, [2, 2]]
Выход: true
Пояснение: длины равны, оба элемента - массивы, длины вложенных равны

Вход: array1 = [1, [8, 1]], array2 = [[20, 2], 2]
Выход: false
Пояснение: на позиции 0 тип не совпадает (примитив vs массив)

Вход: array1 = [1, [1, 10]], array2 = [1, [4]]
Выход: false
Пояснение: длины вложенных массивов не совпадают (2 vs 1)`},starterCode:`function deepCompare(array1, array2) {
    // TODO: write your solution here
    return false;
}
`,tests:[{name:`Одинаковые плоские массивы`,args:[[1,2,3],[1,2,3]],expected:!0},{name:`Вложенные массивы сравниваются только по длине`,args:[[1,[5,7]],[1,[2,2]]],expected:!0},{name:`Примитив против массива`,args:[[1,[8,1]],[[20,2],2]],expected:!1},{name:`Разные длины вложенных массивов`,args:[[1,[1,10]],[1,[4]]],expected:!1,hidden:!0},{name:`Разная длина верхнего уровня`,args:[[1,2],[1,2,3]],expected:!1,hidden:!0},{name:`Два пустых массива`,args:[[],[]],expected:!0,hidden:!0},{name:`Разные примитивы на одной позиции`,args:[[1,`2`],[1,2]],expected:!1,hidden:!0}]},{title:`Глубокое клонирование объекта без JSON (Deep Clone Without JSON)`,difficulty:3,categories:[`Objects`],languages:[`JavaScript`],functionName:`deepClone`,description:{condition:'Реализуйте функцию глубокого клонирования произвольной структуры данных без использования `JSON.parse`/`JSON.stringify`. Клон должен быть полностью независим от оригинала: изменение вложенных объектов или массивов в клоне не должно влиять на исходную структуру, и наоборот.\n\nСтруктура может содержать: примитивы (числа, строки, булевы значения), вложенные объекты, вложенные массивы (в том числе разреженные/с "дырками" — пустыми слотами), и произвольную глубину вложенности.',input:[`Значение произвольного типа: примитив, объект или массив, с возможной вложенностью любой глубины (объекты внутри массивов, массивы внутри объектов и т.д.).`],output:`Глубокая копия входного значения той же структуры.`,constraints:[`Глубина вложенности не превышает 20 уровней`,`Циклические ссылки не встречаются`,`Значения — только примитивы, обычные объекты (plain objects) и массивы (без функций, дат, Map/Set и т.п.)`],example:`Вход: { a: 1, b: { c: [1, 2, "3"] }, d: [] }
Выход: { a: 1, b: { c: [1, 2, "3"] } (независимая копия), d: [] }`},starterCode:`// Доступно без импорта: встроенные методы JS

function deepClone(value) {
  // TODO: напишите решение здесь
  return value;
}
`,tests:[{name:`Структура копируется целиком`,args:[{a:1,b:{c:[1,2,`3`]},d:[]}],expected:{a:1,b:{c:[1,2,`3`]},d:[]}},{name:`Изменение клона не трогает оригинал`,body:`const original = { nested: { list: [1, 2] } };
const clone = solution(original);
clone.nested.list.push(3);
return [original.nested.list.length, clone.nested.list.length];`,expected:[2,3]},{name:`Примитив возвращается как есть`,args:[42],expected:42},{name:`Вложенные объекты — новые ссылки`,body:`const original = { a: { b: 1 } };
const clone = solution(original);
return clone.a === original.a;`,expected:!1,hidden:!0},{name:`Массив объектов`,args:[[{id:1},{id:2}]],expected:[{id:1},{id:2}],hidden:!0},{name:`null`,args:[null],expected:null,hidden:!0}]},{title:`Глубокий вложенный объект (Deep Nested Object)`,difficulty:3,categories:[`Data structures`],languages:[`JavaScript`],functionName:`nestedVal`,description:{condition:"Напишите функцию `nestedVal`, которая принимает строку в формате `'key1.key2.key3.key4.key5'` и преобразует её в глубоко вложенный объект, где каждый следующий ключ является свойством предыдущего, а последний ключ содержит пустой объект `{}`.",input:[],output:``,constraints:[`Строка всегда содержит минимум один ключ`,"Ключи разделены точкой `.`",`Ключи могут содержать только буквы латинского алфавита и цифры`,`Максимальная глубина вложенности: 10`],example:`Вход: 'value1.value2.value3.value4.value5'
Выход: {
  value1: {
    value2: {
      value3: {
        value4: {
          value5: {}
        }
      }
    }
  }
}

Вход: 'a.b.c'
Выход: {
  a: {
    b: {
      c: {}
    }
  }
}`},starterCode:`function nestedVal(str) {
    // TODO: write your solution here
    return {};
}
`,tests:[{name:`'a.b.c'`,args:[`a.b.c`],expected:{a:{b:{c:{}}}}},{name:`Пять уровней`,args:[`value1.value2.value3.value4.value5`],expected:{value1:{value2:{value3:{value4:{value5:{}}}}}}},{name:`Один ключ`,args:[`only`],expected:{only:{}}},{name:`Два ключа`,args:[`x.y`],expected:{x:{y:{}}},hidden:!0}]},{title:`Разница в возрасте (Difference in Ages)`,difficulty:1,categories:[`Arrays`],languages:[`JavaScript`],functionName:`differenceInAges`,description:{condition:`Напишите функцию \`differenceInAges\`, которая принимает массив возрастов и возвращает массив из трёх чисел: самого младшего возраста, самого старшего возраста и разницы между ними (старший - младший).

Правила:

Массив всегда содержит хотя бы один элемент

Возраста — целые неотрицательные числа

Возвращается массив в формате [min, max, difference]

Разница вычисляется как max - min`,input:[],output:``,constraints:[`Длина массива: 1 ≤ N ≤ 1000`,`Возраста: 0 ≤ age ≤ 200`,`Время выполнения: O(N)`,`Память: O(1)`],example:`differenceInAges([82, 15, 6, 38, 35])  // -> [6, 82, 76]
differenceInAges([57, 99, 14, 32])     // -> [14, 99, 85]
differenceInAges([25])                 // -> [25, 25, 0]
differenceInAges([10, 10, 10])         // -> [10, 10, 0]`},starterCode:`function differenceInAges(ages) {
    // TODO: write your solution here
    return [];
}
`,tests:[{name:`[82, 15, 6, 38, 35]`,args:[[82,15,6,38,35]],expected:[6,82,76]},{name:`[57, 99, 14, 32]`,args:[[57,99,14,32]],expected:[14,99,85]},{name:`Один элемент`,args:[[25]],expected:[25,25,0]},{name:`Все возрасты равны`,args:[[10,10,10]],expected:[10,10,0],hidden:!0},{name:`Минимум и максимум не на краях`,args:[[50,1,99,50]],expected:[1,99,98],hidden:!0}]},{title:`Доминантные элементы массива (Dominant Elements)`,difficulty:2,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`solve`,description:{condition:`Напишите функцию \`solve\`, которая принимает массив чисел и возвращает массив из доминантных элементов. Доминантным является элемент массива, который больше, чем все элементы, следующие за ним.

Правила:

Элемент считается доминантным, если он больше всех элементов справа от него

Последний элемент всегда доминантный (справа от него нет элементов)

Порядок элементов в результате должен соответствовать порядку в исходном массиве`,input:[],output:``,constraints:[`Длина массива: 1 ≤ N ≤ 1000`,`Элементы: целые числа`,`Время выполнения: O(N)`,`Память: O(N)`],example:`solve([16, 17, 14, 3, 14, 5, 2])  // -> [17, 14, 5, 2]
solve([92, 52, 93, 31, 89, 87, 77, 105])  // -> [105]
solve([75, 47, 42, 56, 13, 55])  // -> [75, 56, 55]`},starterCode:`function solve(array) {
    // TODO: write your solution here
    return [];
}
`,tests:[{name:`[16, 17, 14, 3, 14, 5, 2]`,args:[[16,17,14,3,14,5,2]],expected:[17,14,5,2]},{name:`Максимум в конце — один доминантный`,args:[[92,52,93,31,89,87,77,105]],expected:[105]},{name:`[75, 47, 42, 56, 13, 55]`,args:[[75,47,42,56,13,55]],expected:[75,56,55]},{name:`Один элемент`,args:[[3]],expected:[3],hidden:!0},{name:`Строго убывающий массив — все доминантные`,args:[[5,4,3]],expected:[5,4,3],hidden:!0},{name:`Равные элементы не доминантны`,args:[[2,2]],expected:[2],hidden:!0}]},{title:`Обогащение постов данными пользователей и количеством комментариев (Enrich Posts with Author and Comment Count)`,difficulty:3,categories:[`Objects`,`Grouping`,`Aggregation`],languages:[`JavaScript`],functionName:`enrichPosts`,description:{condition:"Даны три массива: посты, пользователи и комментарии. Каждый пост содержит `id`, `title` и `userId` — идентификатор автора. Каждый пользователь содержит `id` и `name`. Каждый комментарий содержит `postId`, указывающий, к какому посту он относится.\n\nНапишите функцию, которая для каждого поста возвращает объект с полями:\n\n`id` — id поста\n\n`title` — заголовок поста\n\n`userName` — имя пользователя, полученное по `userId` из массива пользователей\n\n`commentsCount` — количество комментариев с соответствующим `postId`\n\nПорядок постов в результате должен совпадать с порядком во входном массиве постов.",input:["`posts` — массив объектов `{ id, title, userId }`","`users` — массив объектов `{ id, name }`","`comments` — массив объектов `{ postId, ... }`"],output:"Массив объектов `{ id, title, userName, commentsCount }`",constraints:["`posts.length ≤ 1000`","`users.length ≤ 1000`","`comments.length ≤ 10000`",'если пользователь не найден по `userId` — `userName = "Unknown"`'],example:`Вход:
posts = [{ id: 1, title: "Hello", userId: 1 }]
users = [{ id: 1, name: "Leanne Graham" }]
comments = [{ postId: 1 }, { postId: 1 }]

Выход:
[{ id: 1, title: "Hello", userName: "Leanne Graham", commentsCount: 2 }]`},starterCode:`// Доступно без импорта: встроенные методы JS
function enrichPosts(posts, users, comments) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Один пост с двумя комментариями`,args:[[{id:1,title:`Hello`,userId:1}],[{id:1,name:`Leanne Graham`}],[{postId:1},{postId:1}]],expected:[{id:1,title:`Hello`,userName:`Leanne Graham`,commentsCount:2}]},{name:`Комментарии считаются по своему посту`,args:[[{id:1,title:`A`,userId:1},{id:2,title:`B`,userId:2}],[{id:1,name:`Ann`},{id:2,name:`Bob`}],[{postId:2},{postId:1},{postId:2}]],expected:[{id:1,title:`A`,userName:`Ann`,commentsCount:1},{id:2,title:`B`,userName:`Bob`,commentsCount:2}]},{name:`Постов нет`,args:[[],[{id:1,name:`Ann`}],[]],expected:[]},{name:`Пост без комментариев`,args:[[{id:5,title:`Quiet`,userId:1}],[{id:1,name:`Ann`}],[{postId:9}]],expected:[{id:5,title:`Quiet`,userName:`Ann`,commentsCount:0}],hidden:!0},{name:`Порядок постов сохраняется`,args:[[{id:2,title:`Second`,userId:1},{id:1,title:`First`,userId:1}],[{id:1,name:`Ann`}],[]],expected:[{id:2,title:`Second`,userName:`Ann`,commentsCount:0},{id:1,title:`First`,userName:`Ann`,commentsCount:0}],hidden:!0}]},{title:`EventEmitter с отпиской через замыкание и строгой проверкой подписчиков (EventEmitter with Unsubscribe Closure)`,difficulty:3,categories:[`Patterns`],languages:[`JavaScript`],functionName:`EventEmitter`,description:{condition:"Реализуйте класс `EventEmitter` с методами `on` и `emit`. В отличие от классического EventEmitter с методом `off`, в этой реализации отдельного метода отписки нет — отписка выполняется через функцию, которую возвращает сам `on`.\n\nМетод `on(eventName, callback)`:\n\nрегистрирует `callback` как слушателя события `eventName`;\n\nвозвращает функцию без аргументов — при её вызове именно этот `callback` удаляется из списка слушателей данного события (и только он, если тот же обработчик был подписан на событие несколько раз).\n\nМетод `emit(eventName, payload)`:\n\nвызывает все обработчики, подписанные на `eventName`, передавая им `payload`, в порядке подписки;\n\nесли на момент вызова у события нет ни одного подписанного слушателя, метод обязан выбросить исключение (это ключевое отличие от реализаций, которые в этом случае просто ничего не делают).",input:["Последовательность операций: подписка через `on` (с сохранением возвращённой функции-отписки), вызов через `emit`, отписка вызовом сохранённой функции."],output:"Список вызовов обработчиков (какой обработчик и с каким `payload` был вызван) либо факт выброшенного исключения при `emit` без подписчиков.",constraints:[`Имя события — непустая строка.`,`Подписчиков на одно событие: от 0 до 20.`,`Операций (on/emit/вызов отписки) в одном тесте: не более 50.`,"`payload` — произвольное сериализуемое значение или отсутствует."],example:`Вход:
unsubscribe1 = on("event", cb1)
emit("event", "hello")       → cb1 вызван с "hello"
unsubscribe1()
emit("event", "hello2")      → нет подписчиков → исключение

Вход:
on("event", cb1)
on("event", cb1)             // тот же callback дважды
unsubscribe = ...             // отписка от первого
emit("event", "x")           → cb1 вызван один раз (второй остался)`},starterCode:`// Доступно без импорта: встроенные методы JS

class EventEmitter {
  constructor() {
    // TODO: напишите решение здесь
  }

  on(eventName, callback) {
    // TODO: напишите решение здесь
    // Должна вернуться функция без аргументов - отписка именно этого callback
    return function() {};
  }

  emit(eventName, payload) {
    // TODO: напишите решение здесь
    // Если у eventName нет активных подписчиков - выбросить исключение
  }
}
`,tests:[{name:`on возвращает функцию отписки`,body:`const e = new solution();
const calls = [];
const unsubscribe = e.on("event", (p) => calls.push(p));
e.emit("event", "hello");
unsubscribe();
try {
  e.emit("event", "hello2");
  return [calls, "no error"];
} catch {
  return [calls, "threw"];
}`,expected:[[`hello`],`threw`]},{name:`Отписка снимает только одну из двух одинаковых подписок`,body:`const e = new solution();
let count = 0;
const cb = () => count++;
const off = e.on("event", cb);
e.on("event", cb);
off();
e.emit("event", "x");
return count;`,expected:1},{name:`emit без подписчиков выбрасывает исключение`,body:`const e = new solution();
try {
  e.emit("nothing", 1);
  return "no error";
} catch {
  return "threw";
}`,expected:`threw`},{name:`Обработчики вызываются в порядке подписки`,body:`const e = new solution();
const calls = [];
e.on("x", () => calls.push("first"));
e.on("x", () => calls.push("second"));
e.emit("x");
return calls;`,expected:[`first`,`second`],hidden:!0},{name:`Повторная отписка безопасна`,body:`const e = new solution();
const off = e.on("x", () => {});
e.on("x", () => {});
off();
off();
try {
  e.emit("x");
  return "ok";
} catch {
  return "threw";
}`,expected:`ok`,hidden:!0}]},{title:`Fetch с повторными попытками (fetchWithRetry)`,difficulty:3,categories:[`Asynchronous`],languages:[`JavaScript`],functionName:`fetchWithRetry`,description:{condition:"Реализуйте функцию `fetchWithRetry(url, options, retries)`, которая отправляет HTTP-запрос с помощью `fetch` и автоматически повторяет его при неудаче.\n\nФункция должна соблюдать следующие правила:\n\nЕсли запрос завершился успешно (статус `response.ok === true`), вернуть объект `response`.\n\nЕсли ответ пришёл со статусом `401` (Unauthorized) или `403` (Forbidden) — немедленно вернуть reject с ошибкой, не делая повторных попыток.\n\nЕсли метод запроса — `PUT` — повторные попытки не разрешены: максимум 1 попытка (т.е. `retries` принудительно устанавливается в `1`).\n\nЕсли все попытки исчерпаны и ни одна не удалась — вернуть reject с последней ошибкой.\n\nВ остальных случаях — повторять запрос, пока не закончатся попытки.",input:["`url` (string) — адрес запроса","`options` (object) — параметры fetch: `{ method, headers, body, ... }`","`retries` (number) — максимальное количество попыток (≥ 1)"],output:`Promise, который resolves с объектом Response при успехе, или rejects с объектом Error при неудаче.`,constraints:["`1 ≤ retries ≤ 10`",'`options.method` — одно из `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`',`Без задержки между попытками (для простоты)`,"Среда: Node.js / браузер с поддержкой `fetch`"],example:`Вход: url = "https://api.example.com/data", options = { method: "GET" }, retries = 3
// Сервер дважды отвечает 500, третий раз — 200
Выход: Promise<Response> (resolved, статус 200)
Вход: url = "...", options = { method: "GET" }, retries = 3
// Сервер отвечает 401
Выход: Promise<Error> (rejected немедленно, без повторов)
Вход: url = "...", options = { method: "PUT" }, retries = 5
// retries принудительно = 1, одна попытка
Выход: Promise<Response> или Promise<Error> (только 1 попытка)

Тест будет использовать mock-реализацию fetch, симулирующую разные сценарии.`},starterCode:`// Доступно без импорта: встроенные методы JS

async function fetchWithRetry(url, options, retries) {
  // TODO: напишите решение здесь
}
`,tests:[{name:`Повторяет запрос до успеха`,body:`let calls = 0;
globalThis.fetch = async () => {
  calls++;
  return calls < 3 ? { ok: false, status: 500 } : { ok: true, status: 200 };
};
const response = await solution("/data", { method: "GET" }, 3);
return [response.status, calls];`,expected:[200,3]},{name:`401 — реджект без повторов`,body:`let calls = 0;
globalThis.fetch = async () => { calls++; return { ok: false, status: 401 }; };
try {
  await solution("/data", { method: "GET" }, 3);
  return ["resolved", calls];
} catch {
  return ["rejected", calls];
}`,expected:[`rejected`,1]},{name:`PUT выполняется ровно один раз`,body:`let calls = 0;
globalThis.fetch = async () => { calls++; return { ok: false, status: 500 }; };
try {
  await solution("/data", { method: "PUT" }, 5);
} catch {}
return calls;`,expected:1},{name:`403 тоже не повторяется`,body:`let calls = 0;
globalThis.fetch = async () => { calls++; return { ok: false, status: 403 }; };
try {
  await solution("/data", { method: "GET" }, 4);
  return ["resolved", calls];
} catch {
  return ["rejected", calls];
}`,expected:[`rejected`,1],hidden:!0},{name:`Все попытки исчерпаны — реджект`,body:`let calls = 0;
globalThis.fetch = async () => { calls++; return { ok: false, status: 500 }; };
try {
  await solution("/data", { method: "GET" }, 3);
  return ["resolved", calls];
} catch {
  return ["rejected", calls];
}`,expected:[`rejected`,3],hidden:!0},{name:`Успех с первой попытки`,body:`let calls = 0;
globalThis.fetch = async () => { calls++; return { ok: true, status: 200 }; };
const response = await solution("/data", { method: "GET" }, 3);
return [response.ok, calls];`,expected:[!0,1],hidden:!0}]},{title:`Заполнение матрицы по спирали (Fill Matrix in Spiral Order)`,difficulty:3,categories:[`Matrices`],languages:[`JavaScript`],functionName:`fillMatrixSpiral`,description:{condition:`Напишите функцию, которая принимает ширину и высоту матрицы и возвращает двумерный массив, заполненный числами по спирали — по возрастанию, начиная с 1, двигаясь сначала вправо, затем вниз, затем влево, затем вверх, и так далее по кругу к центру.`,input:["`width` — количество столбцов","`height` — количество строк"],output:"Матрица (массив массивов) размером `height x width`, заполненная числами от 1 до `width * height` по спирали",constraints:["`0 <= width, height <= 100`","Если `width` или `height` равны 0 — вернуть пустой массив"],example:`Вход: width = 3, height = 3
Выход:
[
  [1, 2, 3],
  [8, 9, 4],
  [7, 6, 5]
]

Вход: width = 4, height = 3
Выход:
[
  [1, 2, 3, 4],
  [10, 11, 12, 5],
  [9, 8, 7, 6]
]`},starterCode:`// Доступно без импорта: встроенные методы JS

function fillMatrixSpiral(width, height) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`3 x 3`,args:[3,3],expected:[[1,2,3],[8,9,4],[7,6,5]]},{name:`4 x 3`,args:[4,3],expected:[[1,2,3,4],[10,11,12,5],[9,8,7,6]]},{name:`1 x 1`,args:[1,1],expected:[[1]]},{name:`Одна строка`,args:[4,1],expected:[[1,2,3,4]],hidden:!0},{name:`Один столбец`,args:[1,4],expected:[[1],[2],[3],[4]],hidden:!0},{name:`2 x 4`,args:[2,4],expected:[[1,2],[8,3],[7,4],[6,5]],hidden:!0}]},{title:`Заполнение матрицы змейкой по столбцам (Fill Matrix Snake by Columns)`,difficulty:3,categories:[`Matrices`],languages:[`JavaScript`],functionName:`fillMatrixSnake`,description:{condition:"Дан одномерный массив чисел и размеры матрицы (количество строк `rows` и столбцов `cols`). Нужно заполнить матрицу элементами массива по столбцам змейкой: первый столбец заполняется сверху вниз, второй — снизу вверх, третий — снова сверху вниз, и так далее (чередование направления в каждом следующем столбце). Если `rows * cols` не равно длине массива, нужно выбросить ошибку.",input:["`nums` — массив целых чисел","`rows` — количество строк матрицы","`cols` — количество столбцов матрицы"],output:"Матрица (массив массивов) размером `rows x cols`, заполненная по описанному правилу",constraints:["`0 <= nums.length <= 10^4`","`1 <= rows, cols <= 100` (при непустом массиве)","Если `rows * cols != nums.length` — выбросить ошибку (исключение)"],example:`Вход: nums = [1, 2, 3, 4, 5, 6], rows = 3, cols = 2
Столбец 0 (сверху вниз): 1, 2, 3
Столбец 1 (снизу вверх): 4, 5, 6 → в столбец идут как 6, 5, 4 сверху вниз
Выход:
[
  [1, 6],
  [2, 5],
  [3, 4]
]

Вход: nums = [1, 2, 3], rows = 2, cols = 2
Выход: ошибка (2*2=4 ≠ 3)`},starterCode:`// Доступно без импорта: встроенные методы JS

function fillMatrixSnake(nums, rows, cols) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`3 x 2 змейкой`,args:[[1,2,3,4,5,6],3,2],expected:[[1,6],[2,5],[3,4]]},{name:`Несовпадение размеров — ошибка`,body:`try {
  solution([1, 2, 3], 2, 2);
  return "no error";
} catch {
  return "threw";
}`,expected:`threw`},{name:`Один столбец`,args:[[1,2,3],3,1],expected:[[1],[2],[3]]},{name:`Третий столбец снова сверху вниз`,args:[[1,2,3,4,5,6],2,3],expected:[[1,4,5],[2,3,6]],hidden:!0},{name:`Одна строка`,args:[[1,2,3],1,3],expected:[[1,2,3]],hidden:!0}]},{title:`Фильтрация числовых значений из массива объектов (Filter Numeric Values From Objects)`,difficulty:1,categories:[`Arrays`,`Objects`,`Filtering`],languages:[`JavaScript`],functionName:`filterNumericValues`,description:{condition:'Дан массив объектов, каждый из которых содержит поле `value`. Значение этого поля может быть числом или строкой. Напишите функцию, которая возвращает новый массив, содержащий только числовые значения поля `value` (строковые значения отбрасываются, даже если строка визуально похожа на число, например `"42"`). Порядок значений в результате должен совпадать с порядком объектов в исходном массиве.',input:["`items` — массив объектов вида `{ value: number | string }` (длина от 0 до 10⁴)"],output:"Массив чисел — значения поля `value`, у которых тип действительно `number` (строки, даже числоподобные, исключаются).",constraints:["`0 <= items.length <= 10000`","`value` может быть числом (включая отрицательные и дробные) или строкой","Другие типы (`null`, `boolean`, `undefined`, объекты) в поле `value` не встречаются"],example:`Вход: [{value: 1}, {value: "2"}, {value: 3.5}, {value: "abc"}]
Выход: [1, 3.5]

Вход: [{value: "10"}, {value: "20"}]
Выход: []

Вход: []
Выход: []`},starterCode:`// Доступно без импорта: встроенные методы JS

function filterNumericValues(items) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Строки отбрасываются`,args:[[{value:1},{value:`2`},{value:3.5},{value:`abc`}]],expected:[1,3.5]},{name:`Только строки`,args:[[{value:`10`},{value:`20`}]],expected:[]},{name:`Пустой массив`,args:[[]],expected:[]},{name:`Порядок сохраняется`,args:[[{value:3},{value:`x`},{value:1},{value:2}]],expected:[3,1,2],hidden:!0},{name:`Ноль и отрицательные числа остаются`,args:[[{value:0},{value:-5}]],expected:[0,-5],hidden:!0}]},{title:`Поиск анаграмм в строке (Find All Anagrams)`,difficulty:3,categories:[`Strings`],languages:[`JavaScript`],functionName:`findAnagrams`,description:{condition:"Напишите функцию `findAnagrams`, которая принимает строку `str` и подстроку `substr`, и возвращает массив индексов начала всех вхождений анаграмм подстроки `substr` в строке `str`. Анаграмма — это перестановка символов исходной строки.",input:[],output:``,constraints:["Строка `str` может быть любой длины (до 10^5 символов)","Подстрока `substr` может быть любой длины (до 10^4 символов)","Если длина `substr` больше длины `str`, возвращается пустой массив",`Регистр символов учитывается (анаграммы чувствительны к регистру)`,`Индексы в возвращаемом массиве должны быть в порядке возрастания`],example:`Вход: ("cbaebabacd", "abc")
Выход: [0, 6]
Пояснение: Анаграммы "abc" начинаются с индекса 0 ("cba") и индекса 6 ("bac")

Вход: ("abab", "ab")
Выход: [0, 1, 2]
Пояснение: Анаграммы "ab" начинаются с индексов 0 ("ab"), 1 ("ba") и 2 ("ab")

Вход: ("aaaa", "aa")
Выход: [0, 1, 2]
Пояснение: Анаграммы "aa" начинаются с индексов 0, 1, 2

Вход: ("hello", "world")
Выход: []
Пояснение: Нет анаграмм "world" в строке "hello"`},starterCode:`function findAnagrams(str, substr) {
    // TODO: write your solution here
    return [];
}
`,tests:[{name:`("cbaebabacd", "abc")`,args:[`cbaebabacd`,`abc`],expected:[0,6]},{name:`("abab", "ab")`,args:[`abab`,`ab`],expected:[0,1,2]},{name:`("aaaa", "aa")`,args:[`aaaa`,`aa`],expected:[0,1,2]},{name:`Анаграмм нет`,args:[`hello`,`world`],expected:[],hidden:!0},{name:`Подстрока длиннее строки`,args:[`ab`,`abc`],expected:[],hidden:!0},{name:`Совпадение в самом конце`,args:[`xxab`,`ba`],expected:[2],hidden:!0}]},{title:`Определение чемпионов по шагам (Find Champions by Steps)`,difficulty:3,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`findChampions`,description:{condition:`Напишите функцию \`findChampions(statistics)\`, которая принимает массив ежедневных данных о шагах участников соревнования.

Каждый элемент массива представляет собой массив объектов с информацией об участниках:\`userId\` — идентификатор участника (число)

\`steps\` — количество шагов за день (число)

Функция должна вернуть объект с двумя полями:

\`userIds\` — массив идентификаторов участников, которые прошли наибольшее количество шагов и не пропустили ни одного дня соревнования

\`steps\` — общее количество шагов этих участников

Правила:

Участник считается пропустившим день, если в этом дне отсутствует его запись.

Если несколько участников набрали одинаковое максимальное количество шагов, все их идентификаторы должны присутствовать в массиве \`userIds\`.

Примеры ввода и ожидаемого вывода:`,input:[],output:``,constraints:[],example:`statistics1 = [
  [{ userId: 1, steps: 1000 }, { userId: 2, steps: 1500 }],
  [{ userId: 2, steps: 1000 }]
]
-> { userIds: [2], steps: 2500 }

statistics2 = [
  [{ userId: 1, steps: 2000 }, { userId: 2, steps: 1500 }],
  [{ userId: 2, steps: 4000 }, { userId: 1, steps: 3500 }]
]
-> { userIds: [1, 2], steps: 5500 }

statistics3 = [
  [{ userId: 1, steps: 1000 }],
  [{ userId: 2, steps: 2000 }]
]
-> { userIds: [], steps: 0 }  // никто не прошел все дни`},starterCode:`function findChampions(statistics) {
    // TODO: write your solution here
    return { userIds: [], steps: 0 };
}
`,tests:[{name:`Пропустивший день не считается`,args:[[[{userId:1,steps:1e3},{userId:2,steps:1500}],[{userId:2,steps:1e3}]]],expected:{userIds:[2],steps:2500}},{name:`Ничья — оба чемпиона`,args:[[[{userId:1,steps:2e3},{userId:2,steps:1500}],[{userId:2,steps:4e3},{userId:1,steps:3500}]]],expected:{userIds:[1,2],steps:5500}},{name:`Все пропустили хотя бы день`,args:[[[{userId:1,steps:1e3}],[{userId:2,steps:2e3}]]],expected:{userIds:[],steps:0}},{name:`Один день соревнований`,args:[[[{userId:3,steps:10},{userId:4,steps:20}]]],expected:{userIds:[4],steps:20},hidden:!0},{name:`Пустая статистика`,args:[[]],expected:{userIds:[],steps:0},hidden:!0}]},{title:`Поиск дубликатов в массиве (Find Duplicates)`,difficulty:1,categories:[`Arrays`],languages:[`JavaScript`],functionName:`existsDuplicate`,description:{condition:`Напишите функцию \`existsDuplicate\`, которая принимает массив целых чисел и возвращает \`true\`, если какое-либо значение появляется в массиве не менее двух раз, и \`false\`, если каждый элемент уникален.

Правила:

Массив содержит целые числа

Функция должна вернуть \`true\` при наличии хотя бы одного дубликата

Если все элементы уникальны, возвращается \`false\`

Пустой массив считается не содержащим дубликатов`,input:[],output:``,constraints:[`Длина массива: 0 ≤ N ≤ 1000`,`Элементы: целые числа`,`Время выполнения: O(N)`,`Память: O(N)`],example:`existsDuplicate([4, 6, 7, 7, 1])     // -> true
existsDuplicate([7, 1, 5, 4, 2, 10]) // -> false
existsDuplicate([1, 2, 3, 1])         // -> true
existsDuplicate([])                   // -> false`},starterCode:`function existsDuplicate(numbers) {
    // TODO: write your solution here
    return false;
}
`,tests:[{name:`Есть дубликат`,args:[[4,6,7,7,1]],expected:!0},{name:`Все элементы уникальны`,args:[[7,1,5,4,2,10]],expected:!1},{name:`Дубликаты не рядом`,args:[[1,2,3,1]],expected:!0},{name:`Пустой массив`,args:[[]],expected:!1,hidden:!0},{name:`Один элемент`,args:[[5]],expected:!1,hidden:!0}]},{title:`Повторяющиеся элементы (Find Duplicates)`,difficulty:3,categories:[`Strings`],languages:[`JavaScript`],functionName:`findDuplicates`,description:{condition:`Дан слайс строк. Верни слайс строк, которые встречаются в исходном слайсе более одного раза. Порядок элементов в результате — в порядке первого появления в исходном слайсе.`,input:["`[]string` — слайс строк"],output:"`[]string` — строки, встречающиеся более одного раза, в порядке первого появления",constraints:["`0 <= len(input) <= 10^4`","Каждая строка состоит из латинских букв, длина строки `1..50`"],example:`Вход:  ["a", "bb", "bb", "aa", "a", "a"]
Выход: ["a", "bb"]`},starterCode:`function findDuplicates(items) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Порядок первого появления`,args:[[`a`,`bb`,`bb`,`aa`,`a`,`a`]],expected:[`a`,`bb`]},{name:`Дубликатов нет`,args:[[`a`,`b`,`c`]],expected:[]},{name:`Пустой массив`,args:[[]],expected:[]},{name:`Элемент встречается трижды — в результате один раз`,args:[[`x`,`x`,`x`]],expected:[`x`],hidden:!0},{name:`Несколько групп дубликатов`,args:[[`b`,`a`,`b`,`c`,`a`]],expected:[`b`,`a`],hidden:!0}]},{title:`Поиск комбинаций чисел (Find Number Combinations)`,difficulty:3,categories:[`Arrays`],languages:[`JavaScript`],functionName:`findCombinations`,description:{condition:`Напишите функцию \`findCombinations\`, которая принимает массив целых чисел и целевое число. Функция должна найти все уникальные комбинации чисел из массива, сумма которых равна целевому числу.

Важные условия:

Каждое число может использоваться в комбинации только один раз

Комбинации должны быть уникальными (порядок чисел не важен)

В результате комбинации должны быть отсортированы по возрастанию

Итоговый массив комбинаций должен быть отсортирован по первому элементу, затем по второму и т.д.`,input:[],output:``,constraints:[`Массив может содержать дубликаты чисел`,`Длина массива: от 1 до 20 элементов`,`Значения чисел: от -100 до 100`,`Целевое число: от -1000 до 1000`,`Время выполнения: не более 1 секунды`],example:`Вход: массив = [1, 2, 3, 4, 5], целевое число = 5
Выход: [[1,4], [2,3], [5]]

Вход: массив = [2, 2, 3], целевое число = 5
Выход: [[2,3]]

Вход: массив = [1, 1, 1, 1], целевое число = 2
Выход: [[1,1]]

Вход: массив = [1, 2, 3], целевое число = 7
Выход: []`},starterCode:`function findCombinations(arr, target) {
    // TODO: write your solution here
    return [];
}
`,tests:[{name:`[1,2,3,4,5], target 5`,args:[[1,2,3,4,5],5],expected:[[1,4],[2,3],[5]]},{name:`Дубликаты во входе`,args:[[2,2,3],5],expected:[[2,3]]},{name:`Одинаковые числа`,args:[[1,1,1,1],2],expected:[[1,1]]},{name:`Комбинаций нет`,args:[[1,2,3],7],expected:[],hidden:!0},{name:`Числа больше target не мешают`,args:[[9,1,2],3],expected:[[1,2]],hidden:!0}]},{title:`Найти лишний символ (Find the Difference)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`findTheDifference`,description:{condition:"Даны две строки `s` и `t`.\n\nСтрока `t` получена перемешиванием символов строки `s` и добавлением одного лишнего символа.\n\nНужно найти этот лишний символ.\n\nАлгоритм должен работать за O(n).",input:[`s, t`,`Где:`,`len(t) - len(s) == 1`],output:"Нужно вернуть символ, который есть в строке `t`, но является добавленным лишним символом.",constraints:[`0 <= s.length <= 100000`,`t.length == s.length + 1`,`s и t состоят из строчных английских букв`],example:`Вход: s = "abcd", t = "abcde"
Выход: "e"`},starterCode:`function findTheDifference(s, t) {
  // TODO: напишите решение здесь
  return "";
}
`,tests:[{name:`"abcd" → "abcde"`,args:[`abcd`,`abcde`],expected:`e`},{name:`Лишний символ в начале`,args:[`abc`,`xabc`],expected:`x`},{name:`Пустая s`,args:[``,`q`],expected:`q`},{name:`Символы перемешаны, лишний в середине`,args:[`abcd`,`dbzac`],expected:`z`,hidden:!0},{name:`Лишний символ — повтор существующего`,args:[`aab`,`aaab`],expected:`a`,hidden:!0}]},{title:`Минимальное отсутствующее положительное число (First Missing Positive)`,difficulty:3,categories:[`Arrays`],languages:[`JavaScript`],functionName:`firstMissingPositive`,description:{condition:`Дан неотсортированный массив целых чисел \`nums\`.

Нужно найти минимальное положительное число, которого нет в массиве.

Положительными считаются только числа больше 0. Число \`0\` положительным не считается.`,input:["`nums` — массив целых чисел (может быть пустым)"],output:`Целое число — минимальное положительное число, отсутствующее в массиве`,constraints:["`0 <= nums.length <= 10^5`",`Числа могут быть отрицательными и повторяться`],example:`Вход: [1, 2, 0]
Выход: 3

Вход: [3, 4, -1, 1]
Выход: 2

Вход: [7, 8, 9]
Выход: 1`},starterCode:`function firstMissingPositive(nums) {
  // TODO: напишите решение здесь
  return 1;
}
`,tests:[{name:`[1, 2, 0]`,args:[[1,2,0]],expected:3},{name:`[3, 4, -1, 1]`,args:[[3,4,-1,1]],expected:2},{name:`[7, 8, 9]`,args:[[7,8,9]],expected:1},{name:`Пустой массив`,args:[[]],expected:1,hidden:!0},{name:`Дубликаты`,args:[[1,1,2,2]],expected:3,hidden:!0},{name:`Только отрицательные`,args:[[-3,-1]],expected:1,hidden:!0}]},{title:`Первый уникальный элемент (First Unique Element)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`firstUniqueElement`,description:{condition:`Дан массив целых чисел \`nums\`.

Нужно найти первый элемент, который встречается в массиве ровно один раз.

Порядок важен: нужно вернуть именно тот уникальный элемент, который расположен раньше всех в исходном массиве.

Если в массиве нет уникальных элементов, нужно вернуть \`-1\`.`,input:[`Массив целых чисел:`,`nums`],output:`Целое число — первый неповторяющийся элемент массива.
Если такого элемента нет, вернуть:
-1`,constraints:[`0 <= nums.length <= 100000`,`-10^9 <= nums[i] <= 10^9`],example:`Вход:

nums = [9, 4, 9, 6, 7, 4, 5]

Выход:

6`},starterCode:`function firstUniqueElement(nums) {
  // TODO: напишите решение здесь
  return -1;
}
`,tests:[{name:`[9, 4, 9, 6, 7, 4, 5] → 6`,args:[[9,4,9,6,7,4,5]],expected:6},{name:`Уникальных нет`,args:[[1,1,2,2]],expected:-1},{name:`Пустой массив`,args:[[]],expected:-1},{name:`Первый элемент уникален`,args:[[5,3,3]],expected:5,hidden:!0},{name:`Уникальный элемент окружён разными числами`,args:[[1,2,1,3,2,4,3]],expected:4,hidden:!0}]},{title:`FizzBuzz`,difficulty:1,categories:[`Strings`],languages:[`JavaScript`],functionName:`fizzBuzz`,description:{condition:`Напишите функцию \`fizzBuzz\`, которая выводит числа от 1 до 100. При этом:

Если число кратно 3, вместо числа выводится \`"Fizz"\`

Если число кратно 5, вместо числа выводится \`"Buzz"\`

Если число кратно и 3, и 5, вместо числа выводится \`"FizzBuzz"\`

В остальных случаях выводится само число

Функция должна вернуть строку, где все результаты разделены пробелами.`,input:[],output:``,constraints:[`Функция не принимает параметров (всегда от 1 до 100)`,`Возвращает строку с пробелами между элементами`,`В конце строки пробела нет`],example:`Первые 15 чисел:
Вход: (функция без параметров)
Выход: "1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz"

Конкретные проверки:
Число 3 → "Fizz"
Число 5 → "Buzz"
Число 15 → "FizzBuzz"
Число 7 → "7"`},starterCode:`function fizzBuzz() {
    // TODO: write your solution here
    return "";
}
`,tests:[{name:`Первые 15 чисел`,body:`return solution().split(" ").slice(0, 15).join(" ");`,expected:`1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz`},{name:`Ровно 100 значений`,body:`return solution().split(" ").length;`,expected:100},{name:`Последнее значение — Buzz (100)`,body:`const parts = solution().split(" ");
return parts[99];`,expected:`Buzz`,hidden:!0},{name:`Кратные 15 — FizzBuzz`,body:`const parts = solution().split(" ");
return [parts[14], parts[29], parts[89]];`,expected:[`FizzBuzz`,`FizzBuzz`,`FizzBuzz`],hidden:!0}]},{title:`Разворачивание вложенных массивов (Flatten Array)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`unpack`,description:{condition:"Напишите функцию `unpack`, которая принимает массив, содержащий элементы и вложенные массивы любой глубины, и возвращает новый одномерный массив, содержащий все элементы из исходного массива и всех вложенных массивов в том же порядке.",input:[],output:``,constraints:[`Массив может содержать числа, строки или другие массивы`,`Глубина вложенности не ограничена`,`Исходный массив не должен изменяться`,`Если массив пустой, возвращается пустой массив`],example:`Вход: [1, 2, 3, [4, 5, [6, 7]]]
Выход: [1, 2, 3, 4, 5, 6, 7]

Вход: [1, [2, [3]], 4, [5, [6, 7]]]
Выход: [1, 2, 3, 4, 5, 6, 7]

Вход: []
Выход: []

Вход: [1, [2, 3], 4]
Выход: [1, 2, 3, 4]`},starterCode:`function unpack(arr) {
    // TODO: write your solution here
    return [];
}
`,tests:[{name:`[1, 2, 3, [4, 5, [6, 7]]]`,args:[[1,2,3,[4,5,[6,7]]]],expected:[1,2,3,4,5,6,7]},{name:`[1, [2, [3]], 4, [5, [6, 7]]]`,args:[[1,[2,[3]],4,[5,[6,7]]]],expected:[1,2,3,4,5,6,7]},{name:`Пустой массив`,args:[[]],expected:[]},{name:`Один уровень вложенности`,args:[[1,[2,3],4]],expected:[1,2,3,4],hidden:!0},{name:`Глубокая вложенность`,args:[[[[[1]]],2]],expected:[1,2],hidden:!0},{name:`Вложенные пустые массивы`,args:[[[],[[]],1]],expected:[1],hidden:!0}]},{title:`Плоское преобразование объекта (Flatten Object)`,difficulty:3,categories:[`Objects`],languages:[`JavaScript`],functionName:`flattenObject`,description:{condition:`Реализуйте функцию \`flattenObject()\`, которая преобразует вложенный объект в плоскую структуру, где ключи содержат пути до значений в исходном объекте.

Параметры функции:

\`obj\` (Object) - входной объект для преобразования`,input:[],output:``,constraints:["Пути до значений разделяются символом `/`",`Массивы обрабатываются как объекты с числовыми индексами`,`Функция должна корректно обрабатывать вложенные объекты любой глубины`,`Возвращать плоский объект с путями в качестве ключей`,`Не использовать внешние библиотеки`,`Глубина вложенности ≤ 100`,`Размер объекта ≤ 10000 ключей`],example:`const input = {
    a: 1,
    b: {
        c: 2,
        d: {
            e: 3
        }
    },
    f: [4, 5, { g: 6 }]
};

const output = flattenObject(input);
// {
//     "a": 1,
//     "b/c": 2,
//     "b/d/e": 3,
//     "f/0": 4,
//     "f/1": 5,
//     "f/2/g": 6
// }`},starterCode:`function flattenObject(obj) {
    // TODO: напишите решение здесь
    return {};
}
`,tests:[{name:`Объекты и массивы`,args:[{a:1,b:{c:2,d:{e:3}},f:[4,5,{g:6}]}],expected:{a:1,"b/c":2,"b/d/e":3,"f/0":4,"f/1":5,"f/2/g":6}},{name:`Плоский объект не меняется`,args:[{a:1,b:2}],expected:{a:1,b:2}},{name:`Пустой объект`,args:[{}],expected:{}},{name:`Глубокая вложенность`,args:[{a:{b:{c:{d:1}}}}],expected:{"a/b/c/d":1},hidden:!0},{name:`Массив на верхнем уровне`,args:[{list:[[1],[2]]}],expected:{"list/0/0":1,"list/1/0":2},hidden:!0}]},{title:`Плоский обход дерева (Flatten Tree to List)`,difficulty:3,categories:[`Trees`],languages:[`JavaScript`],functionName:`flattenTree`,description:{condition:"Дано дерево, каждый узел которого содержит поле `name` (строка) и поле `children` (массив дочерних узлов, может быть пустым или отсутствовать). Напишите функцию, которая обходит всё дерево и возвращает плоский массив значений `name` всех узлов.\n\nПорядок вывода — не важен (допустим любой корректный обход). Реализацию необходимо выполнить итеративно, используя стек, без рекурсии.",input:["`root` — корневой узел дерева вида `{ name: string, children?: Node[] }`"],output:"Массив строк — значения `name` всех узлов дерева в порядке обхода (глубина первая, итеративно).",constraints:["`1 <= количество узлов <= 10^4`",`Глубина вложенности может быть произвольной`,"`name` — непустая строка"],example:`Вход:

{
  name: "A",
  children: [
    { name: "B", children: [{ name: "D", children: [] }, { name: "E", children: [] }] },
    { name: "C", children: [{ name: "F", children: [] }] }
  ]
}

Выход: \`["A", "C", "F", "B", "E", "D"]\` (DFS через стек, дети добавляются слева направо, извлекается с конца)`},starterCode:`// Узел дерева: { name: string, children?: { name: string, children?: ... }[] }
// Доступно без импорта: встроенные методы JS

function flattenTree(root) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`DFS через стек`,args:[{name:`A`,children:[{name:`B`,children:[{name:`D`,children:[]},{name:`E`,children:[]}]},{name:`C`,children:[{name:`F`,children:[]}]}]}],expected:[`A`,`C`,`F`,`B`,`E`,`D`]},{name:`Один узел`,args:[{name:`root`,children:[]}],expected:[`root`]},{name:`Узел без поля children`,args:[{name:`solo`}],expected:[`solo`]},{name:`Глубокая цепочка`,args:[{name:`1`,children:[{name:`2`,children:[{name:`3`}]}]}],expected:[`1`,`2`,`3`],hidden:!0},{name:`Все узлы попадают в результат`,body:`const tree = {
  name: "root",
  children: [
    { name: "a", children: [{ name: "a1" }, { name: "a2" }] },
    { name: "b", children: [{ name: "b1" }] },
  ],
};
return solution(tree).slice().sort();`,expected:[`a`,`a1`,`a2`,`b`,`b1`,`root`],hidden:!0}]},{title:`Футбольный приз (Football Prize)`,difficulty:1,categories:[`Strings`],languages:[`JavaScript`],functionName:`getPrize`,description:{condition:`Две команды, А и Б, играют в футбол. Некто делает свою ставку на результат матча, например \`"1:2"\`. По окончании матча становится известен настоящий счёт, и нам надо выдать тот или иной приз:

Если некто угадал точный счёт — он получает большой приз (2)

Если некто угадал исход матча (победа/ничья/поражение) — он получает маленький приз (1)

Если же он не угадал — он получает нулевой приз (0)

Необходимо написать функцию, которая принимает в качестве аргументов предполагаемый счёт и реальный счёт, и возвращает целое число 0, 1 или 2.

Правила:

Счёт передаётся в формате \`"X:Y"\`, где X — голы команды А, Y — голы команды Б

Точный счёт — совпадают оба числа

Исход матча определяется сравнением голов:Победа команды А: X > Y

Победа команды Б: X < Y

Ничья: X = Y`,input:[],output:``,constraints:['Строки всегда в формате `"X:Y"` с целыми неотрицательными числами',`X и Y — целые числа от 0 до 100`,`Время выполнения: O(1)`,`Память: O(1)`],example:`getPrize('1:2', '1:2')  // -> 2 (точный счёт)
getPrize('2:1', '5:0')  // -> 1 (исход: победа А)
getPrize('3:0', '2:2')  // -> 0 (не угадал)`},starterCode:`function getPrize(guessScore, realScore) {
    // TODO: write your solution here
    return 0;
}
`,tests:[{name:`Точный счёт`,args:[`1:2`,`1:2`],expected:2},{name:`Угадан исход — победа А`,args:[`2:1`,`5:0`],expected:1},{name:`Не угадал`,args:[`3:0`,`2:2`],expected:0},{name:`Угадана ничья`,args:[`1:1`,`3:3`],expected:1,hidden:!0},{name:`Угадана победа Б`,args:[`0:2`,`1:4`],expected:1,hidden:!0},{name:`Ничья против победы`,args:[`2:2`,`2:1`],expected:0,hidden:!0}]},{title:`Форматирование списка имён (Format Name List)`,difficulty:1,categories:[`Strings`],languages:[`JavaScript`],functionName:`list`,description:{condition:`Напишите функцию \`list\`, которая принимает массив объектов с полем \`name\` и возвращает строку, отформатированную в виде списка имён, разделённых запятыми, за исключением двух последних имён, которые должны быть разделены амперсандом \`&\`.

Правила:

Если массив пустой, вернуть пустую строку

Если в массиве один элемент, вернуть только это имя

Если в массиве два элемента, вернуть \`"name1 & name2"\`

Если в массиве три и более элементов, все имена, кроме последних двух, разделяются запятыми, а последние два — амперсандом`,input:[],output:``,constraints:[`Длина массива: 0 ≤ N ≤ 1000`,"Объекты всегда имеют поле `name`",`Имена — строки`,`Время выполнения: O(N)`,`Память: O(N)`],example:`list([{name:'Bart'}])                      // -> "Bart"
list([{name:'Bart'}, {name: 'Lisa'}])      // -> "Bart & Lisa"
list([{name:'Bart'}, {name: 'Lisa'}, {name: 'Maggie'}])  // -> "Bart, Lisa & Maggie"
list([])                                   // -> ""`},starterCode:`function list(names) {
    // TODO: write your solution here
    return "";
}
`,tests:[{name:`Одно имя`,args:[[{name:`Bart`}]],expected:`Bart`},{name:`Два имени`,args:[[{name:`Bart`},{name:`Lisa`}]],expected:`Bart & Lisa`},{name:`Три имени`,args:[[{name:`Bart`},{name:`Lisa`},{name:`Maggie`}]],expected:`Bart, Lisa & Maggie`},{name:`Пустой массив`,args:[[]],expected:``,hidden:!0},{name:`Четыре имени`,args:[[{name:`A`},{name:`B`},{name:`C`},{name:`D`}]],expected:`A, B, C & D`,hidden:!0}]},{title:`Форматирование числа с разделителями тысяч (Format Number With Thousands Separator)`,difficulty:1,categories:[`Strings`],languages:[`JavaScript`],functionName:`formatWithApostrophe`,description:{condition:"С сервера приходит цена товара как целое число (например, `12345678`). Нужно написать функцию, которая преобразует это число в строку, где группы из трёх цифр (считая от конца числа) разделены апострофом `'`.",input:["`price` — целое число в диапазоне от 1 до 2^31 - 1."],output:`Строка — то же число, но с апострофами между группами по три цифры, считая справа.`,constraints:["`1 <= price <= 2147483647`"],example:`Вход: 12345678
Выход: "12'345'678"

Вход: 999
Выход: "999"

Вход: 1000
Выход: "1'000"`},starterCode:`// Доступно без импорта: встроенные методы JS

function formatWithApostrophe(price) {
  // TODO: напишите решение здесь
  return "";
}
`,tests:[{name:`12345678`,args:[12345678],expected:`12'345'678`},{name:`999 — без разделителей`,args:[999],expected:`999`},{name:`1000`,args:[1e3],expected:`1'000`},{name:`Ровно шесть цифр`,args:[123456],expected:`123'456`,hidden:!0},{name:`Одна цифра`,args:[7],expected:`7`,hidden:!0},{name:`Большое число`,args:[2147483647],expected:`2'147'483'647`,hidden:!0}]},{title:`Ограничение вызовов функции (Function Call Limit)`,difficulty:3,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`callLimit`,description:{condition:`Напишите функцию \`callLimit(fn, limit, onLimit)\` (или аналог для других языков), которая возвращает декоратор/обёртку:

Функция может быть вызвана максимум \`limit\` раз.

После превышения лимита вызывается \`onLimit\`.

У обёртки должен быть метод \`reset()\`, который сбрасывает счётчик вызовов.

Примеры использования:`,input:[],output:``,constraints:[],example:`function log(title, message) {
  console.log(title + ': ' + message);
}

var logLimited = callLimit(log, 3, () => console.log('Limit reached!'));
logLimited('title1', 'desc'); // Вывод: title1: desc
logLimited('title2', 'desc'); // Вывод: title2: desc
logLimited('title3', 'desc'); // Вывод: title3: desc
logLimited('title4', 'desc'); // Вывод: Limit reached!
logLimited.reset();
logLimited('title5', 'desc'); // Вывод: title5: desc`},starterCode:`function callLimit(fn, limit, onLimit) {
    // TODO: напишите решение здесь
}
`,tests:[{name:`Ровно limit вызовов проходят`,body:`const calls = [];
const limited = solution((t) => calls.push(t), 3, () => calls.push("limit"));
limited("a"); limited("b"); limited("c"); limited("d");
return calls;`,expected:[`a`,`b`,`c`,`limit`]},{name:`reset обнуляет счётчик`,body:`const calls = [];
const limited = solution((t) => calls.push(t), 1, () => calls.push("limit"));
limited("a"); limited("b");
limited.reset();
limited("c");
return calls;`,expected:[`a`,`limit`,`c`]},{name:`Результат обёрнутой функции возвращается`,body:`const limited = solution((a, b) => a + b, 2, () => "limit");
return [limited(1, 2), limited(3, 4), limited(5, 6)];`,expected:[3,7,`limit`],hidden:!0},{name:`limit = 0 — ни одного вызова`,body:`let calls = 0;
const limited = solution(() => calls++, 0, () => "limit");
const result = limited();
return [calls, result];`,expected:[0,`limit`],hidden:!0}]},{title:`Декоратор логирования вызова функции (Function Call Logger Decorator)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`logCalls`,description:{condition:'Напишите декоратор (обёртку) `log_calls`, который оборачивает произвольную функцию и добавляет логирование вокруг её вызова. Перед вызовом обёрнутой функции декоратор должен вывести сообщение `"Before call"`, затем выполнить саму функцию с переданными аргументами, после чего вывести сообщение `"After call"`. Результат работы обёрнутой функции должен быть возвращён без изменений.',input:[`Функция, принимающая произвольное число аргументов, и сами аргументы для её вызова.`],output:`Результат выполнения обёрнутой функции (после того как выведены оба лог-сообщения).`,constraints:[`Обёрнутая функция может принимать 0 и более аргументов любого простого типа (числа, строки)`,`Обёрнутая функция всегда завершается успешно (без исключений)`,'Порядок вывода строго фиксирован: `"Before call"` → результат работы функции → `"After call"`'],example:"Вход: функция `add(a, b)`, вызов с аргументами `(2, 3)`\nВывод (логи): `Before call`, `After call`\nРезультат: `5`"},starterCode:`// Доступно без импорта: встроенные методы JS

function logCalls(fn) {
  // TODO: напишите решение здесь
  return fn;
}
`,tests:[{name:`Логи вокруг вызова, результат не меняется`,body:`const log = [];
const original = console.log;
console.log = (m) => log.push(m);
const wrapped = solution((a, b) => { log.push("call"); return a + b; });
const result = wrapped(2, 3);
console.log = original;
return [result, log];`,expected:[5,[`Before call`,`call`,`After call`]]},{name:`Аргументы передаются без изменений`,body:`const original = console.log;
console.log = () => {};
let got = null;
const wrapped = solution((...args) => { got = args; });
wrapped(1, "two", true);
console.log = original;
return got;`,expected:[1,`two`,!0]},{name:`Функция без аргументов`,body:`const original = console.log;
console.log = () => {};
const wrapped = solution(() => "ok");
const result = wrapped();
console.log = original;
return result;`,expected:`ok`,hidden:!0},{name:`Ровно два лог-сообщения на вызов`,body:`const log = [];
const original = console.log;
console.log = (m) => log.push(m);
const wrapped = solution(() => 1);
wrapped();
console.log = original;
return log;`,expected:[`Before call`,`After call`],hidden:!0}]},{title:`Реализация функции compose (Function Composition)`,difficulty:3,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`compose`,description:{condition:`Напишите функцию \`compose(...fns)\`, которая принимает любое количество функций и возвращает новую функцию. Возвращаемая функция применяет переданные функции справа налево: аргументы передаются в самую правую функцию, а результат каждой функции передаётся следующей слева.

Если функций не передано, возвращённая функция должна вернуть свой аргумент как есть.`,input:["`fns` — любое количество функций",`Аргументы вызова — любое количество значений`],output:"Функция, возвращающая результат последовательного применения `fns` справа налево",constraints:[`Самая правая функция может принимать несколько аргументов, остальные — один`,"Без функций `compose()(x)` возвращает `x`"],example:`const square = (x) => x * x;
const times2 = (x) => x * 2;
const sum = (a, b) => a + b;

compose(square, times2)(2)         // square(times2(2)) -> 16
compose(square, times2, sum)(3, 4) // square(times2(sum(3, 4))) -> 196
compose()(5)                       // -> 5`},starterCode:`function compose(...fns) {
    // TODO: напишите решение здесь
    return (x) => x;
}
`,tests:[{name:`Две функции`,body:`const square = (x) => x * x;
const times2 = (x) => x * 2;
return solution(square, times2)(2);`,expected:16},{name:`Правая функция принимает два аргумента`,body:`const square = (x) => x * x;
const times2 = (x) => x * 2;
const sum = (a, b) => a + b;
return solution(square, times2, sum)(3, 4);`,expected:196},{name:`Без функций возвращается аргумент`,body:`return solution()(5);`,expected:5},{name:`Одна функция`,body:`return solution((x) => x + 1)(1);`,expected:2,hidden:!0},{name:`Порядок именно справа налево`,body:`const order = [];
const a = (x) => { order.push("a"); return x; };
const b = (x) => { order.push("b"); return x; };
solution(a, b)(1);
return order;`,expected:[`b`,`a`],hidden:!0}]},{title:`Каррирование функций (Function Currying)`,difficulty:3,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`curry`,description:{condition:`Реализуйте функцию \`curry\`, которая принимает функцию \`func\` и возвращает её каррированную версию. Каррирование (currying) — это процесс преобразования функции с множеством аргументов в последовательность функций, каждая из которых принимает один аргумент.

Каррированная функция должна:

Работать с любым количеством аргументов

Возвращать новую функцию до тех пор, пока не будут переданы все аргументы

После получения всех аргументов вызвать исходную функцию с накопленными аргументами`,input:[],output:``,constraints:[`Исходная функция может принимать любое количество аргументов`,"Каррированная функция должна сохранять контекст вызова (`this`)",`Должна поддерживать все способы передачи аргументов (по одному, группами, все сразу)`],example:`function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6`},starterCode:`function curry(func) {
    // TODO: write your solution here
}
`,tests:[{name:`По одному аргументу`,body:`const add = (a, b, c) => a + b + c;
return solution(add)(1)(2)(3);`,expected:6},{name:`Два, затем один`,body:`const add = (a, b, c) => a + b + c;
return solution(add)(1, 2)(3);`,expected:6},{name:`Один, затем два`,body:`const add = (a, b, c) => a + b + c;
return solution(add)(1)(2, 3);`,expected:6},{name:`Все аргументы сразу`,body:`const add = (a, b, c) => a + b + c;
return solution(add)(1, 2, 3);`,expected:6,hidden:!0},{name:`Частичное применение переиспользуется`,body:`const add = (a, b, c) => a + b + c;
const add1 = solution(add)(1);
return [add1(2, 3), add1(10, 20)];`,expected:[6,31],hidden:!0}]},{title:`Throttle — ограничение частоты вызова функции (Function Throttle)`,difficulty:3,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`throttle`,description:{condition:`Реализуйте функцию \`throttle(func, delay)\`, которая возвращает новую функцию-обёртку. Эта обёртка ограничивает частоту выполнения \`func\`.

Поведение:

Первый вызов выполняется сразу (leading edge)

Пока не прошёл интервал \`delay\` — новые вызовы не выполняются сразу

Запоминается только последний вызов, произошедший в интервале ожидания

После окончания интервала выполняется ровно один отложенный вызов — с последними аргументами (trailing edge)

Далее цикл повторяется

Пример поведения:`,input:[],output:``,constraints:["Функция должна корректно передавать аргументы и контекст (`this`)","Возвращаемое значение `func` должно быть доступно (для синхронных вызовов)",`Должна быть возможность отмены отложенного вызова (опционально)`],example:`delay = 1000 ms

t=0      call("A")  → выполняется сразу
t=200    call("B")  → откладывается
t=400    call("C")  → заменяет B
t=1000               → выполняется C
t=1200   call("D")  → новый интервал → выполняется сразу`},starterCode:`function throttle(func, delay) {
    // TODO: напишите решение здесь
}
`,tests:[{name:`Первый вызов сразу, последний — в конце интервала`,body:`const calls = [];
const t = solution((v) => calls.push(v), 40);
t("A");
await new Promise((r) => setTimeout(r, 10));
t("B");
await new Promise((r) => setTimeout(r, 5));
t("C");
await new Promise((r) => setTimeout(r, 80));
return calls;`,expected:[`A`,`C`]},{name:`Одиночный вызов выполняется сразу`,body:`const calls = [];
const t = solution((v) => calls.push(v), 40);
t("only");
return calls;`,expected:[`only`]},{name:`После паузы новый вызов снова мгновенный`,body:`const calls = [];
const t = solution((v) => calls.push(v), 20);
t("A");
await new Promise((r) => setTimeout(r, 60));
t("B");
return calls;`,expected:[`A`,`B`],hidden:!0},{name:`Аргументы отложенного вызова — от последнего`,body:`const calls = [];
const t = solution((...args) => calls.push(args), 30);
t(1);
t(2);
t(3);
await new Promise((r) => setTimeout(r, 70));
return calls;`,expected:[[1],[3]],hidden:!0}]},{title:`Нечёткий поиск подпоследовательности (Fuzzy Search)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`fuzzysearch`,description:{condition:"Даны две строки: `needle` и `haystack`. Нужно определить, можно ли получить `needle`, удалив из `haystack` некоторые символы (ноль или более), не меняя порядок оставшихся символов. Другими словами, все символы `needle` должны встречаться в `haystack` в том же порядке, но необязательно подряд.\n\nФункция должна быть реализована за один проход по символам обеих строк, без использования регулярных выражений.",input:["`needle` — строка, которую нужно найти","`haystack` — строка, в которой производится поиск"],output:"`true`/`True`, если `needle` является подпоследовательностью `haystack`, иначе `false`/`False`",constraints:["`0 <= длина needle <= 10^4`","`0 <= длина haystack <= 10^5`",`Строки состоят из печатных ASCII-символов`],example:'Вход: `needle = "car"`, `haystack = "cartwheel"`\nВыход: `true`\n\nВход: `needle = "cwhl"`, `haystack = "cartwheel"`\nВыход: `true`\n\nВход: `needle = "cartwheeel"`, `haystack = "cartwheel"`\nВыход: `false`\n\nВход: `needle = "lw"`, `haystack = "cartwheel"`\nВыход: `false`'},starterCode:`// Доступно без импорта: встроенные методы JS

function fuzzysearch(needle, haystack) {
  // TODO: напишите решение здесь
  return false;
}
`,tests:[{name:`"car" в "cartwheel"`,args:[`car`,`cartwheel`],expected:!0},{name:`Символы не подряд`,args:[`cwhl`,`cartwheel`],expected:!0},{name:`Лишняя буква`,args:[`cartwheeel`,`cartwheel`],expected:!1},{name:`Неверный порядок`,args:[`lw`,`cartwheel`],expected:!1,hidden:!0},{name:`Пустой needle`,args:[``,`abc`],expected:!0,hidden:!0},{name:`Пустой haystack`,args:[`a`,``],expected:!1,hidden:!0}]},{title:`Разница массивов по произвольному ключу (Generic Array Diff by Key)`,difficulty:2,categories:[`Arrays`,`Functions`],languages:[`JavaScript`],functionName:`diffGeneric`,description:{condition:"Реализуйте функцию `diffGeneric(prev, next, keyFn)`, которая сравнивает два массива элементов и определяет, какие элементы были удалены, а какие — добавлены, между состоянием `prev` и состоянием `next`.\n\nПринадлежность элемента к массиву определяется не самим значением, а ключом, который возвращает функция `keyFn(item)` для этого элемента. Элемент считается:\n\nудалённым (removed), если его ключ присутствует в `prev`, но отсутствует в `next`;\n\nдобавленным (added), если его ключ присутствует в `next`, но отсутствует в `prev`.\n\nЭлементы, чей ключ есть в обоих массивах, в результат не попадают (даже если сам объект изменился — сравнение идёт только по ключу).\n\nПорядок элементов в `added` и `removed` соответствует их порядку появления в соответствующем исходном массиве (`next` — для added, `prev` — для removed).",input:["`prev` — массив элементов произвольного типа (числа, строки или объекты)","`next` — массив элементов произвольного типа","`keyFn` — функция, принимающая элемент и возвращающая ключ (строку или число)"],output:"Объект вида `{ added: [...], removed: [...] }`, где:\n`added` — элементы из `next`, ключа которых нет в `prev`\n`removed` — элементы из `prev`, ключа которых нет в `next`",constraints:["`0 <= prev.length, next.length <= 10^4`","`keyFn` всегда возвращает строку или число, приводимое к строке","ключи внутри одного массива уникальны (дубликатов ключей в `prev` или в `next` не бывает)"],example:"Вход: `prev = [1, 2, 3, 4, 6]`, `next = [2, 3, 4]`, `keyFn = x => x`\nВыход: `{ added: [], removed: [1, 6] }`"},starterCode:`// Доступно без импорта: встроенные методы JS

function diffGeneric(prev, next, keyFn) {
  // TODO: напишите решение здесь
  return { added: [], removed: [] };
}
`,tests:[{name:`Числа, ключ — само значение`,body:`return solution([1, 2, 3, 4, 6], [2, 3, 4], (x) => x);`,expected:{added:[],removed:[1,6]}},{name:`Объекты сравниваются по id`,body:`return solution(
  [{ id: 1 }, { id: 2 }],
  [{ id: 2 }, { id: 3 }],
  (x) => x.id
);`,expected:{added:[{id:3}],removed:[{id:1}]}},{name:`Пустые массивы`,body:`return solution([], [], (x) => x);`,expected:{added:[],removed:[]}},{name:`Совпадающий ключ при разном содержимом не попадает в результат`,body:`return solution(
  [{ id: 1, name: "old" }],
  [{ id: 1, name: "new" }],
  (x) => x.id
);`,expected:{added:[],removed:[]},hidden:!0},{name:`Всё добавлено`,body:`return solution([], [{ k: "a" }], (x) => x.k);`,expected:{added:[{k:`a`}],removed:[]},hidden:!0}]},{title:`Получение значения по пути в объекте (Get Value By Path)`,difficulty:2,categories:[`Objects`],languages:[`JavaScript`],functionName:`get`,description:{condition:"Напишите функцию `get(obj, path)`, которая принимает объект `obj` и строку `path`, представляющую путь к вложенному значению в этом объекте. Путь состоит из ключей, разделённых точкой (`.`).\n\nЕсли путь существует — функция должна вернуть значение, найденное по этому пути.\n\nЕсли путь не существует (на любом уровне вложенности отсутствует нужный ключ, либо промежуточное значение не является объектом) — функция должна вернуть `undefined`.",input:["`obj` — произвольный объект с вложенной структурой (ключи — строки, значения — любые типы, включая вложенные объекты)",'`path` — строка вида `"a.b.c"`, представляющая путь к значению'],output:"Значение по указанному пути, либо `undefined`, если путь не найден.",constraints:[`Глубина вложенности от 1 до 10`,"Ключи пути состоят из букв, цифр и `_`","`obj` может быть пустым объектом"],example:`Вход: obj = {a: {b: {c: "d"}}}, path = "a.b.c"   → Выход: "d"
Вход: obj = {a: {b: {c: "d"}}}, path = "a.b"     → Выход: {c: "d"}
Вход: obj = {x: {y: {z: 42}}}, path = "x.c"      → Выход: undefined`},starterCode:`// Доступно без импорта: встроенные методы JS

function get(obj, path) {
  // TODO: напишите решение здесь
  return undefined;
}
`,tests:[{name:`Полный путь`,args:[{a:{b:{c:`d`}}},`a.b.c`],expected:`d`},{name:`Промежуточный узел`,args:[{a:{b:{c:`d`}}},`a.b`],expected:{c:`d`}},{name:`Пути нет`,args:[{x:{y:{z:42}}},`x.c`]},{name:`Путь упирается в примитив`,args:[{a:1},`a.b.c`],hidden:!0},{name:`Один ключ`,args:[{only:5},`only`],expected:5,hidden:!0},{name:`Пустой объект`,args:[{},`a`],hidden:!0}]},{title:`Фильтрация графа по локации событий (Graph Filtering by Event Location)`,difficulty:3,categories:[`Graphs`],languages:[`JavaScript`],functionName:`filterGraphByLocation`,description:{condition:`Дан граф в виде списка вершин (персон) и списка рёбер (связей между персонами), а также список событий, где каждое событие содержит идентификатор персоны и её локацию. Необходимо реализовать функцию, которая возвращает отфильтрованный граф — оставляя только те вершины, которые фигурировали хотя бы в одном событии с заданной локацией, а также только те рёбра, у которых оба конца остались среди отфильтрованных вершин.`,input:["`vertices` — массив идентификаторов персон (строки/числа)","`edges` — массив пар `[from, to]`, задающих связи между персонами","`events` — массив объектов `{ personId, location }`","`targetLocation` — строка, целевая локация"],output:"Объект `{ vertices: [...], edges: [...] }` — отфильтрованный граф.",constraints:[`0 ≤ количество вершин ≤ 1000`,`0 ≤ количество событий ≤ 5000`,`Ускорение фильтрации (учитывая вопрос 04) через построение хеш-множества персон по нужной локации за O(n), вместо перебора событий для каждой вершины — O(V+E+N) вместо O(V×N)`],example:`Вход: vertices=["A","B","C"], edges=[["A","B"],["B","C"]], events=[{personId:"A",location:"Moscow"},{personId:"B",location:"SPB"},{personId:"C",location:"Moscow"}], targetLocation="Moscow"
Выход: {vertices:["A","C"], edges:[]}`},starterCode:`// Доступно без импорта: встроенные методы JS
function filterGraphByLocation(vertices, edges, events, targetLocation) {
  // TODO: напишите решение здесь
  return { vertices: [], edges: [] };
}
`,tests:[{name:`Ребро отбрасывается, если один конец отфильтрован`,args:[[`A`,`B`,`C`],[[`A`,`B`],[`B`,`C`]],[{personId:`A`,location:`Moscow`},{personId:`B`,location:`SPB`},{personId:`C`,location:`Moscow`}],`Moscow`],expected:{vertices:[`A`,`C`],edges:[]}},{name:`Ребро остаётся, если оба конца прошли фильтр`,args:[[`A`,`B`],[[`A`,`B`]],[{personId:`A`,location:`Moscow`},{personId:`B`,location:`Moscow`}],`Moscow`],expected:{vertices:[`A`,`B`],edges:[[`A`,`B`]]}},{name:`Никто не был в целевой локации`,args:[[`A`],[],[{personId:`A`,location:`SPB`}],`Moscow`],expected:{vertices:[],edges:[]}},{name:`Персона побывала в нескольких локациях`,args:[[`A`,`B`],[[`A`,`B`]],[{personId:`A`,location:`SPB`},{personId:`A`,location:`Moscow`},{personId:`B`,location:`Moscow`}],`Moscow`],expected:{vertices:[`A`,`B`],edges:[[`A`,`B`]]},hidden:!0},{name:`Событий нет`,args:[[`A`,`B`],[[`A`,`B`]],[],`Moscow`],expected:{vertices:[],edges:[]},hidden:!0}]},{title:`Группировка массива по ключу (Group By Key)`,difficulty:3,categories:[`Grouping`],languages:[`JavaScript`],functionName:`groupBy`,description:{condition:"Реализуйте функцию `groupBy(array, keyFn)`, которая группирует элементы массива по ключам, возвращаемым функцией `keyFn`.\n\nДля каждого элемента массива вычисляется ключ — результат вызова `keyFn(element)`. Все элементы с одинаковым ключом объединяются в массив под этим ключом в результирующем объекте. Порядок элементов внутри каждой группы соответствует порядку их появления в исходном массиве.",input:["`array` — массив элементов произвольного типа (длина от 0 до 10⁴)","`keyFn` — функция, принимающая элемент и возвращающая строковый ключ"],output:"Объект (словарь), где каждый ключ — результат `keyFn`, а значение — массив элементов с этим ключом.",constraints:["`0 <= array.length <= 10000`","`keyFn` всегда возвращает строку или число, приводимое к строке","Не использовать встроенный `Object.groupBy`"],example:'Вход: `[{id: 1, name: "a"}, {id: 2, name: "b"}, {id: 1, name: "c"}]`, `item => item.id`\nВыход: `{"1": [{id:1,name:"a"},{id:1,name:"c"}], "2": [{id:2,name:"b"}]}`\n\nВход: `[1, 2, 3, 4, 5, 6]`, `n => n % 2 === 0 ? "even" : "odd"`\nВыход: `{"odd": [1,3,5], "even": [2,4,6]}`\n\nВход: `[]`, `item => item`\nВыход: `{}`'},starterCode:`// Доступно без импорта: встроенные методы JS

/**
 * @param {Array} array
 * @param {Function} keyFn
 * @returns {Object}
 */
function groupBy(array, keyFn) {
  // TODO: напишите решение здесь
  return {};
}
`,tests:[{name:`Группировка объектов по id`,body:`return solution(
  [{ id: 1, name: "a" }, { id: 2, name: "b" }, { id: 1, name: "c" }],
  (item) => item.id
);`,expected:{1:[{id:1,name:`a`},{id:1,name:`c`}],2:[{id:2,name:`b`}]}},{name:`Чётные и нечётные`,body:`return solution([1, 2, 3, 4, 5, 6], (n) => (n % 2 === 0 ? "even" : "odd"));`,expected:{odd:[1,3,5],even:[2,4,6]}},{name:`Пустой массив`,body:`return solution([], (x) => x);`,expected:{}},{name:`Все элементы в одной группе`,body:`return solution(["a", "b"], () => "all");`,expected:{all:[`a`,`b`]},hidden:!0},{name:`Порядок внутри группы сохраняется`,body:`return solution([3, 1, 3, 2, 3], (n) => String(n));`,expected:{1:[1],2:[2],3:[3,3,3]},hidden:!0}]},{title:`Реализация функции reduce (Implement Array Reduce)`,difficulty:2,categories:[`Arrays`,`Functions`],languages:[`JavaScript`],functionName:`myReduce`,description:{condition:"Реализуйте функцию `myReduce`, которая принимает массив, функцию-редьюсер (callback) и начальное значение аккумулятора, и последовательно применяет callback к каждому элементу массива, накапливая результат. Функция должна работать аналогично встроенному методу `Array.prototype.reduce`, но не использовать его. Callback вызывается с аргументами `(accumulator, currentElement, index)` и возвращает новое значение аккумулятора.",input:["`array` — массив чисел","`callback` — функция вида `(acc, element, index) => newAcc`","`initial` — начальное значение аккумулятора"],output:`Итоговое значение аккумулятора после обработки всех элементов массива.`,constraints:["`0 <= array.length <= 10^4`","Нельзя использовать встроенный `Array.prototype.reduce`","`callback` всегда является валидной функцией","`initial` всегда передаётся явно"],example:`Вход: array = [1, 2, 3, 4], callback = (acc, x) => acc + x, initial = 0
Выход: 10

Вход: array = [1, 2, 3], callback = (acc, x) => acc * x, initial = 1
Выход: 6

Вход: array = [], callback = (acc, x) => acc + x, initial = 5
Выход: 5`},starterCode:`// Доступно без импорта: встроенные методы JS
function myReduce(array, callback, initial) {
  // TODO: напишите решение здесь
  return initial;
}
`,tests:[{name:`Сумма`,body:`return solution([1, 2, 3, 4], (acc, x) => acc + x, 0);`,expected:10},{name:`Произведение`,body:`return solution([1, 2, 3], (acc, x) => acc * x, 1);`,expected:6},{name:`Пустой массив — начальное значение`,body:`return solution([], (acc, x) => acc + x, 5);`,expected:5},{name:`Начальное значение учитывается`,body:`return solution([1, 2], (acc, x) => acc + x, 100);`,expected:103,hidden:!0},{name:`В callback приходит индекс`,body:`return solution([10, 20, 30], (acc, x, i) => acc.concat(i), []);`,expected:[0,1,2],hidden:!0}]},{title:`Реализация функции map (Implement Map Function)`,difficulty:2,categories:[`Functions`],languages:[`JavaScript`],functionName:`myMap`,description:{condition:"Реализуйте функцию `myMap`, которая принимает массив элементов и функцию-преобразователь, и возвращает новый массив, где каждый элемент исходного массива заменён результатом вызова этой функции. Функция должна работать аналогично встроенному `Array.prototype.map`, но не использовать его.",input:["`array` — массив произвольных значений","`callback` — функция, принимающая один аргумент и возвращающая преобразованное значение"],output:"Новый массив той же длины, где каждый элемент — результат `callback(element)`.",constraints:["`0 <= array.length <= 10^4`","Нельзя использовать `Array.prototype.map`",`Исходный массив не должен изменяться`],example:`Вход: array = [1, 2, 3], callback = x => x * 2
Выход: [2, 4, 6]

Вход: array = [1, 2, 3], callback = x => x + 5
Выход: [6, 7, 8]

Вход: array = [], callback = x => x
Выход: []`},starterCode:`// Доступно без импорта: встроенные методы JS
function myMap(array, callback) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Удвоение`,body:`return solution([1, 2, 3], (x) => x * 2);`,expected:[2,4,6]},{name:`Прибавление`,body:`return solution([1, 2, 3], (x) => x + 5);`,expected:[6,7,8]},{name:`Пустой массив`,body:`return solution([], (x) => x);`,expected:[]},{name:`Исходный массив не изменяется`,body:`const source = [1, 2, 3];
solution(source, (x) => x * 10);
return source;`,expected:[1,2,3],hidden:!0},{name:`Длина результата совпадает с исходной`,body:`return solution(["a", "b"], (x) => x.toUpperCase());`,expected:[`A`,`B`],hidden:!0}]},{title:`Промо-фильмы в коллекции (Insert Promo Films)`,difficulty:3,categories:[`Arrays`],languages:[`JavaScript`],functionName:`addPromoFilms`,description:{condition:`Дан список фильмов \`collection\`.

Также дан словарь \`promo_positions\`, где:

ключ — название промо-фильма

значение — позиция, на которой фильм должен находиться

Необходимо вставить промо-фильмы в исходную коллекцию.

Правила:

если позиция находится внутри диапазона массива — фильм вставляется в указанную позицию

если позиция больше длины результирующего массива — фильм добавляется в конец

при вставке элементы сдвигаются вправо

порядок промо-фильмов с одинаковыми позициями должен сохраняться

Функция должна вернуть новую коллекцию.`,input:["`collection: string[]`","`promo_positions: { [movie:string]: number }`"],output:"`string[]`\nИтоговый массив фильмов.",constraints:[`0 <= collection.length <= 10^5`,`0 <= promo_positions.length <= 10^5`,`0 <= position <= 10^9`,`длина названия фильма <= 100`],example:`Вход:

collection = [
'Harry Potter',
'Matrix 2',
'Nemo',
'Godfather',
'Avengers'
]

promo_positions = {
'Iron man':0,
'Batman':3,
'Blade Runner':10,
'Jaws':7
}

Выход:

[
'Iron man',
'Harry Potter',
'Matrix 2',
'Batman',
'Nemo',
'Godfather',
'Avengers',
'Jaws',
'Blade Runner'
]`},starterCode:`function addPromoFilms(collection, promoPositions) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Пример из условия`,args:[[`Harry Potter`,`Matrix 2`,`Nemo`,`Godfather`,`Avengers`],{"Iron man":0,Batman:3,"Blade Runner":10,Jaws:7}],expected:[`Iron man`,`Harry Potter`,`Matrix 2`,`Batman`,`Nemo`,`Godfather`,`Avengers`,`Jaws`,`Blade Runner`]},{name:`Промо-фильмов нет`,args:[[`A`,`B`],{}],expected:[`A`,`B`]},{name:`Вставка в начало`,args:[[`A`],{Promo:0}],expected:[`Promo`,`A`]},{name:`Позиция больше длины — в конец`,args:[[`A`,`B`],{Promo:99}],expected:[`A`,`B`,`Promo`],hidden:!0},{name:`Пустая коллекция`,args:[[],{Only:0}],expected:[`Only`],hidden:!0}]},{title:`Пересечение массивов по ключу (Intersect Arrays by Key)`,difficulty:3,categories:[`Arrays`],languages:[`JavaScript`],functionName:`intersectByCode`,description:{condition:"Даны два массива объектов. Каждый объект содержит числовое поле `code`. Верните новый массив, содержащий все объекты из массива `a`, для которых в массиве `b` найдётся объект с таким же значением поля `code`. Порядок элементов в результате определяется порядком элементов в массиве `b`: объекты из `a` должны располагаться в том порядке, в каком встречается соответствующий `code` в `b`. Если в `b` встречается несколько одинаковых `code`, учитывается только первое вхождение.",input:["`a` — массив объектов вида `{ code: number, ...rest }`, длина от 0 до 10⁵","`b` — массив объектов вида `{ code: number, ...rest }`, длина от 0 до 10⁵"],output:"Массив объектов из `a`, отфильтрованных и упорядоченных по первому вхождению соответствующего `code` в `b`.",constraints:["`0 <= a.length, b.length <= 100 000`","Поле `code` — целое неотрицательное число","В массиве `b` могут быть дубликаты `code` — учитывается только первое вхождение"],example:`Вход: a = [{code:0},{code:3},{code:4}], b = [{code:0},{code:3},{code:4}]
Выход: [{code:0},{code:3},{code:4}]

Вход: a = [{code:0},{code:1},{code:3},{code:4}], b = [{code:3},{code:0},{code:4}]
Выход: [{code:3},{code:0},{code:4}]

Вход: a = [{code:1},{code:2}], b = [{code:3},{code:4}]
Выход: []`},starterCode:`// Доступно без импорта: встроенные методы JS

function intersectByCode(a, b) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Порядок совпадает`,args:[[{code:0},{code:3},{code:4}],[{code:0},{code:3},{code:4}]],expected:[{code:0},{code:3},{code:4}]},{name:`Порядок задаётся массивом b`,args:[[{code:0},{code:1},{code:3},{code:4}],[{code:3},{code:0},{code:4}]],expected:[{code:3},{code:0},{code:4}]},{name:`Пересечения нет`,args:[[{code:1},{code:2}],[{code:3},{code:4}]],expected:[]},{name:`Повтор code в b учитывается один раз`,args:[[{code:1,tag:`x`}],[{code:1},{code:1}]],expected:[{code:1,tag:`x`}],hidden:!0},{name:`Пустые массивы`,args:[[],[]],expected:[],hidden:!0}]},{title:`Проверка массива на монотонность (Is Monotonic)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`isMonotonic`,description:{condition:"Реализуйте функцию `isMonotonic(numbers)`, которая принимает массив чисел и определяет, является ли он монотонным — то есть либо полностью не убывающим (каждый следующий элемент больше или равен предыдущему), либо полностью не возрастающим (каждый следующий элемент меньше или равен предыдущему).",input:["`numbers` — массив целых или вещественных чисел, длина от 0 до 10^5."],output:"`true`, если массив монотонный (не убывает ИЛИ не возрастает на всём протяжении), иначе `false`.",constraints:["`0 ≤ numbers.length ≤ 10^5`","`-10^9 ≤ numbers[i] ≤ 10^9`",`Массивы длиной 0 или 1 считаются монотонными по определению`],example:`Вход: [1, 2, 2, 3]
Выход: true (не убывает)

Вход: [6, 5, 4, 4]
Выход: true (не возрастает)

Вход: [1, 3, 2]
Выход: false`},starterCode:`// Доступно без импорта: встроенные методы JS

function isMonotonic(numbers) {
  // TODO: напишите решение здесь
  return true;
}
`,tests:[{name:`Не убывает`,args:[[1,2,2,3]],expected:!0},{name:`Не возрастает`,args:[[6,5,4,4]],expected:!0},{name:`Немонотонный`,args:[[1,3,2]],expected:!1},{name:`Пустой массив`,args:[[]],expected:!0,hidden:!0},{name:`Один элемент`,args:[[7]],expected:!0,hidden:!0},{name:`Все элементы равны`,args:[[2,2,2]],expected:!0,hidden:!0}]},{title:`Проверка панграммы (Is Pangram)`,difficulty:3,categories:[`Strings`],languages:[`JavaScript`],functionName:`isPangram`,description:{condition:"Панграмма — это предложение, в котором встречается каждая буква латинского алфавита хотя бы один раз. Напишите функцию, которая принимает строку и возвращает `true`, если строка является панграммой, и `false` в противном случае. Регистр букв игнорируется.",input:["`text` — строка длиной от 0 до 1000 символов, может содержать буквы, цифры, пробелы и знаки препинания"],output:"`true`, если строка содержит все 26 букв латинского алфавита, иначе `false`",constraints:["`0 <= text.length <= 1000`",`Регистр не учитывается`,`Небуквенные символы игнорируются`],example:'Вход: `"The quick brown fox jumps over the lazy dog"`\nВыход: `true`\n\nВход: `"Hello, World!"`\nВыход: `false`\n\nВход: `""`\nВыход: `false`'},starterCode:`// Доступно без импорта: встроенные методы JS

/**
 * @param {string} text
 * @returns {boolean}
 */
function isPangram(text) {
  // TODO: напишите решение здесь
  return false;
}
`,tests:[{name:`Классическая панграмма`,args:[`The quick brown fox jumps over the lazy dog`],expected:!0},{name:`Не панграмма`,args:[`Hello, World!`],expected:!1},{name:`Пустая строка`,args:[``],expected:!1},{name:`Длинная строка без всех букв`,args:[`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`],expected:!1,hidden:!0},{name:`Все буквы, но в разном регистре`,args:[`ABCDEFGhijklmnopQRSTUVwxyz`],expected:!0,hidden:!0},{name:`Не хватает одной буквы`,args:[`abcdefghijklmnopqrstuvwxy`],expected:!1,hidden:!0}]},{title:`Изоморфные строки (Isomorphic Strings)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`isIsomorphic`,description:{condition:"Даны две строки `s` и `t` одинаковой длины. Определите, являются ли они изоморфными.\n\nДве строки изоморфны, если существует взаимно-однозначное соответствие между символами первой строки и символами второй: каждый символ из `s` всегда заменяется на один и тот же символ из `t`, и при этом два разных символа из `s` не могут заменяться на один и тот же символ из `t`.",input:["Две строки `s` и `t`, состоящие из строчных латинских букв."],output:"`true`, если строки изоморфны, иначе `false`.",constraints:["`1 <= s.length == t.length <= 10^4`",`Строки содержат только строчные латинские буквы`],example:`Вход: s = "kotlin", t = "python"  →  Выход: true
Вход: s = "egg", t = "add"        →  Выход: true
Вход: s = "foobar", t = "bar"     →  Выход: false  (разные длины — сразу false)
Вход: s = "abcd", t = "aabo"      →  Выход: false  (два разных символа → один)
Вход: s = "paper", t = "title"    →  Выход: true`},starterCode:`function isIsomorphic(s, t) {
    // TODO: напишите решение здесь
    return false;
}
`,tests:[{name:`"kotlin" и "python"`,args:[`kotlin`,`python`],expected:!0},{name:`"egg" и "add"`,args:[`egg`,`add`],expected:!0},{name:`Разные длины`,args:[`foobar`,`bar`],expected:!1},{name:`Два символа в один`,args:[`abcd`,`aabo`],expected:!1,hidden:!0},{name:`"paper" и "title"`,args:[`paper`,`title`],expected:!0,hidden:!0},{name:`Пустые строки`,args:[``,``],expected:!0,hidden:!0}]},{title:`Склейка строк с адаптивным разделителем (Join Strings With Adaptive Delimiter)`,difficulty:2,categories:[`Strings`,`Arrays`,`Functions`],languages:[`JavaScript`],functionName:`strjoin`,description:{condition:`Реализуйте функцию, которая склеивает список строк в одну строку, выбирая разделитель в зависимости от количества элементов:

если элементов 3 или меньше — использовать разделитель \`.\` (точка)

если элементов больше 3 — использовать разделитель \`-\` (дефис)`,input:["`strings` — массив строк (0 ≤ длина ≤ 20)"],output:`Строка — элементы массива, склеенные выбранным разделителем.`,constraints:[`0 ≤ strings.length ≤ 20`,`каждая строка состоит из латинских букв, длина от 1 до 20 символов`],example:`Вход: ["a", "b", "c"]
Выход: "a.b.c"

Вход: ["a", "b", "c", "d", "e", "f"]
Выход: "a-b-c-d-e-f"

Вход: []
Выход: ""

Вход: ["a"]
Выход: "a"`},starterCode:`function strjoin(strings) {
  // TODO: напишите решение здесь
  return "";
}
`,tests:[{name:`Три элемента — точка`,args:[[`a`,`b`,`c`]],expected:`a.b.c`},{name:`Шесть элементов — дефис`,args:[[`a`,`b`,`c`,`d`,`e`,`f`]],expected:`a-b-c-d-e-f`},{name:`Пустой массив`,args:[[]],expected:``},{name:`Один элемент`,args:[[`a`]],expected:`a`,hidden:!0},{name:`Четыре элемента — уже дефис`,args:[[`a`,`b`,`c`,`d`]],expected:`a-b-c-d`,hidden:!0}]},{title:`K ближайших чисел (K Closest Numbers)`,difficulty:3,categories:[`Search`],languages:[`JavaScript`],functionName:`kClosestNumbers`,description:{condition:"Дан отсортированный по возрастанию массив `nums`, индекс `index` и число `k`.\n\nНужно вернуть `k` чисел из массива, которые ближе всего по значению к числу `nums[index]`. Сам элемент `nums[index]` в результат включать нельзя.\n\nЧтобы результат был однозначным: при равном расстоянии выбирается меньшее число, а итоговый массив возвращается отсортированным по возрастанию.",input:["`nums` — отсортированный по возрастанию массив чисел","`index` — индекс опорного элемента","`k` — сколько ближайших чисел вернуть"],output:"Массив из `k` чисел, отсортированный по возрастанию",constraints:["`0 <= index < nums.length`","`0 <= k < nums.length`",`Числа в массиве уникальны`],example:`Вход: nums = [1, 5, 7, 8, 9, 11, 15, 18], index = 4, k = 5
Выход: [5, 7, 8, 11, 15]`},starterCode:`function kClosestNumbers(nums, index, k) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Пример из условия`,args:[[1,5,7,8,9,11,15,18],4,5],expected:[5,7,8,11,15]},{name:`k = 1`,args:[[1,5,7,8,9,11,15,18],4,1],expected:[8]},{name:`k = 0`,args:[[1,2,3],1,0],expected:[]},{name:`Опорный элемент в начале`,args:[[1,2,3,10],0,2],expected:[2,3],hidden:!0},{name:`При равном расстоянии берётся меньшее число`,args:[[1,2,3],1,1],expected:[1],hidden:!0},{name:`Все элементы, кроме опорного`,args:[[4,8,12],1,2],expected:[4,12],hidden:!0}]},{title:`Поиск элемента с конца списка (K-th Element From End)`,difficulty:2,categories:[`Linked lists`],languages:[`JavaScript`],functionName:`itemFromEnd`,description:{condition:"Дан односвязный список и число `k`.\n\nНужно вернуть значение элемента, который находится на позиции `k` с конца списка.\n\nЕсли такого элемента нет, вернуть `null` / `None` / `nil`.",input:[`k — целое число
head — голова односвязного списка`],output:`Значение k-го элемента с конца списка или null / None / nil.`,constraints:[`0 ≤ k ≤ 100000`,`0 ≤ длина списка ≤ 100000`,`-10^9 ≤ value ≤ 10^9`],example:`k = 0 — последний элемент
k = 1 — предпоследний элемент
k = 2 — третий с конца

Вход:
head = [65, 19, 17, 50, 55, 21, 4]
k = 3

Выход:
50`},starterCode:`// Узел списка: { value: number, next: Item | null }
function itemFromEnd(k, head) {
    // TODO: напишите решение здесь
    return null;
}
`,tests:[{name:`Третий элемент с конца`,body:`const build = (values) => values.reduceRight((next, value) => ({ value, next }), null);
return solution(3, build([65, 19, 17, 50, 55, 21, 4]));`,expected:50},{name:`k = 0 — последний элемент`,body:`const build = (values) => values.reduceRight((next, value) => ({ value, next }), null);
return solution(0, build([1, 2, 3]));`,expected:3},{name:`k выходит за границы списка`,body:`const build = (values) => values.reduceRight((next, value) => ({ value, next }), null);
return solution(5, build([1, 2]));`,expected:null},{name:`Пустой список`,body:`return solution(0, null);`,expected:null,hidden:!0},{name:`Первый элемент списка`,body:`const build = (values) => values.reduceRight((next, value) => ({ value, next }), null);
return solution(2, build([7, 8, 9]));`,expected:7,hidden:!0}]},{title:`Кратчайший путь коня (Knight Shortest Path)`,difficulty:3,categories:[`Queue`],languages:[`JavaScript`],functionName:`knightShortestPath`,description:{condition:'Дана шахматная доска размера `N × N` в виде массива строк: `"."` — свободная клетка, `"#"` — заблокированная.\n\nВ клетке `(x1, y1)` стоит конь. Нужно найти самый короткий маршрут до клетки `(x2, y2)`. Конь ходит стандартным шахматным ходом: `(±2, ±1)` и `(±1, ±2)`. На заблокированные клетки ходить нельзя.\n\nЕсли путь существует — вернуть массив координат маршрута от старта до финиша включительно. Если пути нет — вернуть `null`. Кратчайших маршрутов может быть несколько, подойдёт любой.',input:["`board` — массив из `N` строк длины `N`","`x1`, `y1` — координаты старта (отсчёт с нуля, `x` — строка, `y` — столбец)","`x2`, `y2` — координаты финиша"],output:"Массив координат `[[x1, y1], ..., [x2, y2]]` либо `null`",constraints:["`1 <= N <= 50`",`Старт и финиш — свободные клетки`],example:`Вход:
board = [
  "...",
  "...",
  "..."
]
x1 = 0, y1 = 0, x2 = 1, y2 = 2

Выход: [[0, 0], [1, 2]]`},starterCode:`function knightShortestPath(board, x1, y1, x2, y2) {
  // TODO: напишите решение здесь
  return null;
}
`,tests:[{name:`Один ход`,body:`return solution(["...", "...", "..."], 0, 0, 1, 2);`,expected:[[0,0],[1,2]]},{name:`Старт совпадает с финишем`,body:`return solution(["...", "...", "..."], 1, 1, 1, 1);`,expected:[[1,1]]},{name:`Пути нет — конь заперт`,body:`return solution(["..#", "###", "###"], 0, 0, 0, 1);`,expected:null},{name:`Маршрут корректен и кратчайший`,body:`const board = [".....", ".....", ".....", ".....", "....."];
const path = solution(board, 0, 0, 4, 4);
const moves = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
const legal = path.every(([x, y], i) => {
  if (i === 0) return true;
  const [px, py] = path[i - 1];
  return moves.some(([dx, dy]) => px + dx === x && py + dy === y);
});
return [path.length, legal, path[0], path[path.length - 1]];`,expected:[5,!0,[0,0],[4,4]],hidden:!0},{name:`Обход препятствий`,body:`const board = [".....", ".....", "##.##", ".....", "....."];
const path = solution(board, 0, 0, 4, 4);
return [Array.isArray(path), path[0], path[path.length - 1]];`,expected:[!0,[0,0],[4,4]],hidden:!0}]},{title:`Дополнение строки пробелами слева (Left Pad)`,difficulty:1,categories:[`Strings`],languages:[`JavaScript`],functionName:`leftPad`,description:{condition:`Напишите функцию \`leftPad\`, которая добавляет слева к строке пробелы. Функция принимает два аргумента: число, обозначающее минимальную длину результата, и строку, которую нужно дополнить, если её длина меньше.

Правила:

Если длина строки меньше указанной минимальной длины, добавляются пробелы слева

Если длина строки больше или равна указанной длине, строка возвращается без изменений

Функция должна возвращать новую строку, не изменяя исходную`,input:[],output:``,constraints:[`Минимальная длина: 0 ≤ N ≤ 1000`,`Длина строки: 0 ≤ length ≤ 1000`,`Символы: любые`,`Время выполнения: O(N)`,`Память: O(N)`],example:`leftPad(6, 'test')    // -> "  test" (2 пробела слева)
leftPad(10, 'hello')  // -> "     hello" (5 пробелов)
leftPad(3, 'test')    // -> "test" (длина уже больше)
leftPad(0, 'abc')     // -> "abc"`},starterCode:`function leftPad(symbolCount, str) {
    // TODO: write your solution here
    return "";
}
`,tests:[{name:`leftPad(6, 'test')`,args:[6,`test`],expected:`  test`},{name:`leftPad(10, 'hello')`,args:[10,`hello`],expected:`     hello`},{name:`Строка уже длиннее`,args:[3,`test`],expected:`test`},{name:`Нулевая длина`,args:[0,`abc`],expected:`abc`,hidden:!0},{name:`Длина совпадает`,args:[3,`abc`],expected:`abc`,hidden:!0},{name:`Пустая строка`,args:[2,``],expected:`  `,hidden:!0}]},{title:`Длина самой длинной подстроки без повторяющихся символов (Length of Longest Substring Without Repeating Characters)`,difficulty:3,categories:[`Strings`],languages:[`JavaScript`],functionName:`lengthOfLongestSubstring`,description:{condition:"Дана строка `s`. Найдите длину самой длинной подстроки, в которой все символы различны (не повторяются).",input:["`s` — строка, может содержать английские буквы, цифры, символы и пробелы."],output:`Целое число — длина самой длинной подстроки без повторяющихся символов.`,constraints:["`0 <= s.length <= 5 * 10^4`"],example:`Вход: "abcabcbb" → Выход: 3 ("abc")
Вход: "cccccccc" → Выход: 1 ("c")
Вход: "pwwkew"   → Выход: 3 ("wke")
Вход: ""         → Выход: 0`},starterCode:`// Доступно без импорта: встроенные методы JS
function lengthOfLongestSubstring(s) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`"abcabcbb"`,args:[`abcabcbb`],expected:3},{name:`"cccccccc"`,args:[`cccccccc`],expected:1},{name:`"pwwkew"`,args:[`pwwkew`],expected:3},{name:`Пустая строка`,args:[``],expected:0,hidden:!0},{name:`Все символы различны`,args:[`abcdef`],expected:6,hidden:!0},{name:`Повтор в самом конце`,args:[`abcda`],expected:4,hidden:!0}]},{title:`Ограниченный счётчик вызовов (Limited Call Counter)`,difficulty:2,categories:[`Functions`],languages:[`JavaScript`],functionName:`canGetCount`,description:{condition:'Необходимо реализовать функцию `canGetCount`, которая принимает число `n` и возвращает новую функцию.\n\nВозвращённая функция при каждом вызове должна:\n\nпервые `n` раз возвращать строку `"yes"`;\n\nначиная с вызова номер `n + 1` возвращать строку `"no"`.\n\nКаждый вызов функции должен уменьшать количество оставшихся успешных вызовов.',input:["На вход подаётся целое число `n`."],output:'Функция `canGetCount(n)` должна вернуть функцию, которая при вызове возвращает строку `"yes"` или `"no"`.',constraints:[`0 <= n <= 10^6`],example:`Вход:

const getOne = canGetCount(2);

Выход:

getOne() === "yes"
getOne() === "yes"
getOne() === "no"`},starterCode:`function canGetCount(n) {
  // TODO: напишите решение здесь
}
`,tests:[{name:`Два разрешённых вызова`,body:`const f = solution(2);
return [f(), f(), f()];`,expected:[`yes`,`yes`,`no`]},{name:`n = 0 — сразу no`,body:`const f = solution(0);
return f();`,expected:`no`},{name:`Счётчики независимы`,body:`const a = solution(1);
const b = solution(1);
a();
return [a(), b()];`,expected:[`no`,`yes`],hidden:!0},{name:`После исчерпания всегда no`,body:`const f = solution(1);
f(); f(); f();
return f();`,expected:`no`,hidden:!0}]},{title:`Самый длинный палиндром (Longest Palindrome)`,difficulty:3,categories:[`Strings`],languages:[`JavaScript`],functionName:`longestPalindrome`,description:{condition:"Напишите функцию `longestPalindrome`, которая принимает строку `s` и возвращает длину самой длинной подстроки, которая читается одинаково слева направо и справа налево (палиндром). Если строка пустая, функция должна вернуть 0.",input:[],output:``,constraints:[`Строка может содержать буквы, пробелы и знаки пунктуации`,`Регистр учитывается (палиндром чувствителен к регистру)`,`Длина строки не превышает 1000 символов`,`Если есть несколько палиндромов одинаковой длины, возвращается их длина`],example:`Вход: "baabcd"
Выход: 4
Пояснение: Самый длинный палиндром - "baab" (индексы 0-3)

Вход: "I like racecars that go fast"
Выход: 7
Пояснение: Самый длинный палиндром - "racecar"

Вход: "a"
Выход: 1
Пояснение: Одиночный символ всегда палиндром

Вход: ""
Выход: 0`},starterCode:`function longestPalindrome(s) {
    // TODO: write your solution here
    return 0;
}
`,tests:[{name:`"baabcd" → 4`,args:[`baabcd`],expected:4},{name:`Палиндром внутри предложения`,args:[`I like racecars that go fast`],expected:7},{name:`Один символ`,args:[`a`],expected:1},{name:`Пустая строка`,args:[``],expected:0,hidden:!0},{name:`Палиндромов длиннее 1 нет`,args:[`abcd`],expected:1,hidden:!0},{name:`Вся строка — палиндром`,args:[`abba`],expected:4,hidden:!0}]},{title:`Самый длинный промежуток тишины (Longest Silence Period)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`longestSilence`,description:{condition:`В функцию передается массив со значениями времени (в минутах от полуночи), в которые звенит будильник. Каждый будильник звенит ровно одну минуту. Необходимо найти самый длинный промежуток времени (в минутах), когда ни один будильник не будет звенеть.

Важные условия:

Время измеряется в минутах от полуночи (0:00 = 0, 23:59 = 1439)

Будильник звенит ровно 1 минуту (включительно)

Если будильник заведен на время X, то тишина отсутствует в интервале [X, X] (одна минута)

День начинается в 0 минут и заканчивается в 1439 минут (включительно)

Нужно учитывать тишину до первого будильника и после последнего

Пример 1:

Пример 2:

Пример 3:`,input:[],output:``,constraints:[`Длина массива: 0 ≤ length ≤ 1000`,`Значения времени: 0 ≤ time ≤ 1439`,`Массив может быть неотсортирован`,`В массиве могут быть дубликаты (несколько будильников на одно время)`],example:`Вход: [10, 100, 200]
Разбор:
- Тишина от 0 до 9: 10 минут
- Тишина от 11 до 99: 89 минут (самый длинный промежуток)
- Тишина от 101 до 199: 99 минут
- Тишина от 201 до 1439: 1239 минут

Результат: 1239

Вход: [5, 10, 15]
Результат: 1424 (тишина с 16 до 1439)

Вход: [0, 100, 1439]
Результат: 1339 (тишина с 101 до 1438)`},starterCode:`function longestSilence(alarms) {
    // TODO: напишите решение здесь
    return 0;
}
`,tests:[{name:`[10, 100, 200] — тишина до полуночи`,args:[[10,100,200]],expected:1239},{name:`[5, 10, 15]`,args:[[5,10,15]],expected:1424},{name:`Будильник в конце дня`,args:[[0,100,1439]],expected:1338},{name:`Один будильник посреди дня`,args:[[720]],expected:720,hidden:!0},{name:`Будильники не отсортированы`,args:[[200,10,100]],expected:1239,hidden:!0},{name:`Будильник в 0:00`,args:[[0]],expected:1439,hidden:!0}]},{title:`Максимальная длина подряд идущих единиц после удаления одного элемента (Max Consecutive Ones After Deleting One Element)`,difficulty:3,categories:[`Arrays`],languages:[`JavaScript`],functionName:`maxOnes`,description:{condition:`Дан непустой массив, состоящий только из нулей и единиц. Нужно определить максимальную длину подряд идущих единиц, которую можно получить, если удалить (пропустить) ровно один элемент массива. Удаление одного элемента обязательно, даже если массив состоит целиком из единиц.`,input:["`nums` — непустой массив целых чисел, каждый элемент равен 0 или 1"],output:`Целое число — максимальная длина подряд идущих единиц после обязательного удаления одного элемента`,constraints:["`1 <= nums.length <= 10^5`","`nums[i]` равен 0 или 1"],example:`Вход: nums = [1, 1, 0, 1]
Выход: 3

Вход: nums = [1, 1, 0, 0, 1]
Выход: 2`},starterCode:`// Доступно без импорта: встроенные методы JS
function maxOnes(nums) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`[1, 1, 0, 1]`,args:[[1,1,0,1]],expected:3},{name:`[1, 1, 0, 0, 1]`,args:[[1,1,0,0,1]],expected:2},{name:`Все единицы — удаление обязательно`,args:[[1,1,1]],expected:2},{name:`Все нули`,args:[[0,0]],expected:0,hidden:!0},{name:`Один элемент`,args:[[1]],expected:0,hidden:!0},{name:`Удаление склеивает две группы`,args:[[1,1,1,0,1,1]],expected:5,hidden:!0}]},{title:`Максимальная роль по приоритету (Max Priority Role)`,difficulty:2,categories:[`Dictionaries`],languages:[`JavaScript`],functionName:`findMaxPriorityRole`,description:{condition:"Дан словарь `priorities`, где ключ — название роли, а значение — числовой приоритет этой роли.\n\nТакже дан массив `roles`, содержащий список допустимых ролей.\n\nНеобходимо написать функцию, которая вернёт роль из массива `roles` с максимальным приоритетом по словарю `priorities`.\n\nЕсли массив `roles` пустой или ни одной роли из массива нет в словаре, нужно вернуть пустую строку.",input:["`priorities` — словарь, где ключи являются строками, а значения — числами.","`roles` — массив строк с допустимыми ролями."],output:'Строка — роль с максимальным приоритетом.\nЕсли подходящей роли нет — пустая строка `""`.',constraints:["`0 <= roles.length <= 10^5`","`0 <= количество ключей в priorities <= 10^5`","Значения приоритетов — целые числа от `-10^9` до `10^9`","Названия ролей состоят из латинских букв, цифр и `_`"],example:`Вход:

priorities = {
  guest: 1,
  user: 2,
  admin: 100,
  moderator: 10,
  vip: 50
}

roles = ['user', 'vip', 'guest']

Выход:

"vip"`},starterCode:`function findMaxPriorityRole(priorities, roles) {
  // TODO: напишите решение здесь
  return "";
}
`,tests:[{name:`Максимум среди допустимых ролей`,args:[{guest:1,user:2,admin:100,moderator:10,vip:50},[`user`,`vip`,`guest`]],expected:`vip`},{name:`Пустой список ролей`,args:[{admin:1},[]],expected:``},{name:`Ни одной роли нет в словаре`,args:[{admin:1},[`ghost`]],expected:``},{name:`Часть ролей отсутствует в словаре`,args:[{user:2,admin:100},[`ghost`,`user`]],expected:`user`,hidden:!0},{name:`Одна роль`,args:[{admin:100},[`admin`]],expected:`admin`,hidden:!0}]},{title:`Стек с максимумом (Max Stack)`,difficulty:3,categories:[`Stack`],languages:[`JavaScript`],functionName:`MyStack`,description:{condition:"Реализуйте стек целочисленных значений `MyStack` с методами:\n\n`push(value)` — добавить значение в стек.\n\n`pop()` — удалить верхний элемент стека и вернуть его.\n\n`max()` — вернуть максимальное значение в стеке.\n\nВсе методы должны работать за O(1). Если вызывается `pop()` или `max()` для пустого стека, нужно вернуть `null`.",input:["Последовательность вызовов `push` / `pop` / `max`"],output:"`push` ничего не возвращает; `pop` возвращает снятый элемент или `null`; `max` — максимум в стеке или `null`",constraints:[`Все операции — за O(1)`,`Значения — целые числа`],example:`const stack = new MyStack();
stack.push(1);
stack.push(3);
stack.push(7);
stack.push(1);

stack.max();  // -> 7
stack.pop();  // -> 1
stack.max();  // -> 7
stack.pop();  // -> 7
stack.max();  // -> 3`},starterCode:`class MyStack {
  constructor() {
    // TODO: напишите решение здесь
  }

  push(value) {
    // TODO: напишите решение здесь
  }

  pop() {
    // TODO: напишите решение здесь
    return null;
  }

  max() {
    // TODO: напишите решение здесь
    return null;
  }
}
`,tests:[{name:`Пример из условия`,body:`const s = new solution();
s.push(1); s.push(3); s.push(7); s.push(1);
return [s.max(), s.pop(), s.max(), s.pop(), s.max()];`,expected:[7,1,7,7,3]},{name:`Пустой стек`,body:`const s = new solution();
return [s.pop(), s.max()];`,expected:[null,null]},{name:`Максимум обновляется после pop`,body:`const s = new solution();
s.push(5); s.push(2);
s.pop();
return s.max();`,expected:5},{name:`Повторяющийся максимум`,body:`const s = new solution();
s.push(4); s.push(4);
s.pop();
return s.max();`,expected:4,hidden:!0},{name:`Стек опустошён до конца`,body:`const s = new solution();
s.push(1); s.push(2);
s.pop(); s.pop();
return [s.pop(), s.max()];`,expected:[null,null],hidden:!0},{name:`Отрицательные значения`,body:`const s = new solution();
s.push(-5); s.push(-1); s.push(-3);
return [s.max(), s.pop(), s.max()];`,expected:[-1,-3,-1],hidden:!0}]},{title:`Место в кинотеатре максимально далеко от других зрителей (Maximize Distance to Closest Person)`,difficulty:3,categories:[`Arrays`],languages:[`JavaScript`],functionName:`maxDistToClosestPerson`,description:{condition:"Места в кинотеатре расположены в один ряд и представлены массивом из нулей и единиц, где `1` — занятое место, `0` — свободное. Только что пришедший зритель выбирает свободное место так, чтобы расстояние до ближайшего уже сидящего зрителя было максимальным. Напишите функцию, которая возвращает это максимальное расстояние (в местах) от выбранного места до ближайшего занятого. Гарантируется, что в ряду есть хотя бы одно занятое место и хотя бы одно свободное.",input:["`seats` — массив из `0` и `1`, длина от 2 до 10^5, содержит хотя бы одну `1` и хотя бы один `0`."],output:`Целое число — максимальное расстояние от выбранного места до ближайшего занятого.`,constraints:["`2 <= seats.length <= 10^5`","`seats[i]` равен `0` или `1`",`гарантированно есть хотя бы одно занятое и хотя бы одно свободное место`],example:`Вход: [1, 0, 0, 0, 0, 1]
Выход: 2

Вход: [1, 0, 1, 0, 0, 1, 0, 0, 0, 1]
Выход: 2

Вход: [1, 0, 1, 0]
Выход: 1`},starterCode:`// Доступно без импорта: встроенные методы JS

function maxDistToClosestPerson(seats) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`[1, 0, 0, 0, 0, 1]`,args:[[1,0,0,0,0,1]],expected:2},{name:`[1, 0, 1, 0, 0, 1, 0, 0, 0, 1]`,args:[[1,0,1,0,0,1,0,0,0,1]],expected:2},{name:`Свободное место в конце`,args:[[1,0,1,0]],expected:1},{name:`Свободные места в начале ряда`,args:[[0,0,0,1]],expected:3,hidden:!0},{name:`Два места`,args:[[1,0]],expected:1,hidden:!0},{name:`Длинный промежуток в середине`,args:[[1,0,0,0,0,0,0,1]],expected:3,hidden:!0}]},{title:`Максимальное число из тех же цифр (Maximum Number from Digits)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`getMaxNumber`,description:{condition:`Напишите функцию \`getMaxNumber\`, которая принимает число (целое или с плавающей точкой) и возвращает максимально возможное число, составленное из тех же цифр, что и исходное число. Знак числа игнорируется (все цифры считаются положительными). Если передан некорректный аргумент (не число), функция возвращает \`NaN\`.

Правила:

Цифры числа сортируются в порядке убывания

Десятичная точка игнорируется (все цифры считаются частью одного числа)

Знак минус игнорируется (все цифры считаются положительными)

Результат возвращается как целое число (без ведущих нулей)`,input:[],output:``,constraints:[`Входное значение может быть числом или другим типом`,`Число может быть целым или дробным`,`Число может быть отрицательным`,`Если после сортировки первая цифра 0, это означает, что исходное число состояло только из нулей`],example:`Вход: 6118
Выход: 8611
Пояснение: Цифры: 6,1,1,8 → сортируем: 8,6,1,1 → 8611

Вход: 17.5
Выход: 751
Пояснение: Цифры: 1,7,5 → сортируем: 7,5,1 → 751

Вход: 100
Выход: 100
Пояснение: Цифры: 1,0,0 → сортируем: 1,0,0 → 100

Вход: Hello"
Выход: NaN`},starterCode:`function getMaxNumber(input) {
    // TODO: напишите решение здесь
    return 0;
}
`,tests:[{name:`6118`,args:[6118],expected:8611},{name:`Дробное число`,args:[17.5],expected:751},{name:`Нули в конце`,args:[100],expected:100},{name:`Не число → NaN`,args:[`Hello`],expected:NaN,hidden:!0},{name:`Отрицательное число`,args:[-321],expected:321,hidden:!0},{name:`Одна цифра`,args:[7],expected:7,hidden:!0}]},{title:`Максимальное число в массиве (Maximum Number)`,difficulty:1,categories:[`Arrays`],languages:[`JavaScript`],functionName:`findMax`,description:{condition:"Напишите функцию `findMax`, которая принимает массив чисел и возвращает максимальное число из массива.",input:[],output:``,constraints:[`Массив содержит только числа (целые или с плавающей точкой)`,`Массив всегда содержит хотя бы один элемент`,`Длина массива не превышает 1000 элементов`],example:`Вход: [1, 2, 5]
Выход: 5

Вход: [10, -5, 3, 8]
Выход: 10

Вход: [-1, -5, -3]
Выход: -1

Вход: [42]
Выход: 42`},starterCode:`function findMax(arr) {
    // TODO: write your solution here
    return 0;
}
`,tests:[{name:`[1, 2, 5]`,args:[[1,2,5]],expected:5},{name:`[10, -5, 3, 8]`,args:[[10,-5,3,8]],expected:10},{name:`Только отрицательные`,args:[[-1,-5,-3]],expected:-1},{name:`Один элемент`,args:[[42]],expected:42,hidden:!0},{name:`Максимум в конце`,args:[[1,2,3,99]],expected:99,hidden:!0}]},{title:`Максимальное количество единиц в строке матрицы (Maximum Ones in Matrix Row)`,difficulty:3,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`maxOnes`,description:{condition:`На вход подаётся 2D матрица из \`"0"\` и \`"1"\`.

Гарантии:

В каждой строке сначала идут \`0\`, затем после первой единицы идут только единицы.

Нужно найти строку с наибольшим количеством единиц и вернуть это количество.`,input:[],output:``,constraints:[],example:`grid = [
    ["0","0","0","1","1"],
    ["0","0","1","1","1"],
    ["0","0","0","0","1"],
    ["0","1","1","1","1"]
]
# -> 4

grid = [
    ["0","0","0","0","0"],
    ["0","0","0","0","0"],
    ["0","0","0","0","0"],
    ["0","0","0","0","0"]
]
# -> 0

Идея решения:

Идём сверху вниз и справа налево.

Находим самую левую единицу в первой строке.

В каждой следующей строке проверяем этот индекс:если там \`0\` → идём ниже,

если \`1\` → ищем новую самую левую единицу и продолжаем сравнивать.

Количество единиц в строке = \`длина_строки - индекс_самой_левой_единицы\`.`},starterCode:`function maxOnes(grid) {
    // TODO: напишите решение здесь
    return 0;
}
`,tests:[{name:`Максимум в последней строке`,args:[[[`0`,`0`,`0`,`1`,`1`],[`0`,`0`,`1`,`1`,`1`],[`0`,`0`,`0`,`0`,`1`],[`0`,`1`,`1`,`1`,`1`]]],expected:4},{name:`Единиц нет вовсе`,args:[[[`0`,`0`],[`0`,`0`]]],expected:0},{name:`Одна строка`,args:[[[`1`,`1`,`1`]]],expected:3},{name:`Вся строка из единиц`,args:[[[`0`,`1`],[`1`,`1`]]],expected:2,hidden:!0},{name:`Пустая матрица`,args:[[]],expected:0,hidden:!0}]},{title:`Максимальная сумма подмассива (Maximum Subarray Sum)`,difficulty:3,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`maxSubarraySum`,description:{condition:`Реализуйте функцию \`maxSubarraySum()\`, которая находит максимальную сумму непрерывного подмассива в массиве целых чисел.

Параметры функции:

\`arr\` (массив целых чисел) - исходный массив`,input:[],output:``,constraints:[`Подмассив должен быть непрерывным`,`Функция должна работать за O(n) времени`,`Если массив пустой, вернуть 0`,`Если все числа отрицательные, вернуть максимальный элемент`,`Длина массива ≤ 10^5`,`Значения элементов: -10^4 ≤ arr[i] ≤ 10^4`],example:`const input = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const output = 6; // Сумма подмассива [4, -1, 2, 1]`},starterCode:`function maxSubarraySum(arr) {
    // TODO: напишите решение здесь
    return 0;
}
`,tests:[{name:`Классический пример`,args:[[-2,1,-3,4,-1,2,1,-5,4]],expected:6},{name:`Все элементы положительные`,args:[[1,2,3]],expected:6},{name:`Все элементы отрицательные`,args:[[-3,-1,-7]],expected:-1},{name:`Один элемент`,args:[[5]],expected:5,hidden:!0},{name:`Пустой массив`,args:[[]],expected:0,hidden:!0},{name:`Максимум — весь массив`,args:[[2,-1,3]],expected:4,hidden:!0}]},{title:`Максимальная сумма в треугольнике (Maximum Triangle Sum)`,difficulty:3,categories:[`Dynamic programming`],languages:[`JavaScript`],functionName:`maxTriangleSum`,description:{condition:`Напишите функцию \`maxTriangleSum\`, которая принимает двумерный массив в виде треугольника (горки) и возвращает наибольшую возможную сумму чисел от вершины до основания. С числа сверху можно переходить только на нижнее число и его соседей (левый и правый).

Правила перемещения:

Начинаем с вершины треугольника (первый элемент)

С текущего числа можно перейти на число в следующем ряду под текущим индексом или под индексом \`+1\`

Необходимо найти путь с максимальной суммой всех чисел на пути`,input:[],output:``,constraints:[`Массив всегда имеет треугольную форму (1, 2, 3, ... элементов)`,`Глубина может быть любой`,`Числа могут быть отрицательными`,`Нельзя использовать встроенные функции для поиска пути`],example:`Вход: [
  [1],
  [4, 8],
  [1, 5, 3]
]
Выход: 14
Пояснение: Путь 1 → 8 → 5 = 14

Вход: [
  [1],
  [-3, -4],
  [2, 1, 9]
]
Выход: 7
Пояснение: Путь 1 → -3 → 9 = 7

Вход: [
  [5],
  [2, 3],
  [1, 1, 1]
]
Выход: 9
Пояснение: Путь 5 → 3 → 1 = 9

Вход: [
  [10]
]
Выход: 10
Пояснение: Только один элемент`},starterCode:`function maxTriangleSum(triangle) {
    // TODO: write your solution here
    return 0;
}
`,tests:[{name:`Путь 1 → 8 → 5`,args:[[[1],[4,8],[1,5,3]]],expected:14},{name:`Отрицательные числа по пути`,args:[[[1],[-3,-4],[2,1,9]]],expected:6},{name:`Путь 5 → 3 → 1`,args:[[[5],[2,3],[1,1,1]]],expected:9},{name:`Один элемент`,args:[[[10]]],expected:10,hidden:!0},{name:`Жадный выбор не оптимален`,args:[[[1],[9,2],[0,0,100]]],expected:103,hidden:!0}]},{title:`Медиана двух отсортированных массивов (Median of Two Sorted Arrays)`,difficulty:3,categories:[`Arrays`],languages:[`JavaScript`],functionName:`findMedianSortedArrays`,description:{condition:`Даны два массива целых чисел, каждый из которых отсортирован по возрастанию. Найдите медиану объединённого массива — элемент, который стоял бы на средней позиции, если бы оба массива были объединены и отсортированы.

Если общее количество элементов чётное, верните меньший из двух центральных элементов (элемент с индексом \`(total / 2) - 1\` после целочисленного деления).`,input:["`nums1` — отсортированный массив целых чисел, длина от 0 до 1000","`nums2` — отсортированный массив целых чисел, длина от 0 до 1000",`Суммарная длина массивов >= 1`],output:`Одно целое число — медиана объединённого массива.`,constraints:["`-10^6 <= nums1[i], nums2[i] <= 10^6`","`0 <= nums1.length, nums2.length <= 1000`","`nums1.length + nums2.length >= 1`"],example:"Вход: `nums1 = [1, 3]`, `nums2 = [2]`\nВыход: `2`\n\nВход: `nums1 = [1, 2]`, `nums2 = [3, 4]`\nВыход: `2`\n\nВход: `nums1 = [1, 3, 5]`, `nums2 = [2, 4, 6]`\nВыход: `3`"},starterCode:`// Доступно без импорта: встроенные методы JS

function findMedianSortedArrays(nums1, nums2) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`Нечётная суммарная длина`,args:[[1,3],[2]],expected:2},{name:`Чётная длина — меньший из центральных`,args:[[1,2],[3,4]],expected:2},{name:`Оба массива по три элемента`,args:[[1,3,5],[2,4,6]],expected:3},{name:`Один массив пуст`,args:[[],[7]],expected:7,hidden:!0},{name:`Массивы не пересекаются по диапазону`,args:[[1,2,3],[100,200]],expected:3,hidden:!0},{name:`Повторяющиеся значения`,args:[[2,2],[2,2]],expected:2,hidden:!0}]},{title:`Мемоизация функции с несколькими аргументами (Memoization with Multiple Arguments)`,difficulty:3,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`memo`,description:{condition:"Напишите функцию `memo` (в Java — статический метод `memoize`), которая принимает другую функцию и возвращает её мемоизированную версию. Мемоизация — это техника оптимизации, при которой результаты вызовов функции кэшируются, чтобы при повторном вызове с теми же аргументами не выполнять вычисления заново.",input:[],output:``,constraints:[`Функция может принимать два аргумента (для простоты).`,`Аргументы — целые числа.`,`Кэш должен храниться в объекте/словаре/map.`,`При повторном вызове с теми же аргументами результат должен возвращаться из кэша без повторного вычисления.`],example:`Вход: функция pow(2, 3)
Выход: 8 (вычисляется)
Вход: функция pow(2, 3) повторно
Выход: 8 (берётся из кэша)
Вход: функция pow(3, 2)
Выход: 9 (вычисляется)`},starterCode:`function memo(fn) {
    // TODO: write your solution here
    return function(a, b) {
        return fn(a, b);
    };
}
`,tests:[{name:`Повторный вызов берётся из кэша`,body:`let calls = 0;
const pow = (a, b) => { calls++; return a ** b; };
const memo = solution(pow);
return [memo(2, 3), memo(2, 3), calls];`,expected:[8,8,1]},{name:`Разные аргументы — разные вычисления`,body:`let calls = 0;
const pow = (a, b) => { calls++; return a ** b; };
const memo = solution(pow);
return [memo(2, 3), memo(3, 2), calls];`,expected:[8,9,2]},{name:`Второй аргумент влияет на ключ кэша`,body:`const pow = (a, b) => a ** b;
const memo = solution(pow);
memo(2, 3);
return memo(2, 4);`,expected:16,hidden:!0},{name:`Кэши независимы для разных обёрток`,body:`let calls = 0;
const fn = (a) => { calls++; return a; };
const first = solution(fn);
const second = solution(fn);
first(1);
second(1);
return calls;`,expected:2,hidden:!0}]},{title:`Склейка отрезков (Merge Intervals)`,difficulty:3,categories:[`Arrays`],languages:[`JavaScript`],functionName:`mergeIntervals`,description:{condition:`Дан список отрезков \`intervals\`, где каждый отрезок представлен массивом из двух чисел:

Нужно объединить все пересекающиеся или соприкасающиеся отрезки и вернуть новый список отрезков.

Если один отрезок заканчивается в той же точке, где начинается другой, они тоже считаются объединяемыми.

Например:`,input:[`intervals: массив отрезков`,`Каждый отрезок имеет вид:`,`[start, end]`],output:`Нужно вернуть массив объединённых отрезков.`,constraints:[`0 <= intervals.length <= 10^4`,`-10^9 <= start <= end <= 10^9`],example:`[start, end]

[1, 3] и [2, 6] → [1, 6]
[1, 2] и [2, 2] → [1, 2]

Вход:

[[1, 3], [2, 6], [8, 10], [15, 18]]

Выход:

[[1, 6], [8, 10], [15, 18]]`},starterCode:`function mergeIntervals(intervals) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Пример из условия`,args:[[[1,3],[2,6],[8,10],[15,18]]],expected:[[1,6],[8,10],[15,18]]},{name:`Соприкасающиеся отрезки`,args:[[[1,2],[2,2]]],expected:[[1,2]]},{name:`Пересечений нет`,args:[[[1,2],[5,6]]],expected:[[1,2],[5,6]]},{name:`Отрезки идут не по порядку`,args:[[[8,10],[1,3],[2,6]]],expected:[[1,6],[8,10]],hidden:!0},{name:`Отрезок полностью внутри другого`,args:[[[1,10],[2,3]]],expected:[[1,10]],hidden:!0},{name:`Пустой список`,args:[[]],expected:[],hidden:!0}]},{title:`Объединение товаров по названию (Merge Products by Name)`,difficulty:3,categories:[`Grouping`],languages:[`JavaScript`],functionName:`mergeProducts`,description:{condition:"Дан массив объектов-товаров. Каждый объект содержит поля `name` (строка), `count` (число) и `price` (число). Несколько объектов могут иметь одинаковое значение `name`. Напишите функцию, которая объединяет все товары с одинаковым именем в один объект, суммируя их поля `count` и `price`. Результирующий массив должен содержать по одному объекту на каждое уникальное имя. Порядок объектов в результате определяется порядком первого появления имени во входном массиве.",input:["`products` — массив объектов вида `{ name: string, count: number, price: number }`, длина от 0 до 1000."],output:"Массив объектов того же вида, где каждое имя встречается ровно один раз, а `count` и `price` являются суммами соответствующих полей всех исходных объектов с этим именем.",constraints:["`0 <= products.length <= 1000`","`name` — непустая строка","`count` и `price` — неотрицательные целые числа"],example:`Вход:

[
  { name: "apple", count: 10, price: 5 },
  { name: "bread", count: 3,  price: 20 },
  { name: "apple", count: 5,  price: 7 }
]

Выход:

[
  { name: "apple", count: 15, price: 12 },
  { name: "bread", count: 3,  price: 20 }
]`},starterCode:`// Доступно без импорта: встроенные методы JS

/**
 * @param {{ name: string, count: number, price: number }[]} products
 * @returns {{ name: string, count: number, price: number }[]}
 */
function mergeProducts(products) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Два товара с одинаковым именем`,args:[[{name:`apple`,count:10,price:5},{name:`bread`,count:3,price:20},{name:`apple`,count:5,price:7}]],expected:[{name:`apple`,count:15,price:12},{name:`bread`,count:3,price:20}]},{name:`Пустой массив`,args:[[]],expected:[]},{name:`Все имена уникальны`,args:[[{name:`a`,count:1,price:2}]],expected:[{name:`a`,count:1,price:2}]},{name:`Порядок — по первому появлению имени`,args:[[{name:`b`,count:1,price:1},{name:`a`,count:1,price:1},{name:`b`,count:2,price:2}]],expected:[{name:`b`,count:3,price:3},{name:`a`,count:1,price:1}],hidden:!0},{name:`Три вхождения одного имени`,args:[[{name:`x`,count:1,price:10},{name:`x`,count:2,price:20},{name:`x`,count:3,price:30}]],expected:[{name:`x`,count:6,price:60}],hidden:!0}]},{title:`Слияние отсортированных массивов (Merge Sorted Arrays)`,difficulty:3,categories:[`Sorting`],languages:[`JavaScript`],functionName:`mergeSortedArrays`,description:{condition:"Дан список из `k` отсортированных по возрастанию массивов целых чисел. Объедините их в один отсортированный массив. Каждый входной массив уже отсортирован.",input:["`arrays` — список из `k` массивов целых чисел, каждый из которых отсортирован по возрастанию. `1 ≤ k ≤ 100`, суммарное количество элементов `≤ 10^5`."],output:`Один отсортированный массив, содержащий все элементы всех входных массивов.`,constraints:["`1 ≤ k ≤ 100`",`Каждый подмассив отсортирован по возрастанию`,`Суммарно не более 100 000 элементов`,"Элементы: `-10^9 ≤ x ≤ 10^9`"],example:`Вход: [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
Выход: [1, 2, 3, 4, 5, 6, 7, 8, 9]

Вход: [[1, 3, 5], [2, 4, 6]]
Выход: [1, 2, 3, 4, 5, 6]`},starterCode:`function mergeSortedArrays(arrays) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Три массива`,args:[[[1,4,7],[2,5,8],[3,6,9]]],expected:[1,2,3,4,5,6,7,8,9]},{name:`Два массива`,args:[[[1,3,5],[2,4,6]]],expected:[1,2,3,4,5,6]},{name:`Один массив`,args:[[[1,2]]],expected:[1,2]},{name:`Числа больше девяти`,args:[[[9,11],[10,12]]],expected:[9,10,11,12],hidden:!0},{name:`Пустые массивы`,args:[[[],[]]],expected:[],hidden:!0},{name:`Отрицательные числа`,args:[[[-5,0],[-3,2]]],expected:[-5,-3,0,2],hidden:!0}]},{title:`Минимальный и максимальный возраст (Min Max Age)`,difficulty:1,categories:[`Arrays`],languages:[`JavaScript`],functionName:`getAgeRange`,description:{condition:"Напишите функцию `getAgeRange`, которая принимает массив объектов с полем `age` и возвращает массив (или кортеж), содержащий три значения: минимальный возраст, максимальный возраст и разницу между максимальным и минимальным возрастом.",input:[],output:``,constraints:[`Массив всегда содержит хотя бы один объект`,"Каждый объект гарантированно имеет поле `age` с целочисленным значением",`Возраст может быть любым неотрицательным целым числом`],example:`Вход: [{ name: 'a', age: 20 }, { name: 'b', age: 40 }, { name: 'c', age: 60 }, { name: 'd', age: 10 }]
Выход: [10, 60, 50]

Вход: [{ name: 'x', age: 5 }, { name: 'y', age: 5 }]
Выход: [5, 5, 0]

Вход: [{ name: 'p', age: 100 }]
Выход: [100, 100, 0]

Вход: [{ name: 'm', age: 30 }, { name: 'n', age: 20 }, { name: 'o', age: 25 }]
Выход: [20, 30, 10]`},starterCode:`function getAgeRange(people) {
    // TODO: write your solution here
    return [0, 0, 0];
}
`,tests:[{name:`Разные возрасты`,args:[[{name:`a`,age:20},{name:`b`,age:40},{name:`c`,age:60},{name:`d`,age:10}]],expected:[10,60,50]},{name:`Одинаковые возрасты`,args:[[{name:`x`,age:5},{name:`y`,age:5}]],expected:[5,5,0]},{name:`Один человек`,args:[[{name:`p`,age:100}]],expected:[100,100,0]},{name:`Минимум и максимум не на краях`,args:[[{name:`m`,age:30},{name:`n`,age:20},{name:`o`,age:25}]],expected:[20,30,10],hidden:!0}]},{title:`Минимальное расстояние между x и y (Minimum Distance Between X and Y)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`shortestXYDistance`,description:{condition:"Дана строка `s`, состоящая из разных символов.\nНужно найти минимальное расстояние между любым символом `x` и любым символом `y`.\n\nРасстояние считается как разница между индексами двух символов.\n\nЕсли в строке нет хотя бы одного символа `x` или `y`, нужно вернуть `0`.",input:["Строка `s`."],output:"Целое число — минимальное расстояние между символами `x` и `y`.",constraints:["`0 <= s.length <= 100000`",`строка может содержать любые символы`,"нужно учитывать только символы `x` и `y`"],example:`Вход:

s = "abxkkky"

Выход:

4`},starterCode:`function shortestXYDistance(s) {
    // TODO: напишите решение здесь
    return 0;
}
`,tests:[{name:`"abxkkky"`,args:[`abxkkky`],expected:4},{name:`Нет символа y`,args:[`abcx`],expected:0},{name:`Символы рядом`,args:[`xy`],expected:1},{name:`y раньше x`,args:[`yzx`],expected:2,hidden:!0},{name:`Пустая строка`,args:[``],expected:0,hidden:!0},{name:`Несколько вхождений`,args:[`xaaayax`],expected:2,hidden:!0}]},{title:`Минимальное количество взвешиваний (Minimum Weighings)`,difficulty:2,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`minWeighings`,description:{condition:`Дано \`n\` одинаковых на вид монет. Известно, что ровно одна монета фальшивая, и она легче остальных.

Есть чашечные весы. За одно взвешивание можно положить любое количество монет на левую и правую чашу. После взвешивания возможны три результата: левая чаша легче, правая чаша легче, чаши равны.

Нужно вернуть минимальное количество взвешиваний, достаточное, чтобы гарантированно определить фальшивую монету.`,input:["`n` — количество монет (целое число, `n >= 1`)"],output:`Целое число — минимальное количество взвешиваний`,constraints:["`1 <= n <= 10^9`",`Ровно одна монета фальшивая и она легче`],example:`Вход: 8
Выход: 2

Вход: 1
Выход: 0

Вход: 9
Выход: 2

Вход: 10
Выход: 3`},starterCode:`function minWeighings(n) {
    // TODO: напишите решение здесь
    return 0;
}
`,tests:[{name:`8 монет`,args:[8],expected:2},{name:`Одна монета — взвешивать не нужно`,args:[1],expected:0},{name:`9 монет`,args:[9],expected:2},{name:`10 монет — уже три взвешивания`,args:[10],expected:3,hidden:!0},{name:`3 монеты`,args:[3],expected:1,hidden:!0},{name:`27 монет`,args:[27],expected:3,hidden:!0}]},{title:`Зеркальные ключи (Mirror Object)`,difficulty:2,categories:[`Objects`],languages:[`JavaScript`],functionName:`mirror`,description:{condition:`Напишите функцию \`mirror\`, которая принимает объект, где все свойства имеют значение \`undefined\`. Функция должна вернуть новый объект с теми же ключами, но значениями являются строки, представляющие зеркальное отражение ключа (перевёрнутая строка).

Правила:

Все значения входного объекта — \`undefined\`

Значениями выходного объекта становятся перевёрнутые строки ключей

Исходный объект не должен изменяться

Возвращается новый объект`,input:[],output:``,constraints:[`Ключи — строки`,`Длина строк: 1 ≤ length ≤ 100`,`Количество свойств: 0 ≤ N ≤ 1000`,`Время выполнения: O(N * M), где M — длина строки`,`Память: O(N)`],example:`mirror({ abc: undefined, hello: undefined })
// -> { abc: 'cba', hello: 'olleh' }

mirror({ arara: undefined })
// -> { arara: 'arara' }

mirror({ a: undefined, b: undefined, c: undefined })
// -> { a: 'a', b: 'b', c: 'c' }

mirror({})
// -> {}`},starterCode:`function mirror(obj) {
    // TODO: write your solution here
    return {};
}
`,tests:[{name:`Два ключа`,args:[{}],expected:{abc:`cba`,hello:`olleh`}},{name:`Палиндром`,args:[{}],expected:{arara:`arara`}},{name:`Односимвольные ключи`,args:[{}],expected:{a:`a`,b:`b`,c:`c`}},{name:`Пустой объект`,args:[{}],expected:{},hidden:!0},{name:`Исходный объект не изменяется`,body:`const source = { abc: undefined };
solution(source);
return source.abc;`,hidden:!0}]},{title:`Элементы первой последовательности, отсутствующие во второй (Missing Elements)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`missingElements`,description:{condition:"Напишите функцию `missing_elements(a, b)`, которая принимает две отсортированные последовательности чисел `a` и `b` (по неубыванию) и возвращает список всех элементов из `a`, которых нет в `b`.",input:[],output:``,constraints:[],example:`a = [1, 1, 4, 6, 7, 9]
b = [0, 2, 3, 4, 8, 9]
missing_elements(a, b) -> [1, 1, 6, 7]

a = [2, 3, 5, 5, 8]
b = [1, 2, 5, 6]
missing_elements(a, b) -> [3, 5, 8]

a = []
b = [1, 2, 3]
missing_elements(a, b) -> []

a = [1, 2, 3]
b = []
missing_elements(a, b) -> [1, 2, 3]

Дополнительно:

Последовательности могут быть пустыми.

Элементы могут повторяться.

Оба массива отсортированы по неубыванию`},starterCode:`function missingElements(a, b) {
    // TODO: напишите решение здесь
    return [];
}
`,tests:[{name:`Повторы сохраняются`,args:[[1,1,4,6,7,9],[0,2,3,4,8,9]],expected:[1,1,6,7]},{name:`Второй пример`,args:[[2,3,5,5,8],[1,2,5,6]],expected:[3,8]},{name:`Пустой a`,args:[[],[1,2,3]],expected:[]},{name:`Пустой b`,args:[[1,2,3],[]],expected:[1,2,3],hidden:!0},{name:`Все элементы есть в b`,args:[[1,2],[1,2]],expected:[],hidden:!0}]},{title:`Перемещение нулей в конец массива (Move Zeros to End)`,difficulty:2,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`moveZero`,description:{condition:`Напишите функцию \`moveZero\`, которая принимает массив и перемещает все нули в конец, сохраняя порядок остальных элементов. Функция должна возвращать новый массив, не изменяя исходный.

Правила:

Все нули (0) перемещаются в конец массива

Порядок ненулевых элементов сохраняется

Исходный массив не изменяется

Нули могут быть числами, а также другими типами (булевы значения, строки и т.д.) не считаются нулями`,input:[],output:``,constraints:[`Длина массива: 0 ≤ N ≤ 1000`,`Элементы могут быть любого типа`,`Нулями считаются только числовые значения 0`,`Время выполнения: O(N)`,`Память: O(N)`],example:`moveZero([false, 1, 0, 1, 2, 0, 1, 3, "a"])
// -> [false, 1, 1, 2, 1, 3, "a", 0, 0]

moveZero([0, 1, 0, 2, 0, 3])
// -> [1, 2, 3, 0, 0, 0]

moveZero([1, 2, 3])
// -> [1, 2, 3]

moveZero([])
// -> []`},starterCode:`function moveZero(arr) {
    // TODO: write your solution here
    return [];
}
`,tests:[{name:`false и строки не считаются нулями`,args:[[!1,1,0,1,2,0,1,3,`a`]],expected:[!1,1,1,2,1,3,`a`,0,0]},{name:`Только числа`,args:[[0,1,0,2,0,3]],expected:[1,2,3,0,0,0]},{name:`Нулей нет`,args:[[1,2,3]],expected:[1,2,3]},{name:`Пустой массив`,args:[[]],expected:[],hidden:!0},{name:`Исходный массив не изменяется`,body:`const source = [0, 1];
solution(source);
return source;`,expected:[0,1],hidden:!0}]},{title:`Скользящее среднее (Moving Average)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`movingAverage`,description:{condition:`Дан список чисел \`input_list\` и размер окна \`window_size\`.

Необходимо написать функцию, которая возвращает список скользящих средних значений.

Скользящее среднее считается для каждого непрерывного окна длиной \`window_size\`.

Например, для списка:

и окна \`3\` окна будут такими:

Ответ:`,input:[`input_list — список чисел
window_size — размер окна`],output:`Список чисел — скользящие средние значения`,constraints:[`1 <= input_list.length <= 100000`,`1 <= window_size <= input_list.length`,`-10^9 <= input_list[i] <= 10^9`],example:`[1, 2, 3, 4, 5]

[1, 2, 3] → 2
[2, 3, 4] → 3
[3, 4, 5] → 4

[2, 3, 4]

Вход:

input_list = [1, 2, 3, 4, 5]
window_size = 3

Выход:

[2, 3, 4]`},starterCode:`function movingAverage(inputList, windowSize) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Окно 3`,args:[[1,2,3,4,5],3],expected:[2,3,4]},{name:`Окно 1 — исходный массив`,args:[[1,2],1],expected:[1,2]},{name:`Окно равно длине массива`,args:[[2,4],2],expected:[3]},{name:`Окно больше массива — пустой результат`,args:[[1,2],5],expected:[],hidden:!0},{name:`Дробные средние`,args:[[1,2,4],2],expected:[1.5,3],hidden:!0}]},{title:`Создание функции-множителя (Multiplier Factory)`,difficulty:2,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`makeMultiplier`,description:{condition:'Напишите функцию `makeMultiplier`, которая принимает число `factor` и возвращает новую функцию. Возвращаемая функция должна принимать один аргумент и возвращать результат умножения этого аргумента на сохранённый `factor`.\n\nЭто классический пример использования замыкания для сохранения контекста — внутренняя функция "запоминает" переданный множитель.',input:[],output:``,constraints:["`factor` может быть любым числом (целым, дробным, положительным, отрицательным)",`Возвращаемая функция должна правильно работать с любым числовым аргументом`,`Нельзя использовать глобальные переменные`],example:`const double = makeMultiplier(2);
console.log(double(5)); // 10

const triple = makeMultiplier(3);
console.log(triple(5)); // 15

const half = makeMultiplier(0.5);
console.log(half(10)); // 5

const zero = makeMultiplier(0);
console.log(zero(100)); // 0`},starterCode:`function makeMultiplier(factor) {
    // TODO: write your solution here
}
`,tests:[{name:`Удвоение`,body:`return solution(2)(5);`,expected:10},{name:`Утроение`,body:`return solution(3)(5);`,expected:15},{name:`Дробный множитель`,body:`return solution(0.5)(10);`,expected:5},{name:`Множитель 0`,body:`return solution(0)(100);`,expected:0,hidden:!0},{name:`Множители независимы`,body:`const double = solution(2);
const triple = solution(3);
return [double(4), triple(4)];`,expected:[8,12],hidden:!0}]},{title:`Ближайшее простое число (Nearest Prime Number)`,difficulty:3,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`findPrimeNumber`,description:{condition:`Реализовать функцию, которая принимает целое число и возвращает ближайшее простое число.
Если два простых числа находятся на одинаковом расстоянии от заданного числа, выбрать меньшее.

Определение: Простое число — это натуральное число больше 1, которое имеет ровно два натуральных делителя: 1 и само себя.

Правила поиска:

Если переданное число само является простым, вернуть его

Иначе найти ближайшее простое число

При равенстве расстояний выбрать меньшее простое число

Числа могут быть отрицательными, нулем или единицей (они не являются простыми)`,input:[],output:``,constraints:[`Входное число: любое целое число в диапазоне -10⁶ ≤ num ≤ 10⁶`,`Время выполнения: должно работать для больших чисел`],example:`findPrimeNumber(3) → 3    (3 простое)
findPrimeNumber(11) → 11  (11 простое)
findPrimeNumber(125) → 127 (ближайшее простое)
findPrimeNumber(110) → 109 (109 ближе, чем 113)
findPrimeNumber(1) → 2     (1 не простое, ближайшее 2)
findPrimeNumber(0) → 2     (0 не простое, ближайшее 2)
findPrimeNumber(-5) → 2    (отрицательные не простые, ближайшее 2)
findPrimeNumber(4) → 3     (3 ближе, чем 5)
findPrimeNumber(6) → 5     (5 ближе, чем 7, хотя 5 и 7 равноудалены? 6-5=1, 7-6=1 → выбираем меньшее 5)`},starterCode:`function findPrimeNumber(num) {
    // TODO: напишите решение здесь
    return 0;
}
`,tests:[{name:`Само число простое`,args:[3],expected:3},{name:`Ближайшее сверху`,args:[125],expected:127},{name:`Ближайшее снизу`,args:[110],expected:109},{name:`1 не простое`,args:[1],expected:2,hidden:!0},{name:`Отрицательное число`,args:[-5],expected:2,hidden:!0},{name:`При равенстве берётся меньшее`,args:[4],expected:3,hidden:!0},{name:`6 → 5`,args:[6],expected:5,hidden:!0}]},{title:`Игла в стоге сена (Needle in Haystack)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`needleInHaystack`,description:{condition:"Напишите функцию `needleInHaystack`, которая проверяет, встречаются ли все символы из строки `needle` в строке `haystack` в том же порядке, в каком они приведены в `needle`. Использование `indexOf` или аналогичных встроенных методов поиска подстроки запрещено.\n\nПравила:\n\nВсе символы из `needle` должны встречаться в `haystack` в том же порядке\n\nСимволы не обязаны быть подряд, но порядок должен сохраняться\n\nПоиск должен быть ручным (без `indexOf`, `includes`, `find` и т.д.)\n\nУчитывается регистр символов",input:[],output:``,constraints:[`Длина строк: 1 ≤ N ≤ 1000`,`Символы: латинские буквы (a-z, A-Z)`,`Время выполнения: O(N × M), где N — длина haystack, M — длина needle`,`Память: O(1)`],example:`needleInHaystack('whe', 'cartwheel')   // -> true
needleInHaystack('crt', 'cartwheel')   // -> true
needleInHaystack('cw', 'cartwheel')    // -> true
needleInHaystack('weee', 'cartwheel')  // -> false`},starterCode:`function needleInHaystack(needle, haystack) {
    // TODO: write your solution here
    return false;
}
`,tests:[{name:`'whe' в 'cartwheel'`,args:[`whe`,`cartwheel`],expected:!0},{name:`Символы вразброс`,args:[`crt`,`cartwheel`],expected:!0},{name:`Две далёкие буквы`,args:[`cw`,`cartwheel`],expected:!0},{name:`Не хватает повторов`,args:[`weee`,`cartwheel`],expected:!1,hidden:!0},{name:`Регистр учитывается`,args:[`C`,`cartwheel`],expected:!1,hidden:!0},{name:`Пустая игла`,args:[``,`abc`],expected:!0,hidden:!0}]},{title:`Сумма чисел во вложенном массиве (Nested Array Sum)`,difficulty:3,categories:[`Arrays`,`Recursion`],languages:[`JavaScript`],functionName:`sum`,description:{condition:'Напишите функцию `sum(arr)`, которая вычисляет сумму всех числовых значений в массиве. Массив может быть не плоским (содержать вложенные массивы произвольной глубины) и может содержать элементы разных типов.\n\nВалидными числовыми значениями считаются:\n\nчисла — учитываются как есть;\n\nстроки, которые начинаются с одной или нескольких цифр — в этом случае в сумму добавляется числовое значение этой начальной последовательности цифр (например, `"2x"` даёт `2`); строки, не начинающиеся с цифры, игнорируются (дают `0`).\n\nОстальные типы данных (например, `null`, булевы значения, объекты) игнорируются.\n\nНельзя использовать встроенные методы `.flat`, `.flatMap` — обход вложенности нужно реализовать самостоятельно (рекурсией или явным стеком/циклом).',input:["`arr` — массив, элементами которого могут быть числа, строки или вложенные массивы (любой глубины вложенности)"],output:`Число — сумма всех числовых значений, извлечённых из массива по правилам выше`,constraints:[`Глубина вложенности: от 0 до 100`,`Суммарное количество элементов (с учётом вложенности): от 0 до 10^4`,"Числа: `-10^6 <= число <= 10^6`"],example:`Вход: [1, 'x', '2x', ['3', ['x2', '5']]]
Выход: 11   // 1 + 0 + 2 + 3 + 0 + 5

Вход: []
Выход: 0

Вход: [[[1, 2], 3], 4]
Выход: 10`},starterCode:`// Доступно без импорта: встроенные методы JS

function sum(arr) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`Числа и строки вперемешку`,args:[[1,`x`,`2x`,[`3`,[`x2`,`5`]]]],expected:11},{name:`Пустой массив`,args:[[]],expected:0},{name:`Только числа`,args:[[[[1,2],3],4]],expected:10},{name:`Не-числовые типы игнорируются`,args:[[null,!0,{},5]],expected:5,hidden:!0},{name:`Строка без ведущих цифр даёт 0`,args:[[`abc`,`12abc`]],expected:12,hidden:!0}]},{title:`Доступ к вложенным свойствам (Nested Property Access)`,difficulty:2,categories:[`Data structures`],languages:[`JavaScript`],functionName:`get`,description:{condition:"Напишите функцию `get`, которая принимает объект (словарь) и строку пути к полю, разделённую точками. Функция должна вернуть значение по указанному пути. Запрашиваемое поле гарантированно существует в объекте.",input:[],output:``,constraints:[`Путь всегда валидный и ведёт к существующему полю`,`Путь может быть любой глубины вложенности`,`Значения могут быть любого типа (объекты, строки, числа)`],example:`Вход: ({ a: { b: { c: 'd' } }, e: 'f' }, 'a.b')
Выход: { c: 'd' }

Вход: ({ a: { b: { c: 'd' } }, e: 'f' }, 'a.b.c')
Выход: 'd'

Вход: ({ a: { b: { c: 'd' } }, e: 'f' }, 'e')
Выход: 'f'

Вход: ({ x: { y: { z: 42 } } }, 'x.y.z')
Выход: 42`},starterCode:`function get(obj, path) {
    // TODO: write your solution here
    return undefined;
}
`,tests:[{name:`Промежуточный объект`,args:[{a:{b:{c:`d`}},e:`f`},`a.b`],expected:{c:`d`}},{name:`Полный путь`,args:[{a:{b:{c:`d`}},e:`f`},`a.b.c`],expected:`d`},{name:`Ключ верхнего уровня`,args:[{a:{b:1},e:`f`},`e`],expected:`f`},{name:`Числовое значение`,args:[{x:{y:{z:42}}},`x.y.z`],expected:42,hidden:!0},{name:`Глубокая вложенность`,args:[{a:{b:{c:{d:{e:`deep`}}}}},`a.b.c.d.e`],expected:`deep`,hidden:!0}]},{title:`Следующий язык по кругу (Next Language)`,difficulty:1,categories:[`Arrays`],languages:[`JavaScript`],functionName:`getNextLang`,description:{condition:"Напишите функцию `getNextLang`, которая принимает массив языков и текущий язык, и возвращает следующий язык по кругу. Если текущий язык является последним в массиве, функция должна вернуть первый язык (циклический обход).",input:[],output:``,constraints:[`Массив языков всегда непустой`,`Текущий язык всегда присутствует в массиве`,`Языки могут быть любыми строками`],example:`Вход: (['ru', 'en', 'fr'], 'fr')
Выход: 'ru'

Вход: (['ru', 'en', 'fr'], 'ru')
Выход: 'en'

Вход: (['ru', 'en', 'fr'], 'en')
Выход: 'fr'

Вход: (['ru', 'en'], 'en')
Выход: 'ru'`},starterCode:`function getNextLang(languages, current) {
    // TODO: write your solution here
    return "";
}
`,tests:[{name:`Последний → первый`,args:[[`ru`,`en`,`fr`],`fr`],expected:`ru`},{name:`Первый → второй`,args:[[`ru`,`en`,`fr`],`ru`],expected:`en`},{name:`Второй → третий`,args:[[`ru`,`en`,`fr`],`en`],expected:`fr`},{name:`Два языка`,args:[[`ru`,`en`],`en`],expected:`ru`,hidden:!0},{name:`Один язык`,args:[[`ru`],`ru`],expected:`ru`,hidden:!0}]},{title:`N-й член числовой последовательности (Nth Term of a Custom Sequence)`,difficulty:2,categories:[`Recursion`],languages:[`JavaScript`],functionName:`nthTerm`,description:{condition:"Дана числовая последовательность, в которой первый член равен 3, второй член равен 2, а каждый следующий член равен сумме двух предыдущих: 3, 2, 5, 7, 12, 19, ... Напишите функцию, которая по номеру `n` (нумерация с 1) возвращает n-й член этой последовательности.",input:["`n` — целое число, номер члена последовательности (1-based)"],output:`Целое число — значение n-го члена последовательности`,constraints:["`1 <= n <= 40`"],example:`Вход: n = 1
Выход: 3

Вход: n = 2
Выход: 2

Вход: n = 5
Выход: 12`},starterCode:`// Доступно без импорта: встроенные методы JS

function nthTerm(n) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`n = 1`,args:[1],expected:3},{name:`n = 2`,args:[2],expected:2},{name:`n = 5`,args:[5],expected:12},{name:`n = 3`,args:[3],expected:5,hidden:!0},{name:`n = 6`,args:[6],expected:19,hidden:!0},{name:`n = 10`,args:[10],expected:131,hidden:!0}]},{title:`Количество связных областей в матрице (Number of Connected Regions)`,difficulty:3,categories:[`Matrices`],languages:[`JavaScript`],functionName:`countRegions`,description:{condition:`Дана двумерная матрица целых чисел. Каждая ячейка содержит число. Две ячейки считаются связными, если они соседние по горизонтали или вертикали и содержат одинаковое число. Связная область — это максимальная группа ячеек с одинаковым значением, соединённых друг с другом.

Напишите функцию, которая возвращает количество таких связных областей в матрице.`,input:["Двумерный массив целых чисел `grid` (матрица размером m×n)."],output:`Целое число — количество связных областей.`,constraints:["`1 <= m, n <= 100`","`0 <= grid[i][j] <= 100`"],example:`Вход:
[[1, 1, 2],
 [1, 2, 2],
 [3, 3, 2]]

Выход: 3
(область из 1-ек, область из 2-ек, область из 3-ек)

Вход:
[[1, 2],
 [2, 1]]

Выход: 4
(каждая ячейка — отдельная область)`},starterCode:`function countRegions(grid) {
    // TODO: напишите решение здесь
    return 0;
}
`,tests:[{name:`Три области`,args:[[[1,1,2],[1,2,2],[3,3,2]]],expected:3},{name:`Каждая клетка — своя область`,args:[[[1,2],[2,1]]],expected:4},{name:`Одна клетка`,args:[[[7]]],expected:1},{name:`Одинаковое значение в двух несвязных областях`,args:[[[1,2,1]]],expected:3,hidden:!0},{name:`Вся матрица — одна область`,args:[[[5,5],[5,5]]],expected:1,hidden:!0},{name:`Пустая матрица`,args:[[]],expected:0,hidden:!0}]},{title:`Реализация метода times для числа (Number.prototype.times)`,difficulty:2,categories:[`Loops`,`Functions`],languages:[`JavaScript`],functionName:`times`,description:{condition:"Реализуйте функцию `times(n, callback)`, которая вызывает переданную функцию `callback` ровно `n` раз, передавая в неё индекс текущей итерации (начиная с 0). Если `n` — не целое положительное число (например, отрицательное или дробное), функция должна привести его к количеству итераций через `Math.trunc` (отбросить дробную часть; отрицательные и нулевые значения дают 0 итераций). Функция должна возвращать массив со значениями, которые вернул `callback` на каждом вызове.",input:["`n` — число (может быть дробным, отрицательным, нулём)","`callback` — функция, принимающая индекс итерации и возвращающая значение"],output:"Массив длиной `Math.max(0, Math.trunc(n))`, где `i`-й элемент — результат вызова `callback(i)`",constraints:["`-100 <= n <= 1000`","`callback` — чистая функция, возвращающая число"],example:`Вход: n = 3, callback = (i) => i
Выход: [0, 1, 2]

Вход: n = 0, callback = (i) => i
Выход: []

Вход: n = 2.9, callback = (i) => i * 2
Выход: [0, 2]

Вход: n = -1, callback = (i) => i
Выход: []`},starterCode:`// Доступно без импорта: встроенные методы JS

function times(n, callback) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`n = 3`,body:`return solution(3, (i) => i);`,expected:[0,1,2]},{name:`n = 0`,body:`return solution(0, (i) => i);`,expected:[]},{name:`Дробное n отбрасывается`,body:`return solution(2.9, (i) => i * 2);`,expected:[0,2]},{name:`Отрицательное n`,body:`return solution(-1, (i) => i);`,expected:[],hidden:!0},{name:`callback получает индекс`,body:`const seen = [];
solution(3, (i) => seen.push(i));
return seen;`,expected:[0,1,2],hidden:!0}]},{title:`Строки на расстоянии редактирования не более 1 (One Edit Distance)`,difficulty:3,categories:[`Strings`],languages:[`JavaScript`],functionName:`oneEditApart`,description:{condition:`Даны две строки \`s1\` и \`s2\`, состоящие из строчных латинских букв. Требуется определить, находятся ли они на «расстоянии редактирования» ровно 1 — то есть можно ли превратить одну строку в другую ровно одной из трёх операций:

заменить один символ (если строки одинаковой длины);

вставить один символ (если вторая строка длиннее первой на 1);

удалить один символ (если первая строка длиннее второй на 1).

Если строки идентичны, либо отличаются больше чем на одну операцию, либо разница в длине больше 1 — функция должна вернуть \`false\`.`,input:["Две строки `s1` и `s2`."],output:"`true`, если строки отличаются ровно одной операцией редактирования, иначе `false`.",constraints:["`0 <= s1.length, s2.length <= 10^4`",`строки состоят только из строчных латинских букв`],example:`Вход: s1 = "pale", s2 = "ple"   → Выход: true   (удалён символ "a")
Вход: s1 = "cab",  s2 = "cf"    → Выход: false  (несовпадение более чем в одной позиции при сдвиге)
Вход: s1 = "abc",  s2 = "abc"   → Выход: false  (строки идентичны, ни одной операции не требуется)
Вход: s1 = "abc",  s2 = "abd"   → Выход: true   (заменён один символ)`},starterCode:`// Доступно без импорта: встроенные методы JS

function oneEditApart(s1, s2) {
  // TODO: напишите решение здесь
  return false;
}
`,tests:[{name:`Удалён символ`,args:[`pale`,`ple`],expected:!0},{name:`Слишком много различий`,args:[`cab`,`cf`],expected:!1},{name:`Идентичные строки`,args:[`abc`,`abc`],expected:!1},{name:`Заменён один символ`,args:[`abc`,`abd`],expected:!0,hidden:!0},{name:`Разница в длине больше 1`,args:[`a`,`abc`],expected:!1,hidden:!0},{name:`Вставка в начало`,args:[`bc`,`abc`],expected:!0,hidden:!0},{name:`Пустая и односимвольная`,args:[``,`a`],expected:!0,hidden:!0}]},{title:`Пересечение интервалов онлайна (Online Intervals Intersection)`,difficulty:3,categories:[`Arrays`,`Pointers`],languages:[`JavaScript`],functionName:`intersection`,description:{condition:"Даны два отсортированных списка интервалов присутствия пользователей в онлайне в течение дня. Каждый интервал — пара чисел `[start, end]`, где `start` строго меньше `end`, часы указаны в диапазоне от 0 до 24. Необходимо вычислить список интервалов, когда оба пользователя были в онлайне одновременно.",input:["`user1` — отсортированный массив интервалов `[start, end]`","`user2` — отсортированный массив интервалов `[start, end]`"],output:"Массив интервалов `[start, end]`, представляющих пересечение периодов онлайна обоих пользователей, в хронологическом порядке.",constraints:["`0 <= start < end <= 24`",`Интервалы внутри каждого списка отсортированы и не пересекаются между собой`,"`0 <= user1.length, user2.length <= 1000`"],example:`Вход:
intersection([[8, 12], [17, 22]], [[5, 11], [14, 18], [20, 23]])
Выход: [[8, 11], [17, 18], [20, 22]]

Вход:
intersection([[9, 15], [18, 21]], [[10, 14], [21, 22]])
Выход: [[10, 14]]`},starterCode:`// Доступно без импорта: встроенные методы JS

function intersection(user1, user2) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Три пересечения`,args:[[[8,12],[17,22]],[[5,11],[14,18],[20,23]]],expected:[[8,11],[17,18],[20,22]]},{name:`Одно пересечение`,args:[[[9,15],[18,21]],[[10,14],[21,22]]],expected:[[10,14]]},{name:`Пересечений нет`,args:[[[1,2]],[[3,4]]],expected:[]},{name:`Пустой список`,args:[[],[[1,2]]],expected:[],hidden:!0},{name:`Интервалы соприкасаются, но не пересекаются`,args:[[[1,5]],[[5,9]]],expected:[],hidden:!0},{name:`Один длинный интервал перекрывает несколько коротких`,args:[[[0,24]],[[1,2],[5,6]]],expected:[[1,2],[5,6]],hidden:!0}]},{title:`Упорядоченный рендер сообщений (Ordered Message Rendering)`,difficulty:3,categories:[`Queue`,`Caching`],languages:[`JavaScript`],functionName:`getRenderOrder`,description:{condition:`В чат-приложение сообщения приходят с сервера в произвольном порядке, но должны отображаться (рендериться) строго по возрастанию \`id\`, начиная с \`id = 1\`, без пропусков.

Каждое сообщение имеет вид:

Дана последовательность сообщений в том порядке, в котором они пришли с сервера (может не совпадать с порядком id). Необходимо определить порядок, в котором сообщения были бы фактически отрендерены: сообщение рендерится немедленно при получении, если оно является следующим по очереди (т.е. его id на 1 больше id последнего отрендеренного сообщения), либо буферизуется в ожидании более ранних сообщений. Как только приходит недостающее сообщение, из буфера последовательно "дорендериваются" все сообщения, которые становятся доступны по порядку.

Напишите функцию, которая принимает массив пришедших сообщений (в порядке прихода) и возвращает массив id в том порядке, в котором они были бы отрендерены.`,input:["`messages` — массив объектов `{ id: number, text: string }`, представляющий порядок прихода сообщений с сервера"],output:"Массив чисел — id сообщений в порядке их рендеринга (всегда возрастающая последовательность `1, 2, 3, ...` до количества сообщений).",constraints:["`1 <= messages.length <= 1000`","Все id уникальны и образуют непрерывную последовательность от 1 до `messages.length`","`text` — непустая строка (для теста несущественна)"],example:'{ id: number, text: string }\n\nВход: `[{id:1,text:"a"},{id:2,text:"b"},{id:3,text:"c"}]`\nВыход: `[1, 2, 3]`\n\nВход: `[{id:3,text:"c"},{id:1,text:"a"},{id:2,text:"b"}]`\nВыход: `[1, 2, 3]`\n\nВход: `[{id:2,text:"b"},{id:4,text:"d"},{id:1,text:"a"},{id:3,text:"c"},{id:5,text:"e"}]`\nВыход: `[1, 2, 3, 4, 5]`'},starterCode:`// Available without import: built-in JS methods

function getRenderOrder(messages) {
  // TODO: write solution here
  return [];
}
`,tests:[{name:`Сообщения пришли по порядку`,args:[[{id:1,text:`a`},{id:2,text:`b`},{id:3,text:`c`}]],expected:[1,2,3]},{name:`Первым пришло третье`,args:[[{id:3,text:`c`},{id:1,text:`a`},{id:2,text:`b`}]],expected:[1,2,3]},{name:`Буфер разбирается порциями`,args:[[{id:2,text:`b`},{id:4,text:`d`},{id:1,text:`a`},{id:3,text:`c`},{id:5,text:`e`}]],expected:[1,2,3,4,5]},{name:`Пустой список`,args:[[]],expected:[],hidden:!0},{name:`Все сообщения в обратном порядке`,args:[[{id:3,text:`c`},{id:2,text:`b`},{id:1,text:`a`}]],expected:[1,2,3],hidden:!0}]},{title:`Проверка на палиндром (Palindrome Check)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`isPalindrome`,description:{condition:"Напишите функцию `isPalindrome`, которая принимает строку и проверяет, является ли она палиндромом. Палиндром — это строка, которая читается одинаково слева направо и справа налево. Функция должна игнорировать пробелы, знаки пунктуации и регистр букв.",input:[],output:``,constraints:[`Строка может содержать буквы, пробелы и знаки пунктуации`,`Пустая строка считается палиндромом`,`Проверка должна быть нечувствительна к регистру`,`Пробелы и знаки пунктуации должны игнорироваться`],example:`Вход: "A man a plan a canal Panama"
Выход: true

Вход: "hello"
Выход: false

Вход: "racecar"
Выход: true

Вход: ""
Выход: true`},starterCode:`function isPalindrome(str) {
    // TODO: write your solution here
    return false;
}
`,tests:[{name:`Фраза с пробелами`,args:[`A man a plan a canal Panama`],expected:!0},{name:`Не палиндром`,args:[`hello`],expected:!1},{name:`Слово-палиндром`,args:[`racecar`],expected:!0},{name:`Пустая строка`,args:[``],expected:!0,hidden:!0},{name:`Знаки препинания игнорируются`,args:[`No 'x' in Nixon`],expected:!0,hidden:!0},{name:`Один символ`,args:[`a`],expected:!0,hidden:!0}]},{title:`Парсинг файловой системы (Parse File System)`,difficulty:3,categories:[`Data structures`],languages:[`JavaScript`],functionName:`parseFileSystem`,description:{condition:`Напишите функцию \`parseFileSystem\`, которая принимает объект (словарь), описывающий структуру файловой системы. Функция должна вернуть строку, представляющую файловую систему в виде дерева. Каждый уровень вложенности в строке должен быть обозначен двумя пробелами.

Правила:

Если значение ключа — \`null\`, это файл

Если значение ключа — объект (словарь), это папка

Каждый уровень вложенности отображается двумя пробелами в начале строки`,input:[],output:``,constraints:[`Имена файлов и папок могут содержать только буквы, цифры, точки и подчеркивания`,`Глубина вложенности не превышает 10 уровней`,`Объект всегда имеет корневой элемент`],example:`const fs = {
  root: {
    folder1: {
      "file1.txt": null,
      "file2.txt": null
    },
    folder2: {
      subfolder1: {
        "file3.txt": null
      }
    },
    "file4.txt": null
  }
};

console.log(parseFileSystem(fs));
// Вывод:
// root
//   folder1
//     file1.txt
//     file2.txt
//   folder2
//     subfolder1
//       file3.txt
//   file4.txt`},starterCode:`function parseFileSystem(fs) {
    // TODO: write your solution here
    return "";
}
`,tests:[{name:`Дерево из условия`,args:[{root:{folder1:{"file1.txt":null,"file2.txt":null},folder2:{subfolder1:{"file3.txt":null}},"file4.txt":null}}],expected:`root
  folder1
    file1.txt
    file2.txt
  folder2
    subfolder1
      file3.txt
  file4.txt`},{name:`Один файл`,args:[{"a.txt":null}],expected:`a.txt`},{name:`Пустая структура`,args:[{}],expected:``},{name:`Пустая папка`,args:[{root:{empty:{}}}],expected:`root
  empty`,hidden:!0},{name:`Два уровня вложенности`,args:[{a:{b:{"c.txt":null}}}],expected:`a
  b
    c.txt`,hidden:!0}]},{title:`Частичное применение функций (Partial Function Application)`,difficulty:2,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`partial`,description:{condition:`Напишите функцию \`partial\`, которая принимает функцию и фиксированные аргументы. Она должна возвращать новую функцию, которая может принимать оставшиеся аргументы и вызывать исходную функцию с полным набором аргументов.

Частичное применение — это техника, при которой мы фиксируем часть аргументов функции, создавая новую функцию с меньшим количеством параметров.`,input:[],output:``,constraints:[`Исходная функция может принимать любое количество аргументов`,`Количество фиксированных аргументов может быть меньше общего количества аргументов функции`,`Возвращаемая функция должна принимать оставшиеся аргументы`],example:`function add(a, b, c) {
    return a + b + c;
}

const add5 = partial(add, 2, 3);
console.log(add5(4)); // 9 (2 + 3 + 4)

const multiply = (a, b, c) => a * b * c;
const multiplyBy2 = partial(multiply, 2);
console.log(multiplyBy2(3, 4)); // 24 (2 * 3 * 4)

const greet = (greeting, name) => \`\${greeting}, \${name}!\`;
const sayHello = partial(greet, "Hello");
console.log(sayHello("John")); // "Hello, John!"`},starterCode:`function partial(fn, ...args) {
    // TODO: write your solution here
}
`,tests:[{name:`Два фиксированных аргумента`,body:`const add = (a, b, c) => a + b + c;
return solution(add, 2, 3)(4);`,expected:9},{name:`Один фиксированный аргумент`,body:`const multiply = (a, b, c) => a * b * c;
return solution(multiply, 2)(3, 4);`,expected:24},{name:`Порядок аргументов сохраняется`,body:`const greet = (greeting, name) => greeting + ", " + name + "!";
return solution(greet, "Hello")("John");`,expected:`Hello, John!`},{name:`Без фиксированных аргументов`,body:`const add = (a, b) => a + b;
return solution(add)(1, 2);`,expected:3,hidden:!0},{name:`Частичная функция переиспользуется`,body:`const add = (a, b) => a + b;
const add10 = solution(add, 10);
return [add10(1), add10(2)];`,expected:[11,12],hidden:!0}]},{title:`Разбивка игроков по отрядам (Partition Players by Squad)`,difficulty:2,categories:[`Grouping`],languages:[`JavaScript`],functionName:`partitionPlayers`,description:{condition:"Дан массив объектов-игроков. У каждого игрока есть числовой идентификатор `id` и поле `squadId` — идентификатор отряда, которому он принадлежит. Если игрок не состоит ни в каком отряде, `squadId` равен `null`.\n\nНапишите функцию, которая разбивает массив на два подмассива и возвращает их в виде массива из двух элементов: первый — игроки с отрядом, второй — игроки без отряда.\n\nПорядок игроков внутри каждого подмассива должен соответствовать исходному порядку.",input:["`players` — массив объектов вида `{ id: number, squadId: number | null }`"],output:"Массив из двух массивов: `[playersWithSquad, playersWithoutSquad]`",constraints:["`0 <= players.length <= 10^4`","`id` — уникальное целое число","`squadId` — целое число или `null`"],example:`Вход:

[
  { id: 1, squadId: 10 },
  { id: 2, squadId: null },
  { id: 3, squadId: 10 },
  { id: 4, squadId: null }
]

Выход:

[
  [{ id: 1, squadId: 10 }, { id: 3, squadId: 10 }],
  [{ id: 2, squadId: null }, { id: 4, squadId: null }]
]`},starterCode:`// Доступно без импорта: встроенные методы JS

function partitionPlayers(players) {
  // TODO: напишите решение здесь
  return [[], []];
}
`,tests:[{name:`Игроки с отрядом и без`,args:[[{id:1,squadId:10},{id:2,squadId:null},{id:3,squadId:10},{id:4,squadId:null}]],expected:[[{id:1,squadId:10},{id:3,squadId:10}],[{id:2,squadId:null},{id:4,squadId:null}]]},{name:`Пустой массив`,args:[[]],expected:[[],[]]},{name:`Все без отряда`,args:[[{id:1,squadId:null}]],expected:[[],[{id:1,squadId:null}]]},{name:`squadId = 0 — это отряд`,args:[[{id:1,squadId:0}]],expected:[[{id:1,squadId:0}],[]],hidden:!0},{name:`Порядок внутри групп сохраняется`,args:[[{id:3,squadId:1},{id:1,squadId:1}]],expected:[[{id:3,squadId:1},{id:1,squadId:1}],[]],hidden:!0}]},{title:`Студенты, сдавшие курс (Passed Students)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`passedStudents`,description:{condition:'Дан словарь, где ключ — имя студента, значение — список строк вида `"x/y"`, где `x` — набранные баллы, `y` — максимальные баллы по предмету. Напишите функцию `passed_students`, которая возвращает список имён студентов, у которых процент набранных баллов по каждому предмету не ниже порогового значения `threshold` (в процентах).',input:['`students` — словарь, ключ — имя студента, значение — список оценок в формате `"x/y"`',"`threshold` — целое число от 0 до 100"],output:`Список строк — имена студентов, сдавших курс. Порядок — как в словаре.`,constraints:["`1 <= len(students) <= 1000`","`1 <= len(marks) <= 50` для каждого студента","`0 <= x <= y`, `y > 0`","`0 <= threshold <= 100`"],example:`Вход:
students = {
  "Alice": ["4/5", "4/5", "4/5"],
  "Bob":   ["2/5", "5/5", "5/5"],
  "Carol": ["5/5", "5/5", "5/5"]
}
threshold = 70

Выход: ["Alice", "Carol"]`},starterCode:`function passedStudents(students, threshold) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Один предмет ниже порога — студент не сдал`,args:[{Alice:[`4/5`,`4/5`,`4/5`],Bob:[`2/5`,`5/5`,`5/5`],Carol:[`5/5`,`5/5`,`5/5`]},70],expected:[`Alice`,`Carol`]},{name:`Порог 0 — сдали все`,args:[{A:[`0/5`]},0],expected:[`A`]},{name:`Пустой словарь`,args:[{},50],expected:[]},{name:`Ровно на пороге — сдал`,args:[{A:[`7/10`]},70],expected:[`A`],hidden:!0},{name:`Никто не сдал`,args:[{A:[`1/10`],B:[`2/10`]},50],expected:[],hidden:!0}]},{title:`Проверка пароля (Password Validator)`,difficulty:2,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`is_valid_password`,description:{condition:`Напишите функцию \`is_valid_password(password)\`, которая проверяет пароль по правилам:

Только английские буквы, цифры и \`_ . # %\`.

Минимум одна цифра.

Минимум один спецсимвол \`_ # %\`.

Длина не меньше 8.

Минимум одна заглавная буква.

Пароль не должен быть палиндромом.

Примеры ввода и ожидаемого вывода:`,input:[],output:``,constraints:[],example:`"Asdfghjk#2"      -> True
"Asdfghjk"        -> False
"Asdf#232#fdsA"   -> False
"aB1#"            -> False
"asdfghjk#1"      -> False
"Asdf gh#2"       -> False
"XyZ_123#A"       -> True`},starterCode:`function is_valid_password(password) {
    // TODO: напишите решение здесь
    return false;
}
`,tests:[{name:`Валидный пароль`,args:[`Asdfghjk#2`],expected:!0},{name:`Нет цифры и спецсимвола`,args:[`Asdfghjk`],expected:!1},{name:`Палиндром`,args:[`Asdf#232#fdsA`],expected:!1},{name:`Слишком короткий`,args:[`aB1#`],expected:!1,hidden:!0},{name:`Нет заглавной буквы`,args:[`asdfghjk#1`],expected:!1,hidden:!0},{name:`Недопустимый символ — пробел`,args:[`Asdf gh#2`],expected:!1,hidden:!0},{name:`Второй валидный пароль`,args:[`XyZ_123#A`],expected:!0,hidden:!0}]},{title:`Канонизация пути (Path Canonicalization)`,difficulty:3,categories:[`Strings`],languages:[`JavaScript`],functionName:`canonizePath`,description:{condition:"Напишите функцию `canonizePath`, которая принимает абсолютный путь в Unix-подобной операционной системе и преобразует его к канонической форме.\n\nПравила преобразования:\n\n`..` означает переход на один уровень выше в иерархии директорий\n\n`.` означает текущий уровень в иерархии директорий\n\nНесколько слэшей `//` подряд превращаются в один `/`\n\nПуть не должен оканчиваться слэшем (кроме корневого пути `/`)\n\nНельзя подняться выше корневой директории (лишние `..` игнорируются)",input:[],output:``,constraints:["Входной путь всегда абсолютный (начинается с `/`)",`Путь может содержать только буквы, цифры, точки, слэши`,`Длина пути не превышает 1000 символов`],example:`Вход: "/dir/subdir/../file.txt"
Выход: "/dir/file.txt"

Вход: "/dir/subdir/../../file.txt"
Выход: "/file.txt"

Вход: "/dir/subdir/../../../file.txt"
Выход: "/file.txt"

Вход: "/dir//file.txt"
Выход: "/dir/file.txt"

Вход: "/dir/"
Выход: "/dir"

Вход: "/dir/.."
Выход: "/"

Вход: "/"
Выход: "/"`},starterCode:`function canonizePath(path) {
    // TODO: write your solution here
    return "";
}
`,tests:[{name:`Один переход вверх`,args:[`/dir/subdir/../file.txt`],expected:`/dir/file.txt`},{name:`Два перехода вверх`,args:[`/dir/subdir/../../file.txt`],expected:`/file.txt`},{name:`Выше корня подняться нельзя`,args:[`/dir/subdir/../../../file.txt`],expected:`/file.txt`},{name:`Двойной слэш`,args:[`/dir//file.txt`],expected:`/dir/file.txt`,hidden:!0},{name:`Завершающий слэш убирается`,args:[`/dir/`],expected:`/dir`,hidden:!0},{name:`Возврат в корень`,args:[`/dir/..`],expected:`/`,hidden:!0},{name:`Корень`,args:[`/`],expected:`/`,hidden:!0},{name:`Точка — текущая директория`,args:[`/a/./b`],expected:`/a/b`,hidden:!0}]},{title:`Промис с внешним резолвером (Promise With Resolvers)`,difficulty:3,categories:[`Asynchronous`],languages:[`JavaScript`],functionName:`promiseWithResolve`,description:{condition:"Реализуйте функцию `promiseWithResolve`, которая возвращает объект с двумя полями: `promise` — новый промис, и `resolve` — функцию, вызов которой снаружи резолвит этот промис переданным значением. Это должно работать как аналог `Promise.withResolvers()` — резолвер должен быть доступен вне тела промиса.",input:[`Функция вызывается без аргументов.`],output:"Объект вида `{ resolve, promise }`, где:\n`promise` — Promise, который изначально находится в состоянии pending\n`resolve` — функция `(value) => void`, вызов которой переводит `promise` в состояние resolved с переданным значением",constraints:["`resolve` может быть вызван только один раз (повторные вызовы не должны менять результат)","Значение, переданное в `resolve`, может быть любого типа (число, строка, объект)","Если `resolve` не был вызван — промис остаётся pending (в тестах не проверяется)"],example:`Вход: (вызов без аргументов)
const { resolve, promise } = promiseWithResolve();
promise.then(v => console.log(v));
resolve(13);
// promise резолвится значением 13

Вход: resolve вызывается со строкой
resolve("done");
// promise резолвится значением "done"`},starterCode:`// Доступно без импорта: встроенные методы JS
function promiseWithResolve() {
  // TODO: напишите решение здесь
  return { resolve: () => {}, promise: Promise.resolve() };
}
`,tests:[{name:`Резолв снаружи`,body:`const { resolve, promise } = solution();
resolve(13);
return await promise;`,expected:13},{name:`Резолв строкой`,body:`const { resolve, promise } = solution();
resolve("done");
return await promise;`,expected:`done`},{name:`До вызова resolve промис висит`,body:`const { resolve, promise } = solution();
const marker = Symbol("pending");
const race = await Promise.race([promise, Promise.resolve(marker)]);
resolve(1);
return race === marker;`,expected:!0,hidden:!0},{name:`Пары независимы`,body:`const a = solution();
const b = solution();
a.resolve("a");
b.resolve("b");
return [await a.promise, await b.promise];`,expected:[`a`,`b`],hidden:!0}]},{title:`Обёртка callback-функции в Promise (Promisify Callback Function)`,difficulty:3,categories:[`Asynchronous`],languages:[`JavaScript`],functionName:`promisify`,description:{condition:"Дана функция `asyncFn`, принимающая единственный аргумент — `callback`. Сама `asyncFn` вызывает этот `callback` асинхронно (через микротаск, без реального ожидания по времени) с двумя аргументами: `err` и `data`. Если при выполнении произошла ошибка, `err` содержит её значение, а `data` — `undefined`. Если ошибки нет, `err` равен `null`, а `data` содержит результат.\n\nНужно реализовать функцию `promisify(asyncFn)`, которая возвращает новую функцию. При вызове эта новая функция должна вызвать `asyncFn`, передать ей колбэк, и вернуть `Promise`, который:\n\nрезолвится значением `data`, если ошибки не было;\n\nреджектится значением `err`, если ошибка произошла.",input:["`asyncFn` — функция вида `(callback) => void`, где `callback(err, data)` вызывается ровно один раз."],output:"функция, при вызове возвращающая `Promise`, который резолвится или реджектится в зависимости от поведения `asyncFn`.",constraints:["`asyncFn` вызывает `callback` ровно один раз (либо с ошибкой, либо с данными)","Реальные задержки (`setTimeout` с ожиданием) не используются — только микротаски, чтобы результат был детерминирован"],example:`Вход: asyncFn = (cb) => Promise.resolve().then(() => cb(null, 42))
Выход: promisify(asyncFn)() → resolve(42)

Вход: asyncFn = (cb) => Promise.resolve().then(() => cb("Ошибка сети"))
Выход: promisify(asyncFn)() → reject("Ошибка сети")`},starterCode:`// Доступно без импорта: встроенные методы JS

function promisify(asyncFn) {
  // TODO: напишите решение здесь
  return function() {
    return Promise.resolve();
  };
}
`,tests:[{name:`Успешный вызов резолвится данными`,body:`const asyncFn = (cb) => Promise.resolve().then(() => cb(null, 42));
return await solution(asyncFn)();`,expected:42},{name:`Ошибка приводит к реджекту`,body:`const asyncFn = (cb) => Promise.resolve().then(() => cb("Ошибка сети"));
try {
  await solution(asyncFn)();
  return "resolved";
} catch (e) {
  return e;
}`,expected:`Ошибка сети`},{name:`Функция вызывается при каждом обращении`,body:`let calls = 0;
const asyncFn = (cb) => { calls++; cb(null, calls); };
const wrapped = solution(asyncFn);
await wrapped();
await wrapped();
return calls;`,expected:2,hidden:!0},{name:`Резолв значением falsy`,body:`const asyncFn = (cb) => cb(null, 0);
return await solution(asyncFn)();`,expected:0,hidden:!0}]},{title:`Очередь с ограничением параллельности (Queue with Concurrency Limit)`,difficulty:3,categories:[`Queue`],languages:[`JavaScript`],functionName:`Queue`,description:{condition:"Реализуйте класс `Queue`, который выполняет задачи с ограничением на количество одновременно выполняемых.\n\nКонструктор принимает три аргумента:\n\n`processTask(task)` — функция обработки задачи, возвращает `Promise`;\n\n`parallel` — максимальное число одновременно выполняемых задач;\n\n`whenEmpty()` — колбэк, вызываемый один раз, когда очередь опустела и все запущенные задачи завершились.\n\n`add(task)` кладёт задачу в очередь, `loop()` запускает обработку.",input:["`processTask` — `(task) => Promise`","`parallel` — целое число `>= 1`","`whenEmpty` — функция без аргументов"],output:"Класс не возвращает значений напрямую — результат виден по порядку и параллельности вызовов `processTask` и по вызову `whenEmpty`",constraints:["Одновременно выполняется не больше `parallel` задач",`Задачи берутся из очереди в порядке добавления`,"`whenEmpty` вызывается ровно один раз после завершения всех задач"],example:`const queue = new Queue(
  (task) => new Promise((r) => setTimeout(() => r(task), 10)),
  2,
  () => console.log('готово')
);

queue.add(1);
queue.add(2);
queue.add(3);
queue.loop(); // не более двух задач одновременно`},starterCode:`class Queue {
    constructor(processTask, parallel, whenEmpty) {
        // TODO: initialize
    }

    add(task) {
        // TODO: add task to queue
    }

    loop() {
        // TODO: start processing
    }
}
`,tests:[{name:`Одновременно не больше parallel задач`,body:`let running = 0;
let peak = 0;
const process = () => new Promise((r) => {
  running++;
  peak = Math.max(peak, running);
  setTimeout(() => { running--; r(); }, 10);
});
await new Promise((done) => {
  const q = new solution(process, 2, done);
  for (let i = 0; i < 5; i++) q.add(i);
  q.loop();
});
return peak;`,expected:2},{name:`Все задачи обработаны в порядке добавления`,body:`const seen = [];
const process = (task) => new Promise((r) => { seen.push(task); setTimeout(r, 5); });
await new Promise((done) => {
  const q = new solution(process, 1, done);
  q.add("a"); q.add("b"); q.add("c");
  q.loop();
});
return seen;`,expected:[`a`,`b`,`c`]},{name:`whenEmpty вызывается ровно один раз`,body:`let calls = 0;
await new Promise((done) => {
  const q = new solution(() => Promise.resolve(), 2, () => { calls++; done(); });
  q.add(1); q.add(2);
  q.loop();
});
await new Promise((r) => setTimeout(r, 30));
return calls;`,expected:1,hidden:!0},{name:`Пустая очередь сразу сообщает о завершении`,body:`return await new Promise((done) => {
  const q = new solution(() => Promise.resolve(), 2, () => done("empty"));
  q.loop();
});`,expected:`empty`,hidden:!0}]},{title:`Сворачивание диапазонов (Range Compression)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`createRanges`,description:{condition:'Напишите функцию `createRanges`, которая принимает массив уникальных целых чисел и возвращает строку, представляющую свернутые диапазоны. Соседние числа (отличающиеся на 1) должны быть объединены в диапазоны формата "начало-конец". Числа, не имеющие соседей, выводятся как отдельные значения. Порядок вывода должен соответствовать возрастанию чисел.',input:[],output:``,constraints:[`Массив содержит только уникальные целые числа`,`Массив может быть пустым (тогда вернуть пустую строку)`,`Числа могут быть отрицательными`,`Порядок в выходной строке должен соответствовать возрастанию чисел`],example:`Вход: [1, 4, 5, 2, 3, 9, 8, 11, 0]
Выход: "0-5,8-9,11"

Вход: [1, 4, 3, 2]
Выход: "1-4"

Вход: [1, 4]
Выход: "1,4"

Вход: [5]
Выход: "5"`},starterCode:`function createRanges(arr) {
    // TODO: write your solution here
    return "";
}
`,tests:[{name:`Несколько диапазонов`,args:[[1,4,5,2,3,9,8,11,0]],expected:`0-5,8-9,11`},{name:`Один диапазон из перемешанных чисел`,args:[[1,4,3,2]],expected:`1-4`},{name:`Соседей нет`,args:[[1,4]],expected:`1,4`},{name:`Одно число`,args:[[5]],expected:`5`,hidden:!0},{name:`Пустой массив`,args:[[]],expected:``,hidden:!0},{name:`Отрицательные числа`,args:[[-3,-2,5]],expected:`-3--2,5`,hidden:!0}]},{title:`Удаление дубликатов из массива (Remove Duplicates)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`removeDuplicate`,description:{condition:`Напишите функцию \`removeDuplicate\`, которая принимает массив со строками и возвращает новый массив с теми же строками, в том же порядке, из которого удалены все дубликаты. Set и Map использовать запрещено.

Правила:

Сохраняется порядок первого вхождения элементов

Удаляются все последующие вхождения

Set и Map использовать нельзя

Исходный массив не должен изменяться`,input:[],output:``,constraints:[`Длина массива: 0 ≤ N ≤ 1000`,`Элементы: строки`,`Время выполнения: O(N²) (без Set/Map)`,`Память: O(N)`],example:`removeDuplicate([
    'string', '3', '0', 'string', 'string',
    'number', 'number', '3', 'constructor', '0'
])
// -> ['string', '3', '0', 'number', 'constructor']

removeDuplicate(['a', 'b', 'c', 'a', 'b'])
// -> ['a', 'b', 'c']

removeDuplicate(['x', 'x', 'x'])
// -> ['x']

removeDuplicate([])
// -> []`},starterCode:`function removeDuplicate(arr) {
    // TODO: write your solution here
    return [];
}
`,tests:[{name:`Строки, в том числе 'constructor'`,args:[[`string`,`3`,`0`,`string`,`string`,`number`,`number`,`3`,`constructor`,`0`]],expected:[`string`,`3`,`0`,`number`,`constructor`]},{name:`Простые дубликаты`,args:[[`a`,`b`,`c`,`a`,`b`]],expected:[`a`,`b`,`c`]},{name:`Все элементы одинаковые`,args:[[`x`,`x`,`x`]],expected:[`x`]},{name:`Пустой массив`,args:[[]],expected:[],hidden:!0},{name:`Исходный массив не изменяется`,body:`const source = ["a", "a"];
solution(source);
return source;`,expected:[`a`,`a`],hidden:!0}]},{title:`Удаление смайликов из строки (Remove Emoticons)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`deleteP`,description:{condition:"Дана строка, в которой могут встречаться смайлики вида `:-` с последующей серией одинаковых символов `)` или `(` (например, `:-)`, `:-)))`, `:-(((`). Напишите функцию, которая удаляет из строки все такие смайлики целиком (последовательность `:-` и все идущие сразу за ней одинаковые символы `)` или `(`), а остальные символы строки оставляет без изменений.",input:["строка `str`, содержащая произвольные символы, среди которых могут встречаться смайлики указанного вида."],output:`строка с удалёнными смайликами.`,constraints:["`0 <= str.length <= 10^4`","смайлик состоит из `:-`, за которым следует один или более одинаковых символов `)` либо `(`","символы `)` или `(`, не идущие сразу после `:-`, смайликом не считаются и остаются в строке"],example:`Вход: "ab :-)"     → Выход: "ab "
Вход: "ab :-)))"   → Выход: "ab "
Вход: "ab :-)))("  → Выход: "ab ("
Вход: "ab ):-)"    → Выход: "ab )"
Вход: ":-)"        → Выход: ""`},starterCode:`// Доступно без импорта: встроенные методы JS

function deleteP(str) {
  // TODO: напишите решение здесь
  return '';
}
`,tests:[{name:`Один смайлик`,args:[`ab :-)`],expected:`ab `},{name:`Длинный смайлик`,args:[`ab :-)))`],expected:`ab `},{name:`Скобка другого типа остаётся`,args:[`ab :-)))(`],expected:`ab (`},{name:`Скобка перед смайликом`,args:[`ab ):-)`],expected:`ab )`,hidden:!0},{name:`Вся строка — смайлик`,args:[`:-)`],expected:``,hidden:!0},{name:`Смайликов нет`,args:[`hello`],expected:`hello`,hidden:!0}]},{title:`Удаление falsy значений из объекта или массива (Remove Falsy Values)`,difficulty:3,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`filterFalsy`,description:{condition:'Напишите функцию `filterFalsy(obj)`, которая принимает объект или массив и возвращает новый объект или массив с удалёнными всеми falsy значениями.\n\nFalsy значения — это такие значения `value`, для которых `Boolean(value) === false`. К ним относятся:\n\n`false`\n\n`0`\n\n`""` (пустая строка)\n\n`null`\n\n`undefined`\n\n`NaN`\n\nЕсли значение является массивом или объектом, функция должна рекурсивно фильтровать их элементы или свойства. Пустые массивы и объекты остаются, если после фильтрации внутри них есть хотя бы одно truthy значение.',input:[],output:``,constraints:["Входной объект — результат `JSON.parse`, то есть plain object или array.",`Входные данные могут содержать вложенные объекты и массивы.`,`Не использовать сторонние библиотеки.`,`Максимальная глубина вложенности ≤ 20.`,`Время выполнения: O(n), где n — общее количество элементов и свойств.`],example:`filterFalsy([null, 0, false, 1])
-> [1]

filterFalsy({
    "a": null,
    "b": [false, 1]
})
-> { "b": [1] }

filterFalsy([null, 0, 5, [0], false, [6]])
-> [5, [6]]`},starterCode:`function filterFalsy(obj) {
    // TODO: напишите решение здесь
    return obj;
}
`,tests:[{name:`Плоский массив`,args:[[null,0,!1,1]],expected:[1]},{name:`Вложенный массив внутри объекта`,args:[{a:null,b:[!1,1]}],expected:{b:[1]}},{name:`Пустой после фильтрации массив удаляется`,args:[[null,0,5,[0],!1,[6]]],expected:[5,[6]]},{name:`Глубокая вложенность`,args:[{a:{b:{c:0,d:7}}}],expected:{a:{b:{d:7}}},hidden:!0},{name:`Всё falsy — пустой результат`,args:[{a:0,b:``,c:null}],expected:{},hidden:!0}]},{title:`Удаление столбцов с положительными элементами (Remove Positive Columns)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`removePositiveColumns`,description:{condition:`Напишите функцию \`removePositiveColumns\`, которая принимает двумерный массив (матрицу), содержащую как положительные, так и отрицательные элементы. Функция должна вернуть новую матрицу, из которой удалены все столбцы, содержащие только положительные элементы.

Столбец удаляется, если каждый элемент в этом столбце больше нуля. Если в столбце есть хотя бы один отрицательный элемент или ноль, столбец сохраняется.`,input:[],output:``,constraints:[`Матрица может быть любого размера (не обязательно квадратная)`,`Элементы — целые числа`,`Если все столбцы удалены, вернуть пустой массив`,`Исходная матрица не должна изменяться`],example:`Вход: [
  [2, 55, 8, 10],
  [-1, 4, -9, 1],
  [2, 4, -3, 50],
  [7, 9, 7, 108]
]
Выход: [
  [2, 8],
  [-1, -9],
  [2, -3],
  [7, 7]
]
Пояснение: Удален второй столбец (55, 4, 4, 9) - все положительные

Вход: [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
Выход: []
Пояснение: Все столбцы содержат только положительные числа

Вход: [
  [-1, -2, -3],
  [-4, -5, -6]
]
Выход: [
  [-1, -2, -3],
  [-4, -5, -6]
]
Пояснение: Нет положительных чисел, все столбцы сохраняются

Вход: [
  [0, 1, 2],
  [0, 3, 4]
]
Выход: [
  [0, 1, 2],
  [0, 3, 4]
]
Пояснение: Ноль не является положительным числом`},starterCode:`function removePositiveColumns(matrix) {
    // TODO: write your solution here
    return [];
}
`,tests:[{name:`Удаляются два столбца`,args:[[[2,55,8,10],[-1,4,-9,1],[2,4,-3,50],[7,9,7,108]]],expected:[[2,8],[-1,-9],[2,-3],[7,7]]},{name:`Все столбцы положительные`,args:[[[1,2,3],[4,5,6],[7,8,9]]],expected:[]},{name:`Положительных столбцов нет`,args:[[[-1,-2,-3],[-4,-5,-6]]],expected:[[-1,-2,-3],[-4,-5,-6]]},{name:`Ноль сохраняет столбец`,args:[[[0,1],[5,2]]],expected:[[0],[5]],hidden:!0},{name:`Пустая матрица`,args:[[]],expected:[],hidden:!0}]},{title:`Удаление нулей из массива (Remove Zeros)`,difficulty:1,categories:[`Arrays`],languages:[`JavaScript`],functionName:`removeZeros`,description:{condition:`Дан массив целых чисел. Напишите функцию, которая возвращает новый массив, содержащий все элементы исходного массива, кроме нулей, с сохранением порядка оставшихся элементов.`,input:["`nums` — массив целых чисел (длина от 0 до 10⁴)."],output:`Новый массив целых чисел без нулей, порядок элементов сохранён.`,constraints:["`0 <= nums.length <= 10000`","`-10^6 <= nums[i] <= 10^6`"],example:`Вход: []
Выход: []

Вход: [0]
Выход: []

Вход: [1, 0, 0, 2]
Выход: [1, 2]`},starterCode:`// Доступно без импорта: встроенные методы JS

function removeZeros(nums) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Пустой массив`,args:[[]],expected:[]},{name:`Только ноль`,args:[[0]],expected:[]},{name:`Нули в середине`,args:[[1,0,0,2]],expected:[1,2]},{name:`Нулей нет`,args:[[3,-1]],expected:[3,-1],hidden:!0},{name:`Отрицательный ноль тоже удаляется`,args:[[0,4]],expected:[4],hidden:!0}]},{title:`Замена элементов в массиве (Replace Items in Array)`,difficulty:1,categories:[`Arrays`],languages:[`JavaScript`],functionName:`replaceItems`,description:{condition:"Напишите функцию, которая принимает на вход массив `arr`, элемент `item` и элемент `replaceItem`. Функция должна создать новый массив, в котором все элементы, равные `item`, заменены на `replaceItem`. Исходный массив должен остаться неизменным.",input:[],output:``,constraints:["Массив `arr` может содержать элементы любых типов (числа, строки, булевы значения, `null`, `undefined`, вложенные массивы или объекты).",`Сравнение элементов должно быть строгим (по значению и типу, где это применимо). Для объектов и массивов сравнение должно быть по ссылке (т.е. они считаются равными, только если это один и тот же объект в памяти). Однако, для простоты данной задачи, можно считать, что массив состоит из примитивов.`,`Функция должна возвращать новый массив.`,`Исходный массив не должен быть изменен.`],example:`replaceItems([1, 2, 3, 4, 2], 2, 'a')          // [1, 'a', 3, 4, 'a']
replaceItems(['apple', 'banana', 'apple'], 'apple', 'orange') // ['orange', 'banana', 'orange']
replaceItems([true, false, true], true, 1)    // [1, false, 1]
replaceItems([], 5, 10)                        // []`},starterCode:`function replaceItems(arr, item, replaceItem) {
    // TODO: напишите решение здесь
    return [];
}
`,tests:[{name:`Числа заменяются строкой`,args:[[1,2,3,4,2],2,`a`],expected:[1,`a`,3,4,`a`]},{name:`Строки`,args:[[`apple`,`banana`,`apple`],`apple`,`orange`],expected:[`orange`,`banana`,`orange`]},{name:`Булевы значения`,args:[[!0,!1,!0],!0,1],expected:[1,!1,1]},{name:`Пустой массив`,args:[[],5,10],expected:[],hidden:!0},{name:`Строгое сравнение: 0 не равно false`,args:[[0,!1],0,`zero`],expected:[`zero`,!1],hidden:!0}]},{title:`Замена элементов в массиве (Replace Items)`,difficulty:1,categories:[`Arrays`],languages:[`JavaScript`],functionName:`replaceItems`,description:{condition:"Напишите функцию `replaceItems`, которая принимает массив `arr`, значение `item` для поиска и значение `replaceItem` для замены. Функция должна возвращать новый массив, в котором все вхождения `item` заменены на `replaceItem`. Исходный массив не должен изменяться.\n\nПравила:\n\nСравнение элементов должно быть строгим (=== в JS, == в Python, equals в Java)\n\nЕсли элемент не найден, массив возвращается без изменений\n\nИсходный массив не мутируется\n\nВозвращается новый массив",input:[],output:``,constraints:[`Длина массива: 0 ≤ N ≤ 1000`,`Элементы могут быть любого типа (числа, строки, булевы значения)`,`Время выполнения: O(N)`,`Память: O(N)`],example:`replaceItems([1, 2, 3, 4, 2], 2, 'a')  // -> [1, 'a', 3, 4, 'a']
replaceItems([1, 2, 3, 4, 5], 6, 'x')   // -> [1, 2, 3, 4, 5]
replaceItems([], 1, 'a')                // -> []
replaceItems(['a', 'b', 'c'], 'b', 'z') // -> ['a', 'z', 'c']`},starterCode:`function replaceItems(arr, item, replaceItem) {
    // TODO: write your solution here
    return [];
}
`,tests:[{name:`Замена числа`,args:[[1,2,3,4,2],2,`a`],expected:[1,`a`,3,4,`a`]},{name:`Элемент не найден`,args:[[1,2,3,4,5],6,`x`],expected:[1,2,3,4,5]},{name:`Пустой массив`,args:[[],1,`a`],expected:[]},{name:`Замена строки`,args:[[`a`,`b`,`c`],`b`,`z`],expected:[`a`,`z`,`c`],hidden:!0},{name:`Исходный массив не мутируется`,body:`const source = [1, 2, 3];
solution(source, 2, "x");
return source;`,expected:[1,2,3],hidden:!0}]},{title:`Замена подстроки в строке (Replace Substring)`,difficulty:1,categories:[`Strings`],languages:[`JavaScript`],functionName:`replaceSubstring`,description:{condition:"Напишите функцию `replaceSubstring`, которая принимает строку, подстроку для поиска и подстроку для замены. Функция должна возвращать новую строку, где все вхождения искомой подстроки заменены на подстроку для замены. Замена должна быть чувствительна к регистру.",input:[],output:``,constraints:[`Строка может быть пустой (тогда возвращается пустая строка)`,`Поиск и замена чувствительны к регистру`,`Если искомая подстрока не найдена, возвращается исходная строка`,`Подстроки могут быть любой длины`],example:`Вход: ("hello world", "world", "there")
Выход: "hello there"

Вход: ("abc abc abc", "abc", "123")
Выход: "123 123 123"

Вход: ("Hello hello", "hello", "hi")
Выход: "Hello hi"

Вход: ("programming", "xyz", "123")
Выход: "programming"`},starterCode:`function replaceSubstring(str, search, replace) {
    // TODO: write your solution here
    return str;
}
`,tests:[{name:`Одно вхождение`,args:[`hello world`,`world`,`there`],expected:`hello there`},{name:`Три вхождения`,args:[`abc abc abc`,`abc`,`123`],expected:`123 123 123`},{name:`Регистр учитывается`,args:[`Hello hello`,`hello`,`hi`],expected:`Hello hi`},{name:`Подстрока не найдена`,args:[`programming`,`xyz`,`123`],expected:`programming`,hidden:!0},{name:`Замена на пустую строку`,args:[`a-b-c`,`-`,``],expected:`abc`,hidden:!0}]},{title:`Кэширование одинаковых запросов (Request Cache)`,difficulty:3,categories:[`Caching`],languages:[`JavaScript`],functionName:`processRequests`,description:{condition:`Дан массив запросов. Каждый запрос представлен строкой.

Нужно обработать запросы по порядку и определить, был ли такой запрос уже выполнен раньше.

Если запрос встречается впервые, он считается новым и добавляется в кэш.
Если такой же запрос уже был раньше, он считается полученным из кэша.

Функция должна вернуть массив строк такой же длины:

\`"new"\` — если запрос встретился впервые;

\`"cached"\` — если запрос уже был в кэше.`,input:["Массив строк `requests`."],output:'Массив строк `"new"` и `"cached"`.',constraints:[`1 ≤ requests.length ≤ 100000`,`0 ≤ requests[i].length ≤ 100`],example:`Вход:

["/users?id=1", "/posts", "/users?id=1", "/users?id=2", "/posts"]

Выход:

["new", "new", "cached", "new", "cached"]`},starterCode:`function processRequests(requests) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Повторы через несколько запросов`,args:[[`/users?id=1`,`/posts`,`/users?id=1`,`/users?id=2`,`/posts`]],expected:[`new`,`new`,`cached`,`new`,`cached`]},{name:`Все запросы уникальны`,args:[[`/a`,`/b`]],expected:[`new`,`new`]},{name:`Пустой массив`,args:[[]],expected:[]},{name:`Один и тот же запрос трижды`,args:[[`/a`,`/a`,`/a`]],expected:[`new`,`cached`,`cached`],hidden:!0}]},{title:`Восстановление строки по индексам (Restore String)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`restoreString`,description:{condition:"Напишите функцию `restoreString`, которая принимает строку `str` и массив чисел `arr` — перестановку индексов от `0` до `n-1`.\n\nБуква `str[i]` должна встать на позицию `arr[i]` в новой строке. Функция возвращает получившуюся строку.",input:["`str` — строка длины `n`","`arr` — перестановка чисел от `0` до `n-1`"],output:`Строка той же длины с переставленными буквами`,constraints:[`Длина строки равна длине массива`,"`arr` содержит каждый индекс ровно один раз"],example:`restoreString("house", [4, 1, 0, 3, 2])  // -> "uoesh"
// 'h' → позиция 4, 'o' → 1, 'u' → 0, 's' → 3, 'e' → 2

restoreString("steal", [1, 4, 3, 2, 0])  // -> "lsaet"`},starterCode:`function restoreString(str, arr) {
    // TODO: write your solution here
    return "";
}
`,tests:[{name:`"house"`,args:[`house`,[4,1,0,3,2]],expected:`uoesh`},{name:`"steal"`,args:[`steal`,[1,4,3,2,0]],expected:`lsaet`},{name:`Один символ`,args:[`a`,[0]],expected:`a`},{name:`Тождественная перестановка`,args:[`abc`,[0,1,2]],expected:`abc`,hidden:!0},{name:`Разворот строки`,args:[`abcd`,[3,2,1,0]],expected:`dcba`,hidden:!0}]},{title:`Повтор промиса с задержкой (Retry Promise)`,difficulty:3,categories:[`Asynchronous`],languages:[`JavaScript`],functionName:`retryPromise`,description:{condition:"Напишите функцию `retryPromise(fn, retries, delay)`, которая принимает:\n\n`fn` — функцию без аргументов, возвращающую Promise\n\n`retries` — количество дополнительных попыток при неудаче (не считая первой)\n\n`delay` — задержка в миллисекундах между попытками\n\nФункция должна вызывать `fn`. Если Promise разрешается — вернуть его результат. Если отклоняется — подождать `delay` миллисекунд и повторить вызов. Если все попытки исчерпаны, отклонить с последней ошибкой.",input:["`fn`: `() => Promise<any>`","`retries`: целое число `>= 0`","`delay`: число в миллисекундах `>= 0`"],output:"Promise, который разрешается значением первого успешного вызова `fn` или отклоняется с ошибкой последней попытки.",constraints:["`0 <= retries <= 10`","`0 <= delay <= 5000`","`fn` всегда возвращает Promise"],example:`Вход: fn — функция, которая падает 2 раза, потом успешно возвращает 42; retries = 3, delay = 100
Выход: Promise resolves → 42

Вход: fn — функция, которая всегда падает с ошибкой "fail"; retries = 2, delay = 50
Выход: Promise rejects → "fail"`},starterCode:`// Доступно без импорта: встроенные методы JS
function retryPromise(fn, retries, delay) {
  // TODO: напишите решение здесь
  return Promise.resolve();
}
`,tests:[{name:`Успех после двух падений`,body:`let calls = 0;
const fn = () => { calls++; return calls < 3 ? Promise.reject("fail") : Promise.resolve(42); };
const value = await solution(fn, 3, 5);
return [value, calls];`,expected:[42,3]},{name:`Все попытки исчерпаны`,body:`let calls = 0;
const fn = () => { calls++; return Promise.reject("fail"); };
try {
  await solution(fn, 2, 5);
  return "resolved";
} catch (e) {
  return [e, calls];
}`,expected:[`fail`,3]},{name:`Успех с первой попытки — повторов нет`,body:`let calls = 0;
const fn = () => { calls++; return Promise.resolve("ok"); };
const value = await solution(fn, 3, 5);
return [value, calls];`,expected:[`ok`,1]},{name:`retries = 0 — ровно одна попытка`,body:`let calls = 0;
const fn = () => { calls++; return Promise.reject("nope"); };
try {
  await solution(fn, 0, 5);
  return "resolved";
} catch (e) {
  return [e, calls];
}`,expected:[`nope`,1],hidden:!0},{name:`Между попытками есть задержка`,body:`let calls = 0;
const fn = () => { calls++; return calls < 2 ? Promise.reject("x") : Promise.resolve("ok"); };
const start = Date.now();
await solution(fn, 2, 40);
return Date.now() - start >= 30;`,expected:!0,hidden:!0}]},{title:`Обратный словарь (Reverse Dictionary)`,difficulty:1,categories:[`Data structures`],languages:[`JavaScript`],functionName:`reverseKeyValue`,description:{condition:"Напишите функцию `reverseKeyValue(dictionary)`, которая принимает словарь и возвращает новый словарь, где каждое значение исходного словаря становится ключом, а исходный ключ — значением.",input:[],output:``,constraints:[],example:`data = {1: 2, 3: 2, 's': 'b'}
reverse_key_value(data)  # -> {2: 3, 'b': 's'}

Замечания:

Если несколько ключей имеют одно и то же значение, новый словарь оставляет последнее совпадение.

Все ключи и значения в исходном словаре могут быть любых типов, поддерживаемых в качестве ключей словаря в языке.`},starterCode:`function reverseKeyValue(dict) {
    // TODO: напишите решение здесь
    return {};
}
`,tests:[{name:`Одинаковые значения — побеждает последнее`,args:[{1:2,3:2,s:`b`}],expected:{2:`3`,b:`s`}},{name:`Пустой словарь`,args:[{}],expected:{}},{name:`Один ключ`,args:[{a:`b`}],expected:{b:`a`}},{name:`Все значения уникальны`,args:[{x:1,y:2}],expected:{1:`x`,2:`y`},hidden:!0}]},{title:`Обратная польская нотация (Reverse Polish Notation)`,difficulty:2,categories:[`Stack`],languages:[`JavaScript`],functionName:`evaluateRPN`,description:{condition:`Дана строка \`expression\`, содержащая математическое выражение в обратной польской нотации.

В выражении числа и операторы разделены пробелами.
Необходимо вычислить значение выражения и вернуть результат.

Поддерживаются операторы:

\`+\` — сложение

\`-\` — вычитание

\`*\` — умножение

\`/\` — деление

В обратной польской нотации оператор записывается после двух операндов.

Например:

Сначала вычисляется:

Затем:`,input:["Строка `expression` — математическое выражение в обратной польской нотации."],output:`Число — результат вычисления выражения.`,constraints:[`1 <= expression.length <= 10_000`,`Числа могут быть целыми или дробными`,`Операторы: +, -, *, /`,`Выражение всегда корректное`,`Деления на 0 нет`],example:`5 8 3 + *

8 + 3 = 11

5 * 11 = 55

Вход:

"5 8 3 + *"

Выход:

55`},starterCode:`function evaluateRPN(expression) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`"5 8 3 + *"`,args:[`5 8 3 + *`],expected:55},{name:`Вычитание`,args:[`10 4 -`],expected:6},{name:`Деление`,args:[`20 4 /`],expected:5},{name:`Одно число`,args:[`7`],expected:7,hidden:!0},{name:`Отрицательные числа`,args:[`-3 5 +`],expected:2,hidden:!0},{name:`Вложенные операции`,args:[`2 3 + 4 5 + *`],expected:45,hidden:!0}]},{title:`Переворот строки на месте (Reverse String In-Place)`,difficulty:1,categories:[`Arrays`],languages:[`JavaScript`],functionName:`reverseString`,description:{condition:"Напишите функцию `reverse_string(s)`, которая переворачивает входной массив символов `s` на месте без использования дополнительной памяти (O(1) extra space).\n\nПримеры ввода и ожидаемого вывода:",input:[],output:``,constraints:["Массив `s` может содержать только английские буквы.",`1 ≤ len(s) ≤ 10^5`,`Нельзя использовать дополнительный массив для хранения результата.`],example:`Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]`},starterCode:`function reverseString(s) {
    // TODO: перевернуть массив s на месте
}
`,tests:[{name:`["h","e","l","l","o"]`,body:`const s = ["h", "e", "l", "l", "o"];
solution(s);
return s;`,expected:[`o`,`l`,`l`,`e`,`h`]},{name:`Чётная длина с регистром`,body:`const s = ["H", "a", "n", "n", "a", "h"];
solution(s);
return s;`,expected:[`h`,`a`,`n`,`n`,`a`,`H`]},{name:`Пустой массив`,body:`const s = [];
solution(s);
return s;`,expected:[]},{name:`Один символ`,body:`const s = ["x"];
solution(s);
return s;`,expected:[`x`],hidden:!0},{name:`Новый массив не создаётся`,body:`const s = ["a", "b"];
const same = s;
solution(s);
return [same === s, s];`,expected:[!0,[`b`,`a`]],hidden:!0}]},{title:`Обращение строки или массива (Reverse)`,difficulty:1,categories:[`Strings`],languages:[`JavaScript`],functionName:`reverse`,description:{condition:`Напишите функцию \`reverse\`, которая:

Принимает строку или массив строк/чисел.

Возвращает перевёрнутую версию входных данных.

Не должна мутировать (изменять) исходный массив.`,input:[],output:``,constraints:[`Исходные данные не должны изменяться.`,`Для строки возвращается строка, для массива — новый массив.`,`Массив может содержать строки или числа (в рамках одной задачи — однотипные элементы).`,`Если вход — пустой массив или пустая строка, возвращается пустой массив или пустая строка соответственно.`],example:`Вход: "abcd"
Выход: "dcba"

Вход: ["a", "b", "c"]
Выход: ["c", "b", "a"]

Вход: [1, 2, 3, 4, 5]
Выход: [5, 4, 3, 2, 1]

Вход: []
Выход: []`},starterCode:`function reverse(input) {
    // TODO: write your solution here
    return input;
}
`,tests:[{name:`Строка`,args:[`abcd`],expected:`dcba`},{name:`Массив строк`,args:[[`a`,`b`,`c`]],expected:[`c`,`b`,`a`]},{name:`Массив чисел`,args:[[1,2,3,4,5]],expected:[5,4,3,2,1]},{name:`Пустой массив`,args:[[]],expected:[],hidden:!0},{name:`Исходный массив не мутируется`,body:`const source = [1, 2, 3];
solution(source);
return source;`,expected:[1,2,3],hidden:!0}]},{title:`Сжатие строки (Run-Length Encoding)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`compress`,description:{condition:"Напишите функцию `compress`, которая выполняет сжатие строки с помощью алгоритма RLE (Run-Length Encoding). Алгоритм заменяет последовательности одинаковых символов на сам символ и количество его повторений. Если символ встречается один раз, он остаётся без изменений (без цифры 1).",input:[],output:``,constraints:[`Строка содержит только заглавные буквы латинского алфавита (A-Z)`,`Длина строки не превышает 1000 символов`,`Если строка пустая, возвращается пустая строка`,`Не использовать встроенные функции сжатия`],example:`Вход: "AAAABBCCDDAAB"
Выход: "A4B2C2D2A2B"
Пояснение: AAAA → A4, BB → B2, CC → C2, DD → D2, AA → A2, B → B

Вход: "ABCD"
Выход: "ABCD"
Пояснение: Все символы уникальны, остаются без изменений

Вход: "AAA"
Выход: "A3"
Пояснение: Три A подряд → A3

Вход: ""
Выход: ""`},starterCode:`function compress(str) {
    // TODO: write your solution here
    return "";
}
`,tests:[{name:`"AAAABBCCDDAAB"`,args:[`AAAABBCCDDAAB`],expected:`A4B2C2D2A2B`},{name:`Все символы уникальны`,args:[`ABCD`],expected:`ABCD`},{name:`"AAA"`,args:[`AAA`],expected:`A3`},{name:`Пустая строка`,args:[``],expected:``,hidden:!0},{name:`Один символ`,args:[`Z`],expected:`Z`,hidden:!0},{name:`Возврат к прежней букве`,args:[`aabaa`],expected:`a2ba2`,hidden:!0}]},{title:`Функция runOnce (Run Once)`,difficulty:1,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`runOnce`,description:{condition:"Реализуйте функцию-обёртку `runOnce(fn)`. Эта функция принимает другую функцию `fn` в качестве аргумента и возвращает новую функцию. Возвращенная функция может быть вызвана только один раз. При первом вызове она выполняет исходную функцию `fn` с переданными аргументами и возвращает её результат. Все последующие попытки вызова возвращенной функции должны возвращать `undefined`, независимо от переданных аргументов. Исходная функция `fn` может принимать любое количество аргументов и возвращать любое значение.\n\nПримеры использования:",input:[],output:``,constraints:[],example:`const logHello = () => {
  console.log('hello!');
};
const logHelloOnce = runOnce(logHello);

logHelloOnce(); // Должно вывести "hello!" в консоль
logHelloOnce(); // Должно вернуть undefined, ничего не выводя в консоль

const add = (a, b) => a + b;
const addOnce = runOnce(add);

console.log(addOnce(5, 3)); // Должно вывести 8
console.log(addOnce(10, 2)); // Должно вывести undefined`},starterCode:`function runOnce(fn) {
    // TODO: write your solution here
}
`,tests:[{name:`Второй вызов возвращает undefined`,body:`const add = (a, b) => a + b;
const once = solution(add);
return [once(5, 3), once(10, 2)];`,expected:[8,void 0]},{name:`Исходная функция вызывается один раз`,body:`let calls = 0;
const once = solution(() => { calls++; });
once(); once(); once();
return calls;`,expected:1},{name:`Обёртки независимы`,body:`const fn = (x) => x;
const a = solution(fn);
const b = solution(fn);
a(1);
return [a(2), b(3)];`,expected:[void 0,3],hidden:!0},{name:`Функция без аргументов`,body:`const once = solution(() => "hello!");
return [once(), once()];`,expected:[`hello!`,void 0],hidden:!0}]},{title:`Позиция стрелки на диске сейфа (Safe Dial Final Position)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`safeDialPosition`,description:{condition:`Механический сейф оснащён круглым барабаном с делениями от 0 до 99. Стрелка изначально указывает на положение 50. Поворот барабана задаётся целым числом: положительное число означает вращение по часовой стрелке на соответствующее количество делений, отрицательное — против часовой стрелки. При выходе за пределы 0 или 99 отсчёт продолжается по кругу (циклически). Дан массив целых чисел, представляющих последовательные повороты барабана. Нужно определить итоговое положение стрелки после выполнения всех поворотов по порядку.`,input:["массив целых чисел `moves` (повороты, каждое может быть положительным, отрицательным или нулём)"],output:`целое число — финальная позиция стрелки (от 0 до 99)`,constraints:["`0 <= moves.length <= 1000`","`-1000 <= moves[i] <= 1000`",`начальная позиция всегда 50`],example:"Вход: `[10, -5, 3]`\nВыход: `58` (50 → 60 → 55 → 58)"},starterCode:`// Доступно без импорта: встроенные методы JS

function safeDialPosition(moves) {
  // TODO: напишите решение здесь
  return 50;
}
`,tests:[{name:`[10, -5, 3]`,args:[[10,-5,3]],expected:58},{name:`Без поворотов`,args:[[]],expected:50},{name:`Полный круг`,args:[[100]],expected:50},{name:`Переход через 0 против часовой`,args:[[-60]],expected:90,hidden:!0},{name:`Переход через 99 по часовой`,args:[[60]],expected:10,hidden:!0},{name:`Несколько кругов`,args:[[250,-50]],expected:50,hidden:!0}]},{title:`Количество пересечений нуля на диске сейфа (Safe Dial Zero Crossings)`,difficulty:3,categories:[`Arrays`],languages:[`JavaScript`],functionName:`safeDialZeroCrossings`,description:{condition:"Модификация задачи про сейф: барабан имеет деления от 0 до 99, стрелка изначально указывает на 50. Дан массив целых чисел `moves` — последовательные повороты барабана (положительное число — по часовой стрелке, отрицательное — против часовой стрелки, циклически в пределах 0–99). Вместо итоговой позиции нужно посчитать, сколько раз за все повороты стрелка пересекла границу между делениями 99 и 0 (в любом направлении). Если один поворот охватывает несколько полных кругов, каждое пересечение границы считается отдельно.",input:["массив целых чисел `moves`"],output:`целое число — общее количество пересечений границы 99/0`,constraints:["`0 <= moves.length <= 1000`","`-1000 <= moves[i] <= 1000`",`начальная позиция всегда 50`],example:"Вход: `[60, -70, 250]`\nВыход: `4`\nПояснение: 50→110 (1 пересечение, позиция 10) → 10→−60 (1 пересечение, позиция 40) → 40→290 (2 пересечения, позиция 90). Итого 1+1+2=4."},starterCode:`// Доступно без импорта: встроенные методы JS

function safeDialZeroCrossings(moves) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`[60, -70, 250]`,args:[[60,-70,250]],expected:4},{name:`Без пересечений`,args:[[10,-10]],expected:0},{name:`Пустой массив`,args:[[]],expected:0},{name:`Ровно один круг`,args:[[100]],expected:1,hidden:!0},{name:`Три круга назад`,args:[[-300]],expected:3,hidden:!0},{name:`Остановка ровно на 0`,args:[[50]],expected:1,hidden:!0}]},{title:`Поиск позиции вставки (Search Insert Position)`,difficulty:2,categories:[`Search`],languages:[`JavaScript`],functionName:`searchInsert`,description:{condition:`Дан отсортированный по возрастанию массив целых чисел \`nums\` и целое число \`target\`.

Необходимо определить индекс, по которому число \`target\` должно быть вставлено в массив, чтобы порядок сортировки сохранился.

Если число уже присутствует в массиве — вернуть его индекс.

Требуется решение лучше линейного перебора.`,input:["`nums` — массив целых чисел, отсортированный по возрастанию","`target` — число для вставки"],output:`Вернуть индекс вставки числа.`,constraints:["`1 <= nums.length <= 100000`","`-10^9 <= nums[i], target <= 10^9`",`массив отсортирован`,"желательно `O(log n)`"],example:`Вход:

nums=[1,5,10,20]
target=17

Выход:

3`},starterCode:`function searchInsert(nums, target) {
    // TODO: напишите решение здесь
    return 0;
}
`,tests:[{name:`Вставка в середину`,args:[[1,5,10,20],17],expected:3},{name:`Число уже есть`,args:[[1,3,5,6],5],expected:2},{name:`Вставка в начало`,args:[[2,4],1],expected:0},{name:`Вставка в конец`,args:[[1,2,3],10],expected:3,hidden:!0},{name:`Пустой массив`,args:[[],5],expected:0,hidden:!0},{name:`Совпадение с первым элементом`,args:[[1,3],1],expected:0,hidden:!0}]},{title:`Второй по величине элемент за один проход (Second Largest Element in One Pass)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`secondLargest`,description:{condition:`Дан массив чисел. Напишите функцию, которая находит второе по величине число за один проход по массиву (без сортировки). Если в массиве меньше двух различных чисел, функция должна выбросить ошибку.`,input:["`nums` — массив чисел, длина от 0 до 10^4"],output:`Второе по величине число в массиве (учитываются только различные значения — если максимум встречается несколько раз, второй по величине считается следующее по убыванию отличное значение)`,constraints:["`-10^6 <= nums[i] <= 10^6`",`Если в массиве менее двух различных чисел — выбросить ошибку`],example:`Вход: [3, 1, 4, 1, 5, 9, 2, 6]
Выход: 6

Вход: [5, 5, 5]
Выход: ошибка (недостаточно различных чисел)

Вход: [7]
Выход: ошибка`},starterCode:`// Доступно без импорта: встроенные методы JS

function secondLargest(nums) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`Обычный массив`,args:[[3,1,4,1,5,9,2,6]],expected:6},{name:`Все элементы одинаковые — ошибка`,body:`try {
  solution([5, 5, 5]);
  return "no error";
} catch {
  return "threw";
}`,expected:`threw`},{name:`Один элемент — ошибка`,body:`try {
  solution([7]);
  return "no error";
} catch {
  return "threw";
}`,expected:`threw`},{name:`Максимум повторяется`,args:[[4,9,9,1]],expected:4,hidden:!0},{name:`Отрицательные числа`,args:[[-5,-2,-9]],expected:-5,hidden:!0},{name:`Пустой массив — ошибка`,body:`try {
  solution([]);
  return "no error";
} catch {
  return "threw";
}`,expected:`threw`,hidden:!0}]},{title:`Выбор баннеров по весу (Select Banners by Weight)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`selectBanners`,description:{condition:"Напишите функцию `selectBanners`, которая принимает массив баннеров и число `count`, обозначающее количество баннеров, которые нужно выбрать из массива. Функция должна вернуть массив из `count` баннеров с наибольшим весом (чем выше вес, тем выше приоритет выбора).\n\nКаждый баннер представлен объектом с полями:\n\n`id` (число) — уникальный идентификатор баннера\n\n`weight` (число) — вес баннера (чем больше, тем выше приоритет)",input:[],output:``,constraints:["Если `count` больше длины массива, вернуть все баннеры, отсортированные по убыванию веса","Если `count` равен 0, вернуть пустой массив",`Веса могут быть любыми положительными числами`,`Порядок баннеров в результате должен быть от наибольшего веса к наименьшему`],example:`const banners = [
  {id: 2, weight: 10},
  {id: 4, weight: 5},
  {id: 8, weight: 15},
  {id: 22, weight: 18},
  {id: 41, weight: 41},
  {id: 53, weight: 1},
  {id: 69, weight: 9},
];

selectBanners(banners, 3);
// Возвращает: [{id: 41, weight: 41}, {id: 22, weight: 18}, {id: 8, weight: 15}]`},starterCode:`function selectBanners(banners, count) {
    // TODO: напишите решение здесь
    return [];
}
`,tests:[{name:`Три самых тяжёлых баннера`,args:[[{id:2,weight:10},{id:4,weight:5},{id:8,weight:15},{id:22,weight:18},{id:41,weight:41},{id:53,weight:1},{id:69,weight:9}],3],expected:[{id:41,weight:41},{id:22,weight:18},{id:8,weight:15}]},{name:`count = 0`,args:[[{id:1,weight:5}],0],expected:[]},{name:`count больше числа баннеров`,args:[[{id:1,weight:5}],10],expected:[{id:1,weight:5}]},{name:`Исходный массив не мутируется`,body:`const banners = [{ id: 1, weight: 1 }, { id: 2, weight: 9 }];
solution(banners, 1);
return banners[0].id;`,expected:1,hidden:!0},{name:`Пустой массив`,args:[[],3],expected:[],hidden:!0}]},{title:`Генератор последовательных ID через замыкание (Sequential ID Generator via Closure)`,difficulty:1,categories:[`Functions`],languages:[`JavaScript`],functionName:`createIdGenerator`,description:{condition:"Реализуйте функцию `createIdGenerator` (или `id`, если нужна одна функция без фабрики), которая при каждом вызове возвращает следующее целое число, начиная с 0. Первый вызов возвращает 0, второй — 1, третий — 2, и так далее. Состояние должно сохраняться между вызовами благодаря замыканию.",input:[`нет аргументов у самой генерирующей функции`],output:`целое число — очередной номер по счёту вызова`,constraints:[`до 1000 последовательных вызовов на тест`],example:`id() → 0
id() → 1
id() → 2
id() → 3`},starterCode:`// Доступно без импорта: встроенные методы JS

function createIdGenerator() {
  // TODO: напишите решение здесь
  return function() {
    return 0;
  };
}
`,tests:[{name:`Счёт начинается с нуля`,body:`const id = solution();
return [id(), id(), id(), id()];`,expected:[0,1,2,3]},{name:`Генераторы независимы`,body:`const a = solution();
const b = solution();
a(); a();
return [b(), a()];`,expected:[0,2]},{name:`Первый вызов возвращает 0`,body:`return solution()();`,expected:0,hidden:!0}]},{title:`Пересечение множеств (Set Intersection)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`intersection`,description:{condition:"Реализуйте функцию `intersection(set1, set2)`, которая принимает два массива уникальных целых чисел и возвращает новый массив, содержащий только те числа, которые присутствуют одновременно в обоих массивах.\n\nПорядок элементов в результате соответствует порядку в `set1`.",input:["`set1` — массив уникальных целых чисел","`set2` — массив уникальных целых чисел"],output:`Массив чисел, присутствующих в обоих массивах`,constraints:[`Элементы внутри каждого массива не повторяются`,`Длина от 0 до 10^5`],example:`Вход: set1 = [1, 2, 3, 4], set2 = [3, 4, 5, 6, 7, 8]
Выход: [3, 4]

Вход: set1 = [1, 2], set2 = [3, 4]
Выход: []

Вход: set1 = [], set2 = [1, 2, 3]
Выход: []`},starterCode:`// Доступно без импорта: встроенные методы JS

function intersection(set1, set2) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Общие элементы`,args:[[1,2,3,4],[3,4,5,6,7,8]],expected:[3,4]},{name:`Пересечения нет`,args:[[1,2],[3,4]],expected:[]},{name:`Первое множество пустое`,args:[[],[1,2,3]],expected:[]},{name:`Множества совпадают`,args:[[1,2],[1,2]],expected:[1,2],hidden:!0},{name:`Второе множество пустое`,args:[[1],[]],expected:[],hidden:!0}]},{title:`Реализация Singleton (Singleton Pattern)`,difficulty:2,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`Singleton`,description:{condition:"Реализуйте класс `Singleton`, который гарантирует существование только одного экземпляра объекта в приложении.\n\nКласс должен предоставлять метод `getInstance()`, который возвращает единственный объект класса. Любые последующие вызовы `getInstance()` должны возвращать тот же самый объект.\n\nПримеры использования:",input:[],output:``,constraints:[`Использовать только стандартные средства языка.`,"Экземпляр должен создаваться лениво (только при первом вызове `getInstance()`).",`Поддержка многопоточности необязательна, но приветствуется.`,`Входных данных нет — проверяется только идентичность объектов.`],example:`Singleton s1 = Singleton.getInstance();
Singleton s2 = Singleton.getInstance();
System.out.println(s1 == s2); // true`},starterCode:`class Singleton {
    static #instance = null;

    constructor() {
        // Приватный конструктор (через символ или ошибку)
        if (Singleton.#instance !== null) {
            throw new Error("Singleton cannot be instantiated directly. Use getInstance()");
        }
    }

    static getInstance() {
        // TODO: вернуть единственный экземпляр
        return Singleton.#instance;
    }
}
`,tests:[{name:`getInstance возвращает один и тот же объект`,body:`const a = solution.getInstance();
const b = solution.getInstance();
return a === b;`,expected:!0},{name:`Экземпляр не null`,body:`return solution.getInstance() !== null;`,expected:!0},{name:`Состояние сохраняется между вызовами`,body:`solution.getInstance().value = 42;
return solution.getInstance().value;`,expected:42,hidden:!0},{name:`Десять вызовов — один объект`,body:`const first = solution.getInstance();
for (let i = 0; i < 10; i++) if (solution.getInstance() !== first) return false;
return true;`,expected:!0,hidden:!0}]},{title:`Сортировка по частоте встречаемости (Sort Array by Frequency)`,difficulty:3,categories:[`Sorting`],languages:[`JavaScript`],functionName:`sortByFrequency`,description:{condition:`Вот исправленное условие задачи:

Дан массив целых чисел. Верните новый массив, в котором элементы расположены по убыванию частоты их встречаемости в исходном массиве. Если два элемента встречаются одинаковое количество раз, они сортируются по убыванию значения.`,input:["Массив целых чисел `nums` (может содержать повторяющиеся элементы)."],output:`Новый массив тех же элементов, отсортированных по убыванию частоты. При равной частоте — по убыванию значения элемента. Каждый элемент присутствует в результате столько раз, сколько он встречался в исходном массиве.`,constraints:["`1 <= nums.length <= 10^4`","`-10^5 <= nums[i] <= 10^5`"],example:"Вход: `[1, 1, 2, 2, 2, 3]` → Выход: `[2, 2, 2, 1, 1, 3]`\n\nВход: `[4, 4, 1, 1, 1, 2, 2, 3]` → Выход: `[1, 1, 1, 4, 4, 2, 2, 3]`\n\nВход: `[5, 3, 1, 2, 4]` → Выход: `[5, 4, 3, 2, 1]`"},starterCode:`// Доступно без импорта: встроенные методы JS

function sortByFrequency(nums) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`[1, 1, 2, 2, 2, 3]`,args:[[1,1,2,2,2,3]],expected:[2,2,2,1,1,3]},{name:`Разные частоты`,args:[[4,4,1,1,1,2,2,3]],expected:[1,1,1,4,4,2,2,3]},{name:`Все частоты равны — по убыванию значения`,args:[[5,3,1,2,4]],expected:[5,4,3,2,1]},{name:`Пустой массив`,args:[[]],expected:[],hidden:!0},{name:`Один элемент`,args:[[7]],expected:[7],hidden:!0},{name:`Ничья по частоте`,args:[[1,1,2,2]],expected:[2,2,1,1],hidden:!0}]},{title:`Сортировка дат с пустыми значениями (Sort Dates With Null Values)`,difficulty:2,categories:[`Sorting`],languages:[`JavaScript`],functionName:`sortDatesWithNulls`,description:{condition:`Дан список дат и пустых значений.

Необходимо отсортировать даты по возрастанию, а все пустые значения оставить в конце списка.

Даты представлены строками в формате \`"YYYY-MM-DD"\`.
Пустое значение представлено как \`null\` / \`None\`.

Нужно вернуть новый отсортированный список.`,input:["Список `items`, содержащий строки с датами и пустые значения."],output:`Отсортированный список, где:
все даты идут по возрастанию;
все пустые значения находятся в конце.`,constraints:["`0 <= items.length <= 100000`",'дата всегда задана в формате `"YYYY-MM-DD"`',`пустые значения могут быть в любом количестве`,`список может быть пустым`,`список может содержать только даты`,`список может содержать только пустые значения`],example:`Вход:

["2025-01-10", None, "2024-05-01", "2025-01-01", None]

Выход:

["2024-05-01", "2025-01-01", "2025-01-10", None, None]`},starterCode:`function sortDatesWithNulls(items) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Даты и null вперемешку`,args:[[`2025-01-10`,null,`2024-05-01`,`2025-01-01`,null]],expected:[`2024-05-01`,`2025-01-01`,`2025-01-10`,null,null]},{name:`Только null`,args:[[null,null]],expected:[null,null]},{name:`Пустой список`,args:[[]],expected:[]},{name:`Без пустых значений`,args:[[`2024-12-31`,`2024-01-01`]],expected:[`2024-01-01`,`2024-12-31`],hidden:!0},{name:`null в начале списка`,args:[[null,`2020-02-02`]],expected:[`2020-02-02`,null],hidden:!0}]},{title:`Сортировка иерархических номеров пунктов (Sort Hierarchical Section Numbers)`,difficulty:3,categories:[`Strings`,`Arrays`,`Sorting`],languages:[`JavaScript`],functionName:`sortHierarchical`,description:{condition:"Дан массив строк, представляющих номера пунктов иерархического нумерованного списка документа (например: `'1'`, `'1.1'`, `'1.2'`, `'1.10'`, `'2'`, `'2.1'`). Каждая строка состоит из одного или нескольких неотрицательных целых чисел, разделённых точками. Напишите функцию, которая сортирует такие номера в правильном порядке следования пунктов в документе — то есть числовое сравнение по каждому уровню вложенности, а не лексикографическое сравнение строк (например, `'1.10'` должен идти после `'1.2'`, хотя лексикографически `'1.10'` < `'1.2'`). Более короткий номер, являющийся префиксом более длинного (например, `'1'` перед `'1.1'`), должен идти раньше.",input:['`items` — массив строк, каждая из которых является номером пункта в формате `"N"`, `"N.N"`, `"N.N.N"` и т.д. (числа неотрицательные, без ведущих нулей)'],output:`Новый массив строк, отсортированный в правильном иерархическом порядке.`,constraints:["`0 <= items.length <= 10^4`",`Каждая строка содержит от 1 до 10 уровней, разделённых точками`,`Каждый уровень — целое число от 0 до 10^6`],example:`Вход: ['1', '1.1', '1.2', '1.10', '2', '2.1']
Выход: ['1', '1.1', '1.2', '1.10', '2', '2.1']

Вход: ['2.1', '1.10', '1.2', '1']
Выход: ['1', '1.2', '1.10', '2.1']

Вход: ['1.1', '1']
Выход: ['1', '1.1']`},starterCode:`// Доступно без импорта: встроенные методы JS

function sortHierarchical(items) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Уже отсортированный список`,args:[[`1`,`1.1`,`1.2`,`1.10`,`2`,`2.1`]],expected:[`1`,`1.1`,`1.2`,`1.10`,`2`,`2.1`]},{name:`Перемешанный список`,args:[[`2.1`,`1.10`,`1.2`,`1`]],expected:[`1`,`1.2`,`1.10`,`2.1`]},{name:`Родитель перед потомком`,args:[[`1.1`,`1`]],expected:[`1`,`1.1`]},{name:`Три уровня вложенности`,args:[[`1.1.2`,`1.1.10`,`1.1`]],expected:[`1.1`,`1.1.2`,`1.1.10`],hidden:!0},{name:`Пустой массив`,args:[[]],expected:[],hidden:!0}]},{title:`Сортировка объектов с фильтрацией (Sort Objects with Filtering)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`sortObjects`,description:{condition:"Напишите функцию `sortObjects`, которая принимает массив объектов, каждый из которых имеет поля `id` и `val`. Функция должна вернуть новый массив, содержащий только те объекты, у которых значение `val` неотрицательное (больше или равно 0), отсортированный по возрастанию значения `val`.",input:[],output:``,constraints:[`Исходный массив не должен изменяться`,"Если все объекты имеют отрицательные `val`, вернуть пустой массив",`Если массив пустой, вернуть пустой массив`,"`id` и `val` — целые числа"],example:`const arr = [
  {id: 13, val: 5},
  {id: 5, val: -17},
  {id: 77, val: 98},
  {id: 24, val: 2}
];

sortObjects(arr);
// Возвращает: [
//   {id: 24, val: 2},
//   {id: 13, val: 5},
//   {id: 77, val: 98}
// ]`},starterCode:`function sortObjects(arr) {
    // TODO: напишите решение здесь
    return [];
}
`,tests:[{name:`Фильтрация и сортировка`,args:[[{id:13,val:5},{id:5,val:-17},{id:77,val:98},{id:24,val:2}]],expected:[{id:24,val:2},{id:13,val:5},{id:77,val:98}]},{name:`Все значения отрицательные`,args:[[{id:1,val:-1}]],expected:[]},{name:`Пустой массив`,args:[[]],expected:[]},{name:`Ноль остаётся`,args:[[{id:1,val:0},{id:2,val:-1}]],expected:[{id:1,val:0}],hidden:!0},{name:`Уже отсортированные значения`,args:[[{id:1,val:1},{id:2,val:2}]],expected:[{id:1,val:1},{id:2,val:2}],hidden:!0}]},{title:`Сортировка нечётных чисел массива (Sort Odd Numbers In Place)`,difficulty:2,categories:[`Arrays`,`Sorting`],languages:[`JavaScript`],functionName:`sortOddInPlace`,description:{condition:`Дан массив целых чисел. Нужно отсортировать по возрастанию только нечётные числа, сохранив их относительный порядок позиций, а чётные числа должны остаться на своих исходных местах без изменений.`,input:["`nums` — массив целых чисел."],output:`Новый (или изменённый) массив той же длины, где чётные элементы стоят на прежних местах, а на местах бывших нечётных элементов — отсортированные по возрастанию нечётные значения (в порядке их исходного появления).`,constraints:["`0 ≤ nums.length ≤ 1000`","`-10^6 ≤ nums[i] ≤ 10^6`"],example:`Вход: [2, 3, 7, 4, 6, 1, 5, 8, 9]
Выход: [2, 1, 3, 4, 6, 5, 7, 8, 9]

Вход: [1, 2, 3]
Выход: [1, 2, 3]

(нечётные [1, 3] уже отсортированы)`},starterCode:`// Доступно без импорта: встроенные методы JS

function sortOddInPlace(nums) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Нечётные переставляются, чётные остаются`,args:[[2,3,7,4,6,1,5,8,9]],expected:[2,1,3,4,6,5,7,8,9]},{name:`Нечётные уже отсортированы`,args:[[1,2,3]],expected:[1,2,3]},{name:`Только чётные`,args:[[4,2]],expected:[4,2]},{name:`Только нечётные`,args:[[5,1,3]],expected:[1,3,5],hidden:!0},{name:`Пустой массив`,args:[[]],expected:[],hidden:!0}]},{title:`Разделение массива по значению (Split Array by Value)`,difficulty:2,categories:[`Sorting`],languages:[`JavaScript`],functionName:`splitByValue`,description:{condition:"Напишите функцию `splitByValue`, которая принимает число `k` и массив `elements`. Функция должна вернуть новый массив, состоящий из тех же элементов, что и исходный, но отсортированный таким образом, чтобы в начале шли элементы, которые меньше числа `k`. Относительный порядок элементов внутри каждой группы (меньше k и остальные) должен сохраняться.\n\nПравила:\n\nЭлементы, меньшие `k`, перемещаются в начало массива\n\nЭлементы, большие или равные `k`, остаются в конце\n\nОтносительный порядок элементов внутри каждой группы сохраняется\n\nИсходный массив не должен изменяться",input:[],output:``,constraints:[`Длина массива: 0 ≤ N ≤ 1000`,`Элементы: целые числа`,`Время выполнения: O(N)`,`Память: O(N)`],example:`splitByValue(5, [1, 3, 5, 7, 6, 4, 2])
// -> [1, 3, 4, 2, 5, 7, 6]
// Пояснение: меньше 5: [1, 3, 4, 2] (в том же порядке),
//            остальные: [5, 7, 6] (в том же порядке)

splitByValue(0, [5, 2, 7, 3, 2])
// -> [5, 2, 7, 3, 2]
// Пояснение: нет элементов меньше 0, массив не меняется

splitByValue(10, [1, 2, 3, 4, 5])
// -> [1, 2, 3, 4, 5]
// Пояснение: все элементы меньше 10, порядок сохраняется

splitByValue(3, [3, 2, 1, 3, 4, 5])
// -> [2, 1, 3, 3, 4, 5]
// Пояснение: меньше 3: [2, 1], остальные: [3, 3, 4, 5]`},starterCode:`function splitByValue(k, elements) {
    // TODO: write your solution here
    return [];
}
`,tests:[{name:`k = 5`,args:[5,[1,3,5,7,6,4,2]],expected:[1,3,4,2,5,7,6]},{name:`Нет элементов меньше k`,args:[0,[5,2,7,3,2]],expected:[5,2,7,3,2]},{name:`Все элементы меньше k`,args:[10,[1,2,3,4,5]],expected:[1,2,3,4,5]},{name:`Пустой массив`,args:[3,[]],expected:[],hidden:!0},{name:`Элемент равен k остаётся во второй группе`,args:[3,[3,1]],expected:[1,3],hidden:!0}]},{title:`Квадраты чисел (Squares Array)`,difficulty:1,categories:[`Arrays`],languages:[`JavaScript`],functionName:`getSquares`,description:{condition:"Дано целое число `n`.\n\nНужно вернуть массив квадратов чисел от `0` до `n - 1`.",input:["`n` — целое число."],output:`Массив целых чисел.`,constraints:[`1 <= n <= 10000`],example:`Вход: n = 5
Выход: [0, 1, 4, 9, 16]`},starterCode:`function getSquares(n) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`n = 5`,args:[5],expected:[0,1,4,9,16]},{name:`n = 1`,args:[1],expected:[0]},{name:`n = 0`,args:[0],expected:[]},{name:`n = 3`,args:[3],expected:[0,1,4],hidden:!0}]},{title:`Очистка строки с backspace (String Cleaner with Backspace)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`cleanString`,description:{condition:`В функцию передается строка, которая может содержать буквы, цифры и специальный символ '#'.
Символ '#' означает нажатие клавиши backspace (удаление предыдущего символа).
Необходимо обработать строку и вернуть результат после применения всех backspace.

Правила обработки:

Если встречается '#', он удаляет один предыдущий символ (если он есть)

Несколько '#' подряд удаляют соответствующее количество предыдущих символов

Если '#' стоит в начале строки, он ничего не удаляет (нечего удалять)

Регистр символов сохраняется`,input:[],output:``,constraints:[`Длина строки: 0 ≤ length ≤ 1000`,`Строка содержит только латинские буквы, цифры и символ '#'`,`Символ '#' не может появляться более 100 раз подряд`],example:`cleanString("Hello###world") → "Heworld"
cleanString("abc#d##c") → "ac"
cleanString("abc##d") → "ad"
cleanString("###") → ""
cleanString("a#bc#d") → "bd"`},starterCode:`function cleanString(s) {
    // TODO: напишите решение здесь
    return "";
}
`,tests:[{name:`Три backspace подряд`,args:[`Hello###world`],expected:`Heworld`},{name:`Смешанные удаления`,args:[`abc#d##c`],expected:`ac`},{name:`Два backspace`,args:[`abc##d`],expected:`ad`},{name:`Только backspace`,args:[`###`],expected:``,hidden:!0},{name:`Удаление в середине`,args:[`a#bc#d`],expected:`bd`,hidden:!0},{name:`Пустая строка`,args:[``],expected:``,hidden:!0}]},{title:`Объединение строк с чередованием (String Sandwich)`,difficulty:1,categories:[`Strings`],languages:[`JavaScript`],functionName:`stringSandwich`,description:{condition:"Напишите функцию `stringSandwich`, которая принимает две строки и возвращает новую строку: сначала более короткая строка, затем более длинная, затем снова короткая.\n\nЕсли строки одинаковой длины, порядок берётся как есть: `a + b + a`.",input:["`a` — первая строка","`b` — вторая строка"],output:`Строка вида «короткая + длинная + короткая»`,constraints:[`Строки могут быть пустыми`,`Результат не зависит от порядка аргументов`],example:`Вход: "1", "22"      → Выход: "1221"
Вход: "22", "1"      → Выход: "1221"
Вход: "abc", "def"   → Выход: "abcdefabc"
Вход: "", "hello"    → Выход: "hello"`},starterCode:`function stringSandwich(a, b) {
    // TODO: напишите решение здесь
    return "";
}
`,tests:[{name:`Короткая первая`,args:[`1`,`22`],expected:`1221`},{name:`Короткая вторая`,args:[`22`,`1`],expected:`1221`},{name:`Равные длины`,args:[`abc`,`def`],expected:`abcdefabc`},{name:`Пустая строка считается короткой`,args:[``,`hello`],expected:`hello`,hidden:!0},{name:`Обе пустые`,args:[``,``],expected:``,hidden:!0}]},{title:`Строки с преобладанием гласных (Strings With More Vowels Than Consonants)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`countVowelDominantStrings`,description:{condition:`Дан массив строк, состоящих из строчных латинских букв. Требуется посчитать количество строк, в которых число гласных букв (a, e, i, o, u) строго больше числа согласных букв.`,input:["Массив строк `words`, каждая строка состоит только из строчных латинских букв."],output:`Целое число — количество строк, где гласных больше, чем согласных.`,constraints:["`0 <= words.length <= 10^4`","`0 <= words[i].length <= 100`","строки состоят только из строчных латинских букв (`a-z`)","буква `y` считается согласной"],example:`Вход: ["aei", "bcd", "aab", "xyz"]
Выход: 2   ("aei" — 3 гласных/0 согласных; "aab" — 2 гласных/1 согласная; "bcd" и "xyz" — гласных нет)

Вход: []
Выход: 0

Вход: ["a"]
Выход: 1`},starterCode:`// Доступно без импорта: встроенные методы JS
function countVowelDominantStrings(words) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`Четыре строки`,args:[[`aei`,`bcd`,`aab`,`xyz`]],expected:2},{name:`Пустой массив`,args:[[]],expected:0},{name:`Одна гласная`,args:[[`a`]],expected:1},{name:`Поровну гласных и согласных — не считается`,args:[[`ab`]],expected:0,hidden:!0},{name:`Пустая строка`,args:[[``]],expected:0,hidden:!0}]},{title:`Подмассив с заданной суммой (Subarray with Target Sum)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`subarrayWithTargetSum`,description:{condition:"Дан массив целых неотрицательных чисел и число `target`. Найдите непрерывный подмассив (последовательно идущие элементы), сумма которых равна `target`. Гарантируется, что такой подмассив существует ровно один. Верните этот подмассив.",input:["`nums` — массив целых неотрицательных чисел (длина от 1 до 10^5)","`target` — целое положительное число"],output:"Массив чисел — непрерывный подмассив, сумма элементов которого равна `target`",constraints:[`Все числа неотрицательные`,`Подходящий подмассив существует ровно один`],example:`Вход: nums = [1, 6, 3, 10, 4, 5], target = 19
Выход: [6, 3, 10]  // 6 + 3 + 10 = 19

Вход: nums = [5, 4, 1, 3, 2], target = 6
Выход: [1, 3, 2]  // 1 + 3 + 2 = 6`},starterCode:`// Доступно без импорта: встроенные методы JS
function subarrayWithTargetSum(nums, target) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Подмассив в середине`,args:[[1,6,3,10,4,5],19],expected:[6,3,10]},{name:`Хвост массива`,args:[[5,4,1,3,2],6],expected:[1,3,2]},{name:`Один элемент`,args:[[7],7],expected:[7]},{name:`Подмассив с начала`,args:[[2,3,9],5],expected:[2,3],hidden:!0},{name:`Подмассив длиннее двух элементов`,args:[[9,1,2,3,9],6],expected:[1,2,3],hidden:!0}]},{title:`Сумма массива с конвертацией строк в числа (Sum Array With String Conversion)`,difficulty:2,categories:[`Arrays`,`Parsing`],languages:[`JavaScript`],functionName:`sumArrayWithStringConversion`,description:{condition:`Дан массив, элементами которого могут быть числа или строки. Нужно написать функцию, которая возвращает сумму всех элементов массива, предварительно конвертируя строковые элементы в числа.

Если строка представляет собой корректное число (включая отрицательные и дробные, с необязательными пробелами по краям) — она конвертируется и учитывается в сумме. Если строка не может быть корректно преобразована в число (содержит нечисловые символы, пустая строка и т.п.) — такой элемент игнорируется (не добавляется в сумму, не прерывает выполнение).`,input:["`arr` — массив, элементами которого являются числа (`number`) или строки (`string`)"],output:`Число — сумма всех элементов после конвертации, с учётом правил выше`,constraints:["`0 <= arr.length <= 10^4`","Числовые значения: `-10^6 <= value <= 10^6`",`Строки могут содержать пробелы, буквы, спецсимволы`],example:`Вход: [1, "2", "3abc", 4]
Выход: 7   // 1 + 2 + 4 (3abc игнорируется)

Вход: ["10", "20", "30"]
Выход: 60

Вход: [1, "abc", "  5  ", -2]
Выход: 4   // 1 + 5 - 2

Вход: []
Выход: 0`},starterCode:`// Доступно без импорта: встроенные методы JS

function sumArrayWithStringConversion(arr) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`Строка с мусором игнорируется`,args:[[1,`2`,`3abc`,4]],expected:7},{name:`Только строки-числа`,args:[[`10`,`20`,`30`]],expected:60},{name:`Пробелы по краям`,args:[[1,`abc`,`  5  `,-2]],expected:4},{name:`Пустой массив`,args:[[]],expected:0,hidden:!0},{name:`Пустая строка игнорируется`,args:[[``,3]],expected:3,hidden:!0},{name:`Дробные строки`,args:[[`1.5`,.5]],expected:2,hidden:!0}]},{title:`Сумма значений дерева (Sum Binary Tree Values)`,difficulty:2,categories:[`Trees`],languages:[`JavaScript`],functionName:`sumTree`,description:{condition:"Дано бинарное дерево, где каждый узел содержит числовое значение `value`, а также может иметь левого потомка `left` и правого потомка `right`.\n\nНеобходимо написать функцию, которая возвращает сумму всех чисел во всех узлах дерева.\n\nЕсли дерево пустое, нужно вернуть `0`.",input:[`На вход подаётся корень бинарного дерева.`],output:`Нужно вернуть число — сумму всех значений в дереве.`,constraints:["`0 <= количество узлов <= 10^4`","`-10^9 <= value <= 10^9`","У каждого узла может быть максимум два потомка: `left` и `right`"],example:`Вход:

{
  value: 5,
  left: {
    value: 10
  },
  right: {
    value: 21
  }
}

Выход:

36`},starterCode:`function sumTree(tree) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`Корень и два потомка`,args:[{value:5,left:{value:10},right:{value:21}}],expected:36},{name:`Пустое дерево`,args:[null],expected:0},{name:`Только корень`,args:[{value:7}],expected:7},{name:`Глубокое дерево`,args:[{value:1,left:{value:2,left:{value:3}},right:{value:4,right:{value:5}}}],expected:15,hidden:!0},{name:`Отрицательные значения`,args:[{value:-1,left:{value:-2}}],expected:-3,hidden:!0}]},{title:`Подсчет суммы возрастов (Sum of Ages)`,difficulty:2,categories:[`Data structures`],languages:[`JavaScript`],functionName:`sumAges`,description:{condition:`Напишите функцию \`sumAges\`, которая принимает объект (словарь), описывающий человека и его детей. Функция должна вернуть сумму возрастов этого человека и всех его потомков (детей, внуков и т.д.).

Каждый человек имеет следующую структуру:

\`name\` (строка) — имя человека

\`age\` (число) — возраст человека

\`children\` (массив) — список детей (может быть пустым)`,input:[],output:``,constraints:[`Глубина вложенности может быть любой`,`Массив детей может быть пустым`,`Возраст — положительное целое число`,`Имена могут быть на любом языке (для тестов используем латиницу)`],example:`const user = {
  name: 'Петр',
  age: 49,
  children: [
    {
      name: 'Нина',
      age: 25,
      children: [
        { name: 'Андрей', age: 3, children: [] },
        { name: 'Олег', age: 1, children: [] }
      ]
    },
    {
      name: 'Александр',
      age: 22,
      children: []
    }
  ]
};

sumAges(user); // 49 + 25 + 3 + 1 + 22 = 100`},starterCode:`function sumAges(person) {
    // TODO: write your solution here
    return 0;
}
`,tests:[{name:`Три поколения`,args:[{name:`Петр`,age:49,children:[{name:`Нина`,age:25,children:[{name:`Андрей`,age:3,children:[]},{name:`Олег`,age:1,children:[]}]},{name:`Александр`,age:22,children:[]}]}],expected:100},{name:`Без детей`,args:[{name:`A`,age:30,children:[]}],expected:30},{name:`Один ребёнок`,args:[{name:`A`,age:30,children:[{name:`B`,age:5,children:[]}]}],expected:35},{name:`Четыре поколения`,args:[{name:`A`,age:1,children:[{name:`B`,age:2,children:[{name:`C`,age:3,children:[{name:`D`,age:4,children:[]}]}]}]}],expected:10,hidden:!0}]},{title:`Сумма цифр числа (Sum of Digits)`,difficulty:1,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`sumDigits`,description:{condition:"Напишите функцию `sumDigits`, которая принимает целое число и возвращает сумму всех его цифр. Число может быть как положительным, так и отрицательным. Для отрицательных чисел сумма считается по модулю (знак минуса игнорируется).",input:[],output:``,constraints:[`Число может быть любым целым числом в диапазоне от -10^9 до 10^9`,`Для отрицательных чисел суммируются цифры абсолютного значения`,`Функция должна работать с числом, а не со строкой (можно преобразовывать внутри)`],example:`Вход: 123
Выход: 6
Пояснение: 1 + 2 + 3 = 6

Вход: 904
Выход: 13
Пояснение: 9 + 0 + 4 = 13

Вход: -506
Выход: 11
Пояснение: | -506 | = 506 → 5 + 0 + 6 = 11

Вход: 0
Выход: 0`},starterCode:`function sumDigits(n) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`123`,args:[123],expected:6},{name:`904`,args:[904],expected:13},{name:`Отрицательное число`,args:[-506],expected:11},{name:`Ноль`,args:[0],expected:0,hidden:!0},{name:`Одна цифра`,args:[7],expected:7,hidden:!0}]},{title:`Сумма положительных нечетных чисел (Sum of Positive Odd Numbers)`,difficulty:1,categories:[`Arrays`],languages:[`JavaScript`],functionName:`sumPositiveOdd`,description:{condition:"Напишите функцию `sumPositiveOdd`, которая принимает массив целых чисел и возвращает сумму всех нечетных чисел, которые больше нуля.",input:[],output:``,constraints:[`Массив может содержать целые числа (положительные, отрицательные, ноль)`,`Массив может быть пустым (тогда сумма равна 0)`,`Нечетными считаются числа, которые не делятся на 2 нацело`,`Положительными считаются числа больше 0`],example:`Вход: [5, 0, -5, 20, 88, 17, -32]
Выход: 22
Пояснение: 5 + 17 = 22

Вход: [1, 3, 5, 7]
Выход: 16
Пояснение: 1 + 3 + 5 + 7 = 16

Вход: [2, 4, 6, 8]
Выход: 0
Пояснение: Нет нечетных чисел

Вход: [-1, -3, -5]
Выход: 0
Пояснение: Нет положительных чисел`},starterCode:`function sumPositiveOdd(arr) {
    // TODO: write your solution here
    return 0;
}
`,tests:[{name:`Смешанный массив`,args:[[5,0,-5,20,88,17,-32]],expected:22},{name:`Только нечётные положительные`,args:[[1,3,5,7]],expected:16},{name:`Только чётные`,args:[[2,4,6,8]],expected:0},{name:`Только отрицательные нечётные`,args:[[-1,-3,-5]],expected:0,hidden:!0},{name:`Пустой массив`,args:[[]],expected:0,hidden:!0}]},{title:`Сумма промисов (Sum of Promises)`,difficulty:2,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`sumPromises`,description:{condition:"Реализуйте функцию `sumPromises(...promises)`, которая принимает произвольное количество промисов и возвращает новый промис, резолвящийся суммой их результатов.\n\nЕсли хотя бы один промис отклоняется, результирующий промис отклоняется с той же ошибкой. Без аргументов сумма равна `0`.",input:[`Произвольное количество промисов, каждый резолвится числом`],output:`Промис, резолвящийся числом — суммой всех результатов`,constraints:[`Промисы выполняются параллельно`,"Без аргументов результат — `0`"],example:`await sumPromises(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3));
// -> 6

await sumPromises();
// -> 0`},starterCode:`function sumPromises(...promises) {
    // TODO: напишите решение здесь
}
`,tests:[{name:`Три промиса`,body:`return await solution(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3));`,expected:6},{name:`Без аргументов`,body:`return await solution();`,expected:0},{name:`Разные задержки`,body:`const later = (v, ms) => new Promise((r) => setTimeout(() => r(v), ms));
return await solution(later(5, 20), later(10, 1));`,expected:15},{name:`Реджект пробрасывается`,body:`try {
  await solution(Promise.resolve(1), Promise.reject("boom"));
  return "resolved";
} catch (e) {
  return e;
}`,expected:`boom`,hidden:!0},{name:`Отрицательные числа`,body:`return await solution(Promise.resolve(-5), Promise.resolve(5));`,expected:0,hidden:!0}]},{title:`Сумма квадратов через кастомный reduce (Sum of Squares via Custom Reduce)`,difficulty:2,categories:[`Arrays`,`Functions`],languages:[`JavaScript`],functionName:`sumSquares`,description:{condition:"Дана вспомогательная функция `myReduce(array, callback, initial)`, которая работает аналогично встроенному методу `Array.prototype.reduce`: последовательно применяет `callback(accumulator, element, index)` к каждому элементу массива, начиная с `initial`, и возвращает итоговое значение аккумулятора.\n\nНапишите функцию `sumSquares(array)`, которая возвращает сумму квадратов всех чисел массива, используя для вычисления только `myReduce` (без использования встроенного `reduce`, циклов `for`/`while` внутри `sumSquares` и без изменения самой `myReduce`).",input:["`array` — массив целых чисел."],output:`Число — сумма квадратов элементов массива.`,constraints:["`0 <= array.length <= 10^4`","`-10^4 <= array[i] <= 10^4`","Внутри `sumSquares` нельзя использовать `for`/`while` и встроенный `reduce` — только вызов `myReduce`"],example:`Вход: [1, 2, 3]
Выход: 14   (1² + 2² + 3² = 1 + 4 + 9)

Вход: []
Выход: 0

Вход: [-2, 0, 5]
Выход: 29   (4 + 0 + 25)`},starterCode:`// Доступно без импорта: встроенные методы JS

function myReduce(array, callback, initial) {
  let acc = initial;
  for (let i = 0; i < array.length; i++) {
    acc = callback(acc, array[i], i);
  }
  return acc;
}

function sumSquares(array) {
  // TODO: напишите решение здесь
  return 0;
}
`,tests:[{name:`[1, 2, 3]`,args:[[1,2,3]],expected:14},{name:`Пустой массив`,args:[[]],expected:0},{name:`Отрицательные числа и ноль`,args:[[-2,0,5]],expected:29},{name:`Один элемент`,args:[[4]],expected:16,hidden:!0},{name:`Все нули`,args:[[0,0]],expected:0,hidden:!0}]},{title:`Сумма уникальных элементов (Sum of Unique Elements)`,difficulty:1,categories:[`Arrays`],languages:[`JavaScript`],functionName:`sumUniq`,description:{condition:"Напишите функцию `sumUniq`, которая принимает массив чисел и возвращает сумму только уникальных элементов — то есть элементов, которые встречаются в массиве ровно один раз.",input:[],output:``,constraints:[`Массив может содержать целые числа (положительные и отрицательные)`,`Массив может быть пустым (тогда сумма равна 0)`,`Длина массива не превышает 1000 элементов`],example:`Вход: [1, 2, 3, 2, 2]
Выход: 4 (1 + 3)

Вход: [1, 1, 2, 2, 3, 3]
Выход: 0 (нет уникальных элементов)

Вход: [5, 7, 5, 9, 7, 11]
Выход: 20 (9 + 11)

Вход: []
Выход: 0`},starterCode:`function sumUniq(arr) {
    // TODO: write your solution here
    return 0;
}
`,tests:[{name:`[1, 2, 3, 2, 2]`,args:[[1,2,3,2,2]],expected:4},{name:`Уникальных нет`,args:[[1,1,2,2,3,3]],expected:0},{name:`[5, 7, 5, 9, 7, 11]`,args:[[5,7,5,9,7,11]],expected:20},{name:`Пустой массив`,args:[[]],expected:0,hidden:!0},{name:`Все элементы уникальны`,args:[[1,2,3]],expected:6,hidden:!0}]},{title:`Обмен соседних узлов связанного списка (Swap Nodes in Pairs)`,difficulty:3,categories:[`Linked lists`],languages:[`JavaScript`],functionName:`swapPairs`,description:{condition:`Дан односвязный список. Требуется поменять местами каждую пару соседних узлов и вернуть голову изменённого списка.

Изменять разрешается только связи между узлами (порядок узлов), но не значения, хранящиеся в узлах — перестановка должна выполняться перестановкой самих узлов, а не копированием значений.`,input:[`односвязный список (последовательность числовых значений, представляющих узлы).`],output:`односвязный список после попарной перестановки соседних узлов.`,constraints:[`число узлов от 0 до 100; значения узлов — целые числа в диапазоне от -1000 до 1000.`],example:`Вход: [1,2,3,4]
Выход: [2,1,4,3]

Вход: []
Выход: []

Вход: [1]
Выход: [1]

Вход: [1,2,3]
Выход: [2,1,3]`},starterCode:`// Доступно без импорта: встроенные методы JS
// Узел списка: { value: number, next: Item | null }

function swapPairs(head) {
  // TODO: напишите решение здесь
  return head;
}
`,tests:[{name:`Чётное количество узлов`,body:`const build = (values) => values.reduceRight((next, value) => ({ value, next }), null);
const toArray = (node) => { const out = []; while (node) { out.push(node.value); node = node.next; } return out; };
return toArray(solution(build([1, 2, 3, 4])));`,expected:[2,1,4,3]},{name:`Пустой список`,body:`return solution(null);`,expected:null},{name:`Один узел`,body:`const toArray = (node) => { const out = []; while (node) { out.push(node.value); node = node.next; } return out; };
return toArray(solution({ value: 1, next: null }));`,expected:[1]},{name:`Нечётное количество узлов`,body:`const build = (values) => values.reduceRight((next, value) => ({ value, next }), null);
const toArray = (node) => { const out = []; while (node) { out.push(node.value); node = node.next; } return out; };
return toArray(solution(build([1, 2, 3])));`,expected:[2,1,3],hidden:!0},{name:`Переставляются узлы, а не значения`,body:`const third = { value: 3, next: null };
const second = { value: 2, next: third };
const first = { value: 1, next: second };
const head = solution(first);
return [head === second, head.next === first, first.value, second.value];`,expected:[!0,!0,1,2],hidden:!0}]},{title:`Менеджер задач (Task Manager)`,difficulty:2,categories:[`Data structures`],languages:[`JavaScript`],functionName:`taskManager`,description:{condition:`Напишите функцию \`taskManager\`, которая создаёт и возвращает объект (или структуру) с тремя методами для управления внутренним списком задач:

\`addTask(task)\` — добавляет задачу в список

\`removeTask(task)\` — удаляет задачу из списка (если задача встречается несколько раз, удаляется только первое вхождение)

\`getTasks()\` — возвращает текущий список задач

Внутренний список задач должен быть доступен только через эти методы (инкапсуляция).`,input:[],output:``,constraints:[`Задачи — это строки`,`При удалении несуществующей задачи ничего не происходит`,`Список задач должен быть изолирован от внешнего доступа`],example:`const manager = taskManager();
manager.addTask('Learn JavaScript');
manager.addTask('Practice coding');
manager.removeTask('Learn JavaScript');
console.log(manager.getTasks()); // ['Practice coding']`},starterCode:`function taskManager() {
    // TODO: write your solution here
    return {
        addTask: function(task) {},
        removeTask: function(task) {},
        getTasks: function() { return []; }
    };
}
`,tests:[{name:`Добавление и удаление`,body:`const m = solution();
m.addTask("Learn JavaScript");
m.addTask("Practice coding");
m.removeTask("Learn JavaScript");
return m.getTasks();`,expected:[`Practice coding`]},{name:`Пустой список в начале`,body:`return solution().getTasks();`,expected:[]},{name:`Удаляется только первое вхождение`,body:`const m = solution();
m.addTask("a"); m.addTask("a"); m.addTask("b");
m.removeTask("a");
return m.getTasks();`,expected:[`a`,`b`]},{name:`Удаление несуществующей задачи`,body:`const m = solution();
m.addTask("a");
m.removeTask("zzz");
return m.getTasks();`,expected:[`a`],hidden:!0},{name:`Менеджеры независимы`,body:`const a = solution();
const b = solution();
a.addTask("x");
return [a.getTasks(), b.getTasks()];`,expected:[[`x`],[]],hidden:!0}]},{title:`Ограничение времени выполнения функции (Time Limit)`,difficulty:3,categories:[`Asynchronous`],languages:[`JavaScript`],functionName:`timeLimit`,description:{condition:'Реализуйте функцию `timeLimit(fn, t)`, которая принимает асинхронную функцию `fn` и число `t` (миллисекунды). Функция возвращает обёртку — новую асинхронную функцию с той же сигнатурой. При вызове обёртки, если `fn` завершается в течение `t` миллисекунд — возвращается её результат. Если `fn` не успевает за `t` миллисекунд — промис отклоняется с ошибкой `"Time Limit Exceeded"`.',input:["`fn` — асинхронная функция, принимающая произвольные аргументы и возвращающая Promise","`t` — число миллисекунд (положительное целое)"],output:'Новая функция-обёртка, которая при вызове возвращает Promise: либо с результатом `fn`, либо отклонённый со строкой `"Time Limit Exceeded"`.',constraints:["`1 <= t <= 5000`","`fn` всегда возвращает Promise","Аргументы обёртки передаются в `fn` без изменений"],example:'Вход: `fn = async (n) => n * 2`, `t = 100`, вызов с аргументом `5`\nВыход: `10` (успел)\n\nВход: `fn = () => new Promise(resolve => setTimeout(resolve, 200))`, `t = 100`, вызов без аргументов\nВыход: rejected `"Time Limit Exceeded"`'},starterCode:`// Доступно без импорта: встроенные методы JS

/**
 * @param {Function} fn
 * @param {number} t
 * @returns {Function}
 */
function timeLimit(fn, t) {
  // TODO: напишите решение здесь
  return function() {};
}
`,tests:[{name:`Успевает в лимит`,body:`const fn = async (n) => n * 2;
return await solution(fn, 100)(5);`,expected:10},{name:`Не успевает — Time Limit Exceeded`,body:`const fn = () => new Promise((r) => setTimeout(r, 200));
try {
  await solution(fn, 30)();
  return "resolved";
} catch (e) {
  return e;
}`,expected:`Time Limit Exceeded`},{name:`Аргументы передаются в fn`,body:`const fn = async (a, b) => a + b;
return await solution(fn, 100)(2, 3);`,expected:5,hidden:!0},{name:`Отказ раньше лимита пробрасывается как есть`,body:`const fn = async () => { throw "own error"; };
try {
  await solution(fn, 100)();
  return "resolved";
} catch (e) {
  return e;
}`,expected:`own error`,hidden:!0}]},{title:`Таймер с замыканием (Timer with Closure)`,difficulty:2,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`createTimer`,description:{condition:"Напишите функцию `createTimer`, которая возвращает новую функцию. При каждом вызове возвращённая функция должна возвращать количество целых секунд, прошедших с момента создания таймера (момента вызова `createTimer`).\n\nИспользуйте `Date.now()` для получения текущего времени в миллисекундах. Результат должен быть округлён вниз до целого числа секунд.",input:[],output:``,constraints:["Используйте `Date.now()` для получения текущего времени",`Результат должен быть целым числом (округление вниз)`,`Таймер должен работать для любого количества вызовов`,`Функция должна использовать замыкание для сохранения времени старта`],example:`const timer = createTimer();

// Через 1.5 секунды
setTimeout(() => {
  console.log(timer()); // 1 (прошла 1 полная секунда)
}, 1500);

// Через 3.2 секунды
setTimeout(() => {
  console.log(timer()); // 3 (прошло 3 полных секунды)
}, 3200);

// Ещё через 0.8 секунды
setTimeout(() => {
  console.log(timer()); // 4 (прошло 4 полных секунды)
}, 4000);`},starterCode:`function createTimer() {
    // TODO: write your solution here
}
`,tests:[{name:`Через 1.5 секунды — 1`,body:`const realNow = Date.now;
let now = 1000000;
Date.now = () => now;
const timer = solution();
now += 1500;
const value = timer();
Date.now = realNow;
return value;`,expected:1},{name:`Сразу после создания — 0`,body:`const realNow = Date.now;
let now = 5000;
Date.now = () => now;
const timer = solution();
const value = timer();
Date.now = realNow;
return value;`,expected:0},{name:`Накопление времени`,body:`const realNow = Date.now;
let now = 0;
Date.now = () => now;
const timer = solution();
now = 3200;
const a = timer();
now = 4000;
const b = timer();
Date.now = realNow;
return [a, b];`,expected:[3,4],hidden:!0},{name:`Таймеры независимы`,body:`const realNow = Date.now;
let now = 0;
Date.now = () => now;
const first = solution();
now = 2000;
const second = solution();
now = 5000;
const value = [first(), second()];
Date.now = realNow;
return value;`,expected:[5,3],hidden:!0}]},{title:`Переводы с логированием (Translation with Logging)`,difficulty:1,categories:[`Data structures`],languages:[`JavaScript`],functionName:`translations`,description:{condition:'У нас есть объект (словарь) с переводами, которые используются на сайте. Напишите функцию `getTranslationSafe`, которая принимает язык и ключ, и возвращает перевод. Если для указанного языка и ключа перевод отсутствует, функция должна вернуть строку `"[MISSING]"`.\n\nСтруктура переводов:',input:[],output:``,constraints:["Функция должна использовать глобальный объект `translations`",'При отсутствии перевода возвращается строка `"[MISSING]"`',`Никакого логирования в консоль не требуется`],example:`const translations = {
  en: {
    hello: "Hello",
    welcome: "Welcome"
  },
  ru: {
    hello: "Привет",
    welcome: "Добро пожаловать"
  }
};

Вход: ('en', 'hello')
Выход: "Hello"

Вход: ('ru', 'welcome')
Выход: "Добро пожаловать"

Вход: ('en', 'goodbye')
Выход: "[MISSING]"

Вход: ('fr', 'hello')
Выход: "[MISSING]"`},starterCode:`const translations = {
  en: {
    hello: "Hello",
    welcome: "Welcome"
  },
  ru: {
    hello: "Privet",
    welcome: "Dobro pozhalovat"
  }
};

function getTranslationSafe(lang, key) {
    // TODO: write your solution here
    return "";
}
`,tests:[{name:`Существующий перевод`,args:[`en`,`hello`],expected:`Hello`},{name:`Русская локаль`,args:[`ru`,`welcome`],expected:`Dobro pozhalovat`},{name:`Нет ключа`,args:[`en`,`goodbye`],expected:`[MISSING]`},{name:`Нет языка`,args:[`fr`,`hello`],expected:`[MISSING]`,hidden:!0},{name:`Пустой ключ`,args:[`en`,``],expected:`[MISSING]`,hidden:!0}]},{title:`Обход объекта и сбор значений (Traverse Object)`,difficulty:3,categories:[`Algorithmics`],languages:[`JavaScript`],functionName:`traverseObject`,description:{condition:"Напишите функцию `traverseObject`, которая принимает объект (словарь) произвольной вложенности и возвращает строку, содержащую все значения из объекта, разделённые запятой. Функция должна рекурсивно обходить все вложенные объекты и собирать значения, игнорируя ключи.",input:[],output:``,constraints:[`Объект может содержать вложенные объекты любой глубины`,`Значения могут быть строками, числами, булевыми значениями`,`Если значение не является объектом, оно добавляется в результат`,`Если объект пустой, возвращается пустая строка`],example:`const obj = {
  level1: {
    level2: {
      level3: "deep value",
      anotherKey: "another deep value"
    },
    anotherLevel2: {
      level3: "value in another object"
    }
  },
  anotherLevel1: "top level value"
};

traverseObject(obj);
// Возвращает: "deep value, another deep value, value in another object, top level value"

traverseObject(obj);
// Возвращает: "значение на уровне 3, еще одно значение на уровне 3, значение на уровне 3 в другом объекте, значение на уровне 1"`},starterCode:`function traverseObject(obj) {
    // TODO: write your solution here
    return "";
}
`,tests:[{name:`Трёхуровневый объект`,args:[{level1:{level2:{level3:`deep value`,anotherKey:`another deep value`},anotherLevel2:{level3:`value in another object`}},anotherLevel1:`top level value`}],expected:`deep value, another deep value, value in another object, top level value`},{name:`Плоский объект`,args:[{a:`1`,b:`2`}],expected:`1, 2`},{name:`Пустой объект`,args:[{}],expected:``},{name:`Глубокая вложенность`,args:[{a:{b:{c:{d:`x`}}}}],expected:`x`,hidden:!0},{name:`Числовые значения`,args:[{a:1,b:{c:2}}],expected:`1, 2`,hidden:!0}]},{title:`Восстановление маршрута (Trip Reconstruction)`,difficulty:3,categories:[`Data structures`],languages:[`JavaScript`],functionName:`reconstructTrip`,description:{condition:"Напишите функцию `reconstructTrip`, которая принимает массив билетов, где каждый билет — это объект с полями `from` (откуда) и `to` (куда). Билеты перемешаны в случайном порядке. Функция должна восстановить правильный порядок маршрута, начиная с первого пункта и заканчивая последним.",input:[],output:``,constraints:[`Все пункты назначения уникальны (кроме начального и конечного)`,`Маршрут всегда можно восстановить (нет циклов)`,`Количество билетов от 1 до 1000`,`Названия городов — строки`],example:`Вход: [
  {from: 'Спб', to: 'Минск'},
  {from: 'Киев', to: 'Новосибирск'},
  {from: 'Череповец', to: 'Москва'},
  {from: 'Минск', to: 'Киев'},
  {from: 'Москва', to: 'Спб'}
]

Выход: [
  {from: 'Череповец', to: 'Москва'},
  {from: 'Москва', to: 'Спб'},
  {from: 'Спб', to: 'Минск'},
  {from: 'Минск', to: 'Киев'},
  {from: 'Киев', to: 'Новосибирск'}
]`},starterCode:`function reconstructTrip(tickets) {
    // TODO: write your solution here
    return [];
}
`,tests:[{name:`Маршрут из пяти билетов`,args:[[{from:`Спб`,to:`Минск`},{from:`Киев`,to:`Новосибирск`},{from:`Череповец`,to:`Москва`},{from:`Минск`,to:`Киев`},{from:`Москва`,to:`Спб`}]],expected:[{from:`Череповец`,to:`Москва`},{from:`Москва`,to:`Спб`},{from:`Спб`,to:`Минск`},{from:`Минск`,to:`Киев`},{from:`Киев`,to:`Новосибирск`}]},{name:`Один билет`,args:[[{from:`A`,to:`B`}]],expected:[{from:`A`,to:`B`}]},{name:`Пустой массив`,args:[[]],expected:[]},{name:`Билеты уже по порядку`,args:[[{from:`A`,to:`B`},{from:`B`,to:`C`}]],expected:[{from:`A`,to:`B`},{from:`B`,to:`C`}],hidden:!0},{name:`Обратный порядок во входных данных`,args:[[{from:`B`,to:`C`},{from:`A`,to:`B`}]],expected:[{from:`A`,to:`B`},{from:`B`,to:`C`}],hidden:!0}]},{title:`Проверка суммы двух чисел (Two Sum Check)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`hasPairWithSum`,description:{condition:"Напишите функцию `hasPairWithSum`, которая принимает массив целых чисел `arr` и целое число `k`. Функция должна вернуть `true`, если в массиве существует хотя бы одна пара различных элементов, сумма которых равна `k`. Иначе вернуть `false`.",input:[],output:``,constraints:[`Массив может содержать целые числа (положительные, отрицательные, ноль)`,"Массив может быть пустым (тогда возвращается `false`)",`Элементы могут повторяться`,`Нельзя использовать один и тот же элемент дважды`],example:`Вход: [10, 15, 3, 7], 17
Выход: true
Пояснение: 10 + 7 = 17

Вход: [10, 15, 3, 7], 20
Выход: false
Пояснение: Нет пары с суммой 20

Вход: [1, 2, 3, 4, 5], 9
Выход: true
Пояснение: 4 + 5 = 9

Вход: [5], 10
Выход: false
Пояснение: Нужно два разных элемента`},starterCode:`function hasPairWithSum(arr, k) {
    // TODO: напишите решение здесь
    return false;
}
`,tests:[{name:`Пара есть`,args:[[10,15,3,7],17],expected:!0},{name:`Пары нет`,args:[[10,15,3,7],20],expected:!1},{name:`Пара в конце`,args:[[1,2,3,4,5],9],expected:!0},{name:`Один элемент`,args:[[5],10],expected:!1,hidden:!0},{name:`Пустой массив`,args:[[],0],expected:!1,hidden:!0},{name:`Два одинаковых элемента`,args:[[4,4],8],expected:!0,hidden:!0}]},{title:`Поиск суммы двух индексов (Two Sum Indices)`,difficulty:3,categories:[`Pointers`],languages:[`JavaScript`],functionName:`findIndexSum`,description:{condition:`Напишите функцию \`findIndexSum\`, которая принимает число \`val\` и отсортированный по возрастанию массив \`arr\`. Функция должна вернуть сумму двух индексов массива, элементы которых в сумме дают число \`val\`. Если таких элементов нет, вернуть \`-1\`.

Правила:

Массив отсортирован по возрастанию

Нужно найти два разных элемента (индексы должны быть разными)

Возвращается сумма индексов найденных элементов

Если есть несколько пар, можно вернуть любую

Если пара не найдена, вернуть \`-1\``,input:[],output:``,constraints:[`Длина массива: 1 ≤ N ≤ 1000`,`Элементы: целые числа`,`Массив отсортирован по возрастанию`,`Время выполнения: O(N)`,`Память: O(1)`],example:`const arr = [2, 5, 8, 9, 22, 57, 94, 100, 127, 198, 345, 451];

findIndexSum(79, arr)  // -> 9 (индексы 4 и 5: 22 + 57 = 79, 4 + 5 = 9)
findIndexSum(70, arr)  // -> -1`},starterCode:`function findIndexSum(val, arr) {
    // TODO: write your solution here
    return -1;
}
`,tests:[{name:`Пара найдена`,args:[79,[2,5,8,9,22,57,94,100,127,198,345,451]],expected:9},{name:`Пары нет`,args:[70,[2,5,8,9,22,57,94,100,127,198,345,451]],expected:-1},{name:`Первый и последний элементы`,args:[10,[1,4,9]],expected:2},{name:`Массив из одного элемента`,args:[5,[5]],expected:-1,hidden:!0},{name:`Пустой массив`,args:[1,[]],expected:-1,hidden:!0},{name:`Соседние элементы`,args:[7,[1,3,4,100]],expected:3,hidden:!0}]},{title:`Стек отмены и повтора действий (Undo/Redo Stack)`,difficulty:3,categories:[`Stack`],languages:[`JavaScript`],functionName:`applyHistory`,description:{condition:'Реализуй систему отмены и повтора действий для списка постов. У тебя есть начальный список постов и история операций над ним в виде стека событий. Каждое событие имеет тип (`"add"` или `"remove"`) и данные — пост (`{ id, title }`).\n\nНапиши функцию `applyHistory(initialPosts, history, index)`, которая по заданному индексу в стеке истории возвращает актуальный список постов. Индекс указывает, сколько событий из истории нужно применить (начиная с первого). При `index === history.length` применяются все события (текущее состояние). При `index === 0` возвращаются только начальные посты.',input:["`initialPosts` — массив объектов `{ id: number, title: string }` — исходные посты (с сервера)",'`history` — массив событий `{ type: "add" | "remove", post: { id: number, title: string } }`',"`index` — число от `0` до `history.length` включительно"],output:"Массив постов `{ id: number, title: string }` — результат применения первых `index` событий из истории к `initialPosts`.",constraints:["`0 <= initialPosts.length <= 100`","`0 <= history.length <= 100`","`0 <= index <= history.length`","`id` у каждого поста уникален",'Событие `"remove"` всегда ссылается на пост, который есть в текущем состоянии на момент применения'],example:`Вход:

initialPosts = [{ id: 1, title: "First" }]
history = [
  { type: "add",    post: { id: 2, title: "Second" } },
  { type: "add",    post: { id: 3, title: "Third" }  },
  { type: "remove", post: { id: 2, title: "Second" } }
]
index = 2

Выход:

[{ id: 1, title: "First" }, { id: 2, title: "Second" }, { id: 3, title: "Third" }]

При \`index = 3\`:

[{ id: 1, title: "First" }, { id: 3, title: "Third" }]

При \`index = 0\`:

[{ id: 1, title: "First" }]`},starterCode:`// Доступно без импорта: встроенные методы JS

// Структура поста: { id: number, title: string }
// Структура события: { type: "add" | "remove", post: { id: number, title: string } }

function applyHistory(initialPosts, history, index) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Применены первые два события`,args:[[{id:1,title:`First`}],[{type:`add`,post:{id:2,title:`Second`}},{type:`add`,post:{id:3,title:`Third`}},{type:`remove`,post:{id:2,title:`Second`}}],2],expected:[{id:1,title:`First`},{id:2,title:`Second`},{id:3,title:`Third`}]},{name:`Применена вся история`,args:[[{id:1,title:`First`}],[{type:`add`,post:{id:2,title:`Second`}},{type:`add`,post:{id:3,title:`Third`}},{type:`remove`,post:{id:2,title:`Second`}}],3],expected:[{id:1,title:`First`},{id:3,title:`Third`}]},{name:`index = 0 — исходное состояние`,args:[[{id:1,title:`First`}],[{type:`add`,post:{id:2,title:`Second`}}],0],expected:[{id:1,title:`First`}]},{name:`Исходный массив не мутируется`,body:`const initial = [{ id: 1, title: "First" }];
solution(initial, [{ type: "add", post: { id: 2, title: "Second" } }], 1);
return initial.length;`,expected:1,hidden:!0},{name:`Пустая история`,args:[[{id:9,title:`Only`}],[],0],expected:[{id:9,title:`Only`}],hidden:!0}]},{title:`Уникальные элементы массива (Unique Array Elements)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`getUniqueElements`,description:{condition:"Напишите функцию `getUniqueElements(arr)`, которая принимает массив чисел и возвращает новый массив, содержащий только уникальные элементы, отсортированные по возрастанию.",input:[],output:``,constraints:[`Реализуйте алгоритм вручную, без использования встроенных структур данных для удаления дубликатов (таких как Set, HashSet, Dictionary и т.д.)`,"Запрещено использовать встроенные функции вроде `np.unique` или `lodash.uniq`",`Массив может быть пустым`,`Элементы — целые числа`,`Алгоритмический подход:`,`Отсортировать исходный массив`,`Пройти по отсортированному массиву и добавить в результат только те элементы, которые отличаются от предыдущего`,`Длина массива: 0 ≤ N ≤ 10000`,`Элементы: -10^6 ≤ arr[i] ≤ 10^6`,`Время выполнения: O(N log N) (из-за сортировки)`,`Память: O(N)`],example:`// Пример 1
getUniqueElements([1, 2, 3, 5, 1, 5, 9, 1, 2, 8])
// -> [1, 2, 3, 5, 8, 9]

// Пример 2
getUniqueElements([5, 4, 3, 2, 1])
// -> [1, 2, 3, 4, 5]

// Пример 3
getUniqueElements([])
// -> []

// Пример 4
getUniqueElements([7, 7, 7, 7])
// -> [7]`},starterCode:`function getUniqueElements(arr) {
    // TODO: write your solution here
    return [];
}
`,tests:[{name:`Дубликаты и сортировка`,args:[[1,2,3,5,1,5,9,1,2,8]],expected:[1,2,3,5,8,9]},{name:`Обратный порядок`,args:[[5,4,3,2,1]],expected:[1,2,3,4,5]},{name:`Пустой массив`,args:[[]],expected:[]},{name:`Все элементы одинаковые`,args:[[7,7,7,7]],expected:[7],hidden:!0},{name:`Числа больше девяти`,args:[[10,9,100,20]],expected:[9,10,20,100],hidden:!0}]},{title:`Уникальные случайные числа (Unique Random Numbers)`,difficulty:2,categories:[`Arrays`],languages:[`JavaScript`],functionName:`uniqRandn`,description:{condition:"Напишите функцию, которая принимает число `n` и возвращает массив из `n` уникальных случайных целых чисел.\n\nЧисла должны быть в диапазоне от `0` до `n * 10 - 1`.\n\nПорядок чисел может быть любым.",input:["`n` — количество уникальных случайных чисел."],output:"Массив длины `n`, в котором все числа уникальны.",constraints:["`0 <= n <= 1000`",`Все числа должны быть целыми`,`Все числа должны быть уникальными`,"Каждое число должно быть в диапазоне `[0, n * 10 - 1]`","При `n = 0` нужно вернуть пустой массив"],example:`Вход:

n = 5

Выход:

[12, 3, 41, 7, 25]`},starterCode:`function uniqRandn(n) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Ровно n чисел, все уникальные`,body:`const result = solution(5);
return [result.length, new Set(result).size];`,expected:[5,5]},{name:`Все числа в диапазоне 0..n*10-1`,body:`const n = 8;
const result = solution(n);
return result.every((v) => Number.isInteger(v) && v >= 0 && v < n * 10);`,expected:!0},{name:`n = 1`,body:`const result = solution(1);
return [result.length, result[0] >= 0 && result[0] < 10];`,expected:[1,!0]},{name:`Уникальность на большой выборке`,body:`const result = solution(50);
return new Set(result).size;`,expected:50,hidden:!0},{name:`n = 0 — пустой массив`,body:`return solution(0);`,expected:[],hidden:!0}]},{title:`Проверка правильности скобок (Valid Parentheses)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`validParentheses`,description:{condition:"Напишите функцию `validParentheses`, которая принимает строку, содержащую только круглые скобки `(` и `)`. Функция должна вернуть `true`, если скобки расставлены правильно (каждая открывающая скобка имеет соответствующую закрывающую, и порядок соблюден), и `false` в противном случае.\n\nПравила:\n\nКаждая открывающая скобка `(` должна иметь соответствующую закрывающую скобку `)`\n\nЗакрывающая скобка не может идти перед открывающей\n\nСтрока может быть пустой (считается правильной)",input:[],output:``,constraints:["Строка содержит только символы `(` и `)`",`Длина строки не превышает 1000 символов`],example:`Вход: "()"
Выход: true

Вход: "())"
Выход: false

Вход: "())("
Выход: false

Вход: ""
Выход: true`},starterCode:`function validParentheses(s) {
    // TODO: напишите решение здесь
    return false;
}
`,tests:[{name:`Простая пара`,args:[`()`],expected:!0},{name:`Лишняя закрывающая`,args:[`())`],expected:!1},{name:`Верное количество, неверный порядок`,args:[`())(`],expected:!1},{name:`Пустая строка`,args:[``],expected:!0,hidden:!0},{name:`Вложенные скобки`,args:[`(())`],expected:!0,hidden:!0},{name:`Незакрытая скобка`,args:[`(()`],expected:!1,hidden:!0}]},{title:`Каррированная сумма с переменной арностью (Variadic Curried Sum)`,difficulty:3,categories:[`Functions`],languages:[`JavaScript`],functionName:`sum`,description:{condition:"Реализуйте функцию `sum`, которая принимает одно число и возвращает новую функцию, также принимающую число и возвращающую следующую функцию — и так далее. Цепочка вызовов может продолжаться сколь угодно долго. Как только результирующая функция вызывается без аргументов, должна вернуться итоговая сумма всех ранее переданных чисел.",input:["Последовательность вызовов вида `sum(a)(b)(c)...()`, где каждое число — целое (может быть отрицательным)."],output:`Число — сумма всех чисел, переданных в цепочке вызовов, возвращаемое при финальном вызове без аргументов.`,constraints:[`Длина цепочки вызовов: от 1 до 20`,`Числа могут быть отрицательными`,`Финальный вызов без аргументов завершает цепочку и возвращает сумму`],example:`Вход: sum(1)()
Выход: 1

Вход: sum(1)(2)()
Выход: 3

Вход: sum(1)(2)(-3)()
Выход: 0`},starterCode:`// Доступно без импорта: встроенные методы JS
function sum(a) {
  // TODO: напишите решение здесь
  return function() {
    return a;
  };
}
`,tests:[{name:`Одно число`,body:`return solution(1)();`,expected:1},{name:`Два числа`,body:`return solution(1)(2)();`,expected:3},{name:`С отрицательным числом`,body:`return solution(1)(2)(-3)();`,expected:0},{name:`Длинная цепочка`,body:`return solution(1)(2)(3)(4)(5)();`,expected:15,hidden:!0},{name:`Цепочки независимы`,body:`const a = solution(10)(10);
const b = solution(1)(1);
return [a(), b()];`,expected:[20,2],hidden:!0}]},{title:`Вертикальная симметрия точек (Vertical Symmetry of Points)`,difficulty:3,categories:[`Arrays`,`Conditions`],languages:[`JavaScript`],functionName:`isVerticalSymmetric`,description:{condition:"Дан массив точек на плоскости с целочисленными координатами. Каждая точка представлена объектом `{ x: number, y: number }`. Точки могут повторяться.\n\nНужно определить, существует ли вертикальная прямая `x = c`, относительно которой все точки образуют симметричный набор — то есть для каждой точки `(x, y)` в наборе найдётся точка `(2c - x, y)`, также присутствующая в наборе (с учётом кратности повторов).\n\nНапишите функцию, которая возвращает `true`, если такая вертикальная прямая существует, и `false` — в противном случае. Пустой массив и массив из одной точки считаются симметричными.",input:["`points` — массив объектов `{ x: number, y: number }`, длина от 0 до 1000"],output:"`boolean` — существует ли ось вертикальной симметрии.",constraints:["`0 <= points.length <= 1000`","`-10^4 <= x, y <= 10^4`",`Координаты — целые числа`,`Точки могут повторяться`],example:"Вход: `[{x:0,y:0},{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:1},{x:4,y:0},{x:4,y:0}]`\nВыход: `true`\n\nВход: `[{x:0,y:0},{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:1},{x:4,y:0}]`\nВыход: `false`\n\nВход: `[]`\nВыход: `true`\n\nВход: `[{x:0,y:0}]`\nВыход: `true`\n\nВход: `[{x:0,y:0},{x:10,y:0}]`\nВыход: `true`\n\nВход: `[{x:0,y:0},{x:11,y:1}]`\nВыход: `false`\n\nВход: `[{x:0,y:0},{x:1,y:0},{x:3,y:0}]`\nВыход: `false`"},starterCode:`// Доступно без импорта: встроенные методы JS

function isVerticalSymmetric(points) {
  // TODO: напишите решение здесь
  return false;
}
`,tests:[{name:`Симметричный набор`,args:[[{x:0,y:0},{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:1},{x:4,y:0},{x:4,y:0}]],expected:!0},{name:`Не хватает пары`,args:[[{x:0,y:0},{x:0,y:0},{x:1,y:1},{x:2,y:2},{x:3,y:1},{x:4,y:0}]],expected:!1},{name:`Пустой массив`,args:[[]],expected:!0},{name:`Одна точка`,args:[[{x:0,y:0}]],expected:!0,hidden:!0},{name:`Две точки на одной высоте`,args:[[{x:0,y:0},{x:10,y:0}]],expected:!0,hidden:!0},{name:`Две точки на разной высоте`,args:[[{x:0,y:0},{x:11,y:1}]],expected:!1,hidden:!0},{name:`Нечётный набор без центра`,args:[[{x:0,y:0},{x:1,y:0},{x:3,y:0}]],expected:!1,hidden:!0}]},{title:`Кодирование и декодирование гласных (Vowel Encoding/Decoding)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`transformVowels`,description:{condition:"Напишите функцию `transformVowels`, которая принимает строку и преобразует её по следующим правилам:\n\nЕсли в строке есть цифры 1-5, функция расшифровывает строку, заменяя их на соответствующие гласные:`1` → `a`\n\n`2` → `e`\n\n`3` → `i`\n\n`4` → `o`\n\n`5` → `u`\n\nЕсли в строке нет цифр 1-5, функция шифрует строку, заменяя гласные буквы на соответствующие цифры:\n\n`a` → `1`\n\n`e` → `2`\n\n`i` → `3`\n\n`o` → `4`\n\n`u` → `5`",input:[],output:``,constraints:[`Строка содержит только буквы английского алфавита и цифры 1-5`,`Строка не может содержать одновременно буквы и цифры (кроме результата преобразования)`,`Длина строки не превышает 1000 символов`],example:`Вход: "hello"
Выход: "h2ll4"
Пояснение: e → 2, o → 4

Вход: "h2ll4"
Выход: "hello"
Пояснение: 2 → e, 4 → o

Вход: "world"
Выход: "w4rld"
Пояснение: o → 4

Вход: "w4rld"
Выход: "world"
Пояснение: 4 → o`},starterCode:`function transformVowels(str) {
    // TODO: write your solution here
    return "";
}
`,tests:[{name:`Шифрование`,args:[`hello`],expected:`h2ll4`},{name:`Расшифровка`,args:[`h2ll4`],expected:`hello`},{name:`Одна гласная`,args:[`world`],expected:`w4rld`},{name:`Обратно в буквы`,args:[`w4rld`],expected:`world`,hidden:!0},{name:`Пустая строка`,args:[``],expected:``,hidden:!0},{name:`Без гласных и цифр`,args:[`xyz`],expected:`xyz`,hidden:!0}]},{title:`Подсчёт слов и нахождение наиболее частого слова (Word Count and Most Frequent Word)`,difficulty:2,categories:[`Strings`],languages:[`JavaScript`],functionName:`calc`,description:{condition:"Напишите функцию `calc(text)`, которая принимает строку `text`, подсчитывает общее количество слов и находит самое часто встречающееся слово.\n\nСлова разделяются пробелами, регистр не учитывается. При равной частоте возвращается слово, встретившееся раньше. Для пустой строки `wordCount` равен `0`, а `mostFrequentWord` — пустая строка.",input:["`text` — строка со словами, разделёнными пробелами"],output:"Объект `{ wordCount, mostFrequentWord }`",constraints:['Регистр игнорируется — `"The"` и `"the"` считаются одним словом',`Возвращаемое слово — в нижнем регистре`,`Лишние пробелы не учитываются`],example:`calc("the cat and the dog and the bird")
// -> { wordCount: 8, mostFrequentWord: "the" }

calc("")
// -> { wordCount: 0, mostFrequentWord: "" }`},starterCode:`function calc(text) {
    // TODO: напишите решение здесь
    return { wordCount: 0, mostFrequentWord: "" };
}
`,tests:[{name:`Самое частое слово`,args:[`the cat and the dog and the bird`],expected:{wordCount:8,mostFrequentWord:`the`}},{name:`Пустая строка`,args:[``],expected:{wordCount:0,mostFrequentWord:``}},{name:`Регистр не учитывается`,args:[`The the THE cat`],expected:{wordCount:4,mostFrequentWord:`the`}},{name:`Лишние пробелы`,args:[`  a   b  `],expected:{wordCount:2,mostFrequentWord:`a`},hidden:!0},{name:`При равной частоте — первое слово`,args:[`b a a b`],expected:{wordCount:4,mostFrequentWord:`b`},hidden:!0}]},{title:`Слова с заданным префиксом (Words With Given Prefix)`,difficulty:1,categories:[`Arrays`],languages:[`JavaScript`],functionName:`wordsWithPrefix`,description:{condition:"Дана строка `s`, содержащая слова, разделённые пробелами, и строка `prefix`. Напишите функцию, которая возвращает список всех слов из `s` (в порядке их появления, с повторениями), которые начинаются с `prefix`.",input:["`s` — строка со словами, разделёнными одним пробелом (может быть пустой)","`prefix` — строка-префикс для поиска (может быть пустой строкой)"],output:"Массив/список строк — все слова из `s`, начинающиеся с `prefix`, в исходном порядке, включая повторы",constraints:["`0 <= длина s <= 10^5`","`0 <= длина prefix <= 100`",`Слова состоят из строчных и заглавных латинских букв`,"Если `prefix` — пустая строка, все слова считаются подходящими"],example:'Вход: `s = "ab abc def abc xyz ace ab cab"`, `prefix = "ab"`\nВыход: `["ab", "abc", "abc", "ab"]`\n\nВход: `s = "hello world"`, `prefix = "z"`\nВыход: `[]`\n\nВход: `s = ""`, `prefix = "a"`\nВыход: `[]`'},starterCode:`// Доступно без импорта: встроенные методы JS
function wordsWithPrefix(s, prefix) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Несколько совпадений с повторами`,args:[`ab abc def abc xyz ace ab cab`,`ab`],expected:[`ab`,`abc`,`abc`,`ab`]},{name:`Совпадений нет`,args:[`hello world`,`z`],expected:[]},{name:`Пустая строка`,args:[``,`a`],expected:[]},{name:`Пустой префикс — все слова`,args:[`a b`,``],expected:[`a`,`b`],hidden:!0},{name:`Префикс должен быть в начале слова`,args:[`cab bca`,`ab`],expected:[],hidden:!0}]},{title:`Worker Pool (Worker Pool)`,difficulty:3,categories:[`Asynchronous`],languages:[`JavaScript`],functionName:`workerPool`,description:{condition:'Реализуйте worker pool.\n\nЕсть `tasksCount` задач. Каждая задача имитирует работу: засыпает на короткое время и после этого считается выполненной. Количество воркеров задаётся параметром `workersCount`.\n\nКаждый воркер берёт задачи из общей очереди — нельзя запускать отдельный воркер на каждую задачу. Функция возвращает массив строк вида `"task X executed by worker Y"`, где `X` — номер задачи (с 1), `Y` — номер воркера (с 1).\n\nПорядок строк в результате может быть любым.',input:["`workersCount` — количество воркеров","`tasksCount` — количество задач"],output:'Массив строк вида `"task X executed by worker Y"` — по одной на каждую задачу',constraints:["Одновременно работает не более `workersCount` воркеров",`Каждая задача выполняется ровно один раз`,"Номера воркеров — от 1 до `workersCount`"],example:`Вход: workersCount = 3, tasksCount = 10

Выход (порядок может отличаться):
[
  "task 1 executed by worker 1",
  "task 2 executed by worker 2",
  "task 3 executed by worker 3",
  ...
]`},starterCode:`async function workerPool(workersCount, tasksCount) {
  // TODO: напишите решение здесь
  return [];
}
`,tests:[{name:`Каждая задача выполнена ровно один раз`,body:`const result = await solution(3, 10);
const tasks = result.map((line) => Number(line.match(/task (\\d+)/)[1])).sort((a, b) => a - b);
return [result.length, tasks];`,expected:[10,[1,2,3,4,5,6,7,8,9,10]]},{name:`Номера воркеров не выходят за предел`,body:`const result = await solution(3, 10);
const workers = result.map((line) => Number(line.match(/worker (\\d+)/)[1]));
return workers.every((w) => w >= 1 && w <= 3);`,expected:!0},{name:`Ноль задач — пустой результат`,body:`return await solution(3, 0);`,expected:[]},{name:`Один воркер обрабатывает всё`,body:`const result = await solution(1, 4);
const workers = new Set(result.map((line) => line.match(/worker (\\d+)/)[1]));
return [result.length, [...workers]];`,expected:[4,[`1`]],hidden:!0},{name:`Воркеров больше, чем задач`,body:`const result = await solution(5, 2);
return result.length;`,expected:2,hidden:!0}]}];function Pr(e,t={}){return{id:e,categories:[],languages:jr,tests:[],...t,status:`not_started`,code:null}}var Fr=Nr.map((e,t)=>Pr(t+1,e)),Ir=(0,_.createContext)(null),Lr={query:``,difficulties:[],languages:[],categories:[]};function Rr(e){return{status:e.status,code:e.code,solved:!1}}function zr({children:e}){let[t,n]=(0,_.useState)(()=>nr()),[r,i]=(0,_.useState)(()=>ir(Lr));(0,_.useEffect)(()=>{rr(t)},[t]),(0,_.useEffect)(()=>{ar(r)},[r]);let a=(0,_.useMemo)(()=>Fr.map(e=>{let n=t[e.id],r=n?{...e,...n}:{...e,...Rr(e)};return r.status=r.solved?`solved`:r.code!=null&&r.code!==e.starterCode?`in_progress`:`not_started`,r}),[t]),o=(0,_.useCallback)((e,t)=>{n(n=>{let r=Fr.find(t=>t.id===e);if(!r)return n;let i=n[e]??Rr(r),a=typeof t==`function`?t(i):{...i,...t};return{...n,[e]:a}})},[]),s=(0,_.useCallback)(e=>{i(t=>typeof e==`function`?e(t):{...t,...e})},[]),c=(0,_.useCallback)(()=>i(Lr),[]),l=(0,_.useMemo)(()=>({tasks:a,updateTaskProgress:o,filters:r,setFilters:s,resetFilters:c}),[a,o,r,s,c]);return(0,A.jsx)(Ir.Provider,{value:l,children:e})}function Br(){let e=(0,_.useContext)(Ir);if(!e)throw Error(`useTasks must be used within a TasksProvider`);return e}var Vr=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),Hr=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),Ur=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),Wr=e=>{let t=Ur(e);return t.charAt(0).toUpperCase()+t.slice(1)},Gr={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`},Kr=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0;return!1},qr=(0,_.createContext)({}),Jr=()=>(0,_.useContext)(qr),Yr=(0,_.forwardRef)(({color:e,size:t,strokeWidth:n,absoluteStrokeWidth:r,className:i=``,children:a,iconNode:o,...s},c)=>{let{size:l=24,strokeWidth:u=2,absoluteStrokeWidth:d=!1,color:f=`currentColor`,className:p=``}=Jr()??{},m=r??d?Number(n??u)*24/Number(t??l):n??u;return(0,_.createElement)(`svg`,{ref:c,...Gr,width:t??l??Gr.width,height:t??l??Gr.height,stroke:e??f,strokeWidth:m,className:Vr(`lucide`,p,i),...!a&&!Kr(s)&&{"aria-hidden":`true`},...s},[...o.map(([e,t])=>(0,_.createElement)(e,t)),...Array.isArray(a)?a:[a]])}),M=(e,t)=>{let n=(0,_.forwardRef)(({className:n,...r},i)=>(0,_.createElement)(Yr,{ref:i,iconNode:t,className:Vr(`lucide-${Hr(Wr(e))}`,`lucide-${e}`,n),...r}));return n.displayName=Wr(e),n},Xr=M(`arrow-left`,[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]),Zr=M(`arrow-right`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]),Qr=M(`book-open`,[[`path`,{d:`M12 5v16`,key:`1f6ucr`}],[`path`,{d:`M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z`,key:`1fyvmf`}]]),$r=M(`chart-column`,[[`path`,{d:`M3 3v16a2 2 0 0 0 2 2h16`,key:`c24i48`}],[`path`,{d:`M18 17V9`,key:`2bz60n`}],[`path`,{d:`M13 17V5`,key:`1frdt8`}],[`path`,{d:`M8 17v-3`,key:`17ska0`}]]),ei=M(`check`,[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]),ti=M(`chevron-down`,[[`path`,{d:`m6 9 6 6 6-6`,key:`qrunsl`}]]),ni=M(`chevron-left`,[[`path`,{d:`m15 18-6-6 6-6`,key:`1wnfg3`}]]),ri=M(`chevron-right`,[[`path`,{d:`m9 18 6-6-6-6`,key:`mthhwq`}]]),ii=M(`circle-question-mark`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3`,key:`1u773s`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]]),ai=M(`copy`,[[`rect`,{width:`14`,height:`14`,x:`8`,y:`8`,rx:`2`,ry:`2`,key:`17jyea`}],[`path`,{d:`M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`,key:`zix9uf`}]]),oi=M(`ellipsis-vertical`,[[`circle`,{cx:`12`,cy:`12`,r:`1`,key:`41hilf`}],[`circle`,{cx:`12`,cy:`5`,r:`1`,key:`gxeob9`}],[`circle`,{cx:`12`,cy:`19`,r:`1`,key:`lyex9k`}]]),si=M(`external-link`,[[`path`,{d:`M15 3h6v6`,key:`1q9fwt`}],[`path`,{d:`M10 14 21 3`,key:`gplh6r`}],[`path`,{d:`M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`,key:`a6xqqp`}]]),ci=M(`file-text`,[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`M10 9H8`,key:`b1mrlr`}],[`path`,{d:`M16 13H8`,key:`t4e002`}],[`path`,{d:`M16 17H8`,key:`z1uh3a`}]]),li=M(`folder-heart`,[[`path`,{d:`M10.638 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.417`,key:`10r6g4`}],[`path`,{d:`M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z`,key:`15cy7q`}]]),ui=M(`git-branch`,[[`path`,{d:`M15 6a9 9 0 0 0-9 9V3`,key:`1cii5b`}],[`circle`,{cx:`18`,cy:`6`,r:`3`,key:`1h7g24`}],[`circle`,{cx:`6`,cy:`18`,r:`3`,key:`fqmcym`}]]),di=M(`graduation-cap`,[[`path`,{d:`M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z`,key:`j76jl0`}],[`path`,{d:`M22 10v6`,key:`1lu8f3`}],[`path`,{d:`M6 12.5V16a6 3 0 0 0 12 0v-3.5`,key:`1r8lef`}]]),fi=M(`heart`,[[`path`,{d:`M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5`,key:`mvr1a0`}]]),pi=M(`house`,[[`path`,{d:`M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8`,key:`5wwlr5`}],[`path`,{d:`M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z`,key:`r6nss1`}]]),mi=M(`languages`,[[`path`,{d:`m5 8 6 6`,key:`1wu5hv`}],[`path`,{d:`m4 14 6-6 2-3`,key:`1k1g8d`}],[`path`,{d:`M2 5h12`,key:`or177f`}],[`path`,{d:`M7 2h1`,key:`1t2jsx`}],[`path`,{d:`m22 22-5-10-5 10`,key:`don7ne`}],[`path`,{d:`M14 18h6`,key:`1m8k6r`}]]),hi=M(`list-checks`,[[`path`,{d:`M13 5h8`,key:`a7qcls`}],[`path`,{d:`M13 12h8`,key:`h98zly`}],[`path`,{d:`M13 19h8`,key:`c3s6r1`}],[`path`,{d:`m3 17 2 2 4-4`,key:`1jhpwq`}],[`path`,{d:`m3 7 2 2 4-4`,key:`1obspn`}]]),gi=M(`loader-circle`,[[`path`,{d:`M21 12a9 9 0 1 1-6.219-8.56`,key:`13zald`}]]),_i=M(`messages-square`,[[`path`,{d:`M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z`,key:`1n2ejm`}],[`path`,{d:`M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1`,key:`1qfcsi`}]]),vi=M(`network`,[[`rect`,{x:`16`,y:`16`,width:`6`,height:`6`,rx:`1`,key:`4q2zg0`}],[`rect`,{x:`2`,y:`16`,width:`6`,height:`6`,rx:`1`,key:`8cvhb9`}],[`rect`,{x:`9`,y:`2`,width:`6`,height:`6`,rx:`1`,key:`1egb70`}],[`path`,{d:`M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3`,key:`1jsf9p`}],[`path`,{d:`M12 12V8`,key:`2874zd`}]]),yi=M(`play`,[[`path`,{d:`M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z`,key:`10ikf1`}]]),bi=M(`rotate-ccw`,[[`path`,{d:`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`,key:`1357e3`}],[`path`,{d:`M3 3v5h5`,key:`1xhq8a`}]]),xi=M(`search`,[[`path`,{d:`m21 21-4.34-4.34`,key:`14j7rj`}],[`circle`,{cx:`11`,cy:`11`,r:`8`,key:`4ej97u`}]]),Si=M(`send`,[[`path`,{d:`M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z`,key:`1ffxy3`}],[`path`,{d:`m21.854 2.147-10.94 10.939`,key:`12cjpa`}]]),Ci=M(`shuffle`,[[`path`,{d:`m18 14 4 4-4 4`,key:`10pe0f`}],[`path`,{d:`m18 2 4 4-4 4`,key:`pucp1d`}],[`path`,{d:`M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22`,key:`1ailkh`}],[`path`,{d:`M2 6h1.972a4 4 0 0 1 3.6 2.2`,key:`km57vx`}],[`path`,{d:`M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45`,key:`os18l9`}]]),wi=M(`thumbs-down`,[[`path`,{d:`M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z`,key:`m61m77`}],[`path`,{d:`M17 14V2`,key:`8ymqnk`}]]),Ti=M(`thumbs-up`,[[`path`,{d:`M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z`,key:`emmmcr`}],[`path`,{d:`M7 10v12`,key:`1qc93n`}]]),Ei=M(`workflow`,[[`rect`,{width:`8`,height:`8`,x:`3`,y:`3`,rx:`2`,key:`by2w9f`}],[`path`,{d:`M7 11v4a2 2 0 0 0 2 2h4`,key:`xkn7yn`}],[`rect`,{width:`8`,height:`8`,x:`13`,y:`13`,rx:`2`,key:`1cgmvn`}]]),Di=M(`x`,[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]);function Oi(){let{lang:e,setLang:t,t:n}=j();return(0,A.jsxs)(`label`,{className:`sidebar__lang`,children:[(0,A.jsx)(mi,{size:16}),(0,A.jsx)(`span`,{className:`visually-hidden`,children:n(`language.label`)}),(0,A.jsx)(`select`,{className:`sidebar__lang-select`,value:e,onChange:e=>t(e.target.value),children:hr.map(e=>(0,A.jsx)(`option`,{value:e.code,children:e.label},e.code))})]})}var ki=[{id:`home`,items:[{to:`/`,labelKey:`nav.home`,icon:pi,end:!0}]},{id:`training`,titleKey:`nav.training`,icon:di,items:[{to:`/training/interview`,labelKey:`nav.interview`,icon:_i},{to:`/training/tasks`,labelKey:`nav.tasks`,icon:hi}]},{id:`knowledge-base`,titleKey:`nav.knowledgeBase`,icon:Qr,items:[{to:`/knowledge-base/resources`,labelKey:`nav.resources`,icon:ci},{to:`/knowledge-base/questions`,labelKey:`nav.questions`,icon:ii},{to:`/knowledge-base/collections`,labelKey:`nav.collections`,icon:li}]},{id:`analytics`,items:[{to:`/analytics`,labelKey:`nav.analytics`,icon:$r,end:!0}]}];function Ai(){let{t:e}=j();return(0,A.jsxs)(`aside`,{className:`sidebar`,children:[(0,A.jsxs)(`div`,{className:`sidebar__brand`,children:[(0,A.jsx)(`span`,{className:`sidebar__brand-badge`,children:`IP`}),(0,A.jsx)(`span`,{className:`sidebar__brand-name`,children:`Interview Prep`})]}),(0,A.jsx)(`div`,{className:`sidebar__lang-row`,children:(0,A.jsx)(Oi,{})}),(0,A.jsx)(`nav`,{className:`sidebar__nav`,children:ki.map(t=>(0,A.jsxs)(`div`,{className:`sidebar__section`,children:[t.titleKey&&(0,A.jsxs)(`div`,{className:`sidebar__section-title`,children:[t.icon&&(0,A.jsx)(t.icon,{size:14}),(0,A.jsx)(`span`,{children:e(t.titleKey)})]}),(0,A.jsx)(`ul`,{className:`sidebar__list`,children:t.items.map(t=>(0,A.jsx)(`li`,{children:(0,A.jsxs)(In,{to:t.to,end:t.end,className:({isActive:e})=>`sidebar__link`+(e?` sidebar__link--active`:``),children:[(0,A.jsx)(t.icon,{size:17}),(0,A.jsx)(`span`,{children:e(t.labelKey)})]})},t.to))})]},t.id))})]})}function ji(){let{questions:e,loading:t}=Ar(),{t:n}=j(),r=e.length,i=e.filter(e=>e.status===`learned`).length,a=e.filter(e=>e.favorite).length,o=new Set(e.flatMap(e=>e.skills)).size;return(0,A.jsxs)(`div`,{className:`page`,children:[(0,A.jsx)(`h1`,{className:`page-title`,children:n(`home.title`)}),(0,A.jsx)(`p`,{className:`home__subtitle`,children:n(t?`questions.loadingIndex`:`home.subtitle`)}),(0,A.jsxs)(`div`,{className:`stat-grid`,children:[(0,A.jsxs)(`div`,{className:`stat-card`,children:[(0,A.jsx)(`span`,{className:`stat-card__value`,children:r}),(0,A.jsx)(`span`,{className:`stat-card__label`,children:n(`home.stats.total`)})]}),(0,A.jsxs)(`div`,{className:`stat-card`,children:[(0,A.jsx)(`span`,{className:`stat-card__value`,children:i}),(0,A.jsx)(`span`,{className:`stat-card__label`,children:n(`home.stats.learned`)})]}),(0,A.jsxs)(`div`,{className:`stat-card`,children:[(0,A.jsx)(`span`,{className:`stat-card__value`,children:a}),(0,A.jsx)(`span`,{className:`stat-card__label`,children:n(`home.stats.favorites`)})]}),(0,A.jsxs)(`div`,{className:`stat-card`,children:[(0,A.jsx)(`span`,{className:`stat-card__value`,children:o}),(0,A.jsx)(`span`,{className:`stat-card__label`,children:n(`home.stats.skills`)})]})]}),(0,A.jsxs)(`div`,{className:`quick-links`,children:[(0,A.jsxs)(Fn,{to:`/knowledge-base/questions`,className:`quick-link-card`,children:[(0,A.jsx)(ii,{size:22}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`quick-link-card__title`,children:n(`nav.questions`)}),(0,A.jsx)(`div`,{className:`quick-link-card__desc`,children:n(`home.links.questionsDesc`)})]})]}),(0,A.jsxs)(Fn,{to:`/training/interview`,className:`quick-link-card`,children:[(0,A.jsx)(_i,{size:22}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`quick-link-card__title`,children:n(`nav.interview`)}),(0,A.jsx)(`div`,{className:`quick-link-card__desc`,children:n(`home.links.interviewDesc`)})]})]}),(0,A.jsxs)(Fn,{to:`/analytics`,className:`quick-link-card`,children:[(0,A.jsx)($r,{size:22}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`div`,{className:`quick-link-card__title`,children:n(`nav.analytics`)}),(0,A.jsx)(`div`,{className:`quick-link-card__desc`,children:n(`home.links.analyticsDesc`)})]})]})]})]})}function Mi({items:e}){let{t}=j();return(0,A.jsx)(`nav`,{className:`breadcrumbs`,"aria-label":t(`breadcrumb.label`),children:e.map((t,n)=>{let r=n===e.length-1;return(0,A.jsxs)(`span`,{className:`breadcrumbs__item`,children:[t.to&&!r?(0,A.jsx)(Fn,{to:t.to,className:`breadcrumbs__link`,children:t.label}):(0,A.jsx)(`span`,{className:r?`breadcrumbs__current`:``,children:t.label}),!r&&(0,A.jsx)(ri,{size:14,className:`breadcrumbs__sep`})]},n)})})}function N({text:e}){let t=e.split(/(`[^`]+`)/g);return(0,A.jsx)(A.Fragment,{children:t.map((e,t)=>e.startsWith("`")&&e.endsWith("`")?(0,A.jsx)(`code`,{className:`inline-code`,children:e.slice(1,-1)},t):(0,A.jsx)(`span`,{children:e},t))})}function Ni(){let{updateProgress:e}=Ar();return{learn:(0,_.useCallback)(t=>{e(t,e=>({...e,learnedCount:Math.min(e.learnedCount+1,e.learnedGoal)}))},[e]),repeat:(0,_.useCallback)(t=>{e(t,e=>({...e,learnedCount:0}))},[e]),toggleFavorite:(0,_.useCallback)(t=>{e(t,e=>({...e,favorite:!e.favorite}))},[e]),canRepeat:(0,_.useCallback)(e=>e.learnedCount>0,[])}}function Pi({question:e}){let[t,n]=(0,_.useState)(!1),r=(0,_.useRef)(null),i=Ct(),{learn:a,repeat:o,toggleFavorite:s,canRepeat:c}=Ni(),{t:l}=j();(0,_.useEffect)(()=>{if(!t)return;function e(e){r.current&&!r.current.contains(e.target)&&n(!1)}return document.addEventListener(`mousedown`,e),()=>document.removeEventListener(`mousedown`,e)},[t]);let u=c(e);return(0,A.jsxs)(`div`,{className:`card-menu`,ref:r,children:[(0,A.jsx)(`button`,{type:`button`,className:`card-menu__trigger`,onClick:()=>n(e=>!e),"aria-label":l(`actions.questionActions`),children:(0,A.jsx)(oi,{size:18})}),t&&(0,A.jsxs)(`div`,{className:`card-menu__dropdown`,children:[(0,A.jsxs)(`button`,{type:`button`,className:`card-menu__item`,onClick:()=>{n(!1),i(`/knowledge-base/questions/${e.id}`)},children:[(0,A.jsx)(si,{size:15}),l(`actions.more`)]}),(0,A.jsxs)(`button`,{type:`button`,className:`card-menu__item`,onClick:()=>{a(e.id),n(!1)},children:[(0,A.jsx)(di,{size:15}),l(`actions.learn`)]}),(0,A.jsxs)(`button`,{type:`button`,className:`card-menu__item`,disabled:!u,onClick:()=>{u&&(o(e.id),n(!1))},children:[(0,A.jsx)(bi,{size:15}),l(`actions.repeat`)]}),(0,A.jsxs)(`button`,{type:`button`,className:`card-menu__item`,onClick:()=>{s(e.id),n(!1)},children:[(0,A.jsx)(fi,{size:15,fill:e.favorite?`currentColor`:`none`}),e.favorite?l(`actions.unfavorite`):l(`actions.favorite`)]})]})]})}var Fi=new Set(`async.await.break.case.catch.class.const.continue.debugger.default.delete.do.else.export.extends.finally.for.function.if.import.in.instanceof.let.new.of.return.static.super.switch.this.throw.try.typeof.var.void.while.with.yield`.split(`.`)),Ii=new Set([`true`,`false`,`null`,`undefined`,`NaN`,`Infinity`]);function P(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function F(e,t){return`<span class="tok tok--${e}">${P(t)}</span>`}var I=new RegExp([`(\\/\\/[^\\n]*)`,`(\\/\\*[\\s\\S]*?\\*\\/)`,"(`(?:\\\\.|[^`\\\\])*`)",`("(?:\\\\.|[^"\\\\\\n])*")`,`('(?:\\\\.|[^'\\\\\\n])*')`,`(<\\/?[A-Za-z][\\w.:-]*(?=[\\s/>]))`,`(\\/?>)`,`(\\b\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?\\b)`,`([A-Za-z_$][A-Za-z0-9_$]*)`].join(`|`),`gi`),L=/<[A-Za-z][\w.:-]*(\s[^<>&|]*)?\/?>/;function Li(e){let t=L.test(e),n=``,r=0,i=!1,a=0;for(let o of e.matchAll(I)){let[s,c,l,u,d,f,p,m,h,g]=o,_=e.slice(r,o.index);if(n+=P(_),r=o.index+s.length,i)for(let e of _)e===`{`?a+=1:e===`}`&&(a=Math.max(0,a-1));c||l?n+=F(`comment`,s):u||d||f?n+=F(`string`,s):p?t?(i=!0,a=0,n+=F(`tag`,s)):n+=P(s):m?t&&i&&a===0?(i=!1,n+=F(`tag`,s)):n+=P(s):h?n+=F(`number`,s):g&&Fi.has(g)?n+=F(`keyword`,s):g&&Ii.has(g)?n+=F(`literal`,s):n+=g&&i&&a===0?F(`attr`,s):P(s)}return n+=P(e.slice(r)),n}var Ri=new RegExp([`(\\/\\*[\\s\\S]*?\\*\\/)`,`("(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*')`,`(@[\\w-]+|!important)`,`([{}])`,`([-\\w]+)(?=\\s*:)`,`(#[0-9a-fA-F]{3,8}\\b|\\b\\d+(?:\\.\\d+)?[a-z%]*)`].join(`|`),`g`);function zi(e,t){if(t>0)return P(e);let n=e.trim();if(!n)return P(e);let r=e.indexOf(n);return P(e.slice(0,r))+F(`selector`,n)+P(e.slice(r+n.length))}function Bi(e){let t=``,n=0,r=0;for(let i of e.matchAll(Ri)){let[a,o,s,c,l,u,d]=i;t+=zi(e.slice(n,i.index),r),n=i.index+a.length,o?t+=F(`comment`,a):s?t+=F(`string`,a):c?t+=F(`keyword`,a):l?(r=l===`{`?r+1:Math.max(0,r-1),t+=P(a)):t+=u?F(r>0?`property`:`selector`,a):d?F(`number`,a):P(a)}return t+=zi(e.slice(n),r),t}function Vi(e,t){let n=0;for(let r=t;r<e.length;r++)if(e[r]===`{`)n+=1;else if(e[r]===`}`&&--n===0)return r;return e.length}function Hi(e){let t=``,n=0;for(;n<e.length;){let r=e[n];if(r===`"`||r===`'`){let i=e.indexOf(r,n+1),a=i===-1?e.length:i+1;t+=F(`string`,e.slice(n,a)),n=a;continue}if(r===`{`){let r=Vi(e,n);t+=P(`{`)+Li(e.slice(n+1,r))+P(e.slice(r,r+1)),n=r+1;continue}let i=/^[A-Za-z_@:$][\w:.$-]*/.exec(e.slice(n));if(i){t+=F(`attr`,i[0]),n+=i[0].length;continue}t+=P(r),n+=1}return t}function Ui(e,t){let n=null,r=0;for(let i=t;i<e.length;i++){let t=e[i];if(n)t===n&&(n=null);else if(t===`"`||t===`'`)n=t;else if(t===`{`)r+=1;else if(t===`}`)r=Math.max(0,r-1);else if(t===`>`&&r===0)return i}return e.length}function Wi(e){let t=``,n=0;for(;n<e.length;){let r=e.indexOf(`<`,n);if(r===-1){t+=P(e.slice(n));break}if(t+=P(e.slice(n,r)),e.startsWith(`<!--`,r)){let i=e.indexOf(`-->`,r),a=i===-1?e.length:i+3;t+=F(`comment`,e.slice(r,a)),n=a;continue}if(/^<!\w/.test(e.slice(r))){let i=Ui(e,r);t+=F(`keyword`,e.slice(r,Math.min(i+1,e.length))),n=i+1;continue}let i=/^<\/?[A-Za-z][\w.:-]*/.exec(e.slice(r));if(!i){t+=P(`<`),n=r+1;continue}let a=r+i[0].length,o=Ui(e,a),s=e.slice(o,o+1)===`>`,c=e.slice(a,o),l=c.endsWith(`/`);t+=F(`tag`,i[0]),t+=Hi(l?c.slice(0,-1):c),t+=F(`tag`,(l?`/`:``)+(s?`>`:``)),n=o+1;let u=i[0].replace(/^<\/?/,``).toLowerCase();if(!i[0].startsWith(`</`)&&!l&&s&&(u===`script`||u===`style`)){let r=e.toLowerCase().indexOf(`</${u}`,n),i=r===-1?e.length:r,a=e.slice(n,i);t+=u===`script`?Li(a):Bi(a),n=i}}return t}function Gi(e){return!/(\bfunction\b|=>|\bconst\b|\blet\b|\bvar\b|\bimport\b|\breturn\b|console\.)/.test(e)&&/(^|\})\s*[^{}();]+\{[^{}]*[-\w]+\s*:[^{};]+;/.test(e)}function Ki(e){let t=e.trim();return t?t.startsWith(`<`)?`html`:Gi(t)?`css`:`js`:`text`}function qi(e,t=`auto`){let n=t===`auto`?Ki(e):t;return n===`html`?Wi(e):n===`css`?Bi(e):n===`js`?Li(e):P(e)}function Ji({code:e,language:t=`auto`}){let[n,r]=(0,_.useState)(!1),{t:i}=j(),a=(0,_.useMemo)(()=>qi(e,t),[e,t]);async function o(){try{await navigator.clipboard.writeText(e),r(!0),setTimeout(()=>r(!1),1500)}catch{}}return(0,A.jsxs)(`div`,{className:`code-block`,children:[(0,A.jsxs)(`button`,{className:`code-block__copy`,onClick:o,type:`button`,children:[n?(0,A.jsx)(ei,{size:14}):(0,A.jsx)(ai,{size:14}),i(n?`code.copied`:`code.copy`)]}),(0,A.jsx)(`pre`,{children:(0,A.jsx)(`code`,{dangerouslySetInnerHTML:{__html:a}})})]})}var Yi={chunkSize:100,languages:{ru:{total:3367,chunks:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33]},cs:{total:3367,chunks:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33]},en:{total:40,chunks:[27]},uk:{total:40,chunks:[27]}}},Xi=Object.assign({"../data/generated/bodies/cs/000.json":()=>S(()=>import(`./000--ZWcHpi-.js`),[]),"../data/generated/bodies/cs/001.json":()=>S(()=>import(`./001-Cy26YT1p.js`),[]),"../data/generated/bodies/cs/002.json":()=>S(()=>import(`./002-DcLYLz8Z.js`),[]),"../data/generated/bodies/cs/003.json":()=>S(()=>import(`./003-cGhAPqg0.js`),[]),"../data/generated/bodies/cs/004.json":()=>S(()=>import(`./004-Bscmh0Fi.js`),[]),"../data/generated/bodies/cs/005.json":()=>S(()=>import(`./005-1rYJcm3T.js`),[]),"../data/generated/bodies/cs/006.json":()=>S(()=>import(`./006-B3XG9Uln.js`),[]),"../data/generated/bodies/cs/007.json":()=>S(()=>import(`./007-CwyUvqCa.js`),[]),"../data/generated/bodies/cs/008.json":()=>S(()=>import(`./008-Di53Ad_-.js`),[]),"../data/generated/bodies/cs/009.json":()=>S(()=>import(`./009-C_1xL-Ce.js`),[]),"../data/generated/bodies/cs/010.json":()=>S(()=>import(`./010-SoodD_Q4.js`),[]),"../data/generated/bodies/cs/011.json":()=>S(()=>import(`./011-C_kJKn6q.js`),[]),"../data/generated/bodies/cs/012.json":()=>S(()=>import(`./012-DFDe8wOI.js`),[]),"../data/generated/bodies/cs/013.json":()=>S(()=>import(`./013-CJOG-D_f.js`),[]),"../data/generated/bodies/cs/014.json":()=>S(()=>import(`./014-_NhKiA-A.js`),[]),"../data/generated/bodies/cs/015.json":()=>S(()=>import(`./015-BieHMn_2.js`),[]),"../data/generated/bodies/cs/016.json":()=>S(()=>import(`./016-gM2dVt0O.js`),[]),"../data/generated/bodies/cs/017.json":()=>S(()=>import(`./017-4_4rUq-p.js`),[]),"../data/generated/bodies/cs/018.json":()=>S(()=>import(`./018-DX_PQXz4.js`),[]),"../data/generated/bodies/cs/019.json":()=>S(()=>import(`./019-BETverjM.js`),[]),"../data/generated/bodies/cs/020.json":()=>S(()=>import(`./020-04dyLHJa.js`),[]),"../data/generated/bodies/cs/021.json":()=>S(()=>import(`./021-DzOXLV8h.js`),[]),"../data/generated/bodies/cs/022.json":()=>S(()=>import(`./022-DR-SR4PW.js`),[]),"../data/generated/bodies/cs/023.json":()=>S(()=>import(`./023-CFxXHGqp.js`),[]),"../data/generated/bodies/cs/024.json":()=>S(()=>import(`./024-DLsdAKen.js`),[]),"../data/generated/bodies/cs/025.json":()=>S(()=>import(`./025-CzwacnQf.js`),[]),"../data/generated/bodies/cs/026.json":()=>S(()=>import(`./026-urCRKcKP.js`),[]),"../data/generated/bodies/cs/027.json":()=>S(()=>import(`./027-BImjmmDD.js`),[]),"../data/generated/bodies/cs/028.json":()=>S(()=>import(`./028-BEsQfPnx.js`),[]),"../data/generated/bodies/cs/029.json":()=>S(()=>import(`./029-CU6Ea4Jh.js`),[]),"../data/generated/bodies/cs/030.json":()=>S(()=>import(`./030-D6vInnFu.js`),[]),"../data/generated/bodies/cs/031.json":()=>S(()=>import(`./031-z0pinAwR.js`),[]),"../data/generated/bodies/cs/032.json":()=>S(()=>import(`./032-BmTfVAkm.js`),[]),"../data/generated/bodies/cs/033.json":()=>S(()=>import(`./033-DzPltxBJ.js`),[]),"../data/generated/bodies/en/027.json":()=>S(()=>import(`./027-DdUBwRbU.js`),[]),"../data/generated/bodies/ru/000.json":()=>S(()=>import(`./000-ozUeIu8R.js`),[]),"../data/generated/bodies/ru/001.json":()=>S(()=>import(`./001-B6voTg9c.js`),[]),"../data/generated/bodies/ru/002.json":()=>S(()=>import(`./002-DAwDQUxt.js`),[]),"../data/generated/bodies/ru/003.json":()=>S(()=>import(`./003-DAsxeaNV.js`),[]),"../data/generated/bodies/ru/004.json":()=>S(()=>import(`./004-BepxVO1F.js`),[]),"../data/generated/bodies/ru/005.json":()=>S(()=>import(`./005-BeSAtfoJ.js`),[]),"../data/generated/bodies/ru/006.json":()=>S(()=>import(`./006-DmC4kmnS.js`),[]),"../data/generated/bodies/ru/007.json":()=>S(()=>import(`./007-Dd5pviG2.js`),[]),"../data/generated/bodies/ru/008.json":()=>S(()=>import(`./008-CyH94hbU.js`),[]),"../data/generated/bodies/ru/009.json":()=>S(()=>import(`./009-B3C8KiWh.js`),[]),"../data/generated/bodies/ru/010.json":()=>S(()=>import(`./010-BbSHUtJ-.js`),[]),"../data/generated/bodies/ru/011.json":()=>S(()=>import(`./011-v8Ewe7IT.js`),[]),"../data/generated/bodies/ru/012.json":()=>S(()=>import(`./012-CkMjBSaZ.js`),[]),"../data/generated/bodies/ru/013.json":()=>S(()=>import(`./013-g5DxK8yK.js`),[]),"../data/generated/bodies/ru/014.json":()=>S(()=>import(`./014-CEsxcpYe.js`),[]),"../data/generated/bodies/ru/015.json":()=>S(()=>import(`./015-Cl088DDq.js`),[]),"../data/generated/bodies/ru/016.json":()=>S(()=>import(`./016-BYAq4spS.js`),[]),"../data/generated/bodies/ru/017.json":()=>S(()=>import(`./017-Fl59sAwo.js`),[]),"../data/generated/bodies/ru/018.json":()=>S(()=>import(`./018-CUZOP0Nl.js`),[]),"../data/generated/bodies/ru/019.json":()=>S(()=>import(`./019-C2jbVfmZ.js`),[]),"../data/generated/bodies/ru/020.json":()=>S(()=>import(`./020-CMp1hPgu.js`),[]),"../data/generated/bodies/ru/021.json":()=>S(()=>import(`./021-Cj5F_HsD.js`),[]),"../data/generated/bodies/ru/022.json":()=>S(()=>import(`./022-4RUisnK8.js`),[]),"../data/generated/bodies/ru/023.json":()=>S(()=>import(`./023-BQXP46bZ.js`),[]),"../data/generated/bodies/ru/024.json":()=>S(()=>import(`./024-CWzTjZtz.js`),[]),"../data/generated/bodies/ru/025.json":()=>S(()=>import(`./025-DylNKT8X.js`),[]),"../data/generated/bodies/ru/026.json":()=>S(()=>import(`./026-MR9Ed1J3.js`),[]),"../data/generated/bodies/ru/027.json":()=>S(()=>import(`./027-iubnpl9r.js`),[]),"../data/generated/bodies/ru/028.json":()=>S(()=>import(`./028-BoHt4PzA.js`),[]),"../data/generated/bodies/ru/029.json":()=>S(()=>import(`./029-GuGXQ3HG.js`),[]),"../data/generated/bodies/ru/030.json":()=>S(()=>import(`./030-B_TfHkTG.js`),[]),"../data/generated/bodies/ru/031.json":()=>S(()=>import(`./031-DJi1q1m2.js`),[]),"../data/generated/bodies/ru/032.json":()=>S(()=>import(`./032-CReeVna1.js`),[]),"../data/generated/bodies/ru/033.json":()=>S(()=>import(`./033-6Sb_GKkD.js`),[]),"../data/generated/bodies/uk/027.json":()=>S(()=>import(`./027-BrEr6bWM.js`),[])}),Zi=new Map,Qi=new Map;function $i(e){return Math.floor((e-1)/Yi.chunkSize)}function ea(e,t){return`${e}:${t}`}function ta(e,t){let n=ea(e,t),r=Qi.get(n);if(r)return Promise.resolve(r);let i=Zi.get(n);if(i)return i;let a=`../data/generated/bodies/${e}/${String(t).padStart(3,`0`)}.json`,o=Xi[a];if(!o)return Promise.reject(Error(`Нет чанка ответов: ${a}`));let s=o().then(e=>{let t=e.default??e,r=new Map(t.map(([e,t,n,r])=>[e,{shortAnswer:t,longAnswer:n,codeExample:r??void 0}]));return Qi.set(n,r),Zi.delete(n),r}).catch(e=>{throw Zi.delete(n),e});return Zi.set(n,s),s}async function na(e,t){return(await ta(t,$i(e))).get(e)??null}function ra(e,t){return Qi.get(ea(t,$i(e)))?.get(e)??null}function ia(e){let{lang:t}=j(),n=e==null?null:ra(e,t),[r,i]=(0,_.useState)(null);(0,_.useEffect)(()=>{if(e==null||ra(e,t))return;let n=!0;return na(e,t).then(r=>{n&&i({id:e,lang:t,body:r,error:null})}).catch(r=>{n&&i({id:e,lang:t,body:null,error:r})}),()=>{n=!1}},[e,t]);let a=r?.id===e&&r?.lang===t?r:null,o=n??a?.body??null,s=a?.error??null;return{body:o,error:s,loading:e!=null&&o===null&&s===null}}function aa({question:e}){let[t,n]=(0,_.useState)(!1),{t:r}=j(),i=e.status===`learned`,{body:a,loading:o}=ia(t?e.id:null);return(0,A.jsxs)(`div`,{className:`question-card`,children:[(0,A.jsxs)(`button`,{type:`button`,className:`question-card__header`,onClick:()=>n(e=>!e),"aria-expanded":t,children:[(0,A.jsx)(`span`,{className:`status-badge ${i?`status-badge--learned`:`status-badge--not-learned`}`,children:r(i?`questions.learned`:`questions.notLearned`)}),(0,A.jsx)(`span`,{className:`question-card__question`,children:e.question}),(0,A.jsx)(ti,{size:20,className:`question-card__chevron`+(t?` question-card__chevron--open`:``)})]}),t&&(0,A.jsxs)(`div`,{className:`question-card__body`,children:[(0,A.jsxs)(`div`,{className:`question-card__meta`,children:[(0,A.jsxs)(`span`,{className:`pill pill--rating`,children:[r(`common.rating`),` `,e.rating]}),(0,A.jsxs)(`span`,{className:`pill pill--difficulty`,children:[r(`common.complexity`),` `,e.difficulty]}),(0,A.jsx)(`div`,{className:`question-card__menu-slot`,children:(0,A.jsx)(Pi,{question:e})})]}),o?(0,A.jsx)(`p`,{className:`question-card__answer answer-loading`,children:r(`common.loadingAnswer`)}):a&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`p`,{className:`question-card__answer`,children:(0,A.jsx)(N,{text:a.shortAnswer})}),a.codeExample&&(0,A.jsx)(Ji,{code:a.codeExample})]})]})]})}var oa=[`HTML`,`CSS`,`JavaScript`,`TypeScript`,`React`,`React Router`,`Next.js`,`Redux`,`Git`,`Docker`,`Kubernetes`,`CI/CD`,`Webpack`,`Networks`],sa={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},ca=_.createContext&&_.createContext(sa),R=[`attr`,`size`,`title`];function la(e,t){if(e==null)return{};var n,r,i=ua(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function ua(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function da(){return da=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},da.apply(null,arguments)}function fa(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function pa(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?fa(Object(n),!0).forEach(function(t){ma(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):fa(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function ma(e,t,n){return(t=ha(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ha(e){var t=ga(e,`string`);return typeof t==`symbol`?t:t+``}function ga(e,t){if(typeof e!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function _a(e){return e&&e.map((e,t)=>_.createElement(e.tag,pa({key:t},e.attr),_a(e.child)))}function va(e){return t=>_.createElement(ya,da({attr:pa({},e.attr)},t),_a(e.child))}function ya(e){var t=t=>{var n=e.attr,r=e.size,i=e.title,a=la(e,R),o=r||t.size||`1em`,s;return t.className&&(s=t.className),e.className&&(s=(s?s+` `:``)+e.className),_.createElement(`svg`,da({stroke:`currentColor`,fill:`currentColor`,strokeWidth:`0`},t.attr,n,a,{className:s,style:pa(pa({color:e.color||t.color},t.style),e.style),height:o,width:o,xmlns:`http://www.w3.org/2000/svg`}),i&&_.createElement(`title`,null,i),e.children)};return ca===void 0?t(sa):_.createElement(ca.Consumer,null,e=>t(e))}function ba(e){return va({tag:`svg`,attr:{role:`img`,viewBox:`0 0 24 24`},child:[{tag:`path`,attr:{d:`M22.1987 18.498l-9.7699 5.5022v-4.2855l6.0872-3.3338 3.6826 2.117zm.6683-.6026V6.3884l-3.5752 2.0544v7.396zm-21.0657.6026l9.7699 5.5022v-4.2855L5.484 16.3809l-3.6826 2.117zm-.6683-.6026V6.3884l3.5751 2.0544v7.396zm.4183-12.2515l10.0199-5.644v4.1434L5.152 7.6586l-.0489.028zm20.8975 0l-10.02-5.644v4.1434l6.4192 3.5154.0489.028 3.5518-2.0427zm-10.8775 13.096l-6.0056-3.2873V8.9384l6.0054 3.4525v6.349zm.8575 0l6.0053-3.2873V8.9384l-6.0053 3.4525zM5.9724 8.1845l6.0287-3.3015L18.03 8.1845l-6.0288 3.4665z`},child:[]}]})(e)}function xa(e){return va({tag:`svg`,attr:{role:`img`,viewBox:`0 0 24 24`},child:[{tag:`path`,attr:{d:`M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z`},child:[]}]})(e)}function Sa(e){return va({tag:`svg`,attr:{role:`img`,viewBox:`0 0 24 24`},child:[{tag:`path`,attr:{d:`M16.634 16.504c.87-.075 1.543-.84 1.5-1.754-.047-.914-.796-1.648-1.709-1.648h-.061a1.71 1.71 0 00-1.648 1.769c.03.479.226.869.494 1.153-1.048 2.038-2.621 3.536-5.005 4.795-1.603.838-3.296 1.154-4.944.93-1.378-.195-2.456-.81-3.116-1.799-.988-1.499-1.078-3.116-.255-4.734.6-1.17 1.499-2.023 2.099-2.443a9.96 9.96 0 01-.42-1.543C-.868 14.408-.416 18.752.932 20.805c1.004 1.498 3.057 2.456 5.304 2.456.6 0 1.23-.044 1.843-.194 3.897-.749 6.848-3.086 8.541-6.532zm5.348-3.746c-2.32-2.728-5.738-4.226-9.634-4.226h-.51c-.253-.554-.837-.899-1.498-.899h-.045c-.943 0-1.678.81-1.647 1.753.03.898.794 1.648 1.708 1.648h.074a1.69 1.69 0 001.499-1.049h.555c2.309 0 4.495.674 6.488 1.992 1.527 1.005 2.622 2.323 3.237 3.897.538 1.288.509 2.547-.045 3.597-.855 1.647-2.294 2.517-4.196 2.517-1.199 0-2.367-.375-2.967-.644-.36.298-.96.793-1.394 1.093 1.318.598 2.652.943 3.94.943 2.922 0 5.094-1.647 5.919-3.236.898-1.798.824-4.824-1.47-7.416zM6.49 17.042c.03.899.793 1.648 1.708 1.648h.06a1.688 1.688 0 001.648-1.768c0-.9-.779-1.647-1.693-1.647h-.06c-.06 0-.15 0-.226.029-1.243-2.098-1.768-4.347-1.572-6.772.12-1.828.72-3.417 1.797-4.735.9-1.124 2.593-1.68 3.747-1.708 3.236-.061 4.585 3.971 4.689 5.574l1.498.45C17.741 3.197 14.686.62 11.764.62 9.02.62 6.49 2.613 5.47 5.535 4.077 9.43 4.991 13.177 6.7 16.174c-.15.195-.24.539-.21.868z`},child:[]}]})(e)}function Ca(e){return va({tag:`svg`,attr:{role:`img`,viewBox:`0 0 24 24`},child:[{tag:`path`,attr:{d:`M12.118 5.466a2.306 2.306 0 00-.623.08c-.278.067-.702.332-.953.583-.41.423-.49.609-.662 1.469-.08.423.41 1.43.847 1.734.45.317 1.085.502 2.065.608 1.429.16 1.84.636 1.84 2.197 0 1.377-.385 1.747-1.96 1.906-1.707.172-2.58.834-2.765 2.117-.106.781.41 1.76 1.125 2.091 1.627.768 3.15-.198 3.467-2.196.211-1.284.622-1.642 1.998-1.747 1.588-.133 2.409-.675 2.713-1.787.278-1.02-.304-2.157-1.297-2.554-.264-.106-.873-.238-1.35-.291-1.495-.16-1.879-.424-2.038-1.39-.225-1.337-.317-1.562-.794-2.09a2.174 2.174 0 00-1.613-.73zm-4.785 4.36a2.145 2.145 0 00-.497.048c-1.469.318-2.17 2.051-1.35 3.295 1.178 1.774 3.944.953 3.97-1.177.012-1.193-.98-2.143-2.123-2.166zM2.089 14.19a2.22 2.22 0 00-.427.052c-2.158.476-2.237 3.626-.106 4.182.53.145.582.145 1.111.013 1.191-.318 1.866-1.456 1.549-2.607-.278-1.02-1.144-1.664-2.127-1.64zm19.824.008c-.233.002-.477.058-.784.162-1.39.477-1.866 2.092-.98 3.336.557.794 1.96 1.058 2.82.516 1.416-.874 1.363-3.057-.093-3.746-.38-.186-.663-.271-.963-.268z`},child:[]}]})(e)}function wa(e){return va({tag:`svg`,attr:{role:`img`,viewBox:`0 0 24 24`},child:[{tag:`path`,attr:{d:`M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z`},child:[]}]})(e)}function Ta(e){return va({tag:`svg`,attr:{role:`img`,viewBox:`0 0 24 24`},child:[{tag:`path`,attr:{d:`M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z`},child:[]}]})(e)}function Ea(e){return va({tag:`svg`,attr:{role:`img`,viewBox:`0 0 24 24`},child:[{tag:`path`,attr:{d:`M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l.01-.005.15-2.62a5.144 5.144 0 0 0-3.01 1.442l2.147 1.523.004-.002zm.76 2.75l.723.349.722-.347.18-.78-.5-.623h-.804l-.5.623.179.779zm1.5-3.095a.44.44 0 0 0 .7.336l.008.003 2.134-1.513a5.188 5.188 0 0 0-2.992-1.442l.148 2.615.002.001zm10.876 5.97l-5.773 7.181a1.6 1.6 0 0 1-1.248.594l-9.261.003a1.6 1.6 0 0 1-1.247-.596l-5.776-7.18a1.583 1.583 0 0 1-.307-1.34L2.1 5.573c.108-.47.425-.864.863-1.073L11.305.513a1.606 1.606 0 0 1 1.385 0l8.345 3.985c.438.209.755.604.863 1.073l2.062 8.955c.108.47-.005.963-.308 1.34zm-3.289-2.057c-.042-.01-.103-.026-.145-.034-.174-.033-.315-.025-.479-.038-.35-.037-.638-.067-.895-.148-.105-.04-.18-.165-.216-.216l-.201-.059a6.45 6.45 0 0 0-.105-2.332 6.465 6.465 0 0 0-.936-2.163c.052-.047.15-.133.177-.159.008-.09.001-.183.094-.282.197-.185.444-.338.743-.522.142-.084.273-.137.415-.242.032-.024.076-.062.11-.089.24-.191.295-.52.123-.736-.172-.216-.506-.236-.745-.045-.034.027-.08.062-.111.088-.134.116-.217.23-.33.35-.246.25-.45.458-.673.609-.097.056-.239.037-.303.033l-.19.135a6.545 6.545 0 0 0-4.146-2.003l-.012-.223c-.065-.062-.143-.115-.163-.25-.022-.268.015-.557.057-.905.023-.163.061-.298.068-.475.001-.04-.001-.099-.001-.142 0-.306-.224-.555-.5-.555-.275 0-.499.249-.499.555l.001.014c0 .041-.002.092 0 .128.006.177.044.312.067.475.042.348.078.637.056.906a.545.545 0 0 1-.162.258l-.012.211a6.424 6.424 0 0 0-4.166 2.003 8.373 8.373 0 0 1-.18-.128c-.09.012-.18.04-.297-.029-.223-.15-.427-.358-.673-.608-.113-.12-.195-.234-.329-.349-.03-.026-.077-.062-.111-.088a.594.594 0 0 0-.348-.132.481.481 0 0 0-.398.176c-.172.216-.117.546.123.737l.007.005.104.083c.142.105.272.159.414.242.299.185.546.338.743.522.076.082.09.226.1.288l.16.143a6.462 6.462 0 0 0-1.02 4.506l-.208.06c-.055.072-.133.184-.215.217-.257.081-.546.11-.895.147-.164.014-.305.006-.48.039-.037.007-.09.02-.133.03l-.004.002-.007.002c-.295.071-.484.342-.423.608.061.267.349.429.645.365l.007-.001.01-.003.129-.029c.17-.046.294-.113.448-.172.33-.118.604-.217.87-.256.112-.009.23.069.288.101l.217-.037a6.5 6.5 0 0 0 2.88 3.596l-.09.218c.033.084.069.199.044.282-.097.252-.263.517-.452.813-.091.136-.185.242-.268.399-.02.037-.045.095-.064.134-.128.275-.034.591.213.71.248.12.556-.007.69-.282v-.002c.02-.039.046-.09.062-.127.07-.162.094-.301.144-.458.132-.332.205-.68.387-.897.05-.06.13-.082.215-.105l.113-.205a6.453 6.453 0 0 0 4.609.012l.106.192c.086.028.18.042.256.155.136.232.229.507.342.84.05.156.074.295.145.457.016.037.043.09.062.129.133.276.442.402.69.282.247-.118.341-.435.213-.71-.02-.039-.045-.096-.065-.134-.083-.156-.177-.261-.268-.398-.19-.296-.346-.541-.443-.793-.04-.13.007-.21.038-.294-.018-.022-.059-.144-.083-.202a6.499 6.499 0 0 0 2.88-3.622c.064.01.176.03.213.038.075-.05.144-.114.28-.104.266.039.54.138.87.256.154.06.277.128.448.173.036.01.088.019.13.028l.009.003.007.001c.297.064.584-.098.645-.365.06-.266-.128-.537-.423-.608zM16.4 9.701l-1.95 1.746v.005a.44.44 0 0 0 .173.757l.003.01 2.526.728a5.199 5.199 0 0 0-.108-1.674A5.208 5.208 0 0 0 16.4 9.7zm-4.013 5.325a.437.437 0 0 0-.404-.232.44.44 0 0 0-.372.233h-.002l-1.268 2.292a5.164 5.164 0 0 0 3.326.003l-1.27-2.296h-.01zm1.888-1.293a.44.44 0 0 0-.27.036.44.44 0 0 0-.214.572l-.003.004 1.01 2.438a5.15 5.15 0 0 0 2.081-2.615l-2.6-.44-.004.005z`},child:[]}]})(e)}function Da(e){return va({tag:`svg`,attr:{role:`img`,viewBox:`0 0 24 24`},child:[{tag:`path`,attr:{d:`M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z`},child:[]}]})(e)}function Oa(e){return va({tag:`svg`,attr:{role:`img`,viewBox:`0 0 24 24`},child:[{tag:`path`,attr:{d:`M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z`},child:[]}]})(e)}function ka(e){return va({tag:`svg`,attr:{role:`img`,viewBox:`0 0 24 24`},child:[{tag:`path`,attr:{d:`M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z`},child:[]}]})(e)}function Aa(e){return va({tag:`svg`,attr:{role:`img`,viewBox:`0 0 24 24`},child:[{tag:`path`,attr:{d:`M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z`},child:[]}]})(e)}function ja(e){return va({tag:`svg`,attr:{role:`img`,viewBox:`0 0 24 24`},child:[{tag:`path`,attr:{d:`M0 0v20.16A3.84 3.84 0 0 0 3.84 24h16.32A3.84 3.84 0 0 0 24 20.16V3.84A3.84 3.84 0 0 0 20.16 0Zm14.256 13.08c1.56 0 2.28 1.08 2.304 2.64h-1.608c.024-.288-.048-.6-.144-.84-.096-.192-.288-.264-.552-.264-.456 0-.696.264-.696.84-.024.576.288.888.768 1.08.72.288 1.608.744 1.92 1.296q.432.648.432 1.656c0 1.608-.912 2.592-2.496 2.592-1.656 0-2.4-1.032-2.424-2.688h1.68c0 .792.264 1.176.792 1.176.264 0 .456-.072.552-.24.192-.312.24-1.176-.048-1.512-.312-.408-.912-.6-1.32-.816q-.828-.396-1.224-.936c-.24-.36-.36-.888-.36-1.536 0-1.44.936-2.472 2.424-2.448m5.4 0c1.584 0 2.304 1.08 2.328 2.64h-1.608c0-.288-.048-.6-.168-.84-.096-.192-.264-.264-.528-.264-.48 0-.72.264-.72.84s.288.888.792 1.08c.696.288 1.608.744 1.92 1.296.264.432.408.984.408 1.656.024 1.608-.888 2.592-2.472 2.592-1.68 0-2.424-1.056-2.448-2.688h1.68c0 .744.264 1.176.792 1.176.264 0 .456-.072.552-.24.216-.312.264-1.176-.048-1.512-.288-.408-.888-.6-1.32-.816-.552-.264-.96-.576-1.2-.936s-.36-.888-.36-1.536c-.024-1.44.912-2.472 2.4-2.448m-11.031.018c.711-.006 1.419.198 1.839.63.432.432.672 1.128.648 1.992H9.336c.024-.456-.096-.792-.432-.96-.312-.144-.768-.048-.888.24-.12.264-.192.576-.168.864v3.504c0 .744.264 1.128.768 1.128a.65.65 0 0 0 .552-.264c.168-.24.192-.552.168-.84h1.776c.096 1.632-.984 2.712-2.568 2.688-1.536 0-2.496-.864-2.472-2.472v-4.032c0-.816.24-1.44.696-1.848.432-.408 1.146-.624 1.857-.63`},child:[]}]})(e)}var Ma={HTML:{icon:Oa,color:`#E44D26`},CSS:{icon:ja,color:`#264DE4`},JavaScript:{icon:Da,color:`#F0DB4F`},TypeScript:{icon:xa,color:`#3178C6`},React:{icon:wa,color:`#61DAFB`},"React Router":{icon:Ca,color:`#CA4245`},"Next.js":{icon:Ta,color:`#000000`},Redux:{icon:Sa,color:`#764ABC`},Git:{icon:ka,color:`#F05032`},Docker:{icon:Aa,color:`#2496ED`},Kubernetes:{icon:Ea,color:`#326CE5`},"CI/CD":{icon:Ei,color:`#7C3AED`},Webpack:{icon:ba,color:`#8DD6F9`},Networks:{icon:vi,color:`#0EA5E9`}};function Na({skill:e,size:t=16,...n}){let r=Ma[e],i=r?.icon??ui;return(0,A.jsx)(i,{size:t,color:r?.color,...n})}var Pa=[`1-3`,`4-6`,`7-8`,`9-10`],Fa=[1,2,3,4,5];function Ia(e,t){return e.includes(t)?e.filter(e=>e!==t):[...e,t]}function La(){let{questions:e,filters:t,setFilters:n,resetFilters:r}=Ar(),{t:i}=j(),a=(0,_.useMemo)(()=>{let t=new Set(e.flatMap(e=>e.skills));return oa.filter(e=>t.has(e))},[e]),o=t.query||t.skills.length>0||t.difficultyRanges.length>0||t.ratings.length>0||t.status!==`all`||t.favoriteOnly;return(0,A.jsxs)(`aside`,{className:`filter-sidebar`,children:[(0,A.jsxs)(`div`,{className:`filter-sidebar__header`,children:[(0,A.jsx)(`h3`,{children:i(`filters.title`)}),o&&(0,A.jsx)(`button`,{type:`button`,className:`filter-sidebar__reset`,onClick:r,children:i(`filters.reset`)})]}),(0,A.jsx)(`div`,{className:`filter-group`,children:(0,A.jsxs)(`div`,{className:`search-input`,children:[(0,A.jsx)(xi,{size:16}),(0,A.jsx)(`input`,{type:`text`,placeholder:i(`filters.queryPlaceholder`),value:t.query,onChange:e=>n({query:e.target.value})})]})}),(0,A.jsxs)(`div`,{className:`filter-group`,children:[(0,A.jsx)(`div`,{className:`filter-group__title`,children:i(`filters.selectSkill`)}),(0,A.jsx)(`div`,{className:`skill-grid`,children:a.map(e=>{let r=t.skills.includes(e);return(0,A.jsxs)(`button`,{type:`button`,className:`skill-tag`+(r?` skill-tag--active`:``),onClick:()=>n(t=>({...t,skills:Ia(t.skills,e)})),children:[(0,A.jsx)(Na,{skill:e,size:14}),e]},e)})})]}),(0,A.jsxs)(`div`,{className:`filter-group`,children:[(0,A.jsx)(`div`,{className:`filter-group__title`,children:i(`filters.questionDifficulty`)}),(0,A.jsx)(`div`,{className:`chip-row`,children:Pa.map(e=>{let r=t.difficultyRanges.includes(e);return(0,A.jsx)(`button`,{type:`button`,className:`chip`+(r?` chip--active`:``),onClick:()=>n(t=>({...t,difficultyRanges:Ia(t.difficultyRanges,e)})),children:e},e)})})]}),(0,A.jsxs)(`div`,{className:`filter-group`,children:[(0,A.jsx)(`div`,{className:`filter-group__title`,children:i(`filters.questionRating`)}),(0,A.jsx)(`div`,{className:`chip-row`,children:Fa.map(e=>{let r=t.ratings.includes(e);return(0,A.jsx)(`button`,{type:`button`,className:`chip`+(r?` chip--active`:``),onClick:()=>n(t=>({...t,ratings:Ia(t.ratings,e)})),children:e},e)})})]}),(0,A.jsxs)(`div`,{className:`filter-group`,children:[(0,A.jsx)(`div`,{className:`filter-group__title`,children:i(`filters.status`)}),(0,A.jsx)(`div`,{className:`segmented`,children:[{value:`not_learned`,labelKey:`filters.statusUnlearned`},{value:`learned`,labelKey:`filters.statusLearned`},{value:`all`,labelKey:`filters.statusAll`}].map(e=>(0,A.jsx)(`button`,{type:`button`,className:`segmented__item`+(t.status===e.value?` segmented__item--active`:``),onClick:()=>n({status:e.value}),children:i(e.labelKey)},e.value))})]}),(0,A.jsx)(`div`,{className:`filter-group`,children:(0,A.jsxs)(`label`,{className:`favorite-toggle`,children:[(0,A.jsx)(`input`,{type:`checkbox`,checked:t.favoriteOnly,onChange:e=>n({favoriteOnly:e.target.checked})}),(0,A.jsx)(fi,{size:16,fill:t.favoriteOnly?`currentColor`:`none`}),i(`filters.favoriteOnly`)]})})]})}var Ra=`ellipsis`;function za(e,t){return t<=7?Array.from({length:t},(e,t)=>t+1):e<=4?[1,2,3,4,5,6,Ra,t]:e>=t-3?[1,Ra,...Array.from({length:6},(e,n)=>t-5+n)]:[1,Ra,e-1,e,e+1,Ra,t]}function Ba({page:e,pageCount:t,onChange:n}){let{t:r}=j();return t<=1?null:(0,A.jsxs)(`nav`,{className:`pagination`,"aria-label":r(`pagination.label`),children:[(0,A.jsx)(`button`,{type:`button`,className:`pagination__arrow`,disabled:e===1,onClick:()=>n(e-1),"aria-label":r(`pagination.previousPage`),children:(0,A.jsx)(Xr,{size:16})}),za(e,t).map((t,r)=>t===Ra?(0,A.jsx)(`span`,{className:`pagination__ellipsis`,"aria-hidden":`true`,children:`…`},`gap-${r}`):(0,A.jsx)(`button`,{type:`button`,className:`pagination__page`+(t===e?` pagination__page--active`:``),"aria-current":t===e?`page`:void 0,onClick:()=>n(t),children:t},t)),(0,A.jsx)(`button`,{type:`button`,className:`pagination__arrow`,disabled:e===t,onClick:()=>n(e+1),"aria-label":r(`pagination.nextPage`),children:(0,A.jsx)(Zr,{size:16})})]})}function Va(e,t){return t.length===0||t.some(t=>{let[n,r]=t.split(`-`).map(Number);return e>=n&&e<=r})}function Ha(e,t){if(!t.trim())return!0;let n=t.trim().toLowerCase(),r=e.question.toLowerCase().includes(n),i=e.keywords.some(e=>e.toLowerCase().includes(n));return r||i}function Ua(e,t){return e.filter(e=>!(!Ha(e,t.query)||t.skills.length>0&&!e.skills.some(e=>t.skills.includes(e))||!Va(e.difficulty,t.difficultyRanges)||t.ratings.length>0&&!t.ratings.includes(e.rating)||t.status===`learned`&&e.status!==`learned`||t.status===`not_learned`&&e.status!==`not_learned`||t.favoriteOnly&&!e.favorite))}function Wa(){let{questions:e,filters:t}=Ar();return(0,_.useMemo)(()=>Ua(e,t),[e,t])}var Ga=10;function Ka(){let{filters:e,loading:t}=Ar(),{t:n}=j(),r=Wa(),[i,a]=(0,_.useState)(1),[o,s]=(0,_.useState)(e);e!==o&&(s(e),a(1));let c=Math.max(1,Math.ceil(r.length/Ga)),l=Math.min(i,c),u=r.slice((l-1)*Ga,l*Ga);function d(e){a(e),window.scrollTo({top:0,behavior:`smooth`})}return(0,A.jsxs)(`div`,{className:`page`,children:[(0,A.jsx)(Mi,{items:[{label:n(`nav.knowledgeBase`)},{label:n(`breadcrumb.listOfQuestions`)}]}),(0,A.jsxs)(`div`,{className:`page-with-sidebar`,children:[(0,A.jsxs)(`div`,{className:`page-with-sidebar__main`,children:[(0,A.jsx)(`h1`,{className:`page-title`,children:n(`questions.pageTitle`)}),t?(0,A.jsx)(`div`,{className:`empty-state`,children:n(`questions.loadingIndex`)}):r.length===0?(0,A.jsx)(`div`,{className:`empty-state`,children:(0,A.jsx)(N,{text:n(`questions.empty`)})}):(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`div`,{className:`question-list`,children:u.map(e=>(0,A.jsx)(aa,{question:e},e.id))}),(0,A.jsx)(Ba,{page:l,pageCount:c,onChange:d})]})]}),(0,A.jsx)(La,{})]})]})}function qa({question:e}){let t=Ct(),{setFilters:n}=Ar(),{t:r}=j(),i=Math.round(e.learnedCount/e.learnedGoal*100);function a(e){n(t=>({...t,query:e})),t(`/knowledge-base/questions`)}return(0,A.jsxs)(`aside`,{className:`progress-sidebar`,children:[(0,A.jsx)(`h3`,{className:`progress-sidebar__title`,children:r(`progress.title`)}),(0,A.jsx)(`p`,{className:`progress-sidebar__subtitle`,children:r(`progress.questionLearned`,{count:e.learnedCount,goal:e.learnedGoal})}),(0,A.jsx)(`div`,{className:`progress-bar`,children:(0,A.jsx)(`div`,{className:`progress-bar__fill`,style:{width:`${i}%`}})}),(0,A.jsxs)(`div`,{className:`progress-sidebar__block`,children:[(0,A.jsx)(`div`,{className:`progress-sidebar__label`,children:r(`progress.level`)}),(0,A.jsxs)(`div`,{className:`chip-row`,children:[(0,A.jsxs)(`span`,{className:`pill pill--rating`,children:[r(`common.rating`),` `,e.rating]}),(0,A.jsxs)(`span`,{className:`pill pill--difficulty`,children:[r(`common.complexity`),` `,e.difficulty]})]})]}),(0,A.jsxs)(`div`,{className:`progress-sidebar__block`,children:[(0,A.jsx)(`div`,{className:`progress-sidebar__label`,children:r(`progress.skills`)}),(0,A.jsx)(`div`,{className:`chip-row`,children:e.skills.map(e=>(0,A.jsxs)(`span`,{className:`skill-tag skill-tag--static`,children:[(0,A.jsx)(Na,{skill:e,size:14}),e]},e))})]}),(0,A.jsxs)(`div`,{className:`progress-sidebar__block`,children:[(0,A.jsx)(`div`,{className:`progress-sidebar__label`,children:r(`progress.keywords`)}),(0,A.jsx)(`div`,{className:`chip-row`,children:e.keywords.map(e=>(0,A.jsx)(`button`,{type:`button`,className:`keyword-tag`,onClick:()=>a(e),children:e},e))})]})]})}function Ja({question:e}){let{learn:t,repeat:n,toggleFavorite:r,canRepeat:i}=Ni(),{t:a}=j(),o=i(e);return(0,A.jsxs)(`div`,{className:`actions-bar`,children:[(0,A.jsxs)(`button`,{type:`button`,className:`actions-bar__btn`,onClick:()=>t(e.id),children:[(0,A.jsx)(di,{size:18}),a(`actions.learn`)]}),(0,A.jsxs)(`button`,{type:`button`,className:`actions-bar__btn`,disabled:!o,onClick:()=>o&&n(e.id),children:[(0,A.jsx)(bi,{size:18}),a(`actions.repeat`)]}),(0,A.jsxs)(`button`,{type:`button`,className:`actions-bar__btn`+(e.favorite?` actions-bar__btn--active`:``),onClick:()=>r(e.id),children:[(0,A.jsx)(fi,{size:18,fill:e.favorite?`currentColor`:`none`}),a(`actions.favorite`)]})]})}function Ya(){let{id:e}=Tt(),t=Ct(),{questions:n,loading:r}=Ar(),{t:i}=j(),a=Wa(),o=Number(e),s=n.find(e=>e.id===o),{body:c,loading:l}=ia(s?o:null);if(r)return(0,A.jsx)(`div`,{className:`page`,children:(0,A.jsx)(`div`,{className:`empty-state`,children:i(`questions.loadingIndex`)})});if(!s){let e=Number.isInteger(o)&&o>0;return(0,A.jsxs)(`div`,{className:`page`,children:[(0,A.jsx)(Mi,{items:[{label:i(`nav.knowledgeBase`),to:`/knowledge-base/questions`},{label:i(`breadcrumb.notFound`)}]}),(0,A.jsx)(`div`,{className:`empty-state`,children:(0,A.jsx)(N,{text:i(e?`questions.notInLanguage`:`questions.notFound`)})}),(0,A.jsx)(Fn,{to:`/knowledge-base/questions`,className:`btn btn--primary`,children:i(`questions.backToList`)})]})}let u=a.some(e=>e.id===s.id)?a:n,d=u.findIndex(e=>e.id===s.id),f=d>0?u[d-1]:null,p=d>=0&&d<u.length-1?u[d+1]:null,m=s.skills.join(`, `);return(0,A.jsxs)(`div`,{className:`page`,children:[(0,A.jsx)(Mi,{items:[{label:i(`nav.knowledgeBase`),to:`/knowledge-base/questions`},{label:i(`breadcrumb.listOfQuestions`),to:`/knowledge-base/questions`},{label:i(`breadcrumb.moreDetails`)}]}),(0,A.jsxs)(`div`,{className:`page-with-sidebar`,children:[(0,A.jsxs)(`div`,{className:`page-with-sidebar__main`,children:[(0,A.jsxs)(`div`,{className:`details-header`,children:[(0,A.jsx)(`div`,{className:`details-header__icon`,children:(0,A.jsx)(Na,{skill:s.skills[0],size:36})}),(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`h1`,{className:`page-title`,children:s.question}),(0,A.jsx)(`p`,{className:`details-header__subtitle`,children:i(`questions.subtitle`,{skills:m})})]})]}),(0,A.jsx)(Ja,{question:s}),(0,A.jsxs)(`div`,{className:`prev-next`,children:[(0,A.jsxs)(`button`,{type:`button`,className:`prev-next__btn`,disabled:!f,onClick:()=>f&&t(`/knowledge-base/questions/${f.id}`),children:[(0,A.jsx)(ni,{size:16}),i(`questions.previous`)]}),(0,A.jsxs)(`button`,{type:`button`,className:`prev-next__btn`,disabled:!p,onClick:()=>p&&t(`/knowledge-base/questions/${p.id}`),children:[i(`questions.next`),(0,A.jsx)(ri,{size:16})]})]}),d>=0&&(0,A.jsx)(`p`,{className:`prev-next__position`,children:i(`questions.position`,{current:d+1,total:u.length})}),l?(0,A.jsx)(`section`,{className:`answer-section`,children:(0,A.jsx)(`p`,{className:`answer-section__text answer-loading`,children:i(`common.loadingAnswer`)})}):c&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsxs)(`section`,{className:`answer-section`,children:[(0,A.jsx)(`h2`,{className:`answer-section__title`,children:i(`questions.shortAnswer`)}),(0,A.jsx)(`p`,{className:`answer-section__text`,children:(0,A.jsx)(N,{text:c.shortAnswer})}),c.codeExample&&(0,A.jsx)(Ji,{code:c.codeExample})]}),(0,A.jsxs)(`section`,{className:`answer-section`,children:[(0,A.jsx)(`h2`,{className:`answer-section__title`,children:i(`questions.longAnswer`)}),(0,A.jsx)(`p`,{className:`answer-section__text`,children:(0,A.jsx)(N,{text:c.longAnswer})})]})]})]}),(0,A.jsx)(qa,{question:s})]})]})}var Xa=[{label:`1-3`,min:1,max:3},{label:`4-6`,min:4,max:6},{label:`7-8`,min:7,max:8},{label:`9-10`,min:9,max:10}];function Za(){let{questions:e,loading:t}=Ar(),{t:n}=j(),r=e.length,i=e.filter(e=>e.status===`learned`).length,a=r===0?0:Math.round(i/r*100),o=oa.map(t=>{let n=e.filter(e=>e.skills.includes(t)),r=n.filter(e=>e.status===`learned`).length;return{skill:t,total:n.length,learned:r}}).filter(e=>e.total>0),s=Math.max(1,...o.map(e=>e.total)),c=Xa.map(t=>({...t,count:e.filter(e=>e.difficulty>=t.min&&e.difficulty<=t.max).length})),l=Math.max(1,...c.map(e=>e.count));return(0,A.jsxs)(`div`,{className:`page`,children:[(0,A.jsx)(Mi,{items:[{label:n(`nav.analytics`)}]}),(0,A.jsx)(`h1`,{className:`page-title`,children:n(`analytics.title`)}),t?(0,A.jsx)(`div`,{className:`empty-state`,children:n(`questions.loadingIndex`)}):r===0?(0,A.jsx)(`div`,{className:`empty-state`,children:(0,A.jsx)(N,{text:n(`analytics.empty`)})}):(0,A.jsxs)(A.Fragment,{children:[(0,A.jsxs)(`section`,{className:`analytics-card`,children:[(0,A.jsx)(`h2`,{className:`analytics-card__title`,children:n(`analytics.overallProgress`)}),(0,A.jsx)(`p`,{className:`analytics-card__summary`,children:n(`analytics.summary`,{learned:i,total:r,percent:a})}),(0,A.jsx)(`div`,{className:`progress-bar progress-bar--large`,children:(0,A.jsx)(`div`,{className:`progress-bar__fill`,style:{width:`${a}%`}})})]}),(0,A.jsxs)(`section`,{className:`analytics-card`,children:[(0,A.jsx)(`h2`,{className:`analytics-card__title`,children:n(`analytics.bySkill`)}),(0,A.jsxs)(`div`,{className:`chart-legend`,children:[(0,A.jsxs)(`span`,{className:`chart-legend__item`,children:[(0,A.jsx)(`span`,{className:`chart-legend__swatch chart-legend__swatch--learned`}),` `,n(`analytics.legendLearned`)]}),(0,A.jsxs)(`span`,{className:`chart-legend__item`,children:[(0,A.jsx)(`span`,{className:`chart-legend__swatch chart-legend__swatch--remaining`}),` `,n(`analytics.legendRemaining`)]})]}),(0,A.jsx)(`div`,{className:`bar-chart`,children:o.map(e=>(0,A.jsxs)(`div`,{className:`bar-chart__row`,children:[(0,A.jsx)(`span`,{className:`bar-chart__label`,children:e.skill}),(0,A.jsx)(`div`,{className:`bar-chart__track-outer`,children:(0,A.jsx)(`div`,{className:`bar-chart__track`,style:{width:`${e.total/s*100}%`},children:(0,A.jsx)(`div`,{className:`bar-chart__segment bar-chart__segment--learned`,style:{width:`${e.learned/e.total*100}%`}})})}),(0,A.jsxs)(`span`,{className:`bar-chart__value`,children:[e.learned,`/`,e.total]})]},e.skill))})]}),(0,A.jsxs)(`section`,{className:`analytics-card`,children:[(0,A.jsx)(`h2`,{className:`analytics-card__title`,children:n(`analytics.byDifficulty`)}),(0,A.jsx)(`div`,{className:`bar-chart`,children:c.map(e=>(0,A.jsxs)(`div`,{className:`bar-chart__row`,children:[(0,A.jsx)(`span`,{className:`bar-chart__label`,children:e.label}),(0,A.jsx)(`div`,{className:`bar-chart__track-outer`,children:(0,A.jsx)(`div`,{className:`bar-chart__track bar-chart__track--single`,style:{width:`${e.count/l*100}%`}})}),(0,A.jsx)(`span`,{className:`bar-chart__value`,children:e.count})]},e.label))})]})]})]})}function Qa(e,t){let n=e.length>1?e.filter(e=>e.id!==t):e;return n[Math.floor(Math.random()*n.length)]?.id??null}function $a(){let{questions:e}=Ar(),{t}=j(),{learn:n,repeat:r}=Ni(),[i,a]=(0,_.useState)(()=>Qa(e,null)),[o,s]=(0,_.useState)(!1),c=e.find(e=>e.id===i),{body:l,loading:u}=ia(o?i:null),d=(0,_.useCallback)(()=>{a(t=>Qa(e,t)),s(!1)},[e]);function f(){c&&n(c.id),d()}function p(){c&&c.learnedCount>0&&r(c.id),d()}return(0,A.jsxs)(`div`,{className:`page`,children:[(0,A.jsx)(Mi,{items:[{label:t(`nav.training`)},{label:t(`nav.interview`)}]}),(0,A.jsx)(`h1`,{className:`page-title`,children:t(`interview.title`)}),c?(0,A.jsxs)(`div`,{className:`interview-card`,children:[(0,A.jsxs)(`div`,{className:`interview-card__meta`,children:[(0,A.jsx)(Na,{skill:c.skills[0],size:20}),(0,A.jsx)(`span`,{children:c.skills.join(`, `)})]}),(0,A.jsx)(`p`,{className:`interview-card__question`,children:c.question}),o?(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`div`,{className:`interview-card__answer`,children:u?(0,A.jsx)(`p`,{className:`answer-loading`,children:t(`common.loadingAnswer`)}):l&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`p`,{children:(0,A.jsx)(N,{text:l.shortAnswer})}),l.codeExample&&(0,A.jsx)(Ji,{code:l.codeExample})]})}),(0,A.jsxs)(`div`,{className:`interview-card__actions`,children:[(0,A.jsxs)(`button`,{type:`button`,className:`btn btn--danger`,onClick:p,children:[(0,A.jsx)(wi,{size:16}),t(`interview.dontKnow`)]}),(0,A.jsxs)(`button`,{type:`button`,className:`btn btn--success`,onClick:f,children:[(0,A.jsx)(Ti,{size:16}),t(`interview.know`)]})]})]}):(0,A.jsx)(`button`,{type:`button`,className:`btn btn--primary`,onClick:()=>s(!0),children:t(`interview.showAnswer`)}),(0,A.jsxs)(`button`,{type:`button`,className:`interview-card__skip`,onClick:d,children:[(0,A.jsx)(Ci,{size:14}),t(`interview.nextRandom`)]})]}):(0,A.jsx)(`div`,{className:`empty-state`,children:(0,A.jsx)(N,{text:t(`interview.empty`)})})]})}function eo({task:e}){let{t}=j();return(0,A.jsxs)(Fn,{className:`task-card`,to:`/training/tasks/${e.id}`,children:[(0,A.jsx)(`span`,{className:`task-card__title`,children:e.title}),(0,A.jsxs)(`div`,{className:`task-card__meta`,children:[(0,A.jsx)(`span`,{className:`task-status task-status--${e.status.replace(`_`,`-`)}`,children:t(`tasks.status.${e.status}`)}),(0,A.jsx)(`span`,{className:`difficulty-badge difficulty-badge--${e.difficulty}`,children:e.difficulty}),e.languages.map(e=>(0,A.jsx)(Na,{skill:e,size:16,title:e},e)),e.categories.map(e=>(0,A.jsx)(`span`,{className:`task-category`,children:e},e))]})]})}var to=[1,2,3,4,5],no=4;function ro(e,t){return e.includes(t)?e.filter(e=>e!==t):[...e,t]}function io(){let{filters:e,setFilters:t,resetFilters:n}=Br(),{t:r}=j(),[i,a]=(0,_.useState)(!1),o=e.query||e.difficulties.length>0||e.languages.length>0||e.categories.length>0,s=i?Mr:Mr.slice(0,no);return(0,A.jsxs)(`aside`,{className:`filter-sidebar`,children:[(0,A.jsxs)(`div`,{className:`filter-sidebar__header`,children:[(0,A.jsx)(`h3`,{children:r(`filters.title`)}),o&&(0,A.jsx)(`button`,{type:`button`,className:`filter-sidebar__reset`,onClick:n,children:r(`filters.reset`)})]}),(0,A.jsx)(`div`,{className:`filter-group`,children:(0,A.jsxs)(`div`,{className:`search-input`,children:[(0,A.jsx)(xi,{size:16}),(0,A.jsx)(`input`,{type:`text`,placeholder:r(`filters.taskPlaceholder`),value:e.query,onChange:e=>t({query:e.target.value})})]})}),(0,A.jsxs)(`div`,{className:`filter-group`,children:[(0,A.jsx)(`div`,{className:`filter-group__title`,children:r(`filters.difficulty`)}),(0,A.jsx)(`div`,{className:`chip-row`,children:to.map(n=>{let r=e.difficulties.includes(n);return(0,A.jsx)(`button`,{type:`button`,className:`difficulty-badge difficulty-badge--${n}`+(r?` difficulty-badge--active`:``),onClick:()=>t(e=>({...e,difficulties:ro(e.difficulties,n)})),children:n},n)})})]}),(0,A.jsxs)(`div`,{className:`filter-group`,children:[(0,A.jsx)(`div`,{className:`filter-group__title`,children:r(`filters.programmingLanguages`)}),(0,A.jsx)(`div`,{className:`skill-grid`,children:jr.map(n=>{let r=e.languages.includes(n);return(0,A.jsxs)(`button`,{type:`button`,className:`skill-tag`+(r?` skill-tag--active`:``),onClick:()=>t(e=>({...e,languages:ro(e.languages,n)})),children:[(0,A.jsx)(Na,{skill:n,size:14}),n]},n)})})]}),(0,A.jsxs)(`div`,{className:`filter-group`,children:[(0,A.jsx)(`div`,{className:`filter-group__title`,children:r(`filters.taskCategories`)}),(0,A.jsx)(`div`,{className:`chip-row`,children:s.map(n=>{let r=e.categories.includes(n);return(0,A.jsx)(`button`,{type:`button`,className:`chip`+(r?` chip--active`:``),onClick:()=>t(e=>({...e,categories:ro(e.categories,n)})),children:n},n)})}),Mr.length>no&&(0,A.jsx)(`button`,{type:`button`,className:`filter-group__more`,onClick:()=>a(e=>!e),children:r(i?`filters.showLess`:`filters.viewAll`)})]})]})}function ao(e,t){if(!t.trim())return!0;let n=t.trim().toLowerCase(),r=e.title.toLowerCase().includes(n),i=e.categories.some(e=>e.toLowerCase().includes(n));return r||i}function oo(e,t){return e.filter(e=>!(!ao(e,t.query)||t.difficulties.length>0&&!t.difficulties.includes(e.difficulty)||t.languages.length>0&&!e.languages.some(e=>t.languages.includes(e))||t.categories.length>0&&!e.categories.some(e=>t.categories.includes(e))))}function so(){let{tasks:e,filters:t}=Br();return(0,_.useMemo)(()=>oo(e,t),[e,t])}var co=10;function lo(){let e=so(),{t}=j(),[n,r]=(0,_.useState)(1),i=Math.max(1,Math.ceil(e.length/co)),a=Math.min(n,i),o=e.slice((a-1)*co,a*co);return(0,A.jsxs)(`div`,{className:`page`,children:[(0,A.jsx)(Mi,{items:[{label:t(`nav.training`)},{label:t(`nav.tasks`)}]}),(0,A.jsxs)(`div`,{className:`page-with-sidebar`,children:[(0,A.jsxs)(`div`,{className:`page-with-sidebar__main`,children:[(0,A.jsx)(`h1`,{className:`page-title`,children:t(`tasks.title`)}),e.length===0?(0,A.jsx)(`div`,{className:`empty-state`,children:(0,A.jsx)(N,{text:t(`tasks.empty`)})}):(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`div`,{className:`task-list`,children:o.map(e=>(0,A.jsx)(eo,{task:e},e.id))}),(0,A.jsx)(Ba,{page:a,pageCount:i,onChange:r})]})]}),(0,A.jsx)(io,{})]})]})}function uo({value:e,onChange:t}){let n=(0,_.useRef)(null),{t:r}=j(),i=(0,_.useRef)(null);function a(e){let{scrollTop:t,scrollLeft:r}=e.currentTarget;n.current&&(n.current.scrollTop=t,n.current.scrollLeft=r),i.current&&(i.current.scrollTop=t)}function o(n){if(n.key!==`Tab`)return;n.preventDefault();let{selectionStart:r,selectionEnd:i}=n.currentTarget;t(e.slice(0,r)+`  `+e.slice(i)),requestAnimationFrame(()=>{let e=n.target;e.selectionStart=e.selectionEnd=r+2})}let s=e.split(`
`).length;return(0,A.jsxs)(`div`,{className:`code-editor`,children:[(0,A.jsx)(`div`,{className:`code-editor__gutter`,ref:i,"aria-hidden":`true`,children:Array.from({length:s},(e,t)=>(0,A.jsx)(`div`,{children:t+1},t+1))}),(0,A.jsxs)(`div`,{className:`code-editor__area`,children:[(0,A.jsx)(`pre`,{className:`code-editor__highlight`,ref:n,"aria-hidden":`true`,children:(0,A.jsx)(`code`,{dangerouslySetInnerHTML:{__html:Li(e)+`
`}})}),(0,A.jsx)(`textarea`,{className:`code-editor__input`,value:e,onChange:e=>t(e.target.value),onScroll:a,onKeyDown:o,spellCheck:!1,autoComplete:`off`,autoCorrect:`off`,autoCapitalize:`off`,"aria-label":r(`tasks.editorLabel`)})]})]})}function z({state:e}){let{t}=j();if(e.status===`idle`)return(0,A.jsx)(`div`,{className:`empty-state`,children:t(`tests.idle`)});if(e.status===`running`)return(0,A.jsxs)(`div`,{className:`test-results__running`,children:[(0,A.jsx)(gi,{size:16,className:`spin`}),t(`tests.running`)]});if(e.status===`error`)return(0,A.jsx)(`div`,{className:`test-results__error`,children:t(e.error.code,e.error.params)});let{results:n}=e,r=n.filter(e=>e.passed).length,i=r===n.length;return(0,A.jsxs)(`div`,{className:`test-results`,children:[(0,A.jsx)(`div`,{className:`test-results__summary`+(i?` test-results__summary--ok`:``),children:t(`tests.passed`,{passed:r,total:n.length})}),n.map((e,n)=>(0,A.jsxs)(`div`,{className:`test-result`+(e.passed?` test-result--pass`:` test-result--fail`),children:[(0,A.jsxs)(`div`,{className:`test-result__head`,children:[e.passed?(0,A.jsx)(ei,{size:14}):(0,A.jsx)(Di,{size:14}),(0,A.jsx)(`span`,{children:e.name}),e.hidden&&(0,A.jsx)(`span`,{className:`test-result__hidden-tag`,children:t(`tests.hiddenTag`)})]}),!e.passed&&(0,A.jsx)(`div`,{className:`test-result__detail`,children:e.error?(0,A.jsxs)(`div`,{children:[t(`tests.error`),` `,(0,A.jsx)(`code`,{children:e.error})]}):(0,A.jsxs)(A.Fragment,{children:[(0,A.jsxs)(`div`,{children:[t(`tests.expected`),` `,(0,A.jsx)(`code`,{children:e.expected})]}),(0,A.jsxs)(`div`,{children:[t(`tests.received`),` `,(0,A.jsx)(`code`,{children:e.actual??`—`})]})]})})]},n))]})}function fo({tests:e}){let{t}=j(),n=e.filter(e=>!e.hidden),r=e.length-n.length;return(0,A.jsxs)(`div`,{className:`test-cases`,children:[n.map((e,n)=>(0,A.jsxs)(`div`,{className:`test-case`,children:[(0,A.jsx)(`div`,{className:`test-case__name`,children:e.name}),(0,A.jsxs)(`div`,{className:`test-case__io`,children:[e.body?(0,A.jsx)(`pre`,{className:`test-case__body`,children:e.body}):(0,A.jsxs)(`div`,{children:[t(`tests.input`),` `,(0,A.jsx)(`code`,{children:JSON.stringify(e.args)})]}),(0,A.jsxs)(`div`,{children:[t(`tests.expects`),` `,(0,A.jsx)(`code`,{children:JSON.stringify(e.expected)})]})]})]},n)),r>0&&(0,A.jsx)(`div`,{className:`test-cases__hidden-note`,children:t(`tests.hiddenNote`,{count:r})})]})}var po=2e3;function B({code:e,functionName:t,tests:n}){return new Promise(r=>{let i,a,o=!1;function s(e){o||(o=!0,clearTimeout(a),i?.terminate(),r(e))}try{i=new Worker(new URL(`/interview/assets/runner.worker-Dv1Zr718.js`,``+import.meta.url),{type:`module`})}catch(e){s({ok:!1,error:{code:`run.workerFailed`,params:{message:e.message}}});return}i.onmessage=e=>s(e.data),i.onerror=e=>s({ok:!1,error:e.message?{code:`run.executionErrorDetail`,params:{message:e.message}}:{code:`run.executionError`}}),a=setTimeout(()=>{s({ok:!1,error:{code:`run.timeout`,params:{ms:po}}})},po),i.postMessage({code:e,functionName:t,tests:n})})}var V=[{id:`description`,labelKey:`tasks.tab.description`},{id:`result`,labelKey:`tasks.tab.result`},{id:`tests`,labelKey:`tasks.tab.tests`}];function mo(){let{id:e}=Tt(),{tasks:t,updateTaskProgress:n}=Br(),{t:r}=j(),i=t.find(t=>t.id===Number(e)),[a,o]=(0,_.useState)(`description`),[s,c]=(0,_.useState)({status:`idle`});if(!i)return(0,A.jsxs)(`div`,{className:`page`,children:[(0,A.jsx)(Mi,{items:[{label:r(`nav.tasks`),to:`/training/tasks`},{label:r(`breadcrumb.notFound`)}]}),(0,A.jsxs)(`div`,{className:`empty-state`,children:[r(`tasks.notFound`),` `,(0,A.jsx)(Fn,{to:`/training/tasks`,children:r(`tasks.backToList`)}),`.`]})]});let l=i.code??i.starterCode;function u(e){n(i.id,t=>({...t,code:e}))}async function d({includeHidden:e}){o(`result`),c({status:`running`});let t=e?i.tests:i.tests.filter(e=>!e.hidden),r=await B({code:l,functionName:i.functionName,tests:t});if(!r.ok){c({status:`error`,error:r.error});return}if(c({status:`done`,results:r.results}),e){let e=r.results.every(e=>e.passed);n(i.id,t=>({...t,solved:e}))}}let f=s.status===`running`;return(0,A.jsxs)(`div`,{className:`page`,children:[(0,A.jsx)(Mi,{items:[{label:r(`nav.tasks`),to:`/training/tasks`},{label:r(`breadcrumb.moreDetails`)}]}),(0,A.jsxs)(`div`,{className:`task-details`,children:[(0,A.jsxs)(`section`,{className:`task-details__pane`,children:[(0,A.jsx)(`div`,{className:`task-tabs`,children:V.map(e=>(0,A.jsx)(`button`,{type:`button`,className:`task-tab`+(a===e.id?` task-tab--active`:``),onClick:()=>o(e.id),children:r(e.labelKey)},e.id))}),(0,A.jsxs)(`div`,{className:`task-details__body`,children:[a===`description`&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`h1`,{className:`task-details__title`,children:i.title}),(0,A.jsxs)(`div`,{className:`task-card__meta`,children:[(0,A.jsx)(`span`,{className:`task-status task-status--${i.status.replace(`_`,`-`)}`,children:r(`tasks.status.${i.status}`)}),(0,A.jsx)(`span`,{className:`difficulty-badge difficulty-badge--${i.difficulty}`,children:i.difficulty}),i.languages.map(e=>(0,A.jsx)(Na,{skill:e,size:16,title:e},e)),i.categories.map(e=>(0,A.jsx)(`span`,{className:`task-category`,children:e},e))]}),(0,A.jsx)(`h3`,{className:`task-section__title`,children:r(`tasks.section.condition`)}),(0,A.jsx)(`p`,{className:`task-section__text`,children:(0,A.jsx)(N,{text:i.description.condition})}),i.description.input.length>0&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`h3`,{className:`task-section__title`,children:r(`tasks.section.input`)}),(0,A.jsx)(`ul`,{className:`task-section__list`,children:i.description.input.map((e,t)=>(0,A.jsx)(`li`,{children:(0,A.jsx)(N,{text:e})},t))})]}),i.description.output&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`h3`,{className:`task-section__title`,children:r(`tasks.section.output`)}),(0,A.jsx)(`p`,{className:`task-section__text`,children:(0,A.jsx)(N,{text:i.description.output})})]}),i.description.constraints.length>0&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`h3`,{className:`task-section__title`,children:r(`tasks.section.constraints`)}),(0,A.jsx)(`ul`,{className:`task-section__list`,children:i.description.constraints.map((e,t)=>(0,A.jsx)(`li`,{children:(0,A.jsx)(N,{text:e})},t))})]}),i.description.example&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`h3`,{className:`task-section__title`,children:r(`tasks.section.example`)}),(0,A.jsx)(Ji,{code:i.description.example,language:`text`})]})]}),a===`result`&&(0,A.jsx)(z,{state:s}),a===`tests`&&(0,A.jsx)(fo,{tests:i.tests})]})]}),(0,A.jsxs)(`section`,{className:`task-details__pane`,children:[(0,A.jsxs)(`div`,{className:`task-editor__toolbar`,children:[(0,A.jsx)(`select`,{className:`task-editor__lang`,value:i.languages[0],readOnly:!0,disabled:!0,children:i.languages.map(e=>(0,A.jsx)(`option`,{value:e,children:e},e))}),(0,A.jsxs)(`div`,{className:`task-editor__actions`,children:[(0,A.jsxs)(`button`,{type:`button`,className:`btn btn--ghost`,onClick:()=>d({includeHidden:!1}),disabled:f,children:[(0,A.jsx)(yi,{size:14}),r(`tasks.run`)]}),(0,A.jsxs)(`button`,{type:`button`,className:`btn btn--primary`,onClick:()=>d({includeHidden:!0}),disabled:f,children:[(0,A.jsx)(Si,{size:14}),r(`tasks.submit`)]})]})]}),(0,A.jsx)(uo,{value:l,onChange:u}),(0,A.jsx)(`button`,{type:`button`,className:`task-editor__reset`,onClick:()=>u(i.starterCode),children:r(`tasks.resetToTemplate`)})]})]})]})}function ho(e){try{return new URL(e).host.replace(/^www\./,``)}catch{return e}}function go({resource:e}){let[t,n]=(0,_.useState)(!1),r=e.image&&!t;return(0,A.jsxs)(`article`,{className:`resource-card`,children:[(0,A.jsx)(`div`,{className:`resource-card__thumb`,children:r?(0,A.jsx)(`img`,{src:e.image,alt:``,loading:`lazy`,onError:()=>n(!0)}):(0,A.jsx)(`span`,{className:`resource-card__thumb-fallback`,children:e.name.slice(0,1)})}),(0,A.jsxs)(`div`,{className:`resource-card__body`,children:[(0,A.jsxs)(`div`,{className:`resource-card__head`,children:[(0,A.jsx)(`a`,{className:`resource-card__host`,href:e.url,target:`_blank`,rel:`noopener noreferrer`,children:ho(e.url)}),(0,A.jsx)(`span`,{className:`resource-type`,children:e.type})]}),(0,A.jsx)(`h3`,{className:`resource-card__title`,children:(0,A.jsxs)(`a`,{href:e.url,target:`_blank`,rel:`noopener noreferrer`,children:[e.name,` `,(0,A.jsx)(si,{size:13})]})}),(0,A.jsx)(`p`,{className:`resource-card__text`,children:e.description}),e.skills.length>0&&(0,A.jsx)(`div`,{className:`resource-card__tags`,children:e.skills.map(e=>(0,A.jsxs)(`span`,{className:`skill-tag skill-tag--static`,children:[(0,A.jsx)(Na,{skill:e,size:13}),e]},e))})]})]})}var _o=[`Документация`,`Игра`,`Инструмент`,`Канал`,`Книга`,`Курс`,`Подкаст`,`Репозиторий`,`Роадмап`,`Статья`,`Тренажер`],vo=[`CI/CD`,`CSS`,`Docker`,`Git`,`Golang`,`HTML`,`JavaScript`,`Kubernetes`,`React`],yo=[{id:`4c2dbbc3-2558-4bb5-86e6-615b886855fb`,name:`50 проектов для прокачки фронтенда`,description:`Мини-сборник из 50 проектов на HTML, CSS и JavaScript — от простых визуальных эффектов до полноценных интерактивных приложений. Каждый проект сопровождается работающей демо-версией и исходным кодом. Отличный способ последовательно улучшать навыки и набивать руку в веб-разработке.`,url:`https://github.com/bradtraversy/50projects50days?utm_source=chatgpt.com`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/dfd3bca6-6e4c-4e69-a16e-562cc98730c4`,type:`Репозиторий`,skills:[`HTML`,`JavaScript`,`CSS`]},{id:`fa2f60f1-40f8-431b-a08a-28f3983e40be`,name:`Библиотека от Microsoft`,description:`Содержит почти 5к модулей обучения наверное по всем возможным технологиям.`,url:`https://learn.microsoft.com/ru-ru/training/browse/?WT.mc_id=academic-105485-koreyst`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/4f35dcf2-80da-40b3-aa6f-dc89b6ffdfb7`,type:`Курс`,skills:[]},{id:`a1dc5f29-cdd9-4d9e-a207-9857ad30bdfd`,name:`Выведи свой навык верстки на новый уровень`,description:`Верстаем.онлайн — проект от верстальщиков верстальщикам.

Здесь вы найдете макеты различной сложности, их живое превью, полезные статьи и материалы на тему верстки, а также практические задачи, которые развивают те или иные навыки точечно.`,url:`https://verstaem.online/`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/6be72694-dfbe-4b15-beaf-8d3f65830c7a`,type:`Тренажер`,skills:[`HTML`,`CSS`]},{id:`3f23a963-028d-4fda-9191-3c5e6a1b51a7`,name:`Дока`,description:`Дока — это документация для разработчиков на понятном языке. Её пишет сообщество, чтобы помогать друг другу. Ваши знания и опыт важны. Делитесь ими, мы поможем.`,url:`https://doka.guide/`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/a1631472-c06d-41e7-9713-7971f276e4f9`,type:`Документация`,skills:[`HTML`,`JavaScript`,`CSS`]},{id:`9be618d7-60c9-460f-bf57-ea3263da3f5f`,name:`Играй и программируй с CodeCombat`,description:`CodeCombat — это игровая платформа, где обучение программированию превращается в приключение: игроки пишут настоящий код на Python или JavaScript, чтобы управлять персонажами и проходить уровни. 
 Система подходит как школьникам, так и самостоятельным ученикам, делает упор на активное обучение через практику и не требует предварительной подготовки.`,url:`https://codecombat.com/`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/5f66753a-7e61-4de8-a986-fc94d2457732`,type:`Игра`,skills:[]},{id:`2e6a413f-befa-4b68-b194-c6855725d8b5`,name:`Мини-курс о применении ИИ в разработке`,description:`Он рассчитан на начинающих, пройти его можно всего за час. Конспекты доступны на русском языке`,url:`https://cursor.com/ru/learn`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/42bca1b9-51ff-4236-877c-a7b160818cb5`,type:`Курс`,skills:[`Git`]},{id:`d38ece85-7e21-4f1b-87cc-34451272250e`,name:`Паттерны управления данными в микросервисной архитектуре`,description:`Microservices.io создан Крисом Ричардсоном. опытным архитектором программного обеспечения, автором книги POJOs in Action, создателем оригинальной платформы CloudFoundry.com и автором шаблонов микросервисов.`,url:`https://microservices.io/patterns/index.html`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/d4935118-2a69-47aa-93fe-91d42f8824e8`,type:`Документация`,skills:[`Git`]},{id:`45ff01af-0b44-46bd-9e10-d5044c0243d9`,name:`Подкасты Y_LAB`,description:`Здесь вы найдете разнообразный IT-контент: от глубоких технических обсуждений до увлекательных и расслабляющих бесед. Наши эпизоды охватывают широкий спектр тем, связанных с разработкой и новейшими технологиями, чтобы каждый разработчик нашел что-то для себя. Присоединяйтесь к нам, чтобы углубить свои знания, оставаться в тренде и вдохновляться новыми идеями!`,url:`https://music.yandex.ru/album/26888060/track/116712459`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/58d3fc09-ef87-4875-81bc-968dc69f489a`,type:`Подкаст`,skills:[]},{id:`b4e7ddd9-e31a-4ea3-bca9-e69663df5b8a`,name:`Полное понимание асинхронности в браузере`,description:`Гайд по асинхронности в JavaScript. Статья на Хабр от Яндекса`,url:`https://habr.com/ru/companies/yandex/articles/718084/?from=how_to_get`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/f8fddbfe-d6d4-40d8-a02e-30a1a7d2969a`,type:`Статья`,skills:[`JavaScript`]},{id:`f8db6eae-0409-4adb-9b35-48d7d2ed6661`,name:`Роадмэп по современному фронтенду от KTS`,description:`Эта статья представляет собой подробный и структурированный план развития для фронтенд-разработчиков, составленный тимлидом компании KTS. В материале последовательно разбираются все ключевые знания и технологии, необходимые для становления востребованным специалистом: от основ работы сети и браузера, HTML, CSS и JavaScript до изучения фреймворков (с акцентом на React), систем контроля версий (Git), пакетных менеджеров и менеджеров состояния. Роадмэп подойдет как начинающим, так и опытным разработчикам, которые хотят систематизировать свои знания и понять вектор дальнейшего профессионального роста`,url:`https://habr.com/ru/companies/kts/articles/775948/`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/be48cabd-dd79-4e87-b656-71cdb473d1e7`,type:`Роадмап`,skills:[]},{id:`dc0fcdf7-a4a8-4f64-b883-8c330e89e57f`,name:`Системный дизайн. Front-End Engineer`,description:`Плейлист о прохождении этапа собеседований System Design`,url:`https://www.youtube.com/playlist?list=PLI9W87-Dqn7j_x6QtR6sUjycJR7nQLBqT`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/9a760824-b1a1-4acd-aa05-9cb07104bc7e`,type:`Канал`,skills:[`React`,`Docker`,`Kubernetes`,`CI/CD`]},{id:`003b50f0-51bd-4ec5-8ecb-b8233d9e804c`,name:`Терялся в собственном коде?`,description:`Встречай Gitvizz, инструмент, который мгновенно превращает кодовую базу в интерактивные графы, чтобы наглядно увидеть, как всё связано`,url:`https://gitvizz.com`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/d3b91ac3-b014-4f7f-9c1f-c2642933cd68`,type:`Инструмент`,skills:[`Git`]},{id:`9dd7092c-3516-4342-b833-e9ccf7a2a0dd`,name:`Тестовые задания из реальных собеседований`,description:`Подборка реальных тестовых заданий от компаний по самым разным направлениям — от Android и Python до PHP и фронтенда. Репозиторий помогает понять, чего ждать на технических собеседованиях и потренироваться на реальных примерах. Отличный способ подготовиться к интервью и прокачать навыки.`,url:`https://github.com/Hexlet/ru-test-assignments?tab=readme-ov-file`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/ffa6c0aa-13e4-4025-a8cc-094927451595`,type:`Репозиторий`,skills:[]},{id:`99ee7e2a-b02c-4f2b-a2ef-7882c6b398c9`,name:`Тесты для проверки своих знаний по React`,description:`Отличная специализированная образовательная платформа, посвященная тестированию знаний в области фронтенд-разработки, с особым акцентом на библиотеку React.`,url:`https://forfrontend.ru/tests/react/`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/1a8ad078-e4ca-4c72-910c-7792fc8559a6`,type:`Тренажер`,skills:[`React`]},{id:`cce7bbe3-0719-4f01-828d-d7f1fe295f7e`,name:`Тренируем печать`,description:`Быстро печатать — не просто приятно, а выгодно. Когда пальцы успевают за мыслью, код льётся плавно.`,url:`https://www.keybr.com/`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/0b369ff5-b159-4836-b23a-394ffd958e84`,type:`Тренажер`,skills:[`Golang`]},{id:`3d5757a6-c87d-4dfd-80cc-b3f0f8761664`,name:`Хочешь изучить Git, не рискуя своей локальной установкой?`,description:`Теперь можно запускать команды Git прямо из браузера , с пошаговым объяснением, что делает каждая команда.`,url:`https://scrum-master.es/virtualOS/otros/git`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/40e6a863-8583-49d1-b90d-b5c03f72453f`,type:`Инструмент`,skills:[`Git`]},{id:`04dec2ba-5895-411c-a4b2-5547d86d2cd9`,name:`Amigoscode`,description:`Здесь публикуются подробные туториалы и практические руководства. Основное внимание уделяется Java, Spring Boot и API‑разработке. Контент рассчитан как на начинающих, так и на опытных разработчиков: видео отличаются глубиной разбора тем и средней продолжительностью около 38 минут. Канал насчитывает более 1 млн подписчиков и свыше 440 видеороликов, регулярно обновляясь актуальными материалами по современным технологиям.`,url:`https://www.youtube.com/@amigoscode/videos`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/2f39bbd9-d519-4ade-be15-a15e3522d73b`,type:`Канал`,skills:[]},{id:`e29252d0-64d2-4296-bbd5-3fdf4c6bd51a`,name:`Awesome GitHub Profile: ваш профессиональный бренд в цифровом мире`,description:`Это уникальный инструмент для персонализации вашего GitHub-профиля, который поможет вам создать впечатляющее портфолио и выделиться среди других разработчиков.`,url:`https://zzetao.github.io/awesome-github-profile/`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/1a9ec2a0-e983-43cd-85ce-06849da35b1b`,type:`Инструмент`,skills:[`Git`]},{id:`c3b4035a-fc93-4e4a-bc8a-79e3c81654a2`,name:`Code Basics — старт в IT с нуля`,description:`Code Basics — бесплатная образовательная платформа для тех, кто хочет начать путь в IT. Проект создан командой и сообществом Хекслета, чтобы помочь новичкам понять принципы программирования, а не просто запомнить детали. В основе обучения — практический тренажёр, который помогает освоить базу и почувствовать логику кода.`,url:`https://code-basics.com/`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/89b99ba9-00ae-449f-9aa6-6bd60d7bde73`,type:`Курс`,skills:[]},{id:`44e9ac03-ae38-4fb0-8ab1-1ce0019670b8`,name:`CodeChef`,description:`Онлайн-платформа программирования, которая позволяет учащимся осваивать программирование с помощью структурированных курсов, тысяч практических задач и регулярных конкурсов`,url:`https://www.codechef.com/`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/06b95eee-f3f4-4317-8bdb-12205fd16c33`,type:`Тренажер`,skills:[]},{id:`2b5b2bdf-b0fd-4f6d-b0e8-ce410d8973f4`,name:`Flexbox Froggy`,description:`Игра, в которой тебе нужно помочь лягушонку Фроги и его друзьям, написав CSS код. отличный способ изучить сложную тему в CSS flexbox.`,url:`https://flexboxfroggy.com/`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/da6e7fa3-5edb-47ff-b1bd-d9d6a22adcb2`,type:`Игра`,skills:[`CSS`]},{id:`92be83ab-60a3-4512-aac7-2b5201822a42`,name:`JavaScript Тесты`,description:`Курс предназначен для проверки знаний JavaScript и подготовки к собеседованиям на позицию JavaScript-разработчиков!`,url:`https://stepik.org/course/189305/promo?search=7829328040`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/62f2be8a-e3d3-4f25-a97c-bdbe49c8b889`,type:`Курс`,skills:[`JavaScript`]},{id:`07bf815d-e523-4940-81ed-4bb8c6860531`,name:`JavaScript. A3 Задачи`,description:`Задачи на программирования на языке JavaScript, формат ввода-вывода делает задачи похожими на задачи на других языка программирования. В курсе используется синтаксис современного стандарта ES6.`,url:`https://stepik.org/course/103167/promo?search=7829328042`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/92928b06-170d-4c3e-9d98-878c46410f99`,type:`Курс`,skills:[`JavaScript`]},{id:`20d428dd-38c2-4ba6-b4d0-b1f57638f2c3`,name:`Kolesa Podcast`,description:`Podcast by IT-компания Kolesa Group. В целом он обо всём и вся.  Интересно для прослушивания на досуге`,url:`https://music.yandex.ru/album/10925348?activeTab=about`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/8d62c5bf-574b-46aa-9e0e-ea431d0d6df6`,type:`Подкаст`,skills:[]},{id:`46750617-ae36-4f2b-b090-9e090f7d1945`,name:`React. К вершинам мастерства: Создание быстрых, производительных и интуитивно понятных веб-приложений`,description:`Это практическое руководство по разработке веб‑интерфейсов и веб‑приложений с использованием React — популярной библиотеки JavaScript для создания пользовательских интерфейсов. Книга сочетает фундаментальные концепции с продвинутыми техниками, помогая читателю перейти от базового понимания к профессиональному владению инструментом.`,url:`https://t.me/archive_yeahub/23`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/33cf34e9-5293-435d-a79f-a1fb874fa2ae`,type:`Книга`,skills:[]},{id:`7d90e49d-a31b-49b8-99c6-cbb07cf05374`,name:`TeachMeSkills IT-школа`,description:`Это серия выпусков от "TeachMeSkills Школа программирования"
Речь пойдет об актуальные направления и технологии в IT;  перспективы роста начинающих специалистов;  холиварные топики из жизни разработчиков.`,url:`https://music.yandex.ru/album/25945956/track/114806988?activeTab=about`,image:`https://e5e684b1-4a6a-4be5-b7ee-b2b678239d61.selstorage.ru/external_product_catalog/aca99d21-e743-4e6e-be1c-18ac31752299`,type:`Подкаст`,skills:[]}];function bo(e,t){return e.includes(t)?e.filter(e=>e!==t):[...e,t]}function xo({filters:e,setFilters:t,resetFilters:n}){let{t:r}=j(),i=e.query||e.types.length>0||e.skills.length>0;return(0,A.jsxs)(`aside`,{className:`filter-sidebar`,children:[(0,A.jsxs)(`div`,{className:`filter-sidebar__header`,children:[(0,A.jsx)(`h3`,{children:r(`filters.title`)}),i&&(0,A.jsx)(`button`,{type:`button`,className:`filter-sidebar__reset`,onClick:n,children:r(`filters.reset`)})]}),(0,A.jsx)(`div`,{className:`filter-group`,children:(0,A.jsxs)(`div`,{className:`search-input`,children:[(0,A.jsx)(xi,{size:16}),(0,A.jsx)(`input`,{type:`text`,placeholder:r(`filters.resourcePlaceholder`),value:e.query,onChange:e=>t({query:e.target.value})})]})}),(0,A.jsxs)(`div`,{className:`filter-group`,children:[(0,A.jsx)(`div`,{className:`filter-group__title`,children:r(`filters.selectSkill`)}),(0,A.jsx)(`div`,{className:`skill-grid`,children:vo.map(n=>{let r=e.skills.includes(n);return(0,A.jsxs)(`button`,{type:`button`,className:`skill-tag`+(r?` skill-tag--active`:``),onClick:()=>t(e=>({...e,skills:bo(e.skills,n)})),children:[(0,A.jsx)(Na,{skill:n,size:14}),n]},n)})})]}),(0,A.jsxs)(`div`,{className:`filter-group`,children:[(0,A.jsx)(`div`,{className:`filter-group__title`,children:r(`filters.resourceTypes`)}),(0,A.jsx)(`div`,{className:`chip-row`,children:_o.map(n=>{let r=e.types.includes(n);return(0,A.jsx)(`button`,{type:`button`,className:`chip`+(r?` chip--active`:``),onClick:()=>t(e=>({...e,types:bo(e.types,n)})),children:n},n)})})]})]})}var H={query:``,types:[],skills:[]};function So(e,t){if(!t.trim())return!0;let n=t.trim().toLowerCase();return e.name.toLowerCase().includes(n)||e.description.toLowerCase().includes(n)||e.url.toLowerCase().includes(n)}function Co(e,t){return e.filter(e=>!(!So(e,t.query)||t.types.length>0&&!t.types.includes(e.type)||t.skills.length>0&&!e.skills.some(e=>t.skills.includes(e))))}function wo(){let[e,t]=(0,_.useState)(()=>or(H));(0,_.useEffect)(()=>{sr(e)},[e]);let n=(0,_.useCallback)(e=>{t(t=>typeof e==`function`?e(t):{...t,...e})},[]),r=(0,_.useCallback)(()=>t(H),[]);return{resources:(0,_.useMemo)(()=>Co(yo,e),[e]),total:yo.length,filters:e,setFilters:n,resetFilters:r}}var To=10;function Eo(){let{resources:e,filters:t,setFilters:n,resetFilters:r}=wo(),{t:i}=j(),[a,o]=(0,_.useState)(1),s=Math.max(1,Math.ceil(e.length/To)),c=Math.min(a,s),l=e.slice((c-1)*To,c*To);return(0,A.jsxs)(`div`,{className:`page`,children:[(0,A.jsx)(Mi,{items:[{label:i(`nav.knowledgeBase`)},{label:i(`nav.resources`)}]}),(0,A.jsxs)(`div`,{className:`page-with-sidebar`,children:[(0,A.jsxs)(`div`,{className:`page-with-sidebar__main`,children:[(0,A.jsx)(`h1`,{className:`page-title`,children:i(`resources.title`)}),e.length===0?(0,A.jsx)(`div`,{className:`empty-state`,children:i(`resources.empty`)}):(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`div`,{className:`resource-list`,children:l.map(e=>(0,A.jsx)(go,{resource:e},e.id))}),(0,A.jsx)(Ba,{page:c,pageCount:s,onChange:o})]})]}),(0,A.jsx)(xo,{filters:t,setFilters:n,resetFilters:r})]})]})}function Do(){let{questions:e,loading:t}=Ar(),{t:n}=j(),r=e.filter(e=>e.favorite);return(0,A.jsxs)(`div`,{className:`page`,children:[(0,A.jsx)(Mi,{items:[{label:n(`nav.knowledgeBase`)},{label:n(`nav.collections`)}]}),(0,A.jsx)(`h1`,{className:`page-title`,children:n(`collections.title`)}),(0,A.jsx)(`p`,{className:`home__subtitle`,children:n(`collections.subtitle`)}),t?(0,A.jsx)(`div`,{className:`empty-state`,children:n(`questions.loadingIndex`)}):r.length===0?(0,A.jsx)(`div`,{className:`empty-state`,children:n(`collections.empty`)}):(0,A.jsx)(`div`,{className:`question-list`,children:r.map(e=>(0,A.jsx)(aa,{question:e},e.id))})]})}function Oo(){return(0,A.jsx)(Sr,{children:(0,A.jsx)(kr,{children:(0,A.jsx)(zr,{children:(0,A.jsx)(Pn,{basename:`/interview/`,children:(0,A.jsxs)(`div`,{className:`app-shell`,children:[(0,A.jsx)(Ai,{}),(0,A.jsx)(`main`,{className:`app-content`,children:(0,A.jsxs)(Yt,{children:[(0,A.jsx)(k,{path:`/`,element:(0,A.jsx)(ji,{})}),(0,A.jsx)(k,{path:`/training/interview`,element:(0,A.jsx)($a,{})}),(0,A.jsx)(k,{path:`/training/tasks`,element:(0,A.jsx)(lo,{})}),(0,A.jsx)(k,{path:`/training/tasks/:id`,element:(0,A.jsx)(mo,{})}),(0,A.jsx)(k,{path:`/knowledge-base/resources`,element:(0,A.jsx)(Eo,{})}),(0,A.jsx)(k,{path:`/knowledge-base/questions`,element:(0,A.jsx)(Ka,{})}),(0,A.jsx)(k,{path:`/knowledge-base/questions/:id`,element:(0,A.jsx)(Ya,{})}),(0,A.jsx)(k,{path:`/knowledge-base/collections`,element:(0,A.jsx)(Do,{})}),(0,A.jsx)(k,{path:`/analytics`,element:(0,A.jsx)(Za,{})}),(0,A.jsx)(k,{path:`*`,element:(0,A.jsx)(qt,{to:`/`,replace:!0})})]})})]})})})})})}(0,v.createRoot)(document.getElementById(`root`)).render((0,A.jsx)(_.StrictMode,{children:(0,A.jsx)(Oo,{})}));