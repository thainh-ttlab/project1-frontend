<template>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <ValidationProvider rules="min:3" name="Name" v-slot="{ errors }">
            <el-form-item :error="errors[0]">
                <el-input
                    v-model="signUp.name"
                    placeholder="Name"
                    prefix-icon="el-icon-user-solid"
                />
            </el-form-item>
        </ValidationProvider>

        <ValidationProvider
            rules="required|max:255|email"
            name="Email"
            v-slot="{ errors }"
        >
            <el-form-item :error="errors[0]">
                <el-input
                    v-model="signUp.email"
                    placeholder="Email"
                    prefix-icon="el-icon-user"
                />
            </el-form-item>
        </ValidationProvider>

        <ValidationProvider
            rules="required|max:255|min:3"
            name="Password"
            vid="password"
            v-slot="{ errors }"
        >
            <el-form-item :error="errors[0]">
                <el-input
                    v-model="signUp.password"
                    placeholder="Password"
                    type="password"
                    auto-complete="new-password"
                    prefix-icon="el-icon-lock"
                />
            </el-form-item>
        </ValidationProvider>

        <ValidationProvider
            rules="required|max:255|min:3|confirmed:password"
            name="Confirm Password"
            v-slot="{ errors }"
        >
            <el-form-item :error="errors[0]">
                <el-input
                    v-model="signUp.confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    auto-complete="new-password"
                    prefix-icon="el-icon-lock"
                />
            </el-form-item>
        </ValidationProvider>

        <el-form-item>
            <el-button
                class="login-button"
                type="primary"
                native-type="submit"
                block
                @click.prevent="handleSubmit(register)"
            >
                Register
            </el-button>
        </el-form-item>
    </ValidationObserver>
</template>
<script>
import RepositoryFactory from '@/repositories/RepositoryFactory'
const AuthRepository = RepositoryFactory.get('auth')
export default {
    data() {
        return {
            signUp: {},
        }
    },
    methods: {
        async register() {
            const valid = await this.$refs.observer.validate()
            if (valid) {
                const params = {
                    email: this.signUp.email,
                    name: this.signUp.name,
                    password: this.signUp.password,
                }
                const response = await AuthRepository.signUp(params)
                if (!response?.success) {
                    this.$message.error(response?.message || '')
                } else {
                    const params = {
                        email: this.signUp.email,
                        password: this.signUp.password,
                    }
                    await this.$store.dispatch('auth/setParamSignIn', params)
                    const response = await this.$store.dispatch('auth/signIn')
                    if (response?.success) {
                        const route = this.$route?.query?.redirect || '/user'
                        await this.$router.push(route)
                    } else {
                        this.$message.error(response?.message || '')
                    }
                }
            }
        },
    },
}
</script>
