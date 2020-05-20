<template>
    <td class="tasks-table__date-picker">
        <v-date-picker v-if="editable"
                       :value="date"
                       :popover="{ visibility: 'click' }"
                       @input="upDate"
                       locale="ru">
            <div class="tasks-table__date-picker_block">{{ date | moment("dd DD.MM.YY") }}</div>
        </v-date-picker>
        <div v-else>{{ date | moment("dd DD.MM.YY") }}</div>
    </td>
</template>

<script>
export default {
    name: "DatePicker",
    props: {
        value: [ Date, String, Number ],
        editable: {
            type: Boolean,
            default: false
        }
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