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
				`${process.env.NEXT_PUBLIC_WEB_APP_URL}/tonconnect-manifest.json`
			}
		>
			{children}
		</TonConnectUIProvider>
	);
}

export default TonConnectProvider;
