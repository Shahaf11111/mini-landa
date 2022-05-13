import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, LinearProgress } from "@mui/material";
import { getStockPrice } from "../stock/stock.api";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function StockDetails({ ticker }) {
    const [isLoading, setIsLoading] = useState(false);
    const [stock, setStock] = useState({});

    const getStockDetails = async (propertyTicker) => {
        const stockDetails = await getStockPrice(propertyTicker);
        setStock(stockDetails);
    };

    useEffect(() => {
        setIsLoading(true);
        getStockDetails(ticker);
        setIsLoading(false);
    }, [ticker]);

    return (
        <Paper sx={{ width: "50%", backgroundColor: "lightgray", boxShadow: 5 }}>
            <Typography variant="body1" fontWeight="bold" textAlign="center" onClick={() => console.log(stock)}>
                Stock Details
            </Typography>
            {isLoading ? (
                <Box sx={{ width: "100%" }}>
                    <LinearProgress color="inherit" />
                </Box>
            ) : (
                <React.Fragment>
                    <Typography variant="body1" textAlign="center" m={1}>
                        {stock.ticker}
                    </Typography>
                    <Box display="flex" justifyContent="center" alignContent="center">
                        {stock.status ? <CheckCircleIcon /> : <CancelIcon />}
                        <Typography variant="body1" textAlign="center" ml={1} mb={1}>
                            {Math.round(stock.current, 2)}$
                        </Typography>
                    </Box>
                    <Typography variant="body1" textAlign="center" mb={1}>
                        {new Date(stock.date).toLocaleString()}
                    </Typography>
                </React.Fragment>
            )}
        </Paper>
    );
}