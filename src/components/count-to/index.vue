<!--
* @description 数字翻转
* @fileName index.vue
* @author echo9z
* @date 2023/03/22 18:27:56
!-->
<template>
  <span>{{ displayValue }}</span>
</template>

<script lang="ts" setup name="CountTo">
import { useFormatNumber } from '@/hooks/useFormatNumber'
import { useRafFn, UseRafFnCallbackArguments } from '@vueuse/core'

const {
  startVal, endVal, duration, autoplay, decimals, decimal, separator,
  prefix, suffix, useEasing, easingFn
} = defineProps({
  startVal: { // 开始值
    type: Number,
    required: false,
    default: 0
  },
  endVal: { // 结束值
    type: Number,
    required: false,
    default: 2023
  },
  duration: {// 执行时间
    type: Number,
    required: false,
    default: 3000
  },
  autoplay: {
    type: Boolean,
    required: false,
    default: true
  },
  decimals: {// 显示的小数点位数
    type: Number,
    required: false,
    default: 0,
    validator(value: number) {
      return value >= 0
    }
  },
  decimal: {// 十进制分隔符
    type: String,
    required: false,
    default: '.'
  },
  separator: {// 分隔符
    type: String,
    required: false,
    default: ','
  },
  prefix: {// 前缀 ¥ 2000
    type: String,
    required: false,
    default: ''
  },
  suffix: {// 后缀 2000 rmb
    type: String,
    required: false,
    default: ''
  },
  useEasing: {// 缓和功能
    type: Boolean,
    required: false,
    default: true
  },
  easingFn: {// 缓和回调
    type: Function,
    // 计算缓和函数，0-3000毫秒 => 对应 开始值到结束值得变化
    default(t: number, b: number, c: number, d: number): number {
      return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
    }
  }
})
const emits = defineEmits(['mountedCountTo', 'endCountToCallback'])

const localStartVal = ref(startVal)
const displayValue = ref('')
const printVal = ref(0)
const paused = ref(false)
const localDuration = ref(duration)
const startTime = ref(0)
const timestamps = ref(0)
const remaining = ref(0)

displayValue.value = useFormatNumber(startVal, decimals, decimal, separator, prefix, suffix)

// 当前startVal 小于 endVal，返回false
const countDown = computed(() => {
  return startVal > endVal
})
// startVal endVal发生变化时，调用start
watch([() => startVal, () => endVal], () => {
  start()
})

// 组件挂载是触发，计算函数
onMounted(() => {
  if (autoplay) {
    start();
  }
  emits('mountedCountTo')
})
// const a = easingFn(1,localStartVal.value, endVal - localStartVal.value, localDuration.value)
// console.log(a);

const count = (time: UseRafFnCallbackArguments) => {
  // startTime开始时间为0 则为传入的 timestamp
  if (!startTime.value) startTime.value = time.timestamp;
  timestamps.value = time.timestamp; // 记录传入 时间戳
  const progress = time.timestamp - startTime.value; // 时间戳减去开始时间，得到进度时间
  remaining.value = localDuration.value - progress; // 执行的时间总延迟时间 - 进度时间 = 剩下时间 

  // 是否有缓和功能
  if (useEasing) {
    if (countDown.value) {// 开始时间是否大于结束时间
      printVal.value = localStartVal.value - easingFn(progress, 0, localStartVal.value - endVal, localDuration.value)
    } else {
      printVal.value = easingFn(progress, localStartVal.value, endVal - localStartVal.value, localDuration.value);
    }
  } else {
    if (countDown.value) {
      printVal.value = localStartVal.value - ((localStartVal.value - endVal) * (progress / localDuration.value));
    } else {
      printVal.value = localStartVal.value + (endVal - localStartVal.value) * (progress / localDuration.value);
    }
  }
  if (countDown.value) {
    printVal.value = printVal.value < endVal ? endVal : printVal.value;
  } else {
    printVal.value = printVal.value > endVal ? endVal : printVal.value;
  }
  displayValue.value = useFormatNumber(printVal.value, decimals, decimal, separator, prefix, suffix)
  
  if (progress > localDuration.value) { 
    pause && pause()
    emits('endCountToCallback');
  }
}
const { pause, resume } = useRafFn(count as any, { immediate: false })

const start = () => {
  localStartVal.value = startVal; // 开始值0
  startTime.value = 0; // 开始时间
  localDuration.value = duration; // 延迟时间
  paused.value = false;
  resume()
}

const pauseResume = () => {
  if (paused.value) {
    resumes();
    paused.value = false;
  } else {
    pauses();
    paused.value = true;
  }
}
const pauses = () => {
  pause();
}
const resumes = () => {
  startTime.value = 0;
  localDuration.value = +remaining.value;
  localStartVal.value = +printVal.value;
  resume();
}
const reset = () => {
  startTime.value = 0;
  pause();
  displayValue.value = useFormatNumber(startVal, decimals, decimal, separator, prefix, suffix)
}

onUnmounted(() => {
  pause()
})

defineExpose({
  start,
  reset,
  pauseResume
})
</script>
<style lang="scss" scoped>
</style>
