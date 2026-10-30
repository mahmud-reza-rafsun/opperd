"use client"

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
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
            <DialogContent className='gap-0 p-0 sm:max-h-[min(600px,80vh)] sm:max-w-md'>
                <DialogHeader className='contents space-y-0 text-left'>
                    <DialogTitle className='border-b px-6 py-4'>{data.title}</DialogTitle>

                    <div className='text-muted-foreground px-6 py-4 text-sm max-h-[60vh] overflow-y-auto'>
                        {/* Description / Intro */}
                        <p className='mb-4 text-xs leading-relaxed'>
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
                            <p className='mt-4 text-xs text-neutral-500'>
                                Last Updated: {data.lastUpdated}
                            </p>
                        )}
                    </div>

                    <DialogFooter className='m-0 px-6 py-3 border-t sm:justify-end'>
                        <DialogClose asChild>
                            <Button variant='outline' onClick={onClose}>Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type='button' onClick={onClose}>I Agree</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
