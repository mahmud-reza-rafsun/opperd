
"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export default function Theme() {
    const { theme, setTheme, resolvedTheme } = useTheme();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="h-9 w-9 p-2 rounded-lg cursor-pointer text-zinc-500 transition-colors dark:text-zinc-200 dark:hover:text-zinc-100"
            aria-label="Toggle theme"
        >
            {resolvedTheme === "dark" ? (
                <Sun size={16} />
            ) : (
                <Moon size={16} />
            )}
        </Button>
    );
}
