<template>
  <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
        <q-toolbar-title>UniChat</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerLeft"
      show-if-above
      :width="400"
      :breakpoint="1000"
      elevated
      class="bg-secondary text-accent"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
         {{ menu }}
        </div>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore()
    const menu = computed({
      get: () => store.state.uniChat.menu,
    });
    return {
      drawerLeft: ref(false),
      menu,
    };
  },
};
</script>
