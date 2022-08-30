import Head from "next/head"
import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "@web3uikit/web3"

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>Lucky Trio Lottery</title>
                <meta name="description" content="Decentralized Lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <NotificationProvider>
                    <Component {...pageProps} />
                </NotificationProvider>
            </MoralisProvider>
        </div>
    )
}

export default MyApp
