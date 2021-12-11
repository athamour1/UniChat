<template>
  <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn
          v-if="loggedin"
          flat
          @click="drawerLeft = !drawerLeft"
          round
          dense
          icon="menu"
        />
        <q-toolbar-title @click="goToDashboard()">UniChat</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="loggedin"
      v-model="drawerLeft"
      show-if-above
      :width="300"
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
                  class=""
                  v-for="childCategory in parentCategory.child_menus"
                  :key="childCategory.id"
                >
                  <q-item-section>{{ childCategory.title }}</q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
            <q-item @click="goToCalendar()" clickable v-ripple>
              <q-item-section> Calendar </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section> News </q-item-section>
            </q-item>
            <q-separator v-if="profile.role.id == 4" spaced inset size="10px" style="border-radius: 10px" />
            <q-item v-if="profile.role.id == 4" clickable v-ripple @click="goToAdmins()">
              <q-item-section>
                <q-item-label>Admin Panel</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              @click="logout()"
              clickable
              v-ripple
              class="absolute-bottom"
              style="background-color: #4b5769"
            >
              <q-item-section style="color: #bf616a; font-weight: bold">
                Logout
              </q-item-section>
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
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const q = useQuasar();

    const menu = computed({
      get: () => store.state.uniChat.menu,
    });
    const loggedin = computed({
      get: () => store.state.uniChat.loggedin,
    });
    const profile = computed({
      get: () => store.state.uniChat.profile,
    });
    return {
      drawerLeft: ref(false),
      loggedin,
      router,
      menu,
      profile,
      q,
      logout() {
        store.dispatch("uniChat/logout");
        q.notify({
          type: "negative",
          message: "Byeeeee !!!",
          position: "top",
        });
        router.push("/");
      },
      goToCalendar() {
        router.push("/calendar");
      },
      goToDashboard() {
        router.push("/dashboard");
      },
      goToAdmins() {
        router.push("/admin")
      }
    };
  },
  mounted() {
    window.main = this;
  },
};
</script>
