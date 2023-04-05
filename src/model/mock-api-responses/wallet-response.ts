import { Wallet } from "../Wallet";

const wallet: Wallet = {
    balance: 3,
    depositAddress: "",
}

export const walletResponse = {
    200: wallet,
    201: {

    },
    500: {

    },
}