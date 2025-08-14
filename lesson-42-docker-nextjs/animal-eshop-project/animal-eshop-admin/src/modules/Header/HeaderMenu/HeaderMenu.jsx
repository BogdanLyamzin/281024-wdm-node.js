import { NavLink } from "react-router-dom";

import styles from "./HeaderMenu.module.css";

import headerMenuItems from "./headerMenuItems";

const HeaderMenu = ()=> {
    const elements = headerMenuItems.map(({id, href, text})=> (
        <li key={id}>
            <NavLink to={href} className={styles.link}>{text}</NavLink>
        </li>
    ));

    return <ul className={styles.menu}>{elements}</ul>
}

export default HeaderMenu;