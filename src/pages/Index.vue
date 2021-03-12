<template>
  <q-page class="flex flex-center">
    <div v-if="user.email !== null" style="max-width:500px">
    <h2>SUCCESS - USER LOGGED AND PERSISTED IN LOCAL STORAGE</h2>
    <ul>
      <li>Name: {{ user.name }}</li>
      <li>Email: {{ user.email }}</li>
      <li>Token: {{ user.token }}</li>
    </ul>
    <q-btn color="secondary" label="LOGOUT" @click="logout" />
    </div>
    <div v-if="user.email === null" style="max-width:500px">
    <h2>USER EMPTY: MAKE LOGIN</h2>
    <q-btn color="secondary" label="LOGIN" to="login" />
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'PageIndex',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    ...mapActions('user', ['logout'])
  }
}
</script>
