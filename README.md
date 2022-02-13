# `Ently Marketplace`

```
Install all dependencies:
```sh
git clone https://github.com/tylrdnns/ently.git
cd ently
yarn install 
```

```
add .env file

REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
REACT_APP_MORALIS_SERVER_URL = https://xxxxxx.grandmoralis.com:2053/server
```

Locate the MoralisDappProvider in `src/providers/MoralisDappProvider/MoralisDappProvider.js` and paste the deployed marketplace smart contract address and ABI
```jsx
const [contractABI, setContractABI] = useState();
const [marketAddress, setMarketAddress] = useState();
```

Sync the `MarketItemCreated` event `/src/contracts/marketplaceBoilerplate.sol` contract with the Moralis Server, making the tableName `MarketItems`
```jsx
event MarketItemCreated (
  uint indexed itemId,
  address indexed nftContract,
  uint256 indexed tokenId,
  address seller,
  address owner,
  uint256 price,
  bool sold
);
```


Run App:
```sh
yarn start
```


