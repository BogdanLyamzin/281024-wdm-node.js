import { useSelector } from "react-redux";

import { selectAuthUser } from "../../redux/auth/auth-selectors";

const useLogin = ()=> {
    const user = useSelector(selectAuthUser);
    return Boolean(user);
}

export default useLogin;