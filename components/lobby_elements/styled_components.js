import styled from "vue-styled-components";
export const ProgressBar = styled("div", { room: Object })`
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-text-opacity: 1;
  --tw-bg-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  text-align: center;
  white-space: nowrap;
  justify-content: center;
  background-color: ${(props) => {
    return `${
      Math.round((props.room.members.length / props.room.publishers) * 100) >=
      100
        ? "rgb(239 68 68 / var(--tw-bg-opacity))"
        : Math.round(
            (props.room.members.length / props.room.publishers) * 100
          ) >= 60
        ? "rgb(234 179 8 / var(--tw-bg-opacity))"
        : "rgb(34 197 94 / var(--tw-bg-opacity))"
    }`;
  }};
  width: ${(props) => {
    return `${Math.round(
      (props.room.members.length / props.room.publishers) * 100
    )}%`;
  }};
`;
