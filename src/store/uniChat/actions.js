import { api } from 'boot/axios'

export function getMenu ({commit}) {
  api.get('https://api.unichat.thanos.fun/parent-menus')
    .then(response => {
      // console.log('Response :', response);
      commit('setMenu', response.data);
    })
    .catch(error => {
      console.log('Error :', error);
    })
}
