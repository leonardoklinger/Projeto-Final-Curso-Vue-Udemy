import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {//propriedades de dados
    products: [],
    productsInBag: []
  },
  mutations: {
    loadProducts(state, products) {
      state.products = products
    },
    loadBag(state, products) {
      state.productsInBag = products
    },
    addToBag(state, product) {
      state.productsInBag.push(product)
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },
    removeFromBag(state, productId) {
      var updatedBag = state.productsInBag.filter(item => productId != item.id)
      state.productsInBag = updatedBag
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    }
  },
  actions: {
    loadProducts({ commit }) {
      axios.get("https://fakestoreapi.com/products").then(response => {
        commit('loadProducts', response.data)
      })
    },

    loadBag({ commit }) {
      if (localStorage.getItem("productsInBag")) {
        commit('loadBag', JSON.parse(localStorage.getItem("productsInBag")))
      }
    },

    addToBag({ commit }, product) {
      commit('addToBag', product)
    },

    removeFromBag({ commit }, productId) {
      if (confirm('Você tem certeza que quer remover o item do carrinho ?')) {
        commit('removeFromBag', productId)
      }
    },
  },
  modules: {
  }
})
