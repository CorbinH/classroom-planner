import { render, screen } from '@test-utils';
import { NavbarSimple } from './NavbarSimple';
import { StudentIcon } from '@phosphor-icons/react';
import { MemoryRouter } from 'react-router';
import { Router } from 'react-router';

const data = [
  { link: '/', label: 'Students', icon: StudentIcon },
];

describe('NavbarSimple', () => {
  it('renders correctly', () => {
    render(<NavbarSimple/>);
  });
  it('child items are rendered', () => {
    render(<MemoryRouter><NavbarSimple data = {data}/></MemoryRouter>);
    expect(screen.getByTestId(data[0].label)).toHaveAttribute(
      'href',
      data[0].link
    );
  });
});