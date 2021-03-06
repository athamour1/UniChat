/*
   ______   ______   ______  __   ______   __   __         __   ______
  /\  __ \ /\  ___\ /\__  _\/\ \ /\  __ \ /\ "-.\ \       /\ \ /\  ___\
  \ \  __ \\ \ \____\/_/\ \/\ \ \\ \ \/\ \\ \ \-.  \     _\_\ \\ \___  \
   \ \_\ \_\\ \_____\  \ \_\ \ \_\\ \_____\\ \_\\"\_\   /\_____\\/\_____\
    \/_/\/_/ \/_____/   \/_/  \/_/ \/_____/ \/_/ \/_/   \/_____/ \/_____/
*/
import { api } from 'boot/axios'
import { Loading } from 'quasar'

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
    Loading.show()
    const token = localStorage.getItem('token')
    //console.log('token :', token)
    if (token) {
      const vm = this
      api.get('/users/me', { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
          console.log('response :', response)
          commit('setLoggedin', true);
          commit('setProfile', response.data);
          commit('setToken', token)
          // vm.$router.push('/dashboard')
          if (response.data.role.id === 4) {
            dispatch('getAuditLog', token)
          }
          dispatch('getFaculty', token)
          Loading.hide()
          resolve('user re-logged in')
        })
        .catch((error) => {
          // Handle error.
          Loading.hide()
          commit('setLoggedin', false);
          //console.log("An error occurred:", error.response);
        })
    } else {
      // vm.$router.push('/')
      Loading.hide()
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
        commit('setToken', response.data.jwt)
        if (log.st) {
          localStorage.setItem('token', response.data.jwt)
        }
        if (response.data.user.role.id === 4) {
          dispatch('getAuditLog', response.data.jwt)
        }
        dispatch('getFaculty', response.data.jwt)
        resolve('user logged in')
      })
      .catch((error) => {
        //console.log("An error occurred:", error.response);
        reject(error);
      })
  })
}

export function registerRequest({ commit, dispatch }, reg) {
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

export function getAuditLog({ commit, dispatch }, token) {
  api.get('auditlogs', { headers: { "Authorization": `Bearer ${token}` } })
    .then(response => {
      console.log('response: ', response.data)
      commit('setAuditLog', response.data)
    })
    .then(error => {
      console.log('error: ', error)
    })
}

export function getFaculty({ commit, dispatch }, token) {
  api.get('faculty', { headers: { "Authorization": `Bearer ${token}` } })
    .then(response => {
      console.log('response: ', response.data)
      commit('setFaculty', response.data)
    })
    .then(error => {
      console.log('error: ', error)
    })
}

export function SOCKET_conected({ commit, dispatch }, data) {
  console.log(data);
}
