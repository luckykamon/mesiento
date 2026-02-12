'use client'
import {useState} from 'react'

function CasesControl({value, onChange}: { value: number; onChange: (v: number) => void }) {
    return (
        <div style={{display: 'flex', alignItems: 'center', gap: 16, fontSize: 24}}>
            {value > 2 && (
                <button onClick={() => onChange(Math.max(1, value - 1))} style={{fontSize: 24, cursor: "pointer"}}>−</button>
            )}
            <div>{value} cases</div>
            {value < 12 && (
                <button onClick={() => onChange(value + 1)} style={{fontSize: 24, cursor: "pointer"}}>+</button>
            )}
        </div>
    )
}

import WheelUploader from './components/WheelUploader'

const printStyles = `

`

export default function Home() {
    const [segments, setSegments] = useState(4)

    return (
        <main style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40, gap: 16}}>
            <style>{printStyles}</style>
            <CasesControl value={segments} onChange={setSegments} />
            <div id="print-area">
                <WheelUploader segments={segments} />
            </div>
            <button
                onClick={() => window.print()}
                style={{ marginTop: 20, fontSize: 48, cursor: 'pointer' }}
                aria-label="Imprimer la roue"
            >
                🖨️
            </button>
        </main>
    );
}
