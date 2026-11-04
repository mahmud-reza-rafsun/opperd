import React from 'react';
import { ShoppingBag, Clock, CheckCircle2, Package } from 'lucide-react';
import BarChart from '@/components/charts/bar-chart';
import Grid from '@/components/charts/grid';
import { ChartTooltip } from '@/components/charts/tooltip/chart-tooltip';
import AreaChart, { Area } from '@/components/charts/area-chart';
import XAxis from '@/components/charts/x-axis';
import Bar from '@/components/charts/bar';
import BarXAxis from '@/components/charts/bar-x-axis';
import PaymentHistory from '../PaymentHistory/PaymentHistory';

export default function CustomerDashboard() {
    const barData = [
        { month: "Jan", revenue: 2500, profit: 1200 },
        { month: "Feb", revenue: 4200, profit: 1800 },
        { month: "Mar", revenue: 3100, profit: 1500 },
        { month: "Apr", revenue: 5400, profit: 2400 },
    ];

    const areaData = [
        { date: new Date("2025-01-01"), revenue: 2500, costs: 2000 },
        { date: new Date("2025-01-02"), revenue: 3200, costs: 2500 },
        { date: new Date("2025-01-03"), revenue: 4100, costs: 3100 },
        { date: new Date("2025-01-04"), revenue: 5400, costs: 4200 },
    ];

    return (
        <div className="py-7 px-8 space-y-6">

            {/* Metric Cards Section (Customer Focused) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

                {/* 1. Total Products Purchased */}
                <div className="border border-slate-200 dark:border-neutral-800 rounded-lg p-5 bg-white dark:bg-[#171717] flex flex-col justify-between shadow-none">
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <Package className="w-5 h-5" />
                            </div>
                            <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                                +12%
                            </span>
                        </div>
                        <h3 className="font-semibold text-slate-600 dark:text-neutral-400 text-sm mt-3">Total Products</h3>
                        <p className="text-xs text-slate-400 dark:text-neutral-500">Purchased items</p>
                        <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">38 Items</h3>
                    </div>
                </div>

                {/* 2. Last Month Purchase */}
                <div className="border border-slate-200 dark:border-neutral-800 rounded-lg p-5 bg-white dark:bg-[#171717] flex flex-col justify-between shadow-none">
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <ShoppingBag className="w-5 h-5" />
                            </div>
                            <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                                Oct
                            </span>
                        </div>
                        <h3 className="font-semibold text-slate-600 dark:text-neutral-400 text-sm mt-3">Last Month</h3>
                        <p className="text-xs text-slate-400 dark:text-neutral-500">Total spending</p>
                        <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">৳8,450</h3>
                    </div>
                </div>

                {/* 3. Total Expense */}
                <div className="border border-slate-200 dark:border-neutral-800 rounded-lg p-5 bg-white dark:bg-[#171717] flex flex-col justify-between shadow-none">
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="w-9 h-9 rounded-lg bg-orange-50 dark:bg-orange-950/50 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">
                                ৳
                            </div>
                            <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
                                -5.4%
                            </span>
                        </div>
                        <h3 className="font-semibold text-slate-600 dark:text-neutral-400 text-sm mt-3">Total Expense</h3>
                        <p className="text-xs text-slate-400 dark:text-neutral-500">Lifetime spent</p>
                        <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">৳32,120</h3>
                    </div>
                </div>

                {/* 4. Pending Orders */}
                <div className="border border-slate-200 dark:border-neutral-800 rounded-lg p-5 bg-white dark:bg-[#171717] flex flex-col justify-between shadow-none">
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                <Clock className="w-5 h-5" />
                            </div>
                            <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                                Active
                            </span>
                        </div>
                        <h3 className="font-semibold text-slate-600 dark:text-neutral-400 text-sm mt-3">Pending Orders</h3>
                        <p className="text-xs text-slate-400 dark:text-neutral-500">Processing now</p>
                        <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">3 Orders</h3>
                    </div>
                </div>

                {/* 5. Completed Orders */}
                <div className="border border-slate-200 dark:border-neutral-800 rounded-lg p-5 bg-white dark:bg-[#171717] flex flex-col justify-between shadow-none">
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                                Success
                            </span>
                        </div>
                        <h3 className="font-semibold text-slate-600 dark:text-neutral-400 text-sm mt-3">Completed</h3>
                        <p className="text-xs text-slate-400 dark:text-neutral-500">Delivered items</p>
                        <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">35 Orders</h3>
                    </div>
                </div>

            </div>

            {/* Charts Row: Area Chart & Bar Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Area Chart */}
                <div className="border border-slate-200 dark:border-neutral-800 rounded-lg p-6 bg-white dark:bg-[#171717] shadow-none">
                    <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">Spending Overview (Timeline)</h2>
                    <div className="h-72 w-full flex items-center justify-center">
                        <AreaChart data={areaData} className="w-full h-full">
                            <Grid horizontal />
                            <Area dataKey="revenue" fill="#0ea5e9" />
                            <Area dataKey="costs" fill="#64748b" />
                            <XAxis />
                            <ChartTooltip />
                        </AreaChart>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="border border-slate-200 dark:border-neutral-800 rounded-lg p-6 bg-white dark:bg-[#171717] shadow-none">
                    <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">Monthly Expenses & Savings</h2>
                    <div className="h-72 w-full flex items-center justify-center">
                        <BarChart data={barData} xDataKey="month" className="w-full h-full">
                            <Grid horizontal />
                            <Bar dataKey="revenue" fill="#3b82f6" lineCap="round" />
                            <Bar dataKey="profit" fill="#10b981" lineCap="round" />
                            <BarXAxis />
                            <ChartTooltip />
                        </BarChart>
                    </div>
                </div>
            </div>

            {/* Payment History Section */}
            <PaymentHistory />
        </div>
    );
}
