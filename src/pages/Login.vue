<template>
  <q-page padding>
    <q-tab-panel name="login" style="max-width: 500px; margin: auto">
          <div class="text-h6 q-pa-lg">LOGIN</div>
          <q-form @submit="auth(login)" class="q-gutter-md">
            <q-input outlined v-model="login.email"
            label="Email">
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>
            <q-input
            v-model="login.password"
            outlined :type="isPwd ? 'password' : 'text'"
            label="Password"
            >
            <template v-slot:prepend>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
              </template>
            </q-input>
            <div class="float-right">
              <q-btn label="Login" type="submit" color="orange-9" :loading="loadingSubmitting">
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </div>
            <br/><br/>
            <div class="clearfix"></div>
          </q-form>
          <div class="clearfix"></div>
          <ul v-for="user in users" :key="user.id">
            <li>Name: {{ user.name }}</li>
            <li>Email: {{ user.email }}</li>
            <li>Password: {{ user.password }}</li>
            <br/>
          </ul>
    </q-tab-panel>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      login: { email: '', password: '' },
      loadingSubmitting: false,
      isPwd: true
    }
  },
  methods: {
    ...mapActions('user', ['auth', 'listUsers'])
  },
  mounted () {
    this.listUsers()
  },
  computed: {
    ...mapState({
      users: state => state.user.users
    })
  }
}
</script>
