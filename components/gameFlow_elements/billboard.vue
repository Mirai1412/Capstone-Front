<template>
  <div class="messagebox overflow-y-auto">
    <div
      v-show="punishmentCam === false"
      class="flex flex-col-reverse h-full justify-center items-center p-5"
    >
      <p v-for="(logs, key) in reversedMessageLogs" :key="key">{{ logs }}</p>
    </div>
    <div
      v-show="punishmentCam === true"
      class="flex h-full justify-center items-center"
    >
      <div v-for="s in roomMembers" :key="s.userId">
        <div v-if="s.stream" class="videoCut">
          <video
            v-if="s.nickname === punishmentBillboard"
            :ref="'remote' + s.userId"
            :id="'remote' + s.userId"
            :src-object.prop.camel="s.stream"
            autoplay
            muted
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GameEvent } from "@/api/mafiaAPI";
const punishmentBgm = require("@/assets/ingameBgm/punishment.mp3").default;
export default {
  data() {
    return {
      messageLogs: [],
      newMessage: null,
      resultMessage: null,
      dayCount: 0,
      highVote: 0,
      equalVote: 1,
      highPlayer: null,
      punishmentBgm,
      punishmentCam: false,
      punishmentBillboard: null,
    };
  },
  props: {
    escape: {
      type: String,
      default: "/lobby",
    },
  },
  computed: {
    myInfo() {
      return this.$store.getters["user/getMyInfo"];
    },
    roomMembers() {
      return this.$store.state.stream.roomMembers;
    },
    surviveMembers() {
      return this.$store.state.stream.surviveMembers;
    },
    reversedMessageLogs() {
      return this.messageLogs.slice().reverse();
    },
  },
  created() {
    this.messageLogs = ["Fafia Start"];
  },
  mounted() {
    // 유저의 vote 결과를 빌보드에 알려준다.
    this.$root.gameSocket.on(GameEvent.FINISHV, (data) => {
      console.log(data);
      const { result, message, voteResult } = data;

      if (voteResult) {
        for(const info of voteResult) {
          const { userNum, voteNum } = info;
          this.newMessage = `${this.roomMembers[userNum - 1].nickname} : ${voteNum} 표`;
          this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
          this.$forceUpdate();
        }
      }


      this.messageLogs.splice(this.messageLogs.length, 0, message);
      this.$forceUpdate();

      if(!result) {
        this.$emit("victorySearch");
        return;
      }
      this.highPlayer = voteResult[0].userNum;
      this.$emit("punishmentVote");

    });
    // 유저의 punishment 결과를 빌보드에 알려준다.

    this.$root.gameSocket.on(GameEvent.FINISHP, (data) => {
      // result, user, punish,
      console.log("합산결과" + data);
      this.finishPunishmentVoteBoard();
      this.newMessage = `찬성 : ${data.punish} 표`;
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.$forceUpdate();
      if (data.result) {
        this.punishmentEvent();
        this.newMessage = `${data.user.nickname}은 형장의 이슬로 사라집니다.`;
        this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
        this.$forceUpdate();
        this.newMessage = `${data.user.nickname}은 ${data.user.job}이었습니다.`;
        this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
        this.$forceUpdate();
        this.$store.commit('stream/killMember', data.user);
        this.$store.commit('stream/surviveMemberCheck');
      } else {
        this.newMessage = `${data.user.nickname}을 사형하지 않습니다.`;
        this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
        this.$forceUpdate();
      }
      this.$emit("victorySearch");
      console.log('빌보드 밤 이벤트 시작')
    });
    this.$root.gameSocket.on(GameEvent.USEJOBS, (data) => {
      // data은 유저 정보, data2는 텍스트
      // ! 죽은 유저의 정보를 출력한다.punishment, usejobs
      console.log('USEJOBS ' + data);
      console.log("직업사용 결과 받음");
      console.log(data.message);

      if (data?.user && data.user.die) {
        // data.user는 유저의 정보
        this.$store.commit("stream/killMember", data.user);
        this.$store.commit("stream/surviveMemberCheck");
        this.$swal({
          imageUrl: require('~/assets/ingame/murder.svg'),
          imageWidth: 100,
          imageHeight: 100,
          title: '사망자 발생',
          html: data.message,
          timer: 2000,
          showConfirmButton: false,
          showClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === this.$swal.DismissReason.timer) {
            this.newMessage = "사망하였습니다.";
            this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
            this.$forceUpdate();
            console.log('유저 사망')
            this.$emit("victorySearch");
          }
        })
      } else if (data?.user && !data.user.die) {
        this.$swal({
          imageUrl: require('~/assets/ingame/save.svg'),
          imageWidth: 100,
          imageHeight: 100,
          title: `의사가 ${data.user.nickname} 유저를 마피아로부터 살렸습니다`,
          html: data.message,
          timer: 2000,
          showConfirmButton: false,
          showClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === this.$swal.DismissReason.timer) {
            console.log('유저 살림')
            this.$emit("victorySearch");
          }
        })
      } else {
        this.$swal({
          icon : 'success',
          title: '사망자 없음',
          html: data.message,
          timer: 2000,
          showConfirmButton: false,
          showClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === this.$swal.DismissReason.timer) {
            console.log('유저 사망 안함')
            this.$emit("victorySearch");
          }
        })
      }

    // 유저 정보랑 메세지
    this.$root.gameSocket.on(GameEvent.POLICE, (data) => {
      console.log("POLICE" + data);
      this.newMessage = data.message;
      this.messageLogs.splice(data, 0, this.newMessage);
      this.$forceUpdate();
      // 이걸로 직업 알려주는 모달 이벤트 발생
      if(data.message === '이 유저의 직업은 MAFIA 입니다.') {
        this.$swal({
          imageUrl: require('~/assets/sidebar/mafia.svg'),
          imageWidth: 100,
          imageHeight: 100,
          title: '마피아 발견',
          color: '#ff0000',
          html: data.message,
          timer: 2000,
          showConfirmButton: false,
          showClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === this.$swal.DismissReason.timer) {
            console.log('경찰 능력 공개')
          }
        })
      } else {
        this.$swal({
          imageUrl: require('~/assets/ingame/detective.svg'),
          imageWidth: 100,
          imageHeight: 100,
          title: '조사완료',
          html: data.message,
          timer: 2000,
          showConfirmButton: false,
          showClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === this.$swal.DismissReason.timer) {
            console.log('경찰 능력 공개')
          }
        })
      }

    });

      // if (data.userNum === null) {
      //   console.log(data.message);
      // } else if (data.userNum !== null && data.userNum.die === false) {
      //   console.log(data.message);
      // } else if (data.userNum !== null && data.userNum.die === true) {
      //   console.log(data);
      //   console.log(`${this.$store.state.stream.roomMembers[data.userNum - 1].nickname}의 직업은 ${this.$store.state.stream.roomMembers[data.userNum - 1].job}입니다.`)
      //   this.$store.commit("stream/killMember", data.userNum - 1);
      //   this.$store.commit("stream/surviveMemberCheck");
      // }
      // this.$emit("victorySearch");
      // 만약 마피아 != 의사일 경우, killMember를 불러온다.
      // 만약 마피아 == 의사일 경우, 빌보드만 출력한다.
      // 그리고 surviveMemberCheck을 불러오며 결과를 도출한다.
    });
  },
  methods: {
    gameStartBoard() {
      // 게임 시작 메세지를 저장한다.
      // 지금부터 마피아 게임을 시작합니다.
      const roomId = this.$route.params.roomInfo.id;
      this.newMessage = `방 정보 : ${roomId} 번`;
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.newMessage = "지금부터 마피아 게임을 시작하겠습니다.";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.$forceUpdate();
    },
    grantPlayerJobBeforeBoard() {
      this.newMessage = "직업을 부여하고 있습니다...";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.$forceUpdate();
    },
    grantMafia() {
      this.newMessage =
        "당신은 마피아입니다. 시민들 사이에서 들키지 않고 시민을 제거해야 합니다. ";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.$forceUpdate();
    },
    grantPolice() {
      this.newMessage =
        "당신은 경찰입니다. 의사와 시민과 힘을 합쳐 마피아를 찾아야 합니다.";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.$forceUpdate();
    },
    grantDoctor() {
      this.newMessage =
        "당신은 의사입니다. 경찰, 시민과 힘을 합쳐 마피아를 찾아야 합니다.";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.$forceUpdate();
    },
    grantCitizen() {
      this.newMessage =
        "당신은 시민입니다. 경찰, 의사와 힘을 합쳐 마피아를 찾아야 합니다.";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.$forceUpdate();
    },
    morningEventBoard() {
      this.newMessage = "===========================";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.dayCount++;
      this.newMessage = `${this.dayCount}일차`;
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.newMessage = "아침이 되었습니다.";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.newMessage = "===========================";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.$forceUpdate();
    },
    startVoteBoard() {
      // 유저 지목 투표를 시작하는 메세지를 남김
      this.newMessage = "마피아로 의심되는 유저를 지목합니다.";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.$forceUpdate();
    },
    finishVoteBoard() {
      // 유저 지목 결과를 알리는 메세지를 남김
      this.newMessage = "의심 투표 결과를 발표합니다.";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.$forceUpdate();
      // * 만약 유저가 특정되었을 경우
      this.newMessage = `${
        this.$store.state.stream.roomMembers[this.highPlayer - 1].nickname
      }이(가) 마피아 의심 대상으로 지목되었습니다.`;
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.$forceUpdate();
      // ! 만약 유저가 특정되지 않았을 경우
    },
    startPunishmentVoteBoard() {
      this.newMessage = `${
        this.$store.state.stream.roomMembers[this.highPlayer - 1].nickname
      }의 사형 찬반투표를 실시합니다.`;
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.punishmentCam = true;
      this.punishmentBillboard =
        this.$store.state.stream.roomMembers[this.highPlayer - 1].nickname;
      this.$forceUpdate();
    },
    finishPunishmentVoteBoard() {
      // 찬반 투표 결과를 알리는 메세지를 남김
      this.punishmentCam = false;
      this.newMessage = `투표 결과 ${
        this.$store.state.stream.roomMembers[this.highPlayer - 1].nickname
      }를 사형합니다.`;
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      // 플레이어 수 만큼 for문이 돈다. 그리고 모든 유저의 득표수를 보여준다.
      this.$forceUpdate();
    },
    finishPunishmentVoteFalseBoard() {
      this.newMessage = `투표 결과 ${
        this.$store.state.stream.roomMembers[this.highPlayer - 1].nickname
      }를 사형하지 않습니다.`;
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.$forceUpdate();
    },
    nightEventBoard() {
      // 밤이 되었음을 알리는 메세지와
      // 자신의 직업에 따라 다른 메세지를 남김
      this.punishmentCam = false;
      this.newMessage = "===========================";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.newMessage = "밤이 되었습니다. 자신의 능력을 사용할 수 있습니다.";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.newMessage = "===========================";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.$forceUpdate();
      // 만약 경찰일 경우에는 능력의 결과를 지금 출력한다.
    },
    nightResultBoard() {
      // 밤의 능력 사용 결과를 알림
      this.newMessage = "밤 능력사용 종료";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.$forceUpdate();
    },
    mafiaWin() {
      this.newMessage = "===========================";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.newMessage = "마피아의 승리입니다.";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.newMessage = "===========================";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.$forceUpdate();
    },
    citizenWin() {
      this.newMessage = "===========================";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.newMessage = "시민 팀의 승리입니다.";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.newMessage = "===========================";
      this.messageLogs.splice(this.messageLogs.length, 0, this.newMessage);
      this.$forceUpdate();
    },

    punishmentEvent() {
      var audio3 = new Audio(this.punishmentBgm);
      audio3.play();
      console.log(audio3);
    },
  },
};
</script>

<style lang="scss" scoped></style>
