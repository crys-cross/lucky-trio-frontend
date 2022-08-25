import Head from "next/head"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>Lucky Trio Lottery</title>
                <meta name="description" content="Decentralized Lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider moralisAuth={false}>
                <NotificationProvider>
                    <Header />
                    <Component {...pageProps} />
                </NotificationProvider>
            </MoralisProvider>
        </div>
    )
}

export default MyApp
