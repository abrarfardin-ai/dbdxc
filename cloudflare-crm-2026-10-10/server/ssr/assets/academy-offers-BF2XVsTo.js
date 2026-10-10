import { C as __exportAll, t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import { o as useSiteSettings, t as ManagedAnchor } from "./site-settings-provider-CWsrHPaR.js";
import { n as useSite } from "./providers-CI0GGmBy.js";
import { n as ShieldCheck, r as createLucideIcon, t as Check } from "./check-vFg82jRQ.js";
import { Copy as Copy$1, MotionLink } from "./primitives-Ne8vVwBw.js";
import { r as useLiveCatalog, t as Zap } from "./zap-Dj7We4Ww.js";
//#region node_modules/lucide-react/dist/esm/icons/copy.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Copy = createLucideIcon("Copy", [["rect", {
	width: "14",
	height: "14",
	x: "8",
	y: "8",
	rx: "2",
	ry: "2",
	key: "17jyea"
}], ["path", {
	d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
	key: "zix9uf"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/infinity.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Infinity$1 = createLucideIcon("Infinity", [["path", {
	d: "M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z",
	key: "1z0uae"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/play.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Play = createLucideIcon("Play", [["polygon", {
	points: "6 3 20 12 6 21 6 3",
	key: "1oa8hb"
}]]);
//#endregion
//#region components/inline-video.tsx
var import_jsx_runtime = require_jsx_runtime();
function InlineVideo({ id, title }) {
	const { settings } = useSiteSettings();
	id = settings.videos[id] ?? id;
	const [playing, setPlaying] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "v6-inline-video",
		children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
			title,
			allow: "autoplay; encrypted-media; picture-in-picture; fullscreen",
			allowFullScreen: true
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setPlaying(true),
			"aria-label": `Play ${title}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
				alt: "",
				width: "480",
				height: "360",
				loading: "lazy"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
				size: 24,
				fill: "currentColor"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
				en: "Watch here",
				bn: "এখানেই দেখুন"
			})] })]
		})
	});
}
//#endregion
//#region lib/academy-config.ts
var academy = {
	founder: "Tazwar Abrar Fardin",
	whatsapp: "https://wa.me/8801990995417",
	paymentNumber: "01990995417",
	youtube: "https://www.youtube.com/@tazwarabrarfardin",
	courseLaunch: "2027-12-30T18:00:00Z",
	bank: {
		name: "City Bank",
		holder: "TAZWAR ABRAR FARDIN",
		account: "2103809628001",
		branch: "City Bank, Mymensingh Branch"
	}
};
var trainingVideos = [
	{
		id: "g7fEXMdD8Xc",
		title: "1 Hour Free: The Complete Cold Email System I Use to Find Clients",
		bn: "১ ঘণ্টার ফ্রি ক্লাস: ক্লায়েন্ট খোঁজার সম্পূর্ণ কোল্ড ইমেইল সিস্টেম"
	},
	{
		id: "C21oQNxq_j8",
		title: "Get Leads While You Sleep | Google Maps Scraper V1.2",
		bn: "Google Maps Scraper V1.2 দিয়ে লিড সংগ্রহ"
	},
	{
		id: "8qZ5AV-TS4U",
		title: "How to turn Google Search Into a Client Machine",
		bn: "Google Search দিয়ে ক্লায়েন্ট খোঁজার পদ্ধতি"
	}
];
//#endregion
//#region components/academy-offers.tsx
var academy_offers_exports = /* @__PURE__ */ __exportAll({
	CopyButton: () => CopyButton,
	Customers: () => Customers,
	LicenseBadges: () => LicenseBadges,
	OfferPrice: () => OfferPrice,
	OfferStrip: () => OfferStrip,
	Training: () => Training
});
function CopyButton({ value }) {
	const [state, setState] = (0, import_react.useState)("idle");
	const { language } = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "v6-copy",
		"aria-label": language === "bn" ? "কপি করুন" : "Copy",
		onClick: async () => {
			try {
				await navigator.clipboard.writeText(value);
				setState("done");
				setTimeout(() => setState("idle"), 2200);
				window.dispatchEvent(new CustomEvent("sw-sound", { detail: "copy" }));
			} catch {
				setState("error");
			}
		},
		children: [state === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			role: "status",
			children: state === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
				en: "Copied ✓",
				bn: "কপি হয়েছে ✓"
			}) : state === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
				en: "Select and copy",
				bn: "লেখা বেছে কপি করুন"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
				en: "Copy",
				bn: "কপি"
			})
		})]
	});
}
function LicenseBadges() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "v6-badges",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Infinity$1, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
				en: "Unlimited devices",
				bn: "অসীম ডিভাইস"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Infinity$1, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
				en: "Lifetime access",
				bn: "আজীবন অ্যাকসেস"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
				en: "No API needed",
				bn: "API লাগে না"
			})] })
		]
	});
}
function Customers({ product }) {
	const { products } = useLiveCatalog();
	const count = products?.find((row) => row.slug === product)?.customers;
	return !count ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "v6-sales",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "v6-customers",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: count }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
					en: "approved purchases",
					bn: "টি অনুমোদিত ক্রয়"
				})
			]
		})
	});
}
function OfferPrice({ product = "lead-data-tools" }) {
	const { settings: s } = useSiteSettings();
	const price = Number(product === "instawave" ? s.instawavePrice : s.leadPrice);
	const original = Number(product === "instawave" ? s.instawaveOriginal : s.leadOriginal);
	const discount = Math.round((1 - price / original) * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "v6-offer-inline",
		children: [
			original > price && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("del", { children: ["৳", original.toLocaleString("en-US")] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["৳", price.toLocaleString("en-US")] }),
			discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
				en: `${discount}% OFF`,
				bn: `${discount}% ছাড়`
			}) })
		]
	});
}
function Training({ all = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "v6-training container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "v6-section-head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
				en: "VALUE FIRST. ALWAYS.",
				bn: "আগে শিখুন, তারপর সিদ্ধান্ত নিন।"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
				en: "Start with a free class.",
				bn: "শুরু হোক ফ্রি ক্লাস দিয়ে।"
			}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagedAnchor, {
				href: academy.youtube,
				target: "_blank",
				rel: "noreferrer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
					en: "Visit YouTube",
					bn: "YouTube চ্যানেল দেখুন"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `v6-video-grid ${all ? "is-all" : ""}`,
			children: trainingVideos.slice(0, all ? 3 : 1).map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "v6-video-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineVideo, {
					id: v.id,
					title: v.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: i === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
						en: "1-HOUR FREE TRAINING",
						bn: "১ ঘণ্টার ফ্রি ট্রেনিং"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
						en: "FREE WORKFLOW VIDEO",
						bn: "ফ্রি ব্যবহার নির্দেশনা"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
						en: v.title,
						bn: v.bn
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
						en: "Watch the workflow before you buy. Learn at your own pace, with no email gate.",
						bn: "কেনার আগে কাজের পদ্ধতি দেখুন। নিজের গতিতে শিখুন, ইমেইল দেওয়ার বাধ্যবাধকতা নেই।"
					}) })
				] })]
			}, v.id))
		})]
	});
}
function OfferStrip() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "v6-offer-strip container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
				en: "OWN YOUR WORKFLOW",
				bn: "নিজের কাজের সিস্টেম তৈরি করুন"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
				en: "One payment. A lifetime of possibility.",
				bn: "একবার পেমেন্ট। আজীবন সম্ভাবনা।"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LicenseBadges, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
				en: "Built for public business data. Platform rules and rate limits still apply. No guaranteed leads or revenue.",
				bn: "পাবলিক ব্যবসায়িক তথ্য সংগ্রহের জন্য। প্ল্যাটফর্মের নিয়ম ও সীমা প্রযোজ্য। লিড বা আয়ের নিশ্চয়তা নেই।"
			}) })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "v6-offer-price",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferPrice, { product: "lead-data-tools" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionLink, {
					className: "button button--primary",
					href: "/lead-data-tools#checkout",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
						en: "Get Lead Data Tools",
						bn: "Lead Data Tools নিন"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy$1, {
					en: "Find promo codes in our YouTube videos",
					bn: "প্রোমো কোড পেতে আমাদের YouTube ভিডিওগুলো দেখুন"
				}) })
			]
		})]
	});
}
//#endregion
export { OfferStrip as a, academy as c, Infinity$1 as d, OfferPrice as i, InlineVideo as l, Customers as n, Training as o, LicenseBadges as r, academy_offers_exports as s, CopyButton as t, Play as u };
