const tg=window.Telegram?.WebApp;if(tg){tg.ready();tg.expand()}
const api=location.origin;
const demo=JSON.parse(localStorage.getItem("zyro_demo")||'{"points":195,"streak":0,"checked":false,"tasks":{}}');
const tasks=[["📣","Follow ZYRO updates",20],["📢","Join community",25],["⭐","Support ZYRO",30],["🔥","Daily activity",15],["🚀","Share ZYRO",35]];
const rewards=[["🥉","Bronze Member",500],["🥈","Silver Member",2000],["🥇","Gold Member",5000]];
function save(){localStorage.setItem("zyro_demo",JSON.stringify(demo))}
function toast(x){const t=document.querySelector("#toast");t.textContent=x;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1600)}
function render(){document.querySelector("#points").textContent=demo.points;document.querySelector("#streak").textContent=`Daily streak: ${demo.streak}`;document.querySelector("#checkin").disabled=demo.checked;document.querySelector("#checkin").textContent=demo.checked?"✓ Checked in today":"✓ Daily check-in +25";
document.querySelector("#tasksList").innerHTML=tasks.map((t,i)=>`<div class="task"><div class="ico">${t[0]}</div><div class="main"><b>${t[1]}</b><small>+${t[2]} points • Beta task</small></div><button data-task="${i}" ${demo.tasks[i]?"disabled":""}>${demo.tasks[i]?"Done":"Start"}</button></div>`).join("");
document.querySelectorAll("[data-task]").forEach(b=>b.onclick=()=>{const i=+b.dataset.task;demo.tasks[i]=1;demo.points+=tasks[i][2];save();render();toast(`+${tasks[i][2]} points`)});
document.querySelector("#rewardsList").innerHTML=rewards.map(r=>`<div class="reward"><div class="ico">${r[0]}</div><div class="main"><b>${r[1]}</b><small>${r[2]} points</small></div><button data-reward="${r[2]}">Claim</button></div>`).join("");
document.querySelectorAll("[data-reward]").forEach(b=>b.onclick=()=>toast(demo.points>=+b.dataset.reward?"Beta claim recorded":"Not enough points"));
document.querySelector("#leaders").innerHTML=[["A","Alpha","2,480"],["Z","ZyroFan","2,150"],["M","Max","1,920"],["Y","You",demo.points.toLocaleString()]].map((r,i)=>`<div class="row"><b>${i+1}</b><div class="avatar">${r[0]}</div><div class="main"><b>${r[1]}</b><small>Beta member</small></div><span class="score">${r[2]}</span></div>`).join("")}
document.querySelectorAll("[data-page]").forEach(b=>b.onclick=()=>{document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));document.querySelector("#"+b.dataset.page).classList.add("active");document.querySelectorAll("nav button").forEach(n=>n.classList.toggle("active",n.dataset.page===b.dataset.page));scrollTo(0,0)});
document.querySelector("#checkin").onclick=()=>{if(demo.checked)return;demo.checked=true;demo.streak++;demo.points+=25;save();render();toast("+25 points")};
document.querySelector("#copy").onclick=async()=>{try{await navigator.clipboard.writeText("ZYRO-DEMO")}catch{}toast("Code copied")};
render();