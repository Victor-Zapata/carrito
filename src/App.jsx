import './App.css'
import Guitar from './components/Guitar'
import Header from './components/Header'
import { useCart } from './hooks/useCart';

function App() {

  const {
    getInitialData,
    guitars,
    cart,
    handleIncrement,
    handleDecrement,
    totalPrice,
    deleteCart,
    addToCart,
    deleteGuitar } = useCart();

  return (
    <>
      <Header
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        totalPrice={totalPrice}
        deleteGuitar={deleteGuitar}
        cart={cart}
        deleteCart={deleteCart}
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
