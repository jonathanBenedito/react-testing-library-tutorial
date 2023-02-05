import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { Home } from "."

test("inputs should be initially empty", () => {
    render(<Home />);

    const emailInputElement = screen.getByRole("textbox");
    const passwordInputElement = screen.getByLabelText("Password");
    const confirmPasswordInputElement = screen.getByLabelText("Confirm Password")

    expect(emailInputElement.value).toBe("");
    expect(passwordInputElement.value).toBe("");
    expect(confirmPasswordInputElement.value).toBe("");
})

test("should be able to type an email", () => {
    render(<Home />);
    const emailInputElement = screen.getByRole("textbox", {
        name: /email/i
    });
    userEvent.type(emailInputElement, "selena@gmail.com");
    expect(emailInputElement.value).toBe("selena@gmail.com");
})

test("should be able to type a password", () => {
    render(<Home />);
    const passwordInputElement = screen.getByLabelText("Password");
    userEvent.type(passwordInputElement, "password!");
    expect(passwordInputElement.value).toBe("password!");
})

test("should be able to type a confirm password", () => {
    render(<Home />);
    const confirmPasswordInputElement = 
        screen.getByLabelText("Confirm Password");
    userEvent.type(confirmPasswordInputElement, "password!");
    expect(confirmPasswordInputElement.value).toBe("password!");
})

test("should show email error message on invalid email", () => {
    render(<Home />);

    let emailErrorElement = screen.queryByText(/the email you input is invalid./i)
    const emailInputElement = screen.getByRole("textbox", {
        name: /email/i,
    });
    const submitBtnElement = screen.getByRole("button", {
        name: /submit/i
    })

    expect(emailErrorElement).not.toBeInTheDocument();

    userEvent.type(emailInputElement, "selenagmail.com")
    userEvent.click(submitBtnElement)

    emailErrorElement = screen.queryByText(/the email you input is invalid./i)

    expect(emailErrorElement).toBeInTheDocument();
   
})

test("should show password error if password is less than 5 characters", () => {
    render(<Home />)


    let passwordErrorElement = screen.queryByText(/the email you input is invalid./i)
    
    const emailInputElement = screen.getByRole("textbox", {
        name: /email/i,
    });

    const passwordInputElement = screen.getByLabelText("Password");
    
    const submitBtnElement = screen.getByRole("button", {
        name: /submit/i
    })

    userEvent.type(emailInputElement, "selena@gmail.com")

    expect(passwordErrorElement).not.toBeInTheDocument();

    userEvent.type(passwordInputElement, "123")
    userEvent.click(submitBtnElement)

    passwordErrorElement = screen.queryByText(/The password should contain 5 or more characters./i)

    expect(passwordErrorElement).toBeInTheDocument();
})

test("should show password error if password is less than 5 characters", () => {
    render(<Home />)


    let passwordErrorElement = screen.queryByText(/The password should contain 5 or more characters./i)
    
    const emailInputElement = screen.getByRole("textbox", {
        name: /email/i,
    });

    const passwordInputElement = screen.getByLabelText("Password");
    
    const submitBtnElement = screen.getByRole("button", {
        name: /submit/i
    })

    userEvent.type(emailInputElement, "selena@gmail.com")

    expect(passwordErrorElement).not.toBeInTheDocument();

    userEvent.type(passwordInputElement, "123")
    userEvent.click(submitBtnElement)

    passwordErrorElement = screen.queryByText(/The password should contain 5 or more characters./i)

    expect(passwordErrorElement).toBeInTheDocument();
})

test("should show confirm password error if passwords don't match", () => {
    render(<Home />)


    let confirmPasswordErrorElement = screen.queryByText(/The passwords don't match. Try again./i)
    
    const emailInputElement = screen.getByRole("textbox", {
        name: /email/i,
    });

    const passwordInputElement = screen.getByLabelText("Password");
    const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");

    const submitBtnElement = screen.getByRole("button", {
        name: /submit/i
    })

    userEvent.type(emailInputElement, "selena@gmail.com")
    userEvent.type(passwordInputElement, "123456")

    expect(confirmPasswordErrorElement).not.toBeInTheDocument();

    userEvent.type(confirmPasswordInputElement, "111111")
    userEvent.click(submitBtnElement)

    confirmPasswordErrorElement = screen.queryByText(/The passwords don't match. Try again./i)

    expect(confirmPasswordErrorElement).toBeInTheDocument();
})

test("should show no errors message if every input is valid ", () => {
    render(<Home />)
    const emailInputElement = screen.getByRole("textbox", {
        name: /email/i,
    });

    const passwordInputElement = screen.getByLabelText("Password");
    
    const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");

    const submitBtnElement = screen.getByRole("button", {
        name: /submit/i
    })

    userEvent.type(emailInputElement, "selena@gmail.com")
    userEvent.type(passwordInputElement, "123456")
    userEvent.type(confirmPasswordInputElement, "123456")
    userEvent.click(submitBtnElement)

    const emailErrorElement = screen.queryByText(/the email you input is invalid./i)
    const passwordErrorElement = screen.queryByText(/The password should contain 5 or more characters./i)
    const confirmPasswordErrorElement = screen.queryByText(/The passwords don't match. Try again./i)

    expect(emailErrorElement).not.toBeInTheDocument();
    expect(passwordErrorElement).not.toBeInTheDocument();
    expect(confirmPasswordErrorElement).not.toBeInTheDocument();
})
