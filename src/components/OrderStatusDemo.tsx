import { useState } from "preact/hooks";

// ─── Types ────────────────────────────────────────────────────────────

interface Checkpoint {
  date: string;
  time: string;
  status: string;
  detail: string;
  location?: string;
}

interface Product {
  name: string;
  price: string;
  image: string;
  qty: number;
}

interface RecommendedProduct {
  name: string;
  price: string;
  image: string;
}

// ─── Data ─────────────────────────────────────────────────────────────

const STATUS_STEPS = ["Ordered", "In Transit", "Out for Delivery", "Delivered"] as const;

const CHECKPOINTS_BY_STATUS: Record<number, Checkpoint[]> = {
  0: [
    { date: "04/10/2026", time: "3:00 PM", status: "Order processed", detail: "The order has been processed.", location: undefined },
  ],
  1: [
    { date: "04/12/2026", time: "2:15 PM", status: "In transit", detail: "The package is on the way.", location: "Newark, US" },
    { date: "04/11/2026", time: "9:30 AM", status: "Dispatched", detail: "The goods have been sent.", location: "Warehouse, US" },
    { date: "04/10/2026", time: "3:00 PM", status: "Order processed", detail: "The order has been processed.", location: undefined },
  ],
  2: [
    { date: "04/14/2026", time: "8:45 AM", status: "Out for delivery", detail: "The package is out for delivery.", location: "Manhattan, US" },
    { date: "04/13/2026", time: "11:10 PM", status: "Arrived at local facility", detail: "Package arrived at the local distribution center.", location: "New York, US" },
    { date: "04/12/2026", time: "2:15 PM", status: "In transit", detail: "The package is on the way.", location: "Newark, US" },
    { date: "04/11/2026", time: "9:30 AM", status: "Dispatched", detail: "The goods have been sent.", location: "Warehouse, US" },
    { date: "04/10/2026", time: "3:00 PM", status: "Order processed", detail: "The order has been processed.", location: undefined },
  ],
  3: [
    { date: "04/14/2026", time: "12:05 PM", status: "Delivered", detail: "The package has been delivered.", location: "Manhattan, US" },
    { date: "04/14/2026", time: "8:45 AM", status: "Out for delivery", detail: "The package is out for delivery.", location: "Manhattan, US" },
    { date: "04/13/2026", time: "11:10 PM", status: "Arrived at local facility", detail: "Package arrived at the local distribution center.", location: "New York, US" },
    { date: "04/12/2026", time: "2:15 PM", status: "In transit", detail: "The package is on the way.", location: "Newark, US" },
    { date: "04/11/2026", time: "9:30 AM", status: "Dispatched", detail: "The goods have been sent.", location: "Warehouse, US" },
    { date: "04/10/2026", time: "3:00 PM", status: "Order processed", detail: "The order has been processed.", location: undefined },
  ],
};

const DELIVERY_DATES: Record<number, { day: string; date: string; month: string; time: string }> = {
  0: { day: "Wednesday", date: "14", month: "April", time: "Estimated: 11:30 AM - 1:30 PM" },
  1: { day: "Wednesday", date: "14", month: "April", time: "11:30 AM - 1:30 PM" },
  2: { day: "Wednesday", date: "14", month: "April", time: "11:30 AM - 1:30 PM" },
  3: { day: "Wednesday", date: "14", month: "April", time: "Delivered at 12:05 PM" },
};

