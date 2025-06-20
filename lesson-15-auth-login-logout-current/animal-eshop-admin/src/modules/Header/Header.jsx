import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

import styles from "./Header.module.css";

const Header = ()=> {
    return (
        <header className={styles.header}>
            <Link to="/dashboard" className={styles.logo}>Dashboard</Link>
            <div className={styles.userInfo}>
                <p className={styles.userFullName}>Bogdan</p>
                <Button variant="contained">Logout</Button>
            </div>
        </header>
    )
}

export default Header;