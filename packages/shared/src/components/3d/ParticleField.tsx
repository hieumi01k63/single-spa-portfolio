import * as React from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BufferGeometry,
  Float32BufferAttribute,
  RawShaderMaterial,
  Points,
  Color,
  Vector2,
  Vector3,
  Raycaster,
  PlaneGeometry,
  Mesh,
  MeshBasicMaterial,
  Clock,
} from "three";

// @ts-ignore — handled by webpack asset/source
import vertexShader from "./shaders/particles.vert.glsl";
// @ts-ignore — handled by webpack asset/source
import fragmentShader from "./shaders/particles.frag.glsl";

// ─── Light/dark theme color presets ───────────────────────────────
const THEME_COLORS = {
  light: {
    color1: "#2c64ed", // Royal Blue
    color2: "#f84242", // Coral Red
    color3: "#ffcf03", // Golden Yellow
  },
  dark: {
    color1: "#7189ff", // Soft Lavender
    color2: "#3074f9", // Bright Blue
    color3: "#10b981", // Emerald
  },
} as const;

// ─── Props ────────────────────────────────────────────────────────
export interface ParticleFieldProps {
  /** Total number of particles */
  count?: number;
  /** Radius of the 3D globe volume (higher = larger/less dense) */
  globeSize?: number;
  /** Scale multiplier for individual particle size */
  particleScale?: number;
  /** Ring interaction radius (NDC-space) */
  ringRadius?: number;
  /** Ring interaction falloff width */
  ringWidth?: number;
  /** How far particles push away from cursor */
  displacement?: number;
  /** Heartbeat pulse intensity — 0 = no pulse, 1 = default, 2 = dramatic */
  heartbeatScale?: number;
  /** Speed of the school swimming around the content */
  swimSpeed?: number;
  /** Override colors — [color1, color2, color3] hex strings */
  colors?: [string, string, string];
  /** Optional CSS class on the container div */
  className?: string;
  /** Force a specific theme instead of auto-detecting */
  theme?: "light" | "dark";
}

// ─── Helpers ──────────────────────────────────────────────────────

/**
 * Generate particles in a 3D globe shape.
 * Particles are distributed uniformly within a spherical volume.
 */
function generateGlobeParticles(count: number, globeSize: number) {
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const colorIndices = new Float32Array(count);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    // Spherical coordinates for uniform volume distribution
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    // Math.cbrt ensures uniform distribution throughout the volume
    const r = globeSize * Math.cbrt(Math.random());

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    scales[i] = 0.4 + Math.random() * 0.6;
    colorIndices[i] = Math.random();

    // Per-particle jitter speed in all 3 axes
    velocities[i * 3] = 0.3 + Math.random() * 0.6;
    velocities[i * 3 + 1] = 0.3 + Math.random() * 0.6;
    velocities[i * 3 + 2] = 0.3 + Math.random() * 0.6;
  }

  return { positions, scales, colorIndices, velocities };
}

