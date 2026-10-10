import { t as require_jsx_runtime } from "../index.js";
import { t as ManagedAnchor } from "./site-settings-provider-CWsrHPaR.js";
import { n as ShieldCheck, r as createLucideIcon, t as Check } from "./check-vFg82jRQ.js";
import { Copy, MotionLink, SectionLabel } from "./primitives-Ne8vVwBw.js";
import { SiteShell, n as PrePurchaseLeadForm, o as ArrowUpRight } from "./site-shell-ZuXY0u6A.js";
import { i as OfferPrice, n as Customers, u as Play } from "./academy-offers-BF2XVsTo.js";
import { r as MapPinned } from "./target-D9o9oStu.js";
import { t as ExternalLink } from "./external-link-CfRwV9uG.js";
import { t as Instagram } from "./instagram-DZKs4ytk.js";
//#region node_modules/lucide-react/dist/esm/icons/book-open.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var BookOpen = createLucideIcon("BookOpen", [["path", {
	d: "M12 7v14",
	key: "1akyts"
}], ["path", {
	d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
	key: "ruj8y"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/headphones.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Headphones = createLucideIcon("Headphones", [["path", {
	d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
	key: "1xhozi"
}]]);
//#endregion
//#region components/interior-pages.tsx
var import_jsx_runtime = require_jsx_runtime();
function InteriorHero({ eyebrow, eyebrowBn, title, titleBn, copy, copyBn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "interior-hero",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container",
			"data-reveal": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
					en: eyebrow,
					bn: eyebrowBn
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: title,
					bn: titleBn
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: copy,
					bn: copyBn
				}) })
			]
		})
	});
}
function ExtensionsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteriorHero, {
			eyebrow: "OPERATOR EXTENSIONS",
			eyebrowBn: "অপারেটর এক্সটেনশন",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Own the workflow.",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Keep the leverage." })
			] }),
			titleBn: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"ওয়ার্কফ্লোর মালিক হন।",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "লেভারেজ নিজের রাখুন।" })
			] }),
			copy: "Two focused product systems for Instagram outreach and public-business lead research. One-time pricing, clear tutorials, and no invented outcome promises.",
			copyBn: "Instagram আউটরিচ এবং পাবলিক-বিজনেস লিড রিসার্চের জন্য দুইটি ফোকাসড প্রোডাক্ট সিস্টেম। একবারের মূল্য, পরিষ্কার টিউটোরিয়াল এবং কোনো কল্পিত ফলাফলের প্রতিশ্রুতি নেই।"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "interior-section",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container extension-cards",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					"data-reveal": true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "card-index",
							children: "01 / INSTAGRAM"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { size: 32 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "InstaWave" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Collect useful profile context, organize leads, and prepare more specific first-message drafts.",
							bn: "প্রোফাইল কনটেক্সট সংগ্রহ, লিড গুছানো এবং আরও নির্দিষ্ট প্রথম মেসেজ ড্রাফট তৈরি করুন।"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferPrice, { product: "instawave" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Customers, { product: "instawave" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MotionLink, {
							href: "/instawave",
							className: "button button--primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Explore InstaWave",
								bn: "InstaWave দেখুন"
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 16 })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					"data-reveal": true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "card-index",
							children: "02 / MAPS + SEARCH"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPinned, { size: 32 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Lead Data Tools" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Turn focused Google Maps and Google Search research into cleaner CSV-ready prospect lists.",
							bn: "ফোকাসড Google Maps ও Google Search রিসার্চকে ক্লিন CSV-রেডি প্রস্পেক্ট লিস্টে বদলে দিন।"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferPrice, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Customers, { product: "lead-data-tools" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MotionLink, {
							href: "/lead-data-tools",
							className: "button button--primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Explore Lead Tools",
								bn: "Lead Tools দেখুন"
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 16 })]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "interior-section compact",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container principle-strip",
				"data-reveal": true,
				children: [
					[
						ShieldCheck,
						"Manual payment approval",
						"ম্যানুয়াল পেমেন্ট অনুমোদন"
					],
					[
						Play,
						"Official setup tutorials",
						"অফিসিয়াল সেটআপ টিউটোরিয়াল"
					],
					[
						Check,
						"Server-locked pricing",
						"সার্ভার-লকড মূল্য"
					]
				].map(([Icon, en, bn]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: String(en),
					bn: String(bn)
				}) })] }, String(en)))
			})
		})
	] });
}
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "founder-profile",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container founder-profile-grid",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "founder-portrait",
				"data-reveal": true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/assets/abrar-khan.jpg",
					alt: "Tazwar Abrar Fardin, founder of SYNC WAVE Academy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FOUNDER / OPERATOR" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-reveal": "right",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						en: "TAZWAR ABRAR FARDIN",
						bn: "তাজওয়ার আবরার ফারদিন"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Built through execution.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Shared as a system." })
						] }),
						bn: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"কাজ করে তৈরি।",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "সিস্টেম হিসেবে শেয়ার।" })
						] })
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Tazwar Abrar Fardin is the founder behind SYNC WAVE Academy. His work focuses on practical client acquisition, lead research, outreach systems, and teaching operators to replace scattered effort with a clearer process.",
						bn: "তাজওয়ার আবরার ফারদিন SYNC WAVE Academy-এর ফাউন্ডার। তার কাজ প্র্যাকটিক্যাল ক্লায়েন্ট অ্যাকুইজিশন, লিড রিসার্চ, আউটরিচ সিস্টেম এবং ছড়ানো প্রচেষ্টাকে পরিষ্কার প্রসেসে বদলাতে অপারেটরদের শেখানোর উপর কেন্দ্রীভূত।"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "founder-proof",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "10+" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Years building skills",
								bn: "বছর স্কিল বিল্ডিং"
							}) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "270K+" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Community reach",
								bn: "কমিউনিটি রিচ"
							}) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Focused products",
								bn: "ফোকাসড প্রোডাক্ট"
							}) })] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "fine-print",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "These figures describe supplied founder history and audience reach, not a promise of buyer results.",
							bn: "এই সংখ্যাগুলো সরবরাহ করা ফাউন্ডার ইতিহাস ও অডিয়েন্স রিচ বোঝায়, ক্রেতার ফলাফলের প্রতিশ্রুতি নয়।"
						})
					})
				]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "interior-section",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container manifesto",
			"data-reveal": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 27 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "The strongest system is the one you can understand, repeat, measure, and improve.",
					bn: "সবচেয়ে শক্তিশালী সিস্টেম হলো যেটি আপনি বুঝতে, বারবার চালাতে, মাপতে এবং উন্নত করতে পারেন।"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TAZWAR ABRAR FARDIN" })
			]
		})
	})] });
}
function SupportPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteriorHero, {
			eyebrow: "PUBLIC SUPPORT",
			eyebrowBn: "পাবলিক সাপোর্ট",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Get the right answer,",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "without the noise." })
			] }),
			titleBn: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"সঠিক উত্তর পান,",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "অপ্রয়োজনীয় ঝামেলা ছাড়া।" })
			] }),
			copy: "For pre-purchase questions, checkout issues, or an existing order, email the official support address. Private post-submission WhatsApp is shown only after a real order or booking is saved.",
			copyBn: "কেনার আগের প্রশ্ন, চেকআউট সমস্যা বা বিদ্যমান অর্ডারের জন্য অফিসিয়াল সাপোর্ট ইমেইল করুন। প্রাইভেট পোস্ট-সাবমিশন WhatsApp শুধু বাস্তব অর্ডার বা বুকিং সেভ হওয়ার পর দেখানো হয়।"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "interior-section",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container support-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					"data-reveal": true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, { size: 26 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Email support",
							bn: "ইমেইল সাপোর্ট"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ManagedAnchor, {
							href: "mailto:abrarfardin@thesyncwave.com",
							children: ["abrarfardin@thesyncwave.com ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Include your order ID when asking about an existing purchase.",
							bn: "বিদ্যমান ক্রয় সম্পর্কে জানতে অর্ডার আইডি যুক্ত করুন।"
						}) })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					"data-reveal": true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 26 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Track securely",
							bn: "নিরাপদে ট্র্যাক করুন"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Use the same email submitted at checkout. Status lookup reveals only minimal order details.",
							bn: "চেকআউটে দেওয়া একই ইমেইল ব্যবহার করুন। স্ট্যাটাস লুকআপ শুধু ন্যূনতম অর্ডার তথ্য দেখায়।"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "button-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionLink, {
								href: "/order-status",
								className: "button",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									en: "Order status",
									bn: "অর্ডার স্ট্যাটাস"
								}) })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionLink, {
								href: "/booking-status",
								className: "button",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									en: "Booking status",
									bn: "বুকিং স্ট্যাটাস"
								}) })
							})]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "interior-section compact",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container lead-form-section",
				"data-reveal": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrePurchaseLeadForm, { title: "Tell us what you need before you buy" })
			})
		})
	] });
}
var legal = {
	terms: {
		title: "Terms of service",
		bn: "সেবার শর্তাবলি",
		intro: "These terms govern purchases, consulting requests, product access, and use of the SYNC WAVE Academy website.",
		introBn: "এই শর্তাবলি ক্রয়, কনসাল্টিং রিকোয়েস্ট, প্রোডাক্ট অ্যাকসেস এবং SYNC WAVE Academy ওয়েবসাইট ব্যবহারের নিয়ম নির্ধারণ করে।",
		sections: [
			[
				"Orders and approval",
				"অর্ডার ও অনুমোদন",
				"A submitted order remains PENDING until payment is manually verified. Submission alone does not grant access or confirm a consulting slot.",
				"পেমেন্ট ম্যানুয়ালি যাচাই না হওয়া পর্যন্ত সাবমিট করা অর্ডার PENDING থাকে। শুধু সাবমিশন অ্যাকসেস দেয় না বা কনসাল্টিং স্লট নিশ্চিত করে না।"
			],
			[
				"Responsible use",
				"দায়িত্বশীল ব্যবহার",
				"Use the products only for lawful research and outreach. Respect platform rules, privacy, consent, and applicable anti-spam requirements.",
				"শুধু আইনসম্মত রিসার্চ ও আউটরিচের জন্য প্রোডাক্ট ব্যবহার করুন। প্ল্যাটফর্ম নিয়ম, প্রাইভেসি, সম্মতি ও প্রযোজ্য অ্যান্টি-স্প্যাম নিয়ম মানুন।"
			],
			[
				"No outcome guarantee",
				"ফলাফলের গ্যারান্টি নেই",
				"Tools, education, and consulting support a process; they do not guarantee leads, clients, revenue, or complete public-data fields.",
				"টুল, শিক্ষা ও কনসাল্টিং একটি প্রসেসকে সাহায্য করে; লিড, ক্লায়েন্ট, আয় বা সম্পূর্ণ পাবলিক-ডেটা ফিল্ডের গ্যারান্টি দেয় না।"
			]
		]
	},
	privacy: {
		title: "Privacy policy",
		bn: "প্রাইভেসি পলিসি",
		intro: "We collect only the information needed to process an order, booking, support request, and secure owner operation.",
		introBn: "অর্ডার, বুকিং, সাপোর্ট রিকোয়েস্ট এবং নিরাপদ ওনার অপারেশন পরিচালনার জন্য প্রয়োজনীয় তথ্যই সংগ্রহ করি।",
		sections: [
			[
				"What we collect",
				"যা সংগ্রহ করি",
				"Name, contact details, selected product or session, transaction reference, optional image proof, and operational status history.",
				"নাম, যোগাযোগ তথ্য, নির্বাচিত প্রোডাক্ট বা সেশন, ট্রানজেকশন রেফারেন্স, ঐচ্ছিক ইমেজ প্রুফ এবং অপারেশনাল স্ট্যাটাস ইতিহাস।"
			],
			[
				"How it is protected",
				"যেভাবে সুরক্ষিত",
				"Order and booking tables are not directly readable by anonymous visitors. Payment proofs remain in a private storage bucket. Owner access is restricted to the approved email account.",
				"অ্যানোনিমাস ভিজিটর সরাসরি অর্ডার ও বুকিং টেবিল পড়তে পারে না। পেমেন্ট প্রুফ প্রাইভেট স্টোরেজে থাকে। ওনার অ্যাকসেস অনুমোদিত ইমেইলে সীমাবদ্ধ।"
			],
			[
				"Requests",
				"অনুরোধ",
				"For access, correction, or deletion requests, email abrarfardin@thesyncwave.com. Records required for fraud prevention, accounting, or legal compliance may be retained as necessary.",
				"অ্যাকসেস, সংশোধন বা ডিলিট অনুরোধের জন্য abrarfardin@thesyncwave.com-এ ইমেইল করুন। জালিয়াতি প্রতিরোধ, হিসাব বা আইনি প্রয়োজনের রেকর্ড প্রয়োজন অনুযায়ী রাখা হতে পারে।"
			]
		]
	},
	refund: {
		title: "Refund policy",
		bn: "রিফান্ড পলিসি",
		intro: "Digital access and consulting are manually approved. Contact support quickly if a payment or order detail is incorrect.",
		introBn: "ডিজিটাল অ্যাকসেস ও কনসাল্টিং ম্যানুয়ালি অনুমোদিত। পেমেন্ট বা অর্ডার তথ্য ভুল হলে দ্রুত সাপোর্টে যোগাযোগ করুন।",
		sections: [
			[
				"Before delivery",
				"ডেলিভারির আগে",
				"If payment cannot be verified, is duplicated, or the requested product cannot be delivered, support will review the transaction and available refund path.",
				"পেমেন্ট যাচাই না হলে, ডুপ্লিকেট হলে বা চাওয়া প্রোডাক্ট ডেলিভারি সম্ভব না হলে সাপোর্ট ট্রানজেকশন ও প্রযোজ্য রিফান্ড পাথ রিভিউ করবে।"
			],
			[
				"After digital access",
				"ডিজিটাল অ্যাকসেসের পরে",
				"Because access is digital and can be used immediately, change-of-mind refunds are generally unavailable after access has been granted, except where required by law or a verified delivery fault exists.",
				"ডিজিটাল অ্যাকসেস তাৎক্ষণিক ব্যবহারযোগ্য হওয়ায় অ্যাকসেস দেওয়ার পর সাধারণত মত পরিবর্তনের রিফান্ড পাওয়া যায় না; আইনগত বাধ্যবাধকতা বা যাচাইকৃত ডেলিভারি ত্রুটি ব্যতিক্রম।"
			],
			[
				"Consulting",
				"কনসাল্টিং",
				"A pending request does not reserve a final slot. Rescheduling or cancellation requests should be emailed before approval or as early as possible after confirmation.",
				"পেন্ডিং রিকোয়েস্ট চূড়ান্ত স্লট রিজার্ভ করে না। রিশিডিউল বা বাতিলের অনুরোধ অনুমোদনের আগে অথবা কনফার্মেশনের পর যত দ্রুত সম্ভব ইমেইল করুন।"
			]
		]
	}
};
function LegalPage({ kind }) {
	const data = legal[kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "legal-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container legal-grid",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				"data-reveal": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						en: "LEGAL / 2026-07-20",
						bn: "লিগ্যাল / ২০২৬-০৭-২০"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: data.title,
						bn: data.bn
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: data.intro,
						bn: data.introBn
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagedAnchor, {
						href: "mailto:abrarfardin@thesyncwave.com",
						children: "abrarfardin@thesyncwave.com"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "legal-content",
				"data-reveal": "right",
				children: data.sections.map(([title, bn, copy, copyBn], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(index + 1).padStart(2, "0") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: title,
						bn
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: copy,
						bn: copyBn
					}) })
				] }, title))
			})]
		})
	}) });
}
//#endregion
export { AboutPage, ExtensionsPage, LegalPage, SupportPage };
