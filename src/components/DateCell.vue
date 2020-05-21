<template>
    <td class="tasks-table__date-picker">
        <v-date-picker v-if="editable"
                       :value="date"
                       :popover="{ visibility: 'click' }"
                       :disabled-dates="disabledDates"
                       @input="upDate"
                       locale="ru">
            <div class="tasks-table__date-picker_block">{{ date | moment("dd DD.MM.YY") }}</div>
        </v-date-picker>
        <div v-else>{{ date | moment("dd DD.MM.YY") }}</div>
    </td>
</template>

<script>
export default {
    name: "DateCell",
    props: {
        value: [ Date, String, Number ],
        from: [ Date, String, Number ],
        editable: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        date() {
            if(this.from && (this.from > this.value)) {
                this.upDate(this.from)
            }
            return new Date(this.value)
        },
        disabledDates(){
            if(this.from) {
                return [{start: null, end: this.from}]
            }
        }
    },
    methods: {
        upDate(value) {
            this.$emit('update', value);
        }
    }
}
</script>