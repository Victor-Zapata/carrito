import { useEffect, useState } from 'react';
import './App.css'
import Guitar from './components/Guitar'
import Header from './components/Header'
import { db } from './data/db';

function App() {

  const getInitialData = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [guitars, setGuitars] = useState(db)
  const [cart, setCart] = useState(getInitialData)
  const [totalPrice, setTotalPrice] = useState(0)

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

  return (
    <>
      <Header
        cart={cart}
        setCart={setCart}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        totalPrice={totalPrice}
        deleteGuitar={deleteGuitar}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            guitars.map((item) => {
              return <Guitar addToCart={addToCart} key={item.id} item={item} />
            })
          }
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
