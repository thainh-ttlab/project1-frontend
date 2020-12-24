<template>
    <div class="login">
        <el-card class="box-card">
            <el-form>
                <h3 class="form--title">
                    {{ !isSignUp ? `SIGN IN` : `CREATE AN ACCOUNT` }}
                </h3>
                <!--Sign In-->
                <SignIn v-if="!isSignUp" />

                <!--Sign Up-->
                <SignUp v-if="isSignUp" />

                <div class="form--description">
                    <p v-if="!isSignUp">
                        DON'T HAVE AN ACCOUNT?
                        <a href="" @click.prevent="isSignUp = !isSignUp"> SIGN UP. </a>
                    </p>
                    <p v-if="isSignUp" @click.prevent="isSignUp = !isSignUp">
                        ALREADY HAVE AN ACCOUNT? <a href="">SIGN IN.</a>
                    </p>
                </div>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
export default {
    components: {
        SignIn,
        SignUp,
    },
    data() {
        return {
            errorMessage: '',
            isSignUp: false,
        }
    },
    methods: {},
}
</script>

<style lang="scss" scoped>
.login {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 480px;
    transform: translate(-50%, -50%);
}

.box-card {
    max-width: 480px;
    margin: auto;
}

.form--title {
    margin-top: 0;
    text-align: center;
}

.form--description {
    a {
        color: #409eff;
        text-decoration: none;
    }
}

::v-deep {
    .el-form {
        width: 100%;
    }

    .el-card__body {
        padding: 50px 20px;
        height: 100%;
        display: flex;
        align-items: center;
    }
}
</style>
