import { Container, Image, Box, Heading, Button, Input, Text, Flex } from "theme-ui";
import { Progress } from "reactstrap";
import { useState } from "react";
import dynamic from "next/dynamic";
const CountDown = dynamic(import("react-countdown"), { ssr: false });
import Buy from "../sub/BuyInput";
import {
  Instagram,
  Telegram,
  Youtube,
  Linkedin,
  Github, Medium, Discord
} from "../../../assets/Socials";
import useETHBalance from "../../../../Web3Hooks/useETHBalance";
import { useWeb3React } from "@web3-react/core";
import { parseBalance } from "../../../../Util/util";
import useSaleData from "../../../../Web3Hooks/Presale/useBuyData";
import useContract from "../../../../Web3Hooks/useContract";
import useTokenData from "../../../../Web3Hooks/ERC20/useTokenData";
import ABI from "../../../../artifacts/contracts/StandardICO.sol/Presale.json";
import { ethers } from "ethers";
import { Copy } from 'react-feather'
// ** Third Party Components
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
const MySwal = withReactContent(Swal);
function numberWithCommas(n) {
  var parts = n.toString().split(".");
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    (parts[1] ? "." + parts[1] : "")
  );
}
function getStatus(status) {
  if (status) {
    switch (Number(status)) {
      case 1:
        return 'Upcoming';
      case 2:
        return 'Ongoing';
      case 3:
        return 'Ended';
      case 4:
        return 'Cancelled';
      default:
        return 'Pending';
    }
  } else {
    return 'Pending';
  }
}

