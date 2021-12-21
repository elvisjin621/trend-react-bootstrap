import React from "react";
import logo from "./logo.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Repositories } from "./pages/Repositories";
import { Developers } from "./pages/Developers";
import { DescRangeContext } from "./context/DescRangeContext";

const queryClient = new QueryClient();

function App() {
	const [value, changeValue] = React.useState("today");
	const setValue = (value: string) => {
		changeValue(value);
	};

	return (
		<div className="header-wrap">
			<QueryClientProvider client={queryClient}>
				<DescRangeContext.Provider
					value={{
						range: "date",
						value: value,
						setValue,
					}}
				>
					<BrowserRouter>
						<Routes>
							<Route
								path="/"
								element={
									<Repositories
										title="Trending"
										description="See what the GitHub community is most excited about "
										ranges={["spoken_language", "language", "date"]}
									/>
								}
							/>
							<Route
								path="/developers"
								element={
									<Developers
										title="Trending"
										description="These are the developers building the hot tools "
										ranges={["language", "date"]}
									/>
								}
							/>
						</Routes>
					</BrowserRouter>
				</DescRangeContext.Provider>
			</QueryClientProvider>
		</div>
	);
}

export default App;
