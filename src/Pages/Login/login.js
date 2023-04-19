import React, { useContext, useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../AuthContext';

const Login = () => {
    const { setUsername, setUserImageSrc } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setUsername('');
        setUserImageSrc('');
    },[]);
    const onFinish = (values) => {
        if (values.username === 'asouser' && values.password === 'password') {
            setUsername(values.username);
            setUserImageSrc('https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/106.jpg')
            navigate(`/stage1`, { user: values.username });
        } else if (values.username === 'ciouser' && values.password === 'password') {
            setUsername(values.username);
            setUserImageSrc('https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/420.jpg')
            navigate(`/stage2`, { user: values.username });
        } else if (values.username === 'aouser' && values.password === 'password') {
            setUsername(values.username);
            setUserImageSrc('https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1091.jpg')
            navigate(`/stage3`, { user: values.username });
        } else {

        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='login-container'>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;