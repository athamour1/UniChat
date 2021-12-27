<template class="flex flex-center full-width">
  <div class="row flex flex-center q-pa-md">
    <div class="col6 flex flex-center q-pa-sm">
      <q-btn color="primary" icon="refresh" label="Refresh" @click="onRefresh()" no-caps rounded />
    </div>
    <div class="col6 flex flex-center q-pa-sm">
      <q-btn
        class="text-red"
        color="primary"
        icon="delete"
        label="Delete all"
        @click="onDeleteAll()"
        no-caps
        rounded
      />
    </div>
  </div>
  <div class="row">
    <q-linear-progress
      v-if="linearProgress"
      stripe
      rounded
      size="20px"
      :value="progress"
      color="negative"
      class="q-mt-sm"
    />
  </div>
  <div class="row full-width">
    <div class="col-12">
      <q-table
        :rows="faculty"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[10, 50, 100]"
        card-class="bg-primary text-white"
      >
        <template #no-data>No Faculty members yet</template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td class :props="props" key="id">{{ props.row.id }}</q-td>
            <q-td class :props="props" key="userName">{{ props.row.username }}</q-td>
            <q-td class :props="props" key="name">{{ props.row.name }}</q-td>
            <q-td class :props="props" key="avatar">
              <q-avatar>
                <q-img :src="props.row.avatar.thumbnail" :ratio="1" spinner-color="white" />
              </q-avatar>
            </q-td>
            <q-td class :props="props" key="delete">
              <q-btn
                color="secondary"
                flat
                icon="delete"
                @click="onDelete(props.row.id)"
                class="text-red"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>
<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const store = useStore();
    const quasar = useQuasar();
    const faculty = computed({
      get: () => store.state.uniChat.faculty,
    });
    const token = computed({
      get: () => store.state.uniChat.token,
    });
    const columns = ref([
      {
        name: "id",
        label: "Id",
        align: "left",
      },
      {
        name: "userName",
        label: "UserName",
        align: "left",
      },
      {
        name: "name",
        label: "Name",
        align: "left",
      },
      {
        name: "avatar",
        label: "Avatar",
        align: "left",
      },
      {
        name: "delete",
        label: "Delete",
        align: "left",
      }
    ]);

    const progress = ref(0)
    const linearProgress = ref(false)
    const loadingTable = ref(false)

    function onDelete(id) {
      let axiosConfig = {
        headers: { Authorization: `Bearer ${token.value}` },
      };
      api.delete('/users/' + id, axiosConfig)
        .then((response) => {
          console.log(response)
          store.commit("uniChat/removeFaculty", response.data);
          quasar.notify({
            message: "Delete user",
            color: "positive",
          });
        })
        .catch((error) => {
          console.log(error)
          quasar.notify({
            message: "An error occurred",
            color: "purple",
            color: "negative",
          });
        })
    }

    function onRefresh() {
      store.dispatch('uniChat/getFaculty', token.value)
    }

    async function onDeleteAll() {
      linearProgress.value = true
      loadingTable.value = true
      let error = false
      let axiosConfig = {
        headers: { Authorization: `Bearer ${token.value}` },
      };
      const usersLength = faculty.value.length
      const step = (100 / usersLength) / 100;
      for (
        let index = 0, length = faculty.value.length;
        index < length;
        index += 1
      ) {
        const response = await api.delete('/users/' + faculty.value[index].id, axiosConfig)
          .then((response) => {
            console.log(response)
            store.commit("uniChat/removeFaculty", response.data);
            progress.value = progress.value + step
          })
          .catch((error) => {
            console.log(error)
          })
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      if (error) {
        quasar.notify({
          message: "An error occurred",
          color: "purple",
          color: "negative",
        });
      } else {
        quasar.notify({
          message: "ALl faculty Users Deleted",
          color: "positive",
        });
      }

      linearProgress.value = false
      loadingTable.value = false

    }

    return {
      store,
      faculty,
      columns,
      token,
      onRefresh,
      onDeleteAll,
      quasar,
      progress,
      linearProgress,
      loadingTable
    }
  }
}
</script>
