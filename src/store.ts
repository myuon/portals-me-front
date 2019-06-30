import Vue from "vue";
import Vuex, { MutationTree, GetterTree, ActionTree } from "vuex";
import sdk from "@/app/sdk";

Vue.use(Vuex);

interface State {}

const state: State = {};

const getters: GetterTree<State, State> = {};

const mutations: MutationTree<State> = {};

const actions: ActionTree<State, State> = {};

export default new Vuex.Store<State>({
  state,
  getters,
  mutations,
  actions
});
