import { useTonConnectUI } from "@tonconnect/ui-react";
import {beginCell, Sender, SenderArguments, storeStateInit} from "@ton/core";

export function useTonConnect(): { sender: Sender; connected: boolean } {
  const [tonConnectUI] = useTonConnectUI();

  return {
    sender: {
      send: async (args: SenderArguments) => {
        let stateInit: string | undefined;
        if (args.init) {
          // State init cell for the contract.
          const stateInitCell = beginCell()
            .store(storeStateInit(args.init))
            .endCell();
          // Convert the state init cell to boc base64.
          stateInit = stateInitCell.toBoc().toString("base64");
        }

        // The payload for the message.
        let payload: string | undefined;
        if (args.body) {
          // Convert the message body to boc base64.
          payload = args.body.toBoc().toString("base64");
        }

        // The amount to send in nano tokens.
        const amount = args.value.toString();

        const message = {
          address: args.to.toString(),
          amount,
          payload,
          stateInit,
        }

        console.log('ARGS', args, 'MESSAGE', message);

        await tonConnectUI.sendTransaction({
          messages: [
            message,
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    },
    connected: tonConnectUI.connected,
  };
}
