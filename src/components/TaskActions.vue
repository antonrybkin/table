<template>
    <div class="tasks-table__actions">
        <div class="tasks-table__actions__clear" @click="$store.commit('clearCheckboxes')"><img src="@/assets/img/icons/close.svg" alt=""></div>
        <div>Выбрано: {{ items.length }}</div>
        <div class="tasks-table__actions__remove" @click="remove"><img src="@/assets/img/icons/remove.svg" alt=""></div>
        <div class="tasks-table__actions__remove"><img src="@/assets/img/icons/category.svg" alt=""></div>
        <v-select :options="taskNames"
                  v-model="selectedCategory"
                  :clearable="false" class="tasks-table__actions__select">
            <template #open-indicator="{ attributes }">
                    <span v-bind="attributes">
                        &#9662;
                    </span>
            </template>
            <span slot="no-options">Не найдено</span>
        </v-select>
        <button class="tasks-table__actions__btn" @click="setCategory">Установить</button>

        <modal :show="modal.show"
               :msg="modal.msg"
               btnYes
               btnNo
               @confirm="removeTasks(items)"
               @close="modal.show = false" />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Modal from '@/components/Modal';
import deepLoop from "@/helpers/deep-loop";

export default {
    name: 'TaskActions',
    components: { Modal },
    props: {
        items: Array
    },
    data() {
        return {
            selectedCategory: null,
            modal: {
                show: false,
                msg: "",
            },
            itemsLine: this.items.map(item => ' ' + item.name).join()
        }
    },
    computed: {
        taskNames() {
            let tasks = deepLoop(this.$store.getters.tasks).map(task => {
                return { label: task.name, value: task.id, sId: Math.random() }
            });
            tasks.unshift({ label: "...", value: "root" });
            const filtredTasks = tasks.filter(task => typeof task === "object" && task !== null);
            return filtredTasks
        }
    },
    methods: {
        ...mapActions(['removeTasks', 'changeCategory']),

        setCategory(){
            const id = this.selectedCategory.value;
            const items = this.items;
            this.changeCategory({ id, items });
        },

        remove() {
            this.modal.show = true;
            this.modal.msg = "Действительно ходите удалить " + this.itemsLine + "?";
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

    &__select {
        margin-left: 13px;
        width: 211px;
        height: 28px;
        background: #FFFFFF;
        border: 1px solid #EEEEEE;
    }

    &__btn {
        margin: 0 10px;
        border: 1px solid #C6CDD3;
        box-sizing: border-box;
        border-radius: 3px;
        background: transparent;
        outline: none;
        font-weight: bold;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        color: #2067B0;
    }
}
</style>