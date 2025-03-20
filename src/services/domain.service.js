import api from "@/config/axios"

export const domainService = {
    availableTLDs() {
        return api.post('/guest/servicedomain/tlds')
    },
    check(domain) {
        if (!domain.sld || !domain.tld) {
            throw new Error('Domain must have a SLD and a TLD')
        }
        return api.post('/guest/servicedomain/check', {
            sld: domain.sld,
            tld: domain.tld
        })
    }
}