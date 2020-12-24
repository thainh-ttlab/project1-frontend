<template>
    <el-aside width="200px" style="display: flex; flex-direction: column">
        <router-link to="/home">Home</router-link>
        <router-link to="/user">User</router-link>
        <router-link to="/profile">User Profile</router-link>
        <a href="#" @click.prevent="logout">Log Out</a>
    </el-aside>
</template>
<script>
export default {
    methods: {
        logout() {
            localStorage.clear()
            this.$router.push('/login')
        },
    },
}
</script>

<style lang="scss" scoped>
.el-aside {
    padding: 50px 0;
    height: 100vh;
}
a {
    color: #333333;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 5px;
    &:not(:last-child) {
        margin-bottom: 10px;
    }
    &:hover {
        background: #eee;
    }
}
.router-link-active {
    color: #fff;
    background-color: #409eff;
    &:hover {
        background: #409eff;
    }
}
</style>
