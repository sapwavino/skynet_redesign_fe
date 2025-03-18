import api from "@/config/axios"
import store from "@/store/index.js";

export const authService = {
    login(credentials) {
        return api.post('/guest/client/login', credentials)
    },
    register(userData) {
        return api.post('/guest/client/create', userData)
    },
    me() {
        api.post('/client/profile/get')
            .then((response) => {
                const {data} = response
                store.state.auth.user = data.result
                return data.result
            })
            .catch((error) => {
                console.error('Failed to fetch user profile:', error)
                throw new Error(error.message)
            })
    },
    logout() {
        return api.post('/auth/logout')
    }
}