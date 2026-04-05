import { useState } from "preact/hooks";

const PRIMARY = "#3D3AD3";
const GREEN = "#035740";
const YELLOW = "#FFC943";
const RED = "#F4373D";
const GRAY_BG = "#f7f7f8";
const BORDER = "#e5e5e5";
const CHROME_BG = "#2d2d2d";
const TEXT_MUTED = "#6b7280";

const items = [
  {
    id: 1,
    name: "Minimalist Gold Bamboo Cushion",
    sku: "HO-CU-MGB-2312",
    qty: 1,
    price: 89.0,
    color: "#d4a847",
    selectable: true,
    status: null as string | null,
  },
  {
    id: 2,
    name: "Business Red Leather Boots",
    sku: "AP-SH-BRL-2312",
    qty: 1,
    price: 249.0,
    color: "#8b2020",
    selectable: false,
    status: "Already returned",
  },
  {
    id: 3,
    name: "Classic White Wool Jacket",
    sku: "AP-JK-CWW-2312",
    qty: 1,
    price: 189.0,
    color: "#e8e4dc",
    selectable: false,
    status: "Final sale items cannot be returned",
  },
];

const returnReasons = [
  "Too small",
  "Too large",
  "Doesn't match description",
  "Defective/damaged",
  "Changed my mind",
  "Received wrong item",
];

const sizes = ["S", "M", "L", "XL"];
const colors = [
  { name: "Gold", hex: "#d4a847" },
  { name: "Silver", hex: "#c0c0c0" },
  { name: "Navy", hex: "#1e3a5f" },
];

