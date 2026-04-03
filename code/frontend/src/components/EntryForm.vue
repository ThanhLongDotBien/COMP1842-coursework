<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out all fields!</p>

    <div class="ui labeled input fluid">
      <div class="ui label">Issue Code</div>
      <input type="text" placeholder="e.g. PWD_RESET" v-model="entry.issueCode" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">Response</div>
      <input type="text" placeholder="Enter response..." v-model="entry.response" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">Category</div>
      <input type="text" placeholder="e.g. IT, Billing" v-model="entry.category" />
    </div>

    <button class="positive ui button">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'entry-form',
  props: {
    entry: {
      type: Object,
      required: false
    }
  },
  data() {
    return { errorsPresent: false }
  },
  methods: {
    onSubmit() {
      if (this.entry.issueCode === '' || this.entry.response === '') {
        this.errorsPresent = true
      } else {
        this.$emit('createOrUpdate', this.entry)
      }
    }
  }
}
</script>