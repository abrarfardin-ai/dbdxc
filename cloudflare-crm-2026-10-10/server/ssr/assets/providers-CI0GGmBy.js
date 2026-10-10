import { C as __exportAll, c as usePathname, t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import { r as SiteSettingsProvider } from "./site-settings-provider-CWsrHPaR.js";
//#region node_modules/lenis/dist/lenis.mjs
var version = "1.3.25";
/**
* Clamp a value between a minimum and maximum value
*
* @param min Minimum value
* @param input Value to clamp
* @param max Maximum value
* @returns Clamped value
*/
function clamp(min, input, max) {
	return Math.max(min, Math.min(input, max));
}
/**
*  Linearly interpolate between two values using an amount (0 <= t <= 1)
*
* @param x First value
* @param y Second value
* @param t Amount to interpolate (0 <= t <= 1)
* @returns Interpolated value
*/
function lerp(x, y, t) {
	return (1 - t) * x + t * y;
}
/**
* Damp a value over time using a damping factor
* {@link http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/}
*
* @param x Initial value
* @param y Target value
* @param lambda Damping factor
* @param dt Time elapsed since the last update
* @returns Damped value
*/
function damp(x, y, lambda, deltaTime) {
	return lerp(x, y, 1 - Math.exp(-lambda * deltaTime));
}
/**
* Calculate the modulo of the dividend and divisor while keeping the result within the same sign as the divisor
* {@link https://anguscroll.com/just/just-modulo}
*
* @param n Dividend
* @param d Divisor
* @returns Modulo
*/
function modulo(n, d) {
	return (n % d + d) % d;
}
/**
* Animate class to handle value animations with lerping or easing
*
* @example
* const animate = new Animate()
* animate.fromTo(0, 100, { duration: 1, easing: (t) => t })
* animate.advance(0.5) // 50
*/
var Animate = class {
	isRunning = false;
	value = 0;
	from = 0;
	to = 0;
	currentTime = 0;
	lerp;
	duration;
	easing;
	onUpdate;
	/**
	* Advance the animation by the given delta time
	*
	* @param deltaTime - The time in seconds to advance the animation
	*/
	advance(deltaTime) {
		if (!this.isRunning) return;
		let completed = false;
		if (this.duration && this.easing) {
			this.currentTime += deltaTime;
			const linearProgress = clamp(0, this.currentTime / this.duration, 1);
			completed = linearProgress >= 1;
			const easedProgress = completed ? 1 : this.easing(linearProgress);
			this.value = this.from + (this.to - this.from) * easedProgress;
		} else if (this.lerp) {
			this.value = damp(this.value, this.to, this.lerp * 60, deltaTime);
			if (Math.round(this.value) === Math.round(this.to)) {
				this.value = this.to;
				completed = true;
			}
		} else {
			this.value = this.to;
			completed = true;
		}
		if (completed) this.stop();
		this.onUpdate?.(this.value, completed);
	}
	/** Stop the animation */
	stop() {
		this.isRunning = false;
	}
	/**
	* Set up the animation from a starting value to an ending value
	* with optional parameters for lerping, duration, easing, and onUpdate callback
	*
	* @param from - The starting value
	* @param to - The ending value
	* @param options - Options for the animation
	*/
	fromTo(from, to, { lerp, duration, easing, onStart, onUpdate }) {
		this.from = this.value = from;
		this.to = to;
		this.lerp = lerp;
		this.duration = duration;
		this.easing = easing;
		this.currentTime = 0;
		this.isRunning = true;
		onStart?.();
		this.onUpdate = onUpdate;
	}
};
function debounce(callback, delay) {
	let timer;
	return function(...args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			timer = void 0;
			callback.apply(this, args);
		}, delay);
	};
}
/**
* Dimensions class to handle the size of the content and wrapper
*
* @example
* const dimensions = new Dimensions(wrapper, content)
* dimensions.on('resize', (e) => {
*   console.log(e.width, e.height)
* })
*/
var Dimensions = class {
	width = 0;
	height = 0;
	scrollHeight = 0;
	scrollWidth = 0;
	debouncedResize;
	wrapperResizeObserver;
	contentResizeObserver;
	constructor(wrapper, content, { autoResize = true, debounce: debounceValue = 250 } = {}) {
		this.wrapper = wrapper;
		this.content = content;
		if (autoResize) {
			this.debouncedResize = debounce(this.resize, debounceValue);
			if (this.wrapper instanceof Window) window.addEventListener("resize", this.debouncedResize);
			else {
				this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize);
				this.wrapperResizeObserver.observe(this.wrapper);
			}
			this.contentResizeObserver = new ResizeObserver(this.debouncedResize);
			this.contentResizeObserver.observe(this.content);
		}
		this.resize();
	}
	destroy() {
		this.wrapperResizeObserver?.disconnect();
		this.contentResizeObserver?.disconnect();
		if (this.wrapper === window && this.debouncedResize) window.removeEventListener("resize", this.debouncedResize);
	}
	resize = () => {
		this.onWrapperResize();
		this.onContentResize();
	};
	onWrapperResize = () => {
		if (this.wrapper instanceof Window) {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
		} else {
			this.width = this.wrapper.clientWidth;
			this.height = this.wrapper.clientHeight;
		}
	};
	onContentResize = () => {
		if (this.wrapper instanceof Window) {
			this.scrollHeight = this.content.scrollHeight;
			this.scrollWidth = this.content.scrollWidth;
		} else {
			this.scrollHeight = this.wrapper.scrollHeight;
			this.scrollWidth = this.wrapper.scrollWidth;
		}
	};
	get limit() {
		return {
			x: this.scrollWidth - this.width,
			y: this.scrollHeight - this.height
		};
	}
};
/**
* Emitter class to handle events
* @example
* const emitter = new Emitter()
* emitter.on('event', (data) => {
*   console.log(data)
* })
* emitter.emit('event', 'data')
*/
var Emitter = class {
	events = {};
	/**
	* Emit an event with the given data
	* @param event Event name
	* @param args Data to pass to the event handlers
	*/
	emit(event, ...args) {
		const callbacks = this.events[event] || [];
		for (let i = 0, length = callbacks.length; i < length; i++) callbacks[i]?.(...args);
	}
	/**
	* Add a callback to the event
	* @param event Event name
	* @param cb Callback function
	* @returns Unsubscribe function
	*/
	on(event, cb) {
		if (this.events[event]) this.events[event].push(cb);
		else this.events[event] = [cb];
		return () => {
			this.events[event] = this.events[event]?.filter((i) => cb !== i);
		};
	}
	/**
	* Remove a callback from the event
	* @param event Event name
	* @param callback Callback function
	*/
	off(event, callback) {
		this.events[event] = this.events[event]?.filter((i) => callback !== i);
	}
	/**
	* Remove all event listeners and clean up
	*/
	destroy() {
		this.events = {};
	}
};
var LINE_HEIGHT = 100 / 6;
var listenerOptions = { passive: false };
function getDeltaMultiplier(deltaMode, size) {
	if (deltaMode === 1) return LINE_HEIGHT;
	if (deltaMode === 2) return size;
	return 1;
}
var VirtualScroll = class {
	touchStart = {
		x: 0,
		y: 0
	};
	lastDelta = {
		x: 0,
		y: 0
	};
	window = {
		width: 0,
		height: 0
	};
	emitter = new Emitter();
	constructor(element, options = {
		wheelMultiplier: 1,
		touchMultiplier: 1
	}) {
		this.element = element;
		this.options = options;
		window.addEventListener("resize", this.onWindowResize);
		this.onWindowResize();
		this.element.addEventListener("wheel", this.onWheel, listenerOptions);
		this.element.addEventListener("touchstart", this.onTouchStart, listenerOptions);
		this.element.addEventListener("touchmove", this.onTouchMove, listenerOptions);
		this.element.addEventListener("touchend", this.onTouchEnd, listenerOptions);
	}
	/**
	* Add an event listener for the given event and callback
	*
	* @param event Event name
	* @param callback Callback function
	*/
	on(event, callback) {
		return this.emitter.on(event, callback);
	}
	/** Remove all event listeners and clean up */
	destroy() {
		this.emitter.destroy();
		window.removeEventListener("resize", this.onWindowResize);
		this.element.removeEventListener("wheel", this.onWheel, listenerOptions);
		this.element.removeEventListener("touchstart", this.onTouchStart, listenerOptions);
		this.element.removeEventListener("touchmove", this.onTouchMove, listenerOptions);
		this.element.removeEventListener("touchend", this.onTouchEnd, listenerOptions);
	}
	/**
	* Event handler for 'touchstart' event
	*
	* @param event Touch event
	*/
	onTouchStart = (event) => {
		const { clientX, clientY } = event.targetTouches ? event.targetTouches[0] : event;
		this.touchStart.x = clientX;
		this.touchStart.y = clientY;
		this.lastDelta = {
			x: 0,
			y: 0
		};
		this.emitter.emit("scroll", {
			deltaX: 0,
			deltaY: 0,
			event
		});
	};
	/** Event handler for 'touchmove' event */
	onTouchMove = (event) => {
		const { clientX, clientY } = event.targetTouches ? event.targetTouches[0] : event;
		const deltaX = -(clientX - this.touchStart.x) * this.options.touchMultiplier;
		const deltaY = -(clientY - this.touchStart.y) * this.options.touchMultiplier;
		this.touchStart.x = clientX;
		this.touchStart.y = clientY;
		this.lastDelta = {
			x: deltaX,
			y: deltaY
		};
		this.emitter.emit("scroll", {
			deltaX,
			deltaY,
			event
		});
	};
	onTouchEnd = (event) => {
		this.emitter.emit("scroll", {
			deltaX: this.lastDelta.x,
			deltaY: this.lastDelta.y,
			event
		});
	};
	/** Event handler for 'wheel' event */
	onWheel = (event) => {
		let { deltaX, deltaY, deltaMode } = event;
		const multiplierX = getDeltaMultiplier(deltaMode, this.window.width);
		const multiplierY = getDeltaMultiplier(deltaMode, this.window.height);
		deltaX *= multiplierX;
		deltaY *= multiplierY;
		deltaX *= this.options.wheelMultiplier;
		deltaY *= this.options.wheelMultiplier;
		this.emitter.emit("scroll", {
			deltaX,
			deltaY,
			event
		});
	};
	onWindowResize = () => {
		this.window = {
			width: window.innerWidth,
			height: window.innerHeight
		};
	};
};
var defaultEasing = (t) => Math.min(1, 1.001 - 2 ** (-10 * t));
var Lenis = class {
	_isScrolling = false;
	_isStopped = false;
	_isLocked = false;
	_preventNextNativeScrollEvent = false;
	_resetVelocityTimeout = null;
	_rafId = null;
	_isDraggingSelection = false;
	/**
	* Whether or not the user is touching the screen
	*/
	isTouching;
	/**
	* Whether or not the device is running iOS
	*/
	isIos;
	/**
	* The time in ms since the lenis instance was created
	*/
	time = 0;
	/**
	* User data that will be forwarded through the scroll event
	*
	* @example
	* lenis.scrollTo(100, {
	*   userData: {
	*     foo: 'bar'
	*   }
	* })
	*/
	userData = {};
	/**
	* The last velocity of the scroll
	*/
	lastVelocity = 0;
	/**
	* The current velocity of the scroll
	*/
	velocity = 0;
	/**
	* The direction of the scroll
	*/
	direction = 0;
	/**
	* The options passed to the lenis instance
	*/
	options;
	/**
	* The target scroll value
	*/
	targetScroll;
	/**
	* The animated scroll value
	*/
	animatedScroll;
	animate = new Animate();
	emitter = new Emitter();
	dimensions;
	virtualScroll;
	constructor({ wrapper = window, content = document.documentElement, eventsTarget = wrapper, smoothWheel = true, syncTouch = false, syncTouchLerp = .075, touchInertiaExponent = 1.7, duration, easing, lerp = .1, infinite = false, orientation = "vertical", gestureOrientation = orientation === "horizontal" ? "both" : "vertical", touchMultiplier = 1, wheelMultiplier = 1, autoResize = true, prevent, virtualScroll, overscroll = true, autoRaf = false, anchors = false, autoToggle = false, allowNestedScroll = false, __experimental__naiveDimensions = false, naiveDimensions = __experimental__naiveDimensions, stopInertiaOnNavigate = false } = {}) {
		window.lenisVersion = version;
		if (!window.lenis) window.lenis = {};
		window.lenis.version = version;
		if (orientation === "horizontal") window.lenis.horizontal = true;
		if (syncTouch === true) window.lenis.touch = true;
		this.isIos = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
		if (!wrapper || wrapper === document.documentElement) wrapper = window;
		if (typeof duration === "number" && typeof easing !== "function") easing = defaultEasing;
		else if (typeof easing === "function" && typeof duration !== "number") duration = 1;
		this.options = {
			wrapper,
			content,
			eventsTarget,
			smoothWheel,
			syncTouch,
			syncTouchLerp,
			touchInertiaExponent,
			duration,
			easing,
			lerp,
			infinite,
			gestureOrientation,
			orientation,
			touchMultiplier,
			wheelMultiplier,
			autoResize,
			prevent,
			virtualScroll,
			overscroll,
			autoRaf,
			anchors,
			autoToggle,
			allowNestedScroll,
			naiveDimensions,
			stopInertiaOnNavigate
		};
		this.dimensions = new Dimensions(wrapper, content, { autoResize });
		this.updateClassName();
		this.targetScroll = this.animatedScroll = this.actualScroll;
		this.options.wrapper.addEventListener("scroll", this.onNativeScroll);
		this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, { capture: true });
		if (this.options.anchors || this.options.stopInertiaOnNavigate) this.options.wrapper.addEventListener("click", this.onClick);
		this.options.wrapper.addEventListener("pointerdown", this.onPointerDown);
		this.virtualScroll = new VirtualScroll(eventsTarget, {
			touchMultiplier,
			wheelMultiplier
		});
		this.virtualScroll.on("scroll", this.onVirtualScroll);
		if (this.options.autoToggle) {
			this.checkOverflow();
			this.rootElement.addEventListener("transitionend", this.onTransitionEnd);
		}
		if (this.options.autoRaf) this._rafId = requestAnimationFrame(this.raf);
	}
	/**
	* Destroy the lenis instance, remove all event listeners and clean up the class name
	*/
	destroy() {
		this.emitter.destroy();
		this.options.wrapper.removeEventListener("scroll", this.onNativeScroll);
		this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, { capture: true });
		this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown);
		if (this.options.anchors || this.options.stopInertiaOnNavigate) this.options.wrapper.removeEventListener("click", this.onClick);
		this.virtualScroll.destroy();
		this.dimensions.destroy();
		this.cleanUpClassName();
		if (this._rafId) cancelAnimationFrame(this._rafId);
	}
	on(event, callback) {
		return this.emitter.on(event, callback);
	}
	off(event, callback) {
		return this.emitter.off(event, callback);
	}
	onScrollEnd = (e) => {
		if (!(e instanceof CustomEvent)) {
			if (this.isScrolling === "smooth" || this.isScrolling === false) e.stopPropagation();
		}
	};
	dispatchScrollendEvent = () => {
		this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
			bubbles: this.options.wrapper === window,
			detail: { lenisScrollEnd: true }
		}));
	};
	get overflow() {
		const property = this.isHorizontal ? "overflow-x" : "overflow-y";
		return getComputedStyle(this.rootElement)[property];
	}
	checkOverflow() {
		if (["hidden", "clip"].includes(this.overflow)) this.internalStop();
		else this.internalStart();
	}
	onTransitionEnd = (event) => {
		if (event.propertyName?.includes("overflow") && event.target === this.rootElement) this.checkOverflow();
	};
	setScroll(scroll) {
		if (this.isHorizontal) this.options.wrapper.scrollTo({
			left: scroll,
			behavior: "instant"
		});
		else this.options.wrapper.scrollTo({
			top: scroll,
			behavior: "instant"
		});
	}
	onClick = (event) => {
		const linkElementsUrls = event.composedPath().filter((node) => node instanceof HTMLAnchorElement && node.href).map((element) => new URL(element.href));
		const currentUrl = new URL(window.location.href);
		if (this.options.anchors) {
			const anchorElementUrl = linkElementsUrls.find((targetUrl) => currentUrl.host === targetUrl.host && currentUrl.pathname === targetUrl.pathname && targetUrl.hash);
			if (anchorElementUrl) {
				const options = typeof this.options.anchors === "object" && this.options.anchors ? this.options.anchors : void 0;
				const target = decodeURIComponent(anchorElementUrl.hash);
				this.scrollTo(target, options);
				return;
			}
		}
		if (this.options.stopInertiaOnNavigate) {
			if (linkElementsUrls.some((targetUrl) => currentUrl.host === targetUrl.host && currentUrl.pathname !== targetUrl.pathname)) {
				this.reset();
				return;
			}
		}
	};
	onPointerDown = (event) => {
		if (event.button === 1) this.reset();
	};
	isTouchOnSelectionHandle(event) {
		const selection = window.getSelection();
		if (!selection || selection.isCollapsed || selection.rangeCount === 0) return false;
		const touch = event.targetTouches[0] ?? event.changedTouches[0];
		if (!touch) return false;
		const rects = selection.getRangeAt(0).getClientRects();
		if (rects.length === 0) return false;
		const first = rects[0];
		const last = rects[rects.length - 1];
		const HANDLE_RADIUS = 40;
		const nearStart = Math.hypot(touch.clientX - first.left, touch.clientY - first.top) <= HANDLE_RADIUS;
		const nearEnd = Math.hypot(touch.clientX - last.right, touch.clientY - last.bottom) <= HANDLE_RADIUS;
		return nearStart || nearEnd;
	}
	onVirtualScroll = (data) => {
		if (typeof this.options.virtualScroll === "function" && this.options.virtualScroll(data) === false) return;
		const { deltaX, deltaY, event } = data;
		this.emitter.emit("virtual-scroll", {
			deltaX,
			deltaY,
			event
		});
		if (event.ctrlKey) return;
		if (event.lenisStopPropagation) return;
		const isTouch = event.type.includes("touch");
		const isWheel = event.type.includes("wheel");
		if (isTouch && this.isIos) {
			if (event.type === "touchstart") this._isDraggingSelection = this.isTouchOnSelectionHandle(event);
			if (this._isDraggingSelection) {
				if (event.type === "touchend") this._isDraggingSelection = false;
				return;
			}
		}
		this.isTouching = event.type === "touchstart" || event.type === "touchmove";
		const isClickOrTap = deltaX === 0 && deltaY === 0;
		if (this.options.syncTouch && isTouch && event.type === "touchstart" && isClickOrTap && !this.isStopped && !this.isLocked) {
			this.reset();
			return;
		}
		const isUnknownGesture = this.options.gestureOrientation === "vertical" && deltaY === 0 || this.options.gestureOrientation === "horizontal" && deltaX === 0;
		if (isClickOrTap || isUnknownGesture) return;
		let composedPath = event.composedPath();
		composedPath = composedPath.slice(0, composedPath.indexOf(this.rootElement));
		const prevent = this.options.prevent;
		const gestureOrientation = Math.abs(deltaX) >= Math.abs(deltaY) ? "horizontal" : "vertical";
		if (composedPath.find((node) => node instanceof HTMLElement && (typeof prevent === "function" && prevent?.(node) || node.hasAttribute?.("data-lenis-prevent") || gestureOrientation === "vertical" && node.hasAttribute?.("data-lenis-prevent-vertical") || gestureOrientation === "horizontal" && node.hasAttribute?.("data-lenis-prevent-horizontal") || isTouch && node.hasAttribute?.("data-lenis-prevent-touch") || isWheel && node.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.hasNestedScroll(node, {
			deltaX,
			deltaY
		})))) return;
		if (this.isStopped || this.isLocked) {
			if (event.cancelable) event.preventDefault();
			return;
		}
		if (!(this.options.syncTouch && isTouch || this.options.smoothWheel && isWheel)) {
			this.isScrolling = "native";
			this.animate.stop();
			event.lenisStopPropagation = true;
			return;
		}
		let delta = deltaY;
		if (this.options.gestureOrientation === "both") delta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;
		else if (this.options.gestureOrientation === "horizontal") delta = deltaX;
		if (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && deltaY > 0 || this.animatedScroll === this.limit && deltaY < 0)) event.lenisStopPropagation = true;
		if (event.cancelable) event.preventDefault();
		const isSyncTouch = isTouch && this.options.syncTouch;
		const hasTouchInertia = isTouch && event.type === "touchend";
		if (hasTouchInertia) delta = Math.sign(delta) * Math.abs(this.velocity) ** this.options.touchInertiaExponent;
		this.scrollTo(this.targetScroll + delta, {
			programmatic: false,
			...isSyncTouch ? { lerp: hasTouchInertia ? this.options.syncTouchLerp : 1 } : {
				lerp: this.options.lerp,
				duration: this.options.duration,
				easing: this.options.easing
			}
		});
	};
	/**
	* Force lenis to recalculate the dimensions
	*/
	resize() {
		this.dimensions.resize();
		this.animatedScroll = this.targetScroll = this.actualScroll;
		this.emit();
	}
	emit() {
		this.emitter.emit("scroll", this);
	}
	onNativeScroll = () => {
		if (this._resetVelocityTimeout !== null) {
			clearTimeout(this._resetVelocityTimeout);
			this._resetVelocityTimeout = null;
		}
		if (this._preventNextNativeScrollEvent) {
			this._preventNextNativeScrollEvent = false;
			return;
		}
		if (this.isScrolling === false || this.isScrolling === "native") {
			const lastScroll = this.animatedScroll;
			this.animatedScroll = this.targetScroll = this.actualScroll;
			this.lastVelocity = this.velocity;
			this.velocity = this.animatedScroll - lastScroll;
			this.direction = Math.sign(this.animatedScroll - lastScroll);
			if (!this.isStopped) this.isScrolling = "native";
			this.emit();
			if (this.velocity !== 0) this._resetVelocityTimeout = setTimeout(() => {
				this.lastVelocity = this.velocity;
				this.velocity = 0;
				this.isScrolling = false;
				this.emit();
			}, 400);
		}
	};
	reset() {
		this.isLocked = false;
		this.isScrolling = false;
		this.animatedScroll = this.targetScroll = this.actualScroll;
		this.lastVelocity = this.velocity = 0;
		this.animate.stop();
	}
	/**
	* Start lenis scroll after it has been stopped
	*/
	start() {
		if (!this.isStopped) return;
		if (this.options.autoToggle) {
			this.rootElement.style.removeProperty("overflow");
			return;
		}
		this.internalStart();
	}
	internalStart() {
		if (!this.isStopped) return;
		this.reset();
		this.isStopped = false;
		this.emit();
	}
	/**
	* Stop lenis scroll
	*/
	stop() {
		if (this.isStopped) return;
		if (this.options.autoToggle) {
			this.rootElement.style.setProperty("overflow", "clip");
			return;
		}
		this.internalStop();
	}
	internalStop() {
		if (this.isStopped) return;
		this.reset();
		this.isStopped = true;
		this.emit();
	}
	/**
	* RequestAnimationFrame for lenis
	*
	* @param time The time in ms from an external clock like `requestAnimationFrame` or Tempus
	*/
	raf = (time) => {
		const deltaTime = time - (this.time || time);
		this.time = time;
		this.animate.advance(deltaTime * .001);
		if (this.options.autoRaf) this._rafId = requestAnimationFrame(this.raf);
	};
	/**
	* Scroll to a target value
	*
	* @param target The target value to scroll to
	* @param options The options for the scroll
	*
	* @example
	* lenis.scrollTo(100, {
	*   offset: 100,
	*   duration: 1,
	*   easing: (t) => 1 - Math.cos((t * Math.PI) / 2),
	*   lerp: 0.1,
	*   onStart: () => {
	*     console.log('onStart')
	*   },
	*   onComplete: () => {
	*     console.log('onComplete')
	*   },
	* })
	*/
	scrollTo(_target, { offset = 0, immediate = false, lock = false, programmatic = true, lerp = programmatic ? this.options.lerp : void 0, duration = programmatic ? this.options.duration : void 0, easing = programmatic ? this.options.easing : void 0, onStart, onComplete, force = false, userData } = {}) {
		if ((this.isStopped || this.isLocked) && !force) return;
		let target = _target;
		let adjustedOffset = offset;
		if (typeof target === "string" && [
			"top",
			"left",
			"start",
			"#"
		].includes(target)) target = 0;
		else if (typeof target === "string" && [
			"bottom",
			"right",
			"end"
		].includes(target)) target = this.limit;
		else {
			let node = null;
			if (typeof target === "string") {
				node = target.startsWith("#") ? document.getElementById(target.slice(1)) : document.querySelector(target);
				if (!node) if (target === "#top") target = 0;
				else console.warn("Lenis: Target not found", target);
			} else if (target instanceof HTMLElement && target?.nodeType) node = target;
			if (node) {
				if (this.options.wrapper !== window) {
					const wrapperRect = this.rootElement.getBoundingClientRect();
					adjustedOffset -= this.isHorizontal ? wrapperRect.left : wrapperRect.top;
				}
				const rect = node.getBoundingClientRect();
				const targetStyle = getComputedStyle(node);
				const scrollMargin = this.isHorizontal ? Number.parseFloat(targetStyle.scrollMarginLeft) : Number.parseFloat(targetStyle.scrollMarginTop);
				const containerStyle = getComputedStyle(this.rootElement);
				const scrollPadding = this.isHorizontal ? Number.parseFloat(containerStyle.scrollPaddingLeft) : Number.parseFloat(containerStyle.scrollPaddingTop);
				target = (this.isHorizontal ? rect.left : rect.top) + this.animatedScroll - (Number.isNaN(scrollMargin) ? 0 : scrollMargin) - (Number.isNaN(scrollPadding) ? 0 : scrollPadding);
			}
		}
		if (typeof target !== "number") return;
		target += adjustedOffset;
		if (this.options.infinite) {
			if (programmatic) {
				this.targetScroll = this.animatedScroll = this.scroll;
				const distance = target - this.animatedScroll;
				if (distance > this.limit / 2) target -= this.limit;
				else if (distance < -this.limit / 2) target += this.limit;
			}
		} else target = clamp(0, target, this.limit);
		if (target === this.targetScroll) {
			onStart?.(this);
			onComplete?.(this);
			return;
		}
		this.userData = userData ?? {};
		if (immediate) {
			this.animatedScroll = this.targetScroll = target;
			this.setScroll(this.scroll);
			this.reset();
			this.preventNextNativeScrollEvent();
			this.emit();
			onComplete?.(this);
			this.userData = {};
			requestAnimationFrame(() => {
				this.dispatchScrollendEvent();
			});
			return;
		}
		if (!programmatic) this.targetScroll = target;
		if (typeof duration === "number" && typeof easing !== "function") easing = defaultEasing;
		else if (typeof easing === "function" && typeof duration !== "number") duration = 1;
		this.animate.fromTo(this.animatedScroll, target, {
			duration,
			easing,
			lerp,
			onStart: () => {
				if (lock) this.isLocked = true;
				this.isScrolling = "smooth";
				onStart?.(this);
			},
			onUpdate: (value, completed) => {
				this.isScrolling = "smooth";
				this.lastVelocity = this.velocity;
				this.velocity = value - this.animatedScroll;
				this.direction = Math.sign(this.velocity);
				this.animatedScroll = value;
				this.setScroll(this.scroll);
				if (programmatic) this.targetScroll = value;
				if (!completed) this.emit();
				if (completed) {
					this.reset();
					this.emit();
					onComplete?.(this);
					this.userData = {};
					requestAnimationFrame(() => {
						this.dispatchScrollendEvent();
					});
					this.preventNextNativeScrollEvent();
				}
			}
		});
	}
	preventNextNativeScrollEvent() {
		this._preventNextNativeScrollEvent = true;
		requestAnimationFrame(() => {
			this._preventNextNativeScrollEvent = false;
		});
	}
	hasNestedScroll(node, { deltaX, deltaY }) {
		const time = Date.now();
		if (!node._lenis) node._lenis = {};
		const cache = node._lenis;
		let hasOverflowX;
		let hasOverflowY;
		let isScrollableX;
		let isScrollableY;
		let hasOverscrollBehaviorX;
		let hasOverscrollBehaviorY;
		let scrollWidth;
		let scrollHeight;
		let clientWidth;
		let clientHeight;
		if (time - (cache.time ?? 0) > 2e3) {
			cache.time = Date.now();
			const computedStyle = window.getComputedStyle(node);
			cache.computedStyle = computedStyle;
			hasOverflowX = [
				"auto",
				"overlay",
				"scroll"
			].includes(computedStyle.overflowX);
			hasOverflowY = [
				"auto",
				"overlay",
				"scroll"
			].includes(computedStyle.overflowY);
			hasOverscrollBehaviorX = ["auto"].includes(computedStyle.overscrollBehaviorX);
			hasOverscrollBehaviorY = ["auto"].includes(computedStyle.overscrollBehaviorY);
			cache.hasOverflowX = hasOverflowX;
			cache.hasOverflowY = hasOverflowY;
			if (!(hasOverflowX || hasOverflowY)) return false;
			scrollWidth = node.scrollWidth;
			scrollHeight = node.scrollHeight;
			clientWidth = node.clientWidth;
			clientHeight = node.clientHeight;
			isScrollableX = scrollWidth > clientWidth;
			isScrollableY = scrollHeight > clientHeight;
			cache.isScrollableX = isScrollableX;
			cache.isScrollableY = isScrollableY;
			cache.scrollWidth = scrollWidth;
			cache.scrollHeight = scrollHeight;
			cache.clientWidth = clientWidth;
			cache.clientHeight = clientHeight;
			cache.hasOverscrollBehaviorX = hasOverscrollBehaviorX;
			cache.hasOverscrollBehaviorY = hasOverscrollBehaviorY;
		} else {
			isScrollableX = cache.isScrollableX;
			isScrollableY = cache.isScrollableY;
			hasOverflowX = cache.hasOverflowX;
			hasOverflowY = cache.hasOverflowY;
			scrollWidth = cache.scrollWidth;
			scrollHeight = cache.scrollHeight;
			clientWidth = cache.clientWidth;
			clientHeight = cache.clientHeight;
			hasOverscrollBehaviorX = cache.hasOverscrollBehaviorX;
			hasOverscrollBehaviorY = cache.hasOverscrollBehaviorY;
		}
		if (!(hasOverflowX && isScrollableX || hasOverflowY && isScrollableY)) return false;
		const orientation = Math.abs(deltaX) >= Math.abs(deltaY) ? "horizontal" : "vertical";
		let scroll;
		let maxScroll;
		let delta;
		let hasOverflow;
		let isScrollable;
		let hasOverscrollBehavior;
		if (orientation === "horizontal") {
			scroll = Math.round(node.scrollLeft);
			maxScroll = scrollWidth - clientWidth;
			delta = deltaX;
			hasOverflow = hasOverflowX;
			isScrollable = isScrollableX;
			hasOverscrollBehavior = hasOverscrollBehaviorX;
		} else if (orientation === "vertical") {
			scroll = Math.round(node.scrollTop);
			maxScroll = scrollHeight - clientHeight;
			delta = deltaY;
			hasOverflow = hasOverflowY;
			isScrollable = isScrollableY;
			hasOverscrollBehavior = hasOverscrollBehaviorY;
		} else return false;
		if (!hasOverscrollBehavior && (scroll >= maxScroll || scroll <= 0)) return true;
		return (delta > 0 ? scroll < maxScroll : scroll > 0) && hasOverflow && isScrollable;
	}
	/**
	* The root element on which lenis is instanced
	*/
	get rootElement() {
		return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
	}
	/**
	* The limit which is the maximum scroll value
	*/
	get limit() {
		if (this.options.naiveDimensions) {
			if (this.isHorizontal) return this.rootElement.scrollWidth - this.rootElement.clientWidth;
			return this.rootElement.scrollHeight - this.rootElement.clientHeight;
		}
		return this.dimensions.limit[this.isHorizontal ? "x" : "y"];
	}
	/**
	* Whether or not the scroll is horizontal
	*/
	get isHorizontal() {
		return this.options.orientation === "horizontal";
	}
	/**
	* The actual scroll value
	*/
	get actualScroll() {
		const wrapper = this.options.wrapper;
		return this.isHorizontal ? wrapper.scrollX ?? wrapper.scrollLeft : wrapper.scrollY ?? wrapper.scrollTop;
	}
	/**
	* The current scroll value
	*/
	get scroll() {
		return this.options.infinite ? modulo(this.animatedScroll, this.limit) : this.animatedScroll;
	}
	/**
	* The progress of the scroll relative to the limit
	*/
	get progress() {
		return this.limit === 0 ? 1 : this.scroll / this.limit;
	}
	/**
	* Current scroll state
	*/
	get isScrolling() {
		return this._isScrolling;
	}
	set isScrolling(value) {
		if (this._isScrolling !== value) {
			this._isScrolling = value;
			this.updateClassName();
		}
	}
	/**
	* Check if lenis is stopped
	*/
	get isStopped() {
		return this._isStopped;
	}
	set isStopped(value) {
		if (this._isStopped !== value) {
			this._isStopped = value;
			this.updateClassName();
		}
	}
	/**
	* Check if lenis is locked
	*/
	get isLocked() {
		return this._isLocked;
	}
	set isLocked(value) {
		if (this._isLocked !== value) {
			this._isLocked = value;
			this.updateClassName();
		}
	}
	/**
	* Check if lenis is smooth scrolling
	*/
	get isSmooth() {
		return this.isScrolling === "smooth";
	}
	/**
	* The class name applied to the wrapper element
	*/
	get className() {
		let className = "lenis";
		if (this.options.autoToggle) className += " lenis-autoToggle";
		if (this.isStopped) className += " lenis-stopped";
		if (this.isLocked) className += " lenis-locked";
		if (this.isScrolling) className += " lenis-scrolling";
		if (this.isScrolling === "smooth") className += " lenis-smooth";
		return className;
	}
	updateClassName() {
		this.cleanUpClassName();
		this.className.split(" ").forEach((className) => {
			this.rootElement.classList.add(className);
		});
	}
	cleanUpClassName() {
		for (const className of Array.from(this.rootElement.classList)) if (className === "lenis" || className.startsWith("lenis-")) this.rootElement.classList.remove(className);
	}
};
//#endregion
//#region lib/motion.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var motionDuration = {
	feedback: 90,
	fast: 180,
	standard: 360,
	slow: 680,
	cinematic: 920,
	ambient: 18e3,
	modal: 320,
	drawer: 460,
	toast: 380,
	routeMarketing: 80,
	routePortal: 140,
	stagger: 72
};
//#endregion
//#region app/providers.tsx
var providers_exports = /* @__PURE__ */ __exportAll({
	SiteProviders: () => SiteProviders,
	useSite: () => useSite
});
var import_jsx_runtime = require_jsx_runtime();
var SiteContext = (0, import_react.createContext)(null);
function useSite() {
	const context = (0, import_react.useContext)(SiteContext);
	if (!context) throw new Error("useSite must be used inside SiteProviders");
	return context;
}
function MotionRuntime() {
	const pathname = usePathname();
	const { reducedMotion } = useSite();
	(0, import_react.useEffect)(() => {
		document.body.classList.remove("is-leaving");
		document.body.classList.add("is-entering");
		document.documentElement.dataset.routeKind = pathname.startsWith("/portal") ? "portal" : "marketing";
		const timer = window.setTimeout(() => document.body.classList.remove("is-entering"), pathname.startsWith("/portal") ? motionDuration.fast : motionDuration.standard);
		return () => window.clearTimeout(timer);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		const lowPower = window.matchMedia("(pointer: coarse)").matches || navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
		document.documentElement.dataset.motion = reducedMotion ? "reduced" : lowPower ? "light" : "full";
		if (reducedMotion || pathname.startsWith("/portal")) return;
		const lenis = new Lenis({
			duration: lowPower ? .78 : 1.05,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			wheelMultiplier: .88,
			touchMultiplier: 1
		});
		let frame = 0;
		const raf = (time) => {
			lenis.raf(time);
			frame = requestAnimationFrame(raf);
		};
		frame = requestAnimationFrame(raf);
		return () => {
			cancelAnimationFrame(frame);
			lenis.destroy();
		};
	}, [pathname, reducedMotion]);
	(0, import_react.useEffect)(() => {
		const visibleNodes = /* @__PURE__ */ new WeakSet();
		const reveal = (node) => {
			if (visibleNodes.has(node)) return;
			visibleNodes.add(node);
			if (reducedMotion) {
				node.classList.add("is-visible");
				return;
			}
			observer.observe(node);
		};
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		}, {
			rootMargin: "0px 0px -8% 0px",
			threshold: .12
		});
		document.querySelectorAll("[data-reveal]").forEach(reveal);
		const mutationObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((addedNode) => {
					if (!(addedNode instanceof HTMLElement)) return;
					if (addedNode.matches("[data-reveal]")) reveal(addedNode);
					addedNode.querySelectorAll("[data-reveal]").forEach(reveal);
				});
			});
		});
		mutationObserver.observe(document.body, {
			childList: true,
			subtree: true
		});
		return () => {
			mutationObserver.disconnect();
			observer.disconnect();
		};
	}, [pathname, reducedMotion]);
	(0, import_react.useEffect)(() => {
		const coarse = window.matchMedia("(pointer: coarse)").matches;
		if (reducedMotion || coarse) return;
		const pointerMove = (event) => {
			document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
			document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
			const magnetic = event.target.closest("[data-magnetic]");
			if (magnetic) {
				const rect = magnetic.getBoundingClientRect();
				const x = (event.clientX - rect.left - rect.width / 2) * .1;
				const y = (event.clientY - rect.top - rect.height / 2) * .12;
				magnetic.style.setProperty("--motion-x", `${x}px`);
				magnetic.style.setProperty("--motion-y", `${y}px`);
			}
			const tilt = event.target.closest("[data-tilt]");
			if (tilt) {
				const rect = tilt.getBoundingClientRect();
				const x = (event.clientX - rect.left) / rect.width - .5;
				const y = (event.clientY - rect.top) / rect.height - .5;
				tilt.style.setProperty("--tilt-x", `${(-y * 2.2).toFixed(2)}deg`);
				tilt.style.setProperty("--tilt-y", `${(x * 2.8).toFixed(2)}deg`);
				tilt.style.setProperty("--spot-x", `${((x + .5) * 100).toFixed(1)}%`);
				tilt.style.setProperty("--spot-y", `${((y + .5) * 100).toFixed(1)}%`);
			}
		};
		const pointerOut = (event) => {
			const related = event.relatedTarget;
			const magnetic = event.target.closest("[data-magnetic]");
			if (magnetic && (!related || !magnetic.contains(related))) {
				magnetic.style.removeProperty("--motion-x");
				magnetic.style.removeProperty("--motion-y");
			}
			const tilt = event.target.closest("[data-tilt]");
			if (tilt && (!related || !tilt.contains(related))) {
				tilt.style.removeProperty("--tilt-x");
				tilt.style.removeProperty("--tilt-y");
				tilt.style.removeProperty("--spot-x");
				tilt.style.removeProperty("--spot-y");
			}
		};
		window.addEventListener("pointermove", pointerMove, { passive: true });
		document.addEventListener("pointerout", pointerOut);
		return () => {
			window.removeEventListener("pointermove", pointerMove);
			document.removeEventListener("pointerout", pointerOut);
		};
	}, [reducedMotion]);
	(0, import_react.useEffect)(() => {
		const updateVisibility = () => {
			document.documentElement.classList.toggle("motion-paused", document.hidden);
		};
		updateVisibility();
		document.addEventListener("visibilitychange", updateVisibility);
		return () => document.removeEventListener("visibilitychange", updateVisibility);
	}, []);
	return null;
}
function RouteTransition() {
	const pathname = usePathname();
	const { reducedMotion } = useSite();
	const [active, setActive] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const destinationRef = (0, import_react.useRef)("");
	(0, import_react.useEffect)(() => {
		const start = (event) => {
			destinationRef.current = event.detail?.destination || "";
			setProgress(0);
			setActive(true);
		};
		window.addEventListener("sw-route-start", start);
		return () => window.removeEventListener("sw-route-start", start);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!active) return;
		if (destinationRef.current && pathname === destinationRef.current.split(/[?#]/)[0]) {
			setProgress(100);
			const done = window.setTimeout(() => {
				setActive(false);
				setProgress(0);
				destinationRef.current = "";
			}, reducedMotion ? 90 : 260);
			return () => window.clearTimeout(done);
		}
		const timer = window.setInterval(() => setProgress((current) => Math.min(92, current + Math.max(1, Math.ceil((92 - current) * .18)))), reducedMotion ? 70 : 38);
		return () => window.clearInterval(timer);
	}, [
		active,
		pathname,
		reducedMotion
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `route-transition ${active ? "is-active" : ""}`,
		role: "status",
		"aria-live": "polite",
		"aria-label": active ? `Loading ${progress}%` : "",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "route-transition-brand",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/assets/swa-logo.png",
					alt: ""
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "SYNC WAVE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "ACADEMY" })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "route-transition-progress",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${progress}%` } })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [progress, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "%" })] })
		]
	});
}
function CinematicCursor() {
	const { reducedMotion } = useSite();
	const dotRef = (0, import_react.useRef)(null);
	const ringRef = (0, import_react.useRef)(null);
	const labelRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (reducedMotion || window.matchMedia("(pointer: coarse)").matches) return;
		const dot = dotRef.current;
		const ring = ringRef.current;
		const label = labelRef.current;
		if (!dot || !ring || !label) return;
		let pointerX = -100;
		let pointerY = -100;
		let ringX = -100;
		let ringY = -100;
		let raf = 0;
		const render = () => {
			ringX += (pointerX - ringX) * .16;
			ringY += (pointerY - ringY) * .16;
			dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
			ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
			raf = requestAnimationFrame(render);
		};
		const move = (event) => {
			pointerX = event.clientX;
			pointerY = event.clientY;
			document.documentElement.classList.add("cursor-active");
		};
		const leave = () => document.documentElement.classList.remove("cursor-active");
		const over = (event) => {
			const element = event.target;
			const target = element.closest("[data-static-ui]") ? null : element.closest("[data-cursor], a, button");
			if (element.closest("input, textarea, select, [contenteditable='true'], [data-static-ui]")) {
				document.documentElement.classList.add("cursor-native");
				ring.dataset.state = "native";
				label.textContent = "";
				return;
			}
			document.documentElement.classList.remove("cursor-native");
			const text = target?.dataset.cursor || (target ? "OPEN" : "");
			ring.dataset.state = target ? "interactive" : "idle";
			label.textContent = text;
		};
		const down = () => {
			ring.dataset.pressed = "true";
		};
		const up = () => {
			ring.dataset.pressed = "false";
		};
		window.addEventListener("pointermove", move, { passive: true });
		window.addEventListener("mouseout", leave);
		document.addEventListener("mouseover", over);
		document.addEventListener("pointerdown", down);
		document.addEventListener("pointerup", up);
		raf = requestAnimationFrame(render);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("pointermove", move);
			window.removeEventListener("mouseout", leave);
			document.removeEventListener("mouseover", over);
			document.removeEventListener("pointerdown", down);
			document.removeEventListener("pointerup", up);
		};
	}, [reducedMotion]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "cursor-dot",
		ref: dotRef,
		"aria-hidden": "true"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "cursor-ring",
		ref: ringRef,
		"data-state": "idle",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ref: labelRef })
	})] });
}
function SiteProviders({ children, initialSettings }) {
	const [language, setLanguageState] = (0, import_react.useState)("en");
	const [theme, setThemeState] = (0, import_react.useState)("light");
	const [reducedMotion, setReducedMotion] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const storedLanguage = window.localStorage.getItem("sw-language");
		const storedTheme = window.localStorage.getItem("sw-theme");
		if (storedLanguage === "bn" || storedLanguage === "en") setLanguageState(storedLanguage);
		if (storedTheme === "dark" || storedTheme === "light") setThemeState(storedTheme);
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReducedMotion(media.matches);
		update();
		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.dataset.theme = theme;
		document.documentElement.dataset.language = language;
		document.documentElement.lang = language === "bn" ? "bn" : "en";
	}, [language, theme]);
	const setLanguage = (0, import_react.useCallback)((next) => {
		setLanguageState(next);
		window.localStorage.setItem("sw-language", next);
	}, []);
	const setTheme = (0, import_react.useCallback)((next) => {
		setThemeState(next);
		window.localStorage.setItem("sw-theme", next);
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		language,
		setLanguage,
		toggleLanguage: () => setLanguage(language === "en" ? "bn" : "en"),
		theme,
		setTheme,
		toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
		reducedMotion
	}), [
		language,
		reducedMotion,
		setLanguage,
		setTheme,
		theme
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteContext.Provider, {
		value,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteSettingsProvider, {
			initialSettings,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteTransition, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionRuntime, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicCursor, {}),
				children
			]
		})
	});
}
//#endregion
export { useSite as n, motionDuration as r, providers_exports as t };
