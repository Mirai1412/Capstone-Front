<template lang="">
  <div class="border-2 border-amber-400 text-white w-1/5">
    턴 패널
    <p>Day {{ date }}</p>
    <p>{{ status }}</p>
  </div>
</template>
<script>
export default {
  props: {
    date: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang=""></style>
