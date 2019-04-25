import React from 'react';
import moment from 'moment';

import './ExplorerBlockCardTime.scss';

// This component is a Card that represents a Block.
const ExplorerBlockCardTime = ({ timestamp }: { timestamp: number }) => {

  // This state hook holds the milliseconds since mined
  const [milliSinceLastMined, setmilliSinceLastMined] = React.useState('0s');

  // If a real Block object is passed as a prop, then
  // This will parse the timestamp diff in `#m #s`
  const updateTimeElapsed = () => {
    if (timestamp) {
      const lastMined = moment(timestamp * 1000);
      const minutes = moment().diff(lastMined, 'minutes');
      const seconds = moment().diff(lastMined, 'seconds');
      const elapsed = minutes
        ? `${minutes}m ${seconds - minutes * 60}s`
        : `${seconds}s`;

      setmilliSinceLastMined(elapsed);
    }
  };

  // This will launch the first time the card receives a real timestamp
  // It updates the "mined #m #s ago" text
  React.useEffect(() => {
    updateTimeElapsed();
    const updateSeconds = setInterval(updateTimeElapsed, 1000);
    return () => clearInterval(updateSeconds);
  }, []);

  return (
    <span className="explorerblockcardtime-container">
      mined {milliSinceLastMined} ago
    </span>
  );
};

export default ExplorerBlockCardTime;
