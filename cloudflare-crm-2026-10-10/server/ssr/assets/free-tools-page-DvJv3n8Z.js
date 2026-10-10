import { t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import { n as useSite } from "./providers-CI0GGmBy.js";
import { r as createLucideIcon, t as Check } from "./check-vFg82jRQ.js";
import { Copy, MotionLink, SectionLabel } from "./primitives-Ne8vVwBw.js";
import { SiteShell, o as ArrowUpRight } from "./site-shell-ZuXY0u6A.js";
import { t as CopyButton } from "./academy-offers-BF2XVsTo.js";
import { t as RotateCcw } from "./rotate-ccw-BpFgfnal.js";
import { t as Search } from "./search-hmUjVOB4.js";
//#region node_modules/lucide-react/dist/esm/icons/download.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Download = createLucideIcon("Download", [
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["polyline", {
		points: "7 10 12 15 17 10",
		key: "2ggqvy"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "15",
		y2: "3",
		key: "1vk2je"
	}]
]);
//#endregion
//#region lib/free-tools.ts
function domainName(input) {
	const value = input.trim().toLowerCase().replace(/\.$/, "");
	if (value.length > 253 || !value.includes(".") || !value.split(".").every((p) => /^_?[a-z0-9](?:[a-z0-9-]{0,60}[a-z0-9])?$/.test(p))) throw Error("Enter a domain such as example.com / example.com-এর মতো ডোমেইন দিন");
	return value;
}
function setupCost(messages, perInbox, inboxesPerDomain, inboxMonthly, domainYearly) {
	if (![
		messages,
		perInbox,
		inboxesPerDomain,
		inboxMonthly,
		domainYearly
	].every(Number.isFinite) || messages < 1 || perInbox < 1 || inboxesPerDomain < 1 || inboxMonthly < 0 || domainYearly < 0) throw Error("Use positive quantities and non-negative prices.");
	const inboxes = Math.ceil(messages / perInbox), domains = Math.ceil(inboxes / inboxesPerDomain);
	return {
		inboxes,
		domains,
		monthly: inboxes * inboxMonthly + domains * domainYearly / 12,
		annual: inboxes * inboxMonthly * 12 + domains * domainYearly
	};
}
function dmarcRecord(domain, email, policy) {
	domainName(domain);
	if (!/^[^\s@;,]+@[^\s@;,]+\.[^\s@;,]+$/.test(email) || ![
		"none",
		"quarantine",
		"reject"
	].includes(policy)) throw Error("Check the report email and policy.");
	return `v=DMARC1; p=${policy}; rua=mailto:${email}; pct=100`;
}
function spfRecord(includes, policy) {
	const domains = [...new Set(includes.split(/[\s,]+/).filter(Boolean).map(domainName))];
	if (!domains.length || domains.length > 10 || !["~all", "-all"].includes(policy)) throw Error("Enter 1-10 provider include domains.");
	return `v=spf1 ${domains.map((d) => `include:${d}`).join(" ")} ${policy}`;
}
function spamSignals(text) {
	const hits = [
		"guaranteed",
		"100% free",
		"act now",
		"risk free",
		"winner",
		"make money fast",
		"no obligation"
	].filter((w) => text.toLowerCase().includes(w));
	const links = text.match(/https?:\/\//g)?.length ?? 0;
	return {
		words: text.trim() ? text.trim().split(/\s+/).length : 0,
		hits,
		links,
		excessivePunctuation: /!{2,}/.test(text),
		allCaps: /\b[A-Z]{6,}\b/.test(text)
	};
}
function generatePassword(length, sets) {
	if (!Number.isInteger(length) || length < 12 || length > 128) throw Error("Choose a length between 12 and 128.");
	const groups = [
		sets.lower ? "abcdefghijkmnopqrstuvwxyz" : "",
		sets.upper ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "",
		sets.digits ? "23456789" : "",
		sets.symbols ? "!@#$%&*+-=?" : ""
	].filter(Boolean);
	if (!groups.length) throw Error("Select at least one character group.");
	const random = (max) => {
		const limit = Math.floor(256 / max) * max;
		const bytes = new Uint8Array(1);
		do
			crypto.getRandomValues(bytes);
		while (bytes[0] >= limit);
		return bytes[0] % max;
	};
	const alphabet = groups.join("");
	const result = groups.map((g) => g[random(g.length)]);
	while (result.length < length) result.push(alphabet[random(alphabet.length)]);
	for (let i = result.length - 1; i > 0; i--) {
		const j = random(i + 1);
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result.join("");
}
function prospectQueries(niche, location) {
	const clean = (s) => s.trim().replace(/["\r\n]/g, " ").slice(0, 100);
	const n = clean(niche), l = clean(location);
	if (!n || !l) throw Error("Enter both niche and location.");
	return [
		`site:instagram.com "${n}" "${l}"`,
		`site:instagram.com "${n}" "${l}" "contact"`,
		`"${n}" "${l}" "@gmail.com"`,
		`site:linkedin.com/company "${n}" "${l}"`
	].join("\n");
}
var launchChecklist = [
	"Choose a relevant business domain",
	"Create named business inboxes",
	"Publish one valid SPF record",
	"Enable provider DKIM signing",
	"Start DMARC monitoring and review reports",
	"Test replies and bounce handling",
	"Use accurate sender identity and a clear opt-out",
	"Research public business context",
	"Send a small relevant test campaign",
	"Review results and unsubscribe requests"
];
//#endregion
//#region components/free-tools-page.tsx
var import_jsx_runtime = require_jsx_runtime();
var tools = [
	{
		id: "draft",
		name: "WaveDraft",
		bn: "ইমেইল ড্রাফট",
		en: "Write a relevant first email",
		hint: "Create a structured draft from your own research. Template based; no AI claims."
	},
	{
		id: "cost",
		name: "InboxBudget",
		bn: "সেটআপের খরচ",
		en: "Plan your outreach budget",
		hint: "Estimate inbox and domain costs using your own prices."
	},
	{
		id: "checklist",
		name: "LaunchChecklist",
		bn: "সেটআপ চেকলিস্ট",
		en: "Prepare your email setup",
		hint: "Check each step and download your own progress."
	},
	{
		id: "password",
		name: "SafeKey",
		bn: "পাসওয়ার্ড তৈরি",
		en: "Create a strong password",
		hint: "Generated privately in your browser. Never saved or sent."
	},
	{
		id: "dmarc",
		name: "DomainShield",
		bn: "DMARC তৈরি",
		en: "Build a DMARC record",
		hint: "Begin with monitoring. Only enforce after checking legitimate senders."
	},
	{
		id: "spf",
		name: "SenderRecord",
		bn: "SPF তৈরি",
		en: "Build one SPF record",
		hint: "Use include domains from your email provider. Merge with existing senders."
	},
	{
		id: "dns",
		name: "SenderCheck",
		bn: "SPF পরীক্ষা",
		en: "Check live DNS records",
		hint: "Only the entered domain is sent to Google Public DNS when you run this check."
	},
	{
		id: "spam",
		name: "CopyCheck",
		bn: "ইমেইলের লেখা পরীক্ষা",
		en: "Review your email copy",
		hint: "Find common warning signs. This does not predict inbox placement."
	},
	{
		id: "search",
		name: "ProspectSearch",
		bn: "প্রস্পেক্ট সার্চ",
		en: "Build focused search queries",
		hint: "Find public business context before you start a conversation."
	}
];
var initial = {
	name: "",
	company: "",
	observation: "",
	offer: "",
	sender: "",
	daily: "100",
	perInbox: "25",
	perDomain: "3",
	inboxCost: "6",
	domainCost: "12",
	length: "20",
	domain: "",
	report: "",
	policy: "none",
	includes: "",
	all: "~all",
	text: "",
	niche: "",
	location: ""
};
function FreeToolsPage() {
	const { language } = useSite();
	const [selected, setSelected] = (0, import_react.useState)("draft");
	const [filter, setFilter] = (0, import_react.useState)("");
	const [values, setValues] = (0, import_react.useState)(initial);
	const [output, setOutput] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [checked, setChecked] = (0, import_react.useState)([]);
	const [sets, setSets] = (0, import_react.useState)({
		lower: true,
		upper: true,
		digits: true,
		symbols: true
	});
	const tool = tools.find((t) => t.id === selected);
	function field(key, en, bn, type = "text") {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
			en,
			bn
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value: values[key],
			required: true,
			maxLength: key === "text" ? 1e4 : 300,
			min: type === "number" ? 0 : void 0,
			onChange: (e) => setValues((v) => ({
				...v,
				[key]: e.target.value
			}))
		})] }, key);
	}
	function reset() {
		setValues(initial);
		setOutput("");
		setError("");
		setChecked([]);
		setSets({
			lower: true,
			upper: true,
			digits: true,
			symbols: true
		});
	}
	async function run() {
		setError("");
		setOutput("");
		setBusy(true);
		try {
			if (selected === "draft") {
				if (![
					"name",
					"company",
					"observation",
					"offer",
					"sender"
				].every((k) => values[k].trim())) throw Error("Fill in the research and sender details. / সব তথ্য পূরণ করুন।");
				setOutput(`Subject: A thought for ${values.company}\n\nHi ${values.name},\n\n${values.observation}\n\nI help businesses with ${values.offer}. Would a short example be useful for ${values.company}?\n\nThanks,\n${values.sender}\n\nIf this is not relevant, reply and I will not follow up.`);
			}
			if (selected === "cost") {
				const c = setupCost(+values.daily, +values.perInbox, +values.perDomain, +values.inboxCost, +values.domainCost);
				setOutput(`${c.inboxes} inboxes / ইনবক্স\n${c.domains} domains / ডোমেইন\n$${c.monthly.toFixed(2)} monthly equivalent\n$${c.annual.toFixed(2)} per year\n\nPlanning estimate only. Sending capacity, taxes and provider limits vary.`);
			}
			if (selected === "password") setOutput(generatePassword(+values.length, sets));
			if (selected === "dmarc") setOutput(`Host: _dmarc.${values.domain.trim()}\nType: TXT\n${dmarcRecord(values.domain, values.report, values.policy)}\n\nUse a reporting address you control. External-domain reporting may require authorization.`);
			if (selected === "spf") setOutput(spfRecord(values.includes, values.all));
			if (selected === "dns") {
				const r = await fetch("/api/tools/spf", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ domain: values.domain })
				});
				const d = await r.json();
				if (!r.ok) throw Error(d.message);
				setOutput([
					...d.records,
					"",
					...d.checks
				].join("\n"));
			}
			if (selected === "spam") {
				if (!values.text.trim()) throw Error("Paste your email first.");
				const r = spamSignals(values.text);
				setOutput(`Words: ${r.words}\nLinks: ${r.links}\nPhrases to review: ${r.hits.join(", ") || "None from this checklist"}\nRepeated exclamation marks: ${r.excessivePunctuation ? "Yes" : "No"}\nLong uppercase words: ${r.allCaps ? "Yes" : "No"}\n\nThis is a writing review, not a deliverability guarantee.`);
			}
			if (selected === "search") setOutput(prospectQueries(values.niche, values.location));
			if (selected === "checklist") setOutput(launchChecklist.map((v, i) => `${checked.includes(i) ? "[x]" : "[ ]"} ${v}`).join("\n"));
		} catch (e) {
			setError(e.message);
		} finally {
			setBusy(false);
		}
	}
	function download() {
		const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `sync-wave-${selected}.txt`;
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container lab-hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
				en: "THE FREE TOOLKIT",
				bn: "আপনার ফ্রি টুলকিট"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Less setup. More progress.",
				bn: "সেটআপ সহজ। কাজ এগিয়ে নিন।"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Nine useful tools. No signup. Start with the task in front of you.",
				bn: "নয়টি কাজের টুল। সাইনআপ লাগে না। আপনার প্রয়োজনের টুলটি বেছে নিন।"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "lab-search",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: filter,
					onChange: (e) => setFilter(e.target.value),
					placeholder: language === "bn" ? "টুল খুঁজুন…" : "Find a tool…",
					"aria-label": "Find a tool"
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container lab-layout",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			"aria-label": "Free tools",
			className: "lab-nav",
			children: tools.filter((t) => `${t.name} ${t.en} ${t.bn}`.toLowerCase().includes(filter.toLowerCase())).map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-current": selected === t.id ? "true" : void 0,
				onClick: () => {
					if (!busy) {
						setSelected(t.id);
						setOutput("");
						setError("");
					}
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(i + 1).padStart(2, "0") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: t.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: language === "bn" ? t.bn : t.en })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 16 })
				]
			}, t.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "lab-workspace",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["SYNC WAVE / ", tool.name] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: language === "bn" ? tool.bn : tool.en }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tool.hint })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						run();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lab-fields",
						children: [
							selected === "draft" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								field("name", "Recipient name", "প্রাপকের নাম"),
								field("company", "Company", "প্রতিষ্ঠান"),
								field("observation", "A real observation", "একটি বাস্তব পর্যবেক্ষণ"),
								field("offer", "Your service", "আপনার সেবা"),
								field("sender", "Your name", "আপনার নাম")
							] }),
							selected === "cost" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								field("daily", "Target messages per day", "প্রতিদিনের লক্ষ্য", "number"),
								field("perInbox", "Messages per inbox per day", "প্রতি ইনবক্সে দৈনিক মেসেজ", "number"),
								field("perDomain", "Inboxes per domain", "প্রতি ডোমেইনে ইনবক্স", "number"),
								field("inboxCost", "Monthly cost per inbox ($)", "মাসিক ইনবক্স খরচ ($)", "number"),
								field("domainCost", "Annual cost per domain ($)", "বার্ষিক ডোমেইন খরচ ($)", "number")
							] }),
							selected === "password" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [field("length", "Password length (12-128)", "পাসওয়ার্ডের দৈর্ঘ্য (12-128)", "number"), Object.keys(sets).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "lab-check",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: sets[k],
									onChange: (e) => setSets((s) => ({
										...s,
										[k]: e.target.checked
									}))
								}), k]
							}, k))] }),
							(selected === "dns" || selected === "dmarc") && field("domain", "Domain (example.com)", "ডোমেইন (example.com)"),
							selected === "dmarc" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [field("report", "Report email", "রিপোর্ট ইমেইল", "email"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Policy", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: values.policy,
								onChange: (e) => setValues((v) => ({
									...v,
									policy: e.target.value
								})),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "none",
										children: "Monitor / পর্যবেক্ষণ"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "quarantine",
										children: "Quarantine"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "reject",
										children: "Reject"
									})
								]
							})] })] }),
							selected === "spf" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [field("includes", "Provider include domains (comma separated)", "প্রোভাইডারের include ডোমেইন (কমা দিয়ে)"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Policy", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: values.all,
								onChange: (e) => setValues((v) => ({
									...v,
									all: e.target.value
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "~all",
									children: "Soft fail (~all)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "-all",
									children: "Fail (-all)"
								})]
							})] })] }),
							selected === "spam" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "lab-wide",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									en: "Email copy",
									bn: "ইমেইলের লেখা"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: values.text,
									required: true,
									maxLength: 1e4,
									rows: 8,
									onChange: (e) => setValues((v) => ({
										...v,
										text: e.target.value
									}))
								})]
							}),
							selected === "search" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [field("niche", "Business niche", "ব্যবসার ধরন"), field("location", "Location", "লোকেশন")] }),
							selected === "checklist" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lab-wide",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									checked.length,
									"/",
									launchChecklist.length,
									" complete"
								] }), launchChecklist.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "lab-check",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: checked.includes(i),
										onChange: (e) => setChecked((c) => e.target.checked ? [...c, i] : c.filter((x) => x !== i))
									}), v]
								}, v))]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "button-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "button button--primary",
							disabled: busy,
							children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Checking…",
								bn: "যাচাই হচ্ছে…"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: selected === "dns" ? "Check live DNS" : "Create result",
								bn: selected === "dns" ? "লাইভ DNS পরীক্ষা" : "ফলাফল তৈরি করুন"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 17 })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "button",
							type: "button",
							onClick: reset,
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Reset",
								bn: "নতুন করে"
							})]
						})]
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "form-error",
					children: error
				}),
				output && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "lab-result",
					"aria-label": "Tool result",
					"aria-live": "polite",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Your result",
								bn: "আপনার ফলাফল"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { value: output }),
						selected !== "password" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: download,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
								en: "Download",
								bn: "ডাউনলোড"
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { children: output })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Ready to put this into practice?",
						bn: "এবার বাস্তবে কাজে লাগাতে চান?"
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MotionLink, {
						href: "/lead-data-tools#tutorial",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "Watch the free 1-hour class",
							bn: "ফ্রি ১ ঘণ্টার ক্লাস দেখুন"
						}), " ↗"]
					})
				] })
			]
		})]
	})] });
}
//#endregion
export { FreeToolsPage };
