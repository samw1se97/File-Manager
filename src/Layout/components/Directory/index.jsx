import React, { useContext, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { SlOptionsVertical } from 'react-icons/sl';
import { getIconForFolder } from 'vscode-icons-js';
import { DataContext } from '../../../context/folderContext';
import axios from 'axios';

function Directory({ folderName }) {
  const { path, setPath } = useContext(DataContext);
  const [openMenu, setOpenMenu] = useState(false);
  const clonePath = [...path];
  const deletePath = `${path.join('/')}/${folderName}`;
  const folderIcon = getIconForFolder(folderName);
  const iconURI =
    'https://dderevjanik.github.io/vscode-icons-js-example/icons/';
  const handleDeleteDir = async () => {
    // const clonePath = [...path];
    // const deletePath = `${path.join('/')}/${folderName}`;
    try {
      const res = await axios.delete(`http://localhost:1967/driver/delete`, {
        data: {
          path: deletePath,
          type: 'folder',
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setOpenMenu(!openMenu);
      setPath(clonePath);
    }
  };

  const handleCtxMenu = (e) => {
    e.stopPropagation();
    setOpenMenu(!openMenu);
  };

  return (
    <div
      className={styles.folder_box}
      onClick={() =>
        !path.includes(folderName) && setPath([...path, folderName])
      }>
      <img src={iconURI + folderIcon} alt='file' width='36' />
      <p>{folderName}</p>
      <span>
        <SlOptionsVertical onClick={handleCtxMenu} size={16} />
        <ul className={openMenu ? styles.menu : ''}>
          <li
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteDir();
            }}>
            delete
          </li>
        </ul>{' '}
      </span>{' '}
    </div>
  );
}
// SlOptionsVertical
export default Directory;
