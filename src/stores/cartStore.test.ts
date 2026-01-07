import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from './cartStore'
import type { CartItem } from '../types'

describe('cartStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('calculates cartCount correctly', () => {
    const cartStore = useCartStore()
    cartStore.cartItems = [
      { id: 1, name: 'Product 1', price: 10, quantity: 2, image: 'image1.jpg' },
      { id: 2, name: 'Product 2', price: 20, quantity: 1, image: 'image2.jpg' },
    ] as CartItem[]
    expect(cartStore.cartCount).toBe(3)
  })

  it('calculates cartTotal correctly', () => {
    const cartStore = useCartStore()
    cartStore.cartItems = [
      { id: 1, name: 'Product 1', price: 10, quantity: 2 },
      { id: 2, name: 'Product 2', price: 20, quantity: 1 },
    ] as CartItem[]
    expect(cartStore.cartTotal).toBe(40)
  })

  it('updates item quantity correctly', () => {
    const cartStore = useCartStore()
    cartStore.cartItems = [
      { id: 1, name: 'Product 1', price: 10, quantity: 2 },
      { id: 2, name: 'Product 2', price: 20, quantity: 1 },
    ] as CartItem[]
    cartStore.updateQuantity(1, 5)
    expect(cartStore.cartItems.find(item => item.id === 1)?.quantity).toBe(5)
    expect(cartStore.cartCount).toBe(6)
    expect(cartStore.cartTotal).toBe(70)
  })

  it('adds new item to cart correctly', () => {
    const cartStore = useCartStore()
    cartStore.cartItems = [
      { id: 1, name: 'Product 1', price: 10, quantity: 2, image: 'image1.jpg' },
    ] as CartItem[]
    cartStore.addToCart({ id: 2, name: 'Product 2', price: 20, quantity: 1, image: 'image2.jpg' })
    expect(cartStore.cartItems.length).toBe(2)
    expect(cartStore.cartCount).toBe(3)
    expect(cartStore.cartTotal).toBe(40)
  })

  it('increments quantity when adding existing item', () => {
    const cartStore = useCartStore()
    cartStore.addToCart({ id: 1, name: 'Product 1', price: 10, quantity: 1, image: 'image1.jpg' })
    cartStore.addToCart({ id: 1, name: 'Product 1', price: 10, quantity: 2, image: 'image1.jpg' })
  expect(cartStore.cartItems.length).toBe(1)
  expect(cartStore.cartItems[0]?.quantity).toBe(3)
})

  it('removes item from cart correctly', () => {
    const cartStore = useCartStore()
    cartStore.cartItems = [
      { id: 1, name: 'Product 1', price: 10, quantity: 2, image: 'image1.jpg' },
      { id: 2, name: 'Product 2', price: 20, quantity: 1, image: 'image2.jpg' },
    ] as CartItem[]
    cartStore.removeFromCart(1)
    expect(cartStore.cartItems.length).toBe(1)
    expect(cartStore.cartItems[0]).toBeDefined()
    expect(cartStore.cartItems[0]!.id).toBe(2)
    expect(cartStore.cartCount).toBe(1)
    expect(cartStore.cartTotal).toBe(20)
  }
})