import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from ".";

const typeIntoForm = ({ email, password, confirmPassword }) => {
    const emailInputElement = screen.getByRole("textbox");
    const passwordInputElement = screen.getByLabelText("Password");
    const confirmPasswordInputElement = screen.getByLabelText("Confirm Password")

    if(email) {
        userEvent.type(emailInputElement, email)
    }
    if(password) {
        userEvent.type(passwordInputElement, password)
    }
    if(confirmPasswordInputElement) {
        userEvent.type(confirmPasswordInputElement, confirmPassword)
    }

    return {
        emailInputElement,
        passwordInputElement,
        confirmPasswordInputElement
    }
}

const clickOnSubmitButton = () => {
    const submitBtnElement = screen.getByRole("button", {
        name: /submit/i
    })

    userEvent.click(submitBtnElement)
}

describe("App", () => {
    
    beforeEach(() => {
        render(<Home />);
    })
    
    test("inputs should be initially empty", () => {
        expect(screen.getByRole("textbox").value).toBe("");
        expect(screen.getByLabelText("Password").value).toBe("");
        expect(screen.getByLabelText("Confirm Password").value).toBe("");
    })
    
    test("should be able to type an email", () => {
        const { emailInputElement } = typeIntoForm({email: "selena@gmail.com"})
    
        expect(emailInputElement.value).toBe("selena@gmail.com");
    })
    
    test("should be able to type a password", () => {
        const { passwordInputElement } = typeIntoForm({password: "password!"});
    
        expect(passwordInputElement.value).toBe("password!");
    })
    
    test("should be able to type a confirm password", () => {
        const { confirmPasswordInputElement } = typeIntoForm({confirmPassword: "password!"})
    
        expect(confirmPasswordInputElement.value).toBe("password!");
    })
    
    describe("Error Handling", () => {
    
        test("should show email error message on invalid email", () => {
            expect(screen.queryByText(/the email you input is invalid./i)).not.toBeInTheDocument();
        
            typeIntoForm({email: "selenagmail.com"})
            clickOnSubmitButton()
        
            expect(screen.queryByText(/the email you input is invalid./i)).toBeInTheDocument(); 
        })
        
        test("should show password error if password is less than 5 characters", () => {
            expect(screen.queryByText(/The password should contain 5 or more characters./i)).not.toBeInTheDocument();
        
            typeIntoForm({email: "selena@gmail.com", password: "123"})
            clickOnSubmitButton()
        
            expect(screen.queryByText(/The password should contain 5 or more characters./i)).toBeInTheDocument();
        })
        
        test("should show password error if password is less than 5 characters", () => {
            expect(screen.queryByText(/The password should contain 5 or more characters./i)).not.toBeInTheDocument();
        
            typeIntoForm({email: "selena@gmail.com", password: "123"}) 
            clickOnSubmitButton()
        
            expect(screen.queryByText(/The password should contain 5 or more characters./i)).toBeInTheDocument();
        })
        
        test("should show confirm password error if passwords don't match", () => {
            typeIntoForm({
                email: "selena@gmail.com",
                password: "123456",
                confirmPassword: "111111"
            })
        
            expect(screen.queryByText(/The passwords don't match. Try again./i)).not.toBeInTheDocument();
        
            clickOnSubmitButton() 
        
            expect(screen.queryByText(/The passwords don't match. Try again./i)).toBeInTheDocument();
        })
        
        test("should show no errors message if every input is valid ", () => {
            typeIntoForm({
                email: "selena@gmail.com",
                password: "123456",
                confirmPassword: "123456"
            })
        
            clickOnSubmitButton()
        
            expect(screen.queryByText(/the email you input is invalid./i)).not.toBeInTheDocument();
            expect(screen.queryByText(/The password should contain 5 or more characters./i)).not.toBeInTheDocument();
            expect(screen.queryByText(/The passwords don't match. Try again./i)).not.toBeInTheDocument();
        })
    })    
})



