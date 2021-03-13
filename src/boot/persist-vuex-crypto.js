import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
var ls = new SecureLS({ isCompression: true })

// https://github.com/softvar/secure-ls

export default ({ store }) => {
  createPersistedState({
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key)
    }
  })(store)
}
