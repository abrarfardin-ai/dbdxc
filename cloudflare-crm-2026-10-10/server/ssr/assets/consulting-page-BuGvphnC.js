import { t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import { o as useSiteSettings } from "./site-settings-provider-CWsrHPaR.js";
import { n as useSite } from "./providers-CI0GGmBy.js";
import { r as createLucideIcon, t as Check } from "./check-vFg82jRQ.js";
import { Copy, MotionLink, SectionLabel } from "./primitives-Ne8vVwBw.js";
import { SiteShell } from "./site-shell-ZuXY0u6A.js";
import { o as Training, t as CopyButton } from "./academy-offers-BF2XVsTo.js";
import { t as CalendarClock } from "./calendar-clock-CRGZs3C5.js";
import { a as supportMessage, i as rememberSupport, n as PaymentDetails, r as PaymentHelp, t as BuyerDetails } from "./payment-details-BidZdJOE.js";
//#region node_modules/lucide-react/dist/esm/icons/video.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Video = createLucideIcon("Video", [["path", {
	d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
	key: "ftymec"
}], ["rect", {
	x: "2",
	y: "6",
	width: "14",
	height: "12",
	rx: "2",
	key: "158x01"
}]]);
//#endregion
//#region components/consulting-page.tsx
var import_jsx_runtime = require_jsx_runtime();
var dhakaDate = (offset = 0) => new Intl.DateTimeFormat("en-CA", {
	timeZone: "Asia/Dhaka",
	year: "numeric",
	month: "2-digit",
	day: "2-digit"
}).format(new Date(Date.now() + offset * 864e5));
function BookingForm() {
	const { ready: settingsReady } = useSiteSettings();
	const { language } = useSite();
	const [duration, setDuration] = (0, import_react.useState)(30);
	const [date, setDate] = (0, import_react.useState)("");
	const [zone, setZone] = (0, import_react.useState)("Asia/Dhaka");
	const [localZone, setLocalZone] = (0, import_react.useState)("Asia/Dhaka");
	const [slots, setSlots] = (0, import_react.useState)([]);
	const [slot, setSlot] = (0, import_react.useState)("");
	const [remaining, setRemaining] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [retry, setRetry] = (0, import_react.useState)(0);
	const [availabilityFailed, setAvailabilityFailed] = (0, import_react.useState)(false);
	const availabilityCache = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const [success, setSuccess] = (0, import_react.useState)(null);
	const [support, setSupport] = (0, import_react.useState)("");
	const key = (0, import_react.useRef)("");
	(0, import_react.useEffect)(() => {
		key.current = `swc_${crypto.randomUUID()}`;
		setDate(dhakaDate());
		setLocalZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!date) return;
		const abort = new AbortController();
		let active = true;
		const cacheKey = `${date}:${duration}`;
		const cached = availabilityCache.current.get(cacheKey);
		setSlot("");
		setError("");
		setAvailabilityFailed(false);
		setRemaining(null);
		setSlots([]);
		if (cached && cached.expires > Date.now()) {
			setSlots(cached.data.availableStarts);
			setRemaining(cached.data.spotsLeft);
			setLoading(false);
			return;
		}
		setLoading(true);
		const timeout = setTimeout(() => {
			if (active) {
				setAvailabilityFailed(true);
				setLoading(false);
				abort.abort();
			}
		}, 16e3);
		async function load() {
			try {
				const r = await fetch("/api/availability", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						start: `${date}T00:00:00+06:00`,
						end: `${date}T23:59:59+06:00`,
						duration
					}),
					signal: abort.signal
				});
				const d = await r.json();
				if (!r.ok || !d.ok || !Array.isArray(d.availableStarts)) throw Error("availability");
				if (!active || abort.signal.aborted) return;
				availabilityCache.current.set(cacheKey, {
					data: d,
					expires: Date.now() + 15e3
				});
				setSlots(d.availableStarts);
				setRemaining(d.spotsLeft);
			} catch {
				if (active && !abort.signal.aborted) setAvailabilityFailed(true);
			} finally {
				clearTimeout(timeout);
				if (active && !abort.signal.aborted) setLoading(false);
			}
		}
		load();
		return () => {
			active = false;
			clearTimeout(timeout);
			abort.abort();
		};
	}, [
		date,
		duration,
		retry
	]);
	const amount = duration === 30 ? 500 : 1e3;
	const format = (s) => new Intl.DateTimeFormat(language === "bn" ? "bn-BD" : "en-GB", {
		timeZone: zone,
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	}).format(new Date(s));
	if (success) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "checkout-success",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 30 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Your booking is awaiting approval.",
				bn: "আপনার বুকিং অনুমোদনের অপেক্ষায়।"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "v6-copy-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: success.booking_number }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { value: success.booking_number })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				format(success.preferred_start),
				" · ",
				zone
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Calendar invitation and Google Meet link will arrive after payment approval.",
				bn: "পেমেন্ট অনুমোদনের পর Calendar আমন্ত্রণ ও Google Meet লিংক পাবেন।"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionLink, {
				href: "/booking-status",
				className: "button button--primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Track my booking",
					bn: "বুকিংয়ের অবস্থা দেখুন"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentHelp, { message: support })
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "checkout-form",
		onSubmit: async (e) => {
			e.preventDefault();
			if (busy || !slot || !settingsReady) return;
			setBusy(true);
			setError("");
			try {
				const data = new FormData(e.currentTarget);
				data.set("duration", String(duration));
				data.set("preferredStart", slot);
				data.set("customerTimezone", zone);
				data.set("idempotencyKey", key.current);
				data.set("businessName", "");
				data.set("websiteUrl", "");
				data.set("goal", "");
				const r = await fetch("/api/bookings", {
					method: "POST",
					body: data
				});
				const d = await r.json();
				if (!r.ok || !d.ok) throw Error(d.message || "Could not save / সেভ হয়নি");
				const message = supportMessage(data, d.booking.booking_number, "Consultation", d.booking.amount_bdt);
				setSupport(message);
				rememberSupport(d.booking.booking_number, message);
				setSuccess(d.booking);
			} catch (e) {
				setError(e.message);
			} finally {
				setBusy(false);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Duration → Time → Pay",
				bn: "সময়কাল → সময় → পেমেন্ট"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "duration-picker",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Choose duration",
					bn: "সময়কাল বেছে নিন"
				}) }), [30, 60].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setDuration(d);
					},
					"aria-pressed": duration === d,
					className: duration === d ? "active" : "",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						d,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "MIN",
							bn: "মিনিট"
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["৳", d === 30 ? "500" : "1,000"] })]
				}, d))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Times shown in",
				bn: "সময় দেখাচ্ছে"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: zone,
				onChange: (e) => setZone(e.target.value),
				children: Array.from(new Set([
					"Asia/Dhaka",
					localZone,
					"UTC",
					"Europe/London",
					"America/New_York"
				])).map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: z }, z))
			})] }),
			localZone !== "Asia/Dhaka" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setZone(localZone),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Use my timezone",
					bn: "আমার টাইমজোন ব্যবহার করুন"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "v6-booking-dates",
				children: Array.from({ length: 14 }, (_, i) => dhakaDate(i)).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setDate(d);
					},
					"aria-pressed": date === d,
					children: new Intl.DateTimeFormat(language === "bn" ? "bn-BD" : "en-GB", {
						timeZone: "Asia/Dhaka",
						month: "short",
						day: "numeric"
					}).format(/* @__PURE__ */ new Date(`${d}T12:00:00+06:00`))
				}, d))
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Checking available times…",
					bn: "খালি সময় যাচাই হচ্ছে…"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: remaining !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: `${remaining} spots left on this Dhaka date`,
				bn: `ঢাকার এই তারিখে ${remaining}টি স্লট বাকি`
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "v6-booking-slots",
				children: slots.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": slot === s,
					onClick: () => setSlot(s),
					children: format(s)
				}, s))
			})] }),
			!loading && !availabilityFailed && remaining !== null && slots.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "No available times on this date. Please choose another day.",
					bn: "এই তারিখে সময় খালি নেই। অন্য দিন বেছে নিন।"
				})
			}),
			availabilityFailed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "form-error",
				role: "alert",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Times could not be loaded. Please try again.",
					bn: "সময়ের তালিকা লোড হয়নি। আবার চেষ্টা করুন।"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "button button--primary",
					onClick: () => {
						availabilityCache.current.delete(`${date}:${duration}`);
						setRetry((n) => n + 1);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Try again",
						bn: "আবার চেষ্টা করুন"
					})
				})]
			}),
			slot && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
					format(slot),
					" · ",
					zone
				] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentDetails, { amount }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyerDetails, { booking: true }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "button button--primary",
					disabled: busy || !settingsReady,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: busy ? "Submitting…" : "Verify my payment",
						bn: busy ? "জমা হচ্ছে…" : "আমার পেমেন্ট যাচাই করুন"
					})
				})
			] }),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "form-error",
				role: "alert",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentHelp, {})
		]
	});
}
function ConsultingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "consulting-hero",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container consulting-hero-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-reveal": true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
							en: "PRIVATE CONSULTING",
							bn: "ব্যক্তিগত কনসাল্টিং"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Less guessing.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "More clarity." })
							] }),
							bn: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"অনুমান কমান।",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "পরিষ্কার পথ জানুন।" })
							] })
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Work directly with Tazwar Abrar Fardin on video editing, cold email and your next client-hunting steps. Only two sessions a day so every call gets full attention.",
							bn: "ভিডিও এডিটিং, কোল্ড ইমেইল ও ক্লায়েন্ট খোঁজার পরবর্তী ধাপ নিয়ে তাজওয়ার আবরার ফারদিনের সঙ্গে কাজ করুন। প্রতিটি কলে পুরো মনোযোগ দিতে দিনে শুধু দুটি সেশন।"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "consulting-facts",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "18:00 - 23:00 Dhaka",
								bn: "সন্ধ্যা ৬টা - রাত ১১টা, ঢাকা"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { size: 18 }), "Google Meet"] })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "session-stack",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "QUICK CLARITY",
							bn: "দ্রুত পরামর্শ"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["30 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "MIN",
							bn: "মিনিট"
						}) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "৳500" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "One bottleneck. A focused conversation and a practical next step.",
							bn: "একটি সমস্যা। মনোযোগী আলোচনা ও বাস্তব পরবর্তী ধাপ।"
						}) })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "featured",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "BEST FOR REAL CLARITY",
								bn: "বিস্তারিত বোঝার সেরা সুযোগ"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["60 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "MIN",
								bn: "মিনিট"
							}) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "৳1,000" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Normally ৳5,000/hour. More room to review your workflow and plan each step.",
								bn: "সাধারণ মূল্য ঘণ্টায় ৳৫,০০০। আপনার কাজের পদ্ধতি ও প্রতিটি ধাপ নিয়ে বিস্তারিত আলোচনা।"
							}) })
						]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "product-section checkout-section",
			id: "book",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container checkout-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "checkout-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
							en: "YOUR NEXT STEP",
							bn: "আপনার পরবর্তী ধাপ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Bring your questions.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Leave with a plan." })
							] }),
							bn: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"প্রশ্ন নিয়ে আসুন।",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "পরিকল্পনা নিয়ে ফিরুন।" })
							] })
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Choose your duration, pick an available time, and send payment. Your meeting is confirmed after manual approval. No guaranteed business results.",
							bn: "সময়কাল ও খালি সময় বেছে পেমেন্ট পাঠান। যাচাইয়ের পরে মিটিং নিশ্চিত হবে। ব্যবসায়িক ফলাফলের নিশ্চয়তা নেই।"
						}) })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingForm, {})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Training, {})
	] });
}
//#endregion
export { ConsultingPage };
