<template>
    <td class="tasks-table__date-picker">
        <v-date-picker :value="date"
                       :popover="{ visibility: 'click' }"
                       @input="upDate"
                       locale="ru">
            <div>{{ date | moment("dd DD.MM.YY") }}</div>
        </v-date-picker>
    </td>
</template>

<script>
export default {
    name: "DatePicker",
    props: {
        value: [ Date, String ]
    },
    computed: {
        date() {
            return new Date(this.value)
        }
    },
    methods: {
        upDate(value) {
            this.$emit('update', value);
        }
    }
}
</script>