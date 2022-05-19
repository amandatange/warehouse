import { fireEvent, render } from '@testing-library/react-native';
import DeliveryForm from '../components/DeliveryForm';

let delivery = {};
const setDelivery = (newDelivery) => {
    delivery = newDelivery;
};

const setCurrentProduct = (newDelivery) => {
    delivery = newDelivery;
};

const mockSubmit = jest.fn();


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

test('testing that create delivery button works', async () => {
    const title = "Create new delivery by pressing this button";
    const { getByA11yLabel } = render(<DeliveryForm 
        delivery={delivery}
        setDelivery={setDelivery}
        setCurrentProduct={setCurrentProduct}
        addDelivery={mockSubmit}
    />);

    const a11yLabel = `${title}`
    const submitButton = getByA11yLabel(a11yLabel);

    fireEvent.press(submitButton);
    expect(mockSubmit).toHaveBeenCalled();

});
