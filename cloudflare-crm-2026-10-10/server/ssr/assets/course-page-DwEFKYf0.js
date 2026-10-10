import { t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import { t as ManagedAnchor } from "./site-settings-provider-CWsrHPaR.js";
import { n as useSite } from "./providers-CI0GGmBy.js";
import { Copy, MotionLink, SectionLabel } from "./primitives-Ne8vVwBw.js";
import { SiteShell } from "./site-shell-ZuXY0u6A.js";
import { a as OfferStrip, c as academy, o as Training } from "./academy-offers-BF2XVsTo.js";
//#region components/course-page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function CoursePage() {
	const { language } = useSite();
	const [seconds, setSeconds] = (0, import_react.useState)(null);
	const [state, setState] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const update = () => setSeconds(Math.max(0, Math.floor((Date.parse(academy.courseLaunch) - Date.now()) / 1e3)));
		update();
		const timer = setInterval(update, 1e3);
		return () => clearInterval(timer);
	}, []);
	const values = seconds === null ? [
		"...",
		"...",
		"...",
		"..."
	] : [
		Math.floor(seconds / 86400),
		Math.floor(seconds / 3600) % 24,
		Math.floor(seconds / 60) % 60,
		seconds % 60
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container v6-course-hero",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
					en: "COURSE · IN PRODUCTION",
					bn: "কোর্স · তৈরি হচ্ছে"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
					"Client Hunting Mastery:",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Land High-Paying Clients Without Marketplaces",
						bn: "মার্কেটপ্লেস ছাড়াই ভালো ক্লায়েন্ট খুঁজুন"
					}) })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "An ambitious A-Z client-hunting course, built in Bangladesh with proof, practical systems and a clear roadmap. Eight videos (around one hour) are ready. Bigger projects take more time, and we’re building them carefully.",
					bn: "প্রমাণ, বাস্তব সিস্টেম ও পরিষ্কার রোডম্যাপসহ বাংলাদেশে তৈরি A-Z ক্লায়েন্ট হান্টিং কোর্স। ৮টি ভিডিও, প্রায় এক ঘণ্টা, তৈরি হয়েছে। বড় প্রজেক্টের কাজ চলছে, তাই আরও সময় লাগছে।"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "v6-countdown",
					"aria-label": "Course countdown",
					children: [
						["Days", "দিন"],
						["Hours", "ঘণ্টা"],
						["Minutes", "মিনিট"],
						["Seconds", "সেকেন্ড"]
					].map(([en, bn], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: values[i] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en,
						bn
					}) })] }, en))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "31 December 2027, 00:00 Dhaka · Pre-book opens soon.",
					bn: "৩১ ডিসেম্বর ২০২৭, রাত ১২টা, ঢাকা · প্রি-বুক শীঘ্রই।"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "v6-waitlist",
					onSubmit: async (e) => {
						e.preventDefault();
						if (busy) return;
						setBusy(true);
						setState("");
						const form = new FormData(e.currentTarget);
						try {
							if (!(await fetch("/api/waitlist", {
								method: "POST",
								headers: { "content-type": "application/json" },
								body: JSON.stringify({
									name: form.get("name"),
									phone: form.get("phone"),
									utm_source: new URLSearchParams(location.search).get("utm_source") || "",
									utm_medium: new URLSearchParams(location.search).get("utm_medium") || "",
									utm_campaign: new URLSearchParams(location.search).get("utm_campaign") || "",
									email: form.get("email"),
									consent: form.get("consent"),
									website: form.get("website"),
									language
								})
							})).ok) throw Error();
							setState(language === "bn" ? "আপনার অনুরোধ গ্রহণ করা হয়েছে। নতুন সাবস্ক্রিপশন হলে স্বাগত ইমেইল পাবেন।" : "Request received. New subscribers will receive a welcome email.");
						} catch {
							setState(language === "bn" ? "এখন সেভ হয়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।" : "Not saved. Please try again later.");
						} finally {
							setBusy(false);
						}
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Be first to hear.",
							bn: "সবার আগে খবর পান।"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "course-lead-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Your name",
								bn: "আপনার নাম"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "name",
								autoComplete: "name",
								required: true,
								maxLength: 120
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "course-lead-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "WhatsApp number",
								bn: "WhatsApp নম্বর"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "phone",
								autoComplete: "tel",
								type: "tel",
								required: true,
								minLength: 8,
								maxLength: 25,
								pattern: "[+0-9][0-9 ()-]+",
								placeholder: "01XXXXXXXXX"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "email",
							type: "email",
							required: true,
							"aria-label": language === "bn" ? "ইমেইল" : "Email",
							placeholder: "you@gmail.com",
							maxLength: 160
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "consent",
							type: "checkbox",
							required: true,
							value: "yes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Email me course launch updates.",
							bn: "কোর্সের আপডেট আমাকে ইমেইল করুন।"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "honeypot",
							"aria-hidden": "true",
							children: ["Website", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "website",
								tabIndex: -1
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "button button--primary",
							disabled: busy,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: busy ? "Saving…" : "Join the waitlist",
								bn: busy ? "সেভ হচ্ছে…" : "অপেক্ষার তালিকায় যোগ দিন"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "status",
							children: state
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionLink, {
					href: "/course/free-cold-email-system",
					className: "button",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Explore the free lesson",
						bn: "ফ্রি লেসন দেখুন"
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Training, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferStrip, {})
	] });
}
function FreeLesson() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "container v6-course-hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
				en: "FREE LESSON · COLD EMAIL",
				bn: "ফ্রি লেসন · কোল্ড ইমেইল"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "The Complete Cold Email System I Use to Find Clients",
				bn: "ক্লায়েন্ট খোঁজার সম্পূর্ণ কোল্ড ইমেইল সিস্টেম"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "A free class by Tazwar Abrar Fardin. Watch the original lesson, then use the roadmap and tools to organize your next steps.",
				bn: "তাজওয়ার আবরার ফারদিনের ফ্রি ক্লাস। মূল ভিডিওটি দেখুন, তারপর রোডম্যাপ ও টুল দিয়ে নিজের পরবর্তী কাজ গুছিয়ে নিন।"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "v6-lesson-video",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: "Free cold email class",
					src: "https://www.youtube-nocookie.com/embed/g7fEXMdD8Xc",
					loading: "lazy",
					allowFullScreen: true,
					style: {
						width: "100%",
						aspectRatio: "16 / 9",
						border: 0,
						borderRadius: 20
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Put the class into practice",
				bn: "ক্লাসের পরে কাজে নামুন"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Define one audience and a relevant offer.",
					bn: "একটি নির্দিষ্ট গ্রাহকগোষ্ঠী ও প্রাসঙ্গিক অফার ঠিক করুন।"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Research public business information and verify your context.",
					bn: "পাবলিক ব্যবসায়িক তথ্য সংগ্রহ করে প্রাসঙ্গিকতা যাচাই করুন।"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Prepare a specific message, respect opt-outs and platform rules.",
					bn: "নির্দিষ্ট মেসেজ তৈরি করুন, যোগাযোগ বন্ধের অনুরোধ ও প্ল্যাটফর্মের নিয়ম মানুন।"
				}) })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "This is a suggested practice checklist, not a transcript or a promise of results.",
				bn: "এটি অনুশীলনের প্রস্তাবিত তালিকা, ভিডিওর প্রতিলিপি বা ফলাফলের প্রতিশ্রুতি নয়।"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManagedAnchor, {
				className: "button",
				href: "/downloads/sync-wave-cold-email-roadmap.pdf",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Download the free roadmap",
					bn: "ফ্রি রোডম্যাপ ডাউনলোড করুন"
				})
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferStrip, {})] });
}
//#endregion
export { CoursePage, FreeLesson };
