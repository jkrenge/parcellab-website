import { useCallback, useRef, useState } from "preact/hooks";
import { ArrowRight, BarChart3, ShoppingCart, Sparkles } from "lucide-preact";
import type { ComponentChildren } from "preact";

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

interface ProductCard {
  id: string;
  label: string;
  title: string;
  description: string;
  cta: string;
  bgColor: string;
  pillColor: string;
  image: string;
  icon: ComponentChildren;
}

const base = import.meta.env.BASE_URL;

const cards: ProductCard[] = [
  {
    id: "retain",
    label: "Retain",
    title: "Retain",
    description: "Every return is an opportunity to re-engage & resell",
    cta: "See returns",
    bgColor: "bg-[#EF4444]",
    pillColor: "bg-[#EF4444]",
    image: `${base}/images/parcellab-returns-solution-retain.webp`,
    icon: <ShoppingCart className="h-4 w-4 text-[#EF4444]" />,
  },
  {
    id: "engage",
    label: "Engage",
    title: "Engage",
    description: "Keep shoppers connected with timely, branded updates",
    cta: "Explore delivery experience",
    bgColor: "bg-[#FFC943]",
    pillColor: "bg-[#FFC943]",
    image: `${base}/images/parcellab-engage-delivery-notifications-tracking-page.webp`,
    icon: <ShoppingCart className="h-4 w-4 text-[#FFC943]" />,
  },
  {
    id: "convert",
    label: "Convert",
    title: "Convert",
    description: "Boost cart conversions with delivery promises",
    cta: "Get converting",
    bgColor: "bg-[#035740]",
    pillColor: "bg-[#035740]",
    image: `${base}/images/parcellab-engage-estimated-delivery-date.webp`,
    icon: <ShoppingCart className="h-4 w-4 text-[#035740]" />,
  },
  {
    id: "insights",
    label: "Insights",
    title: "Insights",
    description: "Benchmark and optimize with real-time analytics",
    cta: "Explore insights",
    bgColor: "bg-[#5046E5]",
    pillColor: "bg-[#5046E5]",
    image: `${base}/images/parcellab-data-logistics-analytics.webp`,
    icon: <BarChart3 className="h-4 w-4 text-[#5046E5]" />,
  },
  {
    id: "ai-agents",
    label: "AI Agents",
    title: "AI Agents",
    description: "Automate workflows with intelligent AI agents",
    cta: "Discover AI agents",
    bgColor: "bg-[#1e1b4b]",
    pillColor: "bg-[#1e1b4b]",
    image: `${base}/images/parcellab-AI-shipping-artificial-intelligence.webp`,
    icon: <Sparkles className="h-4 w-4 text-[#1e1b4b]" />,
  },
];

function ImageOrPlaceholder({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="h-full w-full rounded-xl bg-white/20" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full rounded-xl object-cover object-top"
      onError={() => setHasError(true)}
    />
  );
}

export function ProductCards() {
  const [activeTab, setActiveTab] = useState("retain");
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const setCardRef = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      if (el) {
        cardRefs.current.set(id, el);
      } else {
        cardRefs.current.delete(id);
      }
    },
    []
  );

  const scrollToCard = useCallback((id: string) => {
    setActiveTab(id);
    const card = cardRefs.current.get(id);
    const container = scrollRef.current;
    if (card && container) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const scrollLeft =
        container.scrollLeft +
        cardRect.left -
        containerRect.left -
        48;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, []);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-12">
        {/* Tab Pills */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => scrollToCard(card.id)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                activeTab === card.id
                  ? cn(card.pillColor, "text-white")
                  : "text-gray-800 hover:bg-gray-100"
              )}
            >
              {card.label}
            </button>
          ))}
        </div>

        {/* Cards Row */}
        <div
          ref={scrollRef}
          className="scrollbar-none -mx-5 flex gap-6 overflow-x-auto px-5 md:-mx-12 md:px-12"
        >
          {cards.map((card) => (
            <div
              key={card.id}
              ref={setCardRef(card.id)}
              className={cn(
                "relative flex min-h-[600px] w-[340px] shrink-0 flex-col overflow-hidden rounded-3xl p-8 md:w-[380px]",
                card.bgColor
              )}
            >
              {/* Icon */}
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-white">
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="mb-3 text-2xl font-medium text-white">
                {card.title}
              </h3>

              {/* Description */}
              <p className="mb-5 text-lg leading-relaxed text-white/90">
                {card.description}
              </p>

              {/* CTA */}
              <a
                href={`https://parcellab.com/${card.id === "retain" ? "make-returns-seamless" : card.id === "engage" ? "enhance-delivery-experience" : card.id === "convert" ? "boost-cart-conversion" : card.id === "insights" ? "get-data-driven-insights" : "ai-powered-post-purchase"}/`}
                className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-white"
              >
                {card.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Image */}
              <div className="relative mt-auto h-[280px] w-[calc(100%+32px)] translate-x-2 rotate-[-2deg] md:h-[320px]">
                <ImageOrPlaceholder src={card.image} alt={card.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
