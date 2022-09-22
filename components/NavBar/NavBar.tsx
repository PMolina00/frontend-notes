import React from 'react';
import { GrAdd } from 'react-icons/gr';
import styles from './styles/NavBar.module.css';

export interface NavBarInterface {
	setOpenClose: any
}

const NavBar: React.FC<NavBarInterface> = ({ setOpenClose }) => {
	const handleOnClick = (): void => {
		setOpenClose()
	}
	return (
		<div className={styles.NavBar}>
			<button className={styles.ButtonNav} onClick={handleOnClick}><GrAdd /> add Note</button>
		</div>
	);
};


export default NavBar;

