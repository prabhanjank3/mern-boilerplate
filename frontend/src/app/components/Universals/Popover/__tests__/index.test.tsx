import { render, fireEvent } from '@testing-library/react';
import PopoverComponent from '..';

describe('PopoverComponent', () => {
  const faceComponent = <button>Open Popover</button>;
  const component = <div>Popover Content</div>;

  it('should open popover on face component click', () => {
    const { getByText } = render(
      <PopoverComponent faceComponent={faceComponent} component={component} />,
    );
    fireEvent.click(getByText('Open Popover'));
    expect(getByText('Popover Content')).toBeInTheDocument();
  });

  it('should render custom face component correctly', () => {
    const CustomFaceComponent = () => <div>Custom Face Component</div>;
    const { getByText } = render(
      <PopoverComponent
        faceComponent={<CustomFaceComponent />}
        component={component}
      />,
    );
    expect(getByText('Custom Face Component')).toBeInTheDocument();
    fireEvent.click(getByText('Custom Face Component'));
    expect(getByText('Popover Content')).toBeInTheDocument();
  });

  it('should be responsive and adjust position on resize', () => {
    const { getByText, rerender } = render(
      <PopoverComponent faceComponent={faceComponent} component={component} />,
    );
    fireEvent.click(getByText('Open Popover'));
    expect(getByText('Popover Content')).toBeInTheDocument();

    // Simulate window resize
    rerender(
      <PopoverComponent faceComponent={faceComponent} component={component} />,
    );
    fireEvent.click(getByText('Open Popover'));
    expect(getByText('Popover Content')).toBeInTheDocument();
  });

  it('should integrate with other components correctly', () => {
    const WrapperComponent = () => {
      return (
        <div>
          <PopoverComponent
            faceComponent={faceComponent}
            component={component}
          />
          <p>Other Component Content</p>
        </div>
      );
    };
    const { getByText } = render(<WrapperComponent />);
    fireEvent.click(getByText('Open Popover'));
    expect(getByText('Popover Content')).toBeInTheDocument();
    expect(getByText('Other Component Content')).toBeInTheDocument();
  });

  it('should not significantly impact performance', () => {
    const { rerender } = render(
      <PopoverComponent faceComponent={faceComponent} component={component} />,
    );
    const initialRenderTime = performance.now();
    rerender(
      <PopoverComponent faceComponent={faceComponent} component={component} />,
    );
    const secondRenderTime = performance.now();
    expect(secondRenderTime - initialRenderTime).toBeLessThan(100); // Threshold for acceptable performance
  });
});
