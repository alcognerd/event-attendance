import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AttendancePage from "./screen/attendancePage";
const App = () => {
	return (
		<Router>
			<div className="max-w-screen-wide bg-gray-800 min-h-screen mx-auto">
				<Routes>
					<Route path="/" element={<div>Hoee</div>} />
					<Route path="/events/:eventId/attendance/:title" element={<AttendancePage />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
