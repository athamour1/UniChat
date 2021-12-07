<template>
  <q-page>
    <div v-if="!loggedin">
      <div class="column">
        <div class="row">
          <q-card square class="card shadow-24">
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
                <q-tooltip> New User Registration </q-tooltip>
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
                  v-model="stayLogedIn"
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
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
};
</script>
