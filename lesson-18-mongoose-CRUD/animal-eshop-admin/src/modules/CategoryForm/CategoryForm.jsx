import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import categorySchema from "./categorySchema";

const CategoryForm = ({ submitForm }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    for(const name in values){
        if(name === "image") {
            formData.append(name, values[name][0]);
            continue;
        }
        formData.append(name, values[name]);
    }
    submitForm(formData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={errors.name}
        helperText={errors.name?.message}
        {...register("name")}
        label="Category name"
        variant="filled"
        fullWidth
        sx={{ marginBottom: "15px" }}
      />
      <TextField
        error={errors.description}
        helperText={errors.description?.message}
        {...register("description")}
        label="Category description"
        variant="filled"
        fullWidth
        multiline
        rows={2}
        sx={{ marginBottom: "15px" }}
      />
     <input type="file" {...register("image")} />
     <Button
        type="submit"
        fullWidth
        variant="contained"
        loadingPosition="start"
      >
        Add category
      </Button>
    </form>
  );
};

export default CategoryForm;
