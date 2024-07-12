import * as React from 'react';
import { render } from '@testing-library/react';

import { Dummy } from '..';

describe('<Dummy  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Dummy />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
