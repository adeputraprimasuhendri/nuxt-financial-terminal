<template>
  <section class="panel">
    <div class="panel-header">
      <span>{{ title }}</span>
      <slot name="header-right"></slot>
    </div>
    <div class="panel-content">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
