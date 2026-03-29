import { useState, useRef, useEffect, useCallback } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { X, Menu, ChevronRight } from "lucide-preact";

// ─── Navigation Data ───────────────────────────────────────────────

interface NavLink {
  title: string;
  desc?: string;
  href: string;
  icon?: string; // SVG path data
  badge?: string;
}

interface NavGroup {
  label: string;
  links: NavLink[];
}

interface NavItemConfig {
  label: string;
  href?: string; // direct link (no dropdown)
  groups?: NavGroup[];
  featured?: {
    label: string;
    title: string;
    desc: string;
    href: string;
    bgColor: string;
  };
}

const NAV_ITEMS: NavItemConfig[] = [
  {
    label: "Platform",
    groups: [
      {
        label: "Products",
        links: [
          {
            title: "Convert",
            desc: "Boost cart conversion with delivery promises",
            href: "/boost-cart-conversion/",
            icon: "M3 3h18v18H3zM12 8v8m-4-4h8",
          },
          {
            title: "Engage",
            desc: "Enhance delivery experience with branded tracking",
            href: "/enhance-delivery-experience/",
            icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
          },
          {
            title: "Retain",
            desc: "Make returns seamless and drive loyalty",
            href: "/make-returns-seamless/",
            icon: "M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3",
          },
          {
            title: "Insights",
            desc: "Get data-driven analytics and benchmarks",
            href: "/get-data-driven-insights/",
            icon: "M18 20V10M12 20V4M6 20v-6",
          },
        ],
      },
      {
        label: "Capabilities",
        links: [
          {
            title: "Platform overview",
            desc: "See all platform features",
            href: "/post-purchase-platform/",
          },
          {
            title: "AI & automation",
            desc: "Intelligent workflow automation",
            href: "/ai-powered-post-purchase/",
            badge: "New",
          },
          {
            title: "App Store",
            desc: "Extend with integrations",
            href: "/app-store/",
          },
        ],
      },
    ],
  },
  {
    label: "AI Agents",
    href: "/ai-powered-post-purchase/",
  },
  {
    label: "Solutions",
    groups: [
      {
        label: "By role",
        links: [
          { title: "eCommerce & digital", href: "/ecommerce-and-digital/" },
          {
            title: "Operations & Logistics",
            href: "/operations-and-logistics/",
          },
          { title: "Customer service", href: "/customer-service/" },
          { title: "Customer experience", href: "/customer-experience/" },
          { title: "Marketing", href: "/marketing/" },
        ],
      },
      {
        label: "By journey stage",
        links: [
          {
            title: "Pre-purchase",
            desc: "Convert browsers into buyers",
            href: "/boost-cart-conversion/",
          },
          {
            title: "Post-purchase",
            desc: "Delight after checkout",
            href: "/enhance-delivery-experience/",
          },
          {
            title: "Returns & loyalty",
            desc: "Turn returns into retention",
            href: "/make-returns-seamless/",
          },
        ],
      },
    ],
    featured: {
      label: "Case study",
      title: "How Wyze cut WISMO by 20%",
      desc: "See how Wyze transformed their post-purchase experience",
      href: "/case-studies/wyze/",
      bgColor: "#1a1a2e",
    },
  },
  {
    label: "Customers",
    href: "/case-studies/",
  },
  {
    label: "Resources",
    groups: [
      {
        label: "Learn",
        links: [
          { title: "Blog", href: "/blog/" },
          { title: "Guides", href: "/guide/" },
          { title: "Research", href: "/research/" },
          { title: "Glossary", href: "/glossary/" },
          { title: "Compare", href: "/comparison/" },
          { title: "PPX Maturity Curve", href: "/ppx-maturity-curve/" },
        ],
      },
      {
        label: "Connect",
        links: [
          { title: "Live demo", href: "/live-demo/", badge: "Popular" },
          { title: "Webinars", href: "/webinars/" },
          { title: "Events", href: "/events/" },
          { title: "Press", href: "/press/" },
        ],
      },
      {
        label: "Support",
        links: [
          { title: "Developer resources", href: "#" },
          { title: "Partners & integrations", href: "#" },
          { title: "System status", href: "#" },
          { title: "Contact us", href: "/contact-us/" },
        ],
      },
    ],
  },
  {
    label: "Company",
    groups: [
      {
        label: "About",
        links: [
          {
            title: "Why parcelLab",
            desc: "Our mission and values",
            href: "/why-parcellab/",
          },
          {
            title: "About us",
            desc: "Our story and team",
            href: "/about-us/",
          },
          { title: "Leadership", href: "/meet-the-team/" },
          { title: "Careers", href: "/careers/", badge: "Hiring" },
          { title: "In the media", href: "/in-the-press/" },
          { title: "Contact", href: "/contact-us/" },
        ],
      },
    ],
  },
];

