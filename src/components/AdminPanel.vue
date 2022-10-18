<template>
    <div id="admin">
    <NavBar />
      <router-view/>
    <div class="space"></div>
    <FooterComponent />
    </div>
</template>


<script>
import NavBar from '@/components/NavBar'
import FooterComponent from '@/components/FooterComponent'

export default {
    name: "AdminPanel",
    components: {
      NavBar,
      FooterComponent
    }
}
</script>


<style scoped>
.space{
  height: 170px;
  width: 1px;
  margin-top: 40px;
  margin-bottom: 50px;
}
</style>