<template>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <ValidationProvider
            rules="required|max:255|email"
            name="Email"
            v-slot="{ errors }"
        >
            <el-form-item :error="errors[0]">
                <el-input
                    v-model="signIn.email"
                    placeholder="Email"
                    prefix-icon="el-icon-user"
                />
            </el-form-item>
        </ValidationProvider>

        <ValidationProvider
            rules="required|max:255|min:3"
            name="Password"
            v-slot="{ errors }"
        >
            <el-form-item :error="errors[0]">
                <el-input
                    v-model="signIn.password"
                    placeholder="Password"
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
                @click.prevent="handleSubmit(login)"
            >
                Login
            </el-button>
        </el-form-item>
    </ValidationObserver>
</template>
<script>
export default {
    data() {
        return {
            signIn: {},
            errorMessage: '',
        }
    },
    methods: {
        async login() {
            const valid = await this.$refs.observer.validate()
            if (valid) {
                await this.$store.dispatch('auth/setParamSignIn', this.signIn)
                const response = await this.$store.dispatch('auth/signIn')
                if (response?.success) {
                    const route = this.$route?.query?.redirect || '/user'
                    await this.$router.push(route)
                } else {
                    this.$message.error(response?.message || '')
                }
            }
        },
    },
}
</script>
