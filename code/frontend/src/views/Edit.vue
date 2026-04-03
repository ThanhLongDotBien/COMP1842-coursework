<template>
  <div>
    <h1>Edit Entry</h1>
    <entry-form @createOrUpdate="createOrUpdate" :entry="entry"></entry-form>
  </div>
</template>

<script>
import EntryForm from '../components/EntryForm.vue'
import { api } from '../helpers/helpers'

export default {
  name: 'edit',
  components: { 'entry-form': EntryForm },
  data() {
    return { entry: {} }
  },
  async mounted() {
    this.entry = await api.getEntry(this.$route.params.id)
  },
  methods: {
    async createOrUpdate(entry) {
      await api.updateEntry(entry)
      alert('Entry updated successfully!')
      this.$router.push(`/entries/${entry._id}`)
    }
  }
}
</script>