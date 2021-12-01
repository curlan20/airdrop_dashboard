import React, {useState, useEffect} from "react";
import {Row, Col, Table, Typography} from "antd";
import {Moralis} from "moralis";

const {Title} = Typography;

const myAccount = process.env.REACT_APP_MY_ACCOUNT;

function Tokens() {
  const [tokenBalances, setTokenBalances] = useState();

  useEffect(() => {
    const options = {chain: "bsc", address: myAccount};
    // @ts-ignore
    Moralis.Web3API.account.getTokenBalances(options)
      .then((b: any) => {
        setTokenBalances(b)
      })
  }, [])


  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Balance',
      dataIndex: 'balance'
    },
  ];

  let data = [{}];

  if (tokenBalances) {
    // @ts-ignore
    data = tokenBalances.map((b: any) => {
      return {
        symbol: b.symbol,
        name: b.name,
        balance: b.balance,
      }
    });
  }

  return (
    <div>
      <Row gutter={[40, 0]}>
        <Col span={18}>
          <Title level={2}>
            Tokens List
          </Title>
        </Col>
      </Row>
      <Row gutter={[40, 0]}>
        <Col span={24}>
          <Table columns={columns} dataSource={data}/>
        </Col>
      </Row>
    </div>
  );
}

export default Tokens;
