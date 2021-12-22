export function setMenu (state, data) {
  state.menu = data
}

export function setLoggedin (state, data) {
  state.loggedin = data
}

export function setProfile (state, data) {
  state.profile = data
}

export function setToken (state, data) {
  state.token = data
}

export function addParentCategory (state, data) {
  state.menu.push(data)
}

export function addChildCategory (state, data) {
  console.log(state.menu[state.menu.findIndex((x) => x.id === data.parent_menu.id)].child_menus.push(data))
}

export function removeuser (state) {
  state.loggedin = false
  state.profile = {}
  state.token = {}
  localStorage.removeItem('token')
}
