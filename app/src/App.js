import React from "react";
import { Thing } from "@wp-like-site/use-wordpress";
import { Post } from "@wp-like-site/ui-sections";

function App() {
	return (
		<div className="App">
			<Thing>Thidngs</Thing>
			<Post post={{ title: "t", content: "c", footer: "f" }} />
		</div>
	);
}

export default App;
