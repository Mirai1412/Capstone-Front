<template lang="">
  <div class="">
    <ul class="flex list-none rounded my-2 justify-end">
      <li
        class="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-gray-200"
      >
        <a class="page-link" href="#">Previous</a>
      </li>
      <li
        class="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 hover:bg-gray-200"
      >
        <a class="page-link" href="#">1</a>
      </li>
      <li
        class="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 hover:bg-gray-200"
      >
        <a class="page-link" href="#">2</a>
      </li>
      <li
        class="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 hover:bg-gray-200"
      >
        <a class="page-link" href="#">3</a>
      </li>
      <li
        class="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 rounded-r hover:bg-gray-200"
      >
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    roomList: {
      type: Array,
    },
  },
};
</script>
<style lang=""></style>
