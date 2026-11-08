'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCategories } from '@/hooks/useCategories';

export default function Category() {
    const { categories, loading, error } = useCategories();

    return (
        <div className='container mx-auto py-8'>
            <div className="mb-11 flex flex-col sm:flex-row items-center justify-between border-none bg-blue-500 p-6 py-6 rounded-none lg:rounded-md dark:bg-blue-500/90">
                <div className="mx-auto text-center text-xl font-semibold uppercase text-white lg:text-2xl">
                    Browse by Categories
                </div>
            </div>

            <h2 className='px-5 text-xl font-bold text-gray-800 lg:px-0 lg:text-2xl dark:text-gray-100'>Today's Deals</h2>

            {/* Loading & Error States */}
            {loading && <p className="px-5 lg:px-0 mt-4 text-gray-500">Loading categories...</p>}
            {error && <p className="px-5 lg:px-0 mt-4 text-red-500">Failed to load categories.</p>}

            {/* Categories Grid */}
            {!loading && !error && (
                <div className='grid grid-cols-2 gap-6 px-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:px-0 mt-4'>
                    {Array.isArray(categories) && categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/product-category/${category.id}`}
                            className='group relative flex flex-col justify-between rounded-md bg-transparent'
                        >
                            <div className='flex h-52 flex-col items-center justify-center'>
                                <div className='isolate relative h-44 w-full overflow-hidden rounded-md bg-gray-100 dark:bg-zinc-800'>
                                    {category.image ? (
                                        <Image
                                            src={category.image}
                                            alt={category.name || 'Category'}
                                            fill
                                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                                            className='object-cover transition-transform duration-300 group-hover:scale-105'
                                        />
                                    ) : null}
                                    <div className='absolute top-3 left-3 rounded-sm border border-white/10 bg-black/40 px-3 py-1 backdrop-blur-md'>
                                        <h3 className='text-xs font-semibold text-white'>
                                            {category.name}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
