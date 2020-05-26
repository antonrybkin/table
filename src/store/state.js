// https://vuex.vuejs.org/en/state.html

export default {
  tasks: [
    {
      id: 1,
      checked: false,
      name: "Сбер-Сервис",
      start: "2020-04-23T18:25:43.511Z",
      end: "2020-04-30T18:25:43.511Z",
      order: 0,
      redMark: false,
      resource: null,
      children: [
        {
          id: 2,
          checked: false,
          hours: 0,
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
              hours: 0,
              name: "Битрикс24",
              start: "2019-08-01T18:25:43.511Z",
              end: "2021-07-26T18:25:43.511Z",
              order: 2,
              redMark: true,
              resource: "Разработчик 1",
              children: []
            },
            {
              id: 4,
              checked: false,
              hours: 0,
              name: "Расширение на 3000 пользователей",
              start: "2020-04-23T18:25:43.511Z",
              end: "2020-04-30T18:25:43.511Z",
              order: 3,
              redMark: true,
              resource: "Разработчик 2",
              children: []
            }
          ]
        },
        {
          id: 31,
          checked: false,
          hours: 0,
          name: "Этап 1 (MVP)",
          start: "2020-04-23T18:25:43.511Z",
          end: "2020-04-30T18:25:43.511Z",
          order: 31,
          redMark: false,
          resource: null,
          children: [
            {
              id: 32,
              checked: false,
              hours: 0,
              name: "Таблица задач",
              start: "2020-04-23T18:25:43.511Z",
              end: "2020-04-30T18:25:43.511Z",
              order: 1,
              redMark: false,
              resource: null,
              children: [
                {
                  id: 33,
                  checked: false,
                  hours: 0,
                  name: "Вёрстка (MVP)",
                  start: "2020-04-23T18:25:43.511Z",
                  end: "2020-04-30T18:25:43.511Z",
                  order: 32,
                  redMark: true,
                  resource: "Антон",
                  children: []
                },
                {
                  id: 34,
                  checked: false,
                  hours: 0,
                  name: "Расширение на 5000 пользователей",
                  start: "2020-04-23T18:25:43.511Z",
                  end: "2020-04-30T18:25:43.511Z",
                  order: 33,
                  redMark: false,
                  resource: "Разработчик 2",
                  children: []
                },
                {
                  id: 35,
                  checked: false,
                  hours: 0,
                  name: "Битрикс24 (MVP)",
                  start: "2020-04-23T18:25:43.511Z",
                  end: "2020-04-30T18:25:43.511Z",
                  order: 34,
                  redMark: false,
                  resource: "Разработчик 1",
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 53,
          checked: false,
          hours: 0,
          name: "Этап 2",
          start: "2020-04-23T18:25:43.511Z",
          end: "2020-04-30T18:25:43.511Z",
          order: 31,
          redMark: false,
          resource: null,
          children: [
            {
              id: 63,
              checked: false,
              hours: 0,
              name: "Битрикс24 2",
              start: "2020-04-23T18:25:43.511Z",
              end: "2020-04-30T18:25:43.511Z",
              order: 31,
              redMark: false,
              resource: "Разработчик 1",
              children: []
            }
          ]
        },
        {
          id: 99,
          checked: false,
          hours: 0,
          name: "Этап 3",
          start: "2020-04-23T18:25:43.511Z",
          end: "2020-04-30T18:25:43.511Z",
          order: 53,
          redMark: false,
          resource: null,
          children: [
            {
              id: 100,
              checked: false,
              hours: 0,
              name: "Таблица ресурсов",
              start: "2020-04-23T18:25:43.511Z",
              end: "2020-04-30T18:25:43.511Z",
              order: 99,
              redMark: false,
              resource: "Разработчик 1",
              children: []
            },
            {
              id: 102,
              checked: false,
              hours: 0,
              name: "Stopcovid",
              start: "2020-04-23T18:25:43.511Z",
              end: "2020-04-30T18:25:43.511Z",
              order: 100,
              redMark: false,
              resource: "Разработчик 1",
              children: []
            }
          ]
        },
      ]
    },
    {
      id: 150,
      checked: false,
      hours: 0,
      name: "Таблица ресурсов",
      start: "2020-04-23T18:25:43.511Z",
      end: "2020-04-30T18:25:43.511Z",
      order: 99,
      redMark: false,
      resource: "Разработчик 1",
      children: []
    },
    {
      id: 152,
      checked: false,
      hours: 0,
      name: "Stopcovid",
      start: "2020-04-23T18:25:43.511Z",
      end: "2020-04-30T18:25:43.511Z",
      order: 100,
      redMark: false,
      resource: "Разработчик 1",
      children: []
    }
  ],

  resources: ["Разработчик 1", "Разработчик 2", "Разработчик 3", "Верстальщик", "Аналитик", "Антон"],
  checkAll: false
};
