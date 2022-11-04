import Modal from 'react-bootstrap/Modal'
import { useState } from "react";
import { ProfileCard } from './ProfileCard';
import { useSession } from 'next-auth/react';
import { urlLocalPath } from '../../lib/urlPath';

export const EditProfile = () => {
	const { data: session, status } = useSession();
	const isProd = process.env.NODE_ENV === 'production';

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	
	const handleShow = async () => {
		setShow(true);

		// TODO consider loading screen while awaiting api call
		// TODO consider making lastName information part of session information
		const res = await fetch('/api/user', {
			method: "GET",
		})
		const json = await res.json();

		if (json.error) {
			alert(json.error);
			return;
		}

		setFirstName(json.firstName || "");
		setLastName(json.lastName || "");
	};

	const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const res = await fetch('/api/user', {
			method: "PUT",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				firstName,
				lastName,
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
	    <ProfileCard image={ `${urlLocalPath}/images/profile/profile.svg` } title="Edit profile" description="Edit your profile information, such as your name and profile picture" onClick={handleShow} />
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit profile</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<form onSubmit={handleSave}>
				<div className="flex flex-col gap-6">
					<label htmlFor="pfp">
						<div className='filter hover:contrast-200 m-auto' style={{
							backgroundImage: "url('/images/default-user.png')",
							backgroundSize: "128px 128px",
							height: 128,
							width: 128
						}}>
						</div>
					</label>
					<input id="pfp" type="file" className="hidden" />

					<input 
						type="text"
						placeholder='First name'
						defaultValue={firstName}
						className="h-12 appearance-none border border-brown rounded px-3"
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<input 
						type="text"
						placeholder='Last name'
						defaultValue={lastName}
						className="h-12 appearance-none border border-brown rounded px-3"
						onChange={(e) => setLastName(e.target.value)}
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