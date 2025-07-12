import React from 'react';

import { HeartFilled } from '@ant-design/icons';
import { Button } from 'antd';

const SaveButton = ({ isSaved, onToggleSave, className }) => {
  return (
    <Button
      type="text"
      icon={
        isSaved ? (
          <HeartFilled className="text-red-500 transition-transform hover:scale-110" style={{ fontSize: 30 }} />
        ) : (
          <HeartFilled
            className="text-white transition-all hover:scale-110 hover:text-red-500"
            style={{ fontSize: 30 }}
          />
        )
      }
      onClick={onToggleSave}
      className={className}
    />
  );
};

export default SaveButton;
