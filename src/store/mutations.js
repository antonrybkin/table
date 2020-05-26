// https://vuex.vuejs.org/en/mutations.html
import Vue from 'vue'
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

function goClone(source) {
  if (Object.prototype.toString.call(source) === '[object Array]') {
    var clone = [];
    for (var i=0; i<source.length; i++) {
      clone[i] = goClone(source[i]);
    }
    return clone;
  } else if(source && typeof source.getMonth === 'function') {
    return source;
  } else if (typeof(source)=="object") {
    var clone = {};
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        clone[prop] = goClone(source[prop]);
      }
    }
    return clone;
  } else {
    return source;
  }
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
    deepLoop(state.tasks).forEach(task => {
      if(task.id === id) task.checked = value;
    })
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
      function removeChain(tasks) {
        const fi = tasks.findIndex(task => task.id === item.id)
        if(fi >= 0) {
          tasks.splice(fi, 1)
        }
        tasks.forEach(t => {
          if(t.children.length > 0) {
            removeChain(t.children)
          }
        })
      }
      removeChain(state.tasks)
    })
  },

  SET_CATEGORY(state, { id, items }) {
    console.log({ id, items });
    let newItems =[];
    items.forEach(task => {
      const newItem = goClone(task);
      newItem.removed = false;
      newItem.checked = false;
      newItem.children = [];
      newItems.push(newItem)
    })
    id === "root" ? state.tasks.push(...newItems) : findById(state.tasks, id).children.push(...newItems);
  },

  clearCheckboxes(state) {
    deepLoop(state.tasks).forEach(task => task.checked = false);
    state.checkAll = false;
  },

  checkAll(state) {
    deepLoop(state.tasks).forEach(task => task.checked = state.checkAll);
  },
};
