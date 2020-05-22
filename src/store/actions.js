// https://vuex.vuejs.org/en/actions.html

export default {
    setFlag(context, { id, value }) {
        context.commit(`setFlag`, { id, value })
        if(value === false) {
            context.commit(`setParentFlag`, id)
        }
    },
};
