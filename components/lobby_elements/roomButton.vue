<template lang="">
  <div
    class="bg-black/60 rounded-2xl shadow-xl px-2 py-2 cursor-pointer hover:scale-95 border border-gray-600 transition duration-200"
    @click="onClickRoomButton()"
  >
    <div
      class="bg-yellow-200/90 h-9 flex justify-between items-center px-2 rounded-md"
    >
      <span class="font-bold">[No.{{ room.id }}] {{ room.description }}</span>
      <span>
        <svg
          v-if="room.isPrivate"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clip-rule="evenodd"
          /></svg
        >{{ room.memberCount }}/{{ room.publishers }}</span
      >
    </div>
  </div>
</template>
<script>
import { isJoinable, checkPassword, getRoom } from "@/api/mafiaAPI";

export default {
  props: {
    room: Object,
  },
  methods: {
    async onClickRoomButton() {
      isJoinable(this.room.id)
        .then(async (res) => {
          let pin;
          if (this.room.isPrivate) {
            const { value: password } = await this.$swal({
              title: "Enter password",
              input: "password",
              inputLabel: "Password",
              inputPlaceholder: "Enter password",
              inputAttributes: {
                maxlength: 10,
                autocapitalize: "off",
                autocorrect: "off",
              },
            });

            if (password) {
              // this.$swal(`Entered password: ${password}`);
              pin = password;
              checkPassword(this.room.id, { pin })
                .then((res) => {
                  console.log(res);
                  if (res.data.data.joinable) {
                    getRoom(this.room.id)
                      .then((res) => {
                        this.$store.commit(
                          "stream/setRoomMembers",
                          res.data.data.members
                        );
                        this.$router.push({
                          name: "room-id",
                          params: {
                            id: this.room.id,
                            room: this.room.room,
                            pin: pin,
                          },
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                })
                .catch((err) => {
                  console.log(err);
                  this.$swal({
                    icon: "error",
                    title: "Wrong password",
                  });
                });
            }
          } else {
            getRoom(this.room.id)
              .then((res) => {
                this.$store.commit(
                  "stream/setRoomMembers",
                  res.data.data.members
                );
                this.$router.push({
                  name: "room-id",
                  params: {
                    id: this.room.id,
                    room: this.room.room,
                    pin: pin,
                  },
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          this.$swal({
            icon: "error",
            title: err.response.data.data.message,
          },
          );
        });
    },
  },
};
</script>
<style lang="scss">
.test{
  color: pink;
  .swal2-popup {
    border: 4px solid black;
  }
}
</style>
