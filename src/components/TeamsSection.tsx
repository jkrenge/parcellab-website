import { useRef, useState, useCallback, useEffect } from "preact/hooks";
import { ChevronLeft, ChevronRight } from "lucide-preact";

interface TeamCard {
  image: string;
  title: string;
  description: string;
}

const base = import.meta.env.BASE_URL;

const teams: TeamCard[] = [
  {
    image: `${base}/images/ecommerce-digital.webp`,
    title: "eCommerce & digital",
    description: "Boost sales, build loyalty, and drive more repeat purchases.",
  },
  {
    image: `${base}/images/Operations-logistics-1.webp`,
    title: "Operations & Logistics",
    description: "Improve visibility, cut costs, and manage exceptions.",
  },
  {
    image: `${base}/images/customer-service-1.webp`,
    title: "Customer service",
    description: "Fewer WISMO/WISMR calls, more time for value support.",
  },
  {
    image: `${base}/images/Marketing.webp`,
    title: "Marketing",
    description:
      "Drive engagement with personalized post-purchase campaigns.",
  },
];

function CardImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex h-[250px] w-full items-center justify-center rounded-t-2xl bg-gray-200">
        <span className="text-sm text-gray-500">{alt}</span>
      </div>
    );
  }

  return (
    <div className="relative h-[250px] w-full overflow-hidden rounded-t-2xl">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export function TeamsSection() {
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
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 430 + 24; // card width + gap
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="section-standard">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Heading area */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-display" style={{ color: "var(--ink)" }}>
            Built for every retail team
          </h2>
          <p className="mt-4 max-w-[540px] text-lg font-light" style={{ color: "var(--ink-secondary)" }}>
            Every team wins: empower eCommerce, logistics, service, and
            marketing to perform better together.
          </p>
        </div>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="absolute -left-5 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#ddd] bg-white transition-opacity hover:shadow-md disabled:pointer-events-none disabled:opacity-0 md:flex"
            style={{ width: 40, height: 40 }}
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#ddd] bg-white transition-opacity hover:shadow-md disabled:pointer-events-none disabled:opacity-0 md:flex"
            style={{ width: 40, height: 40 }}
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>

          {/* Scrollable card row */}
          <div
            ref={scrollRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto md:snap-none"
          >
            {teams.map((team) => (
              <div
                key={team.title}
                className="w-[85vw] min-w-[85vw] snap-start overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-raised)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:w-[430px] md:min-w-[430px]"
              >
                <CardImage src={team.image} alt={team.title} />
                <div className="p-6">
                  <h3 className="mb-2 text-2xl font-semibold text-black">
                    {team.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-500">
                    {team.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
