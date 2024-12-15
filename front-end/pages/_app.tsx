import { useEffect } from "react";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import "@styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";


function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    return <Component {...pageProps} />;
}

export default appWithTranslation(App);
