
import { useState, useEffect, useReducer, useContext } from 'react'
import AuthContext from '../../store/authContext'
import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'

const emailReducer = (state, action) => {
  if (action.type === 'EMAIL_INPUT') {
    return {
      value: action.val,
      isValid: action.val.includes('@')
    }
  }
  if (action.type === 'EMAIL_BLUR') {
    return {
      value: state.value,
      isValid: state.value.includes('@')
    }
  }
  return {
    value: '',
    isValid: false
  }
}

const passwordReducer = (state, action) => {
  if (action.type === 'PASSWORD_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6
    }
  }
  if (action.type === 'PASSWORD_BLUR') {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6
    }
  }
  return {
    value: '',
    isValid: false
  }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('')
  // const [emailIsValid, setEmailIsValid] = useState()
  // const [enteredPassword, setEnteredPassword] = useState('')
  // const [passwordIsValid, setPasswordIsValid] = useState()
  const [formIsValid, setFormIsValid] = useState(false)

  // useReducer() IS MORE POWERFUL THAN useState() BUT USE IT SPARINGLY
  // useReducer() NEEDS ARGUMENTS FOR ITS HANDLER FUNCTION & INITIAL STATE
  // AN INIT FUNCTION IS AN OPTIONAL THIRD ARGUMENT
  // RETURNS AN ARRAY OF CURRENT STATE AND THE DISPATCHER TO UPDATE STATE
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: false})
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: false})

  useEffect(() => {
    console.log('EFFECT RUNNING')

    return () => {
      console.log('EFFECT CLEANUP')
    }
  }, [])

  const { isValid: emailIsValid } = emailState
  const { isValid: passwordIsValid } = passwordState

  // GREAT COMBINATION OF useReducer & useEffect
  // WHERE useEffect ONLY RUNS IF VALIDITY CHANGES
  // IMPORTANT AS useEffect SHOULD NOT RUN CONTINUOUSLY
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!')
      setFormIsValid(
        emailIsValid && passwordIsValid
      )
    }, 500)

    return () => {
      console.log('CLEANUP')
      clearTimeout(identifier)
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'EMAIL_INPUT', val: event.target.value })

    // setFormIsValid(
    //   emailState.value.includes('@') && passwordState.value.trim().length > 6
    // )
  }

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'PASSWORD_INPUT', val: event.target.value })

    // setFormIsValid(
    //   passwordState.isValid && passwordState.value.trim().length > 6
    // )
  }

  const validateEmailHandler = () => {
    dispatchEmail({type: 'EMAIL_BLUR'})
  }

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'PASSWORD_BLUR'})
  }

  const context = useContext(AuthContext)

  const submitHandler = (event) => {
    event.preventDefault()
    context.onLogin(emailState.value, passwordState.value)
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
