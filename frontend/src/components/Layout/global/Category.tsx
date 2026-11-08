'use client';

import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';

interface CategoryProps {
    selectedCategory?: string;
    onSelectCategory?: (categoryId: string) => void;
}

export default function Category({ selectedCategory = "", onSelectCategory }: CategoryProps) {
    const { categories, loading, error } = useCategories();
    const [internalSelected, setInternalSelected] = useState<string>(selectedCategory);

    const handleSelect = (id: string) => {
        setInternalSelected(id);
        if (onSelectCategory) {
            onSelectCategory(id);
        }
    };

    const activeCategoryId = selectedCategory !== undefined ? selectedCategory : internalSelected;

    const currentCategoryName = categories.find(
        (cat) => String(cat.id) === String(activeCategoryId)
    )?.name ?? "All Categories";

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-between gap-2 h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-[13px] text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all cursor-pointer whitespace-nowrap shrink-0 outline-none">
                        <span className="truncate max-w-[120px]">
                            {loading ? "Loading..." : currentCategoryName}
                        </span>
                        {loading ? (
                            <Loader2 size={14} className="animate-spin text-zinc-400 shrink-0" />
                        ) : (
                            <ChevronDown size={14} className="text-zinc-400 shrink-0" />
                        )}
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    className="w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 max-h-72 overflow-y-auto p-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    align="end"
                    sideOffset={6}
                >
                    <DropdownMenuLabel className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 tracking-wide uppercase px-2 py-1.5">
                        Search by Category
                    </DropdownMenuLabel>

                    {/* All Categories Option */}
                    <DropdownMenuItem
                        onClick={() => handleSelect("")}
                        className={`cursor-pointer py-2 px-2 text-xs rounded-md transition-colors ${!activeCategoryId ? 'bg-zinc-100 dark:bg-zinc-800 font-medium' : ''
                            }`}
                    >
                        All Categories
                    </DropdownMenuItem>

                    {/* Error State */}
                    {error && (
                        <div className="px-2 py-2 text-xs text-red-500">
                            Failed to load categories
                        </div>
                    )}

                    {/* Categories List */}
                    {!loading && Array.isArray(categories) && categories.map((category) => {
                        const isSelected = String(category.id) === String(activeCategoryId);
                        return (
                            <DropdownMenuItem
                                key={category.id}
                                onClick={() => handleSelect(String(category.id))}
                                className={`cursor-pointer py-2 px-2 text-sm rounded-md transition-colors ${isSelected ? 'bg-zinc-100 dark:bg-zinc-800 font-medium' : ''
                                    }`}
                            >
                                {category.name}
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
