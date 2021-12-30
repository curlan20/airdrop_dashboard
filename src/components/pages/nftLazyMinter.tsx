import React, {useState, useEffect} from "react";
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

import { UploadOutlined } from '@ant-design/icons';

import {Moralis} from "moralis";
import {useMoralis, useMoralisWeb3Api} from "react-moralis";
import axios from "axios";

const {Title} = Typography;
const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

function NftLazyMinter() {
  const Web3Api = useMoralisWeb3Api();

  const [nftName, setNftName] = useState();
  const [nftDescription, setNftDescription] = useState();
  const [imageFile, setImageFile] = useState();
  const {user} = useMoralis();

  function handleSubmit() {

  }

  const uploadProps = {
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        setImageFile(info)
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

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
            <Input placeholder="NFT name" value={nftName} onChange={(event: any) => setNftName(event.currentTarget.value)}/>
          </Form.Item>
          <Form.Item name="nft-description"
                     rules={[
                       {
                         required: true,
                         message: 'Please input nft description',
                         type: 'string'
                       }
                     ]}
          >
            <Input placeholder="NFT description" value={nftDescription} onChange={(event: any) => setNftDescription(event.currentTarget.value)}/>
          </Form.Item>

          <Form.Item name="nft-file"
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
