export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Telegram-Init-Data"
    };
    if (request.method === "OPTIONS") return new Response(null,{headers:cors});
    try {
      if (url.pathname === "/api/health") return json({ok:true,service:"zyro-api",version:"1.0.0"},cors);
      if (url.pathname === "/api/tasks") {
        const rows = await env.DB.prepare("SELECT id,title,description,points,type,url,active FROM tasks WHERE active=1 ORDER BY id").all();
        return json({tasks:rows.results},cors);
      }
      if (url.pathname === "/api/leaderboard") {
        const rows = await env.DB.prepare("SELECT display_name,points FROM users ORDER BY points DESC LIMIT 50").all();
        return json({leaderboard:rows.results},cors);
      }
      if (url.pathname === "/api/checkin" && request.method === "POST") {
        return json({ok:false,message:"Telegram verification and authenticated user session must be connected before check-in is enabled."},cors,501);
      }
      return json({ok:false,message:"Not found"},cors,404);
    } catch (e) {
      return json({ok:false,error:"Internal server error"},cors,500);
    }
  }
};
function json(data,extra={},status=200){return new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8",...extra}})}
