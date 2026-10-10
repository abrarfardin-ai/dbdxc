//#region lib/site-settings.ts
var settingFields = [
	[
		"whatsapp",
		"যোগাযোগ",
		"WhatsApp নম্বর (দেশের কোডসহ)",
		"phone",
		"8801990995417"
	],
	[
		"supportEmail",
		"যোগাযোগ",
		"সাপোর্ট ইমেইল",
		"email",
		"abrarfardin@thesyncwave.com"
	],
	[
		"youtube",
		"যোগাযোগ",
		"YouTube চ্যানেল",
		"url",
		"https://www.youtube.com/@tazwarabrarfardin"
	],
	[
		"facebook",
		"যোগাযোগ",
		"Facebook",
		"url",
		"https://www.facebook.com/profile.php?id=61590926670163"
	],
	[
		"linkedin",
		"যোগাযোগ",
		"LinkedIn",
		"url",
		"https://www.linkedin.com/in/abrarfardinofficial/"
	],
	[
		"x",
		"যোগাযোগ",
		"X",
		"url",
		"https://x.com/abrar_khan_edit"
	],
	[
		"bkashEnabled",
		"পেমেন্ট",
		"bKash চালু",
		"boolean",
		true
	],
	[
		"bkashNumber",
		"পেমেন্ট",
		"bKash নম্বর",
		"phone",
		"01990995417"
	],
	[
		"nagadEnabled",
		"পেমেন্ট",
		"Nagad চালু",
		"boolean",
		true
	],
	[
		"nagadNumber",
		"পেমেন্ট",
		"Nagad নম্বর",
		"phone",
		"01990995417"
	],
	[
		"bankEnabled",
		"পেমেন্ট",
		"ব্যাংক ট্রান্সফার চালু",
		"boolean",
		true
	],
	[
		"bankName",
		"পেমেন্ট",
		"ব্যাংকের নাম",
		"text",
		"City Bank"
	],
	[
		"bankHolder",
		"পেমেন্ট",
		"অ্যাকাউন্ট হোল্ডার",
		"text",
		"TAZWAR ABRAR FARDIN"
	],
	[
		"bankAccount",
		"পেমেন্ট",
		"ব্যাংক অ্যাকাউন্ট নম্বর",
		"text",
		"2103809628001"
	],
	[
		"bankBranch",
		"পেমেন্ট",
		"ব্যাংকের শাখা",
		"text",
		"City Bank, Mymensingh Branch"
	],
	[
		"bankTutorial",
		"পেমেন্ট",
		"ব্যাংকে পাঠানোর ভিডিও",
		"url",
		"https://youtube.com/shorts/C9I1HsI61BY?feature=share"
	],
	[
		"instawavePrice",
		"দাম",
		"InstaWave বিক্রয়মূল্য (৳)",
		"number",
		4500
	],
	[
		"instawaveOriginal",
		"দাম",
		"InstaWave আগের মূল্য (৳)",
		"number",
		15e3
	],
	[
		"leadPrice",
		"দাম",
		"Lead Data Tools বিক্রয়মূল্য (৳)",
		"number",
		4500
	],
	[
		"leadOriginal",
		"দাম",
		"Lead Data Tools আগের মূল্য (৳)",
		"number",
		15e3
	],
	[
		"logo",
		"ব্র্যান্ড",
		"লোগোর URL",
		"url",
		"/assets/swa-logo.png"
	]
];
var defaults = {
	...Object.fromEntries(settingFields.map(([key, , , , value]) => [key, value])),
	copy: {},
	links: {},
	videos: {}
};
function safeLink(value) {
	if (!value || value.length > 1e3 || /[\s\\\u0000-\u001f]/.test(value)) return false;
	if (/^\/(?!\/)/.test(value) || /^#[\w-]+$/.test(value)) return true;
	if (/^mailto:[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(value)) return true;
	try {
		const u = new URL(value);
		return u.protocol === "https:" && !u.username && !u.password && !!u.hostname;
	} catch {
		return false;
	}
}
function object(value) {
	return !!value && typeof value === "object" && !Array.isArray(value);
}
function validateSiteSettings(value) {
	if (!object(value)) return ["সেটিংস সঠিক নয়।"];
	const errors = [];
	const keys = new Set([
		...settingFields.map((f) => f[0]),
		"copy",
		"links",
		"videos"
	]);
	if (Object.keys(value).some((k) => !keys.has(k))) errors.push("অজানা সেটিংস পাওয়া গেছে।");
	for (const [key, , label, type] of settingFields) {
		const v = value[key];
		if (type === "boolean" ? typeof v !== "boolean" : type === "number" ? typeof v !== "number" || !Number.isInteger(v) || v < 1 || v > 1e6 : typeof v !== "string" || !v.trim() || v.length > 1e3) errors.push(`${label}: সঠিক মান দিন।`);
		else if (type === "url" && !safeLink(v)) errors.push(`${label}: HTTPS বা সাইটের লিংক দিন।`);
		else if (type === "phone" && !/^\+?[0-9]{8,15}$/.test(v)) errors.push(`${label}: ৮-১৫ সংখ্যার নম্বর দিন।`);
		else if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errors.push(`${label}: সঠিক ইমেইল দিন।`);
	}
	if (!value.bkashEnabled && !value.nagadEnabled && !value.bankEnabled) errors.push("অন্তত একটি পেমেন্ট পদ্ধতি চালু রাখুন।");
	if (Number(value.instawaveOriginal) < Number(value.instawavePrice) || Number(value.leadOriginal) < Number(value.leadPrice)) errors.push("আগের মূল্য বিক্রয়মূল্যের চেয়ে কম হতে পারবে না।");
	for (const key of [
		"copy",
		"links",
		"videos"
	]) {
		const map = value[key];
		if (!object(map)) {
			errors.push(`${key}: সঠিক তালিকা দিন।`);
			continue;
		}
		if (Object.keys(map).length > 1e3) errors.push("একবারে সর্বোচ্চ ১০০০ পরিবর্তন রাখা যাবে।");
		for (const [source, target] of Object.entries(map)) {
			if (source.length > 4e3 || [
				"__proto__",
				"constructor",
				"prototype"
			].includes(source)) errors.push("পরিবর্তনের পরিচয় সঠিক নয়।");
			if (key === "links" && (typeof target !== "string" || !safeLink(source) || !safeLink(target))) errors.push("লিংক সঠিক নয়।");
			if (key === "videos" && (!/^[\w-]{11}$/.test(source) || typeof target !== "string" || !/^[\w-]{11}$/.test(target))) errors.push("YouTube ভিডিও আইডি ১১ অক্ষরের হতে হবে।");
			if (key === "copy" && (!object(target) || typeof target.en !== "string" || typeof target.bn !== "string" || target.en.length > 4e3 || target.bn.length > 4e3 || Object.keys(target).some((k) => !["en", "bn"].includes(k)))) errors.push("লেখা সঠিক নয়।");
		}
	}
	if (JSON.stringify(value).length > 25e4) errors.push("পরিবর্তনের আকার অনেক বড়।");
	return errors;
}
//#endregion
export { settingFields as n, validateSiteSettings as r, defaults as t };