const Presale = ({ saleData, icoAddress, chain }) => {
  const { account } = useWeb3React();
  const router = useRouter()
  const contract = useContract(icoAddress, ABI.abi, true)
  const data = useSaleData(account, icoAddress);
  const tokenInfo = useTokenData(saleData.tokenAddress)
  console.log(saleData)
  const [userInput, setUserInput] = useState(1);
  const [spin, setSpin] = useState(false);
  const info = [
    {
      value: getStatus(saleData.status),
      title: "Status",
    },
    {
      value: '1 ' + chain.symbol + ' = ' + numberWithCommas(saleData.currentRate) + " " + tokenInfo.symbol,
      title: "Present Rate",
    },
    {
      value: '1 ' + chain.symbol + ' = ' + numberWithCommas(saleData.anticipatedRate) + " " + tokenInfo.symbol,
      title: "Anticipated Rate",
    },
    {
      value: saleData.totalContributors,
      title: "Total Contributors",
    },
    {
      value: data.contribution + " " + chain.symbol,
      title: "Your Purchase",
    },
  ]

  const affiliate = [
    {
      value: data.reward + ' ' + chain.symbol,
      title: "Your Reward",
    },
    {
      value: saleData.totalReferrers,
      title: "Pool Referrer Count",
    },
    {
      value: saleData.affiliatePercent + ' %',
      title: "Reward Percentage",
    },
    {
      value: saleData.currentRewards + " " + chain.symbol,
      title: "Total Current Rewards",
    },
  ]

  const saleInfo = [
    {
      value: icoAddress,
      title: "Presale Address",
    },
    {
      value: tokenInfo.name,
      title: "Token Name",
    },
    {
      value: tokenInfo.symbol,
      title: "Token Symbol",
    },
    {
      value: tokenInfo.decimals,
      title: "Token Decimals",
    },
    {
      value: saleData.tokenAddress,
      title: "Token Address",
    },
    {
      value: numberWithCommas(tokenInfo.totalSupply) + " " + tokenInfo.symbol,
      title: "Total Supply",
    },
    {
      value: numberWithCommas(saleData.icoSaleTokens) + " " + tokenInfo.symbol,
      title: "Tokens For Presale",
    },
    {
      value: saleData.softCap + " " + chain.symbol,
      title: "Soft Cap",
    },
    {
      value: saleData.hardCap + " " + chain.symbol,
      title: "Hard Cap",
    },
    {
      value: new Date(Number(saleData.startTime)).toString(),
      title: "Presale Start Time",
    },
    {
      value: new Date(Number(saleData.endTime)).toString(),
      title: "Presale End Time",
    },
  ]
  const balance = useETHBalance(account);

  const ethBal = parseBalance(balance.data ?? 0);

  var percent = ((saleData.fundsRaised / saleData.softCap) * 100).toFixed(5);

  const handleSuccess = () => {
    return MySwal.fire({
      title: "Purchase Successful! 🎉",
      text: "Thank You For your patronage, Claim tokens after ICO",
      icon: "success",
      customClass: {
        confirmButton: "SweatBtn",
      },
      buttonsStyling: false,
    });
  };
  const handleCopied = () => {
    return MySwal.fire({
      title: "Affiliate Link Copied! 🎉",
      text: "Share get people to invest and earn cool cash",
      icon: "success",
      timer: 3000,
      timerProgressBar: true,
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

  async function handleClick() {
    setSpin(true)
    if (!account) {
      handleFailure("Connect Wallet")
      setSpin(false)
      return;
    }
    if (userInput > ethBal) {
      handleFailure(ethBal + "BNB - Insufficient Balance")
      setSpin(false)
      return;
    }
    if (userInput <= 0) {
      handleFailure("Invalid amount")
      setSpin(false)
      return;
    }

    try {
      await contract["contribute()"]({ value: ethers.utils.parseUnits(userInput.toString(), "ether") })
      handleSuccess('Buy Successful')
      setSpin(false)
    } catch (error) {
      setSpin(false)
      if (error.data) {
        handleFailure("Error message " + error.data.message);

      } else {
        handleFailure("Error message " + error.message);
      }
    }
    //contract.claimTokens()
  }

  const time = {
    starting: new Date(Number(saleData.startTime)),
    now: new Date(),
    ending: new Date(Number(saleData.endTime)),
  };

  function copy() {
    // Get the text field
    var copyText = document.getElementById("affiliateCopy");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
    handleCopied()
  }

  const Completionist = () => {
    return (
      <Flex sx={styles.countdown}>
        <Box>
          <Heading as="h1">{"00"}</Heading>
          <Text as="p">Days</Text>
        </Box>
        <Heading as="h2">:</Heading>
        <Box>
          <Heading as="h1">{"00"}</Heading>
          <Text as="p">Hours</Text>
        </Box>
        <Heading as="h2">:</Heading>

        <Box>
          <Heading as="h1">{"00"}</Heading>
          <Text as="p">Mins</Text>
        </Box>
        <Heading as="h2">:</Heading>

        <Box>
          <Heading as="h1">{"00"}</Heading>
          <Text as="p">Secs</Text>
        </Box>
      </Flex>
    );
  };
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <Flex sx={styles.countdown}>
          <Box>
            <Heading as="h1">{days}</Heading>
            <Text as="p">Days</Text>
          </Box>
          <Heading as="h2">:</Heading>
          <Box>
            <Heading as="h1">{hours}</Heading>
            <Text as="p">Hours</Text>
          </Box>
          <Heading as="h2">:</Heading>

          <Box>
            <Heading as="h1">{minutes}</Heading>
            <Text as="p">Mins</Text>
          </Box>
          <Heading as="h2">:</Heading>

          <Box>
            <Heading as="h1">{seconds}</Heading>
            <Text as="p">Secs</Text>
          </Box>
        </Flex>
      );
    }
  };
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <Container>
        <Box as="section" id="info" variant="boxes.glide" sx={{
          '.Upcoming': {
            background: '#C8EECE',
            fontWeight: 'bold',
            color: '#023908',
            svg: {
              fill: '#023908',
              stroke: '#023908'
            }
          },
          '.Ongoing': {
            background: '#F1F2B9',
            color: '#3E3802',
            fontWeight: 'bold',
            svg: {
              fill: '#3E3802',
              stroke: '#3E3802'
            }
          },
          '.Ended': {
            background: '#F7C8C8',
            color: '#580000',
            fontWeight: 'bold',
            svg: {
              fill: '#580000',
              stroke: '#580000'
            }
          },
          '.Cancelled': {
            background: '#E3E3E3',
            color: '#393636',
            fontWeight: 'bold',
            svg: {
              fill: '#393636',
              stroke: '#393636'
            }
          },
          '.Pending': {
            background: '#F9D4FF',
            color: '#3F0231',
            fontWeight: 'bold',
            svg: {
              fill: '#3F0231',
              stroke: '#3F0231'
            }
          },
        }}>
          <Flex sx={{
            justifyContent: 'space-between'
          }}>
            <Box sx={{
              position: 'relative',
              '.chain': {
                position: 'absolute',
                bottom: '0',
                right: '0'
              }
            }}>
              <Image src={chain.chainLogo} alt='logo' width={70} height={70} />
              <Image src={chain.chainLogo} alt='logo' className='chain' width={25} height={25} />
            </Box>
            <Box sx={{
              height: 'fit-content',
              width: 'fit-content',
              p: '5px 10px',
              borderRadius: '15px',
              svg: {
                mr: '5px',
                width: '13px',
                height: '13px',
              }
            }} className={getStatus(saleData.status)}>
              <Text>
                <svg stroke="red"
                  fill="red"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="8"></circle>
                </svg>
                <Text>{'Pool ' + getStatus(saleData.status)}</Text>
              </Text>
            </Box>
          </Flex>
          <br />
          <Flex sx={{
            justifyContent: 'space-between',
            flexDirection: ['column-reverse', null, null, null, 'row'],
            h2: {
              mt: ['15px', null, null, 0]
            }
          }}>
            <Heading>{tokenInfo.name + ' Fair Launch'}</Heading>
            <Flex sx={{
              button: {
                p: '5px 10px',
                height: 'fit-content',
                ml: '5px'
              },
              '.safu': {
                background: 'rgb(223, 95, 248)'
              },
              '.audit': {
                background: 'rgb(0, 188, 212)'
              },
              '.kyc': {
                background: '#48c774'
              },
            }}>
              <Button className="safu">SAFU</Button>
              <Button className="audit">AUDIT</Button>
              <Button className="kyc">KYC</Button>
            </Flex>
          </Flex>
          <br />
          <Flex sx={styles.socials}>
            <a
              href="https://www.instagram.com/howrians"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram />
            </a>
            <a
              href="https://www.youtube.com/@howreanetwork"
              target="_blank"
              rel="noreferrer"
            >
              <Youtube />
            </a>
            <a
              href="https://www.linkedin.com/company/howreanetwork/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin />
            </a>
            <a
              href="https://github.com/howrea"
              target="_blank"
              rel="noreferrer"
            >
              <Github />
            </a>
            <a
              href="https://medium.com/@howreanetwork"
              target="_blank"
              rel="noreferrer"
            >
              <Medium />
            </a>
            <a
              href="https://discord.gg/ecBCWHweym"
              target="_blank"
              rel="noreferrer"
            >
              <Discord />
            </a>
            <a
              href="https://t.me/howrians"
              target="_blank"
              rel="noreferrer"
            >
              <Telegram />
            </a>
          </Flex>
          <br />
          <Box>
            <Text>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, 
pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. 
Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, 
in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent
per conubia nostra, per inceptos himenaeos. Duis pharetra luctus lacus ut 
vestibulum. Maecenas ipsum lacus, lacinia quis posuere ut, pulvinar vitae dolor.
Integer eu nibh at nisi ullamcorper sagittis id vel leo. Integer feugiat 
faucibus libero, at maximus nisl suscipit posuere. Morbi nec enim nunc. 
Phasellus bibendum turpis ut ipsum egestas, sed sollicitudin elit convallis. 
Cras pharetra mi tristique sapien vestibulum lobortis. Nam eget bibendum metus, 
non dictum mauris. Nulla at tellus sagittis, viverra est a, bibendum metus.`}</Text>
          </Box>
          <br />
          <br />
          <Box sx={{
            textAlign: 'center',
            mt: '50px',
            hr: {
              opacity: '0.2',
              my: '15px'
            }
          }}>
            {saleInfo.map(({ title, value }, i) => {
              return (
                <>
                  <Flex key={i} sx={{
                    justifyContent: ['center', null, null, 'space-between'],
                    flexDirection: ['column', null, null, 'row'],
                  }}>
                    <Text as={'p'} sx={{
                      fontWeight: 'bold',
                      mb: ['8px', null, null, '0']
                    }}>{title + ': '}</Text>
                    <Text as={'p'} sx={{
                      wordBreak: 'break-all'
                    }}>{value}</Text>
                  </Flex>
                  <hr />
                </>
              )
            })}
          </Box>

        </Box>
        <Box as="section" id="banner" variant="boxes.glide" sx={{
          position: 'relative',
          textAlign: 'center',
          mt: '50px',
          border: saleData.affiliatePercent > 0 ? '3.5px solid' : 'none',
          borderColor: 'text',
          '&:before': {
            content: saleData.affiliatePercent > 0 ? `'${'Affiliate ' + saleData.affiliatePercent + '%'}'` : null,
            position: 'absolute',
            width: 'fit-content',
            background: 'text',
            textAlign: 'center',
            mx: 'auto',
            right: 0,
            left: 0,
            color: 'background',
            p: '5px 10px',
            borderRadius: '15px',
            mt: '-15px',
            top: '0',
            alignItems: 'center',
          }
        }}>
          <Box sx={styles.content1}>
            <Text as="p">
              {time.now < time.starting ? "Starting In" : time.now > time.ending ? "This pool has ended" : "Ending In"}
            </Text>
          </Box>
          {time.ending > time.now &&
            <CountDown
              date={time.now < time.starting ? time.starting : time.ending}
              renderer={renderer}
            />
          }

          <br />
          <Progress
            value={percent}
            style={{
              height: ["1rem", null, null, "1.6rem"],
              border: "1px solid",
              borderRadius: "4rem",
            }}
          />
          <br />
          <Flex sx={{ justifyContent: "space-between", fontWeight: "bold" }}>
            <Text as="p">
              {saleData.fundsRaised + " BNB"}
            </Text>
            <Text as="p">{saleData.softCap}</Text>
          </Flex>
          <Buy
            handleClick={handleClick}
            userInput={userInput}
            setUserInput={setUserInput}
            spin={spin}
            setSpin={setSpin}
            rate={saleData.rate}
          />
        </Box>

        <Box as="section" id="info" variant="boxes.glide" sx={{
          textAlign: 'center',
          mt: '50px',
          hr: {
            opacity: '0.2',
            my: '15px'
          }
        }}>
          {info.map(({ title, value }, i) => {
            return (
              <>
                <Flex key={i} sx={{
                  justifyContent: ['center', null, null, 'space-between'],
                  flexDirection: ['column', null, null, 'row'],
                }}>
                  <Text as={'p'} sx={{
                    fontWeight: 'bold',
                    mb: ['8px', null, null, '0']
                  }}>{title + ': '}</Text>
                  <Text as={'p'} sx={{
                    wordBreak: 'break-all'
                  }}>{value}</Text>
                </Flex>
                <hr />
              </>
            )
          })}

        </Box>
        {saleData.affiliatePercent > 0 && <Box id='affiliate' as="section" variant="boxes.glide" sx={{
          textAlign: 'center',
          mt: '50px',
          hr: {
            opacity: '0.2',
            my: '15px'
          }
        }}>
          <Text variant="title">Affiliate Program</Text>
          <hr />

          {account && <Box sx={{
            textAlign: 'center',
            label: {
              textAlign: 'center !important',
              mx: 'auto !important'
            },
            input: {
              p: '10px 10px !important'
            }
          }}>
            <Text>Your Affiliate Link</Text>
            <br />
            <br />
            <Flex>
              <Input type='url' id='affiliateCopy' value={process.env.NEXT_PUBLIC_DOMAIN + '/funding/' + router.query.slug + '?chain=' + router.query.chain + '&refId=' + account} disabled />
              &nbsp;
              <Box onClick={copy}>
                <Copy size={45} />
              </Box>
            </Flex>
          </Box>}
          <br />
          <br />

          {affiliate.map(({ title, value }, i) => {
            return (
              <>
                <Flex key={i} sx={{
                  justifyContent: ['center', null, null, 'space-between'],
                  flexDirection: ['column', null, null, 'row'],
                }}>
                  <Text as={'p'} sx={{
                    fontWeight: 'bold',
                    mb: ['8px', null, null, '0']
                  }}>{title + ': '}</Text>
                  <Text as={'p'} sx={{
                    wordBreak: 'break-all'
                  }}>{value}</Text>
                </Flex>
                <hr />
              </>
            )
          })}

        </Box>}
      </Container>
    </>
  );
};

export default Presale;

const styles = {
  socials: {
    display: "flex",
    mb: ["25px", null, null, "0"],
    justifyContent: ["left", null, null, "left"],
    a: { mx: "5px" },
  },
  box: {
    background: "rgba(194, 178, 241, 0.2)",
    overflow: "hidden",
    boxSizing: "border-box",
    padding: "40px 10px",
    minWidth: ["90%", null, "200px", "360px"],
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
    alignItems: "center",
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
