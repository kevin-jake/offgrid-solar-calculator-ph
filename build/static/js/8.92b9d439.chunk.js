(this["webpackJsonpoffgrid-solar-calculator-ph"]=this["webpackJsonpoffgrid-solar-calculator-ph"]||[]).push([[8],{104:function(e,t,a){},109:function(e,t,a){"use strict";a.r(t);var r=a(38),n=a.n(r),l=a(39),i=a(5),o=a(0),c=a.n(o),s=a(18),u=a(1),d=function(e,t){switch(t.type){case"CHANGE":var a=!0;for(var r in e.inputs)e.inputs[r]&&(a=r===t.inputId?a&&t.isValid:a&&e.inputs[r].isValid);return Object(u.a)(Object(u.a)({},e),{},{inputs:Object(u.a)(Object(u.a)({},e.inputs),{},Object(s.a)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:a});case"SET":return{inputs:t.inputs,isValid:t.formisValid};default:return e}},m=a(11),p=a(43),f=(a(104),function(e,t){switch(t.type){case"CHANGE":return Object(u.a)(Object(u.a)({},e),{},{value:t.val,isValid:Object(p.d)(t.val,t.validators)});case"TOUCH":return Object(u.a)(Object(u.a)({},e),{},{isTouched:!0});default:return e}}),b=function(e){var t=Object(o.useReducer)(f,{value:e.initialValue||"",isTouched:!1,isValid:e.initialisValid||!1}),a=Object(i.a)(t,2),r=a[0],n=a[1],l=e.id,s=e.onInput,u=r.value,d=r.isValid;Object(o.useEffect)((function(){s(l,u,d)}),[l,d,u,s]);var m=function(t){n({type:"CHANGE",val:t.target.value,validators:e.validators})},p=function(){n({type:"TOUCH"})},b="input"===e.element?c.a.createElement("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:m,onBlur:p,value:r.value}):c.a.createElement("textarea",{id:e.id,rows:e.row||3,onChange:m,onBlur:p,value:r.value});return c.a.createElement("div",{className:"form-control ".concat(!r.isValid&&r.isTouched&&"form-control--invalid")},c.a.createElement("label",{htmlFor:e.id}," ",e.label),b,!r.isValid&&r.isTouched&&c.a.createElement("p",null,e.errorText))},v=a(41),g=a(17),x=a(54);t.default=function(){var e=Object(o.useContext)(m.a).login,t=Object(o.useState)(!0),a=Object(i.a)(t,2),r=a[0],s=a[1],u=Object(v.a)(),f=u.isLoading,E=u.error,h=u.sendRequest,y=u.clearError,w=function(e,t){var a=Object(o.useReducer)(d,{inputs:e,isValid:t}),r=Object(i.a)(a,2),n=r[0],l=r[1];return[n,Object(o.useCallback)((function(e,t,a){l({type:"CHANGE",value:t,isValid:a,inputId:e})}),[]),Object(o.useCallback)((function(e,t){l({type:"SET",inputs:e,formisValid:t})}),[])]}({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1),k=Object(i.a)(w,2),j=k[0],O=k[1],N=function(){s((function(e){return!e}))},C=function(){var t=Object(l.a)(n.a.mark((function t(a){var l,i;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),!r){t.next=13;break}return t.prev=2,t.next=5,h("https://solar-calculator-ph.herokuapp.com/api/users/login","POST",JSON.stringify({email:j.inputs.email.value,password:j.inputs.password.value}),{"Content-Type":"application/json"});case 5:return l=t.sent,t.abrupt("return",e(l.userId,l.token,l.email,l.name,l.role));case 9:t.prev=9,t.t0=t.catch(2);case 11:t.next=22;break;case 13:return t.prev=13,t.next=16,h("https://solar-calculator-ph.herokuapp.com/api/users/signup","POST",JSON.stringify({email:j.inputs.email.value,password:j.inputs.password.value,name:j.inputs.name.value,role:"User"}),{"Content-Type":"application/json"});case 16:return i=t.sent,t.abrupt("return",e(i.userId,i.token,i.email,i.name,i.role));case 20:t.prev=20,t.t1=t.catch(13);case 22:case"end":return t.stop()}}),t,null,[[2,9],[13,20]])})));return function(e){return t.apply(this,arguments)}}();return c.a.createElement(c.a.Fragment,null,f&&c.a.createElement(g.a,null),c.a.createElement("div",{className:"w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md border-2 border-blue-400 dark:border-blue-300 dark:bg-gray-800"},c.a.createElement("div",{className:"px-6 py-4"},c.a.createElement("h2",{className:"text-3xl font-bold text-center text-gray-700 dark:text-white"},"LOGIN HERE"),c.a.createElement("p",{className:"mt-1 text-center text-gray-500 dark:text-gray-400"},"Login or create account"),c.a.createElement("form",{onSubmit:C},!r&&c.a.createElement(b,{element:"input",id:"name",type:"text",label:"Name",validators:[Object(p.c)()],errorText:"Please enter a name.",onInput:O}),c.a.createElement(b,{id:"email",element:"input",type:"email",label:"Email",validators:[Object(p.a)()],errorText:"Please enter a valid email.",onInput:O}),c.a.createElement(b,{id:"password",element:"input",type:"password",label:"Password",validators:[Object(p.b)(6)],errorText:"Please enter a valid password (At least 8 characters).",onInput:O}),r?c.a.createElement("button",{type:"submit",className:j.isValid?"w-full lg:w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 hover:bg-blue-500 rounded-md focus:outline-none":"w-full lg:w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform text-white capitalize rounded-lg bg-gray-200 lg:mt-0 lg:w-auto cursor-not-allowed",disabled:!j.isValid},"LOGIN"):c.a.createElement("button",{type:"submit",className:j.isValid?"w-full lg:w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 hover:bg-blue-500 rounded-md focus:outline-none":"w-full lg:w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform text-white capitalize rounded-lg bg-gray-200 lg:mt-0 lg:w-auto cursor-not-allowed",disabled:!j.isValid},"SIGNUP"))),c.a.createElement("div",{className:"flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700"},r?c.a.createElement("span",{className:"text-sm text-gray-600 dark:text-gray-200"}," ","New here? Please"," ",c.a.createElement("button",{className:"mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline",onClick:N},"Register")):c.a.createElement("span",{className:"text-sm text-gray-600 dark:text-gray-200"}," ","Already have an account? Please"," ",c.a.createElement("button",{className:"mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline",onClick:N},"Sign-in")))),E&&!f&&c.a.createElement(x.a,{error:E,type:"ERROR",clearError:y}))}},41:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var r=a(38),n=a.n(r),l=a(39),i=a(5),o=a(0),c=function(){var e=Object(o.useState)(!1),t=Object(i.a)(e,2),a=t[0],r=t[1],c=Object(o.useState)(),s=Object(i.a)(c,2),u=s[0],d=s[1],m=Object(o.useRef)([]),p=Object(o.useCallback)(function(){var e=Object(l.a)(n.a.mark((function e(t){var a,l,i,o,c,s,u=arguments;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=u.length>1&&void 0!==u[1]?u[1]:"GET",l=u.length>2&&void 0!==u[2]?u[2]:null,i=u.length>3&&void 0!==u[3]?u[3]:{},r(!0),o=new AbortController,m.current.push(o),console.log(l),e.prev=7,e.next=10,fetch(t,{method:a,body:l,headers:i,signal:o.signal});case 10:return c=e.sent,e.next=13,c.json();case 13:if(s=e.sent,m.current=m.current.filter((function(e){return e!==o})),c.ok){e.next=17;break}throw new Error(s.message);case 17:return r(!1),e.abrupt("return",s);case 21:throw e.prev=21,e.t0=e.catch(7),d(e.t0.message),r(!1),e.t0;case 26:case"end":return e.stop()}}),e,null,[[7,21]])})));return function(t){return e.apply(this,arguments)}}(),[]);return Object(o.useEffect)((function(){return function(){m.current.forEach((function(e){return e.abort()}))}}),[]),{isLoading:a,error:u,sendRequest:p,clearError:function(){d(null)}}}},43:function(e,t,a){"use strict";a.d(t,"c",(function(){return n})),a.d(t,"b",(function(){return l})),a.d(t,"a",(function(){return i})),a.d(t,"d",(function(){return o}));var r=a(60),n=function(){return{type:"REQUIRE"}},l=function(e){return{type:"MINLENGTH",val:e}},i=function(){return{type:"EMAIL"}},o=function(e,t){var a,n=!0,l=Object(r.a)(t);try{for(l.s();!(a=l.n()).done;){var i=a.value;"REQUIRE"===i.type&&(n=n&&e.trim().length>0),"MINLENGTH"===i.type&&(n=n&&e.trim().length>=i.val),"MAXLENGTH"===i.type&&(n=n&&e.trim().length<=i.val),"MIN"===i.type&&(n=n&&+e>=i.val),"MAX"===i.type&&(n=n&&+e<=i.val),"EMAIL"===i.type&&(n=n&&/^\S+@\S+\.\S+$/.test(e))}}catch(o){l.e(o)}finally{l.f()}return n}},54:function(e,t,a){"use strict";var r=a(5),n=a(0),l=a.n(n),i=a(62);t.a=function(e){var t=Object(n.useState)(e.error),a=Object(r.a)(t,2),o=a[0];a[1];Object(n.useEffect)((function(){c(e.type,o)}),[o,e.type]);var c=function(e,t){switch(e){case"SUCCESS":return i.b.custom((function(e){return l.a.createElement("div",{className:"".concat(e.visible?"animate-enter":"animate-leave"," relative duration-300 space-x-2 justify-center")},l.a.createElement("div",{className:"flex p-4 mb-4 top-0 right-0 -mt-1 mr-2 items-center text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800",role:"alert"},l.a.createElement("svg",{className:"h-8 w-8 text-green-500",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}," ",l.a.createElement("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"})," ",l.a.createElement("polyline",{points:"22 4 12 14.01 9 11.01"})),l.a.createElement("div",{className:"ml-2 inline-block"},l.a.createElement("span",{className:"font-medium"},"Success alert!")," Change a few things up and try submitting again."),l.a.createElement("button",{onClick:function(){return i.b.remove(e.id)},className:"border border-transparent p-2 items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"},l.a.createElement("svg",{className:"h-6 w-6 text-red-500",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}," ",l.a.createElement("line",{x1:"18",y1:"6",x2:"6",y2:"18"})," ",l.a.createElement("line",{x1:"6",y1:"6",x2:"18",y2:"18"})))))}),{duration:2e3});case"ERROR":return i.b.custom((function(e){return l.a.createElement("div",{className:"".concat(e.visible?"animate-enter":"animate-leave"," relative duration-300 space-x-2 justify-center")},l.a.createElement("div",{className:"flex p-4 mb-4 top-0 right-0 -mt-1 mr-2 items-center text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800",role:"alert"},l.a.createElement("svg",{className:"h-8 w-8 text-red-500",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}," ",l.a.createElement("circle",{cx:"12",cy:"12",r:"10"})," ",l.a.createElement("line",{x1:"12",y1:"8",x2:"12",y2:"12"})," ",l.a.createElement("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})),l.a.createElement("div",{className:"ml-2 inline-block"},l.a.createElement("span",{className:"font-medium"},"ERROR!")," ",t),l.a.createElement("button",{onClick:function(){return i.b.remove(e.id)},className:"border border-transparent p-2 items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"},l.a.createElement("svg",{className:"h-6 w-6 text-red-500",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}," ",l.a.createElement("line",{x1:"18",y1:"6",x2:"6",y2:"18"})," ",l.a.createElement("line",{x1:"6",y1:"6",x2:"18",y2:"18"})))))}),{duration:2e3});default:return l.a.createElement(l.a.Fragment,null)}};return l.a.createElement(l.a.Fragment,null,o&&l.a.createElement(i.a,null))}}}]);
//# sourceMappingURL=8.92b9d439.chunk.js.map