import React, {useState, useEffect} from "react";
import {Row, Col, Table, Typography} from "antd";
import {Moralis} from "moralis";
import {useMoralis} from "react-moralis";

const {Title} = Typography;

function Tokens() {
  const [tokenBalances, setTokenBalances] = useState();
  const {user} = useMoralis();

  useEffect(() => {
    if (user) {
      const ethAddress = user.get('ethAddress');
      const options = {chain: "bsc", address: ethAddress};

      // @ts-ignore
      Moralis.Web3API.account.getTokenBalances(options).then((b: any) => {
          setTokenBalances(b)
        });
    }}
  , [])


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
      return {symbol: b.symbol,
        name: b.name,
        // @ts-ignore
        balance: b.balance / ("1e" + b.decimals),
      }
    });
  }

  return (
    <div>
      <Row gutter={[40, 0]}>
        <Col span={18} xs={24}>
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
