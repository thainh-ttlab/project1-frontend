<template>
    <el-container>
        <SideBar></SideBar>

        <el-container>
            <el-header>
                <Header />
            </el-header>

            <el-main>
                <router-view />
            </el-main>

            <!--            <el-footer>-->
            <!--                <Footer />-->
            <!--            </el-footer>-->
        </el-container>
    </el-container>
</template>

<script>
import Header from './components/Header.vue'
// import Footer from './components/Footer.vue'
import SideBar from './components/SideBar.vue'

export default {
    components: {
        // Footer,
        SideBar,
        Header,
    },
}
</script>
<style scoped>
.el-main {
    background: #f5f5f5;
}
</style>
