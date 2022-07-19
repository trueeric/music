import { createStore } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';
// WATCH OUT!! dependency cycle
// import router from '@/router';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
      // console.log(state.Proxy);
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  getters: {
    // authModalShow: (state) => state.authModalShow,
  },
  actions: {
    async register({ commit }, payload) {
      const userCred = await auth.createUserWithEmailAndPassword(payload.email, payload.password);
      // await auth.createUserWithEmailAndPassword(payload.email, payload.password);

      // await usersCollection.add({
      // .add 改成.set
      await usersCollection.doc(userCred.user.uid).set({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
        genre: payload.genre,
      });

      await userCred.user.updateProfile({
        displayName: payload.name,
      });

      // this.$store.commit('toggleAuth');
      // 使用actions另行匯出，可將this.$store去除
      commit('toggleAuth');
    },
    async login({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);

      commit('toggleAuth');
    },
    init_login({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit('toggleAuth');
      }
    },
    // async signout({ commit }) {
    //   await auth.signOut();

    //   commit('toggleAuth');
    // },

    async signout({ commit }, payload) {
      await auth.signOut();
      console.log(payload.route);
      console.log('kk');
      console.log(payload.route.meta.requireAuth);

      commit('toggleAuth');

      // redirect homepage
      if (payload.route.meta.requireAuth) {
        payload.router.push({ name: 'home' });
      }
    },
  },
});
