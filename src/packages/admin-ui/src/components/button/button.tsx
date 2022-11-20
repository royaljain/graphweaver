import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

const DropdownItems = ({ items }: { items: Array<object> }) => (
	<>
		{items.map((item: any) => (
			<li key={Math.random()}>
				<a href={item.href}>{item.name}</a>
			</li>
		))}
	</>
);

export const Dropdown = ({
	showDropdown,
	dropdownItems,
	onOutsideClick,
	getParent,
}: {
	showDropdown: boolean;
	dropdownItems: Array<object>;
	onOutsideClick: any;
	getParent: () => any;
}) => {
	function useOutsideAlerter(ref: any) {
		useEffect(() => {
			function handleClickOutside(e: Event) {
				if (e.target === getParent().current) {
					return;
				}

				if (ref.current && !ref.current.contains(e.target)) {
					onOutsideClick();
				}
			}
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [ref]);
	}

	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);

	return showDropdown ? (
		<ul ref={wrapperRef} className={showDropdown ? styles.dropdown : styles.hide}>
			<DropdownItems items={dropdownItems} />
		</ul>
	) : null;
};

export const Button = ({
	handleClick = () => null,
	children,
	iconBefore,
	iconAfter,
	dropdown = false,
	dropdownItems = [{ name: 'Add links array', href: 'some_url' }],
}: {
	handleClick?: () => any;
	children: JSX.Element | string;
	iconBefore?: JSX.Element;
	iconAfter?: JSX.Element;
	dropdown?: boolean;
	dropdownItems?: Array<object>;
}) => {
	const [showDropdown, setShowDropdown] = useState(false);

	function handleLocalClick() {
		return dropdown ? setShowDropdown(!showDropdown) : false;
	}

	function hasDropdown() {
		if (dropdown) {
			return (
				<Dropdown
					onOutsideClick={() => setShowDropdown(false)}
					getParent={getParent}
					showDropdown={showDropdown}
					dropdownItems={dropdownItems}
				/>
			);
		}
	}

	// To refer to when clicking outside dropdown
	const parentRef = useRef(null);
	function getParent() {
		return parentRef;
	}

	return (
		<button ref={parentRef} onClick={handleLocalClick} className={styles.button} type="button">
			{iconBefore}
			{children}
			{iconAfter}
			{hasDropdown()}
		</button>
	);
};
