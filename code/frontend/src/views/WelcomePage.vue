<template>
  <div class="welcome-wrapper">
    <div class="ui middle aligned center aligned grid" style="min-height: 100vh;">
      <div class="column" style="max-width: 680px; text-align: center;">

        <img src="@/assets/baymax.jpg" alt="App logo" height="200" width="200" style="border-radius: 50%; margin-bottom: 0.5em;">
        <h1>
          Baymax Support HelpDesk
          <div class="sub header" style="font-size: 1.1rem; margin-top: 0.5em; color: #555;">
            Fast, reliable support — manage and organise your help desk entries
          </div>
        </h1>

        <div style="margin: 2.5em 0;">
          <router-link to="/entries" class="ui large red button">
            Get Started <i class="right arrow icon"></i>
          </router-link>
        </div>

        <!-- Feature highlights -->
        <div class="ui three column stackable grid" style="margin-top: 3em; text-align: left;">
          <div class="column">
            <div class="ui segment" style="border-top: 3px solid #DB2828;">
              <i class="large red book icon"></i>
              <strong>Entry Library</strong>
              <p style="color: #777; font-size: 0.9em; margin-top: 0.5em;">Create and manage a support solutions</p>
            </div>
          </div>
          <div class="column">
            <div class="ui segment" style="border-top: 3px solid #DB2828;">
              <i class="large red search icon"></i>
              <strong>Search & Filter</strong>
              <p style="color: #777; font-size: 0.9em; margin-top: 0.5em;">Quickly find entries by category or keyword</p>
            </div>
          </div>
          <div class="column">
            <div class="ui segment" style="border-top: 3px solid #DB2828;">
              <i class="large red graduation cap icon"></i>
              <strong>Training Mode</strong>
              <p style="color: #777; font-size: 0.9em; margin-top: 0.5em;">Practice matching issues to correct entries</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default { name: 'welcome-page' }
</script>

<style scoped>
.welcome-wrapper {
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f4f8 100%);
  min-height: 100vh;
}
</style>