// ─── Dropdown Panel ────────────────────────────────────────────────

function DropdownPanel({ item }: { item: NavItemConfig }) {
  if (!item.groups) return null;

  const hasMultipleGroups = item.groups.length > 1;
  const hasFeatured = !!item.featured;
  const hasIcons = item.groups.some((g) =>
    g.links.some((l) => l.icon || l.desc)
  );

  return (
    <div className="flex gap-0">
      {/* Main content area */}
      <div
        className={`flex flex-1 gap-10 p-8 ${hasFeatured ? "pr-0" : ""}`}
      >
        {item.groups.map((group, gi) => (
          <div
            key={group.label}
            className={`flex flex-col ${hasMultipleGroups && !hasIcons ? "min-w-[180px]" : hasIcons ? "min-w-[260px]" : "min-w-[200px]"}`}
          >
            <span className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">
              {group.label}
            </span>
            <div className="flex flex-col gap-0.5">
              {group.links.map((link, li) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="nav-dropdown-item group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50"
                  style={{ animationDelay: `${(gi * 4 + li) * 30}ms` }}
                >
                  {link.icon && (
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 transition-colors group-hover:bg-[#3D3AD3]/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="text-gray-500 transition-colors group-hover:text-[#3D3AD3]"
                      >
                        <path d={link.icon} />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-medium text-gray-900 transition-colors group-hover:text-[#3D3AD3]">
                        {link.title}
                      </span>
                      {link.badge && (
                        <span className="rounded-full bg-[#3D3AD3]/10 px-2 py-0.5 text-[10px] font-semibold text-[#3D3AD3]">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    {link.desc && (
                      <span className="mt-0.5 block text-[12px] leading-[1.4] text-gray-400 transition-colors group-hover:text-gray-500">
                        {link.desc}
                      </span>
                    )}
                  </div>
                  <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-gray-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-[#3D3AD3] group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Featured card */}
      {hasFeatured && item.featured && (
        <div className="w-[280px] shrink-0 p-4 pl-0">
          <a
            href={item.featured.href}
            className="group flex h-full flex-col justify-end overflow-hidden rounded-2xl p-6 transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: item.featured.bgColor }}
          >
            <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50">
              {item.featured.label}
            </span>
            <span className="mb-1 text-[15px] font-semibold leading-snug text-white">
              {item.featured.title}
            </span>
            <span className="text-[12px] leading-[1.4] text-white/60">
              {item.featured.desc}
            </span>
            <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-white/80 transition-colors group-hover:text-white">
              Read case study
              <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Main Header ───────────────────────────────────────────────────

export function Header() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [dropdownRect, setDropdownRect] = useState<{
    left: number;
    width: number;
  } | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track if dropdown was ever opened (for initial animation)
  const [hasOpened, setHasOpened] = useState(false);

  const openDropdown = useCallback(
    (index: number) => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }

      const item = NAV_ITEMS[index];
      if (!item.groups) return; // Direct link, no dropdown

      hoverTimeoutRef.current = setTimeout(
        () => {
          setActiveDropdown(index);
          if (!hasOpened) setHasOpened(true);

          // Calculate position relative to nav
          const btn = itemRefs.current[index];
          const nav = navRef.current;
          if (btn && nav) {
            const btnRect = btn.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();
            setDropdownRect({
              left: btnRect.left - navRect.left + btnRect.width / 2,
              width: btnRect.width,
            });
          }
        },
        activeDropdown !== null ? 0 : 80
      ); // Faster when already open
    },
    [activeDropdown, hasOpened]
  );

  const closeDropdown = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setDropdownRect(null);
    }, 150);
  }, []);

  const handleNavMouseLeave = useCallback(() => {
    closeDropdown();
  }, [closeDropdown]);

  const handleDropdownMouseEnter = useCallback(() => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  }, []);

  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setDropdownRect(null);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Mobile menu accordion state
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);

  return (
    <>
      {/* Announcement Banner */}
      {bannerVisible && (
        <div
          className="relative w-full px-5 py-4"
          style={{
            background:
              "linear-gradient(90deg, rgb(29, 29, 29), rgb(63, 63, 63))",
          }}
        >
          <div className="flex items-center justify-center text-sm text-white">
            <span>
              Join our newsletter for post-purchase and CX insights{" "}
              <a
                href="#"
                className="font-medium underline decoration-white/40 underline-offset-2 transition-colors hover:decoration-white"
              >
                Subscribe
              </a>
            </span>
          </div>
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close announcement banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Navigation */}
      <header
        className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md"
        style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}
      >
        <nav
          ref={navRef}
          className="relative mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 xl:px-12"
          onMouseLeave={handleNavMouseLeave}
        >
          {/* Logo */}
          <a href="/" className="shrink-0">
            <img
              src="/images/logos/parcelab-logo-white-1.svg"
              alt="parcelLab"
              width={132}
              height={44}
            />
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden items-center gap-1 xl:flex">
            {NAV_ITEMS.map((item, i) =>
              item.href ? (
                <a
                  key={item.label}
                  ref={(el: HTMLAnchorElement | null) => {
                    itemRefs.current[i] = el;
                  }}
                  href={item.href}
                  className="relative rounded-lg px-3.5 py-2 text-[13px] font-medium text-gray-600 transition-colors hover:text-gray-900"
                  onMouseEnter={() => closeDropdown()}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.label}
                  ref={(el: HTMLButtonElement | null) => {
                    itemRefs.current[i] = el;
                  }}
                  className={`relative rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
                    activeDropdown === i
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onMouseEnter={() => openDropdown(i)}
                  onClick={() =>
                    activeDropdown === i
                      ? closeDropdown()
                      : openDropdown(i)
                  }
                >
                  {item.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className={`ml-1 inline-block transition-transform duration-200 ${activeDropdown === i ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              )
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden text-[13px] font-medium text-gray-600 transition-colors hover:text-gray-900 sm:inline-block"
            >
              Log in
            </a>
            <a
              href="#"
              className="hidden rounded-full bg-[#3D3AD3] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm shadow-[#3D3AD3]/25 transition-all hover:bg-[#3230b8] hover:shadow-md hover:shadow-[#3D3AD3]/30 active:scale-[0.98] sm:inline-block"
            >
              Book a demo
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 xl:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* ─── Dropdown Container (Stripe-style morphing) ─── */}
          {activeDropdown !== null && NAV_ITEMS[activeDropdown].groups && (
            <div
              ref={dropdownRef}
              className="nav-dropdown-container absolute top-full left-0 right-0 z-50 pt-2"
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleNavMouseLeave}
            >
              <div
                className="nav-dropdown-panel mx-auto max-w-[1440px] overflow-hidden rounded-2xl border border-gray-200/80 bg-white px-6 shadow-xl shadow-black/[0.08] xl:px-12"
              >
                <DropdownPanel item={NAV_ITEMS[activeDropdown]} />
              </div>
            </div>
          )}
        </nav>

        {/* ─── Mobile Menu ─── */}
        {mobileMenuOpen && (
          <div className="nav-mobile-menu border-t border-gray-100 bg-white px-6 pb-6 xl:hidden">
            <div className="flex flex-col gap-1 pt-3">
              {NAV_ITEMS.map((item, i) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    {item.label}
                  </a>
                ) : (
                  <div key={item.label}>
                    <button
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === i ? null : i)
                      }
                    >
                      {item.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className={`text-gray-400 transition-transform duration-200 ${mobileExpanded === i ? "rotate-180" : ""}`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    {mobileExpanded === i && item.groups && (
                      <div className="mb-2 ml-4 flex flex-col gap-1 border-l-2 border-gray-100 pl-4">
                        {item.groups.map((group) => (
                          <div key={group.label}>
                            <span className="mb-1 block px-2 pt-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                              {group.label}
                            </span>
                            {group.links.map((link) => (
                              <a
                                key={link.title}
                                href={link.href}
                                className="block rounded-lg px-2 py-2 text-[13px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                              >
                                {link.title}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
              <hr className="my-2 border-gray-100" />
              <a href="#" className="px-4 py-3 text-sm text-gray-700">
                Log in
              </a>
              <a
                href="#"
                className="mt-1 block rounded-full bg-[#3D3AD3] px-6 py-3 text-center text-sm font-semibold text-white"
              >
                Book a demo
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
