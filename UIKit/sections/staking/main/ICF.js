import { Container, Box, Button, Heading, Grid, Text, Flex } from "theme-ui";
import { useState } from "react";
import Buy from "../sub/BuyInput";
import useTokenBalance from "../../../../Web3Hooks/ERC20/useTokenBalance";
import { useWeb3React } from "@web3-react/core";
import { parseBalance } from "../../../../Util/util";
import useStakeActionData from "../../../../Web3Hooks/Staking/useStakeActionData";
import useContract from "../../../../Web3Hooks/useContract";
import ABI from "../../../../artifacts/contracts/SHRFStaking.sol/Staking.json";
import tokenABI from "../../../../artifacts/contracts/SheerCoin.sol/Sheer.json";
import { ethers } from "ethers";
// ** Third Party Components
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Presale = ({ saleData }) => {
  const { account } = useWeb3React();
  const contract = useContract(process.env.NEXT_PUBLIC_STAKING, ABI.abi, true)
  const tokenContract = useContract(process.env.NEXT_PUBLIC_DEPLOYED_TOKEN, tokenABI.abi, true)
  const data = useStakeActionData(account);
  const [userInput, setUserInput] = useState(1000);
  const [spin, setSpin] = useState(false);
  console.log(data)
  const features = [
    {
      title: saleData.totalReward + " BNB",
      text: "Total Rewards",
    },
    {
      title: saleData.cumWithdraws + " BNB",
      text: "Rewards Withdrawn",
    },
    {
      title: saleData.numAddresses,
      text: "Number of Stakeholders",
    },
  ]

  const balance = useTokenBalance(account);

  const handleSuccess = () => {
    return MySwal.fire({
      title: "Purchase Successful! 🎉",
      text: "Thank You For you patronage, Claim tokens after ICO",
      icon: "success",
      customClass: {
        confirmButton: "SweatBtn",
      },
      buttonsStyling: false,
    });
  };

  const handleFailure = (msg) => {
    return MySwal.fire({
      title: "Failed",
      text: msg,
      icon: "error",
      customClass: {
        confirmButton: "SweatBtn",
      },
      buttonsStyling: false,
    });
  };

  function handleClick() {
    setSpin(true)
    if (!account) {
      handleFailure("Connect Wallet")
      setSpin(false)
      return;
    }
    if (userInput > balance.tokens) {
      handleFailure(balance.tokens + " Insufficient SHRF Balance")
      setSpin(false)
      return;
    }
    if (userInput <= 0) {
      handleFailure("Invalid amount")
      setSpin(false)
      return;
    }

    tokenContract.increaseAllowance(process.env.NEXT_PUBLIC_STAKING, ethers.utils.parseUnits((userInput).toString(), "ether"))
      .then(function (result) {
        console.log(result)
        result.wait().then(function () {
          contract.stake(ethers.utils.parseUnits(userInput.toString(), "ether"))
            .then(function () {
              handleSuccess('Staking Successful')
              setSpin(false)
            }).catch(function (error) {
              setSpin(false)
              if (error.data) {
                handleFailure("Error message " + error.data.message);

              } else {
                handleFailure("Error message " + error.reason);
              }

            });
        })
          .catch(function (error) {
            setSpin(false)
            if (error.data) {
              handleFailure("Error message " + error.data.message);

            } else {
              handleFailure("Error message " + error.reason);
            }

          })

      }).catch(function (error) {
        setSpin(false)
        if (error.data) {
          handleFailure("Error message " + error.data.message);

        } else {
          handleFailure("Error message " + error.reason);
        }

      });


    //contract.claimTokens()
  }
  function handleClaim() {
    setSpin(true)
    if (!account) {
      handleFailure("Connect Wallet")
      setSpin(false)
      return;
    }

    contract.withdrawReward(data.rawEarn)
      .then(function (result) {
        handleSuccess('Withdrawal Successful, Check You wallet')
        setSpin(false)
      }).catch(function (error) {
        setSpin(false)
        if (error.data) {
          handleFailure("Error message " + error.data.message);

        } else {
          handleFailure("Error message " + error.reason);
        }

      });
    //contract.claimTokens()
  }
  function handleUnstake() {
    setSpin(true)
    if (!account) {
      handleFailure("Connect Wallet")
      setSpin(false)
      return;
    }
    if (data.stakeAmt > 0) {
      handleFailure("You do not have any stakes")
      setSpin(false)
      return;
    }

    contract.stake(data.rawStakeAmt)
      .then(function (result) {
        handleSuccess('Staking Successful')
        setSpin(false)
      }).catch(function (error) {
        setSpin(false)
        if (error.data) {
          handleFailure("Error message " + error.data.message);

        } else {
          handleFailure("Error message " + error.reason);
        }

      });
    //contract.claimTokens()
  }

  return (
    <>
      <Container sx={styles.container1}>
        <Box sx={styles.stakeCard}>
          <Heading>BNB Pool</Heading>
          <br />
          <Text as='h4'>0.00000 BNB Earned</Text>
          <br />
          <Button onClick={handleClaim}>Claim BNB</Button>
          <br />
          <br />
          <Flex sx={styles.cardFlex}>
            <Text as='p'>APR:</Text>
            <Text as='p'>5%</Text>
          </Flex>
          <br />
          <hr />
          <br />
          <Flex sx={styles.cardFlex}>
            <Text as='p'>Your Stake:</Text>
            <Text as='p'>0.0000 SHRF</Text>
          </Flex>
          <br />
          <hr />
          <br />
          <Button onClick={handleUnstake}>Unstake</Button>
          <br />
          <br />
          <br />
          <Flex sx={styles.cardFlex}>
            <Text as='p'>Total Stakes:</Text>
            <Text as='p'>{saleData.cumStake} SHRF</Text>
          </Flex>
        </Box>
      </Container>



      <Buy
        handleClick={handleClick}
        userInput={userInput}
        setUserInput={setUserInput}
        spin={spin}
      />
      {<>
        <br />
        <Container>
          <Grid gap={5} columns={[1, 1, 2, 2, 3, 3]}>
            {features.map((item, i) => {
              return (
                <a href="#" target="_blank" rel="noreferrer" key={i}>
                  <Box sx={styles.box} key={i}>
                    <Text as="h3">{item.title}</Text>
                    <Text as="p">{item.text}</Text>
                  </Box>
                </a>
              );
            })}
          </Grid>
        </Container>
        <br />
        <br /></>}
      <Container sx={{ textAlign: 'center' }}>
        <Heading variant="normal" sx={{ textAlign: 'center', mx: 'auto' }}><strong>Note:</strong> Staking Contract <a style={{ textDecoration: 'underline' }} target="_blank" rel="noreferrer" href={`https://bscscan.com/address/${process.env.NEXT_PUBLIC_STAKING}`}>{process.env.NEXT_PUBLIC_STAKING}</a>  </Heading>
      </Container>
    </>
  );
};

