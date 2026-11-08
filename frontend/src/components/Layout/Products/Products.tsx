'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card';

type Product = {
    id: string;
    productTitle: string;
    images: string;
    description?: string;
    price?: number;
    originalPrice?: number;
    shippingInfo?: string;
};

type ProductsProps = {
    products: Product[] | any;
};

export default function Products({ products }: ProductsProps) {
    // সেফটি চেক যাতে অ্যারে না হলেও অ্যাপ ক্র্যাশ না করে
    const productList = Array.isArray(products)
        ? products
        : (products?.data && Array.isArray(products.data))
            ? products.data
            : [];

    return (
        <div className='container mx-auto py-8'>

            {productList.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400">No products found.</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-0 mt-4'>
                    {productList.map((product: Product) => (
                        <Card key={product.id} className='max-w-md pt-0 overflow-hidden flex flex-col justify-between border border-border/60 shadow-sm hover:shadow-md transition-shadow'>
                            <div>
                                <CardContent className='px-0 pt-0'>
                                    <div className='relative aspect-video h-64 w-full overflow-hidden bg-muted'>
                                        <Image
                                            src={product.images || 'https://cdn.shadcnstudio.com/ss-assets/components/card/image-2.png?height=280&format=auto'}
                                            alt={product.productTitle || 'Product Image'}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                                            className='object-cover rounded-t-xl transition-transform duration-300 hover:scale-105'
                                        />
                                    </div>
                                </CardContent>
                                <CardHeader className='pb-3'>
                                    <CardTitle className='text-base font-semibold line-clamp-2'>
                                        {product.productTitle}
                                    </CardTitle>
                                    <CardDescription className='line-clamp-2 text-xs mt-1'>
                                        {product.description || 'Samsung Galaxy Z Fold5 • 512 GB Refurbished'}
                                    </CardDescription>

                                    {/* Price and shipping section like the reference image */}
                                    <div className='mt-3 flex items-baseline gap-2'>
                                        <span className='text-xl font-bold text-foreground'>
                                            ${product.price || '489.99'}
                                        </span>
                                        {product.originalPrice && (
                                            <span className='text-sm text-muted-foreground line-through'>
                                                ${product.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                    <p className='text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1'>
                                        {product.shippingInfo || 'Free shipping'}
                                    </p>
                                </CardHeader>
                            </div>

                            <CardFooter className='pt-0 gap-2'>
                                <Button asChild className='w-full'>
                                    <Link href={`/products/${product.id}`}>
                                        View Details
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
