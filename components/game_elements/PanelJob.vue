<template lang="">
  <div class="border-2 border-cyan-300 text-white w-1/5 h-full">
    직업패널
    <p>{{ myJob }}</p>
  </div>
</template>
<script>
export default {
  prop: {
    myJob: String,
    default: "없음",
  },
};
</script>
<style lang=""></style>
