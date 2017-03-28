const Immutable = require('immutable');
const sha512 = require('sha512');
const uuid = require('uuid/v4');

let state = Immutable.fromJS({});

const GameStatus = {
  open: 'open',
  start: 'start',
};

class Room extends Immutable.Record({
  name: '',
  lock: false,
  password: '',
  players: new Immutable.List(),
  status: GameStatus.start,
  result: '',
  average: 0,
}) {
  mask () {
    return this.update('players', players =>
      players.map(p => p.delete('token'))
    );
  }
}

const Player = Immutable.Record({
  id: '',
  name: '',
  token: '',
  point: null
});

const HASH_KEY = 'HOGEHOGE';

const actions = {
  mask: (room) => room
    .update('players', players =>
      players.map(p => p.delete('token'))
    ),

  // マスクした部屋情報を得る
  // 部屋がなければ作る
  findOrCreate: (roomName) => {
    if (!state.has(roomName)) {
      console.log(`create room >>> [${roomName}]`);
      state = state.set(roomName, new Room({ name: roomName }));
    }

    return state.get(roomName).mask();
  },

  // 部屋に参加する
  join: (roomName, playerName) => {
    console.log(`join room >>> [${roomName}][${playerName}]`);

    let room = state.has(roomName) ? state.get(roomName) : new Room({ name: roomName });

    let player = room.get('players').find(p => p.name === playerName);
    if (!player) {
      const id = uuid();
      player = new Player({
        id,
        name: playerName,
        token: sha512(id + HASH_KEY).toString('hex')
      });
      room = room.update('players', players => players.push(player));
    }

    state = state.set(roomName, room);

    return player;
  },

  // 部屋から退出する
  leave: (roomName, playerId) => {
    console.log(`leave room >>> [${roomName}][${playerId}]`);

    let room = state.get(roomName).update('players', players => players.filter(p => p.get('id') !== playerId));
    state = state.set(roomName, room);

    return room.mask();
  },

  // ゲームを開始する
  startGame: (roomName) => {
    console.log(`start game >>> [${roomName}]`);

    // ゲームを初期状態に更新する
    const room = state.get(roomName)
      .set('status', GameStatus.start)
      .set('average', 0)
      .set('result', '')
      .update('players', players => players.map(p => p.set('point', null)));

    state = state.set(roomName, room);

    return room.mask();
  },

  openGame: (roomName) => {
    console.log(`open game >>> [${roomName}]`);

    // ゲームを初期状態に更新する
    const room = state.get(roomName)
      .set('status', GameStatus.open)
      .set('average', 999)
      .set('result', 'CONSENSUS');

    state = state.set(roomName, room);

    return room.mask();
  },

  pointSelect: (roomName, playerId, point) => {
    // ポイントを更新する
    const room = state.get(roomName)
      .update('players', players =>
        players.map(p => {
          if (p.get('id') !== playerId) return p;
          return p.set('point', point);
        })
      );

    state = state.set(roomName, room);

    return room.mask();
  }
};


module.exports = actions;
