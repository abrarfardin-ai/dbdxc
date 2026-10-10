import { t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import { o as useSiteSettings, t as ManagedAnchor } from "./site-settings-provider-CWsrHPaR.js";
import { n as ShieldCheck, r as createLucideIcon, t as Check } from "./check-vFg82jRQ.js";
import { Copy, MotionLink, SectionLabel } from "./primitives-Ne8vVwBw.js";
import { SiteShell, r as trackConversion } from "./site-shell-ZuXY0u6A.js";
import { c as academy, i as OfferPrice, l as InlineVideo, n as Customers, r as LicenseBadges, t as CopyButton, u as Play } from "./academy-offers-BF2XVsTo.js";
import { a as supportMessage, i as rememberSupport, n as PaymentDetails, r as PaymentHelp, t as BuyerDetails } from "./payment-details-BidZdJOE.js";
import { t as Search } from "./search-hmUjVOB4.js";
import { n as ArrowDown, t as FileSpreadsheet } from "./file-spreadsheet-yXUXMGc1.js";
import { n as Sparkles, r as MapPinned, t as Target } from "./target-D9o9oStu.js";
import { t as Instagram } from "./instagram-DZKs4ytk.js";
//#region node_modules/lucide-react/dist/esm/icons/message-square-text.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MessageSquareText = createLucideIcon("MessageSquareText", [
	["path", {
		d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
		key: "1lielz"
	}],
	["path", {
		d: "M13 8H7",
		key: "14i4kc"
	}],
	["path", {
		d: "M17 12H7",
		key: "16if0g"
	}]
]);
//#endregion
//#region components/checkout-form.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function CheckoutForm({ productId, productName, initialQuote = null }) {
	const { ready: settingsReady, settings } = useSiteSettings();
	const [quote, setQuote] = (0, import_react.useState)(initialQuote), [code, setCode] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)(false), [quoting, setQuoting] = (0, import_react.useState)(false), [error, setError] = (0, import_react.useState)(""), [success, setSuccess] = (0, import_react.useState)(null);
	const [support, setSupport] = (0, import_react.useState)("");
	const key = (0, import_react.useRef)("");
	const started = (0, import_react.useRef)(false);
	const requestId = (0, import_react.useRef)(0);
	async function pricing(value) {
		const id = ++requestId.current;
		setQuoting(true);
		setQuote(null);
		setError("");
		try {
			const r = await fetch("/api/quote", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					product: productId,
					code: value
				})
			});
			const d = await r.json();
			if (!r.ok || !d.ok || !d.quote) throw Error("Checkout is temporarily unavailable. Please retry before sending money. / এখন পেমেন্ট নেওয়া যাচ্ছে না। টাকা পাঠানোর আগে আবার চেষ্টা করুন।");
			if (id === requestId.current) setQuote(d.quote);
		} catch (e) {
			if (id === requestId.current) setError(e.message);
		} finally {
			if (id === requestId.current) setQuoting(false);
		}
	}
	(0, import_react.useEffect)(() => {
		key.current = `sw_${crypto.randomUUID()}`;
		if (!initialQuote) pricing("");
		return () => {
			requestId.current++;
		};
	}, [productId]);
	async function submit(form) {
		if (busy || !quote || quoting || !settingsReady) return;
		setBusy(true);
		setError("");
		try {
			const data = new FormData(form);
			data.set("productId", productId);
			data.set("expectedAmount", String(quote.amount));
			data.set("promoCode", quote.code);
			data.set("idempotencyKey", key.current);
			const r = await fetch("/api/orders", {
				method: "POST",
				body: data
			});
			const d = await r.json();
			if (!r.ok || !d.ok) throw Error(d.message || "Could not submit / অর্ডার জমা হয়নি");
			const message = supportMessage(data, d.orderId, d.productName, d.amount);
			setSupport(message);
			rememberSupport(d.orderId, message);
			setSuccess(d);
			trackConversion("checkout_submitted", { product: productId });
			window.dispatchEvent(new CustomEvent("sw-sound", { detail: "success" }));
		} catch (e) {
			setError(e.message);
		} finally {
			setBusy(false);
		}
	}
	if (success) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "checkout-success",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 34 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Payment submitted for review.",
				bn: "পেমেন্ট যাচাইয়ের জন্য জমা হয়েছে।"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "We’ll email your access after approval.",
				bn: "অনুমোদনের পর ইমেইলে অ্যাকসেস পাবেন।"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "v6-copy-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: success.orderId }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { value: success.orderId })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "v6-timeline",
				children: [
					["Submitted", "জমা হয়েছে"],
					["Verifying", "যাচাই চলছে"],
					["Approved", "অনুমোদন"],
					["Email sent", "ইমেইল পাঠানো"]
				].map(([en, bn], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: i < 2 ? "active" : "",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en,
						bn
					})
				}, en))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				success.productName,
				" · ৳",
				success.amount.toLocaleString("en-US")
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LicenseBadges, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionLink, {
				className: "button button--primary",
				href: "/order-status",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Track my order",
					bn: "অর্ডারের অবস্থা দেখুন"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionLink, {
				href: "/course/free-cold-email-system",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Watch your free class while we verify",
					bn: "যাচাই চলাকালে ফ্রি ক্লাস দেখুন"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentHelp, { message: support })
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "checkout-form v6-checkout",
		onSubmit: (e) => {
			e.preventDefault();
			submit(e.currentTarget);
		},
		onFocus: () => {
			if (!started.current) {
				started.current = true;
				trackConversion("checkout_started", { product: productId });
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "checkout-terminal-bar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "COMPLETE YOUR ORDER",
					bn: "আপনার অর্ডার করুন"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "selected-product",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: productName }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["৳", (quote?.amount ?? Number(productId === "instawave" ? settings.instawavePrice : settings.leadPrice)).toLocaleString("en-US")] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "v6-promo-disclosure",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Have a promo code?",
					bn: "প্রোমো কোড আছে?"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "v6-promo",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Promo code",
							bn: "প্রোমো কোড"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: code,
							onChange: (e) => setCode(e.target.value),
							maxLength: 60
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: quoting,
							onClick: () => pricing(code),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: quoting ? "Checking…" : "Apply",
								bn: quoting ? "যাচাই হচ্ছে…" : "ব্যবহার করুন"
							})
						}),
						quote && quote.discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							role: "status",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("del", { children: ["৳", quote.base] }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									en: `You saved ৳${quote.discount}`,
									bn: `আপনার সাশ্রয় ৳${quote.discount}`
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Find promo codes in our YouTube videos. Explore the channel and watch the videos for code announcements. ",
							bn: "প্রোমো কোড পেতে আমাদের YouTube চ্যানেলের ভিডিওগুলো দেখুন। ভিডিওতেই কোডের ঘোষণা পাবেন। "
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagedAnchor, {
							href: academy.youtube,
							target: "_blank",
							rel: "noreferrer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Watch the videos",
								bn: "ভিডিওগুলো দেখুন"
							})
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDetails, { amount: quote?.amount ?? null }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyerDetails, {}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "form-error",
				role: "alert",
				children: [
					error,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => pricing(code),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Retry",
							bn: "আবার চেষ্টা"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "button button--primary",
				disabled: busy || quoting || !quote || !settingsReady,
				type: "submit",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: busy ? "Submitting…" : "Verify my payment",
					bn: busy ? "জমা হচ্ছে…" : "আমার পেমেন্ট যাচাই করুন"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentHelp, {})
		]
	});
}
//#endregion
//#region components/product-page.tsx
function ProductFaq({ product, items }) {
	const [openIndex, setOpenIndex] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "faq-list",
		"data-reveal": true,
		"data-static-ui": true,
		children: items.map((item, index) => {
			const open = openIndex === index;
			const answerId = `${product}-faq-answer-${index}`;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `faq-item ${open ? "is-open" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "faq-question",
					type: "button",
					"aria-expanded": open,
					"aria-controls": answerId,
					onClick: () => setOpenIndex(open ? null : index),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: item.en,
						bn: item.bn,
						className: "faq-question-text"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "faq-icon",
						"aria-hidden": "true",
						children: "+"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "faq-answer",
					id: answerId,
					"aria-hidden": !open,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "faq-answer-inner",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: item.enA,
							bn: item.bnA,
							as: "p"
						})
					})
				})]
			}, item.en);
		})
	});
}
var productData = {
	instawave: {
		id: "instawave",
		name: "InstaWave",
		kicker: {
			en: "INSTAGRAM OUTREACH EXTENSION",
			bn: "INSTAGRAM আউটরিচ এক্সটেনশন"
		},
		title: {
			en: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Personalized Instagram outreach, built for ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "real conversations." })] }),
			bn: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["বাস্তব কথোপকথনের জন্য তৈরি ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "পার্সোনালাইজড Instagram আউটরিচ।" })] })
		},
		description: {
			en: "Turn comments, followers, following, and public profile details into a cleaner lead workflow. Then prepare a specific first-message draft instead of the same pitch for everyone.",
			bn: "কমেন্ট, ফলোয়ার, ফলোয়িং এবং পাবলিক প্রোফাইল ডিটেইলকে ক্লিন লিড ওয়ার্কফ্লোতে বদলে দিন। তারপর সবার জন্য একই পিচের বদলে নির্দিষ্ট প্রথম মেসেজ ড্রাফট তৈরি করুন।"
		},
		Icon: Instagram,
		tutorial: "https://www.youtube-nocookie.com/embed/IXXlU6yn1Qs?rel=0",
		tutorialLink: "https://youtu.be/IXXlU6yn1Qs",
		features: [
			{
				Icon: Target,
				en: "Lead collection",
				bn: "লিড কালেকশন",
				enCopy: "Collect useful prospects from comments, followers, following, and profile context.",
				bnCopy: "কমেন্ট, ফলোয়ার, ফলোয়িং ও প্রোফাইল কনটেক্সট থেকে দরকারি প্রস্পেক্ট নিন।"
			},
			{
				Icon: Sparkles,
				en: "Profile enrichment",
				bn: "প্রোফাইল এনরিচমেন্ট",
				enCopy: "Keep useful public details together so personalization has real context.",
				bnCopy: "পার্সোনালাইজেশনের জন্য দরকারি পাবলিক তথ্য এক জায়গায় রাখুন।"
			},
			{
				Icon: MessageSquareText,
				en: "Message drafts",
				bn: "মেসেজ ড্রাফট",
				enCopy: "Prepare a more natural opening based on the lead data already collected.",
				bnCopy: "কালেক্ট করা লিড ডেটার ভিত্তিতে আরও স্বাভাবিক ওপেনিং তৈরি করুন।"
			},
			{
				Icon: FileSpreadsheet,
				en: "CSV workflow",
				bn: "CSV ওয়ার্কফ্লো",
				enCopy: "Import lists, work from an organized queue, and export the data you need.",
				bnCopy: "লিস্ট ইমপোর্ট করুন, অর্গানাইজড কিউ থেকে কাজ করুন এবং দরকারি ডেটা এক্সপোর্ট করুন।"
			}
		],
		steps: [
			{
				en: "Import or collect",
				bn: "ইমপোর্ট বা কালেক্ট"
			},
			{
				en: "Review profile context",
				bn: "প্রোফাইল কনটেক্সট দেখুন"
			},
			{
				en: "Prepare specific drafts",
				bn: "নির্দিষ্ট ড্রাফট তৈরি করুন"
			},
			{
				en: "Export and execute",
				bn: "এক্সপোর্ট ও কাজ করুন"
			}
		],
		faq: [
			{
				en: "What does InstaWave help with?",
				bn: "InstaWave কী কাজে সাহায্য করে?",
				enA: "It helps organize Instagram-sourced lead data and prepare more personal first-message drafts from available context.",
				bnA: "এটি Instagram থেকে পাওয়া লিড ডেটা গুছাতে এবং পাওয়া কনটেক্সট থেকে আরও ব্যক্তিগত প্রথম মেসেজ ড্রাফট তৈরি করতে সাহায্য করে।"
			},
			{
				en: "Do I need advanced technical skills?",
				bn: "অ্যাডভান্সড টেকনিক্যাল স্কিল লাগবে?",
				enA: "No. Start with the official setup and installation tutorial before your first working session.",
				bnA: "না। প্রথম কাজের আগে অফিসিয়াল সেটআপ ও ইনস্টলেশন টিউটোরিয়াল দেখুন।"
			},
			{
				en: "Can I export leads?",
				bn: "লিড এক্সপোর্ট করা যাবে?",
				enA: "Yes. CSV import and export are part of the designed workflow.",
				bnA: "হ্যাঁ। CSV ইমপোর্ট ও এক্সপোর্ট ওয়ার্কফ্লোর অংশ।"
			},
			{
				en: "Is this a subscription?",
				bn: "এটি কি সাবস্ক্রিপশন?",
				enA: "No. Pay once for lifetime access. See the current price above.",
				bnA: "না। একবার পেমেন্টে লাইফটাইম অ্যাকসেস। বর্তমান মূল্য উপরে দেখুন।"
			}
		]
	},
	"lead-data-tools": {
		id: "lead-data-tools",
		name: "Lead Data Tools",
		kicker: {
			en: "2 CHROME EXTENSIONS · ONE BUNDLE",
			bn: "২টি CHROME এক্সটেনশন · একটি বান্ডল"
		},
		title: {
			en: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Turn ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Google Maps + Google Search" }),
				" into your lead list."
			] }),
			bn: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Google Maps + Google Search" }), "-কে আপনার লিড লিস্টে বদলে দিন।"] })
		},
		description: {
			en: "Find publicly available business information, organize prospects faster, and export cleaner lists for outreach or research.",
			bn: "পাবলিক বিজনেস তথ্য খুঁজুন, দ্রুত প্রস্পেক্ট গুছান এবং আউটরিচ বা রিসার্চের জন্য ক্লিন লিস্ট এক্সপোর্ট করুন।"
		},
		Icon: MapPinned,
		tutorial: "https://www.youtube-nocookie.com/embed/C21oQNxq_j8?rel=0",
		tutorialLink: "https://youtu.be/C21oQNxq_j8",
		features: [
			{
				Icon: MapPinned,
				en: "Maps discovery",
				bn: "ম্যাপস ডিসকভারি",
				enCopy: "Build location-based prospect lists from the Google Maps searches you already use.",
				bnCopy: "আপনার পরিচিত Google Maps সার্চ থেকে লোকেশনভিত্তিক প্রস্পেক্ট লিস্ট তৈরি করুন।"
			},
			{
				Icon: Search,
				en: "Niche research",
				bn: "নিশ রিসার্চ",
				enCopy: "Turn focused Google searches into cleaner prospect research for a chosen niche.",
				bnCopy: "ফোকাসড Google সার্চকে বেছে নেওয়া নিশের ক্লিন প্রস্পেক্ট রিসার্চে বদলে দিন।"
			},
			{
				Icon: FileSpreadsheet,
				en: "CSV-ready export",
				bn: "CSV-রেডি এক্সপোর্ট",
				enCopy: "Move organized results into the next step of your outreach workflow.",
				bnCopy: "অর্গানাইজড রেজাল্টকে আপনার আউটরিচ ওয়ার্কফ্লোর পরবর্তী ধাপে নিন।"
			},
			{
				Icon: ShieldCheck,
				en: "Public-data workflow",
				bn: "পাবলিক ডেটা ওয়ার্কফ্লো",
				enCopy: "Research public business details without promising that every field exists.",
				bnCopy: "সব ফিল্ড থাকবে এমন প্রতিশ্রুতি ছাড়া পাবলিক বিজনেস ডেটা রিসার্চ করুন।"
			}
		],
		steps: [
			{
				en: "Choose a niche or place",
				bn: "নিশ বা লোকেশন বাছুন"
			},
			{
				en: "Run the right search",
				bn: "সঠিক সার্চ চালান"
			},
			{
				en: "Review public details",
				bn: "পাবলিক তথ্য দেখুন"
			},
			{
				en: "Export a clean CSV",
				bn: "ক্লিন CSV এক্সপোর্ট করুন"
			}
		],
		faq: [
			{
				en: "What is included?",
				bn: "কী কী পাব?",
				enA: "Google Maps Scraper, Google Search Scraper, tutorial videos, and the CSV-ready workflow.",
				bnA: "Google Maps Scraper, Google Search Scraper, টিউটোরিয়াল ভিডিও এবং CSV-রেডি ওয়ার্কফ্লো।"
			},
			{
				en: "Can I try both tools first?",
				bn: "আগে কি দুই টুল ট্রাই করতে পারব?",
				enA: "Yes. The free-trial setup video and trial paths are provided in the tutorial area.",
				bnA: "হ্যাঁ। টিউটোরিয়াল অংশে ফ্রি-ট্রায়াল সেটআপ ভিডিও ও ট্রায়াল পাথ দেওয়া আছে।"
			},
			{
				en: "Will every business have an email?",
				bn: "সব বিজনেসের ইমেইল থাকবে?",
				enA: "No. Public information differs by business. The tools support research and list building; they do not promise every field.",
				bnA: "না। পাবলিক তথ্য বিজনেসভেদে আলাদা। টুলগুলো রিসার্চ ও লিস্ট বিল্ডিংয়ে সাহায্য করে; সব ফিল্ডের প্রতিশ্রুতি দেয় না।"
			},
			{
				en: "Is this a monthly subscription?",
				bn: "এটি কি মাসিক সাবস্ক্রিপশন?",
				enA: "No. Pay once for the lifetime bundle. See the current price above.",
				bnA: "না। একবার পেমেন্টে লাইফটাইম বান্ডল। বর্তমান মূল্য উপরে দেখুন।"
			}
		]
	}
};
function ProductPage({ product, initialQuote = null }) {
	const data = productData[product];
	const videos = product === "lead-data-tools" ? [
		{
			id: "g7fEXMdD8Xc",
			en: "1 Hour Free · The Complete Cold Email System I Use to Find Clients",
			bn: "১ ঘণ্টার ফ্রি ক্লাস · ক্লায়েন্ট খোঁজার সম্পূর্ণ কোল্ড ইমেইল সিস্টেম"
		},
		{
			id: "C21oQNxq_j8",
			en: "Get Leads While You Sleep | Google Maps Scraper V1.2",
			bn: "ঘুমের মধ্যেও লিড সংগ্রহ · Google Maps Scraper V1.2"
		},
		{
			id: "8qZ5AV-TS4U",
			en: "How to turn Google Search Into a Client Machine",
			bn: "Google Search দিয়ে ক্লায়েন্ট খোঁজার পদ্ধতি"
		}
	] : [{
		id: "IXXlU6yn1Qs",
		en: "InstaWave walkthrough",
		bn: "InstaWave ব্যবহার"
	}, {
		id: "GAtMFmaSaus",
		en: "Installation",
		bn: "ইনস্টলেশন"
	}];
	const [video, setVideo] = (0, import_react.useState)(videos[0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "v6-quick-nav",
			"aria-label": "Page sections",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagedAnchor, {
					href: "#tutorial",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Watch demo",
						bn: "ভিডিও দেখুন"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagedAnchor, {
					href: "#checkout",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Buy now",
						bn: "কিনুন"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagedAnchor, {
					href: "#faq",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Questions",
						bn: "প্রশ্নোত্তর"
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "v6-simple-product container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "v6-simple-intro",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						en: data.kicker.en,
						bn: data.kicker.bn
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: data.name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: product === "lead-data-tools" ? "Find public business details on Google Maps and Search. Export your list to CSV." : "Collect Instagram prospects, organize your list and prepare personalized messages.",
						bn: product === "lead-data-tools" ? "Google Maps ও Search থেকে ব্যবসার পাবলিক তথ্য খুঁজুন। CSV-তে লিস্ট ডাউনলোড করুন।" : "Instagram থেকে প্রস্পেক্ট খুঁজুন, লিস্ট গুছান ও ব্যক্তিগত মেসেজ তৈরি করুন।"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LicenseBadges, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "v6-product-summary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferPrice, { product }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Customers, { product })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "v6-watch-buy",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "tutorial",
					className: "v6-watch-column",
					children: [
						product === "lead-data-tools" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "v6-featured-class",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									en: video.id === "g7fEXMdD8Xc" ? "START HERE · FREE 1-HOUR CLASS" : "FREE TOOL WALKTHROUGH",
									bn: video.id === "g7fEXMdD8Xc" ? "এখান থেকে শুরু · ১ ঘণ্টার ফ্রি ক্লাস" : "টুল ব্যবহারের ফ্রি ভিডিও"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									en: video.en,
									bn: video.bn
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									en: "The complete system first. Explore the tool videos below when you’re ready.",
									bn: "আগে সম্পূর্ণ পদ্ধতিটি শিখুন। তারপর নিচের টুলের ভিডিওগুলো দেখুন।"
								}) })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineVideo, {
							id: video.id,
							title: video.en
						}, video.id),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "v6-video-tabs",
							children: videos.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-pressed": v.id === video.id,
								onClick: () => setVideo(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "v6-video-number",
									children: videos.indexOf(v) + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									en: v.id === "g7fEXMdD8Xc" ? "Free 1-hour class" : v.id === "C21oQNxq_j8" ? "Google Maps V1.2" : v.id === "8qZ5AV-TS4U" ? "Google Search" : v.en,
									bn: v.id === "g7fEXMdD8Xc" ? "ফ্রি ১ ঘণ্টার ক্লাস" : v.id === "C21oQNxq_j8" ? "Google Maps V1.2" : v.id === "8qZ5AV-TS4U" ? "Google Search" : v.bn
								})]
							}, v.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ManagedAnchor, {
							className: "button button--primary v6-after-video",
							href: "#checkout",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Ready? Complete your order",
								bn: "ভিডিও দেখেছেন? অর্ডার করুন"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { size: 16 })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "v6-short-note",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "One payment. Lifetime access. Delivered to your Google email after payment approval.",
								bn: "একবার পেমেন্ট, আজীবন অ্যাকসেস। পেমেন্ট যাচাইয়ের পর আপনার Google ইমেইলে ডেলিভারি।"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "checkout",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutForm, {
						initialQuote,
						productId: data.id,
						productName: data.name
					}, data.id)
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container v6-simple-faq",
			id: "faq",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Quick answers",
					bn: "কিছু দরকারি উত্তর"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductFaq, {
					product,
					items: data.faq
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "v6-short-note",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Use public data responsibly and follow platform rules. Results depend on your work.",
						bn: "পাবলিক ডেটা দায়িত্বশীলভাবে ব্যবহার করুন ও প্ল্যাটফর্মের নিয়ম মানুন। ফলাফল আপনার কাজের ওপর নির্ভর করে।"
					})
				})
			]
		})
	] });
}
//#endregion
export { ProductPage };
