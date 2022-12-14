import { ConnectButton } from "@web3uikit/web3"

const Header = () => {
    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between item-center">
            <h1 className="py-2 px-4 font-bold text-3xl">LUCKY-TRIO-LOTTERY</h1>
            <div className="flex flex-row items-center">
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}
export default Header
