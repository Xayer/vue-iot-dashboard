(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dashboard"],{"0ccb":function(t,e,n){var r=n("50c4"),a=n("1148"),o=n("1d80"),i=Math.ceil,c=function(t){return function(e,n,c){var s,u,l=String(o(e)),d=l.length,p=void 0===c?" ":String(c),h=r(n);return h<=d||""==p?l:(s=h-d,u=a.call(p,i(s/p.length)),u.length>s&&(u=u.slice(0,s)),t?l+u:u+l)}};t.exports={start:c(!1),end:c(!0)}},1148:function(t,e,n){"use strict";var r=n("a691"),a=n("1d80");t.exports="".repeat||function(t){var e=String(a(this)),n="",o=r(t);if(o<0||o==1/0)throw RangeError("Wrong number of repetitions");for(;o>0;(o>>>=1)&&(e+=e))1&o&&(n+=e);return n}},"1d67":function(t,e,n){},"30ae":function(t,e,n){"use strict";var r=n("d70c"),a=n.n(r);a.a},"3b23":function(t,e,n){"use strict";var r=n("9496"),a=n.n(r);a.a},"4d90":function(t,e,n){"use strict";var r=n("23e7"),a=n("0ccb").start,o=n("699c");r({target:"String",proto:!0,forced:o},{padStart:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},"4f8a":function(t,e,n){"use strict";var r=n("969c"),a=n.n(r);a.a},"564a":function(t,e,n){},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,n){var r=n("1d80"),a=n("5899"),o="["+a+"]",i=RegExp("^"+o+o+"*"),c=RegExp(o+o+"*$"),s=function(t){return function(e){var n=String(r(e));return 1&t&&(n=n.replace(i,"")),2&t&&(n=n.replace(c,"")),n}};t.exports={start:s(1),end:s(2),trim:s(3)}},"699c":function(t,e,n){var r=n("b39a");t.exports=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(r)},"722e":function(t,e,n){"use strict";var r=n("7935"),a=n.n(r);a.a},7277:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("portal",{attrs:{to:"page-title"}},[t._v("Dashboard")]),n("portal",{attrs:{to:"page-actions"}},[n("Button",{staticClass:"primary m-b",on:{click:t.editDashboard}},[t._v("Edit")])],1),t.getDashboardWidgets?n("GridLayout",{attrs:{layout:t.DashboardWidgets,cols:t.defaultSettings.columns,"row-height":t.defaultSettings.columnHeight,"is-draggable":!1,"is-resizable":!1,margin:t.defaultSettings.margin,"use-css-transforms":!0,responsive:!0},on:{"update:layout":function(e){t.DashboardWidgets=e}}},t._l(t.DashboardWidgets,(function(t){return n("GridItem",{key:t.i,attrs:{i:t.i,w:t.w,h:t.h,x:t.x,y:t.y,"min-w":t.minW||1,"min-h":t.minH||1,"max-w":t.maxW||1/0,"max-h":t.maxH||1/0}},[n("WidgetWrapper",[n(t.type,{tag:"component",attrs:{settings:t.settings,dimensions:{w:t.w,h:t.h}}})],1)],1)})),1):t._e()],1)},a=[],o=(n("a4d3"),n("4de4"),n("d81d"),n("e439"),n("dbb4"),n("b64b"),n("159b"),n("ade3")),i=n("53ca"),c=n("d4ec"),s=n("bee2"),u=n("99de"),l=n("7e84"),d=n("262e"),p=n("9ab4"),h=n("1b40"),f=n("7be8"),b=n.n(f),g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",{domProps:{textContent:t._s(t.settings.message)}})])},v=[],O=function(t){function e(){return Object(c["a"])(this,e),Object(u["a"])(this,Object(l["a"])(e).apply(this,arguments))}return Object(d["a"])(e,t),e}(h["d"]);p["a"]([Object(h["b"])()],O.prototype,"settings",void 0),O=p["a"]([h["a"]],O);var y=O,m=y,j=(n("d939"),n("2877")),w=Object(j["a"])(m,g,v,!1,null,"0993cad6",null),_=w.exports,D=n("a739"),x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.hueAvailable&&t.devices?n("section",t._l(t.devices.groups,(function(e,r){return n("article",{key:r},[n("h2",{domProps:{textContent:t._s(e.name)}}),t._l(e.lights,(function(e,r){return n("hue-light",{key:r,attrs:{light:t.devices.lights[e],"hue-id":e}})}))],2)})),0):n("p",[t._v("no active connection to Hue Bridge")])])},k=[],P=n("2f62"),S=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hue-light",on:{click:function(e){return t.toggle(!t.light.state.on)}}},[n("i",{staticClass:"bulb bi",class:t.light.state.on?"bi-lightbulb-fill":"bi-lightbulb-off-fill",style:{color:t.light.state.on&&t.light.state.hue?t.hexColor:""}}),n("h3",{staticClass:"name"},[t._v(t._s(t.light.name))]),isNaN(t.light.state.bri)?t._e():n("span",[t._v(" "+t._s(Math.round(t.light.state.bri/255*100))+" % "),n("br")])])},C=[],I=(n("99af"),n("d3b7"),n("e25e"),n("25f0"),n("4d90"),function(t){function e(){return Object(c["a"])(this,e),Object(u["a"])(this,Object(l["a"])(e).apply(this,arguments))}return Object(d["a"])(e,t),Object(s["a"])(e,[{key:"toggle",value:function(t){this.$store.dispatch("hue/toggleLight",{uniqueId:this.hueId,on:t})}},{key:"colour",value:function(t){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.$refs.color.value);if(e){var n=parseInt(e[1],16)/255,r=parseInt(e[2],16)/255,a=parseInt(e[3],16)/255,o=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92,i=r>.04045?Math.pow((r+.055)/1.055,2.4):r/12.92,c=a>.04045?Math.pow((a+.055)/1.055,2.4):a/12.92,s=.664511*o+.154324*i+.162028*c,u=.283881*o+.668433*i+.047685*c,l=88e-6*o+.07231*i+.986039*c,d=s/(s+u+l),p=u/(s+u+l),h=[d,p];this.$store.dispatch("hue/toggleLight",{uniqueId:this.hueId,on:t,colour:h})}}},{key:"hexColor",get:function(){var t=this.light.state,e=t.xy[0],n=t.xy[1],r=1-e-n,a=t.bri,o=a/n*e,i=a/n*r,c=1.656492*o-.354851*a-.255038*i,s=.707196*-o+1.655397*a+.036152*i,u=.051713*o-.121364*a+1.01153*i,l=c<=.0031308?12.92*c:1.055*Math.pow(c,1/2.4)-.055,d=s<=.0031308?12.92*s:1.055*Math.pow(s,1/2.4)-.055,p=u<=.0031308?12.92*u:1.055*Math.pow(u,1/2.4)-.055,h=Math.max(l,d,p),f=Math.floor(255*Math.max(l/h,0)),b=Math.floor(255*Math.max(d/h,0)),g=Math.floor(255*Math.max(p/h,0)),v="#".concat(f.toString(16).padStart(2,"0")).concat(b.toString(16).padStart(2,"0")).concat(g.toString(16).padStart(2,"0"));return v}}]),e}(h["d"]));p["a"]([Object(h["b"])()],I.prototype,"light",void 0),p["a"]([Object(h["b"])()],I.prototype,"hueId",void 0),I=p["a"]([Object(h["a"])({})],I);var E=I,M=E,T=(n("4f8a"),Object(j["a"])(M,S,C,!1,null,null,null)),$=T.exports;function W(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function L(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?W(Object(n),!0).forEach((function(e){Object(o["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):W(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var R=function(t){function e(){return Object(c["a"])(this,e),Object(u["a"])(this,Object(l["a"])(e).apply(this,arguments))}return Object(d["a"])(e,t),e}(h["d"]);p["a"]([Object(h["b"])()],R.prototype,"settings",void 0),R=p["a"]([Object(h["a"])({components:{HueLight:$},computed:L({},Object(P["b"])({devices:"hue/devices",token:"hue/token",hueAvailable:"hue/available"}))})],R);var N=R,A=N,H=(n("aa45"),Object(j["a"])(A,x,k,!1,null,"ea221124",null)),B=H.exports,G=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.hueAvailable&&t.devices&&t.group?n("section",{staticClass:"light-group"},[n("h2",{domProps:{textContent:t._s(t.group.name)}}),t._l(t.group.lights,(function(e,r){return n("HueLight",{key:r,attrs:{light:t.devices.lights[e],"hue-id":e}})}))],2):t._e(),t.group?t._e():n("p",[t._v("Group was not found.")]),t.hueAvailable&&t.devices?t._e():n("p",[t._v("no active connection to Hue Bridge")])])},U=[],J=(n("7db0"),n("b0c0"),n("07ac"),n("2909"));function z(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function q(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?z(Object(n),!0).forEach((function(e){Object(o["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):z(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var F=function(t){function e(){var t;return Object(c["a"])(this,e),t=Object(u["a"])(this,Object(l["a"])(e).apply(this,arguments)),t.groupName="",t}return Object(d["a"])(e,t),Object(s["a"])(e,[{key:"created",value:function(){this.settings.group&&(this.groupName=this.settings.group)}},{key:"group",get:function(){var t=this;return this.groupName&&this.devices.groups?Object(J["a"])(Object.values(this.devices.groups)).find((function(e){return e.name===t.groupName})):null}}]),e}(h["d"]);p["a"]([Object(h["b"])()],F.prototype,"settings",void 0),F=p["a"]([Object(h["a"])({components:{HueLight:$},computed:q({},Object(P["b"])({devices:"hue/devices",token:"hue/token",hueAvailable:"hue/available"}))})],F);var Y=F,V=Y,X=(n("e680"),Object(j["a"])(V,G,U,!1,null,"0c5ab6af",null)),K=X.exports,Q=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.online?n("iframe",{attrs:{src:t.departureBoardUrl,frameborder:"0"}}):n("span",[t._v("Departure widget could not display data. Are you offline?")])])},Z=[];function tt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function et(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?tt(Object(n),!0).forEach((function(e){Object(o["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):tt(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var nt=function(t){function e(){return Object(c["a"])(this,e),Object(u["a"])(this,Object(l["a"])(e).apply(this,arguments))}return Object(d["a"])(e,t),Object(s["a"])(e,[{key:"departureBoardUrl",get:function(){return"//www.rejseplanen.dk/bin/help.exe/mn?L=vs_tus.vs_new&tpl=monitor&station=".concat(this.settings.stationId,"&display=horizontal")}}]),e}(h["d"]);p["a"]([Object(h["b"])()],nt.prototype,"settings",void 0),nt=p["a"]([Object(h["a"])({computed:et({},Object(P["b"])({online:"internet/online"}))})],nt);var rt=nt,at=rt,ot=(n("ca69"),Object(j["a"])(at,Q,Z,!1,null,"c4ae2f94",null)),it=ot.exports,ct=n("9c40"),st=n("59e4"),ut=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"todoApp"},[n("h1",[t._v("TODO")]),n("p",[t._v(" You have "),n("strong",[t._v(t._s(t.todos.length))]),t._v(" tasks on your todo-list. ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.newTodo,expression:"newTodo"}],attrs:{placeholder:"What needs to be done?",autofocus:""},domProps:{value:t.newTodo},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addTodo(e)},input:function(e){e.target.composing||(t.newTodo=e.target.value)}}}),n("ol",t._l(t.todos,(function(e){return n("li",{key:e.id,staticClass:"m-b"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.done,expression:"todo.done"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.done)?t._i(e.done,null)>-1:e.done},on:{click:function(n){return t.toggleDoneState(e)},change:function(n){var r=e.done,a=n.target,o=!!a.checked;if(Array.isArray(r)){var i=null,c=t._i(r,i);a.checked?c<0&&t.$set(e,"done",r.concat([i])):c>-1&&t.$set(e,"done",r.slice(0,c).concat(r.slice(c+1)))}else t.$set(e,"done",o)}}}),n("label",{class:{done:e.done}},[t._v(t._s(e.title))]),n("Button",{staticClass:"danger m-l",on:{click:function(n){return t.removeTodo(e)}}},[t._v("Remove")])],1)})),0)])},lt=[],dt=(n("c975"),n("a434"),n("4e19"));function pt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function ht(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?pt(Object(n),!0).forEach((function(e){Object(o["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):pt(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var ft={components:{Button:st["a"]},data:function(){return{newTodo:"",todos:[]}},created:function(){this.todos=JSON.parse(localStorage.getItem(dt["a"])||"[]")},methods:{addTodo:function(){this.todos.push({id:Date.now(),title:this.newTodo,done:!1}),this.newTodo="",localStorage.setItem(dt["a"],JSON.stringify(this.todos))},toggleDoneState:function(t){this.todos.splice(this.todos.indexOf(t),1,ht({},t,{done:!t.done})),localStorage.setItem(dt["a"],JSON.stringify(this.todos))},removeTodo:function(t){this.todos.splice(this.todos.indexOf(t),1),localStorage.setItem(dt["a"],JSON.stringify(this.todos))}}},bt=ft,gt=(n("3b23"),Object(j["a"])(bt,ut,lt,!1,null,"6c44b25e",null)),vt=gt.exports,Ot=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper"},[t.weatherData?n("div",{staticClass:"weather"},[t.weatherData.main?n("div",[t.weatherData.main?n("h1",{staticClass:"temp"},[n("i",{class:"weather-icon bi bi-"+t.weatherIcon(t.weatherData.weather)}),t._v(" "+t._s(Math.round(t.weatherData.main.temp))+" "+t._s(t.temperatureUnit)+" ")]):t._e(),n("h3",[t._v(t._s(t.weatherData.name))])]):t._e()]):t._e()])},yt=[],mt=(n("96cf"),n("b383")),jt=n.n(mt);function wt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function _t(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?wt(Object(n),!0).forEach((function(e){Object(o["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):wt(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var Dt="https://api.openweathermap.org",xt="2.5",kt="".concat(Dt,"/data/").concat(xt),Pt="f7307576b27dd288a84c60daa3a4dcec",St="".concat(kt,"/weather"),Ct="".concat(kt,"/forecast"),It=function(t){var e,n,r=arguments;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return e=r.length>1&&void 0!==r[1]?r[1]:"metric",a.next=3,regeneratorRuntime.awrap(fetch("".concat(St,"/?").concat(jt.a.stringify({q:t,appid:Pt,units:e}))));case 3:return n=a.sent,a.abrupt("return",n.json());case 5:case"end":return a.stop()}}))},Et=function(t){var e,n,r,a=arguments;return regeneratorRuntime.async((function(o){while(1)switch(o.prev=o.next){case 0:return e=a.length>1&&void 0!==a[1]?a[1]:"metric",o.next=3,regeneratorRuntime.awrap(fetch("".concat(Ct,"/?").concat(jt.a.stringify({q:t,appid:Pt,units:e}))));case 3:return n=o.sent,o.next=6,regeneratorRuntime.awrap(n.json());case 6:return r=o.sent,o.abrupt("return",_t({},r,{list:r.list?r.list.reduce((function(t,e){var n=new Date(e.dt_txt),r="".concat(n.getFullYear(),"-").concat(n.getMonth(),"-").concat(n.getDate());return t[r]||(t[r]=_t({},e,{date:n,hours:[]})),e.main.temp>t[r].main.temp&&(t[r]=_t({},t[r],{},e)),t[r].hours=[].concat(Object(J["a"])(t[r].hours),[_t({},e,{date:n})]),t}),{}):[]}));case 8:case"end":return o.stop()}}))},Mt=function(t){switch(t){case"Thunderstorm":return"cloud-lightning-rain";case"Drizzle":return"cloud-drizzle";case"Rain":return"cloud-rain";case"Snow":return"cloud-snow";case"Clouds":return"cloudy";case"Cear":default:return"sun"}},Tt=function(t){function e(){var t;return Object(c["a"])(this,e),t=Object(u["a"])(this,Object(l["a"])(e).apply(this,arguments)),t.weatherData={},t}return Object(d["a"])(e,t),Object(s["a"])(e,[{key:"mounted",value:function(){return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,regeneratorRuntime.awrap(It(this.settings.city,this.settings.units));case 2:this.weatherData=t.sent;case 3:case"end":return t.stop()}}),null,this)}},{key:"weatherIcon",value:function(t){return t?Mt(t[0].main):""}},{key:"temperatureUnit",get:function(){return"metric"===this.settings.units?"°C":"°F"}}]),e}(h["d"]);p["a"]([Object(h["b"])()],Tt.prototype,"settings",void 0),Tt=p["a"]([h["a"]],Tt);var $t=Tt,Wt=$t,Lt=(n("722e"),Object(j["a"])(Wt,Ot,yt,!1,null,"2fa56693",null)),Rt=Lt.exports,Nt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.weatherData?n("div",{staticClass:"wrapper"},[n("transition-group",{attrs:{name:"fade"}},[t.selectedDay?n("div",{key:"hours",staticClass:"overlay",on:{click:function(e){t.selectedDayIndex=null}}},[n("h2",[t._v(t._s(t.selectedDay.date.toLocaleString("default",{weekday:"long",month:"long",day:"numeric"}))+" "),n("i",{staticClass:"bi bi-x-circle",on:{click:function(e){t.selectedDayIndex=null}}})]),n("div",{staticClass:"forecasts hours",class:t.layout},t._l(t.selectedDay.hours,(function(e){return n("div",{key:e.dt,staticClass:"day"},[n("div",{staticClass:"icon-temp"},[n("i",{class:"icon bi bi-"+t.weatherIcon(e.weather)}),e.main?n("span",{staticClass:"temp"},[t._v(t._s(Math.round(e.main.temp))+t._s(t.temperatureUnit))]):t._e()]),n("div",{staticClass:"day-date"},[n("h4",{staticClass:"day-name"},[t._v(t._s(e.date.toLocaleTimeString([],{hour:"2-digit"})))])])])})),0)]):t._e(),n("div",{key:"forecasts",staticClass:"wrapper"},[t.weatherData.city&&t.showTitle?n("h2",[t._v(t._s(t.weatherData.city.name))]):t._e(),t.weatherData.list?n("div",{staticClass:"forecasts",class:t.layout},t._l(t.weatherData.list,(function(e,r){return n("div",{key:e.date.toString(),staticClass:"day",on:{click:function(e){e.preventDefault(),t.selectedDayIndex=r}}},[n("div",{staticClass:"icon-temp"},[n("i",{class:"icon bi bi-"+t.weatherIcon(e.weather)}),e.main?n("span",{staticClass:"temp"},[t._v(t._s(Math.round(e.main.temp))+t._s(t.temperatureUnit))]):t._e()]),n("div",{staticClass:"day-date"},[n("h4",{staticClass:"day-name"},[t._v(t._s(e.date.toLocaleString("default",{weekday:"long"})))]),n("span",{staticClass:"date"},[t._v(t._s(e.date.toLocaleString("default",{month:"long",day:"numeric"})))])])])})),0):t._e()])])],1):t._e()},At=[],Ht=function(t){function e(){var t;return Object(c["a"])(this,e),t=Object(u["a"])(this,Object(l["a"])(e).apply(this,arguments)),t.selectedDayIndex=null,t.weatherData=null,t}return Object(d["a"])(e,t),Object(s["a"])(e,[{key:"mounted",value:function(){var t;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(Et(this.settings.city,this.settings.units));case 2:t=e.sent,this.weatherData=t;case 4:case"end":return e.stop()}}),null,this)}},{key:"weatherIcon",value:function(t){return t?Mt(t[0].main):""}},{key:"temperatureUnit",get:function(){return"metric"===this.settings.units?"°":"°F"}},{key:"layout",get:function(){var t=this.dimensions,e=t.w,n=t.h;return e!==n&&(e>3||e%n===0)?"columns":"rows"}},{key:"showTitle",get:function(){var t=this.dimensions,e=t.w,n=t.h;return n>=3||e>=3}},{key:"selectedDay",get:function(){return null!==this.selectedDayIndex&&this.weatherData?this.weatherData.list[this.selectedDayIndex]:null}}]),e}(h["d"]);p["a"]([Object(h["b"])()],Ht.prototype,"settings",void 0),p["a"]([Object(h["b"])()],Ht.prototype,"dimensions",void 0),Ht=p["a"]([Object(h["a"])({components:{Button:st["a"]}})],Ht);var Bt=Ht,Gt=Bt,Ut=(n("30ae"),Object(j["a"])(Gt,Nt,At,!1,null,"14f80e7c",null)),Jt=Ut.exports,zt=n("3889");function qt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function Ft(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?qt(Object(n),!0).forEach((function(e){Object(o["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):qt(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var Yt=function(t){function e(){var t;return Object(c["a"])(this,e),t=Object(u["a"])(this,Object(l["a"])(e).apply(this,arguments)),t.defaultSettings=ct["a"],t.DashboardWidgets=null,t}return Object(d["a"])(e,t),Object(s["a"])(e,[{key:"created",value:function(){this.DashboardWidgets=this.getDashboardWidgets()}},{key:"getDashboardWidgets",value:function(){var t=[];if(localStorage.getItem(zt["c"])){var e=JSON.parse(localStorage.getItem(zt["c"])||"");"object"===Object(i["a"])(e)&&(t=e,t.map((function(t){var e=Ft({},t);return t.guid||(e.guid=(new Date).toUTCString()),e})))}return t}},{key:"editDashboard",value:function(){this.$router.push({name:"dashboard-edit",params:{id:this.$route.params.id}})}}]),e}(h["d"]);Yt=p["a"]([Object(h["a"])({components:{GridItem:b.a.GridItem,GridLayout:b.a.GridLayout,TextWidget:_,HueBridges:B,HueLight:$,HueGroup:K,RejseplanenDeparture:it,WidgetWrapper:D["a"],Button:st["a"],TodoList:vt,Weather:Rt,Forecast:Jt}})],Yt);var Vt=Yt,Xt=Vt,Kt=Object(j["a"])(Xt,r,a,!1,null,null,null);e["default"]=Kt.exports},7935:function(t,e,n){},9496:function(t,e,n){},"969c":function(t,e,n){},aa45:function(t,e,n){"use strict";var r=n("bfac"),a=n.n(r);a.a},bfac:function(t,e,n){},c975:function(t,e,n){"use strict";var r=n("23e7"),a=n("4d64").indexOf,o=n("b301"),i=[].indexOf,c=!!i&&1/[1].indexOf(1,-0)<0,s=o("indexOf");r({target:"Array",proto:!0,forced:c||s},{indexOf:function(t){return c?i.apply(this,arguments)||0:a(this,t,arguments.length>1?arguments[1]:void 0)}})},ca69:function(t,e,n){"use strict";var r=n("564a"),a=n.n(r);a.a},cb54:function(t,e,n){},d70c:function(t,e,n){},d939:function(t,e,n){"use strict";var r=n("1d67"),a=n.n(r);a.a},e25e:function(t,e,n){var r=n("23e7"),a=n("e583");r({global:!0,forced:parseInt!=a},{parseInt:a})},e583:function(t,e,n){var r=n("da84"),a=n("58a8").trim,o=n("5899"),i=r.parseInt,c=/^[+-]?0[Xx]/,s=8!==i(o+"08")||22!==i(o+"0x16");t.exports=s?function(t,e){var n=a(String(t));return i(n,e>>>0||(c.test(n)?16:10))}:i},e680:function(t,e,n){"use strict";var r=n("cb54"),a=n.n(r);a.a}}]);
//# sourceMappingURL=dashboard.db8a0448.js.map