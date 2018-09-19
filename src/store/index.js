import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    userinfo:{
      username:'',
      avatar:'',
      desc:'',
      nickname:'',
    },
    userdetail:{
      username:'',
      avatar:'',
      desc:'',
      nickname:'',
      email:''
    },
    classData:{
      title:'',
      icon:'',
      index:'',
      _id:''
    }
  },
  mutations:{
    CHANGE_USERINFO(state,userinfo){
      state.userinfo = userinfo
    },
    CHANGE_CLASSDATA(state,classdata){
      state.classData = classdata
    },
    CHANGE_USERDETAIL(state,userdetail){
      state.userdetail = userdetail
    }
  },
  actions:{},
  plugins: [createPersistedState({
    storage: {
      getItem: key => sessionStorage.getItem(key),
      setItem: (key, value) => sessionStorage.setItem(key, value),
      removeItem: key => sessionStorage.removeItem(key),
    },
  })
  ]
})

export default store
