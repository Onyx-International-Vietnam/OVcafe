import * as React from "react";

export default function useLocalDevices() {
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
  React.useEffect(() => {
    async function run() {
      try {
        const list = await navigator.mediaDevices.enumerateDevices();
        setDevices(list);
      } catch {
        // ignore for demo
      }
    }
    run();
  }, []);
  return devices;
}
