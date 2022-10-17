<template lang="">
  <div class="px-3 py-3 w-full h-1/2">
    <div class="grid grid-cols-5 gap-4 justify-evenly">
      <div
        class="justify-self-center mx-2 mb-3 w-full rounded border-[3px] relative"
        v-for="(s, index) in roomMembers"
        :class="`${s.speaking ? 'border-green-500' : 'border-white'}`"
        :key="s.userId"
        @click.prevent.stop="handleClick($event, s)"
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
          <canvas
            v-if="
              (status === 'NIGHT' && s.nickname !== myInfo.profile.nickname) ||
              s.die === true
            "
            :class="`${'output_canvas' + s.id}`"
            class="absolute top-0 left-0 aspect-video w-full bg-black"
            width="640"
            height="360"
            :id="['output_canvas' + index]"
          >
          </canvas>
          <canvas
            v-else
            :class="`${'output_canvas' + s.id}`"
            class="absolute top-0 left-0 aspect-video w-full"
            width="640"
            height="360"
            :id="['output_canvas' + index]"
          >
          </canvas>
        </div>
        <div class="grid grid-cols-4 font-semibold">
          <div
            v-if="s.die"
            class="col-span-1 text-center bg-red-500 text-white"
          >
            {{ `No.${index + 1}` }}
          </div>
          <div v-else class="col-span-1 text-center bg-green-500 text-white">
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

    <Memo ref="memo" :blind="blind"></Memo>
    <vue-simple-context-menu
      :elementId="'myUniqueId'"
      :options="options"
      :ref="'vueSimpleContextMenu'"
      @option-clicked="optionClicked"
    />
  </div>
</template>
<script>
import Memo from "@/components/gameFlow_elements/memo.vue";
import { GameRoomEvent, GameEvent } from "@/api/mafiaAPI";

export default {
  components: {
    Memo,
  },
  computed: {
    myInfo() {
      return this.$store.getters["user/getMyInfo"];
    },
    roomMembers() {
      return this.$store.state.stream.roomMembers ?? [];
    },
  },
  data() {
    return {
      options: [
        {
          name: "Mafia",
        },
        {
          name: "Police",
        },
        {
          name: "Doctor",
        },
        {
          name: "Citizen",
        },
        {
          name: "",
          type: "divider",
        },
        {
          name: "Remove Filter",
        },
      ],
      blind: false,
      status: "",
    };
  },
  methods: {
    handleClick(event, item) {
      this.$refs.vueSimpleContextMenu.showMenu(event, item);
    },
    optionClicked(event) {
      this.$refs.memo.optionClicked(event);
    },
  },
  mounted() {
    this.$root.roomSocket.on(GameRoomEvent.SPEAK, (data) => {
      // console.log(data)
      this.$store.commit("stream/setSpeaker", data);
    });
  },
};
</script>
<style lang=""></style>
