<template>
  <div class="search-container">
    <svg
      fill="none"
      height="17"
      viewBox="0 0 17 17"
      width="17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_4156_70)">
        <path
          clip-rule="evenodd"
          d="M11.0938 13.3789C10.0539 14.0142 8.83157 14.3803 7.52377 14.3803C3.73667 14.3803 0.666626 11.3103 0.666626 7.52316C0.666626 3.73606 3.73667 0.666016 7.52377 0.666016C11.3109 0.666016 14.3809 3.73606 14.3809 7.52316C14.3809 8.83096 14.0148 10.0533 13.3795 11.0931L16.0952 13.8089C16.7549 14.4685 16.7615 15.4283 16.0952 16.0946C15.4344 16.7553 14.4658 16.7509 13.8095 16.0946L11.0938 13.3789ZM7.52377 12.0946C10.0485 12.0946 12.0952 10.0479 12.0952 7.52316C12.0952 4.99843 10.0485 2.95173 7.52377 2.95173C4.99904 2.95173 2.95234 4.99843 2.95234 7.52316C2.95234 10.0479 4.99904 12.0946 7.52377 12.0946Z"
          fill="#B9BABB"
          fill-rule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="clip0_4156_70">
          <rect
            fill="white"
            height="16"
            transform="translate(0.666626 0.666016)"
            width="16"
          />
        </clipPath>
      </defs>
    </svg>
    <input
      class="search-input"
      placeholder="Search"
      @input="handleInput($event)"
    >
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['updateService'])
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value.length >= 3 || target.value.length === 0) {
    emit('updateService', target.value)
  }
}
</script>
<style scoped>
.search-container {
  align-items: center;
  background-color: #ffffff;
  border: 2px solid #ccc;
  border-radius: 4px;
  display: flex;
  padding-left: 10px;
  position: relative;
  width: 209px;
}

.search-input {
  border: none;
  box-sizing: border-box;
  outline: none;
  padding: 10px;
  width: 100%;
}

.search-icon {
  color: #888;
  height: 24px;
  left: 10px;
  position: absolute;
  width: 24px;
}
</style>
