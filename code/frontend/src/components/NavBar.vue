<template>
  <div id="navbar" class="ui inverted segment" style="margin: 0; border-radius: 0;">
    <div class="ui container">
      <div class="ui inverted secondary menu">
        <router-link to="/" class="header item" style="color: #fff !important;">( •–•) Baymax Support Helpdesk</router-link>

        <router-link to="/entries"  class="item">Entries</router-link>
        <router-link to="/entries/new" class="item">New Entry</router-link>
        <router-link to="/training" class="item">Training</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: 'nav-bar' }
</script>

<style scoped>
#navbar { background-color: #DB2828 !important; border-color: #b71c1c !important; }
#navbar .item,
#navbar .header.item { color: #fff !important; }
#navbar .item:hover   { background: rgba(0,0,0,0.15) !important; }
</style>
