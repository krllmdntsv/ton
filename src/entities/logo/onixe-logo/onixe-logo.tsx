"use client";

import Image from "next/image";
import Link from "next/link";

import { paths } from "@/shared/routing";

import styles from "./onixe-logo.module.css";

function OnixeLogo() {
	return (
		<Link href={paths.home}>
			<Image
				className={`${styles.logo} ${styles.logo__desk}`}
				src="/logo.svg"
				alt="onixe-logo"
				height={45}
				width={168}
			/>

			<Image
				className={`${styles.logo} ${styles.logo__mobile}`}
				src="/logo-mini.svg"
				alt="onixe-logo"
				height={40}
				width={40}
			/>
		</Link>
	);
}

export default OnixeLogo;
