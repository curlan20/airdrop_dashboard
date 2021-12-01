import React, {useState} from 'react';
import {useMoralis} from 'react-moralis';
import {
  Button,
  Alert,
  Input,
  Space,
  Col,
  Row,
  Typography, Form
} from 'antd';
import RandomGif from "./RandomGif";

const {Title} = Typography;

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

const SignUp = () => {
  const {signup} = useMoralis();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <Form {...layout}>
      <Form.Item name="email" label="Email"
                 rules={[
                   {
                     required: true,
                     message: 'Please input your correct email',
                     type: 'email'
                   }
                 ]}
      >
        <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.currentTarget.value)}/>
      </Form.Item>
      <Form.Item name="password" label="password">
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </Form.Item>
      <div style={{textAlign: "right"}}>
        <Button type="primary" onClick={() => signup(email, password, email)}>Sign up</Button>
      </div>
    </Form>
  );
};

const Login = () => {
  const {login} = useMoralis();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <Form {...layout}>
      <Form.Item name="email" label="Email"
                 rules={[
                   {
                     required: true,
                     message: 'Please input your correct email',
                     type: 'email'
                   }
                 ]}
      >
        <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.currentTarget.value)}/>
      </Form.Item>
      <Form.Item name="password" label="password">
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </Form.Item>
      <div style={{textAlign: "right"}}>
        <Button type="primary" onClick={() => login(email, password)}>Login</Button>
      </div>
    </Form>
  );
};

export const Auth = () => {
  const {authenticate, isAuthenticating, authError} = useMoralis();

  return (
    <div style={{height: "100vh"}}>
      <Row gutter={[40, 0]}>
        <Col span={24}>
          <Title style={{textAlign: 'center'}} level={2}>
            Want some free J4IT tokens?
          </Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div style={{textAlign: 'center'}}>
            <img src={'https://media.giphy.com/media/l0HFkA6omUyjVYqw8/giphy.gif'} />
          </div>
        </Col>
      </Row>
      <Row gutter={[40, 0]}>
        <Col span={24}>
          {authError && (
            <Alert
              type="error"
              message={`Authentication has failed: ` + authError.message}
              closable
            />
          )}
          <div style={{textAlign: "center", paddingTop: '2rem'}}>
            <Button type="primary" isLoading={isAuthenticating} onClick={() => authenticate()}>
              Connect your wallet
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
