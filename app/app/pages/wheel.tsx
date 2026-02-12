import WheelUploader from "@/app/components/WheelUploader";
import { useEffect, useState } from "react";

function CasesControl({value, onChange}: { value: number; onChange: (v: number) => void }) {
    return (
        <div style={{display: 'flex', alignItems: 'center', gap: 16, }}>
            {value > 2 && (
                <button onClick={() => onChange(Math.max(1, value - 1))} style={{cursor: "pointer"}}>−</button>
            )}
            <div>{value} cases</div>
            {value < 12 && (
                <button onClick={() => onChange(value + 1)} style={{cursor: "pointer"}}>+</button>
            )}
        </div>
    )
}

export default function Wheel() {
    const [segments, setSegments] = useState<number>(() => {
        if (typeof window === "undefined") return 4
        const stored = localStorage.getItem("wheel-segments")
        return stored ? Number(stored) : 4
    })

    useEffect(() => {
        localStorage.setItem("wheel-segments", String(segments))
    }, [segments])

    return <>
        <CasesControl value={segments} onChange={setSegments} />
        <div id="print-area">
            <WheelUploader segments={segments} />
        </div>
        <button
            onClick={() => window.print()}
            style={{ marginTop: 20, cursor: 'pointer' }}
            aria-label="Imprimer la roue"
        >
            🖨️
        </button>
    </>
}
