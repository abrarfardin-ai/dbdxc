import { t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import { Copy } from "./primitives-Ne8vVwBw.js";
import { SiteShell } from "./site-shell-ZuXY0u6A.js";
//#region app/unsubscribe/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Unsubscribe() {
	const [message, setMessage] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "container",
		style: {
			paddingBlock: 80,
			maxWidth: 650
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Your email preferences",
				bn: "আপনার ইমেইলের পছন্দ"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Stop course news and promotional emails. Essential purchase and booking messages remain available.",
				bn: "কোর্সের খবর ও প্রচারের ইমেইল বন্ধ করুন। প্রয়োজনীয় অর্ডার ও বুকিংয়ের তথ্য পাওয়া যাবে।"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "button button--primary",
				disabled: busy || done,
				onClick: async () => {
					setBusy(true);
					try {
						const token = location.hash.slice(1);
						if (!(await fetch("/api/unsubscribe", {
							method: "POST",
							headers: { "content-type": "application/json" },
							body: JSON.stringify({ token })
						})).ok) throw Error();
						setDone(true);
						setMessage("Unsubscribed. / ইমেইল সাবস্ক্রিপশন বন্ধ হয়েছে।");
					} catch {
						setMessage("Could not update. Please retry with the email link. / পরিবর্তন হয়নি। ইমেইলের লিংক থেকে আবার চেষ্টা করুন।");
					} finally {
						setBusy(false);
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: done ? "Unsubscribed" : busy ? "Updating…" : "Unsubscribe",
					bn: done ? "সাবস্ক্রিপশন বন্ধ হয়েছে" : busy ? "পরিবর্তন হচ্ছে…" : "সাবস্ক্রিপশন বন্ধ করুন"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: message
			})
		]
	}) });
}
//#endregion
export { Unsubscribe as default };
