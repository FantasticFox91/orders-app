<script setup lang="ts">
import './user.scss'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const onLogoutClick = () => authStore.logout()
</script>

<template>
  <div class="user">
    <p class="user__name">{{ authStore?.user?.name }}</p>
    <button class="user__logout" type="button" @click="onLogoutClick">Выйти</button>
  </div>
</template>
