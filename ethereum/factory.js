import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(CampaignFactory.abi, "0xd4908aC493C2020E4171F3C6dBE378A1656C8aEB");

export default instance;
