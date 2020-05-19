// https://vuex.vuejs.org/en/state.html

export default {
  tasks: [
    {
      id: 1,
      checked: false,
      name: "Сбер-Сервис",
      start: "2020-04-23T18:25:43.511Z",
      end: "2020-04-30T18:25:43.511Z",
      order: 1,
      redMark: false,
      resource: null,
      children: [
        {
          id: 2,
          checked: false,
          editOrder: false,
          name: "ПО",
          start: "2020-04-23T18:25:43.511Z",
          end: "2020-04-30T18:25:43.511Z",
          order: 1,
          redMark: false,
          resource: null,
          children: [
            {
              id: 3,
              checked: false,
              editOrder: false,
              name: "Битрикс24",
              start: "2020-04-23T18:25:43.511Z",
              end: "2020-04-30T18:25:43.511Z",
              order: 2,
              redMark: true,
              resource: "Разработчик 1",
              children: []
            },
            {
              id: 4,
              checked: false,
              editOrder: false,
              name: "Расширение на 5000 пользователей",
              start: "2020-04-23T18:25:43.511Z",
              end: "2020-04-30T18:25:43.511Z",
              order: 3,
              redMark: false,
              resource: "Разработчик 2",
              children: []
            }
          ]
        },
      ]
    },
    {
      id: 31,
      checked: false,
      editOrder: false,
      name: "Этап 1 (MVP)",
      start: "2020-04-23T18:25:43.511Z",
      end: "2020-04-30T18:25:43.511Z",
      order: 31,
      redMark: true,
      resource: null,
      children: []
    },
  ],

  resources: ["Разработчик 1", "Разработчик 2", "Разработчик 3", "Верстальщик", "Аналитик"]
};
