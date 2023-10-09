<script setup lang="ts">
import MainHeader from '@/components/MainHeader/MainHeader.vue'
import OrderTable from '@/components/OrderTable/OrderTable.vue'
import { useOrderStore } from '@/stores/order'

const orderStore = useOrderStore()
</script>

<template>
  <MainHeader />
  <main class="container">
    <OrderTable :orders="orderStore.orders" />
  </main>
</template>
