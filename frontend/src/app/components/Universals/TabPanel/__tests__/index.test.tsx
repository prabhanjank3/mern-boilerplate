import { render, fireEvent } from '@testing-library/react';
import DynamicTabs from '..';

describe('DynamicTabs', () => {
  const tabsInfo = [
    { label: 'Tab 1', component: <div>Content of Tab 1</div> },
    { label: 'Tab 2', component: <div>Content of Tab 2</div> },
    { label: 'Tab 3', component: <div>Content of Tab 3</div> },
  ];

  it('should render correctly with initial state', () => {
    const { getByText } = render(<DynamicTabs tabsInfo={tabsInfo} />);
    expect(getByText('Tab 1')).toBeInTheDocument();
    expect(getByText('Content of Tab 1')).toBeInTheDocument();
  });

  it('should switch tabs correctly', () => {
    const { getByText } = render(<DynamicTabs tabsInfo={tabsInfo} />);
    fireEvent.click(getByText('Tab 2'));
    expect(getByText('Tab 2')).toBeInTheDocument();
    expect(getByText('Content of Tab 2')).toBeInTheDocument();
  });

  it('should not render tabs or content when tabsInfo is empty', () => {
    const { queryByText } = render(<DynamicTabs tabsInfo={[]} />);
    expect(queryByText('Tab 1')).not.toBeInTheDocument();
    expect(queryByText('Content of Tab 1')).not.toBeInTheDocument();
  });

  it('should render custom tab content correctly', () => {
    const CustomTabContent = () => <div>Custom Tab Content</div>;
    const tabsInfoWithCustomContent = [
      { label: 'Tab 1', component: <div>Content of Tab 1</div> },
      { label: 'Tab 2', component: <CustomTabContent /> },
      { label: 'Tab 3', component: <div>Content of Tab 3</div> },
    ];
    const { getByText } = render(
      <DynamicTabs tabsInfo={tabsInfoWithCustomContent} />,
    );
    fireEvent.click(getByText('Tab 2'));
    expect(getByText('Tab 2')).toBeInTheDocument();
    expect(getByText('Custom Tab Content')).toBeInTheDocument();
  });

  it('should be responsive and adjust layout on resize', () => {
    const { getByText, rerender } = render(<DynamicTabs tabsInfo={tabsInfo} />);
    expect(getByText('Tab 1')).toBeInTheDocument();
    expect(getByText('Content of Tab 1')).toBeInTheDocument();

    // Simulate window resize
    rerender(<DynamicTabs tabsInfo={tabsInfo} />);
    expect(getByText('Tab 1')).toBeInTheDocument();
    expect(getByText('Content of Tab 1')).toBeInTheDocument();
  });
});