export function ReturnsDemo() {
  const [step, setStep] = useState(1);
  const [animDir, setAnimDir] = useState<"forward" | "back">("forward");
  const [orderNum, setOrderNum] = useState("ORD-2026-84721");
  const [email, setEmail] = useState("sarah@example.com");
  const [selectedItems, setSelectedItems] = useState<number[]>([1]);
  const [returnReason, setReturnReason] = useState("Too small");
  const [reasonText, setReasonText] = useState("");
  const [photoAttached, setPhotoAttached] = useState(false);
  const [compensation, setCompensation] = useState<"exchange" | "credit" | "refund">("exchange");
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Gold");
  const [keptItem, setKeptItem] = useState(false);
  const [carrier, setCarrier] = useState<"ups" | "fedex" | "store">("ups");
  const [pickupDate, setPickupDate] = useState("2026-04-08");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [address, setAddress] = useState({
    name: "Sarah Johnson",
    street: "456 Oak Avenue",
    city: "Miami",
    state: "FL",
    zip: "33130",
    phone: "(305) 555-0123",
  });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  function goTo(s: number) {
    setAnimDir(s > step ? "forward" : "back");
    setStep(s);
  }

  function toggleItem(id: number) {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  const selectedItem = items.find((i) => selectedItems.includes(i.id));
  const canContinueStep2 = selectedItems.length > 0;

  // Stepper
  function Stepper() {
    const steps = ["Lookup", "Items", "Reason", "Shipping", "Done"];
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, padding: "20px 16px 12px", background: "#fff" }}>
        {steps.map((label, i) => {
          const num = i + 1;
          const isComplete = num < step;
          const isCurrent = num === step;
          return (
            <div key={num} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 600,
                    background: isComplete ? GREEN : isCurrent ? PRIMARY : "#e5e7eb",
                    color: isComplete || isCurrent ? "#fff" : TEXT_MUTED,
                    transition: "all 0.3s ease",
                  }}
                >
                  {isComplete ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5L6.5 12L13 4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  ) : (
                    num
                  )}
                </div>
                <span style={{ fontSize: 11, color: isCurrent ? PRIMARY : TEXT_MUTED, fontWeight: isCurrent ? 600 : 400 }}>{label}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  style={{
                    width: 40,
                    height: 2,
                    background: num < step ? GREEN : "#e5e7eb",
                    margin: "0 4px",
                    marginBottom: 18,
                    borderRadius: 1,
                    transition: "background 0.3s ease",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Browser chrome
  function BrowserChrome({ children }: { children: preact.ComponentChildren }) {
    return (
      <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)", border: "1px solid #d1d5db", maxWidth: 520, width: "100%", margin: "0 auto", fontFamily: "'Poppins', sans-serif" }}>
        {/* Title bar */}
        <div style={{ background: CHROME_BG, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <div style={{ background: "#404040", borderRadius: 6, padding: "4px 16px", display: "flex", alignItems: "center", gap: 6, maxWidth: 320, width: "100%" }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L8 1C4.13401 1 1 4.13401 1 8V8C1 11.866 4.13401 15 8 15V15C11.866 15 15 11.866 15 8V8C15 4.13401 11.866 1 8 1V1Z" stroke="#888" stroke-width="1.5" />
                <path d="M6 6.5C6 6.5 7 5 8 5C9 5 10 5.75 10 6.75C10 7.75 9 8 8 8.5V9.5" stroke="#888" stroke-width="1.5" stroke-linecap="round" />
                <circle cx="8" cy="11.5" r="0.75" fill="#888" />
              </svg>
              <span style={{ color: "#aaa", fontSize: 12, fontWeight: 400 }}>returns.parcellab.com/parkers</span>
            </div>
          </div>
        </div>
        {/* Content */}
        <div style={{ background: "#fff", minHeight: 460, position: "relative", overflow: "hidden" }}>
          <Stepper />
          <div
            key={step}
            style={{
              animation: `${animDir === "forward" ? "slideInRight" : "slideInLeft"} 0.35s ease both`,
              padding: "8px 24px 24px",
            }}
          >
            {children}
          </div>
        </div>
        {/* Footer */}
        <div style={{ background: GRAY_BG, borderTop: `1px solid ${BORDER}`, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 18, height: 18, borderRadius: 4, background: PRIMARY, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>pL</span>
            </div>
            <span style={{ fontSize: 11, color: TEXT_MUTED }}>Powered by parcelLab</span>
          </div>
          <span style={{ fontSize: 11, color: TEXT_MUTED }}>Parker's Returns</span>
        </div>
      </div>
    );
  }

  function PrimaryBtn({ onClick, disabled, children }: { onClick: () => void; disabled?: boolean; children: preact.ComponentChildren }) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          width: "100%",
          padding: "12px 20px",
          background: disabled ? "#c7c7cc" : PRIMARY,
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 600,
          cursor: disabled ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          transition: "all 0.2s ease",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {children}
      </button>
    );
  }

  function InputField({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
    return (
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#374151", marginBottom: 5 }}>{label}</label>
        <input
          type={type}
          value={value}
          onInput={(e) => onChange((e.target as HTMLInputElement).value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: `1px solid ${BORDER}`,
            borderRadius: 8,
            fontSize: 14,
            fontFamily: "inherit",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.15s ease",
          }}
          onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = PRIMARY)}
          onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = BORDER)}
        />
      </div>
    );
  }

  // Step 1: Order Lookup
  function Step1() {
    return (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "#111", margin: "0 0 4px" }}>Start your return</h2>
        <p style={{ fontSize: 13, color: TEXT_MUTED, margin: "0 0 20px" }}>Enter your order details to begin the return process.</p>
        <InputField label="Order number" value={orderNum} onChange={setOrderNum} placeholder="e.g. ORD-2026-84721" />
        <InputField label="Email address" value={email} onChange={setEmail} type="email" placeholder="you@example.com" />
        <div style={{ marginTop: 8 }}>
          <PrimaryBtn onClick={() => goTo(2)} disabled={!orderNum || !email}>
            Find my order
          </PrimaryBtn>
        </div>
        <p style={{ fontSize: 11, color: TEXT_MUTED, textAlign: "center", marginTop: 14 }}>
          Can't find your order?{" "}
          <span style={{ color: PRIMARY, cursor: "pointer", fontWeight: 500 }}>Contact support</span>
        </p>
      </div>
    );
  }

  // Step 2: Select Items
  function Step2() {
    return (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "#111", margin: "0 0 4px" }}>Select items to return</h2>
        <p style={{ fontSize: 12, color: TEXT_MUTED, margin: "0 0 16px" }}>
          Order #{orderNum} — April 2, 2026
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((item) => {
            const isSelected = selectedItems.includes(item.id);
            const disabled = !item.selectable;
            const isReturned = item.status === "Already returned";
            const isNonReturnable = item.status && !isReturned;
            return (
              <div
                key={item.id}
                onClick={() => !disabled && toggleItem(item.id)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: 12,
                  border: `1.5px solid ${isSelected ? PRIMARY : BORDER}`,
                  borderRadius: 10,
                  cursor: disabled ? "default" : "pointer",
                  opacity: disabled ? 0.5 : 1,
                  background: isSelected ? `${PRIMARY}08` : "#fff",
                  transition: "all 0.2s ease",
                }}
              >
                {/* Checkbox */}
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    border: `2px solid ${isSelected ? PRIMARY : disabled ? "#d1d5db" : "#9ca3af"}`,
                    background: isSelected ? PRIMARY : "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                    transition: "all 0.15s ease",
                  }}
                >
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.5L5 9L9.5 3.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  )}
                </div>
                {/* Product image placeholder */}
                <div style={{ width: 48, height: 48, borderRadius: 8, background: item.color, flexShrink: 0 }} />
                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#111", marginBottom: 2 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: TEXT_MUTED }}>
                    SKU: {item.sku} &middot; Qty: {item.qty}
                  </div>
                  {isReturned && (
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: 4,
                        fontSize: 10,
                        fontWeight: 500,
                        color: "#6b7280",
                        background: "#f3f4f6",
                        padding: "2px 8px",
                        borderRadius: 10,
                      }}
                    >
                      Already returned
                    </span>
                  )}
                  {isNonReturnable && (
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: 4,
                        fontSize: 10,
                        fontWeight: 500,
                        color: RED,
                        background: "#fef2f2",
                        padding: "2px 8px",
                        borderRadius: 10,
                      }}
                    >
                      Non-returnable — {item.status}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111", flexShrink: 0 }}>${item.price.toFixed(2)}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 18 }}>
          <PrimaryBtn onClick={() => goTo(3)} disabled={!canContinueStep2}>
            Continue
          </PrimaryBtn>
        </div>
      </div>
    );
  }

  // Step 3: Return Reason & Compensation
  function Step3() {
    if (!selectedItem) return null;
    const bonusCredit = (selectedItem.price * 1.1).toFixed(2);
    const partialRefund = (selectedItem.price * 0.3).toFixed(2);

    return (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "#111", margin: "0 0 16px" }}>Return details</h2>
        {/* Item being returned */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, padding: 10, background: GRAY_BG, borderRadius: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 6, background: selectedItem.color, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{selectedItem.name}</div>
            <div style={{ fontSize: 11, color: TEXT_MUTED }}>${selectedItem.price.toFixed(2)}</div>
          </div>
        </div>

        {/* Reason dropdown */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#374151", marginBottom: 5 }}>Return reason</label>
          <select
            value={returnReason}
            onChange={(e) => setReturnReason((e.target as HTMLSelectElement).value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: `1px solid ${BORDER}`,
              borderRadius: 8,
              fontSize: 14,
              fontFamily: "inherit",
              background: "#fff",
              outline: "none",
              cursor: "pointer",
              boxSizing: "border-box",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
            }}
          >
            {returnReasons.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Additional details */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#374151", marginBottom: 5 }}>
            Describe the issue <span style={{ fontWeight: 400, color: TEXT_MUTED }}>(optional)</span>
          </label>
          <textarea
            value={reasonText}
            onInput={(e) => setReasonText((e.target as HTMLTextAreaElement).value)}
            maxLength={300}
            placeholder="Tell us more about the problem..."
            style={{
              width: "100%",
              padding: "10px 12px",
              border: `1px solid ${BORDER}`,
              borderRadius: 8,
              fontSize: 13,
              fontFamily: "inherit",
              outline: "none",
              resize: "vertical",
              minHeight: 60,
              boxSizing: "border-box",
            }}
          />
          <div style={{ fontSize: 10, color: TEXT_MUTED, textAlign: "right", marginTop: 2 }}>{reasonText.length}/300</div>
        </div>

        {/* Photo upload */}
        <div style={{ marginBottom: 18 }}>
          <button
            onClick={() => setPhotoAttached(!photoAttached)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              border: `1px solid ${photoAttached ? GREEN : BORDER}`,
              borderRadius: 8,
              background: photoAttached ? `${GREEN}0a` : "#fff",
              color: photoAttached ? GREEN : "#374151",
              fontSize: 13,
              fontFamily: "inherit",
              cursor: "pointer",
              fontWeight: 500,
              transition: "all 0.2s ease",
            }}
          >
            {photoAttached ? (
              <>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5L6.5 12L13 4" stroke={GREEN} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Photo attached
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <rect x="1.5" y="3" width="13" height="10" rx="2" stroke="#6b7280" stroke-width="1.5" />
                  <circle cx="5.5" cy="7" r="1.5" stroke="#6b7280" stroke-width="1.2" />
                  <path d="M3 13L7 9L10 12L12 10L14 13" stroke="#6b7280" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Upload photos
              </>
            )}
          </button>
        </div>

        {/* Compensation method */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#374151", marginBottom: 8 }}>Compensation method</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Exchange */}
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: 12,
                border: `1.5px solid ${compensation === "exchange" ? GREEN : BORDER}`,
                borderRadius: 10,
                cursor: "pointer",
                background: compensation === "exchange" ? `${GREEN}08` : "#fff",
                transition: "all 0.2s ease",
              }}
            >
              <input
                type="radio"
                name="compensation"
                checked={compensation === "exchange"}
                onChange={() => setCompensation("exchange")}
                style={{ accentColor: GREEN, marginTop: 2 }}
              />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>Exchange</div>
                <div style={{ fontSize: 11, color: TEXT_MUTED }}>Same item, different size/color</div>
              </div>
            </label>
            {/* Store Credit */}
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: 12,
                border: `1.5px solid ${compensation === "credit" ? PRIMARY : BORDER}`,
                borderRadius: 10,
                cursor: "pointer",
                background: compensation === "credit" ? `${PRIMARY}08` : "#fff",
                transition: "all 0.2s ease",
              }}
            >
              <input
                type="radio"
                name="compensation"
                checked={compensation === "credit"}
                onChange={() => setCompensation("credit")}
                style={{ accentColor: PRIMARY, marginTop: 2 }}
              />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>Store Credit</div>
                <div style={{ fontSize: 11, color: TEXT_MUTED }}>
                  Get ${selectedItem.price.toFixed(2)} + 10% bonus = <strong style={{ color: GREEN }}>${bonusCredit}</strong> store credit
                </div>
              </div>
            </label>
            {/* Refund */}
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: 12,
                border: `1.5px solid ${compensation === "refund" ? PRIMARY : BORDER}`,
                borderRadius: 10,
                cursor: "pointer",
                background: compensation === "refund" ? `${PRIMARY}08` : "#fff",
                transition: "all 0.2s ease",
              }}
            >
              <input
                type="radio"
                name="compensation"
                checked={compensation === "refund"}
                onChange={() => setCompensation("refund")}
                style={{ accentColor: PRIMARY, marginTop: 2 }}
              />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>Refund</div>
                <div style={{ fontSize: 11, color: TEXT_MUTED }}>Original payment method</div>
              </div>
            </label>
          </div>
        </div>

        {/* Exchange variant picker */}
        {compensation === "exchange" && (
          <div style={{ padding: 14, background: GRAY_BG, borderRadius: 10, marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#374151", marginBottom: 10 }}>Select exchange variant</div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: TEXT_MUTED, marginBottom: 6 }}>Size</div>
              <div style={{ display: "flex", gap: 6 }}>
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 20,
                      border: `1.5px solid ${selectedSize === s ? PRIMARY : BORDER}`,
                      background: selectedSize === s ? PRIMARY : "#fff",
                      color: selectedSize === s ? "#fff" : "#374151",
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: TEXT_MUTED, marginBottom: 6 }}>Color</div>
              <div style={{ display: "flex", gap: 6 }}>
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 14px",
                      borderRadius: 20,
                      border: `1.5px solid ${selectedColor === c.name ? PRIMARY : BORDER}`,
                      background: selectedColor === c.name ? `${PRIMARY}10` : "#fff",
                      color: "#374151",
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: c.hex, border: "1px solid rgba(0,0,0,0.1)" }} />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Retention offer */}
        {!keptItem ? (
          <div
            style={{
              padding: 14,
              background: `${YELLOW}18`,
              border: `1px solid ${YELLOW}60`,
              borderRadius: 10,
              marginBottom: 18,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 22, flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18.5L6 21.5L7 14.5L2 9.5L9 8.5L12 2Z" fill={YELLOW} stroke="#b8941a" stroke-width="1" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#78600a", marginBottom: 2 }}>Keep this item instead?</div>
              <div style={{ fontSize: 11, color: "#92791f" }}>Get a 30% partial refund (${partialRefund}) and keep the item.</div>
            </div>
            <button
              onClick={() => setKeptItem(true)}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                border: "none",
                background: "#b8941a",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              Keep item
            </button>
          </div>
        ) : (
          <div
            style={{
              padding: 14,
              background: `${GREEN}0c`,
              border: `1px solid ${GREEN}30`,
              borderRadius: 10,
              marginBottom: 18,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" fill={GREEN} />
              <path d="M4.5 8.5L7 11L11.5 5.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div style={{ fontSize: 12, fontWeight: 500, color: GREEN }}>
              Item kept! ${(selectedItem.price * 0.3).toFixed(2)} will be refunded.
            </div>
          </div>
        )}

        <PrimaryBtn onClick={() => goTo(4)}>Continue</PrimaryBtn>
      </div>
    );
  }

  // Step 4: Carrier Selection
  function Step4() {
    return (
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "#111", margin: "0 0 4px" }}>Choose how to return</h2>
        <p style={{ fontSize: 12, color: TEXT_MUTED, margin: "0 0 16px" }}>Select a shipping method for your return.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {/* UPS */}
          <label
            style={{
              display: "flex", alignItems: "flex-start", gap: 10, padding: 12,
              border: `1.5px solid ${carrier === "ups" ? PRIMARY : BORDER}`,
              borderRadius: 10, cursor: "pointer",
              background: carrier === "ups" ? `${PRIMARY}08` : "#fff",
              transition: "all 0.2s ease",
            }}
          >
            <input type="radio" name="carrier" checked={carrier === "ups"} onChange={() => setCarrier("ups")} style={{ accentColor: PRIMARY, marginTop: 2 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>UPS Drop-off</div>
                <span style={{ fontSize: 12, fontWeight: 600, color: GREEN }}>Free</span>
              </div>
              <div style={{ fontSize: 11, color: TEXT_MUTED }}>Drop off at 2,400+ locations</div>
            </div>
          </label>
          {/* FedEx */}
          <label
            style={{
              display: "flex", alignItems: "flex-start", gap: 10, padding: 12,
              border: `1.5px solid ${carrier === "fedex" ? PRIMARY : BORDER}`,
              borderRadius: 10, cursor: "pointer",
              background: carrier === "fedex" ? `${PRIMARY}08` : "#fff",
              transition: "all 0.2s ease",
            }}
          >
            <input type="radio" name="carrier" checked={carrier === "fedex"} onChange={() => setCarrier("fedex")} style={{ accentColor: PRIMARY, marginTop: 2 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>FedEx Pickup</div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#111" }}>$4.99</span>
              </div>
              <div style={{ fontSize: 11, color: TEXT_MUTED }}>Schedule a pickup from your address</div>
            </div>
          </label>
          {/* In-Store */}
          <label
            style={{
              display: "flex", alignItems: "flex-start", gap: 10, padding: 12,
              border: `1.5px solid ${carrier === "store" ? PRIMARY : BORDER}`,
              borderRadius: 10, cursor: "pointer",
              background: carrier === "store" ? `${PRIMARY}08` : "#fff",
              transition: "all 0.2s ease",
            }}
          >
            <input type="radio" name="carrier" checked={carrier === "store"} onChange={() => setCarrier("store")} style={{ accentColor: PRIMARY, marginTop: 2 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>In-Store Return</div>
                <span style={{ fontSize: 12, fontWeight: 600, color: GREEN }}>Free</span>
              </div>
              <div style={{ fontSize: 11, color: TEXT_MUTED }}>
                Return at any Parker's location &middot;{" "}
                <span style={{ color: PRIMARY, fontWeight: 500, cursor: "pointer" }}>Find a store</span>
              </div>
            </div>
          </label>
        </div>

        {/* FedEx date/time picker */}
        {carrier === "fedex" && (
          <div style={{ padding: 14, background: GRAY_BG, borderRadius: 10, marginBottom: 16, display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#374151", marginBottom: 4 }}>Pickup date</label>
              <input
                type="date"
                value={pickupDate}
                onInput={(e) => setPickupDate((e.target as HTMLInputElement).value)}
                style={{ width: "100%", padding: "8px 10px", border: `1px solid ${BORDER}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#374151", marginBottom: 4 }}>Pickup time</label>
              <input
                type="time"
                value={pickupTime}
                onInput={(e) => setPickupTime((e.target as HTMLInputElement).value)}
                style={{ width: "100%", padding: "8px 10px", border: `1px solid ${BORDER}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" }}
              />
            </div>
          </div>
        )}

        {/* UPS map widget */}
        {carrier === "ups" && (
          <div style={{ marginBottom: 16, border: `1px solid ${BORDER}`, borderRadius: 10, overflow: "hidden" }}>
            {/* Fake map */}
            <div style={{ height: 100, background: "#e8edf2", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.3 }}>
                {/* Grid pattern for map feel */}
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="mapgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#c1cbd6" stroke-width="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mapgrid)" />
                  {/* Roads */}
                  <line x1="0" y1="50" x2="100%" y2="50" stroke="#b0bec5" stroke-width="3" />
                  <line x1="40%" y1="0" x2="40%" y2="100%" stroke="#b0bec5" stroke-width="3" />
                  <line x1="0" y1="80" x2="100%" y2="70" stroke="#b0bec5" stroke-width="2" />
                </svg>
              </div>
              {/* Pin */}
              <svg width="28" height="36" viewBox="0 0 28 36" fill="none" style={{ position: "relative", zIndex: 1, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>
                <path d="M14 0C6.27 0 0 6.27 0 14C0 24.5 14 36 14 36S28 24.5 28 14C28 6.27 21.73 0 14 0Z" fill={PRIMARY} />
                <circle cx="14" cy="14" r="6" fill="#fff" />
              </svg>
            </div>
            <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: "#4a2f0a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>UPS</span>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#111" }}>UPS Access Point</div>
                <div style={{ fontSize: 11, color: TEXT_MUTED }}>0.3 mi &middot; 123 Main St, Miami</div>
              </div>
            </div>
          </div>
        )}

        {/* In-Store finder link */}
        {carrier === "store" && (
          <div style={{ marginBottom: 16, padding: 14, background: GRAY_BG, borderRadius: 10, textAlign: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 6 }}>
              <path d="M3 9L12 2L21 9V20C21 20.55 20.55 21 20 21H4C3.45 21 3 20.55 3 20V9Z" stroke={PRIMARY} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M9 21V12H15V21" stroke={PRIMARY} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>3 Parker's locations near Miami, FL</div>
            <span style={{ fontSize: 12, color: PRIMARY, fontWeight: 500, cursor: "pointer" }}>View all locations</span>
          </div>
        )}

        {/* Address */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: "#374151", marginBottom: 8 }}>Shipping address</div>
          <div style={{ padding: 14, background: GRAY_BG, borderRadius: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <input
                  value={address.name}
                  onInput={(e) => setAddress({ ...address, name: (e.target as HTMLInputElement).value })}
                  style={{ width: "100%", padding: "8px 10px", border: `1px solid ${BORDER}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", boxSizing: "border-box", background: "#fff" }}
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <input
                  value={address.street}
                  onInput={(e) => setAddress({ ...address, street: (e.target as HTMLInputElement).value })}
                  style={{ width: "100%", padding: "8px 10px", border: `1px solid ${BORDER}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", boxSizing: "border-box", background: "#fff" }}
                />
              </div>
              <input
                value={address.city}
                onInput={(e) => setAddress({ ...address, city: (e.target as HTMLInputElement).value })}
                style={{ width: "100%", padding: "8px 10px", border: `1px solid ${BORDER}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", boxSizing: "border-box", background: "#fff" }}
              />
              <div style={{ display: "flex", gap: 6 }}>
                <input
                  value={address.state}
                  onInput={(e) => setAddress({ ...address, state: (e.target as HTMLInputElement).value })}
                  style={{ width: "50%", padding: "8px 10px", border: `1px solid ${BORDER}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", boxSizing: "border-box", background: "#fff" }}
                />
                <input
                  value={address.zip}
                  onInput={(e) => setAddress({ ...address, zip: (e.target as HTMLInputElement).value })}
                  style={{ width: "50%", padding: "8px 10px", border: `1px solid ${BORDER}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", boxSizing: "border-box", background: "#fff" }}
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <input
                  value={address.phone}
                  onInput={(e) => setAddress({ ...address, phone: (e.target as HTMLInputElement).value })}
                  style={{ width: "100%", padding: "8px 10px", border: `1px solid ${BORDER}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", boxSizing: "border-box", background: "#fff" }}
                />
              </div>
            </div>
          </div>
        </div>

        <PrimaryBtn onClick={() => goTo(5)}>Generate return label</PrimaryBtn>
      </div>
    );
  }

  // Step 5: Confirmation
  function Step5() {
    const displayRating = hoverRating || rating;
    return (
      <div>
        {/* Success header */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${GREEN}14`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" fill={GREEN} />
              <path d="M8 14.5L12 18.5L20 10" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: "#111", margin: "0 0 4px" }}>Return registered!</h2>
          <p style={{ fontSize: 12, color: TEXT_MUTED, margin: 0 }}>Your return has been confirmed. Show the QR code at the drop-off.</p>
        </div>

        {/* QR Code */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <div style={{ width: 120, height: 120, padding: 8, border: `1px solid ${BORDER}`, borderRadius: 10, background: "#fff" }}>
            <svg width="104" height="104" viewBox="0 0 21 21" style={{ display: "block" }}>
              {/* Simplified QR-like pattern */}
              {(() => {
                const pattern = [
                  [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
                  [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
                  [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1],
                  [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,0,1,1,1,0,1],
                  [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
                  [1,0,0,0,0,0,1,0,0,1,1,1,0,0,1,0,0,0,0,0,1],
                  [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
                  [0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0],
                  [1,0,1,0,1,1,1,1,0,0,1,0,0,1,1,0,1,1,0,1,0],
                  [0,1,0,1,1,0,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1],
                  [1,0,1,1,0,1,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0],
                  [0,1,1,0,1,0,0,1,1,1,0,1,1,1,0,1,1,0,1,0,1],
                  [1,0,0,1,1,1,1,0,0,0,1,0,0,0,1,0,0,1,0,1,0],
                  [0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,1,0,1,1,0,1],
                  [1,1,1,1,1,1,1,0,0,1,0,1,0,1,0,0,1,0,0,1,0],
                  [1,0,0,0,0,0,1,0,1,1,1,0,1,1,1,0,1,1,0,1,1],
                  [1,0,1,1,1,0,1,0,0,0,1,1,0,0,1,1,0,0,1,0,0],
                  [1,0,1,1,1,0,1,0,1,1,0,1,1,0,0,1,1,0,1,1,1],
                  [1,0,1,1,1,0,1,0,1,0,1,0,0,1,1,0,1,1,0,0,0],
                  [1,0,0,0,0,0,1,0,0,1,1,1,0,1,0,1,0,0,1,1,1],
                  [1,1,1,1,1,1,1,0,1,0,0,0,1,0,1,0,1,1,0,1,0],
                ];
                const rects = [];
                for (let y = 0; y < 21; y++) {
                  for (let x = 0; x < 21; x++) {
                    if (pattern[y][x]) {
                      rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#111" />);
                    }
                  }
                }
                return rects;
              })()}
            </svg>
          </div>
        </div>

        <p style={{ fontSize: 12, color: TEXT_MUTED, textAlign: "center", margin: "0 0 16px" }}>
          Show this QR code at the UPS drop-off location.<br />
          You will also receive this via email.
        </p>

        {/* Wallet buttons */}
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          <button
            style={{
              flex: 1, padding: "10px 12px", border: `1px solid ${BORDER}`, borderRadius: 8,
              background: "#000", color: "#fff", fontSize: 12, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 16.56 2.93 11.3 4.7 7.72C5.57 5.96 7.36 4.86 9.28 4.84C10.56 4.81 11.78 5.7 12.57 5.7C13.36 5.7 14.85 4.62 16.4 4.8C17.05 4.83 18.82 5.06 19.94 6.7C19.85 6.76 17.65 8.07 17.68 10.8C17.71 14.08 20.49 15.15 20.52 15.17C20.49 15.24 20.07 16.72 18.71 19.5Z" />
            </svg>
            Add to Wallet
          </button>
          <button
            style={{
              flex: 1, padding: "10px 12px", border: `1px solid ${BORDER}`, borderRadius: 8,
              background: "#fff", color: "#111", fontSize: 12, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4" />
              <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.13 18.63 6.71 16.69 5.84 14.09H2.18V16.94C3.99 20.53 7.7 23 12 23Z" fill="#34A853" />
              <path d="M5.84 14.09C5.62 13.43 5.49 12.73 5.49 12C5.49 11.27 5.62 10.57 5.84 9.91V7.06H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.94L5.84 14.09Z" fill="#FBBC05" />
              <path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.7 1 3.99 3.47 2.18 7.06L5.84 9.91C6.71 7.31 9.13 5.38 12 5.38Z" fill="#EA4335" />
            </svg>
            Google Wallet
          </button>
        </div>

        {/* Return summary */}
        <div style={{ border: `1px solid ${BORDER}`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#111", marginBottom: 10 }}>Return summary</div>
          {selectedItem && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 10, borderBottom: `1px solid ${BORDER}`, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 6, background: selectedItem.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#111" }}>{selectedItem.name}</div>
                <div style={{ fontSize: 11, color: TEXT_MUTED }}>
                  {returnReason} &middot;{" "}
                  {keptItem
                    ? "Kept (partial refund)"
                    : compensation === "exchange"
                    ? `Exchange (${selectedSize}, ${selectedColor})`
                    : compensation === "credit"
                    ? "Store credit"
                    : "Refund"}
                </div>
              </div>
            </div>
          )}
          <div style={{ fontSize: 11, color: TEXT_MUTED }}>
            {address.name} &middot; Order #{orderNum} &middot; April 2, 2026
          </div>
        </div>

        {/* Additional labels */}
        <div style={{ padding: 12, background: GRAY_BG, borderRadius: 10, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 12, color: "#374151" }}>Need additional labels for oversized items?</div>
          <button
            style={{
              padding: "5px 12px", border: `1px solid ${BORDER}`, borderRadius: 6,
              background: "#fff", color: PRIMARY, fontSize: 11, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
            }}
          >
            Request label
          </button>
        </div>

        {/* Feedback */}
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#111", marginBottom: 8, textAlign: "center" }}>How was your experience?</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 12 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 2,
                  transition: "transform 0.15s ease",
                  transform: displayRating >= star ? "scale(1.1)" : "scale(1)",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill={displayRating >= star ? YELLOW : "none"} stroke={displayRating >= star ? "#d4a017" : "#d1d5db"} stroke-width="1.5">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </button>
            ))}
          </div>
          {rating > 0 && (
            <textarea
              value={feedback}
              onInput={(e) => setFeedback((e.target as HTMLTextAreaElement).value)}
              placeholder="Tell us more (optional)"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: `1px solid ${BORDER}`,
                borderRadius: 8,
                fontSize: 13,
                fontFamily: "inherit",
                outline: "none",
                resize: "vertical",
                minHeight: 50,
                boxSizing: "border-box",
                marginBottom: 8,
              }}
            />
          )}
        </div>

        {/* Register another */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => {
              setStep(1);
              setAnimDir("back");
              setSelectedItems([1]);
              setReturnReason("Too small");
              setReasonText("");
              setPhotoAttached(false);
              setCompensation("exchange");
              setKeptItem(false);
              setCarrier("ups");
              setRating(0);
              setHoverRating(0);
              setFeedback("");
            }}
            style={{
              background: "none",
              border: "none",
              color: PRIMARY,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              padding: "8px 16px",
            }}
          >
            Register another return
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      <BrowserChrome>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
        {step === 5 && <Step5 />}
      </BrowserChrome>
    </div>
  );
}
