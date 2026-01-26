import { useEffect } from "react";

const DisableBrowserBack = () => {
    useEffect(() => {
        window.history.pushState(null, "", window.location.href);

        const handlePopState = (event) => {
            window.history.pushState(null, "", window.location.href);
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    return null;
};

export default DisableBrowserBack;
