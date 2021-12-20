<template>
  <q-page>
    <q-tabs
      v-model="tab"
      dense
      class="text-white"
      style="background-color: #3a4251"
      active-color="white"
      indicator-color="primary"
      align="justify"
    >
      <q-tab name="1" label="Audit Log" no-caps />
      <q-tab name="2" label="Create Users" no-caps />
      <q-tab name="3" label="Edit Categories" no-caps />
    </q-tabs>

    <q-tab-panels
      v-model="tab"
      animated
      class="text-white"
      style="background-color: #424c5d"
    >
      <q-tab-panel name="1">
        <auditLogTable />
      </q-tab-panel>

      <q-tab-panel name="2">
        <createMassUsers />
      </q-tab-panel>

      <q-tab-panel name="3">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { ref } from 'vue'

import auditLogTable from "components/auditLogTable.vue"
import createMassUsers from "components/createMassUsers.vue"

export default {
  components: {
    auditLogTable,
    createMassUsers
  },
  setup() {
    const tab = ref('1')
    return {
      tab
    }
  }
};
</script>
