import axios from "axios";

const basicURL = `http://run.mocky.io/v3/5db391d9-8f54-4826-ac52-6d825806b89e`

export const getPackeges = () => {
    console.log("came get packages");
    return dispatch =>
        axios.get(basicURL).then(x => {
            dispatch({ type: 'GET_PACKAGES', pyload: x.data })
        }
        )
            .catch(err => console.error(err))
}

export const addPackage = (p) => {
    return dispatch => {
        let packageToSend = {
            name: p.name, trackingNumber: p.trackingNumber, collected: p.collected, lat: p.lat, lng: p.lng
        };
        console.log("from add ", packageToSend);

        axios.post(basicURL, packageToSend)
            .then(x => {
                console.log("after add ", x.data);
                dispatch({ type: 'ADD_PACKAGE', pyload: x.data });
            })
            .catch(err => console.error(err));
    }
}

export const edit = (p) => {
    return dispatch => axios.put(basicURL + `:${p.trackingNumber}`, p)
        .then(x => {
            dispatch({ type: 'UPDATE_PACKAGE', pyload: x.data })

        }).catch(err => {
            console.log(err);
        })
}

export const deletePackage = (p) => {
    console.log("delete", p);
    return dispatch =>
        axios.delete(basicURL + `:${p}`)
            .then(x => {
                console.log("after delete before dispatch", x);
                dispatch({ type: 'DELETE_PACKAGE', pyload: p })
                console.log("after dispatch");
            })
            .catch(err => console.error(err));
}
