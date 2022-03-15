import React, { useState, useEffect } from "react";
import { getNativeByChain } from "helpers/networks";
import { getCollectionsByChain } from "helpers/collections";
import {
  useMoralis,
  useMoralisQuery,
  useNewMoralisObject,
} from "react-moralis";
import { Card, Image, Tooltip, Modal, Badge, Alert, Spin, Carousel, Typography, Button} from "antd";
import { useNFTTokenIds } from "hooks/useNFTTokenIds";
import {
  FileSearchOutlined,
  RightCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { getExplorer } from "helpers/networks";
import { useWeb3ExecuteFunction } from "react-moralis";
import Avatar from "antd/lib/avatar/avatar";
import VideoPlayer from 'react-video-js-player';
import build from "react-video-js-player";

const { Meta } = Card;
const { Text } = Typography;

const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "0 auto",
    maxWidth: "1000px",
    gap: "10px",
  },
  avi: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "0 auto",
    width: "600px",
    //borderRadius: "10px",
    height: "150px",
    marginBottom: "40px",
    paddingBottom: "20px",
    borderBottom: "solid 1px #e3e3e3",
  },
  logo: {
    height: "115px",
    width: "115px",
    borderRadius: "50%",
    // positon: "relative",
    // marginTop: "-80px",
    border: "solid 4px white",
  },
  text: {
    color: "#041836",
    fontSize: "27px",
    fontWeight: "bold",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "0px solid #e7eaf3",
    borderTopRightRadius: "1.75rem",
    borderTopLeftRadius: "1.75rem",
    width: "1000px",
    marginBottom: "50px",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  carousel : {
    height: '200px',
    width: '300px',
    marginLeft: '350px',
    marginBottom: '100px',
    marginTop: '50px',
  },
  bio : {
    display: "flex",
  },
  avatarBio : {
    display: "inline",
  },
  button : {
    height: "40px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "120px",
    borderRadius: "3rem",
    backgroundColor: "#02aebf",
    cursor: "pointer",
    marginTop: "35px",
    position: "center",
    marginLeft: "415px"
  },
  buttonText : {
    color: "#ffffff"
  },
  cardDetails : {
    marginTop: "20px",
  },
  avatar1 : {
    marginLeft: "550px",
    marginRight: "10px",
  },
  dropDown: {
    marginTop: "35px",
    color: "#ffff"
  },
  tooltip: {
    borderRadius: "1.75rem",
  },
};

