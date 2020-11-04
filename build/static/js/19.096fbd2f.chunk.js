(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{403:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(399),c=n(468),l=n(414),u=n(395),i=function(e){var t=e.placeholder,n=e.name,a=e.value,o=e.onChange,c=void 0===o?function(){return null}:o;return r.a.createElement(u.a.Group,null,r.a.createElement(u.a.Control,{placeholder:t,name:n,value:a||"",onChange:c}))};window.Date.prototype.isValid=function(){return this.getTime()===this.getTime()};var d=function(e){var t=e.column,n=t.filterValue,a=t.setFilter,o=t.filter;return r.a.createElement(i,{value:n||"",onChange:function(e){a(e.target.value||void 0)},placeholder:"Search ".concat(o||"","...")})};t.a=function(e){var t=e.columns,n=e.data,a={year:function(e,t,n){return e.filter(function(e){var a=e.values[t];return!(void 0!==a&&Number(n)&&new Date(a)&&new Date(a).isValid())||new Date(a).getFullYear()===Number(n)})},text:function(e,t,n){return e.filter(function(e){var a=e.values[t];return void 0===a||String(a).toLowerCase().startsWith(String(n).toLowerCase())})}},u={Filter:d},i=Object(l.useTable)({columns:t,data:n,defaultColumn:u,filterTypes:a},l.useFilters,l.useSortBy),s=i.getTableProps,f=i.getTableBodyProps,m=i.headerGroups,p=i.rows,b=i.prepareRow;return r.a.createElement(o.a,null,r.a.createElement(c.a,Object.assign({responsive:"md",striped:!0,bordered:!0,hover:!0,size:"sm"},s()),r.a.createElement("thead",null,m.map(function(e){return r.a.createElement("tr",e.getHeaderGroupProps(),e.headers.map(function(e,t){var n=e.render,a=e.getHeaderProps,o=e.isSorted,c=e.isSortedDesc,l=e.getSortByToggleProps,u=e.canFilter,i=o?c?"desc":"asc":"";return r.a.createElement("th",{key:"th-".concat(t),className:i},r.a.createElement("div",a(l()),n("Header")),r.a.createElement("div",null,u?n("Filter"):null))}))})),r.a.createElement("tbody",f(),p.map(function(e,t){return b(e),r.a.createElement("tr",e.getRowProps(),e.cells.map(function(e){return r.a.createElement("td",e.getCellProps(),e.render("Cell"))}))}))))}},416:function(e,t,n){},469:function(e,t,n){"use strict";n.r(t);var a=n(391),r=n(4),o=n(0),c=n.n(o),l=(n(18),n(380)),u=n(14),i=n(7),d=n(397),s=(n(416),n(215)),f=n(214),m=n(403),p=n(5),b=n(45),v=n(60);function g(){var e=Object(r.a)(["\n  display: inline-block;\n  padding: 10px 30px;\n  cursor: pointer;\n  background: #ff4c3b;\n  color: #fff;\n  border: none;\n  border-radius: 5px;\n  border: 1px #fff solid;\n  max-width: 200px;\n  &:hover {\n    transform: scale(0.98);\n    color: #343a40;\n  }\n"]);return g=function(){return e},e}function O(){var e=Object(r.a)(["\n  display: flex;\n  flex-direction: column;\n  background-color: #fff;\n  color: #333;\n  border-radius: 10px;\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);\n  padding: 20px;\n  width: 100%;\n  margin: 100px auto 20px auto;\n"]);return O=function(){return e},e}function h(){var e=Object(r.a)(["\n  margin: 20px auto;\n  width: 95%;\n  padding: 20px;\n  background-color: #fff;\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);\n"]);return h=function(){return e},e}function j(){var e=Object(r.a)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"]);return j=function(){return e},e}var w=p.b.div(j()),E=p.b.div(h()),x=p.b.div(O()),y=p.b.button(g());t.default=function(){var e=Object(o.useState)(null),t=Object(a.a)(e,2),n=t[0],r=t[1],p=Object(o.useState)(!1),g=Object(a.a)(p,2),O=g[0],h=g[1],j=Object(o.useState)(Object(s.default)(Object(f.default)(new Date,0),0)),D=Object(a.a)(j,2),S=D[0],C=D[1],H=Object(o.useState)(Object(s.default)(Object(f.default)(new Date,59),23)),F=Object(a.a)(H,2),T=F[0],M=F[1];Object(o.useEffect)(function(){k()},[]);var k=function(e){var t=void 0===T?null:T,n=void 0===S?null:S;h(!0),u.a.get(i.N,{params:{staringtDate:n,endingtDate:t}}).then(function(e){r(e.data),h(!1)}).catch(function(e){h(!1)})},P=[{Header:"ID",accessor:"id",Cell:function(e){var t=e.row;return c.a.createElement(l.a,{to:"".concat("","/shop-order/").concat(t.values.id)},t.values.id)}},{Header:"Customer",accessor:"customer_name"},{Header:"Area",accessor:"area_name"},{Header:"Status",accessor:"orderStatus"},{Header:"Date",accessor:"start_date"},{Header:"Mobile",accessor:"mobile_number"},{Header:"Mode of payment",accessor:"mode_of_payment"}];return c.a.createElement(w,null,c.a.createElement(x,{style:{alignItems:"center"}},c.a.createElement(v.h,{selected:S,selectsStart:!0,onChange:function(e){return C(e)},dateFormat:"dd/MMM/yy",onFocus:function(e){return e.target.readOnly=!0},popperModifiers:{preventOverflow:{enabled:!0}},timeFormat:"HH:mm",injectTimes:[Object(s.default)(Object(f.default)(new Date,1),0),Object(s.default)(Object(f.default)(new Date,5),12),Object(s.default)(Object(f.default)(new Date,59),23)]}),c.a.createElement(v.h,{className:"form-group",selected:T,popperModifiers:{preventOverflow:{enabled:!0}},onChange:function(e){return M(e)},onFocus:function(e){return e.target.readOnly=!0},dateFormat:"dd/MMM/yy",timeFormat:"HH:mm",injectTimes:[Object(s.default)(Object(f.default)(new Date,1),0),Object(s.default)(Object(f.default)(new Date,5),12),Object(s.default)(Object(f.default)(new Date,59),23)]}),c.a.createElement(y,{type:"submit",id:"submit",placeholder:"search",onClick:k},"Submit")),n?c.a.createElement("div",null,c.a.createElement(d.a,{bg:"secondary",style:{width:"18rem",marginTop:"20px",marginBottom:"20px"},className:"mb-2",text:"light"},c.a.createElement(d.a.Body,null,c.a.createElement(d.a.Title,null," ",n.length," Orders ")))):null,O?c.a.createElement(b.c,null):null,n?c.a.createElement(E,null,c.a.createElement(m.a,{data:n,columns:P})):null)}}}]);
//# sourceMappingURL=19.096fbd2f.chunk.js.map