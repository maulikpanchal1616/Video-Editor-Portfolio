import { useRef } from "react";
import { cn } from "../../utils/cn";

export function CardContainer({ children, className }) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    card.style.transform = `
      rotateX(${(-y / 20).toFixed(2)}deg)
      rotateY(${(x / 20).toFixed(2)}deg)
    `;
  };

  const onMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div
      className={cn("project-3d-wrapper", className)}
      style={{ perspective: "1200px" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={ref}
        className="transition-transform duration-300"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
}

export function CardBody({ children, className }) {
  return (
    <div
      className={cn("project-3d-card", className)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export function CardItem({ children, translateZ = 0, className }) {
  return (
    <div
      className={className}
      style={{ transform: `translateZ(${translateZ}px)` }}
    >
      {children}
    </div>
  );
}
