<template>
    <div class="tasks">
        <div class="tasks-search">
            <label for="search">Поиск: </label>
            <input name="search" type="text" id="search" v-model="search" class="tasks-search__input" />
        </div>

        <table class="tasks-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th class="tasks-table__checkbox">
                        <Checkbox v-model="$store.state.checkAll" @input="$store.commit('checkAll')" />
                    </th>
                    <th>Название задачи</th>
                    <th>Длительность</th>
                    <th>Начало</th>
                    <th>Окончание</th>
                    <th>Предшественник</th>
                    <th>Трудозатраты</th>
                    <th>Название ресурсов</th>
                </tr>
            </thead>
            <draggable v-show="!loading"
                       v-model="flat"
                       tag="tbody"
                       :move="moveRow"
                       @change="dragRow"
                       handle=".tasks-table__id">
                <template v-for="task in filterTasks">
                    <TaskRow :key="task.id"
                             :task="task"
                             class="tasks-table__row_lavel1"
                             :class="{ 'isOpen' : expanded[task.id] }"
                             @expand="expand" />
                    <template v-if="task.id in expanded && expanded[task.id]">
                        <template v-for="(taskLavel2, index1) in task.children">
                            <TaskRow :key="`key1${index1}-${taskLavel2.id}`"
                                     :task="taskLavel2"
                                     class="tasks-table__row_lavel2"
                                     :class="{ 'isOpen' : expanded[taskLavel2.id] }"
                                     @expand="expand" />
                            <template v-if="taskLavel2.id in expanded && expanded[taskLavel2.id]">
                                <template v-for="(taskLavel3, index2) in taskLavel2.children">
                                    <TaskRow :key="`key2${index2}-${taskLavel3.id}`"
                                             :task="taskLavel3"
                                             class="tasks-table__row_lavel3"
                                             :class="{ 'isOpen' : expanded[taskLavel3.id] }"
                                             @expand="expand" />
                                    <template v-if="taskLavel3.id in expanded && expanded[taskLavel3.id]">
                                        <template v-for="(taskLavel4, index3) in taskLavel3.children">
                                            <TaskRow :key="`key3${index3}-${taskLavel4.id}`"
                                                     :task="taskLavel4"
                                                     class="tasks-table__row_lavel4"
                                                     :class="{ 'isOpen' : expanded[taskLavel4.id] }"
                                                     @expand="expand" />
                                            <template v-if="taskLavel4.id in expanded && expanded[taskLavel4.id]">
                                                <template v-for="(taskLavel5, index5) in taskLavel4.children">
                                                    <TaskRow :key="`key3${index5}-${taskLavel5.id}`"
                                                             :task="taskLavel5"
                                                             class="tasks-table__row_lavel4"
                                                             :class="{ 'isOpen' : expanded[taskLavel5.id] }"
                                                             @expand="expand" />
                                                </template>
                                            </template>
                                        </template>
                                    </template>
                                </template>
                            </template>
                        </template>
                    </template>
                </template>
            </draggable>
        </table>
        <div v-if="filterTasks.length < 1" class="tasks-table__no-results">Нет задач.</div>
        <TaskActions v-if="toActionArray.length" :items="toActionArray" />

        <modal :show="modal.show"
               btnYes
               btnNo
               @confirm="confirmDragRow"
               @close="modal.show = false">
            Переметить задачу <b>{{ drag.item.name }}</b> с подзадачами в категорию <b>{{ drag.relatedContext.name }}</b>?
        </modal>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapActions } from 'vuex';
import deepLoop from "@/helpers/deep-loop";
import TaskRow from '@/components/TaskRow';
import TaskActions from '@/components/TaskActions';
import Checkbox from '@/components/Checkbox';
import Modal from '@/components/Modal';

export default {
    name: "TasksTable",
    components: { TaskActions, TaskRow, Checkbox, draggable, Modal },
    data() {
        return {
            search: "",
            expanded: [],
            loading: true,
            drag: {
                relatedContext: {
                    id: null,
                    name: '',
                },
                item: {
                    id: null,
                    name: '',
                }
            },
            modal: {
                show: false,
            },
        }
    },
    computed: {
        // Поиск
        filterTasks: {
            get() {
                return this.$_find(this.$store.getters.tasks, this.filterBy);
            },
            set(value) {
                console.log(value);
            }
        },

        flat: {
            get() {
                return deepLoop(this.filterTasks)
            },
            set(value) {
                // console.log(value);
            }
        },

        // Список задач с установленным флажком
        toActionArray() {
            return this.flat.filter(task => task.checked === true)
        }
    },
    methods: {
        ...mapActions(['dropRow']),

        // Вспомогательная функция, для поиска
        $_find(items, predicate) {
            let matches = [];
            for (let item of items) {
                if (predicate(item)) {
                    matches.push(item);
                }
                else if (item.children.length) {
                    let subMatches = this.$_find(item.children, predicate);

                    if (subMatches.length) {
                        matches.push({
                            ...item,
                            children: subMatches
                        });
                    }
                }
            }
            return matches;
        },

        // Для поиска
        filterBy(item) {
            return item.name.toLowerCase().includes(this.search.toLowerCase());
        },

        // Toggle задач-категорий
        expand(id) {
            const bul =  this.expanded[id] ? 0 : 1;
            this.$set(this.expanded, id, bul);
        },

        // Следим за перемещеием строк
        moveRow(value) {
            this.drag.relatedContext = this.flat.find(task => task.id.toString() === value.originalEvent.target.textContent);
            if(this.drag.relatedContext === undefined) this.drag.relatedContext = { name: "Корень", id: "root" };
            console.log(this.drag.relatedContext);
            this.drag.item = this.flat.find(task => task.id.toString() === value.dragged.cells[0].textContent);
        },

        // Обработчик перемещения строки
        dragRow(event) {
            const childrenIds = this.drag.item.children.length > 0 ? this.drag.item.children.map(task => task.id) : null;
            // Запрещаем перемещать задачу в саму себя и в свои дочерние задачи следующей проверкой:
            if((this.drag.relatedContext.id !== this.drag.item.id.toString())
                && (childrenIds === null || !(childrenIds.includes(Number(this.drag.relatedContext.id))))) {
                this.modal.show = true; // Показываем окно-подтверждение
            }
        },

        // Подтверждение перемещения строки
        confirmDragRow() {
            this.modal.show = false; // Скрываем окно-подтверждение
            let item = this.drag.item; // Добавляем перемещаемую задачу в пустой массив

            // Запускаем действие (action) смены категории (id) для массива items
            this.dropRow({ id: this.drag.relatedContext.id, item });
        }
    },
    created() {
        deepLoop(this.filterTasks).forEach(task => this.expand(task.id))
    },
    mounted() {
        // Для корректного проставления часов
        setTimeout(() => {
            this.expanded = []
            this.loading = false
        },0)
    }
}
</script>

