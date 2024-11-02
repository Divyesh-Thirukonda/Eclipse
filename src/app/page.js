import Head from 'next/head';
import GameGrid from './components/GameGrid';

export default function Home() {
  return (
    <>
      <Head>
        <title>Eclipse Puzzle Game</title>
        <meta name="description" content="Solve the Eclipse Puzzle!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center min-h-screen bg-gray-100">
        <GameGrid />
      </main>
    </>
  );
}
