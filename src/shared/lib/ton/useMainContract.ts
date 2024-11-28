import { OnixeLanthanum } from "./tact_OnixeLanthanum";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import {Address, toNano, beginCell, ContractProvider} from "@ton/core";
import { useTonConnect } from "./useTonConnect";
import {useTonWallet} from "@tonconnect/ui-react";
import {Address as CoreAddress} from "@ton/core/dist/address/Address";
import {useMemo} from "react";


const tonStakersJettonMasterContractAddress = Address.parse("EQC98_qAmNEptUtPc7W6xdHh_ZHrBUFpw5Ft_IzNU20QAJav");
const tonStakersPoolContractAddress = Address.parse("EQCkWxfyhAkim3g2DjKQQg8T5P4g-Q1-K_jErGcDJZ4i-vqR");

const evaaMasterAddress = Address.parse("EQC8rUZqR_pWV1BylWUlPNBzyiTYVoBEmQkMIQDZXICfnuRr")

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export function useMainContract() {

  const wallet = useTonWallet();
  const walletAddress = useMemo(() => {
    if(!wallet?.account.address) return;

    return Address.parse(wallet.account.address)
  }, [wallet]);//'EQB1AKpWxapKbGMcAQnYoTGbnYLs51DUse8Q-d5PR1_EQ_EB';

  const client = useTonClient();
  const { sender } = useTonConnect();

  const mainContract = useAsyncInitialize(async () => {
    if (!client || !walletAddress) return;

    return client.open(await OnixeLanthanum.fromInit(0, walletAddress))
  }, [client, walletAddress]);

  const contractAddress = mainContract?.address;

  return {
    contractAddress,
    contractBalance: 0,
    isDeployed: async () => {
      if(client && contractAddress) {
        const res = await client.isContractDeployed(contractAddress);

        console.log('DEPLOYED', res, contractAddress.toString(), wallet);
      }
    },
    send: async () => {
      if(mainContract && client && contractAddress) {

        console.log('PROVIDER', client)

        async function getUserJettonWalletAddress(userAddress: Address, jettonMasterAddress: Address) {
          return (await client!.runMethod(jettonMasterAddress, "get_wallet_address", [
            {type: "slice", cell: beginCell().storeAddress(userAddress).endCell()}
          ])).stack.readAddress();
        }

        async function getUserEvaaAddress(userAddress: Address) {
          return (await client!.runMethod(evaaMasterAddress, "get_user_address", [
            {type: "slice", cell: beginCell().storeAddress(userAddress).endCell()}
          ])).stack.readAddress();
        }

        async function waitForDeploy(address: Address, attempts: number = 20, sleepDuration: number = 2000) {
          if (attempts <= 0) {
            throw new Error('Attempt number must be positive');
          }

          for (let i = 1; i <= attempts; i++) {
            const isDeployed = await client!.isContractDeployed(address);
            if (isDeployed) {
              console.log(`Contract deployed at address ${address.toString()}`);
              console.log(
                `You can view it at ${address.toString()}`,
              );
              return;
            }
            await sleep(sleepDuration);
          }

          throw new Error("Contract was not deployed. Check your wallet's transactions");
        }



        let tsWalletAddress = await getUserJettonWalletAddress(Address.parse(contractAddress.toString()), tonStakersJettonMasterContractAddress)
        let evaaUserAddress = await getUserEvaaAddress(Address.parse(contractAddress.toString()));


        const res = await mainContract.send(
          sender,
          {
            value: toNano('0.1'),
          },
          {
            $$type: 'CmdSetParameters',
            queryId: 0n,
            jettonWalletAddress: CoreAddress.parse(tsWalletAddress.toString()),
            stakingPoolAddress: CoreAddress.parse(tonStakersPoolContractAddress.toString()),
            evaaUserAddress: CoreAddress.parse(evaaUserAddress.toString())
          }
        )

        console.log('SEND', res);

        await waitForDeploy(contractAddress);
      }
    },
    get: async () =>{
      if(client && contractAddress) {
        // const res = await client.runMethod();

        // console.log('DEPLOYED', res, mainContract.address.toString());
      }
    },
  };
}
