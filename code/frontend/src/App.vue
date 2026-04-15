<template>
  <div id="app">
    <NavBar v-if="$route.name !== 'welcome'" />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  components: { NavBar }
}
</script>

<style>
:root {
  --baymax-red:       #DB2828;
  --baymax-red-light: #f9e8e8;
  --baymax-white:     #ffffff;
  --baymax-gray:      #f5f5f5;
  --baymax-text:      #2d2d2d;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: var(--baymax-white) !important;
  color: var(--baymax-text);
}

.page-content {
  padding: 2em;
  min-height: calc(100vh - 58px);
  background: #f7f3f3;
}

::-webkit-scrollbar       { width: 6px; }
::-webkit-scrollbar-thumb { background: #DB2828; border-radius: 3px; }
::-webkit-scrollbar-track { background: #f1f1f1; }
</style>
