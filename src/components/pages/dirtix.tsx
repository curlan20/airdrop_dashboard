import React from "react";
import {Button, Row, Col} from "antd";
import {Moralis} from "moralis";
import dirtixABI from "../../data/dirtixABI";

const dirtixContract = "0x1155bfF43e0eB873651d851bc46A22d9CFF9B385";
const myAccount = process.env.REACT_APP_MY_ACCOUNT;
const mySecondary = "0x2C0A43e194e46a50F0f125fdfD404cB4b162dE17";

function Dirtix() {
  const handleBurn = async () => {
    try {
      const options = {
        chain: "bsc",
        address: dirtixContract,
        function_name: "burn",
        abi: dirtixABI,
        params: {amount: "10"}
      };
      // @ts-ignore
      const burnt = await Moralis.Web3API.native.runContractFunction(options);
      console.log(burnt);
    } catch (e) {
      console.log(e);
    }
  }

  const handleAllowance = async () => {
    try {
      const options = {
        chain: "bsc",
        address: dirtixContract,
        function_name: "allowance",
        abi: dirtixABI,
        params: {owner: myAccount, spender: mySecondary}
      };
      // @ts-ignore
      const burnt = await Moralis.Web3API.native.runContractFunction(options);
      console.log(burnt);
    } catch (e) {
      console.log(e);
    }
  }
  const handleGetEvents = async () => {
    const options = {
      chain: "bsc",
      address: dirtixContract,
      function_name: "burn",
      abi: dirtixABI,
      params: {amount: "10"}
    };
    // @ts-ignore
    const events = await Moralis.Web3API.native.runContractEvents(options);
    console.log(events);
  }

  const handleGetDateToBlock = async () => {
    try {
      const options = {
        chain: "bsc",
        date: Date.now() - 10000
      };
      // @ts-ignore
      const block = await Moralis.Web3API.native.getDateToBlock(options);
      console.log(block);
    } catch (error) {
      console.log(error);
    }
  }

  const handleTransactions = async () => {
    try {
      const options = {chain: "bsc", address: myAccount, order: "asc", from_block: "0"};

      // @ts-ignore
      const result = await Moralis.Web3API.account.getTransactions(options);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleNativeBalance = async () => {
    try {
      const options = {chain: "bsc", address: myAccount};

      // @ts-ignore
      const result = await Moralis.Web3API.account.getNativeBalance(options);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleTokenBalances = async () => {
    try {
      const options = {chain: "bsc", address: myAccount};

      // @ts-ignore
      const result = await Moralis.Web3API.account.getTokenBalances(options);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleTokenMetadata = async () => {
    try {
      const options = {chain: "bsc", symbols: ["drx", "cake"]};

      // @ts-ignore
      const result = await Moralis.Web3API.token.getTokenMetadataBySymbol(options);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleTokenPrice = async () => {
    try {
      //Get token price on PancakeSwap v2 BSC
      const options = {
        //probably it's cake address
        address: "0x1f02b3d9de63499e676c27c967d6b2b6f95bbecd",
        chain: "bsc",
        exchange: "PancakeSwapv2"
      };
      // @ts-ignore
      const result = await Moralis.Web3API.token.getTokenPrice(options);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Row>
        <Col span={2}>Native</Col>
        <Col span={4}>
          <Button type={"primary"} onClick={handleGetDateToBlock}>
            Current block
          </Button>
        </Col>
        <Col span={4}>
          <Button type={"primary"} onClick={handleGetEvents}>
            Events
          </Button>
        </Col>
        <Col span={4}>
          <Button type={"primary"} onClick={handleAllowance}>
            Allowance
          </Button>
        </Col>
        <Col span={4}>
          <Button type={"primary"} danger onClick={handleBurn}>
            Burn 10 drx
          </Button>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col span={2}>Moralis Account</Col>
        <Col span={4}>
          <Button type={"primary"} onClick={handleTransactions}>
            Transactions
          </Button>
        </Col>
        <Col span={4}>
          <Button type={"primary"} onClick={handleNativeBalance}>
            Native Balance
          </Button>
        </Col>
        <Col span={4}>
          <Button type={"primary"} danger onClick={handleTokenBalances}>
            Token balances
          </Button>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col span={2}>Moralis</Col>
        <Col span={4}>
          <Button type={"primary"} onClick={handleTokenMetadata}>
            Token metadata
          </Button>
        </Col>
        <Col span={4}>
          <Button type={"primary"} onClick={handleTokenPrice}>
            Token Price
          </Button>
        </Col>
      </Row>

    </div>
  );
}

export default Dirtix;
