(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{453:function(e,t,n){"use strict";n.r(t),n.d(t,"Form",function(){return N});var r=n(9),a=n(10),o=n(13),u=n(11),s=n(12),c=n(3),l=n(0),i=n.n(l),d=n(246),f=(n(81),n(18)),p=n(15),h=n(258),m=n(253),b=n(17),S=(n(47),n(249)),g=n(2),O=n(6);function E(){var e=Object(c.a)(["\n  padding-top: 20px;\n  padding-bottom: 5px;\n  margin-bottom: 15px;\n  margin: 30px auto 20px auto;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);return E=function(){return e},e}function v(){var e=Object(c.a)(["\n  display: grid;\n  grid-template-columns: 3fr 1fr;\n  height: auto;\n"]);return v=function(){return e},e}function x(){var e=Object(c.a)(["\n  display: inline-block;\n  padding: 10px 30px;\n  cursor: pointer;\n  background: #ff4c3b;\n  color: #fff;\n  border: none;\n  border-radius: 5px;\n  border: 1px #fff solid;\n  width: 150px;\n"]);return x=function(){return e},e}function _(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return _=function(){return e},e}function y(){var e=Object(c.a)(["\n  border: 1px solid #6c757d;\n  margin: 2px;\n"]);return y=function(){return e},e}function j(){var e=Object(c.a)(["\n  margin: 20px 5px 5px 20px;\n  padding: 2px;\n\n  /* background-color: #cccccc; */\n"]);return j=function(){return e},e}function k(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  background-color: #fff;\n  color: #333;\n  border-radius: 10px;\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);\n  padding: 20px;\n  margin: 10px;\n"]);return k=function(){return e},e}function C(){var e=Object(c.a)(["\n  margin: 20px auto 30px auto;\n  display: flex;\n  flex-direction: column;\n"]);return C=function(){return e},e}var I=g.b.div(C()),w=g.b.div(k()),D=g.b.div(j()),N=(g.b.div(y()),g.b.form(_())),A=g.b.button(x()),T=g.b.div(v()),P=g.b.div(E()),L=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(n=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={order:[],loading:!1,ShopSuccess:!1,CustomerSuccess:!1,error:null,addressID:null,orderAddress:[],orderItems:[],orderID:null,shippingCharges:25,orderTotal:null,orderStatus:[],shopOrderStatus:[],staffOrderStatus:[],selectedOrderStatus:null},n.fetchOrderStatus=function(){p.a.get(O.S).then(function(e){n.setState({orderStatus:e.data})}).catch(function(e){n.setState({loading:!1})})},n.fetchOrder=function(){var e=n.props.match.params;n.setState({loading:!0}),p.a.get(Object(O.M)(e.orderID)).then(function(e){n.setState({order:e.data,loading:!1,addressID:e.data.address,orderID:e.data.id,orderItems:e.data.order_items,orderTotal:e.data.total}),n.handleCallback()}).catch(function(e){n.setState({error:e,loading:!1})})},n.handleCallback=function(){n.fetchAddress()},n.fetchAddress=function(){var e=n.state.addressID;n.setState({loading:!0}),p.a.get(Object(O.K)(e)).then(function(e){n.setState({orderAddress:e.data,loading:!1})}).catch(function(e){n.setState({error:e,loading:!1})})},n.orderCancelCustoemr=function(e){e.preventDefault();var t=n.state.orderID;console.log(4),p.a.put(Object(O.T)(t),{order_status:4}).then(function(e){b.toast.error("Order  cancelled"),n.setState({CustomerSuccess:!0})}).catch(function(e){n.setState({error:e})})},n.handleChangeOrderStatus=function(e){n.setState({selectedOrderStatus:e.id})},n.updateOrderStatus=function(e){e.preventDefault();var t=n.state.orderID,r=n.state.selectedOrderStatus;p.a.put(Object(O.T)(t),{order_status:r}).then(function(e){b.toast.success("Order status updated"),n.setState({success:!0})}).catch(function(e){n.setState({error:e})})},n}return Object(s.a)(t,e),Object(a.a)(t,[{key:"componentWillMount",value:function(){var e=this;this.fetchOrder(),this.fetchOrderStatus(),this.filter(),setTimeout(function(){e.filter()},3e3)}},{key:"filter",value:function(){this.props.user.user.is_shop_owner&&this.orderStatusShop(),this.props.user.user.is_staff_user&&this.orderStatusStaff()}},{key:"orderStatusShop",value:function(){this.state.orderStatus;this.setState({shopOrderStatus:this.state.orderStatus.filter(function(e){return"shop"===e.can_update_by})})}},{key:"orderStatusStaff",value:function(){this.state.orderStatus;this.setState({staffOrderStatus:this.state.orderStatus.filter(function(e){return"staff"===e.can_update_by})})}},{key:"render",value:function(){var e=this.state,t=e.order,n=e.orderAddress,r=e.orderItems,a=e.success,o=this.props.user;return a?o.user.is_staff_user?i.a.createElement(m.a,{to:"/manage-order-delivery"}):o.user.is_shop_owner?i.a.createElement(m.a,{to:"/shop-order-table"}):i.a.createElement(m.a,{to:"/orders"}):i.a.createElement(I,null,i.a.createElement(d.a,{to:"/shop-order-table"},i.a.createElement(A,null,"Back to orders")),i.a.createElement(w,null,i.a.createElement(b.ToastContainer,null),o.user.is_staff_user?i.a.createElement(D,null,i.a.createElement(N,{onSubmit:this.updateOrderStatus},i.a.createElement("h3",null,"Update order status"),i.a.createElement(h.a,{className:"mb-3",onChange:this.handleChangeOrderStatus,getOptionLabel:function(e){return"".concat(e.name)},getOptionValue:function(e){return"".concat(e)},options:this.state.staffOrderStatus,onInputChange:this.handleInputChange,placeholder:"Select order status",menuIsOpen:this.state.menuOpen}),i.a.createElement(A,{type:"submit"}," Submit"))):null,i.a.createElement(P,null,i.a.createElement("h2",null," Product details")),i.a.createElement(T,null,i.a.createElement("h2",null,"Product"),i.a.createElement("h4",null,"Price")),r.map(function(e,t){return i.a.createElement(T,{key:t},i.a.createElement("h6",null,e.itemLocalName?e.itemLocalName:e.itemName," [",e.vname,"] \xd7 ",e.quantity),i.a.createElement("h6",null,"Rs: ",e.final_price))}),i.a.createElement(T,null,i.a.createElement("h4",null,"Total"),i.a.createElement("h4",null," Rs: ",t.total)),t.coupon?i.a.createElement(S.a,{variant:"success"},t.coupon_code," coupon Applied !!",t.coupon_offer):null,i.a.createElement(P,null,i.a.createElement("h2",null," Order Address")),i.a.createElement(i.a.Fragment,null,i.a.createElement("h2",null,n.PlaceName),i.a.createElement("h4",null,n.areaName),i.a.createElement("h5",null,n.full_address),i.a.createElement("h5",null,"Village: ",n.vilalgeName),i.a.createElement("h5",null,"District: ",n.districtName),i.a.createElement("h5",null,"Sate: ",n.stateName),i.a.createElement("h5",null,"Phone: ",n.phone_number),i.a.createElement("a",{href:"tel:"+n.phone_number},n.phone_number))))}}]),t}(l.Component);t.default=Object(f.connect)(function(e){return{user:e.user}})(L)}}]);
//# sourceMappingURL=35.8fb5aabd.chunk.js.map