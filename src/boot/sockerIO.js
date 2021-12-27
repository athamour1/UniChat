import { boot } from 'quasar/wrappers'
import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files

export default boot(async ({app, store, router}) => {
  // something to do
  const connection = SocketIO('https://api.unichat.thanos.fun')
  const socket = new VueSocketIO({
    debug: true,
    connection: connection, //options object is Optional
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
  app.use(
    socket
  );
  app.provide('socket', connection)
})
