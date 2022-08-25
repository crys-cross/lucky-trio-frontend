import Image from "next/image"
import styles from "../styles/Home.module.css"
import Lottery from "../components/Lottery"
import Footer from "../components/Footer"

export default function Home() {
    return (
        <div className={styles.container}>
            <Lottery />
            <Footer />
        </div>
    )
}
