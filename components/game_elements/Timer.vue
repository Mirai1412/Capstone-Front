<template lang="">
  <div class="flex w-full">
    <div
      class="flex exit_button w-32 justify-center items-center rounded-l-full bg-orange-400"
    >
      {{ parseInt(leftTime / 60) }} : {{ leftTime % 60 }}
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
  props: {
    turnTime: {
      type: Number,
      required: true,
    },
    leftTime: {
      type: Number,
      required: true,
    },
  },
  computed: {
    percentage() {
      return Math.round(
        ((this.turnTime - this.leftTime) / this.turnTime) * 100
      );
    },
  },
};
</script>
<style lang=""></style>
