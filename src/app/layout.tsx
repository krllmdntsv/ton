import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import ThemeProvider from "@/application/providers/theme-provider/theme-provider";
import TonConnectProvider from "@/application/providers/ton-connect-provider/ton-connect-provider";
import Footer from "@/widgets/footer/footer";
import Header from "@/widgets/header/header";

import "@/shared/styles/global.css";
import styles from "./layout.module.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Onixe",
	description: "Onixe",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<body className={montserrat.className}>
				<TonConnectProvider>
				<ThemeProvider
					attribute="className"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					<main>
						<div className="global-container relative">
							<div
								className={`absolute top-[10px] h-[40dvh] w-full ${styles.background}`}
							/>
						</div>

						{children}
					</main>
					<Footer />
				</ThemeProvider>
				</TonConnectProvider>
			</body>
		</html>
	);
}
