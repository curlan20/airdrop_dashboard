import React, {useEffect} from "react";
import {Button, Row, Col} from "antd";
import {useMoralis} from "react-moralis";

const dirtixContract = "0x1155bfF43e0eB873651d851bc46A22d9CFF9B385";
const myAccount = process.env.REACT_APP_MY_ACCOUNT;
const mySecondary = "0x2C0A43e194e46a50F0f125fdfD404cB4b162dE17";

function Airdrop() {
  const { refetchUserData, user } = useMoralis();

  useEffect(()=> {
    refetchUserData()
  } ,[])

  const handleGiveMe = () => {
    // @ts-ignore
    if (user) {
      user.set('airdropStatus', 'askedFor')
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
          <Col span={4}>
            <Button type={"primary"} onClick={handleGiveMe}>
              Give me 100 Dirtix
            </Button>
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div>
        <Row>
          You are on the waiting list to get 100 Dirtix
        </Row>
      </div>
    );
  }

  return null;
}

export default Airdrop;
