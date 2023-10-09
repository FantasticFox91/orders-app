<script setup lang="ts">
import './button.scss'

defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'button',
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button class="button" :typeButton="type" :disabled="disabled">{{ label }}</button>
</template>
