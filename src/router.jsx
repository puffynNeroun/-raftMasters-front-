// src/router.jsx
import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// Pages (то есть не layout, а содержимое)
import { Welcome } from './components/welcome/Welcome.jsx'
import { News } from './components/news/News.jsx'
import { Gallery } from './components/gallery/Gallery.jsx'
import { Contact } from './components/contact/Contact.jsx'
import { Masters } from './components/masters/Masters.jsx'
import { NewsFull } from './components/newsFull/NewsFull.jsx'

// Главная страница как отдельный компонент (вместо App туда добавим Welcome и др.)
const HomePage = () => (
    <>
        <Welcome />
        <News />
        <Gallery />
    </>
)

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true, // для главной
                element: <HomePage />,
            },
            {
                path: 'masters',
                element: <Masters />,
            },
            {
                path: 'news/:id',
                element: <NewsFull />,
            },
            {
                path: 'contact',
                element: <Contact />,
            },
        ],
    },
])
