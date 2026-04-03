<template>
  <div>
    <h1>Helpdesk Entries</h1>
    <table id="entries" class="ui celled compact table">
      <thead>
        <tr>
          <th>Issue Code</th>
          <th>Category</th>
          <th colspan="3"></th>
        </tr>
      </thead>
      <tr v-for="(entry, i) in entries" :key="i">
        <td>{{ entry.issueCode }}</td>
        <td>{{ entry.category }}</td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'show', params: { id: entry._id }}">Show</router-link>
        </td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'edit', params: { id: entry._id }}">Edit</router-link>
        </td>
        <td width="75" class="center aligned">Destroy</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { api } from '../helpers/helpers'

export default {
  name: 'entries',
  data() {
    return { entries: [] }
  },
  async mounted() {
    this.entries = await api.getEntries()
  }
}
</script>