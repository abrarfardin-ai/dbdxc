import { t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import { n as ShieldCheck } from "./check-vFg82jRQ.js";
import { Copy, SectionLabel, StatusPill } from "./primitives-Ne8vVwBw.js";
import { SiteShell, i as CircleAlert, t as Clock3 } from "./site-shell-ZuXY0u6A.js";
import { r as PaymentHelp } from "./payment-details-BidZdJOE.js";
import { t as Search } from "./search-hmUjVOB4.js";
import { t as CircleCheck } from "./circle-check-G2fazJZR.js";
//#region components/status-lookup.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function StatusLookup({ kind }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const isOrder = kind === "order";
	async function submit(form) {
		setLoading(true);
		setError("");
		setResult(null);
		const values = new FormData(form);
		const response = await fetch(`/api/${isOrder ? "order" : "booking"}-status`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				[isOrder ? "orderId" : "bookingId"]: values.get("publicId"),
				email: values.get("email")
			})
		});
		const payload = await response.json().catch(() => ({
			ok: false,
			message: "Status could not be loaded."
		}));
		if (!response.ok || !payload.ok) setError(payload.message || "Status could not be loaded.");
		else setResult((isOrder ? payload.order : payload.booking) || null);
		setLoading(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "status-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container status-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						en: isOrder ? "ORDER TRACKING" : "BOOKING TRACKING",
						bn: isOrder ? "অর্ডার ট্র্যাকিং" : "বুকিং ট্র্যাকিং"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: isOrder ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Know exactly where",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "your order stands." })
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Know exactly where",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "your booking stands." })
						] }),
						bn: isOrder ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"আপনার অর্ডার কোথায় আছে",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "ঠিকভাবে জানুন।" })
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"আপনার বুকিং কোথায় আছে",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "ঠিকভাবে জানুন।" })
						] })
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Use the public ID and the exact email submitted with the request. We return only the minimum status information.",
						bn: "পাবলিক আইডি এবং রিকোয়েস্টে দেওয়া সঠিক ইমেইল ব্যবহার করুন। আমরা শুধু ন্যূনতম স্ট্যাটাস তথ্য দেখাই।"
					}) })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "status-panel",
				"data-reveal": "right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						submit(e.currentTarget);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "checkout-terminal-bar",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 13 }), " PRIVATE LOOKUP"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "READY" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: isOrder ? "Order ID" : "Booking ID",
							bn: isOrder ? "অর্ডার আইডি" : "বুকিং আইডি"
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "publicId",
							required: true,
							placeholder: isOrder ? "SWA-20260720-029" : "SWC-20260720-029"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Submission email",
							bn: "সাবমিশন ইমেইল"
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "email",
							type: "email",
							required: true,
							autoComplete: "email",
							placeholder: "name@gmail.com"
						})] }),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-error",
							role: "alert",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 17 }), error]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "button button--primary checkout-submit",
							disabled: loading,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Checking…",
								bn: "চেক হচ্ছে…"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Check status",
								bn: "স্ট্যাটাস দেখুন"
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 15 })]
						})
					]
				}), result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lookup-result",
					role: "status",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							tone: String(result.status).includes("ERROR") ? "red" : String(result.status) === "PENDING" ? "gold" : "green",
							children: String(result.status)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: String(result[isOrder ? "order_number" : "booking_number"]) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", { children: isOrder ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Product",
								bn: "প্রোডাক্ট"
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: String(result.product_name_snapshot) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Amount",
								bn: "মূল্য"
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["৳", Number(result.amount_bdt).toLocaleString("en-US")] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Proof",
								bn: "প্রুফ"
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: String(result.proof_status) })] })
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Duration",
								bn: "সময়"
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [String(result.duration_minutes), " min"] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Amount",
								bn: "মূল্য"
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["৳", Number(result.amount_bdt).toLocaleString("en-US")] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Preferred time",
								bn: "পছন্দের সময়"
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: new Date(String(result.preferred_start)).toLocaleString("en-GB", {
								timeZone: "Asia/Dhaka",
								dateStyle: "medium",
								timeStyle: "short"
							}) })] })
						] }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: result.status === "PENDING" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Verification is pending. No access or final slot has been confirmed yet.",
							bn: "ভেরিফিকেশন পেন্ডিং। এখনো অ্যাকসেস বা চূড়ান্ত স্লট নিশ্চিত হয়নি।"
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "This is the latest recorded status.",
							bn: "এটি সর্বশেষ রেকর্ড করা স্ট্যাটাস।"
						})] }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentHelp, {
							reference: String(result[isOrder ? "order_number" : "booking_number"]),
							message: `Hello SYNC WAVE, please help with ${String(result[isOrder ? "order_number" : "booking_number"])}. Current status: ${String(result.status)}`
						})
					]
				})]
			})]
		})
	}) });
}
//#endregion
export { StatusLookup };
