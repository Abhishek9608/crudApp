import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Dashboard from '../Dashboard'
import {store} from '../../redux'
import { findByRole, fireEvent, getAllByText, getByText, queryByRole, queryByText, render, waitFor } from '@testing-library/react';
import {deletePost, addPost } from '../../redux/action'


jest.mock('../../redux/action', () => ({
    ...jest.requireActual('../../redux/action'),
    deletePost: jest.fn(),
    addPost: jest.fn()
}))

jest.mock('../../redux/types/hooks', () => ({
    ...jest.requireActual('../../redux/types/hooks'),
    useAppSelector: () => [{
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }],
    useAppDispatch: () => jest.fn()
}))

describe('Dashboard page', () => {

    test('Dashboard page snapshot should match correctly', () => {
        const tree = renderer
        .create(<Provider store={store}>
            <Dashboard/>
        </Provider>)
        .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('page title shoulld be there',() => {
        const {queryByText} = render(<Provider store={store}>
            <Dashboard/>
        </Provider>)

        const getHeading = queryByText('BLOGS');
        expect(getHeading).toBeTruthy()
    })

    test('After Clicking on Add post modal should open', () => {
        const {getByRole, getByText} = render(<Provider store={store}>
            <Dashboard/>
        </Provider>)
        const getAddButton = getByRole('button', {name: /add post/i});
        fireEvent.click(getAddButton);
        const Submit = getByRole('button', {name: /submit/i});
        expect(Submit).toBeTruthy()
    })

    test('After Clicking Edit button modal should open', async () => {
        const {getByRole,getByText} = render(<Provider store={store}>
            <Dashboard/>
        </Provider>)
        const getAddButton = getByRole('button', {name: /edit/i});
        fireEvent.click(getAddButton);
        const Submit = getByRole('button', {name: /submit/i});
        expect(Submit).toBeTruthy()
    })
    
    test('After Clicking on delete button, delete function should be called',() => {
        const {getAllByText} = render(<Provider store={store}>
            <Dashboard/>
        </Provider>)

        const getDeletedButton = getAllByText('Delete')[0];
        fireEvent.click(getDeletedButton);
        expect(deletePost).toBeCalled()
    })

    test('After clicking on add, then add API function should be called', async () => {
        const {getByRole, getByTestId, findByRole} = render(<Provider store={store}>
            <Dashboard/>
        </Provider>)
        const getAddButton = getByRole('button', {name: /add post/i});
        fireEvent.click(getAddButton);
        const input = getByTestId('title')
        fireEvent.change(input, { target: { value: 'test' } })
        await waitFor(() => expect(input).toHaveValue("test"));
        const body = getByTestId('title')
        fireEvent.change(body, { target: { value: 'body' } })
        await waitFor(() => expect(body).toHaveValue("body"));
        const Submit = getByRole('button', {name: /submit/i});
        fireEvent.click(Submit);
        expect(addPost).toBeCalled()
    })
})
