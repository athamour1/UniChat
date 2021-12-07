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
          <q-list class="menuExpansion">
            <q-expansion-item
              :label="parentCategory.title"
              v-for="parentCategory in menu"
              :key="parentCategory.id"
            >
              <q-list class="menuExpansionItem">
                <q-item
                  clickable
                  v-ripple
                  bordered
                  v-for="childCategory in parentCategory.child_menus"
                  :key="childCategory.id"
                >
                  <q-item-section>{{ childCategory.title }}</q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
            <q-item clickable v-ripple>
              <q-item-section> Callendar </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section> News </q-item-section>
            </q-item>
          </q-list>
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
    const store = useStore();
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
