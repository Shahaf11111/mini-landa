import { Box, LinearProgress, List, ListItem, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAsync, selectProperties } from "./properties.slice";
import PropertyDetails from "./PropertyDetails";

export default function PropertyList() {
    const [isLoading, setIsLoading] = useState(1);
    const [page, setPage] = useState(1);
    const properties = useSelector(selectProperties);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(listAsync(page));
        setIsLoading(false);
    }, [page]);

    const handlePageChange = (_, value) => {
        setPage(value);
    };

    return isLoading ?
        (
            <Box sx={{ width: "100%" }} >
                <LinearProgress sx={{ height: 8 }} />
                Loading Properties...
            </Box>
        ) : (
            <Box>
                <Pagination
                    sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                    count={5}
                    page={page}
                    onChange={handlePageChange}
                />
                <Box display="flex" alignItems="center" justifyContent="center">
                    <List>
                        {properties.map(({ id, details }) => (
                            <ListItem key={id}>
                                <PropertyDetails ticker={id} details={details} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        );

}