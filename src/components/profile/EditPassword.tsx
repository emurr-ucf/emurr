import Modal from 'react-bootstrap/Modal'
import { useState } from "react";
import { Box } from '../Box';
import { urlLocalPath } from '../../lib/urlPath';

export const EditPassword = () => {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	const handleSave = () => {
		// TODO make a request and show response
		alert("Submitted");
		setShow(false);
	}

	return (
		<>
			<Box image={`${urlLocalPath}/images/key.png`} title="Edit password" description="Edit your login password" action="" onClick={handleShow} />
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit password</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSave}>
						<div className="flex flex-col gap-6">
							<input
								type="password"
								placeholder='Current password'
								className="h-12 appearance-none border border-brown rounded px-3"
							/>
							<input
								type="password"
								placeholder='New password'
								className="h-12 appearance-none border border-brown rounded px-3"
							/>
							<input
								type="password"
								placeholder='Confirm new password'
								className="h-12 appearance-none border border-brown rounded px-3"
							/>
							<div className="flex justify-center">
								<button
									type="submit"
									className="py-3 px-4 w-3/4 shadow-sm text-sm font-medium rounded-md text-background-200 bg-green-700 hover:bg-green-800"
								>
									Save
								</button>
							</div>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
}