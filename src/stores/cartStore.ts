import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { type CartItem, type Product } from '../types'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([])
  const products = ref<Product[]>([])
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)

  const cartCount = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const cartTotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  function updateQuantity(productId: number, quantity: number) {
    const item = cartItems.value.find((item) => item.id === productId)
    if (item) {
      item.quantity = quantity
    }
  }

  function addToCart(productId: number) {
    const product = products.value.find((p) => p.id === productId)
    if (!product) return

    const existingItem = cartItems.value.find((item) => item.id === productId)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }
  }

  function removeFromCart(productId: number) {
    cartItems.value = cartItems.value.filter((item) => item.id !== productId)
  }

  async function fetchProducts() {
    isLoading.value = true
    errorMessage.value = null
    try {
      const response = await fetch('/products.json')
      if (!response.ok) throw new Error('Failed to load')
      products.value = await response.json()
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return { cartItems, cartCount, cartTotal, updateQuantity, addToCart, removeFromCart, fetchProducts, products, isLoading, errorMessage }
})