"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Image as ImageIcon, Trash2, X, MapPin, TriangleAlertIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/hooks/useCategories";
import { useUser } from "@/hooks/useUser";

export default function SellProduct() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const { user } = useUser();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [currency, setCurrency] = useState("EUR");
    const [categoryId, setCategoryId] = useState("");
    const [condition, setCondition] = useState("GOOD");
    const [listingType, setListingType] = useState("SELL");
    const [deliveryDays, setDeliveryDays] = useState("3");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const { categories, loading, error } = useCategories();

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleOpenChange = (open: boolean) => {
        if (open && !user) {
            setIsAlertOpen(true);
            setIsOpen(false);
        } else {
            setIsOpen(open);
        }
    };

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const res = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );
                        const data = await res.json();
                        const address = data.address.city || data.address.town || data.address.state || "My Location";
                        setLocation(address);
                    } catch {
                        setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
                    }
                },
                () => {
                    alert("Unable to fetch location. Please type manually.");
                }
            );
        }
    };

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((t) => t !== tagToRemove));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);
            const newUrls = fileArray.map((file) => URL.createObjectURL(file));
            setImagePreviews((prev) => [...prev, ...newUrls].slice(0, 3));
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setImagePreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        const words = text.trim() ? text.trim().split(/\s+/) : [];
        if (words.length <= 200) {
            setDescription(text);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            title,
            price,
            currency,
            categoryId,
            condition,
            listingType,
            deliveryDays: Number(deliveryDays),
            location,
            description,
            tags,
            imagePreviews,
        });
        setIsOpen(false);
    };

    const wordCount = description.trim() ? description.trim().split(/\s+/).length : 0;

    return (
        <>
            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    <Button className="bg-blue-500 hover:bg-blue-500/90 text-white h-9 md:h-10 text-sm
                     cursor-pointer flex items-center gap-1.5 font-medium">
                        <Plus size={20} className="shrink-0" />
                        <span className="hidden md:inline">Sell Product</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-gradient-to-b from-blue-50/90 via-white to-white dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 max-w-2xl sm:max-w-2xl w-[96vw] p-7 rounded-2xl border dark:border-zinc-800 shadow-2xl max-h-[92vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&>button]:cursor-pointer [&>button]:bg-zinc-100 dark:[&>button]:bg-zinc-800 [&>button]:p-2 [&>button]:rounded-full [&>button]:hover:bg-zinc-200">
                    <DialogHeader className="text-center sm:text-center">
                        <DialogTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            Upload Your Product
                        </DialogTitle>
                        <DialogDescription className="text-base text-zinc-500 dark:text-zinc-400">
                            Fill in the details below to publish your product seamlessly.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-2">
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                Product Title
                            </Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. iPhone 13 Pro Max / Minimal Sofa"
                                className="h-10 px-4"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    Category
                                </Label>
                                <Select value={categoryId} onValueChange={setCategoryId} required>
                                    <SelectTrigger className="h-12 py-4.75 px-4 w-full">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent position="popper" className="mt-1">
                                        {categories?.map((category) => (
                                            <SelectItem key={category.id} value={category.id} className="py-1.5">
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    Listing Type
                                </Label>
                                <Select value={listingType} onValueChange={setListingType}>
                                    <SelectTrigger className="h-10 py-4.75 px-4 w-full">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent position="popper" className="mt-1">
                                        <SelectItem value="SELL" className="py-1.5">Sell</SelectItem>
                                        <SelectItem value="RENT" className="py-1.5">Rent</SelectItem>
                                        <SelectItem value="SERVICE" className="py-1.5">Service</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="price" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    Price
                                </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="e.g. 15000"
                                    className="h-10 text-base px-4"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    Currency
                                </Label>
                                <Select value={currency} onValueChange={setCurrency}>
                                    <SelectTrigger className="h-12 py-4.75 px-4 w-full">
                                        <SelectValue placeholder="Currency" />
                                    </SelectTrigger>
                                    <SelectContent position="popper" className="mt-1">
                                        <SelectItem value="EUR" className="py-1.5">EUR (€)</SelectItem>
                                        <SelectItem value="USD" className="py-1.5">USD ($)</SelectItem>
                                        <SelectItem value="BDT" className="py-1.5">BDT (৳)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    Item Condition
                                </Label>
                                <Select value={condition} onValueChange={setCondition}>
                                    <SelectTrigger className="h-12 py-4.75 px-4 w-full">
                                        <SelectValue placeholder="Select condition" />
                                    </SelectTrigger>
                                    <SelectContent position="popper" className=" mt-1">
                                        <SelectItem value="NEW" className="py-1.5">Brand New</SelectItem>
                                        <SelectItem value="LIKE_NEW" className="py-1.5">Like New</SelectItem>
                                        <SelectItem value="GOOD" className="py-1.5">Good Condition</SelectItem>
                                        <SelectItem value="FAIR" className="py-1.5">Fair / Used</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="deliveryDays" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    Delivery Days
                                </Label>
                                <Input
                                    id="deliveryDays"
                                    type="number"
                                    value={deliveryDays}
                                    onChange={(e) => setDeliveryDays(e.target.value)}
                                    placeholder="e.g. 3"
                                    className="h-10 px-4"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="location" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                Location
                            </Label>
                            <div className="relative flex items-center">
                                <Input
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="e.g. Berlin, Germany"
                                    className="h-10 px-4 pr-11"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleGetLocation}
                                    title="Use my current location"
                                    className="absolute right-3 text-zinc-400 hover:text-blue-600 transition-colors cursor-pointer p-1.5"
                                >
                                    <MapPin size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="description" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    Description
                                </Label>
                                <span className={`text-xs ${wordCount > 200 ? 'text-red-500 font-bold' : 'text-zinc-400'}`}>
                                    {wordCount}/200 words
                                </span>
                            </div>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Write details about your item or service..."
                                className="min-h-[110px] text-base p-4"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex justify-between items-center">
                                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    Upload Images (Max 3)
                                </Label>
                                <span className="text-xs text-zinc-400">{imagePreviews.length}/3 selected</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                {imagePreviews.length < 3 && (
                                    <label
                                        htmlFor="image-upload"
                                        className="flex flex-1 min-w-[160px] items-center justify-center gap-2.5 h-12 px-5 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer hover:border-blue-500 transition-colors font-medium"
                                    >
                                        <ImageIcon size={18} />
                                        <span>Choose image file</span>
                                        <input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                )}

                                <div className="flex items-center gap-2.5">
                                    {imagePreviews.map((src, index) => (
                                        <div key={index} className="relative size-12 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 shrink-0 shadow-sm">
                                            <img src={src} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="tags" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                Tags (Press Enter to add)
                            </Label>
                            <Input
                                id="tags"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleAddTag}
                                placeholder="e.g. electronics, used, mobile (press enter)"
                                className="h-10 text-base px-4"
                            />
                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                                        >
                                            #{tag}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="hover:text-red-600 cursor-pointer"
                                            >
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <DialogFooter className="pt-4 sm:flex-row gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                className="w-full sm:w-1/2 h-11 gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950/30 dark:text-red-400 cursor-pointer font-semibold"
                            >
                                <Trash2 size={18} />
                                <span>Cancel</span>
                            </Button>
                            <Button
                                type="submit"
                                className="w-full sm:w-1/2 h-11 bg-blue-500 text-white hover:bg-blue-500/90 font-semibold cursor-pointer"
                            >
                                Publish Product
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader className="place-items-center! items-center">
                        <div className='bg-destructive/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full'>
                            <TriangleAlertIcon className="text-destructive size-6" />
                        </div>
                        <AlertDialogTitle>Login Required</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            You must be logged in to post a product. Please login to continue.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button variant="default" className="bg-red-500 hover:bg-red-500/90 text-white cursor-pointer" onClick={() => setIsAlertOpen(false)}>Cancel</Button>
                        <Button
                            variant="default"
                            className="bg-blue-500 px-5 py-2 hover:bg-blue-500/90 text-white cursor-pointer"
                            onClick={() => router.push("/login")}
                        >
                            Login
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
