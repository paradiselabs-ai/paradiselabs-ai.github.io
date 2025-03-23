import{j as e}from"./react-core.BQPeW7rL.js";import{r as p}from"./react-full.BKSoK5FJ.js";const pe=({isVisible:T,code:d,title:V,filename:N,onClose:F})=>{const r=d.split(`
`),[z,o]=p.useState(null),[L,k]=p.useState(null),[G,D]=p.useState(""),[f,m]=p.useState([]),[g,C]=p.useState(0),[M,E]=p.useState({root:!0,src:!0,config:!1,docs:!1}),[y,v]=p.useState(null),[H,U]=p.useState(null),[Z,J]=p.useState(!1),[Y,ne]=p.useState(!1);p.useEffect(()=>{const n=()=>{const a=window.innerWidth<=768;ne(a),k(a?null:"files"),J(!a)};return n(),window.addEventListener("resize",n),()=>{window.removeEventListener("resize",n)}},[]);const te=()=>{navigator.clipboard.writeText(d).then(()=>{const n=document.querySelector(".code-overlay-btn.copy-btn span");n&&(n.textContent="Copied!",setTimeout(()=>{n.textContent="Copy"},2e3))})},ae=()=>{const n=document.createElement("a"),a=new Blob([d],{type:"text/plain"});n.href=URL.createObjectURL(a),n.download=N||"glue-code.txt",document.body.appendChild(n),n.click(),document.body.removeChild(n)},ee=n=>{y||o(n)},se=()=>{y||o(null)},R=()=>{v(null),o(null)},K=n=>{L===n?(k(null),J(!1)):(k(n),J(!0))},Q=n=>{if(!n.trim()){m([]);return}const a=[];r.forEach((_,c)=>{_.toLowerCase().includes(n.toLowerCase())&&a.push(c)}),m(a),a.length>0&&(o(a[0]),C(0))},W=n=>{if(f.length===0)return;let a=g;n==="next"?a=(g+1)%f.length:a=(g-1+f.length)%f.length,C(a),o(f[a])};p.useEffect(()=>{const n=a=>{a.key==="Escape"&&(y?R():T&&F())};return window.addEventListener("keydown",n),()=>window.removeEventListener("keydown",n)},[T,F,y,R]),p.useEffect(()=>(T?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[T]);const oe=n=>{y&&(n.target.closest(".block-highlighted")||R())};p.useEffect(()=>{const n=document.querySelector(".code-overlay-code"),a=document.querySelector(".code-overlay-line-numbers");if(!n||!a)return;const _=()=>{a.scrollTop=n.scrollTop};return a.scrollTop=n.scrollTop,n.addEventListener("scroll",_),()=>{n.removeEventListener("scroll",_)}},[T]);const X=()=>r.map((n,a)=>{let _="minimap-block";return n.includes("glue")||n.includes("model")||n.includes("tool")?_+=" keyword":n.includes('"')||n.includes("'")?_+=" string":n.includes("//")&&(_+=" comment"),e.jsx("div",{className:_,style:{width:`${Math.min(95,n.length)}%`}},a)}),le=p.useMemo(()=>r.map(n=>n.trim()===""?" ":ce(n)),[d]),B=n=>{var a;switch((a=n.split(".").pop())==null?void 0:a.toLowerCase()){case"glue":return e.jsx("span",{className:"material-icons",style:{color:"#34B8CE"},children:"code"});case"json":return e.jsx("span",{className:"material-icons",style:{color:"#FFC107"},children:"settings"});case"md":return e.jsx("span",{className:"material-icons",style:{color:"#7CB342"},children:"description"});case"js":case"jsx":return e.jsx("span",{className:"material-icons",style:{color:"#FFCA28"},children:"javascript"});case"ts":case"tsx":return e.jsx("span",{className:"material-icons",style:{color:"#2979FF"},children:"data_object"});case"css":return e.jsx("span",{className:"material-icons",style:{color:"#E91E63"},children:"style"});case"html":return e.jsx("span",{className:"material-icons",style:{color:"#FF5722"},children:"html"});case"py":return e.jsx("span",{className:"material-icons",style:{color:"#4CAF50"},children:"code"});case"sh":return e.jsx("span",{className:"material-icons",style:{color:"#607D8B"},children:"terminal"});default:return e.jsx("span",{className:"material-icons",children:"insert_drive_file"})}},P=()=>{const a=N.split("/").pop()||"",_="GLUE Project",c=S=>{v(null),U(S),setTimeout(()=>U(null),500);const h=r.findIndex(j=>j.toLowerCase().includes(S.toLowerCase()));if(h>=0)if(S==="model"||S==="tool"){const j=new RegExp(`^\\s*${S}\\s+\\w+\\s*\\{`,"i"),I=[],s=h;if(r.forEach((i,t)=>{if(i.match(j)){const l=t;let u=t,b=1;for(let x=t+1;x<r.length;x++){const w=r[x],$=(w.match(/\{/g)||[]).length,q=(w.match(/\}/g)||[]).length;if(b+=$-q,b<=0){u=x,I.push({start:l,end:u});break}}}}),I.length>0){const i=Math.min(...I.map(l=>l.start)),t=Math.max(...I.map(l=>l.end));v({start:i,end:t}),o(s),O(s)}}else{const j=h;let I=h,s=0,i=!1;if(r[h].includes("{")){i=!0,s=1;for(let t=h+1;t<r.length;t++){const l=r[t],u=(l.match(/\{/g)||[]).length,b=(l.match(/\}/g)||[]).length;if(s+=u-b,s<=0){I=t;break}}}else for(let t=h+1;t<Math.min(h+5,r.length);t++)if(r[t].includes("{")){i=!0,s=1;for(let l=t+1;l<r.length;l++){const u=r[l],b=(u.match(/\{/g)||[]).length,x=(u.match(/\}/g)||[]).length;if(s+=b-x,s<=0){I=l;break}}break}o(j),v(i?{start:j,end:I}:null),O(j)}},O=S=>{const h=document.querySelector(".code-overlay-code"),j=h?.querySelectorAll(".code-line");j&&j[S]&&j[S].scrollIntoView({behavior:"smooth",block:"center"})};return e.jsxs("div",{className:"side-panel-content files-panel",children:[e.jsxs("div",{className:"panel-header",children:[e.jsx("span",{className:"material-icons",children:"folder"}),e.jsx("span",{className:"panel-title",children:"Explorer"})]}),e.jsx("div",{className:"project-stats",children:e.jsxs("div",{className:"project-info",children:[e.jsx("span",{className:"project-name",children:_}),e.jsx("span",{className:"file-count",children:a})]})}),e.jsxs("div",{className:"folder-tree",children:[e.jsxs("div",{className:"workspace-section",children:[e.jsx("div",{className:"section-title",children:"CURRENT FILE"}),e.jsxs("div",{className:"file active",children:[B(a),e.jsx("span",{children:a})]})]}),e.jsxs("div",{className:"workspace-section",children:[e.jsx("div",{className:"section-title",children:"CODE STRUCTURE"}),e.jsx("div",{className:"outline-section",children:(()=>{const S=r.filter(s=>s.match(/^\s*model\s+\w+\s*\{/)).length,h=r.filter(s=>s.match(/^\s*tool\s+\w+\s*\{/)).length,j=r.some(s=>s.match(/^\s*magnetize\s*\{/)),I=r.some(s=>s.includes("glue app"));return r.some(s=>s.includes("config")),e.jsxs(e.Fragment,{children:[I&&e.jsxs("div",{className:`outline-item ${H==="glue app"?"clicked":""}`,onClick:()=>c("glue app"),children:[e.jsx("span",{className:"material-icons",style:{color:"#34B8CE"},children:"apps"}),e.jsx("span",{children:"App Configuration"})]}),S>0&&e.jsxs("div",{className:`outline-item ${H==="models-count"?"clicked":""}`,onClick:()=>{U("models-count"),v(null);const s=[],i=/^\s*model\s+\w+\s*\{/i,t=r.findIndex(l=>l.match(i));if(r.forEach((l,u)=>{if(l.match(i)){const b=u;let x=u,w=1;for(let $=u+1;$<r.length;$++){const q=r[$],ie=(q.match(/\{/g)||[]).length,re=(q.match(/\}/g)||[]).length;if(w+=ie-re,w<=0){x=$,s.push({start:b,end:x});break}}}}),s.length>0){const l=Math.min(...s.map(w=>w.start)),u=Math.max(...s.map(w=>w.end));v({start:l,end:u}),o(t);const b=document.querySelector(".code-overlay-code"),x=b?.querySelectorAll(".code-line");x&&x[t]&&x[t].scrollIntoView({behavior:"smooth",block:"center"})}setTimeout(()=>U(null),500)},children:[e.jsx("span",{className:"material-icons",style:{color:"#50FA7B"},children:"smart_toy"}),e.jsxs("span",{children:[S," Model",S!==1?"s":""]})]}),h>0&&e.jsxs("div",{className:`outline-item ${H==="tools-count"?"clicked":""}`,onClick:()=>{U("tools-count"),v(null);const s=[],i=/^\s*tool\s+\w+\s*\{/i,t=r.findIndex(l=>l.match(i));if(r.forEach((l,u)=>{if(l.match(i)){const b=u;let x=u,w=1;for(let $=u+1;$<r.length;$++){const q=r[$],ie=(q.match(/\{/g)||[]).length,re=(q.match(/\}/g)||[]).length;if(w+=ie-re,w<=0){x=$,s.push({start:b,end:x});break}}}}),s.length>0){const l=Math.min(...s.map(w=>w.start)),u=Math.max(...s.map(w=>w.end));v({start:l,end:u}),o(t);const b=document.querySelector(".code-overlay-code"),x=b?.querySelectorAll(".code-line");x&&x[t]&&x[t].scrollIntoView({behavior:"smooth",block:"center"})}setTimeout(()=>U(null),500)},children:[e.jsx("span",{className:"material-icons",style:{color:"#8BE9FD"},children:"build"}),e.jsxs("span",{children:[h," Tool",h!==1?"s":""]})]}),j&&e.jsxs("div",{className:`outline-item ${H==="workflow-defined"?"clicked":""}`,onClick:()=>c("magnetize"),children:[e.jsx("span",{className:"material-icons",style:{color:"#FFB86C"},children:"account_tree"}),e.jsx("span",{children:"Workflow"})]})]})})()})]})]})]})},A=()=>e.jsxs("div",{className:"side-panel-content search-panel",children:[e.jsxs("div",{className:"panel-header",children:[e.jsx("span",{className:"material-icons",children:"search"}),e.jsx("span",{className:"panel-title",children:"Search"})]}),e.jsxs("div",{className:"search-container",children:[e.jsx("div",{className:"search-input-container",children:e.jsx("input",{type:"text",placeholder:"Search in file...",value:G,onChange:n=>{D(n.target.value),Q(n.target.value)},className:"search-input"})}),e.jsx("div",{className:"search-results-info",children:f.length>0?e.jsxs("div",{className:"search-stats",children:[g+1," of ",f.length," results",e.jsxs("div",{className:"search-navigation",children:[e.jsx("button",{onClick:()=>W("prev"),className:"search-nav-btn",disabled:f.length<=1,children:e.jsx("span",{className:"material-icons",children:"keyboard_arrow_up"})}),e.jsx("button",{onClick:()=>W("next"),className:"search-nav-btn",disabled:f.length<=1,children:e.jsx("span",{className:"material-icons",children:"keyboard_arrow_down"})})]})]}):G?e.jsx("div",{className:"no-results",children:"No results found"}):null}),f.length>0&&e.jsx("div",{className:"search-result-list",children:f.map((n,a)=>e.jsxs("div",{className:`search-result-item ${g===a?"active":""}`,onClick:()=>{C(a),o(n)},children:[e.jsx("div",{className:"line-number",children:n+1}),e.jsxs("div",{className:"line-preview",children:[r[n].substring(0,40),r[n].length>40?"...":""]})]},a))})]})]});return e.jsxs("div",{className:`code-overlay ${T?"visible":""}`,onClick:oe,children:[e.jsxs("div",{className:"code-overlay-header",children:[e.jsx("div",{className:"code-overlay-tabs",children:e.jsxs("div",{className:"code-overlay-tab active",children:[e.jsx("span",{className:"filetype-icon",children:N.endsWith(".glue")?"{ }":"< >"}),N]})}),e.jsxs("div",{className:"code-overlay-title",children:[V,e.jsx("span",{className:"code-overlay-filename",title:N,children:N})]}),e.jsxs("div",{className:"code-overlay-actions",children:[e.jsx("button",{className:"code-overlay-btn copy-btn",onClick:te,children:e.jsx("span",{children:"Copy"})}),y&&e.jsx("button",{className:"code-overlay-btn exit-highlight-btn",onClick:R,title:"Clear selection (ESC)",children:e.jsx("span",{children:"Exit Highlight"})}),e.jsx("button",{className:"code-overlay-btn download-btn",onClick:ae,children:e.jsx("span",{children:"Download"})}),e.jsx("button",{className:"code-overlay-btn close-btn",onClick:F,children:e.jsx("span",{children:"Close"})})]})]}),e.jsxs("div",{className:"code-overlay-content",children:[e.jsxs("div",{className:"code-overlay-sidebar",children:[e.jsx("div",{className:`sidebar-icon files ${L==="files"?"active":""}`,onClick:()=>K("files"),title:"Explorer"}),e.jsx("div",{className:`sidebar-icon search ${L==="search"?"active":""}`,onClick:()=>K("search"),title:"Search"})]}),e.jsxs("div",{className:`side-panel ${Y&&Z?"active":""}`,children:[L==="files"&&P(),L==="search"&&A()]}),e.jsxs("div",{className:"code-overlay-editor",children:[e.jsx("div",{className:`code-overlay-line-numbers ${Y?"mobile-hidden":""}`,children:r.map((n,a)=>e.jsx("div",{className:z===a?"current-line":"",onMouseEnter:()=>ee(a),onMouseLeave:se,children:a+1},a))}),e.jsx("div",{className:"code-overlay-code",children:le.map((n,a)=>e.jsx("div",{className:`code-line ${z===a?"highlighted":""} ${f.includes(a)?"search-match":""} ${y&&a>=y.start&&a<=y.end?"block-highlighted":""}`,"data-line-number":a+1,onMouseEnter:()=>ee(a),onMouseLeave:se,onDoubleClick:y?R:void 0,children:e.jsx("span",{dangerouslySetInnerHTML:{__html:n}})},a))}),!Y&&e.jsxs("div",{className:"code-overlay-minimap",children:[e.jsx("div",{className:"minimap-content",onClick:R,title:"Click to exit highlight mode",children:X()}),e.jsx("div",{className:"minimap-visible-area",style:{top:`${(z||0)*100/Math.max(r.length,1)}%`}})]})]})]}),e.jsxs("div",{className:"code-overlay-status-bar",children:[e.jsxs("div",{className:"status-bar-left",children:[e.jsxs("div",{className:"status-bar-item",children:[e.jsx("span",{className:"material-icons",style:{fontSize:"14px"},children:"code"}),"GLUE"]}),e.jsxs("div",{className:"status-bar-item",children:[e.jsx("span",{className:"material-icons",style:{fontSize:"14px"},children:"text_format"}),"UTF-8"]}),y&&e.jsxs("div",{className:"status-bar-item highlight-indicator",children:[e.jsx("span",{className:"material-icons",style:{fontSize:"14px",color:"rgba(52, 184, 206, 1)"},children:"format_paint"}),"Highlight Mode (ESC to exit)"]})]}),e.jsxs("div",{className:"status-bar-right",children:[e.jsxs("div",{className:"status-bar-item",children:[e.jsx("span",{className:"material-icons",style:{fontSize:"14px"},children:"space_bar"}),"Spaces: 2"]}),e.jsxs("div",{className:"status-bar-item",children:[e.jsx("span",{className:"material-icons",style:{fontSize:"14px"},children:"keyboard_return"}),"LF"]})]})]})]})},ce=T=>{var d;let V=T.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");const N=((d=V.match(/^\s*/))==null?void 0:d[0])||"",F=Math.floor(N.length/2),r=N.replace(/ /g,"&nbsp;"),z=V.trimStart();if(!z)return`<span style="--indent-level:${F};">${r}</span>`;let o=z;const L=["glue","app","model","tool","magnetize"],k=["config","provider","role","adhesives"],G=["glue","velcro","tape","staple"],D=["true","false"];o=o.replace(/(\/\/.*$)/g,'<span class="comment">$1</span>'),o=o.replace(/("(?:[^"\\]|\\.)*")/g,'<span class="string">$1</span>');const f=/(\badhesives\s*=\s*\[)([^\]]+)(\])/g;return o=o.replace(f,(m,g,C,M)=>{const E=C.split(",").map(y=>{const v=y.trim();return G.includes(v)?` <span class="function">${v}</span>`:y}).join(",");return`${g}${E}${M}`}),L.forEach(m=>{const g=new RegExp(`(^|\\s+)(${m})\\s+(?=\\w+|{)(?![^<]*>)`,"g");o=o.replace(g,`$1<span class="keyword keyword-${m}">$2</span> `)}),k.forEach(m=>{const g=new RegExp(`\\b(${m})\\b(?![^<]*>)`,"g");o=o.replace(g,'<span class="keyword keyword-config">$1</span>')}),D.forEach(m=>{const g=new RegExp(`\\b(${m})\\b(?![^<]*>)`,"g");o=o.replace(g,'<span class="number">$1</span>')}),o=o.replace(/\b(\d+(\.\d+)?)(?![^<]*>)\b/g,'<span class="number">$1</span>'),o=o.replace(/(\=|\->|\|)(?![^<]*>)/g,'<span class="operator">$1</span>'),o=o.replace(/(\{)(?![^<]*>)/g,'<span class="bracket block-start">$1</span>'),o=o.replace(/(\})(?![^<]*>)/g,'<span class="bracket block-end">$1</span>'),o=o.replace(/(\[|\])(?![^<]*>)/g,'<span class="bracket">$1</span>'),o=o.replace(/\b(\w+)(?=\s*=)(?![^<]*>)/g,'<span class="property">$1</span>'),`<span style="--indent-level:${F};">${r}${o}</span>`},he=()=>{var T;const[d,V]=p.useState("overview"),[N,F]=p.useState(null),[r,z]=p.useState(!1),[o,L]=p.useState(null),[k,G]=p.useState(""),[D,f]=p.useState({}),[m,g]=p.useState(!1),[C,M]=p.useState(!1),[E,y]=p.useState(!1),[v,H]=p.useState("portrait"),[U,Z]=p.useState(!1),[J,Y]=p.useState(!1),[ne,te]=p.useState(""),[ae,ee]=p.useState(""),[se,R]=p.useState(""),K=p.useRef(null),Q=p.useRef({});p.useEffect(()=>{const s=()=>{const i=window.innerWidth<=768;y(i),!i&&C&&M(!1);const l=window.innerWidth>window.innerHeight?"landscape":"portrait";v!==l&&(H(l),i&&(Z(!0),setTimeout(()=>Z(!1),2e3)))};return s(),window.addEventListener("resize",s),window.addEventListener("orientationchange",s),()=>{window.removeEventListener("resize",s),window.removeEventListener("orientationchange",s)}},[C,v]);const W={research:{code:`glue app {
  name = "Research Assistant"
  config {
    development = true
    sticky = true
  }
}

tool web_search {
  provider = serp
}

tool file_handler {
  config {
    base_path = "./workspace"
  }
}

model researcher {
  provider = openrouter
  role = "Research topics online"
  adhesives = [glue, velcro]
  config {
    model = "meta-llama/llama-3.1-70b-instruct:free"
  }
}

model fact_checker {
  provider = anthropic
  role = "Verify factual accuracy"
  adhesives = [velcro]
  config {
    model = "claude-3-opus-20240229"
    temperature = 0.2
  }
}

magnetize {
  input -> researcher
  researcher -> web_search
  web_search -> fact_checker
  fact_checker -> output
}`,title:"Research Assistant Example",filename:"research-assistant.glue"},"code-gen":{code:`glue app {
  name = "Code Generator"
  config {
    development = true
  }
}

tool file_handler {
  config {
    base_path = "./project"
    permissions = "read-write"
  }
}

tool code_interpreter {}

model architect {
  provider = openrouter
  role = "Design software architecture"
  adhesives = [glue]
  config {
    model = "meta-llama/llama-3.1-70b-instruct:free"
  }
}

model coder {
  provider = anthropic
  role = "Generate implementation code"
  adhesives = [velcro, tape]
  config {
    model = "claude-3-opus-20240229"
  }
}

model tester {
  provider = openai
  role = "Write and run tests"
  adhesives = [velcro]
  config {
    model = "gpt-4"
    temperature = 0.3
  }
}

magnetize {
  input -> architect
  architect -> coder
  coder -> [file_handler, tester]
  tester -> code_interpreter -> output
}`,title:"Code Generator Example",filename:"code-generator.glue"},content:{code:`glue app {
  name = "Content Pipeline"
  config {
    development = true
    sticky = true
  }
}

tool web_search {
  provider = tavily
}

tool cms_publisher {
  config {
    api_endpoint = "https://cms.example.com/api"
  }
}

model researcher {
  provider = openrouter
  role = "Research topics thoroughly"
  adhesives = [glue, velcro]
  config {
    model = "meta-llama/llama-3.1-70b-instruct:free"
  }
}

model writer {
  provider = anthropic
  role = "Create content drafts"
  adhesives = [velcro]
  config {
    model = "claude-3-opus-20240229"
    temperature = 0.7
  }
}

model editor {
  provider = openai
  role = "Edit and improve content"
  adhesives = [tape]
  config {
    model = "gpt-4"
    temperature = 0.4
  }
}

magnetize {
  input -> researcher
  researcher -> web_search
  [researcher, web_search] -> writer
  writer -> editor
  editor -> cms_publisher -> output
}`,title:"Content Pipeline Example",filename:"content-pipeline.glue"}},oe={overview:{"what-is-glue":"What is GLUE? GLUE provides a declarative syntax for connecting AI models, tools, and systems into cohesive applications.","key-features":"Key Features Declarative Syntax Model Orchestration Tool Integration Flexible Adhesives Development Mode","getting-started":"Getting Started Installation Guide Examples GLUE in action npm install @glue-ai/core"},"core-concepts":{models:"Models AI agents Provider OpenAI Anthropic Role Adhesives Config temperature max tokens",tools:"Tools web search file operations external APIs code execution",adhesives:"Adhesives Glue Velcro Tape Staple bidirectional communication context-aware connections memory data transfer",workflows:"Workflows magnetize block orchestrates models and tools information flow processing sequences dependencies error handling"},syntax:{"basic-structure":"Basic Structure glue app model tool magnetize","defining-models":"Defining Models provider role adhesives config model temperature max_tokens","defining-tools":"Defining Tools provider config api_key permissions","workflow-orchestration":"Workflow Orchestration input output connections"},mcp:{"what-is-mcp":"What is MCP? Model Control Protocol standardized interfaces controlling AI model execution monitoring performance safety",configuration:"Configuration MCP enabled endpoint auth features monitoring guardrails logging","model-integration":"Model Integration mcp_proxy target_provider openai content_safety pii_detection",benefits:"Benefits Standardized Control Enhanced Safety Monitoring Compliance data handling policies audit logs"},installation:{prerequisites:"Prerequisites Node.js npm yarn API key","npm-installation":"NPM Installation create project directory initialize npm install",configuration:"Configuration .env file API keys OPENAI_API_KEY ANTHROPIC_API_KEY","create-your-first-app":"Create Your First App app.glue hello world","running-your-app":"Running Your App npx glue run glue dev"},examples:{"research-assistant":"Research Assistant multiple specialized research models automatic fact-checking verification documentation generation","code-generator":"Code Generator architecture design code generation testing quality assurance","content-pipeline":"Content Pipeline research content creation editing fact verification publishing"},api:{"application-configuration":"Application Configuration name development sticky debug log_level max_history mcp_enabled","model-configuration":"Model Configuration provider role adhesives model temperature max_tokens top_p top_k","tool-configuration":"Tool Configuration provider api_key endpoint max_results timeout","workflow-configuration":"Workflow Configuration flow definitions direct flow parallel flow join flow transformations conditions"}},X=s=>{W[s]?(te(W[s].code),ee(W[s].title),R(s),Y(!0),document.body.style.overflow="hidden"):N===s?F(null):(F(s),setTimeout(()=>{const i=document.querySelector(".use-case-card.show-code .use-case-code");i&&i.scrollIntoView({behavior:"smooth",block:"center"})},300))},le=()=>{Y(!1),R(""),document.body.style.overflow=""},B=(s,i)=>{navigator.clipboard.writeText(s).then(()=>{const t=document.getElementById(`copy-btn-${i}`);t&&(t.classList.add("copied"),t.textContent="Copied!",setTimeout(()=>{t.classList.remove("copied"),t.textContent="Copy"},2e3))})},P=s=>{V(s),L(null),G(""),f({}),K.current&&(K.current.scrollTop=0,window.scrollTo(0,0))},A=(s,i)=>{i.preventDefault();const t=document.getElementById(s);t&&(L(s),t.scrollIntoView({behavior:"smooth",block:"start"}),window.history.pushState(null,"",`#${s}`))};p.useEffect(()=>{const s=()=>{z(window.scrollY>300);const i=window.scrollY+200;let t=null;Object.entries(Q.current).forEach(([l,u])=>{u&&u.offsetTop<=i&&(t=l)}),t!==o&&L(t)};return window.addEventListener("scroll",s),()=>window.removeEventListener("scroll",s)},[o]),p.useEffect(()=>{Q.current={},document.querySelectorAll(".docs-section h2[id]").forEach(t=>{const l=t.getAttribute("id");l&&(Q.current[l]=t)}),setTimeout(()=>{const t=window.scrollY+200;let l=null;Object.entries(Q.current).forEach(([u,b])=>{b&&b.offsetTop<=t&&(l=u)}),L(l)},100);const i=window.location.hash.substring(1);if(i){const t=document.getElementById(i);t&&setTimeout(()=>{t.scrollIntoView({behavior:"smooth"}),L(i)},300)}},[d]);const n=()=>{window.scrollTo({top:0,behavior:"smooth"})},a=()=>{switch(d){case"overview":return"Overview";case"core-concepts":return"Core Concepts";case"syntax":return"GLUE Syntax";case"mcp":return"MCP Integration";case"installation":return"Installation";case"examples":return"Examples";case"api":return"API Reference";default:return"Documentation"}},_=s=>{const i=s.target.value;if(G(i),!i.trim()){f({});return}const t={},l=oe[d]||{};Object.entries(l).forEach(([u,b])=>{b.toLowerCase().includes(i.toLowerCase())&&(t[u]=!0)}),f(t)},c=s=>{if(!k.trim())return s;const i=s.split(new RegExp(`(${k})`,"gi"));return e.jsx(e.Fragment,{children:i.map((t,l)=>t.toLowerCase()===k.toLowerCase()?e.jsx("span",{className:"search-highlight",children:t},l):t)})},O=s=>k.trim()?Object.keys(D).length===0||D[s]:!0,S=()=>d==="overview"?e.jsxs("div",{className:`toc ${m?"collapsed":""}`,onClick:()=>m&&g(!1),children:[e.jsxs("div",{className:"toc-title",children:["On this page",e.jsx("button",{className:"toc-toggle",onClick:s=>{s.stopPropagation(),g(!m)},children:m?"expand_more":"expand_less"})]}),e.jsxs("ul",{className:`toc-list ${m?"hidden":""}`,children:[e.jsx("li",{className:o==="what-is-glue"?"active":"",children:e.jsx("button",{className:"toc-link",onClick:s=>A("what-is-glue",s),children:"What is GLUE?"})}),e.jsx("li",{className:o==="key-features"?"active":"",children:e.jsx("button",{className:"toc-link",onClick:s=>A("key-features",s),children:"Key Features"})}),e.jsx("li",{className:o==="getting-started"?"active":"",children:e.jsx("button",{className:"toc-link",onClick:s=>A("getting-started",s),children:"Getting Started"})})]})]}):d==="core-concepts"?e.jsxs("div",{className:`toc ${m?"collapsed":""}`,onClick:()=>m&&g(!1),children:[e.jsxs("div",{className:"toc-title",children:["On this page",e.jsx("button",{className:"toc-toggle",onClick:s=>{s.stopPropagation(),g(!m)},children:m?"expand_more":"expand_less"})]}),e.jsxs("ul",{className:`toc-list ${m?"hidden":""}`,children:[e.jsx("li",{className:o==="models"?"active":"",children:e.jsx("button",{className:"toc-link",onClick:s=>A("models",s),children:"Models"})}),e.jsx("li",{className:o==="tools"?"active":"",children:e.jsx("button",{className:"toc-link",onClick:s=>A("tools",s),children:"Tools"})}),e.jsx("li",{className:o==="adhesives"?"active":"",children:e.jsx("button",{className:"toc-link",onClick:s=>A("adhesives",s),children:"Adhesives"})}),e.jsx("li",{className:o==="workflows"?"active":"",children:e.jsx("button",{className:"toc-link",onClick:s=>A("workflows",s),children:"Workflows"})})]})]}):d==="syntax"?e.jsxs("div",{className:`toc ${m?"collapsed":""}`,onClick:()=>m&&g(!1),children:[e.jsxs("div",{className:"toc-title",children:["On this page",e.jsx("button",{className:"toc-toggle",onClick:s=>{s.stopPropagation(),g(!m)},children:m?"expand_more":"expand_less"})]}),e.jsxs("ul",{className:`toc-list ${m?"hidden":""}`,children:[e.jsx("li",{className:o==="basic-structure"?"active":"",children:e.jsx("button",{className:"toc-link",onClick:s=>A("basic-structure",s),children:"Basic Structure"})}),e.jsx("li",{className:o==="defining-models"?"active":"",children:e.jsx("button",{className:"toc-link",onClick:s=>A("defining-models",s),children:"Defining Models"})}),e.jsx("li",{className:o==="defining-tools"?"active":"",children:e.jsx("button",{className:"toc-link",onClick:s=>A("defining-tools",s),children:"Defining Tools"})}),e.jsx("li",{className:o==="workflow-orchestration"?"active":"",children:e.jsx("button",{className:"toc-link",onClick:s=>A("workflow-orchestration",s),children:"Workflow Orchestration"})})]})]}):null,h=(s,i)=>{const t=s.split(`
`).map(l=>ce(l)).join("<br>");return e.jsxs("div",{className:"code-block",children:[e.jsx("pre",{children:e.jsx("code",{dangerouslySetInnerHTML:{__html:t}})}),e.jsx("button",{id:`copy-btn-${i}`,className:"copy-button",onClick:()=>B(s,i),children:"Copy"})]})},j=({type:s,title:i,children:t})=>e.jsxs("div",{className:`info-block ${s}`,children:[e.jsx("h4",{children:i}),t]}),I=()=>e.jsxs("div",{className:"no-search-results",children:[e.jsx("div",{className:"no-results-icon",children:"search_off"}),e.jsx("h3",{children:"No results found"}),e.jsx("p",{children:"Try different keywords or check your spelling"}),e.jsx("button",{className:"clear-search-btn",onClick:()=>G(""),children:"Clear search"})]});return e.jsxs("div",{className:`docs-page orientation-${v}`,children:[U&&E&&e.jsx("div",{className:"orientation-feedback",children:e.jsxs("div",{className:"orientation-feedback-content",children:[e.jsx("span",{className:"orientation-feedback-icon",children:"screen_rotation"}),e.jsx("h3",{children:"Orientation Changed"}),e.jsxs("p",{children:["Content layout optimized for ",v," view."]})]})}),e.jsxs("div",{className:`docs-container ${C?"mobile-nav-open":""}`,children:[E&&e.jsx("button",{className:`mobile-nav-toggle ${C?"active":""}`,onClick:()=>M(!C),"aria-label":C?"Close navigation menu":"Open navigation menu",children:e.jsx("span",{className:"hamburger-icon",children:C?"close":"menu"})}),e.jsx("aside",{className:`docs-sidebar ${C?"open":""}`,children:e.jsxs("nav",{children:[e.jsx("h3",{children:"Documentation"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx("button",{className:`sidebar-btn overview ${d==="overview"?"active":""}`,onClick:()=>{P("overview"),E&&M(!1)},children:"Overview"})}),e.jsx("li",{children:e.jsx("button",{className:`sidebar-btn core-concepts ${d==="core-concepts"?"active":""}`,onClick:()=>{P("core-concepts"),E&&M(!1)},children:"Core Concepts"})}),e.jsx("li",{children:e.jsx("button",{className:`sidebar-btn syntax ${d==="syntax"?"active":""}`,onClick:()=>{P("syntax"),E&&M(!1)},children:"GLUE Syntax"})}),e.jsx("li",{children:e.jsx("button",{className:`sidebar-btn integration ${d==="mcp"?"active":""}`,onClick:()=>{P("mcp"),E&&M(!1)},children:"MCP Integration"})}),e.jsx("li",{children:e.jsx("button",{className:`sidebar-btn installation ${d==="installation"?"active":""}`,onClick:()=>{P("installation"),E&&M(!1)},children:"Installation"})}),e.jsx("li",{children:e.jsx("button",{className:`sidebar-btn examples ${d==="examples"?"active":""}`,onClick:()=>{P("examples"),E&&M(!1)},children:"Examples"})}),e.jsx("li",{children:e.jsx("button",{className:`sidebar-btn api ${d==="api"?"active":""}`,onClick:()=>{P("api"),E&&M(!1)},children:"API Reference"})})]})]})}),e.jsxs("main",{className:"docs-content",ref:K,children:[E&&e.jsxs("div",{className:`mobile-header orientation-${v}`,children:[e.jsx("h2",{children:a()}),v==="landscape"&&e.jsxs("div",{className:"orientation-message",children:[e.jsx("span",{className:"orientation-icon",children:"screen_rotation"}),e.jsx("span",{className:"orientation-text",children:"Landscape mode enabled"})]})]}),!E&&e.jsx("div",{className:"page-header",children:e.jsxs("div",{className:"breadcrumb",children:[e.jsx("span",{className:"breadcrumb-item",children:"Documentation"}),e.jsx("span",{className:"breadcrumb-current",children:a()})]})}),e.jsxs("div",{className:"docs-search",children:[e.jsx("span",{className:"search-icon"}),e.jsx("input",{type:"text",className:"search-input",placeholder:"Search documentation...",value:k,onChange:_}),k&&e.jsx("button",{className:"clear-search",onClick:()=>G(""),"aria-label":"Clear search",children:"clear"})]}),k&&e.jsx("div",{className:"search-stats",children:e.jsxs("span",{children:[Object.keys(D).length," result",Object.keys(D).length!==1?"s":""," found"]})}),!k&&S(),k&&Object.keys(D).length===0&&e.jsx(I,{}),d==="overview"&&e.jsxs("section",{className:"docs-section",children:[e.jsx("h1",{children:"GLUE Overview"}),e.jsx("p",{className:"docs-lead",children:"GLUE (Generative-AI Linking & Unification Engine) is a framework for building powerful AI applications through composable workflows."}),O("what-is-glue")&&e.jsxs(e.Fragment,{children:[e.jsx(j,{type:"note",title:"Latest Version",children:e.jsx("p",{children:"GLUE 1.5 is now available with enhanced workflow controls and MCP integration."})}),e.jsx("h2",{id:"what-is-glue",children:"What is GLUE?"}),e.jsx("p",{children:c("GLUE provides a declarative syntax for connecting AI models, tools, and systems into cohesive applications. It allows developers to orchestrate complex workflows involving multiple models and tools without getting lost in implementation details.")})]}),O("key-features")&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{id:"key-features",children:"Key Features"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:c("Declarative Syntax")})," - Define your AI application architecture with a clean, readable syntax"]}),e.jsxs("li",{children:[e.jsx("strong",{children:c("Model Orchestration")})," - Connect multiple AI models with specialized roles"]}),e.jsxs("li",{children:[e.jsx("strong",{children:c("Tool Integration")})," - Seamlessly incorporate tools like web search, file operations, and more"]}),e.jsxs("li",{children:[e.jsx("strong",{children:c("Flexible Adhesives")})," - Define how models and tools communicate with configurable connection types"]}),e.jsxs("li",{children:[e.jsx("strong",{children:c("Development Mode")})," - Test and iterate quickly with built-in debugging features"]})]})]}),O("getting-started")&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{id:"getting-started",children:"Getting Started"}),e.jsxs("p",{children:[c("To start building with GLUE, see our")," ",e.jsx("button",{onClick:()=>P("installation"),className:"link-button",children:"Installation Guide"})," ",c("or jump straight to")," ",e.jsx("button",{onClick:()=>P("examples"),className:"link-button",children:"Examples"})," ",c("to see GLUE in action.")]}),e.jsx(j,{type:"tip",title:"Quick Start",children:e.jsxs("p",{children:["Run ",e.jsx("code",{children:c("npm install @glue-ai/core")})," to get started with GLUE in your project."]})})]})]}),d==="core-concepts"&&e.jsxs("section",{className:"docs-section",children:[e.jsx("h1",{children:"Core Concepts"}),e.jsx("p",{className:"docs-lead",children:"Understanding the fundamental building blocks of the GLUE framework."}),O("models")&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{id:"models",children:"Models"}),e.jsx("p",{children:c("Models are the AI agents that power your GLUE applications. Each model can be configured with:")}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:c("Provider")})," - The service providing the model (OpenAI, Anthropic, etc.)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:c("Role")})," - A specific purpose or responsibility the model fulfills"]}),e.jsxs("li",{children:[e.jsx("strong",{children:c("Adhesives")})," - How this model connects to other components"]}),e.jsxs("li",{children:[e.jsx("strong",{children:c("Config")})," - Model-specific settings like temperature, max tokens, etc."]})]}),h(`model researcher {
  provider = anthropic
  role = "Research topics thoroughly"
  adhesives = [glue, velcro]
  config {
    model = "claude-3-opus-20240229"
    temperature = 0.7
    max_tokens = 4000
  }
}`,"models-example")]}),O("tools")&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{id:"tools",children:"Tools"}),e.jsx("p",{children:c("Tools extend your application's capabilities beyond language processing, allowing models to:")}),e.jsxs("ul",{children:[e.jsx("li",{children:c("Search the web for information")}),e.jsx("li",{children:c("Manipulate files and data")}),e.jsx("li",{children:c("Interact with external APIs")}),e.jsx("li",{children:c("Execute code and process results")})]}),e.jsx(j,{type:"warning",title:"Security Note",children:e.jsx("p",{children:"When configuring tools with API access, ensure you properly secure your credentials and follow security best practices."})})]}),O("adhesives")&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{id:"adhesives",children:"Adhesives"}),e.jsx("p",{children:c("Adhesives define how components communicate and share information:")}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:c("Glue")})," - Standard bidirectional communication"]}),e.jsxs("li",{children:[e.jsx("strong",{children:c("Velcro")})," - Context-aware connections with memory"]}),e.jsxs("li",{children:[e.jsx("strong",{children:c("Tape")})," - One-way data transfer with transformation"]}),e.jsxs("li",{children:[e.jsx("strong",{children:c("Staple")})," - Fixed, secure connections for critical data"]})]})]}),O("workflows")&&e.jsxs(e.Fragment,{children:[e.jsx("h2",{id:"workflows",children:"Workflows"}),e.jsx("p",{children:c("The magnetize block orchestrates how models and tools work together, defining:")}),e.jsxs("ul",{children:[e.jsx("li",{children:c("Information flow between components")}),e.jsx("li",{children:c("Processing sequences and dependencies")}),e.jsx("li",{children:c("Error handling and fallback strategies")}),e.jsx("li",{children:c("Output formatting and delivery")})]})]})]}),d==="syntax"&&e.jsxs("section",{className:"docs-section",children:[e.jsx("h1",{children:"GLUE Syntax"}),e.jsx("p",{className:"docs-lead",children:"The GLUE language provides a declarative way to define AI applications."}),e.jsx("h2",{id:"basic-structure",children:"Basic Structure"}),e.jsxs("div",{className:"code-block",children:[e.jsx("pre",{children:e.jsx("code",{dangerouslySetInnerHTML:{__html:'<span style="--indent-level:0;">glue <span class="keyword keyword-glue">app</span> {</span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">name</span> <span class="operator">=</span> <span class="string">"Application Name"</span></span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;<span class="keyword keyword-config">config</span> {</span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">development</span> <span class="operator">=</span> <span class="number">true</span><span class="operator">|</span><span class="number">false</span></span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">sticky</span> <span class="operator">=</span> <span class="number">true</span><span class="operator">|</span><span class="number">false</span></span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;}</span><br><span style="--indent-level:0;">}</span><br><span style="--indent-level:0;"><span class="comment">// Define components</span></span><br><span style="--indent-level:0;"><span class="keyword keyword-model">model</span> modelName { ... }</span><br><span style="--indent-level:0;"><span class="keyword keyword-tool">tool</span> toolName { ... }</span><br><span style="--indent-level:0;"><span class="comment">// Define workflow</span></span><br><span style="--indent-level:0;"><span class="keyword keyword-magnetize">magnetize</span> { ... }</span>'}})}),e.jsx("button",{id:"copy-btn-basic-structure",className:"copy-button",onClick:()=>B(`glue app {
    name = "Application Name"
    config {
        development = true|false
        sticky = true|false
    }
}

