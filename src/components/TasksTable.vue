<template>
    <div class="tasks-table">
        <div class="tasks-table__search">
            <label for="search">Поиск: </label>
            <input name="search" type="text" id="search" v-model="search" class="tasks-table__search-input" />
        </div>

        <table>
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
            <tbody v-show="!loading">
                <template v-for="task in filterTasks">
                    <TaskRow :key="task.id"
                             :task="task"
                             class="tasks-table__lavel1"
                             :class="{ 'isOpen' : expanded[task.id] }"
                             @expand="expand" />
                    <template v-if="task.id in expanded && expanded[task.id]">
                        <template v-for="taskLavel2 in task.children">
                            <TaskRow :key="taskLavel2.id"
                                     :task="taskLavel2"
                                     class="tasks-table__lavel2"
                                     :class="{ 'isOpen' : expanded[taskLavel2.id] }"
                                     @expand="expand" />
                            <template v-if="taskLavel2.id in expanded && expanded[taskLavel2.id]">
                                <template v-for="taskLavel3 in taskLavel2.children">
                                    <TaskRow :key="taskLavel3.id"
                                             :task="taskLavel3"
                                             class="tasks-table__lavel3"
                                             :class="{ 'isOpen' : expanded[taskLavel3.id] }"
                                             @expand="expand" />
                                    <template v-if="taskLavel3.id in expanded && expanded[taskLavel3.id]">
                                        <template v-for="taskLavel4 in taskLavel3.children">
                                            <TaskRow :key="taskLavel4.id"
                                                     :task="taskLavel4"
                                                     class="tasks-table__lavel4"
                                                     :class="{ 'isOpen' : expanded[taskLavel4.id] }"
                                                     @expand="expand" />
                                        </template>
                                    </template>
                                </template>
                            </template>
                        </template>
                    </template>
                </template>
            </tbody>
        </table>
        <div v-if="filterTasks.length < 1" class="tasks-table__no-results">Нет задач.</div>
        <TaskActions v-if="toActionArray.length" :items="toActionArray" />
    </div>
</template>

<script>
import deepLoop from "@/helpers/deep-loop";
import setCategoryDates from "@/helpers/set-category-dates";
import TaskRow from '@/components/TaskRow';
import TaskActions from '@/components/TaskActions';
import Checkbox from '@/components/Checkbox';

export default {
    name: "TasksTable",
    components: { TaskActions, TaskRow, Checkbox },
    data() {
        return {
            search: "",
            expanded: [],
            loading: true
        }
    },
    computed: {
        sortTasks() {
            function sorting(js_object) {
                function sortByKey(a, b) {
                    const x = a.order;
                    const y = b.order;
                    return ((x > y) ? 1 : ((x < y) ? -1 : 0));
                };
                js_object.sort(sortByKey);
            };

            function sortTasks(tasks) {
                sorting(tasks);
                for (let i = 0; i < tasks.length; i++)
                    if (tasks[i].hasOwnProperty('children'))
                        sortTasks(tasks[i].children);
            };

            const tasks = this.$store.getters.tasks;
            setCategoryDates(tasks);
            sortTasks(tasks);
            return tasks
        },

        filterTasks() {
            return this.$_find(this.sortTasks, this.filterBy);
        },

        toActionArray() {
            const flat = deepLoop(this.filterTasks);
            return flat.filter(task => {
                return task.checked === true && task.removed === false
            })
        }
    },
    methods: {
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

        filterBy(item) {
            return item.name.toLowerCase().includes(this.search.toLowerCase()) && !item.removed;
        },

        expand(id) {
            const bul =  this.expanded[id] ? 0 : 1;
            this.$set(this.expanded, id, bul);
        }
    },
    created() {
        deepLoop(this.filterTasks).forEach(task => this.expand(task.id))
    },
    mounted() {
        setTimeout(() => {
            this.expanded = []
            this.loading = false
        },0)
    }
}
</script>

<style lang="scss">
.tasks-table {
    &__search {
        text-align: right;
        margin: 7px 0;
        &-input {
            width: 200px;
            padding: 0 6px;
            height: 28px;
            border: 1px solid #EEEEEE;
            outline: none;
        }
    }

    &__no-results {
        margin: 10px auto;
        text-align: center;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        box-sizing: border-box;
        border: 2px solid #D3D3D3;
        text-align: left;
        font-weight: bold;
        padding: 10px;
        white-space: nowrap;
    }

    td {
        background: #F0F0F0;
        text-align: right;
    }

    thead th {
        background: linear-gradient(rgba(213,238,248,1), rgba(183,226,241,1));
        text-align: center;
        padding: 11px 9px;
    }

    &__id {
        background: #F0F0F0;
        width: 45px;
        min-width: 45px;

        div {
            text-align: left;
            color: #717A84;
        }
    }


    .tasks-table__name {
        padding: 0;
        width: 445px;
        position: relative;

        &-wrapper {
            display: flex;
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

    &__lavel1 td:nth-child(3) {
        padding-left: 30px;
        text-align: left;
    }

    &__lavel2 td:nth-child(3) {
        padding-left: 50px;
        text-align: left;
    }

    &__lavel3 td:nth-child(3) {
        padding-left: 60px;
        text-align: left;
    }

    &__lavel4 td:nth-child(3) {
        padding-left: 65px;
        text-align: left;
    }

    &__arrow {
        position: absolute;
        display: block;
        margin-left: -21px;
        padding: 10px;
        cursor: pointer;
        transition: all .15s;
    }

    &__white td {
        background: #fff;
        font-weight: lighter;
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

    .tasks-table__date-picker {
        padding: 0;

        > div {
            padding: 10px;
        }

        &_block {
            padding: 10px;
            cursor: pointer;
        }
    }

    .tasks-table__select {
        padding: 0;
    }

    &__red {
        .tasks-table__id {
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

        .tasks-table__date-picker, .tasks-table__select {
            border: 2px solid #F84932;
            position: relative;

            &:before {
                content: "";
                position: absolute;
                background: #F84932;
                width: 2px;
                height: calc(100% + 2px);
                left: -2px;
                top: 0;
            }

            &:after {
                content: "";
                position: absolute;
                background: #F84932;
                width: calc(100% + 4px);
                height: 2px;
                left: -2px;
                top: -1px;
            }
        }
    }
}

.isOpen .tasks-table__arrow {
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