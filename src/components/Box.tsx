import { MouseEventHandler } from "react";

export interface BoxProps {
  image: string;
  title: string;
  description: string;
  action?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const boxStyle = {
	background: "white",
	width: "40%",
	padding: 10,
	margin: 10
};

const imgStyle = {
	display: "block",
	margin: "auto",
	width: "50px"
};

const titleStyle = {
	fontSize: 32
}

const descStyle = {
	fontSize: 16
}

export const Box = (props: BoxProps) => {
	return (
		<div className="shadow-hard border-2 border-green-800 sm:rounded-md cursor-pointer" style={boxStyle} onClick={props.onClick}>
				<span>
					<img src={props.image} style={imgStyle}/>
					<div className="text-center items-center w-full" style={titleStyle}>{props.title}</div>
					<div className="text-center items-center w-full" style={descStyle}>{props.description}</div>
				</span>
		</div>
	)
}
