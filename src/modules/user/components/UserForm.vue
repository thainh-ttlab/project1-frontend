<template>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <el-card shadow="never">
            <el-form>
                <ValidationProvider
                    rules="required|max:255"
                    name="Name"
                    v-slot="{ errors }"
                >
                    <el-form-item label="Name" required :error="errors[0]">
                        <el-input v-model="user.name" placeholder="William Smith" />
                    </el-form-item>
                </ValidationProvider>

                <ValidationProvider rules="max:255" name="Address" v-slot="{ errors }">
                    <el-form-item label="Address" :error="errors[0]">
                        <el-input v-model="user.address" placeholder="Street, City..." />
                    </el-form-item>
                </ValidationProvider>

                <ValidationProvider
                    rules="required|email|max:255"
                    name="Email"
                    v-slot="{ errors }"
                >
                    <el-form-item label="Email" required :error="errors[0]">
                        <el-input v-model="user.email" placeholder="demo@gmail.com" />
                    </el-form-item>
                </ValidationProvider>

                <ValidationProvider
                    rules="numeric|min:9|max:10"
                    name="Phone"
                    v-slot="{ errors }"
                >
                    <el-form-item label="Phone" :error="errors[0]">
                        <el-input v-model="user.phone" placeholder="09123456789" />
                    </el-form-item>
                </ValidationProvider>
            </el-form>
        </el-card>

        <div slot="footer" class="dialog-footer">
            <el-button type="success" @click.prevent="handleSubmit(save(user))">
                Save
            </el-button>
            <el-button @click.prevent="hideModal">Cancel</el-button>
        </div>
    </ValidationObserver>
</template>

<script>
import RepositoryFactory from '@/repositories/RepositoryFactory'

const UserRepository = RepositoryFactory.get('user')
import cloneDeep from 'lodash/cloneDeep'

export default {
    data() {
        return {
            showModal: false,
            errorMessage: '',
            isCreate: false,
            user: {},
        }
    },
    methods: {
        hideModal() {
            this.isCreate = false
            this.showModal = false
            this.user = {}
            this.$refs.observer.reset()
        },
        showUserModal(isCreate, user = {}) {
            this.showModal = true
            this.isCreate = isCreate
            this.user = cloneDeep(user)
        },
        async save(user) {
            const valid = await this.$refs.observer.validate()
            if (!valid) return
            const params = {
                name: this.user.name,
                address: this.user.address,
                email: this.user.email,
                phone: this.user.phone,
            }
            if (this.isCreate) {
                await UserRepository.create(params)
            } else {
                await UserRepository.update(user.id, params)
            }
            this.showModal = false
            await this.$swal({
                icon: 'success',
                title: this.isCreate ? 'Add New User' : 'Update User',
                text: this.isCreate
                    ? 'The user has been successfully created.'
                    : 'The user has been successfully updated.',
            })
            this.$emit('search')
            this.hideModal()
        },
    },
}
</script>

<style lang="scss" scoped>
.dialog-footer {
    text-align: center;
    margin-top: 20px;
}
</style>
