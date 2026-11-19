document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // GSAP Entrance & ScrollTrigger Animations
  if (window.gsap && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-stagger", {
      y: 28,
      opacity: 0,
      duration: 0.85,
      stagger: 0.1,
      ease: "power3.out",
      clearProps: "transform,opacity",
    });

    gsap.utils.toArray(".reveal-section").forEach((el) => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
          once: true,
        },
      });
    });

    // Magnetic CTA Buttons
    document.querySelectorAll(".magnetic-btn").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.16;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.16;
        gsap.to(btn, { x, y, duration: 0.25, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.35, ease: "power3.out" });
      });
    });
  }

  // Destination card selection -> pre-fill Custom Trip Inquiry input
  document.querySelectorAll(".select-dest-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dest = btn.getAttribute("data-dest");
      const input = document.getElementById("tripDestinationInput");
      if (input && dest) {
        input.value = dest;
      }
      document.getElementById("inquire")?.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Subtle Three.js Orbital Globe
  const container = document.getElementById("orbitalCanvas");
  if (container && window.THREE) {
    const width = container.clientWidth || 140;
    const height = container.clientHeight || 140;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.z = 4.4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.45, 22, 16),
      new THREE.MeshBasicMaterial({ color: 0x111111, wireframe: true, transparent: true, opacity: 0.16 })
    );
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.78, 0.025, 12, 80),
      new THREE.MeshBasicMaterial({ color: 0xc7f000 })
    );
    ring.rotation.x = Math.PI * 0.38;
    scene.add(sphere, ring);

    function animate() {
      if (!prefersReducedMotion) {
        sphere.rotation.y += 0.0025;
        ring.rotation.z += 0.004;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  }
});
