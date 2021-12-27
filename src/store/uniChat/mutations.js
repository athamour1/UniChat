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

export function setAuditLog (state, data) {
  state.auditLog = data
}

export function setFaculty (state, data) {
  state.faculty = data
}

export function addFaculty (state, data) {
  state.faculty.push(data)
}

export function removeFaculty (state, data) {
  const index = state.faculty.findIndex((x) => x.id === data.id)
  state.faculty.splice(index, 1)
}

export function addAuditLog (state, data) {
  state.auditLog.push(data)
}

export function addChildCategory (state, data) {
  const index = state.menu.findIndex((x) => x.id === data.parent_menu.id)
  console.log(index)
  state.menu[index].child_menus.push(data)
}

export function removeParentCategory (state, data) {
  const index = state.menu.findIndex((x) => x.id === data.id)
  state.menu.splice(index, 1)
}

export function removeChildCategory (state, data) {
  const indexParent = state.menu.findIndex((x) => x.id === data.parent_menu.id)
  const index = state.menu[indexParent].child_menus.findIndex((x) => x.id === data.id)
  state.menu[indexParent].child_menus.splice(index, 1)
}

export function removeuser (state) {
  state.loggedin = false
  state.profile = {}
  state.token = {}
  localStorage.removeItem('token')
}
