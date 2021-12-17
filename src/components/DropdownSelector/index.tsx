import React, { useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";
import { SearchItems } from "../../types/SearchItems";

type CustomToggleProps = {
	children?: React.ReactNode;
	onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {};
};

const CustomToggle = React.forwardRef(
	(props: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
		<a
			href=""
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				props.onClick(e);
			}}
		>
			{props.children}
			&#x25bc;
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
				<FormControl
					autoFocus
					className="mx-3 my-2 w-auto"
					placeholder="Type to filter..."
					onChange={(e) => setValue(e.target.value)}
					value={value}
				/>
				<ul className="list-unstyled">
					{React.Children.toArray(props.children).filter(
						(child: any) =>
							!value || child.props.children.toLowerCase().startsWith(value)
					)}
				</ul>
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

	const theSelectedItem = () => {
		const selectItem = items.categories.find((item) => item.value === selected);
		return selectItem ? selectItem.label : "Select " + items.label;
	};

	return (
		<Dropdown
			onSelect={(eventKey, e) =>
				setSelected(eventKey ? eventKey : items.selected)
			}
		>
			<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
				{theSelectedItem()}
			</Dropdown.Toggle>

			<Dropdown.Menu as={CustomMenu}>
				{items.categories.map((item) => {
					return (
						<Dropdown.Item key={item.value} eventKey={item.value}>
							{item.label}
						</Dropdown.Item>
					);
				})}
			</Dropdown.Menu>
		</Dropdown>
	);
};
