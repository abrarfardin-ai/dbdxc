import { t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
//#region app/updates/unsubscribe/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function UpdateUnsubscribe() {
	const [message, setMessage] = (0, import_react.useState)("Product update emails বন্ধ করতে নিচের বোতাম চাপুন। Booking ও receipt email চালু থাকবে।");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "site-editor",
		style: {
			maxWidth: 600,
			margin: "80px auto",
			padding: 24
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Product update preferences" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				disabled: busy || done,
				onClick: async () => {
					setBusy(true);
					try {
						if (!(await fetch("/api/updates/unsubscribe", {
							method: "POST",
							headers: { "content-type": "application/json" },
							body: JSON.stringify({ token: location.hash.slice(1) })
						})).ok) throw new Error();
						setDone(true);
						setMessage("Product update emails বন্ধ করা হয়েছে।");
					} catch {
						setMessage("বন্ধ করা যায়নি। ইমেইলের সম্পূর্ণ লিংক ব্যবহার করে আবার চেষ্টা করুন।");
					} finally {
						setBusy(false);
					}
				},
				children: busy ? "অপেক্ষা করুন…" : done ? "বন্ধ হয়েছে" : "Unsubscribe"
			})
		]
	});
}
//#endregion
export { UpdateUnsubscribe as default };
