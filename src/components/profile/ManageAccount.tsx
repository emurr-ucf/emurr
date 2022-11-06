import Modal from 'react-bootstrap/Modal'
import { useState } from "react";
import { ProfileCard } from './ProfileCard';
import { urlLocalPath } from '../../lib/urlPath';

export const ManageAccount = () => {
	const isProd = process.env.NODE_ENV === 'production';

	const [password, setPassword] = useState("");

	const [ show, setShow ] = useState( false );
	const handleShow = () => setShow( true );
	const handleClose = () => setShow( false );
	const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const res = await fetch('/api/user/user', {
			method: "DELETE",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				password,
			})
		});

		const json = await res.json();
		if (json.error) {
			alert(json.error); // TODO improve interface
		}
		else {
			alert("Your account has been deleted!"); // TODO improve interface
			setShow(false);
			// TODO sign out
		}
	}

	return (
		<>
			<ProfileCard image={ `${urlLocalPath}/images/profile/write.svg` } title="Manage account" description="Edit or delete your account" onClick={ handleShow } />
			<Modal show={ show } onHide={ handleClose }>
				<Modal.Header closeButton>
					<Modal.Title>Manage account</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSave}>
						<div className="flex flex-col gap-6">
							<input
								type="password"
								placeholder='Verify your password'
								className="h-12 appearance-none border border-brown rounded px-3"
								onChange={(e) => setPassword(e.target.value)}
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