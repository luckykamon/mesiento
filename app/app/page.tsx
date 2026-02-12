'use client'

import {JSX, useState} from 'react'
import PaginationDots from './components/PaginationDots'
import Wheel from "@/app/pages/wheel";
import NavBar from "@/app/components/NavBar";
import Tutorial from "@/app/pages/tutorial";
import Presentation from "@/app/pages/presentation";

export enum PageDot {
    PRESENTATION = 'presentation',
    TUTORIAL = 'tutorial',
    WHEEL = 'wheel'
}

export default function Home() {
    const [page, setPage] = useState<PageDot>(PageDot.TUTORIAL)

    return (
        <main style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40, gap: 16}}>
            <NavBar />
            {(() => {
                const pages: Record<PageDot, JSX.Element> = {
                    [PageDot.PRESENTATION]: <Presentation />,
                    [PageDot.TUTORIAL]: <Tutorial />,
                    [PageDot.WHEEL]: <Wheel />,
                }

                return pages[page]
            })()}
            <PaginationDots current={page} onChange={(newPageDot) => setPage(newPageDot)} />
        </main>
    );
}
