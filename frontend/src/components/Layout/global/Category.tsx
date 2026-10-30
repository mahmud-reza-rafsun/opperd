const categories = [
    { name: "Fashion & Clothing" },
    { name: "Shoes & Footwear" },
    { name: "Jewelry & Accessories" },
    { name: "Mobile & Electronics" },
    { name: "Computers & Laptops" },
    { name: "Home & Furniture" },
    { name: "Kitchen & Dining" },
    { name: "Beauty & Skincare" },
    { name: "Health & Wellness" },
    { name: "Toys & Baby" },
    { name: "Sports & Outdoors" },
    { name: "Groceries & Food" },
    { name: "Books & Stationery" },
    { name: "Automotive" },
    { name: "Pet Supplies" },
    { name: "Gaming" },
];

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'

export default function Category() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-between gap-2 h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-[13px] text-zinc-600 dark:text-zinc-300  hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all cursor-pointer whitespace-nowrap shrink-0 outline-none">
                        <span className="truncate max-w-[120px]">{selectedCategory ?? "All Categories"}</span>
                        <ChevronDown size={14} className="text-zinc-400 shrink-0" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xl max-h-72 overflow-y-auto" align="end" sideOffset={6}>
                    <DropdownMenuLabel className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 tracking-wide uppercase px-2 py-1.5">
                        Search by Category
                    </DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="gap-2 cursor-pointer text-[13px] focus:bg-zinc-100 dark:focus:bg-zinc-800" onClick={() => setSelectedCategory(null)}>
                            <span>All Categories</span>
                        </DropdownMenuItem>
                        {categories.map((cat) => (
                            <DropdownMenuItem
                                key={cat.name}
                                className="gap-2 cursor-pointer text-[13px] focus:bg-zinc-100 dark:focus:bg-zinc-800"
                                onClick={() => setSelectedCategory(cat.name)}
                            >
                                <span>{cat.name}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