// ─── Component ────────────────────────────────────────────────────
const ParticleField = React.forwardRef<HTMLDivElement, ParticleFieldProps>(
  (
    {
      count = 300,
      globeSize = 0.45,
      particleScale = 0.75,
      ringRadius = 0.15,
      ringWidth = 0.15,
      displacement = 0.15,
      heartbeatScale = 1.0,
      swimSpeed = 0.3,
      colors,
      className,
      theme: themeProp,
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Expose the container ref to parent via forwardRef
    React.useImperativeHandle(ref, () => containerRef.current!);

    // ── All mutable Three.js state in a single ref (no re-renders) ──
    const stateRef = React.useRef({
      renderer: null as WebGLRenderer | null,
      scene: null as Scene | null,
      camera: null as PerspectiveCamera | null,
      points: null as Points | null,
      material: null as RawShaderMaterial | null,
      geometry: null as BufferGeometry | null,
      raycastPlane: null as Mesh | null,
      raycaster: new Raycaster(),
      mouse: new Vector2(-999, -999),
      intersectionPoint: new Vector3(0, 0, 0),
      isIntersecting: false,
      clock: new Clock(),
      animFrameId: 0,
      isVisible: true,
      frameCount: 0,
      currentTheme: "dark" as "light" | "dark",
    });

    React.useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const state = stateRef.current;

      // ── Detect initial theme ──
      const detectTheme = (): "light" | "dark" => {
        if (themeProp) return themeProp;
        const html = document.documentElement;
        if (html.classList.contains("dark")) return "dark";
        if (html.classList.contains("light")) return "light";
        const dataTheme = html.getAttribute("data-theme");
        if (dataTheme === "light" || dataTheme === "dark") return dataTheme;
        return "dark";
      };

      state.currentTheme = detectTheme();

      const getColors = () => {
        if (colors) {
          return {
            color1: new Color(colors[0]),
            color2: new Color(colors[1]),
            color3: new Color(colors[2]),
          };
        }
        const palette = THEME_COLORS[state.currentTheme];
        return {
          color1: new Color(palette.color1),
          color2: new Color(palette.color2),
          color3: new Color(palette.color3),
        };
      };

      // ── Renderer ──
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(pixelRatio);
      renderer.setClearColor(0x000000, 0); // transparent background
      container.appendChild(renderer.domElement);
      state.renderer = renderer;

      // ── Scene + Camera ──
      const scene = new Scene();
      const camera = new PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.z = 1.5;
      state.scene = scene;
      state.camera = camera;

      // ── Invisible raycast plane ──
      const planeGeo = new PlaneGeometry(10, 10);
      const planeMat = new MeshBasicMaterial({ visible: false });
      const raycastPlane = new Mesh(planeGeo, planeMat);
      scene.add(raycastPlane);
      state.raycastPlane = raycastPlane;

      // ── Create 3D globe shaped particles ──
      const { positions, scales, colorIndices, velocities } =
        generateGlobeParticles(count, globeSize);

      const geometry = new BufferGeometry();
      geometry.setAttribute(
        "position",
        new Float32BufferAttribute(positions, 3)
      );
      geometry.setAttribute("aScale", new Float32BufferAttribute(scales, 1));
      geometry.setAttribute(
        "aColorIndex",
        new Float32BufferAttribute(colorIndices, 1)
      );
      geometry.setAttribute(
        "aVelocity",
        new Float32BufferAttribute(velocities, 3)
      );
      state.geometry = geometry;

      // ── Shader material ──
      const themeColors = getColors();
      const material = new RawShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uMouse: { value: new Vector3(-999, -999, 0) },
          uRingRadius: { value: ringRadius },
          uRingWidth: { value: ringWidth },
          uDisplacement: { value: displacement },
          uPixelRatio: { value: pixelRatio },
          uPointSize: { value: particleScale * 8.0 },
          uHeartbeatScale: { value: heartbeatScale },
          uSwimSpeed: { value: swimSpeed },
          uTime: { value: 0 },
          uColor1: { value: themeColors.color1 },
          uColor2: { value: themeColors.color2 },
          uColor3: { value: themeColors.color3 },
        },
      });
      state.material = material;

      const points = new Points(geometry, material);
      scene.add(points);
      state.points = points;

      // ── Sizing ──
      const handleResize = () => {
        if (!container || !state.renderer || !state.camera) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        state.renderer.setSize(w, h);
        state.camera.aspect = w / h;
        state.camera.updateProjectionMatrix();
      };
      handleResize();
      window.addEventListener("resize", handleResize);

      // ── Mouse tracking (passive, on window so it works over top content) ──
      const handleMouseMove = (e: MouseEvent) => {
        if (!container) return;
        // Calculate relative to the container's position on screen
        const rect = container.getBoundingClientRect();
        
        // If the mouse is way outside the vertical bounds of the hero section,
        // we can optionally ignore it or clamp it. Here we track globally
        // so the globe reacts smoothly even if hovering slightly outside.
        state.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        state.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      };

      const handleMouseLeave = () => {
        state.mouse.set(-999, -999);
        state.isIntersecting = false;
      };

      window.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
      window.addEventListener("mouseleave", handleMouseLeave);

      // ── IntersectionObserver → auto-pause off-screen ──
      const observer = new IntersectionObserver(
        ([entry]) => {
          state.isVisible = entry.isIntersecting;
        },
        { threshold: 0.1 }
      );
      observer.observe(container);

      // ── Theme change watcher ──
      const themeObserver = new MutationObserver(() => {
        const newTheme = detectTheme();
        if (newTheme !== state.currentTheme) {
          state.currentTheme = newTheme;
          const newColors = getColors();
          material.uniforms.uColor1.value = newColors.color1;
          material.uniforms.uColor2.value = newColors.color2;
          material.uniforms.uColor3.value = newColors.color3;
        }
      });
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "data-theme"],
      });

      // ── Animation loop ──
      const animate = () => {
        state.animFrameId = requestAnimationFrame(animate);

        if (!state.isVisible) return;

        const elapsed = state.clock.getElapsedTime();
        material.uniforms.uTime.value = elapsed;

        // Raycast every other frame for performance
        state.frameCount++;
        if (state.frameCount % 2 === 0 && state.mouse.x !== -999) {
          state.raycaster.setFromCamera(state.mouse, camera);
          const intersects = state.raycaster.intersectObject(raycastPlane);
          if (intersects.length > 0) {
            state.intersectionPoint.copy(intersects[0].point);
            state.isIntersecting = true;
          } else {
            state.isIntersecting = false;
          }
        }

        if (state.isIntersecting) {
          const u = material.uniforms.uMouse.value as Vector3;
          // Ease-out: fast when far, slow when close — creates smooth deceleration
          const distance = u.distanceTo(state.intersectionPoint);
          const lerpFactor = 0.03 + Math.min(distance * 0.8, 0.09);
          u.lerp(state.intersectionPoint, lerpFactor);
        } else {
          (material.uniforms.uMouse.value as Vector3).set(-999, -999, 0);
        }

        renderer.render(scene, camera);
      };

      animate();

      // ── Cleanup ──
      return () => {
        cancelAnimationFrame(state.animFrameId);
        observer.disconnect();
        themeObserver.disconnect();
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);

        geometry.dispose();
        material.dispose();
        planeGeo.dispose();
        planeMat.dispose();
        renderer.dispose();

        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }, [count, globeSize, particleScale, ringRadius, ringWidth, displacement, heartbeatScale, swimSpeed, colors, themeProp]);

    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "auto",
        }}
      />
    );
  }
);

ParticleField.displayName = "ParticleField";

export { ParticleField };
