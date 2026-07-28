'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- COLOR CONVERSION MATH (CIELAB -> XYZ -> sRGB) ---
function lab2rgb(l: number, a: number, b: number) {
    let y = (l + 16) / 116, x = a / 500 + y, z = y - b / 200;
    const x3 = x * x * x, y3 = y * y * y, z3 = z * z * z;
    y = y3 > 0.008856 ? y3 : (y - 16 / 116) / 7.787;
    x = x3 > 0.008856 ? x3 : (x - 16 / 116) / 7.787;
    z = z3 > 0.008856 ? z3 : (z - 16 / 116) / 7.787;
    
    // D50 reference white
    x *= 0.96422; y *= 1.00000; z *= 0.82521;

    let r = x *  3.2406 + y * -1.5372 + z * -0.4986;
    let g = x * -0.9689 + y *  1.8758 + z *  0.0415;
    let bl = x *  0.0557 + y * -0.2040 + z *  1.0570;

    r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
    g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
    bl = bl > 0.0031308 ? 1.055 * Math.pow(bl, 1 / 2.4) - 0.055 : 12.92 * bl;

    return [
        Math.min(Math.max(0, Math.round(r * 255))),
        Math.min(Math.max(0, Math.round(g * 255))),
        Math.min(Math.max(0, Math.round(bl * 255)))
    ];
}

function rgb2hex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

