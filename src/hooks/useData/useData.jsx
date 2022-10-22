import {useContext} from 'react';
import { DataContext} from '../../contexts/DataContext/DataProvider';


const useData = () => {
  return useContext(DataContext);
}

export default useData;