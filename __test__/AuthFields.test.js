import { fireEvent, render } from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';

let auth = {};
const setAuth = (newAuth) => {
    auth = newAuth;
};

const mockSubmit = jest.fn();

const navigation = () => false;

test('testing that authfield for login exists', async () => {
    const title = "Log in"
    const { getAllByText } = render(<AuthFields
        auth={auth}
        setAuth={setAuth}
        submit={mockSubmit}
        title={title}
        navigation={navigation}
    />);

    const titleElements = await getAllByText(title);

    expect(titleElements.length).toBe(2);
});


test('testing that authfield email field exists and changes value', async () => {
    const title = "Log in"
    const { getByTestId } = render(<AuthFields
        auth={auth}
        setAuth={setAuth}
        submit={mockSubmit}
        title={title}
        navigation={navigation}
    />);
    
    const emailField = await getByTestId('email-field');

    expect(emailField).toBeDefined();

    const fakeEmail = "epost@fake.se";
    fireEvent.changeText(emailField, fakeEmail);

    expect(auth?.email).toEqual(fakeEmail)
});

test('testing that authfield password field exists and changes value', async () => {
    const title = "Log in"
    const { getByTestId } = render(<AuthFields
        auth={auth}
        setAuth={setAuth}
        submit={mockSubmit}
        title={title}
        navigation={navigation}
    />);
    
    const passwordField = await getByTestId('password-field');

    expect(passwordField).toBeDefined();

    const fakePassword = "sddfSDFsdf556!";
    fireEvent.changeText(passwordField, fakePassword);

    expect(auth?.password).toEqual(fakePassword)
});

test('testing that authfield login button exists and works', async () => {
    const title = "Log in"
    const { getByA11yLabel } = render(<AuthFields
        auth={auth}
        setAuth={setAuth}
        submit={mockSubmit}
        title={title}
        navigation={navigation}
    />);
    
    const a11yLabel = `${title} by pressing this button`
    const submitButton = getByA11yLabel(a11yLabel);
    
    expect(submitButton).toBeDefined();

    fireEvent.press(submitButton);
    expect(mockSubmit).toHaveBeenCalled();

});

// test('testing that authfield login button exists', async () => {
//     const title = "Log in"
//     const { getByA11yLabel } = render(<AuthFields
//         auth={auth}
//         setAuth={setAuth}
//         submit={mockSubmit}
//         title={title}
//         navigation={navigation}
//     />);
    
//     const fakeEmail = "epost@fake.se";
//     fireEvent.changeText("", fakeEmail);

//     expect(auth?.email).toEqual(fakeEmail)
// });