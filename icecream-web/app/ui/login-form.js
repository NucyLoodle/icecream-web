import { ErrorMessage } from "@hookform/error-message";

export default function LoginForm() {
    <form id='lg-login-form' 
        action={formAction}                            
        noValidate>
            <label htmlFor='lg-email'>Email:</label>
            <input
                id='lg-email'
                type='email'
                placeholder="someone@email.com"
                {...register("email", {
                    required: "Email is required.",
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format."
                    }
                })}
                autoComplete="email"
            />
            <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="error">{message}</p>} />
            


            <label htmlFor='lg-password'>Password:</label>
                <input
                    id='lg-password'
                    type='password'
                    placeholder='Password'
                    {...register("password", {
                        required: "Password is required.",
                    })}
            />
            <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="error">{message}</p>} />
            
            
            
            <div id="lg-remember-me-container">  
                <input type="checkbox" id="lg-remember-me" name="remember-me"></input>
                <label htmlFor="lg-remember-me">Remember me?</label>
            </div>

            <button id='lg-submit-login-button' type="submit" name="redirectTo" value={callbackUrl}>Login</button>
            <div>{errorMessage}</div>
        </form>
    }