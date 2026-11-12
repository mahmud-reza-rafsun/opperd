'use client';

import * as React from "react";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Skeleton } from "@/components/ui/skeleton";
import {
    SearchIcon,
    Undo2Icon,
    ArrowUpIcon,
    ArrowDownIcon,
} from "lucide-react";
import { searchAction } from "@/components/actions/searchAction";
import Image from "next/image";

type Product = {
    id: string;
    images: string;
    price: string;
    productTitle: string;
};

export default function SearchBar() {
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [products, setProducts] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const down = (event: KeyboardEvent) => {
            if (event.key === "j" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);

        return () => document.removeEventListener("keydown", down);
    }, []);

    React.useEffect(() => {
        if (!open || !searchTerm.trim()) {
            setProducts([]);
            setLoading(false);
            return;
        }

        let active = true;

        const timer = setTimeout(async () => {
            setLoading(true);

            const result = await searchAction({
                searchTerm: searchTerm.trim(),
            });

            if (!active) return;

            if (result.error) {
                setProducts([]);
            } else {
                const productList = result.data?.data || result.data || [];
                setProducts(Array.isArray(productList) ? productList : []);
            }

            setLoading(false);
        }, 400);

        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, [searchTerm, open]);

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
                <Command shouldFilter={false} className="rounded-xl">
                    <CommandInput
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                        className="h-14 text-sm"
                        placeholder="Search products..."
                    />

                    <CommandList className="max-h-105">
                        {loading ? (
                            <div className="p-2 space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="flex items-center gap-3 p-2">
                                        <Skeleton className="size-9 rounded-md" />
                                        <div className="space-y-1.5 flex-1">
                                            <Skeleton className="h-4 w-3/4" />
                                        </div>
                                        <Skeleton className="h-4 w-12" />
                                    </div>
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <CommandEmpty>
                                {searchTerm.trim()
                                    ? "No products found."
                                    : "Start typing to search products."}
                            </CommandEmpty>
                        ) : (
                            <CommandGroup heading="Products">
                                {products.map((product) => (
                                    <CommandItem
                                        key={product.id}
                                        value={product.productTitle}
                                        onSelect={() => setOpen(false)}
                                        className="cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="relative size-9 shrink-0 overflow-hidden rounded-md bg-muted">
                                                <Image
                                                    src={product.images}
                                                    alt={product.productTitle}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            <span>{product.productTitle}</span>
                                        </div>

                                        <span className="ml-auto text-xs text-muted-foreground">
                                            {product.price}
                                        </span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>

                    <CommandSeparator />

                    <div className="text-muted-foreground flex flex-wrap items-center gap-4 p-4">
                        <div className="flex flex-1 items-center gap-2">
                            <kbd className="rounded border px-1 text-sm">esc</kbd>
                            <span>To close</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex size-5 items-center justify-center rounded border">
                                <Undo2Icon className="size-4" />
                            </div>
                            <span>To Select</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex size-5 items-center justify-center rounded border">
                                <ArrowUpIcon className="size-4" />
                            </div>

                            <div className="flex size-5 items-center justify-center rounded border">
                                <ArrowDownIcon className="size-4" />
                            </div>

                            <span>To Navigate</span>
                        </div>
                    </div>
                </Command>
            </CommandDialog>
        </>
    );
}
