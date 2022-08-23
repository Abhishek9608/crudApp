import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import {store} from '../../redux'
import { fireEvent, render, waitFor } from '@testing-library/react';
import PostModal from '../PostModal';
import Dashboard from '../Dashboard';


const handleClickFn = jest.fn()

const getProps ={
    open: true,
    handleClose:() => jest.fn(),
    handleClick:handleClickFn,
    selectedCard: {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }
}

describe('Modal page', () => {

    test('Dashboard page snapshot should match correctly', () => {
        const tree = renderer
        .create(<Provider store={store}>
            <Dashboard/>
        </Provider>)
        .toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('After clicking on add, then add API function should be called', async () => {
        const {getByRole, getByTestId, debug, container} = render(<Provider store={store}>
           <PostModal {...getProps}/>
        </Provider>)
        const input = getByTestId('title')
        fireEvent.change(input, { target: { value: 'test' } })
        await waitFor(() => expect(input).toHaveValue("test"));
        const body = getByTestId('title')
        fireEvent.change(body, { target: { value: 'body' } })
        await waitFor(() => expect(body).toHaveValue("body"));
        const Submit = getByRole('button', {name: /submit/i});
        fireEvent.click(Submit);
        expect(handleClickFn).toBeCalled()
    })
})
