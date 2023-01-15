/** @jsx jsx */
/** @jsxRuntime classic */
import { useEffect, useRef, useState } from "react";
import { Box, jsx } from "theme-ui";
import cn from "classnames";
import Slider from "react-slick";
import Markdown from "../Markdown/Markdown";
import {Container, useThemeUI } from "theme-ui";

const releases = [
  { version: "0.17", date: "Nov 23, 2020", content: "Nov 23, 2020" },
  { version: "0.18", date: "Dec 9, 2020", content: "Dec 9, 2020" },
  { version: "0.19", date: "Feb 17, 2021", content: "Feb 17, 2021" },
  { version: "0.20", date: "Apr 22, 2021", content: "Apr 22, 2021" },
  { version: "0.21", date: "May 26, 2021", content: "May 26, 2021" },
  { version: "0.22", date: "Aug 16, 2021", content: "Aug 16, 2021" },
  { version: "0.23", date: "Dec 14, 2021", content: "Dec 14, 2021" },
  { version: "0.24", date: "Mar 11, 2022", content: "Mar 11, 2022" },
  { version: "0.25", date: "Jun 8, 2022", content: "Jun 8, 2022" },
  { version: "0.26", date: "Aug 18, 2022", content: "Aug 18, 2022" },
  { version: "0.27", date: "Oct 05, 2022", content: "Oct 05, 2022" },
  { version: "0.28", date: "Nov 2, 2022", content: "Nov 2, 2022" },
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
          backgroundColor: colorMode === "default" ? "black" : "white",
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
  const { colorMode } = useThemeUI();
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
          fill={colorMode === "default" ? "black" : "white"}
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
