!function(e){var t={};function n(o){if(t[o])return t[o].exports;var c=t[o]={i:o,l:!1,exports:{}};return e[o].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(o,c,function(t){return e[t]}.bind(null,c));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){const n="http://localhost:8280/api/lnd/connectpeer",o="http://localhost:8280/api/lnd/listpeers",c="http://localhost:8280/api/lnd/openchannel",l="http://localhost:8280/api/lnd/sendpayment";async function r(e){await(await fetch(l,{method:"POST",body:JSON.stringify({payreq:e}),headers:{"Content-Type":"application/json"}}));await(e=>{console.log("Success:",JSON.stringify(e))})}document.getElementById("myForm").addEventListener("submit",async function(e){e.preventDefault(),console.log("BEFORE");const t=document.getElementById("pubKey").value,l=document.getElementById("hostName").value;console.log(t,l),async function(e,t){await(await fetch(n,{method:"POST",body:JSON.stringify({pubkey:e,host:t}),headers:{"Content-Type":"application/json"}})),await(e=>{console.log("Success:",JSON.stringify(e))})}(t,l).then(e=>{console.log("Connect peer resp",e),fetch(o).then(e=>{console.log("listPeersURL resp",e),function(){document.getElementById("countdowntimer").style.display="block",document.getElementById("md-ad").style.display="block",document.getElementById("md-ad").style.zIndex="12";var e=10,t=setInterval(function(){e--,document.getElementById("countdowntimer").textContent=e,e<=0&&(clearInterval(t),document.getElementById("md-ad").style.display="none",document.getElementById("countdowntimer").style.display="none",document.getElementById("header").innerHTML="Congrats! Generate payment request with LND and provide me with it to get MONEY!")},1e3)}(),e&&(document.getElementById("myForm").style.display="none",document.getElementById("myForm").innerHTML="",document.getElementById("content").innerHTML="success, connected & loaded peers",async function(e){await(await fetch(c,{method:"POST",body:JSON.stringify({pubkey:"0319ac08cd3902982d708ee374b673234a6a1c0842ffd7e9019db358815cf3f2d6",localamt:5e4,pushamt:5e3}),headers:{"Content-Type":"application/json"}})),await(e=>{console.log("Success:",JSON.stringify(e))})}().then(e=>{console.log("Open channel resp",e),document.getElementById("content").innerHTML="success, opened channel",document.getElementById("content").innerHTML="Please, create a payment request here: ",document.getElementById("myForm2").style.display="block",document.getElementById("send-payment").addEventListener("click",async function(e){e.preventDefault(),r(document.getElementById("payreq").value).then(e=>{console.log("sendPayment resp",e)}).catch(e=>{console.error(e)})})}).catch(e=>{console.error(e);try{document.getElementById("content").innerHTML="success, opened channel",document.getElementById("content").innerHTML="Please, create a payment request here: ",document.getElementById("myForm").style.display="none",document.getElementById("myForm2").style.display="flex",document.getElementById("send-payment").addEventListener("submit",async function(e){e.preventDefault(),r(document.getElementById("payreq").value).then(e=>{console.log("sendPayment resp",e)}).catch(e=>{console.error(e)})})}catch(e){console.error(e)}}))}).catch(e=>{console.error(e)})}).catch(e=>{console.error(e)})})}]);