import { Container, Label, Image, Box, Heading, Button, Spinner, Input, Text, Flex } from "theme-ui";
import { Progress } from "reactstrap";
import { useState } from "react";
import dynamic from "next/dynamic";
import { parseBalance } from "../../../../Util/util";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CountDown = dynamic(import("react-countdown"), { ssr: false });
import Buy from "../sub/BuyInput";
import YouTube from "react-youtube";
import {
  Instagram,
  Telegram,
  Web,
  Twitter,
  Youtube,
  Linkedin,
  Github,
  Medium,
  Discord
} from "../../../assets/Socials";
import useETHBalance from "../../../../Web3Hooks/useETHBalance";
import { useWeb3React } from "@web3-react/core";
import useSaleData from "../../../../Web3Hooks/Presale/useBuyData";
import useContract from "../../../../Web3Hooks/useContract";
import ABI from "../../../../artifacts/contracts/StandardICO.sol/Presale.json";
import { ethers } from "ethers";
import { Copy } from 'react-feather'
// ** Third Party Components
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
import { api } from "../../../../config/api";
const MySwal = withReactContent(Swal);
function numberWithCommas(n) {
  var parts = n.toString().split(".");
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    (parts[1] ? "." + parts[1] : "")
  );
}
const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 1,
  },
};



function getLogo(p) {
  switch (p) {
    case 'website':
      return <Web />
    case 'telegram':
      return <Telegram />
    case 'youtube':
      return <Youtube />
    case 'linkedin':
      return <Linkedin />
    case 'github':
      return <Github />
    case 'medium':
      return <Medium />
    case 'discord':
      return <Discord />
    case 'instagram':
      return <Instagram />
    case 'twitter':
      return <Twitter />
    default:
      return <Web />
  }
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
        return 'Loading...';
    }
  } else {
    return 'Loading...';
  }
}

