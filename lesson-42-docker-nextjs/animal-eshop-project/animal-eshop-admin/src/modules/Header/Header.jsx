import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

import HeaderMenu from "./HeaderMenu/HeaderMenu";

import { selectAuthUser } from "../../redux/auth/auth-selectors";

import { logout } from "../../redux/auth/auth-thunks";

import styles from "./Header.module.css";

const Header = ()=> {
    const user = useSelector(selectAuthUser);
    const dispatch = useDispatch();

    const onLogout = ()=> dispatch(logout());

    if(!user) return null;

    return (
        <header className={styles.header}>
            <Link to="/dashboard" className={styles.logo}>Dashboard</Link>
            <HeaderMenu />
            <div className={styles.userInfo}>
                <p className={styles.userFullName}>{user.fullName}</p>
                <Button onClick={onLogout} variant="contained">Logout</Button>
            </div>
        </header>
    )
}

export default Header;