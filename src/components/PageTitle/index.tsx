import React from "react";

interface PageTitleProps {
	title: string;
	description: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, description }) => {
	return (
		<div className="text-center highlight p-4 border-bottom">
			<h1 className="h2">{title}</h1>
			<p className="lead">{description}</p>
		</div>
	);
};
