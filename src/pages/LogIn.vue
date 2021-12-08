<template>
  <q-page class="flex flex-center">
    <div class="column">
      <div class="row">
        <q-card square class="shadow-24" style="width: 30vw; min-width: 400px">
          <q-card-section class="bg-primary">
            <h4 class="text-h5 text-white q-my-md">
              {{ register ? "Register" : "Log In" }}
            </h4>
          </q-card-section>
          <q-card-section>
            <q-fab
              color="info"
              label="Register"
              @click="register = !register"
              icon="double_arrow"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%)"
            >
              <q-tooltip>New User Registration</q-tooltip>
            </q-fab>
            <q-form @submit="onSubmit" class="q-px-sm q-pt-xl">
              <q-input
                ref="username"
                v-if="register"
                square
                v-model="usernameRef"
                type="text"
                label="Username"
                :rules="[required, shortUser, checkUsername]"
              >
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-input>
              <q-input
                ref="name"
                v-if="register"
                square
                v-model="nameRef"
                :rules="[required]"
                label="Name"
              >
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-input>
              <q-input
                ref="email2"
                v-if="!register"
                square
                v-model="emailRef"
                type="text"
                :rules="[required]"
                label="Email/Username"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                ref="email"
                v-if="register"
                square
                v-model="emailRef"
                type="text"
                :rules="[required, isEmail, short]"
                label="Email"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                ref="pasword2"
                v-if="!register"
                square
                v-model="passwordRef"
                :type="passwordFieldType"
                :rules="[required]"
                label="Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="visibilityIcon"
                    @click="switchVisibility"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
              <q-input
                ref="pasword"
                v-if="register"
                square
                v-model="passwordRef"
                :type="passwordFieldType"
                :rules="[required, short, isPassword]"
                label="Password"
              >
                <template v-slot:prepend>W</template>
                <template v-slot:append>
                  <q-icon
                    :name="visibilityIcon"
                    @click="switchVisibility"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
              <q-input
                ref="repassword"
                v-if="register"
                square
                v-model="repasswordRef"
                :type="passwordFieldType"
                :rules="[required, diffPassword]"
                label="Retype Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="visibilityIcon"
                    @click="switchVisibility"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
              <q-btn
                unelevated
                size="lg"
                no-caps
                color="primary"
                type="submit"
                class="full-width text-white q-pa-sm"
                :label="register ? 'Register' : 'Log In'"
              />
              <q-checkbox
                v-if="!register"
                size="sm"
                v-model="stayLoggedIn"
                val="sm"
                label="Stay Logged In"
              />
            </q-form>
          </q-card-section>
          <q-card-section v-if="!register" class="text-center q-pa-sm">
            <p class="text-grey-6"></p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, watch } from "vue";
import { api } from "boot/axios";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  name: "LogIn",
  setup() {
    // imports
    const register = ref(false);
    const stayLoggedIn = ref(false);
    const usernameRef = ref("");
    const emailRef = ref("");
    const nameRef = ref("");
    const passwordRef = ref("");
    const repasswordRef = ref("");
    const searching = ref(false);
    const passwordFieldType = ref("password");
    const visibilityIcon = ref("visibility");
    const visibility = ref(false);
    const title = ref("Log In");
    const btnLabel = ref("Log In");
    const passwordIsOk = ref(false);
    const router = useRouter();
    const store = useStore();
    const q = useQuasar();

    const loggedin = computed({
      get: () => store.state.uniChat.loggedin,
    });

    watch(loggedin, (newValue, oldValue) => {
      if (newValue) {
        router.push('/dashboard')
      }
    })

    const headers = ref({});
    let params = new URLSearchParams(location.search);
    for (let p of params) {
      headers.value[p[0]] = p[1];
      console.log(headers.value[p[0]] = p[1])
    }

    console.log(headers.value)

    return {
      register,
      stayLoggedIn,
      usernameRef,
      emailRef,
      nameRef,
      passwordRef,
      repasswordRef,
      searching,
      passwordFieldType,
      visibilityIcon,
      visibility,
      title,
      btnLabel,
      passwordIsOk,
      router,
      store,
      q,
      loggedin,
      headers,
      switchVisibility() {
        visibility.value = !visibility.value;
        passwordFieldType.value = visibility.value ? "text" : "password";
        visibilityIcon.value = visibility.value
          ? "visibility_off"
          : "visibility";
      },
      checkUsername(val) {
        return new Promise((resolve) => {
          api.get("checkusername/" + val).then((response) => {
            response.data;
            resolve(!response.data || "try an other username");
          });
        });
      },
      required(val) {
        return new Promise((resolve) => {
          resolve(!!val || "* Required");
        });
      },
      diffPassword(val) {
        return new Promise((resolve) => {
          resolve(
            passwordRef.value === repasswordRef.value ||
              "The passwords must be the same!"
          );
        });
      },
      short(val) {
        return new Promise((resolve) => {
          resolve((val && val.length > 3) || "Very small passowrd");
        });
      },
      isPassword(val) {
        const paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        return new Promise((resolve) => {
          resolve(
            paswd.test(val) ||
              "7 to 15 characters which contain at least one numeric digit and a special character"
          );
        });
      },
      shortUser(val) {
        return new Promise((resolve) => {
          resolve((val && val.length > 3) || "Very small username");
        });
      },
      isEmail(val) {
        return new Promise((resolve) => {
          const emailPattern =
            /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
          resolve(emailPattern.test(val) || "This isnt an email");
        });
      },
      onSubmit() {
        let stay = {
          st: stayLoggedIn.value,
        };
        let reg = {
          username: usernameRef.value,
          email: emailRef.value,
          password: passwordRef.value,
          name: nameRef.value,
        };
        stay.log = {
          identifier: emailRef.value,
          password: passwordRef.value,
        };
        if (!register.value) {
          store
            .dispatch("uniChat/authRequest", stay)
            .then((response) => {
              console.log(response);
              if (loggedin.value) {
                q.notify({
                  type: "positive",
                  message: "You are loged in !!!",
                  position: "top",
                });
                console.log('test1')
                if (headers.value.u) {
                  router.push("/" + headers.value.u);
                } else {
                  console.log('malakas')
                  router.push("dashboard");
                }
              }
              if (response.status === 400) {
                triggerNegative("Identifier or password invalid");
              }
            })
            .catch((error) => {
              "An error occurred:", error;
              q.notify({
                type: "negative",
                message: error.response.data.message[0].messages[0].message,
                position: "top",
              });
            });
        } else {
          store.dispatch("uniChat/registerRequest", reg).then((response) => {
            q.notify({
              type: "positive",
              message: "You are registered, now you can login !!!",
              position: "top",
            });
          });
          register.value = !register.value;
        }
      },
    };
  },
  mounted() {
    window.login = this;
  },
};
</script>
