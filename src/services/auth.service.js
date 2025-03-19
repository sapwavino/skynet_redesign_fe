import api from "@/config/axios"

export const authService = {
    login(credentials) {
        return api.post('/guest/client/login', credentials)
    },
    register(userData) {
        return api.post('/guest/client/create', userData)
    },
    me() {
        return api.post('/client/profile/get')
    },
    logout() {
        return api.post('/auth/logout')
    }
}