import Vue from "vue";
import Vuex, { MutationTree, GetterTree, ActionTree } from "vuex";

Vue.use(Vuex);

export interface State {
  token: string;
  user: object;
}

const state: State = {
  token: null,
  user: null
};

const getters: GetterTree<State, State> = {
  isAuthenticated: state => {
    return !!state.token && !!state.user;
  }
};

const mutations: MutationTree<State> = {
  loadToken(state) {
    state.token = localStorage.getItem("id_token") || null;
    state.user = JSON.parse(localStorage.getItem("user") || null);
  },

  clearToken(state) {
    state.token = null;
    state.user = null;

    localStorage.setItem("id_token", null);
    localStorage.setItem("user", null);
  }
};

const actions: ActionTree<State, State> = {
  authenticate({ commit, state }, arg?: { token: string }) {
    if (arg) {
      localStorage.setItem("id_token", arg.token);
      localStorage.setItem(
        "user",
        decodeURIComponent(
          escape(atob(JSON.parse(atob(arg.token.split(".")[1])).data))
        )
      );
    }

    commit("loadToken");

    if (!state.token || !state.user) {
      return;
    }

    const decode = token => JSON.parse(atob(token.split(".")[1]));
    const payload = decode(state.token);
    const now = Math.floor(new Date().getTime() / 1000);

    // If JWT expired
    if (payload.exp < now) {
      commit("clearToken");
    }
  },

  unauthenticate({ commit }) {
    commit("clearToken");
  }
};

export default new Vuex.Store<State>({
  state,
  getters,
  mutations,
  actions
});
