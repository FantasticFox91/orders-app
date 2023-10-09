<script setup lang="ts">
import LoginForm from '../components/Form/login/LoginForm.vue'
import MainModal from '@/components/UI/MainModal/MainModal.vue'
import { useModalsStore } from '@/stores/modals'

const useModals = useModalsStore()
</script>

<template>
  <main class="login">
    <LoginForm />
  </main>
  <Teleport to="body">
    <MainModal :withButton="true" v-show="useModals.isError">
      <p class="modal__text">{{ useModals.errorMessage }}</p>
    </MainModal>
  </Teleport>
</template>

<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
