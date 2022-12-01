import React from "react";
import styled from "styled-components";

const NavigationHeaderWrapper = styled.div`
  background: #131313;
  height: 24px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    overflow-x: scroll;

    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    ::-webkit-scrollbar-thumb {
      background: unset;
      border-radius: unset;
    }
    ::-webkit-scrollbar-track {
      background: unset;
      border-radius: unset;
      box-shadow: unset;
    }
  }

  ul {
    list-style-position: outside;
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    li {
      font-size: 80%;
      flex-shrink: 0;
      padding: 0 12px;
      line-height: 24px;
      cursor: pointer;
      background: #131313;
      transition: color 0.3s;

      a {
        color: #fff;
        text-decoration: none;

        &:hover {
          color: ${(props) => props.theme.primary};
        }
      }
    }
  }
`;

const LISTED_ITEMS: Array<{ name: string; href: string }> = [
  {
    name: "UNIFI PROTOCOL",
    href: "https://unifiprotocol.com",
  },
  {
    name: "ANALYTICS",
    href: "https://unifi.report",
  },
  {
    name: "GOVERNANCE",
    href: "https://gov.unifiprotocol.com",
  },
  {
    name: "UP",
    href: "https://app.unifiprotocol.com/up",
  },
  {
    name: "UBRIDGE",
    href: "https://app.unifiprotocol.com/bridge",
  },
  {
    name: "USTAKE",
    href: "https://app.unifiprotocol.com/stake",
  },
  {
    name: "NFT",
    href: "https://app.unifiprotocol.com/nft",
  },
];

export const NavigationHeader: React.FC = () => (
  <NavigationHeaderWrapper>
    <ul>
      {LISTED_ITEMS.map((item, idx) => (
        <li key={idx}>
          <a href={item.href} target="_blank" rel="noreferrer">
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  </NavigationHeaderWrapper>
);
