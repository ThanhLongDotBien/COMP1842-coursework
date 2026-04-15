<template>
  <div style="min-height: 100vh; background: #f5f7fa; display: flex; align-items: center; justify-content: center;">
    <div style="text-align: center; padding: 2em;">

      <div style="font-size: 6em; font-weight: 900; color: #DB2828; line-height: 1;">404</div>

      <h2 style="color: #333; margin: 0.3em 0 0.5em;">Page Not Found</h2>
      <p style="color: #888; font-size: 1.05em; max-width: 360px; margin: 0 auto 2em;">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div style="display: flex; gap: 1em; justify-content: center; flex-wrap: wrap;">
        <button class="ui red button" @click="$router.go(-1)">
          <i class="arrow left icon"></i> Go Back
        </button>
        <router-link to="/" class="ui basic button">
          <i class="home icon"></i> Home
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
export default { name: 'not-found-page' }
</script>
