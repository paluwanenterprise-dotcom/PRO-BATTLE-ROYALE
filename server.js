const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 10000;
const server = http.createServer((req, res) => {
  if (req.url === '/health' || req.url === '/') {
    res.writeHead(200, {'content-type':'application/json'});
    return res.end(JSON.stringify({ok:true, game:'PRO BATTLE ROYALE', onlinePlayers: players.size}));
  }
  res.writeHead(404); res.end('Not found');
});
const wss = new WebSocket.Server({server, path:'/ws'});
const players = new Map();
let nextId = 1;

wss.on('connection', (socket) => {
  const id = `p${nextId++}`;
  players.set(id, {x:0, z:0, yaw:0});
  socket.send(JSON.stringify({type:'welcome', id}));
  socket.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw.toString()); } catch { return; }
    const p = players.get(id);
    if (!p || msg.type !== 'move') return;
    const x = Number(msg.x), z = Number(msg.z), yaw = Number(msg.yaw);
    if (Number.isFinite(x)) p.x = Math.max(-22, Math.min(22, x));
    if (Number.isFinite(z)) p.z = Math.max(-22, Math.min(22, z));
    if (Number.isFinite(yaw)) p.yaw = yaw;
  });
  const remove = () => players.delete(id);
  socket.on('close', remove);
  socket.on('error', remove);
});

const broadcast = setInterval(() => {
  const payload = JSON.stringify({type:'state', players:Object.fromEntries(players)});
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) client.send(payload);
  }
}, 100);

server.listen(PORT, '0.0.0.0', () => console.log(`PRO BATTLE ROYALE server listening on ${PORT}`));
process.on('SIGTERM', () => { clearInterval(broadcast); wss.close(); server.close(() => process.exit(0)); });