// Define components
model modelName { ... }
tool toolName { ... }

// Define workflow
magnetize { ... }`,"basic-structure"),children:"Copy"})]}),e.jsx("h2",{id:"defining-models",children:"Defining Models"}),h(`model researcher {
    provider = openrouter|anthropic|openai
    role = "Research topics online"
    adhesives = [glue, velcro]
    config {
        model = "model-name"
        temperature = 0.7
        max_tokens = 2000
    }
}`,"model-definition"),e.jsx("h2",{id:"defining-tools",children:"Defining Tools"}),h(`tool web_search {
    provider = serp|tavily
    config {
        api_key = "key" // Environment variables recommended
        max_results = 5
    }
}

tool file_handler {
    config {
        base_path = "./workspace"
        permissions = "read-write"
    }
}`,"tool-definition"),e.jsx("h2",{id:"workflow-orchestration",children:"Workflow Orchestration"}),h(`magnetize {
    input -> researcher
    researcher -> [web_search, code_interpreter]
    web_search -> fact_checker
    fact_checker -> output
}`,"workflow-definition")]}),d==="mcp"&&e.jsxs("section",{className:"docs-section",children:[e.jsx("h1",{children:"MCP Integration"}),e.jsx("p",{className:"docs-lead",children:"Connecting GLUE with Model Control Protocol (MCP) for enhanced control and monitoring."}),e.jsx("h2",{children:"What is MCP?"}),e.jsx("p",{children:"Model Control Protocol provides standardized interfaces for controlling AI model execution, monitoring performance, and ensuring safety features are properly implemented across different providers."}),e.jsx("h2",{children:"Configuration"}),h(`glue app {
    name = "MCP-Enabled App"
    config {
        development = true
        mcp_enabled = true
    }
}

