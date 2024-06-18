import { Button, TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deletePackage, edit } from "../service/data";

const PackageLine = ({ p }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const editPackage = (p) => {
        p.collected = !p.collected;
        dispatch(edit(p))
    }

    return (<>
        <TableRow>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.trackingNumber}</TableCell>
            <TableCell>{p.collected?'true':'false'}</TableCell>
            <TableCell>{p.lat}</TableCell>
            <TableCell>{p.lng}</TableCell>
            <TableCell>
                <Button icon='trash' onClick={() => deletePackage(p.trackingNumber)} >Delete</Button>
                <Button icon='edit' onClick={() => editPackage(p)} >Toggole Collected</Button>
            </TableCell>
        </TableRow>
    </>)
}

export default PackageLine;


