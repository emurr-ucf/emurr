import Modal from 'react-bootstrap/Modal'
import { useState } from "react";
import { ProfileCard } from './ProfileCard';

export const EditPassword = () => {
	const isProd = process.env.NODE_ENV === 'production';

	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [ show, setShow ] = useState( false );
	const handleShow = () => setShow( true );
	const handleClose = () => setShow( false );
	const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const res = await fetch('/api/resetPassword', {
			method: "PUT",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				currentPassword,
				newPassword,
				confirmPassword,
			})
		});

		const json = await res.json();
		if (json.error) {
			alert(json.error); // TODO improve interface
		}
		else {
			alert("Updated!"); // TODO improve interface
			setShow(false);
		}
	}

	return (
		<>
			<ProfileCard image={ isProd ? "/emurr/images/profile/shield.svg" : "/images/profile/shield.svg" } title="Edit password" description="Edit your login password" onClick={ handleShow } />
			<Modal show={ show } onHide={ handleClose }>
				<Modal.Header closeButton>
					<Modal.Title>Edit password</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={ handleSave }>
						<div className="flex flex-col gap-6">
							<input
								type="password"
								placeholder='Current password'
								className="h-12 appearance-none border border-brown rounded px-3"
								onChange={(e) => setCurrentPassword(e.target.value)}
							/>
							<input
								type="password"
								placeholder='New password'
								className="h-12 appearance-none border border-brown rounded px-3"
								onChange={(e) => setNewPassword(e.target.value)}
							/>
							<input
								type="password"
								placeholder='Confirm new password'
								className="h-12 appearance-none border border-brown rounded px-3"
								onChange={(e) => setConfirmPassword(e.target.value)}
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