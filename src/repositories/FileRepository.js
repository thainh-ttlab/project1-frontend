import Repository from './Repository'
import TokenService from '@/helpers/token'

const resource = `${Repository.defaults.baseURL}/file`

export default {
    async uploadOneFile(file) {
        const bodyFormData = new FormData()
        bodyFormData.append('file', file)
        const response = await Repository.post(`${resource}/upload`, bodyFormData, {
            headers: TokenService.getHeader(),
        })
        return response
    },
}
