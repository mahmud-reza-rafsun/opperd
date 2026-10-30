import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ShoppingBag, ShoppingCart, Trash2, TriangleAlertIcon } from "lucide-react";
import { useLocation } from "@/hooks/useLocation";

const cartItems = [
    { id: 1, name: "Nike Air Max 270", variant: "Size 42 · Black", price: 8500, qty: 1, emoji: "👟" },
    { id: 2, name: "Wireless Earbuds Pro", variant: "White · BT 5.3", price: 3200, qty: 2, emoji: "🎧" },
    { id: 3, name: "Leather Tote Bag", variant: "Brown · Large", price: 2800, qty: 1, emoji: "👜" },
];

export function CartDropdown() {
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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="relative w-9.5 h-9.5 flex items-center justify-center rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                        <ShoppingBag size={25} />
                        {totalQty > 0 && (
                            <span className="absolute top-0.5 right-0.5 min-w-[14px] h-3.5 px-0.5 rounded-full bg-red-500 border border-white dark:border-zinc-900 flex items-center justify-center text-[8px] font-bold text-white leading-none pointer-events-none">
                                {totalQty > 99 ? "99+" : totalQty}
                            </span>
                        )}
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-80 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xl" align="end" sideOffset={6}>
                    <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
                        <DropdownMenuLabel className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide uppercase p-0">
                            Shopping Cart
                        </DropdownMenuLabel>
                        {cart.length > 0 && (
                            <button onClick={clearCart} className="text-[11px] text-red-500 hover:text-red-600 dark:hover:text-red-400 cursor-pointer transition-colors font-medium">
                                Clear all
                            </button>
                        )}
                    </div>

                    <DropdownMenuGroup className="max-h-64 overflow-y-auto p-1">
                        {cart.length === 0 ? (
                            <div className="py-8 flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-500">
                                <ShoppingCart size={28} className="text-zinc-300 dark:text-zinc-700" />
                                <span className="text-[13px]">Your cart is empty</span>
                            </div>
                        ) : cart.map((item) => (
                            <DropdownMenuItem
                                key={item.id}
                                className="gap-2 px-2 py-2 cursor-default rounded-md items-start focus:bg-zinc-100 dark:focus:bg-zinc-800/80 transition-colors"
                                onSelect={(e) => e.preventDefault()}
                            >
                                <div className="w-10 h-10 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-lg shrink-0">
                                    {item.emoji}
                                </div>
                                <div className="flex flex-1 flex-col min-w-0 gap-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-[13px] font-medium truncate text-zinc-900 dark:text-zinc-100">{item.name}</span>
                                        <span className="text-[12px] font-semibold text-blue-600 dark:text-blue-400 shrink-0">
                                            {fmt(item.price * item.qty)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">{item.variant}</span>
                                        <div className="flex items-center gap-1 ml-auto shrink-0">
                                            <button onClick={() => changeQty(item.id, -1)}
                                                className="w-5 h-5 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-[13px] text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer">
                                                −
                                            </button>
                                            <span className="text-[12px] font-medium w-4 text-center text-zinc-900 dark:text-zinc-100">{item.qty}</span>
                                            <button onClick={() => changeQty(item.id, 1)}
                                                className="w-5 h-5 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-[13px] text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer">
                                                +
                                            </button>
                                        </div>
                                        <button onClick={() => setDeleteId(item.id)}
                                            className="w-5 h-5 flex items-center justify-center text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer ml-1">
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>

                    {cart.length > 0 && (
                        <div className="border-t border-zinc-100 dark:border-zinc-800 mt-1 p-2 space-y-1.5 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-b-md">
                            <div className="flex justify-between text-[12px]">
                                <span className="text-zinc-500 dark:text-zinc-400">Subtotal ({totalQty} items)</span>
                                <span className="font-medium text-zinc-900 dark:text-zinc-100">{fmt(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-[12px]">
                                <span className="text-zinc-500 dark:text-zinc-400">Shipping</span>
                                <span className="text-zinc-500 dark:text-zinc-400">{fmt(shipping)}</span>
                            </div>
                            <Button className="w-full mt-1 h-8 text-[13px] bg-blue-600 hover:bg-blue-700 text-white font-medium cursor-pointer">
                                Checkout · {fmt(subtotal + shipping)}
                            </Button>
                        </div>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Delete Alert Dialog - Positioned higher up with clean default buttons */}
            <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xl fixed left-[50%] top-[25%] -translate-x-1/2 translate-y-0 w-full max-w-lg">
                    <AlertDialogHeader className="place-items-center items-center">
                        <div className="bg-red-100 dark:bg-red-950/50 mx-auto mb-2 flex size-12 items-center justify-center rounded-full">
                            <TriangleAlertIcon className="text-red-600 dark:text-red-400 size-6" />
                        </div>
                        <AlertDialogTitle className="w-full text-center text-zinc-900 dark:text-zinc-100">
                            Are you sure you want to delete?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-zinc-500 dark:text-zinc-400 text-sm">
                            This action cannot be undone. This will permanently remove the item from your cart.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                        <AlertDialogAction className="cursor-pointer" variant="destructive" onClick={confirmRemoveItem}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
