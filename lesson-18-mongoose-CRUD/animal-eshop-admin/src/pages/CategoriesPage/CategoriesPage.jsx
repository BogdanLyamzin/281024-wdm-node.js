import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import AppModal from "../../shared/components/AppModal/AppModal";
import CategoryForm from "../../modules/CategoryForm/CategoryForm";

import useModal from "../../shared/hooks/useModal";

import styles from "./CategoryPage.module.css";

const CategoriesPage = () => {
  const { open, handleToggle } = useModal();

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
    </Container>
  );
};

export default CategoriesPage;
