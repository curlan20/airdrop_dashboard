import React, {useEffect, useState} from 'react';
import {Table, Row, Col, Button, Typography} from 'antd';
import {useHistory} from 'react-router';
import {useMoralis } from "react-moralis";

const {Title} = Typography;

const Users = () => {
  const { Moralis } = useMoralis();
  const history = useHistory();
  const [allData, setAllData] = useState([]);
  // const User = Moralis.Object.extend("User");

  useEffect(() => {
    Moralis.Cloud.run("loadUsers").then((data: any) => {
      console.log(data)
      setAllData(data.results)
    });
  }, []);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Accounts',
      dataIndex: 'accounts'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt'
    },
    {
      title: 'Airdrop',
      dataIndex: 'airdropStatus'
    },
  ];

  const data = [{}];

  allData.map((user: any) => {
    const { username, email, createdAt, airdropStatus, accounts } = user.attributes;
    data.push({
      key: user.id,
      id: user.id,
      username: username,
      email: email,
      createdAt: createdAt,
      airdropStatus: airdropStatus,
      accounts: accounts?.join(', ')
    })
    return data;
  });

  return (
    <div>
      <Row gutter={[40, 0]}>
        <Col span={18}>
          <Title level={2}>
            User List
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

export default Users;
