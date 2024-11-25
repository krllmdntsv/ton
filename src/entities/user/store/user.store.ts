// ton user
import { create } from "zustand";

/**
 *
 * Need {current available balance}
 * Need base data user
 */

const useTonUserStore = create(() => ({
  tonWallet: null,
  setUser: () => { },
  logoutUser: () => { }
}))


export { useTonUserStore }