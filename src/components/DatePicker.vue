<template>
    <div class="date-picker">
        <v-date-picker v-if="editable"
                       :value="date"
                       :popover="{ visibility: 'click' }"
                       :disabled-dates="disabledDates"
                       @input="upDate"
                       locale="ru">
            <div class="date-picker__block date-picker__block_editable">
                {{ date | moment("dd DD.MM.YY") }}
            </div>
        </v-date-picker>
        <div v-else class="date-picker__block">
            {{ date | moment("dd DD.MM.YY") }}
        </div>
    </div>
</template>

<script>
export default {
    name: "DatePicker",
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
.date-picker {
    padding: 0;

    &__block {
        padding: 10px;

        &_editable {
            cursor: pointer;
        }
    }
}
</style>