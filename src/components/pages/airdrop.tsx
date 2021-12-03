import React, {useEffect, useState} from "react";
import {Button, Row, Col, Form, Input, Checkbox, Result} from "antd";
import {useMoralis} from "react-moralis";

const dirtixContract = "0x1155bfF43e0eB873651d851bc46A22d9CFF9B385";
const myAccount = process.env.REACT_APP_MY_ACCOUNT;
const mySecondary = "0x2C0A43e194e46a50F0f125fdfD404cB4b162dE17";

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

function Airdrop() {
  const { refetchUserData, user } = useMoralis();
  const [email, setEmail] = useState();
  const [mallorcaClub, setMallorcaClub] = useState(false);

  useEffect(()=> {
    refetchUserData()
  } ,[])

  const handleGiveMe = () => {
    // @ts-ignore
    if (user) {
      user.set('airdropStatus', 'askedFor')
      user.set('notificationEmail', email)
      user.set('mallorcaClub', mallorcaClub)
      user.save().then(user => {
        refetchUserData()
        console.log(user)
      });
    }
  }

  if (user && !user.get('airdropStatus')) {
    console.log(user.get('airdropStatus'))
    return (
      <div>
        <Row>
          <Col span={10} offset={8}>
            <Form {...layout} style={{marginTop: "4rem"}}>
              <Form.Item name="email"
                 rules={[
                   {
                     required: true,
                     message: 'Please input your correct email',
                     type: 'email'
                   }
                 ]}
              >
                <Input placeholder="Email (to receive airdrop notification)" value={email} onChange={(event: any) => setEmail(event.currentTarget.value)}/>
              </Form.Item>
              <Form.Item name="mallorcaClub"
              >
                <Checkbox onChange={() => setMallorcaClub(!mallorcaClub)} checked={mallorcaClub}>
                  I am a member of the Prestigious Mallorca Club
                </Checkbox>
                {/*<Checkbox onChange={(event: any) => setEmail(event.currentTarget.value)}/>*/}
              </Form.Item>
              <Form.Item name="mallorcaClub">
                <Button type={"primary"} onClick={handleGiveMe} disabled={!email}>
                  Give me {mallorcaClub ? 100 : 10} tokens
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div>
        <Row>
          <Col span={24}>
          <Result
            status="success"
            title="Successfully applied for J4IT!!!"
            subTitle="You will receive an email notification once tokens are transferred to your wallet"
          />
          </Col>
        </Row>
      </div>
    );
  }

  return null;
}

export default Airdrop;
