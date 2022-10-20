<template lang="">
  <div class="border-2 border-cyan-300 text-white w-1/5 h-full">
    직업패널
    <p>{{ myJob }}</p>
  </div>
</template>
<script>
export default {
  computed: {
    roomMembers() {
      return this.$store.state.stream.roomMembers ?? [];
    },
    myInfo() {
      return this.$store.getters["user/getMyInfo"];
    },
    myJob() {
      const me = this.roomMembers.find((e) => e.id == this.myInfo.id);

      return me?.job;
    },
  },
};
</script>
<style lang=""></style>
