import type { NextPage } from 'next'
import Head from 'next/head'
import '../styles/styling.css'

import Game from '../comps/Game'
function Home() {
  return (
    <div>
      <Head>
        <title>Tic-Tac-Toe</title>
      </Head>
      <Game/>
    </div>
  )
}
export default Home