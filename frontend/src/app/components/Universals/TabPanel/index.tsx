import * as React from 'react';
import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
  '& .MuiTab-root': {
    color: '#000',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 500,
    marginRight: '24px',
    '&:hover': {
      color: '#1890ff',
    },
    '&.Mui-selected': {
      color: '#1890ff',
    },
  },
});

const DynamicTabs = ({ tabsInfo }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <StyledTabs value={activeTab} onChange={handleChange}>
        {tabsInfo.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </StyledTabs>
      {tabsInfo[activeTab]?.component}
    </Box>
  );
};

export default DynamicTabs;
