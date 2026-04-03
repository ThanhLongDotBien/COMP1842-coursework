<template>
  <div>
    <h1>Show Entry</h1>
    <p><strong>Issue Code:</strong> {{ entry.issueCode }}</p>
    <p><strong>Response:</strong> {{ entry.response }}</p>
    <p><strong>Category:</strong> {{ entry.category }}</p>
    <router-link :to="{ name: 'edit', params: { id: entry._id }}">Edit entry</router-link>
  </div>
</template>

<script>
import { api } from '../helpers/helpers'

export default {
  name: 'show',
  data() {
    return { entry: '' }
  },
  async mounted() {
    this.entry = await api.getEntry(this.$route.params.id)
  }
}
</script>