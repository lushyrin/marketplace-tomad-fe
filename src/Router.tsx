import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from './pages/RootLayout'
import { HomePage } from './pages/HomePage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { ProductListPage } from './pages/ProdoctListPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'products/:id', element: <ProductDetailPage /> },
            { path: 'products', element: <ProductListPage /> },
            // { path: 'cart',             element: <CartPage /> },
            // { path: 'checkout',         element: <CheckoutPage /> },
            // { path: 'login',            element: <LoginPage /> },
            // { path: 'register',         element: <RegisterPage /> },
            // { path: 'account',          element: <AccountPage /> },
            // { path: 'seller/dashboard', element: <SellerDashboardPage /> },
        ],
    },
])

export default router