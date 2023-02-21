import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./reset.module.css";

const PasswordReset = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	const url = `userpassword/reset/${param.token}`;


	/*useEffect(async() => {
		const verifyUrl = async () => {
			try {
				alert("hello1");
				await axios.get(url);
				
				setValidUrl(true);
				alert("hello");
			} catch (error) {
				alert("hello2");
				setValidUrl(false);
			}
		};
		const verifyUrl = async () => {
		try {
		const {data} = await axios.get(url);
		alert(data.message);
		if(data.message === "valid url")
		{
			setValidUrl(true);
		}
	}
	catch(error){
		setValidUrl(false)
	}
}

	}, [1]);*/


	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(url, { password, confirmPassword });
			setMsg(data.message);
			setError("");
			window.location = "/login";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};

	return (
		<Fragment>
				<div className={styles.container}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Add New Password</h1>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							className={styles.input}
						/>
						<h1>Confirm Password</h1>
						<input
							type="confirmpassword"
							placeholder="Confirm Password"
							name="confirmpassword"
							onChange={(e) => setconfirmPassword(e.target.value)}
							value={confirmPassword}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}
						<button type="submit" className={styles.green_btn}>
							Submit
						</button>
					</form>
				</div>
		</Fragment>
	);
};

export default PasswordReset;