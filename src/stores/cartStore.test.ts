import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from './cartStore'
import type { CartItem } from '../types'

describe('cartStore', () => {
  let cartStore: ReturnType<typeof useCartStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    cartStore = useCartStore()
    cartStore.cartItems = [
      { id: 1, name: 'Product 1', price: 10, quantity: 2 },
      { id: 2, name: 'Product 2', price: 20, quantity: 1 },
    ] as CartItem[]
  })

  it('calculates cartCount correctly', () => {
    expect(cartStore.cartCount).toBe(3)
  })

  it('calculates cartTotal correctly', () => {
    expect(cartStore.cartTotal).toBe(40)
  })

  it('updates item quantity correctly', () => {
    cartStore.updateQuantity(1, 5)
    expect(cartStore.cartItems.find(item => item.id === 1)?.quantity).toBe(5)
    expect(cartStore.cartCount).toBe(6)
    expect(cartStore.cartTotal).toBe(70)
  })
})