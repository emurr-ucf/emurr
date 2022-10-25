import Modal from 'react-bootstrap/Modal'
import { useState } from "react";
import { Box } from '../Box';

export const EditProfile = () => {
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
			<Box image={ `${ isProd ? "/emurr/images/key.png" : "/images/key.png" } ` } title="Edit profile" description="Edit your profile information, such as your name and profile picture" action="" onClick={ handleShow } />
			<Modal show={ show } onHide={ handleClose }>
				<Modal.Header closeButton>
					<Modal.Title>Edit profile</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={ handleSave }>
						<div className="flex flex-col gap-6">
							<label htmlFor="pfp">
								<div className='filter hover:contrast-200 m-auto' style={ {
									backgroundImage: "url('/images/default-user.png')",
									backgroundSize: "128px 128px",
									height: 128,
									width: 128
								} }>
								</div>
							</label>
							<input id="pfp" type="file" className="hidden" />

							<input
								type="text"
								placeholder='First name'
								className="h-12 appearance-none border border-brown rounded px-3"
							/>
							<input
								type="text"
								placeholder='Last name'
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