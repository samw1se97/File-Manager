import React, { useContext, useState } from 'react';
import { DataContext } from '../../../context/folderContext';
import styles from './styles.module.css';
import { MdOutlineFileDownload } from 'react-icons/md';
import { getIconForFile } from 'vscode-icons-js';
import { SlOptionsVertical } from 'react-icons/sl';
import { MdOutlineDeleteOutline } from 'react-icons/md';

import axios from 'axios';
import FileSaver from 'file-saver';

function File({ fileName }) {
  const [openMenu, setOpenMenu] = useState(false);
  const { path, setPath } = useContext(DataContext);
  const clonePath = [...path];
  const targetPath = `${path.join('/')}/${fileName}`;
  const iconFileName = getIconForFile(fileName);
  const iconURI =
    'https://dderevjanik.github.io/vscode-icons-js-example/icons/';

  const handleDownload = async () => {
    try {
      const res = await axios.get(`http://localhost:1967/driver/download`, {
        params: { path: targetPath },
        responseType: 'blob',
      });
      FileSaver.saveAs(new Blob([res.data]), fileName);
    } catch (error) {
      console.log(error);
    } finally {
      setOpenMenu(!openMenu);
      setPath(clonePath);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:1967/driver/delete`, {
        data: {
          path: targetPath,
          type: 'file',
        },
      });
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
    <div className={styles.file_box}>
      <img src={iconURI + iconFileName} alt='file' width='36' />

      <ul className={openMenu ? styles.menu : ''}>
        <li
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}>
          <MdOutlineFileDownload /> download
        </li>
        <li
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}>
          <MdOutlineDeleteOutline />
          delete
        </li>
      </ul>
      <p>{fileName}</p>

      <span>
        <SlOptionsVertical onClick={handleCtxMenu} size={16} />
      </span>
    </div>
  );
}

export default File;
