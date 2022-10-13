<template lang="">
  <div class="flex w-full">
    <div
      class="flex exit_button w-32 justify-center items-center rounded-l-full bg-orange-400"
    >
      남은 시간
    </div>
    <div
      class="flex timer w-full items-center mr-2 px-3 rounded-r-full bg-orange-700"
    >
      <div class="overflow-hidden h-5 text-s flex rounded-full bg-green-100">
        <div
          class="text-center whitespace-nowrap justify-center bg-green-400 transition duration-1000 ease-linear"
          :style="{ width: `${percentage}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    percentage() {
      // return this.$store.state.game.timer;
    },
  },
  data() {
    return {
      percentage: 20,
      leftTime: 0,
    };
  },
};
</script>
<style lang=""></style>
