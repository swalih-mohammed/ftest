(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{391:function(e,a,t){"use strict";function n(e,a){return function(e){if(Array.isArray(e))return e}(e)||function(e,a){var t=[],n=!0,r=!1,l=void 0;try{for(var o,m=e[Symbol.iterator]();!(n=(o=m.next()).done)&&(t.push(o.value),!a||t.length!==a);n=!0);}catch(s){r=!0,l=s}finally{try{n||null==m.return||m.return()}finally{if(r)throw l}}return t}(e,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}t.d(a,"a",function(){return n})},473:function(e,a,t){"use strict";t.r(a);var n=t(391),r=t(0),l=t.n(r),o=t(21),m=(t(40),t(385)),s=(t(96),t(16)),c=t(7),u=t(104),i=t(15);t(71);a.default=Object(o.connect)(function(e){return{currentUser:e.user.user.userID}})(function(e){var a=Object(r.useState)(!1),t=Object(n.a)(a,2),o=t[0],d=t[1],h=Object(u.b)({initialValues:{owner:e.currentUser,shopName:"",ownerName:"",phoneNumber:"",address:""},onSubmit:function(a){console.log(a);var t=e.currentUser,n=void 0===a.shopName?null:a.shopName,r=void 0===a.ownerName?null:a.ownerName,l=void 0===a.address?null:a.address,o=void 0===a.phoneNumber?null:a.phoneNumber;s.a.post(c.gb,{name:n,owner:t,owner_name:r,address:l,phone_number:o}).then(function(e){i.toast.success("Thank you for adding your shop! You may receive a call from us soon :)"),d(!0)}).catch(function(e){})}});return o?l.a.createElement(m.a,{to:"/"}):l.a.createElement("div",null,l.a.createElement(i.ToastContainer,null),l.a.createElement("section",{className:"register-page section-b-space"},l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-lg-12"},l.a.createElement("h3",null,"Add your shop"),l.a.createElement("div",{className:"theme-card"},l.a.createElement("form",{className:"theme-form",onSubmit:h.handleSubmit},l.a.createElement("div",{className:"form-row"},l.a.createElement("div",{className:"col-md-6"},l.a.createElement("label",{htmlFor:"email"},"Shop Name"),l.a.createElement("input",{className:"form-control",id:"shopname",name:"shopName",type:"text",onChange:h.handleChange,value:h.values.state})),l.a.createElement("div",{className:"col-md-6"},l.a.createElement("label",{htmlFor:"review"},"Owner Name"),l.a.createElement("input",{className:"form-control",id:"ownername",name:"ownerName",type:"text",onChange:h.handleChange,value:h.values.state}))),l.a.createElement("div",{className:"form-row"},l.a.createElement("div",{className:"col-md-6"},l.a.createElement("label",{htmlFor:"email"},"Phone Number"),l.a.createElement("input",{className:"form-control",id:"phoneNumber",name:"phoneNumber",type:"text",onChange:h.handleChange,value:h.values.state})),l.a.createElement("div",{className:"col-md-6"},l.a.createElement("label",{htmlFor:"review"},"Address"),l.a.createElement("textarea",{className:"form-control",id:"address",name:"address",type:"text",onChange:h.handleChange,value:h.values.state}),l.a.createElement("br",null)),l.a.createElement("input",{type:"submit",className:"btn btn-solid",id:"submit",placeholder:"Submit",required:""})))))))))})}}]);
//# sourceMappingURL=26.e7d12e44.chunk.js.map