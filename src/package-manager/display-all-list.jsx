import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getPackeges } from "../service/data";
import PackageLine from "./package-line";
import { Card, CardContent, Input, MenuItem, Select, Table, TableBody, TableCell, TableRow } from "@mui/material";
import TableHead from '@mui/material/TableHead';
import { debounce } from 'lodash'


const DisplayAll = () => {

    const dispatch = useDispatch();
    const { packages } = useSelector(s => s.packages);
    const [packagesCount, setPackagesCount] = useState(0);
    const [connectedPackages, setConnectedPackages] = useState(0);
    const [currentPackages, setCurrentPackages] = useState([]);

    useEffect(() => {
        if (packages.length === 0)
            dispatch(getPackeges());
        if(packages){
            setCurrentPackages(packages);
            setPackagesCount(packages.length)
            let collected = packages.filter((p)=>p.collected===true)
            setConnectedPackages(collected.length)
        }
    }, [packages])

    const searchByName = debounce((inputText) => {
        setCurrentPackages(packages.filter(e => e.name === inputText));
    }, 600);

    const handleSearchName = (e) => {
        searchByName(e.target.value);
    }

    const searchByStatus = debounce((inputText) => {
        setCurrentPackages(packages.filter(e => e.collected === inputText));
    }, 600);

    const handleSearchStatus = (e) => {
        searchByStatus(e.target.value);
    }

    const searchByTrackingNumber = debounce((inputText) => {
        setCurrentPackages(packages.filter(e => e.trackingNumber === inputText));
    }, 600);

    const handleSearchTrackingNumber = (e) => {
        searchByTrackingNumber(e.target.value);
    }

    return (
        <>
        <CardContent>
            <br /><br /> <br />
            <Input className="search"
                fluid placeholder='Search...'
                onChange={handleSearchName} icon={'search'}
                size='huge' style={{ width: '100vw' }}
            />
            <br /><br /><br />
            <Input className="search"
                fluid placeholder='Search By Tracking number'
                onChange={handleSearchTrackingNumber} icon={'search'}
                size='huge' style={{ width: '100vw' }}
            />
            <br /><br /><br />
            <p>Search By Status... press to select</p>
            <Select
                placeholder="Search By Status..."
                onChange={handleSearchStatus} defaultValue=''
                size='huge' style={{ width: '100vw' }}>
                <MenuItem value='' disabled > Search By Status...</MenuItem>
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
            </Select>

            <div className="container">
                <br />
                <Table celled inverted textAlign="center" style={{ width: '100vw' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Tracking Number</TableCell>
                            <TableCell>Collected</TableCell>
                            <TableCell>Lat</TableCell>
                            <TableCell>Lng</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentPackages?.map((pack, i) => {
                            return <PackageLine p={pack} key={i} />
                        })}
                    </TableBody>
                </Table>
                <p>Total number of Packages:{packagesCount}</p>
                <p>Number of Collectted packages:{connectedPackages}</p>
            </div>
            </CardContent>
        </>)




}

export default DisplayAll;