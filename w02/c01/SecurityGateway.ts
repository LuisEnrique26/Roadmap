class SecurityGateway {
    private readonly origins: string[];

    constructor(origins: string[]) {
        this.origins = origins;
    }

    checkCors(origin: string): boolean {
        if (this.origins.includes(origin)) {
            return true;
        } else {
            throw new Error("Access denied");
        }
    }

    ckeckValidToken(token: string): boolean | Error {
        const validToken = token.split(" ");
        if (validToken[0] !== "Bearer" || validToken.length !== 2) {
            throw new Error("Invalid token");
        }

        const body = validToken[1].split(".");
        if (body.length !== 3) {
            throw new Error("Invalid token");
        }

        return true;
    }
}

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001", "http://miapp.com", "http://miapp.net"];
const securityGateway = new SecurityGateway(allowedOrigins);

try {
    console.log("CORS")
    console.log(securityGateway.checkCors("http://localhost:3000"));
    console.log(securityGateway.checkCors("http://hacker.com"));    
} catch (error) {
    console.log(error);
}

try {
    console.log("JWT");
    const validToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    console.log(securityGateway.ckeckValidToken(validToken));
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    console.log(securityGateway.ckeckValidToken(invalidToken));
    const brokenToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ";
    console.log(securityGateway.ckeckValidToken(brokenToken));    
} catch (error) {
    console.log(error);
}

