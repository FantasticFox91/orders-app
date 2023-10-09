<script setup lang="ts">
import './form-input.scss'
import { ref, computed } from 'vue'

defineProps({
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String
  },
  autocomplete: {
    type: String,
    default: '',
  }
})
const emit = defineEmits(['update:modelValue'])
const isPasswordShown = ref(false)
const input = ref(null)

const passwordType = computed(() => {
  if (isPasswordShown.value) return 'text'
  return 'password'
})

const togglePassword = () => {
  isPasswordShown.value = !isPasswordShown.value
  const inputElement = input.value as unknown as HTMLInputElement
  inputElement.type = passwordType.value
}

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="form-input">
    <label class="form-input__label" :for="name"
      >{{ label }}<span class="form-input__star" v-if="required">*</span></label
    >
    <input
      class="form-input__input"
      :name="name"
      :id="name"
      :class="{ 'form-input__input--password': type === 'password' }"
      :type="type"
      :placeholder="placeholder"
      ref="input"
      :value="modelValue"
      @input="onInput"
      :disabled="disabled"
      :autocomplete="autocomplete"
    />
    <button
      v-if="type === 'password'"
      type="button"
      class="form-input__password-icon"
      :class="{ 'form-input__password-icon--show': isPasswordShown }"
      @click="togglePassword"
    ></button>
  </div>
</template>
