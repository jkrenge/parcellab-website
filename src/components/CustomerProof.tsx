import { useRef, useCallback, useState, useEffect } from "preact/hooks";
import { ChevronLeft, ChevronRight } from "lucide-preact";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface BrandCard {
  name: string;
  color: string;
  textColor?: string;
}

interface StatCard {
  stat: string;
  label: string;
  quote: string;
  bg: string;
  textColor?: string;
  statColor?: string;
}

const brandCards: BrandCard[] = [
  { name: "Conrad", color: "#1a1a2e" },
  { name: "New Look", color: "#0d0d0d" },
  { name: "True Classic", color: "#2c3e50" },
  { name: "Farfetch", color: "#1c1c1c" },
  { name: "Bose", color: "#2d2d2d" },
  { name: "Lidl", color: "#0050aa" },
  { name: "Nespresso", color: "#3b2f2f" },
  { name: "PUMA", color: "#1a1a1a" },
];

const statCards: StatCard[] = [
  {
    stat: "6,427",
    label: "Man hours saved",
    quote:
      "Our returns portal has saved thousands of hours for our customer service team, letting them focus on higher-value interactions.",
    bg: "#e8e6ff",
    statColor: "#3D3AD3",
  },
  {
    stat: "5%",
    label: "Increased revenue",
    quote:
      "Seamless post-purchase updates keep customers engaged and drive repeat purchases through timely, relevant communications.",
    bg: "#ffffff",
  },
  {
    stat: "29%",
    label: "Revenue growth per email",
    quote:
      "Every touchpoint is an opportunity. Personalised shipping notifications became our highest-converting channel.",
    bg: "#ffffff",
  },
  {
    stat: "20%",
    label: "Decreased WISMO",
    quote:
      "Proactive operations updates drastically reduced 'where is my order' calls, freeing up support bandwidth.",
    bg: "#3D3AD3",
    textColor: "#ffffff",
    statColor: "#ffffff",
  },
  {
    stat: "35%",
    label: "Higher open rates",
    quote:
      "Branded tracking pages outperform generic carrier pages, creating a seamless brand experience post-purchase.",
    bg: "#e8e6ff",
    statColor: "#3D3AD3",
  },
  {
    stat: "12%",
    label: "Repeat purchase rate",
    quote:
      "Post-purchase engagement turned one-time buyers into loyal customers with targeted follow-up campaigns.",
    bg: "#ffffff",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function BrandImageCard({ card }: { card: BrandCard }) {
  return (
    <div
      className="relative flex h-[220px] w-[440px] shrink-0 items-center justify-center overflow-hidden rounded-2xl"
      style={{ backgroundColor: card.color }}
    >
      <span
        className="text-2xl font-bold tracking-wide"
        style={{ color: card.textColor ?? "#ffffff" }}
      >
        {card.name}
      </span>
    </div>
  );
}

function StatCardComponent({ card }: { card: StatCard }) {
  const textColor = card.textColor ?? "#1a1a1a";
  const statColor = card.statColor ?? "#1a1a1a";

  return (
    <div
      className="flex h-[280px] w-[440px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl p-8"
      style={{ backgroundColor: card.bg, color: textColor }}
    >
      <div>
        <p
          className="text-[72px] leading-none font-bold tracking-tight"
          style={{ color: statColor }}
        >
          {card.stat}
        </p>
        <p className="mt-2 text-base font-medium">{card.label}</p>
      </div>
      <p className="text-sm leading-relaxed italic opacity-70">{card.quote}</p>
    </div>
  );
}

function NavArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Scroll ${direction}`}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function CustomerProof() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 460;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Heading area */}
        <div className="mb-16 max-w-3xl">
          <h2 className="text-[50px] leading-[60px] font-medium tracking-[-1.5px] text-black">
            Proof that post-purchase drives growth
          </h2>
          <p className="mt-4 text-lg text-[#666666]">
            Real brands. Real results. Discover how leaders cut costs, grew
            revenue, and improved loyalty.
          </p>
          <a
            href="https://parcellab.com/case-studies/"
            className="mt-8 inline-flex items-center rounded-full bg-[#3D3AD3] px-6 py-4 text-base font-medium text-white transition-colors hover:bg-[#3230b8]"
          >
            View all customer stories
          </a>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation arrows */}
          <div className="mb-6 flex items-center justify-end gap-3">
            <NavArrow
              direction="left"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
            />
            <NavArrow
              direction="right"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
            />
          </div>

          {/* Scrollable rows */}
          <div
            ref={scrollRef}
            className="-mx-6 overflow-x-auto px-6 md:-mx-12 md:px-12"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Top row: Brand image cards */}
            <div className="flex gap-5 pb-5">
              {brandCards.map((card) => (
                <BrandImageCard key={card.name} card={card} />
              ))}
            </div>

            {/* Bottom row: Stat cards */}
            <div className="flex gap-5">
              {statCards.map((card) => (
                <StatCardComponent key={card.stat + card.label} card={card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
