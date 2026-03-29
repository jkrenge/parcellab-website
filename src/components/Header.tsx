import { useState, useRef, useEffect, useCallback } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { X, Menu, ChevronRight, ArrowRight } from "lucide-preact";

// ─── Navigation Data ───────────────────────────────────────────────

interface NavLink {
  title: string;
  desc?: string;
  href: string;
  icon?: string;
  iconColor?: string;
  iconBg?: string;
  badge?: string;
  badgeColor?: string;
}

interface NavGroup {
  label: string;
  links: NavLink[];
}

interface NavItemConfig {
  label: string;
  href?: string;
  groups?: NavGroup[];
  featured?: {
    label: string;
    title: string;
    desc: string;
    href: string;
    gradient: string;
    accentColor: string;
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
            iconColor: "#035740",
            iconBg: "#035740",
          },
          {
            title: "Engage",
            desc: "Enhance delivery experience with branded tracking",
            href: "/enhance-delivery-experience/",
            icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
            iconColor: "#3D3AD3",
            iconBg: "#3D3AD3",
          },
          {
            title: "Retain",
            desc: "Make returns seamless and drive loyalty",
            href: "/make-returns-seamless/",
            icon: "M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3",
            iconColor: "#EF4444",
            iconBg: "#EF4444",
          },
          {
            title: "Insights",
            desc: "Get data-driven analytics and benchmarks",
            href: "/get-data-driven-insights/",
            icon: "M18 20V10M12 20V4M6 20v-6",
            iconColor: "#FFC943",
            iconBg: "#F59E0B",
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
            icon: "M4 6h16M4 12h16M4 18h16",
            iconColor: "#6B7280",
            iconBg: "#6B7280",
          },
          {
            title: "AI & automation",
            desc: "Intelligent workflow automation",
            href: "/ai-powered-post-purchase/",
            icon: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z",
            iconColor: "#8B5CF6",
            iconBg: "#8B5CF6",
            badge: "New",
            badgeColor: "#8B5CF6",
          },
          {
            title: "App Store",
            desc: "Extend with integrations",
            href: "/app-store/",
            icon: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
            iconColor: "#6B7280",
            iconBg: "#6B7280",
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
          { title: "eCommerce & digital", href: "/ecommerce-and-digital/", icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", iconColor: "#3D3AD3", iconBg: "#3D3AD3" },
          { title: "Operations & Logistics", href: "/operations-and-logistics/", icon: "M1 3h15v13H1zM16 8h4l3 3v5h-7V8z", iconColor: "#035740", iconBg: "#035740" },
          { title: "Customer service", href: "/customer-service/", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", iconColor: "#F59E0B", iconBg: "#F59E0B" },
          { title: "Customer experience", href: "/customer-experience/", icon: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z", iconColor: "#EF4444", iconBg: "#EF4444" },
          { title: "Marketing", href: "/marketing/", icon: "M22 12h-4l-3 9L9 3l-3 9H2", iconColor: "#8B5CF6", iconBg: "#8B5CF6" },
        ],
      },
      {
        label: "By journey stage",
        links: [
          { title: "Pre-purchase", desc: "Convert browsers into buyers", href: "/boost-cart-conversion/" },
          { title: "Post-purchase", desc: "Delight after checkout", href: "/enhance-delivery-experience/" },
          { title: "Returns & loyalty", desc: "Turn returns into retention", href: "/make-returns-seamless/" },
        ],
      },
    ],
    featured: {
      label: "Case study",
      title: "How Wyze cut WISMO by 20%",
      desc: "See how Wyze transformed their post-purchase experience and saved thousands of support hours.",
      href: "/case-studies/wyze/",
      gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      accentColor: "#FFC943",
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
          { title: "Blog", href: "/blog/", icon: "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z", iconColor: "#3D3AD3", iconBg: "#3D3AD3" },
          { title: "Guides", href: "/guide/", icon: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5V5a2 2 0 0 1 2-2h14v14H6.5A2.5 2.5 0 0 0 4 19.5z", iconColor: "#035740", iconBg: "#035740" },
          { title: "Research", href: "/research/", icon: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z", iconColor: "#8B5CF6", iconBg: "#8B5CF6" },
          { title: "Glossary", href: "/glossary/" },
          { title: "Compare", href: "/comparison/" },
          { title: "PPX Maturity Curve", href: "/ppx-maturity-curve/", badge: "Interactive", badgeColor: "#035740" },
        ],
      },
      {
        label: "Connect",
        links: [
          { title: "Live demo", href: "/live-demo/", badge: "Popular", badgeColor: "#EF4444" },
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
          { title: "Why parcelLab", desc: "Our mission and values", href: "/why-parcellab/", icon: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z", iconColor: "#FFC943", iconBg: "#F59E0B" },
          { title: "About us", desc: "Our story and team", href: "/about-us/", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75", iconColor: "#3D3AD3", iconBg: "#3D3AD3" },
          { title: "Leadership", href: "/meet-the-team/" },
          { title: "Careers", href: "/careers/", badge: "Hiring", badgeColor: "#035740" },
          { title: "In the media", href: "/in-the-press/" },
          { title: "Contact", href: "/contact-us/" },
        ],
      },
    ],
  },
];

// ─── Dropdown Panel ────────────────────────────────────────────────

function DropdownPanel({ item, key: panelKey }: { item: NavItemConfig; key?: string }) {
  if (!item.groups) return null;

  const hasFeatured = !!item.featured;
  const hasIcons = item.groups.some((g) => g.links.some((l) => l.icon));

  return (
    <div className="nav-panel-content flex gap-0" key={panelKey}>
      {/* Main content area */}
      <div className={`flex flex-1 gap-12 p-8 pb-7 ${hasFeatured ? "pr-4" : ""}`}>
        {item.groups.map((group, gi) => (
          <div key={group.label} className={`flex flex-col ${hasIcons ? "min-w-[270px]" : "min-w-[190px]"}`}>
            <span className="nav-dropdown-item mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-300" style={{ animationDelay: `${gi * 40}ms` }}>
              {group.label}
            </span>
            <div className="flex flex-col gap-0.5">
              {group.links.map((link, li) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="nav-dropdown-item nav-link-item group flex items-start gap-3.5 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-gray-50/80"
                  style={{ animationDelay: `${(gi * 5 + li) * 35 + 60}ms` }}
                >
                  {link.icon && (
                    <div
                      className="nav-icon-box mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                      style={{
                        backgroundColor: `${link.iconBg || "#6B7280"}12`,
                        // @ts-ignore
                        "--icon-glow": link.iconBg || "#6B7280",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={link.iconColor || "#6B7280"}
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="transition-transform duration-300 group-hover:scale-110"
                      >
                        <path d={link.icon} />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13.5px] font-semibold text-gray-800 transition-colors duration-200 group-hover:text-gray-950">
                        {link.title}
                      </span>
                      {link.badge && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                          style={{ backgroundColor: link.badgeColor || "#3D3AD3" }}
                        >
                          {link.badge}
                        </span>
                      )}
                    </div>
                    {link.desc && (
                      <span className="mt-0.5 block text-[12px] leading-[1.5] text-gray-400 transition-colors duration-200 group-hover:text-gray-500">
                        {link.desc}
                      </span>
                    )}
                  </div>
                  <ArrowRight className="mt-1.5 h-3.5 w-3.5 shrink-0 -translate-x-1 text-gray-200 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-gray-400 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Featured card */}
      {hasFeatured && item.featured && (
        <div className="nav-dropdown-item w-[300px] shrink-0 p-4 pl-0" style={{ animationDelay: "120ms" }}>
          <a
            href={item.featured.href}
            className="nav-featured-card group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:shadow-2xl"
            style={{ background: item.featured.gradient }}
          >
            {/* Decorative elements */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-10" style={{ backgroundColor: item.featured.accentColor }} />
            <div className="pointer-events-none absolute right-12 top-16 h-16 w-16 rounded-full opacity-[0.07]" style={{ backgroundColor: item.featured.accentColor }} />
            <div className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 rounded-full opacity-[0.05]" style={{ backgroundColor: item.featured.accentColor }} />

            <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]" style={{ backgroundColor: `${item.featured.accentColor}22`, color: item.featured.accentColor }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.featured.accentColor }} />
              {item.featured.label}
            </span>
            <span className="mb-2 text-[17px] font-bold leading-snug text-white">
              {item.featured.title}
            </span>
            <span className="text-[12.5px] leading-[1.55] text-white/55">
              {item.featured.desc}
            </span>
            <span
              className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-bold transition-all duration-300 group-hover:gap-2.5 group-hover:shadow-lg"
              style={{ backgroundColor: item.featured.accentColor, color: "#1a1a2e" }}
            >
              Read case study
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
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
  const [prevDropdown, setPrevDropdown] = useState<number | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hover pill position
  const [hoverPill, setHoverPill] = useState<{ left: number; width: number } | null>(null);

  const openDropdown = useCallback(
    (index: number) => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }

      const item = NAV_ITEMS[index];
      if (!item.groups) return;

      hoverTimeoutRef.current = setTimeout(
        () => {
          setPrevDropdown(activeDropdown);
          setActiveDropdown(index);

          // Update hover pill position
          const btn = itemRefs.current[index];
          const nav = navRef.current;
          if (btn && nav) {
            const btnRect = btn.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();
            setHoverPill({
              left: btnRect.left - navRect.left,
              width: btnRect.width,
            });
          }
        },
        activeDropdown !== null ? 0 : 100
      );
    },
    [activeDropdown]
  );

  const handleItemHover = useCallback(
    (index: number) => {
      // Update hover pill for ALL items (including direct links)
      const btn = itemRefs.current[index];
      const nav = navRef.current;
      if (btn && nav) {
        const btnRect = btn.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        setHoverPill({
          left: btnRect.left - navRect.left,
          width: btnRect.width,
        });
      }

      const item = NAV_ITEMS[index];
      if (item.groups) {
        openDropdown(index);
      } else {
        // Direct link — close any open dropdown
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
        setActiveDropdown(null);
      }
    },
    [openDropdown]
  );

  const closeDropdown = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoverPill(null);
    }, 200);
  }, []);

  const handleDropdownMouseEnter = useCallback(() => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setHoverPill(null);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);

  return (
    <>
      {/* Announcement Banner */}
      {bannerVisible && (
        <div
          className="nav-banner relative w-full px-5 py-3.5"
          style={{ background: "linear-gradient(90deg, #1d1d1d 0%, #2a2a2a 50%, #1d1d1d 100%)" }}
        >
          <div className="flex items-center justify-center gap-2 text-[13px] text-white/90">
            <span className="inline-flex h-5 items-center rounded-full bg-[#3D3AD3] px-2 text-[10px] font-bold uppercase tracking-wider text-white">New</span>
            <span>
              Join our newsletter for post-purchase and CX insights{" "}
              <a href="#" className="font-semibold text-white underline decoration-white/30 underline-offset-2 transition-all hover:decoration-white">
                Subscribe &rarr;
              </a>
            </span>
          </div>
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-white/40 transition-all hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Navigation */}
      <header
        className="sticky top-0 left-0 right-0 z-50 bg-white/[0.97] backdrop-blur-xl"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <nav
          ref={navRef}
          className="relative mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 xl:px-12"
          onMouseLeave={closeDropdown}
        >
          {/* Logo */}
          <a href="/" className="shrink-0 transition-opacity hover:opacity-80">
            <img src={`${import.meta.env.BASE_URL}/images/logos/parcelab-logo-white-1.svg`} alt="parcelLab" width={132} height={44} />
          </a>

          {/* Desktop Nav Items */}
          <div className="relative hidden items-center gap-0.5 xl:flex">
            {/* Sliding hover pill */}
            {hoverPill && (
              <div
                className="nav-hover-pill absolute top-0 h-full rounded-lg bg-gray-100/70"
                style={{
                  left: `${hoverPill.left - (navRef.current?.querySelector('.xl\\:flex')?.getBoundingClientRect().left || 0) + (navRef.current?.getBoundingClientRect().left || 0)}px`,
                  width: `${hoverPill.width}px`,
                  transform: "translateY(0)",
                }}
              />
            )}

            {NAV_ITEMS.map((item, i) =>
              item.href ? (
                <a
                  key={item.label}
                  ref={(el: HTMLAnchorElement | null) => { itemRefs.current[i] = el; }}
                  href={item.href}
                  className="relative z-10 rounded-lg px-3.5 py-2 text-[13px] font-medium text-gray-500 transition-colors hover:text-gray-900"
                  onMouseEnter={() => handleItemHover(i)}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.label}
                  ref={(el: HTMLButtonElement | null) => { itemRefs.current[i] = el; }}
                  className={`relative z-10 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
                    activeDropdown === i ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                  }`}
                  onMouseEnter={() => handleItemHover(i)}
                  onClick={() => activeDropdown === i ? closeDropdown() : openDropdown(i)}
                >
                  {item.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className={`ml-1 inline-block transition-transform duration-300 ${activeDropdown === i ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              )
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <a href="#" className="hidden text-[13px] font-medium text-gray-500 transition-colors hover:text-gray-900 sm:inline-block">
              Log in
            </a>
            <a href="#" className="nav-cta-btn hidden rounded-full bg-[#3D3AD3] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#3230b8] active:scale-[0.97] sm:inline-block">
              Book a demo
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 xl:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* ─── Dropdown Container ─── */}
          {activeDropdown !== null && NAV_ITEMS[activeDropdown].groups && (
            <div
              ref={dropdownRef}
              className="nav-dropdown-container absolute top-full left-0 right-0 z-50 pt-3"
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={closeDropdown}
            >
              <div className="nav-dropdown-panel relative mx-auto max-w-[1440px] overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-2xl shadow-black/[0.12] xl:mx-12">
                {/* Subtle top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3D3AD3]/40 to-transparent" />
                <DropdownPanel item={NAV_ITEMS[activeDropdown]} />
              </div>
            </div>
          )}
        </nav>

        {/* ─── Backdrop overlay ─── */}
        {activeDropdown !== null && (
          <div className="nav-backdrop fixed inset-0 -z-10 bg-black/5 backdrop-blur-[2px]" onClick={closeDropdown} />
        )}

        {/* ─── Mobile Menu ─── */}
        {mobileMenuOpen && (
          <div className="nav-mobile-menu border-t border-gray-100 bg-white px-6 pb-6 xl:hidden">
            <div className="flex flex-col gap-1 pt-3">
              {NAV_ITEMS.map((item, i) =>
                item.href ? (
                  <a key={item.label} href={item.href} className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                    {item.label}
                  </a>
                ) : (
                  <div key={item.label}>
                    <button
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      onClick={() => setMobileExpanded(mobileExpanded === i ? null : i)}
                    >
                      {item.label}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`text-gray-400 transition-transform duration-200 ${mobileExpanded === i ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                    {mobileExpanded === i && item.groups && (
                      <div className="mb-2 ml-4 flex flex-col gap-1 border-l-2 border-gray-100 pl-4">
                        {item.groups.map((group) => (
                          <div key={group.label}>
                            <span className="mb-1 block px-2 pt-2 text-[10px] font-bold uppercase tracking-widest text-gray-300">{group.label}</span>
                            {group.links.map((link) => (
                              <a key={link.title} href={link.href} className="flex items-center gap-2 rounded-lg px-2 py-2 text-[13px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
                                {link.icon && (
                                  <span className="flex h-6 w-6 items-center justify-center rounded-md" style={{ backgroundColor: `${link.iconBg || "#6B7280"}15` }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={link.iconColor || "#6B7280"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d={link.icon} /></svg>
                                  </span>
                                )}
                                {link.title}
                                {link.badge && <span className="rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white" style={{ backgroundColor: link.badgeColor || "#3D3AD3" }}>{link.badge}</span>}
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
              <a href="#" className="px-4 py-3 text-sm text-gray-700">Log in</a>
              <a href="#" className="mt-1 block rounded-full bg-[#3D3AD3] px-6 py-3 text-center text-sm font-semibold text-white">Book a demo</a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