const ORDERED_ITEMS: Product[] = [
  { name: "Minimalist Gold Bamboo Cushion", price: "$48.00", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&h=80&fit=crop&auto=format", qty: 2 },
  { name: "Business Red Leather Boots", price: "$129.00", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=80&h=80&fit=crop&auto=format", qty: 1 },
];

const RECOMMENDATIONS: RecommendedProduct[] = [
  { name: "Trendy White Cotton Sneakers", price: "$79.00", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=120&h=120&fit=crop&auto=format" },
  { name: "Minimalist Olive Jersey Jacket", price: "$95.00", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=120&h=120&fit=crop&auto=format" },
  { name: "Classic White Wool Jacket", price: "$145.00", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=120&h=120&fit=crop&auto=format" },
  { name: "Casual Cotton Leggings", price: "$42.00", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=120&h=120&fit=crop&auto=format" },
];

// ─── Sub-components ───────────────────────────────────────────────────

function StepIcon({ type, completed, active, onClick }: { type: string; completed: boolean; active: boolean; onClick: () => void }) {
  const bg = completed ? "#3D3AD3" : active ? "#3D3AD3" : "#e5e7eb";
  const fg = completed || active ? "#fff" : "#9ca3af";

  const icons: Record<string, string> = {
    package: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    truck: "M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
    check: "M5 13l4 4L19 7",
  };

  return (
    <button
      onClick={onClick}
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: bg,
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: active ? "0 0 0 4px rgba(61,58,211,0.2)" : "none",
        position: "relative",
      }}
      aria-label={type}
    >
      {completed && type !== "check" ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={fg} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={fg} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d={icons[type]} />
        </svg>
      )}
    </button>
  );
}

function ThumbButton({ up, selected, onClick }: { up: boolean; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 40,
        height: 40,
        borderRadius: 8,
        border: selected ? "2px solid #3D3AD3" : "1.5px solid #d1d5db",
        background: selected ? "rgba(61,58,211,0.08)" : "#fff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s ease",
        fontSize: 18,
      }}
      aria-label={up ? "Thumbs up" : "Thumbs down"}
    >
      {up ? "👍" : "👎"}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────

export function OrderStatusDemo() {
  const [activeStep, setActiveStep] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [carrierVote, setCarrierVote] = useState<null | "up" | "down">(null);
  const [commsVote, setCommsVote] = useState<null | "up" | "down">(null);
  const [showToast, setShowToast] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredRec, setHoveredRec] = useState<number | null>(null);

  const checkpoints = CHECKPOINTS_BY_STATUS[activeStep] || CHECKPOINTS_BY_STATUS[1];
  const delivery = DELIVERY_DATES[activeStep] || DELIVERY_DATES[1];
  const visibleCheckpoints = showMore ? checkpoints : checkpoints.slice(0, 3);

  const handleReroute = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleSubscribe = () => {
    if (phoneNumber.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", maxWidth: 1100, margin: "0 auto" }}>
      {/* Browser Chrome */}
      <div style={{ background: "#2d2d2d", borderRadius: "12px 12px 0 0", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", gap: 7 }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        </div>
        <div style={{
          flex: 1, background: "#1a1a1a", borderRadius: 8, padding: "6px 14px",
          color: "#999", fontSize: 13, fontFamily: "monospace", display: "flex", alignItems: "center", gap: 8,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          shop.example.com/order-status
        </div>
      </div>

      {/* Page Body */}
      <div style={{
        background: "#faf9f7", border: "1px solid #e0ddd8", borderTop: "none",
        borderRadius: "0 0 12px 12px", overflow: "hidden", position: "relative",
      }}>
        {/* Toast */}
        {showToast && (
          <div style={{
            position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)",
            background: "#035740", color: "#fff", padding: "10px 24px", borderRadius: 8,
            fontSize: 14, fontWeight: 500, zIndex: 50, boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            animation: "fadeIn 0.2s ease",
          }}>
            Delivery rescheduled!
          </div>
        )}

        {/* Promo Banner */}
        <div style={{
          background: "linear-gradient(135deg, #3D3AD3, #6366f1)", color: "#fff",
          padding: "10px 20px", textAlign: "center", fontSize: 13, fontWeight: 500,
          letterSpacing: 0.3,
        }}>
          Free shipping on orders over $75 — <span style={{ textDecoration: "underline", cursor: "pointer" }}>Shop now</span>
        </div>

        {/* Header */}
        <div style={{
          padding: "16px 28px", display: "flex", justifyContent: "space-between",
          alignItems: "center", borderBottom: "1px solid #e8e5e0",
        }}>
          <div style={{ fontFamily: "'Georgia', serif", fontSize: 22, fontWeight: 700, letterSpacing: 2, color: "#1a1a1a" }}>
            PARKER'S
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            {["instagram", "facebook", "twitter"].map((s) => (
              <span
                key={s}
                style={{
                  width: 28, height: 28, borderRadius: "50%", background: "#f0eeeb",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.2s ease", fontSize: 12, color: "#666",
                }}
                aria-label={s}
              >
                {s === "instagram" ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                ) : s === "facebook" ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "flex", gap: 0, flexWrap: "wrap" as const }}>
          {/* LEFT COLUMN */}
          <div style={{ flex: "1 1 58%", minWidth: 320, padding: "24px 28px", borderRight: "1px solid #e8e5e0" }}>
            {/* Estimated Delivery */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 11, textTransform: "uppercase" as const, letterSpacing: 1.5, color: "#888", marginBottom: 4, fontWeight: 600 }}>
                Estimated Delivery
              </div>
              <div style={{
                color: activeStep === 3 ? "#035740" : "#e05252", fontSize: 16, fontWeight: 600,
                marginBottom: 2, transition: "color 0.2s ease",
              }}>
                {activeStep === 3 ? "Delivered" : delivery.day}
              </div>
              <div style={{ fontSize: 52, fontWeight: 700, color: "#1a1a1a", lineHeight: 1, marginBottom: 2 }}>
                {delivery.date}
              </div>
              <div style={{ fontSize: 16, color: "#555", marginBottom: 4 }}>
                {delivery.month}
              </div>
              <div style={{ fontSize: 13, color: "#888" }}>
                {delivery.time}
              </div>
              <div style={{ fontSize: 11, color: "#aaa", marginTop: 6 }}>
                The estimated delivery date is calculated by DHL
              </div>
            </div>

            {/* Status Steps */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 32, position: "relative" }}>
              {STATUS_STEPS.map((label, i) => {
                const completed = i < activeStep;
                const active = i === activeStep;
                const iconType = i === 0 ? "package" : i === 1 || i === 2 ? "truck" : "check";
                return (
                  <div key={label} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 6 }}>
                      <StepIcon
                        type={iconType}
                        completed={completed}
                        active={active}
                        onClick={() => setActiveStep(i)}
                      />
                      <span style={{
                        fontSize: 11, fontWeight: completed || active ? 600 : 400,
                        color: completed || active ? "#3D3AD3" : "#999",
                        transition: "all 0.2s ease", whiteSpace: "nowrap" as const,
                      }}>
                        {label}
                      </span>
                    </div>
                    {i < STATUS_STEPS.length - 1 && (
                      <div style={{
                        width: 48, height: 3, borderRadius: 2, margin: "0 4px",
                        marginBottom: 20,
                        background: i < activeStep ? "#3D3AD3" : "#e5e7eb",
                        transition: "background 0.3s ease",
                      }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tracking Timeline */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 14 }}>
                Tracking Details
              </div>
              <div style={{ position: "relative", paddingLeft: 20 }}>
                {/* Vertical line */}
                <div style={{
                  position: "absolute", left: 5, top: 8, bottom: 8, width: 2,
                  background: "#e5e7eb", borderRadius: 1,
                }} />
                {visibleCheckpoints.map((cp, i) => (
                  <div key={i} style={{ position: "relative", paddingBottom: i === visibleCheckpoints.length - 1 ? 0 : 18, paddingLeft: 16 }}>
                    {/* Dot */}
                    <div style={{
                      position: "absolute", left: -16, top: 6, width: 10, height: 10,
                      borderRadius: "50%", border: "2px solid " + (i === 0 ? "#3D3AD3" : "#d1d5db"),
                      background: i === 0 ? "#3D3AD3" : "#fff",
                    }} />
                    <div style={{ fontSize: 12, color: "#999", marginBottom: 2 }}>
                      {cp.date}, {cp.time}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: i === 0 ? "#1a1a1a" : "#555" }}>
                      {cp.status}
                    </div>
                    <div style={{ fontSize: 12, color: "#777" }}>
                      {cp.detail}{cp.location ? ` (${cp.location})` : ""}
                    </div>
                  </div>
                ))}
              </div>
              {checkpoints.length > 3 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  style={{
                    background: "none", border: "none", color: "#3D3AD3", fontSize: 13,
                    fontWeight: 500, cursor: "pointer", padding: "8px 0 0 36px",
                    transition: "color 0.2s ease",
                  }}
                >
                  {showMore ? "Show less" : "Show more..."}
                </button>
              )}
            </div>

            {/* Carrier link */}
            <div style={{
              padding: "12px 16px", background: "#f3f2ef", borderRadius: 8,
              fontSize: 12, color: "#666", marginBottom: 16, lineHeight: 1.5,
            }}>
              Find further information about this order at{" "}
              <span style={{ color: "#3D3AD3", fontWeight: 500, cursor: "pointer" }}>DHL</span>
              {" "}— Delivery 00PL161230004
            </div>

            {/* Reroute link */}
            <button
              onClick={handleReroute}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
                background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 8,
                cursor: "pointer", width: "100%", marginBottom: 24,
                transition: "all 0.2s ease", fontSize: 13, fontWeight: 500, color: "#1a1a1a",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3D3AD3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Rearrange delivery if available
            </button>

            {/* Voting */}
            <div style={{
              padding: "16px 20px", background: "#fff", borderRadius: 10,
              border: "1px solid #e8e5e0", marginBottom: 20,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontSize: 13, color: "#555" }}>Were you satisfied with the carrier performance?</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <ThumbButton up selected={carrierVote === "up"} onClick={() => setCarrierVote(carrierVote === "up" ? null : "up")} />
                  <ThumbButton up={false} selected={carrierVote === "down"} onClick={() => setCarrierVote(carrierVote === "down" ? null : "down")} />
                </div>
              </div>
              <div style={{ width: "100%", height: 1, background: "#eee", marginBottom: 14 }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "#555" }}>Were you satisfied with the communication?</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <ThumbButton up selected={commsVote === "up"} onClick={() => setCommsVote(commsVote === "up" ? null : "up")} />
                  <ThumbButton up={false} selected={commsVote === "down"} onClick={() => setCommsVote(commsVote === "down" ? null : "down")} />
                </div>
              </div>
            </div>

            {/* SMS Opt-in */}
            <div style={{
              padding: "16px 20px", background: "#fff", borderRadius: 10,
              border: "1px solid #e8e5e0",
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", marginBottom: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3D3AD3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{ verticalAlign: "middle", marginRight: 6 }}>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Get SMS updates
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phoneNumber}
                  onInput={(e) => setPhoneNumber((e.target as HTMLInputElement).value)}
                  style={{
                    flex: 1, padding: "8px 12px", border: "1.5px solid #d1d5db",
                    borderRadius: 6, fontSize: 13, fontFamily: "'Poppins', sans-serif",
                    outline: "none", transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#3D3AD3"; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "#d1d5db"; }}
                />
                <button
                  onClick={handleSubscribe}
                  style={{
                    padding: "8px 18px", background: subscribed ? "#035740" : "#3D3AD3",
                    color: "#fff", border: "none", borderRadius: 6, fontSize: 13,
                    fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif",
                    transition: "all 0.2s ease", whiteSpace: "nowrap" as const,
                  }}
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ flex: "1 1 38%", minWidth: 280, padding: "24px 24px", background: "#fff" }}>
            {/* Campaign Banner 1 */}
            <div
              style={{
                background: "linear-gradient(135deg, #f5e6d3, #e8d5c0)", borderRadius: 10,
                padding: 20, marginBottom: 24, cursor: "pointer",
                transition: "all 0.2s ease", overflow: "hidden", position: "relative",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: 17, fontWeight: 700, color: "#3d2e1f", marginBottom: 4, lineHeight: 1.3 }}>
                Level-up your WFH
              </div>
              <div style={{ fontSize: 12, color: "#7a6b5d", marginBottom: 10 }}>Home office essentials</div>
              <span style={{
                display: "inline-block", padding: "6px 16px", background: "#3d2e1f",
                color: "#fff", borderRadius: 6, fontSize: 12, fontWeight: 600,
              }}>
                Shop Now
              </span>
            </div>

            {/* Items in Package */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 14 }}>
                Items in your package
              </div>
              {ORDERED_ITEMS.map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: 12, alignItems: "center", padding: "10px 0",
                  borderBottom: i < ORDERED_ITEMS.length - 1 ? "1px solid #f0eeeb" : "none",
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 8, background: "#f5f3f0",
                    overflow: "hidden", flexShrink: 0,
                  }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      loading="lazy"
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a", marginBottom: 2 }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#888" }}>Qty: {item.qty}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", flexShrink: 0 }}>
                    {item.price}
                  </div>
                </div>
              ))}
            </div>

            {/* Product Recommendations */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 14 }}>
                You might also like
              </div>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
              }}>
                {RECOMMENDATIONS.map((rec, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: 10, overflow: "hidden", border: "1px solid #eee",
                      cursor: "pointer", position: "relative",
                      transition: "all 0.2s ease",
                      boxShadow: hoveredRec === i ? "0 6px 20px rgba(0,0,0,0.1)" : "0 1px 3px rgba(0,0,0,0.04)",
                      transform: hoveredRec === i ? "translateY(-2px)" : "none",
                    }}
                    onMouseEnter={() => setHoveredRec(i)}
                    onMouseLeave={() => setHoveredRec(null)}
                  >
                    <div style={{
                      width: "100%", height: 110, background: "#f5f3f0",
                      overflow: "hidden", position: "relative",
                    }}>
                      <img
                        src={rec.image}
                        alt={rec.name}
                        style={{
                          width: "100%", height: "100%", objectFit: "cover",
                          transition: "transform 0.3s ease",
                          transform: hoveredRec === i ? "scale(1.08)" : "scale(1)",
                        }}
                        loading="lazy"
                      />
                      {/* Add to cart overlay */}
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "rgba(61,58,211,0.85)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        opacity: hoveredRec === i ? 1 : 0,
                        transition: "opacity 0.2s ease",
                      }}>
                        <span style={{
                          color: "#fff", fontSize: 12, fontWeight: 600,
                          padding: "6px 14px", border: "1.5px solid #fff",
                          borderRadius: 6,
                        }}>
                          Add to cart
                        </span>
                      </div>
                    </div>
                    <div style={{ padding: "10px 10px 12px" }}>
                      <div style={{ fontSize: 12, color: "#555", marginBottom: 4, lineHeight: 1.3 }}>
                        {rec.name}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>
                        {rec.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Banner 2 */}
            <div
              style={{
                background: "linear-gradient(135deg, #035740, #047857)", borderRadius: 10,
                padding: 20, cursor: "pointer",
                transition: "all 0.2s ease", color: "#fff",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>
                Comfort that lasts
              </div>
              <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 10 }}>New spring collection</div>
              <span style={{
                display: "inline-block", padding: "6px 16px", background: "rgba(255,255,255,0.2)",
                color: "#fff", borderRadius: 6, fontSize: 12, fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.3)",
              }}>
                Shop Now
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: "1px solid #e8e5e0", padding: "14px 28px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 11, color: "#aaa",
        }}>
          <span>Powered by parcelLab</span>
          <span>Order #PK-20260410-7829</span>
        </div>
      </div>
    </div>
  );
}
