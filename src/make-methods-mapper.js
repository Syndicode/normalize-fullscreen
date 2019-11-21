const methodNamesMaps = [
  // reference
  [
    "requestFullscreen",
    "exitFullscreen",
    "fullscreenElement",
    "fullscreenEnabled",
    "fullscreenSupports",
    "fullscreenDisplaying",
    "fullscreenchange",
    "fullscreenerror",
    "fullscreenexit"
  ],
  // Chrome
  [
    "requestFullscreen",
    "exitFullscreen",
    "fullscreenElement",
    "fullscreenEnabled",
    null,
    null,
    "fullscreenchange",
    "fullscreenerror",
    "fullscreenexit"
  ],
  // New WebKit
  [
    "webkitRequestFullScreen",
    "webkitExitFullscreen",
    "webkitFullscreenElement",
    "webkitFullscreenEnabled",
    null,
    null,
    "webkitfullscreenchange",
    "webkitfullscreenerror"
  ],
  // Old WebKit
  [
    "webkitRequestFullScreen",
    "webkitCancelFullScreen",
    "webkitCurrentFullScreenElement",
    "webkitCancelFullScreen",
    null,
    null,
    "webkitfullscreenchange",
    "webkitfullscreenerror"
  ],
  [
    "mozRequestFullScreen",
    "mozCancelFullScreen",
    "mozFullScreenElement",
    "mozFullScreenEnabled",
    null,
    null,
    "mozfullscreenchange",
    "mozfullscreenerror"
  ],
  [
    "msRequestFullscreen",
    "msExitFullscreen",
    "msFullscreenElement",
    "msFullscreenEnabled",
    null,
    null,
    "MSFullscreenChange",
    "MSFullscreenError"
  ],
  [
    "webkitEnterFullscreen",
    "webkitExitFullscreen",
    null,
    null,
    "webkitSupportsFullscreen",
    "webkitDisplayingFullscreen",
    null,
    null,
    "webkitendfullscreen"
  ]
];

const matchMethodNames = subject => methodNamesMap => {
  const requestFullscreen = methodNamesMap[0];
  const exitFullscreen = methodNamesMap[1];

  const isDocument =
    subject.documentElement &&
    requestFullscreen in subject &&
    exitFullscreen in subject.documentElement;

  const isIphoneVideo =
    exitFullscreen in subject && requestFullscreen in subject;

  const isAnotherElement =
    window &&
    window.document &&
    exitFullscreen in subject &&
    requestFullscreen in window.document;

  return isDocument || isIphoneVideo || isAnotherElement;
};

const makeMethodsMapper = subject => {
  if (!subject) return null;
  const reference = {
    exitFullscreen: null,
    fullscreenchange: null,
    fullscreenDisplaying: null,
    fullscreenElement: null,
    fullscreenEnabled: null,
    fullscreenerror: null,
    fullscreenexit: null,
    requestFullscreen: null
  };
  const referenceMap = methodNamesMaps[0];
  const subjectNamesMap = methodNamesMaps
    .slice(1)
    .find(matchMethodNames(subject));

  if (!subjectNamesMap) return null;

  const result = referenceMap.reduce((namesMap, referenceName, index) => {
    const methodName = subjectNamesMap[index];
    if (!methodName) return namesMap;

    return {
      ...namesMap,
      [referenceName]: methodName
    };
  }, reference);

  return result;
};

export default makeMethodsMapper;
