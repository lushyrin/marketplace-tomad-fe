import { useState } from 'react'
import { HeroSection } from '../components/organisms/HeroSection'
import { CategoryBar } from '../components/organisms/CategoryBar'
import { FlashSaleSection } from '../components/organisms/FlashSaleSection'
import { RecommendationSection } from '../components/organisms/RecommendationSection'
import { ProductGrid } from '../components/organisms/ProductGrid'
import { LoadingSpinner } from '../components/atoms/LoadingSpinner'
import { useCart } from '../hooks/UseCart'
import { useFlashSale, useRecommendations, useProductsByCategory } from '../hooks/UseProduct'

export const HomePage = () => {
    const { addToCart } = useCart()

    //'all' means no filter
    const [activeCategory, setActiveCategory] = useState('all')

    const { data: flashProducts, isLoading: flashLoading } = useFlashSale()
    const { data: recProducts, isLoading: recLoading } = useRecommendations()
    const { data: categoryProducts, isLoading: categoryLoading } = useProductsByCategory(activeCategory)
    const isCategoryFiltered = activeCategory !== 'all'

    return (
        <>
            <HeroSection />
            <CategoryBar onSelect={setActiveCategory} />

            {isCategoryFiltered ? (
                //show products from selected category
                <section className="py-8">
                    {categoryLoading
                        ? <LoadingSpinner />
                        : <ProductGrid products={categoryProducts ?? []} onAddToCart={addToCart} />
                    }
                </section>
            ) : (
                //flash sale + recommendations
                <>
                    {flashLoading
                        ? <LoadingSpinner />
                        : <FlashSaleSection products={flashProducts ?? []} onAddToCart={addToCart} />
                    }
                    {recLoading
                        ? <LoadingSpinner />
                        : <RecommendationSection products={recProducts ?? []} onAddToCart={addToCart} />
                    }
                </>
            )}
        </>
    )
}