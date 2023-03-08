import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { ExitIcon } from '../assets';

import styles from './styles.module.css';

export interface ModalProps {
	isOpen: boolean;
	onRequestClose?: () => void;
	className: string;
	title: string | React.ReactElement;
	modalContent?: React.ReactElement;
	footerContent?: React.ReactElement;
	hideCloseX?: boolean;
	fullScreen?: boolean;
	shouldCloseOnOverlayClick?: boolean;
	shouldCloseOnEsc?: boolean;
}

export const Modal = ({
	isOpen,
	onRequestClose,
	className,
	title,
	modalContent,
	footerContent,
	hideCloseX = false,
	fullScreen,
	shouldCloseOnOverlayClick = false,
	shouldCloseOnEsc = false,
}: ModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);

	function handleMouseDownEvent(event: DocumentEventMap['mousedown']) {
		// No ref or target to compare? Return with no action
		if (!modalRef?.current || !event.target) {
			return;
		}

		// Target of the click is the button,return with no action.
		// @todo check children as well?
		if (modalRef.current.contains(event.target as Node)) {
			return;
		}

		// Otherwise, click was outside the element, check props and trigger event.
		if (shouldCloseOnOverlayClick) onRequestClose?.();
	}

	useEffect(() => {
		const handleEsc = (event: DocumentEventMap['keydown']) => {
			if (event.key === 'Escape' && shouldCloseOnEsc) {
				onRequestClose?.();
			}
		};
		// Register mousedown listeners to capture outside click
		document.addEventListener('mousedown', handleMouseDownEvent);
		document.addEventListener('keydown', handleEsc);
		return () => {
			document.removeEventListener('mousedown', handleMouseDownEvent);
			document.removeEventListener('keydown', handleEsc);
		};
	}, []);

	return (
		<>
			{isOpen && (
				<div className={styles.overlay}>
					<div
						ref={modalRef}
						className={classNames(className || [styles.wrapper, fullScreen && styles.fullScreen])}
					>
						<div className={styles.content}>
							<div className={styles.headerWrapper}>
								<div className={styles.header}>
									{hideCloseX ? null : (
										<div className={styles.iconContainer}>
											<ExitIcon className={styles.closeIcon} onClick={onRequestClose} />
										</div>
									)}
									<div className={styles.title}>{title}</div>
								</div>
							</div>
							{modalContent && <div className={styles.contentWrapper}>{modalContent}</div>}
							{footerContent && <div className={styles.footerWrapper}>{footerContent}</div>}
						</div>
					</div>
				</div>
			)}
		</>
	);
};