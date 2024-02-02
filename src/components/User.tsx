import { useState } from 'react';
import '../styles/User.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function User({ userName }: any): JSX.Element {
  const [avatarColor] = useState([
    '#0079bf',
    '#d29034',
    '#519839',
    '#b05632',
    '#89609e',
    '#cd5a91',
    '#4bbf6b',
    '#00aecc',
    '#838c91',
    '#ffa07a',
  ]);

  const getRandomIndex = (): number => Math.floor(Math.random() * avatarColor.length);

  return (
    <div className="user__container">
      <div className="user__avatar" style={{ backgroundColor: avatarColor[getRandomIndex()] }} />
      <div className="user__name">
        <p>{userName}</p>
      </div>
    </div>
  );
}
