import { Suspense } from 'react';
import Products from '@/components/Layout/Products/Products';
import { productService } from '@/service/product.service';
import { Skeleton } from '@/components/ui/skeleton';

async function ProductContent() {
    const response = await productService.getAllProducts();
    const products = response.data || [];

    return <Products products={products} />;
}

function ProductsSkeleton() {
    return (
        <div className='container mx-auto py-8'>
            <div className='grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-0 mt-4'>
                {[...Array(3)].map((_, index) => (
                    <div key={index} className='flex flex-col space-y-3 p-4 border border-border/60 rounded-xl'>
                        <Skeleton className='aspect-video h-64 w-full rounded-xl' />
                        <div className='space-y-2 pt-2'>
                            <Skeleton className='h-4 w-full' />
                            <Skeleton className='h-4 w-3/4' />
                            <Skeleton className='h-6 w-1/2 mt-2' />
                        </div>
                        <Skeleton className='h-10 w-full rounded-md mt-4' />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <div>
            <Suspense fallback={<ProductsSkeleton />}>
                <ProductContent />
            </Suspense>
        </div>
    );
}
