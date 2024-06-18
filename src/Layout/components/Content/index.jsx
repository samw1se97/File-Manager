import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Navigator from '../Navigator';
import Folder from '../Folder';
import Modal from '../Modal';
import { DataContext } from '../../../context/folderContext';
import useFetch from '../../../hooks/useFetch';

function Content() {
  const [url, setUrl] = useState('');
  const [path, setPath] = useState([]);
  const [options, setOptions] = useState({});
  const { data, loading } = useFetch(url, options);
  const [isOpenModal, setIsOpenModal] = useState(null);

  console.log('Content printing path ===>', path);
  useEffect(() => {
    setUrl('http://localhost:1967/driver');
    console.log('///////////////// component did mount /////////////////');

    if (path.length > 0) {
      const pathStr = path.join('/');
      console.log(`${pathStr}`);
      setOptions({ params: { path } });
    }
  }, [path]);

  return (
    <div className={styles.mainContent}>
      <DataContext.Provider
        value={{
          url,
          setUrl,
          path,
          setPath,
          data,
          loading,
          options,
          setOptions,
          isOpenModal,
          setIsOpenModal,
        }}>
        <Navigator />

        {path.length > 0 && <Folder />}

        {isOpenModal && <Modal />}
      </DataContext.Provider>
    </div>
  );
}

export default Content;
