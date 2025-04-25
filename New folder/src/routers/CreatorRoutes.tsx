import WithLayout from "./WithLayout";
import LoggedInLayout from "./LoggedInLayout";
import { Navigate } from "react-router-dom";

const CreatorRoutes = ({ component, withLayout = false }: any) => {
  const checkUserRole = "creator";
  const token = sessionStorage.getItem("token") || "";
  console.log(token, "token");

  const RenderComponent = () => {
    if (token && checkUserRole == "creator") {
      if (withLayout) {
        return <WithLayout Children={component} />;
      }else{
        return <LoggedInLayout  Children={component}/>
      }
    }else{
        return <Navigate to='/'/>
    }
  };
  return RenderComponent();
};

export default CreatorRoutes;
