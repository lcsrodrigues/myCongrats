import Head from 'next/head'
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import router from 'next/router';

export default function AddCongrats() {

    const [nome, setNome] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [maxCaracteres, setMaxCaracteres] = useState(200);

    const saveMessage = () => {
        var valid = false;

        if (nome.length == 0 || mensagem.length == 0) {
            valid = false;
            alert("Os campos não podem ficar em branco.")
        } else {
            valid = true;
        }

        if (valid) {
            const data = {
                NOME: nome,
                DESCRICAO: mensagem
            }
            const aux = confirm("Revise com atenção sua mensagem, você não poderá editá-la posteriormente.")
            if (aux) {
                axios.post("https://webapimydelivery.com.br/_api/comemoracao/recado", data)
                    .then(function (res) {
                        router.push("/");
                    })
                    .catch(function (err) {
                        alert(JSON.stringify(err));
                    })
            }
        }
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.msgTitle}>
                    Dia 11/08 é aniversário do nosso amigo Rodolpho. Deixe uma mensagem para ele!
                </h1>
                <h1 className={styles.msgTitle}>Digite seu nome</h1>
                <input type="text" onBlur={(e) => { setNome(e.target.value) }} />
                <h1 className={styles.msgTitle}>Digite sua mensagem</h1>
                <span className={styles.obs}>OBS: Apenas texto! :D</span>
                <textarea
                    maxLength={200}
                    onBlur={(e) => { setMensagem(e.target.value) }}
                    onChange={(e) => { setMaxCaracteres(200 - e.target.value.length) }}
                >
                </textarea>
                <span>Limite de caracteres <strong>{maxCaracteres}</strong></span>
                <div className={styles.btnSalvar} onClick={saveMessage}>Salvar</div>
            </main>
        </div>
    )
}