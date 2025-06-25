import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import categorySchema from "./categorySchema";

const CategoryForm = ({submitForm})=> {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(categorySchema),
      });

      const onSubmit = (values) => {
        submitForm(values);
        reset();
      };

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
            
        </form>
      )
}

export default CategoryForm;