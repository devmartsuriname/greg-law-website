import type SimpleBarCore from 'simplebar-core';
import SimpleBar, { type Props } from 'simplebar-react';
import { ReactNode } from 'react';

type SimplebarReactClientProps = Props & {
  children: ReactNode;
};

const SimplebarReactClient = ({ children, ...options }: SimplebarReactClientProps) => {
  return <SimpleBar {...options}>{children}</SimpleBar>;
};

export default SimplebarReactClient;
