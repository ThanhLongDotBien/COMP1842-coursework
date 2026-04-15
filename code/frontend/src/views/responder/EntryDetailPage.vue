<template>
  <div class="page-content">
    <div class="ui container" style="max-width: 760px;">

      <div class="ui breadcrumb" style="margin-bottom: 1em;">
        <router-link to="/entries" class="section">Entries</router-link>
        <i class="right chevron icon divider"></i>
        <div class="active section">Entry Detail</div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="ui segment" style="text-align: center; padding: 3em;">
        <div class="ui active inline loader"></div>
        <p style="margin-top: 1em; color: #888;">Loading entry...</p>
      </div>

      <!-- Not found -->
      <div v-else-if="!entry" class="ui error message">
        <i class="exclamation triangle icon"></i> Entry not found.
      </div>

      <!-- Entry detail -->
      <div v-else class="ui segment">
        <!-- Header row -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1em;">
          <div>
            <h2 class="ui header" style="margin-bottom: 0.3em;">
              <i class="red book icon"></i> {{ entry.issueCode }}
            </h2>
            <div class="ui blue label">{{ entry.Category }}</div>
          </div>
          <div>
            <router-link :to="{ name: 'edit-entry', params: { id: entry._id } }" class="ui blue button">
              <i class="edit icon"></i> Edit
            </router-link>
            <button @click="showModal = true" class="ui red button">
              <i class="trash icon"></i> Delete
            </button>
          </div>
        </div>

        <div class="ui divider"></div>

        <!-- Response -->
        <h4 style="color: #555; margin-bottom: 0.6em;">Response</h4>
        <div style="white-space: pre-wrap; word-break: break-word; line-height: 1.75;
                    background: #f9fafe; padding: 1.2em 1.4em;
                    border-left: 3px solid #DB2828; border-radius: 4px; color: #333;">
          {{ entry.Response }}
        </div>

        <!-- Meta -->
        <div style="margin-top: 1.2em; color: #888; font-size: 0.88em;">
          <i class="calendar outline icon"></i>
          Added: {{ formatDate(entry.createdAt) }}
          <span v-if="entry.updatedAt && entry.updatedAt !== entry.createdAt" style="margin-left: 1em;">
            <i class="pencil icon"></i> Updated: {{ formatDate(entry.updatedAt) }}
          </span>
        </div>
      </div>

      <!-- Delete Confirm Modal -->
      <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
        <div class="modal-box">
          <h3 style="margin-top: 0;"><i class="red trash icon"></i> Delete Entry</h3>
          <p>Are you sure you want to delete <strong>{{ entry.issueCode }}</strong>?</p>
          <p style="color: #888; font-size: 0.9em;">This action cannot be undone.</p>
          <div style="text-align: right; margin-top: 1.5em;">
            <button @click="showModal = false" class="ui button" style="margin-right: 0.5em;">Cancel</button>
            <button @click="deleteEntry" class="ui red button" :class="{ loading: deleting }">
              <i class="trash icon"></i> Delete
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { api } from '@/helpers/helpers'

export default {
  name: 'entry-detail-page',
  data() {
    return {
      entry:     null,
      loading:   true,
      showModal: false,
      deleting:  false
    }
  },
  async mounted() {
    try {
      const res = await api.getEntry(this.$route.params.id)
      if (res.success) this.entry = res.data
    } catch (err) {
      console.error(err)
    } finally {
      this.loading = false
    }
  },
  methods: {
    formatDate(iso) {
      if (!iso) return '—'
      return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    },
    async deleteEntry() {
      this.deleting = true
      try {
        await api.deleteEntry(this.entry._id)
        this.$router.push('/entries')
      } catch (err) {
        alert('Failed to delete entry.')
        this.deleting = false
      }
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-box {
  background: #fff;
  border-radius: 8px;
  padding: 2em;
  min-width: 320px;
  max-width: 460px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
}
</style>
