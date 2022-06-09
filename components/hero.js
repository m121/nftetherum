import {React,useEffect,useState} from "react";
import myEpicNft from "../utils/MyEpicNFT.json";
import { ethers } from "ethers";


export default function Hero(){

  /*
  * Just a state variable we use to store our user's public wallet. Don't forget to import useState.
  */
  const [currentAccount, setCurrentAccount] = useState("");

  // Constants
const TWITTER_HANDLE = 'mateopps';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = 'mateopps';
const TOTAL_MINT_COUNT = 50;

const checkIfWalletIsConnected = async () => {
  const { ethereum } = window;

  if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
  } else {
      console.log("We have the ethereum object", ethereum);
  }

  /*
  * Check if we're authorized to access the user's wallet
  */
  const accounts = await ethereum.request({ method: 'eth_accounts' });

  /*
  * User can have multiple authorized accounts, we grab the first one if its there!
  */
  if (accounts.length !== 0) {
    const account = accounts[0];
    console.log("Found an authorized account:", account);
    setCurrentAccount(account);
  } else {
    console.log("No authorized account found");
  }
}

/*
  * Implement your connectWallet method here
  */
const connectWallet = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }

    /*
    * Fancy method to request access to account.
    */
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    /*
    * Boom! This should print out public address once we authorize Metamask.
    */
    console.log("Connected", accounts[0]);
    setCurrentAccount(accounts[0]); 
  } catch (error) {
    console.log(error);
  }
}

const askContractToMintNft = async () => {
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

      console.log("Going to pop wallet now to pay gas...")
      let nftTxn = await connectedContract.makeAnEpicNFT();

      console.log("Mining...please wait.")
      await nftTxn.wait();
      
      console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  checkIfWalletIsConnected();
}, [])
  // Render Methods
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

    return ( <div className="App h-screen bg-gray-900">
    <div className="container flex">
      <div className="header-container mx-auto">
        <p className="header gradient-text ">My NFT Cyberpunk dogs Collection</p>
        <p className="sub-text">
          Each unique. Each beautiful. Discover your NFT today.
        </p>
        <div className="flex flex-col">

        
        {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) : (
            <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
              Mint NFT
            </button>
          )}
          <a href="https://testnets.opensea.io/collection/squarenft-dqbhuvhzco" target="_blank" rel="noreferrer" className="btn bg-cyan-500 px-4 py-2 mt-8 text-center text-lg font-semibold">See the collection on OpenSEA</a>
          </div>
      </div>
      <div className="footer-container">
        <img alt="Twitter Logo" className="twitter-logo" src='/twitter-logo.svg' />
        <a
          className="footer-text"
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
        >{`built on @${TWITTER_HANDLE}`}</a>
      </div>
    </div>
  </div>)
}