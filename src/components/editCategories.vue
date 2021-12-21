<template>
  <div class="flex flex-center">
    <div class="column full-height">
      <div class="row full-width">
        <div
          class="
            col-4
            q-pa-md q-gutter-sm
            bg-primary
            text-white
            flex flex-center
          "
        >
          <q-tree
            style="color: white"
            :nodes="menu"
            node-key="title"
            :filter="filter"
            default-expand-all
            no-connectors
            label-key="title"
            children-key="child_menus"
            dark
          />
        </div>
        <div class="col-4 q-pa-md flex flex-center">
          <q-card class="my-card bg-primary">
            <q-card-section> Create an new Parent Category </q-card-section>
            <q-card-section>
              <q-input
                v-model="text"
                type="text"
                label="Title"
                dark
                rounded
                dense
                outlined
              />
            </q-card-section>
            <q-card-section class="flex flex-center">
              <q-btn
                color="primary"
                icon="check"
                label="Create"
                @click="onCategoryParentCreate"
                no-caps
              />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-4 q-pa-md flex flex-center">
          <q-card class="my-card bg-primary">
            <q-card-section> Create an new Child Category </q-card-section>
            <q-card-section class="flex flex-center">
              <q-select
                v-model="selectedCategory"
                :options="menu"
                label="Selected Parent Category"
                option-label="title"
                rounded
                dense
                outlined
                dark
              />
            </q-card-section>
            <q-card-section>
              <q-input
                style="width: 100%"
                v-model="text"
                type="text"
                label="Title"
                dark
                rounded
                dense
                outlined
              />
            </q-card-section>
            <q-card-section class="flex flex-center">
              <q-btn
                color="primary"
                icon="check"
                label="Create"
                @click="onCategoryChildCreate"
                no-caps
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { api } from "boot/axios";

export default {
  setup() {
    const filter = ref("");
    const filterRef = ref(null);
    const store = useStore();
    const menu = computed({
      get: () => store.state.uniChat.menu,
    });
     const mejwtnu = computed({
      get: () => store.state.uniChat.menu,
    });
    const selectedCategory = ref(menu.value[0].title);

    return {
      filter,
      filterRef,
      store,
      menu,
      selectedCategory,
      resetFilter() {
        filter.value = "";
        filterRef.value.focus();
      },
      onCategoryChildCreate() {
        api.post().then((response) => {console.log(response)}).catch((error => {console.log(error)}))
      },
      onCategoryParentCreate() {
        consolo.log("working");
      },
    };
  },
};
</script>
