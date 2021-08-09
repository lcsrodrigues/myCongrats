import React from 'react';
import styles from './styles.module.scss';

export default function Cards({ nome, mensagem }) {
    return (
        <a className={styles.card}>
            <h2>De: {nome}</h2>
            <p>{mensagem}</p>
        </a>
    )
}