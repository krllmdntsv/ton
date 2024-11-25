"use client";

import MediumLogo from "@/shared/icons/medium-logo";
import TelegramLogo from "@/shared/icons/telegram-logo";
import TwitterLogo from "@/shared/icons/twitter-logo";

import styles from "./footer.module.css";

function LogoLink(props: { href: string; children: React.ReactNode }) {
	const { href, children } = props;

	return <a href={href}>{children}</a>;
}

function Footer() {
	return (
		<footer className={`global-container ${styles.footer}`}>
			<div className={`${styles["footer-content"]}`}>
				<LogoLink href="https://x.com">
					<TwitterLogo />
				</LogoLink>
				<LogoLink href="https://medium.com">
					<MediumLogo />
				</LogoLink>
				<LogoLink href="https://medium.com">
					<TelegramLogo />
				</LogoLink>
			</div>
		</footer>
	);
}

export default Footer;
