"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { PolicyData } from '@/components/data/legalPolicies'

interface LegalModalProps {
    isOpen: boolean
    onClose: () => void
    data: PolicyData | null
}

export default function LegalModal({ isOpen, onClose, data }: LegalModalProps) {
    if (!data) return null

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className='flex flex-col gap-0 p-0 sm:max-h-[85vh] sm:max-w-xl overflow-hidden'>
                {/* Header */}
                <DialogHeader className='px-6 py-4 border-b shrink-0 text-left space-y-0'>
                    <DialogTitle>{data.title}</DialogTitle>
                </DialogHeader>

                {/* Scrollable Body with Thin Scrollbar */}
                <div
                    className='px-6 py-4 text-sm overflow-y-auto flex-1 space-y-4 text-muted-foreground [scrollbar-width:thin] [scrollbar-color:rgba(156,163,175,0.4)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-neutral-400 dark:hover:[&::-webkit-scrollbar-thumb]:bg-neutral-600'
                >
                    {/* Description / Intro */}
                    <p className='text-xs leading-relaxed'>
                        {data.description}
                    </p>

                    {/* Sections from PolicyData */}
                    <ol className='flex list-decimal flex-col gap-3 pl-4'>
                        {data.sections.map((section) => (
                            <li key={section.id} className='space-y-1'>
                                <strong className='text-primary'>{section.title}:</strong>
                                <ul className='mt-1 list-disc pl-4 space-y-1'>
                                    {section.items.map((item, index) => (
                                        <li key={index} className='text-xs leading-relaxed'>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>

                    {data.lastUpdated && (
                        <p className='text-xs text-neutral-500 pt-2'>
                            Last Updated: {data.lastUpdated}
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
