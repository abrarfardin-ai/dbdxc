import { t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import { t as ManagedAnchor } from "./site-settings-provider-CWsrHPaR.js";
import { n as ShieldCheck, r as createLucideIcon, t as Check } from "./check-vFg82jRQ.js";
import { Copy, MotionLink, SectionLabel, StatusPill } from "./primitives-Ne8vVwBw.js";
import { SiteShell, o as ArrowUpRight } from "./site-shell-ZuXY0u6A.js";
import { t as Zap } from "./zap-Dj7We4Ww.js";
import { d as Infinity$1, i as OfferPrice, n as Customers, o as Training, r as LicenseBadges, u as Play } from "./academy-offers-BF2XVsTo.js";
import { t as CalendarClock } from "./calendar-clock-CRGZs3C5.js";
import { n as ArrowDown, t as FileSpreadsheet } from "./file-spreadsheet-yXUXMGc1.js";
import { n as Sparkles, r as MapPinned, t as Target } from "./target-D9o9oStu.js";
//#region components/lifetime-value.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function LifetimeValue() {
	const [monthly, setMonthly] = (0, import_react.useState)(20);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container lifetime-value",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Infinity$1, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "PAY ONCE. KEEP BUILDING.",
				bn: "একবার পেমেন্ট। কাজ চলুক।"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Your tools shouldn't be another monthly bill.",
				bn: "প্রতি মাসে টুলের বিল কেন?"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Get our extensions with a one-time payment, lifetime access and lifetime product support.",
				bn: "একবার পেমেন্টে আমাদের এক্সটেনশন নিন। সঙ্গে লাইফটাইম অ্যাকসেস ও প্রোডাক্ট সাপোর্ট।"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: [
				["No monthly subscription", "মাসিক সাবস্ক্রিপশন নেই"],
				["Learn with the free class", "ফ্রি ক্লাস দেখে শুরু করুন"],
				["Get help when you need it", "প্রয়োজনে সাপোর্ট পান"]
			].map(([en, bn]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en,
				bn
			})] }, en)) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MotionLink, {
				href: "/extensions",
				className: "button button--primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Choose your lifetime tool",
					bn: "আপনার লাইফটাইম টুল বেছে নিন"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 17 })]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lifetime-comparison",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "A subscription example",
					bn: "সাবস্ক্রিপশনের একটি উদাহরণ"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lifetime-options",
					children: [
						10,
						20,
						50
					].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-pressed": v === monthly,
						onClick: () => setMonthly(v),
						children: [
							"$",
							v,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "/month" })
						]
					}, v))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lifetime-annual",
					"aria-live": "polite",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["$", monthly * 12] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "every year",
						bn: "প্রতি বছর"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lifetime-own",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "SYNC WAVE · Lead Data Tools" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferPrice, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "One payment. No monthly renewal.",
							bn: "একবার পেমেন্ট। মাসিক নবায়ন নেই।"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Illustrative subscription costs, not competitor quotes. USD and BDT are shown separately; no currency conversion is implied.",
					bn: "এটি উদাহরণভিত্তিক খরচ, কোনো প্রতিদ্বন্দ্বীর মূল্য নয়। ডলার ও টাকা আলাদাভাবে দেখানো হয়েছে।"
				}) })
			]
		})]
	});
}
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/arrow-right.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowRight = createLucideIcon("ArrowRight", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]);
//#endregion
//#region components/home-page.tsx
function ProductInterface({ type }) {
	if (type === "instawave") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "product-interface interface-instagram",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "interface-bar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "INSTAWAVE / LEAD QUEUE" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "interface-body",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "profile-rail",
				children: [
					"AM",
					"RK",
					"NS",
					"FL"
				].map((name, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
					className: index === 0 ? "active" : "",
					children: name
				}, name))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "profile-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "profile-top",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "AM" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Atlas Media" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Creative studio · Dhaka" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { children: "READY" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "signal-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "NICHE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Video production" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "signal-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "RECENT SIGNAL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "New service launch" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "message-draft",
						children: "“Saw the new launch work, the visual direction is sharp. Are you already using a consistent outbound system?”"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "safe-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PUBLIC DATA WORKFLOW" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "DEMO" })
						]
					})
				]
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "product-interface interface-lead",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "interface-bar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "LEAD DATA / MAPS SCAN" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "map-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "map-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "map-lines" }),
					[
						"a",
						"b",
						"c",
						"d"
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
						className: `pin pin-${item}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPinned, { size: 15 })
					}, item)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scan-beam" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "result-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "result-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "SAMPLE PUBLIC RESULTS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "DEMO" })]
					}),
					[
						"Smile Lab",
						"North Studio",
						"Care Point"
					].map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "result-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Website found" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 13 })
						]
					}, name)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "export-ready",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { size: 16 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "CSV READY" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })
						]
					})
				]
			})]
		})]
	});
}
function HeroVisual() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hero-visual",
		"data-reveal": "right",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-orbit orbit-one" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-orbit orbit-two" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero-photo-frame",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/assets/abrar-khan.jpg",
						alt: "Tazwar Abrar Fardin, founder of SYNC WAVE Academy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-photo-grade" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "photo-label",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), " TAZWAR ABRAR FARDIN / FOUNDER"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "floating-card floating-card--top",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PUBLIC SIGNAL" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "New prospect found" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Dhaka · Creative services" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "floating-card floating-card--bottom",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "OUTREACH DRAFT" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Context matched" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "UI DEMO" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "visual-index",
				children: "SW / 01"
			})
		]
	});
}
function ProductSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "home-section products-section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-heading",
				"data-reveal": true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
					en: "THE OPERATOR STACK",
					bn: "অপারেটর স্ট্যাক"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Two tools. One clearer route to ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "client conversations." })] }),
					bn: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["দুই টুল। ক্লায়েন্ট কথোপকথনের জন্য ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "একটি পরিষ্কার পথ।" })] })
				}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Start with the data source that matches your market, then keep the workflow focused from signal to export.",
					bn: "আপনার মার্কেটের সঠিক ডেটা সোর্স দিয়ে শুরু করুন, তারপর সিগন্যাল থেকে এক্সপোর্ট পর্যন্ত ওয়ার্কফ্লো ফোকাসড রাখুন।"
				}) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "home-products",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "home-product-card home-product-card--insta",
					"data-reveal": "card",
					"data-motion-card": true,
					"data-cursor": "OPEN",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "product-card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								tone: "teal",
								children: "LIVE / INSTAGRAM"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "InstaWave" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Turn Instagram comments, followers, and public profile context into a safer, more personal outreach workflow.",
							bn: "Instagram কমেন্ট, ফলোয়ার এবং পাবলিক প্রোফাইল কনটেক্সটকে আরও নিরাপদ ও ব্যক্তিগত আউটরিচ ওয়ার্কফ্লোতে বদলে দিন।"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductInterface, { type: "instawave" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "product-card-foot",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									en: "LIFETIME ACCESS",
									bn: "লাইফটাইম অ্যাকসেস"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferPrice, { product: "instawave" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Customers, { product: "instawave" })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionLink, {
								href: "/instawave",
								className: "card-arrow",
								"aria-label": "Open InstaWave",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "home-product-card home-product-card--lead",
					"data-reveal": "card",
					"data-motion-card": true,
					"data-cursor": "OPEN",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "product-card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								tone: "gold",
								children: "2-TOOL BUNDLE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "02" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Lead Data Tools" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Turn Google Maps and Google Search into cleaner prospect research and CSV-ready lead lists.",
							bn: "Google Maps এবং Google Search-কে ক্লিন প্রস্পেক্ট রিসার্চ ও CSV-রেডি লিড লিস্টে বদলে দিন।"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductInterface, { type: "lead" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "product-card-foot",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									en: "LIFETIME BUNDLE",
									bn: "লাইফটাইম বান্ডল"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferPrice, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Customers, { product: "lead-data-tools" })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionLink, {
								href: "/lead-data-tools",
								className: "card-arrow",
								"aria-label": "Open Lead Data Tools",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})
							})]
						})
					]
				})]
			})]
		})
	});
}
function CustomerJourney() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "home-section customer-journey",
		id: "how-it-works",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Three simple steps.",
				bn: "মাত্র তিনটি ধাপ।"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "journey-grid",
				children: [
					[
						"Watch the demo",
						"ভিডিও দেখুন",
						"See how your tool works.",
						"টুল কীভাবে কাজ করে দেখে নিন।"
					],
					[
						"Pay & submit",
						"পেমেন্ট ও ফর্ম",
						"Send payment and enter your details.",
						"টাকা পাঠিয়ে প্রয়োজনীয় তথ্য দিন।"
					],
					[
						"Get access",
						"অ্যাকসেস পান",
						"We email your access after approval.",
						"যাচাইয়ের পর ইমেইলে অ্যাকসেস পাবেন।"
					]
				].map(([en, bn, copy, bcopy], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					"data-reveal": "card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["0", i + 1] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en,
							bn
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: copy,
							bn: bcopy
						}) })
					]
				}, en))
			})]
		})
	});
}
var DEFAULT_HERO_CONTENT = {
	eyebrow: "OUTREACH TOOLS · LEAD RESEARCH · OPERATOR EDUCATION",
	supporting: "Operator-built outreach tools, lead-data tools, free training, and direct working sessions for finding prospects and starting better client conversations.",
	primaryLabel: "Explore the tools",
	secondaryLabel: "Watch the workflow"
};
function HomePage() {
	const [heroContent, setHeroContent] = (0, import_react.useState)(DEFAULT_HERO_CONTENT);
	(0, import_react.useEffect)(() => {
		let current = true;
		fetch("/api/public-content?key=homepage.hero", { cache: "no-store" }).then(async (response) => response.ok ? await response.json() : null).then((result) => {
			const content = result?.content;
			if (!current || !content || typeof content !== "object") return;
			const safe = (value, fallback, min, max) => typeof value === "string" && value.trim().length >= min ? value.trim().slice(0, max) : fallback;
			setHeroContent({
				eyebrow: safe(content.eyebrow, DEFAULT_HERO_CONTENT.eyebrow, 8, 100),
				supporting: safe(content.supporting, DEFAULT_HERO_CONTENT.supporting, 30, 360),
				primaryLabel: safe(content.primary_label, DEFAULT_HERO_CONTENT.primaryLabel, 2, 40),
				secondaryLabel: safe(content.secondary_label, DEFAULT_HERO_CONTENT.secondaryLabel, 2, 40)
			});
		}).catch(() => null);
		return () => {
			current = false;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "home-hero",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container home-hero-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "home-hero-copy",
					"data-reveal": "mask",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
							en: heroContent.eyebrow,
							bn: "আউটরিচ টুল · লিড রিসার্চ · অপারেটর শিক্ষা"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Find the signal.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Build the system.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Start the conversation." })
							] }),
							bn: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"সিগন্যাল খুঁজুন।",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"সিস্টেম বানান।",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "কথোপকথন শুরু করুন।" })
							] })
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: heroContent.supporting,
							bn: "প্রস্পেক্ট খোঁজা ও ভালো ক্লায়েন্ট কথোপকথন শুরু করার জন্য অপারেটর-নির্মিত আউটরিচ টুল, লিড-ডেটা টুল, ফ্রি ট্রেনিং এবং সরাসরি ওয়ার্কিং সেশন।"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LicenseBadges, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Customers, { product: "lead-data-tools" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "button-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MotionLink, {
								href: "/lead-data-tools",
								className: "button button--primary",
								"data-cursor": "EXPLORE",
								"data-magnetic": true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									en: "Get Lead Data Tools",
									bn: "Lead Data Tools দেখুন"
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 16 })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ManagedAnchor, {
								href: "#how-it-works",
								className: "button",
								"data-cursor": "WATCH",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									en: heroContent.secondaryLabel,
									bn: "ওয়ার্কফ্লো দেখুন"
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 14 })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MotionLink, {
							href: "/consulting",
							className: "hero-tertiary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Book a working session",
								bn: "ওয়ার্কিং সেশন বুক করুন"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hero-trust",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MotionLink, {
									href: "/extensions",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
										en: "One-time pricing",
										bn: "একবারের মূল্য"
									}) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MotionLink, {
									href: "/support",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
										en: "Manual verification",
										bn: "ম্যানুয়াল যাচাই"
									}) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MotionLink, {
									href: "/support",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
										en: "Drive delivery after approval",
										bn: "অনুমোদনের পর Drive ডেলিভারি"
									}) })]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroVisual, {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container hero-data-strip",
				"data-reveal": "card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Public signals",
							bn: "পাবলিক সিগন্যাল"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Research the right source",
							bn: "সঠিক সোর্স রিসার্চ"
						}) })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "02" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Cleaner context",
							bn: "ক্লিন কনটেক্সট"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Organize what matters",
							bn: "দরকারি তথ্য গুছান"
						}) })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "03" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Sharper outreach",
							bn: "কার্যকর আউটরিচ"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Start specific conversations",
							bn: "নির্দিষ্ট কথোপকথন শুরু"
						}) })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-scroll",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "SCROLL TO ENTER",
							bn: "প্রবেশ করতে স্ক্রল"
						}) })]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "marquee",
			"aria-label": "SYNC WAVE capabilities",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [[
				"LEAD INTELLIGENCE",
				"INSTAGRAM OUTREACH",
				"PUBLIC SIGNALS",
				"CSV WORKFLOWS",
				"CLIENT SYSTEMS",
				"LIFETIME OWNERSHIP"
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [item, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "✦" })] }, item)), [
				"LEAD INTELLIGENCE",
				"INSTAGRAM OUTREACH",
				"PUBLIC SIGNALS",
				"CSV WORKFLOWS",
				"CLIENT SYSTEMS",
				"LIFETIME OWNERSHIP"
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [item, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "✦" })] }, `b-${item}`))] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Training, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductSection, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifetimeValue, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerJourney, {})
	] });
}
//#endregion
export { HomePage };
