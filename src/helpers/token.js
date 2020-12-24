const TOKEN_KEY = 'access_token'
const TOKEN_EXPIRED_DATE_KEY = 'token_expired_at'
const REFRESH_TOKEN_KEY = 'refresh_token'
const REFRESH_TOKEN_EXPIRED_DATE_KEY = 'refresh_token_expired_at'
const USER_KEY = 'user'
const LANG_KEY = 'lang'

const BUFFER_TIME = 60 * 1000 // 60s

/**
 * Manage the how Access Tokens are being stored and received from localStorage.
 *
 * Current implementation stores to localStorage. localStorage should always be
 * accessed through this instance.
 * */
const TokenService = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },

    setToken(accessToken) {
        localStorage.setItem(TOKEN_KEY, accessToken)
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY)
    },

    getTokenExpiredAt() {
        return localStorage.getItem(TOKEN_EXPIRED_DATE_KEY) ?? '0'
    },

    setTokenExpiredAt(expiredAt) {
        // minus buffer time = BUFFER_TIME (s) to expiredAt
        const expAt = +expiredAt - BUFFER_TIME
        localStorage.setItem(TOKEN_EXPIRED_DATE_KEY, `${expAt}`)
    },

    removeTokenExpiredAt() {
        localStorage.removeItem(TOKEN_EXPIRED_DATE_KEY)
    },

    getLang() {
        return localStorage.getItem(LANG_KEY) || 'ja'
    },

    setLang(lang) {
        localStorage.setItem(LANG_KEY, lang)
    },
    getUser() {
        if (localStorage.getItem(USER_KEY))
            return JSON.parse(localStorage.getItem(USER_KEY))
        return {}
    },
    getUserType() {
        const user = this.getUser()
        return user?.userType
    },
    getAvatarPath() {
        const user = this.getUser()
        return user?.avatar?.filePath || ''
    },
    setUser(user = {}) {
        localStorage.setItem(USER_KEY, JSON.stringify(user))
    },

    removeUser() {
        localStorage.removeItem(USER_KEY)
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY) ?? ''
    },

    setRefreshToken(refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    },

    removeRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN_KEY)
    },

    getRefreshTokenExpiredAt() {
        return localStorage.getItem(REFRESH_TOKEN_EXPIRED_DATE_KEY) ?? '0'
    },

    setRefreshTokenExpiredAt(expiredAt) {
        // minus buffer time = BUFFER_TIME (s) to expiredAt
        const expAt = +expiredAt - BUFFER_TIME
        localStorage.setItem(REFRESH_TOKEN_EXPIRED_DATE_KEY, `${expAt}`)
    },

    removeRefreshTokenExpiredAt() {
        localStorage.removeItem(REFRESH_TOKEN_EXPIRED_DATE_KEY)
    },

    getPermissions() {
        return this.getUser()?.permissions || []
    },

    getHeader() {
        return {
            Authorization: `Bearer ${this.getToken()}`,
        }
    },
    getHeaderToUploadFile() {
        return {
            Authorization: `Bearer ${this.getToken()}`,
            'Content-Type': 'multipart/form-data',
        }
    },
}

export default TokenService
