(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{429:function(e,t){},430:function(e,t){},431:function(e,t){},436:function(e,t){},437:function(e,t){},457:function(e,t){},459:function(e,t){},477:function(e,t,a){"use strict";a.r(t);var n=a(385),c=a(10),l=a(11),o=a(14),r=a(12),s=a(13),i=a(167),u=a(0),m=a.n(u),d=a(37),f=a.n(d),h=a(110),E=(a(214),a(4)),p=a(6),v=a(17),g=(a(62),a(213)),y=(a(165),a(39)),b=a(38),N=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(r.a)(t)).call.apply(e,[this].concat(l)))).addToWishList=function(e){a.setState({loading:!0}),p.a.post(E.a,{place:e}).then(function(e){a.setState({loading:!1}),v.toast.success("This locality added to your favorites")}).catch(function(e){401===e.response.status?(v.toast.error("Please login to add to favorites"),a.setState({loading:!1})):400===e.response.status?(v.toast.error("This locality already exists in your favorites"),a.setState({loading:!1})):v.toast.error("An error occured")})},a}return Object(s.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.props.locality;return m.a.createElement("div",{className:"product-box"},m.a.createElement("div",{className:"img-wrapper"},m.a.createElement("div",{className:"front"},m.a.createElement(g.a,{to:"".concat("","/places/").concat(t.id)},m.a.createElement("img",{src:"".concat(E.H).concat(t.image),className:"img-fluid",alt:""}))),m.a.createElement("div",{className:"cart-info cart-wrap"},m.a.createElement("button",{title:"Add to cart",onClick:function(){return e.addToWishList(t.id)}},m.a.createElement("i",null,m.a.createElement(b.a,{icon:y.c,size:"lg",color:"#ff4c3b"}))))),m.a.createElement("div",{className:"product-detail"},m.a.createElement("div",null,m.a.createElement(g.a,{to:"".concat("","/places/").concat(t.id)},m.a.createElement("h4",null,t.name)),m.a.createElement("br",null),m.a.createElement("h6",null,t.village_name," Village"))))}}]),t}(u.Component),j=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(r.a)(t)).call.apply(e,[this].concat(l)))).state={error:!1,query:"all",results:[],offset:0,limit:20},a.getInfo=function(){var e=a.state,t=e.offset,n=e.limit,c=e.query;f.a.get(E.W+"?limit=".concat(n,"&offset=").concat(t,"&q=").concat(c)).then(function(e){a.setState({results:e.data.places,loading:!1})}).catch(function(e){a.setState({error:e,loading:!1})})},a.handleInputChange=function(){a.setState({query:a.search.value},function(){a.state.query&&a.state.query.length>1?a.state.query.length%2===0&&a.getInfo():a.state.query})},a}return Object(s.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.state.results;return m.a.createElement("section",{className:"authentication-page section-b-space"},m.a.createElement("div",{className:"container"},m.a.createElement("section",{className:"search-block"},m.a.createElement("div",{className:"container"},m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col-lg-6 offset-lg-3"},m.a.createElement("form",{className:"form-header"},m.a.createElement("div",{className:"input-group"},m.a.createElement("input",{type:"text",className:"form-control","aria-label":"Amount (to the nearest dollar)",placeholder:"Search Localities......",name:"query",ref:function(t){return e.search=t},onChange:this.handleInputChange,autoComplete:"off"}),m.a.createElement("div",{className:"input-group-append"},m.a.createElement("button",{className:"btn btn-solid"},m.a.createElement("i",null,m.a.createElement(b.a,{icon:y.g}))))),m.a.createElement("div",null,t.map(function(t,a){return m.a.createElement("div",{style:{display:e.state.query&&e.state.query.length>1?"":"none"},className:"option",key:a,tabIndex:"0"},m.a.createElement(g.a,{to:"".concat("","/places/").concat(t.id)},m.a.createElement("span",null,t.name)))})))))))))}}]),t}(u.Component),O=(a(428),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(o.a)(this,Object(r.a)(t).call(this,e))).fetchlaces=function(){a.setState({loading:!0},function(){var e=a.state,t=e.offset,c=e.limit,l=e.query;f.a.get(E.W+"?limit=".concat(c,"&offset=").concat(t,"&q=").concat(l)).then(function(e){var l=e.data.places,o=e.data.has_more;a.setState({hasMore:o,loading:!1,localities:Object(n.a)(a.state.localities).concat(Object(n.a)(l)),newLocalities:e.data.places,offset:t+c})}).catch(function(e){a.setState({error:e.message,loading:!1})})})},a.setQuery=function(e){a.setState({query:e.target.value}),a.callbacktest()},a.callbacktest=function(){console.log(a.state.query)},a.addToWishList=function(e){a.setState({loading:!0}),p.a.post(E.a,{place:e}).then(function(e){a.setState({loading:!1}),v.toast.success("This locality added to your favorites")}).catch(function(e){a.setState({error:e,loading:!1}),v.toast.error("This locality already exists in your favorites")})},a.state={loading:!1,error:null,localities:[],hasMore:!0,offset:0,limit:2,query:"all",newLocalities:[]},window.onscroll=function(){var e=Object(i.a)(Object(i.a)(a)),t=e.fetchlaces,n=e.state,c=n.error,l=n.loading,o=n.hasMore;c||l||!o||document.documentElement.scrollHeight-document.documentElement.scrollTop===document.documentElement.clientHeight&&t()},a}return Object(s.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){document.getElementById("color").setAttribute("href","#"),this.fetchlaces()}},{key:"render",value:function(){var e=this.state,t=e.localities;e.query,e.hasMore;return m.a.createElement("div",null,m.a.createElement(h.Helmet,null,m.a.createElement("title",null,"Local Dukans")),m.a.createElement(v.ToastContainer,null),this.state.loading&&m.a.createElement("div",{className:"loading-cls"}),m.a.createElement(j,null),t&&m.a.createElement("section",{className:"ratio_asos metro-section portfolio-section light-layout section-b-space"},m.a.createElement("div",{className:"container"},m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col"},m.a.createElement("div",{className:"title4"},m.a.createElement("br",null),m.a.createElement("h2",{className:"title-inner4"}," Localities"),m.a.createElement("div",{className:"line"},m.a.createElement("span",null)))))),m.a.createElement("div",{className:"container"},m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col"},m.a.createElement("div",{className:"no-slider row"},t.map(function(e,t){return m.a.createElement(N,{locality:e,key:t})})))))))}}]),t}(m.a.PureComponent));t.default=O}}]);
//# sourceMappingURL=8.00e54bc8.chunk.js.map