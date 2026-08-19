"use client";

import { useEffect, useRef, useState } from "react";

/** Live analog + digital clock (Guatemala local time) — the hero's only motion. */
export function LiveDial() {
  const horas = useRef<SVGLineElement>(null);
  const minutos = useRef<SVGLineElement>(null);
  const segundos = useRef<SVGLineElement>(null);
  const [digital, setDigital] = useState("00:00:00");
  const [cuenta, setCuenta] = useState("— para la medianoche");

  useEffect(() => {
    const dosDig = (n: number) => (n < 10 ? "0" + n : "" + n);

    const latido = () => {
      const t = new Date();
      const h = t.getHours();
      const m = t.getMinutes();
      const s = t.getSeconds();

      if (segundos.current)
        segundos.current.style.transform = `rotate(${s * 6}deg)`;
      if (minutos.current)
        minutos.current.style.transform = `rotate(${m * 6 + s * 0.1}deg)`;
      if (horas.current)
        horas.current.style.transform = `rotate(${(h % 12) * 30 + m * 0.5}deg)`;

      setDigital(`${dosDig(h)}:${dosDig(m)}:${dosDig(s)}`);

      const restante = 86400 - (h * 3600 + m * 60 + s);
      if (restante === 86400) {
        setCuenta("Es medianoche");
      } else {
        setCuenta(
          `${dosDig(Math.floor(restante / 3600))} h ${dosDig(
            Math.floor((restante % 3600) / 60),
          )} m para la medianoche`,
        );
      }
    };

    latido();
    const id = setInterval(latido, 1000);
    return () => clearInterval(id);
  }, []);

  const marcas = Array.from({ length: 60 }, (_, i) => {
    const esHora = i % 5 === 0;
    return (
      <line
        key={i}
        x1={200}
        x2={200}
        y1={24}
        y2={esHora ? 42 : 32}
        className={esHora ? "marca-hora" : "marca-min"}
        transform={`rotate(${i * 6} 200 200)`}
      />
    );
  });

  return (
    <div className="esfera">
      <svg
        viewBox="0 0 400 400"
        role="img"
        aria-label="Reloj mostrando la hora actual de Guatemala"
      >
        <circle className="aro" cx="200" cy="200" r="188" />
        <circle className="aro" cx="200" cy="200" r="176" />
        <g>{marcas}</g>
        <text className="firma" x="200" y="272" textAnchor="middle">
          MEDIANOCHE
        </text>
        <line ref={horas} className="mano" id="horas" x1="200" y1="212" x2="200" y2="118" />
        <line ref={minutos} className="mano" id="minutos" x1="200" y1="216" x2="200" y2="76" />
        <line ref={segundos} className="mano" id="segundos" x1="200" y1="230" x2="200" y2="64" />
        <circle className="eje" cx="200" cy="200" r="3.4" />
      </svg>
      <div className="lectura">
        <div className="reloj-digital">{digital}</div>
        <div className="cuenta-atras">{cuenta}</div>
      </div>
    </div>
  );
}
