import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as T,i as E}from"./assets/vendor-77e16229.js";const s=document.querySelector("#datetime-picker"),n=document.querySelector("button"),m=document.querySelector("[data-days]"),f=document.querySelector("[data-hours]"),h=document.querySelector("[data-minutes]"),b=document.querySelector("[data-seconds]");let l=new Date,r=null,e=null,y=null,i=!0;n.addEventListener("click",q);const g={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){r=t[0],i=r>l,i&&(e=r-l),n.removeAttribute("disabled")}};T(s,g);function q(){i?(n.setAttribute("disabled","true"),s.setAttribute("disabled","true"),p(u(e)),A()):(n.setAttribute("disabled","true"),E.show({timeout:3e3,position:"topRight",title:"Please choose a date in the future"}))}function o(t){return String(t).padStart(2,"0")}function u(t){const S=o(Math.floor(t/864e5)),C=o(Math.floor(t%864e5/36e5)),v=o(Math.floor(t%864e5%36e5/6e4)),x=o(Math.floor(t%864e5%36e5%6e4/1e3));return{days:S,hours:C,minutes:v,seconds:x}}function A(){y=setInterval(()=>{D(),e-=1e3,u(e),p(u(e))},1e3)}function D(){m.textContent==="00"&f.textContent==="00"&h.textContent==="00"&b.textContent==="01"&&(clearInterval(y),n.removeAttribute("disabled"),s.removeAttribute("disabled"))}function p({days:t,hours:a,minutes:c,seconds:d}){m.textContent=t.toString(),f.textContent=a.toString(),h.textContent=c.toString(),b.textContent=d.toString()}
//# sourceMappingURL=commonHelpers.js.map
