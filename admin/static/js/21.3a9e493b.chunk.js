(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{187:function(e,t,a){"use strict";a.r(t);var n=a(192),r=a(8),o=a.n(r),i=a(14),c=a(0),l=a.n(c),s=a(193),u=a(21),p=a(12),d=a(191),f=a(195),h=a.n(f),m=a(197),g=a.n(m),b=a(194),y=a.n(b),v=a(256),w=a(257),E=a.n(w),k=a(38).b.current.offsetWidth>800?500:240;t.default=Object(s.withStyles)(function(e){return{mainCam:{width:"100%",display:"flex",justifyContent:"center"},button:{margin:e.spacing.unit},textFieldSmall:{marginLeft:e.spacing.unit,marginRight:e.spacing.unit,width:k},textField:{marginLeft:e.spacing.unit,marginRight:e.spacing.unit,width:k},urls:{margin:e.spacing.unit,width:k,maxHeight:100,overflow:"auto"},cam:{width:"100%",maxWidth:500,maxHeight:500},message:{width:k,marginTop:e.spacing.unit,marginBottom:e.spacing.unit,marginLeft:e.spacing.unit,marginRight:e.spacing.unit},text_message:{width:k,marginTop:e.spacing.unit,marginBottom:e.spacing.unit,marginLeft:e.spacing.unit,marginRight:e.spacing.unit,overflow:"hidden",wordWrap:"break-word"}}})(Object(u.b)(function(e){return{table:e.table,user:e.user}},function(e){return{tableActions:Object(p.b)(d,e)}})(function(e){Object(c.useEffect)(function(){Object(i.a)(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:"active"===s.status&&["admin","manager","cashier"].includes(s.role)||e.history.push("/");case 1:case"end":return t.stop()}},t,this)}))()},[]);var t=e.tableActions,a=t.setSelected,r=t.setData,s=e.user.status,u=e.classes,p=Object(c.useState)(null),f=Object(n.a)(p,2),m=f[0],b=f[1],w=Object(c.useState)(""),k=Object(n.a)(w,2),O=k[0],S=k[1],j=["\u0437\u0430\u0440\u0435\u0437\u0435\u0440\u0432\u0438\u0440\u043e\u0432\u0430\u043d","\u043f\u0440\u043e\u0434\u0430\u043d","\u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0435\u043d","\u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d","\u043e\u0442\u043c\u0435\u043d\u0430"],x=function(){var e=Object(i.a)(o.a.mark(function e(t){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=5;break}return e.next=3,Object(d.getDataSimple)({name:"\u0411\u0438\u043b\u0435\u0442\u044bHash",data:{hash:t}});case 3:void 0!=(t=e.sent)&&(S(t.status),b(t));case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),q=Object(c.useState)("environment"),R=Object(n.a)(q,2),A=R[0],L=R[1];return l.a.createElement("div",null,null===m?l.a.createElement(l.a.Fragment,null,l.a.createElement("br",null),l.a.createElement("b",null,"\u0421\u043a\u0430\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435"),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement(h.a,{select:!0,SelectProps:{MenuProps:{className:u.menu}},label:"\u0442\u0438\u043f \u043a\u0430\u043c\u0435\u0440\u044b",type:"login",className:u.textField,margin:"normal",value:A,onChange:function(e){L(e.target.value)}},["environment","user"].map(function(e){return l.a.createElement(g.a,{key:e,value:e},e)})),l.a.createElement("br",null),l.a.createElement("div",{className:u.mainCam},l.a.createElement(E.a,{facingMode:A,onError:function(e){console.log(e)},onScan:x,className:u.cam})),l.a.createElement("br",null)):l.a.createElement("div",{className:u.text_message},l.a.createElement("br",null),l.a.createElement("a",{style:{fontWeight:"bold"},href:m.ticket,target:"_blank"},"\u0411\u0438\u043b\u0435\u0442"),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("b",null,"Hash"),l.a.createElement("br",null),m.hash,l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("b",null,"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c"),l.a.createElement("br",null),"\u0438\u043c\u044f: "+m.user.name+"; email: "+m.user.email+"; id:"+m.user._id+";",l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("b",null,"\u041c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u0435"),l.a.createElement("br",null),m.event,l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("b",null,"\u041f\u043b\u043e\u0449\u0430\u0434\u043a\u0430"),l.a.createElement("br",null),m.where,l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("b",null,"\u041c\u0435\u0441\u0442\u0430"),l.a.createElement("br",null),m.seats.length>0?m.seats.map(function(e){return l.a.createElement(l.a.Fragment,null,"\u041c\u0435\u0441\u0442\u043e: "+e[0].name+" \u0426\u0435\u043d\u0430: "+e[0].price+" \u0414\u0430\u0442\u0430: "+e[1],l.a.createElement("br",null))}):null,l.a.createElement("br",null),l.a.createElement(h.a,{select:!0,SelectProps:{MenuProps:{className:u.menu}},label:"\u0441\u0442\u0430\u0442\u0443\u0441",type:"login",className:u.textField,margin:"normal",value:O,onChange:function(e){S(e.target.value)}},void 0!=j?j.map(function(e){return l.a.createElement(g.a,{key:e,value:e},e)}):null),l.a.createElement("br",null),l.a.createElement("div",null,l.a.createElement(v.a,{className:"link",to:"",onClick:function(){r({id:m._id,search:"",sort:"",page:0,name:"\u0411\u0438\u043b\u0435\u0442\u044b",data:{status:O}}),a(-1)}},l.a.createElement(y.a,{variant:"contained",color:"primary",className:u.button},"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c")),l.a.createElement(y.a,{variant:"contained",color:"secondary",className:u.button,onClick:function(){b(null)}},"\u0417\u0430\u043d\u043e\u0432\u043e"))))}))},191:function(e,t,a){"use strict";a.r(t),a.d(t,"setData",function(){return p}),a.d(t,"addData",function(){return d}),a.d(t,"setSelected",function(){return f}),a.d(t,"getIds",function(){return h}),a.d(t,"getData",function(){return m}),a.d(t,"getDataSimple",function(){return g}),a.d(t,"addDataSimple",function(){return b}),a.d(t,"deleteData",function(){return y});var n=a(8),r=a.n(n),o=a(14),i=a(17),c=a(31),l=a.n(c),s=a(204),u=a.n(s);a(73);function p(e){return function(){var t=Object(o.a)(r.a.mark(function t(a){var n,o,c,s,p,d,f,h,m,g,b;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,(n=new u.a).append("id",e.id),n.append("search",e.search),n.append("sort",e.sort),n.append("skip",JSON.stringify(10*e.page)),n.append("name",e.name),n.append("new",JSON.stringify(e.data)),void 0!=e.oldFile&&n.append("oldFile",e.oldFile),void 0!=e.oldFileWhatermark&&n.append("oldFileWhatermark",e.oldFileWhatermark),void 0!=e.file){for(n.append("fileLength",e.file.length),c=0;c<e.file.length;c++)n.append("file"+c,e.file[c]),n.append("fileName"+c,e.file[c].name);o={accept:"application/json","Accept-Language":"en-US,en;q=0.8","Content-Type":"multipart/form-data; boundary=".concat(n._boundary),"X-Requested-With":"XMLHttpRequest",Authorization:"Bearer "+localStorage.userBiletikiAdmin}}else o={accept:"application/json","Accept-Language":"en-US,en;q=0.8","X-Requested-With":"XMLHttpRequest",Authorization:"Bearer "+localStorage.userBiletikiAdmin};return t.next=13,l.a.post("/data/add",n,{headers:o});case 13:for(s=t.sent,p=[],d=0;d<s.data.row.length;d++)p.push({name:s.data.row[d],options:{filter:!0,sort:!0}});if(f=[],"\u041f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u0438\u0435"!=e.name)for(h=0;h<s.data.data.length;h++){for(m=[],g=0;g<s.data.data[h].length;g++)(b=s.data.data[h][g]).length>200&&(b=b.substring(0,200)+"..."),m.push(b);f.push(m)}else f=s.data.data;e={count:s.data.count,page:e.page,data:s.data.data,data1:f,row:p,search:e.search,name:e.name,sort:e.sort},a({type:i.a,payload:e}),t.next=25;break;case 22:t.prev=22,t.t0=t.catch(0),console.log(t.t0);case 25:case"end":return t.stop()}},t,this,[[0,22]])}));return function(e){return t.apply(this,arguments)}}()}function d(e){return function(){var t=Object(o.a)(r.a.mark(function t(a){var n,o,c,s,p,d,f,h,m,g,b;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,a({type:i.d,payload:!0}),(n=new u.a).append("search",e.search),n.append("sort",e.sort),n.append("skip",JSON.stringify(10*e.page)),n.append("name",e.name),n.append("new",JSON.stringify(e.data)),void 0!=e.file){for(n.append("fileLength",e.file.length),c=0;c<e.file.length;c++)n.append("file"+c,e.file[c]),n.append("fileName"+c,e.file[c].name);o={accept:"application/json","Accept-Language":"en-US,en;q=0.8","Content-Type":"multipart/form-data; boundary=".concat(n._boundary),"X-Requested-With":"XMLHttpRequest",Authorization:"Bearer "+localStorage.userBiletikiAdmin}}else o={accept:"application/json","Accept-Language":"en-US,en;q=0.8","X-Requested-With":"XMLHttpRequest",Authorization:"Bearer "+localStorage.userBiletikiAdmin};return t.next=11,l.a.post("/data/add",n,{headers:o});case 11:for(s=t.sent,p=[],d=0;d<s.data.row.length;d++)p.push({name:s.data.row[d],options:{filter:!0,sort:!0}});if(f=[],"\u041f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u0438\u0435"!=e.name)for(h=0;h<s.data.data.length;h++){for(m=[],g=0;g<s.data.data[h].length;g++)(b=s.data.data[h][g]).length>200&&(b=b.substring(0,200)+"..."),m.push(b);f.push(m)}else f=s.data.data;e={count:s.data.count,page:e.page,data:s.data.data,data1:f,row:p,search:e.search,name:e.name,sort:e.sort},a({type:i.a,payload:e}),a({type:i.d,payload:!1}),t.next=24;break;case 21:t.prev=21,t.t0=t.catch(0),console.log(t.t0);case 24:case"end":return t.stop()}},t,this,[[0,21]])}));return function(e){return t.apply(this,arguments)}}()}function f(e){return{type:i.c,payload:e}}function h(e){return function(){var t=Object(o.a)(r.a.mark(function t(a){var n,o;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a({type:i.d,payload:!0}),(n=new u.a).append("name",e),t.next=6,l.a.post("/data/getIds",n,{headers:{accept:"application/json","Accept-Language":"en-US,en;q=0.8","X-Requested-With":"XMLHttpRequest",Authorization:"Bearer "+localStorage.userBiletikiAdmin}});case 6:o=t.sent,a({type:i.b,payload:o.data}),a({type:i.d,payload:!1}),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.log(t.t0);case 14:case"end":return t.stop()}},t,this,[[0,11]])}));return function(e){return t.apply(this,arguments)}}()}function m(e){return function(){var t=Object(o.a)(r.a.mark(function t(a){var n,o,c,s,p;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,(n=new u.a).append("search",e.search),n.append("sort",e.sort),n.append("skip",JSON.stringify(10*e.page)),n.append("name",e.name),t.next=8,l.a.post("/data/get",n,{headers:{accept:"application/json","Accept-Language":"en-US,en;q=0.8","X-Requested-With":"XMLHttpRequest",Authorization:"Bearer "+localStorage.userBiletikiAdmin}});case 8:for(o=t.sent,c=[],s=0;s<o.data.row.length;s++)c.push({name:o.data.row[s],options:{filter:!0,sort:!0}});[],p=o.data.data,e={count:o.data.count,page:e.page,data:o.data.data,data1:p,row:c,search:e.search,name:e.name,sort:e.sort},a({type:i.a,payload:e}),t.next=20;break;case 17:t.prev=17,t.t0=t.catch(0),console.log(t.t0);case 20:case"end":return t.stop()}},t,this,[[0,17]])}));return function(e){return t.apply(this,arguments)}}()}var g=function(){var e=Object(o.a)(r.a.mark(function e(t){var a,n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log("gets"),(a=new u.a).append("name",t.name),void 0!==t.data&&a.append("data",JSON.stringify(t.data)),e.next=7,l.a.post("/data/get",a,{headers:{accept:"application/json","Accept-Language":"en-US,en;q=0.8","X-Requested-With":"XMLHttpRequest",Authorization:"Bearer "+localStorage.userBiletikiAdmin}});case 7:return n=e.sent,e.abrupt("return",n.data);case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:case"end":return e.stop()}},e,this,[[0,11]])}));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(o.a)(r.a.mark(function e(t){var a,n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log("adds"),(a=new u.a).append("name",t.name),a.append("new",JSON.stringify(t.data)),e.next=7,l.a.post("/data/add",a,{headers:{accept:"application/json","Accept-Language":"en-US,en;q=0.8","X-Requested-With":"XMLHttpRequest",Authorization:"Bearer "+localStorage.userBiletikiAdmin}});case 7:return n=e.sent,e.abrupt("return",n.data);case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:case"end":return e.stop()}},e,this,[[0,11]])}));return function(t){return e.apply(this,arguments)}}();function y(e){return function(){var t=Object(o.a)(r.a.mark(function t(a){var n,o,c,s,p,d,f,h,m;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,console.log("del"),a({type:i.d,payload:!0}),(n=new u.a).append("search",e.search),n.append("sort",e.sort),n.append("skip",JSON.stringify(10*e.page)),n.append("name",e.name),n.append("deleted",e.deleted),void 0!=e.oldFile&&e.oldFile.length>0&&n.append("oldFile",e.oldFile),t.next=12,l.a.post("/data/delete",n,{headers:{accept:"application/json","Accept-Language":"en-US,en;q=0.8","X-Requested-With":"XMLHttpRequest",Authorization:"Bearer "+localStorage.userBiletikiAdmin}});case 12:for(o=t.sent,c=[],s=0;s<o.data.row.length;s++)c.push({name:o.data.row[s],options:{filter:!0,sort:!0}});if(p=[],"\u041f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u0438\u0435"!==e.name)for(d=0;d<o.data.data.length;d++){for(f=[],h=0;h<o.data.data[d].length;h++)(m=o.data.data[d][h]).length>200&&(m=m.substring(0,200)+"..."),f.push(m);p.push(f)}else p=o.data.data;e={count:o.data.count,page:e.page,data:o.data.data,data1:p,row:c,search:e.search,name:e.name,sort:e.sort},a({type:i.a,payload:e}),a({type:i.d,payload:!1}),t.next=25;break;case 22:t.prev=22,t.t0=t.catch(0),console.log(t.t0);case 25:case"end":return t.stop()}},t,this,[[0,22]])}));return function(e){return t.apply(this,arguments)}}()}},256:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(1),i=a.n(o),c=a(5),l=a.n(c),s=a(40),u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e};function p(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var d=function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)},f=function(e){function t(){var a,n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,o=Array(r),i=0;i<r;i++)o[i]=arguments[i];return a=n=p(this,e.call.apply(e,[this].concat(o))),n.handleClick=function(e){if(n.props.onClick&&n.props.onClick(e),!e.defaultPrevented&&0===e.button&&!n.props.target&&!d(e)){e.preventDefault();var t=n.context.router.history,a=n.props,r=a.replace,o=a.to;r?t.replace(o):t.push(o)}},p(n,a)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.render=function(){var e=this.props,t=(e.replace,e.to),a=e.innerRef,n=function(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}(e,["replace","to","innerRef"]);l()(this.context.router,"You should not use <Link> outside a <Router>"),l()(void 0!==t,'You must specify the "to" property');var o=this.context.router.history,i="string"===typeof t?Object(s.b)(t,null,null,o.location):t,c=o.createHref(i);return r.a.createElement("a",u({},n,{onClick:this.handleClick,href:c,ref:a}))},t}(r.a.Component);f.propTypes={onClick:i.a.func,target:i.a.string,replace:i.a.bool,to:i.a.oneOfType([i.a.string,i.a.object]).isRequired,innerRef:i.a.oneOfType([i.a.string,i.a.func])},f.defaultProps={replace:!1},f.contextTypes={router:i.a.shape({history:i.a.shape({push:i.a.func.isRequired,replace:i.a.func.isRequired,createHref:i.a.func.isRequired}).isRequired}).isRequired},t.a=f}}]);
//# sourceMappingURL=21.3a9e493b.chunk.js.map