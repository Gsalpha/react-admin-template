import React, { memo } from 'react'
import style from './logo.module.scss'
import logo from './logo.svg'
const Logo = () => (
    <section className={style.logo}>
        <img src={logo} alt={process.env.REACT_APP_TITLE} width={50} />
        <h1>{process.env.REACT_APP_TITLE}</h1>
    </section>
)
export default memo(Logo)
