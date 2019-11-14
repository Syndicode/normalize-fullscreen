import makeMethodsMapper from "./make-methods-mapper";

const normalizeFullscreen = initialElement => {
  const document = window?.document ?? {};
  const subject = initialElement ?? document;
  const fn = makeMethodsMapper(subject);
  const getFn = element => {
    return element || !fn ? makeMethodsMapper(subject) : fn;
  };
  const eventNameMap = fn
    ? {
        change: fn.fullscreenchange || fn.fullscreenexit,
        error: fn.fullscreenerror,
        exit: fn.fullscreenexit || fn.fullscreenchange
      }
    : {};

  return {
    async request(element) {
      const fn = getFn(element);
      const targetElement = element
        ? element.documentElement || element
        : subject.documentElement || subject;
      if (typeof targetElement[fn.requestFullscreen] !== "function") {
        throw new Error(`invalid target element: ${targetElement}`);
      }

      targetElement[fn.requestFullscreen]();
    },

    async exit(element) {
      if (!this.isFullscreen) {
        return;
      }

      const fn = getFn(element);
      const targetElement = element || subject;

      if (typeof targetElement[fn.exitFullscreen] !== "function") {
        throw new Error(`invalid target element: ${targetElement}`);
      }

      return targetElement[fn.exitFullscreen]();
    },

    toggle(element) {
      return this.isFullscreen ? this.exit(element) : this.request(element);
    },

    on(event, callback) {
      const eventName = eventNameMap[event];
      if (eventName) {
        subject.addEventListener(eventName, callback, false);
      }
    },

    off(event, callback) {
      var eventName = eventNameMap[event];
      if (eventName) {
        subject.removeEventListener(eventName, callback, false);
      }
    },

    _raw: fn,

    get isFullscreen() {
      return Boolean((fn && subject[fn.fullscreenDisplaying]) || this.element);
    },

    get element() {
      return (fn && subject[fn.fullscreenElement]) ?? null;
    },

    get isEnabled() {
      return Boolean(
        fn && (subject[fn.fullscreenSupports] || document[fn.fullscreenEnabled])
      );
    }
  };
};

export default normalizeFullscreen;
