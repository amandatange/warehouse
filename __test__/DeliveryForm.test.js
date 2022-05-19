import { render } from '@testing-library/react-native';
import DeliveryForm from '../components/DeliveryForm';

test('testing that header for deliveryform is New delivery', async () => {
    const { getByText } = render(<DeliveryForm />);
    const header = await getByText('New delivery');

    expect(header).toBeDefined();
});

test('testing that amount field exists', async () => {
    const { getByTestId } = render(<DeliveryForm />);

    const amountField = await getByTestId('amount-field');

    expect(amountField).toBeDefined();
});

test('testing that comment field exists', async () => {
    const { getByTestId } = render(<DeliveryForm />);

    const commentField = await getByTestId('comment-field');

    expect(commentField).toBeDefined();
});

test('testing that create delivery exists', async () => {
    const title = "Create new delivery by pressing this button";
    const { getByA11yLabel } = render(<DeliveryForm />);

    const a11yLabel = `${title}`
    const submitButton = getByA11yLabel(a11yLabel);
    
    expect(submitButton).toBeDefined();
});

// test('testing that authfield login button exists and works', async () => {
//     const { getByA11yLabel } = render(<DeliveryForm />);
//     const { getByA11yLabel } = render(<AuthFields
//         auth={auth}
//         setAuth={setAuth}
//         submit={mockSubmit}
//         title={title}
//         navigation={navigation}
//     />);
    
//     const a11yLabel = `${title} by pressing this button`
//     const submitButton = getByA11yLabel(a11yLabel);
    
//     expect(submitButton).toBeDefined();

//     fireEvent.press(submitButton);
//     expect(mockSubmit).toHaveBeenCalled();

// });
