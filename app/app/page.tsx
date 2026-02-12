'use client'

import {JSX, useState} from 'react'
import PaginationDots from './components/PaginationDots'
import Wheel from "@/app/pages/wheel";


export enum PageDot {
    DISCLAIMER = 'disclaimer',
    TUTORIAL = 'tutorial',
    WHEEL = 'wheel'
}

export default function Home() {



    const [page, setPage] = useState<PageDot>(PageDot.DISCLAIMER)



    return (
        <main style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40, gap: 16}}>
            {(() => {
                const pages: Record<PageDot, JSX.Element> = {
                    [PageDot.DISCLAIMER]: <div>Disclaimer</div>,
                    [PageDot.TUTORIAL]: <div>Page de tutoriel</div>,
                    [PageDot.WHEEL]: <Wheel />,
                }

                return pages[page]
            })()}
            <PaginationDots current={page} onChange={(newPageDot) => setPage(newPageDot)} />
        </main>
    );
}
