import React, { useContext, useState } from 'react';
import styles from './styles.module.css';
import { DataContext } from '../../../context/folderContext';
import UploadFile from '../UploadFile';
import CreateDir from '../CreateDir';

function Modal() {
  const { path, isOpenModal, setIsOpenModal } = useContext(DataContext);

  console.log(path);

  switch (isOpenModal) {
    case 'new-file':
      return (
        <div className={styles.modal}>
          <UploadFile closeModal={setIsOpenModal} />
        </div>
      );
    case 'folder':
      return (
        <div className={styles.modal}>
          <CreateDir closeModal={setIsOpenModal} />
        </div>
      );
    default:
      return <p>Loading...</p>;
  }
}

export default Modal;
