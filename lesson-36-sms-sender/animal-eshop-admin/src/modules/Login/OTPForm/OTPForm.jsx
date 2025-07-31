import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";

import styles from "./OTPForm.module.css";

const OTPForm = ({ submitForm, loading }) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (values) => {
    submitForm(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <input {...register("1")} maxLength={1} type="text" className={styles.field} />
        <input {...register("2")} maxLength={1} type="text" className={styles.field} />
        <input {...register("3")} maxLength={1} type="text" className={styles.field} />
        <input {...register("4")} maxLength={1} type="text" className={styles.field} />
        <input {...register("5")} maxLength={1} type="text" className={styles.field} />
        <input {...register("6")} maxLength={1} type="text" className={styles.field} />
      </div>
      <Button
        loading={loading}
        type="submit"
        fullWidth
        variant="contained"
        loadingPosition="start"
      >
        Login
      </Button>
    </form>
  );
};

export default OTPForm;
