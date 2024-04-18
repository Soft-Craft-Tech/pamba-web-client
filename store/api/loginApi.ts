import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation } from "react-query";

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return apiCall("POST", endpoints.login, {}, { username, password });
};

export const useLoginMutation = () => {
  return useMutation(login);
};

// const [username, setEmail] = useState('');
// const [password, setPassword] = useState('');

// // Call the useLoginMutation hook to get the mutation function and state
// const [loginMutation, { isLoading, error, data }] = useLoginMutation();

// const handleLogin = async () => {
//   try {
//     // Call the login mutation function with the username and password
//     await loginMutation({ username, password });
//     // Handle successful login (redirect, show success message, etc.)
//   } catch (error) {
//     // Handle login error
//   }
// };
