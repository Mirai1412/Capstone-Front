<template lang="">
  <div class="flex pt-3 h-full">
    <PanelTurn></PanelTurn>
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
};
</script>
<style lang=""></style>
