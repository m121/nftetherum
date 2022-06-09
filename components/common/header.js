import Link from 'next/link'
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useRouter } from 'next/router'
import React from "react";

export default function Header(props) {
  const router = useRouter()
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <div className="sticky top-0">
  
    </div>
  );
}