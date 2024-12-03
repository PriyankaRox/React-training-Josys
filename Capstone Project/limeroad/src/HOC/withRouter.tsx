import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

//class component remains reusable with navigation props injected dynamically here
export const withRouter = (Component: any) => {
  return (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    return (
      <Component
        {...props}
        navigate={navigate}
        location={location}
        params={params}
      />
    );
  };
};
