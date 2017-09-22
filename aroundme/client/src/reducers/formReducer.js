export default function reducer(state={
    images: [],
    description: "",
    location: null
  }, action) {

  switch (action.type) {
    case "ADD_IMAGES": {
      return {...state, images: [...state.images, ...action.payload]};
    }
    case "SET_DESCRIPTION": {
      return {...state, description: action.payload};
    }
    case "SET_LOCATION": {
      return {...state, location: action.payload};
    }
    case "CREATE_EVENT": {
      var formData = new FormData();
      // TODO: update this to real user and session id.
      formData.append('user_id', '1');
      formData.append('session_id', null);
      formData.append('long', state.location[0]);
      formData.append('lat', state.location[1]);
      formData.append('description', state.description);
      state.images.forEach(image => {
        formData.append('content[]', image.file);
      });

      // TODO: different url for development.
      fetch("https://api.aroundme.bojio.pw/events", {
        method: "POST",
        body: formData
      });
      return {...state};
    }
    case "RESET": {
      return {
        images: [],
        description: "",
        location: null
      };
    }
    default:
      return state;
  }
}