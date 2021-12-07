export function setMenu (state, data) {
  state.menu = data
}

export function setLoggedin (state, data) {
  state.loggedin = data
}

export function setProfile (state, data) {
  state.profile = data
}

export function removeuser (state) {
  state.loggedin = false
  state.profile = {}
  localStorage.removeItem('token')
}
