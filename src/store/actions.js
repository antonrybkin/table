// https://vuex.vuejs.org/en/actions.html

export default {
  setOrder(context, { id, value }) {
    context.commit(`SET_ORDER`, { id, value })
  },
};