export default function CielabExplorer() {
    const mountRef = useRef<HTMLDivElement>(null);
    const [l, setL] = useState(47.2);
    const [a, setA] = useState(68.1);
    const [b, setB] = useState(48.4);

    const [rgb, setRgb] = useState([0, 0, 0]);
    const [hex, setHex] = useState("#000000");

    // ThreeJS references that need to update on state change
    const sphereRef = useRef<THREE.Mesh>(null!);
    const dropLinesRef = useRef<THREE.LineSegments>(null!);
    const dropLineGeomRef = useRef<THREE.BufferGeometry>(null!);

    // Initialization
    useEffect(() => {
        if (!mountRef.current) return;
        const container = mountRef.current;

        const scene = new THREE.Scene();
        
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(200, 150, 200);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.target.set(0, 50, 0); // Center around L*=50

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(100, 200, 100);
        scene.add(dirLight);

        // --- BUILD 3D CIELAB GAMUT & AXES ---
        const axesGroup = new THREE.Group();
        scene.add(axesGroup);

        function drawLine(p1: [number, number, number], p2: [number, number, number], color: number, dashed=false) {
            const geom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...p1), new THREE.Vector3(...p2)]);
            const mat = dashed 
                ? new THREE.LineDashedMaterial({ color, dashSize: 4, gapSize: 4 })
                : new THREE.LineBasicMaterial({ color, linewidth: 2 });
            const line = new THREE.Line(geom, mat);
            if(dashed) line.computeLineDistances();
            axesGroup.add(line);
        }

        // L* Axis (Vertical 0 to 100) - White/Grey
        drawLine([0, 0, 0], [0, 100, 0], 0xffffff);
        // a* Axis (-100 Green to +100 Red) - X axis
        drawLine([-100, 50, 0], [100, 50, 0], 0xff4444);
        // b* Axis (-100 Blue to +100 Yellow) - Z axis
        drawLine([0, 50, -100], [0, 50, 100], 0xffd700);

        // Bounding Grid at L=0 and L=100
        const gridBottom = new THREE.GridHelper(200, 10, 0x444444, 0x222222);
        gridBottom.position.y = 0;
        axesGroup.add(gridBottom);
        
        const gridTop = new THREE.GridHelper(200, 10, 0x444444, 0x222222);
        gridTop.position.y = 100;
        axesGroup.add(gridTop);

        // Create Gamut Point Cloud
        const cloudGeom = new THREE.BufferGeometry();
        const cloudPositions = [];
        const cloudColors = [];
        
        for(let cl = 10; cl <= 90; cl += 15) {
            for(let ca = -80; ca <= 80; ca += 15) {
                for(let cb = -80; cb <= 80; cb += 15) {
                    const [cr, cg, cbl] = lab2rgb(cl, ca, cb);
                    if(cr >= 0 && cr <= 255 && cg >= 0 && cg <= 255 && cbl >= 0 && cbl <= 255) {
                        cloudPositions.push(ca, cl, cb); 
                        cloudColors.push(cr/255, cg/255, cbl/255);
                    }
                }
            }
        }
        cloudGeom.setAttribute('position', new THREE.Float32BufferAttribute(cloudPositions, 3));
        cloudGeom.setAttribute('color', new THREE.Float32BufferAttribute(cloudColors, 3));
        const cloudMat = new THREE.PointsMaterial({ size: 3, vertexColors: true, transparent: true, opacity: 0.3 });
        const pointCloud = new THREE.Points(cloudGeom, cloudMat);
        scene.add(pointCloud);

        // --- INTERACTIVE COLOR SPHERE & DROP LINES ---
        const sphereGeom = new THREE.SphereGeometry(6, 32, 32);
        const sphereMat = new THREE.MeshStandardMaterial({ roughness: 0.2, metalness: 0.1 });
        const colorSphere = new THREE.Mesh(sphereGeom, sphereMat);
        scene.add(colorSphere);
        sphereRef.current = colorSphere;

        const dropLineMat = new THREE.LineDashedMaterial({ color: 0xaaaaaa, dashSize: 2, gapSize: 2 });
        const dropLineGeom = new THREE.BufferGeometry();
        const dropLines = new THREE.LineSegments(dropLineGeom, dropLineMat);
        scene.add(dropLines);
        dropLineGeomRef.current = dropLineGeom;
        dropLinesRef.current = dropLines;

        // Resize handler
        const handleResize = () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Animation Loop
        let frameId: number;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameId);
            container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    // Update ThreeJS when state changes
    useEffect(() => {
        const [cr, cg, cbl] = lab2rgb(l, a, b);
        const chex = rgb2hex(cr, cg, cbl);
        setRgb([cr, cg, cbl]);
        setHex(chex);

        if (sphereRef.current) {
            sphereRef.current.position.set(a, l, b);
            (sphereRef.current.material as THREE.MeshStandardMaterial).color.set(chex);
        }

        if (dropLineGeomRef.current && dropLinesRef.current) {
            const linePoints = [
                a, l, b,   0, l, 0,     
                a, l, b,   a, 0, b,     
                a, 0, b,   0, 0, 0      
            ];
            dropLineGeomRef.current.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
            dropLinesRef.current.computeLineDistances();
        }
    }, [l, a, b]);

    const handleReset = () => {
        setL(47.2);
        setA(68.1);
        setB(48.4);
    };

    return (
        <div className="flex flex-col md:flex-row h-[500px] w-full border border-gray-700 rounded-lg overflow-hidden my-6 bg-[#1a1a1a] text-gray-200">
            <div className="flex-1 relative bg-[radial-gradient(circle_at_center,#2a2a2a_0%,#111_100%)] min-h-[300px]">
                <div ref={mountRef} className="absolute inset-0" />
                <div className="absolute top-4 left-4 bg-black/70 px-3 py-2 rounded text-xs border border-gray-700 pointer-events-none">
                    🖱️ Left-click + Drag to Rotate | Right-click to Pan | Scroll to Zoom
                </div>
            </div>

            <div className="w-full md:w-[360px] bg-[#2d2d2d] border-t md:border-t-0 md:border-l border-gray-700 p-6 flex flex-col gap-5 overflow-y-auto z-10">
                <div>
                    <h2 className="text-lg font-bold text-white mb-1">CIELAB 3D Explorer</h2>
                    <p className="text-sm text-gray-400 leading-tight">Navigate human color perception. See how coordinates map to visual shifts inside the 3D gamut.</p>
                </div>

                <div className="bg-[#1e1e1e] border border-gray-700 rounded-lg p-4 flex items-center gap-4">
                    <div 
                        className="w-16 h-16 rounded-md border-2 border-white shadow-[0_4px_10px_rgba(0,0,0,0.5)] shrink-0" 
                        style={{ backgroundColor: hex }}
                    />
                    <div>
                        <h3 className="text-sm font-semibold mb-1">Current Color</h3>
                        <code className="block font-mono text-xs text-gray-300">RGB: ({rgb[0]}, {rgb[1]}, {rgb[2]})</code>
                        <code className="block font-mono text-xs text-gray-300 mt-0.5">HEX: {hex}</code>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-sm font-semibold">
                        <span>Lightness (L*)</span>
                        <span className="font-mono text-blue-400">{l.toFixed(1)}</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" max="100" step="0.1" 
                        value={l} onChange={(e) => setL(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500"><span>0 (Black)</span><span>100 (White)</span></div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-sm font-semibold">
                        <span>Green ↔ Red (a*)</span>
                        <span className="font-mono text-blue-400">{a.toFixed(1)}</span>
                    </div>
                    <input 
                        type="range" 
                        min="-100" max="100" step="0.1" 
                        value={a} onChange={(e) => setA(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500"><span>-100 (Green)</span><span>+100 (Red)</span></div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-sm font-semibold">
                        <span>Blue ↔ Yellow (b*)</span>
                        <span className="font-mono text-blue-400">{b.toFixed(1)}</span>
                    </div>
                    <input 
                        type="range" 
                        min="-100" max="100" step="0.1" 
                        value={b} onChange={(e) => setB(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500"><span>-100 (Blue)</span><span>+100 (Yellow)</span></div>
                </div>

                <button 
                    onClick={handleReset}
                    className="mt-auto py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md transition-colors text-sm"
                >
                    Reset to Lesson Example
                </button>
            </div>
        </div>
    );
}
