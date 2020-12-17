<template>
    <div>
        <div>
            <logout>
        </div>
        <div>
            <h2>Feed</h2>
            <feed>
        </div>
    </div>
</template>
<script>
import Feed from '@/components/Feed.vue'
import Logout from '@/components/Logout.vue'

export default {
    name: 'Matching',
    components: {
        Feed,
        Logout
    },
    async created () {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/')
    }
    }
}
</script>