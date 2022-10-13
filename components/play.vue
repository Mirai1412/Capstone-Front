<template lang="">
  <div class="flex flex-col items-center h-screen w-full">
    <div class="flex flex-col w-2/3 py-3 px-3 h-1/2">
      <GameHeader ref="game_header"></GameHeader>
      <Board></Board>
    </div>
    <PlayerVideo></PlayerVideo>
  </div>
</template>
<script>
import GameHeader from "@/components/game_elements/GameHeader.vue";
import Board from "@/components/game_elements/Board.vue";
import PlayerVideo from "@/components/game_elements/PlayerVideo.vue";
import { GameEvent } from "@/api/mafiaAPI";
export default {
  props: {
    roomInfo: {
      type: Object,
      required: true,
    },
  },
  components: {
    GameHeader,
    Board,
    PlayerVideo,
  },
  computed: {
    myInfo() {
      return this.$store.getters["user/getMyInfo"];
    },
  },
  data() {
    return {};
  },
  methods: {
    init() {
      this.$root.gameSocket.on(GameEvent.SPEAK, (data) => {
        console.log(data);
        this.$store.commit("stream/setSpeaker", data);
      });

      this.$root.gameSocket.on(GameEvent.TIMER, (data) => {});

      this.$root.gameSocket.on(GameEvent.JOIN, (data) => {
        console.log("JOIN" + data);
        if (data.join) {
          this.gameStart();
        }
      });

      this.$root.gameSocket.on(GameEvent.START, (data) => {
        // 이곳에 플레이어 직업 배정 로직이 들어가야함
      });

      this.$root.gameSocket.emit(GameEvent.JOIN, {
        roomId: this.$route.params.roomInfo.id,
      });
    },
    gameStart() {
      this.$root.gameSocket.emit(GameEvent.START);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang=""></style>
