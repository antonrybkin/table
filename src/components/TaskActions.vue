<template>
  <div class="tasks-table__actions">
    <div class="tasks-table__actions__clear" @click="$emit('clearCheckboxes')"><img src="@/assets/img/icons/close.svg" alt=""></div>
    <div>Выбрано: {{ items.length }}</div>
    <div class="tasks-table__actions__remove" @click="remove"><img src="@/assets/img/icons/remove.svg" alt=""></div>

    <modal :show="modal.show" :msg="modal.msg" btnOk="Нет" @close="modal.show = false" />
  </div>
</template>

<script>
import Modal from '@/components/Modal';

export default {
  name: 'TaskActions',
  components: { Modal },
  props: {
    items: Array
  },
  data() {
    return {
      modal: {
        show: false,
        msg: "",
      }
    }
  },
  methods: {
    remove() {
      this.modal.show = true;
      this.modal.msg = "Серьёздно?"
    }
  }
}
</script>

<style lang="scss">
.tasks-table__actions {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 70px;
  background: #F9FAFB;

  &__clear {
    margin-right: 21px;
    cursor: pointer;
  }

  &__remove {
    margin-left: 37px;
    cursor: pointer;
  }
}
</style>