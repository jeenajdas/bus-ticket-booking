import axiosInstance from '../../services/axiosInstance';

export const getTotalCollectionByDate = async () => {
  const res = await axiosInstance.get('/admin/reports/total-collection');
  return res.data;
};

export const getCollectionByBus = async () => {
  const res = await axiosInstance.get('/admin/reports/collection-by-bus');
  return res.data;
};
