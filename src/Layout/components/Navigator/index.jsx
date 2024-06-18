import React, { useContext, useState } from 'react';
import styles from './styles.module.css';
import logo from '../../../../public/logo.svg';
import { DataContext } from '../../../context/folderContext';
import { getIconForFolder, getIconForOpenFolder } from 'vscode-icons-js';

function Navigator() {
  const [activeFolder, setActiveFolder] = useState(null);
  const { path, setPath, data, loading } = useContext(DataContext);
  const iconURI =
    'https://dderevjanik.github.io/vscode-icons-js-example/icons/';

  if (loading) return <p>Loading...</p>;

  const { dirNames } = data;

  const handOpenFile = (f) => {
    if (!path.includes(f)) setPath([f]);
    setActiveFolder(f);
  };

  return (
    <div className={styles.mainNvigator}>
      <header>
        <div>
          <img src={logo} alt='' />
        </div>
        <h1>Drive</h1>
      </header>
      <ul>
        {dirNames &&
          dirNames?.map((f) => (
            <li
              className={`${styles.folderLi} ${
                activeFolder === f ? styles.isActive : ''
              }`}
              key={f}
              onClick={() => handOpenFile(f)}>
              {activeFolder === f ? (
                <img
                  src={iconURI + getIconForOpenFolder(f)}
                  alt='file'
                  width='24'
                />
              ) : (
                <img
                  src={iconURI + getIconForFolder(f)}
                  alt='file'
                  width='24'
                />
              )}
              {f}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Navigator;
