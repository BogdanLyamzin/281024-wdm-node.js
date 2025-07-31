import styles from "./Error.module.css";

const Error = ({children}) => {
    return <p className={styles.error}>{children}</p>
}

export default Error;