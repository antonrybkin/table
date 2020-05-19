// https://vuex.vuejs.org/en/mutations.html

import deepLoop from "@/helpers/deep-loop"

function findById(data, id) {
  function iter(a) {
    if (a.id === id) {
      result = a;
      return true;
    }
    return Array.isArray(a.children) && a.children.some(iter);
  }
  let result;
  data.some(iter);
  return result
}

export default {
  SET_ORDER(state, { id, value }) {
    findById(state.tasks, id).order = value
  },

  setStart(state, { id, value }) {
    findById(state.tasks, id).start = value
  },

  setEnd(state, { id, value }) {
    findById(state.tasks, id).end = value
  },

  setResourse(state, { id, value }) {
    findById(state.tasks, id).resource = value
  },

  setFlag(state, { id, value }) {
    findById(state.tasks, id).checked = value
  },

  clearCheckboxes(state) {
    deepLoop(state.tasks).forEach(task => task.checked = false);
  },

  checkAll(state) {
    deepLoop(state.tasks).forEach(task => task.checked = true);
  },

  removeTasks(state, { id, value }) {
    //
  },
};
