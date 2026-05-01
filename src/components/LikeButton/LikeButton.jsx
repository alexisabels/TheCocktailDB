/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import useLikes from '../../hooks/useLikes';
import './LikeButton.css';

function HeartIcon({ filled }) {
  return (
    <svg
      className="like-button__icon"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 20.6s-7.6-4.6-9.6-9.3C1.1 8.1 3 4.8 6.2 4.8c2 0 3.4 1 4.4 2.5l1.4 2.1 1.4-2.1c1-1.5 2.4-2.5 4.4-2.5 3.2 0 5.1 3.3 3.8 6.5C19.6 16 12 20.6 12 20.6Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LikeButton({
  drinkId,
  drinkName,
  variant = 'card',
}) {
  const { isLiked, toggleLike } = useLikes();
  const liked = isLiked(drinkId);
  const [pulse, setPulse] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const becameLiked = toggleLike(drinkId);
    if (becameLiked) {
      setPulse(true);
      window.setTimeout(() => setPulse(false), 450);
    }
  };

  const label = liked
    ? `Remove ${drinkName} from your favorites`
    : `Save ${drinkName} to your favorites`;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={label}
      title={liked ? 'Saved to your favorites' : 'Save to your favorites'}
      className={[
        'like-button',
        `like-button--${variant}`,
        liked ? 'is-liked' : '',
        pulse ? 'is-pulsing' : '',
      ].filter(Boolean).join(' ')}
    >
      <HeartIcon filled={liked} />
    </button>
  );
}
