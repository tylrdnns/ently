import { useEffect, useState} from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import Account from "components/Account";
import Chains from "components/Chains";
import NFTBalance from "components/NFTBalance";
import NFTTokenIds from "components/NFTTokenIds";
import { Menu, Layout} from "antd";
import SearchCollections from "components/SearchCollections";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import Text from "antd/lib/typography/Text";
import NFTMarketTransactions from "components/NFTMarketTransactions";
import Home from "components/Home";
const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#02bd9b",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 50px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();



  const [inputValue, setInputValue] = useState("explore");

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <Menu
            theme="light"
            mode="horizontal"
            style={{
              display: "flex",
              fontSize: "19px",
              fontWeight: "500",
              marginLeft: "175px",
              width: "100%",
              justifyContent: "center",
            }}
            defaultSelectedKeys={["nftMarket"]}
          >
            <Menu.Item key="About">
              <NavLink to="/About">About</NavLink>
            </Menu.Item>
            <Menu.Item key="nftMarket" onClick={() => setInputValue("explore")} >
              <NavLink to="/Collections">Collections</NavLink>
            </Menu.Item>
            <Menu.Item key="nft">
              <NavLink to="/Profile">Profile</NavLink>
            </Menu.Item>
          </Menu>
          <div style={styles.headerRight}>
            <Chains />
            <Account />
          </div>
        </Header>
        <div style={styles.content}>
          <Switch>
            <Route path="/About">
              <Home />
            </Route>
            <Route path="/Profile">
              <NFTBalance />
            </Route>
            <Route path="/Collections">
              <NFTTokenIds inputValue={inputValue} setInputValue={setInputValue}/>
            </Route>
          </Switch>
          <Redirect to="/Collections" />
        </div>
      </Router>
      <Footer style={{ textAlign: "center", marginTop: "50px" }}>
        <Text style={{ display: "block" }}>
          Brought to you by {" "}
          <a
            href="https://www.ently.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ently
          </a>
        </Text>

        <Text style={{ display: "block" }}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.ently.io/"
          >
            Become a creator with us!
          </a>
        </Text>
        <Text style={{ display: "block" }}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://discord.com/invite/EQHR7NY4sm"
          >
            Discord
          </a>
        </Text>
      </Footer>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    <img src="https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039.png" 
    loading="lazy" 
    sizes="(max-width: 767px) 97px, (max-width: 991px) 10vw, 97px" 
    width="150" 
    srcset="https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039-p-500.png 500w, https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039-p-800.png 800w, https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039-p-1080.png 1080w, https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039-p-1600.png 1600w, https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039-p-2000.png 2000w, https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039-p-2600.png 2600w, https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039-p-3200.png 3200w, https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039.png 6430w" 
    alt="" 
    class="image-2">
    </img>
  </div>
);

export default App;
