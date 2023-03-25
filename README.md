# count-to-v3

> vue3 component that will count to a target number at a specified duration

 [![vue3](https://img.shields.io/badge/vue3-3.2.*-brightgreen.svg)](https://vuejs.org/)[![vueuse](https://img.shields.io/badge/ueuse%2Fcore-9.13.*-green.svg)](https://vueuse.org/)[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/echo9z/count-to-v3.git)

Based on [vue-count-to](https://github.com/PanJiaChen/vue-countTo) to upgrade components, digital dynamic components
### Runtime

The running environment has been tested, vue3.2 vite4.0

### Install

```shell
npm install count-to-v3 --save
# or
yarn add count-to-v3 --save
```

### Global registration

```ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import CountTo from './components/count-to'
createApp(App).use(CountTo).mount('#app')
```

### Local introduction

```vue
<template>
  <CountTo :startVal="0" :endVal="2023" :decimals="2" :separator="','" prefix="$" suffix="usd" />
</template>

<script>
import { CountTo } from 'count-to-v3';

export default {
  components: {
    CountTo
  }
}
</script>
```

### Options

| Property  | Description                          | type     | default |
| --------- | ------------------------------------ |:--------:|:-------:|
| startVal  | the value you want to begin at       | Number   | 0       |
| endVal    | the value you want to arrive at      | Number   | 2023    |
| duration  | duration in millisecond              | Number   | 3000    |
| autoplay  | when mounted autoplay                | Boolean  | true    |
| decimals  | the number of decimal places to show | Number   | 0       |
| decimal   | the split decimal                    | String   | .       |
| separator | the separator                        | String   | ,       |
| prefix    | the prefix                           | String   | ''      |
| suffix    | the suffix                           | String   | ''      |
| useEasing | is use easing function               | Boolean  | true    |
| easingFn  | the easing function                  | Function | —       |

**notes: when autoplay:true , it will auto start when startVal or endVal change**

### Functions

| Function Name      | Description                                       |
|:------------------:| ------------------------------------------------- |
| mountedCountTo     | when mounted will emit mountedCountTo             |
| endCountToCallback | number end of digital scroll emit mountedCallback |
| start              | start the countTo                                 |
| pause              | pause  the countTo                                |
| reset              | reset  the countTo                                |
