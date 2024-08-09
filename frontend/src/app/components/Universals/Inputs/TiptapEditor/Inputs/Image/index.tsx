import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import ImageKitInput from '../../../Imagekit';
import ImageLink from '../../../ImageLink';

const DynamicTabs = ({ onSubmit }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={activeTab} onChange={handleChange}>
        <Tab label="ImageKit" />
        <Tab label="Image Link" />
      </Tabs>
      {activeTab === 0 ? (
        <ImageKitInput
          onSuccess={onSubmit}
          onError={err => window.alert('Something went wrong: ' + err)}
        />
      ) : (
        <ImageLink onSubmit={onSubmit} />
      )}
    </Box>
  );
};

export default DynamicTabs;
