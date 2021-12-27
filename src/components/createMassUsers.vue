<template class="flex flex-center">
  <div class="row">
    <div class="col-6 flex flex-center q-pa-md">
      <div class="col-6 flex flex-center">
        <q-btn
          rounded
          color="primary"
          icon="search"
          :label="'Generate ' + numberOfUsers + ' New Random Users'"
          @click="getRandomUsers()"
          no-caps
        />
      </div>
      <div class="col-2" />
      <div class="col-4 flex flex-center q-pl-md">
        <q-input
          style="height: 36 !important"
          rounded
          dense
          outlined
          v-model="numberOfUsers"
          type="number"
          label="Number of New Users"
          dark
        />
      </div>
    </div>
    <div class="col-6 flex flex-center q-pa-md">
      <q-btn
        rounded
        color="primary"
        icon="check"
        label="Create The New Random Users"
        @click="createNewUsers()"
        no-caps
      />
    </div>
  </div>
  <q-linear-progress
    v-if="linearProgress"
    stripe
    rounded
    size="20px"
    :value="progress"
    color="negative"
    class="q-mt-sm"
  />
  <q-table
    :rows="newUsers"
    :columns="columns"
    row-key="id"
    :rows-per-page-options="[40]"
    :loading="loadingTable"
    card-class="bg-primary text-white"
  >
    <template #no-data>Click the button above to generate some users</template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td class :props="props" key="id">{{ props.row.id }}</q-td>
        <q-td class :props="props" key="name">{{ props.row.name }}</q-td>
        <q-td class :props="props" key="email">{{ props.row.email }}</q-td>
        <q-td class :props="props" key="username">{{ props.row.username }}</q-td>
        <q-td class :props="props" key="password">{{ props.row.password }}</q-td>
        <q-td class :props="props" key="avatar">
          <div class="q-pa-md q-gutter-sm">
            <q-avatar>
              <q-img :src="props.row.avatar.thumbnail" :ratio="1" spinner-color="white" />
            </q-avatar>
          </div>
        </q-td>
        <q-td class :props="props" key="child_menus">{{ props.row.child_menus }}</q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { ref, computed } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useStore } from "vuex";

export default {
  // name: 'ComponentName',
  setup() {
    const quasar = useQuasar();
    const store = useStore();

    const progress = ref(0)
    const linearProgress = ref(false)
    const loadingTable = ref(false)

    const newUsers = ref([]);
    const numberOfUsers = ref(10);
    const columns = ref([
      {
        name: "id",
        label: "Id",
        align: "left",
      },
      {
        name: "name",
        label: "Name",
        align: "left",
      },
      {
        name: "email",
        label: "Email",
        align: "left",
      },
      {
        name: "username",
        label: "Username",
        align: "left",
      },
      {
        name: "password",
        label: "Password",
        align: "left",
      },
      {
        name: "avatar",
        label: "Avatar",
        align: "left",
      }
    ]);

    const menu = computed({
      get: () => store.state.uniChat.menu,
    });
    function getRandomUsers() {
      let url =
        "https://randomuser.me/api/?nat=gb&results=" +
        numberOfUsers.value +
        "&password=upper,lower,number,16";
      api
        .get(url)
        .then((response) => {
          newUsers.value = [];
          let obj = {};
          for (let index = 0; index < response.data.results.length; index++) {
            obj.id = index;
            obj.email = response.data.results[index].email;
            obj.username = response.data.results[index].login.username;
            obj.password = response.data.results[index].login.password;
            obj.avatar = response.data.results[index].picture;
            obj.name = response.data.results[index].name.title + ' ' + response.data.results[index].name.first + ' ' + response.data.results[index].name.last
            let randomParent = Math.floor(Math.random() * menu.value.length);
            obj.child_menu =
              menu.value[randomParent].child_menus[
                Math.floor(
                  Math.random() * menu.value[randomParent].child_menus.length
                )
              ].id;
            newUsers.value.push(obj);
            //console.log(response.data.results[index].name.title + ' ' + response.data.results[index].name.first + ' ' + response.data.results[index].name.last)
            obj = {};
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    async function createNewUsers() {
      linearProgress.value = true
      loadingTable.value = true
      let error = false
      const usersLength = newUsers.value.length
      const step = (100 / usersLength) / 100;
      for (
        let index = 0, length = newUsers.value.length;
        index < length;
        index += 1
      ) {
        const response = await api
          .post(
            "https://api.unichat.thanos.fun/auth/local/register",
            newUsers.value[index]
          )
          .then((response) => {
            // console.log(response);
            progress.value = progress.value + step
            console.log('progress: ', progress.value)
          })
          .catch((error) => {
            // console.log(error);
            error = true
          });
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      if (error) {
        quasar.notify({
          message: "An error occurred",
          color: "purple",
          color: "negative",
        });
      } else {
        quasar.notify({
          message: "Random Users Created Successfully",
          color: "positive",
        });
      }

      linearProgress.value = false
      loadingTable.value = false

    }

    return {
      columns,
      getRandomUsers,
      quasar,
      store,
      numberOfUsers,
      newUsers,
      menu,
      createNewUsers,
      linearProgress,
      progress,
      loadingTable
    };
  },
  mounted() {
    window.createMassUsers = this;
  },
};
</script>
