// https://vuex.vuejs.org/en/actions.html

export default {
    setTasks(context, { id, value }) {
        // ЗДЕСЬ БУДЕТ GET ЗАПРОС ДЛЯ ПОЛУЧЕНИЯ JSON С ЗАДАЧАМИ
        context.commit(`SET_TASKS`, tasks)
    },

    setName(context, { id, value }) {
        // ЗДЕСЬ БУДЕТ ЗАПРОС НА ИЗМЕНЕНИЕ НАЗВАНИЯ ЗАДАЧИ В БД
        context.commit(`SET_NAME`, { id, value })
    },

    setHours(context, { id, value }) {
        // ЗДЕСЬ БУДЕТ ЗАПРОС НА ИЗМЕНЕНИЕ ТРУДОЗАТРАТ
        context.commit(`SET_HOURS`, { id, value })
    },

    setOrder(context, { id, value }) {
        // ЗДЕСЬ БУДЕТ ЗАПРОС НА УСТАНОВКУ ПРЕДШЕТСТВЕННИКА
        context.commit(`SET_ORDER`, { id, value })
    },

    setStart(context, { id, value }) {
        // ЗДЕСЬ БУДЕТ ЗАПРОС НА УСТАНОВКУ ДАТЫ СТАРТА ЗАДАЧИ
        context.commit(`SET_START`, { id, value })
    },

    setEnd(context, { id, value }) {
        // ЗДЕСЬ БУДЕТ ЗАПРОС НА УСТАНОВКУ ДЕДЛАЙНА К ЗАДАЧЕ
        context.commit(`SET_END`, { id, value })
    },

    setResource(context, { id, value }) {
        // ЗДЕСЬ БУДЕТ ЗАПРОС НА ПРИСОЕДИНЕНИЕ РЕСУРСА К ЗАДАЧЕ
        context.commit(`SET_RESOURCE`, { id, value })
        context.commit(`UPDATE_MARKS`)
    },

    setFlag(context, { id, value }) {
        context.commit(`SET_FLAG`, { id, value })
        if(value === false) {
            context.commit(`UNSET_PARENT_FLAG`, id)
        }
    },

    removeTasks(context, items) {
        // ЗДЕСЬ БУДЕТ ЗАПРОС НА УДАЛЕНИЕ ЗАДАЧИ С СЕРВЕРА
        context.commit(`PRE_REMOVE_TASKS`, items)
        context.commit(`REMOVE_TASKS`, items)
    },

    changeCategory(context, { id, items }) {
        // ЗДЕСЬ БУДЕТ ЗАПРОС НА СМЕНУ ВЛОЖЕННОСТИ
        context.commit(`PRE_REMOVE_TASKS`, items)
        context.commit(`SET_CATEGORY`, { id, items })
        context.commit(`REMOVE_TASKS`, items)
    },

    dropRow(context, { id, item }) {
        // ЗДЕСЬ БУДЕТ ЗАПРОС НА СМЕНУ ВЛОЖЕННОСТИ
        context.commit(`PRE_REMOVE_TASKS`, [item])
        context.commit(`DROP_ROW`, { id, item })
        context.commit(`REMOVE_TASKS`, [item])
    },
};
