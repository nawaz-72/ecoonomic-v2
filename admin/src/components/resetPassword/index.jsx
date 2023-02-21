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


	useEffect(async() => {
		const verifyUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		return () => {
			clearTimeout(verifyUrl);
		  }
	}, [param, url]);


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
			{validUrl ? (
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
			) : (
				<h1>404 Not Found</h1>
				
			)}
		</Fragment>
	);
};

export default PasswordReset;