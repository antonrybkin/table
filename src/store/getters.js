// https://vuex.vuejs.org/en/getters.html

import setCategoryDates from "@/helpers/set-category-dates";

export default {
  tasks(state) {
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

    const tasks = state.tasks;
    // Установка дат в задачах-категориях
    setCategoryDates(tasks);
    // Сортировка задач по "Предшественник"
    sortTasks(tasks);
    return tasks
  },
};
