<template class="flex flex-center">
  <div class="row">
    <div class="col-6 flex flex-center q-pa-md">
      <div class="col-6 flex flex-center">
        <q-btn
          color="primary"
          icon="search"
          :label="'Generate ' + numberOfUsers + ' New Random Users'"
          @click="getRandomUsers()"
          no-caps
        />
      </div>
      <div class="col-2" />
      <div class="col-4 flex flex-center">
        <q-input
          style="height: 36 !important"
          rounded
          outlined
          v-model="numberOfUsers"
          type="number"
          label="Number of New Users"
        />
      </div>
    </div>
    <div class="col-6 flex flex-center q-pa-md">
      <q-btn
        color="primary"
        icon="check"
        label="Cretae The  New Random Users"
        @click="getRandomUsers()"
        no-caps
      />
    </div>
  </div>
  <q-table
    :rows="newUsers"
    :columns="columns"
    row-key="id"
    :rows-per-page-options="[40]"
  >
    <template #no-data>Click the button above to generate some users</template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td class="" :props="props" key="id">
          {{ props.row.id }}
        </q-td>
        <q-td class="" :props="props" key="name">
          {{ props.row.name }}
        </q-td>
        <q-td class="" :props="props" key="email">
          {{ props.row.email }}
        </q-td>
        <q-td class="" :props="props" key="userName">
          {{ props.row.userName }}
        </q-td>
        <q-td class="" :props="props" key="password">
          {{ props.row.password }}
        </q-td>
        <q-td class="" :props="props" key="avatar">
          <div class="q-pa-md q-gutter-sm">
            <q-avatar>
              <q-img
                :src="props.row.avatar.thumbnail"
                :ratio="1"
                spinner-color="white"
              />
            </q-avatar>
          </div>
        </q-td>
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

    const newUsers = ref([]);
    const numberOfUsers = ref(0);
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
        name: "userName",
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
      },
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
            obj.name =
              response.data.results[index].name.title +
              " " +
              response.data.results[index].name.first +
              " " +
              response.data.results[index].name.last;
            obj.email = response.data.results[index].email;
            obj.userName = response.data.results[index].login.username;
            obj.password = response.data.results[index].login.password;
            obj.avatar = response.data.results[index].picture;
            obj.category = getRandomInt(menu.value.length);
            newUsers.value.push(obj);
            obj = {};
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return {
      columns,
      getRandomUsers,
      quasar,
      store,
      numberOfUsers,
      newUsers,
    };
  },
  mounted() {
    window.createMassUsers = this;
  }
};
</script>
