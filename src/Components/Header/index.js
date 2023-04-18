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
    <div>
      <div class="sgds-masthead">
          <a href="https://www.gov.sg" target="_blank" rel="noopener">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="sg-crest">
              <title>sg-crest</title>
              <path d="M5.896 11.185c0 0-0.949 1.341 0.294 3.075 0 0 0.196-0.883 2.159-0.883h2.356c2.225 0 3.893-2.126 2.846-4.319 0 0 1.57 0.164 2.095-0.818 0.523-0.981-0.033-1.374-0.818-1.374h-3.959c0 0.704-1.341 0.802-1.341 0h-2.225c0 0-1.669 0-1.701 1.407 0 0 0.377-0.229 0.752-0.261v0.375c0 0-0.458 0.082-0.671 0.197-0.212 0.114-0.523 0.425-0.228 1.227 0.294 0.801 0.409 1.079 0.409 1.079s0.475-0.41 1.244-0.41h0.9c1.602 0 1.308 1.554-0.295 1.554s-1.815-0.85-1.815-0.85z"></path>
              <path d="M14.255 9.566c0 0 0.54 0.033 0.932-0.31 0 0 3.55 2.765-1.717 8.326-5.268 5.562-1.195 9.162-1.195 9.162s-0.948 0.915-0.409 2.699c0 0-2.191-1.237-3.867-3.338-2.422-3.036-3.902-7.681 2.749-11.386 0 0 4.389-2.208 3.506-5.153z"></path>
              <path d="M8.829 6.343c0 0 0.709-1.265 2.355-1.265 1.298 0 1.594-0.666 1.594-0.666s0.566-1.079 3.424-1.079c2.619 0 4.384 0.873 5.812 2.039 0 0-3.85-2.388-7.645 0.971h-5.54z"></path>
              <path d="M24.839 14.348c-0.109-3.948-3.163-8.179-9.728-7.939 6.413-5.431 17.537 6.695 8.375 13.066 0 0 1.533-2.186 1.353-5.126z"></path>
              <path d="M16.093 6.845c8.005-0.24 10.863 9.357 5.693 13.676l-5.191 2.509c0 0-0.676-2.181 1.833-4.734 2.509-2.551 4.929-7.328-2.006-10.469 0 0 0.131-0.654-0.327-0.981z"></path>
              <path d="M15.678 9.004c0 0 0.393-0.371 0.524-0.676 5.954 2.486 5.017 6.697 1.461 10.23-2.181 2.246-1.505 4.668-1.505 4.668s-2.66 1.657-3.577 3.097c0 0-3.852-3.28 1.483-8.724 5.235-5.344 1.614-8.594 1.614-8.594z"></path>
            </svg>
            <span class="is-text">A Singapore Government Agency Website</span>
          </a>
      </div>
      <div className="appHeader">
        <div className="applogo" onClick={onMenuClick}><img
          className="logo"
          alt=""
          src={url} /></div>
        <h4>Case Manager</h4>
        <UserName param={param} location={location} />
      </div>
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