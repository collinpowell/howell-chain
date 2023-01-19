/** @jsx jsx */
/** @jsxRuntime classic */
import { useEffect, useRef, useState } from "react";
import { Box, jsx } from "theme-ui";
import cn from "classnames";
import Slider from "react-slick";
import Markdown from "../Markdown/Markdown";
import { Container, useThemeUI } from "theme-ui";

const releases = [
  { version: "Phase 1", date: "Dec 23, 2021", content: "Idea Inception" },
  {
    version: "Phase 2",
    date: "Jan 9, 2022",
    content: "Idea Creation and Initiation",
  },
  { version: "Phase 3", date: "Mar 9, 2022", content: "Private Funding (10,000$)" },
  {
    version: "Phase 4",
    date: "Jan 18, 2023",
    content: "SHEER Finance Token Launch on Binance Smart Chain (SHRF)",
  },
  {
    version: "Phase 5",
    date: "Jan 21, 2023",
    content: "Community Building and Idea Propagation",
  },
  { version: "Phase 6", date: "Feb 1, 2023", content: "Public ICO" },
  {
    version: "Phase 7",
    date: "Feb 10, 2023",
    content:
      "More intensive development for open source projects with developers community / intensive marketing",
  },
  { version: "Phase 8", date: "Mar 1, 2023", content: "Pancakeswap Listing" },
  {
    version: "Phase 9",
    date: "Mar 2, 2023",
    content: "Open source decentralized wallet official launch",
  },
  { version: "Phase 10", date: "Mar 5, 2022", content: "TDH official launch" },
  {
    version: "Phase 11",
    date: "March 7, 2023",
    content:
      "More Listing and project publicity driving (Binance, coinmarketcap,nomnics etc.)",
  },
  {
    version: "Phase 12",
    date: "Mar 10, 2023",
    content: "More platform Improvements and solutions developments (Slancer, SCStore)",
  },
  {
    version: "Phase 13",
    date: "April 29, 2023",
    content: "Physical meetups & Events / Charity",
  },
  {
    version: "Phase 13",
    date: "April 30, 2023",
    content: "Token Intensive Driving and pushing by howrea team",
  },
  {
    version: "Phase 14",
    date: "Nov 2, 2023",
    content: "Spanning our blockchain nodes (Howrea Chain)",
  },
  {
    version: "Phase 15",
    date: "Nov 16, 2023",
    content: "Platforms Integration and Driving",
  },
  {
    version: "Phase 16",
    date: "Jan 5, 2024",
    content: "SHEER coin grand launch",
  },
  {
    version: "Phase 17",
    date: "Jan 5, 2022 >",
    content: "Continuos development, marketing, improvement, strategizing & marketing",
  },
];

export default function Roadmap() {
  const [active, setActive] = useState(releases.length - 1);
  const { colorMode } = useThemeUI();

  const sliderStep = useRef();
  const sliderInfo = useRef();
  const sliderSelect = (index) => {
    setActive(index);
    sliderStep.current.slickGoTo(index);
    sliderInfo.current.slickGoTo(index);
  };

  useEffect(() => {
    sliderSelect(releases.length - 1);
    window.scrollTo(0, 0);
  }, []);

  const stepSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          focusOnSelect: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          focusOnSelect: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          focusOnSelect: true,
        },
      },
    ],
    focusOnSelect: true,
  };

  const contentSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    draggable: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box
      className="Roadmap Section-space-top Section-space-bottom"
      sx={{
        ".Roadmap-circle-active svg": {
          fill: "rgba(194, 178, 241, 1)",
        },
        ".Roadmap-progress": {
          backgroundColor: colorMode === "dark" ? "white" : "black",
        },
      }}
    >
      <Slider {...stepSettings} ref={sliderStep} className="Roadmap-slide">
        <RoadmapItem isStart />
        {releases.map((release, index) => (
          <RoadmapItem
            key={index}
            isActive={index === active}
            date={release.date}
            version={release.version}
            content={release.content}
            onClick={() => sliderSelect(index)}
          />
        ))}
        <RoadmapItem isEnd />
      </Slider>
      <Slider {...contentSettings} ref={sliderInfo}>
        {releases.map((release, index) => (
          <Container key={index} className="mt-4 Roadmap-content-container">
            <RoadmapDetails version={release.content} />
          </Container>
        ))}
      </Slider>
    </Box>
  );
}

export function RoadmapItem({
  isActive,
  date,
  version,
  content,
  onClick,
  isStart,
  isEnd,
}) {
  if (isStart || isEnd) {
    return (
      <div className="Roadmap-step">
        <div
          className={cn("Roadmap-progress", { "Roadmap-progress-end": isEnd })}
        />
      </div>
    );
  }

  const width = isActive ? "24" : "16";
  const height = isActive ? "24" : "16";

  return (
    <div className="Roadmap-step" onClick={onClick}>
      <div className="Roadmap-progress" />
      <div
        className={cn("Roadmap-circle", { "Roadmap-circle-active": isActive })}
      >
        <div className="text-grey small">{date}</div>
        {/* <Circle width={width} height={height} role="button" /> */}
        <svg
          width={width}
          height={height}
          viewBox="0 0 16 16"
          className="logos"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="8" />
        </svg>

        <div className="text-steel-light">Version {version}</div>
      </div>
    </div>
  );
}

function RoadmapDetails({ version }) {
  return (
    <Box
      sx={{
        border: "3px solid",
        borderColor: "text",
        borderRadius: "25px",
        mx: "auto",
        padding: ["38px 15px", null, null, "38px 84px"],
        maxWidth: "500px",
      }}
    >
      <div className="card-body Roadmap-highlights scroll">
        <Markdown file={version} />
      </div>
    </Box>
  );
}
