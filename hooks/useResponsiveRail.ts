import * as React from "react";

export default function useResponsiveRail() {
  const [isSmall, setSmall] = React.useState(false);
  React.useEffect(() => {
    const on = () => setSmall(window.innerWidth < 768);
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return isSmall;
}
