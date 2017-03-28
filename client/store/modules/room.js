import router from '../../router/';
import * as types from '../mutation-types';
import 'whatwg-fetch';

const defaultState = {
  name: '',
  lock: false,
  password: '',
  myself: {
    id: '',
    name: '',
    token: '',
    point: null,
  },
  players: [],
  joining: false,
  status: 'thinking',
  result: '',
  average: 0,
};

const state = { ...defaultState };

const getters = {};

const actions = {
  in ({ commit }, room) {
    router.push({ name: 'room', params: { room } });
  },

  async fetch ({ commit }, { room }) {
    commit(types.ROOM_INITIALIZE);

    const res = await fetch(`/api/v1/room/${room}`);
    if (res.ok) {
      commit(types.ROOM_LOAD, await res.json());
    } else {
      router.push({ name: 'notfound' });
    }
  },

  join ({ commit }, { name }) {
    commit(types.ROOM_JOIN_REQ, { room: state.name, name });
  },

  start: ({ commit }) => commit(types.ROOM_GAME_START_REQ, { room: state.name }),
  open: ({ commit }) => commit(types.ROOM_GAME_OPEN_REQ, { room: state.name }),

  pointSelect: ({ commit }, { point }) => commit(types.POINT_SELECT, point)
};

const mutations = {
  [types.ROOM_INITIALIZE]: (state) => {
    return Object.assign(state, defaultState);
  },
  [types.ROOM_LOAD]: (state, room) => {
    return Object.assign(state, room);
  },

  [types.POINT_SELECT]: (state, point) => {
    state.myself.point = point;
  },

  // websocket request actions
  ...[
    types.ROOM_JOIN_REQ,
    types.ROOM_GAME_START_REQ,
    types.ROOM_GAME_OPEN_REQ,
  ].reduce((v, k) => { v[k] = () => {}; return v; }, {}),

  [types.ROOM_JOIN_RES]: (state, { room, player }) => {
    state.players = room.players;
    state.myself = player;
    state.joining = true;
  },

  [types.ROOM_UPDATE]: (state, { room }) => {
    return Object.assign(state, room);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
