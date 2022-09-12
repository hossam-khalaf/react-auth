import { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'

// regex statments
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PASSWORD_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&]).{8,24}$/

const Register = () => {
	const userRef = useRef()
	const errorRef = useRef()

	// user states
	const [user, setUser] = useState('')
	const [validName, setValidName] = useState(false)
	const [userFocus, setUserFocus] = useState(false)

	// password states
	const [password, setPassword] = useState('')
	const [validPassword, setValidPassword] = useState(false)
	const [passwordFocus, setPasswordFocus] = useState(false)

	//match password states
	const [matchPassword, setMatchPassword] = useState('')
	const [validMatch, setValidMatch] = useState(false)
	const [matchFocus, setMatchFocus] = useState(false)

	// error && success messages
	const [errorMessage, setErrorMessage] = useState('')
	const [successMessage, setSuccessMessage] = useState(false)

	// when component first loads
	useEffect(() => {
		// userRef.currunt.focus()
	}, [])

	// validate user
	useEffect(() => {
		const result = USER_REGEX.test(user)
		console.log(result, user)
		setValidName(result)
	}, [user])

	// validate password
	useEffect(() => {
		const result = PASSWORD_REGEX.test(password)
		console.log(result, password)
		setValidPassword(result)
		const match = password === matchPassword
		setValidMatch(match)
	}, [password, matchPassword])

	// error message
	useEffect(() => {
		setErrorMessage('')
	}, [user, password, matchPassword])

	return (
		<section>
			<p
				ref={errorRef}
				className={errorMessage ? 'errormsg' : 'offscreen'}
				aria-live='assertive'
			>
				{errorMessage}
			</p>
			<h1>Register</h1>
			<form>
				<label htmlFor='username'>
					Username:
					<span className={validName ? 'valid' : 'hide'}>
						<FontAwesomeIcon icon={faCheck} />
					</span>
					<span className={validName || !user ? 'hide' : 'invalid'}>
						<FontAwesomeIcon icon={faTimes} />
					</span>
				</label>
				<input
					type='text'
					id='username'
					ref={userRef}
					autoComplete='off'
					required
					onChange={(e) => setUser(e.target.value)}
					aria-invalid={validName ? 'false' : 'true'}
					aria-describedby='uidnote'
					onFocus={() => setUserFocus(true)}
					onBlur={() => setUserFocus(false)}
				/>
				<p
					id='uidnote'
					className={
						userFocus && user && !validName ? 'instructions' : 'offscreen'
					}
				>
					<FontAwesomeIcon icon={faInfoCircle} />
					4 to 24 characters. <br />
					Must bedin with a ketter. <br />
					Letters, numbers, underscores, hyphens allowed.
				</p>
			</form>
		</section>
	)
}

export default Register
