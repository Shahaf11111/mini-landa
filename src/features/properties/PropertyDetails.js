import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Card, CardActions, CardContent, Typography, Collapse, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropertyPhotos from "./PropertyPhotos";
import StockDetails from "../stock/StockDetails";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PropertyDetails({ ticker, details }) {
    const { type, country, address, status, photos } = details;
    const [expanded, setExpanded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <Card sx={{ width: "100%", mt: 2, boxShadow: 5 }}>
            <Typography variant="h5" textAlign="center" m={1}>
                {type}
            </Typography>
            <CardContent>
                <PropertyPhotos images={photos} />
                <Typography variant="h6" textAlign="center" mb={1}>
                    {country}
                </Typography>
                <Typography variant="body2" textAlign="center" mb={1} color="text.secondary">
                    {address}
                </Typography>
                <Typography variant="h6" textAlign="center">
                    {status} status
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton onClick={handleFavoriteClick}>
                    <FavoriteIcon htmlColor={isFavorite ? "red" : null} />
                </IconButton>
                <IconButton>
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto">
                <CardContent>
                    <StockDetails ticker={ticker} />
                </CardContent>
            </Collapse>
        </Card>
    );
}