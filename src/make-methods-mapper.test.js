import { useEffect, useState } from "react";
import makeMethodsMapper from "./make-methods-mapper";
import {
  getSafariDocument,
  getChromeDocument,
  getSafariVideoElement,
  getDivElement
} from "./mocks";

describe("makeMethodsMapper", () => {
  beforeAll(() => {
    window.document.exitFullscreen = jest.fn();
    window.document.fullscreenElement = null;
    window.document.fullscreenEnabled = true;
  });
  afterAll(() => {
    delete window.document.exitFullscreen;
    delete window.document.fullscreenElement;
    delete window.document.fullscreenEnabled;
  });
  test("Safari Mac/iPad", () => {
    const document = getSafariDocument();
    const fn = makeMethodsMapper(document);

    expect(fn.requestFullscreen).toBe("webkitRequestFullScreen");
    expect(fn.exitFullscreen).toBe("webkitExitFullscreen");
    expect(fn.fullscreenElement).toBe("webkitFullscreenElement");
    expect(fn.fullscreenEnabled).toBe("webkitFullscreenEnabled");
    expect(fn.fullscreenDisplaying).toBe(null);
    expect(fn.fullscreenchange).toBe("webkitfullscreenchange");
    expect(fn.fullscreenerror).toBe("webkitfullscreenerror");
    expect(fn.fullscreenexit).toBe(null);
  });

  test("Chrome document", () => {
    const document = getChromeDocument();
    const fn = makeMethodsMapper(document);

    expect(fn.requestFullscreen).toBe("requestFullscreen");
    expect(fn.exitFullscreen).toBe("exitFullscreen");
    expect(fn.fullscreenElement).toBe("fullscreenElement");
    expect(fn.fullscreenEnabled).toBe("fullscreenEnabled");
    expect(fn.fullscreenDisplaying).toBe(null);
    expect(fn.fullscreenchange).toBe("fullscreenchange");
    expect(fn.fullscreenerror).toBe("fullscreenerror");
  });

  test("Chrome div", () => {
    const div = getDivElement();
    const fn = makeMethodsMapper(div);

    expect(fn.requestFullscreen).toBe("requestFullscreen");
    expect(fn.exitFullscreen).toBe("exitFullscreen");
    expect(fn.fullscreenElement).toBe("fullscreenElement");
    expect(fn.fullscreenEnabled).toBe("fullscreenEnabled");
    expect(fn.fullscreenDisplaying).toBe(null);
    expect(fn.fullscreenchange).toBe("fullscreenchange");
    expect(fn.fullscreenerror).toBe("fullscreenerror");
  });

  test("iPhone", () => {
    const video = getSafariVideoElement();
    const fn = makeMethodsMapper(video);

    expect(fn.requestFullscreen).toBe("webkitEnterFullscreen");
    expect(fn.exitFullscreen).toBe("webkitExitFullscreen");
    expect(fn.fullscreenElement).toBe(null);
    expect(fn.fullscreenSupports).toBe("webkitSupportsFullscreen");
    expect(fn.fullscreenDisplaying).toBe("webkitDisplayingFullscreen");
    expect(fn.fullscreenchange).toBe(null);
    expect(fn.fullscreenerror).toBe(null);
    expect(fn.fullscreenexit).toBe("webkitendfullscreen");
  });
});
