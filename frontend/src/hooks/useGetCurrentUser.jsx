import { useEffect } from "react";
import axios from "axios";
function useGetCurrentUser() {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
        "http://localhost:8000/api/auth/user/current",
        {
          withCredential: true,
        },
      );
      console.log(result);
      } catch (error) {
       console.log(error);
      }
    };
    fetchUser();
  },[
    // dependency list for use effect

  ]);
}

export default useGetCurrentUser;
