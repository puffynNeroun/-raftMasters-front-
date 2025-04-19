// src/App.jsx
import { Outlet } from 'react-router-dom'
import { Header } from './components/header/Header.jsx'
import { Footer } from './components/footer/Footer.jsx'

const App = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};


export default App
