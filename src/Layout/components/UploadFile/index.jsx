import React, { useContext } from 'react';
import styles from './styles.module.css';
import { DataContext } from '../../../context/folderContext';
import { MdUploadFile } from 'react-icons/md';
import axios from 'axios';
function UploadFile({ closeModal }) {
  const { path, setPath } = useContext(DataContext);

  const handleUpload = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    fd.append('filePath', path);
    const response = await axios.post(
      `http://localhost:1967/driver/uploads`,
      fd,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    const pathClone = [...path];
    setPath(pathClone);
    closeModal(null);
  };

  const handleClose = () => {
    closeModal(null);
  };

  return (
    <div className={styles.upload}>
      <form onSubmit={handleUpload}>
        <span>
          <input
            type='file'
            name='fileName'
            id='file'
            class={styles.input_file}
          />
          <label for='file'>
            <MdUploadFile /> Choose a file
          </label>
        </span>

        <button type='submit'>submit</button>
        <button onClick={handleClose}>Cancel</button>
      </form>
    </div>
  );
}

export default UploadFile;
