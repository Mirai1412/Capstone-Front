<template lang="">
  <div class="flex pt-3 h-full">
    <PanelTurn :date="date" :status="status"></PanelTurn>
    <PanelLog ref="panel_log"></PanelLog>
    <PanelJob ref="panel_job"></PanelJob>
  </div>
</template>
<script>
import PanelJob from "@/components/game_elements/PanelJob.vue";
import PanelLog from "@/components/game_elements/PanelLog.vue";
import PanelTurn from "@/components/game_elements/PanelTurn.vue";
export default {
  components: {
    PanelJob,
    PanelLog,
    PanelTurn,
  },
  data() {
    return {
      date: 0,
      status: "NIGHT",
    };
  },
  methods: {
    addLog(message) {
      this.$refs.panel_log.addLog(message);
    },
    grantJob(job) {
      this.$refs.panel_job.myJob = job;
    },
  },
};
</script>
<style lang=""></style>
