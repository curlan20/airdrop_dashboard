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
    <div>
      <Row gutter={[40, 0]}>
        <Col span={23}>
          <Title style={{textAlign: 'center'}} level={2}>
            Please Fill the User Form
          </Title>
        </Col>
      </Row>

      <Row gutter={[40, 0]}>
        <Col span={18}>
          {authError && (
            <Alert
              type="error"
              message={`Authentication has failed: ` + authError.message}
              closable
            />
          )}
          <div style={{textAlign: "right"}}>
          <Button type="primary" isLoading={isAuthenticating} onClick={() => authenticate()}>
            Authenticate via Metamask
          </Button>
          </div>
          <p>
            <em>or</em>
          </p>
          <SignUp/>
          <p>
            <em>or</em>
          </p>
          <Login/>
        </Col>
      </Row>
    </div>
  );
};
