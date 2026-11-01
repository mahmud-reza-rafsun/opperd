import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2, TriangleAlertIcon, X, Plus, Minus, ArrowRight } from "lucide-react";
import { useLocation } from "@/hooks/useLocation";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import Link from "next/link";

const cartItems = [
    { id: 1, name: "Nike Air Max 270", variant: "Size 42 · Black", price: 8500, qty: 1, emoji: "👟" },
    { id: 2, name: "Wireless Earbuds Pro", variant: "White · BT 5.3", price: 3200, qty: 2, emoji: "🎧" },
    { id: 3, name: "Leather Tote Bag", variant: "Brown · Large", price: 2800, qty: 1, emoji: "👜" },
];

export function CartDrawer() {
    const [cart, setCart] = useState(cartItems.map(i => ({ ...i })));
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = 60;

    const changeQty = (id: number, delta: number) => {
        setCart(prev => prev.map(item =>
            item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        ));
    };

    const confirmRemoveItem = () => {
        if (deleteId !== null) {
            setCart(prev => prev.filter(i => i.id !== deleteId));
            setDeleteId(null);
        }
    };

    const { location, loading } = useLocation();

    const clearCart = () => setCart([]);
    const getCurrencySymbol = (country?: string) => {
        if (!country) return "$";
        const c = country.toLowerCase();
        if (c.includes("bangladesh")) {
            return "৳";
        } else if (c.includes("europe") || c.includes("european")) {
            return "€";
        } else if (c.includes("united states") || c.includes("usa") || c.includes("us")) {
            return "$";
        }
        return "$";
    };

    const currencySymbol = getCurrencySymbol(location?.country);

    const fmt = (n: number) => currencySymbol + n.toLocaleString("en-BD");

    return (
        <>
            <Drawer direction="right">
                <DrawerTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Open cart"
                        className="relative h-9 w-9 text-zinc-700 dark:text-zinc-200 cursor-pointer"
                    >
                        <ShoppingBag size={20} />
                        {totalQty > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                                {totalQty}
                            </span>
                        )}
                    </Button>
                </DrawerTrigger>

                <DrawerContent className="h-dvh data-[vaul-drawer-direction=left]:w-[min(90vw,400px)] data-[vaul-drawer-direction=left]:max-w-100 p-0 dark:border-zinc-800 dark:bg-gray-900 flex flex-col justify-between">
                    {/* Header */}
                    <DrawerHeader className="flex h-16 shrink-0 flex-row items-center justify-between border-b border-zinc-200 px-4 py-0 dark:border-zinc-800">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5 text-blue-600" />
                            <DrawerTitle className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                                Your Cart ({totalQty})
                            </DrawerTitle>
                        </div>
                        <DrawerClose asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                aria-label="Close cart"
                                className="h-9 w-9 shrink-0 cursor-pointer"
                            >
                                <X size={20} />
                            </Button>
                        </DrawerClose>
                    </DrawerHeader>

                    {/* Cart Body / Items List */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                        {cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-3 py-12">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                                    <ShoppingBag size={28} />
                                </div>
                                <p className="text-base font-medium text-zinc-800 dark:text-zinc-200">Your cart is empty</p>
                                <p className="text-xs text-zinc-500 max-w-55">Explore our products and add items to your cart to get started.</p>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50"
                                >
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-zinc-900 text-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                                        {item.emoji}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{item.name}</h4>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{item.variant}</p>
                                        <div className="mt-1.5 flex items-center justify-between">
                                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                                                {fmt(item.price)}
                                            </span>
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md px-1 py-0.5">
                                                <button
                                                    onClick={() => changeQty(item.id, -1)}
                                                    className="h-5 w-5 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors cursor-pointer"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="text-xs font-semibold px-1 text-zinc-800 dark:text-zinc-200">{item.qty}</span>
                                                <button
                                                    onClick={() => changeQty(item.id, 1)}
                                                    className="h-5 w-5 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors cursor-pointer"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setDeleteId(item.id)}
                                        className="text-zinc-400 hover:text-red-600 dark:hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer / Summary & Checkout */}
                    {cart.length > 0 && (
                        <div className="shrink-0 border-t border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/80 space-y-3">
                            <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{fmt(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{fmt(shipping)}</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                    <span>Total</span>
                                    <span className="text-blue-600 dark:text-blue-400">{fmt(subtotal + shipping)}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-1">
                                <Button
                                    variant="outline"
                                    onClick={clearCart}
                                    className="w-full text-xs h-10 cursor-pointer border-zinc-200 dark:border-zinc-700"
                                >
                                    Clear Cart
                                </Button>
                                <Link href="/checkout" className="w-full">
                                    <Button className="w-full text-xs h-10 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer flex items-center gap-1.5 font-semibold">
                                        Checkout <ArrowRight size={14} />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </DrawerContent>
            </Drawer>

            {/* Delete Alert Dialog */}
            <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xl fixed left-[50%] top-[25%] -translate-x-1/2 translate-y-0 w-full max-w-lg">
                    <AlertDialogHeader className="place-items-center items-center">
                        <div className="bg-red-100 dark:bg-red-950/50 mx-auto mb-2 flex size-12 items-center justify-center rounded-full">
                            <TriangleAlertIcon className="text-red-600 dark:text-red-400 size-6" />
                        </div>
                        <AlertDialogTitle className="w-full text-center text-zinc-900 dark:text-zinc-100 text-base font-bold">
                            Are you sure you want to delete?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm">
                            This action cannot be undone. This will permanently remove the item from your cart.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer text-xs">Cancel</AlertDialogCancel>
                        <AlertDialogAction className="cursor-pointer text-xs" variant="destructive" onClick={confirmRemoveItem}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
