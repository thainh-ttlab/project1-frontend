<template>
    <div class="container">
        <FilterForm :filterForm="filterForm" @add-user="addUser" @search="search" />
        <UserTable
            class="mt-5"
            :userList="userList"
            :page="page"
            :totalItems="totalItems"
            :limit="limit"
            @edit-user="editUser"
            @change-page="changePage"
            @search="getList"
            @sort-data="sortData"
        />
    </div>
</template>

<script>
import RepositoryFactory from '@/repositories/RepositoryFactory'
const UserRepository = RepositoryFactory.get('user')
import FilterForm from '../components/FilterForm'
import UserTable from '../components/UserTable'

export default {
    name: 'UserPage',
    components: { FilterForm, UserTable },
    created() {
        this.getList()
    },
    data() {
        return {
            userList: [],
            filterForm: {},
            totalItems: 0,
            limit: 3,
            page: 1,
        }
    },
    methods: {
        async getList() {
            this.filterForm = {
                page: this.page - 1,
                limit: this.limit,
            }
            const loader = this.$loading({})
            const response = await UserRepository.list(this.filterForm)
            loader.close()
            this.userList = response?.data?.items
            this.totalItems = response?.data?.totalItems
        },

        editUser(user) {
            this.$refs.userForm.showUserModal(false, user)
        },

        addUser() {
            this.$refs.userForm.showUserModal(true)
        },

        async sortData(props) {
            if (props.order === 'ascending') {
                this.filterForm.order = 1
                this.filterForm.orderBy = props.prop
            } else if (props.order === 'descending') {
                this.filterForm.order = -1
                this.filterForm.orderBy = props.prop
            } else {
                delete this.filterForm.order
                delete this.filterForm.orderBy
            }
            const loader = this.$loading({})
            const response = await UserRepository.list(this.filterForm)
            loader.close()
            this.userList = response?.data?.items
            this.totalItems = response?.data?.totalItems
        },

        async search() {
            const loader = this.$loading({})
            const response = await UserRepository.list(this.filterForm)
            loader.close()
            this.userList = response?.data?.items
            this.totalItems = response?.data?.totalItems
        },

        async changePage(value) {
            this.page = value
            this.filterForm.page = this.page - 1
            const response = await UserRepository.list(this.filterForm)
            this.userList = response?.data?.items
            this.totalItems = response?.data?.totalItems
        },
    },
}
</script>
