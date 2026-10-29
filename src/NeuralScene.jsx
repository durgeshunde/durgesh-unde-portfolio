import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function NeuralScene() {
  const host = useRef(null);
  const [paused, setPaused] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [mode, setMode] = useState("core");
  const [failed, setFailed] = useState(false);
  const controls = useRef({ paused, mode });
  useEffect(() => {
    controls.current = { paused, mode };
  }, [paused, mode]);
  useEffect(() => {
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      setFailed(true);
      return;
    }
    const element = host.current;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setClearColor(0x080b0d, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 60);
    camera.position.set(0, 0.15, 7.2);
    scene.add(new THREE.AmbientLight(0xa5e5db, 1.5));
    const key = new THREE.PointLight(0xa5e5db, 42, 20);
    key.position.set(3, 3, 4);
    scene.add(key);
    const rim = new THREE.PointLight(0xb9b0f3, 35, 20);
    rim.position.set(-3, -1, 2);
    scene.add(rim);
    const root = new THREE.Group();
    scene.add(root);
    const core = new THREE.Group();
    root.add(core);
    const crystal = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.05, 1),
      new THREE.MeshStandardMaterial({
        color: 0x163d3c,
        metalness: 0.8,
        roughness: 0.27,
        flatShading: true,
      }),
    );
    core.add(crystal);
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.13, 2),
      new THREE.MeshBasicMaterial({
        color: 0xa5e5db,
        wireframe: true,
        transparent: true,
        opacity: 0.27,
      }),
    );
    core.add(shell);
    const rings = [];
    [1.65, 2.02, 2.38].forEach((r, i) => {
      const group = new THREE.Group();
      group.rotation.set(0.5 + i * 0.6, 0.3 + i * 0.65, 0.2 * i);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.008, 6, 160),
        new THREE.MeshBasicMaterial({
          color: i === 1 ? 0xe9bd72 : 0x88c9bd,
          transparent: true,
          opacity: i === 1 ? 0.5 : 0.38,
        }),
      );
      group.add(ring);
      const satellite = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 12, 10),
        new THREE.MeshBasicMaterial({ color: i === 1 ? 0xe9bd72 : 0xc4fff1 }),
      );
      satellite.position.x = r;
      group.add(satellite);
      core.add(group);
      rings.push(group);
    });
    const constellation = new THREE.Group();
    root.add(constellation);
    const nodes = [];
    for (let i = 0; i < 18; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / 18),
        theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const v = new THREE.Vector3(
        2 * Math.sin(phi) * Math.cos(theta),
        2 * Math.cos(phi),
        2 * Math.sin(phi) * Math.sin(theta),
      );
      nodes.push(v);
      const n = new THREE.Mesh(
        new THREE.IcosahedronGeometry(i % 4 === 0 ? 0.12 : 0.065, 0),
        new THREE.MeshBasicMaterial({
          color: i % 4 === 0 ? 0xe9bd72 : 0xa5e5db,
        }),
      );
      n.position.copy(v);
      constellation.add(n);
    }
    const edges = [];
    nodes.forEach((a, i) =>
      nodes.forEach((b, j) => {
        if (j > i && a.distanceTo(b) < 2.1)
          edges.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }),
    );
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(edges, 3),
    );
    constellation.add(
      new THREE.LineSegments(
        edgeGeo,
        new THREE.LineBasicMaterial({
          color: 0x8cdbcb,
          transparent: true,
          opacity: 0.25,
        }),
      ),
    );
    const starPositions = [];
    for (let i = 0; i < 230; i++) {
      const seed = i * 137.508;
      starPositions.push(
        Math.sin(seed) * 5,
        Math.cos(seed * 1.7) * 4,
        Math.sin(seed * 0.61) * 3 - 2,
      );
    }
    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3),
    );
    const stars = new THREE.Points(
      starsGeo,
      new THREE.PointsMaterial({
        color: 0x9dcabe,
        size: 0.014,
        transparent: true,
        opacity: 0.55,
      }),
    );
    scene.add(stars);
    let frame,
      last = 0,
      time = 0,
      visible = true,
      dirty = true,
      lastMode = "",
      lastPaused;
    const pointer = { x: 0, y: 0 };
    const resize = () => {
      const w = element.clientWidth,
        h = element.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      dirty = true;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(element);
    resize();
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      dirty = true;
    });
    intersection.observe(element);
    const move = (e) => {
      const r = element.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 0.7;
      pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 0.5;
      dirty = true;
    };
    const leave = () => {
      pointer.x = pointer.y = 0;
      dirty = true;
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const draw = (now) => {
      frame = requestAnimationFrame(draw);
      if (now - last < 32) return;
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || document.hidden) return;
      const c = controls.current;
      if (lastMode !== c.mode || lastPaused !== c.paused) {
        dirty = true;
        lastMode = c.mode;
        lastPaused = c.paused;
      }
      if ((c.paused || reduced.matches) && !dirty) return;
      if (!c.paused && !reduced.matches) time += delta;
      core.visible = c.mode === "core";
      constellation.visible = c.mode === "network";
      root.rotation.set(
        pointer.y + Math.sin(time * 0.25) * 0.08,
        time * 0.12 + pointer.x,
        0,
      );
      crystal.rotation.set(time * 0.1, time * 0.15, 0.2);
      shell.rotation.set(-time * 0.05, time * 0.08, 0);
      rings.forEach((ring, i) => {
        ring.rotation.z = time * (0.12 + i * 0.04) + i * 0.8;
      });
      root.position.y = Math.sin(time * 0.6) * 0.08;
      stars.rotation.y = time * 0.014;
      renderer.render(scene, camera);
      dirty = false;
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      const geometries = new Set(),
        materials = new Set();
      scene.traverse((o) => {
        if (o.geometry) geometries.add(o.geometry);
        if (o.material) materials.add(o.material);
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div className="neural-experience">
      <div
        className="neural-viewport"
        ref={host}
        role="img"
        aria-label={
          mode === "core"
            ? "Interactive 3D neural core with rotating orbital rings"
            : "Interactive 3D network of connected nodes"
        }
      >
        {failed && (
          <div className="neural-fallback" aria-hidden="true">
            <i />
            <i />
            <i />
            <b>AI</b>
          </div>
        )}
        <span className="scene-coordinate">X / Y / Z</span>
        <span className="scene-caption">
          {mode === "core"
            ? "MODEL → TOOLS → ACTION"
            : "CONTEXT → CONNECTION → SYSTEM"}
        </span>
      </div>
      <div className="scene-controls">
        <div>
          <button
            onClick={() => setMode("core")}
            aria-pressed={mode === "core"}
          >
            Neural core
          </button>
          <button
            onClick={() => setMode("network")}
            aria-pressed={mode === "network"}
          >
            Agent network
          </button>
        </div>
        <button
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play 3D animation" : "Pause 3D animation"}
        >
          {paused ? "▶" : "Ⅱ"}
        </button>
      </div>
    </div>
  );
}
