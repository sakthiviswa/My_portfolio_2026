import { useEffect } from "react";

export default function StarField() {
  useEffect(() => {
    const canvas = document.getElementById("starCanvas");
    const ctx = canvas.getContext("2d");
    let stars = [];
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 130 }, () => ({
        x:   Math.random() * canvas.width,
        y:   Math.random() * canvas.height,
        r:   Math.random() * 1.8 + 0.3,
        a:   Math.random(),
        da:  (Math.random() - 0.5) * 0.007,
        col: Math.random() > 0.55 ? "#f0c040" : "#c070ff",
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.a += s.da;
        if (s.a <= 0 || s.a >= 1) s.da *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.col;
        ctx.globalAlpha = Math.max(0, Math.min(1, s.a));
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return null;
}