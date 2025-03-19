import api from "@/config/axios"

export const currencyService = {
    getConversionRates(code) {
        return api.post('guest/currency/get', {
            code
        })
    }
}