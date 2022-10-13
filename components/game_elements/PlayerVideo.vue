<template lang="">
  <div class="px-3 py-3 w-full h-1/2">
    <div class="grid grid-cols-5 gap-4 justify-evenly">
      <div
        class="justify-self-center mx-2 mb-3 w-full rounded border-[3px]"
        v-for="(s, index) in roomMembers"
        :class="`${s.speaking ? 'border-green-500' : 'border-white'}`"
        :key="s.userId"
      >
        <div class="aspect-video">
          <div v-if="s.stream">
            <video
              v-if="s.nickname !== myInfo.profile.nickname"
              :ref="'remote' + s.userId"
              :id="'remote' + s.userId"
              :src-object.prop.camel="s.stream"
              autoplay
            ></video>
            <video
              v-else
              :ref="'remote' + s.userId"
              :id="'remote' + s.userId"
              :src-object.prop.camel="s.stream"
              autoplay
              muted
            ></video>
          </div>
        </div>
        <div class="grid grid-cols-4 font-semibold">
          <div class="col-span-1 text-center bg-green-500 text-white">
            {{ `No.${index + 1}` }}
          </div>
          <div
            class="col-span-3 bg-white px-1 whitespace-nowrap overflow-ellipsis"
          >
            <span>{{ `${s.nickname}` }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GameRoomEvent, GameEvent } from "@/api/mafiaAPI";

export default {
  computed: {
    myInfo() {
      return this.$store.getters["user/getMyInfo"];
    },
    roomMembers() {
      return this.$store.state.stream.roomMembers ?? [];
    },
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$root.roomSocket.on(GameRoomEvent.SPEAK, (data) => {
      // console.log(data)
      this.$store.commit("stream/setSpeaker", data);
    });
  },
};
</script>
<style lang=""></style>
