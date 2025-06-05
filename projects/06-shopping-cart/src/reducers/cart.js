export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const CART_ACTIONS_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
}

export const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

export const cartReducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action
    
    // En lugar del switch, podrías usar un objeto de mapeo si lo prefieres
    // const actionMap = {
    //     [CART_ACTIONS_TYPES.ADD_TO_CART]: (state, actionPayload) => { ... },
    //     [CART_ACTIONS_TYPES.REMOVE_FROM_CART]: (state, actionPayload) => { ... },
    //     [CART_ACTIONS_TYPES.CLEAR_CART]: () => cartInitialState
    // }
    // return actionMap[actionType] ? actionMap[actionType](state, actionPayload) : state
    // O también usar varios ifs:
    // if (actionType === CART_ACTIONS_TYPES.ADD_TO_CART) { ... }
    // else if (actionType === CART_ACTIONS_TYPES.REMOVE_FROM_CART) { ... }
    // else if (actionType === CART_ACTIONS_TYPES.CLEAR_CART) { ... }
    switch (actionType) {
        case CART_ACTIONS_TYPES.ADD_TO_CART: {
            const { id } = actionPayload
            const productInCartIndex = state.findIndex(item => item.id === id)

            if (productInCartIndex >= 0) {
                
                // En lugar de usar structuredClone, podrías usar el operador spread
                // const newState = [...state]
                // newState[productInCartIndex].quantity += 1
                // updateLocalStorage(newState)
                // return newState
                // O también con slice:
                // const newState = state.slice()
                // newState[productInCartIndex].quantity += 1
                // updateLocalStorage(newState)
                // return newState
                const newState = structuredClone(state)
                newState[productInCartIndex].quantity += 1
                updateLocalStorage(newState)
                return newState
            }

            const newState = [
                ...state,
                {
                    ...actionPayload,   // product
                    quantity: 1
                }
            ]

            updateLocalStorage(newState)
            return newState
        }
        case CART_ACTIONS_TYPES.REMOVE_FROM_CART: {
            const { id } = actionPayload
            const newState = state.filter(item => item.id !== id)

            updateLocalStorage(newState)
            return newState
        }
        case CART_ACTIONS_TYPES.CLEAR_CART: {
            updateLocalStorage([])
            return []
        }
    }
    return state
}