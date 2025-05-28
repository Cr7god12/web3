
<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="modal-close" @click="$emit('close')">×</button>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  min-width: 320px;
  max-width: 90vw;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  position: relative;
}
.modal-close {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