const Presale = ({ saleData, tokenInfo, icoAddress, chain, apiData }) => {
  const { account } = useWeb3React();
  const router = useRouter()
  const contract = useContract(icoAddress, ABI.abi, true)
  const data = useSaleData(account, icoAddress);
  const [userInput, setUserInput] = useState(1);
  const [formTime, setFormTime] = useState(new Date());
  const [spin, setSpin] = useState(false);
  function _onReady(e) {
    e.target.pauseVideo();
  }
  const info = [
    {
      value: getStatus(saleData.status),
      title: "Status",
    },
    {
      value: '1 ' + chain?.symbol + ' = ' + numberWithCommas(saleData.currentRate) + " " + tokenInfo.symbol,
      title: "Present Rate",
    },
    {
      value: '1 ' + chain?.symbol + ' = ' + numberWithCommas(saleData.anticipatedRate) + " " + tokenInfo.symbol,
      title: "Anticipated Rate",
    },
    {
      value: saleData.totalContributors,
      title: "Total Contributors",
    },
    {
      value: saleData.fundsRaised + " " + chain?.symbol,
      title: 'Total Contributions'
    },
    {
      value: data.contribution + " " + chain?.symbol,
      title: "Your Purchase",
    },
  ]

  const affiliate = [
    {
      value: data.reward + ' ' + chain?.symbol,
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
      value: saleData.currentRewards + " " + chain?.symbol,
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
      value: saleData.softCap + " " + chain?.symbol,
      title: "Soft Cap",
    },
    {
      value: saleData.hardCap + " " + chain?.symbol,
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

  const handleSuccess = (header,text) => {
    return MySwal.fire({
      title:header, //"Purchase Successful! 🎉",
      text: text,
      icon: "success",
      customClass: {
        confirmButton: "SweatBtn",
      },
      buttonsStyling: false,
    });
  };

  const handleSetTimeCall = async (time, start) => {
    setSpin(true)
    if (!account) {
      handleFailure("Connect Wallet")
      setSpin(false)
      return;
    }

    try {
      if (start) {
        await contract.setStartTime(time.getTime())
      } else {
        await contract.setEndTime(time.getTime())
      }
      handleSuccess('Successful','Sales Would ends at '+ time.toString())
      setSpin(false)
    } catch (error) {
      setSpin(false)
      if (error.data) {
        console.log(error)

        handleFailure(error.data.message);

      } else {

        if (error.reason) {
          handleFailure(error.reason);
        } else {
          handleFailure(error.message);
        }

      }
    }
  }

  const setFormTimeCall = (date) => {
    console.log(date)
    setFormTime(date)
    console.log(formTime)
  }

  const handleSetTimes = (start) => {
    console.log(formTime)
    MySwal.fire({
      title: start ? 'Input Start Time' : 'Input End Time',
      html: (
        <Box className="boxes" sx={{
          maxWidth: '100%'
        }}>
          <Label htmlFor="end">{start ? ' Start Time' : 'End Time'}</Label>
          <br />
          <DatePicker selected={formTime ? formTime : start ? new Date(Number(saleData.startTime)) : new Date(Number(saleData.endTime))} showTimeSelect onChange={(date) =>setFormTimeCall(date)} />
          <Button sx={{
            background: '#C1BCF2',
            fontFamily: 'Montserrat',
            color: 'black',
            mb: '15px',
          }} onClick={() => {
            console.log(formTime)
            handleSetTimeCall(formTime, start)
          }}>Set</Button>
          &nbsp;
          <Button sx={{
            background: '#C1BCF2',
            fontFamily: 'Montserrat',
            color: 'black',
            mb: '15px',
          }} onClick={() => {
            console.log(formTime)
            handleSetTimeCall(new Date(), start)
          }}>End Now</Button>
        </Box>
      ),
      showCloseButton: true,
      buttonsStyling: true,
      showCancelButton: false,
      showConfirmButton: false,
    })

  }

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


  async function handleClickRefund() {
    setSpin(true)
    if (!account) {
      handleFailure("Connect Wallet")
      setSpin(false)
      return;
    }

    try {
      await contract.withdrawRefund()
      handleSuccess('Buy Successful')
      setSpin(false)
    } catch (error) {
      setSpin(false)
      if (error.data) {
        console.log(error)

        handleFailure(error.data.message);

      } else {

        if (error.reason) {
          handleFailure(error.reason);
        } else {
          handleFailure(error.message);
        }

      }
    }
  }

  async function handleFinalize() {
    setSpin(true)
    if (!account) {
      handleFailure("Connect Wallet")
      setSpin(false)
      return;
    }

    try {
      await contract.finalize()
      handleSuccess('Buy Successful')
      setSpin(false)
    } catch (error) {
      setSpin(false)
      if (error.data) {
        handleFailure(error.data.message);

      } else {
        if (error.reason) {
          handleFailure(error.reason);
        } else {
          handleFailure(error.message);
        }
      }
    }
  }

   async function handleCollectReward() {
    setSpin(true)
    if (!account) {
      handleFailure("Connect Wallet")
      setSpin(false)
      return;
    }

    try {
      await contract.withdrawReward()
      handleSuccess('Yay, Reward Withdrawn Congratulations')
      setSpin(false)
    } catch (error) {
      setSpin(false)
      if (error.data) {
        handleFailure(error.data.message);

      } else {
        if (error.reason) {
          handleFailure(error.reason);
        } else {
          handleFailure(error.message);
        }
      }
    }
  }

  async function handleClaim() {
    setSpin(true)
    if (!account) {
      handleFailure("Connect Wallet")
      setSpin(false)
      return;
    }
    try {
      await contract.claimTokens()
      handleSuccess()
      setSpin(false)
    } catch (error) {
      setSpin(false)
      if (error.data) {
        handleFailure(error.data.message);
      } else {
        if (error.reason) {
          handleFailure(error.reason);
        } else {
          handleFailure(error.message);
        }
      }
    }
  }

  async function handleEmergency() {
    setSpin(true)
    if (!account) {
      handleFailure("Connect Wallet")
      setSpin(false)
      return;
    }

    if (!data.contribution && data.contribution <= 0) {
      handleFailure("You have no contribution")
      setSpin(false)
      return;
    }

    try {
      await contract.emergencyWithdraw()
      handleSuccess()
      setSpin(false)
    } catch (error) {
      setSpin(false)
      if (error.data) {
        handleFailure(error.data.message);

      } else {
        if (error.reason) {
          handleFailure(error.reason);
        } else {
          handleFailure(error.message);
        }
      }
    }
  }

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
      let res;
      if (router.query?.refId) {
        res = await contract["contribute(address)"](router.query.refId, { value: ethers.utils.parseUnits(userInput.toString(), "ether") })
      } else {
        res = await contract["contribute()"]({ value: ethers.utils.parseUnits(userInput.toString(), "ether") })
      }
      await res.wait()
      const result = await contract.getRaised()
      const resultContribution = await contract.getContribution(account)
      const value = parseBalance(result ?? 0, 18, 5)
      const impute = parseBalance(resultContribution ?? 0, 18, 5)
      console.log(result, value)
      const appi = await api.put('ico', {
        update: {
          preSale: apiData.preSale,
          fundsRaised: value,
          startTime: saleData.startTime,
          endTime: saleData.endTime,
        },
        participation: {
          chain: chain?.slug,
          participant: account,
          amount: impute,
          preSale: icoAddress,
        }
      })
      console.log(appi)
      handleSuccess('Buy Successful')

      setSpin(false)
    } catch (error) {
      setSpin(false)
      if (error.data) {
        handleFailure(error.data.message);

      } else {
        if (error.reason) {
          handleFailure(error.reason);
        } else {
          handleFailure(error.message);
        }
      }
    }
    //contract.claimTokens()
  }

  const time = {
    starting: new Date(Number(saleData.startTime)),
    now: new Date(),
    ending: new Date(Number(saleData.endTime)),
  };
  function copy(text) {
    return new Promise((resolve, reject) => {
      if (typeof navigator !== "undefined" && typeof navigator.clipboard !== "undefined" && navigator.permissions !== "undefined") {
        const type = "text/plain";
        const blob = new Blob([text], { type });
        const data = [new ClipboardItem({ [type]: blob })];
        navigator.permissions.query({ name: "clipboard-write" }).then((permission) => {
          if (permission.state === "granted" || permission.state === "prompt") {
            navigator.clipboard.write(data).then(resolve, reject).catch(reject);
          }
          else {
            reject(new Error("Permission not granted!"));
          }
        });
      }
      else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";
        textarea.style.width = '2em';
        textarea.style.height = '2em';
        textarea.style.padding = 0;
        textarea.style.border = 'none';
        textarea.style.outline = 'none';
        textarea.style.boxShadow = 'none';
        textarea.style.background = 'transparent';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
          document.execCommand("copy");
          document.body.removeChild(textarea);
          resolve();
        }
        catch (e) {
          document.body.removeChild(textarea);
          reject(e);
        }
      }
      else {
        reject(new Error("None of copying methods are supported by this browser!"));
      }
    });

  }

  async function copyLink(e) {

    console.log(e.target)
    console.log(e.target.value)
    try {
      await copy(e.target.value);
      handleCopied()

    }
    catch (e) {
      console.error(e);
    }

  }

  function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
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
        {!tokenInfo?.name && <Box sx={{
          textAlign: 'center',
          mb: '5px'
        }}>
          <Spinner sx={{
            m: 'auto',
            textAlign: 'center',
            alignItems: 'center'
          }} />
        </Box>}
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
              <Image src={apiData?.logoUrl} alt='logo' width={70} height={70} />
              <Image src={chain?.chainLogo} alt='logo' className='chain' width={25} height={25} />
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
            <Heading>{tokenInfo?.name ? tokenInfo?.name : apiData.tokenName + ' Fair Launch'}</Heading>
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
              {apiData?.badges?.map((info, i) => {
                return (
                  <a
                    key={i}
                    href={info.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button className={info.type} sx={{
                      textTransform: 'uppercase'
                    }}>{info.type}</Button>
                  </a>
                )
              })}
            </Flex>
          </Flex>
          <br />
          <Flex sx={styles.socials}>
            {apiData?.socials?.map(({ link, platform }, i) => {
              return (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {getLogo(platform)}
                </a>
              )
            })}
          </Flex>
          <br />
          <Box>
            <Text>{apiData?.description}</Text>
          </Box>
          <br />
          {apiData?.youtubeVideo && <Box sx={{
            alignItems: 'center',
            textAlign: 'center',
            iframe: {
              maxWidth: '100%'
            }
          }}>
            <YouTube videoId={youtube_parser(apiData?.youtubeVideo)}
              opts={opts} onReady={_onReady} />
          </Box>}

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
              {saleData.fundsRaised + " " + chain?.symbol}
            </Text>
            <Text as="p">{saleData.softCap + " " + chain?.symbol}</Text>
          </Flex>
          <Buy
            handleClick={handleClick}
            userInput={userInput}
            handleClickRefund={handleClickRefund}
            handleEmergency={handleEmergency}
            setUserInput={setUserInput}
            handleClaim={handleClaim}
            spin={spin}
            setSpin={setSpin}
            rate={saleData.rate}
            status={saleData.status}
            refund={saleData.refund}
            contribution={data.contribution}
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
            <Text>Your Affiliate Link (Click to copy)</Text>
            <br />
            <br />
            <Flex onClick={copyLink}>
              <Input type='url' id='affiliateCopy' value={process.env.NEXT_PUBLIC_DOMAIN + '/funding/' + router.query.slug + '?chain=' + router.query.chain + '&refId=' + account} disabled />
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
       {saleData.status == 3 && !saleData.refund && data.reward > 0 && <Button onClick={handleCollectReward}>Withdraw Reward</Button>}
        </Box>}

        {account && saleData.owner == account && <Box id='affiliate' as="section" variant="boxes.glide" sx={{
          textAlign: 'center',
          mt: '50px',
          hr: {
            opacity: '0.2',
            my: '15px'
          },
          button: {
            width: '100%',
            mb: '10px'
          }
        }}>
          <Text variant="title">Owner Zone</Text>
          <hr />
          <br />
          <br />

          <Button onClick={handleFinalize}>Finalize</Button>
          <Button>Update Affiliate Program</Button>
          <Button>Cancel Pool</Button>
          <Button onClick={() => { handleSetTimes(true) }}>Set Start Time</Button>
          <Button onClick={() => { handleSetTimes(false) }}>Set End Time</Button>
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
