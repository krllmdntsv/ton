import styles from "./row-content.module.css";

function RowContent({
	title,
	value,
	subTitle,
	subValue,
}: {
	title: string;
	value: string;
	subTitle?: string;
	subValue?: string;
}): React.ReactNode {
	return (
		<div className={`${styles.wrapper}`}>
			<div className={`${styles.title__wrapper}`}>
				<span>{title}</span>
				{subTitle && <span className="">{subTitle}</span>}
			</div>
			<div className={`${styles.value__wrapper}`}>
				<span>{value}</span>
				{subValue && (
					<span className="text-gray2 text-sm font-[500]">{subValue}</span>
				)}
			</div>
		</div>
	);
}

export { RowContent };
