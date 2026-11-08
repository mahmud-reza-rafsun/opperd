"use client";


import { useAuthModal } from "@/hooks/useAuthModal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export default function AuthModal() {
    const { isOpen, view, closeModal, openModal } = useAuthModal();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const router = useRouter();

    const handleOpenChange = (open: boolean) => {

        setIsAlertOpen(true);

    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-500/90 text-white h-10 text-sm px-4 cursor-pointer flex items-center gap-1.5 font-medium">
                    <Plus size={25} />
                    <span>Joit</span>
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

                <LoginForm />
            </DialogContent>
        </Dialog>

    );
}
