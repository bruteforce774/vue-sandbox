# Vitest Basics (Testing Pinia)

## Install

```bash
npm install -D vitest
```

---

## Add Test Script

```json
// package.json
"scripts": {
  "test": "vitest"
}
```

---

## Test File Location

```
src/stores/bookStore.test.ts
```

---

## Basic Test Structure

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBookStore } from './bookStore'

describe('bookStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('does something', () => {
    const store = useBookStore()
    // test here
  })
})
```

---

## Set Up Store with Test Data

```typescript
const store = useBookStore()
store.books = [
  { id: 1, title: 'Book A', author: 'Author', price: 10, quantity: 2 },
  { id: 2, title: 'Book B', author: 'Author', price: 5, quantity: 3 },
]
```

---

## Test a Getter

```typescript
it('calculates totalBooks', () => {
  const store = useBookStore()
  store.books = [
    { id: 1, title: 'A', author: 'X', price: 10, quantity: 1 },
    { id: 2, title: 'B', author: 'Y', price: 5, quantity: 1 },
  ]

  expect(store.totalBooks).toBe(2)
})
```

---

## Test a Calculated Getter

```typescript
it('calculates totalInventoryValue', () => {
  const store = useBookStore()
  store.books = [
    { id: 1, title: 'A', author: 'X', price: 10, quantity: 2 },
    { id: 2, title: 'B', author: 'Y', price: 5, quantity: 3 },
  ]

  expect(store.totalInventoryValue).toBe(35) // (10*2) + (5*3)
})
```

---

## Test an Action

```typescript
it('updates quantity', () => {
  const store = useBookStore()
  store.books = [
    { id: 1, title: 'A', author: 'X', price: 10, quantity: 1 },
  ]

  store.updateQuantity(1, 5)

  expect(store.books[0].quantity).toBe(5)
})
```

---

## Test Remove Action

```typescript
it('removes a book', () => {
  const store = useBookStore()
  store.books = [
    { id: 1, title: 'A', author: 'X', price: 10, quantity: 1 },
    { id: 2, title: 'B', author: 'Y', price: 5, quantity: 1 },
  ]

  store.removeBook(1)

  expect(store.books).toHaveLength(1)
  expect(store.books[0].id).toBe(2)
})
```

---

## Run Tests

```bash
npm test
```

---

## Key Rules

- `beforeEach` → fresh Pinia for each test
- Set state directly with test data
- Don't test `fetch` in unit tests — use manual data
- `expect(...).toBe(...)` for simple values
- `expect(...).toHaveLength(...)` for arrays
