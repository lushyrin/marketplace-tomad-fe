import { HeroSection } from '../components/organisms/HeroSection'
import { CategoryBar } from '../components/organisms/CategoryBar'
import { FlashSaleSection } from '../components/organisms/FlashSaleSection'
import { RecommendationSection } from '../components/organisms/RecommendationSection'
import { LoadingSpinner } from '../components/atoms/LoadingSpinner'
import { useCart } from '../hooks/Usecart'
import { useFlashSale, useRecommendations } from '../hooks/UseProduct'

export const HomePage = () => {
    const { addToCart } = useCart()
    const { data: flashProducts, isLoading: flashLoading } = useFlashSale()
    const { data: recProducts, isLoading: recLoading } = useRecommendations()

    return (
        <>
            <HeroSection />
            <CategoryBar />

            {flashLoading
                ? <LoadingSpinner />
                : <FlashSaleSection products={flashProducts ?? []} onAddToCart={addToCart} />
            }

            {recLoading
                ? <LoadingSpinner />
                : <RecommendationSection products={recProducts ?? []} onAddToCart={addToCart} />
            }
        </>
    )
}