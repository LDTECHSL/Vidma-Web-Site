import { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {

    const navigate = useNavigate();

    const token = sessionStorage.getItem("vidmaAuthToken") || "";

    useEffect(() => {
        if (!token) {
            navigate("/console/login");
        }
    }, []);

  return (
    <div>
      <h1>Welcome to Vidma Super Console</h1>
    </div>
  );
}
