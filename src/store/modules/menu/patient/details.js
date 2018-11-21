import lazyLoading from '../lazyLoading';

export default {
  name: 'Patient Details',
  path: '/',
  component: lazyLoading('dashboard/index'),
  required: ['patient'],
  meta: {
    required: ['patient'],
    icon: 'fa-bars',
    expanded: false
  }
};
