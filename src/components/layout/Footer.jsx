import {
  BiLogoInstagram,
  BiLogoPinterest,
  BiLogoTwitter,
  BiLogoFacebook,
} from 'react-icons/bi';

import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <h2>The Daily Bee Newsletter</h2>
      <p>
        Join 225,000 subscribers who start their day with Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Nihil, odio!
      </p>
      <input type='text' placeholder='Email address' />
      <button>JOIN</button>
      <nav>
        <NavLink to={'/shops'}>ABOUT</NavLink>
        <NavLink to={'/shops'}>ADVERTISE</NavLink>
        <NavLink to={'/shops'}>PRIVACY POLICY</NavLink>
        <NavLink to={'/shops'}>TERMS</NavLink>
        <NavLink to={'/register'}>JOIN US</NavLink>
      </nav>
      <ul>
        <li>
          <BiLogoInstagram />
        </li>
        <li>
          <BiLogoPinterest />
        </li>
        <li>
          <BiLogoTwitter />
        </li>
        <li>
          <BiLogoFacebook />
        </li>
      </ul>
    </footer>
  );
}
