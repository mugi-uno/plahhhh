const connectionsManager = () => {
  let cons = [];

  const send = (con, data) => {
    console.log(`[SEND] ${con.room}/${con.id} : ${data.type}`);
    con.ws.send(JSON.stringify(data));
  };

  const eachRoom = (room, callback, excludePlayerId) => {
    if (!room) return;
    cons.forEach((con) => {
      if (con.room !== room.get('name') || excludePlayerId === con.id) return;
      callback(con);
    });
  };

  const publish = (type, room, excludePlayerId) => {
    // ルーム全体に更新を通知
    eachRoom(room, (con) => {
      send(con, {
        type,
        room: room.toJS()
      });
    }, excludePlayerId);
  };

  const publishUpdate = (...params) => {
    publish('update', ...params);
  };

  return {
    cons: () => cons,
    send,
    eachRoom,
    publish,
    publishUpdate,
    push: (con) => cons.push(con),
    close: (ws) => {
      cons = cons.filter((c) => c.ws !== ws);
    }
  };
};

module.exports = connectionsManager;
