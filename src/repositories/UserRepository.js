import Repository from './Repository'
import TokenService from '@/helpers/token'

const resource = `${Repository.defaults.baseURL}/user`

export default {
    async list(params) {
        const response = await Repository.get(`${resource}`, {
            params,
            headers: TokenService.getHeader(),
        })
        return response
    },
    async detail(id) {
        const response = await Repository.get(`${resource}/${id}`, {
            headers: TokenService.getHeader(),
        })
        return response
    },

    async create(user) {
        const response = await Repository.post(`${resource}`, user, {
            headers: TokenService.getHeader(),
        })
        return response
    },

    async update(id, user) {
        const response = await Repository.patch(`${resource}/${id}`, user, {
            headers: TokenService.getHeader(),
        })
        return response
    },
    async delete(id) {
        const response = await Repository.delete(`${resource}/${id}`, {
            headers: TokenService.getHeader(),
        })
        return response
    },
}
