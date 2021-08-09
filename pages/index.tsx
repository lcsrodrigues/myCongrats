import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Cards from './components/cards';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {

  const [arrayMsg, setArrayMsg] = useState([]);

  useEffect(() => {
    function getAllMensagens() {
      axios.get("https://webapimydelivery.com.br/_api/comemoracao/recados")
        .then(function (res) {
          setArrayMsg(res.data);
        })
        .catch(function (err) {
          alert(JSON.stringify(err));
        })
    };

    getAllMensagens();

  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Parabéns Rodolpho</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.perfil}>
          <Image src="/perfil-rodolpho.jpg" alt="Rodolpho" width={200} height={200} />
        </div>
        <h1 className={styles.title}>Rodolpho, você tem <strong className={styles.totalMsg}>{arrayMsg.length}</strong> mensagens.</h1>

        <p className={styles.description}>
          Nesse dia tão especial, gostariamos de te parabenizar e deixar uma mensagem <br />e te lembrar de que mesmo distante te amamos e desejamos o seu melhor.
        </p>

        <div className={styles.grid}>
          {
            arrayMsg.length ?
              arrayMsg.map(msg => {
                return (
                  <Cards nome={msg.NOME} mensagem={msg.DESCRICAO} key={msg.id} />
                )
              })
              :
              <h1>Nenhuma mensagem</h1>
          }
        </div>
      </main>
    </div>
  )
}
