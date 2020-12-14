<template>
    <input type="button" value="Logout" @click="logout" />
</template>
<script>
export default {
    name: 'Logout',
    methods: {
        logout() {
        this.$store.dispatch('logout');
        this.$router.push('/');
        }
    }
}
</script>
