console.log("Redux: ", window.Redux)

const { createStore } = window.Redux;
// state
// reducer
// store

const initialState = JSON.parse(localStorage.getItem('hobbit_list')) || [];

const myHobbits = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_HOBBIT": {
            const newList = [...state];
            newList.push(action.payload);

            return newList;
        }
        default:
            return state;
    }
}

const store = createStore(myHobbits);

// render redux hobbit list
const renderListHobbits = (hobbitList) => {
    if(!Array.isArray(hobbitList) || hobbitList.length === 0 ) return;
    console.log('myHobbits: ', hobbitList)
    const ulElement = document.querySelector('#ulHobbitId');
    if(!ulElement) return;

    ulElement.innerHTML = '';
    for (const hobbit of hobbitList) {
        const liElement = document.createElement('li');
        liElement.textContent = hobbit;
        ulElement.appendChild(liElement)
    }
}

// render initial hobbit list
const initialHobitList = store.getState();

console.log("initialHobitList: ", initialHobitList)
renderListHobbits(initialHobitList)


const hobbitFormElement = document.querySelector('#hobbitFormId');

if(hobbitFormElement) {
    const handleFormSubmit = (e) => {
        // prevent browser from reloading
        e.preventDefault();
        const inputElement = document.querySelector('#hobbitTextId');
        if(!inputElement) return;

        console.log("submit", inputElement.value)
        const action = {
            type: 'ADD_HOBBIT',
            payload: inputElement.value
        };
        store.dispatch(action);

        // reset form
        hobbitFormElement.reset();
    }
    hobbitFormElement.addEventListener('submit', handleFormSubmit)
};


store.subscribe(() => {
    console.log("state update: ", store.getState());
    const newHobbitList = store.getState();
    renderListHobbits(newHobbitList);
    console.log('newHobbitList: ', newHobbitList)

    localStorage.setItem('hobbit_list', JSON.stringify(newHobbitList));
});





