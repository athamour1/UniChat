<template>
  <q-table
    :rows="auditLogs"
    :columns="columns"
    row-key="id"
    :rows-per-page-options="[50, 100]"
    card-class="bg-primary text-white"
  >
    <template #no-data> No Audit Log yet </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td class="" :props="props" key="experiencePhoto">
          <!-- <div class="q-pa-md q-gutter-sm">
            <q-avatar>
              <q-img
                :src="
                  'https://api.classy-project.eu' +
                  props.row.experiences.Media[0].formats.thumbnail.url
                "
                :ratio="1"
                spinner-color="white"
              />
            </q-avatar>
          </div> -->
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>

import { ref } from 'vue'

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
        name: "dateTime",
        label: "Date & Time",
        align: "left",
      },
      {
        name: "userId",
        label: "userId",
        align: "left",
      },
      {
        name: "imp",
        label: "Title",
        align: "left",
      },
      {
        name: "title",
        label: "Title",
        align: "left",
      }
    ]);

    return {
      auditLogs,
      columns,
    };
  },
};
</script>
