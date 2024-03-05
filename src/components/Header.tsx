"use client";

import React from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";

const Header = () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link href="/">
        <span className="item">CrowdCoin</span>
      </Link>
      <Menu.Item>CrowdCoin</Menu.Item>

      <Menu.Menu position="right">
        <Link href="/">
          <span className="item">Campaigns</span>
        </Link>

        <Link href="/campaigns/new">
          <span className="item">+</span>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
