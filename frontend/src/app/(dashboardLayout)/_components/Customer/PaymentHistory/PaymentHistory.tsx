'use client';

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaymentHistory() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // ১. প্রথমে ডাটা অ্যারে ডিক্লেয়ার করা হয়েছে
    const paymentHistory = [
        { id: 'INV-001', date: '2026-11-01', amount: '৳2,500', status: 'Completed', method: 'bKash' },
        { id: 'INV-002', date: '2026-10-28', amount: '৳1,200', status: 'Pending', method: 'Nagad' },
        { id: 'INV-003', date: '2026-10-15', amount: '৳4,750', status: 'Completed', method: 'Card' },
        { id: 'INV-004', date: '2026-11-01', amount: '৳2,500', status: 'Completed', method: 'bKash' },
        { id: 'INV-005', date: '2026-10-28', amount: '৳1,200', status: 'Pending', method: 'Nagad' },
        { id: 'INV-006', date: '2026-10-15', amount: '৳4,750', status: 'Completed', method: 'Card' },
        { id: 'INV-007', date: '2026-10-10', amount: '৳3,100', status: 'Completed', method: 'bKash' },
        { id: 'INV-008', date: '2026-09-25', amount: '৳850', status: 'Pending', method: 'Rocket' },
        { id: 'INV-009', date: '2026-09-12', amount: '৳6,200', status: 'Completed', method: 'Card' },
        { id: 'INV-010', date: '2026-09-01', amount: '৳1,900', status: 'Completed', method: 'bKash' },
        { id: 'INV-011', date: '2026-08-20', amount: '৳5,400', status: 'Pending', method: 'Nagad' },
    ];

    // ২. এরপর পেজিনেশনের ক্যালকুলেশন করতে হবে
    const totalPages = Math.ceil(paymentHistory.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = paymentHistory.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="border border-slate-200 dark:border-neutral-800 rounded-lg p-6 bg-white dark:bg-[#171717] shadow-none space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Recent Payment History</h2>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-slate-50 dark:bg-neutral-900 border-b border-slate-200 dark:border-neutral-800">
                        <TableRow>
                            <TableHead className="py-3 px-4 text-xs uppercase text-slate-500 dark:text-neutral-400">Invoice ID</TableHead>
                            <TableHead className="py-3 px-4 text-xs uppercase text-slate-500 dark:text-neutral-400">Date</TableHead>
                            <TableHead className="py-3 px-4 text-xs uppercase text-slate-500 dark:text-neutral-400">Method</TableHead>
                            <TableHead className="py-3 px-4 text-xs uppercase text-slate-500 dark:text-neutral-400">Amount</TableHead>
                            <TableHead className="py-3 px-4 text-xs uppercase text-slate-500 dark:text-neutral-400">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-slate-200 dark:divide-neutral-800">
                        {currentData.map((item, index) => (
                            <TableRow key={index} className="hover:bg-slate-50/50 dark:hover:bg-neutral-800/40 transition-colors">
                                <TableCell className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-200">{item.id}</TableCell>
                                <TableCell className="py-3.5 px-4 text-slate-500 dark:text-neutral-400">{item.date}</TableCell>
                                <TableCell className="py-3.5 px-4 text-slate-700 dark:text-neutral-300">{item.method}</TableCell>
                                <TableCell className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">{item.amount}</TableCell>
                                <TableCell className="py-3.5 px-4">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Completed'
                                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                                            : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Section */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-slate-500 dark:text-neutral-400">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, paymentHistory.length)} of {paymentHistory.length} entries
                    </p>
                    <Pagination className="justify-end w-auto mx-0">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                                    }}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === index + 1}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentPage(index + 1);
                                        }}
                                        className="cursor-pointer"
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                                    }}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}
