<template>
  <q-table
    :rows="auditLog"
    :columns="columns"
    row-key="id"
    :rows-per-page-options="[50, 100]"
    card-class="bg-primary text-white"
  >
    <template #no-data>No Audit Log yet</template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td class :props="props" key="id">{{ props.row.id }}</q-td>
        <q-td class :props="props" key="title">{{ props.row.title }}</q-td>
        <q-td class :props="props" key="dateTime">{{ props.row.dateTime }}</q-td>
        <q-td class :props="props" key="userId">{{ props.row.userId }}</q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script>
import { ref, computed } from 'vue'
import { api } from 'boot/axios'
import { useStore } from 'vuex'

export default {
  // name: 'ComponentName',
  setup() {
    const auditLogs = ref([])
    const columns = ref([
      {
        name: "id",
        label: "Id",
        align: "left",
      },
      {
        name: "title",
        label: "Title",
        align: "left",
      },
      {
        name: "dateTime",
        label: "Date & Time",
        align: "left",
      },
      {
        name: "userId",
        label: "userId",
        align: "left",
      }
    ]);

    const store = useStore();

    const auditLog = computed({
      get: () => store.state.uniChat.auditLog,
    });

    return {
      auditLogs,
      columns,
      auditLog,
      store,
    };
  },
};
</script>
