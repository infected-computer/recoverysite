import{c as P,j as e,r as d,a as p,R as W,L as I,u as O}from"./index-BQwnEAws.js";import{u as V,P as Y,M as K,a as X,b as E,c as $,B as G,d as J,e as Q,f as Z,H as ee,F as te}from"./Footer-B7P9CqYy.js";import{W as se}from"./WhatsAppFloat-CsdqKy_-.js";import{u as ae}from"./useSEO-C05C2oe1.js";import{S as T,a as re}from"./structuredData-CNMZeS6Q.js";import{S as ie,s as ne}from"./emailService-DoXvruvR.js";import{U as le}from"./user-BEUKyRRJ.js";import{C as oe}from"./circle-check-big-BrLAtKC3.js";import{C as de,a as ce,b as me,c as xe,B as M}from"./button-CW1ohO6Y.js";import{C as ue}from"./check-Ba4YH5oG.js";import{A as he,f as ge,a as pe,b as be,c as fe}from"./accordion-Cy3N4ezR.js";import"./chevron-down-3c_53pNt.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=P("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=P("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]),je=({customData:t})=>{const i=T.getBusinessData(),s=t?{...i,...t}:i,n=T.createLocalBusiness(s);return T.validateSchema(n)?e.jsx("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(n,null,2)}}):(console.error("Invalid LocalBusiness schema:",n),null)},ye=({message:t,onClose:i})=>(W.useEffect(()=>{const s=setTimeout(i,4e3);return()=>clearTimeout(s)},[i]),e.jsxs("div",{className:"fixed top-4 right-4 z-50 flex items-center gap-3 rounded-md bg-green-500 px-5 py-2.5 text-white shadow-md animate-[slide-in_0.3s_ease-out]",children:[e.jsx(oe,{className:"h-5 w-5"}),e.jsx("span",{children:t}),e.jsx("button",{onClick:i,className:"ml-2 hover:opacity-70",children:"×"}),e.jsx("style",{jsx:!0,children:`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `})]})),we=({className:t,onSubmit:i,compact:s=!1,extraCompact:n=!1})=>{const[a,r]=d.useState({name:"",phone:"",email:"",message:""}),[o,c]=d.useState(!1),[h,z]=d.useState(!1),[y,f]=d.useState(""),[x,w]=d.useState({}),[A,C]=d.useState({}),N=d.useId(),k=d.useId(),v=d.useId(),u=d.useId();V();const{trackFormSubmit:b,trackFormError:R}=X("contact_form"),j=d.useCallback((m,l)=>{switch(m){case"name":return l.trim()?l.trim().length<2?"שם חייב להכיל לפחות 2 תווים":void 0:"שם מלא הוא שדה חובה";case"phone":return l.trim()?/^[0-9\-\s\+\(\)]{9,}$/.test(l)?void 0:"מספר טלפון לא תקין":"מספר טלפון הוא שדה חובה";case"email":return l.trim()&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l)?"כתובת אימייל לא תקינה":void 0;case"message":return l.trim()?l.trim().length<10?"הודעה חייבת להכיל לפחות 10 תווים":void 0:"הודעה היא שדה חובה";default:return}},[]),L=d.useCallback(m=>{const{name:l,value:g}=m.target;r(S=>({...S,[l]:g})),x[l]&&w(S=>({...S,[l]:void 0})),y&&f("")},[x,y,j]),D=d.useCallback(m=>{const{name:l,value:g}=m.target;C(F=>({...F,[l]:!0}));const S=j(l,g);w(F=>({...F,[l]:S}))},[j]),_=d.useCallback(()=>{const m={};m.name=j("name",a.name),m.phone=j("phone",a.phone),m.email=j("email",a.email),m.message=j("message",a.message),w(m);const l=Object.keys(m).find(g=>m[g]);if(l){const g=document.getElementById(l==="name"?N:l==="phone"?k:l==="email"?v:u);g==null||g.focus()}return!Object.values(m).some(g=>g)},[a,j,N,k,v,u]),q=d.useMemo(()=>a.name.trim().length>=2&&a.phone.trim().length>=9&&a.message.trim().length>=10&&(!a.email.trim()||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email)),[a.name,a.phone,a.message,a.email]),U=async m=>{if(m.preventDefault(),!_()){R("validation_failed"),E.announce("יש שגיאות בטופס, אנא תקן אותן","assertive");return}c(!0),f("");try{if(i)i(a);else{const l=await ne(a);if(l.success)console.log("Email sent successfully:",l.id);else throw console.warn("Email sending failed:",l.error),new Error(l.error||"שגיאה בשליחת המייל")}b(!0),z(!0),r({name:"",phone:"",email:"",message:""}),w({}),C({}),E.announce("הבקשה נשלחה בהצלחה","polite")}catch(l){console.error("Form submission error:",l),b(!1),R("submission_failed"),f("שגיאה בשליחת הטופס. אנא נסה שוב או צור קשר בווצאפ."),E.announce("שגיאה בשליחת הטופס","assertive")}finally{c(!1)}};return e.jsxs(e.Fragment,{children:[h&&e.jsx(ye,{message:"הבקשה נשלחה בהצלחה! ניצור איתך קשר בהקדם",onClose:()=>z(!1)}),e.jsxs("form",{dir:"rtl",onSubmit:U,noValidate:!0,className:p("form-responsive touch-friendly-form rounded-lg border border-[#D7DEE6] bg-[#FDFDFE] p-6 shadow-sm",n?"max-w-xs":s?"max-w-sm":"max-w-md w-full",t),children:[e.jsxs("div",{className:"mb-6 text-center",children:[e.jsx("h3",{className:"mb-2 text-xl font-bold text-gray-900",children:"צור קשר עכשיו"}),!s&&!n&&e.jsx("p",{className:"text-sm text-gray-600",children:"מלאו את הפרטים ונחזור אליכם בהקדם"})]}),e.jsxs("div",{className:p("form-row space-y-4",!s&&!n&&"md:grid md:grid-cols-2 md:gap-4 md:space-y-0"),children:[e.jsx(B,{id:"name",fieldId:N,label:"שם מלא",required:!0,icon:le,value:a.name,onChange:L,onBlur:D,error:x.name}),e.jsx(B,{id:"phone",fieldId:k,label:"טלפון",required:!0,type:"tel",icon:Y,value:a.phone,onChange:L,onBlur:D,error:x.phone}),e.jsx(B,{id:"email",fieldId:v,label:"אימייל",type:"email",icon:K,className:!s&&!n?"md:col-span-2":"",value:a.email,onChange:L,onBlur:D,error:x.email}),e.jsx(Ne,{id:"message",fieldId:u,label:"הודעה",required:!0,rows:n?2:s?3:4,icon:ve,className:!s&&!n?"md:col-span-2":"",value:a.message,onChange:L,onBlur:D,error:x.message})]}),y&&e.jsx("div",{className:"mt-4 text-center text-sm font-medium text-red-600",role:"alert",children:y}),e.jsx("button",{type:"submit",disabled:o||!q,"aria-label":"שלח בקשה ליצירת קשר","aria-describedby":o?"submit-status":void 0,className:p("mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-md font-semibold text-white transition-all duration-200",q&&!o?"bg-blue-600 hover:bg-blue-700 active:bg-blue-800 hover:-translate-y-0.5 hover:shadow-lg":"bg-gray-400 cursor-not-allowed","focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50"),children:o?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white","aria-hidden":"true"}),e.jsx("span",{id:"submit-status",children:"שולח..."})]}):e.jsxs(e.Fragment,{children:[e.jsx(ie,{className:"h-5 w-5","aria-hidden":"true"}),"שלח בקשה"]})}),e.jsxs("div",{className:"sr-only mt-2",children:[e.jsx("p",{children:"שדות המסומנים בכוכבית (*) הם שדות חובה"}),e.jsx("p",{children:"שדה האימייל הוא אופציונלי"}),e.jsx("p",{children:"לאחר שליחת הטופס תקבל הודעת אישור"})]})]})]})},B=({label:t,icon:i,required:s,className:n,id:a,error:r,fieldId:o,onBlur:c,...h})=>e.jsxs("div",{className:p("relative",n),children:[e.jsxs("label",{htmlFor:o,className:"absolute -top-3 right-3 z-10 bg-[#FDFDFE] px-3 text-sm font-medium text-gray-700",children:[t," ",s&&e.jsx("span",{className:"text-red-500","aria-label":"שדה חובה",children:"*"}),!s&&e.jsx("span",{className:"text-gray-500 text-xs",children:"(אופציונלי)"})]}),e.jsx(i,{className:"absolute right-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-400","aria-hidden":"true"}),e.jsx("input",{id:o,name:a,...h,required:s,"aria-required":s,"aria-invalid":!!r,"aria-describedby":r?`${o}-error`:void 0,onBlur:c,className:p("h-12 w-full rounded-md border bg-white pr-12 pl-4 text-right text-gray-900 transition-all duration-200 hover:border-[#BFC9D6] focus:outline-none focus:ring-2",r?"border-red-500 focus:border-red-500 focus:ring-red-200":"border-[#D7DEE6] focus:border-blue-500 focus:ring-blue-200")}),r&&e.jsxs("div",{id:`${o}-error`,className:"flex items-center gap-2 text-red-600 text-sm mt-1",role:"alert","aria-live":"polite",children:[e.jsx(H,{className:"h-4 w-4","aria-hidden":"true"}),r]})]}),Ne=({label:t,icon:i,required:s,className:n,id:a,error:r,fieldId:o,onBlur:c,...h})=>e.jsxs("div",{className:p("relative",n),children:[e.jsxs("label",{htmlFor:o,className:"absolute -top-3 right-3 z-10 bg-[#FDFDFE] px-3 text-sm font-medium text-gray-700",children:[t," ",s&&e.jsx("span",{className:"text-red-500","aria-label":"שדה חובה",children:"*"})]}),e.jsx(i,{className:"absolute right-3 top-4 z-10 h-5 w-5 text-gray-400","aria-hidden":"true"}),e.jsx("textarea",{id:o,name:a,...h,required:s,"aria-required":s,"aria-invalid":!!r,"aria-describedby":r?`${o}-error`:void 0,onBlur:c,className:p("w-full resize-none rounded-md border bg-white pr-12 pl-4 pt-4 pb-4 text-right text-gray-900 transition-all duration-200 hover:border-[#BFC9D6] focus:outline-none focus:ring-2",r?"border-red-500 focus:border-red-500 focus:ring-red-200":"border-[#D7DEE6] focus:border-blue-500 focus:ring-blue-200")}),r&&e.jsxs("div",{id:`${o}-error`,className:"flex items-center gap-2 text-red-600 text-sm mt-1",role:"alert","aria-live":"polite",children:[e.jsx(H,{className:"h-4 w-4","aria-hidden":"true"}),r]})]}),ke="/assets/images/background1-BRFqx2gC.webp",Se=({slide:t,className:i=""})=>{const[s,n]=d.useState(!1);return d.useEffect(()=>{const a=new Image;a.src=t.background,a.onload=()=>n(!0)},[t.background]),e.jsxs("section",{className:`hero-slider ${i}`,role:"region","aria-labelledby":"hero-title",style:{"--bg-image":`url(${t.background})`},children:[e.jsx("div",{className:"slide-container",children:e.jsxs("div",{className:"slide-content",children:[e.jsxs("div",{className:"slide-text-right",children:[e.jsxs("header",{className:"slide-header",children:[e.jsxs("h1",{id:"hero-title",className:"slide-title",children:[t.title,e.jsx("span",{className:"sr-only",children:t.keywords.join(", ")})]}),e.jsx("h2",{className:"slide-subtitle",children:t.subtitle}),e.jsxs("div",{className:"slide-description",children:[e.jsx("p",{children:t.description}),e.jsx("div",{className:"long-tail-keywords","aria-hidden":"true",children:t.longTailKeywords.map((a,r)=>e.jsx("span",{className:"sr-only",children:a},r))})]})]}),e.jsx("div",{className:"slide-cta",children:e.jsxs("a",{href:t.ctaLink,className:"cta-button","aria-label":t.ctaAriaLabel,role:"button",children:[e.jsx("span",{className:"cta-text",children:t.ctaText}),e.jsx("span",{className:"cta-icon","aria-hidden":"true",children:"←"})]})})]}),e.jsx("div",{className:"slide-form-left",children:e.jsx(we,{compact:!0,className:"hero-form shadow-2xl"})})]})}),e.jsx("style",{children:`
        .hero-slider {
          position: relative;
          width: 100%;
          height: 80vh;
          min-height: 600px;
          overflow: hidden;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          outline: none;
        }

        .hero-slider::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: var(--bg-image);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: ${s?1:0}; /* Simplified opacity logic */
          z-index: 1;
          transition: opacity 1s ease-in-out;
        }

        .hero-slider::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(180deg, rgba(230, 245, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%);
            z-index: 1;
        }

        .slide-container {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          z-index: 2;
        }

        .slide-content {
          position: relative;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 1.3fr 0.7fr; /* Give more space to text */
          gap: 60px;
          align-items: start; /* Align content to the top */
          padding-top: 8vh; /* Push content down from the top */
          justify-content: center;
        }

        .slide-form-left {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start; /* Align form to the left */
          order: 2;
        }

        .hero-form {
          width: 100%;
          max-width: 360px; /* Make form narrower */
        }

        .slide-text-right {
          position: relative;
          text-align: right;
          color: #000000;
          padding: 40px;
          order: 1;
          direction: rtl;
        }

        .slide-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 700;
          margin: 0 0 1rem 0;
          line-height: 1.2;
          color: #000000;
        }

        .slide-subtitle {
          font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          font-weight: 500;
          margin: 0 0 1.5rem 0;
          color: #333333;
          line-height: 1.4;
        }

        .slide-description {
          font-size: clamp(1rem, 1.5vw, 1.3rem);
          line-height: 1.7;
          margin: 0 0 2.5rem 0;
          color: #555555;
        }

        .slide-cta {
          margin-top: 2rem;
          text-align: right;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-primary); /* Use CSS variable for consistency */
          color: white;
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
          border: none;
        }

        .cta-button:hover,
        .cta-button:focus {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(37, 99, 235, 0.4);
          outline: none;
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .long-tail-keywords {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-slider {
            height: auto;
            min-height: 500px;
            padding: 20px 0;
          }

          .slide-content {
            grid-template-columns: 1fr;
            gap: 30px;
            text-align: center;
          }

          .slide-form-left {
            order: 2;
            max-width: 400px;
            margin: 0 auto;
            justify-content: center;
          }

          .slide-text-right {
            order: 1;
            text-align: center;
            padding: 20px;
            direction: ltr;
          }

          .slide-cta {
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .slide-container {
            padding: 0 10px;
          }

          .slide-text-right {
            padding: 15px;
          }

          .slide-title {
            font-size: clamp(1.8rem, 6vw, 2.5rem);
          }
        }
      `})]})},Ce={id:"hard-drive-recovery",title:"שחזור נתונים אונליין תוך שעה בלי לצאת מהבית",subtitle:"שחזור נתונים במהירות באמצעות תמיכה מרחוק",description:"צוות מומחים ישחזר לכם את הקבצים החשובים לכם במהירות במחיר  הוגן ובמהירות ונוחות שלא תמצאו בשום מקום אחר",keywords:["שחזור דיסק קשיח","שחזור נתונים","תיקון דיסק קשיח"],longTailKeywords:["שחזור דיסק קשיח פגום בישראל","תיקון דיסק קשיח שלא עובד","שחזור נתונים מדיסק קשיח מקולקל","מומחה שחזור דיסקים קשיחים","שירות שחזור דיסק קשיח מהיר","שחזור קבצים מדיסק HDD פגום"],image:"/src/assets/hero-data-recovery.jpg",imageAlt:"דיסק קשיח פתוח עם רכיבים פנימיים חשופים במעבדה טכנית מקצועית",ctaText:"צור קשר עם טכנאי לתיאום בדיקה",ctaLink:"/contact",ctaAriaLabel:"פנו אלינו לקבלת הערכת מחיר חינמית לשחזור דיסק קשיח",background:ke},Le=()=>e.jsx(Se,{slide:Ce,className:"homepage-hero"}),De=({children:t,className:i,hoverable:s=!0,onClick:n})=>{const a=`
    border border-border-light-redesign
    rounded-3xl
    transition-all duration-300
    overflow-hidden
    group
    backdrop-blur-sm
  `,r=s?`
    hover:scale-[1.02] hover:-translate-y-2
    cursor-pointer
    hover-lift-gentle
    hover-glow-primary
  `:"";return e.jsxs("div",{className:p(a,r,i),onClick:n,style:{background:`
          linear-gradient(135deg, 
            rgba(255, 255, 255, 0.95) 0%, 
            rgba(255, 255, 255, 0.92) 100%
          )
        `,boxShadow:"var(--shadow-md)"},children:[e.jsx("div",{className:"relative z-10 p-8 h-full",children:t}),s&&e.jsx("div",{className:"absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10",style:{background:`
              linear-gradient(135deg, 
                rgba(248, 250, 252, 0.95) 0%, 
                rgba(241, 245, 249, 0.92) 100%
              )
            `}}),s&&e.jsx("div",{className:"absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-700 ease-out -z-20 blur-xl bg-primary-redesign"}),s&&e.jsx("div",{className:"absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-800 ease-out overflow-hidden -z-10",children:e.jsx("div",{className:"absolute inset-0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-2000 ease-out",style:{background:"linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 30%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0.03) 70%, transparent 100%)",width:"200%"}})}),s&&e.jsx("div",{className:"absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"})]})},ze=({title:t="השירותים שלנו",services:i,className:s})=>{const n=d.useRef(null),a=d.useRef(null);return $(n,"animate-fade-in-up"),$(a,"animate-fade-in-down"),e.jsxs("section",{ref:n,className:p("relative overflow-hidden py-20 opacity-0",s),style:{background:"var(--color-background-section)"},children:[e.jsxs("div",{className:"absolute inset-0",children:[e.jsx("div",{className:"absolute inset-0 opacity-30",style:{background:`
              radial-gradient(circle at 30% 20%, var(--color-primary) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, var(--color-secondary) 0%, transparent 50%)
            `}}),e.jsx("div",{className:"absolute top-20 right-10 w-40 h-40 bg-primary-redesign/10 rounded-full blur-3xl animate-float-slow"}),e.jsx("div",{className:"absolute bottom-20 left-10 w-32 h-32 bg-secondary-redesign/15 rounded-full blur-2xl animate-float-medium",style:{animationDelay:"2s"}}),e.jsx("div",{className:"absolute top-1/2 left-1/2 w-24 h-24 bg-primary-redesign/8 rounded-full blur-xl animate-float-fast",style:{animationDelay:"4s"}})]}),e.jsxs("div",{className:"container mx-auto px-4 relative z-10",children:[e.jsxs("div",{ref:a,className:"text-center mb-16 opacity-0",children:[e.jsx("h2",{className:"text-4xl lg:text-5xl font-bold text-text-dark-redesign mb-6",children:t}),e.jsx("div",{className:"w-24 h-1 mx-auto rounded-full",style:{background:"var(--gradient-primary)"}})]}),e.jsx("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto",children:i.map((r,o)=>e.jsx("div",{className:"h-full",children:e.jsx(Fe,{icon:r.icon,title:r.title,description:r.description,bullets:r.bullets,link:r.link,onLinkClick:r.onLinkClick})},r.id))})]})]})},Fe=({icon:t,title:i,description:s,bullets:n,link:a="קרא עוד >",onLinkClick:r})=>{const o=c=>{c.preventDefault(),c.stopPropagation(),r&&r()};return e.jsxs(De,{className:"h-full flex flex-col",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("div",{className:"text-4xl text-primary-redesign group-hover:text-secondary-redesign transition-colors duration-300 mb-4",children:t}),e.jsx("h3",{className:"text-xl font-bold text-text-dark-redesign group-hover:text-text-primary-redesign transition-colors duration-300",children:i})]}),e.jsx("div",{className:"flex-grow",children:e.jsx("p",{className:"text-base leading-relaxed text-text-muted-redesign group-hover:text-text-secondary-redesign transition-colors duration-300",children:s})}),e.jsx("div",{className:"my-4 space-y-2",children:n.map((c,h)=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("svg",{className:"w-5 h-5 text-green-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),e.jsx("span",{className:"text-sm text-gray-600",children:c})]},h))}),e.jsx("div",{className:"mt-auto pt-4",children:e.jsx("button",{onClick:o,className:p("w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg","hover:bg-blue-700 transition-all duration-300","focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"),children:"לפרטים וקבלת אבחון חינם"})})]})},Ee=[{name:"אבחון ראשוני",price:"ללא עלות",features:["הערכת סיכויי שחזור","זיהוי סוג התקלה","הצעת מחיר שקופה"]},{name:"שחזור קבצים",price:"החל מ-₪350",features:["מדיסקים קשיחים ו-SSD","מכרטיסי זיכרון ודיסק-און-קי","תשלום מבוסס הצלחה"]},{name:"שירותים מתקדמים",price:"צרו קשר",features:["שחזור שרתים ומערכי RAID","מקרים מורכבים במיוחד","פתרונות מותאמים לעסקים"]}],Te=()=>e.jsx("section",{className:"py-20 bg-gray-50",children:e.jsxs("div",{className:"container mx-auto px-4",children:[e.jsxs("div",{className:"max-w-3xl mx-auto text-center mb-12",children:[e.jsx("h2",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-4",children:"תמחור שקוף והוגן"}),e.jsx("p",{className:"text-lg text-gray-600",children:"בדיקה ראשונית תמיד בחינם. התשלום מתבצע רק לאחר שחזור מוצלח של המידע שלכם."})]}),e.jsx("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto",children:Ee.map((t,i)=>e.jsxs(de,{className:"flex flex-col",children:[e.jsx(ce,{children:e.jsx(me,{className:"text-2xl font-bold text-center",children:t.name})}),e.jsxs(xe,{className:"flex flex-col flex-grow",children:[e.jsx("div",{className:"text-4xl font-bold text-center my-4",children:t.price}),e.jsx("ul",{className:"space-y-3 mb-6 flex-grow",children:t.features.map((s,n)=>e.jsxs("li",{className:"flex items-center gap-3",children:[e.jsx(ue,{className:"w-5 h-5 text-green-500"}),e.jsx("span",{children:s})]},n))}),e.jsx(I,{to:"/pricing",className:"mt-auto",children:e.jsx(M,{className:"w-full",variant:"outline",children:"פרטים נוספים"})})]})]},i))}),e.jsx("div",{className:"text-center mt-12",children:e.jsx(I,{to:"/pricing",children:e.jsx(M,{size:"lg",children:"צפו במחירון המלא"})})})]})}),Be=({title:t="קצת עלינו",content:i,image:s,ctaText:n="קרא עוד",ctaAction:a,className:r,stats:o})=>e.jsxs("section",{className:p("relative overflow-hidden py-20",r),style:{background:"var(--color-background-section)"},children:[e.jsxs("div",{className:"absolute inset-0",children:[e.jsx("div",{className:"absolute inset-0 opacity-20",style:{background:`
              radial-gradient(circle at 20% 30%, var(--color-secondary) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, var(--color-primary) 0%, transparent 50%)
            `}}),e.jsx("div",{className:"absolute top-1/4 left-0 w-64 h-64 bg-secondary-redesign/10 rounded-full blur-3xl animate-float-slow"}),e.jsx("div",{className:"absolute bottom-1/4 right-0 w-48 h-48 bg-primary-redesign/15 rounded-full blur-2xl animate-float-medium",style:{animationDelay:"3s"}})]}),e.jsx("div",{className:"container mx-auto px-4 relative z-10",children:e.jsxs("div",{className:"grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto",children:[e.jsxs("div",{className:"order-2 lg:order-1 space-y-6",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-4xl lg:text-5xl font-bold text-text-dark-redesign mb-4",children:t}),e.jsx("div",{className:"w-16 h-1 rounded-full",style:{background:"var(--gradient-secondary)"}})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("p",{className:"text-lg text-text-muted-redesign leading-relaxed",children:i}),o&&o.length>0&&e.jsx("div",{className:"grid grid-cols-2 gap-6 py-6",children:o.map((c,h)=>e.jsxs("div",{className:"text-center lg:text-right",children:[e.jsx("div",{className:"text-3xl font-bold text-primary-redesign mb-1",children:c.number}),e.jsx("div",{className:"text-sm text-text-muted-redesign",children:c.label})]},h))})]}),a&&e.jsx("div",{className:"pt-4",children:e.jsx(G,{variant:"secondary",size:"lg",onClick:a,className:"hover:scale-105 transition-transform duration-300",children:n})})]}),e.jsxs("div",{className:"order-1 lg:order-2 relative",children:[e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-strong",children:[s?e.jsx("img",{src:s,alt:`תמונה המייצגת את ${t} - צוות מקצועי לשחזור נתונים`,className:"w-full h-96 lg:h-[500px] object-cover"}):e.jsx("div",{className:"w-full h-96 lg:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center",children:e.jsxs("div",{className:"text-center space-y-4",children:[e.jsx("div",{className:"w-24 h-24 mx-auto bg-brand-green rounded-2xl flex items-center justify-center",children:e.jsx("svg",{className:"w-12 h-12 text-dark",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"})})}),e.jsx("div",{className:"text-dark font-medium",children:"התמונה שלנו"})]})}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent"})]}),e.jsx("div",{className:"absolute -top-6 -right-6 w-20 h-20 bg-secondary-redesign rounded-full opacity-60 animate-float shadow-glow-green"}),e.jsx("div",{className:"absolute -bottom-4 -left-4 w-16 h-16 bg-primary-redesign rounded-full opacity-70 animate-float shadow-glow",style:{animationDelay:"1s"}})]}),e.jsxs("div",{className:"absolute inset-0 -z-10",children:[e.jsx("div",{className:"absolute top-1/4 right-1/4 w-32 h-32 bg-secondary-redesign/10 rounded-full blur-2xl animate-float-slow animate-pulse-soft"}),e.jsx("div",{className:"absolute bottom-1/4 left-1/4 w-24 h-24 bg-primary-redesign/15 rounded-full blur-xl animate-float hover-glow",style:{animationDelay:"2s"}}),e.jsx("div",{className:"absolute top-1/3 left-1/2 w-16 h-16 bg-secondary-redesign/8 rounded-full blur-lg animate-float-fast opacity-70",style:{animationDelay:"1s"}}),e.jsx("div",{className:"absolute bottom-1/2 right-1/2 w-12 h-12 bg-primary-redesign/12 rounded-full blur-md animate-float opacity-50",style:{animationDelay:"3s"}})]})]})]})}),e.jsx("div",{className:"absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20",children:e.jsx("div",{className:"w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm border border-border-light-redesign shadow-glow",style:{background:"rgba(255, 255, 255, 0.9)"},children:e.jsx("div",{className:"w-8 h-8 rounded-full flex items-center justify-center",style:{background:"var(--gradient-secondary)"},children:e.jsx("svg",{className:"w-4 h-4 text-white",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"})})})})})]}),Ie=({testimonials:t,autoPlay:i=!0,autoPlayInterval:s=6e3,showDots:n=!0,showArrows:a=!0,className:r})=>{const[o,c]=d.useState(0),[h,z]=d.useState(i),[y,f]=d.useState(!1),x=d.useRef(null);d.useEffect(()=>(h&&!y&&t.length>1?x.current=setInterval(()=>{c(u=>(u+1)%t.length)},s):x.current&&(clearInterval(x.current),x.current=null),()=>{x.current&&clearInterval(x.current)}),[h,y,t.length,s]);const w=()=>{f(!0),c(u=>(u+1)%t.length)},A=()=>{f(!0),c(u=>(u-1+t.length)%t.length)},C=u=>{f(!0),c(u)},N=()=>{f(!0)},k=()=>{f(!1)};if(!t||t.length===0)return null;const v=t[o];return e.jsxs("section",{className:p("relative overflow-hidden py-20",r),style:{background:`linear-gradient(135deg, 
          var(--color-background-light) 0%, 
          var(--color-background) 50%, 
          var(--color-background-light) 100%
        )`},children:[e.jsxs("div",{className:"absolute inset-0",children:[e.jsx("div",{className:"absolute inset-0 opacity-10",style:{backgroundImage:`
              radial-gradient(circle at 25% 25%, var(--color-secondary) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, var(--color-primary) 1px, transparent 1px)
            `,backgroundSize:"50px 50px, 30px 30px",backgroundPosition:"0 0, 15px 15px"}}),e.jsx("div",{className:"absolute top-10 right-20 w-32 h-32 bg-primary-redesign/20 rounded-full blur-2xl animate-float-medium"}),e.jsx("div",{className:"absolute bottom-20 left-10 w-40 h-40 bg-secondary-redesign/15 rounded-full blur-3xl animate-float-slow",style:{animationDelay:"2s"}})]}),e.jsxs("div",{className:"container mx-auto px-4 relative z-10",children:[e.jsxs("div",{className:"text-center mb-16",children:[e.jsx("h3",{className:"text-3xl lg:text-4xl font-bold text-text-primary-redesign mb-4",children:"המלצות לקוחות"}),e.jsx("div",{className:"w-16 h-1 mx-auto rounded-full",style:{background:"var(--gradient-secondary)"}})]}),e.jsxs("div",{className:"max-w-4xl mx-auto text-center",children:[e.jsx("div",{className:"mb-8",children:e.jsx("div",{className:"w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-glow",style:{background:"var(--gradient-primary)"},children:e.jsx("svg",{className:"w-8 h-8 text-white",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"})})})}),e.jsxs("div",{className:"testimonial-container",onMouseEnter:N,onMouseLeave:k,children:[e.jsx("blockquote",{className:"mb-8",children:e.jsxs("p",{className:"text-xl lg:text-2xl text-text-primary-redesign font-medium leading-relaxed mb-6 transition-opacity duration-500",children:['"',v.quote,'"']})}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"font-semibold text-text-primary-redesign text-lg mb-1",children:v.author}),e.jsx("div",{className:"text-text-secondary-redesign text-sm",children:v.position}),e.jsx("div",{className:"text-secondary-redesign text-sm font-medium",children:v.company})]}),e.jsx("div",{className:"flex justify-center gap-1 mt-6",children:[...Array(5)].map((u,b)=>e.jsx("svg",{className:`w-5 h-5 transition-colors duration-300 ${b<v.rating?"text-secondary-redesign":"text-gray-300"}`,fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"})},b))})]}),a&&t.length>1&&e.jsxs("div",{className:"absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-4",children:[e.jsx("button",{className:"testimonial-arrow testimonial-arrow-prev",onClick:A,"aria-label":"המלצה קודמת",type:"button",children:e.jsx("span",{"aria-hidden":"true",children:"‹"})}),e.jsx("button",{className:"testimonial-arrow testimonial-arrow-next",onClick:w,"aria-label":"המלצה הבאה",type:"button",children:e.jsx("span",{"aria-hidden":"true",children:"›"})})]}),n&&t.length>1&&e.jsx("div",{className:"flex justify-center gap-3 mt-8",children:t.map((u,b)=>e.jsx("button",{className:`testimonial-dot ${b===o?"active":""}`,onClick:()=>C(b),"aria-label":`עבור להמלצה ${b+1}`,type:"button"},b))})]})]}),e.jsx("div",{className:"absolute top-1/4 left-10 w-4 h-4 bg-secondary-redesign rounded-full opacity-60 animate-float"}),e.jsx("div",{className:"absolute bottom-1/3 right-20 w-6 h-6 bg-primary-redesign rounded-full opacity-40 animate-float",style:{animationDelay:"1s"}}),e.jsx("div",{className:"absolute top-2/3 left-1/4 w-3 h-3 bg-secondary-redesign rounded-full opacity-50 animate-float",style:{animationDelay:"1.5s"}}),e.jsx("style",{jsx:"true",children:`
        .testimonial-container {
          position: relative;
          min-height: 250px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .testimonial-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid rgba(37, 99, 235, 0.2);
          color: #2563eb;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }

        .testimonial-arrow:hover,
        .testimonial-arrow:focus {
          background: #2563eb;
          color: white;
          border-color: #2563eb;
          transform: translateY(-50%) scale(1.1);
          outline: none;
        }

        .testimonial-arrow-prev {
          left: -25px;
        }

        .testimonial-arrow-next {
          right: -25px;
        }

        .testimonial-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.3);
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .testimonial-dot:hover,
        .testimonial-dot:focus {
          background: rgba(37, 99, 235, 0.6);
          transform: scale(1.2);
          outline: none;
        }

        .testimonial-dot.active {
          background: #2563eb;
          transform: scale(1.3);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .testimonial-arrow {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .testimonial-arrow-prev {
            left: -20px;
          }

          .testimonial-arrow-next {
            right: -20px;
          }

          .testimonial-dot {
            width: 10px;
            height: 10px;
          }
        }

        @media (max-width: 480px) {
          .testimonial-arrow {
            display: none;
          }
        }
      `})]})},Me=({itemsToShow:t=3})=>{const i=ge.slice(0,t);return e.jsx("section",{className:"py-20 bg-white",children:e.jsxs("div",{className:"container mx-auto px-4",children:[e.jsxs("div",{className:"max-w-3xl mx-auto text-center mb-12",children:[e.jsx("h2",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-4",children:"שאלות נפוצות"}),e.jsx("p",{className:"text-lg text-gray-600",children:"תשובות מהירות לשאלות הנפוצות ביותר של לקוחותינו."})]}),e.jsx("div",{className:"max-w-3xl mx-auto",children:e.jsx(he,{type:"single",collapsible:!0,className:"w-full",children:i.map(s=>e.jsxs(pe,{value:s.id,children:[e.jsx(be,{className:"text-lg font-semibold text-right",children:s.question}),e.jsx(fe,{className:"text-base text-gray-700 text-right leading-relaxed",children:s.answer})]},s.id))})}),e.jsx("div",{className:"text-center mt-12",children:e.jsx(I,{to:"/faq",children:e.jsx(M,{variant:"outline",size:"lg",children:"לכל השאלות והתשובות"})})})]})})},Ke=()=>{const t=O();J(),Q(),Z();const i={title:"שחזור קבצים מקצועי בישראל | דוקטור פיקס - שיעור הצלחה 97%",description:"שירות שחזור קבצים מקצועי מרחוק עם מעל 7 שנות ניסיון. שחזור דיסקים קשיחים, כרטיסי זיכרון ונתונים דיגיטליים. הערכת מחיר חינמית!",keywords:["שחזור קבצים","שחזור נתונים","שחזור דיסק קשיח"],canonical:"https://recoverysite.netlify.app/"};ae(i),{...i,keywords:i.keywords.join(", ")};const s=[{id:"hard-drive-recovery",icon:e.jsx("svg",{className:"w-12 h-12",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"})}),title:"הדיסק הקשיח קרס? אנחנו נציל את המידע שלך.",description:"איבדתם גישה לקבצים קריטיים, תמונות משפחתיות או עבודה של שנים? אנחנו מבינים את הלחץ. עם טכנולוגיה מתקדמת וניסיון מוכח, אנו מתמחים בהצלת מידע גם מדיסקים שנראים אבודים לחלוטין.",bullets:["הצילו זיכרונות יקרים: שחזור תמונות משפחתיות, סרטונים וקבצים אישיים.","מנעו נזק עסקי: החזרת מסמכי עבודה, קבצי לקוחות ומידע פיננסי חיוני.","שקט נפשי מובטח: אבחון ראשוני חינם וללא כל התחייבות מצדכם.","אל תרימו ידיים: אנו מצטיינים בשחזור גם ממקרים שנראים בלתי אפשריים."],onLinkClick:()=>t("/services/data-recovery")},{id:"usb-recovery",icon:e.jsx("svg",{className:"w-12 h-12",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 10V3L4 14h7v7l9-11h-7z"})}),title:"דיסק און קי לא מגיב? הקבצים שלכם בהישג יד.",description:"הדיסק און קי לא מזוהה? הקבצים החשובים נעלמו? לפני שאתם מרימים ידיים, תנו למומחים שלנו להחזיר לכם את הגישה למידע היקר שלכם במהירות ובבטחה.",bullets:["שחזור קבצי עבודה חשובים.","הצלת מצגות ופרויקטים.","אבחון מהיר ופתרון יעיל.","תמיכה בכל סוגי הדיסק און קי."],onLinkClick:()=>t("/services/data-recovery")},{id:"memory-card-recovery",icon:e.jsxs("svg",{className:"w-12 h-12",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1.586-1.586a2 2 0 00-2.828 0L6 16"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M20 12h.01M4 4h16v16H4z"})]}),title:"התמונות מכרטיס הזיכרון נמחקו? יש לנו פתרון.",description:"תקלה בכרטיס הזיכרון של המצלמה או הסמארטפון היא לא סוף העולם. אנו מתמחים בשחזור תמונות, סרטונים וקבצים מכרטיסי זיכרון פגומים, גם אם עברו פירמוט.",bullets:["הצלת תמונות מטיולים ואירועים.","שחזור סרטונים משפחתיים.","תמיכה בכל סוגי הכרטיסים (SD, microSD).","אבחון חינם וללא התחייבות."],onLinkClick:()=>t("/services/data-recovery")}],n=[{id:"testimonial-1",quote:"השירות היה מעולה! הצליחו לשחזר לי קבצים חשובים שחשבתי שאבדו לנצח. מקצועיות ברמה הגבוהה ביותר ושירות אדיב ומהיר.",author:"לקוח מרוצה",position:"מנהל IT",company:"חברה פרטית",rating:5},{id:"testimonial-2",quote:"לאחר שהדיסק הקשיח שלי התקלקל לחלוטין, חשבתי שאיבדתי את כל התמונות המשפחתיות. הצוות כאן הצליח לשחזר הכל תוך 24 שעות!",author:"לקוחה מרוצה",position:"מעצבת גרפית",company:"עסק משפחתי",rating:5},{id:"testimonial-3",quote:"השירות המרחוק החסיך לי המון זמן וכסף. תוך שעות ספורות הם הצליחו לשחזר את כל הקבצים החשובים שלי מהמחשב הנייד.",author:"לקוח מרוצה",position:"יועץ עסקי",company:"משרד ייעוץ",rating:5},{id:"testimonial-4",quote:"כשכרטיס הזיכרון של החתונה התקלקל, פניתי אליהם במצב של פאניקה. הם הרגיעו אותי ותוך יומיים כל התמונות חזרו אליי.",author:"לקוח מרוצה",position:"צלם אירועים",company:"צלם עצמאי",rating:5}],a=[{number:"97%",label:"שיעור הצלחה"},{number:"24/6",label:"זמינות"},{number:"7+",label:"שנות ניסיון"},{number:"15+",label:"כלים מותאמים"}],r=()=>{t("/about")};return e.jsxs(e.Fragment,{children:[e.jsx(re,{title:"שחזור קבצים מקצועי מרחוק | שירות אמין ללא הגעה פיזית",description:"שירותי שחזור קבצים מקצועיים מרחוק. מעל 7 שנות ניסיון, בדיקה חינמית, תשלום רק לאחר הצלחה.",keywords:["שחזור קבצים","שחזור נתונים","שחזור דיסק קשיח","שחזור מרחוק","תמיכה טכנית"],canonicalUrl:"https://recoverysite.netlify.app/",ogType:"website",structuredData:[]}),e.jsx(je,{}),e.jsxs("div",{className:"min-h-screen bg-background relative overflow-hidden",children:[e.jsx("a",{href:"#main-content",className:"sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded",children:"דלג לתוכן הראשי"}),e.jsx(ee,{}),e.jsxs("main",{id:"main-content",role:"main",children:[e.jsx(Le,{}),e.jsx("div",{id:"services-section",children:e.jsx(ze,{title:"השירותים שלנו",services:s})}),e.jsx(Te,{}),e.jsx(Be,{title:"קצת עלינו",content:"אנחנו מומחי טכנולוגיה עם ניסיון רב בתחום שחזור קבצים ותמיכה טכנית. פיתחנו כלים ותוכנות מיוחדים שמאפשרים לנו להתמודד עם המקרים המורכבים ביותר. המטרה שלנו היא לספק פתרונות מהירים, יעילים ואמינים לכל לקוח.",ctaText:"קרא עוד",ctaAction:r,stats:a,image:"https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}),e.jsx(Ie,{testimonials:n,autoPlay:!0,autoPlayInterval:7e3,showDots:!0,showArrows:!1}),e.jsx(Me,{})]}),e.jsx(te,{}),e.jsx(se,{})]})]})};export{Ke as default};