mcp_controller {
    endpoint = "https://mcp-service.example.com"
    auth = "Bearer $MCP_API_KEY"
    features = ["monitoring", "guardrails", "logging"]
}`,"mcp-config"),e.jsx("h2",{children:"Model Integration"}),e.jsx("p",{children:"When MCP is enabled, models can be configured to use MCP for execution control:"}),h(`model assistant {
    provider = mcp_proxy
    target_provider = openai
    role = "Handle user requests"
    config {
        model = "gpt-4"
        guardrails = ["content_safety", "pii_detection"]
        monitoring = true
    }
}`,"mcp-model"),e.jsx("h2",{children:"Benefits"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Standardized Control"})," - Consistent interfaces across providers"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Enhanced Safety"})," - Integrated guardrails and content filtering"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Monitoring"})," - Performance tracking and usage analytics"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Compliance"})," - Data handling policies and audit logs"]})]})]}),d==="installation"&&e.jsxs("section",{className:"docs-section",children:[e.jsx("h1",{children:"Installation Guide"}),e.jsx("p",{className:"docs-lead",children:"Getting started with GLUE is simple. Follow these steps to set up your development environment."}),e.jsx("h2",{children:"Prerequisites"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Node.js 16.x or higher"}),e.jsx("li",{children:"npm 7.x or higher or yarn 1.22.x or higher"}),e.jsx("li",{children:"An API key for your preferred AI model provider(s)"})]}),e.jsx("h2",{children:"NPM Installation"}),h(`# Create a new project directory
mkdir my-glue-app
cd my-glue-app

