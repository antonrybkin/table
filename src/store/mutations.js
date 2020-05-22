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
  setName(state, { id, value }) {
    findById(state.tasks, id).name = value
  },

  setOrder(state, { id, value }) {
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
    if(value) {
      findById(state.tasks, id).hours = value
    }
  },

  setFlag(state, { id, value }) {
    findById(state.tasks, id).checked = value;
  },

  setParentFlag(state, id) {
    const flatTasks = deepLoop(state.tasks);

    function getParent(ID) {
      flatTasks.forEach(task => {
        if(task.children.length > 0) {
          if(task.children.some(t => t.id === ID)) {
            task.checked = false;
            getParent(task.id);
          }
        }
      })
    }

    getParent(id);
    state.checkAll = false;
  },

  clearCheckboxes(state) {
    deepLoop(state.tasks).forEach(task => task.checked = false);
    state.checkAll = false;
  },

  checkAll(state) {
    deepLoop(state.tasks).forEach(task => task.checked = state.checkAll);
  },

  removeTasks(state, items) {
    items.forEach(item => {
      findById(state.tasks, item.id).removed = true
    })
  },
};
