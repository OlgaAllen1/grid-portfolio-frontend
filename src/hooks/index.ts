import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const useAuthState = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if(!currentUser) {
        navigate("/signin");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return user;
};

export default useAuthState;