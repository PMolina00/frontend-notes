import React from 'react';
import { BiWindowClose } from 'react-icons/bi';
import styles from './styles/Modal.module.css';

export interface ModalInterface {
	children: JSX.Element,
	setOpenClose: any
}

const Modal: React.FC<ModalInterface> = ({ children, setOpenClose }) => {
	const handleOnClick = (): void => {
		setOpenClose()
	}
	return (
		<div className={styles.Modal} onClick={handleOnClick}>
			<div className={styles.ModalContent} onClick={e => e.stopPropagation()}>
				<button onClick={handleOnClick} className={styles.closeButton}><BiWindowClose /></button>
				{children}
			</div>
		</div>
	);
};

export default Modal;

