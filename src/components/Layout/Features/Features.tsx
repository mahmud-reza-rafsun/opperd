"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    FolderCheck,
    Clock,
    Users,
    LayoutDashboard,
    Receipt,
    FileSpreadsheet,
    Zap,
    Layers,
    CheckCircle2,
} from "lucide-react";

// Feature Tab Data Structure
const Q = "?auto=format&fit=crop&w=1600&q=80";
const U = (id: string) => `https://images.unsplash.com/${id}${Q}`;

const TABS = [
    {
        id: "invoicing",
        label: "Invoicing",
        icon: FileText,
        badge: "Invoicing",
        title: "Seamless and automated invoicing",
        description:
            "Create professional invoices, automate recurring billing, and track payments in real time.",
        highlights: [
            "Customizable invoice templates",
            "Automatic payment reminders",
            "Multi-currency support",
            "Instant payment link generation",
            "Tax calculation engine",
            "Client billing portal",
        ],
        image: U("photo-1554224155-6726b3ff858f"),
    },
    {
        id: "projects",
        label: "Projects & Tasks",
        icon: FolderCheck,
        badge: "Projects & Tasks",
        title: "Track deliverables and team productivity",
        description:
            "Manage project timelines, assign tasks, and monitor progress with intuitive Kanban boards.",
        highlights: [
            "Kanban and List views",
            "Task dependency mapping",
            "Milestone tracking",
            "Subtask breakdowns",
            "Time allocation estimates",
            "Resource planning",
        ],
        image: U("photo-1531403009284-440f080d1e12"),
    },
    {
        id: "timetracker",
        label: "Time Tracker",
        icon: Clock,
        badge: "Time Tracker",
        title: "Log hours effortlessly across all projects",
        description:
            "Monitor billable hours accurately with built-in timers and detailed time logs.",
        highlights: [
            "One-click start/stop timer",
            "Manual time entries",
            "Billable vs non-billable tracking",
            "Timesheet approvals",
            "Weekly activity breakdown",
            "Integration with invoices",
        ],
        image: U("photo-1506784983877-45594efa4cbe"),
    },
    {
        id: "customers",
        label: "Customers",
        icon: Users,
        badge: "Customers",
        title: "Unified customer relationship management",
        description:
            "Keep track of client communications, contract histories, and payment statuses in one place.",
        highlights: [
            "Comprehensive client profiles",
            "Communication history log",
            "Associated invoices and projects",
            "Custom metadata fields",
            "Client portal access",
            "Segmented email lists",
        ],
        image: U("photo-1600880292203-757bb62b4baf"),
    },
    {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        badge: "Dashboard",
        title: "Your business at a glance",
        description:
            "Real-time overview of revenue, expenses, projects, and tasks. Interactive charts, recent activity feed, onboarding checklist, and notifications keep everything in focus.",
        highlights: [
            "Revenue & expense charts",
            "Recent activity timeline",
            "KPI cards with trends",
            "Quick task management",
            "Onboarding checklist",
            "Notification center",
        ],
        image: U("photo-1551288049-bebda4e38f71"),
    },
    {
        id: "expenses",
        label: "Expenses",
        icon: Receipt,
        badge: "Expenses",
        title: "Monitor cash flow and business expenses",
        description:
            "Capture receipts, categorize business expenses, and stay tax-ready year round.",
        highlights: [
            "Receipt scanning & OCR",
            "Category breakdown",
            "Recurring expenses tracking",
            "Tax-deductible marking",
            "Vendor management",
            "Reimbursement workflows",
        ],
        image: U("photo-1554224154-26032ffc0d07"),
    },
    {
        id: "proposals",
        label: "Proposals",
        icon: FileSpreadsheet,
        badge: "Proposals",
        title: "Win client contracts with modern proposals",
        description:
            "Build interactive proposals, track when clients view them, and accept digital signatures.",
        highlights: [
            "Interactive pricing tables",
            "E-signature collection",
            "Proposal analytics & view alerts",
            "Reusable template blocks",
            "Contract conversion to project",
            "Client approval workflow",
        ],
        image: U("photo-1450101499163-c8848c66ca85"),
    },
    {
        id: "automations",
        label: "Automations",
        icon: Zap,
        badge: "Automations",
        title: "Put repetitive workflows on autopilot",
        description:
            "Save hours every week by setting up trigger-based actions and workflow automations.",
        highlights: [
            "Custom trigger-action rules",
            "Auto-assign tasks to team",
            "Scheduled email follow-ups",
            "Webhook integrations",
            "Status change notifications",
            "Automated payment receipts",
        ],
        image: U("photo-1518432031352-d6fc5c10da5a"),
    },
    {
        id: "integrations",
        label: "Integrations",
        icon: Layers,
        badge: "Integrations",
        title: "Connect with your favorite tools seamlessly",
        description:
            "Sync data with Stripe, Slack, GitHub, Google Workspace, and 100+ popular SaaS apps.",
        highlights: [
            "Payment gateway connections",
            "Cloud storage syncing",
            "Slack & Email alerts",
            "Developer API access",
            "Zapier & Make integration",
            "Single Sign-On (SSO)",
        ],
        image: U("photo-1558494949-ef010cbdcc31"),
    },
];
export default function FeaturesSection() {
    const [activeTab, setActiveTab] = useState("dashboard");

    const currentTab = TABS.find((tab) => tab.id === activeTab) || TABS[4];

    return (
        <section className="bg-neutral-50/50 py-20 dark:bg-neutral-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Badge & Title */}
                <div className="flex flex-col items-center text-center">
                    <span className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs font-medium text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 font-semibold dark:text-neutral-200">
                        Features
                    </span>

                    <h2 className="mt-6 text-xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-2xl lg:text-3xl">
                        Powerful features to scale your digital workflow
                    </h2>

                    <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400 sm:text-sm">
                        Everything you need to build, manage, and scale your web projects without the complexity.
                    </p>
                </div>

                {/* Horizontal Scrollable Navigation Tabs (Mobile slide, desktop centered flex) */}
                <div className="mt-10 flex w-full justify-start overflow-x-auto pb-4 pt-1 no-scrollbar sm:justify-center">
                    <div className="flex flex-nowrap items-center gap-2 rounded-full p-1.5 backdrop-blur-md">
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${isActive
                                        ? "bg-neutral-900 text-white shadow-md dark:bg-white dark:text-neutral-950"
                                        : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                                        }`}
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Feature Content Card */}
                <div className="mt-8 overflow-hidden rounded-3xl bg-white p-5 md:p-7 pb-4 md:pb-5 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/50 dark:shadow-none">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTab.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                        >
                            {/* Feature Info Header */}
                            <div>
                                <span className="inline-block rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                                    {currentTab.badge}
                                </span>

                                <h3 className="mt-4 text-2xl font-bold text-neutral-950 dark:text-white sm:text-3xl">
                                    {currentTab.title}
                                </h3>

                                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
                                    {currentTab.description}
                                </p>

                                {/* Highlights Grid */}
                                <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {currentTab.highlights.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2.5">
                                            <CheckCircle2 className="h-4 w-4 shrink-0 text-neutral-700 dark:text-neutral-300" />
                                            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dashboard Image / Showcase Viewport (Border and extra padding wrapper removed) */}
                            <div className="mt-10 overflow-hidden rounded-2xl">
                                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                                    <img
                                        src={currentTab.image}
                                        alt={currentTab.title}
                                        className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.01]"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
