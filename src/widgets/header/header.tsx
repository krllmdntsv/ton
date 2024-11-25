"use client";

import { TonConnectButton } from "@tonconnect/ui-react";
import { PanelLeft } from "lucide-react";
import Link from "next/link";

import OnixeLogo from "@/entities/logo/onixe-logo/onixe-logo";
import { Button } from "@/shared/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from "@/shared/components/ui/sheet";

import { navList } from "./config";
import styles from "./header.module.css";

function NavList() {
	return (
		<ul className={`${styles["navigation-list"]}`}>
			{navList.map(({ text, href }) => (
				<li key={href}>
					<Link href={href}>{text}</Link>
				</li>
			))}
		</ul>
	);
}

function MobileMenu() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" variant="outline">
					<PanelLeft className="h-5 w-5" />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<nav className={`${styles["navigation-wrapper"]}`}>
					<NavList />
				</nav>
			</SheetContent>
		</Sheet>
	);
}

function Header() {
	return (
		<header className={`${styles.header}`}>
			<div className="global-container flex w-full">
				<div className={`${styles["header__mobile-burger"]}`}>
					<MobileMenu />
				</div>
				<div className="pl-4 md:pl-0">
					<OnixeLogo />
				</div>
				<nav className={`${styles["header__desc-nav"]}`}>
					<NavList />
				</nav>
				<TonConnectButton />
			</div>
		</header>
	);
}

export default Header;