import * as React from 'react';
import { render } from '@testing-library/react';

import Default from '..';

describe('<Default  />', () => {
  it.skip('should match snapshot', () => {
    const loadingIndicator = render(<Default />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
