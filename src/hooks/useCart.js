//mis custom hooks siempre van a tener lógica, nada más
//por eso son .js...si quiero tener vista, lo recomendado es tener un componente

//los hooks son funciones de JS
import { useEffect, useState } from 'react';
import { db } from '../data/db';

export const useCart = () => {
  const getInitialData = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [guitars, setGuitars] = useState(db)
  const [cart, setCart] = useState(getInitialData)
  const [totalPrice, setTotalPrice] = useState(0)

  const probando = cart.map((item) => {
    return item.price * item.quantity
  })

  useEffect(() => {
    let totalP = probando.reduce((a, b) => a + b, 0);
    setTotalPrice(totalP)
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExist >= 0 && item.quantity < 5) {
      const updateCart = [...cart]
      updateCart[itemExist].quantity++
      setTotalPrice(totalPrice + updateCart[itemExist].price)
      setCart(updateCart)
    } else if (itemExist == -1) {
      item.quantity = 1
      setCart([...cart, item])
      setTotalPrice(totalPrice + item.price)
    }
  }

  const handleIncrement = (item) => {
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExist >= 0 && item.quantity < 5) {
      const updateCart = [...cart]
      updateCart[itemExist].quantity++
      setTotalPrice(totalPrice + item.price)
      setCart(updateCart)
    }
  }

  const handleDecrement = (item) => {
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExist >= 0 && item.quantity > 1) {
      const updateCart = [...cart]
      updateCart[itemExist].quantity--
      setTotalPrice(totalPrice - item.price)
      setCart(updateCart)
    } else if (item.quantity == 1) {
      deleteGuitar(item)
    }
  }

  const deleteGuitar = (guitar) => {
    const cartFiltrado = cart.filter((item) => {
      return item.id != guitar.id
    })
    setCart(cartFiltrado)
    const guitarDelete = guitar.price * guitar.quantity
    setTotalPrice(totalPrice - guitarDelete)
  }

  const deleteCart = () => {
    setCart([])
  }

  return {
    getInitialData,
    cart,
    setCart,
    handleIncrement,
    handleDecrement,
    totalPrice,
    deleteGuitar,
    guitars,
    addToCart,
    deleteCart
  }
}