import React, { useContext, useState } from 'react';
import styles from './styles.module.css';
import { MdOutlineDriveFolderUpload } from 'react-icons/md';

import { DataContext } from '../../../context/folderContext';
function CreateDir({ closeModal }) {
  const [folderName, setFolderName] = useState('');
  const { path, setPath, setOptions } = useContext(DataContext);

  const handleNewFolder = (e) => {
    e.preventDefault();
    setOptions({ method: 'post', data: { path, folderName } });
    const [...pathClone] = path;
    closeModal(null);
    setPath([...pathClone]);
  };
  const handleClose = () => {
    closeModal(null);
  };

  return (
    <div className={styles.create_folder}>
      <form onSubmit={handleNewFolder}>
        <span>
          <label htmlFor='input'>
            <MdOutlineDriveFolderUpload /> New Folder
          </label>
          <input
            type='text'
            id='input'
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder='Enter folder name'
          />
        </span>
        <button type='submit'>submit</button>
        <button onClick={handleClose}>Cancle</button>
      </form>
    </div>
  );
}

export default CreateDir;
