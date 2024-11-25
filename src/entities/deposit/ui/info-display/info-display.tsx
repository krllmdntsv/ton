import styles from "./info-display.module.css";

type DepositInfoDisplayProps = {
	title: string;
	content: string;
};

function DepositInfoDisplay({
	title,
	content,
}: DepositInfoDisplayProps): React.ReactNode {
	return (
		<div className={`${styles.wrapper}`}>
			<div className={`${styles.title}`}>
				<span>{title}</span>
			</div>
			<div className={`${styles.value}`}>
				<span>{content}</span>
			</div>
		</div>
	);
}

export { DepositInfoDisplay };
