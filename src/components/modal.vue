<script setup>
import { watch, ref } from 'vue';
import FullScreen from './FullScreen.vue';
import Vstack from './Vstack.vue';

const model = defineModel('shown')

/**
 * モーダルウィンドウ下部に表示するカスタムボタン群
 * @type {{
 *   label: string;                 // ボタンの表示ラベル
 *   type?: 'primary' | 'default'; // ボタンの種類（バリデーション付き）
 *   onClick: () => void;          // 押下時のコールバック関数
 *   disabled?: boolean;           // 無効状態にするか
 * }[]}
 */
const props = defineProps({
    footerButtons: {
        type: Array,
        required: false,
        default: () => [],
        validator: (buttons) => {
            return Array.isArray(buttons) && buttons.every(btn => {
                const validType = !btn.type || ['primary', 'default'].includes(btn.type);
                const hasLabel = typeof btn.label === 'string';
                const hasOnClick = typeof btn.onClick === 'function';
                return validType && hasLabel && hasOnClick;
            });
        }
    },
    show_buttons: { type: Boolean, default: () => true }
});

</script>
<template>
    <FullScreen class="wrapper" v-if="model">
        <Vstack justify="center">
            <Vstack class="modal" justify="flex-start">
                <slot />
                <div class="button-wrapper" v-if="props.footerButtons.length > 0 && props.show_buttons">
                    <button v-for="v in props.footerButtons" :class="v?.type || 'default'" @click="v.onClick"
                        :disabled="v.disabled">
                        {{ v.label }}
                    </button>
                </div>
                <div class="button-wrapper" v-else-if="props.show_buttons">
                    <button @click="model = false" class="primary">閉じる</button>
                </div>
            </Vstack>
        </Vstack>
    </FullScreen>
</template>
<style scoped>
.wrapper {
    background-color: #4b4b4b57;
    backdrop-filter: blur(10px);
    z-index: 9999;
}

.wrapper * {
    background-color: transparent;
}

.modal {
    position: relative;
    background-color: var(--colour-surface);
    width: max-content;
    box-shadow: 0 7px 22px 0 #00000040, 0 0 1.5px 0 #0000004d, 0 0 1px 0 #00000066;
    border-radius: 7px;
    padding: 17px;
}

.modal .button-wrapper {
    position: sticky;
    bottom: 7px;
    right: 7px;
    display: flex;
    justify-content: end;
    width: 100%;
    margin-top: 7px;
    gap: 14px;
}

.modal .button-wrapper button.primary {
    background-color: var(--colour-accent);
    color: var(--colour-text-inverse);
}
</style>
