<template>
    <td class="tasks__table__cell-wrapper">
        <div class="tasks__table__date-picker">
            <v-date-picker v-if="editable"
                           :value="date"
                           :popover="{ visibility: 'click' }"
                           :disabled-dates="disabledDates"
                           @input="upDate"
                           locale="ru">
                <div class="tasks__table__date-picker__block tasks__table__date-picker__block_editable">
                    {{ date | moment("dd DD.MM.YY") }}
                </div>
            </v-date-picker>
            <div v-else class="tasks__table__date-picker__block">
                {{ date | moment("dd DD.MM.YY") }}
            </div>
        </div>
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

<style lang="scss">
.tasks__table__date-picker {
    padding: 0;

    &__block {
        padding: 10px;

        &_editable {
            cursor: pointer;
        }
    }
}
</style>