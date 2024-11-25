import * as React from "react";

import { DepositInfoDisplay } from "@/entities/deposit/ui/info-display";
import { RowContent } from "@/entities/deposit/ui/row-content";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Slider } from "@/shared/components/ui/slider";

// TODO: refactor
import styles from "../../deposit-card/deposit-card.module.css";

type WithdrawBlockInfoProps = {
	data: {
		collateral: string;
		position: string;
		leverage: string;
		expectedYield: string;
	};
	className?: string;
};

function WithdrawBlockInfo({
	data,
	className,
}: WithdrawBlockInfoProps): React.ReactNode {
	const { collateral, leverage, position, expectedYield } = data;
	return (
		<div className={className}>
			<DepositInfoDisplay title="Collateral (deposited)" content={collateral} />
			<DepositInfoDisplay
				title="Position (how much borrowed)"
				content={position}
			/>
			<DepositInfoDisplay title="Leverage" content={leverage} />
			<DepositInfoDisplay title="Expected yield" content={expectedYield} />
		</div>
	);
}

function WithdrawForm({
	postfixNode,
}: {
	postfixNode?: React.ReactNode;
}): React.ReactNode {
	return (
		<form className={`${styles.form}`}>
			<label>
				<div className="flex justify-between items-center w-full pb-5">
					<span className="font-extrabold text-black/50">
						Amount to withdraw:
					</span>
					<span className="text-sm leading-[145%] text-[#8f8f8f] text-right">
						Available to withdraw ~436 TON
					</span>
				</div>
				<Slider max={100} thumbOptions={{ postfix: "%" }} />
			</label>

			<RowContent
				title="Expected position after withdrawal:"
				value="574.43 TON"
				subValue="~436 $"
			/>
			<RowContent
				title="Expected collateral after withdrawal:"
				value="345.43 TON"
				subValue="~436 $"
			/>
			<RowContent title="To receive:" value="2777.43 TON" subValue="~436 $" />
			{postfixNode && <div>{postfixNode}</div>}
			<Button size="lg">Withdraws</Button>
		</form>
	);
}

function WithdrawCard(): React.ReactNode {
	const infoData = {
		collateral: "$ 1 376 095.77",
		position: "$ 4356.43",
		leverage: "x 2.51",
		expectedYield: "$ 1234.45",
	};

	return (
		<Card>
			<CardContent>
				<div className={`${styles.wrapper}`}>
					<WithdrawForm
						postfixNode={
							<WithdrawBlockInfo
								className={`${styles.info} ${styles.info__mobile}`}
								data={infoData}
							/>
						}
					/>
					<WithdrawBlockInfo
						className={`${styles.info} ${styles.info__desktop}`}
						data={infoData}
					/>
				</div>
			</CardContent>
		</Card>
	);
}

export default WithdrawCard;
