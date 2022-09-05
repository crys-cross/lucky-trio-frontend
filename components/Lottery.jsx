import { useWeb3Contract } from "react-moralis"
import luckyTrioAbi from "../constants/luckyTrioAbi.json"
import networkAddresses from "../constants/networkAddresses.json"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "@web3uikit/core"
import { Button } from "@web3uikit/core"

import Image from "next/image"

const Mint = () => {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    console.log(parseInt(chainIdHex))
    const chainId = parseInt(chainIdHex)
    const lotteryAddress =
        chainId in networkAddresses ? networkAddresses[chainId]["LotteryTrio"][0] : null
    console.log(`Working with contract address: ${lotteryAddress}`)
    const [entranceFee, setEntranceFee] = useState()
    const [recentWinner, setRecentWinner] = useState()
    const [recentWinningNumber, setRecentWinningNumber] = useState()
    const [numberOfEntries, setNumberOfEntries] = useState()
    const dispatch = useNotification()

    const {
        runContractFunction: enterLottery,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: luckyTrioAbi,
        contractAddress: lotteryAddress,
        functionName: "enterLottery",
        params: { input },
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: luckyTrioAbi,
        contractAddress: lotteryAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getLotteryState } = useWeb3Contract({
        abi: pokemonNftabi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryState",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: pokemonNftabi,
        contractAddress: lotteryAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    const { runContractFunction: getRecentWinningNumber } = useWeb3Contract({
        abi: pokemonNftabi,
        contractAddress: lotteryAddress,
        functionName: "getRecentWinningNumber",
        params: {},
    })

    const { runContractFunction: getNumberofPlayers } = useWeb3Contract({
        abi: pokemonNftabi,
        contractAddress: lotteryAddress,
        functionName: "getNumberofPlayers",
        params: {},
    })

    const updateUI = async () => {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        setEntranceFee(entranceFeeFromCall)
        const entryStatusFromCall = (await getLotteryState()).toString()
        setEntryStatus(entryStatusFromCall)
        const recentWinnerFromCall = (await getRecentWinner()).toString()
        setRecentWinner(recentWinnerFromCall)
        const recentWinningNumberFromCall = (await getRecentWinningNumber()).toString()
        setRecentWinningNumber(recentWinningNumberFromCall)
        const numberOfPlayersFromCall = (await getNumberofPlayers()).toString()
        setNumberOfEntries(numberOfPlayersFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleSuccessNotification(tx)
        updateUI()
    }

    const handleSuccessNotification = () => {
        dispatch({
            type: "sucess",
            message: "Entered Successfully",
            title: "Tx Notification",
            position: "topR",
            icon: "bell",
        })
    }

    return (
        <section>
            <div className="flex md:flex-row flex-col-reverse sm:py-16 py-6">
                <h2 className="w-[100%] h-[100%] relative z-[5]">LOTTERY IMAGE HERE</h2>
                <div className="flex-1 flex justify-center items-start flex-col">
                    <p className="font-normal text-dimWhite text-[18px] leading-[30.8px] max-w-[470px] mt-5 px-2">
                        To enter this Lottery draw, please click on Enter Lottery button below and
                        input your chosen three digit number.
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center py-10">
                {lotteryAddress ? (
                    <Button
                        onClick={async () =>
                            await enterLottery({
                                // onComplete:
                                // onError:
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }
                        size="xl"
                        text="ENTER LOTTERY HERE"
                        theme="outline"
                    />
                ) : (
                    <div>
                        <p>
                            Please Connect Wallet and switch to supported networks which are:
                            Goerli, Mumbai, Fantom Test, and Fuji.
                        </p>
                    </div>
                )}
            </div>
            <div className="flex flex-col items-center">
                <h4>Stats</h4>
                <ul>
                    <li>Entry Status: {entryStatus}</li>
                    <li>Entrance Fee: {entranceFee}</li>
                    <li>Recent Winner: {recentWinner}</li>
                    <li>Recent Winning Number: {recentWinningNumber}</li>
                    <li>Number of Entries: {numberOfEntries}</li>
                </ul>
            </div>
        </section>
    )
}
export default Mint
