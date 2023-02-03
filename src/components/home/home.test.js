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

    const emailErrorElement = screen.getByText(/the email you input is invalid/i)
    const emailInputElement = screen.getByRole("textbox", {
        name: /email/i,
    });
    const submitBtnElement = screen.getByRole("button", {
        name: /submit/i
    })

    expect(emailErrorElement).not.toBeInTheDocument();

    userEvent.type(emailInputElement, "selenagmail.com")
    userEvent.click(submitBtnElement)
    
})
