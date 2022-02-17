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
import "antd/dist/antd.css";
import "./style.css";
import Text from "antd/lib/typography/Text";
import Home from "components/Home";
const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#02bd9b",
    paddingTop: "130px",
    padding: "10px",
    backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, .5), rgba(0, 0, 0, 1)), url(" + "https://westwaterarts.com/wp-content/uploads/2015/09/TheEternalStruggle_grid13_1764x1218.jpg" + ")",
    //backgroundSize: "cover",
    //backgroundRepeat: 'no-repeat' 
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#000000",
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
  menuItem : {
    color: "#FFFFFF"
  }
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
            mode="horizontal"
            style={{
              display: "flex",
              fontSize: "18px",
              fontWeight: "300",
              marginLeft: "175px",
              width: "25%",
              justifyContent: "center",
              background: "transparent",
            }}
            defaultSelectedKeys={["nftMarket"]}
          >
            <Menu.Item key="About">
              <NavLink to="/About" style={styles.menuItem}>About</NavLink>
            </Menu.Item>
            <Menu.Item key="nftMarket" onClick={() => setInputValue("explore")} >
              <NavLink to="/Collections" style={styles.menuItem}>Collections</NavLink>
            </Menu.Item>
            <Menu.Item key="nft">
              <NavLink to="/Profile" style={styles.menuItem}>Profile</NavLink>
            </Menu.Item>
          </Menu>
          <div style={styles.headerRight}>
            <Chains />
            <Account />
          </div>
        </Header>
        <div style={styles.content}>
          <div style={{marginTop:"100px"}}>
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
        </div>
      </Router>
      <Footer style={{textAlign: "center", paddingTop: "100px", paddingBottom: "200px", background: "#000000"}}>
        <div style={{marginLeft: "44%", justifyContent:"center"}}>
          <div style={{gap: "25px", display:"flex", marginLeft:"30px"}}>
            <a href="https://discord.com/invite/EQHR7NY4sm">
              <img 
                src="https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/620459ae439d8c666f665574_cib_discord.svg" loading="lazy" alt="" class="image-20"/>
            </a>
            <a href="https://twitter.com/entlyNFT">
              <img 
                src="https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/620459aefb53574a9c572e3a_feather_twitter.svg" loading="lazy" alt=""/>
            </a>
          </div>
          <a href="https://www.ently.io/">
            <img 
              style={{marginTop: "20px"}}
              src="https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039.png" 
              loading="lazy" 
              sizes="(max-width: 767px) 97px, (max-width: 991px) 10vw, 97px" 
              width="150" 
              srcset="https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039-p-500.png 500w, https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039-p-800.png 800w, https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039-p-1080.png 1080w, https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039-p-1600.png 1600w, https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039-p-2000.png 2000w, https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039-p-2600.png 2600w, https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039-p-3200.png 3200w, https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039.png 6430w" 
            />
          </a>
        </div>
      </Footer>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    <img 
      src="https://uploads-ssl.webflow.com/61afaeeac657f2838b308c38/61afb342a9679780d7dfaf3c_Group%2039.png" 
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