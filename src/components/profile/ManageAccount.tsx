import Modal from 'react-bootstrap/Modal'
import { useState } from "react";
import { Box } from '../Box';

export const ManageAccount = () => {
	const [ show, setShow ] = useState( false );
	const handleShow = () => setShow( true );
	const handleClose = () => setShow( false );
	const handleSave = () => {
		// TODO make a request and show response
		alert( "Submitted" );
		setShow( false );
	}

	const isProd = process.env.NODE_ENV === 'production';

	return (
		<>
			<Box image={ `${ isProd ? "/emurr/images/key.png" : "/images/key.png" } ` } title="Manage account" description="Edit or delete your account" action="" onClick={ handleShow } />
			<Modal show={ show } onHide={ handleClose }>
				<Modal.Header closeButton>
					<Modal.Title>Manage account</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={ handleSave }>
						<div className="flex flex-col gap-6">
							<input
								type="password"
								placeholder='Verify your password'
								className="h-12 appearance-none border border-brown rounded px-3"
							/>
							<div className="flex justify-center">
								<button
									type="submit"
									className="py-3 px-4 w-3/4 shadow-sm text-sm font-medium rounded-md text-background-200 bg-red-700 hover:bg-red-800"
								>
									Delete account
								</button>
							</div>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
}