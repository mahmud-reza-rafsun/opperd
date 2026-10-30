import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const notifications = [
    { id: 1, avatar: "RK", name: "Rafsan Khan", message: "Your order has been confirmed.", time: "2m ago", read: false },
    { id: 2, avatar: "SY", name: "System", message: "New login detected from Dhaka, BD.", time: "15m ago", read: false },
    { id: 3, avatar: "TM", name: "Tania Mim", message: "Left a comment on your post.", time: "1h ago", read: false },
    { id: 4, avatar: "ZV", name: "Zaire Vetrovs", message: "Sent you a friend request.", time: "3h ago", read: true },
    { id: 5, avatar: "KP", name: "Kianna Philips", message: "Your invoice is ready to download.", time: "Yesterday", read: true },
];

export default function NotificationDropdown() {
    const [notifs, setNotifs] = useState(notifications);
    const unreadCount = notifs.filter((n) => !n.read).length;

    const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
    const markRead = (id: number) => setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="relative w-9.5 h-9.5 flex items-center justify-center rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                    <Bell size={20} />
                    {unreadCount > 0 && (
                        <span className="absolute top-0.5 right-0.5 min-w-[14px] h-3.5 px-0.5 rounded-full bg-red-500 border border-white dark:border-zinc-900 flex items-center justify-center text-[9px] font-bold text-white leading-none pointer-events-none">
                            {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xl" align="end" sideOffset={6}>
                <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <DropdownMenuLabel className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide uppercase p-0">
                        Notifications
                    </DropdownMenuLabel>
                    {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer transition-colors font-medium">
                            Mark all as read
                        </button>
                    )}
                </div>
                <DropdownMenuGroup className="max-h-64 overflow-y-auto p-1">
                    {notifs.map((notif) => (
                        <DropdownMenuItem
                            key={notif.id}
                            className="gap-2.5 px-2 py-2 cursor-pointer rounded-md items-start focus:bg-zinc-100 dark:focus:bg-zinc-800/80 transition-colors"
                            onClick={() => markRead(notif.id)}
                        >
                            <div className="relative shrink-0 mt-0.5">
                                <Avatar className="h-8 w-8 rounded-md">
                                    <AvatarFallback className="text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-md">
                                        {notif.avatar}
                                    </AvatarFallback>
                                </Avatar>
                                {!notif.read && (
                                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500 border border-white dark:border-zinc-900" />
                                )}
                            </div>
                            <div className="flex flex-1 flex-col min-w-0 gap-0.5">
                                <div className="flex items-center justify-between gap-2">
                                    <span className={`text-sm truncate ${!notif.read ? "font-semibold text-zinc-900 dark:text-zinc-100" : "font-medium text-zinc-600 dark:text-zinc-400"}`}>
                                        {notif.name}
                                    </span>
                                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500 shrink-0">{notif.time}</span>
                                </div>
                                <span className={`text-[12px] truncate ${!notif.read ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-500 dark:text-zinc-500"}`}>{notif.message}</span>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <div className="border-t border-zinc-100 dark:border-zinc-800 mt-1 p-1.5 text-center bg-zinc-50/50 dark:bg-zinc-900/50 rounded-b-md">
                    <button className="w-full text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline py-1 cursor-pointer transition-colors">
                        View all notifications →
                    </button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
