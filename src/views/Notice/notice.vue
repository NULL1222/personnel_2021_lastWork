<template>
  <div>
    notice
  </div>
</template>

<script>
  export default {
  created() {
    const userRole = sessionStorage.getItem('userRole');
    console.log("userRole=" + userRole);
  },
}
</script>