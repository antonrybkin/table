<template>
    <transition name="modal">
        <div class="modal__mask" v-if="show">
            <div class="modal__wrapper">
                <div class="modal__container">
                    <div class="modal__body">
                        <slot></slot>
                    </div>
                    <div class="modal__footer">
                        <button v-if="btnNo" class="modal__default-button" @click="$emit('close')">Нет</button>
                        <button v-if="btnYes" class="modal__default-button" @click="$emit('confirm')">Да</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "Modal",
    props: {
        show: {
            type: Boolean,
            default: false
        },
        btnYes: {
            type: Boolean,
            default: false
        },
        btnNo: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">
.modal {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;

    &__wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    &__container {
        width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
        font-family: Helvetica, Arial, sans-serif;
        overflow: hidden;
    }

    &__body {
        margin: 20px 0;
    }

    &__default-button {
        float: right;
    }

    &-enter {
        opacity: 0;
        .modal-container {
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }
    }

    &-leave-active {
        opacity: 0;
        .modal-container {
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }
    }

    &__footer {
        button {
            margin-left: 10px;
        }
    }
}

</style>