import { useMemo } from 'react'
import * as THREE from 'three'
import { Line } from '@react-three/drei'

export const OrbitRenderer = ({ 
  color = '#98cbff', 
  radiusX = 10, 
  radiusZ = 10, 
  rotation = 0,
  isSelected = false,
  isBackground = false
}) => {
  const points = useMemo(() => {
    const pts = []
    const segments = isBackground ? 32 : 64
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      const cx = Math.cos(theta) * radiusX
      const cz = Math.sin(theta) * radiusZ
      
      // Basic rotation
      const x = cx * Math.cos(rotation) - cz * Math.sin(rotation)
      const z = cx * Math.sin(rotation) + cz * Math.cos(rotation)
      pts.push(new THREE.Vector3(x, 0, z))
    }
    return pts
  }, [radiusX, radiusZ, rotation])

  return (
    <Line
      points={points}
      color={isSelected ? '#ffffff' : color}
      lineWidth={isSelected ? 2 : (isBackground ? 0.8 : 1)}
      transparent
      opacity={isSelected ? 0.8 : (isBackground ? 0.4 : 0.6)}
    />
  )
}
