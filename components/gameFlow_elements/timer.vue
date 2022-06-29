<template>
  <div class="timer h-screen">
    <div>
      <div v-show="timerStart" class="timerSet" >
            <div class="flex flex-wrap p-3 pt-2.5">
            <BaseProgress :percentage="contentProgress">
             {{ timerMinutes }}:{{ timerSeconds }}
            </BaseProgress>
            </div>
       </div>
      <div class="button-toggle">
      </div>
    </div>
  </div>
</template>
<script>
import BaseProgress from "@/components/gameFlow_elements/BaseProgress.vue";
import { GameEvent } from "@/api/mafiaAPI";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
dayjs.locale('ko');

export default {
  name: "Timer",
  props: ["realTime"],
  components: {
    BaseProgress,
    dayjs,
  },
  data() {
    return {
      serverStart: null,
      serverEnd : null,
      clientRealTime: null,
      contentProgressPer: 60,
      isActive: true,
      timerType: 0,
      totalSeconds: 60,
      pomodoroInstance: null,
      // notificationSound,
      skipAdd: false,
      newGame: true,
      skipThisEvent: false,
      timerStart: true,
      striped: true,
      progressStart: 0,
      contentProgress: 0,
      colors: [
        "gray",
        "yellow",
        "orange",
        "red",
        "green",
        "teal",
        "blue",
        "indigo",
        "purple",
        "pink"
      ],
      nowEvent: 'morning'
    };
  },
  computed: {
    // show minutes
    timerMinutes() {
      const minutes = Math.floor(this.totalSeconds / 60);
      return this.formatTime(minutes);
    },
    // show seconds
    timerSeconds() {
      let sec = this.totalSeconds % 60;
      return this.formatTime(sec);
    },
  },
  mounted() {
    this.$root.gameSocket.on(GameEvent.TIMER, (data) => {
      console.log(data);
      this.totalSeconds = data.time
      this.contentProgress += 100/20;
      if (data.time === 0) {
        if (this.nowEvent === 'morning') {
          this.$emit("startVote")
        } else if (this.nowEvent === 'vote') {
          this.$nuxt.$emit('voteTimeFinish', '유저 지목 이벤트 중단')
          this.$emit("finishVote")
        } else if (this.nowEvent === 'punishment') {
          this.$nuxt.$emit('punishmentTimeFinish', '찬반 이벤트 중단')
          this.$emit('finishPunishmentVote')
        } else if (this.nowEvent === 'night') {
          this.$nuxt.$emit('skillTimeFinish', '밤, 능력 이벤트 중단')
          this.$emit('nightResult')
        }
      }
    });

    // 그리고 일정 시간에 함께 다음 이벤트로 emit 할 수 있어야 함.
  },
  methods: {
    // 스킵은 아직 구현 안됨

    formatTime(time) {
      if (time < 10) {
        return "0" + time;
      }
      return time.toString();
    },
    // 아침이 되었을 때 움직이는 타이머
    // totalseconds = serverEnd - clientRealTime
    // setInterval 내에서 clientRealtime 갱신
    morningTimer() {
      this.nowEvent = "morning"
      this.contentProgress = 0,
      this.$root.gameSocket.emit(GameEvent.TIMER);
        this.$swal({
          imageUrl: require('~/assets/ingame/sun.svg'),
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: 'Custom image',
          title: '아침이 되었습니다',
          html: '자유롭게 대화하며 서로에 대해 알아가는 시간입니다.',
          timer: 2000,
          backdrop: 'rgba(0,0,0)',
          showConfirmButton: false,
          showClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === this.$swal.DismissReason.timer) {
            console.log('아침 모달 시작')
          }
        })
    },
    // 마피아로 의심되는 유저를 지목할 때 쓰이는 타이머
    voteTimer() {
      this.nowEvent = "vote"
      this.contentProgress = 0,
      this.$root.gameSocket.emit(GameEvent.TIMER);

        this.$swal({
          imageUrl: require('~/assets/ingame/vote.svg'),
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: 'Custom image',
          title: '투표를 시작합니다',
          html: '마피아로 의심되는 유저를 지목합니다',
          timer: 2000,
          showConfirmButton: false,
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === this.$swal.DismissReason.timer) {
            console.log('투표 모달 시작')
          }
        })
    },
    // 특정 유저가 지목되고, 사형 찬반투표를 할 때 쓰이는 타이머
    punishmentTimer() {
      this.nowEvent = "punishment"
      this.contentProgress = 0,
      this.$root.gameSocket.emit(GameEvent.TIMER);

        this.$swal({
          imageUrl: require('~/assets/ingame/punishment.svg'),
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: 'Custom image',
          title: '유저가 지목되었습니다',
          html: '해당 유저에 대한 찬반투표를 시작합니다',
          timer: 2000,
          showConfirmButton: false,
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === this.$swal.DismissReason.timer) {
            console.log('찬반 모달 시작')
          }
        })
    },
    // 밤이 되었을 때 쓰이는 타이머
    nightEvent() {
      this.nowEvent = "night"
      this.contentProgress = 0,
      this.$root.gameSocket.emit(GameEvent.TIMER);

        this.$swal({
          imageUrl: require('~/assets/ingame/moon.svg'),
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: 'Custom image',
          title: '밤이 되었습니다',
          html: '마피아, 의사, 경찰은 자신의 능력을 사용합니다.',
          timer: 2000,
          showConfirmButton: false,
          backdrop: 'rgba(0,0,0)',
          background: 'rgba(16,19,66)',
          color: '#ffffff'
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === this.$swal.DismissReason.timer) {
              console.log('밤 모달 시작')
            }
          })
    },
  },
};
</script>
<style lang=""></style>

