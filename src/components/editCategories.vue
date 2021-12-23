<template>
  <div class="flex flex-center">
    <div class="column full-height">
      <div class="row full-width">
        <div class="col-6 q-pa-md q-gutter-sm bg-primary text-white flex flex-center">
          <q-tree
            :nodes="menu"
            node-key="title"
            :filter="filter"
            default-expand-all
            no-connectors
            label-key="title"
            children-key="child_menus"
            dark
            class="adminCategoryTree"
          >
            <template v-slot:default-header="prop">
              <div class="row">
                <q-btn
                  class="text-red q-pa-sm"
                  color="secondary"
                  icon="delete"
                  :label="prop.node.title"
                  no-caps
                  rounded
                  flat
                  @click="onDelete(prop.node.title)"
                />
              </div>
            </template>
          </q-tree>
        </div>
        <div class="col-6 q-pa-md flex flex-center">
          <q-card class="my-card bg-primary">
            <q-card-section>Create an new Parent Category</q-card-section>
            <q-card-section>
              <q-input
                v-model="parentCategoryTitle"
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
                :disabled="parentCategoryTitle === ''"
              />
            </q-card-section>
          </q-card>
          <q-card class="my-card bg-primary">
            <q-card-section>Create an new Child Category</q-card-section>
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
                v-model="childCategoryTitle"
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
                :disabled="childCategoryTitle === ''"
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
import { useQuasar } from "quasar";

export default {
  setup() {
    const filter = ref("");
    const filterRef = ref(null);
    const store = useStore();
    const menu = computed({
      get: () => store.state.uniChat.menu,
    });
    const token = computed({
      get: () => store.state.uniChat.token,
    });
    const selectedCategory = ref(menu.value[0]);
    const parentCategoryTitle = ref("");
    const childCategoryTitle = ref("");
    const quasar = useQuasar();

    return {
      filter,
      filterRef,
      store,
      menu,
      selectedCategory,
      parentCategoryTitle,
      childCategoryTitle,
      token,
      quasar,
      onCategoryChildCreate() {
        let axiosConfig = {
          headers: { Authorization: `Bearer ${token.value}` },
        };
        console.log('selectedCategory: ', selectedCategory.value.title)
        const index = menu.value.findIndex((x) => x.title === selectedCategory.value.title)
        console.log('menu: ', index)
        let obj = {
          title: childCategoryTitle.value,
          parent_menu:
            menu.value[index]
        };
        console.log(obj);
        api
          .post("/child-menus", obj, axiosConfig)
          .then((response) => {
            console.log(response);
            store.commit("uniChat/addChildCategory", response.data);
            quasar.notify({
              message: "New parent category created",
              color: "positive",
            });
          })
          .catch((error) => {
            console.log(error);
            quasar.notify({
              message: "An error occurred",
              color: "purple",
              color: "negative",
            });
          });
      },
      onCategoryParentCreate() {
        let axiosConfig = {
          headers: { Authorization: `Bearer ${token.value}` },
        };
        let obj = {
          title: parentCategoryTitle.value,
        };
        api
          .post("/parent-menus", obj, axiosConfig)
          .then((response) => {
            console.log(response);
            store.commit("uniChat/addParentCategory", response.data);
            quasar.notify({
              message: "New parent category created",
              color: "positive",
            });
          })
          .catch((error) => {
            console.log(error);
            quasar.notify({
              message: "An error occurred",
              color: "purple",
              color: "negative",
            });
          });
      },
      onDelete(val) {
        let axiosConfig = {
          headers: { Authorization: `Bearer ${token.value}` },
        };
        const index = menu.value.findIndex((x) => x.title === val)
        if (index > -1) {
          return (
            api
              .delete('parent-menus/' + menu.value[index].id, axiosConfig)
              .then((response) => {
                console.log(response)
                store.commit("uniChat/removeParentCategory", response.data);
                quasar.notify({
                  message: "Delete parent category",
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
          )
        }
        let index2 = []
        for (let index = 0, length = menu.value.length; index < length; index += 1) {
          index2.push(menu.value[index].child_menus.findIndex((x) => x.title === val))
          if (index2[index] > -1) {
            return (
              api
                .delete('child-menus/' + menu.value[index].child_menus[index2[index]].id, axiosConfig)
                .then((response) => {
                  console.log(response)
                  store.commit("uniChat/removeChildCategory", response.data);
                  quasar.notify({
                    message: "Delete child category",
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
            )
          }
        }
      }
    };
  },
  mounted() {
    window.edit = this
  }
};
</script>
