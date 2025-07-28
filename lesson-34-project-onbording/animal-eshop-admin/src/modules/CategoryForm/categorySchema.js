import * as Yup from "yup";

const categorySchema = Yup.object({
    name: Yup.string().trim().required(),
    description: Yup.string().trim().required(),
});

export default categorySchema;