(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{113:function(e,a,t){"use strict";t.r(a);var n=t(2),r=t.n(n),c=t(3),l=t(8),s=t(0),m=t.n(s),u=t(9),o=t(4),i=t(5),p=t(105),f=t(28),d=m.a.memo(function(e){var a=e.app.lang;e.user.authenticated||e.history.push("/");var t=Object(s.useState)(""),n=Object(l.a)(t,2),u=n[0],i=n[1],d=Object(s.useState)(""),E=Object(l.a)(d,2),h=E[0],b=E[1],v=Object(s.useState)(""),g=Object(l.a)(v,2),N=g[0],x=g[1],j=Object(s.useState)(""),O=Object(l.a)(j,2),w=O[0],k=O[1],y=Object(s.useState)(""),C=Object(l.a)(y,2),S=C[0],F=C[1];document.title="\u041f\u0440\u043e\u0444\u0438\u043b\u044c";var J=function(){var e=Object(c.a)(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(w.length>0&&h.length>0&&N.length>0&&S.length>0)){e.next=18;break}return e.next=3,Object(o.getSecure)({name:"\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c\u041f\u0440\u043e\u0444\u0438\u043b\u044c",data:{email:w,name:h,surname:N,phonenumber:S,password:u}});case 3:return a=e.sent,e.next=6,k(a.email);case 6:return e.next=8,x(a.surname);case 8:return e.next=10,b(a.name);case 10:return e.next=12,F(a.phonenumber);case 12:return e.next=14,i("");case 14:return e.next=16,window.location.reload();case 16:e.next=19;break;case 18:alert("\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0432\u0441\u0435 \u043f\u043e\u043b\u044f!!!");case 19:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}();return Object(s.useEffect)(function(){Object(c.a)(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(o.getSecure)({name:"\u041f\u0440\u043e\u0444\u0438\u043b\u044c"});case 2:a=e.sent,k(a.email),x(a.surname),b(a.name),F(a.phonenumber);case 7:case"end":return e.stop()}},e,this)}))()},[]),m.a.createElement(m.a.Fragment,null,m.a.createElement("div",{className:"main-buy page-profile"},m.a.createElement("div",{className:"container"},m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col-12 page-menu-wrap"},m.a.createElement("ul",{className:"nav page-menu"},m.a.createElement("li",{className:"active"},m.a.createElement("a",null,"\u041f\u0440\u043e\u0444\u0438\u043b\u044c")),m.a.createElement("li",null,m.a.createElement(p.a,{to:"/historyevent"},m.a.createElement("a",null,"ru"===a?"\u0417\u0430\u043a\u0430\u0437\u044b \u043c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u044f":"\u0411\u0443\u0439\u0440\u0443\u043a\u0442\u0430\u0440 \u0447\u0435\u043d\u04e9\u04e9"))),m.a.createElement("li",null,m.a.createElement(p.a,{to:"/historycinema"},m.a.createElement("a",null,"ru"===a?"\u0417\u0430\u043a\u0430\u0437\u044b \u043a\u0438\u043d\u043e":"\u0411\u0443\u0439\u0440\u0443\u043a\u0442\u0430\u0440 \u043a\u0438\u043d\u043e")))))),m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col-12 col-md-5"},m.a.createElement("fieldset",{className:"fields-change-pass"},m.a.createElement("legend",null,"ru"===a?"\u0418\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u0435 \u043f\u0430\u0440\u043e\u043b\u044f":"\u041f\u0430\u0440\u043e\u043b\u044c \u04e9\u0437\u0433\u04e9\u0440\u0442\u04af\u04af"),m.a.createElement("div",{className:"form-group"},m.a.createElement("input",{value:u,onChange:function(e){i(e.target.value)},className:"form-control",type:"text",placeholder:"ru"===a?"\u041d\u043e\u0432\u044b\u0439 \u043f\u0430\u0440\u043e\u043b\u044c":"\u041f\u0430\u0440\u043e\u043b\u044c \u0436\u0430\u04a3\u044b"}))),m.a.createElement("fieldset",{className:"fields-contacts"},m.a.createElement("legend",null,"ru"===a?"\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435":"\u0411\u0430\u0439\u043b\u0430\u043d\u044b\u0448 \u043c\u0430\u0430\u043b\u044b\u043c\u0430\u0442\u0442\u0430\u0440\u044b"),m.a.createElement("div",{className:"form-group"},m.a.createElement("input",{value:h,onChange:function(e){b(e.target.value)},className:"form-control",type:"text",placeholder:"ru"===a?"\u0418\u043c\u044f":"\u042b\u0441\u044b\u043c"})),m.a.createElement("div",{className:"form-group"},m.a.createElement("input",{value:N,onChange:function(e){x(e.target.value)},className:"form-control",type:"text",placeholder:"\u0424\u0430\u043c\u0438\u043b\u0438\u044f"})),m.a.createElement("div",{className:"form-group"},m.a.createElement("input",{value:w,onChange:function(e){k(e.target.value)},className:"form-control",type:"text",placeholder:"Email"})),m.a.createElement("label",{htmlFor:"flat-checkbox-1",className:"icheck"},"\u0424\u043e\u0440\u043c\u0430\u0442: +996559988477"),m.a.createElement("div",{className:"form-group"},m.a.createElement("input",{value:S,onChange:function(e){F(e.target.value)},className:"form-control",type:"text",placeholder:"ru"===a?"\u041d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430":"\u0422\u0435\u043b\u0435\u0444\u043e\u043d \u043d\u043e\u043c\u0443\u0440\u0443"}))),m.a.createElement("fieldset",{className:"fields-agreement"},m.a.createElement("legend",null,"ru"===a?"\u0423\u0441\u043b\u043e\u0432\u0438\u044f \u0434\u043e\u0433\u043e\u0432\u043e\u0440\u0430":"\u041a\u0435\u043b\u0438\u0448\u0438\u043c\u0434\u0438\u043d \u0448\u0430\u0440\u0442\u0442\u0430\u0440\u044b"),m.a.createElement("div",{className:"checkbox icheck form-group"},m.a.createElement("label",{htmlFor:"flat-checkbox-1",className:"icheck"},"ru"===a?m.a.createElement("p",null,"\u0412 \u0441\u043b\u0443\u0447\u0430\u0435 \u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f \u043e\u043f\u043b\u0430\u0442\u044b \u0412\u044b \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438 \u0441\u043e\u0433\u043b\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044c \u0441 ",m.a.createElement(p.a,{to:"/offer",onClick:function(){Object(f.c)()}},"\u0443\u0441\u043b\u043e\u0432\u0438\u044f\u043c\u0438 \u0434\u043e\u0433\u043e\u0432\u043e\u0440\u0430 \u043e\u0444\u0435\u0440\u0442\u044b.")):m.a.createElement("p",null,"\u0421\u0438\u0437\u0434\u0438\u043d \u0442\u04e9\u043b\u04e9\u043c \u043c\u0430\u0430\u043b\u044b\u043c\u0430\u0442\u0442\u044b \u0442\u043e\u043b\u0442\u0443\u0440\u0443\u0443 \u0443\u0447\u0443\u0440\u0443\u043d\u0434\u0430, \u043e\u0448\u043e\u043d\u0434\u043e\u0439 \u044d\u043b\u0435 \u0442\u0430\u0441\u0442\u044b\u043a\u0442\u043e\u043e, \u0441\u0438\u0437 \u0434\u0430\u0440\u043e\u043e \u044d\u043b\u0435 ",m.a.createElement("a",{href:"http://kassir.kg/document/\u043f\u0443\u0431\u043b_\u043e\u0444\u0435\u0440\u0442\u0430.docx",download:!0}," \u0441\u0443\u043d\u0443\u0448 \u043a\u0435\u043b\u0438\u0448\u0438\u043c\u0434\u0438\u043d \u0448\u0430\u0440\u0442\u0442\u0430\u0440\u044b\u043d\u0430 \u043c\u0430\u043a\u0443\u043b."))))),m.a.createElement("div",{className:"form-group field-button"},m.a.createElement("input",{className:"btn btn-primary",type:"submit",defaultValue:"ru"===a?"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f":"\u0421\u0430\u043a\u0442\u043e\u043e \u04e9\u0437\u0433\u04e9\u0440\u0442\u04af\u04af\u043b\u04e9\u0440\u0434\u04af",onClick:function(){J()}})))))))});a.default=Object(u.b)(function(e){return{app:e.app,user:e.user}},function(e){return{appActions:Object(i.b)(o,e)}})(d)}}]);
//# sourceMappingURL=11.a117dfa9.chunk.js.map