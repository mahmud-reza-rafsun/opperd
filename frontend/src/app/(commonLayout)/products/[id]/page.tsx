import { Suspense } from 'react';
import { productService } from '@/service/product.service';
import { Skeleton } from '@/components/ui/skeleton';
import ProductDetails from '@/components/Layout/Products/ProductDetails';

async function getProductDetails(id: string) {
    try {
        const response = await productService.getSingleProducts({ id });
        const data = response?.data;
        if (Array.isArray(data)) {
            return data.find((p: any) => p.id === id || p._id === id) || null;
        }
        return data || null;
    } catch (error) {
        return null;
    }
}

// 1. Move params awaiting and data fetching into this sub-component
async function ProductDetailsFetcher({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const productDetails = await getProductDetails(id);
    return <ProductDetails productDetails={productDetails} />;
}

function ProductDetailsSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 flex flex-col gap-4">
                    <Skeleton className="aspect-square w-full rounded-2xl" />
                </div>
                <div className="lg:col-span-5 flex flex-col gap-5">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-16 w-full rounded-xl" />
                    <hr className="border-border/60" />
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-4 w-64" />
                    <hr className="border-border/60" />
                    <Skeleton className="h-24 w-full rounded-lg" />
                    <Skeleton className="h-12 w-full rounded-full mt-4" />
                    <div className="grid grid-cols-2 gap-3">
                        <Skeleton className="h-10 w-full rounded-full" />
                        <Skeleton className="h-10 w-full rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// 2. Page component now only renders Suspense wrapping the dynamic component
export default function Page({ params }: { params: Promise<{ id: string }> }) {
    return (
        <main className="min-h-screen bg-background">
            <Suspense fallback={<ProductDetailsSkeleton />}>
                <ProductDetailsFetcher params={params} />
            </Suspense>
        </main>
    );
}
