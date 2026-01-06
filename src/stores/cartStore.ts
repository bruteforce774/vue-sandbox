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
  return { cartItems, cartCount, cartTotal }
})