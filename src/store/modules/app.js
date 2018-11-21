import * as types from '../mutation-types';

const state = {
  device: {
    isMobile: false,
    isTablet: false
  },
  sidebar: {
    opened: false,
    hidden: false
  },
  effect: {
    translate3d: true
  },
  patient: {
    selected: false
  },
  lang: 'en'
};

const mutations = {
  [types.TOGGLE_DEVICE] (state, device) {
    state.device.isMobile = device === 'mobile';
    state.device.isTablet = device === 'tablet';
  },

  [types.TOGGLE_SIDEBAR] (state, opened) {
    if (state.device.isMobile) {
      state.sidebar.opened = opened;
    } else {
      state.sidebar.opened = true;
    }
  },

  [types.SWITCH_EFFECT] (state, effectItem) {
    for (let name in effectItem) {
      state.effect[name] = effectItem[name];
    }
  },

  [types.selected_patient] (state, data) {
    if (data && data.selected) {
      document.getElementsByTagName('body')[0].classList.remove('sidebar-hidden');
    } else {
      document.getElementsByTagName('body')[0].classList.add('sidebar-hidden');
    }
    state.patient = data;
  },

  [types.lang] (state, lang) {
    if (state.lang === 'tr') {
      state.lang = 'en';
    } else {
      state.lang = 'tr';
    }
  }

};

export default {
  state,
  mutations
};
