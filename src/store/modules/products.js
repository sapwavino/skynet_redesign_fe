export default {
    namespaced: true,
    state: {
        allProducts: []
    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.allProducts = products;
        }
    },
    actions: {
        setProducts({commit}, products) {
            commit('SET_PRODUCTS', products);
        }
    },
    getters: {
        getHostingProducts: state => state.allProducts.filter((product) => {
            return product.type === 'hosting';
        })
    }
}