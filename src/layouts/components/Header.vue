<template>
    <div class="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: getLink }" v-if="!isHomePage">
                {{ getName }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown
            class="avatar-container right-menu-item hover-effect"
            trigger="click"
        >
            <div class="avatar-wrapper">
                <img
                    :src="getUser.avatar"
                    class="user-avatar"
                    alt=""
                    width="20px"
                    height="20px"
                />
                <span>{{ getUser.name }}</span>
                <!--                <i class="el-icon-caret-bottom" />-->
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <router-link to="/profile">Profile</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                    <router-link to="/home">Dashboard</router-link>
                </el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">
                    <span style="display: block">Log Out</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import TokenService from '@/helpers/token'

export default {
    created() {
        console.log(this.$route)
    },
    computed: {
        getUser() {
            return TokenService?.getUser()
        },
        getName() {
            return this.$route?.meta?.header || ''
        },
        getLink() {
            return this.$route?.path || ''
        },
        isHomePage() {
            return this.$route?.path === '/home'
        },
    },
    methods: {
        logout() {
            localStorage.clear()
            this.$router.push('/login')
        },
    },
}
</script>

<style scoped lang="scss">
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}
::v-deep {
    .el-breadcrumb__item {
        .el-breadcrumb__inner {
            font-weight: normal !important;
            font-size: 16px;
        }
        &:last-child {
            .el-breadcrumb__inner {
                font-weight: bold !important;
            }
        }
    }
    .el-dropdown-menu__item a,
    .el-dropdown-menu__item span {
        text-decoration: none;
        color: #333;
    }
}
.avatar-container {
    //margin-right: 30px;
    outline: none;
    .avatar-wrapper {
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        outline: none;

        .user-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
        }

        .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
        }
    }
}
</style>
