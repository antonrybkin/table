<template>
    <div class="checkbox">
        <label class="checkbox__label">
            <input type="checkbox"
                   :checked="value"
                   @change="$emit('input', $event.target.checked)"/>
            <span class="checkmark"></span>
        </label>
    </div>
</template>

<script>
export default {
    name: "Checkbox",
    props: {
        value: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">
.checkbox {
    padding: 0 4px;
    width: 20px;
    position: relative;

    &__label {
        display: block;
        position: relative;
        padding-left: 20px;
        cursor: pointer;
        font-size: 10px;
        user-select: none;

        &:hover input ~ .checkmark {
            border: 1px solid #1058D0;
        }

        input{
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;

            &:checked ~ .checkmark{
                background: #1058D0;
                border: 1px solid #1058D0;

                &:after {
                    display: block;
                }
            }
        }

        .checkmark:after {
            left: 4px;
            top: 2px;
            width: 3px;
            height: 6px;
            border: solid white;
            border-width: 0 1px 1px 0;
            transform: rotate(45deg);
        }
    }

    .checkmark {
        position: absolute;
        top: -5px;
        left: 4px;
        height: 12px;
        width: 12px;
        background-color: #fff;
        border: 1px solid #C6CDD3;
        border-radius: 2px;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }
}
</style>