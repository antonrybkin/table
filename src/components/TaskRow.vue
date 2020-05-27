<template>
    <tr :class="{ 'tasks__table__row_white' : task.children.length < 1, 'tasks__table__row_red' : task.redMark }">
        <th class="tasks__table__id"><div>{{ task.id }}</div></th>
        <td>
            <Checkbox v-model="value" />
        </td>
        <td class="tasks__table__name">
            <div class="tasks__table__name__arrow" @click="$emit('expand', task.id)">
                <svg
                  v-if="task.children && task.children.length"
                  alt="развернуть"
                  width="3"
                  height="6"
                  viewBox="0 0 3 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3L0.75 0.401924L0.75 5.59808L3 3Z" fill="#AFB5BB"/>
                </svg>
            </div>

            <label v-show="!editName"
                       @click="changeName"
                       class="tasks__table__name__label">{{ task.name }}</label>
                <input v-show="editName"
                       ref="inputName"
                       type="text"
                       v-model="inputName"
                       v-on:blur="saveName(task.id)"
                       @keyup.enter="saveName(task.id)"
                       class="tasks__table__name__input">
        </td>
        <td><div class="tasks__table__padding-cell">{{ task.duration }} дней</div></td>
        <DateCell :value="task.start" :editable="!task.children.length" @update="updateStart" />
        <DateCell :value="task.end" :from="task.start" :editable="!task.children.length" @update="updateEnd" />
        <td class="tasks__table__order">
                <label v-show="!editOrder"
                       @click="changeOrder"
                       class="tasks__table__order__label">{{ task.order }}</label>
                <input v-show="editOrder"
                       ref="inputOrder"
                       type="number"
                       v-model="inputOrderValue"
                       v-on:blur="saveOrder(task.id)"
                       @keypress="onlyNumber"
                       @keyup.enter="saveOrder(task.id)"
                       class="tasks__table__order__input">
        </td>
        <td><div class="tasks__table__padding-cell">{{ task.hours }} ч</div></td>
        <td class="tasks__table__select">
            <v-select v-if="!task.children || task.children.length < 1"
                      @input="newResource => putResourse(task.id, newResource)"
                      :options="$store.state.resources"
                      :value="task.resource"
                      :clearable="false">
                <template #open-indicator="{ attributes }">
                    <span v-bind="attributes">
                        <img src="@/assets/img/icons/arrow_down.svg" alt="">
                    </span>
                </template>
                <span slot="no-options">Нет таких ресурсов</span>
            </v-select>
        </td>
    </tr>
</template>

<script>
import { mapActions } from 'vuex';
import DateCell from '@/components/DateCell';
import Checkbox from '@/components/Checkbox';

export default {
    name: "TaskRow",
    components: { DateCell, Checkbox },
    props: {
        task: Object
    },
    computed: {
        value: {
            get: function () {
                return this.task.checked
            },
            set: function (newValue) {
                const recursivelyCheck = (el, val) => {
                    const id = el.id;
                    this.setFlag({ id, value: val });
                    for(let child of el.children){
                        recursivelyCheck(child, val)
                    }
                }
                recursivelyCheck(this.task, newValue)
            }
        }
    },
    data() {
        return {
            checked: this.task.checked,
            editName: false,
            editOrder: false,
            inputName: "",
            inputOrderValue: 0
        }
    },
    methods: {
        ...mapActions(['setFlag', 'setResource', 'setStart', 'setEnd', 'setName', 'setOrder']),

        changeName() {
            this.inputName = this.task.name;
            this.editName = true;
            this.$nextTick(() => {
                this.$refs.inputName.focus();
            })
        },

        saveName(id) {
            this.editName = false;
            this.setName({ id, value: this.inputName });
        },

        // Рекактирование Предшественника
        changeOrder() {
            this.inputOrderValue = this.task.order;
            this.editOrder = true;
            this.$nextTick(() => {
                this.$refs.inputOrder.focus();
            })
        },

        // Сохранение Предшественника
        saveOrder(id) {
            this.editOrder = false;
            this.setOrder({ id, value: this.inputOrderValue });
        },

        // Предшественник может быть только числом
        onlyNumber ($event) {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if ((keyCode < 48 || keyCode > 57)) {
                $event.preventDefault();
            }
        },

        putResourse(id, value) {
            this.setResource({ id, value })
        },

        changeFlag() {
            this.recursivelyCheck(this.task)
        },

        updateStart(value) {
            const id = this.task.id;
            this.setStart({ id, value })
        },

        updateEnd(value) {
            const id = this.task.id;
            this.setEnd({ id, value })
        }
    }
}
</script>

<style>
div.vs__dropdown-toggle {
    border: 0;
}
.v-select:not(.vs--open) .vs__search {
    position: absolute;
}
</style>