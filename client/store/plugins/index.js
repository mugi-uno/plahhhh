import * as types from '../mutation-types';

const type = (t) => `room/${t}`;

const createOnMessageHandler = (store) => (data) => {
  const handlers = {
    join (data) {
      store.commit(type(types.ROOM_JOIN_RES), { room: data.room, player: data.player });
    },
    update (data) {
      store.commit(type(types.ROOM_UPDATE), { room: data.room });
    },
  };

  if (data && data.type && handlers[data.type]) {
    handlers[data.type](data);
  }
};

const socket = (ws, store) => {
  ws.onopen = () => {
    console.log('open!!');
  };

  const handleOnMessage = createOnMessageHandler(store);

  ws.onmessage = (event) => {
    handleOnMessage(JSON.parse(event.data));
  };
};

const WebSocketPlugin = (() => {
  let ws = null;

  const sendActions = {
    [type(types.ROOM_JOIN_REQ)]: (mutation) => ({
      type: 'join',
      room: mutation.payload.room,
      name: mutation.payload.name
    }),
    [type(types.ROOM_GAME_START_REQ)]: (mutation) => ({ type: 'start', room: mutation.payload.room }),
    [type(types.ROOM_GAME_OPEN_REQ)]: (mutation) => ({ type: 'open', room: mutation.payload.room }),
    [type(types.POINT_SELECT)]: (mutation) => ({ type: 'pointSelect', point: mutation.payload }),
  };

  return store => {
    store.subscribe((mutation, state) => {
      // 初期化時にwebsocketを破棄
      if (mutation.type === type(types.ROOM_INITIALIZE)) {
        ws = null;
      }
      // 部屋のロード時にwebsocketを接続
      if (mutation.type === type(types.ROOM_LOAD)) {
        ws = new WebSocket(location.origin.replace(/^http/, 'ws'));
        socket(ws, store);
      }
      // その他は対応するmutation-typeが存在する場合のみ実行
      if (sendActions[mutation.type]) {
        ws.send(JSON.stringify(sendActions[mutation.type](mutation)));
      }
    });
  };
})();

export default WebSocketPlugin;
