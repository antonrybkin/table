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

function getParent(root, id) {
  var i, node;
  for (var i = 0; i < root.length; i++) {
    node = root[i];
    if (node.id === id || node.children && (node = getParent(node.children, id))) {
      return node;
    }
  }
  return null;
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
    deepLoop(state.tasks).forEach(task => {
      if(task.children.length > 0) {
        if(task.children.some(t => t.id === id)) task.checked = false;
      }
    });
  },

  clearCheckboxes(state) {
    deepLoop(state.tasks).forEach(task => task.checked = false);
  },

  checkAll(state) {
    deepLoop(state.tasks).forEach(task => task.checked = true);
  },

  removeTasks(state, items) {
    items.forEach(item => {
      findById(state.tasks, item.id).removed = true
    })
  },
};
