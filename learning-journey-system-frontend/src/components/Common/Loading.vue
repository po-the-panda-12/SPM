<template>
    <div class="loading">
        <div class="spinner-border text-primary opacity-100" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>


<style scoped>
.loading {
    z-index: 1;
    background-color: white;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: auto;
    width: 100%;
    height: 100%;
    }

    .spinner-border {
        z-index: 2;
        width: 4rem;
        height: 4rem;
    }
</style>>