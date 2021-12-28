import React, {useState, useEffect} from "react";
import {Row, Col, Table, Typography} from "antd";
import {Moralis} from "moralis";
import {useMoralis, useMoralisWeb3Api} from "react-moralis";
import axios from "axios";

const {Title} = Typography;

function Nfts() {
  const Web3Api = useMoralisWeb3Api();

  const [ownedNfts, setOwnedNfts] = useState();
  const {user} = useMoralis();

  const getImage = async (tokenUri: string) => {
    const response = await axios.get(tokenUri);
    console.log(response.data);
    return response.data;
  }
  useEffect(() => {
    if (user) {
      const ethAddress = user.get('ethAddress');
      const options = {chain: "bsc", address: ethAddress};

      // @ts-ignore
      Web3Api.account.getNFTs(options).then((b: any) => {
        setOwnedNfts(b.result)
      });
    }}
  , [])


  const columns = [
    {
      title: 'NFT name',
      dataIndex: 'nftName',
    },
    {
      title: 'Token Address',
      dataIndex: 'tokenAddress'
    },
    {
      title: 'Token ID',
      dataIndex: 'tokenId'
    },
    {
      title: 'Contract Type',
      dataIndex: 'contractType'
    },
    {
      title: 'Image',
      dataIndex: 'image'
    },
  ];

  let data = [{}];

  if (ownedNfts) {
    console.log('nfts', ownedNfts)
    // @ts-ignore
    data = ownedNfts.map((b: any) => {
      // let imageUrl;
      // getImage(b.token_uri)
      //   .then((r: any) => {
      //     imageUrl = r.result.image.url
      //   });

      // if (imageUrl) {
        return {
          nftName: b.name,
          tokenAddress: b.token_address,
          tokenId: b.token_id,
          contractType: b.contractType,
          // image: imageUrl,
        }
      // }
      // return null;
    });
  }

  return (
    <div>
      <Row gutter={[40, 0]}>
        <Col span={18} xs={24}>
          <Title level={2}>
            Owned nfts
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

export default Nfts;
