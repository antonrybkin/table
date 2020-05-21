// https://vuex.vuejs.org/en/mutations.html

import deepLoop from "@/helpers/deep-loop"
import setCategoryDates from "@/helpers/set-category-dates";

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
    setCategoryDates(state.tasks)
  },

  setEnd(state, { id, value }) {
    findById(state.tasks, id).end = value
    setCategoryDates(state.tasks)
  },

  setResourse(state, { id, value }) {
    findById(state.tasks, id).resource = value
  },

  setHours(state, { id, value }) {
    //console.log(value);
    if(value) {
      console.log(value);
      findById(state.tasks, id).hours = value
    }
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

  removeTasks(state, items) {
    const flat = deepLoop(state.tasks)
    items.forEach(item => {
      const i = state.tasks.map(item => item.id).indexOf(item.id);
      console.log(i);
      state.tasks.splice(i, 1);
    })
  },
};
