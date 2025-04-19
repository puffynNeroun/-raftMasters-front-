// src/App.jsx
import { Outlet } from 'react-router-dom'
import { Header } from './components/header/Header.jsx'
import { Footer } from './components/footer/Footer.jsx'

const App = () => {
    return (
        <div className="app">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default App
