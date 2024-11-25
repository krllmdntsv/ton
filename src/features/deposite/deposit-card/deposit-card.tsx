import * as React from "react";

import { DepositInfoDisplay } from "@/entities/deposit/ui/info-display";
import { RowContent } from "@/entities/deposit/ui/row-content";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { InputBase } from "@/shared/components/ui/input-base";
import { Slider } from "@/shared/components/ui/slider";
import { TonLogo } from "@/shared/icons/ton-logo";

import styles from "./deposit-card.module.css";

type DepositData = {
	totalPosition: number;
	collateral: number;
	position: number;
	leverage: number;
	expectedYield: number;
};

function DepositInfoDisplayBlock(data: DepositData): React.ReactNode {
	const { totalPosition, collateral, position, leverage, expectedYield } = data;

	return (
		<>
			<DepositInfoDisplay
				title="Collateral (deposited)"
				content={`${totalPosition}`}
			/>
			<DepositInfoDisplay
				title="Position (how much borrowed)"
				content={`${collateral}`}
			/>
			<DepositInfoDisplay title="Leverage" content={`x${leverage}`} />
			<DepositInfoDisplay title="Expected yield" content={`${expectedYield}`} />
		</>
	);
}

function DepositForm({
	infoNode,
}: {
	infoNode?: React.ReactNode;
}): React.ReactNode {
	const userData = {
		availableBalance: 436,
	};

	const cardData = {
		availableRound: 4,
	};

	return (
		<form className={`${styles.form}`}>
			<div>
				<InputBase
					inputMode="numeric"
					pattern="[0-9]*"
					placeholder="Amount"
					prefixNode={<TonLogo />}
					postfixNode={<span>Max</span>}
				/>
				<div className="text-end text-gray2 text-sm">
					<span>Available balance ~{userData.availableBalance} TON</span>
				</div>
			</div>

			<div className="flex gap-6 align-top">
				<span className="text-black/50">Rounds</span>
				<Slider
					min={1}
					max={cardData.availableRound}
					step={1}
					thumbOptions={{ prefix: "x" }}
					sliderOptions={{ displayStepsValues: true }}
				/>
			</div>
			{infoNode}

			{/* <div className="flex-auto" /> */}
			<Button size="lg" className="mt-auto">
				Stake
			</Button>
		</form>
	);
}

function DepositCard(): React.ReactNode {
	const resultCardData: DepositData = {
		totalPosition: 3563.43,
		collateral: 1376095.77,
		position: 4356.43,
		leverage: 2.51,
		expectedYield: 1234.45,
	};

	return (
		<Card>
			<CardContent>
				<div className={`${styles.wrapper}`}>
					<DepositForm
						infoNode={
							<>
								<RowContent
									title="Total position:"
									value={`${resultCardData.position}`}
								/>
								<div className={`${styles.info} ${styles.info__mobile}`}>
									<DepositInfoDisplayBlock {...resultCardData} />
								</div>
							</>
						}
					/>
					<div className={`${styles.info} ${styles.info__desktop}`}>
						<DepositInfoDisplayBlock {...resultCardData} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default DepositCard;
