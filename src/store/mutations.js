// https://vuex.vuejs.org/en/mutations.html

import deepLoop from "@/helpers/deep-loop"
import setCategoryDates from "@/helpers/set-category-dates";

// Для поиска задачи в дере по ключу id
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
  SET_TASK(state, tasks) {
    state.tasks = tasks
  },

  SET_NAME(state, { id, value }) {
    findById(state.tasks, id).name = value
  },

  SET_ORDER(state, { id, value }) {
    findById(state.tasks, id).order = value
  },

  SET_START(state, { id, value }) {
    findById(state.tasks, id).start = value
    setCategoryDates(state.tasks)
  },

  SET_END(state, { id, value }) {
    findById(state.tasks, id).end = value
    setCategoryDates(state.tasks)
  },

  SET_RESOURCE(state, { id, value }) {
    findById(state.tasks, id).resource = value
  },

  SET_FLAG(state, { id, value }) {
    findById(state.tasks, id).checked = value;
  },

  UNSET_PARENT_FLAG(state, id) {
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

  REMOVE_TASKS(state, items) {
    items.forEach(item => {
      findById(state.tasks, item.id).removed = true
    })
  },

  clearCheckboxes(state) {
    deepLoop(state.tasks).forEach(task => task.checked = false);
    state.checkAll = false;
  },

  checkAll(state) {
    deepLoop(state.tasks).forEach(task => task.checked = state.checkAll);
  },
};
