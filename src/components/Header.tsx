import { useState } from "preact/hooks";
import { X, Menu } from "lucide-preact";

const NAV_ITEMS = [
  "Platform",
  "AI Agents",
  "Solutions",
  "Customers",
  "Resources",
  "Company",
] as const;

export function Header() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {bannerVisible && (
        <div
          className="relative w-full px-5 py-5"
          style={{
            background:
              "linear-gradient(90deg, rgb(29, 29, 29), rgb(63, 63, 63))",
          }}
        >
          <div className="flex items-center justify-center text-base text-white">
            <span>
              Join our newsletter for post-purchase and CX insights{" "}
              <a href="#" className="font-medium underline">
                Subscribe
              </a>
            </span>
          </div>
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white transition-colors hover:text-white/70"
            aria-label="Close announcement banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <header
        className="sticky top-0 left-0 right-0 z-50 bg-white"
        style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.05)" }}
      >
        <div className="mx-auto flex h-[81px] max-w-[1440px] items-center justify-between px-6 py-4 xl:px-12">
          <a href="/" className="shrink-0">
            <img
              src="/images/logos/parcelab-logo-white-1.svg"
              alt="parcelLab"
              width={144}
              height={48}
            />
          </a>

          <nav className="hidden items-center gap-4 xl:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                className="rounded-xl px-3 py-2 text-sm font-normal text-black transition-colors hover:bg-gray-100"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hidden text-sm text-black transition-colors hover:text-black/70 sm:inline-block"
            >
              Log in
            </a>
            <a
              href="#"
              className="hidden rounded-full bg-[#3D3AD3] px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 sm:inline-block"
            >
              Book a demo
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-black xl:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-gray-100 bg-white px-6 pb-6 xl:hidden">
            <div className="flex flex-col gap-2 pt-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  className="rounded-xl px-3 py-3 text-left text-sm font-normal text-black transition-colors hover:bg-gray-100"
                >
                  {item}
                </button>
              ))}
              <hr className="my-2 border-gray-100" />
              <a href="#" className="px-3 py-3 text-sm text-black">
                Log in
              </a>
              <a
                href="#"
                className="mt-2 block rounded-full bg-[#3D3AD3] px-6 py-3 text-center text-sm font-semibold text-white"
              >
                Book a demo
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
