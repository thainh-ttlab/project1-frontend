import UserRepository from './UserRepository'
import AuthRepository from './AuthRepository'

const repositories = {
    user: UserRepository,
    auth: AuthRepository,
}

export default {
    get: name => repositories[name],
}
