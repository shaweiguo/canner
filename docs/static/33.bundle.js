(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{277:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,o,a=s(n(1309)),u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(1305);var f=n(1),c=s(f),p=n(43),l=n(46);function s(e){return e&&e.__esModule?e:{default:e}}function h(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var b=(o=r=function(e){function t(){var e,n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var o=arguments.length,a=Array(o),u=0;u<o;u++)a[u]=arguments[u];return n=r=h(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),r.onChange=function(e){var t=r.props.refId;r.props.onChange(t,"update",(0,l.transformData)(e))},h(r,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,f.Component),i(t,[{key:"render",value:function(){var e=this.props,t=e.value,n=e.uiParams,r=n&&n.unit?function(e){return e+" "+n.unit}:function(e){return e};return c.default.createElement(a.default,u({range:!0,min:n&&n.min,max:n&&n.max,step:n&&n.step,tipFormatter:r},this.props,{onChange:this.onChange,value:t.toJS()}))}}]),t}(),r.defaultProps={value:(0,p.List)([0,100])},o);t.default=b}}]);