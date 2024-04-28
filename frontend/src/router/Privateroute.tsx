import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkAuth, err, loading, selecteduser } from "../store/authslice";
import Loading from "../components/ui/Loading";
import { Link } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  useAppSelector(selecteduser);
  const loadingval = useAppSelector(loading);
  const errorVal = useAppSelector(err);
  useEffect(() => {
    const userDetails = dispatch(checkAuth());

    return () => {
      userDetails;
    };
  }, [dispatch]);

  if (loadingval !== "success") {
    return (
      <div className="w-screen h-screen grid items-center justify-center bg-black">
        <Loading />
      </div>
    );
  } else {
    if (loadingval === "success" && !errorVal) {
      return <div>{children}</div>;
    }
  }
  if (errorVal) {
    return (
      <div className="w-screen h-screen grid items-center justify-center bg-black text-white font-bold text-4xl">
        <span>
          403 Unauthorised please{" "}
          <Link to={"/"} className="underline">
            login
          </Link>{" "}
        </span>
      </div>
    );
  }
};

export default PrivateRoute;
