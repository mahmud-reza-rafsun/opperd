'use client'

import { useState } from 'react'
import Link from 'next/link'



const PRODUCTS = [
    {
        id: '98f34t02k-j09f84t90234t',
        description: "Crossing hardwood comfort with off-court flair. '80s-Inspired construction, bold details and nothin'-but-net style.",
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop'],
        category: 'Footwear',
    },
    {
        id: '234t09u23-89g0493g02394',
        description: 'Brand new custom-built wooden sofa set upholstered in premium fabric. Perfect for modern living spaces.',
        images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop'],
        category: 'Furniture',
    },
    {
        id: '12093t402-90j234t90u239',
        description: 'Industry-leading noise canceling headphones with exceptional sound quality and 30-hour long battery life.',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop'],
        category: 'Electronics',
    },
    {
        id: '43098t9034t9y02349t02',
        description: 'Extreme performance laptop for professionals. Featuring M3 Max chip, 36GB unified memory, and stunning Liquid Retina XDR display.',
        images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop'],
        category: 'Electronics',
    },
    {
        id: '7823t092u-09g02394t0923',
        description: 'Classic genuine leather biker jacket with asymmetric zipper and quilted lining. Timeless style.',
        images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop'],
        category: 'Apparel',
    },
    {
        id: '3490t023u-90g82394t0923',
        description: 'Complete smart home integration including lighting, security cameras, smart locks, and voice assistant configuration.',
        images: ['https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=600&auto=format&fit=crop'],
        category: 'Display',
    },
    {
        id: '9023t092u-90g2394t09234',
        description: 'Professional 45MP full-frame mirrorless camera capable of 8K video recording and lightning-fast autofocus.',
        images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop'],
        category: 'Electronics',
    },
    {
        id: '1209t092u-90g2394t09234',
        description: 'Hot-swappable mechanical keyboard with custom linear switches, per-key RGB lighting, and durable PBT keycaps.',
        images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop'],
        category: 'Electronics',
    },
    {
        id: '1509t092u-90g2394t09234',
        description: 'High-sensitivity cardioid condenser microphone for crystal clear vocal recording, podcasting, and streaming.',
        images: ['https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop'],
        category: 'Audio',
    },
    {
        id: '1609t092u-90g2394t09234',
        description: 'Advanced health monitoring smartwatch tracking heart rate, sleep quality, blood oxygen, and 20+ sports modes.',
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop'],
        category: 'Wearables',
    },
    {
        id: '1809t092u-90g2394t09234',
        description: 'Ultra-lightweight carbon fiber frame, hydraulic disc brakes, and responsive suspension fork for rough mountain trails.',
        images: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=600&auto=format&fit=crop'],
        category: 'Sports',
    },
    {
        id: '1909t092u-90g2394t09234',
        description: 'Tournament-grade 54g wireless gaming mouse with optical switches and flawless 25K DPI sensor.',
        images: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop'],
        category: 'Electronics',
    },
];

const PRODUCTS1 = [
    {
        id: '234t09u23-89g0493g02394',
        description: 'Brand new custom-built wooden sofa set upholstered in premium fabric. Perfect for modern living spaces.',
        images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop'],
        category: 'Furniture',
    },
    {
        id: '43098t9034t9y02349t02',
        description: 'Extreme performance laptop for professionals. Featuring M3 Max chip, 36GB unified memory, and stunning Liquid Retina XDR display.',
        images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop'],
        category: 'Electronics',
    },
    {
        id: '9023t092u-90g2394t09234',
        description: 'Professional 45MP full-frame mirrorless camera capable of 8K video recording and lightning-fast autofocus.',
        images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop'],
        category: 'Electronics',
    },
    {
        id: '1209t092u-90g2394t09234',
        description: 'Hot-swappable mechanical keyboard with custom linear switches, per-key RGB lighting, and durable PBT keycaps.',
        images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop'],
        category: 'Electronics',
    },
    {
        id: '1809t092u-90g2394t09234',
        description: 'Ultra-lightweight carbon fiber frame, hydraulic disc brakes, and responsive suspension fork for rough mountain trails.',
        images: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=600&auto=format&fit=crop'],
        category: 'Sports',
    },
    {
        id: '1909t092u-90g2394t09234',
        description: 'Tournament-grade 54g wireless gaming mouse with optical switches and flawless 25K DPI sensor.',
        images: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop'],
        category: 'Electronics',
    },
];

export default function Category() {

    return (
        <div className='container mx-auto py-8'>
            <div className="mb-11 flex flex-col sm:flex-row items-center justify-between lg:rounded-md border border-neutral-200 bg-blue-500 p-6 dark:bg-blue-500/90 border-none py-6 rounded-none">
                <div className="lg:text-2xl text-xl font-semibold uppercase text-white text-center mx-auto">
                    Browse by Categories
                </div>
            </div>

            <h2 className='text-xl lg:text-2xl  lg:px-0 px-5 font-bold text-gray-800 dark:text-gray-100'>Today's Deals</h2>

            <Link href="/category" className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:px-0 px-5'>
                {PRODUCTS.map((product) => {
                    return (
                        <div
                            key={product.id}
                            className='relative rounded-md flex flex-col justify-between group bg-transparent'>
                            <div className='flex flex-col h-52 items-center justify-center'>
                                <div className='relative w-full h-44 overflow-hidden rounded-md isolate'>
                                    <img
                                        src={product.images[0]}
                                        alt={product.id}
                                        className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                                    />

                                    <div className='absolute top-3 left-3 px-3 py-1 rounded-sm bg-black/40 backdrop-blur-md border border-white/10'>
                                        <h2 className='text-white font-semibold text-xs'>
                                            {product.category}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Link>

            <h2 className='text-xl lg:text-2xl lg:px-0 px-5 font-bold text-gray-800 dark:text-gray-100 mt-5 lg:mt-10'>Trending on OpperdEcom</h2>

            <Link href="/category" className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:px-0 px-5'>
                {PRODUCTS1.map((product) => {
                    return (
                        <div
                            key={product.id}
                            className='relative rounded-md flex flex-col justify-between group bg-transparent'>
                            <div className='flex flex-col h-52 items-center justify-center'>
                                <div className='relative w-full h-44 overflow-hidden rounded-md isolate'>
                                    <img
                                        src={product.images[0]}
                                        alt={product.id}
                                        className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                                    />

                                    <div className='absolute top-3 left-3 px-3 py-1 rounded-sm bg-black/40 backdrop-blur-md border border-white/10'>
                                        <h2 className='text-white font-semibold text-xs'>
                                            {product.category}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Link>
        </div>
    )
}
