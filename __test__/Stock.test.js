import { render } from '@testing-library/react-native';
import Stock from '../components/Stock';

jest.mock("../components/StockList", () => "StockList");

test('header should exist containing text In stock', async () => {
    const { getByText } = render(<Stock />);
    const header = await getByText('In stock');

    expect(header).toBeDefined();
});
