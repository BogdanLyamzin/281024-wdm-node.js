import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import AppModal from "../../shared/components/AppModal/AppModal";
import CategoryForm from "../../modules/CategoryForm/CategoryForm";
import CategoriesList from "../../modules/CategoriesList/CatgoriesList";

import useModal from "../../shared/hooks/useModal";

import { getCategoriesApi } from "../../shared/api/categories-api";

import styles from "./CategoryPage.module.css";

const CategoriesPage = () => {
  const [items, setItems] = useState([]);
  const { open, handleToggle } = useModal();

  useEffect(()=> {
    const fetchCategories = async()=> {
      try {
        const data = await getCategoriesApi();
        setItems(data);
      }
      catch(error) {
        console.log(error.response?.data?.message);
      }
    }
    fetchCategories();
  }, []);

  return (
    <Container>
      <div className={styles.title}>
        <h1>Categories Page</h1>
        <Button onClick={handleToggle} variant="outlined">
          Add Category
        </Button>
        <AppModal open={open} onClose={handleToggle}>
          <CategoryForm />
        </AppModal>
      </div>
      <CategoriesList items={items} />
    </Container>
  );
};

export default CategoriesPage;
