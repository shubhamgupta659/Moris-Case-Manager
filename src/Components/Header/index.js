import url from './gra-logo.svg';
import {
  Menu,
} from "antd";
import { useNavigate,useParams,useLocation  } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';

function AppHeader() {
  const navigate = useNavigate();
  const param = useParams();
  const location = useLocation();
  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };
  return (
    <div className="appHeader">
      <Menu
        className="appMenu"
        onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: <img
              className="logo"
              alt=""
              src={url} />,
            key: "",
          },
        ]}
      />
      <h4>Case Manager</h4>
      <UserName param={param} location={location} />
    </div>
  );
}

function UserName(props) {
  if (props.location.pathname !=='/')
    return <div className="user-profiles"><div><UserOutlined /></div>Shubham Gupta</div>;
  else
    return <div></div>;
}


export default AppHeader;