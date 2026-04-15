<template>
  <div class="page-content">
    <div class="ui container" style="max-width: 650px;">
      <div class="ui breadcrumb" style="margin-bottom: 1em;">
        <router-link to="/entries" class="section">Entries</router-link>
        <i class="right chevron icon divider"></i>
        <div class="active section">New Entry</div>
      </div>

      <h2 class="ui header"><i class="plus circle red icon"></i> Add New Entry</h2>

      <form class="ui form" @submit.prevent="onSubmit">
        <div class="ui segment">
          <div class="field">
            <label>Issue Code *</label>
            <input type="text" v-model="form.issueCode" placeholder="e.g. IT-001" required />
            <div class="ui pointing label" v-if="form.issueCode">
              A unique identifier for this issue
            </div>
          </div>

          <div class="field">
            <label>Category *</label>
            <select class="ui dropdown" v-model="form.Category" required>
              <option value="">-- Select category --</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>

          <div class="field">
            <label>Response *</label>
            <textarea v-model="form.Response" rows="5" placeholder="Write the solution or response for this issue..." required></textarea>
          </div>

          <div v-if="errorMsg"   class="ui red message">{{ errorMsg }}</div>
          <div v-if="successMsg" class="ui green message">{{ successMsg }}</div>

          <div style="display: flex; gap: 1em; margin-top: 1em;">
            <button type="submit" class="ui green button" :class="{ loading: isLoading }" :disabled="isLoading">
              <i class="save icon"></i> Save Entry
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
  name: 'new-entry-page',
  data() {
    return {
      form: { issueCode: '', Category: '', Response: '' },
      categories: ['Login', 'Registration', 'Technical', 'Billing', 'Account', 'Network', 'Other'],
      errorMsg: '',
      successMsg: '',
      isLoading: false
    }
  },
  methods: {
    async onSubmit() {
      this.errorMsg = ''
      this.isLoading = true
      try {
        const res = await api.createEntry(this.form)
        if (res.success) {
          this.successMsg = 'Entry added successfully!'
          setTimeout(() => this.$router.push('/entries'), 1200)
        }
      } catch (err) {
        this.errorMsg = err.response?.data?.error || err.response?.data?.message || 'Failed to create entry.'
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
