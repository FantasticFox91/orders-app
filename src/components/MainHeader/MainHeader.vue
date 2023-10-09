<script setup lang="ts">
import './header.scss'
import MainNavigation from '@/components/UI/MainNavigation/MainNavigation.vue'
import MainUser from '@/components/UI/MainUser/MainUser.vue'
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <MainNavigation />
      <MainUser />
    </div>
  </header>
</template>
