import React, { useContext } from 'react';
import styles from './styles.module.css';
import Directory from '../Directory';
import File from '../File';
import { DataContext } from '../../../context/folderContext';

function Folder() {
  const { path, setPath, data, loading, setIsOpenModal } =
    useContext(DataContext);

  if (loading) return <p>Loading...</p>;

  const { result } = data;
  console.log(result);

  const handleCreateFolder = (e) => {
    console.log(e.target.name);
    setIsOpenModal(e.target.name);
  };

  const hadleUpload = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    setIsOpenModal(e.target.name);
  };

  const handleOnclickPath = (p) => {
    const index = path.findIndex((el) => el === p);
    const clonePath = path.slice(0, index + 1);
    setPath(clonePath);
  };

  return (
    <div className={styles.main_content}>
      <header>
        <ul>
          {path &&
            path?.map((p) => (
              <li onClick={() => handleOnclickPath(p)}>{p}/</li>
            ))}
        </ul>
      </header>

      <div className={styles.main_files}>
        {result &&
          result.folders?.map((folderName) => (
            <Directory folderName={folderName}></Directory>
          ))}

        {result &&
          result.files?.map((fileName) => (
            <File key={fileName} fileName={fileName} />
          ))}
      </div>

      <div className={styles.bottom_container}>
        <button name='new-file' onClick={hadleUpload}>
          {/* <FiUpload name='new-file' onClick={hadleUpload} /> */}
          Upload file
        </button>
        <button name='folder' onClick={handleCreateFolder}>
          create folder
        </button>
      </div>
    </div>
  );
}

export default Folder;
