<template>
  <div class="pagination">
    <button @click="togglePage(-1)" :disabled="isThisFirstPage">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5 19L8.5 12L15.5 5"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <button @click="togglePage(1)" :disabled="isThisLastPage">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.5 19L15.5 12L8.5 5"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  name: "UsersPagination",
  props: {
    contentLength: {
      type: Number,
      required: false,
      default: 0,
    },
    contentPerPage: {
      type: Number,
      required: false,
      default: 10,
    },
    modelValue: Number,
  },
  emits: ["update:modelValue"],
  methods: {
    setPage(newPage) {
      if (this.isPageValid(newPage)) {
        this.$emit("update:modelValue", newPage);
      }
    },
    togglePage(offset) {
      const currentPage = this.modelValue;
      this.setPage(currentPage + offset);
    },
    isPageValid(pageNumber) {
      return pageNumber >= 0 && pageNumber < this.pagesAmount;
    },
  },
  computed: {
    isThisFirstPage() {
      return this.modelValue === 0;
    },
    isThisLastPage() {
      return this.modelValue == this.pagesAmount - 1;
    },
    pagesAmount() {
      if (this.contentPerPage >= this.contentLength) {
        return 1;
      }

      return Math.ceil(this.contentLength / this.contentPerPage);
    },
  },
};
</script>
