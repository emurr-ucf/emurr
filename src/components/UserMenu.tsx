import { signOut, useSession } from "next-auth/react";
import { Dropdown } from 'react-bootstrap';

export const UserMenu = () => {
	const { data: session, status } = useSession();
	
	return (
		<Dropdown>
			<Dropdown.Toggle as="img"
				src={session?.user.image || "images/google.png"}
				className="w-7 h-7 rounded-full cursor-pointer"
			/>
			<Dropdown.Menu>
				<Dropdown.Item disabled={true}>
					{session?.user.name || ""}
				</Dropdown.Item>
				<Dropdown.Item onClick={() => signOut()}>
					Sign out
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}