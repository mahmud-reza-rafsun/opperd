"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export default function AppToaster() {
    const { resolvedTheme } = useTheme();

    return (
        <Toaster
            position="top-right"
            theme={resolvedTheme as "light" | "dark"}
            richColors
        />
    );
}
