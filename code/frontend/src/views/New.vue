<template>
  <div>
    <h1>New Entry</h1>
    <entry-form @createOrUpdate="createOrUpdate" :entry="entry"></entry-form>
  </div>
</template>

<script>
import EntryForm from '../components/EntryForm.vue'
import { api } from '../helpers/helpers'

export default {
  name: 'new-entry',
  components: { 'entry-form': EntryForm },
  data() {
    return { entry: {} }
  },
  methods: {
    async createOrUpdate(entry) {
      await api.createEntry(entry)
      alert('Entry created successfully!')
      this.$router.push('/entries')
    }
  }
}
</script>