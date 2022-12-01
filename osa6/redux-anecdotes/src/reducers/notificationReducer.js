const initialState = 'I am a notification!'

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW':
      return action.data
    default: return state
  }
}

export const create = (content) => {
  return {
    type: 'NEW',
    data: content
  }
}

export default notificationReducer