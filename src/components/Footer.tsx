import React from 'react';
import style from '../Styles/styles.scss'

export const Footer = () => {
  return(
    <footer>
      <ul className={style.git_list}>
        <li><a href="https://github.com/rybakouvlad">rybakouvlad</a></li>
        <li><a href="https://github.com/TanyaNovik">TanyaNovik</a></li>
      </ul>
      <span className="year">2021</span>
      <a href="https://rs.school/js/">
        <div className={style.rs_logo}></div>
      </a>
    </footer>
  )
}