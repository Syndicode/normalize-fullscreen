import { useEffect } from "react";
import normalizeFullscreen from "./normalize-fullscreen";

const useFullscreen = element => {
  const fullscreenAPI = normalizeFullscreen(element);
  const [fullscreen, setFullscreen] = useState(fullscreenAPI.isFullscreen);

  const toggleFullscreen = () => {
    if (!fullscreenAPI.isEnabled || !element) return;
    fullscreenAPI.isFullscreen ? fullscreenAPI.exit() : fullscreenAPI.request();
  };

  const fullscreenChangeCallback = () => {
    setFullscreen(fullscreenAPI.isFullscreen);
  };

  useEffect(() => {
    if (!fullscreenAPI.isEnabled) return;
    fullscreenAPI.on("change", fullscreenChangeCallback);
    return () => {
      fullscreenAPI.off("change", fullscreenChangeCallback);
    };
  });

  return [fullscreen, fullscreenAPI.isEnabled, toggleFullscreen];
};

export default useFullscreen;
