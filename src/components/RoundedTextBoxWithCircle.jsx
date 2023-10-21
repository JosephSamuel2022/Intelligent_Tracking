import React from "react";

const RoundedTextBoxWithCircle = () => {
	return (
		<div style={styles.container}>
			<div style={styles.circle}></div>
			<input
				type='text'
				style={styles.textBox}
				placeholder='Enter text'
				readOnly
			/>
			<div style={styles.greenDot}></div>
		</div>
	);
};

const styles = {
	container: {
		position: "relative",
		display: "inline-block",
		alignItems: "center",
	},
	circle: {
		position: "absolute",
		width: "40px",
		height: "40px",
		borderRadius: "50%",
		backgroundColor: "red",
		top: "50%",
		left: "10px",
		transform: "translateY(-50%)",
		pointerEvents: "none", // Make the circle non-editable
	},
	textBox: {
		padding: "10px 10px",
		borderRadius: "15px",
		border: "2px solid #ccc",
		outline: "none",
		fontSize: "18px", // Increase the text box size
		marginLeft: "60px", // Add some margin to the text box
	},
	greenDot: {
		width: "20px",
		height: "20px",
		borderRadius: "50%",
		backgroundColor: "green",
	},
};

export default RoundedTextBoxWithCircle;
