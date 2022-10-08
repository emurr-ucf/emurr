import Modal from 'react-bootstrap/Modal'
import { useState } from "react";
import { Box } from '../Box';

export const EditLogin = () => {
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
	    <Box image="/images/profile/mail.svg" title="Edit email" description="Edit your login email" action="" onClick={handleShow} />
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit email</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<form onSubmit={handleSave}>
				<div className="flex flex-col gap-6">
					<input 
						type="text"
						placeholder='Email'
						className="h-12 appearance-none border border-brown rounded px-3"
					/>
					<input
						type="password"
						placeholder='Verify your password'
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