import { Modal, Input, useNotification } from "@web3uikit/core"
import { useState } from "react"
import { useWeb3Contract } from "react-moralis"

const EntranceModal = ({ isVisible, entranceFee, onClose, luckyTrioAbi, lotteryAddress }) => {
    const [entryNumber, setEntryNumber] = useState()
    // const [entranceFee, setEntranceFee] = useState()
    const dispatch = useNotification()

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "sucess",
            message: "Entry Received",
            title: "Successfully Entered Lottery Draw",
            position: "topR",
            icon: "bell",
        })
        onClose && onClose()
        setEntryNumber()
    }

    const {
        runContractFunction: enterLottery,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: luckyTrioAbi,
        contractAddress: lotteryAddress,
        functionName: "enterLottery",
        params: { entryNumber },
        msgValue: entranceFee,
    })

    return (
        <Modal
            isVisible={isVisible}
            onCancel={onClose}
            onCloseButtonPressed={onClose}
            onOk={() => {
                enterLottery({
                    onError: (error) => console.log(error),
                    onSuccess: handleSuccess,
                })
            }}
        >
            <Input
                label="Enter your three numbers here"
                name="Entry"
                type="number"
                onChange={(event) => {
                    setEntryNumber(event.target.value)
                }}
            />
        </Modal>
    )
}

export default EntranceModal
