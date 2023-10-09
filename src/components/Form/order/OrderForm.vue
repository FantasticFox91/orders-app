<script setup lang="ts">
import '../form.scss'
import './order-form.scss'
import FormInput from '@/components/UI/FormInput/FormInput.vue'
import MainButton from '@/components/UI/MainButton/MainButton.vue'
import { ref, computed } from 'vue'
import { useOrderStore } from '@/stores/order'
import { useAuthStore } from '@/stores/auth'

const useAuth = useAuthStore()
const store = useOrderStore()

const formElement = ref(null)
const formData = ref({
  userName: useAuth.user.name,
  address: '',
  comment: ''
})

const onSubmit = () => {
  store.addOrder(formData.value)
}

const isButtonDisabled = computed(() => {
  return !formData.value.address.length
})
</script>

<template>
  <form class="form order-form" method="POST" ref="formElement" @submit.prevent="onSubmit">
    <FormInput
      label="Имя"
      name="userName"
      type="text"
      placeholder="Введите имя пользователя"
      v-model="formData.userName"
      :disabled="true"
    />
    <FormInput
      label="Адрес"
      name="address"
      type="text"
      placeholder="Введите адрес"
      v-model="formData.address"
      required
    />
    <FormInput
      label="Комментарий"
      name="comment"
      type="text"
      placeholder="Комментарий"
      v-model="formData.comment"
    />
    <MainButton :disabled="isButtonDisabled" type="submit" label="Добавить заказ" />
  </form>
</template>
