"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[404],{404:(e,t,n)=>{n.r(t),n.d(t,{default:()=>m});var a=n(791),r=n(880),i=n(268),s=n(483),l=n(879),c=n(978),o=n(946),d=n(722),u=n(38),h=n(639),p=n(708),v=(n(215),n(184));const m=()=>{const{isLoading:e,error:t,sendrequest:n,clearError:m}=(0,d.x)(),[x,f]=(0,a.useState)(),y=(0,r.k6)(),j=(0,a.useContext)(p.V),b=(0,r.UO)().placeId,[C,g,N]=(0,c.Z)({title:{value:"",isValid:!1},description:{value:"",isValid:!1}},!1);(0,a.useEffect)((()=>{(async()=>{try{const e=await n("".concat("https://direction-mern-app.onrender.com","/api/places/").concat(b));f(e.place),N({title:{value:e.place.title,isValid:!0},description:{value:e.place.description,isValid:!0}},!0)}catch(t){}})()}),[n,b,N]);return e?(0,v.jsx)("div",{className:"center",children:(0,v.jsx)(u.Z,{})}):x||t?(0,v.jsxs)(a.Fragment,{children:[(0,v.jsx)(h.Z,{error:t,onClear:m}),!e&&x&&(0,v.jsxs)("form",{className:"place-form",onSubmit:async e=>{e.preventDefault();try{await n("".concat("https://direction-mern-app.onrender.com","/api/places/").concat(b),"PATCH",{"Content-Type":"application/json",Authorization:"Bearer "+j.token},JSON.stringify({title:C.inputs.title.value,description:C.inputs.description.value})),y.push("/"+j.userId+"/places")}catch(t){}},children:[(0,v.jsx)(i.Z,{id:"title",element:"input",type:"text",lable:"Title",validators:[(0,l.hg)()],errorText:"Please enter valid title",initialValue:x.title,initialValid:!0,onInput:g}),(0,v.jsx)(i.Z,{id:"description",element:"textarea",lable:"description",validators:[(0,l.CP)(5)],errorText:"Please enter valid description",initialValue:x.description,initialValid:!0,onInput:g}),(0,v.jsx)(s.Z,{type:"submit",disabled:!C.isValid,children:"UPADTE PLACE"})]})]}):(0,v.jsx)("div",{className:"center",children:(0,v.jsx)(o.Z,{children:(0,v.jsx)("h2",{children:"Could Not find Place"})})})}},483:(e,t,n)=>{n.d(t,{Z:()=>i});n(791);var a=n(523),r=n(184);const i=e=>e.href?(0,r.jsx)("a",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),href:e.href,children:e.children}):e.to?(0,r.jsx)(a.rU,{to:e.to,exact:e.exact,className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),children:e.children}):(0,r.jsx)("button",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),type:e.type,onClick:e.onClick,disabled:e.disabled,children:e.children})},268:(e,t,n)=>{n.d(t,{Z:()=>l});var a=n(791),r=n(879),i=n(184);const s=(e,t)=>{switch(t.type){case"CHANGE":return{...e,value:t.val,isValid:(0,r.Gu)(t.val,t.validators)};case"TOUCH":return{...e,isTouched:!0};default:return e}},l=e=>{const[t,n]=(0,a.useReducer)(s,{value:e.initialValue||"",isValid:e.initialValid||!1,isTouched:!1}),{id:r,onInput:l}=e,{value:c,isValid:o}=t;(0,a.useEffect)((()=>{l(r,c,o)}),[r,l,c,o]);const d=t=>{n({type:"CHANGE",val:t.target.value,validators:e.validators})},u=()=>{n({type:"TOUCH"})},h="input"===e.element?(0,i.jsx)("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:d,value:t.value,onBlur:u}):(0,i.jsx)("textarea",{id:e.id,rows:e.rows||3,onChange:d,value:t.value,onBlur:u});return(0,i.jsxs)("div",{className:"form-control ".concat(!t.isValid&&t.isTouched&&"form-control--invalid"),children:[(0,i.jsx)("label",{htmlFor:e.id,children:e.lable}),h,!t.isValid&&t.isTouched&&(0,i.jsx)("p",{children:e.errorText})]})}},946:(e,t,n)=>{n.d(t,{Z:()=>r});n(791);var a=n(184);const r=e=>(0,a.jsx)("div",{className:"card ".concat(e.className),style:e.style,children:e.children})},639:(e,t,n)=>{n.d(t,{Z:()=>s});n(791);var a=n(832),r=n(483),i=n(184);const s=e=>(0,i.jsx)(a.Z,{onCancel:e.onClear,header:"An Error Occurred!",show:!!e.error,footer:(0,i.jsx)(r.Z,{onClick:e.onClear,children:"Okay"}),children:(0,i.jsx)("p",{children:e.error})})},832:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(791),r=n(164),i=n(549),s=n(522),l=n(184);const c=e=>{const t=(0,l.jsxs)("div",{className:"modal ".concat(e.className),style:e.style,children:[(0,l.jsx)("header",{className:"modal__header ".concat(e.headerClass),children:(0,l.jsx)("h2",{children:e.header})}),(0,l.jsxs)("form",{onSubmit:e.onSubmit?e.onSubmit:e=>{e.preventDefault()},children:[(0,l.jsx)("div",{className:"modal__content ".concat(e.contentClass),children:e.children}),(0,l.jsx)("footer",{className:"modal__footer ".concat(e.footerClass),children:e.footer})]})]});return r.createPortal(t,document.getElementById("modal-hook"))},o=e=>(0,l.jsxs)(a.Fragment,{children:[e.show&&(0,l.jsx)(s.Z,{onClick:e.onCancel}),(0,l.jsx)(i.Z,{in:e.show,mountOnEnter:!0,unmountOnExit:!0,timeout:200,classNames:"modal",children:(0,l.jsx)(c,{...e})})]})},978:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(791);const r=(e,t)=>{switch(t.type){case"INPUT_CHANGE":let n=!0;for(const a in e.inputs)e.inputs[a]&&(n=a===t.inputId?n&&t.isValid:n&&e.inputs[a].isValid);return{...e,inputs:{...e.inputs,[t.inputId]:{value:t.value,isValid:t.isValid}},isValid:n};case"SET_DATA":return{inputs:t.inputs,isValid:t.isFormValid};default:return e}},i=(e,t)=>{const[n,i]=(0,a.useReducer)(r,{inputs:e,isValid:t});return[n,(0,a.useCallback)(((e,t,n)=>{i({type:"INPUT_CHANGE",value:t,isValid:n,inputId:e})}),[]),(0,a.useCallback)(((e,t)=>{i({type:"SET_DATA",inputs:e,isFormValid:t})}),[])]}},722:(e,t,n)=>{n.d(t,{x:()=>r});var a=n(791);const r=()=>{const[e,t]=(0,a.useState)(!1),[n,r]=(0,a.useState)(),i=(0,a.useRef)([]),s=(0,a.useCallback)((async function(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;t(!0);const c=new AbortController;i.current.push(c);try{const n=await fetch(e,{method:a,headers:s,body:l,signal:c.signal}),r=await n.json();if(i.current=i.current.filter((e=>e!==c)),!n.ok)throw new Error(r.message);return t(!1),r}catch(n){throw r(n.message),t(!1),n}}),[]);return(0,a.useEffect)((()=>()=>{i.current.forEach((e=>e.abort()))}),[]),{isLoading:e,error:n,sendrequest:s,clearError:()=>{r(null)}}}},879:(e,t,n)=>{n.d(t,{CP:()=>c,Gu:()=>d,Ox:()=>o,hg:()=>l});const a="REQUIRE",r="MINLENGTH",i="MAXLENGTH",s="EMAIL",l=()=>({type:a}),c=e=>({type:r,val:e}),o=()=>({type:s}),d=(e,t)=>{let n=!0;for(const l of t)l.type===a&&(n=n&&e.trim().length>0),l.type===r&&(n=n&&e.trim().length>=l.val),l.type===i&&(n=n&&e.trim().length<=l.val),"MIN"===l.type&&(n=n&&+e>=l.val),"MAX"===l.type&&(n=n&&+e<=l.val),l.type===s&&(n=n&&/^\S+@\S+\.\S+$/.test(e));return n}},215:()=>{}}]);
//# sourceMappingURL=404.2d720aee.chunk.js.map