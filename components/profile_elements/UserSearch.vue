<template lang="">
  <div class="w-full p-1 border-x-[3px] border-black bg-zinc-800">
    <div class="text-sm text-gray-400">Search User</div>
    <form
      class="h-12 flex items-center justify-center border border-zinc-700 px-1"
      action=""
      @submit.prevent="search"
    >
      <input
        class="w-5/6 outline-none h-9 p-1 px-2 text-white"
        style="background-color: rgb(48, 48, 48)"
        type="text"
        placeholder="Enter nickname"
        v-model="input"
      />
      <button
        class="w-1/6 bg-slate-600 hover:bg-slate-500 transition duration-300 h-9 p-1 flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  </div>
</template>
<script>
import {
  getUserInformationByNickname,
  requestFriend,
  deleteFriend,
} from "@/api/mafiaAPI";

export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {
    search() {
      let showingUser;
      getUserInformationByNickname(this.input)
        .then((res) => {
          console.log(res);

          showingUser = res.data.data;
          // this.modal = true
          this.$swal({
            title: "User Information",
            // imageUrl: showingUser.image
            //   ? showingUser.image.location
            //   : "test.png",
            // imageHeight: "128",
            // imageWidth: "128",
            html:
            `<div>
                  <div>
                    <img class="aspect-square w-32 object-cover" src="${
                      showingUser.image
                        ? showingUser.image.location
                        : "/defaultProfile.png"
                    }">
                  </div>
                  <p>Nickname : ${showingUser.nickname}</p>
                  <p>Introduction : ${showingUser.selfIntroduction}</p>
                  <p>Level : ${showingUser.level}</p>
                  <p>Online Status : ${showingUser.online ? "Online" : "Offline"}</p>
                </div>`,
            customClass: {
              container: "userBox",
            },
            showCancelButton: true,
            showConfirmButton:
              !this.checkIsFriend(showingUser.userId) &&
              showingUser.userId != this.$store.state.user.myInfo.id,
            showDenyButton:
              this.checkIsFriend(showingUser.userId) &&
              showingUser.userId != this.$store.state.user.myInfo.id,
            confirmButtonText: "Add Friend",
            denyButtonText: "Delete Friend",
          }).then((result) => {
            if (result.isConfirmed) {
              requestFriend(
                showingUser.userId,
                this.$store.getters["user/getMyInfo"].id
              )
                .then((res) => {
                  console.log(res);
                  this.$swal({
                    title: "ଘ(੭*ˊᵕˋ)੭* ੈ♡",
                    text: "Your friend request has been sent successfully!",
                    icon: "success",
                    customClass: {
                      container: "friendRe",
                    },
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            } else if (result.isDenied) {
              deleteFriend(
                this.$store.getters["user/getMyInfo"].id,
                showingUser.userId
              )
                .then((res) => {
                  console.log(res);
                  this.$store.commit(
                    "user/deleteFriend",
                    res.data.data.friendId
                  );
                  this.$store.commit(
                    "tabCloseByUserId",
                    res.data.data.friendId
                  );
                  this.$swal({
                    title: "･ﾟﾟ･(>д<;)･ﾟﾟ･",
                    text: `You are no longer friends with ${showingUser.nickname}!`,
                    icon: "success",
                    customClass: {
                      container: "friendDe",
                    },
                  });
                })
                .catch((err) => {
                  console.log(err);
                  this.$swal({
                    title: "Error",
                    text: "Something went wrong!",
                    icon: "error",
                  });
                });
            }
          });
        })
        .catch((err) => {
          console.log(err);

          this.$swal({
            icon: "question",
            title: "There is no such user",
            text: "Please enter a valid nickname!",
            customClass: {
              container: "noUser",
            },
          });
        });
    },
    checkIsFriend(userId) {
      return this.$store.getters["user/getMyInfo"].friends.some(
        (friend) => friend.userId === userId
      );
    },
  },
};
</script>
<style lang="scss">
  .noUser{
    .swal2-popup{
      background-color: rgba(0, 0, 0, 0.705);
      color: white;
      border: 5px solid white;

      .swal2-title{
        border-top: 2px solid white;
        border-bottom: 2px solid white;
        padding: 10px 0;
        margin-top: 10px;
      }
      .swal2-confirm {
        background-color: white;
        color: black;
      }
    }
  }
  .friendRe{
    .swal2-popup {
      border: 5px solid white;
      background-color: rgba(0, 0, 0, 0.705);
      color: white;
      .swal2-confirm {
        background-color: black;
        color: white;
        border: 2px solid white;
      }
    }
  }
  .friendDe{
    .swal2-popup {
      border: 5px solid white;
      background-color: rgba(0, 0, 0, 0.705);
      color: white;
      .swal2-confirm {
        background-color: black;
        color: white;
        border: 2px solid white;
      }
    }
  }
</style>
