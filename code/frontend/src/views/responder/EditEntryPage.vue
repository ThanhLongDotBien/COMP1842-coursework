<template>
  <div class="page-content">
    <div class="ui container" style="max-width: 650px;">
      <div class="ui breadcrumb" style="margin-bottom: 1em;">
        <router-link to="/entries" class="section">Entries</router-link>
        <i class="right chevron icon divider"></i>
        <div class="active section">Edit Entry</div>
      </div>

      <h2 class="ui header"><i class="edit red icon"></i> Edit Entry</h2>

      <div v-if="!form._id" class="ui active centered inline loader"></div>

      <form v-else class="ui form" @submit.prevent="onSubmit">
        <div class="ui segment">
          <div class="field">
            <label>Issue Code *</label>
            <input type="text" v-model="form.issueCode" required />
          </div>

          <div class="field">
            <label>Category *</label>
            <select class="ui dropdown" v-model="form.Category" required>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>

          <div class="field">
            <label>Response *</label>
            <textarea v-model="form.Response" rows="5" required></textarea>
          </div>

          <div v-if="errorMsg"   class="ui red message">{{ errorMsg }}</div>
          <div v-if="successMsg" class="ui green message">{{ successMsg }}</div>

          <div style="display: flex; gap: 1em; margin-top: 1em;">
            <button type="submit" class="ui blue button" :class="{ loading: isLoading }" :disabled="isLoading">
              <i class="save icon"></i> Update Entry
            </button>
            <router-link to="/entries" class="ui basic button">Cancel</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { api } from '@/helpers/helpers'
export default {
  name: 'edit-entry-page',
  data() {
    return {
      form: {},
      categories: ['Login', 'Registration', 'Technical', 'Billing', 'Account', 'Network', 'Other'],
      errorMsg: '',
      successMsg: '',
      isLoading: false
    }
  },
  async mounted() {
    try {
      const res = await api.getEntry(this.$route.params.id)
      if (res.success) this.form = { ...res.data }
    } catch (err) {
      this.errorMsg = 'Failed to load entry.'
    }
  },
  methods: {
    async onSubmit() {
      this.errorMsg = ''
      this.isLoading = true
      try {
        const res = await api.updateEntry(this.form)
        if (res.success) {
          this.successMsg = 'Entry updated!'
          setTimeout(() => this.$router.push('/entries'), 1200)
        }
      } catch (err) {
        this.errorMsg = err.response?.data?.message || 'Failed to update entry.'
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
