<template>
  <div class="page-content">
    <div class="ui container">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h2 class="ui header"><i class="red book icon"></i> Entry Library</h2>
        <router-link to="/entries/new" class="ui green button">
          <i class="plus icon"></i> New Entry
        </router-link>
      </div>

      <!-- Search + Filter + Sort -->
      <div style="display: flex; gap: 1em; margin: 1em 0; flex-wrap: wrap;">
        <div class="ui icon input" style="flex: 1; min-width: 180px;">
          <input type="text" v-model="searchQuery" placeholder="Search by issue code..." />
          <i class="search icon"></i>
        </div>
        <select class="ui dropdown" v-model="filterCategory" style="min-width: 160px;">
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
        <select class="ui dropdown" v-model="sortOrder" style="min-width: 170px;">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="az">Issue Code A → Z</option>
          <option value="za">Issue Code Z → A</option>
        </select>
      </div>

      <div v-if="processedEntries.length === 0" class="ui info message">
        <span v-if="searchQuery || filterCategory">No entries match your search.</span>
        <span v-else>No entries yet. <router-link to="/entries/new">Add your first entry!</router-link></span>
      </div>

      <div v-else style="overflow-x: auto;">
        <table class="ui celled striped table" style="min-width: 580px;">
          <thead>
            <tr>
              <th style="width: 100px;">Issue Code</th>
              <th style="width: 130px;">Category</th>
              <th>Response</th>
              <th style="width: 110px;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in pagedEntries" :key="entry._id">
              <td><strong>{{ entry.issueCode }}</strong></td>
              <td><div class="ui blue label">{{ entry.Category }}</div></td>
              <td>
                <div class="response-preview">{{ entry.Response }}</div>
              </td>
              <td>
                <div class="ui small icon buttons">
                  <router-link :to="{ name: 'entry-detail', params: { id: entry._id } }" class="ui button" title="View">
                    <i class="eye icon"></i>
                  </router-link>
                  <router-link :to="{ name: 'edit-entry', params: { id: entry._id } }" class="ui blue button" title="Edit">
                    <i class="edit icon"></i>
                  </router-link>
                  <button @click="openDeleteModal(entry)" class="ui red button" title="Delete">
                    <i class="trash icon"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="ui pagination menu" style="margin-top: 1em;">
        <a class="item" :class="{ disabled: currentPage === 1 }" @click="currentPage--">
          <i class="chevron left icon"></i>
        </a>
        <a v-for="p in totalPages" :key="p" class="item"
           :class="{ active: p === currentPage }" @click="currentPage = p">
          {{ p }}
        </a>
        <a class="item" :class="{ disabled: currentPage === totalPages }" @click="currentPage++">
          <i class="chevron right icon"></i>
        </a>
      </div>
      <div v-if="processedEntries.length > 0" style="color: #888; font-size: 0.88em; margin-top: 0.5em;">
        Showing {{ pagedEntries.length }} of {{ processedEntries.length }} entries
      </div>

    </div>

    <!-- Delete Confirm Modal -->
    <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null">
      <div class="modal-box">
        <h3 style="margin-top: 0;"><i class="red trash icon"></i> Delete Entry</h3>
        <p>Are you sure you want to delete <strong>{{ deleteTarget.issueCode }}</strong>?</p>
        <p style="color: #888; font-size: 0.9em;">This action cannot be undone.</p>
        <div style="text-align: right; margin-top: 1.5em;">
          <button @click="deleteTarget = null" class="ui button" style="margin-right: 0.5em;">Cancel</button>
          <button @click="confirmDelete" class="ui red button" :class="{ loading: deleting }">
            <i class="trash icon"></i> Delete
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { api } from '@/helpers/helpers'
const PAGE_SIZE = 5

export default {
  name: 'entries-page',
  data() {
    return {
      entries:        [],
      filterCategory: '',
      searchQuery:    '',
      sortOrder:      'newest',
      deleteTarget:   null,
      deleting:       false,
      currentPage:    1,
      categories: ['Login', 'Registration', 'Technical', 'Billing', 'Account', 'Network', 'Other']
    }
  },
  computed: {
    processedEntries() {
      let result = this.entries

      // Filter by category
      if (this.filterCategory)
        result = result.filter(e => e.Category === this.filterCategory)

      // Search by issue code
      if (this.searchQuery.trim())
        result = result.filter(e =>
          e.issueCode.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
        )

      // Sort
      result = [...result].sort((a, b) => {
        if (this.sortOrder === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
        if (this.sortOrder === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
        if (this.sortOrder === 'az') return a.issueCode.localeCompare(b.issueCode)
        if (this.sortOrder === 'za') return b.issueCode.localeCompare(a.issueCode)
        return 0
      })

      return result
    },
    totalPages() {
      return Math.ceil(this.processedEntries.length / PAGE_SIZE)
    },
    pagedEntries() {
      const start = (this.currentPage - 1) * PAGE_SIZE
      return this.processedEntries.slice(start, start + PAGE_SIZE)
    }
  },
  watch: {
    filterCategory() { this.currentPage = 1 },
    searchQuery()    { this.currentPage = 1 },
    sortOrder()      { this.currentPage = 1 }
  },
  async mounted() {
    await this.loadEntries()
  },
  methods: {
    async loadEntries() {
      try {
        const res = await api.getAllEntries()
        if (res.success) this.entries = res.data
      } catch (err) { console.error(err) }
    },
    openDeleteModal(entry) {
      this.deleteTarget = entry
    },
    async confirmDelete() {
      this.deleting = true
      try {
        await api.deleteEntry(this.deleteTarget._id)
        this.entries = this.entries.filter(e => e._id !== this.deleteTarget._id)
        if (this.pagedEntries.length === 0 && this.currentPage > 1) this.currentPage--
        this.deleteTarget = null
      } catch (err) {
        alert('Failed to delete entry.')
      } finally {
        this.deleting = false
      }
    }
  }
}
</script>

<style scoped>
.response-preview {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #444;
  line-height: 1.5;
  word-break: break-word;
}

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
