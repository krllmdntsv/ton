import { useEffect, useState } from "react";
import { OnixeLanthanum } from "./tact_OnixeLanthanum";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract, toNano } from "@ton/core";
import { useTonConnect } from "./useTonConnect";
import {useTonWallet} from "@tonconnect/ui-react";

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export function useMainContract() {

  const wallet = useTonWallet();
  const address = wallet?.account.address;//'EQB1AKpWxapKbGMcAQnYoTGbnYLs51DUse8Q-d5PR1_EQ_EB';

  const client = useTonClient();
  // const { sender } = useTonConnect();

  console.log('SENDER', client)

  const [contractData, setContractData] = useState<null | {
    counter_value: number;
    recent_sender: Address;
    owner_address: Address;
  }>();


  const mainContract = useAsyncInitialize(async () => {
    if (!client || !address) return;

    return client.open(OnixeLanthanum.fromAddress(Address.parse(address)));
  }, [client, address]);

  //
  // useEffect(() => {
  //   async function getValue() {
  //     if (!mainContract) return;
  //     setContractData(null);
  //     const val = await mainContract.getData();
  //     const { balance } = await mainContract.getBalance();
  //     setContractData({
  //       counter_value: val.number,
  //       recent_sender: val.recent_sender,
  //       owner_address: val.owner_address,
  //     });
  //     setBalance(balance);
  //     await sleep(5000); // sleep 5 seconds and poll value again
  //     getValue();
  //   }
  //   // getValue();
  // }, [mainContract]);

  return {
    contract_address: mainContract?.address.toString(),
    contract_balance: balance,
    ...contractData,
    isDeployed: async () => {
      const address = mainContract?.address;

      if(client && address) {
        const res = await client.isContractDeployed(address);

        console.log('DEPLOYED', res, mainContract.address.toString());
      }
    }
    // sendIncrement: async () => {
    //   return mainContract?.sendIncrement(sender, toNano("0.05"), 5);
    // },
    // sendDeposit: async () => {
    //   return mainContract?.sendDeposit(sender, toNano("1"));
    // },
    // sendWithdrawalRequest: async () => {
    //   return mainContract?.sendWithdrawalRequest(
    //     sender,
    //     toNano("0.05"),
    //     toNano("0.7")
    //   );
    // },
  };
}
