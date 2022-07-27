import { Container } from "@mui/material";
import { UserLogin } from "../features/user";

export default function UserLoginPage() {
    return (
        <Container sx={{ width: "50%", padding: 10 }}>
            <UserLogin />
        </Container>
    );
}