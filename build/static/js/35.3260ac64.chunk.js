(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{471:function(e,t,n){"use strict";n.r(t),n.d(t,"Form",function(){return w});var a=n(9),r=n(10),s=n(13),u=n(11),o=n(12),l=n(5),c=n(0),i=n.n(c),d=n(380),m=n(21),h=n(16),p=n(390),f=n(385),b=n(15),S=(n(71),n(382)),g=n(6),O=n(59),E=n(7);function v(){var e=Object(l.a)(["\n  padding-top: 20px;\n  padding-bottom: 5px;\n  margin-bottom: 15px;\n  margin: 30px auto 20px auto;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);return v=function(){return e},e}function x(){var e=Object(l.a)(["\n  display: grid;\n  grid-template-columns: 3fr 1fr;\n  height: auto;\n"]);return x=function(){return e},e}function _(){var e=Object(l.a)(["\n  display: inline-block;\n  width: 100%;\n  padding: 10px 30px;\n  cursor: pointer;\n  background: #ff4c3b;\n  color: #fff;\n  border: none;\n  border-radius: 5px;\n  border: 1px #fff solid;\n  max-width: 250px;\n"]);return _=function(){return e},e}function y(){var e=Object(l.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return y=function(){return e},e}function j(){var e=Object(l.a)(["\n  margin: 20px 5px 5px 20px;\n  padding: 2px;\n\n  /* background-color: #cccccc; */\n"]);return j=function(){return e},e}function C(){var e=Object(l.a)(["\n  display: flex;\n  flex-direction: column;\n  background-color: #fff;\n  justify-content: center;\n  color: #333;\n  border-radius: 5px;\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);\n  padding: 20px;\n  margin: 10px;\n  width: 100%;\n  max-width: 800px;\n"]);return C=function(){return e},e}var I=g.b.div(C()),k=g.b.div(j()),w=g.b.form(y()),D=g.b.button(_()),N=g.b.div(x()),A=g.b.div(v()),T=function(e){function t(){var e,n;Object(a.a)(this,t);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={order:[],loading:!1,ShopSuccess:!1,CustomerSuccess:!1,error:null,addressID:null,orderAddress:[],orderItems:[],orderID:null,shippingCharges:25,orderTotal:null,orderStatus:[],shopOrderStatus:[],staffOrderStatus:[],selectedOrderStatus:null},n.fetchOrderStatus=function(){h.a.get(E.S).then(function(e){n.setState({orderStatus:e.data})}).catch(function(e){n.setState({loading:!1})})},n.fetchOrder=function(){var e=n.props.match.params;n.setState({loading:!0}),h.a.get(Object(E.M)(e.orderID)).then(function(e){n.setState({order:e.data,loading:!1,addressID:e.data.address,orderID:e.data.id,orderItems:e.data.order_items,orderTotal:e.data.total}),n.handleCallback()}).catch(function(e){n.setState({error:e,loading:!1})})},n.handleCallback=function(){n.fetchAddress()},n.fetchAddress=function(){var e=n.state.addressID;n.setState({loading:!0}),h.a.get(Object(E.K)(e)).then(function(e){n.setState({orderAddress:e.data,loading:!1})}).catch(function(e){n.setState({error:e,loading:!1})})},n.orderCancelCustoemr=function(e){e.preventDefault();var t=n.state.orderID;console.log(4),h.a.put(Object(E.T)(t),{order_status:4}).then(function(e){b.toast.error("Order  cancelled"),n.setState({CustomerSuccess:!0})}).catch(function(e){n.setState({error:e})})},n.handleChangeOrderStatus=function(e){n.setState({selectedOrderStatus:e.id})},n.updateOrderStatus=function(e){e.preventDefault();var t=n.state.orderID,a=n.state.selectedOrderStatus;h.a.put(Object(E.T)(t),{order_status:a}).then(function(e){b.toast.success("Order status updated"),n.setState({success:!0})}).catch(function(e){n.setState({error:e})})},n}return Object(o.a)(t,e),Object(r.a)(t,[{key:"componentWillMount",value:function(){var e=this;this.fetchOrder(),this.fetchOrderStatus(),this.filter(),setTimeout(function(){e.filter()},3e3)}},{key:"filter",value:function(){this.props.user.user.is_shop_owner&&this.orderStatusShop(),this.props.user.user.is_staff_user&&this.orderStatusStaff()}},{key:"orderStatusShop",value:function(){this.state.orderStatus;this.setState({shopOrderStatus:this.state.orderStatus.filter(function(e){return"shop"===e.can_update_by})})}},{key:"orderStatusStaff",value:function(){this.state.orderStatus;this.setState({staffOrderStatus:this.state.orderStatus.filter(function(e){return"staff"===e.can_update_by})})}},{key:"render",value:function(){var e=this.state,t=e.order,n=e.orderAddress,a=e.orderItems,r=e.success,s=this.props.user;return r?s.user.is_staff_user?i.a.createElement(f.a,{to:"/manage-order-delivery"}):s.user.is_shop_owner?i.a.createElement(f.a,{to:"/shop-order-table"}):i.a.createElement(f.a,{to:"/orders"}):i.a.createElement(O.b,null,i.a.createElement(d.a,{style:{marginRight:"auto",marginBottom:"20px"},to:"/shop-order-table"},i.a.createElement(D,null,"Back to orders")),i.a.createElement(I,null,i.a.createElement(b.ToastContainer,null),s.user?i.a.createElement(i.a.Fragment,null,s.user.is_staff_user?i.a.createElement(k,null,i.a.createElement(w,{onSubmit:this.updateOrderStatus},i.a.createElement("h3",null,"Update order status"),i.a.createElement(p.a,{className:"mb-3",onChange:this.handleChangeOrderStatus,getOptionLabel:function(e){return"".concat(e.name)},getOptionValue:function(e){return"".concat(e)},options:this.state.staffOrderStatus,onInputChange:this.handleInputChange,placeholder:"Select order status",menuIsOpen:this.state.menuOpen}),i.a.createElement(D,{type:"submit"}," Submit"))):null,s.user.is_shop_owner?i.a.createElement(k,null,i.a.createElement(w,{onSubmit:this.updateOrderStatus},i.a.createElement("h3",null,"Update order status"),i.a.createElement(p.a,{className:"mb-3",onChange:this.handleChangeOrderStatus,getOptionLabel:function(e){return"".concat(e.name)},getOptionValue:function(e){return"".concat(e)},options:this.state.shopOrderStatus,onInputChange:this.handleInputChange,placeholder:"Select order status",menuIsOpen:this.state.menuOpen}),i.a.createElement(D,{type:"submit"}," Submit"))):null):null,i.a.createElement(A,null,i.a.createElement("h2",null," Product details")),i.a.createElement(N,null,i.a.createElement("h2",null,"Product"),i.a.createElement("h4",null,"Price")),a?i.a.createElement(i.a.Fragment,null,a.map(function(e,t){return i.a.createElement(N,{key:t},i.a.createElement("h6",null,e.itemLocalName?e.itemLocalName:e.itemName," ","[",e.vname,"] \xd7 ",e.quantity),i.a.createElement("h6",null,"Rs: ",e.final_price))}),i.a.createElement(N,null,i.a.createElement("h4",null,"Total"),i.a.createElement("h4",null," Rs: ",t.total))):null,t.coupon?i.a.createElement(S.a,{variant:"success"},t.coupon_code," coupon Applied !!",t.coupon_offer):null,n?i.a.createElement(i.a.Fragment,null,i.a.createElement(A,null,i.a.createElement("h2",null," Order Address")),i.a.createElement(i.a.Fragment,null,i.a.createElement("h2",null,n.PlaceName),i.a.createElement("h4",null,n.areaName),i.a.createElement("h5",null,n.full_address),i.a.createElement("h5",null,"Village: ",n.vilalgeName),i.a.createElement("h5",null,"District: ",n.districtName),i.a.createElement("h5",null,"Sate: ",n.stateName),i.a.createElement("h5",null,"Phone: ",n.phone_number),i.a.createElement("a",{href:"tel:"+n.phone_number},n.phone_number))):null))}}]),t}(c.Component);t.default=Object(m.connect)(function(e){return{user:e.user}})(T)}}]);
//# sourceMappingURL=35.3260ac64.chunk.js.map