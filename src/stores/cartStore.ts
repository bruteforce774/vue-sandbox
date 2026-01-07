import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from '../types'


export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([])

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

  function addToCart(newItem: CartItem) {
    const existingItem = cartItems.value.find((item) => item.id === newItem.id)
    if (existingItem) {
      existingItem.quantity += newItem.quantity
    } else {
      cartItems.value.push(newItem)
    }
  }

  function removeFromCart(productId: number) {
    cartItems.value = cartItems.value.filter((item) => item.id !== productId)
  }

  return { cartItems, cartCount, cartTotal, updateQuantity, addToCart, removeFromCart }
})