# Initialize npm
npm init -y

# Install GLUE
npm install @glue-ai/core @glue-ai/cli`,"npm-install"),e.jsx("h2",{children:"Configuration"}),e.jsx("p",{children:"Create a .env file in your project root to store your API keys and configuration:"}),h(`# .env
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
SERP_API_KEY=your_serp_key

# Optional configurations
GLUE_DEBUG=true
GLUE_LOG_LEVEL=info`,"env-config"),e.jsx("h2",{children:"Create Your First App"}),e.jsx("p",{children:"Create a file named app.glue in your project root:"}),h(`glue app {
    name = "Hello World"
    config {
        development = true
    }
}

model assistant {
    provider = openai
    role = "Assistant"
    config {
        model = "gpt-4"
    }
}

magnetize {
    input -> assistant -> output
}`,"first-app"),e.jsx("h2",{children:"Running Your App"}),h(`# Using the CLI
npx glue run app.glue

# Or start in development mode with hot reloading
npx glue dev app.glue`,"run-app")]}),d==="examples"&&e.jsxs("section",{className:"docs-section",children:[e.jsx("h1",{children:"Examples & Use Cases"}),e.jsx("p",{className:"docs-lead",children:"Explore real-world examples of GLUE applications and how they solve different challenges."}),e.jsxs("div",{className:"use-case-grid",children:[e.jsxs("div",{className:`use-case-card ${N==="research"?"show-code":""}`,children:[e.jsxs("div",{className:"use-case-preview",children:[e.jsx("div",{className:"use-case-preview-icon"}),e.jsx("div",{className:"use-case-preview-overlay"})]}),e.jsx("div",{className:"code-status status-basic",children:"Example"}),e.jsxs("div",{className:"use-case-header",children:[e.jsx("h2",{children:"Research Assistant"}),e.jsx("span",{className:"use-case-tag",children:"Research"})]}),e.jsxs("div",{className:"use-case-description",children:[e.jsx("p",{children:"Create a powerful research system with multiple specialized research models, automatic fact-checking and verification, and documentation generation from research findings."}),e.jsxs("ul",{className:"use-case-features",children:[e.jsx("li",{children:"Multiple specialized research models"}),e.jsx("li",{children:"Automatic fact-checking and verification"}),e.jsx("li",{children:"Documentation generation from findings"})]}),e.jsxs("div",{className:"use-case-buttons",children:[e.jsx("button",{className:"view-code-btn",onClick:()=>X("research"),"aria-label":"View Code",children:"View Code"}),e.jsx("button",{className:"view-demo-btn","aria-label":"See Demo",children:"See Demo"})]})]})]}),e.jsxs("div",{className:`use-case-card ${N==="code-gen"?"show-code":""}`,children:[e.jsxs("div",{className:"use-case-preview",children:[e.jsx("div",{className:"use-case-preview-icon"}),e.jsx("div",{className:"use-case-preview-overlay"})]}),e.jsx("div",{className:"code-status status-basic",children:"Example"}),e.jsxs("div",{className:"use-case-header",children:[e.jsx("h2",{children:"Code Generator"}),e.jsx("span",{className:"use-case-tag",children:"Development"})]}),e.jsxs("div",{className:"use-case-description",children:[e.jsx("p",{children:"A multi-model system for software development that handles architecture design, code generation across multiple files, and testing with built-in quality assurance."}),e.jsxs("ul",{className:"use-case-features",children:[e.jsx("li",{children:"Architecture design and planning"}),e.jsx("li",{children:"Multi-file code generation"}),e.jsx("li",{children:"Automated testing and validation"})]}),e.jsxs("div",{className:"use-case-buttons",children:[e.jsx("button",{className:"view-code-btn",onClick:()=>X("code-gen"),"aria-label":"View Code",children:"View Code"}),e.jsx("button",{className:"view-demo-btn","aria-label":"See Demo",children:"See Demo"})]})]})]}),e.jsxs("div",{className:`use-case-card ${N==="content"?"show-code":""}`,children:[e.jsxs("div",{className:"use-case-preview",children:[e.jsx("div",{className:"use-case-preview-icon"}),e.jsx("div",{className:"use-case-preview-overlay"})]}),e.jsx("div",{className:"code-status status-basic",children:"Example"}),e.jsxs("div",{className:"use-case-header",children:[e.jsx("h2",{children:"Content Pipeline"}),e.jsx("span",{className:"use-case-tag",children:"Content"})]}),e.jsxs("div",{className:"use-case-description",children:[e.jsx("p",{children:"Create efficient content workflows with research, content creation, editing, fact verification, and publishing in a streamlined process."}),e.jsxs("ul",{className:"use-case-features",children:[e.jsx("li",{children:"Research and initial drafting"}),e.jsx("li",{children:"Editorial review and improvement"}),e.jsx("li",{children:"Fact-checking and publishing"})]}),e.jsxs("div",{className:"use-case-buttons",children:[e.jsx("button",{className:"view-code-btn",onClick:()=>X("content"),"aria-label":"View Code",children:"View Code"}),e.jsx("button",{className:"view-demo-btn","aria-label":"See Demo",children:"See Demo"})]})]})]})]})]}),d==="api"&&e.jsxs("section",{className:"docs-section",children:[e.jsx("h1",{children:"API Reference"}),e.jsx("p",{className:"docs-lead",children:"Comprehensive reference for the GLUE API, including all available configuration options."}),e.jsx("h2",{children:"Application Configuration"}),e.jsxs("div",{className:"code-block",children:[e.jsx("pre",{children:e.jsx("code",{dangerouslySetInnerHTML:{__html:'<span style="--indent-level:0;">glue app {</span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">name</span> <span class="operator">=</span> string                  <span class="comment">// Application name</span></span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;<span class="keyword keyword-config">config</span> {</span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">development</span> <span class="operator">=</span> boolean      <span class="comment">// Enable development mode</span></span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">sticky</span> <span class="operator">=</span> boolean           <span class="comment">// Persist state between runs</span></span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">debug</span> <span class="operator">=</span> boolean            <span class="comment">// Enable debug logging</span></span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">log_level</span> <span class="operator">=</span> string         <span class="comment">// "debug" | "info" | "warn" | "error"</span></span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">max_history</span> <span class="operator">=</span> number       <span class="comment">// Max conversation turns to retain</span></span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">mcp_enabled</span> <span class="operator">=</span> boolean      <span class="comment">// Enable MCP integration</span></span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;}</span><br><span style="--indent-level:0;">}</span>'}})}),e.jsx("button",{id:"copy-btn-app-config",className:"copy-button",onClick:()=>B(`glue app {
    name = string                  // Application name
    config {
        development = boolean      // Enable development mode
        sticky = boolean           // Persist state between runs
        debug = boolean            // Enable debug logging
        log_level = string         // "debug" | "info" | "warn" | "error"
        max_history = number       // Max conversation turns to retain
        mcp_enabled = boolean      // Enable MCP integration
    }
}`,"app-config"),children:"Copy"})]}),e.jsx("h2",{children:"Model Configuration"}),e.jsxs("div",{className:"code-block",children:[e.jsx("pre",{children:e.jsx("code",{dangerouslySetInnerHTML:{__html:`<span style="--indent-level:0;">model name {</span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">provider</span> <span class="operator">=</span> string             <span class="comment">// Model provider</span></span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">role</span> <span class="operator">=</span> string                 <span class="comment">// Description of model's purpose</span></span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">adhesives</span> <span class="operator">=</span> [string]          <span class="comment">// Array of connection types</span></span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;<span class="keyword keyword-config">config</span> {</span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">model</span> <span class="operator">=</span> string            <span class="comment">// Specific model to use</span></span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">temperature</span> <span class="operator">=</span> number      <span class="comment">// 0.0 to 1.0</span></span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">max_tokens</span> <span class="operator">=</span> number       <span class="comment">// Maximum response length</span></span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">top_p</span> <span class="operator">=</span> number            <span class="comment">// 0.0 to 1.0</span></span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">top_k</span> <span class="operator">=</span> number            <span class="comment">// Integer value</span></span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">presence_penalty</span> <span class="operator">=</span> number <span class="comment">// -2.0 to 2.0</span></span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">frequency_penalty</span> <span class="operator">=</span> number <span class="comment">// -2.0 to 2.0</span></span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">stop</span> <span class="operator">=</span> [string]           <span class="comment">// Array of stop sequences</span></span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;}</span><br><span style="--indent-level:0;">}</span>`}})}),e.jsx("button",{id:"copy-btn-model-config",className:"copy-button",onClick:()=>B(`model name {
    provider = string             // Model provider
    role = string                 // Description of model's purpose
    adhesives = [string]          // Array of connection types
    config {
        model = string            // Specific model to use
        temperature = number      // 0.0 to 1.0
        max_tokens = number       // Maximum response length
        top_p = number            // 0.0 to 1.0
        top_k = number            // Integer value
        presence_penalty = number // -2.0 to 2.0
        frequency_penalty = number // -2.0 to 2.0
        stop = [string]           // Array of stop sequences
    }
}`,"model-config"),children:"Copy"})]}),e.jsx("h2",{children:"Tool Configuration"}),e.jsxs("div",{className:"code-block",children:[e.jsx("pre",{children:e.jsx("code",{dangerouslySetInnerHTML:{__html:'<span style="--indent-level:0;">tool name {</span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">provider</span> <span class="operator">=</span> string              <span class="comment">// Tool provider if applicable</span></span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;<span class="keyword keyword-config">config</span> {</span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">// Provider-specific configuration</span></span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">// Examples:</span></span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">api_key</span> <span class="operator">=</span> string</span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">endpoint</span> <span class="operator">=</span> string</span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">max_results</span> <span class="operator">=</span> number</span><br><span style="--indent-level:2;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="property">timeout</span> <span class="operator">=</span> number</span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;}</span><br><span style="--indent-level:0;">}</span>'}})}),e.jsx("button",{id:"copy-btn-tool-config",className:"copy-button",onClick:()=>B(`tool name {
    provider = string              // Tool provider if applicable
    config {
        // Provider-specific configuration
        // Examples:
        api_key = string
        endpoint = string
        max_results = number
        timeout = number
    }
}`,"tool-config"),children:"Copy"})]}),e.jsx("h2",{children:"Workflow Configuration"}),e.jsxs("div",{className:"code-block",children:[e.jsx("pre",{children:e.jsx("code",{dangerouslySetInnerHTML:{__html:'<span style="--indent-level:0;"><span class="keyword keyword-magnetize">magnetize</span> {</span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">// Flow definitions</span></span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;component1 <span class="operator">-></span> component2      <span class="comment">// Direct flow</span></span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;component1 <span class="operator">-></span> [comp2, comp3]  <span class="comment">// Parallel flow</span></span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;[comp1, comp2] <span class="operator">-></span> component3  <span class="comment">// Join flow</span></span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">// With transformations</span></span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;component1 <span class="operator">-></span> { extract_data } <span class="operator">-></span> component2</span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">// With conditions</span></span><br><span style="--indent-level:1;">&nbsp;&nbsp;&nbsp;&nbsp;component1 <span class="operator">-></span> if(condition) <span class="operator">-></span> component2 : component3</span><br><span style="--indent-level:0;">}</span>'}})}),e.jsx("button",{id:"copy-btn-workflow-config",className:"copy-button",onClick:()=>B(`magnetize {
    // Flow definitions
    component1 -> component2      // Direct flow
    component1 -> [comp2, comp3]  // Parallel flow
    [comp1, comp2] -> component3  // Join flow
    
    // With transformations
    component1 -> { extract_data } -> component2
    
    // With conditions
    component1 -> if(condition) -> component2 : component3
}`,"workflow-config"),children:"Copy"})]})]})]})]}),e.jsx("button",{className:`scroll-top ${r?"visible":""}`,onClick:n,"aria-label":"Scroll to top",children:e.jsx("span",{style:{fontFamily:"Material Icons",fontSize:"1.5rem"},children:"arrow_upward"})}),e.jsx(pe,{isVisible:J,code:ne,title:ae,filename:((T=W[se])==null?void 0:T.filename)||"code.glue",onClose:le})]})};export{he as D};
