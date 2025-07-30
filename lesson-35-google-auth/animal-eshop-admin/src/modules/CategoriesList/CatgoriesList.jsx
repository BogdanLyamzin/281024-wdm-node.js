import Paper from '@mui/material/Paper';

import styles from "./CategoriesList.module.css";

const mediaUrl = import.meta.env.VITE_MEDIA_URL;

const CategoriesList = ({items = []})=> {
    const elements = items.map(({_id, name, image})=> (
    <Paper key={_id}>
        <img src={`${mediaUrl}/${image}`} alt="" />
        <p>{name}</p>
    </Paper>));

    return <ul>{elements}</ul>
}

export default CategoriesList;