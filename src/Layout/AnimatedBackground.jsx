import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Imposta dimensioni iniziali
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Carica immagine della bici
    const bikeImg = new Image();
    bikeImg.src = "/bike.png"; // metti l'immagine in public/

    // Array di bici animate
    const bikes = [];
    const numBikes = 10;
    for (let i = 0; i < numBikes; i++) {
      bikes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 3,
      });
    }

    // Funzione animazione
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bikes.forEach((bike) => {
        ctx.drawImage(bikeImg, bike.x, bike.y, 50, 50);
        bike.x += bike.speed;
        if (bike.x > canvas.width) bike.x = -50;
      });

      console.log('animazione in corso')
      requestAnimationFrame(animate);
    };

    bikeImg.onload = () => {
      animate();
    };

    // Aggiorna canvas al resize della finestra
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    ></canvas>
  );
}