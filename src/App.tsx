import React from "react";
import logo from "./logo.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Repositories } from "./pages/Repositories";
import { Developers } from "./pages/Developers";

const queryClient = new QueryClient();

function App() {
	return (
		<div className="header-wrap">
			<QueryClientProvider client={queryClient}>
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
						<Route path="/developers" element={<Developers />} />
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</div>
	);
}

export default App;