export default Presale;

const styles = {
  stakeCard: {
    background: "rgba(153, 169, 255, 0.1452)",
    maxWidth: '600px',
    mx: 'auto',
    borderRadius: '25px',
    textAlign: 'center',
    p: '50px 40px',
    button: {
      width: '95%',

    }
  },
  cardFlex: {
    justifyContent: 'space-between'
  },
  box: {
    background: "rgba(194, 178, 241, 0.2)",
    overflow: "hidden",
    boxSizing: "border-box",
    padding: "40px 10px",
    minWidth: ["200px", null, "200px", "360px"],
    maxWidth: ["300px", null, "1000px", "1000px"],
    mx: "auto",
    position: "relative",
    top: "0",
    /* Z */
    textAlign: "center",
    boxShadow: "0px 0px 10px rgba(53, 52, 52, 0.2)",
    borderRadius: "5px",
    transition: "top ease 0.5s",
    "&:hover": {
      top: "-10px",
      boxShadow: "0px 0px 40px rgba(53, 52, 52, 0.2)",
    },
    h3: {
      fontSize: "40px",
      fontStyle: "normal",
      fontWeight: "normal",
      lineHeight: "60px",
      letterSpacing: "0em",
      mb: "20px",
      textTransform: "capitalize",
    },
    p: {
      fontSize: "22px",
      fontWeight: 400,
      lineHeight: "32px",
      letterSpacing: "0em",
    },
  },

  countdown: {
    justifyContent: "center",
    h1: {
      background:
        "radial-gradient(114% 421.6% at -6.17% 23.08%, rgba(243, 240, 252, 0.26) 0%, rgba(163, 133, 255, 0.26) 100%)",
      boxSizing: "border-box",
      boxShadow: "0px 2.95133px 2.95133px rgba(0, 0, 0, 0.25)",
      backdropFilter: "blur(5.72464px)",
      borderRadius: "12.5431px",
      textAlign: "center",
      fontSize: ["40px", "50px", null, null, "70px"],
      width: ["70px", "80px", null, null, "100px"],
      height: ["50px", "60px", null, null, "80px"],
    },
    h2: {
      textAlign: "center",
      fontSize: ["30px", "50px", null, null, "70px"],
      ml: "5px",
      mr: "5px",
    },
    p: {
      textAlign: "center",
      mt: "5px",
    },
  },
  section: {
    overflow: "hidden",
    pt: ["115px", null, null, "140px", "150px", "170px", "185px"],
  },
  container1: {
    position: "relative",
    alignItems: "center"
  },
  row: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrap: {
    display: "flex",
    minHeight: ["auto", "83px"],
    alignItems: "center",
    justifyContent: "center",
    img: {
      width: ["75px", null, null, null, "auto"],
    },
  },
  content: {
    mt: "-60px",
    maxWidth: ["100%", null, null, "355px", "460px", "600px", null, "850px"],
    textAlign: ["center", null, null, "center"],
    h1: {
      fontSize: ["28px", "32px", null, "34px", "40px", "48px", "54px", "58px"],
      lineHeight: [1.4, null, null, 1.35],
      color: "heading",
      letterSpacing: "-1.5px",
      fontWeight: "body",
      mx: ["auto", null, null, "auto", "auto"],
    },
    p: {
      fontSize: ["15px", null, null, null, "16px", "17px"],
      lineHeight: [1.85, null, 1.9, null, 2, 2.47],
      color: "text",
      mt: [3, null, null, "18px"],
      pr: [0, null, null, null, null, null, null, "50px"],
    },
  },
  content1: {
    maxWidth: ["100%", null, null, "100%", "100%", "100%", null, "100%"],
    textAlign: ["center", null, null, "center"],
    h1: {
      fontSize: ["25px", "25px", null, "26px", "32px", "40px", "42px", "45px"],
      color: "heading",
      textAlign: "center",
      letterSpacing: "-1.5px",
      fontWeight: "body",
      mx: ["auto", null, null, "auto", "auto"],
    },
    p: {
      fontSize: ["15px", null, null, null, "16px", "17px"],
      lineHeight: [1.85, null, 1.9, null, 2, 2.47],
      color: "text",
      mt: [3, null, null, "18px"],
      pr: [0, null, null, null, null, null, null, "50px"],
    },
  },
  btnWrap: {
    display: "flex",
    alignItems: "center",
    mt: ["25px", null, null, "30px", "35px", "50px"],
    justifyContent: ["center", null, null, "flex-start"],
  },
  btn: {
    backgroundColor: "heading_secondary",
    borderRadius: "7px",
    lineHeight: 1,
    fontSize: ["13px", "14px", "15px"],
    padding: ["14px 20px 13px", "14px 25px 13px", "17px 30px 15px"],
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    textTransform: "uppercase",
    color: "#ffffff",
    transition: "all 300ms ease",
    "&:hover": {
      opacity: 0.8,
    },
  },
  videoBtn: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "transparent",
    color: "heading_secondary",
    cursor: "pointer",
    textTransform: "uppercase",
    padding: 0,
    fontSize: ["13px", null, "15px", null, "17px"],
    fontWeight: 700,
    ml: ["20px", null, null, "25px", "30px"],
    outline: "none",
    svg: {
      ml: [1, null, 2],
      fontSize: ["17px", "18px", "20px"],
      position: "relative",
      top: "-1px",
    },
  },
  sectionImage: {
    mt: ["40px", null, null, 0],
    pl: [0, null, null, "30px", 0],
    display: "flex",
    justifyContent: "flex-end",
    position: "relative",
    right: ["auto", null, null, null, "-10px", "-50px", "-70px"],
    width: [
      null,
      null,
      null,
      "calc(100% - 355px)",
      "calc(100% - 460px)",
      "calc(100% - 545px)",
      null,
      "calc(100% - 590px)",
    ],
    textAlign: ["center", null],
  },
};
