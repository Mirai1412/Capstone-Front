# Fafia (CapstoneFront)

## 개요

Fafia는 온라인 화상 마피아 게임입니다.  
웹 환경에서 친구들과 함께 같은 공간에 있는 것 처럼 얼굴을 보며 마피아 게임을 즐길 수 있습니다.

## 셋업

```bash
# 종속된 라이브러리 설치
npm install

# 서버 실행 (포트: 7000)
npm run dev
```

백엔드 설치에 관한 설명은 [여기](https://github.com/MJoon-Jung/Mafia)로.

## 사용 기술

사용된 기술에 관한 내용입니다.

```bash
# Framework
Nuxt

# Libraries
tensorflow.js, mediapipe - 손 및 얼굴 인식과 그에 따른 상호작용을 구현하기 위해 사용

nuxt-socket-io - 게임 내・외부에서 클라이언트와 서버의 통신을 위해 사용 (채팅, 방 목록 불러오기, 게임 진행 등등)

vue-styled-components - 특정 컴포넌트 구현을 위해 사용

tailwindCSS - 전체적인 CSS에 적용

and more...
```
