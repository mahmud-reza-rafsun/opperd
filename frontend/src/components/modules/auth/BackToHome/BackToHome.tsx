import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function BackToHome() {
    return (
        <div>
            <Link href="/">
                <Button variant="default" className='bg-blue-500 text-white hover:bg-blue-500/90 cursor-pointer'>
                    Back to Home Page
                </Button>
            </Link>
        </div>
    )
}
