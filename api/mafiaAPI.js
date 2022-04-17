import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://gjgjajaj.xyz/api"
      : "http://localhost:3065/api",
  withCredentials: true,
});

// Auth
export const loginWithGoogle = () => {
  return instance.get(`/auth/google/login`);
};

export const redirectWithGoogle = () => {
  return instance.get(`/auth/google/redirect`);
};

export const loginWithNaver = () => {
  return instance.get(`/auth/naver/login`);
};

export const redirectWithNaver = () => {
  return instance.get(`/auth/naver/redirect`);
};

export const loginWithKakao = () => {
  return instance.get(`/auth/kakao/login`);
};

export const redirectWithKakao = () => {
  return instance.get(`/auth/kakao/redirect`);
};

export const logout = () => {
  return instance.post(`/auth/logout`);
};

// Users
export const checkNicknameDuplication = (nickname) => {
  // 닉네임 중복확인
  return instance.get(`/users/profile/check-duplicate/nickname/${nickname}`);
};

export const getMyInformation = () => {
  // 내 정보 가져오기
  return instance.get(`/users`);
};

export const withdrawUser = () => {
  // 회원 탈퇴
  return instance.delete(`/users`);
};

export const getUserInformation = (userId) => {
  // 특정 유저 정보 불러오기
  return instance.get(`/users/profile/${userId}`);
};

export const storeProfileImage = (image) => {
  // 프로필 이미지 저장
  return instance.post(`/users/profile/image`, image);
};

export const destroyProfileImage = () => {
  // 프로필 이미지 삭제
  return instance.delete(`/users/profile/image`);
};

export const makeProfile = (data) => {
  // 프로필 생성
  return instance.post(`/users/profile`, data);
};

export const editProfile = (data) => {
  // 프로필 수정
  return instance.patch(`/users/profile`, data);
};

export const requestFriend = (userId) => {
  // 친구 신청
  return instance.patch(`/users/friend/${userId}`);
};

export const deleteFriend = (userId) => {
  // 친구 삭제
  return instance.delete(`/users/friend/${userId}`);
};

// Posts
export const getPosts = ({ category, page }) => {
  // 게시물들 불러오기
  return instance.get(`/posts?category=${category}&page=${page}`);
};

export const detailPost = (postId) => {
  // 게시물 자세히 보기
  return instance.get(`/posts/${postId}`);
};

export const savePost = (data) => {
  // 게시물 등록
  return instance.post(`/posts`, data);
};

export const editPost = (postId, data) => {
  // 게시물 수정
  return instance.patch(`/posts/${postId}`, data);
};

export const deletePost = (postId) => {
  // 게시물 삭제
  return instance.delete(`/posts/${postId}`);
};

export const savePostImage = (data) => {
  // 게시물 이미지 저장
  return instance.post(`/posts/upload`, data);
};

export const deletePostImage = () => {
  // 게시물 이미지 삭제
  return instance.delete(`/posts/image`);
};

export const upVotePost = (postId) => {
  // 게시물 추천
  return instance.patch(`/posts/like/${postId}`);
};

export const downVotePost = (postId) => {
  // 게시물 추천 취소
  return instance.delete(`/posts/like/${postId}`);
};

// Comments
export const saveComment = (data) => {
  // 댓글 등록
  return instance.post(`/comments`, data);
};

export const editComment = (commentId, data) => {
  // 댓글 수정
  return instance.patch(`/comments/${commentId}`, data);
};

export const deleteComment = (commentId) => {
  // 댓글 삭제
  return instance.delete(`/comments/${commentId}`);
};

// Rooms
export const getRooms = () => {
  // 방들 불러오기
  return instance.get(`/rooms`);
};

export const makeRoom = (data) => {
  // 방 만들기
  return instance.post(`/rooms`, data);
};

export const refreshRooms = () => {
  // 5초마다 방들 불러오기
  return instance.get(`/rooms/sse`);
};

export const getRoom = (roomId) => {
  // 특정 방 정보 불러오기
  return instance.get(`/rooms/${roomId}`);
};

export const joinRoom = (roomId) => {
  // 방 참가
  return instance.post(`/rooms/${roomId}`);
};

export const destroyRoom = (roomId) => {
  // 방 삭제
  return instance.delete(`/rooms/${roomId}`);
};

export const leaveRoom = (roomId) => {
  // 게임 나가기 (마지막 사람이 나가면 자동 방 삭제)
  return instance.delete(`/rooms/${roomId}/users/me`);
};

// Default
// axios.default.paramsSerializer = params => {
//   return qs.stringify(params);
// }
// const params = {
//   search:{
//     category : 'category',
//     page : 'page',
//   }
// }
