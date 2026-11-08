'use client'

import * as React from 'react'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { SearchIcon, PackageIcon, Undo2Icon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import Image from 'next/image'


const dummyProducts = [
    {
        id: '1',
        name: 'Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&auto=format&fit=crop&q=80',
        price: '$99'
    },
    {
        id: '2',
        name: 'Mechanical Keyboard',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&auto=format&fit=crop&q=80',
        price: '$120'
    },
    {
        id: '3',
        name: 'Gaming Mouse',
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=100&auto=format&fit=crop&q=80',
        price: '$49'
    },
]

export default function SearchBar() {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        const down = (event: KeyboardEvent) => {
            if (event.key === 'j' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="relative h-9 w-9 p-0 sm:w-auto sm:px-3 md:w-80 lg:w-96 md:justify-start md:px-4 md:py-2.5 rounded-lg"
            >
                <SearchIcon className="size-4 sm:mr-0 md:mr-3 text-muted-foreground shrink-0" />
                <span className="hidden md:inline-flex text-muted-foreground text-sm font-normal">
                    Search products, categories...
                </span>
                <Kbd className="hidden lg:inline-flex ml-auto pointer-events-none text-[10px]">
                    ⌘J
                </Kbd>
            </Button>

            <CommandDialog
                open={open}
                onOpenChange={setOpen}
                className="top-[24%] translate-y-0 max-w-[calc(100%-2rem)] sm:max-w-lg rounded-xl"
            >
                <Command className="rounded-xl">
                    <CommandInput
                        className="h-14 text-sm"
                        placeholder="Search products..."
                    />

                    <CommandList className="max-h-105">
                        <CommandEmpty>
                            No products found.
                        </CommandEmpty>

                        <CommandGroup heading="Products">
                            {dummyProducts.map((product) => (
                                <CommandItem
                                    key={product.id}
                                    value={product.name}
                                    onSelect={() => {
                                        setOpen(false)
                                    }}
                                    className="cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative size-9 shrink-0 overflow-hidden rounded-md bg-muted">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <span>{product.name}</span>
                                    </div>

                                    <span className="ml-auto text-xs text-muted-foreground">
                                        {product.price}
                                    </span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <div className='text-muted-foreground flex flex-wrap items-center gap-4 p-4'>
                        <div className='flex flex-1 items-center gap-2'>
                            <kbd className='rounded border px-1 text-sm'>esc</kbd>
                            <span>To close</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='flex size-5 items-center justify-center rounded border'>
                                <Undo2Icon className='size-4' />
                            </div>
                            <span>To Select</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='flex size-5 items-center justify-center rounded border'>
                                <ArrowUpIcon className='size-4' />
                            </div>
                            <div className='flex size-5 items-center justify-center rounded border'>
                                <ArrowDownIcon className='size-4' />
                            </div>
                            <span>To Navigate</span>
                        </div>
                    </div>
                </Command>
            </CommandDialog>
        </>
    )
}
