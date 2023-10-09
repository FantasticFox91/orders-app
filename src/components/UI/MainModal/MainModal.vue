<script setup lang="ts">
import './modal.scss'
import { useModalsStore } from '@/stores/modals'

defineProps({
  withButton: {
    type: Boolean,
    default: false
  }
})
const useModals = useModalsStore()

const closeModal = () => {
  useModals.isError = false
  useModals.errorMessage = ''
}

const onClickOutside = (e: Event) => {
  const target = e.target as HTMLDivElement
  if (!target.closest('.modal__container')) closeModal()
}
</script>

<template>
  <div class="modal" @click="onClickOutside">
    <div class="modal__container">
      <div class="modal__content">
        <slot></slot>
        <button v-if="withButton" class="button modal__button" @click="closeModal">Ок</button>
      </div>
    </div>
  </div>
</template>
