"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Heart, Share2, ShieldCheck, Truck, MapPin, Tag } from "lucide-react";
import Image from "next/image";
import { ProductDetailsProps } from "@/types/products.type";

export default function ProductDetails({ productDetails }: ProductDetailsProps) {
    if (!productDetails || !productDetails.data) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-xl font-semibold">Product not found</h2>
            </div>
        );
    }

    const product = productDetails.data;

    const sellerInitials = product.seller?.name
        ? product.seller.name.split(" ").map((n) => n[0]).join("").toUpperCase()
        : "RA";

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <div className="lg:col-span-7 flex flex-col gap-4">
                    <div className="relative aspect-square w-full rounded-2xl border border-border/60">
                        <div className="absolute top-4 left-4 z-10 flex gap-2">
                            <Badge className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-3 py-1 text-xs font-semibold">
                                {product.listingType}
                            </Badge>
                            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold">
                                {product.productCondition}
                            </Badge>
                        </div>

                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            <button className="p-2 rounded-full bg-background/80 backdrop-blur-md border border-border/50 hover:bg-background transition">
                                <Share2 className="w-4 h-4 text-foreground" />
                            </button>
                            <button className="p-2 rounded-full bg-background/80 backdrop-blur-md border border-border/50 hover:bg-background transition">
                                <Heart className="w-4 h-4 text-foreground" />
                            </button>
                        </div>

                        <Image
                            src={product.images}
                            alt={product.productTitle}
                            fill
                            priority
                            className="object-contain p-4 rounded-lg"
                        />
                    </div>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-5">

                    <div>
                        <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Verified Marketplace Listing</span>
                        </div>
                        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                            {product.productTitle}
                        </h1>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" /> {product.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <Truck className="w-3.5 h-3.5" /> {product.deliveryDays} Days Delivery
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-card">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                                {sellerInitials}
                            </div>
                            <div>
                                <div className="text-sm font-semibold flex items-center gap-1">
                                    {product.seller?.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    <span>{product.seller?.email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="rounded-full text-xs h-8 border-blue-600 text-blue-600 hover:bg-blue-50">
                                Contact
                            </Button>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>

                    <hr className="border-border/60" />

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-extrabold text-foreground">
                                {product.currency} ${product.price}
                            </span>
                        </div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            Status: {product.status}
                        </div>
                    </div>

                    <hr className="border-border/60" />

                    <div className="flex flex-col gap-3 text-sm">
                        <span className="font-semibold">Description</span>
                        <p className="text-sm text-muted-foreground leading-relaxed bg-muted/40 p-3.5 rounded-xl border border-border/40">
                            {product.description}
                        </p>
                    </div>

                    {product.tags && product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                            {product.tags.map((tag, index) => (
                                <span key={index} className="inline-flex items-center gap-1 text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md">
                                    <Tag className="w-3 h-3" /> {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-col gap-3 mt-4">
                        <Button className="w-full rounded-full py-6 text-base font-semibold shadow-sm bg-blue-600 hover:bg-blue-700 text-white">
                            Buy Now
                        </Button>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="w-full rounded-full py-5 font-semibold border-blue-600 text-blue-600 hover:bg-blue-50">
                                Add to Cart
                            </Button>
                            <Button variant="outline" className="w-full rounded-full py-5 font-semibold border-blue-600 text-blue-600 hover:bg-blue-50">
                                Wishlist
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
