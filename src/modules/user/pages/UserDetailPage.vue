<template>
    <div class="container">
        <UserForm ref="userForm" @search="getList" />
    </div>
</template>

<script>
import RepositoryFactory from '@/repositories/RepositoryFactory'
const UserRepository = RepositoryFactory.get('user')
import UserForm from '../components/UserForm'

export default {
    name: 'UserPageDetail',
    components: { UserForm },
    created() {
        this.getList()
    },
    data() {
        return {
            userList: [],
            filterForm: {},
            totalItems: 0,
            limit: 10,
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

        async sortData(props) {
            if (props.order === 'ascending') {
                this.filterForm.order = 'ASC'
                this.filterForm.orderBy = props.prop
            } else if (props.order === 'descending') {
                this.filterForm.order = 'DESC'
                this.filterForm.orderBy = props.prop
            } else {
                delete this.filterForm.order
                delete this.filterForm.orderBy
            }
            const loader = this.$loading({})
            const response = await UserRepository.list(this.filterForm)
            loader.close()
            this.userList = response?.items
            this.totalItems = response?.totalItems
        },

        async search() {
            const loader = this.$loading({})
            const response = await UserRepository.list(this.filterForm)
            loader.close()
            this.userList = response?.items
            this.totalItems = response?.totalItems
        },

        async changePage(value) {
            this.page = value
            this.filterForm.page = this.page - 1
            const response = await UserRepository.list(this.filterForm)
            this.userList = response?.items
            this.totalItems = response?.totalItems
        },
    },
}
</script>
