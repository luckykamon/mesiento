'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
    segments: number
    size?: number
}

export default function WheelUploader({ segments, size = 300 }: Props) {
    const padding = 4
    const radius = size / 2 - padding
    const innerRadius = radius * 0.45

    const [images, setImages] = useState<(string | null)[]>(() => {
        if (typeof window === 'undefined') return Array(segments).fill(null)
        const stored = localStorage.getItem('wheel-images')
        return stored ? JSON.parse(stored) : Array(segments).fill(null)
    })

    const fileInputs = useRef<(HTMLInputElement | null)[]>([])

    const angleStep = (2 * Math.PI) / segments

    const polar = (r: number, angle: number) => ({
        x: radius + r * Math.cos(angle),
        y: radius + r * Math.sin(angle),
    })

    const handleUpload = (index: number, file: File) => {
        const reader = new FileReader()
        reader.onload = () => {
            const next = [...images]
            next[index] = reader.result as string
            setImages(next)
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        localStorage.setItem('wheel-images', JSON.stringify(images))
    }, [images])

    useEffect(() => {
        setImages((prev) => {
            const next = Array(segments).fill(null)
            for (let i = 0; i < Math.min(prev.length, segments); i++) {
                next[i] = prev[i]
            }
            return next
        })
    }, [segments])

    return (
        <div className="flex flex-col items-center gap-4">
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              style={{ overflow: 'visible' }}
            >
                {Array.from({ length: segments }).map((_, i) => {
                    const start = i * angleStep - Math.PI / 2
                    const end = (i + 1) * angleStep - Math.PI / 2

                    const p1 = polar(radius, start)
                    const p2 = polar(radius, end)
                    const p3 = polar(innerRadius, end)
                    const p4 = polar(innerRadius, start)

                    const largeArc = angleStep > Math.PI ? 1 : 0

                    const path = `
            M ${p1.x} ${p1.y}
            A ${radius} ${radius} 0 ${largeArc} 1 ${p2.x} ${p2.y}
            L ${p3.x} ${p3.y}
            A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${p4.x} ${p4.y}
            Z
          `

                    const midAngle = start + angleStep / 2
                    const imgPos = polar((radius + innerRadius) / 2, midAngle)

                    return (
                        <g key={i}>
                            {/* Segment */}
                            <path
                                d={path}
                                fill="white"
                                stroke="black"
                                strokeWidth={2}
                                onClick={() => fileInputs.current[i]?.click()}
                                style={{ cursor: 'pointer' }}
                            />

                            {/* Image ou icône par défaut */}
                            {images[i] ? (
                                <image
                                    href={images[i]!}
                                    x={imgPos.x - 20}
                                    y={imgPos.y - 20}
                                    width={40}
                                    height={40}
                                    clipPath="circle(20px at 20px 20px)"
                                />
                            ) : (
                                <text
                                    x={imgPos.x}
                                    y={imgPos.y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="20"
                                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                                >
                                    ⬆️
                                </text>
                            )}

                            {/* Input caché */}
                            <foreignObject width={0} height={0}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={(el) => {
                                        fileInputs.current[i] = el
                                    }}
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) handleUpload(i, file)
                                    }}
                                />
                            </foreignObject>
                        </g>
                    )
                })}
            </svg>
        </div>
    )
}
