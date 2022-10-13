<template lang="">
  <div class="flex flex-col items-center h-screen w-full">
    <div class="flex flex-col w-2/3 py-3 px-3 h-1/2">
      <GameHeader ref="game_header"></GameHeader>
      <Board ref="board"></Board>
    </div>
    <PlayerVideo ref="player_video"></PlayerVideo>
  </div>
</template>
<script>
import GameHeader from "@/components/game_elements/GameHeader.vue";
import Board from "@/components/game_elements/Board.vue";
import PlayerVideo from "@/components/game_elements/PlayerVideo.vue";
import { GameEvent } from "@/api/mafiaAPI";
export default {
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
    return {
      currentStatus: "NIGHT",
      currentDate: 0,
    };
  },
  methods: {
    init() {
      this.$root.gameSocket.on(GameEvent.SPEAK, (data) => {
        this.$store.commit("stream/setSpeaker", data);
      });

      this.$root.gameSocket.on(GameEvent.TIMER, (data) => {
        console.log("TIMER", data);
        this.$refs.game_header.leftTime = data.timer;

        if (currentStatus !== data.status) {
          if (currentDate !== data.day) {
            this.currentDate = data.day;
            this.$refs.board.date = data.day;
          }
          this.currentStatus = data.status;
          this.$refs.board.status = data.status;
          this.$refs.player_video.status = data.status;

          switch (data.status) {
            case "NIGHT":
              this.$refs.game_header.turnTime = 30;
              break;
            case "MEETING":
              this.$refs.game_header.turnTime = 30;
              break;
            case "VOTE":
              this.$refs.game_header.turnTime = 30;
              break;
            case "PUNISHMENT":
              this.$refs.game_header.turnTime = 30;
              break;
          }
        }
      });

      this.$root.gameSocket.on(GameEvent.JOIN, (data) => {
        console.log("JOIN", data);
        // if (data.join) {
        this.gameStart();
        // }
      });

      this.$root.gameSocket.on(GameEvent.START, (data) => {
        console.log("START", data);
        // 이곳에 플레이어 직업 배정 로직이 들어가야함
      });

      this.$root.gameSocket.on(GameEvent.GAME_END, (data) => {
        console.log("GAME_END", data);
      });

      this.$root.gameSocket.on(GameEvent.VOTE, (data) => {
        console.log("VOTE", data);
      });

      this.$root.gameSocket.on(GameEvent.SKILL, (data) => {
        console.log("SKILL", data);
      });

      this.$root.gameSocket.emit(GameEvent.JOIN, {
        roomId: this.$route.params.roomInfo.id,
      });
    },
    gameStart() {
      this.$root.gameSocket.emit(GameEvent.START);
    },
    vote(vidNum) {
      this.$root.gameSocket.emit(GameEvent.VOTE, {
        playerVideoNum: vidNum,
      });
    },
    punish(bool) {
      this.$root.gameSocket.emit(GameEvent.PUNISH, {
        agree: bool,
      });
    },
    mafia(vidNum) {
      this.$root.gameSocket.emit(GameEvent.MAFIA, {
        playerVideoNum: vidNum,
      });
    },
    doctor(vidNum) {
      this.$root.gameSocket.emit(GameEvent.DOCTOR, {
        playerVideoNum: vidNum,
      });
    },
    police(vidNum) {
      this.$root.gameSocket.emit(GameEvent.POLICE, {
        playerVideoNum: vidNum,
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang=""></style>
