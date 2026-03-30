import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/organisms/Navbar'
import { Footer } from '../components/organisms/Footer'
import { useCart } from '../hooks/UseCart'

export const RootLayout = () => {
    const { totalItems } = useCart()

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
                <Navbar cartCount={totalItems} />
                <main className="min-h-[60vh]">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}