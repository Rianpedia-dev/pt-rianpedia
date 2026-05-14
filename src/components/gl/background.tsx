"use client"
import { Effects } from "@react-three/drei"
import { Canvas, extend } from "@react-three/fiber"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"
import { Particles } from "@/components/gl/particles"
import { VignetteShader } from "@/components/gl/shaders/vignette"

extend({ ShaderPass })

export const GLBackground = () => { 
    // Fixed parameters untuk background
    const params = {
        speed: 1.0,
        focus: 3.8,
        aperture: 1.79,
        size: 512,
        noiseScale: 0.6,
        noiseIntensity: 0.52,
        timeScale: 1,
        pointSize: 10.0,
        opacity: 0.8,
        planeScale: 10.0,
        vignetteDarkness: 1.5,
        vignetteOffset: 0.4,
    }

    return (
        <div id="webgl-background">
            <Canvas
                camera={{
                    position: [1.2629783123314589, 2.664606471394044, -1.8178993743288914],
                    fov: 50,
                    near: 0.01,
                    far: 300,
                }}
            >
                <color attach="background" args={["#000"]} />
                <Particles
                    speed={params.speed}
                    aperture={params.aperture}
                    focus={params.focus}
                    size={params.size}
                    noiseScale={params.noiseScale}
                    noiseIntensity={params.noiseIntensity}
                    timeScale={params.timeScale}
                    pointSize={params.pointSize}
                    opacity={params.opacity}
                    planeScale={params.planeScale}
                    useManualTime={false}
                    manualTime={0}
                    introspect={false}
                />
                <Effects multisamping={0} disableGamma>
                    {/* @ts-ignore */}
                    <shaderPass
                        args={[VignetteShader]}
                        uniforms-darkness-value={params.vignetteDarkness}
                        uniforms-offset-value={params.vignetteOffset}
                    />
                </Effects>
            </Canvas>
        </div>
    )
}
