import { t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import { o as useSiteSettings, t as ManagedAnchor } from "./site-settings-provider-CWsrHPaR.js";
import { n as useSite } from "./providers-CI0GGmBy.js";
import { Copy } from "./primitives-Ne8vVwBw.js";
import { t as CopyButton } from "./academy-offers-BF2XVsTo.js";
//#region lib/support-message.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function supportMessage(form, reference, item, amount) {
	return [
		"Hello SYNC WAVE, I need help with my submission.",
		`ID: ${reference}`,
		`Product / service: ${item}`,
		`Amount: BDT ${amount}`,
		"Status: Submitted for review (not payment confirmation)",
		...[
			["Name", "customerName"],
			["Work email", "customerEmail"],
			["WhatsApp", "customerPhone"],
			["Payment method", "paymentMethod"],
			["TrxID / reference", "transactionId"],
			["Duration (minutes)", "duration"],
			["Meeting start", "preferredStart"],
			["Timezone", "customerTimezone"],
			["Business", "businessName"],
			["Website", "websiteUrl"],
			["Goal", "goal"]
		].map(([label, key]) => {
			const value = String(form.get(key) || "").trim().slice(0, 1e3);
			return value ? `${label}: ${value}` : "";
		}).filter(Boolean)
	].join("\n");
}
function rememberSupport(reference, message) {
	try {
		sessionStorage.setItem("sw-support:" + reference, JSON.stringify({
			message,
			expiresAt: Date.now() + 864e5
		}));
	} catch {}
}
function recalledSupport(reference) {
	try {
		const key = "sw-support:" + reference;
		const data = JSON.parse(sessionStorage.getItem(key) || "null");
		if (data && typeof data.message === "string" && Number(data.expiresAt) > Date.now()) return data.message;
		sessionStorage.removeItem(key);
	} catch {}
	return "";
}
//#endregion
//#region components/payment-details.tsx
var import_jsx_runtime = require_jsx_runtime();
function PaymentDetails({ amount }) {
	const { settings: s, ready } = useSiteSettings();
	const [selected, setSelected] = (0, import_react.useState)("BKASH");
	const methods = [
		s.bkashEnabled ? "BKASH" : "",
		s.nagadEnabled ? "NAGAD" : "",
		s.bankEnabled ? "BANK" : ""
	].filter(Boolean);
	const method = methods.includes(selected) ? selected : methods[0];
	const staging = false;
	if (!ready || amount === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "status",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
			en: "Checking payment details… Please wait before sending money.",
			bn: "পেমেন্টের তথ্য যাচাই হচ্ছে… টাকা পাঠানোর আগে অপেক্ষা করুন।"
		})
	});
	const number = String(method === "NAGAD" ? s.nagadNumber : s.bkashNumber);
	const bankRows = [
		[
			s.bankName,
			"Bank",
			"ব্যাংক"
		],
		[
			s.bankHolder,
			"Account holder",
			"অ্যাকাউন্টের নাম"
		],
		[
			s.bankAccount,
			"Account number",
			"অ্যাকাউন্ট নম্বর"
		],
		[
			s.bankBranch,
			"Branch",
			"শাখা"
		]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "v6-payment simple-payment",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "hidden",
				name: "paymentMethod",
				value: method
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Step 1: Send money",
				bn: "ধাপ ১: টাকা পাঠান"
			}) }),
			staging,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "v6-copy-row payment-amount",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Amount",
						bn: "পরিমাণ"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["৳", amount.toLocaleString("en-US")] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { value: String(amount) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "v6-payment-methods",
				role: "group",
				"aria-label": "Payment method",
				children: methods.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": method === m,
					onClick: () => setSelected(m),
					children: m === "BKASH" ? "bKash" : m === "NAGAD" ? "Nagad" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Bank",
						bn: "ব্যাংক"
					})
				}, m))
			}),
			method !== "BANK" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Send Money · Personal number",
				bn: "Send Money করুন · Personal নম্বর"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "v6-copy-row payment-number",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: number }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { value: number })]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "payment-bank",
				children: [bankRows.map(([value, en, bn]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "v6-copy-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: String(en),
						bn: String(bn)
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: String(value) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { value: String(value) })]
				}, String(en))), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagedAnchor, {
					href: String(s.bankTutorial),
					target: "_blank",
					rel: "noreferrer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "How to transfer",
						bn: "টাকা পাঠানোর নিয়ম"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "payment-next",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Then enter your details and TrxID below.",
					bn: "এরপর নিচে আপনার তথ্য ও TrxID দিন।"
				})
			})
		]
	});
}
function BuyerDetails({ booking = false }) {
	const { language } = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "v6-step-title",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Step 2: Your details",
				bn: "ধাপ ২: আপনার তথ্য"
			}) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
			en: "Name (optional)",
			bn: "নাম (ঐচ্ছিক)"
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			name: "customerName",
			maxLength: 120,
			autoComplete: "name"
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "v6-buyer-fields",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Work Email:",
						bn: "Work Email:"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "customerEmail",
						required: true,
						type: "email",
						maxLength: 160,
						autoComplete: "email",
						placeholder: "Your Email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: booking ? "Your Meet link will arrive here." : "Your access will arrive here.",
						bn: booking ? "এখানেই Meet লিংক পাবেন।" : "এখানেই অ্যাকসেস পাবেন।"
					}) })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "WhatsApp number *",
					bn: "WhatsApp নম্বর *"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "customerPhone",
					required: true,
					minLength: 8,
					maxLength: 25,
					autoComplete: "tel",
					inputMode: "tel",
					placeholder: "01XXXXXXXXX",
					pattern: "[+0-9][0-9\\s\\(\\)\\-]+"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "TrxID / Bank reference *",
					bn: "TrxID / ব্যাংক রেফারেন্স *"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "transactionId",
					required: true,
					minLength: 3,
					maxLength: 100,
					autoComplete: "off",
					placeholder: language === "bn" ? "পেমেন্টের TRXID লিখুন" : "Enter your payment TRXID"
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "honeypot",
			"aria-hidden": "true",
			children: ["Website", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				name: "website",
				tabIndex: -1,
				autoComplete: "off"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "v6-terms",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "checkbox",
				name: "acceptTerms",
				value: "yes",
				required: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "I agree to the ",
					bn: "আমি সম্মত: "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagedAnchor, {
					href: "/terms",
					target: "_blank",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Terms",
						bn: "শর্তাবলি"
					})
				}),
				", ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagedAnchor, {
					href: "/privacy",
					target: "_blank",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Privacy",
						bn: "প্রাইভেসি"
					})
				}),
				", ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagedAnchor, {
					href: "/refund",
					target: "_blank",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Refund policy",
						bn: "রিফান্ড নীতি"
					})
				}),
				"."
			] })]
		})
	] });
}
function PaymentHelp({ message = "", reference = "" }) {
	const [saved, setSaved] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setSaved(reference ? recalledSupport(reference) : "");
	}, [reference]);
	message = saved ? [saved, message].filter(Boolean).join("\n") : message;
	const { settings } = useSiteSettings();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "v6-payment-help",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: `https://wa.me/${String(settings.whatsapp).replace(/\D/g, "")}${message ? `?text=${encodeURIComponent(message)}` : ""}`,
			target: "_blank",
			rel: "noreferrer",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Need help? Message on WhatsApp",
				bn: "সাহায্য লাগবে? WhatsApp-এ লিখুন"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
			en: "Opens WhatsApp with your submitted details. Review before sending. ",
			bn: "আপনার জমা দেওয়া তথ্যসহ WhatsApp খুলবে। পাঠানোর আগে দেখে নিন। "
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
			en: "Text or voice messages only · No calls",
			bn: "শুধু text বা voice message · Call নয়"
		})] })]
	});
}
//#endregion
export { supportMessage as a, rememberSupport as i, PaymentDetails as n, PaymentHelp as r, BuyerDetails as t };
