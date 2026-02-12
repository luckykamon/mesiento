export default function NavBar() {
    return (
        <div style={{ position: 'fixed', top: 10, left: 10, width: '100%', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                {/* Triangle plein */}
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <polygon points="12,4 20,20 4,20" fill="#0b2a6b" />
                </svg>

                {/* Triangle contour */}
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <polygon points="12,4 20,20 4,20" fill="none" stroke="black" strokeWidth="2" />
                </svg>
            </div>

            <span style={{ fontSize: '20px' }}>Mesiento</span>
        </div>
    )
}
