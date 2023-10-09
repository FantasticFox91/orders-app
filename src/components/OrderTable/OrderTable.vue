<script setup lang="ts">
import './order-table.scss'
import IconArrowSort from '@/components/icons/IconArrowSort.vue'
import MainModal from '@/components/UI/MainModal/MainModal.vue'
import { useOrderStore } from '@/stores/order'
import { useAuthStore } from '@/stores/auth'
import { ref, computed } from 'vue'

interface Order {
  id: number
  name: string
  address: string
  date: string | Date
  status: string
  comment: string
}

interface TableProps {
  orders: Order[]
}

const props = defineProps<TableProps>()
const orderStore = useOrderStore()
const authStore = useAuthStore()

const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
]
const sortType = ref('')
const isModalShown = ref(false)
const itemId = ref('')

const toggleModal = () => {
  isModalShown.value = !isModalShown.value
}

const closeModal = (e: Event) => {
  const target = e.target as HTMLDivElement
  if (!target.closest('.modal__container')) {
    isModalShown.value = false
  }
}

const sortByString = (a: Order, b: Order) => a.address.localeCompare(b.address)

const parseDate = (date: string | Date) => {
  const dateValue = new Date(date)
  if (!isNaN(dateValue.getTime())) {
    return dateValue
  }
  const dateString = date as string
  const parts = dateString.split(' ')
  const day = parseInt(parts[0])
  const month = months.indexOf(parts[1])
  const year = parseInt(parts[2])
  return new Date(year, month, day)
}

const parseOrderDate = (date: string | Date) => {
  const dateValue = new Date(date)
  if (!isNaN(dateValue.getTime())) {
    const day = dateValue.getDate() > 9 ? dateValue.getDate() : `0${dateValue.getDate()}`
    const month = dateValue.getMonth()
    const year = dateValue.getFullYear()
    return `${day} ${months[month]} ${year}`
  }
  return date
}

const sortByDate = (a: Order, b: Order) => parseDate(b.date).getTime() - parseDate(a.date).getTime()

const onUpdateOrderClick = (id: number) => {
  orderStore.updateOrder(id)
}

const onDeleteOrderClick = (id: number) => {
  toggleModal()
  itemId.value = String(id)
}

const onDeleteButtonClick = () => {
  toggleModal()
  orderStore.deleteOrder(itemId.value)
}

const onSortingButtonClick = (sortValue: string) => {
  if (sortValue !== sortType.value) return (sortType.value = sortValue)
  sortType.value = ''
}

const sortedData = computed(() => {
  if (sortType.value) {
    const dataCopy: Order[] = [...props.orders]

    switch (sortType.value) {
      case 'address':
        dataCopy.sort(sortByString)
        break
      case 'date':
        dataCopy.sort(sortByDate)
        break
      default:
        dataCopy
    }

    return dataCopy
  }

  return props.orders
})
</script>

<template>
  <div class="table">
    <div class="table__container">
      <div class="table__headings">
        <p class="table__cell">№</p>
        <p class="table__cell">Имя клиента</p>
        <p class="table__cell table__cell--sort" @click="onSortingButtonClick('address')">
          Адрес
          <button class="table__sort" type="button">
            <IconArrowSort
              class="table__icon"
              :class="{
                'table__icon--active': sortType === 'address'
              }"
            />
          </button>
        </p>
        <p class="table__cell table__cell--sort" @click="onSortingButtonClick('date')">
          Дата заказа
          <button class="table__sort" type="button">
            <IconArrowSort
              class="table__icon"
              :class="{
                'table__icon--active': sortType === 'date'
              }"
            />
          </button>
        </p>
        <p class="table__cell">Статус</p>
        <p class="table__cell">Комментарий</p>
      </div>

      <TransitionGroup name="list" tag="div" class="table__rows">
        <div
          class="table__row"
          :class="{ 'table__row--completed': order.status === 'Выполнен' }"
          v-for="order in sortedData"
          :key="order.id"
        >
          <p class="table__cell">{{ order.id }}</p>
          <p class="table__cell">{{ order.name }}</p>
          <p class="table__cell">{{ order.address }}</p>
          <p class="table__cell">{{ parseOrderDate(order.date) }}</p>
          <p class="table__cell">{{ order.status }}</p>
          <p class="table__cell">{{ order.comment }}</p>
          <div v-if="authStore.user.role === 'ADMIN'" class="table__buttons">
            <button
              class="button"
              type="button"
              v-if="order.status !== 'Выполнен'"
              @click="onUpdateOrderClick(order.id)"
            >
              Обновить
            </button>
            <button class="button" type="button" @click="onDeleteOrderClick(order.id)">
              Удалить
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
  <Teleport to="body">
    <MainModal v-show="isModalShown" @click="closeModal">
      <p class="modal__text">Вы действительно хотите удалить заказ</p>
      <div class="modal__buttons">
        <button class="button" @click="onDeleteButtonClick">Ок</button>
        <button class="button" @click="toggleModal">Отмена</button>
      </div>
    </MainModal>
  </Teleport>
</template>
