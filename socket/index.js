const WebSocket = require('ws');
const store = require('../store');
const connectionsManager = require('./lib/connectionsManager');

const cm = connectionsManager();

// Event Listener
const onMessages = {
  join: ({ room: roomName, name }, con) => {
    const player = store.join(roomName, name);
    const room = store.findOrCreate(roomName);

    // TODO:破壊的変更なので気持ち悪い
    con.id = player.get('id');
    con.room = roomName;

    // 参加を送信
    cm.send(con, {
      type: 'join',
      player: player.toJS(),
      room: room.toJS(),
    });

    // 部屋全体を更新
    cm.publishUpdate(room, con.id);
  },

  leave: ({ room, id }) => cm.publishUpdate(store.leave(room, id), id),
  start: ({ room }) => cm.publish('start', store.startGame(room)),
  open: ({ room }) => cm.publishUpdate(store.openGame(room)),
  pointSelect: ({ point }, con) => cm.publishUpdate(store.pointSelect(con.room, con.id, point)),
};

const connection = (ws) => {
  const con = { ws };

  cm.push(con);

  ws.on('close', () => cm.close(ws));
  ws.on('message', (e) => {
    const data = JSON.parse(e);
    const callback = onMessages[data.type];

    if (callback) {
      callback(data, con);
    } else {
      cm.send(con, { error: true });
    }
  });

  let interval;
  const healthCheck = () => {
    try {
      ws.ping();
    } catch (e) {
      clearInterval(interval);
      cm.close(ws);
      onMessages.leave(con);
    }
  };
  interval = setInterval(healthCheck, 1000);
};

const activate = (server) => {
  const wss = new WebSocket.Server({ server });
  wss.on('connection', connection);
};

module.exports.activate = activate;
