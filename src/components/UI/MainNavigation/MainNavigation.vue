<script setup lang="ts">
import './navigation.scss'
</script>

<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li class="navigation__item">
        <RouterLink class="navigation__link" active-class="navigation__link--active" to="/"
          >Все заказы</RouterLink
        >
      </li>
      <li class="navigation__item">
        <RouterLink class="navigation__link" active-class="navigation__link--active" to="/order"
          >Добавить заказ</RouterLink
        >
      </li>
    </ul>
  </nav>
</template>
