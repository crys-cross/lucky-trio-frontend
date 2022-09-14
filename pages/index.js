import Image from "next/image"
import styles from "../styles/Home.module.css"
import Header from "../components/Header"
import Lottery from "../components/Lottery"
import Footer from "../components/Footer"

export default function Home() {
    return (
        <div className="bg-red-300 w-full overflow-hidden min-h-screen">
            <div className={`sm:px-16 px-6 flex justify-center items-center`}>
                <div className={`xl:max-w-[1280px] w-full`}>
                    <Header />
                </div>
            </div>
            <div className={`bg-primary sm:px-16 px-6 flex justify-center items-center`}>
                <div className={`xl:max-w-[1280px] w-full`}>
                    <Lottery />
                    <Footer />
                </div>
            </div>
        </div>
    )
}
