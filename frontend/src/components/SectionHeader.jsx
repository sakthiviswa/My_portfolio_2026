export default function SectionHeader({ eyebrow, title, highlight }) {
    return (
      <div className="text-center mb-2">
        <p className="font-cinzel text-[10px] tracking-[0.22em] text-gold font-bold mb-2 uppercase">
          {eyebrow}
        </p>
        <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-[#f5e6ff] leading-tight">
          {title} <span className="text-gold">{highlight}</span>
        </h2>
        <div className="gold-divider" />
      </div>
    );
  }