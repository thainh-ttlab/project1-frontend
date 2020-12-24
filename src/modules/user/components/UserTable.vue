<template>
    <div>
        <el-table :data="userList" style="width: 100%" @sort-change="sortData">
            <el-table-column prop="name" label="Name" sortable="custom" />
            <el-table-column prop="address" label="Address" sortable="custom" />
            <el-table-column prop="email" label="Email" sortable="custom" />
            <el-table-column prop="phone" label="Phone" sortable="custom" />
            <!--            <el-table-column fixed="right" label="Actions" width="120px">-->
            <!--                <template slot-scope="scope">-->
            <!--                    <el-tooltip class="item" content="Edit User" placement="top">-->
            <!--                        <el-button-->
            <!--                            @click.native.prevent="editUser(scope.row)"-->
            <!--                            circle-->
            <!--                            type="primary"-->
            <!--                        >-->
            <!--                            <i class="el-icon-edit"></i>-->
            <!--                        </el-button>-->
            <!--                    </el-tooltip>-->
            <!--                    <el-tooltip class="item" content="Delete User" placement="top">-->
            <!--                        <el-button-->
            <!--                            @click.native.prevent="deleteUser(scope.row)"-->
            <!--                            circle-->
            <!--                            type="danger"-->
            <!--                        >-->
            <!--                            <i class="el-icon-delete"></i>-->
            <!--                        </el-button>-->
            <!--                    </el-tooltip>-->
            <!--                </template>-->
            <!--            </el-table-column>-->
        </el-table>
        <el-pagination
            :current-page.sync="currentPage"
            :page-size="limit"
            layout="total, prev, pager, next"
            :total="totalItems"
        />
    </div>
</template>

<script>
import RepositoryFactory from '@/repositories/RepositoryFactory'
const UserRepository = RepositoryFactory.get('user')

export default {
    props: {
        userList: {
            type: Array,
            default: () => [],
        },
        totalItems: {
            type: [Number, String],
            default: 0,
        },
        limit: {
            type: [Number, String],
            default: 10,
        },
        page: {
            type: [Number, String],
            default: 0,
        },
    },
    data() {
        return {}
    },
    computed: {
        currentPage: {
            get: function() {
                return this.page
            },
            set: function(value) {
                this.$emit('change-page', value)
            },
        },
    },

    methods: {
        editUser(user) {
            this.$emit('edit-user', user)
        },
        sortData(sortProps) {
            this.$emit('sort-data', sortProps)
        },
        async deleteUser(user) {
            const confirm = await this.$swal({
                icon: 'warning',
                title: 'Delete User',
                text: 'Are you sure you want to delete this user?',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                showCancelButton: true,
            })
            if (confirm?.isConfirmed) {
                await UserRepository.delete(user.id)
                await this.$swal({
                    icon: 'success',
                    title: 'Delete User',
                    text: 'The user has been successfully deleted.',
                })
                this.$emit('search')
            }
        },
    },
}
</script>

<style lang="scss" scoped>
::v-deep th {
    color: #333 !important;
    font-size: 1.2rem !important;
}
/deep/ .el-pagination {
    text-align: right;
}
</style>
