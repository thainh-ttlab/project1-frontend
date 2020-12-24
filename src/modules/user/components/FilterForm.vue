<template>
    <el-card class="box-card">
        <el-input
            placeholder="Search by name, address ..."
            v-model="filterForm.keyword"
        />
        <el-button @click.prevent="search" type="primary" icon="el-icon-search">
            SEARCH
        </el-button>
        <!--        <el-button @click.prevent="addUser" type="primary" icon="el-icon-plus">-->
        <!--            ADD-->
        <!--        </el-button>-->
    </el-card>
</template>

<script>
export default {
    props: {
        filterForm: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {}
    },
    methods: {
        async search() {
            this.$emit('search')
        },
        addUser() {
            this.$emit('add-user')
        },
    },
}
</script>

<style scoped lang="scss">
.box-card {
    margin-bottom: 20px;
    /deep/ .el-card__body {
        display: flex;
        .el-button {
            margin-left: 20px;
        }
    }
}
</style>
