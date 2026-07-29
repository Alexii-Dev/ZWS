import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';

export default function Hero() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    doorGroup: THREE.Group;
    boltsGroup: THREE.Group;
    spokesGroup: THREE.Group;
    hingeGroup: THREE.Group;
    interiorLight: THREE.PointLight;
    interiorPanel: THREE.Mesh;
    vaultMaterial: THREE.MeshPhysicalMaterial;
    boltMaterial: THREE.MeshStandardMaterial;
    whiteGlowMaterial: THREE.MeshBasicMaterial;
    animFrameId: number;
  } | null>(null);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.Fog(0x050505, 2, 5);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, 2.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // Environment & Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv).texture;

    // Materials
    const vaultMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xaaaaaa,
      metalness: 1.0,
      roughness: 0.4,
      envMapIntensity: 1.0,
    });

    const boltMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.9,
      roughness: 0.5,
    });

    const whiteGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      toneMapped: false,
    });

    // --- Geometry Construction ---

    const doorGroup = new THREE.Group();
    scene.add(doorGroup);

    // Door Frame (two pillars)
    const frameGeom = new THREE.BoxGeometry(0.3, 2.2, 0.4);
    const leftPillar = new THREE.Mesh(frameGeom, vaultMaterial);
    leftPillar.position.set(-0.95, 0, 0);
    doorGroup.add(leftPillar);

    const rightPillar = new THREE.Mesh(frameGeom, vaultMaterial);
    rightPillar.position.set(0.95, 0, 0);
    doorGroup.add(rightPillar);

    // Door Main
    const doorMain = new THREE.Group();

    const doorPanelGeom = new THREE.BoxGeometry(1.6, 2.0, 0.15);
    const doorPanel = new THREE.Mesh(doorPanelGeom, vaultMaterial);
    doorMain.add(doorPanel);

    // Hub
    const hubGeom = new THREE.BoxGeometry(0.3, 0.3, 0.16);
    const hub = new THREE.Mesh(hubGeom, vaultMaterial);
    hub.position.set(0, 0, 0.075);
    doorMain.add(hub);

    // Locking Mechanism (spokes)
    const lockingMechanism = new THREE.Group();
    doorMain.add(lockingMechanism);

    const spokesGroup = new THREE.Group();
    spokesGroup.position.set(0, 0, 0.08);
    lockingMechanism.add(spokesGroup);

    for (let i = 0; i < 7; i++) {
      const spokeGeom = new THREE.BoxGeometry(0.08, 0.7, 0.1);
      const spoke = new THREE.Mesh(spokeGeom, vaultMaterial);
      spoke.position.set(0, 0.45, 0.08);
      spoke.rotation.z = i * ((Math.PI * 2) / 7);
      spokesGroup.add(spoke);
    }

    // Bolts
    const boltsGroup = new THREE.Group();
    doorMain.add(boltsGroup);

    const boltGeom = new THREE.BoxGeometry(0.15, 0.1, 0.1);
    const boltLocations: [number, number][] = [
      [-0.6, 0.8], [0.6, 0.8], [-0.6, -0.8], [0.6, -0.8],
      [-0.7, 0.4], [0.7, 0.4], [-0.7, -0.4], [0.7, -0.4],
      [-0.75, 0], [0.75, 0], [0, 0.85], [0, -0.85],
    ];

    for (const loc of boltLocations) {
      const bolt = new THREE.Mesh(boltGeom, boltMaterial);
      bolt.position.set(loc[0], loc[1], 0.08);
      boltsGroup.add(bolt);
    }

    // Hinge Group
    const hingeGroup = new THREE.Group();
    hingeGroup.position.set(-0.8, 0, -0.1);
    doorGroup.add(hingeGroup);

    doorMain.position.set(0.8, 0, 0.1);
    hingeGroup.add(doorMain);

    // Vault Interior Light
    const interiorLight = new THREE.PointLight(0xffffff, 0, 10);
    interiorLight.position.set(0, 0, -1);
    doorGroup.add(interiorLight);

    const interiorPanelGeom = new THREE.PlaneGeometry(1.5, 1.9);
    const interiorPanel = new THREE.Mesh(interiorPanelGeom, whiteGlowMaterial);
    interiorPanel.position.set(0, 0, -0.2);
    interiorPanel.visible = false;
    doorGroup.add(interiorPanel);

    // Store refs
    sceneRef.current = {
      scene,
      camera,
      renderer,
      doorGroup,
      boltsGroup,
      spokesGroup,
      hingeGroup,
      interiorLight,
      interiorPanel,
      vaultMaterial,
      boltMaterial,
      whiteGlowMaterial,
      animFrameId: 0,
    };

    // --- Unsealing Animation (GSAP) ---
    const tl = gsap.timeline({ delay: 0.5 });

    // Phase 1: Bolts slide out
    tl.to(boltsGroup.children, {
      z: 0.3,
      duration: 1.5,
      stagger: 0.05,
      ease: 'power2.inOut',
    });

    // Bolts rotate radially outward
    boltsGroup.children.forEach((bolt) => {
      const targetAngle = Math.atan2(bolt.position.y, bolt.position.x);
      tl.to(bolt.rotation, {
        z: targetAngle,
        duration: 1.5,
        ease: 'power2.inOut',
      }, '<');
    });

    // Phase 2: Wheel spins
    tl.to(spokesGroup.rotation, {
      z: Math.PI * 4,
      duration: 2.5,
      ease: 'power3.inOut',
    }, '+=0.2');

    // Phase 3: Door opens
    tl.to(hingeGroup.rotation, {
      y: -Math.PI / 2.2,
      duration: 3,
      ease: 'power2.inOut',
    }, '-=0.5');

    // Phase 4: Interior light reveals
    tl.to(interiorLight, {
      intensity: 10,
      duration: 1,
    }, '-=0.5');

    tl.call(() => {
      interiorPanel.visible = true;
    }, [], '-=0.8');

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.15;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.005;
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (0.2 + mouseY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      sceneRef.current!.animFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      tl.kill();
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animFrameId);
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      pmremGenerator.dispose();
    };
  }, []);

  return (
    <section
      id="vpn"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '600px' }}
    >
      {/* Three.js Canvas Container */}
      <div
        ref={canvasContainerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />

      {/* Hero Content */}
      <div
        className="relative z-10 flex flex-col justify-end h-full"
        style={{ paddingLeft: '5vw', paddingBottom: '15vh', paddingRight: '5vw' }}
      >
        <p
          className="font-mono-tech text-xs sm:text-sm tracking-[0.3em] mb-4"
          style={{ color: '#378ADD' }}
        >
          INFRAESTRUCTURA CHILENA
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5vw] font-semibold leading-[1.1] mb-6 max-w-4xl"
          style={{
            color: '#f0f0f0',
            textShadow: '0 2px 40px rgba(0,0,0,0.8)',
          }}
        >
          Tu IP Dedicada.
          <br />
          Tu Fortaleza Digital.
        </h1>
        <p
          className="text-base sm:text-lg max-w-xl mb-8 leading-relaxed"
          style={{
            color: 'rgba(240,240,240,0.8)',
            textShadow: '0 1px 20px rgba(0,0,0,0.6)',
          }}
        >
          Servidores bare-metal y VPN con IP dedicada en Chile. Navegación sin fronteras, latencia ultrabaja y seguridad absoluta.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#planes-vpn"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('planes-vpn')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
          >
            Ver Planes VPN
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-ghost"
            style={{ color: '#f0f0f0', borderColor: 'rgba(240,240,240,0.3)' }}
          >
            Soporte Técnico
          </a>
        </div>
      </div>

      {/* Gradient Overlay for text readability */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.2) 40%, transparent 70%)',
        }}
      />
    </section>
  );
}
