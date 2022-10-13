<template lang="">
  <div class="flex pt-3 h-full">
    <PanelTurn :date="date" :status="status"></PanelTurn>
    <PanelLog></PanelLog>
    <PanelJob></PanelJob>
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
};
</script>
<style lang=""></style>
