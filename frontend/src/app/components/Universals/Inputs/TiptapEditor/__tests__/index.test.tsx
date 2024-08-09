import * as React from 'react';
import { render } from '@testing-library/react';

import Tiptap from '..';
describe('<TiptapEditor  />', () => {
  it('should match snapshot', () => {
    const Editor = render(<Tiptap />);
    expect(Editor).toMatchSnapshot();
  });
});