function NFTTokenIds({ inputValue, setInputValue }) {
  const fallbackImg =
    "data:image/png;base64,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";
  const { NFTTokenIds, totalNFTs, fetchSuccess } = useNFTTokenIds(inputValue);
  const [visible, setVisibility] = useState(false);
  const [nftToBuy, setNftToBuy] = useState(null);
  const [loading, setLoading] = useState(false);
  const contractProcessor = useWeb3ExecuteFunction();
  const { chainId, marketAddress, contractABI, walletAddress } =
    useMoralisDapp();
  const nativeName = getNativeByChain(chainId);
  const contractABIJson = JSON.parse(contractABI);
  const { Moralis } = useMoralis();
  const queryMarketItems = useMoralisQuery("CreateRoyaltyMarketItems");
  const fetchMarketItems = JSON.parse(
    JSON.stringify(queryMarketItems.data, [
      "objectId",
      "createdAt",
      "price",
      "nftContract",
      "itemId",
      "sold",
      "tokenId",
      "seller",
      "owner",
      "confirmed",
    ])
  );

  const [show, setShow] = useState(false);

  const purchaseItemFunction = "createMarketSale";
  const NFTCollections = getCollectionsByChain(chainId);

  async function purchase() {
    setLoading(true);
    const tokenDetails = getMarketItem(nftToBuy);
    const itemID = tokenDetails.itemId;
    const tokenPrice = tokenDetails.price;
    const ops = {
      contractAddress: marketAddress,
      functionName: purchaseItemFunction,
      abi: contractABIJson,
      params: {
        nftContract: nftToBuy.token_address,
        itemId: itemID,
      },
      msgValue: tokenPrice,
    };

    await contractProcessor.fetch({
      params: ops,
      onSuccess: () => {
        console.log("success");
        setLoading(false);
        setVisibility(false);
        updateSoldMarketItem();
        succPurchase();
      },
      onError: (error) => {
        setLoading(false);
        failPurchase();
      },
    });
  }

  const handleBuyClick = (nft) => {
    setNftToBuy(nft);
    console.log(nft.image);
    setVisibility(true);
  };

  function succPurchase() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "Success!",
      content: `You have purchased this NFT`,
    }); 
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function failPurchase() {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: "Error!",
      content: `There was a problem when purchasing this NFT`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  async function updateSoldMarketItem() {
    const id = getMarketItem(nftToBuy).objectId;
    const marketList = Moralis.Object.extend("CreateRoyaltyMarketItems");
    const query = new Moralis.Query(marketList);
    await query.get(id).then((obj) => {
      obj.set("sold", true);
      obj.set("owner", walletAddress);
      obj.save();
    });
  }

  const getMarketItem = (nft) => {
    const result = fetchMarketItems?.find(
      (e) =>
        e.nftContract === nft?.token_address &&
        e.tokenId === nft?.token_id &&
        e.sold === false &&
        e.confirmed === true
    );
    return result;
  };

  return (
    <>
      <div>
        {contractABIJson.noContractDeployed && (
          <>   
            <Alert
              message="No Smart Contract Details Provided. Please deploy smart contract and provide address + ABI in the MoralisDappProvider.js file"
              type="error"
            />
            <div style={{ marginBottom: "10px" }}></div>
          </>
        )}
        {inputValue !== "explore" && totalNFTs !== undefined && (
          <>
            {!fetchSuccess && (
              <>
                <Alert
                  message="Unable to fetch all NFT metadata... We are searching for a solution, please try again later!"
                  type="warning"
                />
                <div style={{ marginBottom: "10px" }}></div>
              </>
            )}
            <div style={styles.avi}>
              <Image
                preview={false}
                src="https://remo-production.s3.amazonaws.com/media/team/TrevorLawrenceJrPROFILE.png.240x240_q90_bw_crop.jpg"//{NFTTokenIds[0]?.image || "error"}
                fallback={fallbackImg}
                alt=""
                style={styles.logo}
              />
              <div style={styles.text}>
                <>
                  <div>{`${NFTTokenIds[0]?.name}`}</div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#9c9c9c",
                      fontWeight: "normal",
                    }}
                  >
                    Collection Size: {`${totalNFTs}`}
                  </div>
                </>
              </div>
            </div>
          </>
        )}

        <div style={styles.NFTs}>
          {inputValue === "explore" &&
            NFTCollections?.map((nft, index) => (
              <Card
                style={styles.card}
                hoverable
                actions={[
                  <Tooltip 
                    title="View Collection">
                    <RightCircleOutlined
                      style={{backgroundColor: "transparent"}}
                      onClick={() => setInputValue(nft?.addrs)}
                    />
                  </Tooltip>,
                ]}
                //need to make a prop for future use
                cover={
                  <Carousel
                    style={styles.carousel}
                    autoplay> 
                    <img 
                      alt="example" 
                      src="https://ipfs.io/ipfs/QmWmN59irR8ugDcjXuUG3b6T5TrsmwWNz4hPhJS6wR4uFh?filename=HIPS1.png" />
                    <img 
                      alt="example" 
                      src="https://ipfs.io/ipfs/QmNMxaxKMsZ3nrKYtFDvu864Hxtpa2YkgngS3DPxHM78qx?filename=HIPS2.png" />
                    <img 
                      alt="example" 
                      src="https://ipfs.io/ipfs/QmUJG3DuZzTxXK9rEMNzi85VkfsCRFSJTaFNh5iPMM7zXM?filename=HIPS3.png" />
                    <img 
                      alt="example" 
                      src="https://ipfs.io/ipfs/QmUAH3UTeLFP8kfK8q827vKyWPbdaodPQ8PfZ62VToGqvd?filename=HIPS4.png" />
                    <img 
                      alt="example" 
                      src="https://ipfs.io/ipfs/QmSVA2rR2snbRk3SLfuLYj2D3Lx17Bg33jQgxuyZzSWVCN?filename=HIPS5.png" />
                    <img 
                      alt="example" 
                      src="https://ipfs.io/ipfs/QmcYhfyJ8tMuLnzvzQRSJ7S8YmZsDCTnsQGQqfE5TF3q6P?filename=HIPS6.png" />
                    <img 
                      alt="example" 
                      src="https://ipfs.io/ipfs/QmdTzCKoYFLPHGyphPkpjash42C4s5vrXy839tJfkXB9Bg?filename=HIPS7.png" />
                  </Carousel>}
              >
                <div style={styles.bio}>
                  <h1 style={{color: "#ffff"}}><b>Hidden in Plain Sight</b></h1>
                  <div style={styles.avatarBio}>
                    <Avatar 
                      style={styles.avatar1}
                      src="https://www.drummerworld.com/drummerworld1/trevorlawrence840.jpg"/>
                    <Text style={{color: "#ffff"}}><b>Trevor Lawrence Jr.</b></Text>
                  </div>
                </div>
                <div style={styles.cardDetails}>
                  <h2 style={{color: "#ffff"}}>About</h2>
                  <h3 style={{color: "#ffff"}}>This first-of-it's kind collection and fundraiser comes on the heels of Trevor Lawrence Jr's historic performance in this year's Super Bowl halftime show. This is your chance to be a patron</h3>
                </div>
                <div style={styles.dropDown}>
                  {show ? 
                    <div>
                      <Meta style={styles.cardDetails} /> Details
                      <ul>Album:
                          <li style={{paddingTop:"10px", paddingBottom:"10px"}}><em>Free Will</em>, by Trevor Lawrence, Jr - Free will is a very important lesson I learned in some of my studies and has guided me in my personal and professional decisions.</li>
                          <li style={{paddingBottom:"10px"}}><em>Modern Vamp</em>, by Trevor Lawrence, Jr - a nod to the future and the hope of what can happen.</li>
                          <li style={{paddingBottom:"10px"}}><em>Good Trouble</em>, by Trevor Lawrence, Jr (ft. Mark Cargill - Inspired by the late John Lewis and the struggles he had to endure in his quest for civil rights. Good Trouble is what happened on Bloody Sunday.</li>
                          <li style={{paddingBottom:"10px"}}><em>Selma</em>, by Trevor Lawrence, Jr (ft. Terrance Martin) - Selma is inspired by what happened for the rest of John Lewis’s life following bloody Sunday.</li>
                          <li style={{paddingBottom:"10px"}}><em>Jesus, The Light of the World</em>, by Trevor Lawrence, Jr - This is a traditional hymn that’s been sung throughout history in the black church and in civil rights marches and rallies. An uplifting song for all people.</li>
                          <li style={{paddingBottom:"10px"}}><em>The Council</em>, by Trevor Lawrence, Jr (ft. Terrance Martin) - inspired by the struggles and many lives lost during the fight for equality and civil rights.</li>
                          <li style={{paddingBottom:"10px"}}><em>This Little Light of Mine</em>, by Trevor Lawrence, Jr - I chose to record this song because it symbolizes each individual’s ability to affect and impact humanity in a positive way.</li>
                      </ul>
                      <ul>Release Date:
                            <li>February 17, 2022</li>
                      </ul>
                      <ul>Genre:
                        <li><em>Jazz (Hidden in Plain Sight is a homage to the late John Lewis and countless other Civil Rights leaders and speaks to the pain and struggles of African Americans in US history)</em></li>
                      </ul>
                    </div>
                  : null}
                  <Button 
                    style={styles.button}
                    onClick={() => setShow(!show)}
                  >
                    {show ? <Text style={styles.buttonText}><b>Show Less</b></Text> : <Text style={styles.buttonText}><b>Learn More</b></Text>}
                  </Button>
                </div>
              </Card>
            ))}

          {inputValue !== "explore" &&
            NFTTokenIds.slice(0, 20).map((nft, index) => (
              <Card
                hoverable
                actions={[
                  <Tooltip title="View On Blockexplorer">
                    <FileSearchOutlined
                      onClick={() =>
                        window.open(
                          `${getExplorer(chainId)}address/${nft.token_address}`,
                          "_blank"
                        )
                      }
                    />
                  </Tooltip>,
                  <Tooltip title="Buy NFT">
                    <ShoppingCartOutlined onClick={() => handleBuyClick(nft)} />
                  </Tooltip>,
                ]}
                style={{ paddingTop: "25px", width: 300, border: "2px solid #e7eaf3", borderTopRightRadius: ".75rem", borderTopLeftRadius: ".75rem" }}
                cover=
                { nft?.image.toString().endsWith("mp4") ?
                  <VideoPlayer
                    preview={false}
                    src={nft.image || "error"}
                    fallback={fallbackImg}
                    alt=""
                    width="300"
                    height="300"
                  /> :
                  <Image
                    preview={false}
                    src={nft.image || "error"}
                    fallback={fallbackImg}
                    alt=""
                    width="300"
                    height="300"
                  />
                }
                key={index}
              >
                {getMarketItem(nft) && (
                  <Badge.Ribbon text="Buy Now" color="green"></Badge.Ribbon>
                )}
                <Meta title={nft.name} description={`#${nft.token_id}`} />
              </Card>
            ))}
        </div>
        {getMarketItem(nftToBuy) ? (
          <Modal
            title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}`}
            visible={visible}
            onCancel={() => setVisibility(false)}
            onOk={() => purchase()}
            okText="Buy"
          >
            <Spin spinning={loading}>
              <div
                style={{
                  width: "250px",
                  margin: "auto",
                }}
              >
                <Badge.Ribbon
                  color="green"
                  text={`${
                    getMarketItem(nftToBuy).price / ("1e" + 18)
                  } ${nativeName}`}
                >
                  <VideoPlayer
                    src={nftToBuy?.image}
                    style={{
                      width: "250px",
                      borderRadius: "10px",
                      marginBottom: "15px",
                    }}
                  />
                </Badge.Ribbon>
              </div>
            </Spin>
          </Modal>
        ) : (
          <Modal
            title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}`}
            visible={visible}
            onCancel={() => setVisibility(false)}
            onOk={() => setVisibility(false)}
          >
          { nftToBuy?.image.toString().endsWith("mp4") ?
            <VideoPlayer
              src={nftToBuy?.image}
              width="300"
              height="300"
            />:
            <Image
              src={nftToBuy?.image}
              width="300"
              height="300"
            />
          }
            <Alert
              message="This NFT is currently not for sale"
              type="warning"
            />
          </Modal>
        )}
      </div>
    </>
  );
}

export default NFTTokenIds;