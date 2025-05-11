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
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminPanel from "./admin/AdminPanel.jsx";
import PrivateAdminRoute from "./admin/PrivateAdminRoute.jsx";
import AdminCategories from "./admin/AdminCategories.jsx";
import AdminNews from "./admin/AdminNews.jsx";
import AdminItems from "./admin/AdminItems.jsx";
import AdminItemCreate from "./admin/AdminItemCreate.jsx";
import AdminMasters from "./admin/AdminMasters.jsx";
import AdminMasterCreate from "./admin/AdminMasterCreate.jsx";

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
            {
                path: 'gallery',
                element: <Gallery />,
            },
            {
                path: 'news',
                element: <News />,
            },
            {
                path: '/admin/login',
                element: <AdminLogin />
            },
            {
                path: '/admin/dashboard',
                element: (
                    <PrivateAdminRoute>
                        <AdminPanel />
                    </PrivateAdminRoute>
                )
            },
            {
                path: '/admin/categories',
                element: (
                    <PrivateAdminRoute>
                        <AdminCategories />
                    </PrivateAdminRoute>
                )
            },
            {
                path: '/admin/news',
                element: (
                    <PrivateAdminRoute>
                        <AdminNews />
                    </PrivateAdminRoute>
                )
            },
            {
                path: '/admin/items',
                element: (
                    <PrivateAdminRoute>
                        <AdminItems />
                    </PrivateAdminRoute>
                )
            },
            {
                path: '/admin/items/create',
                element: (
                    <PrivateAdminRoute>
                        <AdminItemCreate />
                    </PrivateAdminRoute>
                )
            },
            {
                path: '/admin/masters',
                element: (
                    <PrivateAdminRoute>
                        <AdminMasters />
                    </PrivateAdminRoute>
                )
            },

            {
                path: '/admin/masters/create',
                element: <AdminMasterCreate />
            }

        ],
    },
])
