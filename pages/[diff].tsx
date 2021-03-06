import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'
import code_styles from '../styles/Code.module.css'
import { useEffect } from 'react'

import CodeEditor from '../components/Editor'

const CodePage: NextPage = () => {

    const router = useRouter();
    var { diff } = router.query;

    var unique_diff = (data: any) => { return data };

    useEffect(() => {

    }, [diff])

    return (
        <div className={styles.container}>
            <Head>
                <title>MoonCoder</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div>
                    <p className={styles.description}>
                        Resolva algoritmos no nível{' '}
                        <code className={styles.code}>{diff}</code>
                    </p>
                    
                    <CodeEditor difficulty={unique_diff(diff)} />
                </div>
            </main>
        </div>
    )
}

export default CodePage
