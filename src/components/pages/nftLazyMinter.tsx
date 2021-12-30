import React, {useState} from "react";
import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  Upload,
  Button,
  message
} from "antd";

import {UploadOutlined} from '@ant-design/icons';

import {Moralis} from "moralis";
import {useMoralis} from "react-moralis";

const {Title} = Typography;
const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

function NftLazyMinter() {
  const [nftName, setNftName] = useState();
  const [nftDescription, setNftDescription] = useState();
  const [imageData, setImageData] = useState();
  const [mintedResult, setMintedResult] = useState();
  const {user} = useMoralis();
  // @ts-ignore
  Moralis.enableWeb3()

  async function handleSubmit() {
    if (imageData) {
      // @ts-ignore
      const imageFile = new Moralis.File(imageData.name, imageData)
      await imageFile.saveIPFS();
      // @ts-ignore
      let imageHash = imageFile.hash();

      let metadata = {
        name: nftName,
        description: nftDescription,
        image: "/ipfs/" + imageHash
      }
      console.log(metadata);
      const jsonFile = new Moralis.File("metadata.json", {base64: btoa(JSON.stringify(metadata))});
      await jsonFile.saveIPFS();

      // @ts-ignore
      let metadataHash = jsonFile.hash();
      // @ts-ignore
      console.log(jsonFile.ipfs())
      let res = await Moralis.Plugins.rarible.lazyMint({
        chain: 'rinkeby',
        // @ts-ignore
        userAddress: user.get('ethAddress'),
        tokenType: 'ERC721',
        tokenUri: 'ipfs://' + metadataHash,
        royaltiesAmount: 5, // 0.05% royalty. Optional
      })
      console.log(res);
      setMintedResult(res.data.result);
    } else {
      return null
    }
  }

  function handleUpload(file: any, fileList: any) {
    console.log("file: ", file);
    setImageData(file);
  }

  function dummyRequest(params: any) {
    const {file, onSuccess} = params;
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  if (mintedResult) {
    // @ts-ignore
    console.log(`https://rinkeby.rarible.com/token/${mintedResult.tokenAddress}:${mintedResult.tokenId}`)

    return (
      <h2>NFT minted -
        <a
          // @ts-ignore
          href={ `https://rinkeby.rarible.com/token/${mintedResult.tokenAddress}:${mintedResult.tokenId}` }
        >{" "} View NFT</a>
      </h2>
    )
  }

  return (
    <Row>
      <Col span={10} xs={24}>
        <Form {...layout} style={{marginTop: "2rem"}}>
          <Form.Item name="nft-name"
                     rules={[
                       {
                         required: true,
                         message: 'Please input nft name',
                         type: 'string'
                       }
                     ]}
          >
            <Input placeholder="NFT name" value={nftName}
                   onChange={(event: any) => setNftName(event.currentTarget.value)}/>
          </Form.Item>
          <Form.Item
            name="nft-description"
            rules={[
              {
                required: true,
                message: 'Please input nft description',
                type: 'string'
              }
            ]}
          >
            <Input placeholder="NFT description" value={nftDescription}
                   onChange={(event: any) => setNftDescription(event.currentTarget.value)}/>
          </Form.Item>

          <Form.Item name="nft-file"
          >
            <Upload
              beforeUpload={handleUpload}
              customRequest={dummyRequest}
              maxCount={1}
            >
              <Button icon={<UploadOutlined/>}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type={"primary"} onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>


  )
}

export default NftLazyMinter;
