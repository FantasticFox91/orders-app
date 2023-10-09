<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainModal from './components/UI/MainModal/MainModal.vue'
import { useLoaderStore } from './stores/loader'

const useLoader = useLoaderStore()
</script>

<template>
  <RouterView />
  <Teleport to="body">
    <MainModal class="modal--loader" v-show="useLoader.isLoading">
      <div class="modal__loader"></div>
    </MainModal>
  </Teleport>
</template>
