"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import * as React from "react";

function TonConnectProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<TonConnectUIProvider
			// TODO: type check
			manifestUrl={
				"https://raw.githubusercontent.com/strictKraken/public-staff/main/tonconnect-manifest.json"
				// ((process.env.NEXT_PUBLIC_WEB_APP_URL as string) +
				// process.env.NEXT_PUBLIC_LINK_TO_MANIFEST as string
			}
		>
			{children}
		</TonConnectUIProvider>
	);
}

export default TonConnectProvider;
