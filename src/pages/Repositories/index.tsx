import React from "react";
import {
	Container,
	Navbar,
	ButtonGroup,
	Button,
	ButtonToolbar,
} from "react-bootstrap";
import { DropdownSelector } from "../../components/DropdownSelector";

import { PageTitle } from "../../components/PageTitle";
import { searchItems } from "../../globals/searchItems";

interface RepositoriesProps {
	title: string;
	description: string;
	ranges: string[];
}

export const Repositories: React.FC<RepositoriesProps> = ({
	title,
	description,
	ranges,
}) => {
	return (
		<>
			<PageTitle title={title} description={description} />
			<Container>
				<Navbar bg="light" className="border mt-5 mb-5 rounded-top p-3">
					<ButtonGroup size="sm">
						<Button>Repositories</Button>
						<Button variant="outline-secondary">Devlopers</Button>
					</ButtonGroup>
					<ButtonToolbar className="ms-auto">
						{searchItems.map((items) => {
							if (ranges.indexOf(items.range) > -1) {
								return <DropdownSelector items={items} />;
							}
							return <></>;
						})}
					</ButtonToolbar>
				</Navbar>
				<div className="rounded-bottom"></div>
			</Container>
		</>
	);
};
