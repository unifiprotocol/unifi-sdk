import React from 'react';
import styled from 'styled-components';

const NavigationHeaderWrapper = styled.div`
  background: #000;
  height: 24px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

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
      opacity: 0.85;
      flex-shrink: 0;
      padding: 0 12px;
      line-height: 24px;
      cursor: pointer;
      background: #000;
      transition: opacity 0.3s, background 0.3s;

      &:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.1);
      }

      a {
        color: #fff;
        text-decoration: none;
      }
    }
  }
`;

const LISTED_ITEMS: Array<{ name: string; href: string }> = [
  {
    name: 'UNIFI PROTOCOL',
    href: 'https://unifiprotocol.com',
  },
  {
    name: 'GOVERNANCE',
    href: 'https://gov.unifiprotocol.com',
  },
  {
    name: 'UTRADE',
    href: 'https://utrade.finance',
  },
  {
    name: 'USTAKE',
    href: 'https://ustake.pages.dev',
  },
];

export const NavigationHeader: React.FC = () => (
  <NavigationHeaderWrapper>
    <ul>
      {LISTED_ITEMS.map((item, idx) => (
        <li key={idx}>
          <a href={item.href} target='_blank' rel='noreferrer'>
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  </NavigationHeaderWrapper>
);
