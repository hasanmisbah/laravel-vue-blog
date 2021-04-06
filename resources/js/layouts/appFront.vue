<template>
<div>
    <navigation></navigation>
    <slot></slot>
</div>
</template>

<script>
import Navigation from '../components/frontend/navigation.vue'
export default {
    name : "app-front",
    components : {Navigation}
}
</script>

<style lang="scss">
.body{
    margin: 0 auto;
}
</style>
