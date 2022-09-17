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
import luckycat from "../assets/luckycat.png"

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
    const [minutesBeforeDraw, setminutesBeforeDraw] = useState("1")
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

    const { runContractFunction: getMinutesBeforeNextDraw } = useWeb3Contract({
        abi: luckyTrioAbi,
        contractAddress: lotteryAddress,
        functionName: "getMinutesBeforeNextDraw",
        params: {},
    })

    const { runContractFunction: getLatestTimeStamp } = useWeb3Contract({
        abi: luckyTrioAbi,
        contractAddress: lotteryAddress,
        functionName: "getLatestTimeStamp",
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
        const minutesBeforeDrawFromCall = (await getMinutesBeforeNextDraw()).toString()
        setminutesBeforeDraw(minutesBeforeDrawFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async (tx) => {
        const txReceipt = await tx.wait(1)
        const event = txReceipt.events[1]
        const value = event.args[0]
        const address = value.toString()
        handleSuccessNotification(number)
        updateUI()
    }

    const handleSuccessNotification = (address) => {
        dispatch({
            type: "success",
            message: `${address} Entered Successfully`,
            title: "Entry Received!",
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
                <EntranceModal
                    isVisible={showModal}
                    entranceFee={entranceFee}
                    luckyTrioAbi={luckyTrioAbi}
                    lotteryAddress={lotteryAddress}
                    onClose={hideModal}
                />
                <Image src={luckycat} alt="luckycat" className="w-540px h-540px" />
                <div className="flex-1 flex justify-center items-start flex-col">
                    <p className="indent-5 font-medium text-[18px] leading-[30.8px] max-w-[470px] mt-5 px-2">
                        Welcome to LUCKY-TRIO-LOTTERY. This is a demo blockchain Lottery game where
                        you choose 3 numbers and buy a ticket to enter the lottery. Only one player
                        can own a specific 3 digit number. Draw is every hour. Best of luck to
                        everyone.
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center py-10">
                {lotteryAddress ? (
                    <Button
                        onClick={entryClick}
                        radius={40}
                        size="xl"
                        text="BUY TICKET HERE"
                        theme="colored"
                        color="red"
                        isLoading={showModal ? true : false}
                        loadingText={
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full mr-4"></div>
                        }
                        customize={{
                            color: "red",
                        }}
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
                <h4 className="font-medium">INFORMATION</h4>
                <ul>
                    <li className="flex flex-row">
                        Next Draw will be after&nbsp;
                        <div className="font-semibold">{minutesBeforeDraw}</div>
                        &nbsp;Minutes
                    </li>
                    <li className="flex flex-row">
                        <div className="font-semibold">Entry Status:&nbsp;</div>
                        {entryStatus
                            ? "OPEN FOR NEW ENTRIES"
                            : "CURRENTLY CLOSED, PLEASE JOIN NEXT DRAW"}
                    </li>
                    <li className="flex flex-row">
                        <div className="font-semibold">Entrance Fee: &nbsp;</div>
                        {entranceFee * 0.000000000000000001}&nbsp;ETH
                    </li>
                    <li className="flex flex-row">
                        <div className="font-semibold">Recent Winner: &nbsp;</div>
                        {recentWinner}
                    </li>
                    <li className="flex flex-row">
                        <div className="font-semibold">Recent Winning Number: &nbsp;</div>
                        {recentWinningNumber}
                    </li>
                    <li className="flex flex-row">
                        <div className="font-semibold">Number of Entries: &nbsp;</div>
                        {numberOfEntries}
                    </li>
                </ul>
            </div>
        </section>
    )
}
export default Mint
