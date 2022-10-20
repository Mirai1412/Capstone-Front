<template lang="">
  <div class="border-2 border-green-400 bg-white w-3/5">
    <div class="h-full flex flex-col overflow-auto" id="log_box">
      <div
        v-for="(message, index) in logs"
        :key="index"
        class="font-semibold px-1"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logs: [""],
    };
  },
  methods: {
    addLog(message) {
      this.logs.push(message);
      let logBox = document.getElementById("log_box");
      logBox.scrollTop = logBox.scrollHeight;
    },
  },
  mounted() {
    this.$store.commit("stream/loadBackupMembers");
  },
};
</script>
<style lang=""></style>
