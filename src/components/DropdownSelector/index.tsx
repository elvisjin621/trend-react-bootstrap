import React, { useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";
import { SearchItems } from "../../types/SearchItems";
import { DropdownSelected } from "../DropdownSelected";

type CustomToggleProps = {
	children?: React.ReactNode;
	onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {};
};

const CustomToggle = React.forwardRef(
	(props: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
		<a
			href=""
			ref={ref}
			className="btn btn-light btn-sm dropdown-toggle me-2"
			onClick={(e) => {
				e.preventDefault();
				props.onClick(e);
			}}
		>
			{props.children}
		</a>
	)
);

type CustomMenuProps = {
	children?: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
	labeledBy?: string;
};

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
	(props: CustomMenuProps, ref: React.Ref<HTMLDivElement>) => {
		const [value, setValue] = useState("");

		return (
			<div
				ref={ref}
				style={props.style}
				className={props.className}
				aria-labelledby={props.labeledBy}
			>
				<div className="p-2">
					<FormControl
						autoFocus
						placeholder="Type to filter..."
						onChange={(e) => setValue(e.target.value)}
						size="sm"
						value={value}
					/>
				</div>
				<div className="border-top select-item-list">
					{React.Children.toArray(props.children).filter(
						(child: any) =>
							!value ||
							child.props.children
								.toLowerCase()
								.indexOf(value.toLowerCase()) !== -1
					)}
				</div>
			</div>
		);
	}
);

interface DropdownSelectorProps {
	items: SearchItems;
}

export const DropdownSelector: React.FC<DropdownSelectorProps> = ({
	items,
}) => {
	const [selected, setSelected] = useState(items.selected);

	return (
		<Dropdown
			onSelect={(eventKey, e) =>
				setSelected(eventKey ? eventKey : items.selected)
			}
		>
			<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
				<DropdownSelected items={items} selected={selected} />
			</Dropdown.Toggle>

			<Dropdown.Menu as={CustomMenu} className="p-0">
				{items.categories.map((item, index) => {
					return (
						<Dropdown.Item
							key={index}
							eventKey={item.value}
							className="border-bottom small"
						>
							{item.label}
						</Dropdown.Item>
					);
				})}
			</Dropdown.Menu>
		</Dropdown>
	);
};
