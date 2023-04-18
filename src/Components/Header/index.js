import url from './gra-logo.svg';
import {
  Menu,
} from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';

function AppHeader() {
  const navigate = useNavigate();
  const param = useParams();
  const location = useLocation();
  const onMenuClick = (item) => {
    navigate(`/`);
  };
  return (
    <div className="appHeader">
      <div className="applogo" onClick={onMenuClick}><img
        className="logo"
        alt=""
        src={url} /></div>
      <h4>Case Manager</h4>
      <UserName param={param} location={location} />
    </div>
  );
}

function UserName(props) {
  if (props.location.pathname !== '/')
    return <div className="user-profiles"><div><UserOutlined /></div>Shubham Gupta</div>;
  else
    return <div></div>;
}


export default AppHeader;