'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { Suspense, useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

interface Canvas3DProps {
  className?: string
  modelPath?: string
}

export function Canvas3D({ className, modelPath = '/models/tee.glb' }: Canvas3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [modelError, setModelError] = useState(false)
  
  // Fallback to a known working GLB model URL
  const [currentModelPath, setCurrentModelPath] = useState<string>(modelPath)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#configurator',
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1,
          onEnter: () => ScrollTrigger.refresh(),
        },
      })

      tl.fromTo(
        containerRef.current!,
        { opacity: 0, rotationY: -120, scale: 0.9 },
        { opacity: 1, rotationY: 0, scale: 1, duration: 1, ease: 'expo.out' }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-[600px] lg:h-[700px] rounded-2xl overflow-hidden bg-charcoal', className)}
      style={{ touchAction: 'none' }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <Canvas
          camera={{ position: [0, 1.2, 3], fov: 35 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          shadows
        >
          <Environment
            background={false}
            files={['/environments/environment.exr']}
            path="/environments/"
            preset="studio"
          />
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={20}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={5}
            shadow-camera-bottom={-5}
          />
          <directionalLight position={[-3, 5, -3]} intensity={0.5} />
          <TeeModel modelPath={currentModelPath} />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minZoom={0.8}
            maxZoom={2.5}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            target={[0, 0.8, 0]}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </Suspense>

      {/* Fallback for no WebGL */}
      <noscript>
        <div className="absolute inset-0 flex items-center justify-center bg-charcoal p-8 text-center">
          <p className="text-cream/60">
            3D view requires WebGL.{' '}
            <a
              href="https://get.webgl.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric-blue underline"
            >
              Enable WebGL
            </a>{' '}
            or view on a compatible browser.
          </p>
        </div>
      </noscript>
    </div>
  )
}

function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-charcoal">
      <div className="text-center">
        <div className="loading-spinner mx-auto mb-4" />
        <p className="text-cream/60 text-sm">Loading 3D configurator...</p>
      </div>
    </div>
  )
}

interface TeeModelProps {
  modelPath: string
}

export function TeeModel({ modelPath }: TeeModelProps) {
  const { scene } = useGLTF(modelPath)
  const groupRef = useRef<THREE.Group>(null)

  // Track mouse interaction state via window events
  const isDraggingRef = useRef(false)

  useEffect(() => {
    const handlePointerDown = () => { isDraggingRef.current = true }
    const handlePointerUp = () => { isDraggingRef.current = false }
    
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  // Rotate slowly when not interacting
  useFrame(() => {
    if (groupRef.current && !isDraggingRef.current) {
      groupRef.current.rotation.y += 0.0008
    }
  })

  return (
    <group
      ref={groupRef}
      dispose={null}
      onPointerDown={() => { isDraggingRef.current = true }}
      onPointerUp={() => { isDraggingRef.current = false }}
      onPointerLeave={() => { isDraggingRef.current = false }}
    >
      <primitive object={scene} scale={1.2} position={[0, 0, 0]} />
    </group>
  )
}