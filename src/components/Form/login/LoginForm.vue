<script setup lang="ts">
import '../form.scss'
import FormInput from '@/components/UI/FormInput/FormInput.vue'
import MainButton from '@/components/UI/MainButton/MainButton.vue'
import { useAuthStore } from '@/stores/auth'
import { ref, computed } from 'vue'

const store = useAuthStore()
const formElement = ref(null)
const formData = ref({
  userName: '',
  password: ''
})

const onSubmit = () => {
  store.login(formData.value)
}

const isButtonDisabled = computed(() => {
  return !(formData.value.userName.length && formData.value.password.length >= 8)
})
</script>

<template>
  <h1>Авторизация</h1>
  <form class="form" method="POST" ref="formElement" @submit.prevent="onSubmit">
    <FormInput
      label="Имя пользователя"
      name="userName"
      type="text"
      placeholder="Введите имя пользователя"
      v-model="formData.userName"
    />
    <FormInput
      label="Пароль"
      name="password"
      type="password"
      placeholder="Введите пароль"
      autocomplete="current-password"
      v-model="formData.password"
    />
    <MainButton :disabled="isButtonDisabled" type="submit" label="Войти" />
  </form>
</template>
