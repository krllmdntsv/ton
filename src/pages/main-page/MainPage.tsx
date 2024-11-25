import DepositCard from "@/features/deposite/deposit-card/deposit-card";
import WithdrawCard from "@/features/deposite/withdraw/withdraw-card/withdraw-card";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/shared/components/ui/tabs";

function MainPage() {
	return (
		<div className="global-container">
			<div className="pt-20 md:pt-40">
				<Tabs defaultValue="Deposit">
					<TabsList className="w-full">
						<TabsTrigger className="w-full" value="Deposit">
							Deposit
						</TabsTrigger>
						<TabsTrigger className="w-full" value="Withdraw">
							Withdraw
						</TabsTrigger>
					</TabsList>
					<TabsContent value="Deposit">
						<DepositCard />
					</TabsContent>
					<TabsContent value="Withdraw">
						<WithdrawCard />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}

export default MainPage;
