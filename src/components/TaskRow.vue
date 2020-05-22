<template>
    <tr :class="{ 'tasks-table__white' : task.children.length < 1, 'tasks-table__red' : task.redMark }" v-if="!task.removed">
        <th class="tasks-table__id"><div>{{ task.id }}</div></th>
        <td class="tasks-table__checkbox"><input type="checkbox" :checked="value" @change="recursivelyCheck(task, $event.target.checked)" /></td>
        <td class="tasks-table__name">
                <i v-if="task.children && task.children.length" class="tasks-table__arrow" @click="$emit('expand', task.id)" />
                <label v-show="!editName"
                       @click="changeName"
                       class="tasks-table__name-label">{{ task.name }}</label>
                <input v-show="editName"
                       ref="inputName"
                       type="text"
                       v-model="inputName"
                       v-on:blur="saveName(task.id)"
                       @keyup.enter="saveName(task.id)"
                       class="tasks-table__name-input">
        </td>
        <td>{{ task.duration }} дней</td>
        <DateCell :value="task.start" :editable="!task.children.length" @update="updateStart" />
        <DateCell :value="task.end" :from="task.start" :editable="!task.children.length" @update="updateEnd" />
        <td class="tasks-table__order">
                <label v-show="!editOrder"
                       @click="changeOrder"
                       class="tasks-table__order-label">{{ task.order }}</label>
                <input v-show="editOrder"
                       ref="inputOrder"
                       type="number"
                       v-model="inputOrderValue"
                       v-on:blur="saveOrder(task.id)"
                       @keypress="onlyNumber"
                       @keyup.enter="saveOrder(task.id)"
                       class="tasks-table__order-input">
        </td>
        <td>{{ task.hours }} ч</td>
        <td class="tasks-table__select">
            <v-select v-if="!task.children || task.children.length < 1"
                      @input="newResource => setResourse(task.id, newResource)"
                      :options="$store.state.resources"
                      :value="task.resource"
                      :clearable="false">
                <template #open-indicator="{ attributes }">
                    <span v-bind="attributes">
                        &#9662;
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

export default {
    name: "TaskRow",
    components: { DateCell },
    props: {
        task: Object
    },
    computed: {
        value() {
            return this.task.checked
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
        ...mapActions(['setFlag', 'setParentFlag']),
        changeName() {
            this.inputName = this.task.name;
            this.editName = true;
            this.$nextTick(() => {
                this.$refs.inputName.focus();
            })
        },

        saveName(id) {
            this.editName = false;
            this.$store.commit('setName', { id, value: this.inputName });
        },

        changeOrder() {
            this.inputOrderValue = this.task.order;
            this.editOrder = true;
            this.$nextTick(() => {
                this.$refs.inputOrder.focus();
            })
        },

        saveOrder(id) {
            this.editOrder = false;
            this.$store.commit('setOrder', { id, value: this.inputOrderValue });
        },

        onlyNumber ($event) {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if ((keyCode < 48 || keyCode > 57)) {
                $event.preventDefault();
            }
        },

        setResourse(id, value) {
            this.$store.commit('setResourse', { id, value })
        },

        recursivelyCheck(el, val) {
            const id = el.id;
            this.setFlag({ id, value: val });
            for(let child of el.children){
                this.recursivelyCheck(child, val)
            }
        },

        changeFlag() {
            this.recursivelyCheck(this.task)
        },

        updateStart(value) {
            const id = this.task.id;
            this.$store.commit('setStart', { id, value })
        },

        updateEnd(value) {
            const id = this.task.id;
            this.$store.commit('setEnd', { id, value })
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