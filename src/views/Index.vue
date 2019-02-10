<template>
  <div>
    <div id="container">
      <router-view/>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import FooterNav from "@/components/footer/footer-nav";
export default {
  components: {
    "footer-nav": FooterNav
  }
};
</script>