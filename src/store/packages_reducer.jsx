import * as actions from './actions';

const initialState = {
    packages: [],
    selectPackage: null,
}

const Packages_Reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_PACKAGES:
            {
                return ({
                    ...state,
                    packages:action.pyload
                })
            }

        case actions.ADD_PACKAGE: {
            let packagesList = [...state.packages];
            packagesList.push(action.pylaod);
            return ({
                ...state,
                packages: packagesList
            })
        }

        case actions.UPDATE_PACKAGE: {
            let packagesList = [...state.packages];
            const index = packagesList.findIndex(p => p.Id === action.pyload.Id);
            packagesList[index] = action.pyload;
            return ({
                ...state,
                packages: packagesList
            })
        }

        case actions.DELETE_PACKAGE: {
            let packagesList = [...state.packages];
            packagesList = packagesList.filter(r => r.trackingNumber != action.pyload);
            console.log("dispatch after delete", packagesList);
            return ({
                ...state,
                packages: packagesList
            })
        }

        case actions.SET_SELECTED_PACKAGE:{
            console.log("come to selected package", action.pyload);
            return({
                ...state,
                selectPackage:action.pyload
            })
        }

        default:
            return ({ ...state })
    }
}

export default Packages_Reducer;
