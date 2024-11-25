import TonWeb from 'tonweb';

const { Address } = TonWeb.utils;

const MASTER_ADDRESS = 'EQC98_qAmNEptUtPc7W6xdHh_ZHrBUFpw5Ft_IzNU20QAJav';
const masterContractAddr = new Address(MASTER_ADDRESS);
const tonweb = new TonWeb();

/**
 *  Create master contract instance
*/
// @ts-ignore
const jettonMinter = new TonWeb.token.jetton.JettonMinter(tonweb.provider, { address: masterContractAddr });

export async function getWalletAddressByContractAddress(contractAddress: string): Promise<string | undefined> {
  try {
    const jettonWalletAddress = await jettonMinter.getJettonWalletAddress(new TonWeb.utils.Address(`${contractAddress}`));
    return jettonWalletAddress.toString();
  } catch (err) {
    console.error(err);
  }
  return undefined;
}