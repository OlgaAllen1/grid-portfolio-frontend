import { getAuth } from "firebase/auth";

export const getAuthToken = async () => {
	const auth = getAuth();
	const user = auth.currentUser;
	if (user) {
	  return await user.getIdToken();
	} else {
	  throw new Error("User not authenticated");
	}
  };