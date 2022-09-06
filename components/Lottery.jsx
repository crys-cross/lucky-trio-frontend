import { useWeb3Contract } from "react-moralis"
import luckyTrioAbi from "../constants/luckyTrioAbi.json"
import networkAddresses from "../constants/networkAddresses.json"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "@web3uikit/core"
import { Button } from "@web3uikit/core"
import EntranceModal from "./EntranceModal"

import Image from "next/image"

const Mint = () => {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const lotteryAddress =
        chainId in networkAddresses ? networkAddresses[chainId]["LotteryTrio"][0] : null
    console.log(`Working with contract address: ${lotteryAddress}`)
    console.log(`Network Chain ID: ${parseInt(chainIdHex)}`)
    const [entryStatus, setEntryStatus] = useState()
    const [entranceFee, setEntranceFee] = useState()
    const [recentWinner, setRecentWinner] = useState()
    const [recentWinningNumber, setRecentWinningNumber] = useState()
    const [numberOfEntries, setNumberOfEntries] = useState()
    const [showModal, setShowModal] = useState(false)
    const hideModal = () => setShowModal(false)
    const dispatch = useNotification()

    const {
        runContractFunction: enterLottery,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: luckyTrioAbi,
        contractAddress: lotteryAddress,
        functionName: "enterLottery",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: luckyTrioAbi,
        contractAddress: lotteryAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getLotteryState } = useWeb3Contract({
        abi: luckyTrioAbi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryState",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: luckyTrioAbi,
        contractAddress: lotteryAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    const { runContractFunction: getRecentWinningNumber } = useWeb3Contract({
        abi: luckyTrioAbi,
        contractAddress: lotteryAddress,
        functionName: "getRecentWinningNumber",
        params: {},
    })

    const { runContractFunction: getNumberofPlayers } = useWeb3Contract({
        abi: luckyTrioAbi,
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

    const entryClick = () => {
        setShowModal(true)
    }

    return (
        <section>
            <div className="flex md:flex-row flex-col-reverse sm:py-16 py-6">
                <h2 className="w-[100%] h-[100%] relative z-[1]">LOTTERY IMAGE HERE</h2>
                <EntranceModal
                    isVisible={showModal}
                    entranceFee={entranceFee}
                    luckyTrioAbi={luckyTrioAbi}
                    lotteryAddress={lotteryAddress}
                    onClose={hideModal}
                />
                <div>
                    <p>
                        To enter this Lottery draw, please click on Enter Lottery button below and
                        input your chosen three digit number.
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center py-10">
                {lotteryAddress ? (
                    <Button
                        onClick={entryClick}
                        size="xl"
                        text="ENTER LOTTERY HERE"
                        theme="outline"
                        isLoading={showModal ? true : false}
                        loadingText={
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full mr-4"></div>
                        }
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
                <h4>INFORMATION</h4>
                <ul>
                    <li>
                        Entry Status:&nbsp;
                        {entryStatus
                            ? "OPEN FOR NEW ENTRIES"
                            : "CURRENTLY CLOSED, PLEASE JOIN NEXT DRAW"}
                    </li>
                    <li>Entrance Fee: &nbsp;{entranceFee * 0.000000000000000001}&nbsp;ETH</li>
                    <li>Recent Winner: &nbsp;{recentWinner}</li>
                    <li>Recent Winning Number: &nbsp;{recentWinningNumber}</li>
                    <li>Number of Entries: &nbsp;{numberOfEntries}</li>
                </ul>
            </div>
        </section>
    )
}
export default Mint
