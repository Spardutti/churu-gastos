import { Tab as Tabs, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { ReactNode } from 'react';

interface TabProps {
  headers: string[];
  tabs: ReactNode[];
}

const Tab = ({ tabs, headers }: TabProps) => {
  return (
    <TabGroup>
      <TabList className={'flex  '}>
        {headers.map((header) => (
          <Tabs
            className={'data-[selected]:bg-main-primary px-2 py-1 rounded-t-md bg-main-secondary outline-none'}
            key={header}
          >
            {header}
          </Tabs>
        ))}
      </TabList>

      <TabPanels>
        {tabs.map((tab, index) => (
          <TabPanel key={index}>{tab}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default Tab;
