/*
   ______   ______   ______  __   ______   __   __         __   ______
  /\  __ \ /\  ___\ /\__  _\/\ \ /\  __ \ /\ "-.\ \       /\ \ /\  ___\
  \ \  __ \\ \ \____\/_/\ \/\ \ \\ \ \/\ \\ \ \-.  \     _\_\ \\ \___  \
   \ \_\ \_\\ \_____\  \ \_\ \ \_\\ \_____\\ \_\\"\_\   /\_____\\/\_____\
    \/_/\/_/ \/_____/   \/_/  \/_/ \/_____/ \/_/ \/_/   \/_____/ \/_____/
*/
import { api } from 'boot/axios'

export function getMenu({ commit }) {
  api.get('https://api.unichat.thanos.fun/parent-menus')
    .then(response => {
      // console.log('Response :', response);
      commit('setMenu', response.data);
    })
    .catch(error => {
      //console.log('Error :', error);
    })
}

export function init({ commit, dispatch }, val) {
  return new Promise((resolve, reject) => {

    const token = localStorage.getItem('token')
    //console.log('token :', token)
    if (token) {
      const vm = this
      api.get('/users/me', { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
          //console.log('response :', response)
          commit('setLoggedin', true);
          commit('setProfile', response.data);
          // vm.$router.push('/dashboard')
          resolve('user re-logged in')
        })
        .catch((error) => {
          // Handle error.
          commit('setLoggedin', false);
          //console.log("An error occurred:", error.response);
        })
    } else {
      // vm.$router.push('/')
      resolve('user isnt authneticated');
    }
  })
}
export function authRequest({ commit, dispatch }, log) {
  return new Promise((resolve, reject) => {
    api
      .post("/auth/local", log.log)
      .then((response) => {
        commit('setLoggedin', true);
        commit('setProfile', response.data.user);
        if (log.st) {
          localStorage.setItem('token', response.data.jwt)
        }
        resolve('user logged in')
      })
      .catch((error) => {
        //console.log("An error occurred:", error.response);
        reject(error);
      })
  })
}

export function registerRequest({ commit, dispatch }, reg) {
  const vm = this;
  // ("signup");
  return new Promise((resolve, reject) => {
    api
      .post("/auth/local/register", reg)
      .then(() => {
        resolve('User is Signed Up')
      })
      .catch((error) => {
        //console.log("An error occurred:", error.response);
        reject(error);
      }
      );
  }
  )
}
export function updateprofile({ commit, dispatch }, ch) {
  let head = {
    headers: {
      Authorization:
        'Bearer ' + JWT,
    },
  }
  return new Promise((resolve, reject) => {
    axios
      .put(API_URL + "/updateme", ch, head)
      .then((response) => {
        commit('setprofile', response.data)
        resolve('Changes made for user')
      })
      .catch((error) => {
        // Handle error.
        ("An error occurred:", error.response);
        reject(error);
      })
  })
}

export function logout({ commit, dispatch }, user) {
  return new Promise((resolve, reject) => {
    commit('removeuser', true)
    resolve('user removed')
  })
}
