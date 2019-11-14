export const getChromeDocument = () => ({
  exitFullscreen: jest.fn(),
  fullscreenElement: null,
  fullscreenEnabled: true,

  documentElement: {
    requestFullscreen: jest.fn(),
    onfullscreenchange: null,
    onfullscreenerror: null
  }
});

export const getSafariDocument = () => ({
  webkitExitFullscreen: jest.fn(),
  webkitFullscreenElement: null,
  webkitFullscreenEnabled: true,

  documentElement: {
    webkitRequestFullScreen: jest.fn(),
    onfullscreenchange: null,
    onfullscreenerror: null
  }
});

export const getMozDocument = () => ({});

export const getIphoneDocument = () => ({});

export const getSafariVideoElement = () => ({
  webkitEnterFullscreen: jest.fn(),
  webkitExitFullscreen: jest.fn(),
  webkitSupportsFullscreen: true,
  webkitDisplayingFullscreen: true
});

export const getDivElement = () => ({ requestFullscreen: jest.fn() });
