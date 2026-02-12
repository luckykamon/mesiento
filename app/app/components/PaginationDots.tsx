import { PageDot } from '../page'

export default function PaginationDots({ current, onChange }: { current: PageDot; onChange: (newPageDot: PageDot) => void }) {
    return (
        <div style={{ position: 'fixed', bottom: 20, left: 0, width: '100%', display: 'flex', justifyContent: 'center', gap: 12 }}>
            {Object.values(PageDot).map((value, i) => {
                const active = value === current
                return (
                    <div
                        key={i}
                        onClick={() => onChange(value)}
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: '50%',
                            border: '2px solid #0b2a6b',
                            background: active ? '#0b2a6b' : 'transparent',
                            cursor: 'pointer'
                        }}
                    />
                )
            })}
        </div>
    )
}
