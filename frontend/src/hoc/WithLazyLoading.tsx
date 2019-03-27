import Loadable from 'react-loadable';

import Spinner from '../components/ui/Spinner/Spinner';

export default (loader: any) => Loadable({
  loader,
  loading: Spinner,
  delay: 2000
});