<style lang="scss">
.tasks {
    &-search {
        text-align: right;
        margin: 7px 0;

        &__input {
            width: 200px;
            padding: 0 6px;
            height: 28px;
            border: 1px solid #EEEEEE;
            outline: none;
        }
    }

    &-table {
        width: 100%;
        border-collapse: collapse;

        &__no-results {
            margin: 10px auto;
            text-align: center;
        }

        th, td {
            border: 2px solid #D3D3D3;
            text-align: left;
            font-weight: bold;
            white-space: nowrap;
        }

        td {
            border-collapse: collapse;
            padding: 0;
            background: #F0F0F0;
            text-align: right;
        }

        thead th {
            background: linear-gradient(rgba(213, 238, 248, 1), rgba(183, 226, 241, 1));
            text-align: center;
            padding: 11px 9px;
        }

        &__padding-cell {
            padding: 10px;
        }

        &__id {
            background: #F0F0F0;
            width: 45px;
            min-width: 45px;
            cursor: move;

            &-wrapper {
                padding: 10px;
                text-align: left;
                color: #717A84;
            }
        }

        .tasks-table__checkbox {
            padding: 0;
        }

        .tasks-table__name {
            width: 443px;
            position: relative;
            box-sizing: border-box;

            &-arrow {
                position: absolute;
                display: block;
                margin-left: -20px;
                padding: 9px;
                cursor: pointer;
                transition: all .15s;
            }

            &-label {
                display: block;
                width: 100%;
                padding: 10px 0;
                cursor: text;
            }

            &-input {
                width: 100%;
                height: 10px;
                padding: 10px 0;
                background: transparent;
                border: 0;
                outline: none;
            }
        }

        .tasks-table__select {
            padding: 0;
        }

        .tasks-table__order {
            padding: 0;
            width: 120px;

            &-label {
                display: block;
                padding: 10px;
                width: 100px;
                cursor: text;
            }

            &-input {
                padding: 4px 8px;
                width: 98px;
                margin: 1px;
                height: 18px;
                outline: none;
            }
        }

        &__row {
            &_lavel1 .tasks-table__name {
                padding-left: 30px;
                text-align: left;
            }

            &_lavel2 .tasks-table__name {
                padding-left: 50px;
                text-align: left;
            }

            &_lavel3 .tasks-table__name {
                padding-left: 60px;
                text-align: left;
            }

            &_lavel4 .tasks-table__name {
                padding-left: 65px;
                text-align: left;
            }

            &_lavel5 .tasks-table__name {
                padding-left: 70px;
                text-align: left;
            }

            &_white td {
                background: #fff;
                font-weight: lighter;
            }

            &_red {
                .tasks-table__id-wrapper {
                    position: relative;

                    &:before {
                        content: "";
                        position: absolute;
                        background: #F84932;
                        width: 4px;
                        height: 4px;
                        left: 3px;
                        top: 16px;
                        border-radius: 3px;
                    }
                }

                .tasks-table__cell-wrapper {
                    border-width: 0;
                    border-spacing: 0;
                    border-right: 1px solid #F84932;
                    border-top: 1px solid #F84932;
                    height: 33px;
                    position: relative;
                }

                .tasks-table__select, .date-picker {
                    border-right: 1px solid #F84932;
                    border-bottom: 1px solid #F84932;
                    height: 35px;
                    position: relative;

                    &:before {
                        content: "";
                        position: absolute;
                        background: #F84932;
                        width: 1px;
                        height: calc(100% + 2px);
                        left: -1px;
                        top: -1px;
                    }

                    &:after {
                        content: "";
                        position: absolute;
                        background: #F84932;
                        width: calc(100% + 2px);
                        height: 1px;
                        left: -1px;
                        top: -1px;
                    }
                }
            }
        }
    }
}

.isOpen .tasks-table__name-arrow {
    transform: rotate(90deg);
    border-color: transparent #545C6A;
    path {
        fill: #545C6A;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .15s
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>