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

export const Auth = () => {
  const {authenticate, isAuthenticating, authError} = useMoralis();

  return (
    <div style={{height: "100vh", marginTop: "4rem"}}>
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
            <Button type="primary" isLoading={isAuthenticating} onClick={() => authenticate({provider:'walletconnect'})}>
              Connect your wallet
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
